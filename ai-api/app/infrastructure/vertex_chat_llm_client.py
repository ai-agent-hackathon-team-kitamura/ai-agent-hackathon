import os
from langchain_google_vertexai import ChatVertexAI
from app.domain.chat import Message
from app.services.gateways.chat_llm_client import ChatLLMClient
from app.infrastructure.config import vertex_config


class VertexChatLLMClient(ChatLLMClient):
    """VertexAI クライアントクラス"""
    
    def __init__(self):
         # LangChain の ChatVertexAI は初期化時に ADC を自動取得
         self._llm = ChatVertexAI(
             project=vertex_config.project_id,
             location=vertex_config.location,
             model=vertex_config.model_name,
             temperature=float(os.getenv("TEMPERATURE", 0.7)),
             max_output_tokens=int(os.getenv("MAX_TOKENS", 1024)),
         )
    
    async def chat(self, messages: list[Message]) -> str:
        """
        Messageを配列で受け取り、メッセージを返す
        """
        # LangChain形式に変換
        langchain_messages = []
        for message in messages:
            langchain_messages.append({
                "role": message.role,
                "content": message.content
            })
        response = await self._llm.ainvoke(langchain_messages)
        return response.content