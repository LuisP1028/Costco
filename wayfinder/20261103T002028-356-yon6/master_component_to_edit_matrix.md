# Master Component-to-Edit Matrix (`20261103T002028-356-yon6`)

**Authoritative Upstream Specification:** `functional_specification_002.md`  
**Glossary & Taxonomy Governance:** `LANGUAGE.md`  
**Target Implementation Stage:** `implement` (independent automated acceptance test suite authoring and execution reserved strictly for `tester` under `INV-NO-SELF-TEST-01`)

---

## Mandatory Target Deliverables (MANDATORY_TARGET)

Every file in this register is a **mandatory functional production deliverable** required to fulfill `functional_specification_002.md` end-to-end across the live repository call graph (`INV-GOAL-01`, `INV-DELIVERABLE-SPLIT-01`, `INV-FAIL-FAST-01`). All **3** `MANDATORY_TARGET` files below must be modified by `implement`, listed in `handoff/20261103T002028-356-yon6/implementer.txt`, and recorded as `CHANGED` in `handoff/20261103T002028-356-yon6/implementer-status.txt` (zero `MANDATORY_TARGET` deliverables may remain `UNCHANGED`).

| # | Repository-Relative File Path | Action & Line Scope | Verbatim Symbols / DOM IDs / Exports | Live Call-Graph Role & Required Transformation | Governing Decision Tickets |
|---|---|---|---|---|---|
| 1 | `index.html` | **MODIFY / REPLACE** (`L1–L2407`) | Required DOM IDs: `#table-of-contents`, `#section-executive-summary`, `#section-polar-graphs`, `#polar-chart-categories`, `#polar-chart-geography`, `#polar-chart-flywheel`, `#section-five-steps`, `#step-1`, `#step-2`, `#step-3`, `#step-4`, `#step-5`, `#section-gaap-model`, `#section-wayfinder-audit`, `#gaap-waterfall-tbody`, `#sim-gm-slider`, `#sim-sga-slider`, `#sim-fee-slider`, `#sim-output-banner`, `#ticket-inspector-box` | Primary interactive corporate web report loaded in browser / headless Chromium and audited at runtime by `verifyCorporateWebReport()` inside `src/costco_revenue_model.mjs` (`AC-02`, `AC-03`, `AC-04`, `AC-05`). Eliminates 100% of Dreamcore / Y2K liminal visual & audio elements (`dreamcore`, `seraphic`, `vhs-scanlines`, `film-grain-overlay`, `meadow_portal.jpg`, `poolroom_sanctuary.jpg`, `sky_staircase.jpg`, `tape hum`, `stuck-clock`, `dream-sky-canvas`) and implements: (1) Institutional corporate palette (`#FFFFFF`, `#F8FAFC`, `#F1F5F9`, `#0F172A`, `#E31837` Costco Crimson, `#005DAA` Costco Executive Navy) + `tabular-nums` typography; (2) Sticky scroll-spy Table of Contents (`#table-of-contents`) linking to all sections, polar charts, and 5 steps; (3) Interactive SVG/Canvas Polar Graph Suite (`#polar-chart-categories` for FY22–FY24 Note 11 categories with `√r` / `r` / `θ_i` toggles & drill-down, `#polar-chart-geography` for Note 11 geographic segments across `890` clubs with Revenue / OpInc / Warehouse toggles, `#polar-chart-flywheel` contrasting `98.10% / 1.90%` revenue vs. `48.00% / 52.00%` operating profit contribution + ancillary/digital sub-drivers); (4) 5-Step Sequential Revenue Generation Walkthrough (`#step-1`..`#step-5` + interactive Stepper Controller); (5) Multi-Year GAAP Waterfall (`FY2022`–`FY2024`), live `{Operating Income Flywheel}` sensitivity simulator, and 6-ticket Wayfinder Audit Explorer (`ticket-001.md`..`ticket-006.md`). | [Corporate Business Visual Design System, Sticky Scroll-Spy Table of Contents, and Dreamcore Elimination (index.html)](./tickets/ticket-001.md), [Interactive SVG/Canvas Polar Revenue Disaggregation Suite — Category, Geography, and Operating Profit Flywheel (index.html)](./tickets/ticket-002.md), [Sequential 5-Step Revenue Generation Walkthrough, Multi-Year GAAP Waterfall, and Flywheel Sensitivity Simulator (index.html)](./tickets/ticket-003.md) |
| 2 | `src/costco_revenue_model.mjs` | **MODIFY** (`L18–L24`, `L608–L960`) | `EXPECTED_TICKET_FILES` (`ticket-001.md`..`ticket-006.md`), exported `verifyCorporateWebReport(rawOptions)` & `verifyIndexHtml`, `loadAndVerifyCostcoModel(rawOptions)` (`corporateWebAudit`), `parseCliArgs` (`--html`) | Live CLI & programmatic verification engine invoked by `npm start`, `npm run verify` (`node src/costco_revenue_model.mjs --verify`), and ESM consumers (`AC-01`, `AC-05`). Adds `"ticket-006.md"` to `EXPECTED_TICKET_FILES` (`resolvedTicketCount: 6`), exports `verifyCorporateWebReport` (and alias `verifyIndexHtml`) to fail fast on any residual Dreamcore markers, missing `#table-of-contents`, missing `#polar-chart-categories` / `#polar-chart-geography` / `#polar-chart-flywheel`, missing `#step-1`..`#step-5`, broken TOC anchor links, or missing corporate palette/figures, and integrates `corporateWebAudit` into `loadAndVerifyCostcoModel()` within $\le 250\text{ ms}$ and $\le 128\text{ MB}$ RSS with `0` network calls. | [Six-Ticket Wayfinder Audit, Corporate HTML Verification Engine, and Documentation Synchronization (src/costco_revenue_model.mjs and README.md)](./tickets/ticket-004.md) |
| 3 | `README.md` | **MODIFY** (`L1–L33`) | Corporate Executive Revenue Architecture overview, 5 report sections, 3 Polar Graphs, 5-Step Walkthrough, 6 Wayfinder tickets (`ticket-001.md`..`ticket-006.md`), CLI verification usage | Root repository documentation (`AC-02`, `AC-03`, `AC-04`). Replaces all Dreamcore / 1999 descriptions with institutional corporate documentation of `index.html`, `wayfinder/map.md`, `wayfinder/tickets/ticket-001.md`..`ticket-006.md`, `research/costco_revenue_architecture.md`, `data/costco_revenue_breakdown.json`, and `src/costco_revenue_model.mjs`. | [Six-Ticket Wayfinder Audit, Corporate HTML Verification Engine, and Documentation Synchronization (src/costco_revenue_model.mjs and README.md)](./tickets/ticket-004.md) |

