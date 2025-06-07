"""AI関連のアプリケーションサービス"""

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
            # 会話履歴全体をコンテキストとして構築
            conversation_context = ""
            for message in messages:
                # Pydanticモデルの場合
                if hasattr(message, 'role') and hasattr(message, 'content'):
                    role = message.role
                    content = message.content
                    if role == "user":
                        conversation_context += f"ユーザー: {content}\n"
                    elif role == "assistant":
                        conversation_context += f"アシスタント: {content}\n"
                # 辞書の場合（後方互換性）
                elif isinstance(message, dict):
                    role = message.get("role", "user")
                    content = message.get("content", "")
                    if role == "user":
                        conversation_context += f"ユーザー: {content}\n"
                    elif role == "assistant":
                        conversation_context += f"アシスタント: {content}\n"
                # 文字列の場合（後方互換性）
                elif isinstance(message, str):
                    conversation_context += f"ユーザー: {message}\n"
            
            # 最後にAIの返答を求めるプロンプトを追加
            prompt = f"{conversation_context}アシスタント: "
            
            # VertexAI経由でテキスト生成
            generated_text = await self.vertex_client.generate_text(prompt)
            
            return {
                "success": True,
                "generated_text": generated_text,
                "conversation_context": conversation_context.strip()
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "conversation_context": None
            }


# グローバルサービスインスタンス
ai_service = AIService()
