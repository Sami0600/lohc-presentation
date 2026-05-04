#!/usr/bin/env node

/**
 * LOHC Presentation Builder
 * Generates a comprehensive PowerPoint presentation on Liquid Organic Hydrogen Carriers
 * 
 * Usage: node index.js [output_filename]
 * Default output: LOHC_Presentation_2025.pptx
 */

const path = require("path");
const fs = require("fs");

// Import presentation builders
const { build } = require("./lohc_presentation.js");
const { buildPart2 } = require("./lohc_part2.js");

// Get output filename from CLI args or use default
const outputFilename = process.argv[2] || "LOHC_Presentation_2025.pptx";
const outputPath = path.join(process.cwd(), outputFilename);

console.log("\n╔═══════════════════════════════════════════════════════════╗");
console.log("║   LOHC Presentation Builder v1.0                        ║");
console.log("║   Liquid Organic Hydrogen Carriers Seminar              ║");
console.log("���   University of Naples Federico II                      ║");
console.log("╚═══════════════════════════════════════════════════════════╝\n");

console.log(`📋 Building comprehensive presentation...`);
console.log(`📁 Output: ${outputPath}\n`);

async function buildPresentation() {
  try {
    console.log("⏳ Part 1: Slides 1-20 (Introduction & Fundamentals)...");
    const { pres, hexAt } = await build();

    console.log("⏳ Part 2: Slides 21-32 (Materials, Catalysts & Reactors)...");
    const finalPres = await buildPart2(pres, hexAt);

    console.log("💾 Writing PPTX file...");
    finalPres.writeFile({ fileName: outputPath });

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`\n✅ Presentation generated successfully!\n`);
    console.log(`📦 File: ${outputFilename}`);
    console.log(`💾 Size: ${sizeKB} KB (${sizeMB} MB)`);
    console.log(`📍 Location: ${outputPath}\n`);

    console.log("──────────────────────────────���──────────────────────────────");
    console.log("📊 Presentation Contents (32 Slides):");
    console.log("─────────────────────────────────────────────────────────────");

    const sections = [
      {
        section: "Section 01: Introduction (Slides 1-8)",
        slides: [
          "1. Title Slide with Molecular Structures",
          "2. Table of Contents",
          "3. The Hydrogen Economy",
          "4. The Storage Challenge",
          "5. Comparison of Storage Technologies",
          "6. Why LOHC? Key Advantages",
          "7. The LOHC Closed-Loop System",
          "8. Global LOHC Project Landscape",
        ],
      },
      {
        section: "Section 02: Fundamentals (Slides 9-17)",
        slides: [
          "9. Section Divider",
          "10. What is an LOHC?",
          "11. The Hydrogenation Reaction",
          "12. The Dehydrogenation Reaction",
          "13. Thermodynamics of LOHC Systems",
          "14. Kinetics of LOHC Reactions",
          "15. Hydrogen Capacity Metrics",
          "16. Energy Balance — LOHC Round Trip",
          "17. Round-Trip Efficiency Comparison",
        ],
      },
      {
        section: "Section 03: LOHC Materials (Slides 18-23)",
        slides: [
          "18. Section Divider",
          "19. N-Ethylcarbazole (NEC) / H₁₂-NEC",
          "20. Dibenzyltoluene (DBT) / H₁₈-DBT",
          "21. Toluene / Methylcyclohexane (MCH)",
          "22. Naphthalene / Decahydronaphthalene",
          "23. Bio-based and Novel LOHC Carriers",
        ],
      },
      {
        section: "Section 04: Catalysts (Slides 24-26)",
        slides: [
          "24. Section Divider",
          "25. Catalyst Selection for LOHC Reactions",
          "26. Deactivation Mechanisms & Regeneration",
        ],
      },
      {
        section: "Section 05: Reactor Engineering (Slides 27-32)",
        slides: [
          "27. Section Divider",
          "28. Reactor Types for LOHC Processing",
          "29. Heat Integration Strategy",
          "30. Technology Readiness & Scale-Up Ladder",
          "31. Future Outlook & Challenges",
          "32. Conclusions",
        ],
      },
    ];

    sections.forEach(({ section, slides }) => {
      console.log(`\n${section}`);
      slides.forEach((slide) => {
        console.log(`  • ${slide}`);
      });
    });

    console.log("\n─────────────────────────────────────────────────────────────");
    console.log("📊 Key Features:");
    console.log("─────────────────────────────────────────────────────────────");
    console.log("  ✓ 8 Data visualizations (bar, line, scatter, doughnut charts)");
    console.log("  ✓ 5 Data-rich tables with formatting");
    console.log("  ✓ 12 Molecular structure diagrams");
    console.log("  ✓ 20+ Embedded React icons (PNG)");
    console.log("  ✓ Professional color scheme & typography");
    console.log("  ✓ Complete citations & references");
    console.log("  ✓ Consistent design & layout");

    console.log("\n────────────────────────────────────────────────────���────────");
    console.log("🚀 Next Steps:");
    console.log("─────────────────────────────────────────────────────────────");
    console.log("  1. Open the PPTX in PowerPoint, Google Slides, or Keynote");
    console.log("  2. Review slides for accuracy and customization");
    console.log("  3. Add speaker notes or presenter comments");
    console.log("  4. Export to PDF if needed");
    console.log("  5. Present with confidence! 🎓\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error building presentation:\n");
    console.error(error);
    console.error("\n📝 Troubleshooting Tips:");
    console.error("  • Ensure all dependencies are installed: npm install");
    console.error("  • Check that lohc_presentation.js and lohc_part2.js exist");
    console.error("  • On macOS: Install Xcode tools (xcode-select --install)");
    console.error("  • On Windows: Install Visual Studio Build Tools");
    console.error("  • On Linux: sudo apt-get install build-essential python3\n");
    process.exit(1);
  }
}

// Run the build
buildPresentation();
