# --- ベースイメージ（Poetry対応） ---
FROM python:3.11-slim

# --- 環境変数 ---
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV POETRY_HOME="/opt/poetry"
ENV PATH="$POETRY_HOME/bin:$PATH"
ENV PORT=8080

# --- 必要パッケージ ---
RUN apt-get update && apt-get install -y curl build-essential

# --- Poetryインストール ---
RUN curl -sSL https://install.python-poetry.org | python3 -

# --- 作業ディレクトリ ---
WORKDIR /app

# --- 依存ファイルをコピーしインストール ---
COPY pyproject.toml poetry.lock* ./
RUN poetry install --no-root --only main

# --- アプリの全体をコピー ---
COPY . .

# --- ポートを明示（Cloud Run用） ---
EXPOSE 8080

# --- アプリ起動（FastAPI） ---
CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
