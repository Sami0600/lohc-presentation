# LOHC Presentation Generator

A comprehensive PowerPoint presentation on **Liquid Organic Hydrogen Carriers (LOHCs)** for hydrogen storage and transport, automatically generated using Node.js and pptxgen-js.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![Slides](https://img.shields.io/badge/slides-32-blue.svg)

## 📋 Overview

This project generates a professional graduate seminar presentation on Liquid Organic Hydrogen Carriers, covering:

- **Section 01 - Introduction** (8 slides): Hydrogen economy, storage challenges, and LOHC advantages
- **Section 02 - Fundamentals** (9 slides): Chemical reactions, thermodynamics, kinetics, and efficiency metrics
- **Section 03 - LOHC Materials** (6 slides): Classification of carriers (NEC, DBT, Toluene/MCH, bio-based)
- **Section 04 - Catalysts** (3 slides): Metal catalysts, supports, deactivation, and regeneration
- **Section 05 - Reactor Engineering** (6 slides): Reactor types, heat integration, scale-up, and commercial plants

**Total: 32 professionally formatted slides** with charts, tables, diagrams, and embedded icons.

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 14.0.0
- **npm** or **yarn**
- ~500 MB disk space (for dependencies)

### Installation

```bash
# Clone the repository
git clone https://github.com/Sami0600/lohc-presentation.git
cd lohc-presentation

# Install dependencies
npm install
```

### Generate Presentation

```bash
# Generate with default filename (LOHC_Presentation_2025.pptx)
npm start

# Or with custom output filename
npm start -- my_custom_presentation.pptx

# Or using node directly
node index.js output.pptx
```

The PPTX file will be generated in the current directory.

## 📁 Project Structure

```
lohc-presentation/
├── package.json              # Project metadata & dependencies
├── index.js                  # CLI entry point & orchestrator
├── lohc_presentation.js      # Part 1: Slides 1-20 (Intro & Fundamentals)
├── lohc_part2.js             # Part 2: Slides 21-32 (Materials, Catalysts, Reactors)
├── README.md                 # This file
├── .gitignore                # Git ignore patterns
└── [Generated Output]
    └── LOHC_Presentation_2025.pptx  # PowerPoint presentation
```

## 🛠️ Technical Stack

| Technology | Purpose |
|-----------|---------|
| **pptxgenjs** | PowerPoint (PPTX) file generation |
| **React** | Component-based icon rendering |
| **react-icons** | Font Awesome & Material Design icons |
| **sharp** | SVG-to-PNG conversion for embedded icons |
| **Node.js** | Runtime and build automation |

## 📊 Presentation Features

### Design Elements
- **Color Palette**: Navy, teal, cyan, gold, white (professional & accessible)
- **Typography**: Trebuchet MS (titles), Calibri (body text)
- **Visual Components**:
  - 8 Data visualizations (bar, line, scatter, doughnut charts)
  - 5 Data-rich tables with alternating row colors
  - 12 Molecular structure diagrams
  - 20+ Embedded React icons (converted to PNG)
  - Shadows, rounded corners, and modern styling
  - Consistent layout across all 32 slides

### Content Highlights

**Section 01 - Introduction**
- Global H₂ demand projections (IEA data)
- Storage technology comparison table
- LOHC advantages (infographics)
- Closed-loop system diagram
- Real-world project landscape

**Section 02 - Fundamentals**
- Hydrogenation & dehydrogenation reactions
- van't Hoff thermodynamic plots
- Rate-limiting steps hierarchy
- H₂ capacity metrics & comparison
- Energy balance & round-trip efficiency

**Section 03 - LOHC Materials**
- NEC (N-Ethylcarbazole) - lowest dehydrogenation T
- DBT (Dibenzyltoluene) - safest LOHC
- Toluene/MCH - most commercially mature
- Naphthalene/Decalin - highest energy density
- Bio-based carriers (research status)

**Section 04 - Catalysts**
- Hydrogenation catalysts (Ru/Al₂O₃, Pt/Al₂O₃, Ni/SiO₂)
- Dehydrogenation catalysts (Pt, Pt-Sn, Pt-Re)
- Support materials (Al₂O₃, SiO₂, TiO₂, ZrO₂)
- Deactivation mechanisms (coking, sintering, poisoning)
- Regeneration strategies

**Section 05 - Reactor Engineering**
- Fixed-bed, slurry, and membrane reactors
- Heat integration strategies
- Technology Readiness Levels (TRL 1-9)
- Scale-up roadmap (2025-2035)
- Commercial plant examples

## 📖 Usage Examples

### Basic Build
```bash
npm start
```
Generates `LOHC_Presentation_2025.pptx` in the current directory.

### Custom Output Location
```bash
node index.js ~/Desktop/seminar.pptx
```

### Batch Generation
```bash
for i in {1..3}; do
  node index.js "LOHC_v${i}.pptx"
done
```

## 🔧 Customization

### Modify Colors
Edit the color constants in `lohc_presentation.js`:

```javascript
const C = {
  navy:    "0D1B2A",   // Dark navy blue
  teal:    "0077B6",   // Primary teal
  cyan:    "00B4D8",   // Light cyan
  gold:    "F4A261",   // Accent gold
  white:   "FFFFFF",   // White
  dark:    "1A1A2E",   // Dark text
  muted:   "64748B",   // Muted gray
  altRow:  "EAF6FB",   // Table alternating row
  lightBg: "F0F7FF",   // Light background
};
```

### Add New Slides
Extend `lohc_part2.js` with new slide definitions:

```javascript
{
  const sl = pres.addSlide();
  slideTitle(sl, "Your New Slide Title");
  
  // Add text, charts, shapes, images, etc.
  sl.addText("Content here...", {
    x: 0.35, y: 0.9, w: 9.3, h: 4.0,
    fontFace: "Calibri", fontSize: 13, color: C.dark,
  });
}
```

### Modify Data
Update charts, tables, and metrics directly in slide definitions. For example:

```javascript
sl.addChart(pres.charts.BAR, [{
  name: "H₂ Demand (Mt/year)",
  labels: ["2020", "2030", "2040", "2050"],
  values: [90, 150, 300, 530],  // <- Update these values
}], { /* chart options */ });
```

## 📈 Performance

| Operation | Time | Memory |
|-----------|------|--------|
| First build | ~8–15 sec | ~300 MB |
| Subsequent builds | ~5–10 sec | ~250 MB |
| Output file size | ~2–3 MB | N/A |

*Times vary based on system resources and icon rendering complexity.*

## 🚨 Troubleshooting

### Error: `Cannot find module 'pptxgenjs'`
```bash
npm install
```

### Error: `sharp` installation fails
Sharp requires build tools. Install them:

**macOS:**
```bash
xcode-select --install
```

**Windows:**
Install [Build Tools for Visual Studio](https://visualstudio.microsoft.com/downloads/)

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install build-essential python3
```

Then retry:
```bash
npm install
```

### Presentation won't open
- Ensure you have PowerPoint 2016+ or LibreOffice Impress
- Try uploading the PPTX to Google Drive and opening with Google Slides
- Check that the file is not corrupted by verifying file size (should be 2–3 MB)

### Icons not appearing
- Rebuild the presentation: `npm start`
- Ensure `sharp` is properly installed: `npm list sharp`
- Check that React and react-icons are installed: `npm list react react-icons`

## 📝 Contributing

To extend or improve the presentation:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/add-content`)
3. Add or modify slides in `lohc_presentation.js` or `lohc_part2.js`
4. Test the build: `npm start`
5. Commit your changes: `git commit -m "Add new content"`
6. Push to your fork: `git push origin feature/add-content`
7. Open a pull request

## 📄 License

MIT License — See LICENSE file for details

## 🔗 Academic References

The presentation incorporates peer-reviewed data and citations from:

- Teichmann et al., *Energy Environ. Sci.*, 2011
- Preuster et al., *Acc. Chem. Res.*, 2017
- Aakko-Saksa et al., *J. Power Sources*, 2018
- Gianotti et al., *ACS Catalysis*, 2018
- Niermann et al., *Renew. Sustain. Energy Rev.*, 2021
- Schneider et al., *J. Power Sources*, 2020
- IEA Net Zero by 2050 Roadmap, 2021
- IEA Hydrogen Roadmap, 2023

## 📞 Support & Feedback

For issues, questions, or feature requests:

1. **Check the troubleshooting section** above
2. **Open an issue on GitHub** with detailed error messages
3. **Review inline code comments** for customization help
4. **Consult the pptxgen-js documentation**: https://gitbrent.github.io/PptxGenJS/

## 🎓 About

**Graduate Seminar**  
University of Naples Federico II  
Department of Chemical, Materials and Production Engineering  
2025

This presentation was created as an educational resource on Liquid Organic Hydrogen Carriers for advanced graduate students and researchers in chemical engineering, energy storage, and hydrogen technologies.

---

**Generated with ❤️ using pptxgen-js**

*Last updated: May 2026*
