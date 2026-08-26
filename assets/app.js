/* ==========================================================================
   Sinmido AI Tools Portal — 画面の組み立て
   --------------------------------------------------------------------------
   ツールカードには、そのツールに紐づけた資料（添付資料）と
   導入手順書のボタンが出ます。

   ・添付資料 … files/_manifest.json の各ファイルに tool: "<ツールID>" を
                 付けると、そのツールのカードに並びます。
                 （資料を追加.bat / 資料タブのアップロード欄から指定できます）
   ・導入手順書 … 次のどちらでも出せます。両方あるときは画面で読む手順書に
                  「ファイルをダウンロード」ボタンが付きます。
                    (1) assets/tools.js の guide に手順を書く（画面で読める・印刷可）
                    (2) 手順書ファイルを role: "guide" で紐づける
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
    year:    document.getElementById('year'),
    guide:      document.getElementById('guide'),
    guideTitle: document.getElementById('guideTitle'),
    guideMeta:  document.getElementById('guideMeta'),
    guideBody:  document.getElementById('guideBody'),
    guideDl:    document.getElementById('guideDl'),
    guideClose: document.getElementById('guideClose'),
    guidePrint: document.getElementById('guidePrint')
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

  var IMAGE_EXT = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'];
  var TEXT_EXT  = ['csv', 'txt', 'md', 'tsv', 'json'];

  function canPreview(f) {
    var e = String(f && f.ext || '').toLowerCase();
    return e === 'pdf' || IMAGE_EXT.indexOf(e) !== -1 || TEXT_EXT.indexOf(e) !== -1;
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

  var ICON_EXTERNAL =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M7 17 17 7M9 7h8v8"/></svg>';

  var ICON_DL =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 20h16"/></svg>';

  var ICON_EYE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M1.8 12S5.5 5 12 5s10.2 7 10.2 7-3.7 7-10.2 7S1.8 12 1.8 12Z"/>' +
    '<circle cx="12" cy="12" r="3"/></svg>';

  var ICON_CLIP =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M20 11.5 12.2 19.3a4.6 4.6 0 0 1-6.5-6.5l8-8a3.1 3.1 0 0 1 4.4 4.4l-7.9 8a1.6 1.6 0 0 1-2.2-2.2l7.3-7.3"/></svg>';

  var ICON_BOOK =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H12v16H5.5A1.5 1.5 0 0 0 4 20.5Z"/>' +
    '<path d="M20 4.5A1.5 1.5 0 0 0 18.5 3H12v16h6.5a1.5 1.5 0 0 1 1.5 1.5Z"/></svg>';

  /* ---------- ツールに紐づいた資料 ---------- */

  function allFiles() {
    return (typeof FILES !== 'undefined' && FILES) ? FILES : [];
  }

  function filesOf(toolId) {
    return allFiles().filter(function (f) { return f.tool === toolId; });
  }

  function attachmentsOf(toolId) {
    return filesOf(toolId).filter(function (f) { return f.role !== 'guide'; });
  }

  function guideFileOf(toolId) {
    var hit = filesOf(toolId).filter(function (f) { return f.role === 'guide'; });
    return hit.length ? hit[0] : null;
  }

  function hasWrittenGuide(t) {
    return !!(t.guide && t.guide.steps && t.guide.steps.length);
  }

  function hasGuide(t) {
    return hasWrittenGuide(t) || !!guideFileOf(t.id);
  }

  function toolById(id) {
    var hit = TOOLS.filter(function (t) { return t.id === id; });
    return hit.length ? hit[0] : null;
  }

  function fileById(id) {
    var hit = allFiles().filter(function (f) { return f.id === id; });
    return hit.length ? hit[0] : null;
  }

  /* ---------- 絞り込み ---------- */

  function haystackOf(tool) {
    var g = tool.guide || {};
    var steps = (g.steps || []).map(function (s) {
      return [s.title, s.body, s.note].join(' ');
    }).join(' ');
    var attach = filesOf(tool.id).map(function (f) {
      return [f.name, f.desc, (f.tags || []).join(' ')].join(' ');
    }).join(' ');

    return [
      tool.name, tool.tagline, tool.desc, (tool.tags || []).join(' '), tool.note,
      g.lead, g.note, steps, attach
    ].join(' ').toLowerCase();
  }

  function matches(tool) {
    if (state.cat !== 'all' && tool.cat !== state.cat) return false;
    var q = state.q.trim().toLowerCase();
    if (!q) return true;
    var haystack = haystackOf(tool);
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
    var docs   = allFiles().length;

    var rows = [
      { n: total,  label: '掲載ツール' },
      { n: live,   label: '公開中' },
      { n: demo,   label: 'デモ体験可' },
      { n: docs,   label: 'ダウンロード資料' }
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

  /* 添付資料のブロック（1件も無いツールでは出さない） */
  function attachHTML(list) {
    if (!list.length) return '';

    var rows = list.map(function (f) {
      var eye = canPreview(f)
        ? '<button type="button" class="att-eye" data-file="' + esc(f.id) +
          '" title="この資料を見る" aria-label="' + esc(f.name) + ' を見る">' +
          ICON_EYE + '</button>'
        : '';

      return '<li class="att-row">' +
        '<a class="att" href="' + esc(f.path) + '" download="' + esc(dlName(f)) +
          '" title="' + esc(f.name) + ' をダウンロード">' +
          '<span class="att-ext ' + extClass(f.ext) + '">' +
            esc(String(f.ext || '?').toUpperCase()) + '</span>' +
          '<span class="att-name">' + esc(f.name) + '</span>' +
          '<span class="att-size">' + esc(fmtSize(f.size)) + '</span>' +
          '<span class="att-dl" aria-hidden="true">' + ICON_DL + '</span>' +
        '</a>' + eye +
      '</li>';
    }).join('');

    return '<div class="card-files">' +
      '<p class="card-files-head">' + ICON_CLIP +
        '添付資料<span class="n">' + list.length + '</span></p>' +
      '<ul class="att-list">' + rows + '</ul>' +
    '</div>';
  }

  function cardHTML(t) {
    var isWip = (t.status === 'wip' || !t.url);

    var tags = (t.tags || []).map(function (x) {
      return '<span class="tag">' + esc(x) + '</span>';
    }).join('');

    var note = t.note ? '<p class="card-note">' + esc(t.note) + '</p>' : '';

    var guideBtn = hasGuide(t)
      ? '<button type="button" class="card-guide" data-guide="' + esc(t.id) + '">' +
        ICON_BOOK + '導入手順書</button>'
      : '';

    /* カード全体をクリックできるように、リンクを敷き詰める（stretched link）。
       添付資料と手順書ボタンはその上に重ねるので、押し分けられる。 */
    var go = isWip
      ? '<span class="card-go">準備中</span>'
      : '<a class="card-go card-stretch" href="' + esc(t.url) + '" target="_blank" ' +
        'rel="noopener noreferrer">開く' + ICON_EXTERNAL + '</a>';

    return '<article class="card' + (isWip ? ' is-wip' : '') +
        (t.featured ? ' featured' : '') + '">' +
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
      attachHTML(attachmentsOf(t.id)) +
      '<div class="card-foot">' +
        '<span class="badge badge-' + esc(t.status) + '">' +
          esc(STATUS_LABEL[t.status] || t.status) + '</span>' +
        '<span class="card-actions">' + guideBtn + go + '</span>' +
      '</div>' +
    '</article>';
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

  /* ---------- 導入手順書 ---------- */

  var lastFocus = null;

  function stepHTML(s, i) {
    return '<li class="guide-step">' +
      '<span class="guide-num">STEP ' + (i + 1) + '</span>' +
      '<div class="guide-step-body">' +
        '<h4>' + esc(s.title) + '</h4>' +
        (s.body ? '<p>' + esc(s.body) + '</p>' : '') +
        (s.note ? '<p class="guide-step-note">' + esc(s.note) + '</p>' : '') +
      '</div>' +
    '</li>';
  }

  function guideHTML(t, file) {
    var g = t.guide || {};
    var out = '';

    if (g.lead) out += '<p class="guide-lead">' + esc(g.lead) + '</p>';

    if (g.need && g.need.length) {
      out += '<div class="guide-need"><h4>先に用意しておくもの</h4><ul>' +
        g.need.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') +
        '</ul></div>';
    }

    if (hasWrittenGuide(t)) {
      out += '<ol class="guide-steps">' + g.steps.map(stepHTML).join('') + '</ol>';
    }

    if (g.note) out += '<p class="guide-note">' + esc(g.note) + '</p>';

    if (file) {
      out += '<div class="guide-file">' +
        '<span class="att-ext ' + extClass(file.ext) + '">' +
          esc(String(file.ext || '?').toUpperCase()) + '</span>' +
        '<div class="guide-file-text">' +
          '<strong>' + esc(file.name) + '</strong>' +
          '<span>' + esc(fmtSize(file.size)) + '</span>' +
        '</div>' +
        (canPreview(file)
          ? '<button type="button" class="file-btn att-eye" data-file="' +
            esc(file.id) + '">' + ICON_EYE + '見る</button>'
          : '') +
        '<a class="file-btn file-btn-dl" href="' + esc(file.path) + '" download="' +
          esc(dlName(file)) + '">' + ICON_DL + 'ダウンロード</a>' +
      '</div>';
    }

    if (!out) {
      out = '<p class="guide-lead">手順書はまだ用意されていません。</p>';
    }
    return out;
  }

  function openGuide(t) {
    var file = guideFileOf(t.id);

    /* 画面で読む手順が無く、ファイルだけあるなら、そのまま開く／落とす */
    if (!hasWrittenGuide(t) && file) {
      if (canPreview(file) && window.AIPFiles && window.AIPFiles.open) {
        window.AIPFiles.open(file);
      } else {
        var a = document.createElement('a');
        a.href = file.path;
        a.setAttribute('download', dlName(file));
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      return;
    }

    lastFocus = document.activeElement;
    el.guideTitle.textContent = t.name + '　導入手順書';
    el.guideMeta.textContent = [
      (t.guide && t.guide.time) ? t.guide.time : '',
      hasWrittenGuide(t) ? ('全 ' + t.guide.steps.length + ' ステップ') : ''
    ].filter(Boolean).join(' ・ ');

    el.guideBody.innerHTML = guideHTML(t, file);

    if (file) {
      el.guideDl.hidden = false;
      el.guideDl.href = file.path;
      el.guideDl.setAttribute('download', dlName(file));
    } else {
      el.guideDl.hidden = true;
      el.guideDl.removeAttribute('href');
    }

    el.guide.hidden = false;
    document.body.classList.add('guide-open');
    el.guideClose.focus();
  }

  function closeGuide() {
    el.guide.hidden = true;
    el.guideBody.innerHTML = '';
    document.body.classList.remove('guide-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
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

  el.grid.addEventListener('click', function (e) {
    var eye = e.target.closest('.att-eye');
    if (eye) {
      e.preventDefault();
      var f = fileById(eye.getAttribute('data-file'));
      if (f && window.AIPFiles && window.AIPFiles.open) window.AIPFiles.open(f);
      return;
    }

    var gb = e.target.closest('.card-guide');
    if (gb) {
      e.preventDefault();
      var t = toolById(gb.getAttribute('data-guide'));
      if (t) openGuide(t);
    }
  });

  el.guideBody.addEventListener('click', function (e) {
    var eye = e.target.closest('.att-eye');
    if (!eye) return;
    e.preventDefault();
    var f = fileById(eye.getAttribute('data-file'));
    if (f && window.AIPFiles && window.AIPFiles.open) {
      closeGuide();
      window.AIPFiles.open(f);
    }
  });

  el.guideClose.addEventListener('click', closeGuide);
  el.guidePrint.addEventListener('click', function () { window.print(); });

  el.guide.addEventListener('click', function (e) {
    if (e.target === el.guide) closeGuide();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !el.guide.hidden) closeGuide();
  });

  el.logout.addEventListener('click', function () {
    window.AIPAuth.logout();
  });

  /* ---------- 起動 ---------- */

  el.year.textContent = new Date().getFullYear();
  renderStats();
  renderTabs();
  renderGrid();

  /* 資料タブから「このツールの手順書を見る」を呼べるように */
  window.AIPTools = {
    openGuide: function (id) {
      var t = toolById(id);
      if (t) openGuide(t);
    },
    nameOf: function (id) {
      var t = toolById(id);
      return t ? t.name : '';
    },
    /* 資料タブ側が「導入手順書」ボタンを出すかどうかの判定に使う */
    hasGuide: function (id) {
      var t = toolById(id);
      return !!(t && hasGuide(t));
    }
  };
})();
