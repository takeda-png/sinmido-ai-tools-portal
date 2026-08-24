#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Sinmido AI Tools Portal — 資料の追加ツール

ポータルの「資料」タブに並べるファイルを、files/ に取り込んで
assets/files.js を作り直し、GitHub へ push するところまでやります。

使い方
------
  ファイルをドラッグ＆ドロップ:
      「資料を追加.bat」に、追加したいファイルをまとめて放り込む

  コマンドから:
      python add_files.py 提案書.pdf 実績.xlsx
      python add_files.py 提案書.pdf --cat teian --desc "2026年版" --tags 提案,工務店
      python add_files.py --rebuild        # files/_manifest.json から files.js を作り直す
      python add_files.py --list           # いま載っている資料の一覧
      python add_files.py --remove <ID>    # 資料を1件取り下げる
      python add_files.py 提案書.pdf --no-push   # コミットまでで止める（push しない）

説明文やカテゴリを後から直したいときは files/_manifest.json を編集して
  python add_files.py --rebuild
を実行してください。
"""

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
from datetime import date

ROOT      = os.path.dirname(os.path.abspath(__file__))
FILES_DIR = os.path.join(ROOT, 'files')
MANIFEST  = os.path.join(FILES_DIR, '_manifest.json')
OUT_JS    = os.path.join(ROOT, 'assets', 'files.js')

# GitHub の制限: 100MB を超えると push できない / 50MB で警告が出る
HARD_LIMIT = 100 * 1024 * 1024
WARN_LIMIT = 50 * 1024 * 1024

# ポータル側でプレビューできる拡張子（表示の目安として案内するだけ）
PREVIEWABLE = {'pdf', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp',
               'csv', 'tsv', 'txt', 'md', 'json'}

DEFAULT_CATEGORIES = [
    {"id": "teian",  "label": "提案・企画書"},
    {"id": "shiryo", "label": "説明資料・マニュアル"},
    {"id": "data",   "label": "データ（CSV/Excel）"},
    {"id": "image",  "label": "画像・スクリーンショット"},
    {"id": "other",  "label": "その他"},
]

# 拡張子からカテゴリを推測する（対話で Enter を押したときの既定値）
EXT_TO_CAT = {
    'pdf': 'teian', 'pptx': 'teian', 'ppt': 'teian', 'key': 'teian',
    'docx': 'shiryo', 'doc': 'shiryo', 'md': 'shiryo', 'txt': 'shiryo',
    'csv': 'data', 'tsv': 'data', 'xlsx': 'data', 'xls': 'data', 'json': 'data',
    'png': 'image', 'jpg': 'image', 'jpeg': 'image',
    'gif': 'image', 'webp': 'image', 'svg': 'image', 'bmp': 'image',
}


# --------------------------------------------------------------------------
# マニフェストの読み書き
# --------------------------------------------------------------------------

def load_manifest():
    if not os.path.exists(MANIFEST):
        return {"categories": list(DEFAULT_CATEGORIES), "files": []}
    with open(MANIFEST, 'r', encoding='utf-8') as fh:
        data = json.load(fh)
    data.setdefault('categories', list(DEFAULT_CATEGORIES))
    data.setdefault('files', [])
    return data


def save_manifest(data):
    os.makedirs(FILES_DIR, exist_ok=True)
    with open(MANIFEST, 'w', encoding='utf-8') as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
        fh.write('\n')


# --------------------------------------------------------------------------
# ファイル名の正規化
# --------------------------------------------------------------------------

def safe_stem(name):
    """日本語ファイル名でも URL で壊れないよう、英数字だけの名前に直す。
    表示名は元のファイル名のまま manifest に残すので、見た目は変わりません。"""
    stem = re.sub(r'[^A-Za-z0-9._-]+', '-', name).strip('-.')
    stem = re.sub(r'-{2,}', '-', stem)
    return stem[:48]


def build_stored_name(src_path):
    base = os.path.basename(src_path)
    stem, dot_ext = os.path.splitext(base)
    ext = dot_ext.lstrip('.').lower()
    digest = hashlib.md5(base.encode('utf-8')).hexdigest()[:8]

    # ファイル名が全部日本語だと英数字が何も残らないので、
    # 「拡張子-日付-ハッシュ」にして後から見分けがつくようにする
    safe = safe_stem(stem) or '{0}-{1}'.format(ext or 'file',
                                               date.today().strftime('%Y%m%d'))
    return '{0}-{1}.{2}'.format(safe, digest, ext) if ext else \
           '{0}-{1}'.format(safe, digest)


# --------------------------------------------------------------------------
# files.js の生成
# --------------------------------------------------------------------------

HEADER = """/* ==========================================================================
   Sinmido AI Tools Portal — 資料データ
   --------------------------------------------------------------------------
   ⚠️ このファイルは自動生成です。手で編集しないでください。
      資料の追加・説明文の変更は files/_manifest.json を直して
        python add_files.py --rebuild
      （または「資料を追加.bat」にファイルをドラッグ＆ドロップ）
      を実行すると、このファイルが作り直されます。

   最終生成: {stamp}
   ========================================================================== */

