# Awesome Geometric Algebra Neural Networks

[![Project page](https://img.shields.io/badge/project%20page-live-E77500)]({{SITE}})
[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Works](https://img.shields.io/badge/works-{{N_PAPERS}}-2A9D8F)](#contents)

A curated list of geometric algebra (Clifford algebra) neural networks, companion to the survey

> **Geometric Algebra for Neural Networks: A Survey**<br>
> Tao Zhong, Kaison Fong, Keqin Wang, Christine Allen-Blanchette<br>
> Princeton University, Stanford University<br>
> arXiv: coming soon

**Interactive version: [{{SITE}}]({{SITE}})**. Filter the literature by survey section, algebra (EGA, PGA, CGA, STA) and year; read the sentence the survey uses to place each work; pick an algebra for your task; browse architecture families, the empirical evidence map and software libraries.

Each work is listed once, under the survey subsection that discusses it most; the project page shows every place a work is cited. Algebra tags (`EGA`, `PGA`, `CGA`, `STA`, `Clifford`) appear only where the survey text or tables state the algebra.

{{LIST}}

## Contributing

Pull requests are welcome, especially for new GA-native networks (models whose learnable forward map acts directly on multivectors).

1. Add an entry to [`data/community.json`](data/community.json):

   ```json
   {
     "title": "Paper title",
     "authors": ["First Author", "Second Author"],
     "year": 2026,
     "venue": "Conference or journal",
     "links": [{"kind": "arXiv", "url": "https://arxiv.org/abs/XXXX.XXXXX"},
               {"kind": "Code", "url": "https://github.com/..."}],
     "algebras": ["PGA"],
     "names": ["ModelName"],
     "note": "One sentence on what is geometric-algebraic about it."
   }
   ```

   `algebras` takes any of `EGA`, `PGA`, `CGA`, `STA`, `General`.
2. Run `python3 scripts/build_readme.py` to refresh this README.
3. Open a pull request. Community entries show up on the project page with a "new" mark until they are folded into the next survey revision.

To correct a survey entry, please open an issue rather than editing `data/papers.json`, which is regenerated from the survey sources.

## Rebuilding the data

The site is static (HTML, CSS and vanilla JavaScript; no build step). Survey data is generated from the paper's LaTeX sources with the Python standard library:

```bash
python3 scripts/build_data.py --survey /path/to/survey-latex   # writes data/papers.json, tables.json, meta.json
python3 scripts/build_readme.py                                 # rewrites README.md
python3 -m http.server                                          # preview at http://localhost:8000
```

`build_data.py` parses `main.bib`, scans `sec/*.tex` for every `\cite` (recording the section, subsection and sentence), extracts the survey tables and figure captions, and reads `main.bbl` so reference numbers match the PDF. Algebra tags and a few model names are curated in the script with a pointer to the supporting section or table.

Deployment: `.github/workflows/pages.yml` publishes the repository root to GitHub Pages on every push to `main` (enable *Settings → Pages → Source: GitHub Actions*).

## Citation

```bibtex
@article{zhong2026geometric,
  title   = {Geometric Algebra for Neural Networks: A Survey},
  author  = {Zhong, Tao and Fong, Kaison and Wang, Keqin and Allen-Blanchette, Christine},
  journal = {arXiv preprint arXiv:TBD},
  year    = {2026}
}
```

## License

Code (site and scripts): MIT, see [LICENSE](LICENSE). The survey text excerpts, tables and figures are © the authors and are reproduced here for reference.

Maintained by the [CAB Lab](https://cablab.scholar.princeton.edu/) at Princeton University.
