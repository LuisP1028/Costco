# System Architecture, Dataflow, Module Decomposition & Execution DAG (`planner-2.1`)

**Run ID:** `20261104T004059-606-j6a7`  
**Branch:** `agent/planner-2.1-20261104T004059-606-j6a7`  
**Planner Role:** `planner-2.1` (System Architecture, Dataflow, Discrete Modules & Execution DAG Planner)  
**Governing Specifications:**
- [`wayfinder/20261104T004059-606-j6a7/refined-specification.md`](./refined-specification.md) (`plan-1` Refined Technical Specification v2.0)
- [`functional_specification_005.md`](../../functional_specification_005.md) (Authoritative Seed Specification 005)
- [`LANGUAGE.md`](../../LANGUAGE.md) (Authoritative System Glossary & Domain Vocabulary)
**Upstream Scanner Syntheses & Peer Blackboard Alignment:**
- [`wayfinder/20261104T004059-606-j6a7/codebase-map.md`](./codebase-map.md) (`codebase-mapper`)
- [`wayfinder/20261104T004059-606-j6a7/api-schemas.md`](./api-schemas.md) (`api-schema-mapper`)
- [`wayfinder/20261104T004059-606-j6a7/installed-libraries.md`](./installed-libraries.md) (`library-installer`)
- [`wayfinder/20261104T004059-606-j6a7/mcp-tools.md`](./mcp-tools.md) (`mcp-provisioner`)
- [`wayfinder/20261104T004059-606-j6a7/library-functions.md`](./library-functions.md) (`function-mapper`)
- Blackboard Coordination Ledger (`seq=#1` through `seq=#14`: `plan-2`, `planner-2.2`, `planner-2.3`, `planner-2.4`, `planner-2.5`)  
**Strict Gate Enforced:** **DO NOT CODE YET.** System architecture, dataflow topology, discrete module/function I/O contracts, and execution DAG only.

---

## 1. Executive Summary & Architectural Mandate

This document defines the complete system architecture, end-to-end runtime and verification dataflows, discrete module boundaries, function input/output contracts, and sequential-versus-parallel Execution Directed Acyclic Graph (DAG) for upgrading Costco Wholesale Corporation's (`NASDAQ: COST`, `CIK: 0000909832`) interactive corporate web report ([`index.html`](../../index.html)), primary-source financial dataset ([`data/costco_revenue_breakdown.json`](../../data/costco_revenue_breakdown.json)), Wayfinder decision lineage ([`wayfinder/map.md`](../../wayfinder/map.md), [`wayfinder/tickets/ticket-006.md`](../../wayfinder/tickets/ticket-006.md)), repository documentation ([`README.md`](../../README.md)), and deterministic verification engine ([`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs)).

In strict compliance with [`RULE[user_global]`](../../LANGUAGE.md), this architecture **reuses and extends existing project modules in-place** rather than creating duplicate files or shadow verification scripts, and enforces all five pillars of [`functional_specification_005.md`](../../functional_specification_005.md):

1. **Pillar 1 (`AC-01`) — Corporate Animated SVG Elements & Motion Resilience:** Institutional 4-node animated SVG Revenue & Operating Profit Flywheel schematic (`#svg-corporate-flywheel-hero`) in `#section-executive-summary` synchronized with the 5-step walkthrough, step-level animated SVG micro-schematics (`#svg-step-1`..`#svg-step-5`) inside `#step-1`..`#step-5`, animated polar chart sweep/selection rings in `#svg-polar-categories`, `#svg-polar-geography`, and `#svg-polar-flywheel`, an accessible pause/play toggle (`#motion-toggle-btn` / `[data-motion-toggle]`), and automatic pause under `@media (prefers-reduced-motion: reduce)`.
2. **Pillar 2 (`AC-02`) — High-Density Halftone & Ordered Bayer Dithering Effects:** Self-contained, zero-network global SVG `<defs>` `<pattern>` atlas (`#dither-bayer-navy`, `#dither-bayer-crimson`, `#dither-halftone-slate`, `#dither-polar-engraving`) and CSS ordered-Bayer/halftone accent plates (`.dither-accent-band`, `.dither-header-plate`) in Costco Crimson (`#E31837`), Executive Navy (`#005DAA`), and Slate Ink (`#0F172A`) that never sit behind unbacked text ($\ge 4.5:1$ normal text contrast, $\ge 7:1$ primary metrics) and introduce zero prohibited Dreamcore markers.
3. **Pillar 3 (`AC-03`) — Simplified, Straightforward English Explanations & Plain-English Notes:** Dedicated `.plain-english-note` callout boxes in all 5 report sections and `.chart-reading-note` boxes in all 3 polar chart panels explaining the `10.92%` markup cap, `104.15%` supplier-financed inventory float, `52.00%` membership fee share of operating income, and `$2,804M` Executive 2% contra-revenue; complete elimination of algebraic/code shorthand (`R_total`, `OpInc ($9,285M) = Merch Contrib`, `Area √r (Coxcomb)`, `Linear Radius r`, `Share Angle θ_i`, `wayfinderAudit.valid === true`, `Negative Working-Capital Float`); and plain-English rewrites of `merchandise_categories[].role_in_flywheel` in [`data/costco_revenue_breakdown.json`](../../data/costco_revenue_breakdown.json).
4. **Pillar 4 (`AC-04`) — High-Legibility Polar Graphs, Halo Callouts, Legends & Companion Tables:** Padded polar SVG coordinate space (`viewBox="-80 -44 560 488"`), halo-stroked sector labels (`.polar-sector-label >= 12px`, `paint-order: stroke fill; stroke: #FFFFFF; stroke-width: 3.5px`), halo-stroked scale/sub-labels (`.polar-axis-label >= 10.5px`), enlarged center hub (`r >= 40px`, `.polar-center-title >= 12.5px`, `.polar-center-sub >= 10px`), non-colliding diagonal ring scale offset (`labelAngleDeg = 25` in `angle` mode), Dual-Ring high-contrast callout badges, explicit HTML visual legends (`.polar-html-legend`), and companion tables at `font-size: 12.5px–13px` with `8px 10px` cell padding.
5. **Pillar 5 (`AC-05`) — 100% Screen-Size-Agnostic Responsive Architecture & Keyboard Accessibility:** Fluid `clamp()` typography and spacing, `minmax(0, 1fr)` CSS Grid overflow containment, adaptive `#table-of-contents` at `<= 1080px`, single-column polar stacking at `<= 1120px`, zero horizontal page overflow (`document.documentElement.scrollWidth <= window.innerWidth`) across `320px`, `375px`, `390px`, `768px`, `1024px`, `1280px`, `1440px`, `1920px`, and `2560px` viewports, and full bidirectional keyboard navigation (`tabindex="0"`, `Enter`/`Space`, `ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown`) across interactive table rows (`[data-cat-row]`, `[data-geo-row]`), polar sectors (`[data-cat-sector]`, `[data-geo-sector]`, `[data-fly-sector]`), step buttons (`[data-step-btn]`), and ticket tabs (`[data-ticket-tab]`).

