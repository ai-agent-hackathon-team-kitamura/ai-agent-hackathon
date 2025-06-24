"""面談に関連するアプリケーションサービス"""

import json
from typing import List,Any,Dict
from app.services.gateways.chat_llm_client import ChatLLMClient
from app.domain.chat import Message
from app.spec import HealthData
from app.domain.chat import Message
from app.spec import ChatMessageDto
from app.domain.health import Health

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
        prompt_template = """
        あなたは優秀なカウンセラーです。
        以下の最新の健康状態のデータを参考に、相手を気遣い、自然な形で1on1面談を開始するための冒頭の挨拶を生成してください。

        --- 最新の健康状態 ---
        スコア: {score}ポイント(100ポイント中)
        メモ: {note}
        ---------------------

        生成する挨拶の例:
        「こんにちは！前回の面談のときより、ぐっすり眠れたみたいで安心しました。その後、調子はいかがですか？」
        また、下記のルールを守ってください
        - スコアについてはあなたが理解するための数字です。人間に「あなたのスコアはxxxです」とか言われてもしっくりこないので、具体的数字には触れないでください
        - 顔色や声色については触れないですください。あなたはチャットボットカウンセラーなので、文字からしか感情を読み取れません。
        """

        prompt = prompt_template.format(
            score=health_data["score"],
            note=health_data["note"]
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
        
    async def evaluate_conversations(
        self,
        message_history: List[ChatMessageDto]
    ) -> Health:
        """会話履歴をLLMが分析し、Healthドメインオブジェクトを返す"""
        prompt_template = """
        あなたは会話を分析する専門家です。
        以下の会話履歴を読み、会話全体のポジティブさを1から100の健康スコアとして採点し、その理由を簡潔な特記事項としてまとめてください。

        --- 会話履歴 ---
        {message_history}
        ---------------------
        """

        schema = {
            "type": "object",
            "properties": {
                "health": {
                    "type": "object",
                    "properties": {
                        "score": {
                            "type": "integer",
                            "description": "1から100までの健康スコア"
                        },
                        "note": {
                            "type": "string",
                            "description": "スコアの理由に関する特記事項"
                        }
                    },
                    "required": ["score", "note"]
                }
            },
            "required": ["health"]
        }

        history_text = self._format_history_as_text(message_history)
        prompt = prompt_template.format(message_history=history_text)
        messages = [Message(role="user", content=prompt)]

        # AIチャットを呼び出し、構造化されたレスポンスを期待する
        res = await self._llm_client.chat(messages, schema=schema)
        
        health_dict = res.get("health")
        if not health_dict:
            # LLMが期待した形式で返さなかった場合はエラーを発生させる
            raise ValueError("LLMからのレスポンスにhealthデータが含まれていません。")

        # 辞書からドメインオブジェクトを生成して返す
        return Health.from_dict(health_dict)
    async def is_conversation_completed(
        self,
        message_history: List[ChatMessageDto],
    ) -> bool:
        """会話が完結しているかを bool で返す"""
        prompt_template = """
        以下の1on1面談の会話履歴を読み、会話がすでに自然に終了しているか判定してください。
        会話の内容を詳細に分析して、従業員が持っている健康に関する課題が解決し、明日から健康に過ごせそうか？を基準に判断してください。
        また、ユーザーとアシスタントの双方が「ありがとうございました」「来月もよろしくお願いします」と言ってる場合など、明示的に会話が終了してる合図があった場合でも完了判定してください。
        会話が一区切りしてるとしても、ありがとうございましたのような明示的な終了の挨拶がない限りはFalseとしてください。
        具体的には下記に示す入出力例を参考にしてください。

        出力は JSON 形式で、次のスキーマを厳守してください：
        {{
        "completed": boolean,   // true なら会話は終了済み
        "note": string          // 判定理由を 50 文字以内で
        }}

        --- 会話履歴 ---
        {message_history}
        ---------------------

        ## 入出力例
        ## 入力例1
        ユーザー:「最近寝れてないですよね」
        アシスタント:「早めに退勤して寝てくださいね。」

        ## 出力例1
        False(会話は一区切りしてるが、従業員の問題は解決していない)

        ## 入力例2
        ユーザー:「最近寝れてないですよね」
        アシスタント:「早めに退勤して寝てくださいね。」
        ユーザー:「ありがとう、上司に相談してみるよ。」

        ## 出力例2
        False(会話は一区切りしてるが、アシスタント:側の挨拶は完了していない。もしかしたら会話が続くかもしれないのでFalse)

        ## 入力例3
        ユーザー:「最近寝れてないですよね」
        アシスタント:「早めに退勤して寝てくださいね。」
        ユーザー:「ありがとう、上司に相談してみるよ。」
        アシスタント:「そうですね、早速相談してみてください。今日はありがとうございました。」

        ## 出力例3
        True(双方の会話が一区切りしており、ネクストアクションも決まっている)

        ## 入力例4
        ユーザー: こんにちは
        アシスタント: こんにちは！何かお手伝いできることはありますか？
        ユーザー: 日本の首都はどこですか？
        アシスタント: 東京です

        ## 出力例4
        False(双方の会話が一区切りしているが、ネクストアクションは決まっていないし、明示的な完了の挨拶もないため、もしかしたら会話はまだ続くかもしれない。)
        """

        schema = {
            "type": "object",
            "properties": {
                "completed": {"type": "boolean"},
                "note": {"type": "string"},
            },
            "required": ["completed", "note"],
        }

        history_text = self._format_history_as_text(message_history)
        prompt = prompt_template.format(message_history=history_text)
        messages = [Message(role="user", content=prompt)]

        res = await self._llm_client.chat(messages, schema=schema)

        if "completed" not in res:
            raise ValueError("LLM から 'completed' キーが返却されませんでした。")
        print(res["note"])
        return bool(res["completed"])


    def _format_history_as_text(self, messages: List[ChatMessageDto]) -> str:
        """会話履歴を文字列に変換"""
        text_parts = []
        for msg in messages:
            speaker = "ユーザー" if msg.role == "user" else "アシスタント"
            text_parts.append(f"{speaker}: {msg.content}")
        return "\n".join(text_parts)
    
    