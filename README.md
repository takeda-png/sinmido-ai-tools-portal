# Sinmido AI Tools Portal

株式会社シンミドウが実際に開発・運用しているAIツールを1か所にまとめた、
**関係者向けの限定公開ポータル**です。商談や提案でURLをお渡しして使います。

- ログイン画面: `index.html`
- ポータル本体: `portal.html`（「ツール」「資料」の2タブ）
- 掲載データ: `assets/tools.js`（ツール）/ `files/_manifest.json`（資料）

---

## ⚠️ 認証について（必ず読んでください）

GitHub Pages は **静的ホスティング（サーバー側の処理が無い）** ため、
このログインは **本物の認証ではありません**。

- 合言葉は平文で置かず SHA-256 ハッシュで比較しているので、**合言葉そのものは漏れません**
- ただし、技術のある人がソースを読めば **迂回できます**
- 位置づけは「鍵のかかったドア」ではなく **「URLと合言葉を渡した人だけが入る受付」**

**本当に見せてはいけないものは、このポータルに置かないでください。**
本物の認証が必要になったら、下の「自社サーバーへの移行」の手順で
PHP のセッション認証に差し替えます（HTML/CSS/JS はそのまま流用できます）。

---

## 合言葉

**このリポジトリは Public です。合言葉の実際の文字列はここに書きません。**
現在の値は社内で共有しているものを使ってください。

> 逆に言うと、合言葉を推測されにくい文字列にしておくことが唯一の防御です。
> 会社名＋西暦のような分かりやすいものは避けてください。

### 変更するには

1. 新しい合言葉のハッシュを出す

```bash
python -c "import hashlib;print(hashlib.sha256('新しい合言葉'.encode()).hexdigest())"
```

2. `assets/auth.js` の `passHash` に貼り替える

```js
passHash: 'ここに出てきた64文字',
```

3. commit → push（GitHub Pages に自動反映されます）

> 変更すると、それまでログイン済みだった人も再ログインが必要になります。

---

## ツールを追加・修正する

`assets/tools.js` の `TOOLS` 配列を編集するだけです。
**HTML には文言も件数も一切書いていません**（件数・カテゴリのタブは自動生成）。

```js
{
  id:      'my-tool',              // 一意のID
  name:    'ツール名',
  tagline: 'ひとことキャッチ',      // カード内の色付き1行
  desc:    '説明文（2〜3行）',
  cat:     'keiei',                // keiei / shukyaku / saiyo / bunseki
  tags:    ['タグ1', 'タグ2'],
  url:     'https://example.com/', // 準備中なら null
  status:  'public',               // public（公開中）/ demo（デモ）/ wip（準備中）
  icon:    '🔧',
  featured: true,                  // 省略可。「注目」バッジが付く
  note:    '補足（省略可）'
}
```

カテゴリを増やす場合は同ファイル上部の `CATEGORIES` に1行足します。

- `url: null` または `status: 'wip'` のカードは**リンクにならず「準備中」表示**になります
- `featured: true` のカードは一覧の先頭に寄ります

---

## 資料（ファイル）を配布する

ポータルの **「📁 資料」タブ** に PDF・画像・CSV・Excel・ZIP などを並べられます。
PDF / 画像 / CSV はポータル上でそのまま開け、それ以外はダウンロードになります。

### 追加するには（ポータルの画面から）

**ポータルの「資料」タブに、アップロード欄があります。**
ファイルをドラッグ＆ドロップ → 表示名・カテゴリ・説明・タグを入れて「公開する」だけです。
30秒〜1分で公開ページに反映されます（裏で GitHub にコミットしています）。

アップロード欄は**お客様には見えません**。次のどちらかの端末でだけ表示されます。

- GitHub トークンを保存済みの端末
- `portal.html#admin` を一度開いた端末

#### 初回だけ：GitHub トークンの登録

