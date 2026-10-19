#!/usr/bin/env python3
"""Build the site data (data/*.json) from the survey's LaTeX sources.

Usage:
    python3 scripts/build_data.py --survey /path/to/survey/latex

The survey directory must contain main.bib, sec/*.tex and (optionally)
main.bbl, which fixes the citation numbers to match the PDF. Only the
standard library is used.

Outputs (all overwritten):
    data/papers.json   every cited bib entry, with links, citation contexts,
                       survey-section tags and algebra tags
    data/tables.json   the survey's tables as structured rows
    data/meta.json     abstract, keywords, section outline, counts

Community additions live in data/community.json, which this script never
touches; the site and the README merge it at load/build time.
"""

import argparse
import json
import re
import sys
from collections import OrderedDict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# --------------------------------------------------------------------------
# LaTeX -> plain unicode text
# --------------------------------------------------------------------------

ACCENTS = {
    '"': "\u0308", "'": "\u0301", "`": "\u0300", "^": "\u0302", "~": "\u0303",
    "=": "\u0304", ".": "\u0307", "u": "\u0306", "v": "\u030c", "H": "\u030b",
    "c": "\u0327", "k": "\u0328", "r": "\u030a",
}
SPECIAL_LETTERS = {
    r"\i": "i", r"\o": "ø", r"\O": "Ø", r"\ss": "ß", r"\ae": "æ", r"\AE": "Æ",
    r"\l": "ł", r"\L": "Ł", r"\aa": "å", r"\AA": "Å", r"\oe": "œ",
}
SYMBOLS = {
    r"\mathbb{G}": "𝔾", r"\mathbb{R}": "ℝ", r"\mathcal{O}": "𝒪",
    r"\times": "×", r"\leq": "≤", r"\geq": "≥", r"\surd": "✓", r"\supset": "⊃",
    r"\subset": "⊂", r"\subseteq": "⊆", r"\wedge": "∧", r"\cdot": "·",
    r"\langle": "⟨", r"\rangle": "⟩", r"\theta": "θ", r"\infty": "∞",
    r"\alpha": "α", r"\sigma": "σ", r"\phi": "φ", r"\psi": "ψ", r"\rho": "ρ",
    r"\Gamma": "Γ", r"\lVert": "‖", r"\rVert": "‖", r"\mapsto": "↦",
    r"\to": "→", r"\rightarrow": "→", r"\ast": "*", r"\sum": "Σ",
    r"\approx": "≈", r"\sim": "~", r"\pm": "±", r"\dots": "…", r"\ldots": "…",
    r"\cdots": "⋯", r"\circ": "∘", r"\in": "∈",
}
SUB = str.maketrans("0123456789,+-=()nkpqr", "₀₁₂₃₄₅₆₇₈₉,₊₋₌₍₎ₙₖₚqᵣ")
SUP = str.maketrans("0123456789+-=()nk", "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿᵏ")


def _group(s, i):
    """Return (content, end) for a brace group starting at s[i] == '{'."""
    depth = 0
    for j in range(i, len(s)):
        if s[j] == "{" and (j == 0 or s[j - 1] != "\\"):
            depth += 1
        elif s[j] == "}" and (j == 0 or s[j - 1] != "\\"):
            depth -= 1
            if depth == 0:
                return s[i + 1:j], j + 1
    return s[i + 1:], len(s)


def _script(s, marker, table):
    out, i = [], 0
    while i < len(s):
        if s[i] == marker and i + 1 < len(s):
            if s[i + 1] == "{":
                body, i = _group(s, i + 1)
            else:
                body, i = s[i + 1], i + 2
            body = body.replace(" ", "")
            if all(ch in "0123456789,+-=()nkpqr" for ch in body) and marker == "_":
                out.append(body.translate(table))
            elif all(ch in "0123456789+-=()nk" for ch in body) and marker == "^":
                out.append(body.translate(table))
            else:
                out.append(("_" if marker == "_" else "^") + body)
        else:
            out.append(s[i])
            i += 1
    return "".join(out)


