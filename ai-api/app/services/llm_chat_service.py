from typing import Protocol, List
from app.domain.chat import Chat, Message


class ChatLLMClient(Protocol):
    """外部 LLM とのチャット用クライアント（依存性逆転）"""

    async def chat(self, messages: list[dict]) -> str:
        """与えられたメッセージ履歴に対し 1 ターンの応答を返す"""


class LLMChatService:
    """LLM を用いたチャット応答生成のアプリケーションサービス"""

    def __init__(self, llm_client: ChatLLMClient):
        self._llm_client = llm_client

    async def invoke(self, messages: List[Message]) -> dict:
        """ユーザー入力を受け取り、LLM から応答を生成して返す"""
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
            generated_text = await self._llm_client.chat(langchain_messages)              
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
