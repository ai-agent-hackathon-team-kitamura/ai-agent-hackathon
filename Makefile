# フロントエンドのデプロイ
deploy-front:
	cd front-web && \
	npm run build && \
	gcloud builds submit . \
	  --tag asia-northeast1-docker.pkg.dev/team-kitamura-dev/echo-repo/front-web && \
	gcloud run deploy front-web \
	  --image asia-northeast1-docker.pkg.dev/team-kitamura-dev/echo-repo/front-web \
	  --platform managed \
	  --region asia-northeast1 \
	  --allow-unauthenticated

# AI APIのデプロイ
deploy-api:
	cd ai-api && \
	poetry export -f requirements.txt --without-hashes > requirements.txt && \
	gcloud builds submit . \
	  --tag asia-northeast1-docker.pkg.dev/team-kitamura-dev/echo-repo/ai-api && \
	gcloud run deploy ai-api \
	  --image asia-northeast1-docker.pkg.dev/team-kitamura-dev/echo-repo/ai-api \
	  --platform managed \
	  --region asia-northeast1 \
	  --allow-unauthenticated

# 両方まとめてデプロイ
deploy-all: deploy-front deploy-api