def tex_to_text(s, keep_cites=False):
    """Convert a LaTeX snippet to readable unicode text."""
    if not s:
        return ""
    s = re.sub(r"(?<!\\)%.*", "", s)
    if not keep_cites:
        s = re.sub(r"~?\\cite[a-z]*\{[^}]*\}", "", s)
    s = re.sub(r"\\(ref|label|eqref)\{[^}]*\}", "", s)
    # accents: \"{o}, {\"o}, \'\i, \v{c}
    def acc(m):
        mark, letter = m.group(1), m.group(2) or m.group(3)
        letter = SPECIAL_LETTERS.get(letter, letter.lstrip("\\"))
        import unicodedata
        return unicodedata.normalize("NFC", letter + ACCENTS[mark])
    s = re.sub(r"\\([\"'`^~=.uvHckr])\s*(?:\{(\\?[A-Za-z])\}|(\\i|[A-Za-z]))", acc, s)
    for k, v in SPECIAL_LETTERS.items():
        s = re.sub(re.escape(k) + r"(?![A-Za-z])", v, s)
    for k, v in sorted(SYMBOLS.items(), key=lambda kv: -len(kv[0])):
        s = s.replace(k, v)
    s = re.sub(r"\\(mathrm|text|textit|emph|textbf|textsc|texttt|mathbf|mathit|operatorname|textrm|textsf|bm|boldsymbol|underline)\s*\{", "{", s)
    s = re.sub(r"\\(small|footnotesize|scriptsize|normalsize|centering|raggedright|noindent|indent|hfill|quad|qquad|,|;|!|\s)", " ", s)
    s = s.replace(r"\_", "_").replace(r"\%", "%").replace(r"\&", "&").replace(r"\#", "#").replace(r"\$", "$")
    s = s.replace(r"\{", "{").replace(r"\}", "}")
    s = re.sub(r"\\textasciitilde\{?\}?", "~", s)
    s = s.replace("\\(", "").replace("\\)", "").replace("$", "")
    s = s.replace("---", "—").replace("--", "–").replace("``", "“").replace("''", "”")
    s = s.replace("’’", "”").replace("‘‘", "“")
    s = s.replace("\\\\", " ")
    s = s.replace("~", " ")
    s = _script(s, "_", SUB)
    s = _script(s, "^", SUP)
    s = re.sub(r"\\[A-Za-z]+\*?", "", s)  # drop any remaining command names
    s = s.replace("{", "").replace("}", "")
    s = s.replace("\\", "")
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"\s+([,.;:)])", r"\1", s)
    s = re.sub(r"\(\s+", "(", s)
    return s


# --------------------------------------------------------------------------
# BibTeX parsing
# --------------------------------------------------------------------------

def parse_bib(text):
    entries = OrderedDict()
    i = 0
    while True:
        m = re.compile(r"@(\w+)\s*\{").search(text, i)
        if not m:
            break
        etype = m.group(1).lower()
        j = m.end()
        if etype in ("comment", "preamble", "string"):
            _, i = _group(text, m.end() - 1)
            continue
        k = text.index(",", j)
        key = text[j:k].strip()
        body, i = _group(text, m.end() - 1)
        body = body[len(text[j:k]) + 1:]
        fields = {}
        p = 0
        while p < len(body):
            fm = re.compile(r"\s*([A-Za-z_\-]+)\s*=\s*").match(body, p)
            if not fm:
                p += 1
                continue
            name = fm.group(1).lower()
            p = fm.end()
            if p < len(body) and body[p] == "{":
                val, p = _group(body, p)
            elif p < len(body) and body[p] == '"':
                q = p + 1
                depth = 0
                while q < len(body):
                    if body[q] == "{":
                        depth += 1
                    elif body[q] == "}":
                        depth -= 1
                    elif body[q] == '"' and depth == 0:
                        break
                    q += 1
                val, p = body[p + 1:q], q + 1
            else:
                vm = re.compile(r"[^,\n]+").match(body, p)
                val = vm.group(0).strip() if vm else ""
                p = vm.end() if vm else p
            fields[name] = val.strip()
            cm = re.compile(r"\s*,?").match(body, p)
            p = cm.end()
        entries[key] = {"type": etype, "fields": fields}
    return entries


