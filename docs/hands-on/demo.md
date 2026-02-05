# Avalanche + AI 開発 Hands-on Demo

> **概要**: Gemini CLI を使って、Avalanche ブロックチェーン上で動くシンプルな 2D グリッドゲームを作成します。

---

## 🎯 デモのゴール

- **10x10 グリッド**上でプレイヤーを移動
- **キーボード操作**で上下左右に移動
- **Avalanche Fuji テストネット**に座標を保存・取得

---

## 🔗 リソース・動画リンク

### GitHub リポジトリ

- https://github.com/CobaltSato/avalanche-build-games-tool-kit

### その他リソース

| リソース | URL |
|---------|-----|
| Core Wallet ダウンロード | https://core.app/download |
| AVAX 取得シート | [スプレッドシート](https://docs.google.com/spreadsheets/d/1j3cgXLuGrxRjVCi7P7tkAr5IaEnnv7jPtV3Jrz2aDiU/edit?gid=949602416#gid=949602416) |
| デプロイ用ファイル（予備） | [Google Drive](https://drive.google.com/drive/folders/1CSodRovk0S2Wu0NNTlFl3z0rEF0tgHM2?usp=drive_link) |
| Snowtrace Explorer | https://c.testnet.snowtrace.io/ |
| Remix IDE | https://remix.ethereum.org/ |

### Claude Code ガイド

| ドキュメント | URL |
|-------------|-----|
| Claude 概要 | https://github.com/CobaltSato/avalanche-build-games-tool-kit/blob/main/docs/Guide.md |
| Claude クイックスタート | https://github.com/CobaltSato/avalanche-build-games-tool-kit/blob/main/docs/Claude-QuickStart.md |

---

## 📋 デモ手順

---

### Phase 0: 事前準備（5分）

> 🎬 **動画**: [GitHub Codespaces 起動](https://drive.google.com/file/d/1UrczlI6B9qfMd0AC3AAxEXL6mF0-Tb4h/view?usp=sharing) | [Codespaces Setup](https://drive.google.com/file/d/1xv2BBILRCIckLoGTJo_3bVvYZ5Lc7ylJ/view?usp=sharing)

---

#### 0-1. GitHub Codespaces を開く

> 💡 **Codespaces とは**: GitHub が提供するクラウド開発環境。ブラウザ上で VS Code が動作し、ローカル環境構築が不要です。

1. リポジトリで「Code」→「Codespaces」→「Create codespace on main」
2. VS Code がブラウザで起動するまで待つ

#### 0-2. 環境の動作確認

Codespaces が起動したら、開発サーバーを起動して環境が正しくセットアップされているか確認します。

```bash
npm run dev
```

- ターミナルに `Local: http://localhost:3000` と表示されれば OK
- ポップアップで「Open in Browser」が表示されたらクリックして確認
- 問題があれば `npm ci` を実行して依存関係を再インストール

#### 0-3. Core Wallet 拡張機能をインストール

> 💡 **Core Wallet とは**: Avalanche 公式ウォレット。MetaMask より Avalanche に最適化されており、C-Chain（EVM互換）と X-Chain/P-Chain の両方に対応しています。
>
> 🎬 **動画**: [Core Wallet 初期設定](https://drive.google.com/file/d/1bvtthuZ-Ihp4DHm6CUQByPeYL57S5eLg/view?usp=sharing)

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

> 🎬 **動画**: [スキルのインストール](https://drive.google.com/file/d/1tU4LBaKzDpOrcI3pVPzgn749ieJuuN7s/view?usp=sharing)

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


#### 1-1. スキルのインストール

Gemini CLI を一度終了してからインストールします。

**Step 1**: スキルファイルを GitHub からダウンロード

- https://github.com/CobaltSato/react-grid-game-rendering-skill/tree/main

**Step 2**: ターミナルで実行（Gemini CLI の外で）

```bash
# Gemini CLI を終了
/quit

# ダウンロードしたファイルをプロジェクトルートに配置
mv ./docs/hands-on/react-css-grid-game-rendering.skill .

# スキルをインストール
gemini skills install ./react-css-grid-game-rendering.skill --scope workspace
```

**Step 3**: Gemini CLI 内でリロード

```bash
# Gemini CLI を起動
gemini

# スキルを再読み込み（Gemini CLI 内で）
/skills reload

# インストール確認
/skills list
```

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

> 🎬 **動画**: [コントラクト作成](https://drive.google.com/file/d/1rMbl0TzMxUTrS5YydppEGE9m-bkxD_Mj/view?usp=sharing)

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
- getPosition(address _player)で位置取得

出力先:
- Solidity: contracts/PositionTracker.sol
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

> 🎬 **動画**: [デプロイ手順](https://drive.google.com/file/d/14eKzVflwBh5OpGP0DB-35DkGC2WW_9lI/view?usp=sharing)

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
# .env.local を作成（.env.local.example をコピー）
cp .env.local.example .env.local
```

**コントラクトアドレスを設定:**

`.env.local` をエディタで開き、`NEXT_PUBLIC_CONTRACT_ADDRESS` にデプロイしたコントラクトアドレスを設定します。

```bash
# .env.local の例
NEXT_PUBLIC_CONTRACT_ADDRESS=0x1234567890abcdef...  # ← Remix でコピーしたアドレスをペースト
NEXT_PUBLIC_CONTRACT_ABI=[...]  # ← .env.local.example から既にコピー済み
```

> 📝 **重要**: コントラクトアドレスは Remix の「Deployed Contracts」セクションからコピーできます。

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

> 🎬 **動画**: [フェーズ5 完成](https://drive.google.com/file/d/1x7BfXj8-_WSFdMlcGyaiBR6xhDvN3nvs/view?usp=sharing)

---

#### 5-1. 開発サーバー起動

```bash
npm run dev
```

---

#### 5-2. ブラウザで確認

1. `localhost:3000` を開く
2. Core Wallet を接続
3. 矢印キーでプレイヤーを移動
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
| Cursor Directory | https://cursor.directory/ |

> 💡 **Cursor Directory** は AI コーディングアシスタント向けのプロンプト・ルール集。Solidity、React、Python など様々な言語のベストプラクティスが公開されています。

anthropics公式スキル集
- https://github.com/anthropics/claude-code/tree/main/plugins

gemini extensions
https://geminicli.com/extensions/

Anthropicハッカソン優勝者の設定
- https://github.com/affaan-m/everything-claude-code

🎮 Phaser 2D GameDev (Oak Woods Platformer) + Agent Skills
- https://www.youtube.com/watch?v=QPZCMd5REP8
- https://github.com/chongdashu/phaserjs-oakwoods
