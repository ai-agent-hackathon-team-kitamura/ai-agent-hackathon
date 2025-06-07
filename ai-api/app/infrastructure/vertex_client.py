import os
from langchain_google_vertexai import ChatVertexAI
from app.infrastructure.config import vertex_config


class VertexAIClient:
    """VertexAI クライアントクラス"""
    
    def __init__(self):
         # LangChain の ChatVertexAI は初期化時に ADC を自動取得
         self._llm = ChatVertexAI(
             project=vertex_config.project_id,
             location=vertex_config.location,
             model=vertex_config.model_name,           # 例: gemini-2.0-flash
             temperature=float(os.getenv("TEMPERATURE", 0.7)),
             max_output_tokens=int(os.getenv("MAX_TOKENS", 1024)),
         )
    
    async def chat(self, messages):
        """
        LangChain Message オブジェクト（System/Human/AI）を配列で受け取り、
        非同期で 1 ターン返すだけ
        """
        return await self._llm.ainvoke(messages)
# グローバルクライアントインスタンス
vertex_client = VertexAIClient()