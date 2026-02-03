# Avalanche Game Build Tool Kit

## Project Overview
Avalanche ブロックチェーン上で動作するゲーム/dApp の Next.js 14 (App Router) スターターキット。
ウォレット接続やスマートコントラクト連携を `@avalanche-wallet` パッケージで抽象化。

- **Stack**: Next.js 14 / React 18 / TypeScript 5 / ethers v6
- **Blockchain**: Avalanche (Mainnet & Fuji Testnet)
- **Wallet**: EIP-1193 準拠 (MetaMask / Core Wallet)

## Key Directories
```
app/                          # Next.js App Router (UI)
packages/avalanche-wallet/    # Wallet + Contract abstraction
contracts/                    # Smart contract source files
types/                        # TypeScript global types
```

## Commands
```bash
npm ci
npm run dev       # Development server (localhost:3000)
npm run build     # Production build
npm run lint      # Lint check
```

## Environment Variables
`.env.local` に設定 (テンプレート: `.env.local.example`)
- `NEXT_PUBLIC_CONTRACT_ADDRESS` - コントラクトアドレス
- `NEXT_PUBLIC_CONTRACT_ABI` - ABI (JSON文字列)

Rules:
- `.env.local` はコミット禁止
- `NEXT_PUBLIC_*` はブラウザに公開される (秘密情報は絶対に含めない)

## Hard Rules (MUST follow)
1. `app/` から `ethers` を直接使わない → 必ず `@avalanche-wallet` 経由
2. `WalletProvider` は `app/layout.tsx` でアプリ全体をラップ → 剥がさない
3. ABI/Address をコードにハードコードしない → `.env.local` が単一ソース
4. 秘密鍵やAPIシークレットをコードに含めない
5. イミュータブルなコードスタイル (オブジェクトを直接変更しない)

## Avalanche Implementation Patterns

### Connect
```tsx
const { isConnected, account, connectWallet } = useWallet();
```

### Read (view call)
```tsx
const { account, callView } = useWallet();
// Guard: account が無いなら呼ばない
if (account) await callView('getData', [account]);
```

### Write (transaction)
```tsx
const { isConnected, sendTransaction, txStatus, txMessage } = useWallet();
// Guard: isConnected が false なら呼ばない
// 成功後: view を再取得して画面を同期
```

### UX Requirements
- `txStatus` と `txMessage` を UI に必ず表示
- pending 中はボタン等を無効化 (多重送信防止)
- 例外は握り潰さない (最低でも `String(error)` を表示)
- 書き込み成功後は再取得で状態同期

## Code Organization
- Many small files > few large files
- 200-400 lines typical, 800 max
- Feature/domain ベースで整理
- `useWallet` を使うコンポーネントには `'use client'` を付与

## Testing
- TDD: テストを先に書く (RED → GREEN → IMPROVE)
- 80% 以上のカバレッジ目標
- Unit / Integration / E2E (Playwright)

## Git Workflow
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`
- main に直接コミットしない
- PR にはテストプランを含める

## Available Slash Commands
- `/plan` - 実装計画の作成
- `/tdd` - テスト駆動開発ワークフロー
- `/code-review` - コードレビュー
- `/e2e` - E2Eテスト生成
- `/test-coverage` - テストカバレッジ分析
- `/build-fix` - ビルドエラー修正
- `/refactor-clean` - デッドコード削除
- `/verify` - 検証ループ実行
- `/checkpoint` - 状態保存
- `/orchestrate` - マルチエージェントオーケストレーション

## Available Agents
| Agent | Purpose |
|-------|---------|
| planner | 実装計画・要件分析 |
| architect | システム設計・アーキテクチャレビュー |
| tdd-guide | テスト駆動開発ガイダンス |
| code-reviewer | コード品質・セキュリティレビュー |
| security-reviewer | 脆弱性分析 (ブロックチェーンセキュリティ含む) |
| build-error-resolver | ビルドエラー診断・修正 |
| e2e-runner | Playwright E2Eテスト |
| refactor-cleaner | デッドコード削除・クリーンアップ |
| doc-updater | ドキュメント更新 |

## Troubleshooting
- `useWallet` が例外 → `app/layout.tsx` の `WalletProvider` 設定を確認
- view が失敗 → Address/ABI/メソッド名/引数の整合を確認
- tx が失敗 → `txMessage` を表示して理由を追う (ネットワーク/ガス/リバート等)
- ビルドエラー → `/build-fix` コマンドまたは `build-error-resolver` エージェントを使用