---

## 2. Authoritative Domain Vocabulary & First-Principles Physical Modeling

### 2.1 `LANGUAGE.md` Domain & Evaluation Alignment
All modules, data structures, and verification gates strictly enforce [`LANGUAGE.md`](../../LANGUAGE.md):
- **`{Net Sales}` (`$249,625M` in FY2024, `98.10%` of Consolidated Total Revenue):** Disaggregated per Note 11 across `Foods and Sundries` (`$101,463M`, `40.65%`), `Non-Foods` (`$63,973M`, `25.63%`), `Warehouse Ancillary and Other Businesses` (`$49,969M`, `20.02%`), and `Fresh Foods` (`$34,220M`, `13.71%`), net of returns and `$2,804M` Executive 2% reward contra-revenue.
- **`{Membership Fees}` (`$4,828M` in FY2024, `1.90%` of Consolidated Total Revenue):** Recurring annual subscription fees across `76.2M` paid members (`63.7M` Gold Star + `12.5M` Business; `136.8M` total cardholders; `35.4M` paid Executive members generating `73.3%` of worldwide sales) recognized ratably over 12 months under `ASC 606` against `$2,501M` Deferred membership fees liability (`92.9%` U.S./Canada and `90.5%` worldwide renewal rates).
- **`{Gross Margin Ceiling}` (`10.92%` in FY2024, `$27,267M` Merchandise Gross Margin):** Structural pricing discipline capping merchandise markups inside `[10.0%, 11.5%]` (`$249,625M` Net Sales minus `$222,358M` Merchandise Costs = `$27,267M`).
- **`{Operating Income Flywheel}` (`$9,285M` Operating Income $\rightarrow$ `$7,367M` Net Income):** Merchandise Gross Margin (`$27,267M`, `10.92%`) minus SG&A (`$22,810M`, `9.14%`) leaves `+$4,457M` (`48.00%` of Operating Income) in Net Merchandise Operating Profit, enabling `$4,828M` (`52.00%` of Operating Income) in Membership Fees to drive `$9,285M` Consolidated Operating Income (`3.65%` margin) and `$7,367M` Net Income (`$16.56` diluted EPS), reinforced by `12.60x` inventory turnover (`~28.97` DIO vs. `~31.88` DPO) where `$19,421M` Accounts Payable finances `104.15%` of `$18,647M` Merchandise Inventories (`+$774M` supplier-financed float).
- **Evaluation Parameters:** Zero `{errors}` (zero leaked raw `{...}` braces, zero `//` pseudo-code dividers, zero `R_total`/`θ_i`/`wayfinderAudit.valid === true` shorthand, zero promotional clichés, zero Dreamcore markers, zero console/page errors, zero clipped/colliding SVG labels, zero horizontal viewport overflow), 100% `{correctness}`, end-to-end `{functionality}`, measurable `{correct required outputs}`, and `{sufficient}` architectural specification.

### 2.2 First-Principles Physical, Memory, Latency & Frame-Rate Model (`RULE[user_global]`)

| System Dimension | Physical / Algorithmic Model | Empirical Baseline | Target Budget (`Spec 005 §4`) | Architectural Guarantee |
| :--- | :--- | :--- | :--- | :--- |
| **External Network Roundtrips** | $N_{\text{net}} = 0$. All HTML, CSS, inline SVG `<defs>` patterns, animated SVG schematics, and primary-source JSON constants are embedded locally. | `0` requests | `0` requests | **100% offline deterministic execution** in both browser (`file://` / local HTTP) and Node.js CLI (`fs.readFileSync`). |
| **CLI Verification Wall-Clock Latency** | Single-pass $O(B)$ string/regex & JSON inspection over `data/costco_revenue_breakdown.json` (`~9.6 KB`), `wayfinder/map.md` + 6 tickets (`~28 KB`), `research/costco_revenue_architecture.md` (`40.1 KB`), and `index.html` (`~175 KB` post-refinement). | `12.78 ms – 16.98 ms` | $\le 250\text{ ms}$ | Reusing `resolvedHtml`, `lowerHtml`, `declaredIds` Set, and `combinedCss` in a single pass adds $< 2\text{ ms}$, maintaining `~15–22 ms` total latency ($> 11\times$ faster than budget). |
| **CLI Memory Footprint (RSS)** | V8 ESM isolate baseline (`~42 MB`) + UTF-8 file buffers (`< 0.5 MB` total working set). | `46.66 MB – 47.00 MB` | $\le 128\text{ MB}$ | Zero external npm runtime imports; RSS remains `< 52 MB` ($> 59\%$ headroom below ceiling). |
| **Browser Interactive & Animation Frame Time** | GPU compositor-only animations (`stroke-dashoffset`, `opacity`, `transform` with `transform-box: fill-box`); $O(1)$ delegated event handling on polar `<svg>` and companion `<tbody>`; `requestAnimationFrame`-gated scroll-spy fallback. | `< 1.5 ms / frame` | $\le 16.0\text{ ms}$ (`60fps`) | Eliminates main-thread layout thrashing during scrolling and SVG animation ticks; pauses immediately via `SVGSVGElement.pauseAnimations()` + `.is-motion-paused` class. |
| **Dither Pattern GPU Tile Memory** | Shared global `<svg width="0" height="0"><defs>` atlas with $8\times 8$ and $6\times 6$ `userSpaceOnUse` vector `<pattern>` tiles instead of full-screen `<feTurbulence>` filter shaders. | `< 64 KB` GPU texture | Zero frame drop at `2560x1440` | Avoids `8–15 MB` full-viewport raster filter buffers on 4K/5K displays while delivering crisp vector Bayer/halftone stippling at any DPR. |

---

## 3. End-to-End System Architecture & Dataflow Topology

