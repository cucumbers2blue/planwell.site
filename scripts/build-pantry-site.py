#!/usr/bin/env python3
"""Build The Pantry static student site from Thinkwell curriculum Markdown."""

from __future__ import annotations

import html
import os
import re
import shutil
from dataclasses import dataclass
from pathlib import Path


SITE_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_THINKWELL_ROOT = SITE_ROOT.parents[2] / "Thinkwell"
THINKWELL_ROOT = Path(os.environ.get("THINKWELL_ROOT", DEFAULT_THINKWELL_ROOT))
CURRICULUM = THINKWELL_ROOT / "curriculum"
STUDENTS = THINKWELL_ROOT / "students"
DRIVE_CLASSES = THINKWELL_ROOT / "google_drive" / "Classes"
BLACKHOLE_URL = "https://users-macbook-air.taild024b1.ts.net/"


@dataclass(frozen=True)
class DocSpec:
    slug: str
    title: str
    source: str
    kind: str


@dataclass(frozen=True)
class GradeSpec:
    grade: str
    title: str
    soi: str
    task_summary: str
    docs: tuple[DocSpec, ...]


GRADES: tuple[GradeSpec, ...] = (
    GradeSpec(
        "6",
        "Notation And Musical Time",
        "Musicians invented notation to communicate musical time clearly.",
        "Infographic plus annotated music sheet.",
        (
            DocSpec("unit-plan", "Unit Plan: Notation And Musical Time", "6_Unit_plan.md", "Unit Plan"),
            DocSpec("formative-a", "Formative A: Understanding Our Unit Plan", "6_FormativeA.md", "Formative"),
            DocSpec("task-a", "Task A: Time In Music Notation", "6_TaskA_Notation_Time.md", "Task"),
        ),
    ),
    GradeSpec(
        "7",
        "The History Of Music Notation",
        "Notation systems change over time as musicians' needs to communicate change.",
        "Guided questions plus annotated historical manuscript.",
        (
            DocSpec("unit-plan", "Unit Plan: The History Of Music Notation", "7_Unit_plan.md", "Unit Plan"),
            DocSpec("formative-a", "Formative A: Understanding Our Unit Plan", "7_FormativeA.md", "Formative"),
            DocSpec("task-a", "Task A: History Of Music Notation", "7_TaskA_Notation_History.md", "Task"),
        ),
    ),
    GradeSpec(
        "8",
        "Drum And Percussion Notation",
        "Drum notation lets musicians communicate rhythm, groove, and genre style so a beat can be shared and reproduced.",
        "Guided questions plus annotated drum or percussion music sheet.",
        (
            DocSpec("unit-plan", "Unit Plan: Drum And Percussion Notation", "8_Unit_plan.md", "Unit Plan"),
            DocSpec("formative-a", "Formative A: Understanding Our Unit Plan", "8_FormativeA.md", "Formative"),
            DocSpec("task-a", "Task A: Drum And Percussion Notation", "8_TaskA_Drum_Percussion_Notation.md", "Task"),
        ),
    ),
    GradeSpec(
        "9",
        "Jazz And Blues",
        "Musicians use repeated harmonic structures to communicate identity, expression, and improvisational freedom.",
        "Presentation package about one approved jazz or blues example.",
        (
            DocSpec("unit-plan", "Unit Plan: Jazz And Blues", "9_Unit_plan.md", "Unit Plan"),
            DocSpec("formative-a", "Formative A: Understanding Our Unit Plan", "9_FormativeA.md", "Formative"),
            DocSpec("task-a", "Task A: Jazz And Blues Investigation", "9_TaskA_Jazz_Blues.md", "Task"),
        ),
    ),
    GradeSpec(
        "10",
        "Film Music",
        "Film composers use music to shape how audiences perceive visual meaning and narrative emotion.",
        "Presentation package about one approved film scene with an original score.",
        (
            DocSpec("unit-plan", "Unit Plan: Film Music", "10_Unit_plan.md", "Unit Plan"),
            DocSpec("formative-a", "Formative A: Understanding Our Unit Plan", "10_FormativeA.md", "Formative"),
            DocSpec("task-a", "Task A: Film Music Investigation", "10_TaskA_Film_Music.md", "Task"),
        ),
    ),
)


