# Avalanche + AI 開発 Hands-on Demo

> **概要**: Gemini CLI を使って、Avalanche ブロックチェーン上で動くシンプルな 2D グリッドゲームを作成します。

---

## 🎯 デモのゴール

- **10x10 グリッド**上でプレイヤーを移動
- **キーボード操作**で上下左右に移動
- **Avalanche Fuji テストネット**に座標を保存・取得

---

## 📋 デモ手順

---

### Phase 0: 事前準備（5分）

---

#### 0-1. GitHub Codespaces を開く

> 💡 **Codespaces とは**: GitHub が提供するクラウド開発環境。ブラウザ上で VS Code が動作し、ローカル環境構築が不要です。

1. リポジトリで「Code」→「Codespaces」→「Create codespace on main」
2. VS Code がブラウザで起動するまで待つ

https://github.com/CobaltSato/avalanche-build-games-tool-kit/tree/main


#### 0-2. Core Wallet 拡張機能をインストール

> 💡 **Core Wallet とは**: Avalanche 公式ウォレット。MetaMask より Avalanche に最適化されており、C-Chain（EVM互換）と X-Chain/P-Chain の両方に対応しています。

- ダウンロード: https://core.app/download
- Chrome 拡張機能としてインストール

#### 0-4. Gemini CLI を起動・認証

> 💡 **Gemini CLI とは**: Google の Gemini AI をターミナルから直接操作できるコマンドラインツール。ファイル編集、シェルコマンド実行、Web アクセスなどの機能を備えています。

**認証方法は3つ:**

| 方法 | 特徴 | コマンド |
|------|------|---------|
| **Google OAuth** | 無料枠あり、簡単 | `gemini` → ブラウザ認証 |
| **API Key** | モデル選択可能 | `export GEMINI_API_KEY="..."` |
| **Vertex AI** | エンタープライズ向け | `export GOOGLE_GENAI_USE_VERTEXAI=true` |

**今回は Google OAuth（最も簡単）:**

```bash
gemini
```

1. 表示されるマジックリンクをブラウザで開く
2. Google アカウントで認証
3. 認証トークンをコピー → ターミナルにペースト

**便利なオプション:**

```bash
# 初期プロンプト付きで起動
gemini -i "このコードベースを説明して"

# 前回のセッションを再開
gemini --resume latest

# 全ツール実行を自動承認（YOLO モード）
gemini --yolo
```

---

### Phase 1: スキルファイルの導入（2分）

---

> 💡 **スキル（Skills）とは**: Gemini CLI に専門知識をオンデマンドで適用する仕組み。スキルを使うことで、特定のタスク（ゲーム開発、API 設計など）に最適化された振る舞いを AI に与えられます。

#### スキルの仕組み

**スキルファイルの構造（SKILL.md）:**

```markdown
---
name: my-skill-name
description: スキルの説明（Gemini がいつ使うか判断する材料）
---

# 詳細な指示

このスキルが有効な時、あなたは以下のように振る舞います：
1. ...
2. ...
```

**スキルの発見優先順位:**

| 優先度 | 場所 | 用途 |
|-------|------|------|
| **高** | `.gemini/skills/`（Workspace） | プロジェクト固有、チーム共有 |
| **中** | `~/.gemini/skills/`（User） | 個人用、全プロジェクト共通 |
| **低** | Extension Skills | 拡張機能にバンドル |

---

#### 方法 A: URL から直接インストール（推奨）

```bash
gemini skills install https://github.com/CobaltSato/react-grid-game-rendering-skill/blob/main/react-css-grid-game-rendering.skill --scope workspace

gemini skills install https://github.com/CobaltSato/react-grid-game-rendering-skill/blob/main/avax-like-frontend-design.skill --scope workspace

gemini extensions install https://github.com/ankitchiplunkar/frontend-design
```

**インストール後、スキルをリロード:**

```bash
# Gemini CLI 内で実行
/skills reload

# インストール確認
/skills list
```

---

#### 方法 B: ローカルファイルからインストール

```bash
# ダウンロード後
gemini skills install ./react-css-grid-game-rendering.skill --scope workspace
gemini skills install ./avax-like-frontend-design.skill --scope workspace
```

---

#### スキル管理コマンド一覧

```bash
# スキル一覧
gemini skills list

# Git リポジトリからインストール
gemini skills install https://github.com/user/repo.git

# モノレポの特定パスからインストール
gemini skills install https://github.com/org/skills.git --path skills/frontend

# アンインストール
gemini skills uninstall my-skill --scope workspace

# 有効化/無効化
gemini skills enable my-skill
gemini skills disable my-skill --scope workspace
```

