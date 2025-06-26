FROM node:18-alpine

WORKDIR /app

# package.json と lock をコピー
COPY package*.json ./

# 依存をインストール
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# Next.js をビルド
RUN npm run build

# ポート環境変数
ENV PORT=8080

# Next.js を起動（Cloud Run ではこのポートでリッスンが必要）
CMD ["npx", "next", "start", "-p", "8080"]
