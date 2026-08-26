/* ==========================================================================
   Sinmido AI Tools Portal — Claude 最新情報
   --------------------------------------------------------------------------
   ・ヘッダー下の「ニュース」タブの中身
   ・情報源での絞り込みとキーワード検索
   データは assets/news.js（自動生成）を読みます。
   タブの切り替えそのものは files-ui.js が全タブまとめて面倒を見ます。
   ========================================================================== */

(function () {
  'use strict';

  if (typeof NEWS === 'undefined' || !NEWS) { return; }

  var META = (typeof NEWS_META !== 'undefined' && NEWS_META) ? NEWS_META : {};
  var SOURCES = META.sources || [];

  var state = { src: 'all', q: '' };

  var el = {
    tabs:   document.getElementById('newsSrcTabs'),
    search: document.getElementById('newsSearch'),
    list:   document.getElementById('newsList'),
    count:  document.getElementById('newsCount'),
    note:   document.getElementById('newsNote'),
    n:      document.getElementById('nNews')
  };

  if (!el.list) { return; }

  /* ---------- ユーティリティ ---------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function srcLabel(id) {
    var hit = SOURCES.filter(function (s) { return s.id === id; });
    return hit.length ? hit[0].label : id;
  }

  /* "2026-08-25" -> "2026/08/25" */
  function fmtDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
    return m ? (m[1] + '/' + m[2] + '/' + m[3]) : '';
  }

  /* "2026-08-26T15:55:57+09:00" -> "2026/08/26 15:55" */
  function fmtStamp(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(String(iso || ''));
    return m ? (m[1] + '/' + m[2] + '/' + m[3] + ' ' + m[4] + ':' + m[5]) : '';
  }

  var NEW_DAYS = 14;

  function isNew(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
    if (!m) return false;
    var d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return (Date.now() - d.getTime()) < NEW_DAYS * 86400000;
  }

  /* 日本語があればそちら、無ければ原文 */
  function titleOf(n)   { return n.titleJa   || n.title   || ''; }
  function summaryOf(n) { return n.summaryJa || n.summary || ''; }
  function bulletsOf(n) { return n.bulletsJa || n.bullets || []; }

  var ICON_EXTERNAL =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M7 17 17 7M9 7h8v8"/></svg>';

  /* ---------- 絞り込み ---------- */

  function matches(n) {
    if (state.src !== 'all' && n.src !== state.src) return false;
    var q = state.q.trim().toLowerCase();
    if (!q) return true;

    var haystack = [
      n.title, n.titleJa, n.summary, n.summaryJa, n.why,
      n.cat, n.catJa, srcLabel(n.src),
      (n.bullets || []).join(' '), (n.bulletsJa || []).join(' '),
      fmtDate(n.date)
    ].join(' ').toLowerCase();

    return q.split(/\s+/).every(function (word) {
      return haystack.indexOf(word) !== -1;
    });
  }

  function visible() {
    return NEWS.filter(matches);
  }

  /* ---------- 描画 ---------- */

  function renderTabs() {
    var defs = [{ id: 'all', label: 'すべて' }].concat(
      SOURCES.map(function (s) { return { id: s.id, label: s.label }; })
    );

    el.tabs.innerHTML = defs.map(function (d) {
      var n = d.id === 'all'
        ? NEWS.length
        : NEWS.filter(function (x) { return x.src === d.id; }).length;
      return '<button type="button" class="cat-tab' +
        (state.src === d.id ? ' active' : '') +
        '" data-src="' + esc(d.id) + '">' + esc(d.label) +
        '<span class="n">' + n + '</span></button>';
    }).join('');
  }

  function itemHTML(n) {
    var title = titleOf(n);
    var summary = summaryOf(n);
    var bullets = bulletsOf(n);

    /* 見出しを日本語にしたときは、原題も小さく残す。
       原文にあたりたい人と、原語で検索したい人のため。 */
    var orig = (n.titleJa && n.title && n.titleJa !== n.title)
      ? '<p class="news-orig">原題: ' + esc(n.title) + '</p>'
      : '';

    var list = bullets.length
      ? '<ul class="news-bullets">' + bullets.map(function (b) {
          return '<li>' + esc(b) + '</li>';
        }).join('') + '</ul>'
      : '';

    var why = n.why
      ? '<p class="news-why"><span class="news-why-tag">ここが効く</span>' +
        esc(n.why) + '</p>'
      : '';

    return '<article class="news-item news-src-' + esc(n.src) + '">' +
      '<div class="news-meta">' +
        '<time class="news-date" datetime="' + esc(n.date) + '">' +
          esc(fmtDate(n.date)) + '</time>' +
        '<span class="news-cat">' + esc(n.catJa || n.cat || 'ニュース') + '</span>' +
        '<span class="news-from">' + esc(srcLabel(n.src)) + '</span>' +
        (isNew(n.date) ? '<span class="news-new">NEW</span>' : '') +
      '</div>' +
      '<h3 class="news-title">' +
        '<a href="' + esc(n.url) + '" target="_blank" rel="noopener noreferrer">' +
          esc(title) + ICON_EXTERNAL + '</a>' +
      '</h3>' +
      orig +
      (summary ? '<p class="news-summary">' + esc(summary) + '</p>' : '') +
      list +
      why +
    '</article>';
  }

  function renderList() {
    var list = visible();

    if (!list.length) {
      el.list.innerHTML =
        '<p class="empty">条件に合うニュースがありませんでした。<br>' +
        'キーワードを変えるか、情報源を「すべて」に戻してください。</p>';
    } else {
      el.list.innerHTML = list.map(itemHTML).join('');
    }

    var label = state.src === 'all' ? 'すべて' : srcLabel(state.src);
    var stamp = fmtStamp(META.updated);
    el.count.textContent = label + ' — ' + list.length + '件を表示' +
      (stamp ? '　最終更新 ' + stamp : '');
  }

  function renderNote() {
    if (!el.note) return;

    var links = SOURCES.map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' +
        esc(s.label) + '</a>';
    }).join(' ／ ');

    var lang = (META.lang === 'ja')
      ? '見出しと要約は原文を機械的に和訳したものです。細かい表現は原文と差が出ることがあります。'
      : '見出しと要約は原文（英語）のまま載せています。';

    el.note.innerHTML =
      '出典: ' + links + '　（1日1回、自動で取り込んでいます）<br>' +
      lang + '正確なところは各リンク先の原文をご確認ください。';
  }

  /* ---------- イベント ---------- */

  el.tabs.addEventListener('click', function (e) {
    var btn = e.target.closest('.cat-tab');
    if (!btn) return;
    state.src = btn.getAttribute('data-src');
    renderTabs();
    renderList();
  });

  el.search.addEventListener('input', function () {
    state.q = el.search.value;
    renderList();
  });

  /* ---------- 起動 ---------- */

  if (el.n) el.n.textContent = NEWS.length;
  renderTabs();
  renderList();
  renderNote();
})();