```mermaid
flowchart TD
    subgraph Storage["Layer 1: Persistent Primary-Source Artifacts (Offline Disk)"]
        JSON_DS["data/costco_revenue_breakdown.json\n(FY2022–FY2024 Form 10-K Dataset\n+ Plain-English role_in_flywheel)"]
        RES_MD["research/costco_revenue_architecture.md\n(40.1 KB SEC Form 10-K Monograph — Read-Only)"]
        WF_DOCS["wayfinder/map.md & wayfinder/tickets/ticket-001..006.md\n(Canonical Decision Map & 6 Resolved Tickets)"]
        README_DOC["README.md\n(Executive Overview & Operational Guide)"]
        HTML_DOC["index.html\n(Self-Contained Corporate Interactive Report)"]
    end

    subgraph ClientApp["Layer 2: Client-Side Browser Runtime (index.html — <=16ms Frame Budget, 0 Network)"]
        M2_DITHER["Module M2: Shared SVG <defs> Dither Atlas & CSS Plates\n(#dither-bayer-navy, #dither-bayer-crimson,\n#dither-halftone-slate, #dither-polar-engraving)"]
        M3_DATA["Module M3: Inlined Primary-Source Store & Plain-English Notes\n(CATEGORY_DATA, GEOGRAPHY_DATA, FLYWHEEL_ASYMMETRY_DATA,\nANCILLARY_ROSE_DATA, GAAP_BY_YEAR, STEP_SUMMARIES,\nWAYFINDER_TICKETS + .plain-english-note / .chart-reading-note)"]
        M1_ANIM["Module M1: Corporate Animated SVG & Motion Controller\n(#svg-corporate-flywheel-hero, #svg-step-1..5,\nPolar Sweep Rings, #motion-toggle-btn,\ninitMotionControl, setMotionPaused, syncAnimatedFlywheelHighlight)"]
        M4_POLAR["Module M4: High-Legibility Polar & Table Renderer\n(viewBox='-80 -44 560 488', 3.5px White Halo Strokes,\nrenderPolarCategories, renderPolarGeography, renderPolarFlywheel,\nrenderPolarRingLabels w/ labelAngleDeg=25 in angle mode)"]
        M5_RESP["Module M5: Screen-Size-Agnostic Grid & Keyboard A11y Controller\n(Fluid clamp(), minmax(0,1fr), Collapsible/Adaptive TOC,\nbindInteractiveTableRows, bindTablistKeyboardNav, initScrollSpy)"]

        HTML_DOC --> M2_DITHER & M3_DATA
        M2_DITHER --> M1_ANIM & M4_POLAR
        M3_DATA --> M1_ANIM & M4_POLAR & M5_RESP
        M1_ANIM <-->|"setActiveStep(1..5) <-> Node 1..4 Highlight"| M5_RESP
        M4_POLAR <-->|"Bidirectional Sector <-> Table Row & Drilldown Sync"| M5_RESP
    end

    subgraph VerifyCLI["Layer 3: Deterministic Verification Engine (src/costco_revenue_model.mjs — <=250ms, <=128MB)"]
        M6_ORCH["Module M6: loadAndVerifyCostcoModel(rawOptions)"]
        V_DATA["verifyFinancialDataset(dataset)\n(GAAP Conservation + Zero Promotional Clichés)"]
        V_WF["verifyWayfinderArtifacts(opts)\n(5 H2 Sections + Descriptive Links + 6 Tickets)"]
        V_RES["verifyResearchMonograph(opts)\n(>=8KB + CIK/10-K/ASC 606 + Key Figures)"]
        V_HTML["verifyCorporateWebReport(opts) / verifyIndexHtml\n(AC-01 Animated SVG + AC-02 Bayer Dither + AC-03 Plain English\n+ AC-04 Halo Typography/ViewBox + AC-05 Responsive/A11y)"]

        JSON_DS --> V_DATA
        WF_DOCS --> V_WF
        RES_MD --> V_RES
        HTML_DOC --> V_HTML
        M6_ORCH --> V_DATA & V_WF & V_RES & V_HTML
    end

    subgraph HeadlessAudit["Layer 4: Live Multi-Viewport & A11y Verification Harness (Playwright / Puppeteer)"]
        PW_SUITE["Headless Chromium Verification\n- Viewports: 320, 375, 390, 768, 1024, 1280, 1440, 1920, 2560px\n- scrollWidth <= innerWidth (0px horizontal overflow)\n- Bounding-box label collision & clipping check (0 overlaps)\n- Reduced-motion media emulation & keyboard Enter/Space/Arrow audit"]
        HTML_DOC --> PW_SUITE
    end
```

### 3.1 Runtime State Synchronization & Bidirectional Dataflow
Within [`index.html`](../../index.html), user interactions trigger deterministic, synchronous state transitions without external fetches:

1. **Executive Flywheel Schematic $\leftrightarrow$ 5-Step Walkthrough Synchronization:**
   - Selecting any step button (`[data-step-btn="1..5"]`), clicking `#step-prev-btn` / `#step-next-btn`, pressing `ArrowLeft` / `ArrowRight` on the step tablist, clicking a TOC step sublink (`[data-toc-step="1..5"]`), or clicking an interactive node (`[data-flywheel-node="1..4"]`) inside `#svg-corporate-flywheel-hero` invokes `setActiveStep(stepNum, shouldScroll)` and `syncAnimatedFlywheelHighlight(stepNum)`:
     - **Step 1 (`$4,828M` Membership Fees):** Highlights **Node 1** (`Paid Membership Base: 76.2M Paid Members, 92.9% US/CA Renewal, $4,828M Fees`).
     - **Step 2 (`< 4,000` SKUs & `$249,625M` Net Sales) & Step 3 (`$49,969M` Ancillary & `719` Gas Stations):** Highlights **Node 2** (`High-Velocity Warehouse & Ancillary Sales: $249,625M Net Sales across 890 Clubs`).
     - **Step 4 (`10.92%` Gross Margin Cap & `104.15%` AP-to-Inventory Coverage):** Highlights **Node 3** (`10.92% Gross Margin Ceiling & 104.15% Supplier-Financed Inventory: $27,267M GM - $22,810M SG&A = $4,457M Merch Profit; +$774M Float`).
     - **Step 5 (`52.00%` Fee Share of `$9,285M` Operating Income $\rightarrow$ `$7,367M` Net Income):** Highlights **Node 4** (`Consolidated Operating & Net Income: $4,457M Merch [48.00%] + $4,828M Fees [52.00%] = $9,285M OpInc -> $7,367M Net Income`).
2. **Polar SVG Sectors $\leftrightarrow$ Companion Table Rows $\leftrightarrow$ Drill-Down Card Synchronization:**
   - In `#polar-chart-categories` (`catState`) and `#polar-chart-geography` (`geoState`), activating either an SVG sector (`[data-cat-sector="i"]`, `[data-geo-sector="i"]`) or a companion table row (`[data-cat-row="i"]`, `[data-geo-row="i"]`) via pointer click or keyboard (`Enter`, `Space`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) updates `selectedIndex = i`, re-renders/updates `.is-selected` on the SVG sector, updates `.is-highlighted` and `aria-selected="true"` on the companion table row, refreshes the `.polar-drilldown-card` (`aria-live="polite"`), and restores keyboard focus to the originating interactive element (`sector` or `row`) without page scroll jumps (`focus({ preventScroll: true })`).
3. **Global Motion State Synchronization (`prefers-reduced-motion` & `#motion-toggle-btn`):**
   - `initMotionControl()` reads `window.matchMedia("(prefers-reduced-motion: reduce)")` at startup and binds a `change` listener plus a `click` listener on `#motion-toggle-btn` (`[data-motion-toggle]`).
   - Calling `setMotionPaused(paused)` toggles `document.documentElement.classList.toggle("is-motion-paused", paused)`, updates `#motion-toggle-btn` (`aria-pressed="true|false"` and label `"Resume SVG Animations"` / `"Pause SVG Animations"`), and iterates over `document.querySelectorAll("svg")` to invoke `svg.pauseAnimations()` or `svg.unpauseAnimations()`.

