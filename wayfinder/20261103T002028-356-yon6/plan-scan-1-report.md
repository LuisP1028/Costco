# /wayfinder-plan-scan-1: Codebase Static Scan, External API Reconnaissance, and Schema Audit Report

**Run ID:** `20261103T002028-356-yon6`  
**Agent:** `plan-scan-1` (Agent 1, Planning & Static Reconnaissance Node)  
**Governing Specification:** [`functional_specification_002.md`](../../functional_specification_002.md)  
**Authoritative Domain Glossary:** [`LANGUAGE.md`](../../LANGUAGE.md)  
**Host MCP Configuration:** [`.sandcastle/mcp.md`](../../.sandcastle/mcp.md)  
**Status:** Audit & Reconnaissance Complete — Strict `DO NOT CODE YET` Gate Enforced.

---

## 1. Executive Summary

This report documents the exhaustive static scan of the active Costco repository codebase and live read-only empirical reconnaissance of external primary datasources conducted by `plan-scan-1`. In accordance with [`functional_specification_002.md`](../../functional_specification_002.md), the repository's interactive static presentation (`index.html`) must transition from a retro Dreamcore / Y2K liminal aesthetic into an **institutional Corporate Business & Investor Relations briefing**, anchored in:

1. **Institutional Corporate Brand Palette & Typography:**
   - Crisp white and slate card surfaces (`#FFFFFF`, `#F8FAFC`, `#F1F5F9`, `#E2E8F0`), high-contrast slate ink (`#0F172A`, `#334155`, `#64748B`), tabular numeric typography (`font-variant-numeric: tabular-nums`), and Costco Wholesale corporate brand accents (`#E31837` Costco Crimson, `#005DAA` Costco Executive Navy).
   - Complete purging of all Dreamcore / Y2K liminal artifacts (`#film-grain-overlay`, `.vhs-scanlines`, `#stuck-clock`, `#seraphic-watcher-btn`, Web Audio tape hum oscillator, and `./assets/*.jpg` liminal image plates).
2. **Sticky Table of Contents (`#table-of-contents`):**
   - Persistent, scroll-spy-enabled navigation providing numbered anchors to all 5 major sections and all 5 individual revenue steps.
3. **Interactive Polar Graph Suite (`#section-polar-graphs`):**
   - Three interactive SVG/Canvas polar charts:
     - `#polar-chart-categories`: Note 11 Merchandise Category Nightingale Rose / Coxcomb chart (`$101,463M` Foods & Sundries, `$63,973M` Non-Foods, `$49,969M` Warehouse Ancillary, `$34,220M` Fresh Foods) with FY22–FY24 year selection, polar scaling mode toggles, and sector inspection.
     - `#polar-chart-geography`: Geographic segment & warehouse footprint polar chart (United States, Canada, Other International) comparing Revenue, Operating Income & margin, and Warehouse Count.
     - `#polar-chart-flywheel`: Top-line revenue vs. operating income flywheel polar asymmetry (`98.10%` Net Sales vs. `1.90%` Fees top-line; `48.00%` Net Merch Contribution vs. `52.00%` Fees operating profit) and ancillary sub-drivers (`~$30B` Gas across `719` stations, `~$17.5B` E-Commerce, etc.).
4. **Structured 5-Step Sequential Walkthrough (`#section-five-steps`):**
   - Step 1 (`#step-1`): Paid Membership Access & Executive Tier Upgrade (`$4,828M` Fees, `92.9%` renewal, `ASC 606` ratable recognition, `$2,804M` contra-revenue reward).
   - Step 2 (`#step-2`): `<4,000` SKU Curation, Depot Pallet Velocity & Kirkland Signature (`~30%+` penetration).
   - Step 3 (`#step-3`): High-Frequency Ancillary Magnets (`719` gas stations) & Omnichannel Logistics.
   - Step 4 (`#step-4`): `10.92%` `{Gross Margin Ceiling}` & `104.15%` Supplier Float (negative working capital).
   - Step 5 (`#step-5`): `{Operating Income Flywheel}` (`52.00%` fee share of `$9,285M` operating income $\to$ `$7,367M` net income).
5. **Deterministic Verification CLI Integration (`src/costco_revenue_model.mjs`):**
   - Expansion of `EXPECTED_TICKET_FILES` to include `ticket-006.md`.
   - Addition of `verifyIndexHtml` to verify the corporate DOM elements and guarantee zero Dreamcore residue.

---

## 2. Master Component Dependency Cone Register

