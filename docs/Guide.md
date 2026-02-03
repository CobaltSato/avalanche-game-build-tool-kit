# Claude Code 機能ガイド

このプロジェクトには、開発を強力にサポートする Claude Code の設定一式が組み込まれています。
このガイドでは「何ができるのか」「どう使うのか」をやさしく説明します。

> **参考**: この設定は [everything-claude-code](https://github.com/affaan-m/everything-claude-code) の設計思想に基づいており、
> Anthropic x Forum Ventures ハッカソン優勝者が10ヶ月以上かけて本番環境で使い込んだベストプラクティスを取り入れています。

---

## 目次

1. [はじめに](#はじめに)
2. [クイックスタート](#クイックスタート)
3. [スラッシュコマンド](#スラッシュコマンド)
4. [エージェント](#エージェント)
5. [ルール](#ルール)
6. [スキル](#スキル)
7. [フック（自動チェック）](#フック自動チェック)
8. [MCP設定とコンテキスト管理](#mcp設定とコンテキスト管理)
9. [コンテキスト](#コンテキスト)
10. [TDDワークフロー](#tddワークフロー)
11. [よくある質問](#よくある質問)

---

## はじめに

`.claude/` ディレクトリの中に、Claude Code が参照する設定ファイルが入っています。

```
.claude/
├── agents/              # 専門エージェント（9個）
│   ├── planner.md
│   ├── architect.md
│   ├── tdd-guide.md
│   ├── code-reviewer.md
│   ├── security-reviewer.md
│   ├── build-error-resolver.md
│   ├── e2e-runner.md
│   ├── refactor-cleaner.md
│   └── doc-updater.md
├── commands/            # スラッシュコマンド（19個）
│   ├── plan.md
│   ├── tdd.md
│   ├── code-review.md
│   ├── e2e.md
│   ├── build-fix.md
│   ├── refactor-clean.md
│   ├── test-coverage.md
│   ├── verify.md
│   ├── checkpoint.md
│   ├── update-docs.md
│   ├── update-codemaps.md
│   ├── eval.md
│   ├── orchestrate.md
│   ├── skill-create.md
│   ├── learn.md
│   ├── evolve.md
│   ├── instinct-status.md
│   ├── instinct-import.md
│   └── instinct-export.md
├── rules/               # 常時適用ルール（8個）
│   ├── security.md
│   ├── coding-style.md
│   ├── testing.md
│   ├── git-workflow.md
│   ├── agents.md
│   ├── performance.md
│   ├── patterns.md
│   └── hooks.md
├── skills/              # 知識ベース（11個）
│   ├── frontend-patterns/
│   ├── backend-patterns/
│   ├── coding-standards/
│   ├── security-review/
│   ├── tdd-workflow/
│   ├── eval-harness/
│   ├── verification-loop/
│   ├── iterative-retrieval/
│   ├── strategic-compact/
│   ├── continuous-learning/
│   └── continuous-learning-v2/
├── contexts/            # 作業モード（3個）
│   ├── dev.md
│   ├── review.md
│   └── research.md
├── scripts/             # フック用スクリプト
│   ├── hooks/           # フックスクリプト（6個）
│   │   ├── check-console-log.js
│   │   ├── evaluate-session.js
│   │   ├── pre-compact.js
│   │   ├── session-end.js
│   │   ├── session-start.js
│   │   └── suggest-compact.js
│   └── lib/             # ライブラリスクリプト（4個）
│       ├── package-manager.js
│       ├── session-aliases.js
│       ├── session-manager.js
│       └── utils.js
└── settings.local.json  # MCP・フック設定（プロジェクト固有）
```

特別な設定は不要です。Claude Code を起動すれば自動的に読み込まれます。

---

## クイックスタート

### 最初のステップ

1. **開発を始める**: `/plan` コマンドで実装計画を作成
2. **テストを書く**: `/tdd` コマンドでテスト駆動開発を開始
3. **レビューする**: `/code-review` コマンドで品質チェック
4. **E2Eテスト**: `/e2e` コマンドで画面テストを生成

### 他のプロジェクトで使う場合

```bash
# このプロジェクトの設定をコピー
cp -r .claude/ ~/your-project/.claude/
```

---

## スラッシュコマンド

チャットで `/コマンド名` と入力するだけで使えます。

### よく使うコマンド

| コマンド | 説明 | 使いどころ |
|---------|------|-----------|
| `/plan` | 実装計画を作成する | 新機能を作り始める前に |
| `/tdd` | テスト駆動開発を始める | 機能追加・バグ修正時に |
| `/code-review` | コードレビューを実行 | コードを書き終えた後に |
| `/build-fix` | ビルドエラーを修正 | `npm run build` が失敗した時に |
| `/e2e` | E2E テストを生成・実行 | 画面操作のテストを書きたい時に |

### 全コマンド一覧（19個）

`.claude/commands/` ディレクトリに以下のコマンドが定義されています：

| コマンド | ファイル | 説明 |
|---------|---------|------|
| `/plan` | `plan.md` | 実装計画作成 |
| `/tdd` | `tdd.md` | テスト駆動開発 |
| `/code-review` | `code-review.md` | コードレビュー |
| `/e2e` | `e2e.md` | E2E テスト生成 |
| `/test-coverage` | `test-coverage.md` | カバレッジ分析 |
| `/build-fix` | `build-fix.md` | ビルドエラー修正 |
| `/refactor-clean` | `refactor-clean.md` | 不要コード削除 |
| `/verify` | `verify.md` | 検証ループ |
| `/checkpoint` | `checkpoint.md` | 状態の保存 |
| `/update-docs` | `update-docs.md` | ドキュメント更新 |
| `/update-codemaps` | `update-codemaps.md` | コードマップ更新 |
| `/eval` | `eval.md` | 評価ハーネス |
| `/orchestrate` | `orchestrate.md` | マルチエージェント連携 |
| `/skill-create` | `skill-create.md` | Git履歴からスキル生成 |
| `/learn` | `learn.md` | セッション中のパターン抽出 |
| `/evolve` | `evolve.md` | 学習した知見をスキルに昇格 |
| `/instinct-status` | `instinct-status.md` | 学習状況の確認 |
| `/instinct-import` | `instinct-import.md` | 学習データのインポート |
| `/instinct-export` | `instinct-export.md` | 学習データのエクスポート |

---

## エージェント

**エージェントは「誰が作業するか」を決める専門家です。** 特定分野のタスクを実行する実行者（アクター）として機能します。

### エージェントとは？

- **役割**: タスクを実行する専門家（実行者）
- **性質**: アクター（実際に作業を行う）
- **ツール**: 必要最小限のツールを持つ（5個程度）
- **呼び出し**: 自動または手動で呼び出し可能

### エージェントファーストデザイン

複雑なタスクは専門エージェントに委任することで、**実行が高速になり、フォーカスも維持**されます。
50個のツールを持つエージェントより、**5個に絞ったエージェントの方が効率的**に動作します。

### エージェント一覧（9個）

`.claude/agents/` ディレクトリに以下のエージェントが定義されています：

| エージェント | ファイル | 得意なこと | 主なツール |
|------------|---------|-----------|-----------|
| **planner** | `planner.md` | 「何をどの順番で作るか」を整理する | Read, Grep, Glob |
| **architect** | `architect.md` | システム全体の設計判断 | Read, Grep, Codebase Search |
| **tdd-guide** | `tdd-guide.md` | テストを先に書いて進める開発スタイルをガイド | Read, Write, Edit |
| **code-reviewer** | `code-reviewer.md` | 書いたコードの品質・安全性をチェック | Read, Grep, Codebase Search |
| **security-reviewer** | `security-reviewer.md` | セキュリティの穴がないか専門的にチェック | Read, Grep, Codebase Search |
| **build-error-resolver** | `build-error-resolver.md` | ビルドエラーの原因を特定して修正 | Read, Bash, Grep |
| **e2e-runner** | `e2e-runner.md` | Playwright で画面のテストを作成・実行 | Read, Write, Bash |
| **refactor-cleaner** | `refactor-cleaner.md` | 使われていないコードの発見と削除 | Read, Grep, Delete |
| **doc-updater** | `doc-updater.md` | ドキュメントの更新・同期 | Read, Write, Grep |

### 使い方の例

エージェントは自動で呼ばれますが、明示的に指示もできます。

```
あなた: security-reviewer エージェントで WalletProvider のセキュリティをチェックして
あなた: planner エージェントで NFT マーケットプレイス機能の実装計画を立てて
```

### エージェントとスキルの関係

エージェントは、スキル（知識ベース）を参照しながらタスクを実行します。

```
エージェント（実行者）
    ↓ 参照する
スキル（知識・パターン）
    ↓ 使って
タスクを実行
```

**具体例**:
- `/code-review` コマンド実行
  → `code-reviewer` エージェントが呼ばれる
  → `security-review` スキルを参照してセキュリティチェックを実行

---

## ルール

ルールは Claude が**常に**従うガイドラインです。意識しなくても自動的に適用されます。

### ルール一覧（8個）

`.claude/rules/` ディレクトリに以下のルールが定義されています：

| ルールファイル | 内容 |
|--------------|------|
| `security.md` | シークレットのハードコード禁止、入力バリデーション必須 |
| `coding-style.md` | イミュータブル、小さいファイル、エラーハンドリング |
| `testing.md` | TDD ワークフロー、80%+ カバレッジ |
| `git-workflow.md` | Conventional Commits、PR のルール |
| `agents.md` | エージェントの使い分け方 |
| `performance.md` | モデル選択・コンテキスト管理 |
| `patterns.md` | API レスポンス形式、リポジトリパターン |
| `hooks.md` | フックシステムの使い方 |

### 実際にどう効くか

例えば `security.md` ルールにより、以下のようなコードは書かれません。

```typescript
// Claude はこう書かない（ルール違反）
const apiKey = "sk-xxxxx"

// 代わりにこう書く
const apiKey = process.env.API_KEY
```

---

## スキル

**スキルは「どの知識・パターンを使うか」を決める知識ベースです。** エージェントやコマンドが参照する再利用可能なワークフロー定義です。

### スキルとは？

- **役割**: 特定分野の知識・パターンを提供するリソース
- **性質**: 知識ベース（参照される情報）
- **ツール**: ツールは持たない（知識のみ）
- **呼び出し**: 自動参照（Claudeが必要に応じて参照）

### エージェントとスキルの違い

| 項目 | エージェント（Agents） | スキル（Skills） |
|------|---------------------|----------------|
| **役割** | 「誰が作業するか」を決める | 「どの知識・パターンを使うか」を決める |
| **性質** | 実行者（アクター） | 知識ベース（リソース） |
| **保存場所** | `.claude/agents/` | `.claude/skills/` |
| **呼び出し** | 自動/手動で呼び出し可能 | 自動参照（必要に応じて） |
| **ツール** | 必要最小限のツールを持つ（5個程度） | ツールは持たない（知識のみ） |
| **例** | planner, code-reviewer | frontend-patterns, tdd-workflow |

### スキルとコマンドの違い

| 項目 | スキル (Skills) | コマンド (Commands) |
|------|----------------|-------------------|
| **保存場所** | `~/.claude/skills/` または `.claude/skills/` | `~/.claude/commands/` または `.claude/commands/` |
| **呼び出し方法** | 自動参照（Claudeが必要に応じて） | `/コマンド名` で明示的に呼び出し |
| **用途** | 広範なワークフロー定義、ドメイン知識 | 素早く実行可能なプロンプト |

### スキル一覧（11個）

`.claude/skills/` ディレクトリに以下のスキルが定義されています：

| スキル | ディレクトリ | 内容 | 関連ファイル |
|-------|------------|------|------------|
| **frontend-patterns** | `frontend-patterns/` | React / Next.js のベストプラクティス | `SKILL.md` |
| **backend-patterns** | `backend-patterns/` | API 設計、キャッシュ、サーバーサイドパターン | `SKILL.md` |
| **coding-standards** | `coding-standards/` | TypeScript / JavaScript のコーディング規約 | `SKILL.md` |
| **security-review** | `security-review/` | セキュリティチェックリスト（OWASP Top 10対応） | `SKILL.md`, `cloud-infrastructure-security.md` |
| **tdd-workflow** | `tdd-workflow/` | テスト駆動開発の手順（RED→GREEN→REFACTOR） | `SKILL.md` |
| **eval-harness** | `eval-harness/` | 検証ループの評価フレームワーク | `SKILL.md` |
| **verification-loop** | `verification-loop/` | 継続的な検証パターン | `SKILL.md` |
| **iterative-retrieval** | `iterative-retrieval/` | サブエージェントのコンテキスト問題を解決する段階的検索 | `SKILL.md` |
| **strategic-compact** | `strategic-compact/` | コンテキストが大きくなった時の整理提案 | `SKILL.md`, `suggest-compact.sh` |
| **continuous-learning** | `continuous-learning/` | セッションからパターンを自動抽出 | `SKILL.md`, `config.json`, `evaluate-session.sh` |
| **continuous-learning-v2** | `continuous-learning-v2/` | 信頼度スコア付きの学習システム | `SKILL.md`, `config.json`, `agents/observer.md`, `hooks/observe.sh`, `scripts/instinct-cli.py` |

---

## フック（自動チェック）

フックはバックグラウンドで自動実行されるチェック機能です。
意識する必要はありませんが、時折メッセージが表示されます。

### フックの種類と実行タイミング

| 種類 | 実行タイミング | 用途 |
|------|--------------|------|
| **PreToolUse** | **ツール実行前** | 特定操作のブロックやリマインド |
| **PostToolUse** | **ツール実行後** | 編集後の自動フォーマット、チェック |
| **Stop** | **セッション終了前** | 最終的なチェック（console.log警告など） |

### フックスクリプト（6個）

`.claude/scripts/hooks/` ディレクトリに以下のスクリプトが定義されています：

| スクリプト | 用途 |
|----------|------|
| `check-console-log.js` | console.logの検出（Stopフックで使用） |
| `evaluate-session.js` | セッションの評価 |
| `pre-compact.js` | コンテキスト圧縮前の処理 |
| `session-end.js` | セッション終了時の処理 |
| `session-start.js` | セッション開始時の処理 |
| `suggest-compact.js` | コンテキスト圧縮の提案 |

### ライブラリスクリプト（4個）

`.claude/scripts/lib/` ディレクトリに以下のユーティリティが定義されています：

| スクリプト | 用途 |
|----------|------|
| `package-manager.js` | パッケージマネージャーの抽象化 |
| `session-aliases.js` | セッションエイリアス管理 |
| `session-manager.js` | セッション管理 |
| `utils.js` | ユーティリティ関数 |

### 動作するフック

`.claude/settings.local.json` で定義されているフック：

| タイミング | 内容 | 表示されるメッセージ例 |
|-----------|------|---------------------|
| `npm run dev` 実行時 | tmux 外での起動をブロック | `[Hook] BLOCKED: Dev server must run in tmux` |
| `npm install` 等 | tmux の使用を推奨 | `[Hook] Consider running in tmux` |
| `git push` 前 | レビューのリマインダー | `[Hook] Review changes before push...` |
| 不要な .md 作成時 | ファイル作成をブロック | `[Hook] BLOCKED: Unnecessary documentation` |
| PR 作成後 | PR の URL とレビューコマンドを表示 | `[Hook] PR created: https://...` |
| ビルド完了後 | 分析通知 | `[Hook] Build completed` |
| .ts/.tsx 編集後 | TypeScript の型チェック | (エラーがあれば表示) |
| JS/TS 編集後 | console.log の検出 | `[Hook] WARNING: console.log found` |
| セッション終了時 | console.log の最終チェック | `check-console-log.js` が実行される |

---

## MCP設定とコンテキスト管理

### MCP（Model Context Protocol）とは

MCPサーバーは外部サービス（GitHub、Supabase、Vercel、Playwright、Context7 など）と連携するための仕組みです。

### ⚠️ 重要な制約：コンテキストウィンドウの縮小

**MCPを有効化しすぎると、コンテキストウィンドウが大幅に縮小します**。

> **警告**: MCPを有効化しすぎると、**200kあったコンテキストが70kまで減少する可能性**があります。

### 推奨される運用方法

| 項目 | 推奨値 | 説明 |
|------|--------|------|
| **設定ファイル内のMCP数** | 20〜30個 | すべてのMCP設定を記述しておく（必要に応じて有効化） |
| **プロジェクトごとの有効MCP数** | **10個以下** | 実際に使うMCPだけを有効化 |
| **有効なツール数** | **80個以下** | ツール数もコンテキストに影響 |

### settings.local.json の構成

`.claude/settings.local.json` はプロジェクト固有の設定ファイルです。以下の設定が含まれています：

#### 1. MCP設定

```json
{
  "enabledMcpjsonServers": ["playwright"],
  "enableAllProjectMcpServers": true
}
```

- **Playwright MCP**が有効化されており、Claude Codeがブラウザを直接操作してE2Eテストを実行できます
- `enableAllProjectMcpServers: true` により、プロジェクトの `.mcp.json` で定義されたMCPサーバーが自動的に有効化されます

#### 2. パーミッション設定

```json
{
  "permissions": {
    "allow": [
      "mcp__context7__query-docs",
      "Bash(node create-pptx-final.js:*)",
      "Bash(unzip:*)"
    ]
  }
}
```

特定のMCPツールやBashコマンドの実行を許可します。

#### 3. フック設定

詳細は [フック（自動チェック）](#フック自動チェック) セクションを参照してください。

### MCPサーバーの確認

Claude Code 内でMCPサーバーの状態を確認できます:

```bash
# Claude Code 内で
/mcp
```

---

## コンテキスト（Contexts）

コンテキストは Claude Code の「作業モード」を切り替えるためのファイルです。
異なる作業フェーズで、Claude Codeの動作を最適化できます。

### コンテキストとは？

**コンテキスト**は、Claude Codeがどのような「モード」で動作するかを定義するファイルです。
作業の種類に応じて、Claude Codeの優先順位や動作を変えることができます。

| 作業フェーズ | 求められること | コンテキスト |
|------------|--------------|------------|
| **開発中** | コードを素早く書いて動かす | 開発モード（dev） |
| **レビュー中** | 品質やセキュリティを徹底的にチェック | レビューモード（review） |
| **調査中** | コードを読んで理解する（書かない） | 調査モード（research） |

### 利用可能なコンテキスト（3個）

`.claude/contexts/` ディレクトリに以下のコンテキストが定義されています：

| モード | ファイル | 説明 | 使いどころ |
|-------|---------|------|-----------|
| **開発モード** | `dev.md` | コードを書くことに集中。動くものを優先 | 新機能を実装する時 |
| **レビューモード** | `review.md` | 品質・セキュリティ重視。問題の発見に集中 | PRをレビューする時 |
| **調査モード** | `research.md` | コードを読んで理解することに集中。書かない | コードベースを理解したい時 |

### コンテキストの切り替え方法

#### 自動的に切り替わる（推奨）

Claude Codeは、タスクの内容から適切なコンテキストを自動的に選択します：

| あなたの指示 | 自動選択されるコンテキスト |
|------------|----------------------|
| 「実装して」「追加して」「作成して」 | **開発モード** |
| 「レビューして」「チェックして」「確認して」 | **レビューモード** |
| 「調査して」「理解して」「どうなっている？」 | **調査モード** |

#### 明示的に指定する

自動選択が期待通りでない場合は、明示的に指定できます：

```
あなた: review context でこのコードをレビューして
あなた: research context でこの機能の実装を調査して
```

### コンテキストとエージェントの違い

| 項目 | コンテキスト（Contexts） | エージェント（Agents） |
|------|----------------------|-------------------|
| **役割** | 「どう動作するか」を決める | 「誰が作業するか」を決める |
| **例** | 開発モード、レビューモード | planner、code-reviewer |

---

## TDDワークフロー

このプロジェクトは **テスト駆動開発（TDD）を中心** としたワークフローを採用しています。

### RED → GREEN → REFACTOR サイクル

1. **RED**: まずテストを書く（失敗することを確認）
2. **GREEN**: 最小限の実装でテストを通す
3. **REFACTOR**: コードを改善する（テストは常に通る状態を維持）

### カバレッジ要件

**80%以上のテストカバレッジを必須**としています。

### TDDコマンドの使い方

```bash
# TDDワークフローを開始
/tdd プレイヤーの移動機能を実装したい

# カバレッジを確認
/test-coverage

# E2Eテストを生成
/e2e ホームページのロードテスト
```

### テストの種類

| 種類 | ツール | 用途 |
|------|--------|------|
| **Unit Tests** | Vitest / Jest | 個別の関数・コンポーネントのテスト |
| **Integration Tests** | Vitest / Jest | 複数コンポーネントの連携テスト |
| **E2E Tests** | Playwright | ブラウザでの実際の操作テスト |

---

## よくある質問

### L1（初心者向け）

#### Q: AIエージェントと普通のチャットボットの違いは？
**A:** AIエージェントは、テキストで回答するだけでなく、**実際にコードを書いたり、ファイルを編集したり、コマンドを実行したりできます**。

#### Q: 最初に何から始めればいい？
**A:** まずは `/plan` コマンドを試してみましょう。実装計画を作成してくれるので、AIエージェントの力を実感できます。

#### Q: コマンドを覚える必要はある？
**A:** よく使う3つのコマンド（`/plan`, `/tdd`, `/code-review`）だけ覚えれば十分です。

#### Q: エージェントを手動で選ぶ必要はある？
**A:** 通常は自動的に適切なエージェントが選ばれます。特別な場合だけ明示的に指定すればOKです。

#### Q: 生成されたコードはそのまま使っていい？
**A:** AIエージェントは強力ですが、完璧ではありません。生成されたコードは必ずレビューし、テストを実行して確認しましょう。

### L2（中級者向け）

#### Q: ルールを変えたい・追加したい場合は？
**A:** `.claude/rules/` に新しい `.md` ファイルを追加するか、既存のファイルを編集してください。

#### Q: 特定のフックを無効にしたい場合は？
**A:** `.claude/settings.local.json` の `hooks` セクションから該当フックを削除してください。

#### Q: エージェントをカスタマイズしたい場合は？
**A:** `.claude/agents/` 内の `.md` ファイルを編集してください。

#### Q: 新しいスラッシュコマンドを追加したい場合は？
**A:** `.claude/commands/` に新しい `.md` ファイルを作成してください。

#### Q: MCPを追加したい場合は？
**A:** `.claude/settings.local.json` の `enabledMcpjsonServers` に追加してください。ただし、**10個以下に抑える**ことを推奨します。

#### Q: コンテキストを手動で切り替える必要はある？
**A:** 通常は自動的に適切なコンテキストが選ばれます。特別な場合だけ明示的に指定すればOKです。

---

## 設計思想

このプロジェクトのClaude Code設定は、[everything-claude-code](https://github.com/affaan-m/everything-claude-code) の設計思想に基づいています。

### コア原則

1. **エージェントファーストデザイン**
   - 複雑なタスクは専門エージェントに委任
   - 必要最小限のツールだけを与えることで高速化
   - 50個のツールより5個に絞ったエージェントの方が効率的

2. **TDD中心のワークフロー**
   - RED→GREEN→REFACTORサイクルを徹底
   - 80%以上のカバレッジを必須とする

3. **セキュリティファースト**
   - コミット前の必須チェックを自動化
   - ハードコードされたシークレットの検出
   - すべてのユーザー入力のバリデーション

4. **コンテキストウィンドウ管理**
   - MCPの有効化は控えめに（10個以下推奨）
   - 有効なツールは80個以下に抑える

5. **モジュラー設計**
   - ルールファイルは役割ごとに分割
   - スキルとコマンドを明確に分離

6. **自動化による品質向上**
   - フックによる自動チェック（console.log検出など）
   - TypeScript型チェックの自動実行

### 参考リソース

- [everything-claude-code リポジトリ](https://github.com/affaan-m/everything-claude-code)
- [The Shorthand Guide to Everything Claude Code（Xスレッド）](https://x.com/affaanmustafa/status/1748123456789123456)
- [Anthropicハッカソン優勝者のClaude Code設定集「everything-claude-code」を読み解く（Zenn）](https://zenn.dev/ttks/articles/a54c7520f827be)
- [zenith.chat](https://zenith.chat) - この設定で開発されたプロダクト

---
