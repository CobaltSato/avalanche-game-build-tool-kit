# Avalanche + AI 開発 Hands-on Demo

> **概要**: Gemini CLI を使って、Avalanche ブロックチェーン上で動くシンプルな 2D グリッドゲームを作成します。

---

## 🎯 デモのゴール

- **10x10 グリッド**上でプレイヤーを移動
- **キーボード操作**で上下左右に移動
- **Avalanche Fuji テストネット**に座標を保存・取得

---

## 🔗 リソース一覧

### GitHub リポジトリ

https://github.com/CobaltSato/avalanche-build-games-tool-kit

### AVAX 取得シート

https://docs.google.com/spreadsheets/d/1j3cgXLuGrxRjVCi7P7tkAr5IaEnnv7jPtV3Jrz2aDiU/edit?gid=949602416#gid=949602416

### デプロイ用ファイル（予備）

https://drive.google.com/drive/folders/1CSodRovk0S2Wu0NNTlFl3z0rEF0tgHM2?usp=drive_link

### Explorer & Remix

- Snowtrace: https://c.testnet.snowtrace.io/
- Remix IDE: https://remix.ethereum.org/

---

## 📋 デモ手順

---

### Phase 0: 事前準備

---

#### 0-1. GitHub Codespaces を開く

> 🎬 **動画**: https://drive.google.com/file/d/1UrczlI6B9qfMd0AC3AAxEXL6mF0-Tb4h/view?usp=sharing

> 💡 **Codespaces とは**: GitHub が提供するクラウド開発環境。ブラウザ上で VS Code が動作し、ローカル環境構築が不要です。

1. リポジトリで「Code」→「Codespaces」→「Create codespace on main」
2. VS Code がブラウザで起動するまで待つ

---

#### 0-2. Core Wallet 拡張機能をインストール

> 🎬 **動画（初期設定）**: https://drive.google.com/file/d/1bvtthuZ-Ihp4DHm6CUQByPeYL57S5eLg/view?usp=sharing

> 💡 **Core Wallet とは**: Avalanche 公式ウォレット。MetaMask より Avalanche に最適化されており、C-Chain（EVM互換）と X-Chain/P-Chain の両方に対応しています。

- **ダウンロード**: https://core.app/download
- Chrome 拡張機能としてインストール

---

#### 0-3. Codespaces Setup & Gemini CLI 起動

> 🎬 **動画**: https://drive.google.com/file/d/1xv2BBILRCIckLoGTJo_3bVvYZ5Lc7ylJ/view?usp=sharing

> 💡 **Gemini CLI とは**: Google の Gemini AI をターミナルから直接操作できるコマンドラインツール。ファイル編集、シェルコマンド実行、Web アクセスなどの機能を備えています。

```bash
npm run dev
gemini
```

**認証方法（今回は Google OAuth）:**

1. 表示されるマジックリンクをブラウザで開く
2. Google アカウントで認証
3. 認証トークンをコピー → ターミナルにペースト

---

### Phase 1: スキルファイルの導入

> 🎬 **動画**: https://drive.google.com/file/d/1tU4LBaKzDpOrcI3pVPzgn749ieJuuN7s/view?usp=sharing

> 💡 **スキル（Skills）とは**: Gemini CLI に専門知識をオンデマンドで適用する仕組み。スキルを使うことで、特定のタスク（ゲーム開発、API 設計など）に最適化された振る舞いを AI に与えられます。

```bash
gemini skills install ./react-css-grid-game-rendering.skill --scope workspace
```

インストール確認:

```bash
/skills list
```

---

### Phase 2: スマートコントラクト作成

> 🎬 **動画**: https://drive.google.com/file/d/1rMbl0TzMxUTrS5YydppEGE9m-bkxD_Mj/view?usp=sharing

> 💡 **Gemini CLI のツール**: Gemini はファイル読み書き、シェルコマンド実行、Web アクセスなどのツールを持っています。ユーザーの確認を得てから実行されます。

**Gemini に依頼:**

```
プレイヤーの 10x10 座標を保存・取得できるコントラクトを作成して。

要件:
- 位置を初期化する関数
- 1歩移動する関数（上下左右）
- 座標は 0-9 の範囲に制限
- getPosition(address _player)で位置取得

出力先:
- Solidity: contracts/PositionTracker.sol
- ABI: .env.local.example に追記
```

---

### Phase 3: テスト AVAX 取得 & デプロイ

> 🎬 **動画**: https://drive.google.com/file/d/14eKzVflwBh5OpGP0DB-35DkGC2WW_9lI/view?usp=sharing

> 💡 **Fuji テストネット**: Avalanche のテスト環境。本番（Mainnet）と同じ仕組みで、無料のテスト AVAX を使ってテスト可能。

#### 3-1. テスト AVAX を取得

- **Faucet**: https://build.avax.network/console/primary-network/faucet
- ウォレットアドレスを入力 → 「Request」