| Repository-Relative Path | Verbatim Identifiers & Symbol Signatures | Context Classification | Operational Role & Grounding Justification |
| :--- | :--- | :--- | :--- |
| `index.html` | `#table-of-contents`, `#section-executive-summary`, `#section-polar-graphs`, `#polar-chart-categories`, `#polar-chart-geography`, `#polar-chart-flywheel`, `#section-five-steps`, `#step-1`..`#step-5`, `#section-gaap-model`, `#section-wayfinder-audit` | `MANDATORY_TARGET` | Primary client deliverable. Currently contains 2,407 lines of Dreamcore/Y2K code (Seraphic eye, VHS scanlines, film grain, tape hum synth, plate images) that must be entirely replaced with the Corporate Business design system, Table of Contents, 3 Polar Graphs, and 5-Step Walkthrough. |
| `src/costco_revenue_model.mjs` | `verifyFinancialDataset`, `verifyWayfinderArtifacts`, `verifyResearchMonograph`, `verifyIndexHtml`, `loadAndVerifyCostcoModel`, `EXPECTED_TICKET_FILES` | `MANDATORY_TARGET` | Central verification CLI and runtime model. Must be updated to include `ticket-006.md` in `EXPECTED_TICKET_FILES`, add `verifyIndexHtml` routine enforcing corporate markup and zero Dreamcore tokens, and verify all 6 tickets. |
| `README.md` | `Costco Wholesale Corporation Corporate Revenue Architecture`, `Table of Contents`, `Polar Graphs`, `6 Wayfinder Tickets` | `MANDATORY_TARGET` | Primary documentation. Currently documents the deprecated Dreamcore interface and tickets 1-5; must be updated to document the corporate presentation, polar graphs, and all 6 tickets. |
| `package.json` | `scripts.start`, `scripts.verify` (`node src/costco_revenue_model.mjs --verify`), `devDependencies` | `READ_ONLY_CONTEXT` | Package configuration; scripts are verified and operational (`npm run verify`). |
| `package-lock.json` | Lockfile dependencies | `READ_ONLY_CONTEXT` | Node package lockfile. |
| `data/costco_revenue_breakdown.json` | `company`, `consolidated_income_statement`, `historical_comparison`, `merchandise_categories`, `geographic_segments`, `membership_metrics`, `working_capital_balance_sheet`, `primary_sources` | `READ_ONLY_CONTEXT` | Ground-truth structured JSON dataset. Fully verified against SEC Form 10-K; contains Note 11 disaggregation for FY2022-FY2024, geographic segments, and working capital accounts. |
| `research/costco_revenue_architecture.md` | Sections 1–7 (`40,118 bytes`) | `READ_ONLY_CONTEXT` | Primary-source research monograph citing CIK `0000909832`, Form 10-K, and ASC 606. Fully verified by `verifyResearchMonograph`. |
| `wayfinder/map.md` | Canonical Wayfinder map linking all 6 resolved decision tickets | `READ_ONLY_CONTEXT` | Canonical Wayfinder decision map. Contains all 5 required canonical H2 sections and descriptive human-readable links to `ticket-001.md` through `ticket-006.md`. |
| `wayfinder/tickets/ticket-001.md` | `Two-Pillar Revenue Engine and ASC 606 Recognition Mechanics` | `READ_ONLY_CONTEXT` | Resolved research ticket for ASC 606 revenue recognition and deferred fee mechanics. |
| `wayfinder/tickets/ticket-002.md` | `Merchandise Category Disaggregation, SKU Discipline, and Kirkland Signature Economics` | `READ_ONLY_CONTEXT` | Resolved research ticket for Note 11 merchandise categories, SKU curation, and Kirkland Signature. |
| `wayfinder/tickets/ticket-003.md` | `Membership Fee Tier Structure, Renewal Rate Dynamics, and Fee Increase Cadence` | `READ_ONLY_CONTEXT` | Resolved research ticket for membership tier scale, renewal rates, and fee increases. |
| `wayfinder/tickets/ticket-004.md` | `Warehouse Ancillary Traffic Drivers, E-Commerce, Costco Logistics, and Emerging Retail Media` | `READ_ONLY_CONTEXT` | Resolved research ticket for ancillary business drivers, gas stations, and digital logistics. |
| `wayfinder/tickets/ticket-005.md` | `Gross Margin Ceiling, Negative Working-Capital Inventory Funding, and Operating Income Flywheel` | `READ_ONLY_CONTEXT` | Resolved research ticket for the 10.92% gross margin ceiling, 104.15% AP/Inventory float, and flywheel. |
| `wayfinder/tickets/ticket-006.md` | `Corporate Executive Design Architecture, Step-by-Step Revenue Walkthrough, and Interactive Polar Graphs` | `READ_ONLY_CONTEXT` | Resolved research ticket defining corporate redesign, Table of Contents, 5-step walkthrough, and polar graph suite. |
| `assets/meadow_portal.jpg` | Liminal meadow doorway image plate | `READ_ONLY_CONTEXT` | Deprecated Dreamcore asset (985 KB); to be excluded from corporate presentation. |
| `assets/poolroom_sanctuary.jpg` | Liminal poolroom atrium image plate | `READ_ONLY_CONTEXT` | Deprecated Dreamcore asset (766 KB); to be excluded from corporate presentation. |
| `assets/sky_staircase.jpg` | Liminal cloud staircase image plate | `READ_ONLY_CONTEXT` | Deprecated Dreamcore asset (767 KB); to be excluded from corporate presentation. |
| `.nojekyll` | GitHub Pages configuration file | `READ_ONLY_CONTEXT` | Prevents Jekyll processing of static assets. |

