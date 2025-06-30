"""summeryに関するアプリケーションサービス"""

import json
from typing import List,Any,Dict
from app.services.gateways.chat_llm_client import ChatLLMClient
from app.domain.chat import Message
from app.spec import HealthData
from app.domain.chat import Message
from app.spec import ChatMessageDto
from app.domain.health import Health

class SummeryService:
    """面談のユースケースを扱うサービス"""

    def __init__(self, llm_client: ChatLLMClient):
        """
        Args:
            llm_client: LLMと通信するためのゲートウェイインスタンス
        """
        self._llm_client = llm_client
    
    async def create_summery(self, note_list: list) -> dict:
        print(note_list)
        prompt_template = """
        あなたは要点を簡潔に整理する力に優れています
        以下に渡す文章リストは、今までの1on1面談でのサマリー集です。
        この文章を元に、従業員の健康に関する「良い点」と「悪い点」を要約してください。
        また、それをもとに得られる傾向なども良い点、悪い点に含めてください。言葉はですますの丁寧な文章にしてください
        どちらも200文字くらいでまとめてください。

        --- 文章のリスト ---
         {note_list}
        ---------------------

        ### 入力例
        「最近寝れてないらしい。いろいろと会話したが、残業が多くて寝る時間が少ないと思われる」
        「寝れないなりに、残業時間を減らせないか上司と調整してるみたい」

        ### 出力例
        良い点：寝れない状況ではあるものの、上司と積極的にコミュニケーションをとることで改善しようとしています。
        悪い点：従業員は、残業が多くて睡眠時間を確保できていないです。残業時間を減らすように工夫が必要です。

        
        """
        prompt = prompt_template.format(note_list=note_list)

        # ドメインオブジェクトに変換してLLMに渡す
        messages = [Message(role="user", content=prompt)]
        schema = {
            "type": "object",
            "properties": {
                "summery": {
                    "type": "object",
                    "properties": {
                        "goodPoint": {
                            "type": "string",
                            "description": "良い点の要約"
                        },
                        "badPoint": {
                            "type": "string",
                            "description": "悪い点の要約"
                        }
                    },
                    "required": ["goodPoint", "badPoint"]
                }
            },
            "required": ["summery"]
        }

        try:
            # ゲートウェイ（インフラ層）を呼び出してLLMからの応答を取得
            generated_text = await self._llm_client.chat(messages, schema=schema)

            if isinstance(generated_text, dict) and "summery" in generated_text:
                return {"success": True, "summery": generated_text["summery"]}
            else:
                # LLMClientの実装によっては発生しうる
                return {"success": False, "error": "LLMから予期しない形式の応答がありました。"}
        except Exception as e:
            # エラーログの記録をここに実装するとより良い
            return {"success": False, "error": f"LLMとの通信でエラーが発生しました: {str(e)}"}
        