def parse_frontmatter(text: str) -> tuple[dict[str, str], str]:
    if not text.startswith("---\n"):
        return {}, text.strip()
    end = text.find("\n---", 4)
    if end == -1:
        return {}, text.strip()
    frontmatter: dict[str, str] = {}
    for line in text[4:end].splitlines():
        if ":" in line:
            key, value = line.split(":", 1)
            frontmatter[key.strip()] = value.strip().strip('"')
    return frontmatter, text[end + 4 :].strip()


def strip_teacher_only_sections(markdown: str) -> str:
    lines = markdown.splitlines()
    output: list[str] = []
    skip_level: int | None = None
    for line in lines:
        heading = re.match(r"^(#{2,6})\s+(.+?)\s*$", line)
        if heading:
            level = len(heading.group(1))
            title = heading.group(2).strip().lower()
            if skip_level is not None and level <= skip_level:
                skip_level = None
            if title in {"managebac summary", "reflection"}:
                skip_level = level
                continue
        if skip_level is None:
            output.append(line)
    return "\n".join(output).strip()


def normalize_markdown(markdown: str) -> str:
    markdown = strip_teacher_only_sections(markdown)
    markdown = markdown.replace("- [ ] ", "- □ ")
    markdown = markdown.replace("- [x] ", "- ✓ ").replace("- [X] ", "- ✓ ")
    markdown = re.sub(r"\[\[([^\]|]+)\|([^\]]+)\]\]", r"\2", markdown)
    markdown = re.sub(r"\[\[([^\]]+)\]\]", lambda m: m.group(1).split("|")[-1], markdown)
    return markdown.strip()


def inline_markdown(value: str) -> str:
    escaped = html.escape(value, quote=False)
    escaped = re.sub(r"`([^`]+)`", r"<code>\1</code>", escaped)
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", escaped)
    escaped = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        lambda m: f'<a href="{html.escape(m.group(2), quote=True)}">{m.group(1)}</a>',
        escaped,
    )
    return escaped


def table_to_html(lines: list[str]) -> str:
    rows = []
    for line in lines:
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if all(re.fullmatch(r":?-{3,}:?", cell) for cell in cells):
            continue
        rows.append(cells)
    if not rows:
        return ""
    head = "".join(f"<th>{inline_markdown(cell)}</th>" for cell in rows[0])
    body = []
    for row in rows[1:]:
        body.append("<tr>" + "".join(f"<td>{inline_markdown(cell)}</td>" for cell in row) + "</tr>")
    return '<div class="table-wrap"><table><thead><tr>' + head + "</tr></thead><tbody>" + "".join(body) + "</tbody></table></div>"


def markdown_to_html(markdown: str) -> str:
    lines = markdown.splitlines()
    blocks: list[str] = []
    paragraph: list[str] = []
    list_items: list[str] = []
    list_tag: str | None = None
    table_lines: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            blocks.append("<p>" + inline_markdown(" ".join(part.strip() for part in paragraph)) + "</p>")
            paragraph = []

    def flush_list() -> None:
        nonlocal list_items, list_tag
        if list_items:
            tag = list_tag or "ul"
            blocks.append(f"<{tag}>" + "".join(list_items) + f"</{tag}>")
            list_items = []
            list_tag = None

    def flush_table() -> None:
        nonlocal table_lines
        if table_lines:
            html_table = table_to_html(table_lines)
            if html_table:
                blocks.append(html_table)
            table_lines = []

    for line in lines:
        raw = line.rstrip()
        if not raw:
            flush_paragraph()
            flush_list()
            flush_table()
            continue
        if raw.startswith("|") and raw.endswith("|"):
            flush_paragraph()
            flush_list()
            table_lines.append(raw)
            continue
        flush_table()
        heading = re.match(r"^(#{1,6})\s+(.+)$", raw)
        if heading:
            flush_paragraph()
            flush_list()
            level = min(6, len(heading.group(1)) + 1)
            text = inline_markdown(heading.group(2).strip())
            blocks.append(f"<h{level}>{text}</h{level}>")
            continue
        bullet = re.match(r"^\s*[-*]\s+(.+)$", raw)
        numbered = re.match(r"^\s*\d+\.\s+(.+)$", raw)
        if bullet or numbered:
            flush_paragraph()
            next_tag = "ul" if bullet else "ol"
            if list_tag is not None and list_tag != next_tag:
                flush_list()
            list_tag = next_tag
            item = (bullet or numbered).group(1).strip()
            list_items.append(f"<li>{inline_markdown(item)}</li>")
            continue
        paragraph.append(raw)

    flush_paragraph()
    flush_list()
    flush_table()
    return "\n".join(blocks)