---

## 3. Candidate External Datasource Audit & Empirical Schema Register

To empirically verify all quantitative data and schemas specified in [`functional_specification_002.md`](../../functional_specification_002.md), active read-only reconnaissance was conducted against primary SEC EDGAR endpoints. The authentic files and schemas have been downloaded and saved into `assets/20261103T002028-356-yon6/plan-scan-1-*`:

### 3.1 SEC EDGAR Submissions API
- **Endpoint:** `https://data.sec.gov/submissions/CIK0000909832.json`
- **Saved Asset Path:** `assets/20261103T002028-356-yon6/plan-scan-1-sec-edgar-submissions.json`
- **File Size:** `156 KB`
- **HTTP Status / Method:** `200 OK` (HTTP/2, `GET`, non-mutating)
- **Observed Structure:**
  - `cik`: `"0000909832"`
  - `entityType`: `"operating"`
  - `sic`: `"5331"` (`Retail-Variety Stores`)
  - `filings.recent`: Contains accession numbers, form types (`10-K`, `10-Q`, `8-K`), filing dates, and document descriptions.

### 3.2 SEC EDGAR Company Facts XBRL API
- **Endpoint:** `https://data.sec.gov/api/xbrl/companyfacts/CIK0000909832.json`
- **Saved Asset Path:** `assets/20261103T002028-356-yon6/plan-scan-1-sec-edgar-companyfacts.json`
- **File Size:** `3.5 MB`
- **HTTP Status / Method:** `200 OK` (HTTP/2, `GET`, non-mutating)
- **Observed Structure:**
  - `facts.us-gaap`: Contains audited annual and quarterly facts for:
    - `RevenueFromContractWithCustomerExcludingAssessedTax` (Net Sales): `249,625` USD million (FY2024), `237,710` (FY2023), `222,730` (FY2022).
    - `CostOfGoodsAndServicesSold` (Merchandise Costs): `222,358` USD million (FY2024), `212,586` (FY2023), `199,382` (FY2022).
    - `SellingGeneralAndAdministrativeExpense`: `22,810` USD million (FY2024), `21,590` (FY2023), `19,779` (FY2022).
    - `OperatingIncomeLoss`: `9,285` USD million (FY2024), `8,114` (FY2023), `7,793` (FY2022).
    - `NetIncomeLoss`: `7,367` USD million (FY2024), `6,292` (FY2023), `5,844` (FY2022).

### 3.3 SEC EDGAR Form 10-K Primary Source Filing Document
- **Endpoint:** `https://www.sec.gov/Archives/edgar/data/909832/000090983224000049/cost-20240901.htm`
- **Saved Asset Path:** `assets/20261103T002028-356-yon6/plan-scan-1-cost-20240901.htm`
- **File Size:** `1.4 MB`
- **HTTP Status / Method:** `200 OK` (HTTP/2, `GET`, non-mutating)
- **Disclosures Grounded:**
  - Item 1 (Business): 890 warehouses, `<4,000` SKUs, Kirkland Signature, 719 gas stations, E-Commerce, 76.2M paid members, 35.4M Executive members driving 73.3% of sales.
  - Item 7 (MD&A): Trailing renewal rates (92.9% US/CA, 90.5% worldwide), Sept 1, 2024 fee increase ($65/$130, ~$370M 2-year lift).
  - Item 8 (Financial Statements): Note 1 (Revenue recognition, $2,804M Executive 2% reward contra-revenue, $2,501M deferred fees), Note 11 (Disaggregated revenue by category and geographic segments).

