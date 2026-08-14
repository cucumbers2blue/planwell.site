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
:root { color-scheme: light; --bg:#f6f6f3; --ink:#20242a; --muted:#61665f; --line:#e4e4dd; --surface:#ffffff; --accent:#2f6072; }
* { box-sizing:border-box; }
body { margin:0; min-height:100vh; padding:24px; background:var(--bg); color:var(--ink); font:16px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif; }
main { width:min(100%,640px); margin:0 auto; padding:28px; border:1px solid var(--line); border-radius:8px; background:var(--surface); }
h1 { margin:0 0 6px; font-size:1.5rem; }
h3 { margin:1.2em 0 .3em; }
p { margin:.5em 0; }
ul { margin:.5em 0; padding-left:1.2em; }
a { color:var(--accent); text-decoration:none; font-weight:600; }
a:hover { text-decoration:underline; }
img { max-width:100%; border-radius:6px; margin:.6em 0; }
iframe { max-width:100%; border:0; border-radius:6px; margin:.6em 0; }
hr { border:0; border-top:1px solid var(--line); margin:1em 0; }
.back { display:inline-block; font-size:.9rem; margin-top:1.2em; }
"""


def strip_frontmatter(text: str) -> str:
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) == 3:
            return parts[2].lstrip("\n")
    return text


def inline(text: str) -> str:
    """Markdown inline: bold, italic, links."""
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
    # Task files live in curriculum/<subject>/<name>.md
    for subj in ("music", "design"):
        f = CURRICULUM / subj / f"{target}.md"
        if f.exists():
            slug = f"{target}"
            return f"/classes/{slug}/"
    return None


def render_markdown(text: str) -> str:
    """Very small markdown -> HTML for the pantry link-hub pages."""
    text = strip_frontmatter(text)
    out: list[str] = []
    for raw in text.splitlines():
        line = raw.rstrip()
        if not line.strip():
            continue
        # image embed: ![[path]] -> drop or link (assets may not be published)
        m = EMBED_PATTERN.match(line.strip())
        if m:
            target = m.group(1).strip()
            fname = target.split("/")[-1]
            # If the asset exists relative to pantry, copy it into the page dir? Keep simple: skip.
            out.append(f'<p class="note">[image: {html.escape(fname)}]</p>')
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
                out.append(f'<p><a href="{url}">{html.escape(label)}</a></p>')
            else:
                out.append(f"<p>{html.escape(label)}</p>")
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


def page(title: str, body: str, back: bool = True) -> str:
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
<main>
{body}
{back_link}
</main>
</body>
</html>
"""


def render_all() -> None:
    if not PANTRY.exists():
        print(f"PANTRY NOT FOUND: {PANTRY}", file=sys.stderr)
        sys.exit(1)

    # index page
    index_md = (PANTRY / "index.md").read_text()
    # rewrite [[6|Grade 6_music]] style links to class URLs
    def index_link(m: re.Match) -> str:
        target, label = m.group(1).strip(), (m.group(2) or m.group(1)).strip()
        for fname, slug, _title in GRADES:
            if target == Path(fname).stem:
                return f'<a href="/classes/{slug}/">{html.escape(label)}</a>'
        return html.escape(label)

    body = render_markdown(index_md)
    body = TASK_PATTERN.sub(index_link, body)
    (OUT / "index.html").write_text(page("Classes", body, back=False))
    print("rendered: classes/index.html")

    # grade pages
    for fname, slug, title in GRADES:
        f = PANTRY / fname
        if not f.exists():
            print(f"  missing {fname} — skipping")
            continue
        body = render_markdown(f.read_text())
        (OUT / slug / "index.html").write_text(page(title, body))
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
