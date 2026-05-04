# LOHC – Liquid Organic Hydrogen Carriers

A single-file [Reveal.js](https://revealjs.com/) presentation covering the
fundamentals, key materials, applications, and outlook of Liquid Organic
Hydrogen Carrier (LOHC) technology for hydrogen storage and transport.

## Slides

| # | Topic |
|---|-------|
| 1 | Title |
| 2 | Agenda |
| 3 | The hydrogen storage challenge |
| 4 | What are LOHCs? |
| 5 | Hydrogenation & dehydrogenation |
| 6 | Key LOHC materials (DBT, MCH, NEC …) |
| 7 | LOHC vs. competing technologies |
| 8 | Applications & real-world projects |
| 9 | LOHC by the numbers |
| 10 | Challenges & open research questions |
| 11 | Outlook & future directions |
| 12 | Summary |
| 13 | Thank you / references |

## Usage

No build step is required. Open `index.html` directly in a browser:

```bash
git clone https://github.com/Sami0600/lohc-presentation.git
cd lohc-presentation
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or serve it locally (recommended for relative asset loading):

```bash
npx serve .
# then open http://localhost:3000
```

### Keyboard shortcuts

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `F` | Full screen |
| `S` | Speaker notes |
| `Esc` | Slide overview |

## Tech stack

- **[Reveal.js 5.1](https://revealjs.com/)** — bundled in `dist/`, no internet or `npm install` needed
- Pure HTML + CSS (no framework)

## References

- IEA, *The Future of Hydrogen* (2019)
- Hydrogenious LOHC Technologies GmbH — <https://hydrogenious.net>
- Chiyoda Corporation SPERA Hydrogen — <https://www.chiyoda-corp.com>
- Teichmann *et al.*, *Energy & Environmental Science* (2011), DOI 10.1039/c1ee01454d
