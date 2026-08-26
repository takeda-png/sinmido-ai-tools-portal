/* ==========================================================================
   Sinmido AI Tools Portal — 掲載データ
   --------------------------------------------------------------------------
   ツールを追加・修正するときは、このファイルの TOOLS 配列を編集するだけです。
   HTML には一切数値・文言を書いていません。

   1件のかたち:
   {
     id:      "一意のID（英数字とハイフン）",
     name:    "ツール名",
     tagline: "ひとことキャッチ（カード内で色付き1行）",
     desc:    "説明文（2〜3行程度）",
     cat:     "カテゴリID（CATEGORIES のいずれか）",
     tags:    ["タグ", "タグ"],
     url:     "リンク先URL（準備中なら null）",
     status:  "public" | "demo" | "wip",
     icon:    "絵文字1〜2文字",
     featured:true,          // 省略可。カードに「注目」バッジが付く
     note:    "補足（任意）"  // 省略可。カード下部に小さく出る
   }
   ========================================================================== */

var CATEGORIES = [
  { id: 'all',      label: 'すべて' },
  { id: 'keiei',    label: '経営・数値管理' },
  { id: 'shukyaku', label: '集客・マーケティング' },
  { id: 'saiyo',    label: '採用・人材' },
  { id: 'bunseki',  label: '分析・診断' }
];

var STATUS_LABEL = {
  public: '公開中',
  demo:   'デモ',
  wip:    '準備中'
};

