# front-web (Next.js × TypeScript)

## 概要

Next.js（Pages Router + TypeScript）で構築した最小構成のフロントエンドアプリケーションです。  
静的エクスポート（`next export`）にも対応しています。

---

## 使用技術

- Next.js（Pages Router 構成）

---

## 前提条件

| 必要ソフト | 推奨バージョン | 確認コマンド    |
| ---------- | -------------- | --------------- |
| Node.js    | v18.x LTS 以上 | `node -v`       |
| npm        | v9.x 以上      | `npm -v`        |
| Git        | 任意           | `git --version` |

---

## セットアップ手順

```bash
# 1. リポジトリをクローン
git clone https://github.com/ai-agent-hackathon-team-kitamura/ai-agent-hackathon.git
cd front-web
```

```bash
# 2. 依存関係をインストール
npm install
```

## 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開くと「Hello, World!」が表示されます。

## ビルド & 静的エクスポート

```bash
npm run build
npm run export
```

- out/ ディレクトリに静的ファイル一式が出力されます。
- 出力した静的ファイルは好きなホスティングサービスへデプロイできます。
