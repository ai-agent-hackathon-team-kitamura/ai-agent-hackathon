"""面談に関連するアプリケーションサービス"""

from app.services.gateways.chat_llm_client import ChatLLMClient
from app.domain.chat import Message
from app.spec import HealthData


class SurveyService:
    """面談のユースケースを扱うサービス"""

    def __init__(self, llm_client: ChatLLMClient):
        """
        Args:
            llm_client: LLMと通信するためのゲートウェイインスタンス
        """
        self._llm_client = llm_client

    async def create_opening_message(self, health_data: HealthData) -> dict:
        """
        健康状態のデータに基づいて、面談開始のメッセージを生成する

        Args:
            health_data: ユーザーから受け取った健康状態データ

        Returns:
            成功/失敗とメッセージまたはエラー情報を含む辞書
        """
        # プロンプトを構築する責務をこのサービスが担う
        prompt_template = """
        あなたは優秀なカウンセラーです。
        以下の最新の健康状態のデータを参考に、相手を気遣い、自然な形で1on1面談を開始するための冒頭の挨拶を生成してください。

        --- 最新の健康状態 ---
        スコア: {score}ポイント(10ポイント中)
        メモ: {note}
        ---------------------

        生成する挨拶の例:
        「こんにちは！前回の面談のときより、ぐっすり眠れたみたいで安心しました。その後、調子はいかがですか？」
        また、下記のルールを守ってください
        - スコアについてはあなたが理解するための数字です。人間に「あなたのスコアはxxxです」とか言われてもしっくりこないので、具体的数字には触れないでください
        - 顔色や声色については触れないですください。あなたはチャットボットカウンセラーなので、文字からしか感情を読み取れません。
        """

        prompt = prompt_template.format(
            score=health_data.score,
            note=health_data.note
        )

        # ドメインオブジェクトに変換してLLMに渡す
        messages = [Message(role="user", content=prompt)]

        try:
            # ゲートウェイ（インフラ層）を呼び出してLLMからの応答を取得
            generated_text = await self._llm_client.chat(messages, schema=None)

            if isinstance(generated_text, str):
                return {"success": True, "opening_message": generated_text.strip()}
            else:
                # LLMClientの実装によっては発生しうる
                return {"success": False, "error": "LLMから予期しない形式の応答がありました。"}
        except Exception as e:
            # エラーログの記録をここに実装するとより良い
            return {"success": False, "error": f"LLMとの通信でエラーが発生しました: {str(e)}"}