def split_authors(raw):
    if not raw:
        return []
    parts = re.split(r"\s+and\s+", re.sub(r"\s+", " ", raw))
    out = []
    for a in parts:
        a = a.strip()
        if a.lower() == "others":
            out.append("et al.")
            continue
        if "," in a:
            last, first = a.split(",", 1)
            name = f"{first.strip()} {last.strip()}"
        else:
            name = a
        out.append(tex_to_text(name))
    return out


def sentence_case_first(s):
    return s[:1].upper() + s[1:] if s else s


def venue_of(f, etype):
    for k in ("journal", "booktitle", "howpublished", "publisher", "school", "institution"):
        if f.get(k):
            v = tex_to_text(f[k])
            if re.match(r"arxiv preprint", v, re.I):
                return "arXiv preprint"
            if k == "school":
                v = f"Thesis, {v}"
            return sentence_case_first(v)
    if etype in ("misc",) and f.get("url"):
        return "Software" if "github" in f["url"] else "Online"
    return ""


def links_of(f, title):
    links = []
    blob = " ".join(f.get(k, "") for k in ("journal", "eprint", "note", "url", "howpublished", "volume"))
    am = re.search(r"arXiv[:\s]*(\d{4}\.\d{4,5})", blob, re.I) or re.search(r"arxiv\.org/(?:abs|pdf)/(\d{4}\.\d{4,5})", blob)
    if not am and f.get("eprint") and re.match(r"\d{4}\.\d{4,5}", f["eprint"]):
        am = re.match(r"(\d{4}\.\d{4,5})", f["eprint"])
    if am:
        links.append({"kind": "arXiv", "url": f"https://arxiv.org/abs/{am.group(1)}"})
    if f.get("doi"):
        doi = re.sub(r"^https?://(dx\.)?doi\.org/", "", f["doi"].strip())
        links.append({"kind": "DOI", "url": f"https://doi.org/{doi}"})
    if f.get("url"):
        url = re.sub(r"\\url\{(.*)\}", r"\1", f["url"]).strip()
        url = url.replace(r"\_", "_").replace(r"\%", "%")
        kind = "Code" if "github.com" in url or "gitlab" in url else "Link"
        if not any(l["url"] == url for l in links) and "arxiv.org" not in url:
            links.append({"kind": kind, "url": url})
    if not links:
        from urllib.parse import quote_plus
        links.append({"kind": "Scholar", "url": "https://scholar.google.com/scholar?q=" + quote_plus(title)})
    return links


# --------------------------------------------------------------------------
# Survey text scanning
# --------------------------------------------------------------------------

SEC_FILES = ["0-abstract", "1-intro", "2-prelim", "3-gdl", "4-gann", "5-apps",
             "6-experiments", "7-lib", "8-conclusion"]

# Short labels for the explorer facets (full titles are kept too).
SECTION_SHORT = {
    "Introduction": "Introduction",
    "Foundational Concepts: GA for NNs": "Foundations",
    "GDL Principles: Equivariance and Symmetries": "Equivariance",
    "GA NN Layers": "Layers & architectures",
    "Applications": "Applications",
    "Empirical Studies": "Empirical evidence",
    "Software Libraries and Implementation": "Software",
    "Future Directions and Conclusion": "Outlook",
}


def strip_comments(tex):
    return "\n".join(re.sub(r"(?<!\\)%.*", "", line) for line in tex.splitlines())


def sentences_with_cites(par):
    """Split a paragraph into sentences without breaking inside braces/math."""
    out, buf, depth = [], [], 0
    i = 0
    while i < len(par):
        ch = par[i]
        buf.append(ch)
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
        if ch == "." and depth == 0:
            nxt = par[i + 1:i + 3]
            prev = "".join(buf[-6:])
            if (nxt[:1] in (" ", "\n", "") and not re.search(r"(e\.g|i\.e|et al|vs|Fig|Sec|resp|approx|\\ |\.\\)\.$", prev)
                    and not re.search(r"[A-Z]\.$", prev[-2:])):
                out.append("".join(buf).strip())
                buf = []
        i += 1
    if "".join(buf).strip():
        out.append("".join(buf).strip())
    return out


