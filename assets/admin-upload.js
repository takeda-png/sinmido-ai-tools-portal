/* ==========================================================================
   Sinmido AI Tools Portal — ページからの資料アップロード
   --------------------------------------------------------------------------
   GitHub Pages はサーバー処理が無いので、ブラウザから GitHub の API を
   直接叩いてリポジトリにコミットします。数十秒で公開ページに反映されます。

   ・GitHub のトークン（Fine-grained PAT）を1度だけ入力して保存します。
     保存先はこの端末のブラウザ（localStorage）だけで、リポジトリには
     一切入りません。共用PCでは「トークンを削除」を押してください。
   ・アップロード欄は、トークンを保存済みの端末か
     portal.html#admin を開いたときだけ表示されます。
     お客様に見せる通常の画面には出ません。
   ========================================================================== */

(function () {
  'use strict';

  var REPO      = 'takeda-png/sinmido-ai-tools-portal';
  var BRANCH    = 'master';
  var API       = 'https://api.github.com/repos/' + REPO + '/contents/';
  var TOKEN_KEY = 'sinmido_aip_gh_token';
  var ADMIN_KEY = 'sinmido_aip_admin';

  /* GitHub の Contents API は大きなファイルに向かない。
     これを超えるものは 資料を追加.bat（git push）を案内する。 */
  var MAX_BYTES = 25 * 1024 * 1024;

  var el = {
    panel:   document.getElementById('uploader'),
    setup:   document.getElementById('upSetup'),
    token:   document.getElementById('upToken'),
    saveTok: document.getElementById('upSaveToken'),
    clrTok:  document.getElementById('upClearToken'),
    main:    document.getElementById('upMain'),
    drop:    document.getElementById('upDrop'),
    input:   document.getElementById('upInput'),
    queue:   document.getElementById('upQueue'),
    submit:  document.getElementById('upSubmit'),
    log:     document.getElementById('upLog'),
    hide:    document.getElementById('upHide')
  };

  if (!el.panel) return;

  /* ---------- 表示するかどうか ---------- */

  function store(key, value) {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch (e) {}
  }
  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  if (String(location.hash).toLowerCase().indexOf('admin') !== -1) {
    store(ADMIN_KEY, '1');
  }
  if (!read(ADMIN_KEY) && !read(TOKEN_KEY)) return;   // 通常の閲覧者には出さない

  el.panel.hidden = false;

  /* ---------- 小物 ---------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function log(message, kind) {
    var p = document.createElement('p');
    p.className = 'up-log-line' + (kind ? ' up-' + kind : '');
    p.textContent = message;
    el.log.appendChild(p);
    el.log.scrollTop = el.log.scrollHeight;
  }

  function fmtSize(n) {
    if (n < 1024) return n + ' B';
    if (n < 1048576) return (n / 1024).toFixed(0) + ' KB';
    return (n / 1048576).toFixed(1) + ' MB';
  }

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  /* バイト列 → base64（大きいファイルでも落ちないよう小分けにする） */
  function toBase64(bytes) {
    var out = '';
    var CH = 0x8000;
    for (var i = 0; i < bytes.length; i += CH) {
      out += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
    }
    return btoa(out);
  }

  function textToBase64(text) {
    return toBase64(new TextEncoder().encode(text));
  }

  function base64ToText(b64) {
    var bin = atob(String(b64).replace(/\s/g, ''));
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder('utf-8').decode(bytes);
  }

  /* add_files.py と同じ規則で保存名を作る（両方から入れても重複しない） */
  function safeStem(name) {
    return name.replace(/[^A-Za-z0-9._-]+/g, '-')
               .replace(/^[-.]+|[-.]+$/g, '')
               .replace(/-{2,}/g, '-')
               .slice(0, 48);
  }

  function sha256hex(text) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
      .then(function (buf) {
        var bytes = new Uint8Array(buf), out = '';
        for (var i = 0; i < bytes.length; i++) {
          out += bytes[i].toString(16).padStart(2, '0');
        }
        return out;
      });
  }

  function storedName(fileName) {
    var dot  = fileName.lastIndexOf('.');
    var stem = dot > 0 ? fileName.slice(0, dot) : fileName;
    var ext  = dot > 0 ? fileName.slice(dot + 1).toLowerCase() : '';
    return sha256hex(fileName).then(function (hex) {
      var digest = hex.slice(0, 8);
      var safe = safeStem(stem) ||
        ((ext || 'file') + '-' + today().replace(/-/g, ''));
      return {
        ext: ext,
        file: ext ? (safe + '-' + digest + '.' + ext) : (safe + '-' + digest),
        id: safe + '-' + digest
      };
    });
  }

  var EXT_TO_CAT = {
    pdf: 'teian', pptx: 'teian', ppt: 'teian', key: 'teian',
    docx: 'shiryo', doc: 'shiryo', md: 'shiryo', txt: 'shiryo',
    csv: 'data', tsv: 'data', xlsx: 'data', xls: 'data', json: 'data',
    png: 'image', jpg: 'image', jpeg: 'image',
    gif: 'image', webp: 'image', svg: 'image', bmp: 'image'
  };

  var DEFAULT_CATS = [
    { id: 'teian',  label: '提案・企画書' },
    { id: 'shiryo', label: '説明資料・マニュアル' },
    { id: 'data',   label: 'データ（CSV/Excel）' },
    { id: 'image',  label: '画像・スクリーンショット' },
    { id: 'other',  label: 'その他' }
  ];

  /* ---------- GitHub API ---------- */

  function token() { return (el.token.value || read(TOKEN_KEY) || '').trim(); }

  function api(path, options) {
    var opts = options || {};
    return fetch(API + path.split('/').map(encodeURIComponent).join('/') +
                 (opts.method ? '' : '?ref=' + BRANCH), {
      method: opts.method || 'GET',
      headers: {
        'Authorization': 'Bearer ' + token(),
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: opts.body ? JSON.stringify(opts.body) : undefined
    });
  }

  function getFile(path) {
    return api(path).then(function (res) {
      if (res.status === 404) return null;
      if (!res.ok) {
        return res.json().catch(function () { return {}; }).then(function (j) {
          throw new Error(describe(res.status, j.message));
        });
      }
      return res.json();
    });
  }

  function putFile(path, base64, message, sha) {
    var body = { message: message, content: base64, branch: BRANCH };
    if (sha) body.sha = sha;
    return api(path, { method: 'PUT', body: body }).then(function (res) {
      if (res.ok) return res.json();
      return res.json().catch(function () { return {}; }).then(function (j) {
        throw new Error(describe(res.status, j.message) + '（' + path + '）');
      });
    });
  }

  function describe(status, message) {
    if (status === 401) return 'トークンが正しくありません（401）。作り直して入れ直してください。';
    if (status === 403) return 'トークンの権限が足りません（403）。Contents の Read and write が必要です。';
    if (status === 404) return 'リポジトリに届きませんでした（404）。トークンの対象リポジトリを確認してください。';
    if (status === 409) return '他の変更とぶつかりました（409）。もう一度お試しください。';
    if (status === 422) return 'ファイルが大きすぎる可能性があります（422）。25MB を超えるものは 資料を追加.bat をお使いください。';
    return 'GitHub がエラーを返しました（' + status + '）: ' + (message || '');
  }

  /* ---------- files.js の組み立て（add_files.py と同じ形） ---------- */

  function jsLit(v) {
    return JSON.stringify(v).replace(/<\//g, '<\\/');
  }

  function buildFilesJs(manifest) {
    var used = {};
    manifest.files.forEach(function (f) { used[f.cat] = true; });

    var cats = [{ id: 'all', label: 'すべて' }].concat(
      manifest.categories.filter(function (c) { return used[c.id]; }));

    var entries = manifest.files.slice().sort(function (a, b) {
      return String(b.date || '').localeCompare(String(a.date || ''));
    });

    return '/* ==========================================================================\n' +
      '   Sinmido AI Tools Portal — 資料データ\n' +
      '   --------------------------------------------------------------------------\n' +
      '   ⚠️ このファイルは自動生成です。手で編集しないでください。\n' +
      '      資料の追加・説明文の変更は files/_manifest.json を直して\n' +
      '        python add_files.py --rebuild\n' +
      '      （または「資料を追加.bat」にファイルをドラッグ＆ドロップ）\n' +
      '      を実行すると、このファイルが作り直されます。\n' +
      '\n' +
      '   最終生成: ' + today() + '\n' +
      '   ========================================================================== */\n\n' +
      'var FILE_CATEGORIES = [\n' +
      cats.map(function (c) {
        return '  { id: ' + jsLit(c.id) + ', label: ' + jsLit(c.label) + ' }';
      }).join(',\n') +
      '\n];\n\nvar FILES = [\n' +
      entries.map(function (f) {
        return '  {\n' +
          '    id:   ' + jsLit(f.id) + ',\n' +
          '    name: ' + jsLit(f.name) + ',\n' +
          '    path: ' + jsLit('files/' + f.file) + ',\n' +
          '    ext:  ' + jsLit(f.ext || '') + ',\n' +
          '    size: ' + (parseInt(f.size, 10) || 0) + ',\n' +
          '    cat:  ' + jsLit(f.cat || 'other') + ',\n' +
          '    desc: ' + jsLit(f.desc || '') + ',\n' +
          '    tags: ' + jsLit(f.tags || []) + ',\n' +
          '    tool: ' + jsLit(f.tool || '') + ',\n' +
          '    role: ' + jsLit(f.role || 'doc') + ',\n' +
          '    date: ' + jsLit(f.date || '') + '\n' +
          '  }';
      }).join(',\n') +
      '\n];\n';
  }

  /* ---------- 待ち行列（アップロード前の入力欄） ---------- */

  /* assets/tools.js のツールを、そのままプルダウンに出す */
  function toolOptions() {
    if (typeof TOOLS === 'undefined') return '';
    return TOOLS.map(function (t) {
      return '<option value="' + esc(t.id) + '">' + esc(t.name) + '</option>';
    }).join('');
  }

  var queue = [];

  function addToQueue(fileList) {
    Array.prototype.forEach.call(fileList, function (file) {
      if (file.size > MAX_BYTES) {
        log('「' + file.name + '」は ' + fmtSize(file.size) +
            ' あります。この画面からは 25MB までです。大きいものは 資料を追加.bat をお使いください。', 'err');
        return;
      }
      if (queue.some(function (q) { return q.file.name === file.name && q.file.size === file.size; })) {
        return;
      }
      queue.push({ file: file });
    });
    renderQueue();
  }

  function renderQueue() {
    if (!queue.length) {
      el.queue.innerHTML = '';
      el.submit.disabled = true;
      el.submit.textContent = '公開する';
      return;
    }

    el.queue.innerHTML = queue.map(function (q, i) {
      var ext = (q.file.name.split('.').pop() || '').toLowerCase();
      var cat = EXT_TO_CAT[ext] || 'other';
      var stem = q.file.name.replace(/\.[^.]+$/, '');
      return '<div class="up-row" data-i="' + i + '">' +
        '<div class="up-row-head">' +
          '<strong>' + esc(q.file.name) + '</strong>' +
          '<span>' + fmtSize(q.file.size) + '</span>' +
          '<button type="button" class="up-remove" data-i="' + i + '" aria-label="この資料をやめる">&times;</button>' +
        '</div>' +
        '<div class="up-fields">' +
          '<label>表示名<input type="text" class="up-name" value="' + esc(stem) + '"></label>' +
          '<label>カテゴリ<select class="up-cat">' +
            DEFAULT_CATS.map(function (c) {
              return '<option value="' + esc(c.id) + '"' +
                (c.id === cat ? ' selected' : '') + '>' + esc(c.label) + '</option>';
            }).join('') +
          '</select></label>' +
          '<label>どのツールの資料か<select class="up-tool">' +
            '<option value="">（ツールに紐づけない）</option>' +
            toolOptions() +
          '</select></label>' +
          '<label>種類<select class="up-role">' +
            '<option value="doc">添付資料</option>' +
            '<option value="guide">導入手順書</option>' +
          '</select></label>' +
          '<label class="up-wide">説明（任意）<input type="text" class="up-desc" placeholder="どんな資料かひとこと"></label>' +
          '<label class="up-wide">タグ（任意・カンマ区切り）<input type="text" class="up-tags" placeholder="提案, 工務店"></label>' +
        '</div>' +
        '<p class="up-row-note">ツールを選ぶと、そのカードにダウンロードのリンクが並びます。' +
          '「導入手順書」を選ぶと、カードの［導入手順書］ボタンから開けます。</p>' +
      '</div>';
    }).join('');

    el.submit.disabled = false;
    el.submit.textContent = '公開する（' + queue.length + '件）';
  }

  function collect() {
    return Array.prototype.map.call(el.queue.querySelectorAll('.up-row'), function (row, i) {
      var tags = row.querySelector('.up-tags').value
        .split(',').map(function (t) { return t.trim(); }).filter(Boolean);
      var tool = row.querySelector('.up-tool').value;
      return {
        file: queue[i].file,
        name: row.querySelector('.up-name').value.trim() || queue[i].file.name,
        cat:  row.querySelector('.up-cat').value,
        desc: row.querySelector('.up-desc').value.trim(),
        tags: tags,
        tool: tool,
        /* ツールを選んでいないのに「導入手順書」だけ選ばれても意味がないので落とす */
        role: tool ? row.querySelector('.up-role').value : 'doc'
      };
    });
  }

  /* ---------- 公開する ---------- */

  function publish() {
    var items = collect();
    if (!items.length) return;
    if (!token()) { log('先に GitHub のトークンを保存してください。', 'err'); return; }

    el.submit.disabled = true;
    el.submit.textContent = 'アップロード中…';
    el.log.innerHTML = '';
    log('GitHub に接続しています…');

    var manifest, manifestSha;

    getFile('files/_manifest.json').then(function (res) {
      if (res) {
        manifest = JSON.parse(base64ToText(res.content));
        manifestSha = res.sha;
      } else {
        manifest = { categories: DEFAULT_CATS.slice(), files: [] };
      }
      manifest.categories = manifest.categories || DEFAULT_CATS.slice();
      manifest.files = manifest.files || [];

      /* 1件ずつ順番に上げる（同時に投げると GitHub 側でぶつかる） */
      return items.reduce(function (chain, item) {
        return chain.then(function () { return uploadOne(item, manifest); });
      }, Promise.resolve());

    }).then(function () {
      log('資料の一覧を更新しています…');
      return putFile('files/_manifest.json',
                     textToBase64(JSON.stringify(manifest, null, 2) + '\n'),
                     '資料の台帳を更新', manifestSha);

    }).then(function () {
      return getFile('assets/files.js');

    }).then(function (cur) {
      return putFile('assets/files.js',
                     textToBase64(buildFilesJs(manifest)),
                     '資料データを更新', cur ? cur.sha : null);

    }).then(function () {
      log('完了しました。30秒〜1分ほどで公開ページに出ます。', 'ok');
      log('反映されたら、このページを再読み込みしてご確認ください。', 'ok');
      queue = [];
      renderQueue();
      el.submit.textContent = '公開する';

    }).catch(function (err) {
      log(err && err.message ? err.message : '失敗しました。', 'err');
      el.submit.disabled = false;
      el.submit.textContent = '公開する（' + queue.length + '件）';
    });
  }

  function uploadOne(item, manifest) {
    return storedName(item.file.name).then(function (meta) {
      log('「' + item.name + '」を送っています…（' + fmtSize(item.file.size) + '）');
      return item.file.arrayBuffer().then(function (buf) {
        return getFile('files/' + meta.file).then(function (cur) {
          return putFile('files/' + meta.file,
                         toBase64(new Uint8Array(buf)),
                         '資料を追加: ' + item.name,
                         cur ? cur.sha : null);
        }).then(function () {
          manifest.files = manifest.files.filter(function (f) { return f.id !== meta.id; });
          manifest.files.push({
            id: meta.id, name: item.name, file: meta.file, ext: meta.ext,
            size: item.file.size, cat: item.cat, desc: item.desc,
            tags: item.tags, tool: item.tool || '', role: item.role || 'doc',
            date: today()
          });
          log('　→ 送信しました。', 'ok');
        });
      });
    });
  }

  /* ---------- イベント ---------- */

  function refreshTokenUI() {
    var has = !!read(TOKEN_KEY);
    el.setup.classList.toggle('has-token', has);
    el.main.hidden = !has;
    el.clrTok.hidden = !has;
    el.token.value = '';
    el.token.placeholder = has ? '保存済み（変更するときだけ入力）' : 'github_pat_ ではじまる文字列';
  }

  el.saveTok.addEventListener('click', function () {
    var value = el.token.value.trim();
    if (!value) { log('トークンを入力してください。', 'err'); return; }
    store(TOKEN_KEY, value);
    refreshTokenUI();
    el.log.innerHTML = '';
    log('この端末にトークンを保存しました。', 'ok');
  });

  el.clrTok.addEventListener('click', function () {
    store(TOKEN_KEY, null);
    refreshTokenUI();
    el.log.innerHTML = '';
    log('トークンを削除しました。', 'ok');
  });

  el.hide.addEventListener('click', function () {
    store(ADMIN_KEY, null);
    store(TOKEN_KEY, null);
    el.panel.hidden = true;
  });

  el.drop.addEventListener('click', function () { el.input.click(); });

  el.input.addEventListener('change', function () {
    addToQueue(el.input.files);
    el.input.value = '';
  });

  ['dragenter', 'dragover'].forEach(function (type) {
    el.drop.addEventListener(type, function (e) {
      e.preventDefault();
      el.drop.classList.add('is-over');
    });
  });
  ['dragleave', 'drop'].forEach(function (type) {
    el.drop.addEventListener(type, function (e) {
      e.preventDefault();
      el.drop.classList.remove('is-over');
    });
  });
  el.drop.addEventListener('drop', function (e) {
    if (e.dataTransfer && e.dataTransfer.files) addToQueue(e.dataTransfer.files);
  });

  el.queue.addEventListener('click', function (e) {
    var btn = e.target.closest('.up-remove');
    if (!btn) return;
    queue.splice(Number(btn.getAttribute('data-i')), 1);
    renderQueue();
  });

  el.submit.addEventListener('click', publish);

  refreshTokenUI();
  renderQueue();
})();
