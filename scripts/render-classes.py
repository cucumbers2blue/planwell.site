#!/usr/bin/env python3
"""Render Thinkwell pantry Markdown into the static /classes/ site.

Source of truth: iCloud Thinkwell vault (pantry/*.md + pantry/curriculum/)
Output:         planwell.site/classes/  (GitHub Pages -> planwellmd.com/classes/)

Usage:
  python3 scripts/render-classes.py            # render only (no git)
  python3 scripts/render-classes.py --publish  # render + commit + push
"""

from __future__ import annotations

import argparse
import html
import re
import shutil
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote

REPO_ROOT = Path(__file__).resolve().parents[1]
THINKWELL = Path(
    "/Users/user/Library/Mobile Documents/com~apple~CloudDocs/Thinkwell"
)
PANTRY = THINKWELL / "pantry"
CURRICULUM = PANTRY / "curriculum"
OUT = REPO_ROOT / "classes"

# grade filename -> (slug, title)
GRADES = [
    ("6.md", "6-music", "6 Music"),
    ("6_design.md", "6-design", "6 Design"),
    ("7.md", "7-music", "7 Music"),
    ("8.md", "8-music", "8 Music"),
    ("9.md", "9-music", "9 Music"),
    ("10.md", "10-music", "10 Music"),
]

TASK_PATTERN = re.compile(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]")
EMBED_PATTERN = re.compile(r"!\[\[([^\]]+)\]\]")

CSS = """
:root { color-scheme:light; --bg:#f3f1ea; --ink:#17231c; --muted:#657067; --line:#dce2dc; --surface:#fff; --accent:#2f6a4b; --accent-soft:#edf5ef; }
* { box-sizing:border-box; }
body { margin:0; min-height:100vh; padding:clamp(16px,4vw,48px); background:var(--bg); color:var(--ink); font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
main { width:min(100%,720px); margin:0 auto; padding:clamp(24px,5vw,52px); border:1px solid rgba(47,106,75,.14); border-radius:24px; background:var(--surface); box-shadow:0 18px 50px rgba(23,35,28,.07); }
h1 { margin:0 0 8px; font-size:clamp(2rem,7vw,3.3rem); line-height:1.05; letter-spacing:-.04em; }
h2 { margin:2rem 0 .7rem; font-size:1rem; color:var(--muted); letter-spacing:.04em; text-transform:uppercase; }
h3 { margin:1.5em 0 .35em; }
p { margin:.55em 0; }
ul,ol { padding-left:1.35em; }
a { color:var(--accent); text-decoration-thickness:1px; text-underline-offset:3px; }
a:hover { text-decoration-thickness:2px; }
a:focus-visible { outline:3px solid rgba(47,106,75,.25); outline-offset:3px; border-radius:6px; }
img { display:block; max-width:100%; height:auto; border-radius:16px; margin:1.2em 0; }
iframe { width:100%; max-width:100%; border:0; border-radius:16px; margin:1.2em 0; }
hr { border:0; border-top:1px solid var(--line); margin:1.5em 0; }
.hub > p:first-of-type { color:var(--muted); margin-top:0; }
.hub > ul { display:grid; grid-template-columns:1fr; gap:10px; margin:1.5rem 0 0; padding:0; list-style:none; }
.home > ul { grid-template-columns:repeat(2,minmax(0,1fr)); }
.hub > ul li { margin:0; }
.hub > .link-card { margin:10px 0 0; }
.hub > ul a, .hub > .link-card a { display:flex; align-items:center; min-height:58px; padding:14px 16px; border:1px solid var(--line); border-radius:14px; background:#fbfcfa; color:var(--ink); font-weight:650; line-height:1.25; text-decoration:none; }
.hub > ul a:hover, .hub > .link-card a:hover { border-color:#b8cbbb; background:var(--accent-soft); color:var(--accent); }
.back { display:inline-block; margin-top:2rem; color:var(--muted); font-size:.92rem; text-decoration:none; }
.back:hover { color:var(--accent); }
@media (max-width:520px) { .home > ul { grid-template-columns:1fr; } main { border-radius:18px; } }
"""


def strip_frontmatter(text: str) -> str:
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) == 3:
            return parts[2].lstrip("\n")
    return text