---

## 4. Discrete Modules & Function Responsibilities

To prevent architectural duplication and merge conflicts, the system is decomposed into **six discrete modules (`M1`–`M6`)** mapped directly to existing files and line anchors in [`codebase-map.md`](./codebase-map.md).

### 4.1 Module Overview Matrix

| Module ID | Module Name | Target File(s) & Line Anchors | Governing Pillar | Primary Owner (Stage 3 / Stage 4) |
| :--- | :--- | :--- | :--- | :--- |
| **`M1`** | **Corporate Animated SVG & Motion Control Engine** | `index.html` (Header L1165–1187, Section 01 L1358, Section 03 L1648–1859, JS L2424–2910 & L3248–3394) | Pillar 1 (`AC-01`) | `implementer-1` / `tester-1` |
| **`M2`** | **Halftone & Ordered Bayer Dithering Pattern Atlas** | `index.html` (CSS `<style>` L39–454, Global SVG `<defs>` top of `<body>` L1156, Polar & Step Card headers) | Pillar 2 (`AC-02`) | `implementer-2` / `tester-2` |
| **`M3`** | **Straightforward English Editorial, Note Boxes & Dataset Layer** | `data/costco_revenue_breakdown.json` (L75, L94, L121, L136), `index.html` (L1330–1995, L2027–2315, L2917–3129), `wayfinder/map.md`, `wayfinder/tickets/ticket-006.md`, `README.md` | Pillar 3 (`AC-03`) | `implementer-3` / `tester-3` |
| **`M4`** | **High-Legibility Polar Coordinate & Companion Table Engine** | `index.html` (Polar CSS L554–786, Polar HTML L1375–1589, Polar JS L2318–2875) | Pillar 4 (`AC-04`) | `implementer-4` / `tester-4` |
| **`M5`** | **Screen-Size-Agnostic Responsive Layout & Keyboard A11y Controller** | `index.html` (Fluid CSS `clamp()` & Media Queries L195–385 & L1115–1153, Keyboard JS L2396–2414 & L3138–3394) | Pillar 5 (`AC-05`) | `implementer-5` / `tester-5` |
| **`M6`** | **Deterministic CLI Verification & Headless Audit Engine** | `src/costco_revenue_model.mjs` (L119–216, L467–515, L1013–1200) | Requirement 3.6 (`AC-01..AC-05`) | `implementer-4` (or `implementer-1`) & `implementer-5` / `tester-1..5` |

---

### 4.2 Detailed Function Contracts & Input/Output Data Structures

#### Module `M1`: Corporate Animated SVG & Motion Control Engine (`index.html`)

1. **`setMotionPaused(paused: boolean): boolean`**
   - **Responsibility:** Deterministically pauses or resumes all CSS keyframe animations and SMIL SVG animations across the document.
   - **Input:** `paused: boolean` (`true` to pause all animations into high-contrast static states; `false` to resume 60fps playback).
   - **Side Effects & Output:**
     - Toggles class `is-motion-paused` on `document.documentElement` (`<html>`) and `document.body`.
     - Sets `aria-pressed` (`"true"` or `"false"`) and visible label (`"Resume Animations"` / `"Pause Animations"`) on `#motion-toggle-btn` (`[data-motion-toggle]`).
     - Calls `svgEl.pauseAnimations()` or `svgEl.unpauseAnimations()` on every `<svg>` element in the DOM (`SVGSVGElement` root, per `planner-2.3` finding `seq=#11`).
     - Returns the resulting boolean `isMotionPaused` state.

2. **`initMotionControl(): void`**
   - **Responsibility:** Initializes reduced-motion detection (`window.matchMedia("(prefers-reduced-motion: reduce)")`), binds media-query change listeners, and wires the `#motion-toggle-btn` click handler.
   - **Input:** None (reads browser `matchMedia` state and `#motion-toggle-btn` DOM node).
   - **Output:** `void`.

3. **`syncAnimatedFlywheelHighlight(stepNum: number): void`**
   - **Responsibility:** Synchronizes the active node and flow connector highlight inside `#svg-corporate-flywheel-hero` with the active step (`1..5`) in `#section-five-steps`.
   - **Input:** `stepNum: number` (`1 | 2 | 3 | 4 | 5`).
   - **Mapping Contract:**
     - `stepNum === 1` $\rightarrow$ active flywheel node `1` (`Paid Membership Base: $4,828M`),
     - `stepNum === 2` or `stepNum === 3` $\rightarrow$ active flywheel node `2` (`Warehouse & Ancillary Net Sales: $249,625M`),
     - `stepNum === 4` $\rightarrow$ active flywheel node `3` (`10.92% Gross Margin Cap & 104.15% AP-to-Inventory Float`),
     - `stepNum === 5` $\rightarrow$ active flywheel node `4` (`$9,285M Operating Income [48% Merch / 52% Fees] -> $7,367M Net Income`).
   - **Output:** Updates `.is-active-node` and `.is-active-flow` classes on `#svg-corporate-flywheel-hero` sub-elements and updates `#flywheel-hero-status` readout text.

4. **Static/Dynamic Step SVG Micro-Schematics (`#svg-step-1`..`#svg-step-5` inside `#step-1`..`#step-5`):**
   - **Responsibility:** Visualizes each step's physical and accounting mechanism via inline corporate animated SVG schematics:
     - `#svg-step-1`: Membership Card & 12-Month Ratable `ASC 606` Recognition Bar (`$2,501M` Deferred $\rightarrow$ `$4,828M` Earned; `92.9%` U.S./Canada Renewal).
     - `#svg-step-2`: `< 4,000` SKU Depot-to-Floor Cross-Docked Pallet Flow (`>$62M/SKU`, `~30%+` Kirkland Signature `+36 bps`).
     - `#svg-step-3`: `719` Gas Station Canopy (`~$30B`) + Pharmacy/Optical (`~$20B`) + E-Commerce & Costco Logistics (`+16%` comp) Repeat-Visit Loop.
     - `#svg-step-4`: `10.92%` Gross Margin Ceiling Cap vs. `104.15%` Accounts Payable (`$19,421M`) to Inventory (`$18,647M`) Balance Gauge (`12.60x` turn, `+$774M` float).
     - `#svg-step-5`: Two-Pillar Operating Income Conversion Waterfall (`$4,457M` Net Merch Profit `48.00%` + `$4,828M` Membership Fees `52.00%` = `$9,285M` Operating Income $\rightarrow$ `$7,367M` Net Income).

---

#### Module `M2`: Halftone & Ordered Bayer Dithering Pattern Atlas (`index.html`)

