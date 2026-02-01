# Avalanche Game Starter Kit

Avalanche ネットワークでゲームや dApp を開発するための、**Next.js** スターターキットです。
ウォレット接続やスマートコントラクトとのやり取りといった複雑な部分を簡単に使えるようにまとめているので、ゲームのロジックや UI の開発に集中できます。

**Next.jsとは？** Next.jsは、ReactベースのWebアプリケーションフレームワークです。サーバーサイドレンダリング（SSR）やルーティングなどの機能が最初から組み込まれており、本格的なWebアプリケーションを効率的に開発できます。このスターターキットでは、Next.js 14の**App Router**という新しいルーティングシステムを使用しています。

## このスターターキットについて

このスターターキットは、Avalanche ブロックチェーン上で動作するゲームやアプリを作るための土台です。
以下のような機能が最初から使えるようになっています：

- **ウォレット接続**: MetaMask などのウォレットを簡単に接続できます
- **スマートコントラクト連携**: コントラクトの呼び出しやトランザクション送信が簡単にできます
- **状態管理**: ウォレットの接続状態やトランザクションの状態を自動で管理します

## プロジェクトの構成

このプロジェクトは、以下のような構造になっています：

```
.
├── app/                            # Next.js のアプリケーション部分（App Router）
│   ├── layout.tsx                  #   全体のレイアウト（ウォレット接続の設定）
│   ├── page.tsx                    #   ホームページ
│   └── globals.css                 #   スタイル設定
├── packages/
│   └── avalanche-wallet/           # ウォレット関連の機能をまとめたパッケージ
│       ├── WalletProvider.tsx      #   ウォレットの状態を管理するコンポーネント
│       ├── useWallet.ts            #   ウォレットを使うためのフック
│       └── types.ts                #   型定義
├── next.config.mjs                 # Next.js の設定ファイル
├── tsconfig.json                   # TypeScript の設定ファイル
├── package.json                    # 依存パッケージとスクリプト
└── .env.local.example              # 環境変数のテンプレート
```

### Next.jsのファイル構成について

**`app/` ディレクトリとは？**

Next.js 14の**App Router**では、`app/` ディレクトリ内のファイル構造がそのままURLのルーティングになります。

- **`app/layout.tsx`**: アプリ全体のレイアウトを定義するファイルです。すべてのページで共通して表示される部分（ヘッダー、フッター、ウォレット接続の設定など）をここに書きます
- **`app/page.tsx`**: ホームページ（`/`）のコンテンツを定義するファイルです。`page.tsx` という名前のファイルが、そのディレクトリのページになります
- **`app/globals.css`**: アプリ全体で使うグローバルなスタイル（CSS）を定義するファイルです

**ルーティングの例：**
- `app/page.tsx` → `http://localhost:3000/` （ホームページ）
- `app/about/page.tsx` → `http://localhost:3000/about` （Aboutページ）
- `app/game/page.tsx` → `http://localhost:3000/game` （Gameページ）

**`next.config.mjs` とは？** Next.jsの設定ファイルです。ビルド設定や環境変数の設定などを行います。

**`tsconfig.json` とは？** TypeScriptの設定ファイルです。型チェックのルールやパスのエイリアスなどを設定します。

### 主要なコンポーネント

#### WalletProvider

アプリ全体でウォレットの状態を使えるようにするコンポーネントです。
`app/layout.tsx` でアプリ全体をこのコンポーネントで囲むことで、どこからでもウォレットにアクセスできるようになります。

**なぜ `layout.tsx` に配置するのか？**

`layout.tsx` は、すべてのページで共通して使われるレイアウトを定義するファイルです。`WalletProvider` をここに配置することで、どのページからでも `useWallet` フックを使ってウォレットにアクセスできるようになります。

#### useWallet

ウォレットの状態や操作にアクセスするための**フック**（Hook）です。

