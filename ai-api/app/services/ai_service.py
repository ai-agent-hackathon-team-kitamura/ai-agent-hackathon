from typing import List, Dict, Union
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from app.infrastructure.vertex_client import vertex_client


class AIService:
    """AI関連のビジネスロジックを担当するサービス"""
    
    def __init__(self):
        self.vertex_client = vertex_client
    
    async def chat_completion(self, messages: list) -> dict:
        """チャット形式での会話"""
        if not messages:
            return {"success": False, "error": "メッセージが空です"}
        
        try:
            # messages 配列を LangChain Message に変換
            lc_messages = []
            for m in messages:
                role = m.role if hasattr(m, "role") else m.get("role", "user")
                content = m.content if hasattr(m, "content") else m.get("content", "")
                if role == "user":
                    lc_messages.append(HumanMessage(content=content))
                elif role == "assistant":
                    lc_messages.append(AIMessage(content=content))
                elif role == "system":
                    lc_messages.append(SystemMessage(content=content))

            # Vertex AI (Gemini) で生成
            response = await self.vertex_client.chat(lc_messages)

            return {
                "success": True,
                "generated_text": response.content,
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e),
            }


# グローバルサービスインスタンス
ai_service = AIService()
