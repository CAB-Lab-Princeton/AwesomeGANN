#!/usr/bin/env python3
"""Generate README.md (an awesome-list) from data/*.json.

Usage:
    python3 scripts/build_readme.py

Everything between the AUTO-GENERATED markers in README.md is rewritten; the
hand-written parts of the README (intro, contributing, rebuilding) live in
scripts/readme_template.md.
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://cab-lab-princeton.github.io/AwesomeGANN/"


def load(name, default=None):
    p = ROOT / "data" / name
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else default


def md_escape(s):
    return s.replace("|", "\\|").replace("[", "\\[").replace("]", "\\]")


def entry(p):
    link = p["links"][0]["url"] if p.get("links") else None
    names = f" **{', '.join(p['names'][:2])}**" if p.get("names") else ""
    title = f"[{md_escape(p['title'])}]({link})" if link else md_escape(p["title"])
    authors = p.get("authors") or []
    who = ", ".join(authors[:3]) + (" et al." if len(authors) > 3 else "")
    bits = [b for b in (p.get("venue"), str(p["year"]) if p.get("year") else None) if b]
    algs = " ".join(f"`{a if a != 'General' else 'Clifford'}`" for a in p.get("algebras", []))
    extra = [l for l in p.get("links", [])[1:] if l["kind"] in ("Code", "arXiv", "DOI")]
    more = " " + " ".join(f"[[{l['kind']}]]({l['url']})" for l in extra) if extra else ""
    who = who.rstrip(".")
    line = f"- {title}.{names} {who}. *{md_escape(', '.join(bits))}*" if bits else f"- {title}.{names} {who}."
    return (line + (f" {algs}" if algs else "") + more).rstrip()


def meta_short(meta, sub_label):
    num = sub_label.split(" ")[0].split("-")[0]
    return next((o["short"] for o in meta["outline"] if o["num"] == num), "")


def main():
    papers = load("papers.json", [])
    meta = load("meta.json", {})
    community = load("community.json", [])
    out = []
    contents = ["## Contents\n"]
    # each work is listed once, under the subsection that discusses it most
    # (Introduction/Outlook only when it is cited nowhere else)
    weak = {"Introduction", "Outlook"}
    home = {}
    for p in papers:
        subs = p["subsections"] or []
        strong = [x for x in subs if meta_short(meta, x) not in weak]
        pool = strong or subs
        if pool:
            home[p["key"]] = max(pool, key=lambda x: (sum(1 for c in p["contexts"] if c["num"] == x.split(" ")[0]), -subs.index(x)))
        else:
            secs = [x for x in p["sections"] if x not in weak] or p["sections"]
            home[p["key"]] = secs[0] if secs else "Introduction"
    for o in meta["outline"]:
        sec_items = [p for p in papers if home[p["key"]] == o["short"]
                     or home[p["key"]].split(" ")[0].split("-")[0] == o["num"] and "-" in home[p["key"]].split(" ")[0]]
        if not sec_items:
            continue
        anchor = f"{o['num']}-{o['short']}".lower().replace(" & ", "--").replace(" ", "-")
        contents.append(f"- [{o['num']}. {o['short']}](#{anchor}) ({len(sec_items)})")
        out.append(f"## {o['num']}. {o['short']}\n")
        out.append(f"*Survey section: {o['title']}.*\n")
        loose = [p for p in sec_items if home[p["key"]] == o["short"]]
        for p in loose:
            out.append(entry(p))
        if loose:
            out.append("")
        for s in o["subs"]:
            label = f"{s['num']} {s['title']}"
            items = [p for p in sec_items if home[p["key"]] == label]
            if not items:
                continue
            out.append(f"### {s['num']} {s['title']}\n")
            out.extend(entry(p) for p in items)
            out.append("")
    if community:
        out.append("## Community additions\n")
        out.append("*Suggested via pull request; not yet reviewed for the survey.*\n")
        for c in community:
            c.setdefault("links", [{"kind": "Link", "url": c.get("url", "")}] if c.get("url") else [])
            out.append(entry(c))
        out.append("")

    if community:
        contents.append(f"- [Community additions](#community-additions) ({len(community)})")
    body = "\n".join(contents + [""] + out)
    template = (ROOT / "scripts" / "readme_template.md").read_text(encoding="utf-8")
    counts = meta.get("counts", {})
    readme = (template
              .replace("{{SITE}}", SITE)
              .replace("{{N_PAPERS}}", str(counts.get("papers", len(papers))))
              .replace("{{LIST}}", "<!-- AUTO-GENERATED: edit data/*.json and run scripts/build_readme.py -->\n\n"
                       + body + "\n<!-- END AUTO-GENERATED -->"))
    (ROOT / "README.md").write_text(readme, encoding="utf-8")
    print(f"README.md written: {len(papers)} survey works, {len(community)} community additions")


if __name__ == "__main__":
    main()