**フックとは？** フックは、Reactコンポーネントで状態管理や副作用処理を行うための関数です。`use` で始まる名前が特徴です。

以下のように使います：

```tsx
const { account, isConnected, connectWallet, sendTransaction } = useWallet();
```

- `account`: 接続されているウォレットのアドレス
- `isConnected`: ウォレットが接続されているかどうか
- `connectWallet`: ウォレットを接続する関数
- `sendTransaction`: スマートコントラクトのメソッドを実行する関数

## セットアップ方法

### 1. パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成し、以下の情報を設定してください：

```bash
cp .env.local.example .env.local
```

`.env.local` ファイルに、デプロイ済みのスマートコントラクトのアドレスと ABI を設定します。

### 3. 開発サーバーの起動

```bash
npm run dev
```

**開発サーバーとは？** Next.jsの開発サーバーは、コードを変更すると自動的にブラウザを更新してくれる機能（ホットリロード）が付いています。開発中は、このサーバーを起動したまま作業を続けます。

ブラウザで `http://localhost:3000` を開くと、アプリが表示されます。

**`localhost:3000` とは？** `localhost` は自分のコンピューターを指す特別なアドレスで、`3000` はポート番号です。開発サーバーは通常、このアドレスで起動します。

## 環境変数

**環境変数とは？** アプリケーションの設定値を外部から設定するための仕組みです。機密情報や環境ごとに異なる値を設定するのに便利です。

Next.jsでは、`.env.local` ファイルに環境変数を定義します。ブラウザ側でも使いたい場合は、変数名の前に `NEXT_PUBLIC_` を付けます。

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | デプロイ済みスマートコントラクトのアドレス |
| `NEXT_PUBLIC_CONTRACT_ABI` | コントラクト ABI (JSON 文字列) |

**使い方：**

```bash
# .env.local ファイルの例
NEXT_PUBLIC_CONTRACT_ADDRESS=0x1234567890abcdef...
NEXT_PUBLIC_CONTRACT_ABI=["abi", "as", "json", "string"]
```

コード内では、`process.env.NEXT_PUBLIC_CONTRACT_ADDRESS` のようにしてアクセスできます。

**注意：** `.env.local` ファイルは、機密情報を含む可能性があるため、Gitにコミットしないようにしてください（`.gitignore` に含まれています）。

## Avalanche Wallet連携

### ウォレットとは？

**ウォレット**は、ブロックチェーン上で暗号資産やNFTを管理するためのアプリケーションです。Web3アプリケーションでは、ユーザーがウォレットを接続することで、以下のことができます：

- **本人確認**: ウォレットのアドレスでユーザーを識別します
- **トランザクション送信**: ブロックチェーン上でデータを更新する操作を実行します
- **署名**: メッセージやトランザクションに署名して、本人であることを証明します

**MetaMask**は、最も一般的なブラウザ拡張機能のウォレットです。このスターターキットでは、MetaMaskを主なウォレットとしてサポートしています。

### ウォレット接続の流れ

1. **ユーザーが「接続」ボタンをクリック**
2. **MetaMaskがポップアップを表示**して、接続の許可を求めます
3. **ユーザーが許可**すると、アプリがウォレットのアドレスを取得できます
4. **アプリはアドレスを使って**、ユーザー固有のデータを取得したり、操作を実行したりできます

### セットアップ

アプリ全体を `WalletProvider` でラップします。
通常は `app/layout.tsx` で設定します：

```tsx
import { WalletProvider } from '@avalanche-wallet';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <WalletProvider
          contractAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
          contractABI={process.env.NEXT_PUBLIC_CONTRACT_ABI}
        >
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
```

**`app/layout.tsx` の構造について：**