1. **Global Inline SVG `<defs>` Pattern Atlas (`#svg-global-dither-defs`):**
   - **Responsibility:** Provides zero-network, vector-crisp ordered Bayer $4\times 4$ / $8\times 8$ and halftone stipple `<pattern>` definitions at the top of `<body>` (referenced via `fill="url(#...)"` across `#svg-corporate-flywheel-hero`, `#svg-polar-categories`, `#svg-polar-geography`, `#svg-polar-flywheel`, and `#svg-step-1`..`#svg-step-5`):
     - `#dither-bayer-navy`: $8\times 8$ `userSpaceOnUse` ordered Bayer matrix in Costco Executive Navy (`#005DAA`, `fill-opacity: 0.10–0.22`).
     - `#dither-bayer-crimson`: $8\times 8$ `userSpaceOnUse` ordered Bayer matrix in Costco Crimson (`#E31837`, `fill-opacity: 0.10–0.22`).
     - `#dither-halftone-slate`: $6\times 6$ `userSpaceOnUse` 60° halftone dot stipple in Slate Ink (`#0F172A`, `fill-opacity: 0.12–0.16`).
     - `#dither-polar-engraving`: $6\times 6$ `userSpaceOnUse` dual-tone engraving stipple overlay (`#FFFFFF` / `#0F172A`, `fill-opacity: 0.12–0.18`) for polar outer accent rings and subtle sector texture overlays.
2. **CSS Dither Surface Classes (`.dither-accent-band`, `.dither-header-plate`, `.dither-badge-accent`):**
   - **Responsibility:** Applies ordered Bayer / radial halftone stipple accents to section header strips, KPI card top bands, and step card header plates while keeping all text containers on solid `#FFFFFF` / `#F8FAFC` surfaces ($\ge 4.5:1$ contrast).

---

#### Module `M3`: Straightforward English Editorial, Note Boxes & Dataset Layer (`data/costco_revenue_breakdown.json`, `index.html`, `wayfinder/`, `README.md`)

1. **Dataset Schema Contract (`data/costco_revenue_breakdown.json`):**
   - **Responsibility:** Preserves 100% of numerical fields and schema keys while replacing promotional clichés in `merchandise_categories[0..3].role_in_flywheel` (lines 75, 94, 121, 136) with clear, straightforward English descriptions (zero occurrences of `"treasure-hunt discretionary basket builder"`, `"renewal magnet"`, or `"perishable weekly trip driver and rapid inventory-turn engine"`).
2. **Plain-English Callout Note Containers (`.plain-english-note` & `.chart-reading-note` in `index.html`):**
   - **Responsibility:** Renders 5 section-level `.plain-english-note` boxes (`#note-exec-summary`, `#note-polar-suite`, `#note-five-steps`, `#note-gaap-model`, `#note-wayfinder-audit`) and 3 chart-level `.chart-reading-note` boxes (`#reading-note-categories`, `#reading-note-geography`, `#reading-note-flywheel`) explaining in everyday English:
     1. Why Costco caps markups at `10.92%` (`~11%` vs. `25%–40%` at conventional stores),
     2. How supplier-financed inventory works (`12.60x` turnover = `~29` days to sell vs. `~32` days to pay suppliers $\rightarrow$ `$19,421M` AP covers `104.15%` of `$18,647M` inventory = `+$774M` cash float),
     3. How `1.90%` of revenue (`$4,828M` Membership Fees) becomes `52.00%` of operating profit (`$9,285M`) because `$27,267M` merchandise gross margin covers all `$22,810M` SG&A with `+$4,457M` (`48.00%`) left over,
     4. What contra-revenue means in one sentence (`$2,804M` in Executive 2% annual rewards is subtracted directly from reported Net Sales rather than counted as an operating expense).
3. **Complete Shorthand & Code-Leak Elimination (`index.html` HTML + `<script>`):**
   - Replaces all occurrences of `R_total`, `OpInc ($9,285M) = Merch Contrib`, `Area √r (Coxcomb)`, `Area &radic;r`, `Linear Radius r`, `Share Angle θ_i`, `Share Angle &theta;_i`, `wayfinderAudit.valid === true`, and `Negative Working-Capital Float` across both static HTML markup and embedded JavaScript constants (`WAYFINDER_TICKETS`, `STEP_SUMMARIES`, `renderPolarCategories`, `renderPolarGeography`, `renderPolarFlywheel`, `renderGaapWaterfall`, `updateSimulator`).

---

#### Module `M4`: High-Legibility Polar Coordinate & Companion Table Engine (`index.html`)

1. **`renderPolarGrid(cx: number, cy: number, maxR: number, ringLabels: string[] | null, spokeAngles: number[], rBase?: number, labelAngleDeg?: number): string`**
   - **Responsibility:** Generates SVG markup for concentric `.polar-grid-ring` circles, `.polar-axis-spoke` radial lines, a subtle dithered outer halo ring (`fill="url(#dither-polar-engraving)"`), an animated radar sweep indicatorring (`.polar-sweep-indicator`), and optional `.polar-axis-label` scale markers.
   - **Input:** Center `(cx, cy)` (`200, 200`), outer radius `maxR`, optional `ringLabels` (`4`-element array), `spokeAngles` (degrees), inner hub radius `rBase` (default `40`), and `labelAngleDeg` (default `0`).
   - **Output:** Deterministic SVG markup string.