def inline(text: str) -> str:
    """Markdown inline: bold, italic, links, wikilinks."""
    # wikilinks with optional alias: [[target]] or [[target|label]]
    def wl(m: re.Match) -> str:
        target, label = m.group(1).strip(), m.group(2)
        label = (label or prettify(target)).strip()
        url = resolve_wikilink(target)
        if url:
            # encode spaces and other unsafe chars in the URL path
            encoded = quote(url)
            return f'<a href="{encoded}">{html.escape(label)}</a>'
        return html.escape(label)

    text = TASK_PATTERN.sub(wl, text)
    # links first: [text](url)
    text = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        lambda m: f'<a href="{html.escape(m.group(2))}">{m.group(1)}</a>',
        text,
    )
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", text)
    return text


def prettify(name: str) -> str:
    """7_TaskA_Notation_History -> Task A: Notation History"""
    name = name.strip()
    m = re.match(r"(\d+)_(Task[A-Za-z]*)_(.+)", name)
    if m:
        task = m.group(2).replace("TaskA", "Task A").replace("FormativeA", "Formative A")
        return f"{task}: {m.group(3).replace('_', ' ')}"
    return name.replace("_", " ")


def resolve_wikilink(target: str) -> str | None:
    """Map a [[wikilink]] target to its rendered URL, or None if unknown."""
    # Obsidian allows [[name]] or [[name.md]]; normalize both
    target = target.strip()
    if target.endswith(".md"):
        target = target[:-3]
    for fname, slug, _title in GRADES:
        if target == Path(fname).stem:
            return f"/classes/{slug}/"
    # Task files live in curriculum/<subject>/<name>.md
    for subj in ("music", "design"):
        f = CURRICULUM / subj / f"{target}.md"
        if f.exists():
            slug = f"{target}"
            return f"/classes/{slug}/"
    return None


def find_asset(name: str) -> Path | None:
    """Resolve an embedded image by basename anywhere in the Thinkwell vault."""
    name = name.strip().split("/")[-1]
    # search order: pantry/assets, pantry root, vault root, curriculum assets
    candidates = [
        PANTRY / "assets" / name,
        PANTRY / name,
        THINKWELL / name,
    ]
    for c in candidates:
        if c.exists() and c.is_file():
            return c
    # fallback: recursive search by filename
    for root in (PANTRY, THINKWELL):
        try:
            hits = list(root.rglob(name))
            if hits:
                return hits[0]
        except PermissionError:
            continue
    return None


def render_markdown(text: str) -> str:
    """Very small markdown -> HTML for the pantry link-hub pages."""
    text = strip_frontmatter(text)
    out: list[str] = []
    for raw in text.splitlines():
        line = raw.rstrip()
        if not line.strip():
            continue
        # image embed: ![[path]] -> copy asset into site and render <img>
        m = EMBED_PATTERN.match(line.strip())
        if m:
            target = m.group(1).strip()
            fname = target.split("/")[-1]
            src = find_asset(fname)
            if src:
                out.append(f'<p><img src="/classes/assets/{quote(fname)}" alt="{html.escape(fname)}"></p>')
            else:
                out.append(f'<p class="note">[image not found: {html.escape(fname)}]</p>')
            continue
        # raw iframe (YouTube) — keep as-is (allowlist: youtube only)
        if line.strip().startswith("<iframe") and "youtube.com" in line:
            out.append(line)
            continue
        # wikilink on its own line
        m = TASK_PATTERN.match(line.strip())
        if m:
            target, label = m.group(1).strip(), m.group(2)
            label = (label or target).strip()
            # prettify bare filenames: 7_TaskA_Notation_History -> Task A: Notation History
            if not m.group(2):
                label = prettify(target)
            url = resolve_wikilink(target)
            if url:
                out.append(f'<p class="link-card"><a href="{url}">{html.escape(label)}</a></p>')
            else:
                out.append(f"<p>{html.escape(label)}</p>")
            continue
        if re.fullmatch(r"\[[^\]]+\]\([^)]+\)", line.strip()):
            out.append(f'<p class="link-card">{inline(line.strip())}</p>')
            continue
        # headings
        if line.startswith("### "):
            out.append(f"<h3>{inline(line[4:])}</h3>")
            continue
        if line.startswith("## "):
            out.append(f"<h2>{inline(line[3:])}</h2>")
            continue
        if line.startswith("# "):
            out.append(f"<h1>{inline(line[2:])}</h1>")
            continue
        if line.startswith("----") or line.startswith("---"):
            out.append("<hr>")
            continue
        if line.startswith("- "):
            out.append(f"<li>{inline(line[2:])}</li>")
            continue
        out.append(f"<p>{inline(line)}</p>")
    # wrap consecutive <li> in <ul>
    html_text = "\n".join(out)
    html_text = re.sub(
        r"(<li>.*?</li>\n?)+",
        lambda m: "<ul>\n" + m.group(0) + "</ul>",
        html_text,
        flags=re.S,
    )
    return html_text


