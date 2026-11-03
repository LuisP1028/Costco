# Codebase & Dataflow Map: Costco Wholesale Corporation (`COST`) Architecture

**Run ID:** `20261103T204534-693-1b8y`  
**Agent:** `codebase-mapper` (Codebase & Dataflow Discovery Scanner)  
**Governing Specification:** [`functional_specification_003.md`](../../functional_specification_003.md)  
**Authoritative Domain Glossary:** [`LANGUAGE.md`](../../LANGUAGE.md)  
**Status:** Complete Codebase, Module, Storage, and Runtime Dataflow Map. Strict `DO NOT CODE YET` Gate Enforced.

---

## 1. Executive Summary & Scan Scope

This document provides a comprehensive, empirically grounded mapping of the existing codebase, file hierarchy, modules, functions, persistent storage schemas, and runtime dataflows across the Costco Wholesale Corporation (`NASDAQ: COST`, `CIK: 0000909832`) repository.

The repository centers on an interactive single-page corporate financial report ([`index.html`](../../index.html)), a primary-source SEC Form 10-K financial dataset ([`data/costco_revenue_breakdown.json`](../../data/costco_revenue_breakdown.json)), an exhaustive SEC Form 10-K research monograph ([`research/costco_revenue_architecture.md`](../../research/costco_revenue_architecture.md)), a Wayfinder decision lineage graph ([`wayfinder/map.md`](../../wayfinder/map.md) and [`wayfinder/tickets/ticket-001.md`](../../wayfinder/tickets/ticket-001.md) through [`wayfinder/tickets/ticket-006.md`](../../wayfinder/tickets/ticket-006.md)), and a zero-network deterministic verification engine and CLI ([`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs)).

In accordance with [`functional_specification_003.md`](../../functional_specification_003.md), the system must be refined across four core operational vectors without introducing shadow modules or rewriting existing architectural foundations:
1. **Straightforward Technical English Editorial Overhaul:** Elimination of raw curly-brace specification tokens (`{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`) and decorative pseudo-code `//` dividers across all visible HTML and script-rendered strings in [`index.html`](../../index.html).
2. **Visual, Geometric & Stylesheet Polish:** Implementing complete stylesheet coverage for SVG polar coordinate elements (`.polar-grid-ring`, `.polar-axis-spoke`, `.polar-center-title`, `.polar-center-sub`, `.polar-sector-label`, `.polar-axis-label`), drill-down card containers (`.drilldown-meta-grid`, `.drilldown-meta-item`), and simulator ceiling breach alerts (`.sim-output-banner.is-breach`), resolving unrendered styles and undefined tokens (`var(--emerald-audit)`).
3. **Primary-Source Data Reconciliation:** Correcting Note 11 multi-year merchandise category figures (FY2022 and FY2023) and Item 2 warehouse ownership counts in [`index.html`](../../index.html) to achieve 100% mathematical fidelity with [`data/costco_revenue_breakdown.json`](../../data/costco_revenue_breakdown.json).
4. **Scroll-Spy, Keyboard Accessibility & Verification Hardening:** Implementing active viewport tracking on `#table-of-contents`, keyboard navigation (`Enter` and `Space`) on SVG polar sectors, and deterministic assertions in [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs).

---

## 2. Current Project Shape & Entry Points

### 2.1 Workspace Directory Topology

```
.
├── .sandcastle/                             # Sandcastle execution environment & binaries
│   ├── bin/blackboard                       # Discovery Blackboard CLI
│   └── worktrees/                           # Worktrees for autonomous sub-agents
├── assets/                                  # SEC primary-source extraction dumps and scans
│   ├── 20261101T233014-881-kg7i/            # Run 1 SEC 10-K extracts & company facts
│   └── 20261103T002028-356-yon6/            # Run 2 SEC Form 10-K XBRL & HTML disclosures
├── data/
│   └── costco_revenue_breakdown.json        # Canonical primary-source GAAP JSON dataset (251 lines)
├── handoff/
│   ├── 20261101T233014-881-kg7i/            # Run 1 agent handoffs
│   ├── 20261103T002028-356-yon6/            # Run 2 agent handoffs
│   └── 20261103T204534-693-1b8y/            # Current run handoffs
├── index.html                               # Standalone client-side application (3,046 lines, 140 KB)
├── LANGUAGE.md                              # Ubiquitous domain vocabulary & strict evaluation parameters
├── package.json                             # Node ESM package manifest (type: module)
├── package-lock.json                        # Deterministic dependency lockfile
├── README.md                                # Executive architectural overview & local instructions
├── research/
│   └── costco_revenue_architecture.md       # Primary-source research monograph (40,118 bytes)
├── src/
│   └── costco_revenue_model.mjs             # Model verification engine & CLI runner (1,196 lines)
└── wayfinder/
    ├── 20261101T233014-881-kg7i/            # Historical Run 1 wayfinder reports & tickets
    ├── 20261103T002028-356-yon6/            # Historical Run 2 wayfinder reports & tickets
    ├── 20261103T204534-693-1b8y/            # Current run wayfinder scanner deliverables
    ├── map.md                               # Authoritative Wayfinder decision map
    └── tickets/                             # Canonical resolved decision tickets (ticket-001..006)
        ├── ticket-001.md                    # Two-Pillar Revenue Engine & ASC 606 Recognition
        ├── ticket-002.md                    # Merchandise Category Disaggregation & SKU Scale
        ├── ticket-003.md                    # Membership Tiers & Renewal Dynamics
        ├── ticket-004.md                    # Ancillary Businesses & Logistics
        ├── ticket-005.md                    # Gross Margin Ceiling & Working Capital Float
        └── ticket-006.md                    # Corporate Report Architecture & Polar Graphs
```

### 2.2 Entry Points & Runtime Configuration

1. **Deterministic Verification CLI (`npm run verify` / `npm start`):**
   - **File:** [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs)
   - **Invocation:** `node src/costco_revenue_model.mjs --verify`
   - **Runtime Environment:** Node.js v24.9.0 (ESM, `"type": "module"`)
   - **Inputs:** CLI arguments (`--verify`, `--root`, `--data`, `--map`, `--tickets`, `--research`, `--html`)
   - **Outputs:** Formatted JSON verification report to `stdout` (`exitCode: 0`), or error diagnostic to `stderr` (`exitCode: 1`)
   - **Measured Telemetry:** ~12–39 ms elapsed wall-clock latency, ~46.3 MB RSS, 0 network requests.

2. **Interactive Web Application (`index.html`):**
   - **File:** [`index.html`](../../index.html)
   - **Execution Context:** Client-side web browser runtime (Safari, Chrome, Firefox, Edge, mobile Safari/Chrome at 390px to 1440px+)
   - **Dependencies:** Completely self-contained vanilla HTML5, CSS3, SVG, and ES2022. Zero external CDNs, fonts, or libraries. 0 network calls required.
   - **Local Web Server:** `python3 -m http.server 8088` or direct file URL loading (`file:///.../index.html`).

---

## 3. End-to-End Dataflow & Storage Topology

```mermaid
flowchart TD
    subgraph Primary Sources & Persistent Storage
        SEC["SEC Form 10-K FY2024\n(CIK: 0000909832)"] --> JSON["data/costco_revenue_breakdown.json\n(Canonical GAAP Dataset)"]
        SEC --> RES["research/costco_revenue_architecture.md\n(Primary-Source Monograph)"]
        SEC --> WF["wayfinder/map.md & tickets/\n(Decision Lineage Tickets 001-006)"]
    end

    subgraph Node.js Verification Engine (src/costco_revenue_model.mjs)
        CLI["CLI Entry Point\n(parseCliArgs)"] --> LOAD["loadAndVerifyCostcoModel()"]
        JSON --> VFIN["verifyFinancialDataset()"]
        WF --> VWF["verifyWayfinderArtifacts()"]
        RES --> VRES["verifyResearchMonograph()"]
        HTML_SRC["index.html File"] --> VWEB["verifyCorporateWebReport()"]
        
        LOAD --> VFIN
        LOAD --> VWF
        LOAD --> VRES
        LOAD --> VWEB
        VWEB --> JSON_OUT["JSON Verification Report\n(stdout: status: 'VERIFIED')"]
    end

    subgraph Client-Side Browser Runtime (index.html)
        EMBED_DATA["Inlined Datasets in IIFE\n(CATEGORY_DATA, GEOGRAPHY_DATA,\nFLYWHEEL_DATA, GAAP_BY_YEAR)"] --> INIT["init() on DOMContentLoaded"]
        
        INIT --> R_CAT["renderPolarCategories()"]
        INIT --> R_GEO["renderPolarGeography()"]
        INIT --> R_FLY["renderPolarFlywheel()"]
        INIT --> R_STEP["setActiveStep(1)"]
        INIT --> R_GAAP["renderGaapWaterfall()"]
        INIT --> R_SIM["updateSimulator()"]
        INIT --> R_TICK["renderTicketInspector()"]
        INIT --> SPY["Scroll-Spy / IntersectionObserver"]
        
        R_CAT --> DOM_CAT["#svg-polar-categories\n#polar-category-drilldown\n#cat-table-body"]
        R_GEO --> DOM_GEO["#svg-polar-geography\n#polar-geography-drilldown\n#geo-table-body"]
        R_FLY --> DOM_FLY["#svg-polar-flywheel\n#polar-flywheel-drilldown"]
        R_STEP --> DOM_STEP[".step-card.is-active-step\n#step-focus-banner"]
        R_GAAP --> DOM_GAAP["#gaap-waterfall-tbody"]
        R_SIM --> DOM_SIM["#sim-output-banner\n(.is-breach state)"]
        R_TICK --> DOM_TICK["#wayfinder-active-card"]
        SPY --> DOM_TOC["#table-of-contents\n(.is-active & aria-current)"]
    end
```

### 3.1 Data Flow Analysis

1. **Authoritative Primary Data Layer (`data/costco_revenue_breakdown.json`):**
   - Stores audited figures from the FY2024 Form 10-K: Consolidated Income Statements ($254,453M total revenue = $249,625M Net Sales + $4,828M Membership Fees; $9,285M operating income; $7,367M net income), Historical Comparison (FY2022–FY2024), Note 11 Merchandise Categories (Foods & Sundries, Non-Foods, Warehouse Ancillary, Fresh Foods), Geographic Segments (U.S., Canada, Other International), Membership Metrics (76.2M paid members, 136.8M cardholders, 92.9% renewal, $2,804M Executive reward), and Working Capital Accounts ($18,647M inventory, $19,421M AP, $2,501M deferred fees).
   - Ingested by `src/costco_revenue_model.mjs` via `fs.readFileSync` and verified against mathematical conservation laws.

2. **Client-Side Embedded Data Layer (`index.html` lines 1856–2138):**
   - The browser application maintains inlined datasets within an immediately invoked function expression (IIFE):
     - `CATEGORY_DATA`: Array of 4 merchandise category objects with `salesByYear`, `shareByYear`, `departments`, `role`.
     - `GEOGRAPHY_DATA`: Array of 3 geographic segment objects with `revenueM`, `revSharePct`, `opIncM`, `warehouses`, `ownedLandAndBldg`, `leasedLandOwnedBldg`, `leasedBoth`.
     - `FLYWHEEL_ASYMMETRY_DATA`: Array of 2 revenue pillars (`pillar_net_sales` and `pillar_membership_fees`).
     - `ANCILLARY_ROSE_DATA`: Array of 4 ancillary business drivers (gasoline, in-club services, core e-commerce, digital origination).
     - `GAAP_BY_YEAR`: Map of 3 fiscal years (2022, 2023, 2024) to complete audited income statements.
     - `STEP_SUMMARIES`: Map of step numbers 1–5 to narrative summaries.
     - `WAYFINDER_TICKETS`: Array of 6 ticket summaries (tickets 001–006).

3. **Data Discrepancy & Drift Identified:**
   - In [`index.html`](../../index.html), historical category figures in `CATEGORY_DATA` currently diverge from `data/costco_revenue_breakdown.json`:
     - Foods & Sundries FY22 is set to `88,948` (should be `85,629`); FY23 is set to `96,936` (should be `96,175`).
     - Non-Foods FY22 is set to `60,876` (should be `61,100`); FY23 is set to `60,292` (should be `60,865`).
     - Ancillary FY22 is set to `43,443` (should be `46,474`); FY23 is `48,693` (correct).
     - Fresh Foods FY22 is set to `29,463` (should be `29,527`); FY23 is set to `31,789` (should be `31,977`).
   - In `GEOGRAPHY_DATA` and table summaries, real estate ownership counts sum to 704 owned buildings instead of 703 owned land and buildings per Item 2.

---

## 4. Existing Modules & Functions to Reuse

Downstream implementers MUST reuse and extend existing functions rather than creating shadow implementations or duplicating logic.

### 4.1 Verification CLI & Model Engine (`src/costco_revenue_model.mjs`)

| Verbatim Export / Function | Line Numbers | Signature & Parameters | Input / Return Contract | Reuse / Extension Plan |
| :--- | :--- | :--- | :--- | :--- |
| `verifyFinancialDataset(data)` | L470–L624 | `(data: object) => object` | Takes parsed JSON dataset. Validates company metadata, GAAP income statement identities, historical comparison, category disaggregation, and geographic segments. Returns structured metrics. | **REUSE AS-IS.** Authoritative ground-truth GAAP financial validation. |
| `verifyWayfinderArtifacts(rawOptions)` | L682–L830 | `(rawOptions?: object) => object` | Audits `wayfinder/map.md` and all 6 tickets. Validates required H2 sections, non-empty content, resolved status, and rejects bare ticket labels. | **REUSE AS-IS.** Governance validation for Wayfinder decision records. |
| `verifyResearchMonograph(rawOptions)` | L831–L906 | `(rawOptions?: object) => object` | Checks `research/costco_revenue_architecture.md` for byte length $\ge 8000$, CIK `0000909832`, Form 10-K citations, and key GAAP figures. | **REUSE AS-IS.** Grounded research validation. |
| `verifyCorporateWebReport(rawOptions)` / `verifyIndexHtml` | L907–L1028 | `(rawOptions?: object \| string) => object` | Audits `index.html` for Dreamcore markers (prohibited), required corporate DOM IDs, TOC anchor links, brand hex tokens, key figures, and ticket references. | **EXTEND.** Add assertions for: (1) zero raw curly-brace specification tokens (`{Net Sales}`, `{Membership Fees}`, etc.), (2) presence of required SVG and drill-down CSS selectors (`.polar-grid-ring`, `.polar-axis-spoke`, `.polar-sector-label`, `.polar-center-title`, `.drilldown-meta-grid`, `.sim-output-banner.is-breach`), and (3) presence of all audited multi-year Note 11 category figures. |
| `loadAndVerifyCostcoModel(rawOptions)` | L1058–L1139 | `(rawOptions?: object \| string) => object` | Central orchestrator. Normalizes options, runs all verification sub-routines, computes telemetry (`elapsedMs`, `rssMb`), and returns consolidated report. | **REUSE AS-IS.** Automatically incorporates enhanced `verifyCorporateWebReport`. |
| `parseCliArgs(argv)` | L1149–L1172 | `(argv: string[]) => object` | Parses CLI flags (`--verify`, `--root`, `--data`, `--map`, `--tickets`, `--research`, `--html`). | **REUSE AS-IS.** Preserves all CLI options. |

### 4.2 Web Application Controllers & Renderers (`index.html`)

| Verbatim Function | Line Numbers | Parameters | Current Operational Behavior | Required Extension / Polish |
| :--- | :--- | :--- | :--- | :--- |
| `degToRad(deg)` | L2141–L2143 | `(deg: number) => number` | Converts degrees to radians with -90° offset (0° = 12 o'clock). | **REUSE AS-IS.** Clean math primitive. |
| `polarPoint(cx, cy, r, deg)` | L2145–L2151 | `(cx, cy, r, deg) => {x, y}` | Computes Cartesian coordinates from polar radius and angle. | **REUSE AS-IS.** Clean geometry primitive. |
| `describeAnnularSector(cx, cy, rInner, rOuter, startDeg, endDeg)` | L2153–L2180 | `(cx, cy, rInner, rOuter, startDeg, endDeg) => string` | Computes SVG path `d` string for annular wedge sectors. | **REUSE AS-IS.** Handles concentric and angle-based sectors properly. |
| `formatUsdM(num)` | L2182–L2184 | `(num: number) => string` | Formats millions into `$...,...M`. | **REUSE AS-IS.** Standardized formatting. |
| `renderPolarGrid(cx, cy, maxR, ringLabels, spokeAngles)` | L2186–L2210 | `(cx, cy, maxR, ringLabels, spokeAngles) => string` | Emits SVG circles (`.polar-grid-ring`), labels (`.polar-axis-label`), and spokes (`.polar-axis-spoke`). | **REUSE & ENHANCE.** Connect with new CSS styles; adjust viewBox margins and labels to prevent viewport edge clipping. |
| `renderPolarCategories()` | L2212–L2360 | `() => void` | Renders Note 11 category polar rose, updates `#polar-category-drilldown`, `#polar-cat-caption`, and `#cat-table-body`. | **EXTEND.** Reconcile multi-year Note 11 figures; remove raw curly braces; attach keyboard accessibility (`Enter`/`Space`) to sector elements; add legend for 3-year overlay mode. |
| `renderPolarGeography()` | L2369–L2493 | `() => void` | Renders geographic segment polar chart, updates `#polar-geography-drilldown`, `#polar-geo-caption`, and `#geo-table-body`. | **EXTEND.** Reconcile Item 2 real estate ownership metrics (`703` owned / `187` leased); remove curly braces and `//` pseudo-code; attach keyboard navigation. |
| `renderPolarFlywheel()` | L2502–L2635 | `() => void` | Renders dual-ring revenue vs. profit asymmetry chart or ancillary sub-driver rose; updates `#polar-flywheel-drilldown` and caption. | **EXTEND.** Remove raw `{Net Sales}` and `{Membership Fees}` tokens from SVG labels, captions, and drilldown cards; attach keyboard navigation. |
| `setActiveStep(stepNum, shouldScroll)` | L2641–L2669 | `(stepNum: number, shouldScroll: boolean) => void` | Updates active step buttons, toggles `.is-active-step` on cards, and updates `#step-focus-banner`. | **EXTEND.** Remove promotional metaphors and raw tokens from `#step-focus-banner`; synchronize with TOC step clicks. |
| `renderGaapWaterfall()` | L2676–L2824 | `() => void` | Populates `#gaap-waterfall-tbody` based on selected fiscal year. | **EXTEND.** Replace raw curly braces (`{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`) in table row labels and ratio strings with plain technical English. |
| `updateSimulator()` | L2826–L2867 | `() => void` | Reads margin/SG&A/fee sliders, calculates financial outputs, toggles `.is-breach` on `#sim-output-banner`. | **EXTEND.** Remove raw tokens and promotional metaphors from breach and status banners; pair with `.is-breach` CSS styles. |
| `renderTicketInspector()` | L2874–L2891 | `() => void` | Renders selected Wayfinder ticket into `#wayfinder-active-card`. | **EXTEND.** Replace `var(--emerald-audit)` with `var(--cat-emerald)`; remove raw tokens and `//` separators from ticket titles and summaries. |
| `init()` | L2893–L3044 | `() => void` | Attaches event listeners across all interactive controls and triggers initial render cycle. | **EXTEND.** Wire up active `IntersectionObserver` scroll-spy on `#table-of-contents`; wire up sublink click synchronization; attach keyboard handlers for SVG sectors. |

---

## 5. Required Code Edits, Additions & Caller Graph

```mermaid
flowchart TD
    subgraph CSS Stylesheet Edits (index.html lines 9-995)
        CSS_POLAR[".polar-grid-ring, .polar-axis-spoke,\n.polar-center-title, .polar-center-sub,\n.polar-sector-label, .polar-axis-label"]
        CSS_DRILL[".drilldown-eyebrow, .drilldown-title,\n.drilldown-copy, .drilldown-meta-grid,\n.drilldown-meta-item"]
        CSS_BREACH[".sim-output-banner.is-breach\n(Crimson alert styles)"]
        CSS_A11Y[".polar-sector-path:focus-visible\n(Keyboard focus ring)"]
        CSS_VAR["Token Fix: replace var(--emerald-audit)\nwith var(--cat-emerald)"]
    end

    subgraph Static HTML Prose Edits (index.html lines 996-1850)
        HTML_EYE["Section Eyebrows: replace // with ·\n(Section 01 · Executive Summary, etc.)"]
        HTML_TOKENS["Body Copy & KPI Cards: remove raw\n{Net Sales}, {Membership Fees}, etc."]
        HTML_STEPS["Steps 1-5 Headings & Copy: replace\npromotional metaphors with plain technical English"]
        HTML_TABS["Ticket Tabs: replace // dividers with ·"]
    end

    subgraph JavaScript Data & Controller Edits (index.html lines 1851-3045)
        JS_DATA["Reconcile CATEGORY_DATA & GEOGRAPHY_DATA\nwith data/costco_revenue_breakdown.json"]
        JS_STRINGS["Clean string templates in STEP_SUMMARIES,\nWAYFINDER_TICKETS, drilldown innerHTML"]
        JS_A11Y["Add keydown (Enter/Space) event listeners\nto SVG polar sectors"]
        JS_SPY["Add IntersectionObserver scroll-spy\nto #table-of-contents"]
        JS_TOC_SYNC["Sync .toc-sublink and parent .toc-link\nwith stepper controller"]
    end

    subgraph Verification Engine Edits (src/costco_revenue_model.mjs)
        VERIF_TOKENS["Check for zero raw curly brace tokens\nin index.html"]
        VERIF_CSS["Check for required SVG & drill-down\nCSS selectors in index.html"]
        VERIF_DATA["Check for multi-year Note 11\nreconciled figures in index.html"]
    end

    subgraph Documentation Edits
        README_PROSE["README.md: remove raw curly braces;\nalign with straightforward technical English"]
        WF_TICKET["wayfinder/tickets/ticket-006.md & map.md:\nupdate with visual polish & data reconciliation"]
    end
```

### 5.1 Component-by-Component Impact Register

| Target File | Component / Line Range | Upstream Trigger / Caller | Downstream Consumer | Required Modifications |
| :--- | :--- | :--- | :--- | :--- |
| [`index.html`](../../index.html) | `<style>` block (L9–L995) | Browser layout engine | All rendered UI elements | 1. Add `.polar-grid-ring` (`fill: none; stroke: var(--border-strong); stroke-dasharray: 3 3;`).<br>2. Add `.polar-axis-spoke` (`stroke: var(--border-strong); stroke-dasharray: 2 2;`).<br>3. Add `.polar-center-title` & `.polar-center-sub` (centered, monospace, proper font sizes).<br>4. Add `.polar-sector-label` & `.polar-axis-label` typography.<br>5. Add `.drilldown-eyebrow`, `.drilldown-title`, `.drilldown-copy`, `.drilldown-meta-grid`, `.drilldown-meta-item`.<br>6. Add `.sim-output-banner.is-breach` (Costco Crimson `#E31837` border and alert background).<br>7. Add `.polar-sector-path:focus-visible` outline for keyboard navigation. |
| [`index.html`](../../index.html) | Static HTML markup (L996–L1850) | Browser DOM parser | Reader & screen readers | 1. Remove all `{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}` tokens; use natural plain-spoken technical terms.<br>2. Replace all `//` pseudo-code dividers in section eyebrows, step headers, and ticket tabs with clean typographic dots (`·`).<br>3. Replace promotional metaphors in Steps 1–5 with direct, straightforward technical English describing the physical accounting and operations. |
| [`index.html`](../../index.html) | Embedded JS Data (L1856–L2138) | `init()`, `renderPolar*()` | Drill-down cards, tables, SVG charts | 1. Reconcile `CATEGORY_DATA` sales and share figures for FY2022 and FY2023 with Note 11.<br>2. Reconcile `GEOGRAPHY_DATA` real estate figures (703 owned / 187 leased).<br>3. Remove raw tokens from `FLYWHEEL_ASYMMETRY_DATA`, `ANCILLARY_ROSE_DATA`, `STEP_SUMMARIES`, and `WAYFINDER_TICKETS`. |
| [`index.html`](../../index.html) | SVG Renderers & Drilldowns (L2186–L2635) | User interactions, `init()` | SVG DOM stages, drilldown containers | 1. In `renderPolarCategories`, `renderPolarGeography`, `renderPolarFlywheel`: replace raw tokens in SVG texts, drilldown cards, and table rows.<br>2. Expand SVG viewport/padding to prevent label clipping at 390px–1440px.<br>3. Attach `keydown` listeners (`Enter` and `Space`) to all interactive sector elements. |
| [`index.html`](../../index.html) | Navigation & Scroll-Spy (L2641–L3044) | Viewport scrolling, click events | `#table-of-contents`, 5-step stepper | 1. Implement `IntersectionObserver` scroll-spy tracking all 5 sections and sub-anchors, toggling `.is-active` and `aria-current="location"`.<br>2. Ensure clicking `.toc-sublink` activates both the sublink and parent `.toc-link`, and syncs stepper if a step anchor. |
| [`index.html`](../../index.html) | Wayfinder Card Renderer (L2874–L2891) | Ticket tab buttons | `#wayfinder-active-card` | Replace `var(--emerald-audit)` with `var(--cat-emerald)`. Remove raw tokens from rendered ticket details. |
| [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs) | `verifyCorporateWebReport` (L907–L1028) | `loadAndVerifyCostcoModel`, CLI `--verify` | CLI output, automated tests | 1. Add assertion rejecting raw `{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}` tokens in `index.html`.<br>2. Add assertion checking required CSS selectors (`.polar-grid-ring`, `.polar-axis-spoke`, `.polar-sector-label`, `.polar-center-title`, `.drilldown-meta-grid`, `.sim-output-banner.is-breach`).<br>3. Add assertion verifying all audited multi-year Note 11 category figures are present in `index.html`. |
| [`README.md`](../../README.md) | Entire file (L1–L38) | Developer / User inspection | Documentation readers | Remove raw curly brace tokens from headings and bullet points; align descriptions with straightforward technical English. |
| [`wayfinder/tickets/ticket-006.md`](../../wayfinder/tickets/ticket-006.md) & [`wayfinder/map.md`](../../wayfinder/map.md) | Resolution section & ticket summary | Governance audits | Wayfinder lineage readers | Document the visual, geometric, data reconciliation, and technical English refinement. Keep descriptive human-readable links. |

---

## 6. Operational, Performance & Architectural Invariants

| Invariant Parameter | Target Budget | Measured Empirical Baseline | Verification Method | Enforcement Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **Verification Execution Latency** | $\le 250\text{ ms}$ | $12.19\text{ ms}$ (pre-run) / $39.47\text{ ms}$ (live worktree) | `node src/costco_revenue_model.mjs --verify` | Fail-fast error if elapsed time exceeds operational budget. |
| **Verification Memory Footprint (RSS)** | $\le 128\text{ MB}$ | $46.23\text{ MB}$ (pre-run) / $46.31\text{ MB}$ (live worktree) | `process.memoryUsage().rss` in verification report | Fail-fast error if memory exceeds budget. |
| **External Network Calls** | Exactly $0$ | $0$ | Monitored CLI and browser execution | Zero outbound fetch/XHR calls permitted. All styles, fonts, and data must be self-contained. |
| **Browser State Transition Latency** | $\le 16\text{ ms}$ (60 fps frame) | $< 2\text{ ms}$ per UI event | In-memory DOM and SVG string updates | Direct DOM manipulation without heavy external frameworks. |
| **Viewport Responsiveness** | $390\text{px}$ to $1440\text{px}+$ | Responsive card grid & SVG viewBox | Headless browser & manual inspection | Zero horizontal page scrolling; unclipped SVG polar labels. |

---

## 7. Edge Cases, Failure Boundaries & Deterministic Recovery

1. **Edge Case: Raw Curly-Brace Token Leakage in Visible Copy**
   - *Failure Mode:* An author retains `{Net Sales}` or `{Membership Fees}` in body copy or script-rendered templates.
   - *Deterministic Detection:* `verifyCorporateWebReport` scans `index.html` with regex `/\{(Net Sales|Membership Fees|Gross Margin Ceiling|Operating Income Flywheel)\}/` and immediately throws an `{error}` identifying the exact line/token.
2. **Edge Case: Missing or Incomplete SVG / Drill-Down CSS Rules**
   - *Failure Mode:* SVG polar elements render with opaque black circles or invisible axis lines due to missing stylesheet rules.
   - *Deterministic Detection:* `verifyCorporateWebReport` verifies that `.polar-grid-ring`, `.polar-axis-spoke`, `.polar-sector-label`, `.polar-center-title`, `.drilldown-meta-grid`, and `.sim-output-banner.is-breach` are present in `<style>...</style>`.
3. **Edge Case: Note 11 Historical Category Figure Discrepancy**
   - *Failure Mode:* A regression re-introduces the unverified FY2022/FY2023 figures (e.g., `88,948` instead of `85,629`).
   - *Deterministic Detection:* `verifyCorporateWebReport` verifies the exact presence of all 12 audited Note 11 dollar figures.
4. **Edge Case: Mobile Viewport Label Clipping (`390px`)**
   - *Failure Mode:* Outer polar sector callout labels exceed SVG bounding box on narrow screens.
   - *Deterministic Mitigation:* Ensure SVG `viewBox` incorporates sufficient radial margin padding and CSS `.polar-svg` uses `max-width: 100%; height: auto;`.
5. **Edge Case: Keyboard Navigation Trapping or Failure on SVG Elements**
   - *Failure Mode:* Pressing `Space` scrolls the page instead of activating the polar sector, or `Enter` is ignored.
   - *Deterministic Mitigation:* Explicit `keydown` event listener checks `event.key === "Enter" || event.key === " "` and executes `event.preventDefault()` for `Space`, triggering the selection handler.