> 📝 **Tips**: `.skill` ファイルは `.zip` に拡張子を変えると解凍可能。Claude のスキルも Gemini の skill creator で変換できます。

---

### Phase 2: スマートコントラクト作成（5分）

---

> 💡 **Gemini CLI のツール**: Gemini はファイル読み書き、シェルコマンド実行、Web アクセスなどのツールを持っています。ユーザーの確認を得てから実行されます。

**主要ツール:**

| ツール | 機能 |
|--------|------|
| `read_file` | ファイル内容を読み取り |
| `write_file` | ファイルを作成・上書き |
| `edit_file` | ファイルの一部を編集 |
| `run_shell_command` | シェルコマンドを実行 |
| `web_fetch` | URL からコンテンツを取得 |

---

#### Gemini に依頼

```
プレイヤーの 10x10 座標を保存・取得できるコントラクトを作成して。

要件:
- 位置を初期化する関数
- 1歩移動する関数（上下左右）
- 座標は 0-9 の範囲に制限

出力先:
- Solidity: contracts/PositionTracker.sol
- ABI: .env.local.example に追記
```

---

#### 出力されるファイル

| ファイル | 内容 |
|---------|------|
| `contracts/PositionTracker.sol` | Solidity コントラクト |
| `.env.local.example` | ABI（JSON 形式） |

