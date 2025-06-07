from typing import Protocol, List
from app.domain.chat import Message

class ChatLLMClient(Protocol):
    async def chat(self, messages: List[Message]) -> str: ...