var TOOLS = [

  /* ---------------- 経営・数値管理 ---------------- */

  {
    id: 'koumuten-dx',
    name: '工務店DXスイート',
    tagline: '経営から現場まで28モジュール',
    desc: '経営ダッシュボード・実行予算・案件進行ボード・工程管理・集客管理まで、工務店の業務をひととおり1画面に収めた統合デモ。以下の各モジュールはこの中に入っています。',
    cat: 'keiei',
    tags: ['工務店', '住宅', '統合管理', '28モジュール'],
    url: 'https://takeda-png.github.io/koumuten-dx-suite-demo/',
    status: 'demo',
    icon: '🏗️',
    featured: true
  },
  {
    id: 'plan3',
    name: '3ヶ年経営計画',
    tagline: '目標から必要な反響数まで逆算',
    desc: '3年後の完工棟数・平均単価・粗利率を入れると1年目2年目を自動生成。完工→受注→商談→反響→広告費まで逆算し、人員計画と中期経営計画書まで出力します。',
    cat: 'keiei',
    tags: ['経営計画', '逆算KPI', '人員計画'],
    url: 'https://takeda-png.github.io/koumuten-dx-suite-demo/',
    status: 'demo',
    icon: '📈',
    note: '工務店DXスイート内 ▸ 経営 ▸ 3ヶ年経営計画'
  },
  {
    id: 'chakuchi',
    name: '売上・粗利 着地予測',
    tagline: '確度で重みづけして年度着地を出す',
    desc: '案件ごとの進捗（引渡済・着工中・受注済・見込A/B/C）に確度の重みをかけて年度の着地を予測。見積の予測粗利と工事台帳の確定粗利の乖離、不足額の逆算まで表示します。',
    cat: 'keiei',
    tags: ['着地予測', '粗利管理', '受注残'],
    url: 'https://takeda-png.github.io/koumuten-dx-suite-demo/',
    status: 'demo',
    icon: '🎯',
    note: '工務店DXスイート内 ▸ 経営 ▸ 売上・粗利 着地予測'
  },
  {
    id: 'joseikin',
    name: '研修助成金シミュレーター',
    tagline: '人材開発支援助成金をその場で試算',
    desc: '職種と人数を入れるだけで最適なコースを自動で割り当て、助成額・研修費用・申請代行費用まで含めた「会社の実質負担」を算出。実質0円になる条件も逆算できます。',
    cat: 'keiei',
    tags: ['助成金', '人材開発支援', '試算'],
    url: 'https://takeda-png.github.io/koumuten-dx-suite-demo/',
    status: 'demo',
    icon: '💴',
    note: '工務店DXスイート内 ▸ 実践記録'
  },

  /* ---------------- 集客・マーケティング ---------------- */

  {
    id: 'shukyaku-kanri',
    name: '集客管理表（広告・CPA）',
    tagline: '広告予算を必要来場数から逆算',
    desc: '「営業人数 × 1人あたり必要来場数 × 目標CPA」で部門別に広告予算を逆算して合算。媒体別の消化・CV・来場単価を並べ、切り捨て候補の媒体が一目で分かります。',
    cat: 'shukyaku',
    tags: ['広告運用', 'CPA', '来場管理'],
    url: 'https://takeda-png.github.io/koumuten-dx-suite-demo/',
    status: 'demo',
    icon: '📊',
    note: '工務店DXスイート内 ▸ 集客 ▸ 集客管理表'
  },
  {
    id: 'column-ai',
    name: 'コラム生成AI',
    tagline: 'テーマを選ぶだけで記事の骨組みが出る',
    desc: 'テーマ・エリア・読者・狙いを選ぶと、タイトル案・メタディスクリプション・見出し構成・リード文・狙うキーワードまで生成。AI検索に拾われる構成チェックも付いています。',
    cat: 'shukyaku',
    tags: ['SEO', 'コンテンツ', '記事生成'],
    url: 'https://takeda-png.github.io/koumuten-dx-suite-demo/',
    status: 'demo',
    icon: '📝',
    note: '工務店DXスイート内 ▸ 集客 ▸ コラム生成AI'
  },
  {
    id: 'sns-ai',
    name: 'SNS投稿AI',
    tagline: '現場写真から投稿文を組み立てる',
    desc: '施工事例や現場の状況から、媒体に合わせた投稿文とハッシュタグを生成。投稿カレンダーと合わせて、担当者が変わっても発信が止まらない運用にします。',
    cat: 'shukyaku',
    tags: ['SNS', 'Instagram', '投稿文'],
    url: 'https://takeda-png.github.io/koumuten-dx-suite-demo/',
    status: 'demo',
    icon: '📱',
    note: '工務店DXスイート内 ▸ 集客 ▸ SNS投稿AI'
  },
  {
    id: 'auto-column',
    name: 'AIコラム自動生成（運用実績）',
    tagline: '検索データから記事を作り自動で公開',
    desc: 'Search Console と GA4 の実データから書くべきテーマを決め、記事を生成してWordPressへ自動投稿。サイトマップ更新とインデックス申請まで自動化しています。実際に運用中のサイトです。',
    cat: 'shukyaku',
    tags: ['自動投稿', 'WordPress', '運用実績'],
    url: 'https://sinmido.com/news/',
    status: 'public',
    icon: '⚙️'
  },

  /* ---------------- 採用・人材 ---------------- */

  {
    id: 'recruit-chatbot',
    name: 'AI採用チャットボット',
    tagline: '応募者の質問に24時間答える',
    desc: '自社のFAQを読み込ませたRAG型のチャットボット。選考フロー・待遇・福利厚生といった会社固有の質問に、サイト上でその場で回答します。実際に採用サイトで稼働中です。',
    cat: 'saiyo',
    tags: ['チャットボット', 'RAG', '採用サイト'],
    url: 'https://sinmido-recruit.com/',
    status: 'public',
    icon: '💬'
  },
  {
    id: 'area-report',
    name: '市区町村別 採用市場レポート',
    tagline: '埼玉県19市の採用環境をデータで',
    desc: 'さいたま市・川越市・川口市など埼玉県内19市について、有効求人倍率・産業構成・通勤動向といった採用環境をエリア単位でまとめたレポート集です。',
    cat: 'saiyo',
    tags: ['採用市場', '埼玉県', 'エリア分析'],
    url: 'https://sinmido.com/saitama-recruit-report/',
    status: 'public',
    icon: '🗾'
  },
  {
    id: 'whitepaper-100',
    name: '埼玉県内企業100社 新卒採用実態調査',
    tagline: '採用した会社としなかった会社の差',
    desc: '埼玉県内100社に聞いた新卒採用の実態調査。「成長を実感している」と答えた割合は採用あり74.4%に対し採用なし26.2%。3年離職率の実態と、未採用企業が抱く予想とのズレも収録しています。',
    cat: 'saiyo',
    tags: ['独自調査', '100社', 'ホワイトペーパー'],
    url: null,
    status: 'wip',
    icon: '📕',
    note: '配布用PDFを準備中です'
  },

  /* ---------------- 分析・診断 ---------------- */

  {
    id: 'ai-shindan',
    name: 'AI検索 無料診断',
    tagline: 'AIは自社をどう紹介しているか',
    desc: 'ChatGPTやClaudeに自社のことを聞いたとき、どう答えられているかを実際に調べて診断レポートにします。競合と比べてどう見えているかも分かります。無料です。',
    cat: 'bunseki',
    tags: ['AI検索', 'LLMO', '無料診断'],
    url: 'https://sinmido.com/service/p8331/',
    status: 'public',
    icon: '🤖',
    featured: true
  },
  {
    id: 'ai-shien',
    name: 'AI活用支援',
    tagline: '大手の約1/10のコストで2週間から',
    desc: '業務のどこにAIを入れるかの設計から、実際に動くものを作るところまで伴走します。大がかりなシステムを作らず、現場が明日から使える形に落とすのが方針です。',
    cat: 'bunseki',
    tags: ['AI導入', '業務効率化', '伴走支援'],
    url: 'https://sinmido.com/ai/',
    status: 'public',
    icon: '✨'
  },
  {
    id: 'ai-results',
    name: 'AI活用実績レポート',
    tagline: '自社で回した結果を数字で公開',
    desc: '自社サイトでAI活用を進めた結果、訪問者2.45倍・問い合わせ1.89倍。何をどう回してその数字になったのかを、実データのグラフ付きでまとめたレポートです。',
    cat: 'bunseki',
    tags: ['実績', 'GA4', '数値公開'],
    url: null,
    status: 'wip',
    icon: '📗',
    note: '公開範囲を調整中です'
  }
];