> 📝 **参考**: [Solidity ベストプラクティス](https://cursor.directory/solidity-development-best-practices)

---

### Phase 3: テスト AVAX 取得 & デプロイ（5分）

---

> 💡 **Fuji テストネット**: Avalanche のテスト環境。本番（Mainnet）と同じ仕組みで、無料のテスト AVAX を使ってテスト可能。C-Chain は EVM 互換なので、Remix や ethers.js がそのまま使えます。

---

#### 3-1. テスト AVAX を取得

- **Faucet**: https://build.avax.network/console/primary-network/faucet
- ウォレットアドレスを入力 → 「Request」

> 📝 AVAX が届かない場合は、ウォレットアドレスを共有いただければ送金します。

---

#### 3-2. Remix でデプロイ

1. **Remix** を開く: https://remix.ethereum.org/
2. `contracts/PositionTracker.sol` をコピー
3. コンパイル（Solidity 0.8.x）
4. 「Deploy」→ 「Injected Provider - Core」を選択
5. ネットワークを **Fuji (C-Chain)** に変更
6. デプロイ → コントラクトアドレスをコピー

---

#### 3-3. 環境変数を設定

```bash
# .env.local を作成
cp .env.local.example .env.locals
```
---

### Phase 4: アプリ作成（10分）

---

> 💡 **タスク管理**: Gemini にフェーズ分割でタスクを管理させることで、段階的に検収しながら進められます。

---

#### Gemini に依頼

```
10x10 の 2D グリッドゲームを作成して。

要件:
- react-css-grid-game-rendering スキルを使用
- 日本語で docs/task.md にタスクリストを生成（5フェーズ）
- タスク完了ごとに task.md にチェックを入れる
- フェーズごとにユーザーの確認を促す
- キーボード（↑↓←→）でプレイヤーを移動
- 移動時にコントラクトに座標を書き込む

参照ファイル:
- contracts/PositionTracker.sol
- env.local.example（コントラクトアドレス・ABI）
```

---

#### 生成されるタスクリスト（例）

```markdown
# task.md

## Phase 1: グリッド表示
- [ ] 10x10 の CSS Grid を作成
- [ ] プレイヤーを表示

## Phase 2: キーボード操作
- [ ] 矢印キーでプレイヤー移動
- [ ] 境界チェック（0-9 の範囲）

## Phase 3: コントラクト連携
- [ ] ウォレット接続
- [ ] 座標を読み込み

## Phase 4: 座標の書き込み
- [ ] 移動時にトランザクション送信
- [ ] ローディング表示

## Phase 5: 仕上げ
- [ ] デザイン調整（AVAX風）
- [ ] エラーハンドリング
```

---

### Phase 5: 動作確認（3分）

---

#### 5-1. 開発サーバー起動

```bash
npm run dev
```

---

#### 5-2. ブラウザで確認

1. `localhost:3000` を開く
2. Core Wallet を接続
3. 矢印キーでプレイヤーを移s
4. トランザクションを承認
5. 座標がブロックチェーンに保存されることを確認

---

## 🎉 デモ完了

### 作ったもの

| 成果物 | 説明 |
|--------|------|
| `PositionTracker.sol` | 座標保存コントラクト |
| グリッドゲーム UI | React + CSS Grid |
| ウォレット連携 | Core Wallet + ethers.js |

---

## 📚 Gemini CLI クイックリファレンス

### 起動オプション

```bash
gemini                          # 対話モードで起動
gemini -m gemini-2.5-flash      # モデル指定
gemini -i "プロンプト"           # 初期プロンプト付き
gemini --resume latest          # 前回セッション再開
gemini --yolo                   # 全ツール自動承認
gemini -p "質問" --output-format json  # 非対話・JSON出力
```

### スラッシュコマンド（対話モード内）

```bash
/skills list      # スキル一覧
/skills reload    # スキル再読み込み
/help             # ヘルプ表示
```

### スキル管理（ターミナル）

```bash
gemini skills list                              # 一覧
gemini skills install <url/path> --scope workspace  # インストール
gemini skills uninstall <name>                  # アンインストール
gemini skills enable <name>                     # 有効化
gemini skills disable <name>                    # 無効化
```

---

## 📚 参考リンク

| リソース | URL |
|---------|-----|
| Core Wallet | https://core.app/download |
| Fuji Faucet | https://build.avax.network/console/primary-network/faucet |
| Remix IDE | https://remix.ethereum.org/ |
| スキルファイル | https://github.com/CobaltSato/react-grid-game-rendering-skill |
| Solidity ベストプラクティス | https://cursor.directory/solidity-development-best-practices |
| Gemini CLI ドキュメント | https://github.com/google-gemini/gemini-cli |


anthropics公式スキル集
- https://github.com/anthropics/claude-code/tree/main/plugins

gemini extensions
https://geminicli.com/extensions/

Anthropicハッカソン優勝者の設定
- https://github.com/affaan-m/everything-claude-code

ClaudeによるPhaserjs・Playwrightのゲーム開発手順

- https://www.youtube.com/watch?v=QPZCMd5REP8
- https://github.com/chongdashu/phaserjs-oakwoods

---

## 🎨 Bonus: Gemini + frontend-design によるデザイン仕上げ

> 💡 **frontend-design スキル**: プロダクション品質のフロントエンドデザインを生成するためのスキル。カラーパレット、タイポグラフィ、レイアウト、アニメーションなどの設計原則に基づいて UI を洗練させます。

---

### 事前準備: frontend-design スキルの有効化

```bash
# Extension をインストール（既にインストール済みならスキップ）
gemini extensions install https://github.com/ankitchiplunkar/frontend-design

# スキルを有効化
gemini skills enable frontend-design

# 確認
/skills list
```

---

### Gemini にデザイン仕上げを依頼

```
frontend-design スキルを使って、グリッドゲームのUIをプロ品質に仕上げて。

要件:
- Avalanche ブランドカラー（#E84142 レッド、#000000 ブラック）を活用
- グリッドセルにホバーエフェクトを追加
- プレイヤーアイコンにアニメーション（パルス or バウンス）
- ウォレット接続ボタンをモダンなデザインに
- トランザクション状態のローディングインジケーター
- レスポンシブ対応（モバイルでも操作可能）
- ダークモード基調

参照:
- 現在の UI コンポーネント（app/ 配下）
- Avalanche 公式サイトのデザイン: https://www.avax.network/
```

---

### 期待される出力

| 改善項目 | Before | After |
|---------|--------|-------|
| カラー | デフォルト | Avalanche ブランドカラー |
| グリッド | 単純な border | グラデーション + ホバー効果 |
| プレイヤー | 静的な表示 | パルスアニメーション |
| ボタン | 基本的なスタイル | グラス morphism / ネオン効果 |
| 状態表示 | テキストのみ | スピナー + プログレスバー |

---

### デザインのカスタマイズ例

```
# 別のテーマを試す
「サイバーパンク風のネオンテーマに変更して」

# アクセシビリティ強化
「WCAG AA 準拠のコントラスト比を確保して」

# ミニマリスト
「余計な装飾を削除してミニマルなデザインに」
```

---

### Tips

- **段階的に適用**: 一度に全てを変更せず、コンポーネントごとに確認
- **スクリーンショット比較**: 変更前後を比較して意図通りか確認
- **Tailwind CSS との相性**: frontend-design は Tailwind クラスを活用した出力が得意
- **フィードバックループ**: 「もっとコントラストを上げて」など具体的に指示