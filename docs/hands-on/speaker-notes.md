# Avalanche + AI Development Hands-on 台本

## Slide 1: タイトル
- 本日は「Avalanche + AI Development Hands-on Demo」へようこそ
- Gemini CLI を使って、Avalanche ブロックチェーン上で動くシンプルな 2D グリッドゲームを作成します
- 付録として Claude Code の解説もあります
- 初心者向けの内容なので、ブロックチェーン初めての方も安心してください

## Slide 2: 今日作るもの
- 今日のゴールは、10x10 のグリッドゲーム
- 矢印キー（← → ↑ ↓）でプレイヤーを移動
- 座標をブロックチェーンに保存するので、リロードしても位置が保持される
- シンプルだが、ブロックチェーン連携の基本がすべて詰まっている

## Slide 3: Gemini CLI とは？
- Google の Gemini AI をターミナルから直接操作できるツール
- ファイル編集、シェルコマンド実行、Web アクセスなどの機能がある
- 今回の目玉は「スキル機能」：専門知識をオンデマンドで追加できる
- Claude Code や Cursor と同じ「AI コーディングアシスタント」の仲間

## Slide 4: (セクション区切り)
- ここからデモの準備に入ります

## Slide 5: デモの流れ（約30分）
- 全体で約30分を予定
- Phase 0：準備（Codespaces、Wallet、Gemini CLI）5分
- Phase 1：スキル導入 2分
- Phase 2：コントラクト生成 5分
- Phase 3：Fuji にデプロイ 5分
- Phase 4：React アプリ作成（メイン！）10分
- 質問はいつでもどうぞ

## Slide 6: Phase 0 - GitHub Codespaces
- Codespaces は GitHub のクラウド開発環境
- ブラウザ上で VS Code が動き、ローカル環境構築が不要
- URL にアクセス → Code ボタン → Codespaces タブ → Create codespace
- 1-2分で起動します

## Slide 7: Phase 0 - Core Wallet インストール
- Core Wallet は Avalanche 公式ウォレット
- MetaMask でも OK だが、Core は Avalanche 専用設計でネットワーク設定が不要
- Chrome 拡張機能としてインストール
- ウォレットを新規作成または復元

## Slide 8: Phase 0 - Gemini CLI 認証
- 認証方法は3つ：Google OAuth、API Key、Vertex AI
- 今回は一番簡単な Google OAuth を使用
- `gemini` コマンドを実行 → "Login with Google" を選択
- ブラウザで Google アカウント認証

## Slide 9: Gemini CLI 基本操作
- `gemini` で対話モード起動
- `gemini --resume latest` で前回セッション再開
- Ctrl+C で終了
- ツール実行時は y/n/a で確認（a = 今後すべて許可）
- 困ったら日本語で質問するだけ

## Slide 10: スラッシュコマンド一覧
- `/help` でヘルプ表示
- `/tools` で利用可能ツール一覧
- `/skills list` でスキル一覧
- `/memory show` でコンテキスト表示
- `/chat save/resume` でセッション保存・復元
- たくさんあるが、よく使うのは数個

## Slide 11: GEMINI.md コンテキストファイル
- プロジェクト固有の指示を AI に伝える仕組み
- Claude の CLAUDE.md と同じ考え方
- 階層構造で読み込まれる：グローバル → プロジェクト → サブディレクトリ
- コーディングスタイル、API ガイドライン、依存関係ルールなどを設定

## Slide 12: Phase 1 - スキルとは？
- スキル = AI に「専門知識」をオンデマンドで追加する仕組み
- スキルなし：「グリッドゲーム？えーと、どう作るかな...」
- スキルあり：「CSS Grid で 10x10 作って、キーボードイベントで移動...」
- 今日は `react-css-grid-game-rendering` スキルを使用

## Slide 13: スキルの入手先
- コミュニティリポジトリがいくつかある
- VoltAgent/awesome-agent-skills：200+ スキル
- sickn33/antigravity-awesome-skills：626+ スキル（最大）
- geminicli.com/extensions：342+ Extensions（MCP, Skills, Hooks など）
- 公式プラグインもある
- サードパーティ製はセキュリティ確認を推奨

## Slide 14: Phase 1 - スキルのインストール
- Step 1：スキルファイルをダウンロード（GitHub リンクあり）
- プロジェクトルートに配置
- Step 2：`gemini skills install ./react-css-grid-game-rendering.skill --scope workspace`
- CLI 内で `/skills reload` して `/skills list` で確認

## Slide 15: Phase 2 - スマートコントラクト作成
- スマートコントラクト = ブロックチェーン上で動く「自動実行プログラム」
- 一度デプロイすると改ざん不可能
- Gemini にプロンプトを渡すと、Solidity コード生成、ファイル保存、ABI 抽出まで自動実行
- 要件：位置初期化、1歩移動（上下左右）、座標は 0-9 の範囲制限

## Slide 16: Phase 3 - コントラクトをデプロイ
- Fuji テストネット = Avalanche の「練習場」
- 本番と同じ仕組みだが、無料のテスト AVAX を使用
- 手順：Faucet からテスト AVAX 取得 → Remix でデプロイ → 環境変数設定
- アドレスを .env.local に設定

