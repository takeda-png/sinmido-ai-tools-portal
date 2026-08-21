# Sinmido AI Tools Portal

株式会社シンミドウが実際に開発・運用しているAIツールを1か所にまとめた、
**関係者向けの限定公開ポータル**です。商談や提案でURLをお渡しして使います。

- ログイン画面: `index.html`
- ポータル本体: `portal.html`
- 掲載データ: `assets/tools.js`

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
`style.css` / `tools.js` / `app.js` は**一切変更不要**です。

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
│   ├── tools.js        掲載データ ★ここだけ触れば運用できます
│   └── app.js          カード描画・検索・カテゴリ絞り込み
├── .nojekyll
└── README.md
```
