"""AI関連のアプリケーションサービス"""

from typing import Protocol
from app.domain.chat import Chat, Message


class AIProvider(Protocol):
    """AI プロバイダーのインターフェース（依存性逆転の原則）"""
    
    async def chat(self, messages: list) -> str:
        """チャット"""
        ...


class AIService:
    """AI関連のビジネスロジックを担当するサービス"""
    
    def __init__(self, ai_provider: AIProvider):
        self.ai_provider = ai_provider
    
    async def chat_completion(self, messages: list) -> dict:
        """チャット形式での会話"""
        if not messages:
            return {"success": False, "error": "メッセージが空です"}
        
        try:
            # ドメインオブジェクトに変換
            chat = self._create_chat_from_messages(messages)
            
            # LangChain形式に変換
            langchain_messages = []
            for message in chat.messages:
                langchain_messages.append({
                    "role": message.role,
                    "content": message.content
                })
            
            # AIチャット
            response = await self.ai_provider.chat(langchain_messages)
            generated_text = response.content                     
            return {
                "success": True,
                "generated_text": generated_text
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
            }
    
    def _create_chat_from_messages(self, messages: list) -> Chat:
        """メッセージリストからChatドメインオブジェクトを作成"""
        domain_messages = []
        
        for message in messages:   
            domain_messages.append(Message(
                role=message.role,
                content=message.content
            ))
            
        return Chat(messages=domain_messages)