## Slide 17: Phase 4 - アプリ作成（メイン！）
- タスク管理を AI にさせるのがポイント
- docs/task.md にタスクリストを生成させる（5フェーズ）
- タスク完了ごとにチェック、フェーズごとにユーザー検収
- スキルを使用、キーボード移動、コントラクト連携を要件に指定

## Slide 18: Phase 5 - 動作確認
- `npm run dev` でサーバー起動
- localhost:3000 にアクセス、Wallet 接続
- 矢印キーでプレイヤー移動
- Tx を承認して、ブロックチェーンに座標保存
- リロードしても位置が保持されていれば成功！

## Slide 19: デモ完了！
- 作ったもの：PositionTracker.sol、Grid Game UI、Wallet Integration
- 学んだこと：
  1. Gemini CLI で AI 駆動開発
  2. スキルで専門知識を追加
  3. Avalanche Fuji でデプロイ
  4. フェーズ分割でタスク管理
- AI + 専門知識 + ブロックチェーン = 短時間で本格的な dApp

## Slide 20: クイックリファレンス
- Gemini CLI の主要コマンド一覧
- 起動オプション、スラッシュコマンド、スキル管理
- 参考リンク集も掲載
- 後で見返せるようにしてあります

## Slide 21: APPENDIX - Claude Code
- ここからは付録
- Anthropic の AI コーディングアシスタント Claude Code を紹介
- Gemini CLI との比較も行います

## Slide 22: Claude Code とは？
- Anthropic 公式の AI コーディングアシスタント CLI
- 特徴的な5つの機能：
  - CLAUDE.md：プロジェクトルール定義
  - Commands：カスタムスラッシュコマンド
  - Agents：専門特化サブエージェント
  - Hooks：ツール実行前後の自動処理
  - Skills：再利用可能なワークフロー
- MCP サポートもある

## Slide 23: Gemini CLI vs Claude Code 比較
- コンテキストファイル：GEMINI.md vs CLAUDE.md（同じ仕組み）
- スキル：どちらも SKILL.md（相互変換可能）
- フック：Claude のみ PreToolUse/PostToolUse がある
- MCP サポート：両方あり
- スラッシュコマンド：異なるコマンド体系
- エージェント：Claude は専用機能あり

## Slide 24: Claude Code Hooks システム
- ツール実行の前後に自動実行されるスクリプト
- PreToolUse：ファイル書き込み前のセキュリティチェック
- PostToolUse：編集後の Prettier 自動フォーマット
- Stop：セッション終了時の console.log 残留チェック
- SessionStart：プロジェクトコンテキスト読み込み
- JSON 形式で settings.json に定義

## Slide 25: Claude Code スラッシュコマンド
- 開発ワークフロー系：/plan, /tdd, /code-review, /build-fix, /e2e, /verify
- コード品質系：/test-coverage, /refactor-clean, /security-review
- ドキュメント系：/update-docs, /update-codemaps
- システム系：/help, /mcp, /context, /clear
- .claude/commands/ にカスタムコマンドを定義可能

## Slide 26: Claude Code エージェント
- 各エージェントは必要最小限のツールだけを持つ → 高速で正確
- planner：実装計画・要件分析
- architect：システム設計
- tdd-guide：テスト駆動開発
- code-reviewer：コード品質・セキュリティ
- build-error-resolver：ビルドエラー診断・修正
- .claude/agents/ にカスタムエージェント定義可能

## Slide 27: Claude Code 実践ワーク
- このリポジトリに実践ワークが含まれている（docs/work.md）
- 6つのワーク：
  1. /plan コマンド
  2. /tdd コマンド
  3. /code-review
  4. Playwright + TDD
  5. Playwright MCP
  6. Context7 MCP
- 詳細は docs/Guide.md と docs/work.md を参照

## Slide 28: 参考リソース
- Gemini CLI Extensions（342+）：geminicli.com/extensions
- Claude Code 設定集（ハッカソン優勝）：GitHub + Zenn 日本語解説
- Phaser 2D GameDev + Agent Skills：YouTube + GitHub
- Anthropic 公式プラグイン、Gemini CLI 向けスキルテンプレート
- リンクはすべてクリック可能

## Slide 29: Thank You!
- ご参加ありがとうございました
- 質問があればどうぞ
- ハッシュタグ：#AvalancheAI #GeminiCLI #ClaudeCode

## Slide 30: Bonus - Gemini + frontend-design
- frontend-design スキルでプロ品質の UI デザインを生成できる
- Extension をインストールしてスキル有効化
- Avalanche ブランドカラー (#E84142) でグリッドゲームを仕上げる例
- ホバーエフェクト、ウォレット状態表示なども追加可能

## Slide 31: Phase 0 - 環境の動作確認
- Codespaces 起動後、`npm run dev` で動作確認
- `Local: http://localhost:3000` と表示されれば OK
- 問題があれば `npm ci` で依存関係を再インストール
- 確認できたら Ctrl+C で停止して次へ

## Slide 32: 補足 - エージェント vs スキル（Claude Code）
- Claude Code では「エージェント」と「スキル」は異なる概念
- スキル：/plan, /tdd などスラッシュコマンド、メインの Claude が実行、「手順書」のイメージ
- エージェント：Task ツールで自動起動、独立したサブプロセス、「専門家チーム」のイメージ
- 使い分けが重要