2. **`renderPolarRingLabels(cx: number, cy: number, maxR: number, ringLabels: string[] | null, rBase?: number, labelAngleDeg?: number): string`**
   - **Responsibility:** Places radial ring scale markers at `[0.25, 0.5, 0.75, 1.0]` along angle `labelAngleDeg` with a `3.5px` white halo (`paint-order: stroke fill; stroke: #FFFFFF; stroke-width: 3.5px; stroke-linejoin: round`).
   - **Collision-Free Contract:** When `catState.mode === "angle"` (`By Revenue Share (Angle)`), `labelAngleDeg` is set to `25` (1 o'clock diagonal spoke) so ring scale markers never collide with the 12 o'clock (`0°`) or 6 o'clock (`192.5°`) sector callout labels.

3. **`renderPolarCategories(focusTarget?: "sector" | "row" | null): void`**
   - **Responsibility:** Renders `#svg-polar-categories` (`viewBox="-80 -44 560 488"`, center hub `r="40"`), updates `#polar-cat-caption` with plain-English mode descriptions (`By Area (Square-Root Scale)`, `By Radius (Linear Scale)`, `By Revenue Share (Angle)`), updates `#polar-category-drilldown`, populates `#tbody-polar-categories` with keyboard-focusable rows (`[data-cat-row="0..3"][tabindex="0"][role="button"]`), and restores focus if triggered by keyboard.

4. **`renderPolarGeography(focusTarget?: "sector" | "row" | null): void`**
   - **Responsibility:** Renders `#svg-polar-geography` (`viewBox="-80 -44 560 488"`, center hub `r="40"`), plain-English hub subtitle (`3.65% Margin` instead of `3.65% OpM`), updates `#polar-geography-drilldown`, populates `#tbody-polar-geography` with keyboard-focusable rows (`[data-geo-row="0..2"][tabindex="0"][role="button"]`), and restores focus if triggered by keyboard.

5. **`renderPolarFlywheel(focusTarget?: "sector" | null, focusRing?: string | null): void`**
   - **Responsibility:** Renders `#svg-polar-flywheel` (`viewBox="-80 -44 560 488"`, center hub `r="40"`). In `asymmetry` Dual-Ring mode, renders high-contrast pill callouts (`Fee Profit: 52.0% ($4,828M)` and `Merch Profit: 48.0% ($4,457M)`) and plain-English center hub (`$9,285M` / `Op. Income`), paired with an explicit HTML visual legend (`.polar-html-legend`) below each polar SVG stage.

---

#### Module `M5`: Screen-Size-Agnostic Responsive Layout & Keyboard A11y Controller (`index.html`)

1. **`bindInteractiveTableRows(tbodyElement: HTMLElement | null, attrName: string, totalRows: number, onSelect: (idx: number, isKeyboard: boolean) => void): void`**
   - **Responsibility:** Attaches pointer `click` and keyboard `keydown` (`Enter`, `Space`, `ArrowDown`/`ArrowRight` next row, `ArrowUp`/`ArrowLeft` previous row) handlers to interactive companion table rows (`[data-cat-row]`, `[data-geo-row]`), ensuring `tabindex="0"`, `role="button"`, and `aria-selected="true|false"` are set on every row.
   - **Focus Restoration Contract:** After `renderPolarCategories("row")` or `renderPolarGeography("row")` rebuilds `tbody.innerHTML`, re-queries `tbody.querySelector('[' + attrName + '="' + idx + '"]')` and calls `.focus({ preventScroll: true })` so keyboard users never lose focus (`planner-2.3` finding `seq=#11`).

2. **`bindTablistKeyboardNav(selector: string, onActivate: (btn: HTMLElement, idx: number) => void): void`**
   - **Responsibility:** Implements WAI-ARIA roving/directional keyboard navigation (`ArrowRight`, `ArrowDown`, `ArrowLeft`, `ArrowUp`, `Home`, `End`, `Enter`, `Space`) across `[data-step-btn]` (`#section-five-steps`), `[data-ticket-tab]` (`#section-wayfinder-audit`), and polar control button groups.

3. **`initScrollSpy(): void` (Zero-Reflow `requestAnimationFrame` Hardening per `planner-2.4` `seq=#13`):**
   - **Responsibility:** Tracks active section/step in `#table-of-contents` via `IntersectionObserver` and throttles the `window` scroll fallback behind `requestAnimationFrame` (`scrollTicking` flag) to eliminate synchronous `getBoundingClientRect()` reflows during 60fps scrolling.

---

#### Module `M6`: Deterministic CLI Verification Engine (`src/costco_revenue_model.mjs`)

1. **`verifyFinancialDataset(data: unknown): FinancialDatasetAuditResult`**
   - **Responsibility:** Validates all GAAP income statement identities, historical comparisons, Note 11 categories, Item 2 geographic segments, membership metrics, and working-capital balance sheet ratios, **plus** asserts that every `merchandise_categories[].role_in_flywheel` string contains zero prohibited promotional clichés (`PROHIBITED_PROMOTIONAL_PHRASES`) and zero raw `{...}` tokens.

2. **`verifyCorporateWebReport(rawOptions?: VerifyCorporateWebOptions | string): CorporateWebAuditResult` (aliased as `verifyIndexHtml`)**
   - **Responsibility:** Performs single-pass verification over `resolvedHtml`, `lowerHtml`, `declaredIds`, and `combinedCss`, preserving all existing return fields while enforcing Spec 005 `AC-01`..`AC-05`:
     - **`AC-01` Check (`corporateAnimatedSvgVerified: true`):** Verifies presence of `#svg-corporate-flywheel-hero`, step SVG schematics (`svg-step-1`..`svg-step-5`), motion control (`motion-toggle-btn` / `prefers-reduced-motion: reduce`), and SVG animation hooks.
     - **`AC-02` Check (`ditherEffectsVerified: true`):** Verifies presence of inline SVG `<pattern` definitions (`dither-bayer-navy`, `dither-bayer-crimson`, `dither-halftone-slate`) and dither CSS rules while confirming `dreamcoreMarkersDetected === 0`.
     - **`AC-03` Check (`plainEnglishNotesVerified: true`):** Verifies presence of `.plain-english-note` and `.chart-reading-note` containers, required plain-English equations/button labels (`REQUIRED_PLAIN_ENGLISH_LABELS`), and zero occurrences of `PROHIBITED_ALGEBRAIC_AND_CODE_SHORTHAND` or `PROHIBITED_PROMOTIONAL_PHRASES` across full `resolvedHtml`.
     - **`AC-04` Check (`legibleGraphTypographyVerified: true`):** Verifies padded polar `viewBox` (`-80 -44 560 488` or `-75 -40 550 480`), `paint-order: stroke fill` halo rules, and companion table typography rules.
     - **`AC-05` Check (`responsiveScreenAgnosticVerified: true`, `keyboardAccessibilityVerified: true`):** Verifies fluid `clamp(`, `minmax(0, 1fr)`, responsive `@media` breakpoints, and keyboard event bindings for table rows (`data-cat-row`, `data-geo-row`) and tablists.

---

## 5. Dependency Graph & Sequential vs. Parallel Execution DAG

### 5.1 Module Dependency Graph

```mermaid
flowchart LR
    subgraph DataAndDocs["Data & Documentation Layer"]
        D_JSON["data/costco_revenue_breakdown.json\n(Plain-English role_in_flywheel)"]
        D_WF["wayfinder/map.md &\nwayfinder/tickets/ticket-006.md"]
        D_README["README.md"]
    end

    subgraph HTMLModules["index.html Internal Modules"]
        M2["M2: SVG <defs> Bayer/Halftone\nDither Atlas & CSS Plates"]
        M3["M3: Inlined Data Constants &\n.plain-english-note / .chart-reading-note"]
        M4["M4: High-Legibility Polar Graphs\n(viewBox -80 -44 560 488, 3.5px Halo,\nAngle-Mode Offset, HTML Legends, Tables)"]
        M1["M1: Corporate Animated SVGs\n(#svg-corporate-flywheel-hero, #svg-step-1..5,\nPolar Sweep, #motion-toggle-btn)"]
        M5["M5: Fluid clamp() Responsive Grid &\nKeyboard A11y (Table Rows + Roving Tabs)"]

        M2 --> M1
        M2 --> M4
        M3 --> M1
        M3 --> M4
        M1 --> M5
        M4 --> M5
    end

    subgraph Verification["Verification & Headless Audit Layer"]
        M6["M6: src/costco_revenue_model.mjs\n(verifyFinancialDataset + verifyCorporateWebReport)"]
        PW["Playwright / Puppeteer Multi-Viewport\n& Visual Collision Verification (320px..2560px)"]
    end

    D_JSON --> M3
    D_JSON --> M6
    D_WF --> M6
    D_README --> M6
    M5 --> M6
    M5 --> PW
```

### 5.2 Stage 3 Implementation & Stage 4 Verification Execution DAG

Because [`index.html`](../../index.html) is a single self-contained file (`3,397` lines) while [`data/costco_revenue_breakdown.json`](../../data/costco_revenue_breakdown.json), [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs), [`wayfinder/map.md`](../../wayfinder/map.md), [`wayfinder/tickets/ticket-006.md`](../../wayfinder/tickets/ticket-006.md), and [`README.md`](../../README.md) are separate files, Stage 3 (`implementer` + `implementer-1..5`) and Stage 4 (`tester` + `tester-1..5`) MUST execute according to the following **conflict-free Execution DAG**:

```mermaid
flowchart TD
    START(["Stage 2 Complete:\nplan-2 Synthesizes Blueprint"]) --> W1_A & W1_B & W1_C

    subgraph Wave1["Wave 1: Parallel Independent File Updates & Partitioned index.html Preparation"]
        W1_A["Task 3.3A (implementer-3):\nUpdate data/costco_revenue_breakdown.json (L75,94,121,136),\nwayfinder/map.md, wayfinder/tickets/ticket-006.md, README.md"]
        W1_B["Task 3.6A (implementer-4 / implementer-1):\nExtend src/costco_revenue_model.mjs\n(verifyFinancialDataset & verifyCorporateWebReport AC-01..AC-05 checks)"]
        W1_C["Task 3.1–3.5 Partitioned index.html Edits:\n- Region R1 (<style> L10–1153): Fluid clamp(), Bayer/Halftone CSS,\n  Polar >=12px Halo Typography, Table >=12.5px, Reduced-Motion & Media Queries\n- Region R2 (Header & Section 01 L1155–1359): Global SVG <defs> Dither Atlas,\n  #motion-toggle-btn, #svg-corporate-flywheel-hero, Plain-English Equations & Note 01\n- Region R3 (Section 02 Polar HTML L1360–1591): Padded viewBox='-80 -44 560 488',\n  Plain-English Buttons, .chart-reading-note, .polar-html-legend\n- Region R4 (Sections 03–05 HTML L1592–2020): #svg-step-1..5 Micro-Schematics,\n  .plain-english-note Boxes 03–05, Plain-English Wayfinder Status\n- Region R5 (<script> IIFE L2022–3395): Clean JS Constants, Angle-Mode Offset (25 deg),\n  Dual-Ring Callouts, Motion Controller, Table Row & Roving Tab Keyboard A11y"]
    end

    W1_A & W1_B & W1_C --> W2_SYNC["Wave 2: Integrated Build & Deterministic CLI Gate\nRun `npm run verify` (node src/costco_revenue_model.mjs --verify)\nAssert: status='VERIFIED', elapsedMs <= 250ms, rssMb <= 128MB, 0 network calls"]

    W2_SYNC --> W3_HEADLESS["Wave 3: Live Multi-Viewport & Visual Polish Verification (implementer-5)\n- Launch Playwright / Puppeteer against index.html\n- Sweep 320px, 375px, 390px, 768px, 1024px, 1280px, 1440px, 1920px, 2560px\n- Verify scrollWidth <= innerWidth (0px overflow) & 0 SVG label collisions/clipping\n- Capture & inspect 390px, 768px, 1440px screenshots + reduced-motion state"]

    W3_HEADLESS --> T_PARALLEL

    subgraph Wave4["Wave 4: Stage 4 Parallel Acceptance Verification (tester-1..5)"]
        T_PARALLEL["Parallel Verification Suites:\n- tester-1 (AC-01): #svg-corporate-flywheel-hero, #svg-step-1..5, polar sweep, reduced-motion & pause toggle\n- tester-2 (AC-02): SVG <defs> Bayer/halftone patterns, CSS dither bands, >=4.5:1 contrast, 0 Dreamcore\n- tester-3 (AC-03): Plain-English notes in all 5 sections & 3 charts, 0 shorthand/clichés in HTML & JSON\n- tester-4 (AC-04): Polar viewBox '-80 -44 560 488', >=12px 3.5px halo labels, 0 angle-mode collisions, >=12.5px tables\n- tester-5 (AC-05): Multi-viewport 320px–2560px overflow=0, screenshots, keyboard Enter/Space/Arrow sync"]
    end

    T_PARALLEL --> DONE(["All Acceptance Criteria (AC-01..AC-05) Verified on main"])
```

### 5.3 Non-Conflicting Region Partition Map Within `index.html`

To ensure zero edit collisions when multiple implementers or sequential passes modify [`index.html`](../../index.html), [`index.html`](../../index.html) is partitioned into **five non-overlapping contiguous line regions (`R1`–`R5`)**:

| Region ID | Line Range in Current `index.html` | DOM / Code Scope | Assigned Pillars & Exact Modifications |
| :--- | :--- | :--- | :--- |
| **`R1`** | `L9 – L1153` (`<style>...</style>`) | Global CSS Variables, Layout Grid, Polar & Step Styles, Media Queries | **M1 + M2 + M4 + M5:** Add fluid `clamp()` variables/rules; `.dither-accent-band` & `.dither-header-plate`; `.plain-english-note`, `.chart-reading-note`, & `.polar-html-legend`; upgrade `.polar-svg` (`aspect-ratio: 560 / 488`), `.polar-sector-label` (`12.5px`, `3.5px` white halo), `.polar-axis-label` (`11px`, `3.5px` white halo), `.polar-center-title` (`13px`), `.polar-center-sub` (`10.5px`), and `.polar-details-column .corp-table` (`12.5px–13px`, `padding: 8px 10px`); add `@keyframes` for animated SVG flow/sweep, `html.is-motion-paused`, `@media (prefers-reduced-motion: reduce)`, and screen-size-agnostic breakpoints (`<= 1120px`, `<= 1080px`, `<= 640px`, `<= 480px`, `>= 1920px`). |
| **`R2`** | `L1155 – L1359` (Top of `<body>`, Header, `#table-of-contents`, `#section-executive-summary`) | Global SVG `<defs>`, `.corporate-header`, `#table-of-contents`, `#section-executive-summary` | **M1 + M2 + M3 + M5:** Insert shared `<svg id="svg-global-dither-defs" aria-hidden="true" width="0" height="0"><defs>...</defs></svg>` at top of `<body>`; add `#motion-toggle-btn` (`[data-motion-toggle]`) in `.header-main-bar`; add mobile/tablet collapsible TOC toggle if needed; replace `OpInc` and `Negative Working-Capital Float` in KPI cards; replace `R_total` and `OpInc` in `.executive-equation-banner` with plain-English equations; insert `.plain-english-note` (`#note-exec-summary`) and `#svg-corporate-flywheel-hero` (4-node animated SVG schematic). |
| **`R3`** | `L1360 – L1591` (`#section-polar-graphs`: Polar Charts 2.1, 2.2, 2.3) | `#polar-chart-categories`, `#polar-chart-geography`, `#polar-chart-flywheel` | **M2 + M3 + M4:** Replace `Area √r`, `Linear Radius r`, `Share Angle θ_i`, and `OpInc Share` in section lead, buttons, and table headers with plain English (`By Area (Square-Root Scale)`, `By Radius (Linear Scale)`, `By Revenue Share (Angle)`, `Operating Profit Share`); insert `#note-polar-suite` (`.plain-english-note`); update all 3 `<svg>` elements to `viewBox="-80 -44 560 488"`; insert `.chart-reading-note` and `.polar-html-legend` in each of the 3 polar panels; add companion table explanatory footnotes. |
| **`R4`** | `L1592 – L2020` (`#section-five-steps`, `#section-gaap-model`, `#section-wayfinder-audit`, `<footer>`) | `#step-1`..`#step-5`, `#section-gaap-model`, `#section-wayfinder-audit` | **M1 + M2 + M3:** Replace `52.00% Fee OpInc Flywheel`, `48.00% of OpInc`, `52.00% of OpInc`, and `$9,285M OpInc - $169M IntExp...` with full plain English; insert `.plain-english-note` boxes in Sections 03, 04, and 05; embed animated SVG micro-schematics (`#svg-step-1`..`#svg-step-5`) with dithered accents inside `#step-1`..`#step-5`; replace `<code>wayfinderAudit.valid === true</code>` at L1994 with `Verified: 6 resolved research tickets and canonical decision map`. |
| **`R5`** | `L2022 – L3395` (`<script>` IIFE Controller) | Inlined Datasets, Polar Renderers, Stepper, Waterfall, Simulator, Ticket Inspector, ScrollSpy, `init()` | **M1 + M3 + M4 + M5:** Clean `R_total` and `OpInc` from `STEP_SUMMARIES` (L2274) and `WAYFINDER_TICKETS` (L2283, L2307); update `rInner = 40` in polar renderers; add `labelAngleDeg = (catState.mode === "angle" ? 25 : 0)` in `renderPolarRingLabels` to eliminate angle-mode collisions; add dithered outer halo ring & animated sweep/selection ring in `renderPolarCategories`, `renderPolarGeography`, and `renderPolarFlywheel`; replace Dual-Ring raw text with high-contrast pill callouts (`Fee Profit (52.0%)`, `Merch Profit (48.0%)`); replace `OpInc` in `renderGaapWaterfall` and `updateSimulator`; add `setMotionPaused`, `initMotionControl`, `syncAnimatedFlywheelHighlight`, `bindInteractiveTableRows` (`[data-cat-row]`, `[data-geo-row]`), `bindTablistKeyboardNav` (`[data-step-btn]`, `[data-ticket-tab]`), and `requestAnimationFrame`-gated scroll-spy in `initScrollSpy()`. |

---

## 6. Verification & Acceptance Gate Matrix (`AC-01` through `AC-05`)

| Acceptance Criterion | Verification Mechanism | Target Metric / Required Output | Failure Boundary (`{errors}`) |
| :--- | :--- | :--- | :--- |
| **`AC-01`: Corporate Animated SVGs & Motion Resilience** | `verifyCorporateWebReport()` + Playwright `browser_emulate_media({ reducedMotion: "reduce" })` + `#motion-toggle-btn` click | `#svg-corporate-flywheel-hero` (4 nodes), `#svg-step-1`..`#svg-step-5`, polar sweep rings, `#motion-toggle-btn`, and `@media (prefers-reduced-motion: reduce)` active; frame time $\le 16\text{ ms}$. | Missing animated SVG schematic, unpaused animation under `prefers-reduced-motion: reduce`, or missing motion toggle control. |
| **`AC-02`: Halftone & Ordered Bayer Dithering** | `verifyCorporateWebReport()` + DOM `<defs> <pattern>` & WCAG contrast inspection | `#dither-bayer-navy`, `#dither-bayer-crimson`, `#dither-halftone-slate`, `#dither-polar-engraving` + `.dither-accent-band` active; text contrast $\ge 4.5:1$; `dreamcoreMarkersDetected === 0`. | Dither pattern obscuring text contrast below `4.5:1` or any residual Dreamcore marker. |
| **`AC-03`: Straightforward English & Plain-English Notes** | `verifyFinancialDataset()` + `verifyCorporateWebReport()` + Playwright full-text scan | `.plain-english-note` in all 5 sections + `.chart-reading-note` in all 3 polar panels; `0` occurrences of `R_total`, `θ_i`, `Area √r`, `wayfinderAudit.valid === true`, `Negative Working-Capital Float`, or promotional clichés in HTML or JSON. | Any leaked algebraic shorthand, code assertion, raw `{...}` token, `//` divider, or promotional cliché. |
| **`AC-04`: High-Legibility Polar Graphs, Halo Labels & Tables** | `verifyCorporateWebReport()` + Playwright bounding-box collision & clipping audit across all polar modes | Polar `viewBox="-80 -44 560 488"`, `.polar-sector-label >= 12px` with `3.5px` white halo, `.polar-axis-label >= 10.5px`, center hub `r >= 40px` (`>= 12.5px` title), `0` clipped or overlapping labels in `sqrt`, `linear`, `angle`, `overlay`, `asymmetry`, `ancillary` modes; companion tables $\ge 12.5\text{px}$. | Any clipped SVG label (`rect` outside `svgRect`) or overlapping sector/axis label (`overlapX > 2 && overlapY > 2`). |
| **`AC-05`: Screen-Size-Agnostic Responsive & Keyboard A11y** | Playwright multi-viewport sweep (`320px`, `375px`, `390px`, `768px`, `1024px`, `1280px`, `1440px`, `1920px`, `2560px`) + `npm run verify` | `scrollWidth <= innerWidth` (`0px` overflow) at every viewport; screenshots verified at `390px`, `768px`, `1440px`; `[data-cat-row]` & `[data-geo-row]` focusable (`tabindex="0"`) with `Enter`/`Space`/`Arrow` sync; CLI verify $\le 250\text{ ms}$, $\le 128\text{ MB}$ RSS, `0` network calls, `status: "VERIFIED"`. | Horizontal overflow (`scrollWidth > innerWidth`) at any viewport, unfocusable table rows, console errors, or CLI exit code $\ne 0$. |