### 3.4 Verified Primary-Source Financial Synthesis
- **Saved Asset Path:** `assets/20261103T002028-356-yon6/plan-scan-1-costco-fy2024-verified-extracted.json`
- **Content:** Complete structured extract of all Note 11 categories (Foods & Sundries, Non-Foods, Warehouse Ancillary, Fresh Foods for FY22–FY24), geographic segments (US, Canada, Other International), working capital float (104.15% AP/Inventory), and flywheel reconciliation.

---

## 4. Detailed Codebase Audit & Friction Analysis

### 4.1 `index.html` Dreamcore Inventory to Purge
The static scan of `index.html` (2,407 lines) identified the following elements that MUST be eliminated:
1. **CSS Selectors & Rules:**
   - `#film-grain-overlay` (lines 88–97)
   - `.vhs-scanlines`, `body.vhs-active .vhs-scanlines` (lines 99–122)
   - `.liminal-topbar`, `.vhs-status-cluster`, `#stuck-clock` (lines 124–148)
   - `#seraphic-watcher-btn`, `.watcher-svg`, `#watcher-iris-group`, `#watcher-eyelid`, `.wing-*` (lines 200–317)
   - `.dreamcore-overline`, `.dreamcore-subwhisper`, `.dreamcore-caption-overlay`, `.dreamcore-caption-text` (lines 319–340, 526–570)
   - Retro window frames: `.dream-window`, `data-draggable-window`, `.viewport-sunken-well`, `#dream-viewport` (lines 400–525)
2. **HTML DOM Structure:**
   - Procedural sky canvas: `<canvas id="dream-sky-canvas"></canvas>` (line 974)
   - Overlays: `<div id="film-grain-overlay"></div>`, `<div class="vhs-scanlines"></div>`, `<div id="floating-echo-layer"></div>` (lines 978–982)
   - Liminal topbar with camcorder clock & tape hum button: `<header class="liminal-topbar">` (lines 985–1014)
   - Six-winged seraphic eye: `<section class="seraph-header">` (lines 1018–1090)
   - Deprecated image plates: `./assets/meadow_portal.jpg`, `./assets/poolroom_sanctuary.jpg`, `./assets/sky_staircase.jpg` (lines 1152–1168, 1232, 1246, 1260, 1274, 1288)
   - Retro draggable windows: `#win-viewer`, `#win-index`, `#win-reminder`, `#win-flywheel`, `#win-monograph` (lines 1138–1498)
3. **JavaScript Engine:**
   - Liminal strata definition: `DREAM_STRATA` (line 1518)
   - Retro text arrays: `DRIFT_WHISPERS` (line 1521), `ECHO_PHRASES` (line 1531)
   - Web Audio synthesizer oscillator / noise tape hum: lines 2010–2100
   - Tape counter and stuck clock loops: lines 2215–2230
   - Procedural grain translation tick: lines 2300–2325
   - Procedural sky / soap-orb canvas animation: lines 1700–1850

### 4.2 `src/costco_revenue_model.mjs` Structural Deficiencies
1. **`EXPECTED_TICKET_FILES` (lines 18–24):**
   - Currently lists only `ticket-001.md` through `ticket-005.md`.
   - `ticket-006.md` exists in `wayfinder/tickets/ticket-006.md` and is linked from `wayfinder/map.md`. It must be added to `EXPECTED_TICKET_FILES` so `verifyWayfinderArtifacts` explicitly validates all 6 tickets.
2. **Missing `index.html` Verification Routine (`verifyIndexHtml`):**
   - `src/costco_revenue_model.mjs` currently audits only the financial dataset (`verifyFinancialDataset`), Wayfinder tickets/map (`verifyWayfinderArtifacts`), and research monograph (`verifyResearchMonograph`).
   - It contains NO verification for `index.html`.
   - To satisfy `functional_specification_002.md` and prevent regressions, a new verification function (`verifyIndexHtml`) must be implemented to audit `index.html` for:
     - Presence of `#table-of-contents`
     - Presence of `#section-executive-summary`
     - Presence of `#section-polar-graphs` and the 3 polar chart containers (`#polar-chart-categories`, `#polar-chart-geography`, `#polar-chart-flywheel`)
     - Presence of `#section-five-steps` and all 5 step containers (`#step-1`, `#step-2`, `#step-3`, `#step-4`, `#step-5`)
     - Presence of `#section-gaap-model` and `#section-wayfinder-audit`
     - Total absence of forbidden Dreamcore markers (`#seraphic-watcher-btn`, `vhs-scanlines`, `film-grain-overlay`, `meadow_portal.jpg`, `poolroom_sanctuary.jpg`, `sky_staircase.jpg`, `dreamcore`, `tape hum`, `stuck-clock`)
   - `loadAndVerifyCostcoModel` should invoke `verifyIndexHtml` and report `htmlAudit` in the returned JSON report.

