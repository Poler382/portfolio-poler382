# 🎨 Intro TechStack

技術スタックを美しいカードで共有するための Web アプリケーション

![Demo](https://img.shields.io/badge/demo-live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38BDF8)

## ✨ 機能

### 🖼️ プロフィール設定

- **画像アップロード**: ドラッグ&ドロップまたはファイル選択
- **名前入力**: 任意の名前を設定
- **リアルタイムプレビュー**: 設定内容を即座に反映

### 🛠️ 技術スタック選択

- **70+ の技術**: React, Vue, Python, Unity など幅広く対応
- **カテゴリ別表示**: Frontend, Backend, Database, Tools など
- **検索機能**: 技術名での絞り込み
- **視覚的選択**: アイコン付きチェックボックス

### 🎯 ドラッグ&ドロップ並び替え

- **直感的操作**: マウス・タッチ対応
- **視覚フィードバック**: ドラッグ中のハイライト
- **順序保存**: 選択した順番を維持

### 📱 PNG カード生成

- **高品質出力**: 2x スケールで高解像度
- **ワンクリックダウンロード**: PNG 形式で保存
- **SNS シェア対応**: 最適なサイズで生成

## 🚀 技術スタック

| カテゴリ              | 技術                             |
| --------------------- | -------------------------------- |
| **フレームワーク**    | Next.js 15, React 19, TypeScript |
| **スタイリング**      | Tailwind CSS v4, DaisyUI         |
| **アニメーション**    | Framer Motion                    |
| **ドラッグ&ドロップ** | @dnd-kit                         |
| **画像生成**          | html2canvas                      |
| **アイコン**          | react-icons                      |

## 🛠️ セットアップ

### 前提条件

- Node.js 18+
- pnpm (推奨)

### インストール

\`\`\`bash

# プロジェクトクローン

git clone <repository-url>
cd intro-techstack

# 依存関係インストール

pnpm install

# 開発サーバー起動

pnpm dev
\`\`\`

### 本番ビルド

\`\`\`bash

# プロダクションビルド

pnpm build

# 静的サイト生成

pnpm export
\`\`\`

## 📖 使い方

### 1. プロフィール設定

1. **画像アップロード**: プロフィール画像をドラッグ&ドロップまたは選択
2. **名前入力**: 表示したい名前を入力

### 2. 技術選択

1. **カテゴリフィルター**: 必要に応じてカテゴリで絞り込み
2. **検索**: 技術名で検索して素早く見つける
3. **選択**: 使用する技術をクリックして選択

### 3. 並び替え

1. **ドラッグ&ドロップ**: 選択した技術をドラッグして順序変更
2. **リアルタイムプレビュー**: 変更が即座にカードに反映

### 4. ダウンロード

1. **プレビュー確認**: 右側でカードの仕上がりを確認
2. **PNG ダウンロード**: 「PNG でダウンロード」ボタンでカード保存

## 🎨 カスタマイズ

### 技術追加

\`src/data/techStacks.ts\` に新しい技術を追加できます：

\`\`\`typescript
{
id: "new-tech",
name: "New Technology",
icon: SiNewTech,
color: "#FF6B6B",
category: "Frontend"
}
\`\`\`

### テーマ変更

\`tailwind.config.ts\` でカラーテーマをカスタマイズ可能

### カードデザイン

\`src/components/CardPreview.tsx\` でカードレイアウトを調整

## 📂 プロジェクト構造

\`\`\`
intro-techstack/
├── src/
│ ├── app/
│ │ ├── page.tsx # メインページ
│ │ ├── layout.tsx # レイアウト設定
│ │ └── globals.css # グローバルスタイル
│ ├── components/
│ │ ├── Header.tsx # ヘッダーコンポーネント
│ │ ├── ProfileSection.tsx # プロフィール設定
│ │ ├── TechStackSelector.tsx # 技術選択
│ │ ├── SelectedTechList.tsx # DnD 並び替え
│ │ ├── CardPreview.tsx # カードプレビュー
│ │ └── DownloadButton.tsx # ダウンロード機能
│ └── data/
│ └── techStacks.ts # 技術データ定義
├── tailwind.config.ts # Tailwind 設定
└── package.json # 依存関係
\`\`\`

## 🤝 貢献

プルリクエストを歓迎します。大きな変更の場合は、まず Issue で議論してください。

## 📝 ライセンス

MIT ライセンス

## 🔗 関連リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [@dnd-kit](https://dndkit.com/)

---

Made with ❤️ by [Your Name]
