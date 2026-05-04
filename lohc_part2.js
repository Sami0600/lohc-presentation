const { FaFlask, FaSnowflake, FaAtom, FaWeight, FaIndustry, FaLeaf,
        FaShip, FaCheckCircle, FaBolt, FaRecycle, FaThermometerHalf,
        FaDatabase, FaCog, FaGlobeEurope, FaFireAlt, FaProjectDiagram,
        FaWater, FaCubes, FaChartLine } = require("react-icons/fa");
const { MdScience, MdOutlineScience } = require("react-icons/md");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// ── Colors (same as part 1) ───────────────────────────────────────
const C = {
  navy:    "0D1B2A",
  teal:    "0077B6",
  cyan:    "00B4D8",
  gold:    "F4A261",
  white:   "FFFFFF",
  dark:    "1A1A2E",
  muted:   "64748B",
  altRow:  "EAF6FB",
  lightBg: "F0F7FF",
};

// ── Helper functions (same as part 1) ──────────────────────────────
const makeShadow = () => ({ type: "outer", blur: 6, offset: 3, angle: 135, color: "000000", opacity: 0.12 });

async function iconPng(IconComponent, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

function slideTitle(slide, text) {
  slide.addShape("rect", { x: 0.35, y: 0.22, w: 0.07, h: 0.52, fill: { color: C.teal }, line: { color: C.teal } });
  slide.addText(text, {
    x: 0.5, y: 0.18, w: 9.3, h: 0.6,
    fontFace: "Trebuchet MS", fontSize: 26, bold: true, color: C.teal,
    valign: "middle", margin: 0,
  });
}

function citation(slide, text) {
  slide.addText(text, {
    x: 0.35, y: 5.3, w: 9.3, h: 0.28,
    fontFace: "Calibri", fontSize: 9, italic: true, color: C.muted,
    valign: "bottom",
  });
}

function tealBox(slide, x, y, w, h, text, fontSize = 13) {
  slide.addShape("rect", { x, y, w, h, fill: { color: C.teal }, line: { color: C.teal }, shadow: makeShadow() });
  slide.addText(text, { x, y, w, h, fontFace: "Calibri", fontSize, bold: true, color: C.white, align: "center", valign: "middle" });
}

function goldCallout(slide, x, y, w, h, text, fontSize = 13) {
  slide.addShape("rect", { x, y, w, h, fill: { color: C.gold }, line: { color: C.gold }, shadow: makeShadow() });
  slide.addText(text, { x, y, w, h, fontFace: "Calibri", fontSize, bold: true, color: C.navy, align: "center", valign: "middle" });
}

function card(slide, x, y, w, h) {
  slide.addShape("rect", { x, y, w, h, fill: { color: C.white }, line: { color: "D1D5DB", pt: 1 }, shadow: makeShadow() });
}

function hexAt(sl, cx, cy, r, color, label, labelColor) {
  const angles = [90, 150, 210, 270, 330, 30];
  const pts = angles.map(a => ({ x: cx + r * Math.cos((a * Math.PI) / 180), y: cy + r * Math.sin((a * Math.PI) / 180) }));
  for (let i = 0; i < 6; i++) {
    const j = (i + 1) % 6;
    sl.addShape("line", { x: pts[i].x, y: pts[i].y, w: pts[j].x - pts[i].x, h: pts[j].y - pts[i].y, line: { color, width: 2 } });
  }
  if (label) sl.addText(label, { x: cx - r, y: cy - 0.18, w: r * 2, h: 0.36, fontFace: "Calibri", fontSize: 10, bold: true, color: labelColor || color, align: "center" });
}

async function molSlide(pres, title, leanName, richName, formula_lean, formula_rich,
  wt, volDens, thydrog, tdehydrog, dH, mp_lean, mp_rich, trl,
  pros, cons, goldNote, citation_text, drawFn) {
  const sl = pres.addSlide();
  slideTitle(sl, title);

  // Molecular structure panel (left top)
  sl.addShape("roundRect", { x: 0.3, y: 0.87, w: 3.5, h: 2.0, rectRadius: 0.1,
    fill: { color: C.lightBg }, line: { color: C.teal, pt: 1.5 } });
  sl.addText("Molecular Structure (Schematic)", { x: 0.45, y: 0.93, w: 3.2, h: 0.3, fontFace: "Calibri", fontSize: 10, italic: true, color: C.muted });
  if (drawFn) drawFn(sl);
  sl.addText(`${leanName}  ⇌  ${richName}`, { x: 0.35, y: 2.75, w: 3.5, h: 0.3, fontFace: "Calibri", fontSize: 10, color: C.teal, align: "center", italic: true });

  // Data card
  const dataItems = [
    ["H₂ Capacity", `${wt} wt%`],
    ["Vol. Density", `${volDens} kg H₂/L`],
    ["T (hydrogenation)", `${thydrog}`],
    ["T (dehydrogenation)", `${tdehydrog}`],
    ["ΔH (dehydrog.)", `${dH} kJ/mol H₂`],
    ["Melting Point", `Lean: ${mp_lean} | Rich: ${mp_rich}`],
    ["TRL", trl],
  ];
  sl.addShape("rect", { x: 3.95, y: 0.87, w: 5.8, h: 0.38, fill: { color: C.teal }, line: { color: C.teal } });
  sl.addText("Key Data", { x: 3.95, y: 0.87, w: 5.8, h: 0.38, fontFace: "Calibri", fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle" });
  dataItems.forEach(([k, v], i) => {
    const bg = i % 2 === 0 ? C.white : C.altRow;
    sl.addShape("rect", { x: 3.95, y: 1.27 + i * 0.3, w: 5.8, h: 0.3, fill: { color: bg }, line: { color: "D1E8F5", pt: 0.5 } });
    sl.addText(k, { x: 4.05, y: 1.27 + i * 0.3, w: 2.5, h: 0.3, fontFace: "Calibri", fontSize: 11, bold: true, color: C.teal, valign: "middle" });
    sl.addText(v, { x: 6.6, y: 1.27 + i * 0.3, w: 3.1, h: 0.3, fontFace: "Calibri", fontSize: 11, color: C.dark, valign: "middle" });
  });

  // Pros/cons
  sl.addShape("rect", { x: 0.3, y: 3.15, w: 4.65, h: 0.35, fill: { color: "2ECC71" }, line: { color: "2ECC71" } });
  sl.addText("✓  Advantages", { x: 0.3, y: 3.15, w: 4.65, h: 0.35, fontFace: "Calibri", fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle" });
  sl.addText(pros.map((p, i) => ({ text: p, options: { bullet: true, breakLine: i < pros.length - 1 } })), {
    x: 0.35, y: 3.52, w: 4.55, h: 1.45, fontFace: "Calibri", fontSize: 12, color: C.dark, valign: "top",
  });

  sl.addShape("rect", { x: 5.1, y: 3.15, w: 4.65, h: 0.35, fill: { color: "E74C3C" }, line: { color: "E74C3C" } });
  sl.addText("✗  Challenges", { x: 5.1, y: 3.15, w: 4.65, h: 0.35, fontFace: "Calibri", fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle" });
  sl.addText(cons.map((c, i) => ({ text: c, options: { bullet: true, breakLine: i < cons.length - 1 } })), {
    x: 5.15, y: 3.52, w: 4.55, h: 1.45, fontFace: "Calibri", fontSize: 12, color: C.dark, valign: "top",
  });

  if (goldNote) goldCallout(sl, 0.3, 4.98, 9.45, 0.45, goldNote, 12);
  citation(sl, citation_text);
}

// ════════════════════════════════════════════════════════════════
//  PART 2: SLIDES 21–28+
// ════════════════════════════════════════════════════════════════

async function buildPart2(pres, hexAt) {
  // ════════════════════════════════════════════════════════════════
  //  SLIDE 21 — Toluene/MCH
  // ════════════════════════════════════════════════════════════════
  await molSlide(pres,
    "Toluene (Toluene) / Methylcyclohexane (MCH)",
    "Toluene", "MCH",
    "C₆H₅CH₃", "C₇H₁₄",
    "6.2", "0.047", "150–180 °C (50 bar)", "280–350 °C", "+68.3",
    "−95 °C", "−73 °C", "TRL 8",
    ["Commercially proven by Chiyoda SPERA Hydrogen®", "Abundant raw materials (petroleum stream)", "Well-established refinery integration", "50+ years of industrial experience", "Large-scale deployment in Japan & Brunei"],
    ["Lower volumetric density vs. DBT", "Volatile toluene vapor pressure (hazard)", "Requires >280°C for complete dehydrogenation", "Pt catalyst more susceptible to sintering", "Complex separation during dehydrogenation"],
    "★  Most mature LOHC system — Commercial scale operation since 2018 at Chiyoda (Brunei) — 50 Nm³/h H₂ capacity",
    "Source: Chiyoda SPERA Hydrogen® | Okada et al., Int. J. Hydrogen Energy, 2006",
    (sl) => {
      // Toluene: benzene ring + CH3
      hexAt(sl, 1.35, 1.6, 0.35, C.teal, "Toluene", "");
      sl.addText("CH₃", { x: 1.25, y: 0.95, w: 0.4, h: 0.25, fontFace: "Calibri", fontSize: 10, bold: true, color: C.gold, align: "center" });
      // MCH: more complex, show simplified 3D-style hexagon
      sl.addText("MCH", { x: 2.3, y: 1.45, w: 0.5, h: 0.3, fontFace: "Calibri", fontSize: 11, bold: true, color: C.teal, align: "center" });
      sl.addShape("ellipse", { x: 2.1, y: 1.6, w: 0.9, h: 0.8, fill: { color: "F0F7FF" }, line: { color: C.teal, pt: 1.5 } });
    }
  );

  // ════════════════════════════════════════════════════════════════
  //  SLIDE 22 — Naphthalene/Decalin
  // ════════════════════════════════════════════════════════════════
  await molSlide(pres,
    "Naphthalene (NAP) / Decahydronaphthalene (Decalin)",
    "Naphthalene", "Decalin",
    "C₁₀H₈", "C₁₀H₁₈",
    "7.3", "0.065", "150–180 °C (30 bar)", "250–300 °C", "+66.4",
    "80 °C", "−42 °C", "TRL 6–7",
    ["Highest gravimetric H₂ capacity (7.3 wt%)", "Highest volumetric density (0.065 kg H₂/L)", "Moderate dehydrogenation temperature", "Good thermal stability", "Available from petroleum refineries"],
    ["Naphthalene solid at RT (melting point 80°C)", "Requires heating for storage/transport", "More toxic than toluene/DBT", "Vapour pressure concerns", "Less commercial maturity than MCH"],
    "★  Highest energy density carrier — Best for gravimetric-limited applications (aviation, maritime) — Requires heating loop for handling",
    "Source: Niermann et al., Renew. Sustain. Energy Rev., 2021 | Aakko-Saksa et al., J. Power Sources, 2018",
    (sl) => {
      // Two fused hexagons
      hexAt(sl, 1.0, 1.6, 0.32, C.navy, "", "");
      hexAt(sl, 1.55, 1.6, 0.32, C.navy, "", "");
      sl.addText("NAP ⇌ Decalin", { x: 0.35, y: 2.2, w: 2.8, h: 0.25, fontFace: "Calibri", fontSize: 9, italic: true, color: C.muted, align: "center" });
    }
  );

  // ════════════════════════════════════════════════════════════════
  //  SLIDE 23 — Bio-based LOHCs
  // ════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    slideTitle(sl, "Bio-based and Novel LOHC Carriers");

    // Left: overview
    sl.addShape("roundRect", { x: 0.3, y: 0.87, w: 4.7, h: 4.5, rectRadius: 0.1,
      fill: { color: C.lightBg }, line: { color: C.teal, pt: 1.5 } });
    sl.addText("Emerging Bio-based Carriers", { x: 0.45, y: 0.93, w: 4.4, h: 0.35, fontFace: "Trebuchet MS", fontSize: 13, bold: true, color: C.teal });
    sl.addShape("line", { x: 0.45, y: 1.3, w: 4.4, h: 0, line: { color: "D1E8F5", width: 1 } });

    const bioBased = [
      { name: "Formic Acid (HCOOH)", note: "Direct H₂ carrier via decomposition", cap: "n/a", trl: "3–4" },
      { name: "Methanol (CH₃OH)", note: "Liquid at RT, water-soluble, green source", cap: "12.5%", trl: "4–5" },
      { name: "Dimethyl Ether (DME)", note: "Gas at RT, needs pressurization", cap: "14.3%", trl: "2–3" },
      { name: "Lignocellulose Derivatives", note: "Biofuels from wood/waste biomass", cap: "~5–7%", trl: "1–2" },
      { name: "Glycerol + Derivatives", note: "Bio-glycerin from biodiesel production", cap: "~6%", trl: "2–3" },
    ];

    bioBased.forEach(({ name, note, cap, trl }, i) => {
      const y = 1.35 + i * 0.6;
      sl.addText(name, { x: 0.45, y, w: 4.4, h: 0.25, fontFace: "Calibri", fontSize: 11, bold: true, color: C.teal });
      sl.addText(note, { x: 0.45, y: y + 0.25, w: 4.4, h: 0.32, fontFace: "Calibri", fontSize: 10, color: C.dark, italic: true });
    });

    // Right: advantages & research
    const icons = [
      { name: "Sustainable", icon: FaLeaf, desc: "Renewable bio-based feedstock" },
      { name: "Lower Cost", icon: FaBolt, desc: "Abundant agricultural/waste sources" },
      { name: "Green H₂ Loop", icon: FaRecycle, desc: "Complete carbon-neutral cycle possible" },
      { name: "Higher Capacity", icon: FaCubes, desc: "Some exceed fossil-derived carriers" },
    ];

    const positions = [[5.2, 0.87], [7.6, 0.87], [5.2, 2.8], [7.6, 2.8]];
    for (let i = 0; i < 4; i++) {
      const [x, y] = positions[i];
      const { name, icon: Icon, desc } = icons[i];
      const iconData = await iconPng(Icon, "#FFFFFF", 256);
      sl.addShape("roundRect", { x, y, w: 2.15, h: 1.8, rectRadius: 0.1,
        fill: { color: i < 2 ? C.teal : C.cyan }, line: { color: i < 2 ? C.teal : C.cyan }, shadow: makeShadow() });
      sl.addImage({ data: iconData, x: x + 0.75, y: y + 0.25, w: 0.65, h: 0.65 });
      sl.addText(name, { x, y: y + 0.95, w: 2.15, h: 0.35, fontFace: "Calibri", fontSize: 12, bold: true, color: C.white, align: "center" });
      sl.addText(desc, { x, y: y + 1.3, w: 2.15, h: 0.45, fontFace: "Calibri", fontSize: 10, color: C.white, align: "center" });
    }

    goldCallout(sl, 0.3, 4.9, 9.45, 0.55, "Research Status: Early-stage (TRL 1–5) — 5–10 year horizon for viability | Key Challenge: Scale-up economics vs. fossil-derived LOHCs", 11);
    citation(sl, "Source: Rao & Yoon, Energies, 2020 | Gianotti et al., ACS Catalysis, 2018");
  }

  // ════════════════════════════════════════════════════════════════
  //  SLIDE 24 — Section 4 Divider
  // ════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    sl.background = { color: C.navy };
    sl.addText("04", { x: 0.5, y: 0.8, w: 9, h: 1.2, fontFace: "Trebuchet MS", fontSize: 72, bold: true, color: "1A3550", align: "center" });
    sl.addText("Catalysts for LOHC Systems", { x: 0.5, y: 1.9, w: 9, h: 0.8, fontFace: "Trebuchet MS", fontSize: 32, bold: true, color: C.white, align: "center" });
    sl.addText("Noble Metals  ·  Supports  ·  Deactivation  ·  Regeneration", {
      x: 0.5, y: 2.75, w: 9, h: 0.5, fontFace: "Calibri", fontSize: 16, color: C.cyan, align: "center", italic: true,
    });
    sl.addShape("line", { x: 2.5, y: 3.35, w: 5, h: 0, line: { color: C.teal, width: 2 } });
  }

  // ════════════════════════════════════════════════════════════════
  //  SLIDE 25 — Catalyst Overview
  // ════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    slideTitle(sl, "Catalyst Selection for LOHC Reactions");

    // Left: reaction-specific catalysts
    sl.addShape("rect", { x: 0.3, y: 0.87, w: 4.7, h: 0.38, fill: { color: C.teal }, line: { color: C.teal } });
    sl.addText("Hydrogenation Catalysts", { x: 0.3, y: 0.87, w: 4.7, h: 0.38, fontFace: "Calibri", fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle" });

    const hydro = [
      ["Ru/Al₂O₃", "Ruthenium on alumina", "Excellent activity, lower cost", "300–400 €/kg"],
      ["Pt/Al₂O₃", "Platinum on alumina", "High activity, expensive", "2,000–3,000 €/kg"],
      ["Ni/SiO₂", "Nickel on silica", "Cost-effective, moderate activity", "50–100 €/kg"],
    ];

    hydro.forEach(([name, desc, adv, cost], i) => {
      const bg = i % 2 === 0 ? C.white : C.altRow;
      sl.addShape("rect", { x: 0.3, y: 1.27 + i * 0.65, w: 4.7, h: 0.63, fill: { color: bg }, line: { color: "D1E8F5", pt: 0.5 } });
      sl.addText(name, { x: 0.4, y: 1.28, w: 1.2, h: 0.3, fontFace: "Calibri", fontSize: 11, bold: true, color: C.teal });
      sl.addText(desc, { x: 0.4, y: 1.56, w: 1.2, h: 0.28, fontFace: "Calibri", fontSize: 9, color: C.muted, italic: true });
      sl.addText(adv, { x: 1.65, y: 1.28 + i * 0.65, w: 2.0, h: 0.63, fontFace: "Calibri", fontSize: 10, color: C.dark, valign: "middle" });
      sl.addText(cost, { x: 3.7, y: 1.28 + i * 0.65, w: 1.3, h: 0.63, fontFace: "Calibri", fontSize: 10, bold: true, color: C.gold, align: "right", valign: "middle" });
    });

    sl.addShape("rect", { x: 0.3, y: 3.3, w: 4.7, h: 0.38, fill: { color: C.navy }, line: { color: C.navy } });
    sl.addText("Dehydrogenation Catalysts", { x: 0.3, y: 3.3, w: 4.7, h: 0.38, fontFace: "Calibri", fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle" });

    const dehyd = [
      ["Pt/Al₂O₃", "Platinum on alumina", "Standard choice", "3,000–4,000 €/kg"],
      ["Pt-Sn/Al₂O₃", "Pt with Sn promoter", "Better selectivity", "3,500–4,500 €/kg"],
      ["Pt-Re/Al₂O₃", "Pt with Re additive", "Coke resistance", "4,000–5,000 €/kg"],
    ];

    dehyd.forEach(([name, desc, adv, cost], i) => {
      const bg = i % 2 === 0 ? C.white : C.altRow;
      sl.addShape("rect", { x: 0.3, y: 3.68 + i * 0.65, w: 4.7, h: 0.63, fill: { color: bg }, line: { color: "D1E8F5", pt: 0.5 } });
      sl.addText(name, { x: 0.4, y: 3.69, w: 1.2, h: 0.3, fontFace: "Calibri", fontSize: 11, bold: true, color: C.teal });
      sl.addText(desc, { x: 0.4, y: 3.97, w: 1.2, h: 0.28, fontFace: "Calibri", fontSize: 9, color: C.muted, italic: true });
      sl.addText(adv, { x: 1.65, y: 3.68 + i * 0.65, w: 2.0, h: 0.63, fontFace: "Calibri", fontSize: 10, color: C.dark, valign: "middle" });
      sl.addText(cost, { x: 3.7, y: 3.68 + i * 0.65, w: 1.3, h: 0.63, fontFace: "Calibri", fontSize: 10, bold: true, color: C.gold, align: "right", valign: "middle" });
    });

    // Right: support materials
    sl.addText("Support Materials & Properties", {
      x: 5.2, y: 0.87, w: 4.5, h: 0.35, fontFace: "Trebuchet MS", fontSize: 13, bold: true, color: C.teal,
    });
    const supports = [
      { mat: "Al₂O₃", sa: "250–300", pv: "0.5–1.2", temp: "600–800", use: "Standard choice" },
      { mat: "SiO₂", sa: "100–200", pv: "0.8–1.5", temp: "800–900", use: "Better hydrothermal stability" },
      { mat: "TiO₂", sa: "50–150", pv: "0.3–0.8", temp: "400–500", use: "Enhanced selectivity" },
      { mat: "ZrO₂", sa: "50–100", pv: "0.2–0.6", temp: "500–600", use: "Acidity control" },
    ];

    sl.addShape("rect", { x: 5.2, y: 1.28, w: 4.5, h: 0.3, fill: { color: C.teal }, line: { color: C.teal } });
    sl.addText("Material | BET SA (m²/g) | PV (cm³/g) | T_max (°C) | Notes", {
      x: 5.2, y: 1.28, w: 4.5, h: 0.3, fontFace: "Calibri", fontSize: 10, bold: true, color: C.white, align: "center", valign: "middle",
    });

    supports.forEach(({ mat, sa, pv, temp, use }, i) => {
      const bg = i % 2 === 0 ? C.white : C.altRow;
      sl.addShape("rect", { x: 5.2, y: 1.6 + i * 0.5, w: 4.5, h: 0.5, fill: { color: bg }, line: { color: "D1E8F5", pt: 0.5 } });
      const cols = [
        { x: 5.3, w: 0.6, t: mat, bold: true },
        { x: 5.95, w: 0.9, t: sa },
        { x: 6.95, w: 0.9, t: pv },
        { x: 7.95, w: 1.0, t: temp },
        { x: 9.05, w: 0.6, t: use, size: 9 },
      ];
      cols.forEach(({ x, w, t, bold, size }) => {
        sl.addText(t, { x, y: 1.6 + i * 0.5, w, h: 0.5, fontFace: "Calibri", fontSize: size || 10, bold: bold || false, color: C.dark, align: "center", valign: "middle" });
      });
    });

    citation(sl, "Source: Gianotti et al., ACS Catalysis, 2018 | Schneider et al., J. Power Sources, 2020");
  }

  // ════════════════════════════════════════════════════════════════
  //  SLIDE 26 — Deactivation & Regeneration
  // ════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    slideTitle(sl, "Catalyst Deactivation Mechanisms & Regeneration");

    // Deactivation modes
    const deact = [
      { mode: "Coking", cause: "Carbon deposit accumulation on active sites", impact: "Loss of activity (10–30% per 1000 h)", solution: "H₂/steam treatment; air burnoff" },
      { mode: "Sintering", cause: "Metal particle agglomeration at high T", impact: "Reduced surface area, lower TOF", solution: "Temperature control; promoters (Sn, Re)" },
      { mode: "Poisoning", cause: "N, S, or halogen impurities in feed", impact: "Permanent or semi-permanent deactivation", solution: "Feed purification; frequent regeneration" },
      { mode: "Support Degradation", cause: "Hydrothermal attack or structural collapse", impact: "Loss of porosity, metal redispersion", solution: "Select thermally stable support; optimize pore structure" },
    ];

    deact.forEach(({ mode, cause, impact, solution }, i) => {
      const y = 0.9 + i * 1.0;
      sl.addShape("roundRect", { x: 0.3, y, w: 9.4, h: 0.95, rectRadius: 0.08,
        fill: { color: C.lightBg }, line: { color: "D1E8F5", pt: 1 } });
      sl.addText(mode, { x: 0.45, y: y + 0.05, w: 2.0, h: 0.28, fontFace: "Trebuchet MS", fontSize: 12, bold: true, color: C.teal });
      sl.addShape("line", { x: 2.5, y: y + 0.12, w: 0, h: 0.5, line: { color: "D1E8F5", width: 1 } });
      sl.addText(cause, { x: 2.7, y: y + 0.05, w: 2.2, h: 0.28, fontFace: "Calibri", fontSize: 10, color: C.dark });
      sl.addText(impact, { x: 2.7, y: y + 0.34, w: 2.2, h: 0.28, fontFace: "Calibri", fontSize: 9, italic: true, color: C.muted });
      sl.addText("✓ " + solution, { x: 5.05, y: y + 0.15, w: 4.6, h: 0.65, fontFace: "Calibri", fontSize: 10, color: C.dark, valign: "middle" });
    });

    goldCallout(sl, 0.3, 5.0, 9.4, 0.45, "Regeneration Strategy: Thermal cycling (H₂ + air burns coke) every 500–1000 operating hours | Estimated catalyst lifetime: 3–5 years industrial", 11);
    citation(sl, "Source: Gianotti et al., ACS Catalysis, 2018 | Niermann et al., Renew. Sustain. Energy Rev., 2021");
  }

  // ════════════════════════════════════════════════════════════════
  //  SLIDE 27 — Section 5 Divider
  // ════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    sl.background = { color: C.navy };
    sl.addText("05", { x: 0.5, y: 0.8, w: 9, h: 1.2, fontFace: "Trebuchet MS", fontSize: 72, bold: true, color: "1A3550", align: "center" });
    sl.addText("Reactor & Process Engineering", { x: 0.5, y: 1.9, w: 9, h: 0.8, fontFace: "Trebuchet MS", fontSize: 32, bold: true, color: C.white, align: "center" });
    sl.addText("Design  ·  Heat Integration  ·  Scale-Up  ·  Pilot & Commercial Plants", {
      x: 0.5, y: 2.75, w: 9, h: 0.5, fontFace: "Calibri", fontSize: 16, color: C.cyan, align: "center", italic: true,
    });
    sl.addShape("line", { x: 2.5, y: 3.35, w: 5, h: 0, line: { color: C.teal, width: 2 } });
  }

  // ════════════════════════════════════════════════════════════════
  //  SLIDE 28 — Reactor Types
  // ════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    slideTitle(sl, "Reactor Types for LOHC Processing");

    const reactors = [
      {
        name: "Fixed-Bed Reactor",
        desc: "Catalyst bed, liquid flows downward",
        pros: ["Simplest design", "Industrial standard", "Low residence time variation"],
        cons: ["Difficult temperature control (exothermic)", "Bed channeling risk", "Scale-up limitations"],
        icon: FaDatabase, color: C.teal,
      },
      {
        name: "Slurry Reactor",
        desc: "Catalyst suspended in liquid phase",
        pros: ["Excellent heat control", "High mass transfer", "Homogeneous temperature"],
        cons: ["Catalyst separation required", "Higher capital cost", "Catalyst attrition"],
        icon: FaWater, color: C.cyan,
      },
      {
        name: "Membrane Reactor",
        desc: "H₂ removal through selective membrane",
        pros: ["Thermodynamic advantage (shift equilibrium)", "In-situ H₂ purification", "Lower T/P requirements possible"],
        cons: ["Membrane cost & durability", "Complex operation", "Early research stage"],
        icon: FaProjectDiagram, color: C.gold,
      },
    ];

    for (let i = 0; i < 3; i++) {
      const { name, desc, pros, cons, icon: Icon, color } = reactors[i];
      const x = 0.3 + i * 3.2;
      sl.addShape("roundRect", { x, y: 0.85, w: 3.0, h: 4.55, rectRadius: 0.12,
        fill: { color: C.white }, line: { color: color, pt: 2 }, shadow: makeShadow() });
      
      // Top colour band
      sl.addShape("roundRect", { x, y: 0.85, w: 3.0, h: 0.9, rectRadius: 0.12,
        fill: { color: color }, line: { color: color } });
      sl.addShape("rect", { x, y: 1.45, w: 3.0, h: 0.3, fill: { color: color }, line: { color: color } });
      
      // Icon
      iconPng(Icon, "#FFFFFF", 256).then(iconData => {
        sl.addImage({ data: iconData, x: x + 1.2, y: 0.95, w: 0.6, h: 0.6 });
      }).catch(() => {});
      
      sl.addText(name, { x, y: 1.62, w: 3.0, h: 0.35, fontFace: "Trebuchet MS", fontSize: 13, bold: true, color: color, align: "center" });
      sl.addText(desc, { x: x + 0.15, y: 2.0, w: 2.7, h: 0.5, fontFace: "Calibri", fontSize: 10, color: C.muted, italic: true, align: "center" });
      
      // Pros
      sl.addText("Pros:", { x: x + 0.1, y: 2.52, w: 2.8, h: 0.25, fontFace: "Calibri", fontSize: 10, bold: true, color: C.teal });
      sl.addText(pros.map((p, j) => ({ text: p, options: { bullet: true, breakLine: j < pros.length - 1 } })), {
        x: x + 0.1, y: 2.78, w: 2.8, h: 0.9, fontFace: "Calibri", fontSize: 9, color: C.dark, valign: "top",
      });
      
      // Cons
      sl.addText("Cons:", { x: x + 0.1, y: 3.72, w: 2.8, h: 0.25, fontFace: "Calibri", fontSize: 10, bold: true, color: "E74C3C" });
      sl.addText(cons.map((c, j) => ({ text: c, options: { bullet: true, breakLine: j < cons.length - 1 } })), {
        x: x + 0.1, y: 3.98, w: 2.8, h: 0.9, fontFace: "Calibri", fontSize: 9, color: C.dark, valign: "top",
      });
    }

    citation(sl, "Source: Schneider et al., J. Power Sources, 2020 | Gianotti et al., ACS Catalysis, 2018");
  }

  // ════════════════════════════════════════════════════════════════
  //  SLIDE 29 — Heat Integration
  // ════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    slideTitle(sl, "Heat Integration Strategy for LOHC Systems");

    // Main concept
    sl.addShape("roundRect", { x: 0.35, y: 0.9, w: 9.3, h: 1.0, rectRadius: 0.1,
      fill: { color: C.lightBg }, line: { color: C.teal, pt: 2 }, shadow: makeShadow() });
    sl.addText("Key Principle: Integrate hydrogenation exotherm (−10 MJ/kg H₂) to preheat dehydrogenation inlet, reducing external heat duty by 30–50%", {
      x: 0.5, y: 0.92, w: 9.0, h: 0.96, fontFace: "Calibri", fontSize: 13, bold: true, color: C.dark, valign: "middle",
    });

    // Heat flow diagram
    const stages = [
      { name: "Hydrogenation\nReactor", temp: "150–180°C", Q: "−10 MJ/kg H₂\n(Released)", x: 0.5 },
      { name: "Heat\nExchanger", temp: "140→200°C", Q: "Transfer heat\nto DHG inlet", x: 3.2 },
      { name: "Dehydrogenation\nReactor", temp: "280–350°C", Q: "−13 MJ/kg H₂\n(Required)", x: 5.9 },
      { name: "External Heat\nSource", temp: "350–400°C", Q: "Waste heat / Solar\nThermal / Industrial", x: 8.6 },
    ];

    stages.forEach(({ name, temp, Q, x }, i) => {
      const w = i === 3 ? 1.2 : 2.3;
      const color = i === 0 || i === 3 ? C.teal : C.cyan;
      sl.addShape("roundRect", { x, y: 2.1, w, h: 1.3, rectRadius: 0.1,
        fill: { color: color }, line: { color: color }, shadow: makeShadow() });
      sl.addText(name, { x, y: 2.15, w, h: 0.5, fontFace: "Calibri", fontSize: 10, bold: true, color: C.white, align: "center" });
      sl.addText(temp, { x, y: 2.68, w, h: 0.35, fontFace: "Calibri", fontSize: 9, color: C.white, align: "center", italic: true });
      sl.addText(Q, { x, y: 3.03, w, h: 0.35, fontFace: "Calibri", fontSize: 8, color: C.white, align: "center", italic: true });
      
      // Arrows between stages
      if (i < stages.length - 1) {
        sl.addShape("line", { x: x + w, y: 2.75, w: 0.5, h: 0, line: { color: "AAAAAA", width: 2 } });
      }
    });

    // Integration scenarios
    sl.addText("Integration Options:", { x: 0.35, y: 3.65, w: 9.3, h: 0.3, fontFace: "Trebuchet MS", fontSize: 13, bold: true, color: C.teal });

    const scenarios = [
      ["Level 1: Sequential", "Run hydrogenation, cool carrier, then heat for dehydrogenation", "Simplest, no heat recovery"],
      ["Level 2: Direct HX", "Couple reactors with plate-frame heat exchanger", "Small units, 15–20% efficiency gain"],
      ["Level 3: Integrated Plant", "Combined reactors with waste heat recovery from H₂ separation", "Industrial standard, 40–50% efficiency gain"],
      ["Level 4: Total Site Integration", "Connect to industrial facility (refinery, power plant, SOFC)", "Best efficiency (60–70%), requires co-location"],
    ];

    scenarios.forEach(([level, desc, result], i) => {
      const y = 4.0 + i * 0.55;
      const bg = i % 2 === 0 ? C.white : C.altRow;
      sl.addShape("rect", { x: 0.35, y, w: 9.3, h: 0.52, fill: { color: bg }, line: { color: "D1E8F5", pt: 0.5 } });
      sl.addText(level, { x: 0.45, y, w: 2.2, h: 0.52, fontFace: "Calibri", fontSize: 10, bold: true, color: C.teal, valign: "middle" });
      sl.addText(desc, { x: 2.7, y, w: 4.0, h: 0.52, fontFace: "Calibri", fontSize: 10, color: C.dark, valign: "middle" });
      sl.addText(result, { x: 6.8, y, w: 2.85, h: 0.52, fontFace: "Calibri", fontSize: 9, italic: true, color: C.muted, valign: "middle" });
    });

    citation(sl, "Source: Niermann et al., Renew. Sustain. Energy Rev., 2021 | Schneider et al., J. Power Sources, 2020");
  }

  // ════════════════════════════════════════════════════════════════
  //  SLIDE 30 — Scale-Up Ladder
  // ════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    slideTitle(sl, "Technology Readiness & Scale-Up Ladder");

    // TRL description
    sl.addShape("roundRect", { x: 0.3, y: 0.87, w: 9.4, h: 0.8, rectRadius: 0.1,
      fill: { color: C.lightBg }, line: { color: C.teal, pt: 1.5 } });
    sl.addText("TRL (Technology Readiness Level): Scale from 1 (concept) → 9 (commercial deployment) | LOHC Technologies currently TRL 5–8", {
      x: 0.4, y: 0.88, w: 9.2, h: 0.78, fontFace: "Calibri", fontSize: 11, color: C.dark, valign: "middle",
    });

    // Ladder visualization
    const trls = [
      { num: "1–3", phase: "Research Phase", desc: "Lab tests, concept validation", ex: "Academic research (2000–2010)", color: "95A5A6" },
      { num: "4–5", phase: "Development Phase", desc: "Pilot scale, concept proven", ex: "Lab-scale prototypes, small pilots", color: "F39C12" },
      { num: "6–7", phase: "Demonstration Phase", desc: "Semi-commercial, >1 MW scale", ex: "Hydrogenious LOHC Tech, Chiyoda testing", color: C.gold },
      { num: "8–9", phase: "Commercial Phase", desc: "Full deployment, >10 MW scale", ex: "Chiyoda SPERA (50+ Nm³/h), HySupply", color: "2ECC71" },
    ];

    trls.forEach(({ num, phase, desc, ex, color }, i) => {
      const y = 1.8 + i * 0.95;
      sl.addShape("roundRect", { x: 0.3, y, w: 9.4, h: 0.9, rectRadius: 0.08,
        fill: { color: color }, line: { color: color, pt: 0.5 }, shadow: makeShadow() });
      sl.addText(`TRL ${num}`, { x: 0.5, y, w: 1.0, h: 0.9, fontFace: "Trebuchet MS", fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle" });
      sl.addText(phase, { x: 1.55, y: y + 0.05, w: 2.5, h: 0.3, fontFace: "Calibri", fontSize: 11, bold: true, color: C.white });
      sl.addText(desc, { x: 1.55, y: y + 0.35, w: 2.5, h: 0.5, fontFace: "Calibri", fontSize: 10, color: "F0F0F0", italic: true });
      sl.addText("Examples:", { x: 4.15, y: y + 0.05, w: 5.6, h: 0.25, fontFace: "Calibri", fontSize: 10, bold: true, color: C.white });
      sl.addText(ex, { x: 4.15, y: y + 0.3, w: 5.6, h: 0.55, fontFace: "Calibri", fontSize: 10, color: "F0F0F0", valign: "middle" });
    });

    citation(sl, "Source: Technology Readiness Levels, European Commission | Gianotti et al., ACS Catalysis, 2018");
  }

  // ════════════════════════════════════════════════════════════════
  //  SLIDE 31 — Future Outlook & Conclusions
  // ════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    slideTitle(sl, "Future Outlook & Challenges Ahead");

    // Key milestones
    sl.addText("Roadmap to Commercial Viability (2025–2035)", {
      x: 0.35, y: 0.9, w: 9.3, h: 0.35, fontFace: "Trebuchet MS", fontSize: 14, bold: true, color: C.teal,
    });

    const milestones = [
      { year: "2025", goal: "Multiple pilot plants >10 MW", status: "In progress (Hydrogenious, HySupply)" },
      { year: "2027", goal: "First GW-scale demonstration", status: "Under planning" },
      { year: "2030", goal: "$2–3/kg H₂ delivered (levelized)", status: "Target with cost reductions" },
      { year: "2035", goal: "Commercial networks in EU, Asia, USA", status: "Vision for deployment" },
    ];

    milestones.forEach(({ year, goal, status }, i) => {
      const y = 1.35 + i * 0.82;
      sl.addShape("rect", { x: 0.35, y, w: 0.8, h: 0.75, fill: { color: C.teal }, line: { color: C.teal }, shadow: makeShadow() });
      sl.addText(year, { x: 0.35, y, w: 0.8, h: 0.75, fontFace: "Trebuchet MS", fontSize: 14, bold: true, color: C.white, align: "center", valign: "middle" });
      sl.addShape("rect", { x: 1.2, y: y + 0.1, w: 8.45, h: 0.55, fill: { color: C.lightBg }, line: { color: "D1E8F5", pt: 0.5 } });
      sl.addText(goal, { x: 1.35, y: y + 0.1, w: 3.5, h: 0.55, fontFace: "Calibri", fontSize: 11, bold: true, color: C.teal, valign: "middle" });
      sl.addText(status, { x: 5.0, y: y + 0.1, w: 4.65, h: 0.55, fontFace: "Calibri", fontSize: 11, color: C.dark, italic: true, valign: "middle" });
    });

    // Critical challenges
    sl.addText("Critical Challenges for Scale-Up:", {
      x: 0.35, y: 4.72, w: 9.3, h: 0.28, fontFace: "Trebuchet MS", fontSize: 12, bold: true, color: C.navy,
    });

    const challenges = [
      "Cost reduction: Catalysts, reactors, thermal integration",
      "Catalyst improvement: Higher activity, longer lifetime, lower cost",
      "Heat source: Reliable, affordable >250°C heat (solar, industrial waste, grid power)",
      "Transport infrastructure: Standardized tankers, handling protocols",
    ];

    sl.addText(challenges.map((c, i) => ({ text: c, options: { bullet: true, breakLine: i < challenges.length - 1 } })), {
      x: 0.5, y: 5.03, w: 9.15, h: 0.32, fontFace: "Calibri", fontSize: 11, color: C.dark, valign: "top",
    });

    citation(sl, "Source: Niermann et al., Renew. Sustain. Energy Rev., 2021 | IEA Hydrogen Roadmap, 2023");
  }

  // ════════════════════════════════════════════════════════════════
  //  SLIDE 32 — Conclusions
  // ════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    sl.background = { color: C.navy };

    sl.addText("Conclusions", {
      x: 0.5, y: 0.8, w: 9, h: 0.7, fontFace: "Trebuchet MS", fontSize: 40, bold: true, color: C.white, align: "center",
    });

    const conclusions = [
      "LOHCs offer a practical, mature technology bridge for large-scale renewable H₂ storage & long-distance transport",
      "Toluene/MCH (Chiyoda) & DBT (Hydrogenious) are TRL 7–8; commercial deployment imminent",
      "Ambient conditions + existing infrastructure = significant economic advantage vs. cryogenic or high-pressure alternatives",
      "Catalysis is well-understood; future focus = cost reduction, heat integration, & system optimization",
      "Integration with green electricity + renewable heat sources → carbon-neutral H₂ supply chains by 2035",
    ];

    sl.addText(conclusions.map((c, i) => ({ text: c, options: { bullet: true, breakLine: i < conclusions.length - 1 } })), {
      x: 0.75, y: 1.8, w: 8.5, h: 3.0, fontFace: "Calibri", fontSize: 13, color: C.white, valign: "top",
    });

    // Bottom logo area
    sl.addShape("rect", { x: 0.5, y: 5.0, w: 9, h: 0.65, fill: { color: C.teal }, line: { color: C.teal } });
    sl.addText("University of Naples Federico II  |  Graduate Seminar 2025", {
      x: 0.5, y: 5.0, w: 9, h: 0.65, fontFace: "Calibri", fontSize: 14, bold: true, color: C.white, align: "center", valign: "middle",
    });
  }

  console.log("Slides 21-32 built (Part 2 complete)...");
  return pres;
}

module.exports = { buildPart2 };