# IEEE-style numbering, as printed in the survey (Section III-B)
ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]


def scan_sections(survey):
    """Return citation contexts and the section outline."""
    contexts = {}       # key -> list of {sec, sub, num, text}
    outline = []        # [{num, title, short, subs:[{num,title}]}]
    order = []          # cite keys in order of first appearance
    sec_n, sub_n = 0, 0
    cur_sec, cur_sub, cur_num = None, None, None
    for name in SEC_FILES:
        path = survey / "sec" / f"{name}.tex"
        if not path.exists():
            continue
        tex = strip_comments(path.read_text(encoding="utf-8"))
        # remove floats from the sentence stream (tables handled separately),
        # but keep their citations attached to the current section
        tokens = re.split(r"(\\section\*?\{[^}]*\}|\\subsection\*?\{[^}]*\}|\\paragraph\{[^}]*\}|\\subsubsection\{[^}]*\})", tex)
        for tok in tokens:
            m = re.match(r"\\(section|subsection|subsubsection|paragraph)\*?\{([^}]*)\}", tok)
            if m:
                kind, title = m.group(1), tex_to_text(m.group(2))
                if kind == "section":
                    sec_n += 1
                    sub_n = 0
                    cur_sec, cur_sub, cur_num = title, None, ROMAN[sec_n]
                    outline.append({"num": cur_num, "title": title,
                                    "short": SECTION_SHORT.get(title, title), "subs": []})
                elif kind == "subsection":
                    sub_n += 1
                    cur_sub, cur_num = title, f"{ROMAN[sec_n]}-{chr(64 + sub_n)}"
                    outline[-1]["subs"].append({"num": cur_num, "title": title})
                continue
            if cur_sec is None:
                continue
            body = re.sub(r"\\begin\{(table\*?|figure\*?)\}.*?\\end\{\1\}", lambda mm: " ", tok, flags=re.S)
            floats = re.findall(r"\\begin\{(table\*?|figure\*?)\}(.*?)\\end\{\1\}", tok, flags=re.S)
            for par in re.split(r"\n\s*\n", body):
                for sent in sentences_with_cites(par):
                    keys = []
                    for cm in re.finditer(r"\\cite[a-z]*\{([^}]*)\}", sent):
                        keys += [k.strip() for k in cm.group(1).split(",") if k.strip()]
                    if not keys:
                        continue
                    text = tex_to_text(sent)
                    text = re.sub(r"^(Item|\\item)\s*", "", text)
                    for k in keys:
                        if k not in order:
                            order.append(k)
                        contexts.setdefault(k, []).append(
                            {"section": cur_sec, "sub": cur_sub, "num": cur_num, "text": text})
            for _, fl in floats:
                for cm in re.finditer(r"\\cite[a-z]*\{([^}]*)\}", fl):
                    for k in [x.strip() for x in cm.group(1).split(",") if x.strip()]:
                        if k not in order:
                            order.append(k)
                        lab = re.search(r"\\label\{([^}]*)\}", fl)
                        contexts.setdefault(k, []).append(
                            {"section": cur_sec, "sub": cur_sub, "num": cur_num, "text": None,
                             "table": lab.group(1) if lab else None})
    return contexts, outline, order


# Names the survey itself uses for works, e.g. "GATr~\\cite{brehmer2023geometric}":
# the single token right before a one-key citation.
NAME_RE = re.compile(r"([A-Za-z][A-Za-z0-9\-\+/\.]*(?:\(\+\+\))?)\)?\s*~\\cite\{([^},]+)\}")
NAME_DENY = {"GNNs", "CNNs", "NNs", "PDE", "MD", "PSP", "fine-tuning", "OmniLearn", "al", "al."}
NAME_DENY_PAIRS = {("de2024euclidean", "LayerNorm"), ("pepe2024clifford", "CGENN")}
NAME_RENAME = {"SE(3)-Transf": "SE(3)-Transformer", "MVN/MVP": "MVN / MVP"}