def page(title: str, body: str, back: bool = True, kind: str = "document") -> str:
    back_link = '<a class="back" href="/classes/">← Classes</a>' if back else ""
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<style>{CSS}</style>
</head>
<body>
<main class="{kind}">
{body}
{back_link}
</main>
</body>
</html>
"""


ASSETS_OUT = OUT / "assets"


def sync_assets() -> None:
    """Copy every embedded image found in pantry markdown into classes/assets/."""
    assets_out = ASSETS_OUT
    assets_out.mkdir(parents=True, exist_ok=True)
    # collect all embed targets from pantry + curriculum markdown
    targets: set[str] = set()
    for md_file in list(PANTRY.glob("*.md")) + list(
        CURRICULUM.rglob("*.md")
    ):
        try:
            text = md_file.read_text()
        except (OSError, PermissionError):
            continue
        for m in EMBED_PATTERN.finditer(text):
            fname = m.group(1).strip().split("/")[-1]
            if fname:
                targets.add(fname)
    for fname in sorted(targets):
        src = find_asset(fname)
        if not src:
            continue
        dest = assets_out / fname
        if not dest.exists() or dest.stat().st_size != src.stat().st_size:
            shutil.copy2(src, dest)
            print(f"asset: {fname}")


def render_all() -> None:
    if not PANTRY.exists():
        print(f"PANTRY NOT FOUND: {PANTRY}", file=sys.stderr)
        sys.exit(1)

    sync_assets()

    # index page
    index_md = (PANTRY / "index.md").read_text()
    body = render_markdown(index_md)
    (OUT / "index.html").write_text(page("Classes", body, back=False, kind="hub home"))
    print("rendered: classes/index.html")

    # grade pages
    for fname, slug, title in GRADES:
        f = PANTRY / fname
        if not f.exists():
            print(f"  missing {fname} — skipping")
            continue
        body = render_markdown(f.read_text())
        (OUT / slug / "index.html").write_text(page(title, body, kind="hub grade"))
        print(f"rendered: classes/{slug}/index.html")

    # task pages (wikilink targets from curriculum/)
    for subj in ("music", "design"):
        subj_dir = CURRICULUM / subj
        if not subj_dir.exists():
            continue
        for f in sorted(subj_dir.glob("*.md")):
            body = render_markdown(f.read_text())
            target_dir = OUT / f.stem
            target_dir.mkdir(parents=True, exist_ok=True)
            (target_dir / "index.html").write_text(
                page(f.stem.replace("_", " "), body)
            )
            print(f"rendered: classes/{f.stem}/index.html")


def publish() -> None:
    # render quietly; only report when there are actual changes
    import io
    from contextlib import redirect_stdout

    buf = io.StringIO()
    with redirect_stdout(buf):
        render_all()
    subprocess.run(["git", "add", "classes"], cwd=REPO_ROOT, check=True)
    r = subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=REPO_ROOT)
    if r.returncode == 0:
        print("no changes — nothing to publish")
        return
    subprocess.run(
        ["git", "commit", "-m", "Publish classes from Thinkwell pantry"],
        cwd=REPO_ROOT,
        check=True,
        capture_output=True,
    )
    subprocess.run(
        ["git", "push", "origin", "main"],
        cwd=REPO_ROOT,
        check=True,
        capture_output=True,
    )
    print("published to planwellmd.com/classes/")
    print(buf.getvalue().strip())


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--publish", action="store_true", help="render + commit + push")
    args = ap.parse_args()
    if args.publish:
        publish()
    else:
        render_all()
