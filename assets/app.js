/* ==========================================================================
   Sinmido AI Tools Portal — 画面の組み立て
   ========================================================================== */

(function () {
  'use strict';

  var state = { cat: 'all', q: '' };

  var el = {
    tabs:    document.getElementById('catTabs'),
    grid:    document.getElementById('grid'),
    search:  document.getElementById('search'),
    count:   document.getElementById('resultCount'),
    stats:   document.getElementById('heroStats'),
    logout:  document.getElementById('logout'),
    year:    document.getElementById('year')
  };

  /* ---------- ユーティリティ ---------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  var ICON_EXTERNAL =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M7 17 17 7M9 7h8v8"/></svg>';

  /* ---------- 絞り込み ---------- */

  function matches(tool) {
    if (state.cat !== 'all' && tool.cat !== state.cat) return false;
    var q = state.q.trim().toLowerCase();
    if (!q) return true;
    var haystack = [
      tool.name, tool.tagline, tool.desc, (tool.tags || []).join(' '), tool.note
    ].join(' ').toLowerCase();
    return q.split(/\s+/).every(function (word) {
      return haystack.indexOf(word) !== -1;
    });
  }

  function visibleTools() {
    return TOOLS.filter(matches).sort(function (a, b) {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }

  /* ---------- 描画 ---------- */

  function renderStats() {
    var total  = TOOLS.length;
    var live   = TOOLS.filter(function (t) { return t.status === 'public'; }).length;
    var demo   = TOOLS.filter(function (t) { return t.status === 'demo';   }).length;
    var groups = CATEGORIES.length - 1;

    var rows = [
      { n: total,  label: '掲載ツール' },
      { n: live,   label: '公開中' },
      { n: demo,   label: 'デモ体験可' },
      { n: groups, label: 'カテゴリ' }
    ];

    el.stats.innerHTML = rows.map(function (r) {
      return '<div class="stat"><b>' + r.n + '</b><span>' + esc(r.label) + '</span></div>';
    }).join('');
  }

  function renderTabs() {
    el.tabs.innerHTML = CATEGORIES.map(function (c) {
      var n = c.id === 'all'
        ? TOOLS.length
        : TOOLS.filter(function (t) { return t.cat === c.id; }).length;
      return '<button type="button" class="cat-tab' +
        (state.cat === c.id ? ' active' : '') +
        '" data-cat="' + esc(c.id) + '">' + esc(c.label) +
        '<span class="n">' + n + '</span></button>';
    }).join('');
  }

  function cardHTML(t) {
    var isWip = (t.status === 'wip' || !t.url);
    var tag   = isWip ? 'div' : 'a';
    var attrs = isWip
      ? ' class="card is-wip' + (t.featured ? ' featured' : '') + '"'
      : ' class="card' + (t.featured ? ' featured' : '') + '"' +
        ' href="' + esc(t.url) + '" target="_blank" rel="noopener noreferrer"';

    var tags = (t.tags || []).map(function (x) {
      return '<span class="tag">' + esc(x) + '</span>';
    }).join('');

    var note = t.note
      ? '<p class="card-note">' + esc(t.note) + '</p>'
      : '';

    return '<' + tag + attrs + '>' +
      '<div class="card-head">' +
        '<div class="card-icon" aria-hidden="true">' + esc(t.icon || '🔧') + '</div>' +
        '<div class="card-titles">' +
          '<h3 class="card-name">' + esc(t.name) + '</h3>' +
          '<p class="card-tagline">' + esc(t.tagline) + '</p>' +
        '</div>' +
      '</div>' +
      '<p class="card-desc">' + esc(t.desc) + '</p>' +
      note +
      '<div class="card-tags">' + tags + '</div>' +
      '<div class="card-foot">' +
        '<span class="badge badge-' + esc(t.status) + '">' +
          esc(STATUS_LABEL[t.status] || t.status) + '</span>' +
        '<span class="card-go">' +
          (isWip ? '準備中' : '開く' + ICON_EXTERNAL) +
        '</span>' +
      '</div>' +
    '</' + tag + '>';
  }

  function renderGrid() {
    var list = visibleTools();

    if (!list.length) {
      el.grid.innerHTML =
        '<p class="empty">条件に合うツールがありませんでした。<br>' +
        'キーワードを変えるか、カテゴリを「すべて」に戻してください。</p>';
    } else {
      el.grid.innerHTML = list.map(cardHTML).join('');
    }

    var label = CATEGORIES.filter(function (c) { return c.id === state.cat; })[0];
    el.count.textContent =
      (label ? label.label : 'すべて') + ' — ' + list.length + '件を表示';
  }

  /* ---------- イベント ---------- */

  el.tabs.addEventListener('click', function (e) {
    var btn = e.target.closest('.cat-tab');
    if (!btn) return;
    state.cat = btn.getAttribute('data-cat');
    renderTabs();
    renderGrid();
  });

  el.search.addEventListener('input', function () {
    state.q = el.search.value;
    renderGrid();
  });

  el.logout.addEventListener('click', function () {
    window.AIPAuth.logout();
  });

  /* ---------- 起動 ---------- */

  el.year.textContent = new Date().getFullYear();
  renderStats();
  renderTabs();
  renderGrid();
})();
