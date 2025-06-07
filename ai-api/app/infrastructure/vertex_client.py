"""VertexAI クライアント"""

from typing import Optional
import vertexai
from vertexai.generative_models import GenerativeModel
from app.infrastructure.config import vertex_config


class VertexAIClient:
    """VertexAI クライアントクラス"""
    
    def __init__(self):
        self._model: Optional[GenerativeModel] = None
        self._initialized = False
    
    def initialize(self) -> None:
        """VertexAIクライアントを初期化"""
        if self._initialized:
            return
            
        # 設定の妥当性チェック
        vertex_config.validate()
        
        # 認証情報の環境変数を設定
        import os
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = vertex_config.credentials_path
        
        # VertexAIを初期化
        vertexai.init(
            project=vertex_config.project_id,
            location=vertex_config.location
        )
        
        # Geminiモデルを初期化
        self._model = GenerativeModel(vertex_config.model_name)
        self._initialized = True
    
    def get_model(self) -> GenerativeModel:
        """Geminiモデルを取得"""
        if not self._initialized:
            self.initialize()
        return self._model
    
    async def generate_text(self, prompt: str) -> str:
        """テキストを生成"""
        model = self.get_model()
        response = model.generate_content(prompt)
        return response.text


# グローバルクライアントインスタンス
vertex_client = VertexAIClient()
