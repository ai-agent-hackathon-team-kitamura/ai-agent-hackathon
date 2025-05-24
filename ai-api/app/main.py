"""FastAPI アプリケーションのメインエントリーポイント"""

from fastapi import FastAPI

app = FastAPI(
    title="AI API",
    version="0.1.0",
    description="AI API",
)


@app.get("/")
async def root():
    """ルートエンドポイント"""
    return {"message": "Hello World from AI API!"}


@app.get("/health")
async def health_check():
    """ヘルスチェックエンドポイント"""
    return {"status": "healthy", "version": "0.1.0"}