def extract_names(survey):
    names = {}
    for name in SEC_FILES:
        path = survey / "sec" / f"{name}.tex"
        if not path.exists():
            continue
        tex = strip_comments(path.read_text(encoding="utf-8"))
        for m in NAME_RE.finditer(tex):
            label, key = m.group(1).strip().rstrip("."), m.group(2).strip()
            if label in NAME_DENY or (key, label) in NAME_DENY_PAIRS:
                continue
            if not (re.search(r"[A-Z].*[A-Z]", label) or re.search(r"[A-Z].*[\d\-]|[\d\-].*[A-Z]", label)):
                continue
            label = NAME_RENAME.get(label, label)
            names.setdefault(key, [])
            if label not in names[key]:
                names[key].append(label)
    # fold plurals ("GCANs" -> "GCAN") and table forms ("iP-/C-GATr")
    for key, extra in NAME_EXTRA.items():
        names.setdefault(key, [])
        names[key] += [e for e in extra if e not in names[key]]
    for key, labels in names.items():
        names[key] = [l for l in labels if not (l.endswith("s") and l[:-1] in labels)]
    return names


# Names the survey gives in prose or tables that the regex above misses.
NAME_EXTRA = {
    "suk2024lab": ["LaB-GATr"],                  # §V-B "Suk et al. propose LaB-GATr"
    "pepefengbo": ["Fengbo"],                    # §V-C, Table 5
    "spellings2021geometric": ["GAAN"],          # §V-B "Geometric Algebra Attention Networks (GAANs)"
    "huy2026versor": ["Versor"],                 # §IV-F
    "brandstetter2022clifford": ["Clifford layers"],  # Tables 4-7
    "alblas2025geometric": ["AAA model"],        # Table 6
    "rao2024enhanced": ["SNGNN-BTGO"],           # §V-B
    "hockey2024simplifying": ["CGA Transformer"],  # §V-B
    "grassucci2022phnns": ["PHNN"],              # §V-E "Parametrized Hypercomplex NNs"
    "thomas2018tensor": ["TFN"],                 # Table 3
    "pearson2003clifford": ["Clifford MLP"],     # Table 5
    "torch_ga": ["torch_ga"], "python_tfga": ["tfga"], "numga": ["numga"], "lgatr": ["lgatr"],
    "python_clifford": ["clifford"], "roelfs2025willingkingdoncliffordalgebra": ["Kingdon"],
    "ganja.js": ["ganja.js"], "colapinto2011versor": ["Versor (C++)"], "Klein": ["Klein"],
    "Gaalop": ["Gaalop"], "breuils_garamon_2019": ["Garamon"],
}


# --------------------------------------------------------------------------
# Algebra tags (hand-curated from the survey text and tables; see `source`)
# --------------------------------------------------------------------------

