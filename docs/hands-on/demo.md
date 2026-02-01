# Hands-on Demo 手順

## 事前準備

### 1) GitHub Codespaces を開く

### 2) Gemini CLI Companion をインストール

### 3) npm install の完了を待つ

## スキルファイルの導入

### A) URL からインストール

```bash
gemini skills install https://github.com/CobaltSato/react-grid-game-rendering-skill/blob/main/react-css-grid-game-rendering.skill --scope workspace
gemini skills install https://github.com/CobaltSato/react-grid-game-rendering-skill/blob/main/avax-like-frontend-design.skill --scope workspace
```

### B) ローカルファイルからインストール

```bash
gemini skills install ./react-css-grid-game-rendering.skill --scope workspace
gemini skills install ./avax-like-frontend-design.skill --scope workspace
```

## コントラクト作成（10x10 座標の保存・取得）

プレイヤーの **10x10 の座標**を保存・取得できるコントラクトを作成する。

- **位置を初期化する関数**
- **1 歩移動する関数**

出力先:

- **ABI**: `.env.local.example` に保存
- **Solidity**: `contracts/` に出力

## テスト用 AVAX（ガス代）の取得とデプロイ

- **Faucet**: `https://build.avax.network/console/primary-network/faucet`
- **Remix**: `https://remix.ethereum.org/`

## アプリ作成（10x10 の簡単な 2D グリッドゲーム）

以下の要件で作成する:

- `react-css-grid-game-rendering` を有効化する
- 日本語で `docs/task.md` を生成し、**フェーズを 5 つ**に分けてタスクリストを作成する
- タスク完了次第、`task.md` にチェックを入れて保存する
- フェーズごとにユーザに検収を促してから次のフェーズへ進める
- プレイヤーをキーボードで移動し、コントラクトに座標を書き込む
- 参照: `PositionTracker.sol` / `.env.local`（コントラクトアドレス・ABI）