- **`RootLayout`**: Next.jsのApp Routerでは、`layout.tsx` は必ず `children` というプロップを受け取る関数コンポーネントとして定義します。`children` には、そのレイアウト配下のページコンテンツが渡されます
- **`{children}`**: この部分に、`page.tsx` などのページコンテンツが表示されます
- **環境変数**: `process.env.NEXT_PUBLIC_*` という形式の環境変数は、ブラウザ側でも使えるように公開されます

**なぜ `WalletProvider` でラップするのか？**

`WalletProvider` は、React の **Context API** を使って、アプリ全体でウォレットの状態を共有できるようにします。

**Context APIとは？** Reactで、コンポーネント間でデータを共有するための仕組みです。親コンポーネントで `Provider` を使ってデータを提供し、子コンポーネントで `useContext` やカスタムフック（この場合は `useWallet`）を使ってデータにアクセスします。

これにより、どのコンポーネントからでも `useWallet` フックを使ってウォレットにアクセスできるようになります。

### useWalletフックの使い方

`useWallet` フックを使うと、以下のような状態や操作にアクセスできます：

```typescript
interface WalletState {
  account: string | null;           // ウォレットのアドレス（例: "0x1234..."）
  chainId: string | null;            // 接続されているネットワークのID（例: "0xa869" = Fuji Testnet）
  isConnected: boolean;              // 接続されているかどうか
  txStatus: 'idle' | 'pending' | 'success' | 'error';  // トランザクションの状態
  txMessage: string;                 // トランザクションのメッセージ（エラー時などに表示）
}

interface WalletActions {
  connectWallet: () => Promise<void>;                    // ウォレットを接続する関数
  sendTransaction: (method: string, args?: any[]) => Promise<void>;  // トランザクション送信
  callView: (method: string, args?: any[]) => Promise<any>;          // ビュー関数の呼び出し（読み取り専用）
}
```

**型定義について：**

- **`Promise<void>`**: 値を返さない非同期処理を表します。`void` は「何も返さない」という意味です
- **`Promise<any>`**: 任意の型の値を返す非同期処理を表します。`any` は「どんな型でも良い」という意味です
- **`args?: any[]`**: `?` は「オプショナル（省略可能）」という意味です。`args` は引数の配列で、省略可能です
```

**各プロパティの説明：**

- **`account`**: 接続されているウォレットのアドレスです。`null` の場合は未接続です
- **`chainId`**: 接続されているネットワークのIDです。Avalanche Fuji Testnet の場合は `"0xa869"` です
- **`isConnected`**: ウォレットが接続されているかどうかを示す真偽値です
- **`txStatus`**: トランザクションの状態です。`'idle'`（待機中）、`'pending'`（処理中）、`'success'`（成功）、`'error'`（エラー）のいずれかです
- **`connectWallet`**: ウォレットを接続する関数です。呼び出すと、MetaMaskのポップアップが表示されます
- **`sendTransaction`**: スマートコントラクトのメソッドを実行して、ブロックチェーン上のデータを変更します（ガス代がかかります）
- **`callView`**: スマートコントラクトのメソッドを呼び出して、データを読み取ります（ガス代はかかりません）

### 実装パターン

#### 1. ウォレットを接続する

まず、ユーザーがウォレットを接続できるようにします：

```tsx
'use client';

import { useWallet } from '@avalanche-wallet';