ALGEBRA_TAGS = {
    "ruhe2023clifford": (["EGA"], "Table 1 (EGA row) and Table 4 (EGA encodings)"),
    "ruhe2023geometric": (["EGA", "PGA"], "Table 1 (EGA row); §II-B PGA paragraph; §IV-F G(3,0,0) examples"),
    "brehmer2023geometric": (["PGA"], "Table 1 (PGA row); §III-C; §IV-F"),
    "zhong2025gagrasp": (["PGA"], "Table 1 (PGA row); §V-D"),
    "pepe2024cgaposenet": (["CGA"], "Table 1 (CGA row); §V-A"),
    "pepe2023cga": (["CGA"], "§V-A"),
    "de2024euclidean": (["EGA", "PGA", "CGA"], "§IV-F E-/P-/iP-/C-GATr variants"),
    "pepe2024staresnet": (["STA"], "Table 1 (STA row); §V-C"),
    "spinner2024lorentz": (["STA"], "Table 1 (STA row); §III-C; §V-C"),
    "brehmer2024lorentz": (["STA"], "§III-C; §IV-F (L-GATr in G(1,3,0))"),
    "favaro2026virtues": (["STA"], "Table 7 HEP row (L-GATr)"),
    "bresopla2026encoding": (["STA"], "§VI-B (L-GATr)"),
    "petitjean2025economical": (["STA"], "§VI-D (L-GATr jet taggers)"),
    "lgatr": (["STA"], "Table 8 (STA G(1,3,0))"),
    "brandstetter2022clifford": (["EGA"], "Table 4 (EGA row, Clifford layers)"),
    "wagner2024generating": (["PGA"], "Table 4 (PGA row); §V-B CFA uses PGA"),
    "suk2024lab": (["PGA"], "§V-B embeds meshes in PGA G(3,0,1)"),
    "suk2024geometric": (["PGA"], "§III-C PGA-style models; Table 6 biomedical row"),
    "alblas2025geometric": (["PGA"], "Table 6 biomedical-mesh row (PGA)"),
    "rygiel2026when": (["PGA"], "Table 6 biomedical-mesh row (PGA)"),
    "sun2025hybrid": (["PGA"], "§III-C PGA-style models; §V-D PGA-GATr"),
    "xu2026efficient": (["PGA"], "§V-D 2D PGA G(2,0,1)"),
    "10.1007/978-3-031-55985-3_6": (["CGA"], "§V-B backbone modelled in CGA"),
    "hockey2024simplifying": (["CGA"], "§V-B CGA Transformer"),
    "kolyvakis2025geometric": (["CGA"], "§V-A integrates CGA with language models"),
    "huy2026versor": (["CGA"], "§IV-F replaces sequence operations with CGA"),
    "sveier2017object": (["CGA"], "§IV-A null-point embedding; §V-A RANSAC detection"),
    "du2017modeling": (["CGA"], "§V-A CGA primitive detection"),
    "kanatani2015understanding": (["CGA"], "§V-A CGA primitive detection"),
    "zaplana2022closed": (["CGA"], "§V-D CGA inverse kinematics"),
    "fu2013solution": (["CGA"], "§V-D CGA inverse kinematics"),
    "zhu2025conformal": (["CGA"], "§V-D kinematics as chains of motors (CGA)"),
    "pepe2024clifford": (["EGA"], "§V-B Euclidean GA for protein structure prediction"),
    "polat2026cliffordip": (["EGA"], "§V-B G(3,0,0) interatomic potentials"),
    "polat2026geometric": (["EGA"], "§VI-D G(3,0,0) products"),
    "liu2024clifford": (["General"], "§III-E Clifford-group equivariant simplicial networks"),
    "liu2024multivector": (["General"], "§III-E O(n)-equivariant multivector functions"),
    "zhdanov2024clifford": (["General"], "§IV-F pseudo-Euclidean E(p,q) equivariance"),
    "ali2024metric": (["General"], "§III-E learned quadratic form"),
    "filimoshina2025glgenn": (["General"], "§III-E generalized Lipschitz groups incl. degenerate algebras"),
    "colapinto2011versor": (["EGA", "PGA", "CGA", "STA"], "Table 8 algebra scope"),
    "Klein": (["PGA"], "Table 8 (3D PGA only)"),
}


# --------------------------------------------------------------------------
# Tables
# --------------------------------------------------------------------------

def split_cells(row):
    cells, buf, depth = [], [], 0
    i = 0
    while i < len(row):
        ch = row[i]
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
        if ch == "&" and depth == 0 and (i == 0 or row[i - 1] != "\\"):
            cells.append("".join(buf))
            buf = []
        else:
            buf.append(ch)
        i += 1
    cells.append("".join(buf))
    return cells


def cell_obj(raw):
    keys = []
    for cm in re.finditer(r"\\cite[a-z]*\{([^}]*)\}", raw):
        keys += [k.strip() for k in cm.group(1).split(",") if k.strip()]
    # representative-works cells: keep the item/key structure
    items = []
    for part in re.split(r",\s*(?![^{]*\})", raw):
        km = re.search(r"\\cite[a-z]*\{([^}]*)\}", part)
        if km:
            items.append({"label": tex_to_text(part), "keys": [k.strip() for k in km.group(1).split(",")]})
    out = {"text": tex_to_text(raw)}
    if keys:
        out["keys"] = keys
        out["items"] = items
    return out


