# Avalanche Game Starter Kit - Gemini Guidance

## Project Summary
Avalanche ブロックチェーン上で動作するゲームや dApp を作るための
Next.js 14 (App Router) スターターキット。ウォレット接続や
スマートコントラクト連携を簡単に扱える構成。

## Tech Stack
- Next.js 14 (App Router)
- React 18 / TypeScript 5
- ethers v6

## Key Directories
- `app/` App Router のページ/レイアウト/スタイル
- `packages/avalanche-wallet/` ウォレット接続の共通実装
- `next.config.mjs` / `tsconfig.json` 設定
- `.env.local.example` 環境変数テンプレート

## Local Development
```bash
npm install
npm run dev
```
- 開発サーバーは `http://localhost:3000`

## Build / Lint
```bash
npm run build
npm run lint
```

## Environment Variables
`.env.local` に以下を設定する（例は `.env.local.example`）。
- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_CONTRACT_ABI`

`.env.local` は機密情報を含むため、Git にコミットしない。

## Avalanche Wallet Integration (Key Points)
- **ウォレットの役割**: アドレスで本人確認、署名、トランザクション送信に使用
- **EIP-1193準拠**: `window.ethereum` 経由で MetaMask / Core Wallet 等を同一実装で扱う
- **接続フロー**: 接続ボタン → ウォレット許可 → アドレス取得 → 以後操作可能
- **セットアップ**: `app/layout.tsx` で `WalletProvider` にアドレス/ABIを渡して全体ラップ
- **`useWallet` 状態**: `account`, `chainId`, `isConnected`, `txStatus`, `txMessage`
- **`useWallet` 操作**: `connectWallet`, `sendTransaction`, `callView`
- **読み取り/書き込み**: `callView` は読み取り専用、`sendTransaction` はガス代が必要
- **Client Component**: `useWallet` 利用時は `'use client'` を付与
- **接続後の取得**: 接続完了後に `callView` でデータ再取得する設計が基本
- **エラーハンドリング**: `try-catch` で捕捉し、`txStatus`/`txMessage` をUIに反映
- **トラブル時の確認**: `WalletProvider` 設定/ネットワーク/環境変数/ABI/メソッド名

## Architecture Notes
- Application Layer (`app/`) は Wallet Package にのみ依存。
- `WalletProvider` でアプリ全体をラップし、`useWallet` で操作。
- EIP-1193 準拠ウォレット (MetaMask / Core Wallet など) をサポート。

## Coding Conventions
- 新しい UI は `app/` 配下のページやコンポーネントで実装。
- `useWallet` を使うコンポーネントは `'use client'` を付与。
