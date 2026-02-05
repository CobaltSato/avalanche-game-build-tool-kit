# GEMINI.md (avalanche-game-build-tool-kit)

このリポジトリで作業する AI への **実務的な指示**（プロジェクト固有の制約/実装方針）だけを書く。  
一般的な概念説明（Next.js/React/async/Promise/ウォレットの説明など）は書かない。

## Overview
- **Purpose**: Avalanche 上で動作するゲーム/dApp の Next.js 14 (App Router) スターター
- **Core idea**: UI (`app/`) は `@avalanche-wallet` を通してのみチェーンとやり取りする
- **Stack**: Next.js 14 / React 18 / TypeScript / ethers v6

## Where to edit
- **UI**: `app/`
- **Wallet + Contract integration**: `packages/avalanche-wallet/`

## Commands
```bash
npm ci
npm run dev
npm run lint
npm run build
```

## Env (required)
`.env.local`（例: `.env.local.example`）
- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_CONTRACT_ABI`（JSON文字列）

Rules:
- `.env.local` はコミットしない
- `NEXT_PUBLIC_*` は **ブラウザ公開前提**（秘密情報は禁止）

## Hard rules (must follow)
- `app/` から `ethers` を直接使わない（チェーンアクセスは **必ず** `@avalanche-wallet` 経由）
- `WalletProvider` は `app/layout.tsx` でアプリ全体をラップし続ける（剥がさない）
- ABI/Address をコードにハードコードしない（`.env.local` を単一ソースにする）
- `callView` を使う際は、コントラクトの `msg.sender` を直接参照するロジックに依存しない（ビュー関数は通常、引数としてアドレスを受け取るか、特定のユーザーのコンテキストで動作する設計にする）

## Implementation patterns (project-specific)
- **Connect**: UI から `useWallet().connectWallet()` を呼ぶ
- **Read (view)**: `useWallet().callView(method, args)` を使う  
  - ガード: `account` が無いなら呼ばない
- **Write (tx)**: `useWallet().sendTransaction(method, args)` を使う  
  - ガード: `isConnected` が false なら呼ばない
  - 成功後: view を再取得して画面を同期する（基本方針）

## UX / Best practices
- **Tx feedback**: `txStatus` と `txMessage` を UI に必ず表示する（pending/error/success）
- **Disable during pending**: 送信中はボタン等を無効化し、多重送信を防ぐ
- **Error visibility**: 例外は握り潰さない（最低でも `String(error)` を表示 or ログ）
- **Refresh strategy**: 書き込み成功後に再取得（もしくはイベント駆動）で状態を一致させる

## Troubleshooting checklist
- `useWallet` が落ちる → `app/layout.tsx` の `WalletProvider` 設定、env の存在
- view が失敗 → ABI/Address/メソッド名/引数の整合
- tx が失敗 → `txMessage` を画面に出し、ネットワーク/ガス/リバート理由を追う
# Avalanche Game Starter Kit - Gemini Guidance

## Project Snapshot
- **Stack**: Next.js 14 (App Router) / React 18 / TypeScript / ethers v6
- **Key dirs**:
  - `app/`: UI (App Router)
  - `packages/avalanche-wallet/`: ウォレット接続・コントラクト呼び出しの抽象化

## Commands
```bash
npm ci
npm run dev
npm run build
npm run lint
```

## Env (required)
`.env.local`（例: `.env.local.example`）
- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_CONTRACT_ABI`（JSON文字列）

Rules:
- `.env.local` はコミットしない
- `NEXT_PUBLIC_*` は「ブラウザに露出してよい値」だけ（秘密情報は禁止）

## Architecture Rules (must-follow)
- `app/` は **Wallet Package（`@avalanche-wallet`）経由**でのみチェーンにアクセスする  
  - `ethers` を `app/` から直接触らない
- アプリ全体は `app/layout.tsx` で `WalletProvider` でラップする

## Avalanche Integration: Implementation Patterns

### Pattern 1: Connect button
`useWallet` を使う UI は Client Component として実装する。

```tsx
'use client';

import { useWallet } from '@avalanche-wallet';

export function ConnectButton() {
  const { isConnected, account, connectWallet } = useWallet();
  if (isConnected) return <div>Connected: {account}</div>;
  return <button onClick={connectWallet}>Connect</button>;
}
```

### Pattern 2: Read from contract (view)
- 接続済み（`account` がある）時だけ実行
- 失敗は UI に出す（最低でも `String(error)` を表示）

```tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@avalanche-wallet';

export function ReadExample() {
  const { account, callView } = useWallet();
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!account) return;
    setError(null);
    try {
      setData(await callView('getData', [account]));
    } catch (e) {
      setError(String(e));
    }
  }, [account, callView]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <button onClick={fetchData} disabled={!account}>
        Refresh
      </button>
      {error && <pre>{error}</pre>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

### Pattern 3: Write tx + refresh on success
- 送信前に `isConnected` をガード
- `txStatus` / `txMessage` を UI に反映
- `txStatus === 'success'` で再取得（view）する

```tsx
'use client';

import { useEffect } from 'react';
import { useWallet } from '@avalanche-wallet';

export function WriteExample({ onRefresh }: { onRefresh: () => void }) {
  const { isConnected, sendTransaction, txStatus, txMessage } = useWallet();

  const onClick = async () => {
    if (!isConnected) return;
    await sendTransaction('update', ['value']);
  };

  useEffect(() => {
    if (txStatus === 'success') onRefresh();
  }, [txStatus, onRefresh]);

  return (
    <div>
      <button onClick={onClick} disabled={!isConnected || txStatus === 'pending'}>
        Send tx
      </button>
      {txStatus === 'pending' && <div>Pending...</div>}
      {txStatus === 'error' && <div>Error: {txMessage}</div>}
      {txStatus === 'success' && <div>Success</div>}
    </div>
  );
}
```

## Best Practices (do)
- **State refresh**: 書き込み成功後は必ず再取得（またはイベント駆動で同期）
- **Guard rails**: `isConnected` / `account` なしで `callView` / `sendTransaction` を呼ばない
- **Error UX**: `txStatus`/`txMessage` を「必ず」画面に出す（デバッグ容易性）
- **Callbacks**: `useEffect` 依存に入る関数は `useCallback` で安定化
- **Single source of truth**: ABI/Address は `.env.local` から渡し、ハードコードしない

## Troubleshooting Checklist
- `useWallet` が例外 → `app/layout.tsx` の `WalletProvider` 設定を確認
- view が失敗 → Address/ABI/メソッド名/引数の整合を確認
- tx が失敗 → `txMessage` を表示して理由を追う（ネットワーク/ガス/リバート等）
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