> 📝 AVAX が届かない場合は、[AVAX 取得シート](https://docs.google.com/spreadsheets/d/1j3cgXLuGrxRjVCi7P7tkAr5IaEnnv7jPtV3Jrz2aDiU/edit?gid=949602416#gid=949602416) にアドレスを記入してください。

#### 3-2. Remix でデプロイ

1. **Remix** を開く: https://remix.ethereum.org/
2. `contracts/PositionTracker.sol` をコピー
3. コンパイル（Solidity 0.8.x）
4. 「Deploy」→ 「Injected Provider - Core」を選択
5. ネットワークを **Fuji (C-Chain)** に変更
6. デプロイ → コントラクトアドレスをコピー

> ⚠️ **デプロイがうまくいかない場合**: [予備ファイル](https://drive.google.com/drive/folders/1CSodRovk0S2Wu0NNTlFl3z0rEF0tgHM2?usp=drive_link) を使用

#### 3-3. 環境変数を設定

```bash
cp .env.local.example .env.local
```

`.env.local` を編集し、コントラクトアドレスを設定。

---

### Phase 4: アプリ作成（5フェーズ）

> 💡 **タスク管理**: Gemini にフェーズ分割でタスクを管理させることで、段階的に検収しながら進められます。

**Gemini に依頼:**

```
10x10 の 2D グリッドゲームを作成してください。

要件:
- react-css-grid-game-rendering スキルを使用
- 日本語で docs/task.md にタスクリストを生成（5フェーズ）
- タスク完了ごとに task.md にチェックを入れる
- フェーズごとにユーザー検収を促す
- キーボード（↑↓←→）でプレイヤーを移動
- 移動時にコントラクトに座標を書き込む

参照ファイル:
- contracts/PositionTracker.sol
- .env.local（コントラクトアドレス・ABI）
```

---

#### フェーズ 1: グリッド表示

> 🎬 **動画**: https://drive.google.com/file/d/1NblXJ6mcxZ7gc-1lyXApNme85A0mHY_Z/view?usp=sharing

- 10x10 の CSS Grid を作成
- プレイヤーを表示

---

#### フェーズ 2: キーボード操作

> 🎬 **動画**: https://drive.google.com/file/d/1OD5A1mqihJUUL5e63hLW_CCe-cjDGjv_/view?usp=sharing

- 矢印キーでプレイヤー移動
- 境界チェック（0-9 の範囲）

---

#### フェーズ 3: コントラクト連携

> 🎬 **動画**: https://drive.google.com/file/d/1B9L8jJwI4ztb5trA0Ny_SYYV6mlt3Hf3/view?usp=sharing

- ウォレット接続
- 座標を読み込み

---

#### フェーズ 4: 座標の書き込み

> 🎬 **動画**: https://drive.google.com/file/d/1A99gq8F9JRR7rXmFXlU8Q7wo4KI_iF1b/view?usp=sharing

- 移動時にトランザクション送信
- ローディング表示

---

#### フェーズ 5: 仕上げ

> 🎬 **動画**: https://drive.google.com/file/d/1x7BfXj8-_WSFdMlcGyaiBR6xhDvN3nvs/view?usp=sharing

- デザイン調整（AVAX風）
- エラーハンドリング

---

### Phase 5: 動作確認

```bash
npm run dev
```

1. `localhost:3000` を開く
2. Core Wallet を接続
3. 矢印キーでプレイヤーを移動
4. トランザクションを承認
5. 座標がブロックチェーンに保存されることを確認

---

## 🎉 デモ完了

| 成果物 | 説明 |
|--------|------|
| `PositionTracker.sol` | 座標保存コントラクト |
| グリッドゲーム UI | React + CSS Grid |
| ウォレット連携 | Core Wallet + ethers.js |

---

## 🎨 Bonus: デザイン仕上げ

> 🎬 **動画**: https://drive.google.com/file/d/1edaxTkCy3_Afhisimki12p-R9ea04Hx2/view?usp=sharing

**スキルのインストール:**

1. GitHub からダウンロード: https://github.com/CobaltSato/react-grid-game-rendering-skill
2. インストール:

```bash
gemini skills install ./avax-like-frontend-design.skill --scope workspace
```

**Gemini に依頼:**

```
avax-like-frontend-design スキルを使って、
グリッドゲームの UI をプロ品質に仕上げて。

要件:
- Avalanche ブランドカラー (#E84142)
- グリッドにホバーエフェクト
- プレイヤーにアニメーション
- ダークモード基調
```

---

## 📚 Claude Code ガイド

| ドキュメント | URL |
|-------------|-----|
| Claude 概要 | https://github.com/CobaltSato/avalanche-build-games-tool-kit/blob/main/docs/Guide.md |
| Claude クイックスタート | https://github.com/CobaltSato/avalanche-build-games-tool-kit/blob/main/docs/Claude-QuickStart.md |