---

## End-to-End Live Runtime Dataflow Graph (`INV-GOAL-01`)

```mermaid
flowchart LR
    CLI["Operator / Automated Consumer\nnpm start | npm run verify | Headless Chromium"] --> PKG["package.json\nscripts.start / scripts.verify"]
    PKG --> ENGINE["src/costco_revenue_model.mjs\nloadAndVerifyCostcoModel(options)"]
    ENGINE -->|verifyFinancialDataset()\nGAAP conservation & Note 11 shares| DATA["data/costco_revenue_breakdown.json\n(FY2022–FY2024 SEC 10-K Dataset)"]
    ENGINE -->|verifyWayfinderArtifacts()\nAudits H2 headings & 6 named ticket links| MAP["wayfinder/map.md\n& wayfinder/tickets/ticket-001.md..ticket-006.md"]
    ENGINE -->|verifyResearchMonograph()\n>=8,000B, CIK 0000909832, Form 10-K, ASC 606| RESEARCH["research/costco_revenue_architecture.md"]
    ENGINE -->|verifyCorporateWebReport()\nAudits TOC, 3 Polar Graphs, 5 Steps & 0 Dreamcore| HTML["index.html\nCorporate Executive Revenue Architecture"]
    HTML -->|Renders Sticky TOC (#table-of-contents),\n3 Polar Charts, 5-Step Engine & GAAP Simulator| BROWSER["Interactive Browser / Playwright Runtime\n(<=16ms frame updates, 0 console/page errors)"]
```