def parse_tables(survey):
    tables = OrderedDict()
    for name in SEC_FILES:
        path = survey / "sec" / f"{name}.tex"
        if not path.exists():
            continue
        tex = strip_comments(path.read_text(encoding="utf-8"))
        for m in re.finditer(r"\\begin\{table\*?\}(.*?)\\end\{table\*?\}", tex, flags=re.S):
            t = m.group(1)
            lab = re.search(r"\\label\{([^}]*)\}", t)
            cap_start = t.find("\\caption{")
            caption = _group(t, cap_start + len("\\caption")) [0] if cap_start >= 0 else ""
            body = re.search(r"\\toprule(.*?)\\bottomrule", t, flags=re.S).group(1)
            rows = [r.strip() for r in re.split(r"\\\\", body)]
            header, data, group = None, [], None
            notes = []
            for r in rows:
                r = r.replace("\\midrule", "").strip()
                if not r:
                    continue
                if r.startswith("\\multicolumn"):
                    _, q = _group(r, r.index("{"))
                    _, q = _group(r, r.index("{", q))
                    inner, _ = _group(r, r.index("{", q))
                    txt = tex_to_text(inner)
                    if len(txt) < 60:
                        group = txt
                    else:
                        notes.append(txt)
                    continue
                cells = [c.strip() for c in split_cells(r)]
                if header is None:
                    header = [tex_to_text(c) for c in cells]
                    continue
                row = {"cells": [cell_obj(c) for c in cells]}
                if group:
                    row["group"] = group
                data.append(row)
            tables[lab.group(1) if lab else f"table{len(tables)+1}"] = {
                "caption": tex_to_text(caption), "header": header, "rows": data, "notes": notes,
                "file": name,
            }
    return tables