---

## 5. Explicit Deficiency Register

| ID | Specced Requirement | Current Codebase State | Obstacle / Root Cause | Recommended MANDATORY_TARGET Action |
| :--- | :--- | :--- | :--- | :--- |
| `DEF-01` | Corporate Business & Investor Relations Aesthetic in `index.html` | Retro Dreamcore / Y2K liminal design system (2,407 lines) with Seraphic eye, VHS scanlines, film grain, and plate images | Legacy implementation from prior specification | Redesign `index.html` to implement clean institutional palette (`#FFFFFF`, `#F8FAFC`, `#0F172A`, `#E31837`, `#005DAA`) and purge all Dreamcore elements. |
| `DEF-02` | Sticky Table of Contents (`#table-of-contents`) | Missing from `index.html` | Not previously specified | Implement persistent left-sidebar `#table-of-contents` with numbered links and scroll-spy tracking across all sections and steps. |
| `DEF-03` | Interactive Polar Graph Suite (`#section-polar-graphs`) | Missing; only horizontal progress bars exist in `#win-monograph` | Not previously specified | Implement 3 interactive SVG/Canvas polar graphs (`#polar-chart-categories`, `#polar-chart-geography`, `#polar-chart-flywheel`) with multi-year toggles, radius scaling modes, and sector drill-downs. |
| `DEF-04` | 5-Step Sequential Revenue Walkthrough (`#section-five-steps`) | Tab-based strata selector (`#win-index`) using liminal imagery and cryptic titles | Legacy presentation model | Implement `#section-five-steps` with `#step-1` through `#step-5`, interactive stepper progression, verified KPIs, formulas, and ticket cross-references. |
| `DEF-05` | Verification of `ticket-006.md` in `src/costco_revenue_model.mjs` | `EXPECTED_TICKET_FILES` only contains tickets 001–005 | Newly added ticket not yet incorporated into test list | Add `"ticket-006.md"` to `EXPECTED_TICKET_FILES`. |
| `DEF-06` | Corporate HTML Deliverable Verification in `src/costco_revenue_model.mjs` | `src/costco_revenue_model.mjs` does not audit `index.html` | Lack of automated verification routine for HTML deliverable | Implement `verifyIndexHtml` to assert presence of required corporate containers and absence of Dreamcore selectors/assets. |
| `DEF-07` | Corporate Documentation in `README.md` | `README.md` describes Dreamcore theme and only tickets 001–005 | Legacy documentation | Update `README.md` to reflect corporate presentation, Table of Contents, 3 Polar Graphs, 5-Step Walkthrough, and all 6 tickets. |

---

## 6. Sufficiency & Scan Certification

`plan-scan-1` certifies that:
1. The codebase dependency cone has been exhaustively scanned without heuristic sampling, guessing, or scope locks.
2. All external datasources and schemas have been verified empirically against live SEC EDGAR primary sources and captured to `assets/20261103T002028-356-yon6/plan-scan-1-*`.
3. All systemic friction, missing components, and architectural deficiencies have been cataloged with precision in the Deficiency Register.
4. The scan satisfies the `{sufficient}` evaluation parameter defined in [`LANGUAGE.md`](../../LANGUAGE.md). Zero ambiguity remains.

---

## 7. Handoff Manifest Affirmation

The dedicated role handoff manifest at [`handoff/20261103T002028-356-yon6/plan-scan-1.txt`](../../handoff/20261103T002028-356-yon6/plan-scan-1.txt) has been atomically overwritten with exact repository-relative paths of:
- All identified and reviewed codebase component files (`MANDATORY_TARGET` and `READ_ONLY_CONTEXT`),
- This authored scan report (`wayfinder/20261103T002028-356-yon6/plan-scan-1-report.md`),
- All saved external files, assets, schemas, and datasets in `assets/20261103T002028-356-yon6/plan-scan-1-*`.
- Zero seed paths are recorded.

---

## 8. Coding Gate Affirmation

**DO NOT CODE YET: Implementation coding gate remains locked. Zero application code, test code, or implementation steps have been generated.**