---

## Read-Only Discovery Context (READ_ONLY_CONTEXT)

The files below are already 100% aligned with `functional_specification_002.md` and primary-source SEC Form 10-K disclosures (`CIK: 0000909832`, Accession `0000909832-24-000049`). They provide ground-truth context for `implement`, `reviewer`, and `tester` and must **never** be conflated with `MANDATORY_TARGET` deliverables (`INV-DELIVERABLE-SPLIT-01`):

| Repository-Relative Path | Classification | Role in Implementation & Verification Context |
|---|---|---|
| `LANGUAGE.md` | `READ_ONLY_CONTEXT` | Authoritative evaluation parameters (`{errors}`, `{correctness}`, `{functionality}`, `{correct required outputs}`, `{sufficient}`, `{insufficient}`) and Costco revenue domain vocabulary (`{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`). |
| `functional_specification_002.md` | `READ_ONLY_CONTEXT` | Single authoritative upstream functional specification seed consumed by all pipeline stages. |
| `data/costco_revenue_breakdown.json` | `READ_ONLY_CONTEXT` | Canonical SEC Form 10-K multi-year financial dataset (`$254,453M` Total Revenue, `$249,625M` `{Net Sales}`, `$4,828M` `{Membership Fees}`, `$9,285M` Operating Income, `$7,367M` Net Income, Note 11 categories FY22–FY24, geographic segments across `890` clubs, membership & working capital). |
| `research/costco_revenue_architecture.md` | `READ_ONLY_CONTEXT` | `40,118`-byte primary-source SEC Form 10-K monograph (`CIK: 0000909832`, Accession `0000909832-24-000049`, `ASC 606`). |
| `wayfinder/map.md` | `READ_ONLY_CONTEXT` | Canonical repository Wayfinder map already linking `ticket-001.md` through `ticket-006.md` under `## Decisions so far` via descriptive human-readable titles. |
| `wayfinder/tickets/ticket-001.md` .. `wayfinder/tickets/ticket-006.md` | `READ_ONLY_CONTEXT` | Six resolved canonical `wayfinder:research` decision tickets (with `ticket-006.md` documenting the corporate redesign, Table of Contents, 5-step walkthrough, and polar graph suite). |
| `package.json` | `READ_ONLY_CONTEXT` | Node ESM manifest already defining `"start": "node src/costco_revenue_model.mjs"` and `"verify": "node src/costco_revenue_model.mjs --verify"`. |
| `assets/20261103T002028-356-yon6/plan-corporate-polar-and-5step-contract.json` | `READ_ONLY_CONTEXT` | Pre-computed polar sector angles ($\theta_i$), linear and area-proportional ($\sqrt{r}$) radial ratios, corporate color tokens, required DOM IDs, prohibited Dreamcore tokens, and 5-step walkthrough contract. |
| `wayfinder/20261103T002028-356-yon6/plan-scan-1-report.md` & `assets/20261103T002028-356-yon6/plan-scan-1-*` | `READ_ONLY_CONTEXT` | Parallel Scanner 1 (`plan-scan-1`) static scan report and captured reference assets. |
| `wayfinder/20261103T002028-356-yon6/plan-scan-2-report.md` & `assets/20261103T002028-356-yon6/plan-scan-2-*` | `READ_ONLY_CONTEXT` | Parallel Scanner 2 (`plan-scan-2`) primary-source SEC EDGAR audit report and captured reference assets. |