1. [Fine-grained personal access token を作る](https://github.com/settings/personal-access-tokens/new)
   - **Repository access**: Only select repositories → `sinmido-ai-tools-portal` だけ
   - **Permissions**: Repository permissions → **Contents: Read and write**
   - **Expiration**: 90日など（期限が切れたら作り直して入れ直します）
2. `portal.html#admin` を開き、出てきた欄にトークンを貼って「保存」

トークンは**その端末のブラウザ（localStorage）にだけ**保存されます。
リポジトリにも公開ページにも入りません。
**共用PCで使ったら「トークンを削除」を押してください。**

> この画面からは **1ファイル 25MB まで**です（GitHub API の都合）。
> それより大きいものは、下の `資料を追加.bat` を使ってください（100MB まで）。

### 追加するには（PCから・大きいファイル向け）

**`資料を追加.bat` に、追加したいファイルをドラッグ＆ドロップするだけ**です。

表示名・説明・カテゴリ・タグを順に聞かれる（Enter で既定値）ので、
答え終わると `files/` への取り込み → `assets/files.js` の生成 → commit → push まで自動で走ります。

> ⚠️ 画面からアップロードした資料は、**`git pull` しないとローカルには来ません**。
> `.bat` を使う前に `git pull --ff-only origin master` を実行してください
> （スクリプトが push 前に自動で pull するので、ぶつかったら教えてくれます）。

### コマンドでやる場合

```bash
python add_files.py 提案書.pdf 実績.xlsx
python add_files.py 提案書.pdf --cat teian --desc "2026年版" --tags 提案,工務店
python add_files.py 提案書.pdf -y            # 質問せず既定値で取り込む
python add_files.py 提案書.pdf --no-push     # コミットまでで止める
python add_files.py --list                   # 掲載中の一覧（ID が分かる）
python add_files.py --remove <ID>            # 1件取り下げ（ファイルも消えます）
python add_files.py --rebuild                # manifest から files.js を作り直す
```

### 説明文やカテゴリを後から直す

`files/_manifest.json` を直接編集して、

```bash
python add_files.py --rebuild
```

を実行すると `assets/files.js` が作り直されて push されます。
**`assets/files.js` は自動生成なので、直接編集しないでください。**

カテゴリ（`teian` / `shiryo` / `data` / `image` / `other`）を増やしたいときは、
`files/_manifest.json` の `categories` に `{ "id": "...", "label": "..." }` を足してから `--rebuild` します。

### ⚠️ 資料を置くときの注意

- **ログインは資料ファイルを守りません。** ファイルの URL
  （`.../files/pdf-20260824-xxxxxxxx.pdf`）を直接知っている人は、
  合言葉なしでダウンロードできます。**社外秘の資料は置かないでください。**
- リポジトリは Public です。**一度 push したファイルは git の履歴に残ります**
  （取り下げても過去のコミットからは取り出せます）。
- GitHub の制限で **1ファイル 100MB を超えると push できません**（50MB で警告）。
  スクリプトが事前に止めます。動画は YouTube の限定公開などをご検討ください。
- **GitHub トークンは端末のブラウザに平文で入ります。** 共用PCや貸出PCでは、
  使い終わったら必ず「トークンを削除」を押してください。対象リポジトリを1つに絞った
  Fine-grained トークンにしておけば、万一漏れてもこのリポジトリ以外は触られません。
- ファイル名は英数字に置き換えて保存されます（日本語URLで壊れないため）。
  **一覧に出る表示名は元のファイル名のまま**なので、見た目は変わりません。

---

## ローカルで確認する

`crypto.subtle`（合言葉の照合に使用）は **セキュアコンテキストでしか動きません**。
`file://` で直接開くとログインできないので、必ず簡易サーバーを立ててください。

```bash
cd ai-tools-portal
python -m http.server 8080
# → http://localhost:8080/ をブラウザで開く
```

---

## 公開（GitHub Pages）

```bash
git add -A
git commit -m "Update tools"
git push
```

push から反映まで 15〜30 秒ほどかかります。

---

## 自社サーバーへの移行

静的ファイルだけで組んであるので、**ファイルをそのままアップロードすれば動きます**。
本物の認証にする場合は、`index.html` を次の `login.php` に置き換え、
`portal.html` を `portal.php` にリネームして先頭にガードを1行入れるだけです。

**`login.php`（見た目は index.html のまま、`<form>` の中身だけ差し替え）**

```php
<?php
session_start();
$HASH = '...';   // password_hash() で作った値
if (!empty($_POST['pw']) && password_verify($_POST['pw'], $HASH)) {
    session_regenerate_id(true);
    $_SESSION['aip'] = true;
    header('Location: portal.php');
    exit;
}
$error = !empty($_POST['pw']);
?>
```

**`portal.php` の先頭**

```php
<?php
session_start();
if (empty($_SESSION['aip'])) { header('Location: login.php'); exit; }
?>
```

このとき `assets/auth.js` の読み込みと `guard()` の行、
`portal.html` のログアウトボタンの処理を PHP 側（`logout.php`）に差し替えます。
`style.css` / `tools.js` / `app.js` / `files.js` / `files-ui.js` は**一切変更不要**です。
資料を本当に保護したい場合は、移行後に `files/` を PHP 経由の配信
（セッションを確認してから `readfile()` する）に変えてください。

> sinmido.com は WordPress のため、サブディレクトリ（例 `/ai-tools/`）に直置きするか、
> Basic 認証（`.htaccess`）をかける方法もあります。

---

## ファイル構成

```
ai-tools-portal/
├── index.html          ログイン画面
├── portal.html         ポータル本体
├── assets/
│   ├── style.css       スタイル（配色はコーポレートカラー 紺 #1B4F9C）
│   ├── auth.js         合言葉の照合・ログイン状態の保持
│   ├── tools.js        ツールの掲載データ ★ここを触れば運用できます
│   ├── app.js          ツールのカード描画・検索・カテゴリ絞り込み
│   ├── files.js        資料の掲載データ（⚠️自動生成・直接編集しない）
│   ├── files-ui.js     資料の一覧描画・タブ切替・プレビュー
│   └── admin-upload.js 画面からのアップロード（GitHub API・管理者だけに表示）
├── files/              配布する資料の実体
│   └── _manifest.json  資料の管理台帳 ★説明文を直すのはここ
├── add_files.py        資料の取り込み〜push を自動化するスクリプト
├── 資料を追加.bat       ↑にファイルをD&Dするためのランチャー
├── .nojekyll
└── README.md
```
