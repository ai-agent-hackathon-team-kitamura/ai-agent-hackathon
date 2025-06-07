"""全てのルーティングを管理"""

import os
from fastapi import APIRouter
from app.services.ai_service import ai_service
from app.spec import (
    ChatRequest, ChatResponse, HealthResponse
)

router = APIRouter()


@router.get("/")
async def root():
    """ルートエンドポイント"""
    return {"message": "Hello World from AI API!"}


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """ヘルスチェックエンドポイント"""
    return {"status": "healthy", "version": "0.1.0"}




@router.post("/ai/chat", response_model=ChatResponse)
async def chat_completion(request: ChatRequest):
    """
    チャット形式での会話エンドポイント
    
    会話履歴を考慮してGemini AIが返答を生成します。
    roleは'user'（ユーザー）または'assistant'（AI）を指定してください。
    """
    result = await ai_service.chat_completion(request.messages)
    return result
