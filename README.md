# ai-agent-hackathon
## デプロイ方法
下記の設定がされていること

```bash
gcloud auth login
gcloud config set project team-kitamura-dev
gcloud config set run/region asia-northeast1
```

ビルド・デプロイコマンド
```bash
make deploy-front
make deploy-api
```