def load_doc(source: str) -> tuple[dict[str, str], str]:
    text = (CURRICULUM / source).read_text(encoding="utf-8")
    meta, body = parse_frontmatter(text)
    return meta, normalize_markdown(body)


def student_frontmatter(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8", errors="replace")
    meta, _ = parse_frontmatter(text)
    return meta


def display_name(mngbac: str) -> str:
    if "," in mngbac:
        last, first = [part.strip() for part in mngbac.split(",", 1)]
        return f"{first} {last}".strip()
    return mngbac.strip()


def roster_rows(grade: str) -> list[tuple[str, str]]:
    local = []
    for path in sorted(STUDENTS.glob("*.md")):
        meta = student_frontmatter(path)
        if meta.get("Grade") == grade:
            local.append(
                {
                    "section": meta.get("Section", ""),
                    "drive": meta.get("Drive", ""),
                    "name": display_name(meta.get("Mngbac", "")),
                }
            )
    local_keys = {(item["section"], item["drive"]) for item in local}
    drive_keys = set()
    grade_dir = DRIVE_CLASSES / grade
    if grade_dir.exists():
        for path in grade_dir.iterdir():
            if not path.is_dir():
                continue
            if "_" in path.name:
                section, drive_name = path.name.split("_", 1)
            else:
                section, drive_name = "", path.name
            drive_keys.add((section, drive_name))

    aliases = {
        ("8", "B", "lio"): ("B", "Lionel"),
        ("9", "A", "Nil"): ("A", "Nill"),
        ("9", "B", "Daveny"): ("A", "Daveny"),
        ("10", "", "Chale"): ("B", "Chale"),
        ("10", "", "Hyorin"): ("B", "Hyorin"),
        ("10", "", "Ivan"): ("B", "Ivan"),
        ("10", "", "Nathan"): ("B", "Nathan"),
        ("10", "", "Wilson"): ("A", "Wilson"),
    }
    adjusted_drive = {aliases.get((grade, section, name), (section, name)) for section, name in drive_keys}
    extras = sorted(adjusted_drive - local_keys)

    rows = [(item["section"], item["name"]) for item in local]
    rows.extend(extras)
    return sorted(rows, key=lambda item: (item[0], item[1].lower()))


def tracker_html(grade: str) -> str:
    rows = roster_rows(grade)
    body = []
    for section, name in rows:
        label = f"{grade}{section} - {name}" if section else f"{grade} - {name}"
        body.append(f"<tr><td>{html.escape(label)}</td><td></td></tr>")
    return (
        '<section class="panel" id="tracker"><h2>Formative A Tracker</h2>'
        '<div class="table-wrap"><table><thead><tr><th>Student</th><th>Formative A</th></tr></thead>'
        f"<tbody>{''.join(body)}</tbody></table></div></section>"
    )


CSS = """
:root{--bg:#f6f7f4;--surface:#ffffff;--ink:#20242a;--muted:#626a73;--line:#d9ddd6;--soft:#ecefeb;--accent:#335f72;--accent2:#7a6a45;--max:1120px}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}
a{color:var(--accent);text-decoration:none}a:hover{text-decoration:underline}.skip{position:absolute;left:-999px}.skip:focus{left:16px;top:12px;background:var(--surface);padding:8px;border:1px solid var(--line)}
.top{border-bottom:1px solid var(--line);background:rgba(246,247,244,.96);position:sticky;top:0;z-index:10}.bar{max-width:var(--max);margin:0 auto;padding:14px 18px;display:flex;gap:16px;align-items:center;justify-content:space-between}.brand{font-weight:700;color:var(--ink)}.nav{display:flex;gap:8px;flex-wrap:wrap}.nav a{font-size:.9rem;color:var(--muted);padding:5px 8px;border-radius:6px}.nav a[aria-current="page"],.nav a:hover{background:var(--soft);color:var(--ink);text-decoration:none}
main{max-width:var(--max);margin:0 auto;padding:28px 18px 54px}.intro{display:grid;gap:12px;margin-bottom:24px}.kicker{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:700}h1{font-size:clamp(2rem,5vw,3.4rem);line-height:1.04;margin:0;color:var(--ink);letter-spacing:0}h2{font-size:1.35rem;line-height:1.2;margin:0 0 12px}h3{font-size:1.05rem;margin:22px 0 8px}.lead{font-size:1.05rem;max-width:72ch;color:#343a41;margin:0}.meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}.pill{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:5px 10px;color:var(--muted);font-size:.86rem}
.grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}.card,.panel,.doc-card{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:16px}.card{display:grid;gap:8px;min-height:158px}.card strong{font-size:1.15rem;color:var(--ink)}.card span,.muted{color:var(--muted)}.card .go{margin-top:auto;font-weight:700}.actions{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0}.button{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:8px;padding:9px 12px;background:var(--surface);font-weight:700;color:var(--ink)}.button.primary{background:var(--accent);border-color:var(--accent);color:white}.docs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:18px 0}.doc-card{display:grid;gap:8px}.doc-card .kind{color:var(--accent2);font-size:.82rem;text-transform:uppercase;font-weight:700;letter-spacing:.06em}.doc-card strong{font-size:1.05rem}.panel{margin-top:18px}.content{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:clamp(18px,3vw,34px)}.content h2{margin-top:28px}.content h2:first-child{margin-top:0}.content p{margin:0 0 12px}.content ul,.content ol{margin:0 0 14px 22px;padding:0}.content li{margin:4px 0}.content code{background:var(--soft);border-radius:4px;padding:1px 4px}.table-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:8px;background:var(--surface)}table{width:100%;border-collapse:collapse;min-width:520px}th,td{text-align:left;border-bottom:1px solid var(--line);padding:9px 10px;vertical-align:top}th{background:var(--soft);font-size:.85rem}tr:last-child td{border-bottom:0}.footer{border-top:1px solid var(--line);color:var(--muted);padding:20px 18px;text-align:center}
@media (max-width:900px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.docs{grid-template-columns:1fr}.bar{align-items:flex-start;flex-direction:column}.nav{gap:4px}}
@media (max-width:560px){main{padding:20px 14px 42px}.grid{grid-template-columns:1fr}.card{min-height:0}.content{padding:16px}.button{width:100%;justify-content:center}table{min-width:430px}}
""".strip()


def layout(title: str, body: str, active_grade: str | None = None, description: str = "") -> str:
    nav_links = ['<a href="/music/"{}>Home</a>'.format(' aria-current="page"' if active_grade is None else "")]
    for grade in GRADES:
        current = ' aria-current="page"' if active_grade == grade.grade else ""
        nav_links.append(f'<a href="/music/grade-{grade.grade}/"{current}>Grade {grade.grade}</a>')
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(title)} | The Pantry</title>
  <meta name="description" content="{html.escape(description or 'Student-facing music documents for The Pantry.', quote=True)}">
  <style>{CSS}</style>