"""


def js(value):
    """JS のリテラルとして安全に埋め込む（</script> も潰す）"""
    return json.dumps(value, ensure_ascii=False).replace('</', '<\\/')


def write_js(data):
    used = {f.get('cat') for f in data['files']}
    cats = [{"id": "all", "label": "すべて"}]
    cats += [c for c in data['categories'] if c['id'] in used]

    lines = [HEADER.format(stamp=date.today().isoformat())]

    lines.append('var FILE_CATEGORIES = [\n')
    lines.append(',\n'.join(
        '  {{ id: {0}, label: {1} }}'.format(js(c['id']), js(c['label']))
        for c in cats
    ))
    lines.append('\n];\n\nvar FILES = [\n')

    entries = sorted(data['files'], key=lambda f: f.get('date', ''), reverse=True)
    lines.append(',\n'.join(
        '  {{\n'
        '    id:   {id},\n'
        '    name: {name},\n'
        '    path: {path},\n'
        '    ext:  {ext},\n'
        '    size: {size},\n'
        '    cat:  {cat},\n'
        '    desc: {desc},\n'
        '    tags: {tags},\n'
        '    date: {date}\n'
        '  }}'.format(
            id=js(f['id']), name=js(f['name']),
            path=js('files/' + f['file']), ext=js(f.get('ext', '')),
            size=int(f.get('size', 0)), cat=js(f.get('cat', 'other')),
            desc=js(f.get('desc', '')), tags=js(f.get('tags', [])),
            date=js(f.get('date', ''))
        )
        for f in entries
    ))
    lines.append('\n];\n')

    os.makedirs(os.path.dirname(OUT_JS), exist_ok=True)
    with open(OUT_JS, 'w', encoding='utf-8', newline='\n') as fh:
        fh.write(''.join(lines))

    return len(entries)


# --------------------------------------------------------------------------
# git
# --------------------------------------------------------------------------

def git(*args, **kwargs):
    return subprocess.run(['git'] + list(args), cwd=ROOT,
                          capture_output=True, text=True,
                          encoding='utf-8', errors='replace', **kwargs)


def publish(message, push=True):
    if not os.path.isdir(os.path.join(ROOT, '.git')):
        print('  ! git リポジトリではないので、コミットはしませんでした。')
        return

    if push:
        pull = git('pull', '--ff-only', 'origin', 'master')
        if pull.returncode != 0:
            print('  ! git pull に失敗しました。手で確認してください:')
            print('   ', (pull.stderr or pull.stdout).strip()[:400])
            return

    git('add', 'files', 'assets/files.js')
    status = git('status', '--porcelain')
    if not status.stdout.strip():
        print('  変更はありませんでした（コミットなし）。')
        return

    commit = git('commit', '-m', message)
    if commit.returncode != 0:
        print('  ! commit に失敗:', (commit.stderr or commit.stdout).strip()[:400])
        return
    print('  コミットしました:', message)

    if not push:
        print('  push はしていません（--no-push）。あとで git push origin master を実行してください。')
        return

    pushed = git('push', 'origin', 'master')
    if pushed.returncode != 0:
        print('  ! push に失敗:', (pushed.stderr or pushed.stdout).strip()[:400])
        return
    print('  push しました。1〜2分でポータルに反映されます。')
    print('  https://takeda-png.github.io/sinmido-ai-tools-portal/portal.html#files')


# --------------------------------------------------------------------------
# 対話入力
# --------------------------------------------------------------------------

def ask(prompt, default=''):
    try:
        answer = input(prompt).strip()
    except (EOFError, KeyboardInterrupt):
        return default
    return answer or default


def choose_category(cats, default_id):
    labels = {c['id']: c['label'] for c in cats}
    print('    カテゴリ:', '  '.join(
        '[{0}]{1}'.format(i + 1, c['label']) for i, c in enumerate(cats)))
    raw = ask('    番号かEnter（既定={0}）> '.format(labels.get(default_id, default_id)))
    if raw.isdigit() and 1 <= int(raw) <= len(cats):
        return cats[int(raw) - 1]['id']
    if raw in labels:
        return raw
    return default_id


# --------------------------------------------------------------------------
# 各コマンド
# --------------------------------------------------------------------------

def cmd_list(data):
    if not data['files']:
        print('まだ資料は登録されていません。')
        return
    labels = {c['id']: c['label'] for c in data['categories']}
    print('登録されている資料 {0} 件:\n'.format(len(data['files'])))
    for f in sorted(data['files'], key=lambda x: x.get('date', ''), reverse=True):
        print('  {0:<14} {1}'.format(f['id'], f['name']))
        print('  {0:<14} {1} / {2:.1f}MB / {3}'.format(
            '', labels.get(f.get('cat'), f.get('cat')),
            f.get('size', 0) / 1048576.0, f.get('date', '')))
        print()


def cmd_remove(data, target, push):
    hit = [f for f in data['files'] if f['id'] == target or f['name'] == target]
    if not hit:
        print('見つかりませんでした:', target)
        print('--list で ID を確認してください。')
        return 1

    for f in hit:
        path = os.path.join(FILES_DIR, f['file'])
        if os.path.exists(path):
            os.remove(path)
        data['files'].remove(f)
        print('取り下げました:', f['name'])

    save_manifest(data)
    n = write_js(data)
    print('files.js を更新しました（{0}件）。'.format(n))
    publish('資料を取り下げ: {0}'.format(hit[0]['name']), push)
    return 0


def cmd_add(data, paths, args):
    os.makedirs(FILES_DIR, exist_ok=True)
    existing = {f['id'] for f in data['files']}
    added = []

    for src in paths:
        src = os.path.abspath(src)
        base = os.path.basename(src)

        if not os.path.isfile(src):
            print('! 見つかりません（とばします）:', src)
            continue

        size = os.path.getsize(src)
        if size > HARD_LIMIT:
            print('! {0} は {1:.0f}MB あります。GitHub の上限（100MB）を超えるので'
                  '追加できません。'.format(base, size / 1048576.0))
            print('  圧縮するか、動画なら YouTube の限定公開などをご検討ください。')
            continue
        if size > WARN_LIMIT:
            print('! {0} は {1:.0f}MB と大きめです（GitHub が警告を出す目安）。'
                  .format(base, size / 1048576.0))

        stored = build_stored_name(src)
        ext = os.path.splitext(base)[1].lstrip('.').lower()
        fid = os.path.splitext(stored)[0]

        print('\n▼ {0}  （{1:.1f}MB{2}）'.format(
            base, size / 1048576.0,
            '' if ext in PREVIEWABLE else ' / プレビュー非対応・ダウンロードのみ'))

        if fid in existing:
            print('  同じファイルが既に登録されています。内容を上書きします。')

        # 表示名・説明・カテゴリ・タグ
        display = args.name or (os.path.splitext(base)[0] if args.yes else
                                ask('    表示名（Enterでファイル名のまま）> ',
                                    os.path.splitext(base)[0]))
        desc = args.desc if args.desc is not None else (
            '' if args.yes else ask('    説明（任意・Enterで空）> '))
        default_cat = EXT_TO_CAT.get(ext, 'other')
        cat = args.cat or (default_cat if args.yes else
                           choose_category(data['categories'], default_cat))
        if args.tags is not None:
            tags = [t.strip() for t in args.tags.split(',') if t.strip()]
        elif args.yes:
            tags = []
        else:
            raw = ask('    タグ（カンマ区切り・任意）> ')
            tags = [t.strip() for t in raw.split(',') if t.strip()]

        shutil.copy2(src, os.path.join(FILES_DIR, stored))

        entry = {
            'id': fid, 'name': display, 'file': stored, 'ext': ext,
            'size': size, 'cat': cat, 'desc': desc, 'tags': tags,
            'date': date.today().isoformat(),
        }
        data['files'] = [f for f in data['files'] if f['id'] != fid]
        data['files'].append(entry)
        existing.add(fid)
        added.append(display)
        print('  取り込みました → files/{0}'.format(stored))

    if not added:
        print('\n追加できたファイルはありませんでした。')
        return 1

    save_manifest(data)
    n = write_js(data)
    print('\nfiles.js を更新しました（掲載 {0} 件）。'.format(n))

    label = added[0] if len(added) == 1 else '{0} ほか{1}件'.format(added[0], len(added) - 1)
    publish('資料を追加: {0}'.format(label), not args.no_push)
    return 0


# --------------------------------------------------------------------------

def main():
    p = argparse.ArgumentParser(add_help=True, description='ポータルに資料を追加します')
    p.add_argument('paths', nargs='*', help='追加するファイル')
    p.add_argument('--cat', help='カテゴリID（teian / shiryo / data / image / other）')
    p.add_argument('--desc', help='説明文')
    p.add_argument('--tags', help='タグ（カンマ区切り）')
    p.add_argument('--name', help='表示名')
    p.add_argument('-y', '--yes', action='store_true', help='質問せず既定値で取り込む')
    p.add_argument('--no-push', action='store_true', help='コミットまでで止める')
    p.add_argument('--rebuild', action='store_true', help='manifest から files.js を作り直す')
    p.add_argument('--list', action='store_true', help='登録済みの資料を一覧表示')
    p.add_argument('--remove', metavar='ID', help='資料を1件取り下げる')
    args = p.parse_args()

    data = load_manifest()

    if args.list:
        cmd_list(data)
        return 0

    if args.remove:
        return cmd_remove(data, args.remove, not args.no_push)

    if args.rebuild:
        n = write_js(data)
        print('files.js を作り直しました（掲載 {0} 件）。'.format(n))
        publish('資料データを更新', not args.no_push)
        return 0

    if not args.paths:
        p.print_help()
        print('\nヒント: 「資料を追加.bat」にファイルをドラッグ＆ドロップするのが一番かんたんです。')
        return 1

    return cmd_add(data, args.paths, args)


if __name__ == '__main__':
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print('\n中止しました。')
        sys.exit(130)
