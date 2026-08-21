/* ==========================================================================
   Sinmido AI Tools Portal — 認証（合言葉ゲート）
   --------------------------------------------------------------------------
   ⚠️ これは「本物の認証」ではありません。
      GitHub Pages は静的ホスティング（サーバー処理が無い）ため、照合は
      すべてブラウザ側で完結します。パスワードそのものは平文で置かず
      SHA-256 ハッシュで比較しているので合言葉は漏れませんが、技術のある
      人がソースを読めば迂回できます。
      「URL と合言葉を渡した人だけが入る限定公開」の受付として使ってください。
      本物の認証が必要になったら、自社サーバー移行時に index.html を
      login.php（PHP セッション認証）に差し替えます。README を参照。
   ========================================================================== */

(function (global) {
  'use strict';

  var CONFIG = {
    /* 合言葉の SHA-256 ハッシュ（小文字16進）。
       変更方法:
         python -c "import hashlib;print(hashlib.sha256('新しい合言葉'.encode()).hexdigest())"
       で出た値をここに貼り替えるだけです。 */
    passHash: 'a05bd3c38a160cfe4097e9d885ce91c4c472dedd61bb98da2aae76e88307f096',

    storageKey: 'sinmido_aip_auth_v1',
    loginPage:  'index.html',
    homePage:   'portal.html',

    /* 「この端末で保持する」を選んだときの有効日数 */
    rememberDays: 14
  };

  function toHex(buffer) {
    var bytes = new Uint8Array(buffer);
    var out = '';
    for (var i = 0; i < bytes.length; i++) {
      out += bytes[i].toString(16).padStart(2, '0');
    }
    return out;
  }

  function sha256hex(text) {
    if (!global.crypto || !global.crypto.subtle) {
      return Promise.reject(new Error('NO_CRYPTO'));
    }
    var data = new TextEncoder().encode(text);
    return global.crypto.subtle.digest('SHA-256', data).then(toHex);
  }

  function readRecord() {
    var raw = null;
    try { raw = global.sessionStorage.getItem(CONFIG.storageKey); } catch (e) {}
    if (!raw) {
      try { raw = global.localStorage.getItem(CONFIG.storageKey); } catch (e) {}
    }
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function clear() {
    try { global.sessionStorage.removeItem(CONFIG.storageKey); } catch (e) {}
    try { global.localStorage.removeItem(CONFIG.storageKey); } catch (e) {}
  }

  var Auth = {
    config: CONFIG,

    /** 合言葉が正しいか照合する */
    verify: function (input) {
      return sha256hex(String(input || '')).then(function (hash) {
        return hash === CONFIG.passHash;
      });
    },

    /** 認証済みとして記録する */
    grant: function (remember) {
      var record = {
        t: CONFIG.passHash,
        exp: remember ? Date.now() + CONFIG.rememberDays * 864e5 : 0
      };
      var json = JSON.stringify(record);
      clear();
      try {
        if (remember) global.localStorage.setItem(CONFIG.storageKey, json);
        else global.sessionStorage.setItem(CONFIG.storageKey, json);
      } catch (e) { /* プライベートモード等 */ }
    },

    /** 認証済みか */
    isAuthed: function () {
      var rec = readRecord();
      if (!rec || rec.t !== CONFIG.passHash) return false;
      if (rec.exp && Date.now() > rec.exp) { clear(); return false; }
      return true;
    },

    logout: function () {
      clear();
      global.location.replace(CONFIG.loginPage);
    },

    /** 保護ページの冒頭で呼ぶ。未認証ならログイン画面へ送る */
    guard: function () {
      if (this.isAuthed()) {
        document.documentElement.classList.remove('gate-pending');
        return true;
      }
      global.location.replace(CONFIG.loginPage);
      return false;
    }
  };

  global.AIPAuth = Auth;
})(window);