</head>
<body>
  <a class="skip" href="#content">Skip to content</a>
  <header class="top"><div class="bar"><a class="brand" href="/music/">The Pantry</a><nav class="nav" aria-label="Grades">{''.join(nav_links)}</nav></div></header>
  <main id="content">{body}</main>
  <footer class="footer">Music at GMIS. Read here, work in your own file, submit through the Blackhole.</footer>
</body>
</html>
"""


def write_page(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def build_index() -> None:
    cards = []
    for grade in GRADES:
        cards.append(
            f'<a class="card" href="/music/grade-{grade.grade}/">'
            f"<strong>Grade {grade.grade}</strong><span>{html.escape(grade.title)}</span>"
            f'<span class="muted">{html.escape(grade.task_summary)}</span><span class="go">Open grade</span></a>'
        )
    body = (
        '<section class="intro"><div class="kicker">Student documents</div><h1>The Pantry</h1>'
        '<p class="lead">Choose your grade, read the unit documents, then submit finished work through the Blackhole.</p>'
        f'<div class="actions"><a class="button primary" href="{BLACKHOLE_URL}">Open Blackhole</a></div></section>'
        f'<section class="grid">{"".join(cards)}</section>'
    )
    write_page(SITE_ROOT / "music" / "index.html", layout("The Pantry", body))


def build_grade(grade: GradeSpec) -> None:
    doc_cards = []
    for doc in grade.docs:
        doc_cards.append(
            f'<a class="doc-card" href="/music/grade-{grade.grade}/{doc.slug}/">'
            f'<span class="kind">{html.escape(doc.kind)}</span><strong>{html.escape(doc.title)}</strong>'
            f'<span class="muted">Open document</span></a>'
        )
    body = (
        f'<section class="intro"><div class="kicker">Grade {grade.grade}</div><h1>{html.escape(grade.title)}</h1>'
        f'<p class="lead">{html.escape(grade.soi)}</p>'
        f'<div class="meta"><span class="pill">{html.escape(grade.task_summary)}</span></div>'
        f'<div class="actions"><a class="button primary" href="{BLACKHOLE_URL}">Open Blackhole</a><a class="button" href="#tracker">Formative A Tracker</a></div></section>'
        f'<section class="docs">{"".join(doc_cards)}</section>'
        f"{tracker_html(grade.grade)}"
    )
    write_page(
        SITE_ROOT / "music" / f"grade-{grade.grade}" / "index.html",
        layout(f"Grade {grade.grade}", body, active_grade=grade.grade, description=grade.soi),
    )


def build_doc(grade: GradeSpec, doc: DocSpec) -> None:
    _, markdown = load_doc(doc.source)
    markdown = re.sub(r"^#\s+.+\n+", "", markdown, count=1)
    content = markdown_to_html(markdown)
    body = (
        f'<section class="intro"><div class="kicker">Grade {grade.grade} / {html.escape(doc.kind)}</div>'
        f"<h1>{html.escape(doc.title)}</h1>"
        f'<div class="actions"><a class="button" href="/music/grade-{grade.grade}/">Back to Grade {grade.grade}</a>'
        f'<a class="button primary" href="{BLACKHOLE_URL}">Open Blackhole</a></div></section>'
        f'<article class="content">{content}</article>'
    )
    write_page(
        SITE_ROOT / "music" / f"grade-{grade.grade}" / doc.slug / "index.html",
        layout(doc.title, body, active_grade=grade.grade, description=f"Grade {grade.grade} {doc.kind}"),
    )


def main() -> None:
    if not CURRICULUM.exists():
        raise SystemExit(f"Missing curriculum folder: {CURRICULUM}")
    music_root = SITE_ROOT / "music"
    if music_root.exists():
        shutil.rmtree(music_root)
    build_index()
    for grade in GRADES:
        build_grade(grade)
        for doc in grade.docs:
            build_doc(grade, doc)
    print(f"Built Pantry site in {music_root}")


if __name__ == "__main__":
    main()