export default function ConnectButton() {
  const { isConnected, connectWallet, account } = useWallet();
```

**`'use client'` とは？**

Next.js 14のApp Routerでは、コンポーネントはデフォルトで**サーバーコンポーネント**（Server Component）として扱われます。

**サーバーコンポーネントとクライアントコンポーネントの違い：**

- **サーバーコンポーネント**: サーバー側でレンダリングされます。フック（`useState`、`useEffect` など）やイベントハンドラー（`onClick` など）は使えませんが、データベースへのアクセスなど、サーバー側の処理ができます
- **クライアントコンポーネント**: ブラウザ側でレンダリングされます。フックやイベントハンドラーが使えますが、ファイルの先頭に `'use client'` を書く必要があります

この例では、`useWallet` フックや `onClick` イベントハンドラーを使っているため、クライアントコンポーネントにする必要があります。ファイルの先頭に `'use client'` を書くことで、そのコンポーネントをクライアントコンポーネントとして扱います。

  if (isConnected) {
    return <div>接続済み: {account}</div>;
  }

  return (
    <button onClick={connectWallet}>
      ウォレットを接続
    </button>
  );
}
```

**何が起こるか：**
1. ユーザーがボタンをクリック
2. `connectWallet()` が呼ばれる
3. MetaMaskのポップアップが表示される
4. ユーザーが許可すると、`isConnected` が `true` になり、`account` にアドレスが設定される

#### 2. コントラクトからデータを取得する（読み取り）

スマートコントラクトからデータを読み取る場合は、`callView` を使います。これは**ガス代がかからない**読み取り専用の操作です：

```tsx
const { callView, account } = useWallet();
const [userData, setUserData] = useState(null);

const fetchData = useCallback(async () => {
  if (!account) return;  // ウォレットが接続されていない場合は何もしない（早期リターン）
  
  try {
    // コントラクトの 'getData' メソッドを呼び出し
    const result = await callView('getData', [account]);
    setUserData(result);
  } catch (error) {
    console.error('データの取得に失敗しました:', error);
  }
}, [account, callView]);
```

**`async` と `await` とは？**

- **`async`**: 関数の前に付けるキーワードで、その関数が非同期処理を行うことを示します。`async` 関数は、常に `Promise` を返します
- **`await`**: `async` 関数内で使えるキーワードで、`Promise` が完了するまで待機します。`await` を使うことで、非同期処理を同期的に書くように見せることができます

**`Promise` とは？** 非同期処理の結果を表すオブジェクトです。`Promise` は、処理が完了したとき（成功または失敗）に結果を返します。`callView` や `sendTransaction` は `Promise` を返すため、`await` を使って結果を待つ必要があります。
```

**用語の説明：**

- **`useState`**: Reactのフックの一つで、コンポーネントの状態（データ）を管理します。`[値, 値を更新する関数]` の形式で返されます。この例では、`userData` という状態と、それを更新する `setUserData` 関数を取得しています
- **`useCallback`**: 関数をメモ化するためのフックです。依存配列（`[account, callView]`）に指定した値が変更されたときだけ、新しい関数を作成します。これにより、不要な再レンダリングを防ぎます
- **早期リターン**: 条件を満たさない場合に、関数の実行を早めに終了させるパターンです。この例では、`account` が `null` の場合は、その後の処理をスキップします
- **`try-catch`**: エラーハンドリングのための構文です。`try` ブロック内でエラーが発生した場合、`catch` ブロックでエラーをキャッチして処理できます

**ポイント：**
- `callView` は読み取り専用なので、ガス代はかかりません
- 第1引数はコントラクトのメソッド名、第2引数はそのメソッドに渡す引数の配列です
- ウォレットが接続されていない場合は、`account` が `null` なので、早期リターンで処理をスキップします

#### 3. トランザクションを送信する（書き込み）

ブロックチェーン上のデータを変更する場合は、`sendTransaction` を使います。これは**ガス代がかかる**操作です：

```tsx
const { sendTransaction, callView } = useWallet();

const updateData = useCallback(async () => {
  try {
    // コントラクトの 'update' メソッドを実行
    await sendTransaction('update', [value]);
    
    // トランザクションが成功したら、データを再取得
    await fetchData();
  } catch (error) {
    console.error('トランザクション送信に失敗しました:', error);
  }
}, [sendTransaction, fetchData]);
```

**何が起こるか：**
1. `sendTransaction` が呼ばれる
2. MetaMaskのポップアップが表示され、ユーザーがトランザクションを承認する
3. トランザクションがブロックチェーンに送信される
4. マイニングが完了するまで待機する（数秒〜数分かかる場合があります）
5. 成功すると、`txStatus` が `'success'` になる

**重要：** トランザクション送信にはガス代がかかります。ユーザーはMetaMaskでガス代を確認してから承認します。

#### 4. ウォレット接続時に自動でデータを取得する

ウォレットが接続されたら、自動的にデータを取得するようにします：

```tsx
useEffect(() => {
  if (isConnected && account) {
    fetchData();  // ウォレット接続時に自動でデータを取得
  }
}, [isConnected, account, fetchData]);
```

**`useEffect` とは？**

`useEffect` は、Reactのフックの一つで、**副作用**（side effects）を処理するために使います。副作用とは、データの取得、DOMの操作、タイマーの設定など、コンポーネントのレンダリングとは直接関係ない処理のことです。

**依存配列とは？**

`useEffect` の第2引数（`[isConnected, account, fetchData]`）は**依存配列**と呼ばれます。この配列に指定した値が変更されたときだけ、`useEffect` 内の処理が実行されます。

- 依存配列が空 `[]` の場合：コンポーネントが最初に表示されたときだけ実行されます
- 依存配列に値がある場合：その値が変更されたときだけ実行されます
- 依存配列を省略した場合：毎回のレンダリング時に実行されます（通常は避けるべき）

**ポイント：**
- `useEffect` を使って、`isConnected` や `account` が変更されたときに自動で実行されます
- これにより、ユーザーがウォレットを接続すると、すぐにデータが表示されます

### エラーハンドリング

**エラーハンドリングとは？** プログラムの実行中に発生するエラーを適切に処理することです。エラーが発生したときに、プログラムがクラッシュしないように、エラーをキャッチして適切な処理を行います。

エラーが発生した場合は、**`try-catch`** でキャッチして適切に処理しましょう：

**`try-catch` とは？** JavaScriptの構文で、エラーハンドリングを行うためのものです。`try` ブロック内でエラーが発生する可能性のある処理を実行し、エラーが発生した場合は `catch` ブロックでエラーをキャッチして処理します。

```tsx
const { sendTransaction, txStatus, txMessage } = useWallet();

const handleUpdate = async () => {
  try {
    await sendTransaction('update', [value]);
  } catch (error) {
    console.error('トランザクション送信に失敗しました:', error);
    // ユーザーにエラーメッセージを表示
    alert('エラーが発生しました。もう一度お試しください。');
  }
};

// トランザクションの状態に応じてUIを更新
{txStatus === 'pending' && <div>処理中...</div>}
{txStatus === 'error' && <div>エラー: {txMessage}</div>}
{txStatus === 'success' && <div>成功しました！</div>}
```

**エラーの種類：**

- **ユーザーがトランザクションを拒否した場合**: MetaMaskで「拒否」をクリックすると、エラーが発生します
- **ネットワークが間違っている場合**: 正しいネットワーク（例: Avalanche Fuji Testnet）に接続されていないと、エラーになります
- **ガス代が不足している場合**: ウォレットに十分なAVAX（Avalancheのネイティブトークン）がない場合、エラーになります
- **コントラクトのメソッドが存在しない場合**: メソッド名や引数が間違っていると、エラーになります

`txStatus` と `txMessage` を確認することで、トランザクションの状態を把握し、ユーザーに適切なフィードバックを提供できます。

### ベストプラクティス

#### 1. ウォレット接続状態をチェック

トランザクションを送信する前に、必ずウォレットが接続されているか確認しましょう：

```tsx
const { isConnected, sendTransaction } = useWallet();

const handleSubmit = async () => {
  if (!isConnected) {
    alert('ウォレットを接続してください');
    return;
  }
  
  await sendTransaction('update', [value]);
};
```

#### 2. 状態の再取得

トランザクション送信後は、コントラクトの状態を再取得することをおすすめします。トランザクションが成功したら、最新のデータを表示するためです：

```tsx
const { sendTransaction, txStatus } = useWallet();

useEffect(() => {
  if (txStatus === 'success') {
    fetchData();  // トランザクション成功後にデータを再取得
  }
}, [txStatus]);  // txStatus が変更されたときだけ実行
```

**ポイント：**
- `useEffect` の依存配列に `txStatus` を指定することで、トランザクションの状態が変更されたときだけ実行されます
- `txStatus` が `'success'` になったときだけ、データを再取得します

#### 3. 関数のメモ化

**メモ化とは？** 計算結果をキャッシュして、同じ入力に対して同じ結果を返すようにすることです。Reactでは、関数や値をメモ化することで、不要な再計算や再レンダリングを防ぎ、パフォーマンスを向上させます。

`useCallback` を使って関数をメモ化すると、パフォーマンスが向上します。特に、`useEffect` の依存配列に含める関数は、メモ化することをおすすめします：

```tsx
const fetchData = useCallback(async () => {
  // ...
}, [account, callView]);  // 依存する値を配列に含める
```

**なぜメモ化が必要なのか？**

Reactコンポーネントは、状態が変更されるたびに再レンダリングされます。関数をメモ化しないと、毎回新しい関数が作成され、`useEffect` の依存配列に含めている場合、毎回 `useEffect` が実行されてしまいます。メモ化することで、依存する値（`account` や `callView`）が実際に変更されたときだけ、新しい関数が作成され、`useEffect` も適切なタイミングで実行されます。

#### 4. ローディング状態の表示

トランザクション送信中は、ユーザーにローディング状態を表示しましょう：

```tsx
const { txStatus } = useWallet();

{txStatus === 'pending' && (
  <div>
    <Spinner />
    トランザクションを処理中...
  </div>
)}
```

#### 5. エラーメッセージの表示

エラーが発生した場合は、ユーザーに分かりやすいメッセージを表示しましょう：

```tsx
const { txStatus, txMessage } = useWallet();

{txStatus === 'error' && (
  <div className="error">
    {txMessage || 'エラーが発生しました'}
  </div>
)}
```

## トラブルシューティング

### useWalletがエラーを投げる

- `WalletProvider` でアプリ全体がラップされているか確認してください
- `app/layout.tsx` で `WalletProvider` が正しく設定されているか確認してください

### トランザクションが送信されない

- ウォレットが接続されているか確認してください
- 正しいネットワーク（Avalanche Fuji Testnet など）に接続されているか確認してください
- `.env.local` ファイルに環境変数が正しく設定されているか確認してください

### コントラクトの呼び出しが失敗する

- コントラクトアドレスが正しいか確認してください
- ABI が正しいか確認してください
- メソッド名や引数が正しいか確認してください

## 技術スタック

このスターターキットで使用している技術スタックです：

| カテゴリ | 技術 | 説明 |
|----------|------|------|
| フレームワーク | Next.js 14 (App Router) | ReactベースのWebアプリケーションフレームワーク。サーバーサイドレンダリングやルーティング機能が組み込まれています |
| 言語 | TypeScript 5 | JavaScriptに型システムを追加した言語。エラーを早期に発見でき、コードの可読性が向上します |
| UI | React 18 | ユーザーインターフェースを構築するためのライブラリ。コンポーネントベースの開発が可能です |
| ブロックチェーン | ethers.js 6 | Ethereum/Avalancheブロックチェーンとやり取りするためのライブラリ |
| 対象ネットワーク | Avalanche C-Chain (デフォルト: Fuji Testnet `0xa869`) | Avalancheのテストネットワーク。開発時はこちらを使用します |
| ウォレット | MetaMask (EIP-1193) | ブラウザ拡張機能のウォレット。EIP-1193という標準規格に準拠しています |

**Next.js 14のApp Routerについて：**

Next.js 14では、新しいルーティングシステムとして**App Router**が導入されました。`app/` ディレクトリ内のファイル構造がそのままURLのルーティングになり、`layout.tsx` や `page.tsx` という特別なファイル名でレイアウトやページを定義します。これにより、より直感的で柔軟なルーティングが可能になりました。

## 次のステップ

開発を始めるための手順です：

1. **環境変数の設定**: `.env.local` にコントラクトアドレスと ABI を設定します
   ```bash
   cp .env.local.example .env.local
   # .env.local を編集して、コントラクトアドレスとABIを設定
   ```

2. **UIの実装**: `app/page.tsx` でゲームやアプリの UI を実装します
   - `app/page.tsx` は、ホームページ（`/`）のコンテンツを定義するファイルです
   - ここに、ゲームの画面やUIコンポーネントを実装します

3. **ウォレット連携**: `useWallet` フックを使ってウォレットとコントラクトにアクセスします
   - `useWallet` フックを使うコンポーネントには、`'use client'` を忘れずに付けましょう

4. **トランザクション送信**: トランザクションを送信して、ブロックチェーン上でデータを更新します
   - `sendTransaction` を使って、コントラクトのメソッドを実行します

**新しいページを追加するには：**

Next.jsのApp Routerでは、`app/` ディレクトリ内に新しいフォルダを作成し、その中に `page.tsx` を配置するだけで、新しいページが作成されます。

例：`app/game/page.tsx` を作成すると、`http://localhost:3000/game` というURLでアクセスできます。

Happy coding! 🚀

## アーキテクチャ

このプロジェクトは、レイヤードアーキテクチャを採用しています。Application Layer は Wallet Package にのみ依存し、外部ライブラリ（ethers など）への直接依存を避ける設計になっています。

```
┌──────────────────────────────────────────────────┐
│  Application Layer (app/)                        │
│  - layout.tsx                                    │
│  - page.tsx                                      │
└────────────────────┬─────────────────────────────┘
                     │ 依存
                     ▼
┌──────────────────────────────────────────────────┐
│  Wallet Package                                  │
│  (packages/avalanche-wallet/)                    │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ WalletService                             │ │
│  │  ┌──────────────────────────────────────┐ │ │
│  │  │ WalletAdapter (interface)            │ │ │
│  │  └──────────────────────────────────────┘ │ │
│  │              ▲                            │ │
│  │              │ 依存（DI）                   │ │
│  └──────────────┼────────────────────────────┘ │
│                 │                               │
│  ┌──────────────▼────────────────────────────┐ │
│  │ MetaMaskAdapter                            │ │
│  │ (implements WalletAdapter)                │ │
│  └───────────────────────────────────────────┘ │
│                                                  │
│  WalletProvider.tsx                             │
│  useWallet.ts                                    │
└────────────────────┬─────────────────────────────┘
                     │ 依存
                     ▼
┌──────────────────────────────────────────────────┐
│  External Dependencies                           │
│  - ethers ^6                                      │
│  - react ^18                                      │
│  - next 14                                        │
└──────────────────────────────────────────────────┘
```

**設計のポイント：**

- **レイヤー分離**: Application Layer は Wallet Package にのみ依存し、ethers などの外部ライブラリに直接依存しません。Wallet Package が外部依存を抽象化します
- **インターフェースベースのDI**: `WalletService` は `WalletAdapter` インターフェースに依存し（図中の「依存（DI）」）、具象実装（`MetaMaskAdapter` など）をコンストラクタで注入します。これにより、`WalletService` は具体的な実装ではなく、インターフェースに依存するため、テストや拡張が容易になります
- **インターフェースの配置**: `WalletAdapter` インターフェースは Wallet Package 内に定義されています。これにより、Wallet Package が自己完結的なパッケージとして設計されています
- **拡張性**: 新しいウォレットアダプターを追加する場合は、`WalletAdapter` インターフェースを実装するだけで対応できます
