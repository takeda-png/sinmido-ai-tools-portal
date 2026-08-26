/* ==========================================================================
   Sinmido AI Tools Portal — 資料ライブラリ
   --------------------------------------------------------------------------
   ・ヘッダー下の「ツール／資料」タブ切り替え
   ・資料の検索・カテゴリ絞り込み・一覧表示
   ・PDF / 画像 / CSV はその場でプレビュー、それ以外はダウンロード
   データは assets/files.js（自動生成）を読みます。
   ========================================================================== */

(function () {
  'use strict';

  if (typeof FILES === 'undefined') { return; }

  var state = { cat: 'all', q: '' };

  var el = {
    viewTabs:  document.getElementById('viewTabs'),
    viewTools: document.getElementById('view-tools'),
    viewFiles: document.getElementById('view-files'),
    nTools:    document.getElementById('nTools'),
    nFiles:    document.getElementById('nFiles'),
    catTabs:   document.getElementById('fileCatTabs'),
    search:    document.getElementById('fileSearch'),
    list:      document.getElementById('fileList'),
    count:     document.getElementById('fileCount'),
    viewer:    document.getElementById('viewer'),
    vTitle:    document.getElementById('viewerTitle'),
    vMeta:     document.getElementById('viewerMeta'),
    vBody:     document.getElementById('viewerBody'),
    vDl:       document.getElementById('viewerDl'),
    vClose:    document.getElementById('viewerClose')
  };

  /* ---------- ユーティリティ ---------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fmtSize(bytes) {
    var n = Number(bytes) || 0;
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(0) + ' KB';
    return (n / 1048576).toFixed(n < 10485760 ? 1 : 0) + ' MB';
  }

  function fmtDate(s) {
    if (!s) return '';
    var m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})/);
    return m ? (m[1] + '.' + m[2] + '.' + m[3]) : String(s);
  }

  /* ダウンロード時のファイル名。表示名に拡張子が無ければ足す
     （足さないと拡張子なしで保存され、Excel などが開けなくなる） */
  function dlName(f) {
    var name = String(f && f.name || 'file');
    var ext  = String(f && f.ext || '').toLowerCase();
    if (!ext) return name;
    return name.toLowerCase().slice(-(ext.length + 1)) === ('.' + ext)
      ? name : (name + '.' + ext);
  }

  /* この資料がどのツールのものか（assets/tools.js を引く） */
  function toolNameOf(f) {
    if (!f || !f.tool || typeof TOOLS === 'undefined') return '';
    var hit = TOOLS.filter(function (t) { return t.id === f.tool; });
    return hit.length ? hit[0].name : '';
  }

  var IMAGE_EXT = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'];
  var TEXT_EXT  = ['csv', 'txt', 'md', 'tsv', 'json'];

  function kindOf(f) {
    var e = String(f.ext || '').toLowerCase();
    if (e === 'pdf') return 'pdf';
    if (IMAGE_EXT.indexOf(e) !== -1) return 'image';
    if (TEXT_EXT.indexOf(e) !== -1) return 'text';
    return 'binary';
  }

  function canPreview(f) { return kindOf(f) !== 'binary'; }

  /* 拡張子ごとの色分け（バッジ） */
  function extClass(ext) {
    var e = String(ext || '').toLowerCase();
    if (e === 'pdf') return 'ext-pdf';
    if (['xlsx', 'xls', 'csv', 'tsv'].indexOf(e) !== -1) return 'ext-sheet';
    if (['pptx', 'ppt', 'key'].indexOf(e) !== -1) return 'ext-slide';
    if (['docx', 'doc'].indexOf(e) !== -1) return 'ext-doc';
    if (['zip', 'rar', '7z'].indexOf(e) !== -1) return 'ext-zip';
    if (IMAGE_EXT.indexOf(e) !== -1) return 'ext-img';
    return 'ext-other';
  }

  var ICON_EYE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M1.8 12S5.5 5 12 5s10.2 7 10.2 7-3.7 7-10.2 7S1.8 12 1.8 12Z"/>' +
    '<circle cx="12" cy="12" r="3"/></svg>';

  var ICON_BOOK =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H12v16H5.5A1.5 1.5 0 0 0 4 20.5Z"/>' +
    '<path d="M20 4.5A1.5 1.5 0 0 0 18.5 3H12v16h6.5a1.5 1.5 0 0 1 1.5 1.5Z"/></svg>';

  var ICON_DL =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 20h16"/></svg>';

  /* ---------- 絞り込み ---------- */

  function matches(f) {
    if (state.cat !== 'all' && f.cat !== state.cat) return false;
    var q = state.q.trim().toLowerCase();
    if (!q) return true;
    var hay = [f.name, f.desc, (f.tags || []).join(' '), f.ext,
               toolNameOf(f), f.role === 'guide' ? '導入手順書 手順書' : '']
      .join(' ').toLowerCase();
    return q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
  }

  function visibleFiles() {
    return FILES.filter(matches).sort(function (a, b) {
      return String(b.date || '').localeCompare(String(a.date || ''));
    });
  }

  /* ---------- 描画 ---------- */

  function renderCatTabs() {
    var cats = FILE_CATEGORIES.filter(function (c) {
      return c.id === 'all' || FILES.some(function (f) { return f.cat === c.id; });
    });
    el.catTabs.innerHTML = cats.map(function (c) {
      var n = c.id === 'all'
        ? FILES.length
        : FILES.filter(function (f) { return f.cat === c.id; }).length;
      return '<button type="button" class="cat-tab' +
        (state.cat === c.id ? ' active' : '') +
        '" data-cat="' + esc(c.id) + '">' + esc(c.label) +
        '<span class="n">' + n + '</span></button>';
    }).join('');
  }

  var ICON_DOC =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M14 2.5H7A1.5 1.5 0 0 0 5.5 4v16A1.5 1.5 0 0 0 7 21.5h10a1.5 1.5 0 0 0 1.5-1.5V7Z"/>' +
    '<path d="M14 2.5V7h4.5"/></svg>';

  function cardHTML(f, index) {
    var kind = kindOf(f);

    /* 画像は中身をそのまま、それ以外は拡張子の色でプレースホルダを出す。
       カードの高さがそろって一覧が読みやすくなる。 */
    var thumb = (kind === 'image')
      ? '<div class="file-thumb"><img src="' + esc(f.path) + '" alt="" loading="lazy"></div>'
      : '<div class="file-thumb file-thumb-ph ' + extClass(f.ext) + '">' +
        ICON_DOC + '<span>' + esc(String(f.ext || '?').toUpperCase()) + '</span></div>';

    var tags = (f.tags || []).map(function (x) {
      return '<span class="tag">' + esc(x) + '</span>';
    }).join('');

    var meta = [fmtSize(f.size), fmtDate(f.date)]
      .filter(Boolean).map(function (x) { return esc(x); }).join(' ・ ');

    var preview = canPreview(f)
      ? '<button type="button" class="file-btn file-btn-view" data-i="' + index + '">' +
        ICON_EYE + '見る</button>'
      : '';

    /* このツールの導入手順書へ。手順書そのもののカードには出さない
       （同じものが開くだけで、ダウンロードのボタンと重なるため） */
    var guideBtn = (f.tool && f.role !== 'guide' &&
                    window.AIPTools && window.AIPTools.hasGuide &&
                    window.AIPTools.hasGuide(f.tool))
      ? '<button type="button" class="file-btn file-btn-guide" data-tool="' +
        esc(f.tool) + '">' + ICON_BOOK + '導入手順書</button>'
      : '';

    var tname = toolNameOf(f);
    var toolBadge = tname
      ? '<span class="file-tool' + (f.role === 'guide' ? ' is-guide' : '') + '">' +
        (f.role === 'guide' ? '📖 ' : '🧰 ') + esc(tname) +
        (f.role === 'guide' ? ' の導入手順書' : ' の資料') + '</span>'
      : '';

    return '<article class="file-card">' +
      thumb +
      toolBadge +
      '<div class="file-head">' +
        '<span class="file-ext ' + extClass(f.ext) + '">' +
          esc(String(f.ext || '?').toUpperCase()) + '</span>' +
        '<div class="file-titles">' +
          '<h3 class="file-name">' + esc(f.name) + '</h3>' +
          '<p class="file-meta">' + meta + '</p>' +
        '</div>' +
      '</div>' +
      (f.desc ? '<p class="file-desc">' + esc(f.desc) + '</p>' : '') +
      (tags ? '<div class="card-tags">' + tags + '</div>' : '') +
      '<div class="file-foot">' +
        preview +
        guideBtn +
        '<a class="file-btn file-btn-dl" href="' + esc(f.path) + '" download="' +
          esc(dlName(f)) + '">' + ICON_DL + 'ダウンロード</a>' +
      '</div>' +
    '</article>';
  }

  function renderList() {
    if (!FILES.length) {
      el.list.innerHTML =
        '<p class="empty">まだ資料がありません。<br>' +
        '上の「資料をアップロード」欄にファイルをドラッグ＆ドロップすると、ここに並びます。</p>';
      el.count.textContent = '';
      return;
    }

    var list = visibleFiles();
    if (!list.length) {
      el.list.innerHTML =
        '<p class="empty">条件に合う資料がありませんでした。<br>' +
        'キーワードを変えるか、カテゴリを「すべて」に戻してください。</p>';
    } else {
      el.list.innerHTML = list.map(function (f) {
        return cardHTML(f, FILES.indexOf(f));
      }).join('');
    }

    var label = FILE_CATEGORIES.filter(function (c) { return c.id === state.cat; })[0];
    el.count.textContent =
      (label ? label.label : 'すべて') + ' — ' + list.length + '件を表示';
  }

  /* ---------- プレビュー ---------- */

  var lastFocus = null;

  function openViewer(f) {
    lastFocus = document.activeElement;
    el.vTitle.textContent = f.name;
    el.vMeta.textContent =
      [String(f.ext || '').toUpperCase(), fmtSize(f.size), fmtDate(f.date)]
        .filter(Boolean).join(' ・ ');
    el.vDl.href = f.path;
    el.vDl.setAttribute('download', dlName(f));
    el.vBody.innerHTML = '<p class="viewer-loading">読み込んでいます…</p>';
    el.viewer.hidden = false;
    document.body.classList.add('viewer-open');
    el.vClose.focus();

    var kind = kindOf(f);

    if (kind === 'image') {
      el.vBody.innerHTML =
        '<div class="viewer-image"><img src="' + esc(f.path) + '" alt="' +
        esc(f.name) + '"></div>';
      return;
    }

    if (kind === 'pdf') {
      el.vBody.innerHTML =
        '<iframe class="viewer-pdf" src="' + esc(f.path) +
        '#view=FitH" title="' + esc(f.name) + '"></iframe>' +
        '<p class="viewer-fallback">表示されない場合は' +
        '<a href="' + esc(f.path) + '" target="_blank" rel="noopener noreferrer">' +
        '新しいタブで開く</a>か、ダウンロードしてご覧ください。</p>';
      return;
    }

    /* テキスト系（CSV / TSV / TXT / MD / JSON） */
    fetch(f.path).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.arrayBuffer();
    }).then(function (buf) {
      var text = decodeText(buf);
      var e = String(f.ext || '').toLowerCase();
      if (e === 'csv' || e === 'tsv') {
        el.vBody.innerHTML = tableHTML(text, e === 'tsv' ? '\t' : ',');
      } else {
        el.vBody.innerHTML = '<pre class="viewer-text">' + esc(text.slice(0, 200000)) + '</pre>';
      }
    }).catch(function () {
      el.vBody.innerHTML =
        '<p class="viewer-fallback">この環境ではプレビューできませんでした。' +
        'ダウンロードしてご覧ください。</p>';
    });
  }

  /* 文字コード判定：UTF-8 で読めなければ Shift_JIS（Excel の CSV 対策） */
  function decodeText(buf) {
    try {
      return new TextDecoder('utf-8', { fatal: true }).decode(buf);
    } catch (e) {
      try { return new TextDecoder('shift_jis').decode(buf); }
      catch (e2) { return new TextDecoder('utf-8').decode(buf); }
    }
  }

  /* 引用符つきの区切りテキストを表に組む（先頭200行・40列まで） */
  function parseDelimited(text, delim) {
    var rows = [], row = [], cell = '', quoted = false;
    var src = String(text)
      .replace(/^﻿/, '')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n');

    for (var i = 0; i < src.length; i++) {
      var ch = src.charAt(i);
      if (quoted) {
        if (ch === '"') {
          if (src.charAt(i + 1) === '"') { cell += '"'; i++; }
          else { quoted = false; }
        } else { cell += ch; }
      } else if (ch === '"') { quoted = true; }
      else if (ch === delim) { row.push(cell); cell = ''; }
      else if (ch === '\n') {
        row.push(cell); rows.push(row); row = []; cell = '';
        if (rows.length >= 200) break;
      }
      else { cell += ch; }
    }
    if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }

  function tableHTML(text, delim) {
    var rows = parseDelimited(text, delim);
    if (!rows.length) return '<p class="viewer-fallback">中身が空でした。</p>';

    var maxCol = 40;
    var head = rows[0].slice(0, maxCol);
    var body = rows.slice(1);

    var html = '<div class="viewer-table-wrap"><table class="viewer-table"><thead><tr>' +
      head.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      body.map(function (r) {
        return '<tr>' + head.map(function (_, i) {
          return '<td>' + esc(r[i] == null ? '' : r[i]) + '</td>';
        }).join('') + '</tr>';
      }).join('') +
      '</tbody></table></div>';

    if (rows.length >= 200 || rows[0].length > maxCol) {
      html += '<p class="viewer-fallback">先頭 ' + body.length + ' 行 / ' + head.length +
        ' 列までを表示しています。全体はダウンロードしてご確認ください。</p>';
    }
    return html;
  }

  function closeViewer() {
    el.viewer.hidden = true;
    el.vBody.innerHTML = '';
    document.body.classList.remove('viewer-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- 表示の切り替え ---------- */

  /* タブは「ツール／資料／ニュース」と増えていくので、
     data-view と <section id="view-○○"> の対応だけを見て切り替える。
     タブを足すときは HTML に1組足すだけでよく、ここは触らなくていい。 */
  function setView(view) {
    var sections = document.querySelectorAll('.view');
    var known = false;

    Array.prototype.forEach.call(sections, function (s) {
      if (s.id === 'view-' + view) known = true;
    });
    if (!known) view = 'tools';

    Array.prototype.forEach.call(sections, function (s) {
      s.hidden = (s.id !== 'view-' + view);
    });

    Array.prototype.forEach.call(
      el.viewTabs.querySelectorAll('.view-tab'),
      function (b) {
        var on = b.getAttribute('data-view') === view;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      }
    );

    try {
      history.replaceState(null, '', '#' + view);
    } catch (e) {
      window.location.hash = view;
    }
  }

  /* ---------- イベント ---------- */

  el.viewTabs.addEventListener('click', function (e) {
    var btn = e.target.closest('.view-tab');
    if (!btn) return;
    setView(btn.getAttribute('data-view'));
  });

  el.catTabs.addEventListener('click', function (e) {
    var btn = e.target.closest('.cat-tab');
    if (!btn) return;
    state.cat = btn.getAttribute('data-cat');
    renderCatTabs();
    renderList();
  });

  el.search.addEventListener('input', function () {
    state.q = el.search.value;
    renderList();
  });

  el.list.addEventListener('click', function (e) {
    var gb = e.target.closest('.file-btn-guide');
    if (gb) {
      if (window.AIPTools && window.AIPTools.openGuide) {
        window.AIPTools.openGuide(gb.getAttribute('data-tool'));
      }
      return;
    }

    var btn = e.target.closest('.file-btn-view');
    if (!btn) return;
    var f = FILES[Number(btn.getAttribute('data-i'))];
    if (f) openViewer(f);
  });

  el.vClose.addEventListener('click', closeViewer);

  el.viewer.addEventListener('click', function (e) {
    if (e.target === el.viewer) closeViewer();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !el.viewer.hidden) closeViewer();
  });

  /* ---------- 起動 ---------- */

  el.nTools.textContent = (typeof TOOLS !== 'undefined') ? TOOLS.length : '';
  el.nFiles.textContent = FILES.length;

  renderCatTabs();
  renderList();

  var hash = String(window.location.hash || '').replace(/^#/, '').toLowerCase();
  if (hash) setView(hash);

  /* ツールカードの添付資料からプレビューを呼べるようにする */
  window.AIPFiles = {
    open: function (f) {
      if (!f) return;
      if (!canPreview(f)) {
        var a = document.createElement('a');
        a.href = f.path;
        a.setAttribute('download', dlName(f));
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }
      openViewer(f);
    },
    get: function (id) {
      var hit = FILES.filter(function (f) { return f.id === id; });
      return hit.length ? hit[0] : null;
    },
    setView: setView
  };
})();
