# Agent Skills 解説

このドキュメントは、[Gemini CLI の Agent Skills](https://geminicli.com/docs/cli/skills/) についての解説です。

## 概要

Agent Skills は、Gemini CLI を専門的な知識、手順的なワークフロー、タスク固有のリソースで拡張するための機能です。Agent Skills オープンスタンダードに基づき、「スキル」は自己完結型のディレクトリで、指示とアセットをパッケージ化して発見可能な機能として提供します。

### 一般的なコンテキストファイルとの違い

- **GEMINI.md**: ワークスペース全体にわたる永続的な背景情報を提供
- **Skills**: **オンデマンドの専門知識**を表し、モデルの即座のコンテキストウィンドウを散らかすことなく、専門的な機能の広大なライブラリを維持可能

Gemini は、ユーザーのリクエストとスキルの説明に基づいて、自律的にスキルを使用するタイミングを決定します。関連するスキルが識別されると、モデルは `activate_skill` ツールを使用して、タスクを完了するために必要な完全な指示とリソースを「引き込み」ます。

## 主な利点

### 1. 共有された専門知識
複雑なワークフロー（特定のチームの PR レビュープロセスなど）を、誰でも使用できるフォルダにパッケージ化できます。

### 2. 繰り返し可能なワークフロー
手順的なフレームワークを提供することで、複雑な多段階タスクが一貫して実行されることを保証します。

### 3. リソースのバンドル
スクリプト、テンプレート、またはサンプルデータを指示と一緒に含めることで、エージェントが必要なすべてのものを提供できます。

### 4. 段階的な開示
最初に読み込まれるのはスキルのメタデータ（名前と説明）のみです。詳細な指示とリソースは、モデルが明示的にスキルをアクティブ化した場合にのみ開示され、コンテキストトークンを節約します。

## スキル発見の階層

Gemini CLI は、3つの主要な場所からスキルを発見します：

1. **Workspace Skills** (`.gemini/skills/`): ワークスペース固有のスキルで、通常はバージョン管理にコミットされ、チームと共有されます。
2. **User Skills** (`~/.gemini/skills/`): すべてのワークスペースで利用可能な個人用スキル。
3. **Extension Skills**: インストールされた拡張機能内にバンドルされているスキル。

### 優先順位

複数のスキルが同じ名前を共有している場合、優先順位の高い場所が低いものを上書きします：**Workspace > User > Extension**

## スキルの管理

### インタラクティブセッション内で

`/skills` スラッシュコマンドを使用して、利用可能な専門知識を表示および管理します：

- `/skills list` (デフォルト): 発見されたすべてのスキルとそのステータスを表示
- `/skills disable <name>`: 特定のスキルの使用を防止
- `/skills enable <name>`: 無効化されたスキルを再有効化
- `/skills reload`: すべての階層から発見されたスキルのリストを更新

**注意**: `/skills disable` と `/skills enable` はデフォルトで `user` スコープを使用します。ワークスペース固有の設定を管理するには `--scope workspace` を使用します。

### ターミナルから

`gemini skills` コマンドは管理ユーティリティを提供します：

```bash
# 発見されたすべてのスキルをリスト表示
gemini skills list

# Git リポジトリ、ローカルディレクトリ、または圧縮されたスキルファイル (.skill) からスキルをインストール
# デフォルトでユーザースコープを使用 (~/.gemini/skills)
gemini skills install https://github.com/user/repo.git
gemini skills install /path/to/local/skill
gemini skills install /path/to/local/my-expertise.skill

# --path を使用してモノレポまたはサブディレクトリから特定のスキルをインストール
gemini skills install https://github.com/my-org/my-skills.git --path skills/frontend-design

# ワークスペーススコープ (.gemini/skills) にインストール
gemini skills install /path/to/skill --scope workspace

# 名前でスキルをアンインストール
gemini skills uninstall my-expertise --scope workspace

# スキルを有効化（グローバル）
gemini skills enable my-expertise

# スキルを無効化。--scope を使用してワークスペースまたはユーザーを指定可能（デフォルトはワークスペース）
gemini skills disable my-expertise --scope workspace
```

## 動作の仕組み（セキュリティとプライバシー）

1. **発見**: セッションの開始時に、Gemini CLI は発見階層をスキャンし、有効なすべてのスキルの名前と説明をシステムプロンプトに注入します。

2. **アクティベーション**: Gemini がスキルの説明に一致するタスクを識別すると、`activate_skill` ツールを呼び出します。

3. **同意**: UI に確認プロンプトが表示され、スキルの名前、目的、アクセス権限が付与されるディレクトリパスが詳細に示されます。

4. **注入**: 承認後：
   - `SKILL.md` の本文とフォルダ構造が会話履歴に追加されます。
   - スキルのディレクトリがエージェントの許可されたファイルパスに追加され、バンドルされたアセットを読み取る権限が付与されます。

5. **実行**: モデルは、専門的な専門知識をアクティブにして続行します。合理的な範囲内でスキルの手順的なガイダンスを優先するよう指示されます。

## 独自のスキルを作成する

独自のスキルを作成するには、[Agent Skills 作成ガイド](https://geminicli.com/docs/cli/skills/) を参照してください。

## 参考リンク

- [Gemini CLI - Agent Skills 公式ドキュメント](https://geminicli.com/docs/cli/skills/)
- [Agent Skills オープンスタンダード](https://github.com/modelcontextprotocol/specification/blob/main/specification/agent-skills.md)
