"""全てのルーティングを管理"""

from fastapi import APIRouter
from app.services.llm_chat_service import LLMChatService
from app.services.survey_service import SurveyService
from app.infrastructure.vertex_chat_llm_client import VertexChatLLMClient
from app.spec import ChatRequest, ChatResponse, HealthResponse, StartSurveyRequest, StartSurveyResponse, ChatMessageDto


router = APIRouter()


@router.get("/")
async def root():
    """ルートエンドポイント"""
    return {"message": "Hello World from AI API!"}


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """ヘルスチェックエンドポイント"""
    return {"status": "healthy", "version": "0.1.0"}


@router.post("/chat", response_model=ChatResponse)
async def chat_completion(request: ChatRequest):
    """
    チャット形式での会話エンドポイント
    
    会話履歴を考慮してGemini AIが返答を生成します。
    roleは'user'（ユーザー）または'assistant'（AI）を指定してください。
    """
    llm_client = VertexChatLLMClient()
    # 依存性注入：インフラ層をアプリケーションサービスに注入
    chat_service = LLMChatService(llm_client)
    result = await chat_service.invoke(request.messages, request.schema)
    return result


@router.post("/start-survey", response_model=StartSurveyResponse)
async def start_survey(request: StartSurveyRequest):
    """
    面談開始API

    最新の健康状態データを基に、AIが面談開始のメッセージを生成します。
    """
    try:
        # 依存関係をセットアップし、適切なサービスを呼び出す
        llm_client = VertexChatLLMClient()
        interview_service = SurveyService(llm_client)

        # サービスを呼び出してビジネスロジックを実行
        result = await interview_service.create_opening_message(request.health)

        # サービスからの結果をHTTPレスポンスに変換する
        if result.get("success"):
            return StartSurveyResponse(
                success=True,
                opening_message=result.get("opening_message")
            )
        else:
            return StartSurveyResponse(
                success=False,
                error=result.get("error")
            )
    except Exception as e:
        # 予期せぬエラーが発生した場合のフォールバック
        return StartSurveyResponse(success=False, error=f"サーバー内部でエラーが発生しました: {str(e)}")
