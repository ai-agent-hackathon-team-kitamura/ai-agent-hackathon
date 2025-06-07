from typing import List
from app.domain.chat import Chat, Message
from app.services.gateways.chat_llm_client import ChatLLMClient
from app.spec import ChatMessageDto


class LLMChatService:
    """LLM を用いたチャット応答生成のアプリケーションサービス"""

    def __init__(self, llm_client: ChatLLMClient):
        self._llm_client = llm_client

    async def invoke(self, messages: List[ChatMessageDto]) -> dict:
        """ユーザー入力を受け取り、LLM から応答を生成して返す"""
        if not messages:
            return {"success": False, "error": "メッセージが空です"}
        
        try:
            # ドメインオブジェクトに変換
            chat = self._create_chat(messages)
            # AIチャット
            generated_text = await self._llm_client.chat(chat.messages)              

            return {
                "success": True,
                "generated_text": generated_text
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
            }
    
    def _create_chat(self, dtos: list[ChatMessageDto]) -> Chat:
        """メッセージリストからChatドメインオブジェクトを作成"""
        return Chat([Message(role=d.role, content=d.content) for d in dtos])
