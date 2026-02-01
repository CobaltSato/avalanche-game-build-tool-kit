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

## 再発防止策: グリッドレイアウトにおける要素配置の注意点

今回のプレイヤー要素の配置に関する問題を受けて、類似の問題の再発防止のため、以下の点に留意する。

1.  **スキルの指示の深い理解**: `react-css-grid-game-rendering`スキルなど、提供される専門スキルの指示は非常に有用だが、その具体的な適用シナリオを深く理解すること。特にCSSのプロパティ（`transform`など）は、利用するCSSレイアウトモデル（`display: grid`など）の挙動と組み合わせて考慮する必要がある。
2.  **CSS Gridの基本動作の再確認**: `display: grid`を使用する場合、`grid-gap`が設定されていると、`gridColumnStart`や`gridRowStart`で指定された位置に要素を配置する際に、グリッドシステムが自動的にギャップを考慮して配置する。安易な`transform`による位置調整は、二重の調整となり、予期せぬずれの原因となる可能性がある。要素を特定のグリッドセルに配置するだけであれば、`gridColumnStart`と`gridRowStart`で十分な場合が多いことを認識する。
3.  **不要な複雑性の排除**: 問題解決や機能実装において、必要以上のCSSプロパティやJavaScriptロジックを導入しない。シンプルな解決策で実現可能な場合は、それを優先する。
4.  **段階的な視覚的確認**: UIの変更を伴うタスクにおいては、実装の各段階で視覚的な確認を怠らない。特に要素の配置やアニメーションは、実際の表示を確認することで早期に問題を発見できる。

以上の点を踏まえ、今後の開発ではより慎重に、そしてCSS Gridの特性を活かした効率的なスタイリングを心がける。