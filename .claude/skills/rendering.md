---
description: "React + CSS Gridを使ったグリッドベースのゲーム描画パターン。グリッドゲームUI実装、CSS Gridレイアウト設計、動的オブジェクト配置、ゲームUIのスタイリング・アニメーションで使用する。"
---

# React + CSS Grid ゲーム描画スキル

React + CSS Gridを使ったDOMベースのゲーム描画パターン。Canvas/WebGLを使わず、グリッドレイアウトでゲームボードを実装する。

## 使用タイミング

- グリッドベースのゲームUI実装
- CSS Gridを使ったレイアウト設計
- 動的オブジェクトの配置
- ゲームUIのスタイリングとアニメーション

## 技術スタック

| 技術 | 用途 |
|------|------|
| **React** | UIコンポーネントのレンダリング |
| **CSS Grid** | グリッドレイアウト |
| **CSS変数** | サイズや色の一元管理 |
| **インラインスタイル** | 動的な位置配置 |
| **CSSアニメーション** | 視覚効果 |

## 基本パターン

### グリッドレイアウトの設定

**CSS変数でサイズを管理:**
```css
:root {
  --tile-size: 50px;
  --grid-size: 10;
  --grid-gap: 2px;
}

.board {
  display: grid;
  grid-template-columns: repeat(var(--grid-size), var(--tile-size));
  grid-template-rows: repeat(var(--grid-size), var(--tile-size));
  gap: var(--grid-gap);
  position: relative;  /* 絶対配置の基準 */
}
```

### タイルのレンダリング

**2次元配列からタイルを生成:**
```tsx
{gridData.map((row, y) =>
  row.map((tile, x) => (
    <div key={`${y}-${x}`} className={`tile tile-${tile}`} />
  ))
)}
```

### 動的オブジェクトの配置

**グリッド位置で配置（重要: Gridは1ベース）:**
```tsx
<div
  className="object"
  style={{
    position: 'absolute',
    gridColumnStart: position.x + 1,  // 配列は0ベース、Gridは1ベース
    gridRowStart: position.y + 1,
  }}
/>
```

**中央揃えの計算:**
```css
.object {
  transform: translate(
    calc(var(--tile-size) * offset-ratio),
    calc(var(--tile-size) * offset-ratio)
  );
}
```

## 重要なポイント

### Grid位置のインデックス

- **CSS Gridは1ベース**: `gridColumnStart: 1`が最初の列
- **配列は0ベース**: `array[0][0]`が最初の要素
- **変換が必要**: `gridColumnStart: x + 1`

### 絶対配置の基準

- 親要素に`position: relative`が必要
- `gridColumnStart`/`gridRowStart`でグリッド位置を指定
- `transform: translate()`で微調整

### パフォーマンス

- 小規模グリッド（10x10程度）では問題なし
- 大規模グリッド（100x100以上）では仮想化を検討
- Canvas/WebGLへの移行も検討可能

## ベストプラクティス

### CSS変数の活用

- サイズをCSS変数で一元管理
- `calc()`で動的計算
- レスポンシブ対応が容易

### パフォーマンス最適化

- `key` propを適切に設定
- 条件付きレンダリングで不要な要素を排除
- `useCallback`/`useMemo`でメモ化

### 型安全性

- Propsに型定義を付ける
- 位置情報の型を明確にする

## トラブルシューティング

### オブジェクトが正しい位置に表示されない

- Grid位置のインデックスを確認（0ベース→1ベース変換）
- `transform`の計算を確認

### タイルが重なって表示される

- `gap`プロパティが設定されているか確認
- タイルサイズが正しいか確認

### アニメーションが滑らかでない

- `transition`が設定されているか確認
- `will-change: transform`でハードウェアアクセラレーションを有効化