# --------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--survey", required=True, type=Path, help="survey LaTeX directory")
    ap.add_argument("--out", default=ROOT / "data", type=Path)
    args = ap.parse_args()
    survey = args.survey
    bib = parse_bib((survey / "main.bib").read_text(encoding="utf-8"))
    contexts, outline, order = scan_sections(survey)
    names = extract_names(survey)

    # citation numbers as printed in the PDF (IEEEtran: order of first citation)
    numbers = {}
    bbl = survey / "main.bbl"
    if bbl.exists():
        for n, k in enumerate(re.findall(r"\\bibitem(?:\[[^\]]*\])?\{([^}]*)\}", bbl.read_text(encoding="utf-8")), 1):
            numbers[k] = n
    else:
        numbers = {k: n for n, k in enumerate(order, 1)}

    missing = [k for k in order if k not in bib]
    if missing:
        print("warning: cited but not in bib:", missing, file=sys.stderr)

    papers = []
    for key in sorted(order, key=lambda k: numbers.get(k, 10_000)):
        if key not in bib:
            continue
        e = bib[key]
        f = e["fields"]
        title = sentence_case_first(tex_to_text(f.get("title", key)))
        ctx = contexts.get(key, [])
        sections, subsections = [], []
        for c in ctx:
            short = SECTION_SHORT.get(c["section"], c["section"])
            if short not in sections:
                sections.append(short)
            lab = f"{c['num']} {c['sub']}" if c["sub"] else None
            if lab and lab not in subsections:
                subsections.append(lab)
        snippets = []
        nm = names.get(key, [])
        ctx = sorted(ctx, key=lambda c: (0 if c["text"] and any(n in c["text"] for n in nm) else 1))
        for c in ctx:
            if c["text"] and c["text"] not in [s["text"] for s in snippets]:
                snippets.append({"num": c["num"], "text": c["text"]})
        tables_in = sorted({c["table"] for c in ctx if c.get("table")})
        year = re.search(r"\d{4}", f.get("year", "") or f.get("date", ""))
        alg, alg_src = ALGEBRA_TAGS.get(key, ([], None))
        papers.append({
            "key": key,
            "n": numbers.get(key),
            "title": title,
            "names": names.get(key, []),
            "authors": split_authors(f.get("author", "")),
            "year": int(year.group(0)) if year else None,
            "venue": venue_of(f, e["type"]),
            "type": e["type"],
            "links": links_of(f, title),
            "sections": sections,
            "subsections": subsections,
            "tables": tables_in,
            "algebras": alg,
            "algebra_source": alg_src,
            "contexts": snippets[:4],
        })

    tables = parse_tables(survey)
    abstract_tex = (survey / "sec" / "0-abstract.tex").read_text(encoding="utf-8")
    abstract = tex_to_text(re.search(r"\\begin\{abstract\}(.*?)\\end\{abstract\}", abstract_tex, re.S).group(1))
    kw = re.search(r"\\begin\{IEEEkeywords\}(.*?)\\end\{IEEEkeywords\}", abstract_tex, re.S)
    keywords = [k.strip().rstrip(".") for k in tex_to_text(kw.group(1)).split(",")] if kw else []

    # figures (captions verbatim) and the evidence lists from the empirical section
    figures = []
    for name in SEC_FILES:
        path = survey / "sec" / f"{name}.tex"
        if not path.exists():
            continue
        tex = strip_comments(path.read_text(encoding="utf-8"))
        for fm in re.finditer(r"\\begin\{figure\*?\}(.*?)\\end\{figure\*?\}", tex, flags=re.S):
            body = fm.group(1)
            img = re.search(r"\\includegraphics(?:\[[^\]]*\])?\{([^}]*)\}", body)
            c0 = body.find("\\caption{")
            cap = _group(body, c0 + len("\\caption"))[0] if c0 >= 0 else ""
            lab = re.search(r"\\label\{([^}]*)\}", body)
            figures.append({"file": Path(img.group(1)).stem if img else None,
                            "label": lab.group(1) if lab else None,
                            "caption": tex_to_text(cap)})
    exp = strip_comments((survey / "sec" / "6-experiments.tex").read_text(encoding="utf-8"))
    status = []
    sm = re.search(r"Summary of evidence status.*?\\begin\{itemize\}(.*?)\\end\{itemize\}", exp, flags=re.S)
    if sm:
        for it in re.split(r"\\item", sm.group(1))[1:]:
            mm = re.match(r"\s*\\textbf\{([^}]*)\}(.*)", it, flags=re.S)
            if mm:
                status.append({"label": tex_to_text(mm.group(1)).rstrip(":"), "text": tex_to_text(mm.group(2))})
    practice = []
    pm = re.search(r"Recommended benchmarking practice.*?\\begin\{enumerate\}(.*?)\\end\{enumerate\}", exp, flags=re.S)
    if pm:
        for it in re.split(r"\\item", pm.group(1))[1:]:
            mm = re.match(r"\s*\\textbf\{([^}]*)\}(.*)", it, flags=re.S)
            if mm:
                practice.append({"label": tex_to_text(mm.group(1)).rstrip("."), "text": tex_to_text(mm.group(2))})

    meta = {
        "figures": figures,
        "evidence_status": status,
        "benchmarking_practice": practice,
        "title": "Geometric Algebra for Neural Networks: A Survey",
        "abstract": abstract,
        "keywords": keywords,
        "outline": outline,
        "counts": {
            "papers": len(papers),
            "with_algebra": sum(1 for p in papers if p["algebras"]),
            "years": [min(p["year"] for p in papers if p["year"]), max(p["year"] for p in papers if p["year"])],
        },
    }

    args.out.mkdir(parents=True, exist_ok=True)
    for fname, obj in (("papers.json", papers), ("tables.json", tables), ("meta.json", meta)):
        (args.out / fname).write_text(json.dumps(obj, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"papers: {len(papers)}  with sections: {sum(1 for p in papers if p['sections'])}  "
          f"with algebra: {meta['counts']['with_algebra']}  tables: {len(tables)}")
    unused = [k for k in ALGEBRA_TAGS if k not in {p['key'] for p in papers}]
    if unused:
        print("warning: algebra tags for uncited keys:", unused, file=sys.stderr)


if __name__ == "__main__":
    main()
