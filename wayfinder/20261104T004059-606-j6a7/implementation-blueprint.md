# Authoritative Implementation Blueprint & Stage 3 Deconfliction Contract (`implementation-blueprint.md`)

**Run ID:** `20261104T004059-606-j6a7`  
**Branch:** `agent/implementer-20261104T004059-606-j6a7`  
**Author:** Lead Implementation Coordinator (`implementer`)  
**Status:** Authoritative Implementation Blueprint for Stage 3 (`implementer-1`..`implementer-5`) and Stage 4 (`tester-1`..`tester-5`, `tester`)  
**Synthesized Sources:**
- [`LANGUAGE.md`](file:///Users/diesel/Desktop/Costco/LANGUAGE.md) (Authoritative Evaluation Parameters & Costco Corporate Domain Vocabulary)
- [`functional_specification_005.md`](file:///Users/diesel/Desktop/Costco/functional_specification_005.md) (Seed Specification)
- [`wayfinder/20261104T004059-606-j6a7/refined-specification.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-implementer-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/refined-specification.md) (Stage 1 Refined Specification)
- Stage 1 Scanner Reports: [`codebase-map.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-implementer-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/codebase-map.md), [`api-schemas.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-implementer-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/api-schemas.md), [`installed-libraries.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-implementer-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/installed-libraries.md), [`mcp-tools.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-implementer-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/mcp-tools.md), [`library-functions.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-implementer-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/library-functions.md)
- Stage 2 Planner Blackboard Ledger (`seq=#1` through `seq=#21`): `planner-2.1` (`architecture-and-dag.md`), `planner-2.2` (`storage-architecture.md`), `planner-2.3` (`stack-usage-guide.md`), `planner-2.4` (`suggested-optimizations.md`), and `planner-2.5` (`visual-taste-direction.md`)

---

## 1. Executive Summary & Domain Vocabulary Alignment (`LANGUAGE.md`)

This Implementation Blueprint translates [`functional_specification_005.md`](file:///Users/diesel/Desktop/Costco/functional_specification_005.md) and [`wayfinder/20261104T004059-606-j6a7/refined-specification.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-implementer-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/refined-specification.md) into a deterministic, conflict-free engineering specification for Stage 3 (`implementer-1` through `implementer-5`) and Stage 4 (`tester-1` through `tester-5`).

### 1.1 Evaluation Parameters (`LANGUAGE.md`)
All implementation and verification work is governed by the strict evaluation parameters in [`LANGUAGE.md`](file:///Users/diesel/Desktop/Costco/LANGUAGE.md):
- **`{errors}`**: Any explicit failure state or structural invariant breach, including:
  1. Leaking raw specification curly braces (`{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`), `//` pseudo-code dividers, raw variable names (`R_total`, `OpInc`, `θ_i`, `√r`, `wayfinderAudit.valid === true`), or promotional metaphors (`treasure-hunt discretionary basket builder`, `renewal magnet`, `perishable weekly trip driver and rapid inventory-turn engine`, `Negative Working-Capital Float`) into reader-facing UI or dataset prose.
  2. Illegible, overlapping, clipped, or low-contrast SVG text, micro-sized fonts (`< 12px` sector labels or `< 10.5px` ring scale labels), dither patterns behind body copy, or horizontal viewport overflow (`document.documentElement.scrollWidth > window.innerWidth`) at any viewport width (`320px` through `2560px`).
  3. Any discrepancy between reported figures in [`index.html`](file:///Users/diesel/Desktop/Costco/index.html) and the audited FY2022–FY2024 SEC Form 10-K dataset in [`data/costco_revenue_breakdown.json`](file:///Users/diesel/Desktop/Costco/data/costco_revenue_breakdown.json).
  4. Introducing any prohibited Dreamcore/VHS markers or breaking any required corporate DOM IDs.
  5. Browser runtime console errors, uncaught page exceptions, calling `.pauseAnimations()` on non-`<svg>` elements, broken internal anchor links, or non-zero exit codes from `npm run verify`.
- **`{correctness}`**: Exact mathematical, accounting, geometric, visual, accessibility, and structural fidelity across [`data/costco_revenue_breakdown.json`](file:///Users/diesel/Desktop/Costco/data/costco_revenue_breakdown.json), [`src/costco_revenue_model.mjs`](file:///Users/diesel/Desktop/Costco/src/costco_revenue_model.mjs), and [`index.html`](file:///Users/diesel/Desktop/Costco/index.html).
- **`{functionality}`**: End-to-end interactive corporate webpage operation across all five Spec 005 pillars (`AC-01` through `AC-05`) under live runtime reality.
- **`{correct required outputs}`**: Objectively measurable outputs verified by `node src/costco_revenue_model.mjs --verify` (`npm run verify` exiting `0` with `overallValid: true` in $\le 250\text{ ms}$ and $\le 128\text{ MB}$ RSS) and live headless browser telemetry across `320px`, `375px`, `390px`, `768px`, `1024px`, `1280px`, `1440px`, `1920px`, and `2560px`.
- **`{sufficient}` / `{insufficient}`**: Zero ambiguity remains; every DOM ID, CSS selector, SVG coordinate, plain-English string replacement, and file/line-range ownership boundary is explicitly specified below.

---

## 2. Blackboard Deconfliction Protocol & Non-Overlapping Ownership Matrix

### 2.1 Mandatory Pre-Code Blackboard Deconfliction Gate (`DO NOT CODE YET` Until Claimed)
Before modifying any file in the repository, each Stage 3 agent (`implementer-1` through `implementer-5`) MUST:
1. Run `blackboard read` to inspect all active peer claims and findings.
2. Post a Blackboard finding (`blackboard post-finding`) declaring:
   - Its assigned Pillar (`AC-01`..`AC-05`) and Module ID (`M1`..`M6`).
   - Exact files and [`index.html`](file:///Users/diesel/Desktop/Costco/index.html) region tags (`R1`..`R5`) it owns.
   - Exact exported/global function signatures and DOM IDs it is creating or modifying.
3. Never edit any file or [`index.html`](file:///Users/diesel/Desktop/Costco/index.html) region assigned to another implementer without an explicit Blackboard request/response handoff.

### 2.2 File, Module, and `index.html` Region Ownership Matrix

| Agent | Assigned Pillar & Module | Exclusive File Ownership | [`index.html`](file:///Users/diesel/Desktop/Costco/index.html) Region Ownership (Baseline 3,397 Lines) | Prohibited Touch Zones |
| :--- | :--- | :--- | :--- | :--- |
| **`implementer-1`** | **Pillar 1 (`AC-01` / `M1`):** Corporate Animated SVG Elements & Motion Control Resilience | Shared [`index.html`](file:///Users/diesel/Desktop/Costco/index.html) (`R1`) | **Region `R1`:**<br>- `<style>`: `.corp-anim-*`, `html.is-motion-paused`, `@media (prefers-reduced-motion: reduce)` rules (`L1116–1135`)<br>- Header utility bar: `#motion-toggle-btn` (`[data-motion-toggle]`, `L1185–1192`)<br>- `#section-executive-summary`: Hero Operating Income Flywheel SVG `#svg-corporate-flywheel-hero` (`L1358–1360`)<br>- `#section-five-steps`: 5 Step-Card Animated SVG Micro-Schematics `#svg-step-1`..`#svg-step-5` inside `#step-1`..`#step-5` (`L1538–1785`)<br>- `<script>`: `isMotionPaused` state, `initMotionControl()`, `setMotionPaused(paused)`, and hero flywheel step highlight hook inside `setActiveStep(stepNum)` (`L2751–2786`, `L3362–3395`) | Do NOT edit `data/costco_revenue_breakdown.json`, `src/costco_revenue_model.mjs`, or polar geometry math in `R4`. |
| **`implementer-2`** | **Pillar 2 (`AC-02` / `M2`):** High-Density Halftone & Ordered Bayer Dithering Architecture | Shared [`index.html`](file:///Users/diesel/Desktop/Costco/index.html) (`R2`) | **Region `R2`:**<br>- `<style>`: `.dither-accent-band`, `.dither-header-plate`, `.dither-badge-accent`, `.dither-kpi-strip`, `.dither-step-band` (`L75–185`)<br>- Top of `<body>` (`L1137`): Shared hidden global `<svg id="svg-global-dither-defs" aria-hidden="true" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden;"><defs>` defining `#dither-bayer-navy`, `#dither-bayer-crimson`, `#dither-halftone-slate`, `#dither-polar-engraving`<br>- Decorative `.dither-accent-band` / `.dither-header-plate` / `.dither-badge-accent` class additions on `.section-header`, `.kpi-card`, `.step-card-header`, and polar outer decorative ring (`r=148..154`) | Do NOT place dither patterns behind body text or table cells; do NOT use `<feTurbulence>`. |
| **`implementer-3`** | **Pillar 3 (`AC-03` / `M3`):** Simplified Straightforward English, Plain-English Notes & Jargon Elimination | **Exclusive:**<br>- [`data/costco_revenue_breakdown.json`](file:///Users/diesel/Desktop/Costco/data/costco_revenue_breakdown.json)<br>- [`wayfinder/map.md`](file:///Users/diesel/Desktop/Costco/wayfinder/map.md)<br>- [`wayfinder/tickets/ticket-006.md`](file:///Users/diesel/Desktop/Costco/wayfinder/tickets/ticket-006.md)<br>- [`README.md`](file:///Users/diesel/Desktop/Costco/README.md)<br>Shared: [`index.html`](file:///Users/diesel/Desktop/Costco/index.html) (`R3`) | **Region `R3`:**<br>- `<style>`: `.plain-english-note`, `.chart-reading-note` callout card styles<br>- All 5 report sections (`#section-executive-summary`, `#section-polar-graphs`, `#section-five-steps`, `#section-gaap-model`, `#section-wayfinder-audit`): `.plain-english-note` callout boxes (`>= 5` total)<br>- All 3 polar chart panels (`#polar-chart-categories`, `#polar-chart-geography`, `#polar-chart-flywheel`): `.chart-reading-note` plain-English reading guides (`>= 3` total)<br>- All HTML & `<script>` string literal replacements eliminating `R_total`, `OpInc`, `OpM`, `Area √r (Coxcomb)`, `Linear Radius r`, `Share Angle θ_i`, `wayfinderAudit.valid === true`, `Negative Working-Capital Float` (`L1288–1356`, `L1364–1445`, `L1988–2005`, `L2035–2310`, `L2510–2525`) | Do NOT alter numeric values, GAAP totals, or JSON keys in `data/costco_revenue_breakdown.json`; preserve `SHA-256` parity between `data/` and `EMBEDDED_DATASET`. |
| **`implementer-4`** | **Pillar 4 (`AC-04` / `M4` & `M6`):** High-Legibility Polar Graphs, Callout Labels, Legends, Companion Tables & Verification Engine | **Exclusive:**<br>- [`src/costco_revenue_model.mjs`](file:///Users/diesel/Desktop/Costco/src/costco_revenue_model.mjs)<br>Shared: [`index.html`](file:///Users/diesel/Desktop/Costco/index.html) (`R4`) | **Region `R4`:**<br>- `<style>`: `.polar-svg-stage`, `.polar-svg`, `.polar-sector-label` (`>= 12px`), `.polar-axis-label` (`>= 10.5px`), `.polar-center-title` (`>= 12.5px`), `.polar-center-sub` (`>= 10px`), `.polar-html-legend`, `.polar-details-column .corp-table` (`L474–678`)<br>- `#section-polar-graphs`: `#svg-polar-categories`, `#svg-polar-geography`, `#svg-polar-flywheel` `viewBox="-80 -44 560 488"` (`L1379`, `L1406`, `L1429`) and `.polar-html-legend` containers (`L1361–1530`)<br>- `<script>`: `polarPoint`, `describeAnnularSector`, `renderPolarGridRings`, `renderPolarRingLabels` (`labelAngleDeg = 25`), `renderPolarCenterHub` (`r="42"`), `renderCategoryPolarChart`, `renderGeographyPolarChart`, `renderFlywheelPolarChart` (Dual-Ring leader-line callouts to `x=54` / `x=346`) (`L2410–2750`) | Do NOT break existing interactive mode toggles (`[data-cat-mode]`, `[data-geo-mode]`, `[data-fly-mode]`) or CLI exports in `src/costco_revenue_model.mjs`. |
| **`implementer-5`** | **Pillar 5 (`AC-05` / `M5`):** 100% Screen-Size-Agnostic Responsive Architecture, Keyboard A11y & Multi-Viewport Verification | Shared [`index.html`](file:///Users/diesel/Desktop/Costco/index.html) (`R5`) | **Region `R5`:**<br>- `<style>`: Fluid `clamp()` typography & spacing tokens (`:root`), layout containment (`minmax(0, 1fr)`), `.table-scroll-wrapper`, responsive breakpoints (`<= 1280px`, `<= 1120px`, `<= 1080px`, `<= 860px`, `<= 640px`, `<= 400px`, `>= 1920px`) (`L18–473`, `L679–1115`)<br>- `<script>`: `bindInteractiveTableRows()` (`tabindex="0"`, `role="button"`, `Enter`/`Space`, `ArrowUp`/`ArrowDown`, focus restoration), `bindTablistKeyboardNav()` (`ArrowLeft`/`ArrowRight`/`Home`/`End` on `[data-step-btn]` and `[data-ticket-tab]`), rAF-throttled `initScrollSpy()` (`L3290–3395`) | Do NOT use `overflow-x: hidden` on `html`/`body` as a band-aid to mask overflowing child containers; fix child container sizing directly. |

### 2.3 Stage 3 Sequential & Parallel Wave Execution Order (Zero Git/File Contention)

```
Wave 1 (Parallel — Independent Non-HTML Files):
  ├── implementer-3: Updates data/costco_revenue_breakdown.json, wayfinder/map.md, wayfinder/tickets/ticket-006.md, README.md
  └── implementer-4: Updates src/costco_revenue_model.mjs (verifyFinancialDataset + verifyCorporateWebReport Spec 005 checks)

Wave 2 (Coordinated Region Integration in index.html):
  ├── Step 2A (implementer-3): Syncs EMBEDDED_DATASET in index.html (<script> L2044–2274) to exact SHA-256 parity with data/costco_revenue_breakdown.json and applies R3 plain-English prose & .plain-english-note / .chart-reading-note markup.
  ├── Step 2B (implementer-2): Injects #svg-global-dither-defs at top of <body> and applies R2 .dither-* CSS & decorative header/card/polar rings.
  ├── Step 2C (implementer-1): Injects #motion-toggle-btn, #svg-corporate-flywheel-hero, #svg-step-1..#svg-step-5, and R1 initMotionControl() / setMotionPaused() / setActiveStep() hooks.
  ├── Step 2D (implementer-4): Upgrades R4 polar SVG viewBox="-80 -44 560 488", labelAngleDeg=25, r=42 center hub, Dual-Ring leader-line callouts, .polar-html-legend, and companion table typography.
  └── Step 2E (implementer-5): Applies R5 fluid clamp() CSS architecture, responsive breakpoints (320px–2560px), bindInteractiveTableRows(), bindTablistKeyboardNav(), and rAF scroll-spy.

Wave 3 (Live Verification Gate — All Implementers):
  ├── Run: node src/costco_revenue_model.mjs --verify (must exit 0 with overallValid: true in <= 250ms)
  └── Run: Headless Chromium multi-viewport sweep (320px, 375px, 390px, 768px, 1024px, 1280px, 1440px, 1920px, 2560px) confirming 0px horizontal overflow, 0 SVG label collisions, and 0 console/page errors.
```

---

## 3. Detailed Component Implementation Specifications (Pillars 1–5 & Verification Engine)

### 3.1 Pillar 1 (`AC-01` — Owned by `implementer-1`): Corporate Animated SVG Elements & Motion Resilience

#### 3.1.1 Accessible Header Motion Pause/Play Toggle (`#motion-toggle-btn`)
- **Location:** Inside `<header class="corp-header"><div class="corp-header-inner"><div class="corp-meta-pills">...</div>` (`L1185–1192`).
- **Markup Contract:**
  ```html
  <button type="button" id="motion-toggle-btn" class="corp-btn motion-toggle-btn" data-motion-toggle aria-pressed="false" aria-label="Pause corporate SVG animations">
    <span class="motion-status-dot" aria-hidden="true"></span>
    <span data-motion-label>Pause Animations</span>
  </button>
  ```
- **JavaScript Runtime Contract (`initMotionControl` & `setMotionPaused`):**
  - Read initial reduced-motion state via `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and attach a `'change'` listener on that `MediaQueryList`.
  - **`setMotionPaused(paused)`**:
    1. Set `isMotionPaused = Boolean(paused)`.
    2. Toggle `document.documentElement.classList.toggle('is-motion-paused', isMotionPaused)`.
    3. Update `#motion-toggle-btn`: `btn.setAttribute('aria-pressed', String(isMotionPaused))` and update `[data-motion-label]` text (`isMotionPaused ? 'Play Animations' : 'Pause Animations'`).
    4. Iterate over `document.querySelectorAll('svg')` and invoke:
       ```js
       document.querySelectorAll('svg').forEach((svgEl) => {
         if (typeof svgEl.pauseAnimations === 'function' && typeof svgEl.unpauseAnimations === 'function') {
           if (isMotionPaused) svgEl.pauseAnimations();
           else svgEl.unpauseAnimations();
         }
       });
       ```
       **CRITICAL GUARD (`planner-2.3` `seq=#11`):** Call `.pauseAnimations()` / `.unpauseAnimations()` **ONLY** on `<svg>` (`SVGSVGElement`) root elements—never on child `<animate>` or `<g>` elements, which throws `TypeError`.

#### 3.1.2 Hero Operating Income Flywheel Animated SVG (`#svg-corporate-flywheel-hero`)
- **Location:** Inside `#section-executive-summary` immediately below `.flywheel-equation-strip` (`L1358–1360`).
- **Attributes:** `id="svg-corporate-flywheel-hero"`, `viewBox="0 0 960 220"`, `role="img"`, `aria-labelledby="flywheel-hero-title flywheel-hero-desc"`.
- **Visual Structure (4 Connected Institutional Telemetry Nodes + Animated Flow Connectors):**
  - **Node 1 (`data-hero-node="1"`, Membership Entry & Renewal Base):** `76.2M` Paid Members (`136.8M` Cardholders) | `90.5%` Worldwide (`92.9%` US/Canada) Renewal | **`$4,828M` Membership Fees (`1.90%` of revenue)** (`#005DAA` Navy header band).
  - **Node 2 (`data-hero-node="2"`, High-Velocity Warehouse Scale):** `<4,000` Curated Items across `890` Warehouses (`$280.5M` sales/warehouse) | **`$249,625M` Net Sales (`98.10%` of revenue)**.
  - **Node 3 (`data-hero-node="3"`, 10.92% Markup Ceiling & Self-Funding Inventory Float):** `10.92%` Merchandise Gross Margin (`$27,267M`) minus `9.14%` Warehouse & Overhead Costs (`$22,810M`) = **`$4,457M` Merchandise Operating Profit (`1.79%` margin)** | **`104.15%` Payables-to-Inventory Coverage** (`$19,421M` AP vs. `$18,647M` Inventory; `12.60x` turn).
  - **Node 4 (`data-hero-node="4"`, Operating Income & Net Profit Harvest):** **`$9,285M` Operating Income (`3.65%` margin)** (`48.00%` Merchandise Profit `$4,457M` + `52.00%` Membership Fees `$4,828M`) $\rightarrow$ **`$7,367M` Net Income (`$16.56` Diluted EPS)** + **`2.08x` Reinvestment Coverage** (`$9,808M` Operating Cash Flow vs. `$4,710M` CapEx).
  - **Animated Flow Connectors:** SVG `<path class="corp-anim-flow-path" stroke-dasharray="6 6">` connecting Node 1 $\rightarrow$ Node 2 $\rightarrow$ Node 3 $\rightarrow$ Node 4 and a feedback loop arc from Node 4 ("Lower Prices & 2% Executive Rewards (`$2,804M`)") back to Node 1.
  - **Step-Sync Hook:** Inside `setActiveStep(stepNum)`, highlight the matching `[data-hero-node]` on `#svg-corporate-flywheel-hero` (`step 1 -> node 1`, `step 2 -> node 2`, `step 3 -> node 3`, `step 4 -> node 4`, `step 5 -> feedback arc + node 4`).

#### 3.1.3 5-Step Flywheel Animated SVG Micro-Schematics (`#svg-step-1` through `#svg-step-5`)
- **Location:** Inside each `.step-card` (`#step-1` through `#step-5`, `L1538–1785`), placed above `.step-metrics-row`.
- **Dimensions & IDs:** Each SVG has `viewBox="0 0 320 96"`, `class="step-micro-svg"`, `role="img"`, and explicit `<title>`:
  - `#svg-step-1` (`#step-1`): Dual-tier membership gauge (`35.4M` Executive = `46.5%` of members / `73.3%` of sales vs. `40.8M` Gold Star & Business) + `92.9%` US/CA / `90.5%` Worldwide renewal ring + `$4,828M` (`1.90%`).
  - `#svg-step-2` (`#step-2`): `<4,000` SKU pallet compression bars across `890` warehouses (`$280.5M` avg sales/club) driving `$249,625M` Net Sales (`98.10%`).
  - `#svg-step-3` (`#step-3`): `10.92%` Gross Margin cap bar (`$27,267M`) vs. `24%–35%` traditional retail comparison bar, minus `9.14%` SG&A (`$22,810M`) = `1.79%` (`$4,457M`) net merchandise operating margin.
  - `#svg-step-4` (`#step-4`): Inventory turn (`~29` days, `$18,647M`) vs. Accounts Payable payment cycle (`~32` days, `$19,421M`) showing `104.15%` supplier-financed coverage (`+$774M` positive float).
  - `#svg-step-5` (`#step-5`): Stacked profit bridge (`48.00%` Merchandise `$4,457M` + `52.00%` Membership Fees `$4,828M` = `$9,285M` Operating Income $\rightarrow$ `$7,367M` Net Income) + `2.08x` CapEx self-funding bar (`$9,808M` OCF vs. `$4,710M` CapEx).

#### 3.1.4 Polar Coordinate Animated SVG Enhancements
- Inside `renderCategoryPolarChart()`, `renderGeographyPolarChart()`, and `renderFlywheelPolarChart()`, emit:
  - A subtle outer decorative radar/compass ring (`<circle cx="200" cy="200" r="146" class="polar-compass-ring corp-anim-flow-path" />`).
  - An active-sector selection arc (`class="polar-active-arc"`) highlighting the currently selected category (`activeCategoryIndex`) or geographic segment (`activeGeoIndex`).
- **60fps Compositor Budget (`planner-2.4` `seq=#13`):** Animate ONLY `stroke-dashoffset`, `opacity`, and `transform` via CSS `@keyframes`. Never animate `d`, `r`, `width`, `height`, or `filter`. Pause completely when `html.is-motion-paused` or `@media (prefers-reduced-motion: reduce)` is active.

---

### 3.2 Pillar 2 (`AC-02` — Owned by `implementer-2`): High-Density Halftone & Ordered Bayer Dithering Architecture

#### 3.2.1 Shared Global SVG Pattern Registry (`#svg-global-dither-defs`)
- **Location:** Immediately inside `<body>` (`L1137`) before `<header class="corp-header">`.
- **Mandatory Implementation (Zero `<feTurbulence>` Filter Overhead per `planner-2.4` `seq=#13`):**
  ```html
  <svg id="svg-global-dither-defs" aria-hidden="true" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;">
    <defs>
      <!-- 8x8 Ordered Bayer Matrix Pattern — Costco Executive Navy (#005DAA) -->
      <pattern id="dither-bayer-navy" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#F1F5F9" />
        <rect x="0" y="0" width="1" height="1" fill="#005DAA" fill-opacity="0.16" />
        <rect x="4" y="0" width="1" height="1" fill="#005DAA" fill-opacity="0.12" />
        <rect x="2" y="2" width="1" height="1" fill="#005DAA" fill-opacity="0.16" />
        <rect x="6" y="2" width="1" height="1" fill="#005DAA" fill-opacity="0.12" />
        <rect x="0" y="4" width="1" height="1" fill="#005DAA" fill-opacity="0.12" />
        <rect x="4" y="4" width="1" height="1" fill="#005DAA" fill-opacity="0.16" />
        <rect x="2" y="6" width="1" height="1" fill="#005DAA" fill-opacity="0.12" />
        <rect x="6" y="6" width="1" height="1" fill="#005DAA" fill-opacity="0.16" />
      </pattern>
      <!-- 8x8 Ordered Bayer Matrix Pattern — Costco Crimson (#E31837) -->
      <pattern id="dither-bayer-crimson" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#FFF1F2" />
        <rect x="0" y="0" width="1" height="1" fill="#E31837" fill-opacity="0.16" />
        <rect x="4" y="0" width="1" height="1" fill="#E31837" fill-opacity="0.12" />
        <rect x="2" y="2" width="1" height="1" fill="#E31837" fill-opacity="0.16" />
        <rect x="6" y="2" width="1" height="1" fill="#E31837" fill-opacity="0.12" />
        <rect x="0" y="4" width="1" height="1" fill="#E31837" fill-opacity="0.12" />
        <rect x="4" y="4" width="1" height="1" fill="#E31837" fill-opacity="0.16" />
        <rect x="2" y="6" width="1" height="1" fill="#E31837" fill-opacity="0.12" />
        <rect x="6" y="6" height="1" width="1" fill="#E31837" fill-opacity="0.16" />
      </pattern>
      <!-- 6x6 Halftone Stipple Matrix — Slate Ink (#0F172A) -->
      <pattern id="dither-halftone-slate" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="0.85" fill="#0F172A" fill-opacity="0.14" />
        <circle cx="4.5" cy="4.5" r="0.65" fill="#005DAA" fill-opacity="0.12" />
      </pattern>
      <!-- 4x4 Polar Engraving Stipple — Institutional Engraving Ring -->
      <pattern id="dither-polar-engraving" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="1" height="1" fill="#0F172A" fill-opacity="0.15" />
        <rect x="2" y="2" width="1" height="1" fill="#005DAA" fill-opacity="0.15" />
      </pattern>
    </defs>
  </svg>
  ```

#### 3.2.2 CSS Ordered Bayer & Halftone Dither Classes
- Define deterministic CSS utility classes in `<style>` (`R2`):
  - `.dither-accent-band`: `height: 6px; width: 100%; background-image: radial-gradient(rgba(15, 23, 42, 0.16) 1px, transparent 0), radial-gradient(rgba(0, 93, 170, 0.12) 1px, transparent 0); background-size: 6px 6px; background-position: 0 0, 3px 3px; border-bottom: 1px solid var(--border-subtle);`
  - `.dither-header-plate`: Subtle top/right decorative dither border band on `.section-header` and `.exec-banner` while keeping text over solid `#FFFFFF` / `#F8FAFC`.
  - `.dither-badge-accent`: Crisp halftone stipple border/accent on `.section-num-badge` and `.step-card-header`.
- **Contrast Guardrail (`planner-2.5` `seq=#20`):** Never place any dither pattern directly behind paragraph prose, numeric KPI readouts, or table cells. Primary text (`#0F172A` on `#FFFFFF`) maintains `17.85:1` contrast; secondary text (`#334155` on `#FFFFFF`) maintains `10.35:1` contrast.

---

### 3.3 Pillar 3 (`AC-03` — Owned by `implementer-3`): Simplified Straightforward English, Plain-English Notes & Dataset Synchronization

#### 3.3.1 Primary-Source Dataset Updates ([`data/costco_revenue_breakdown.json`](file:///Users/diesel/Desktop/Costco/data/costco_revenue_breakdown.json) + `EMBEDDED_DATASET` in [`index.html`](file:///Users/diesel/Desktop/Costco/index.html))
Update the `role_in_flywheel` strings in [`data/costco_revenue_breakdown.json`](file:///Users/diesel/Desktop/Costco/data/costco_revenue_breakdown.json) (lines 75, 94, 121, 136) and synchronize `EMBEDDED_DATASET` in [`index.html`](file:///Users/diesel/Desktop/Costco/index.html) (`L2044–2274`) so their normalized JSON SHA-256 digests match 100%:

| Category ID | Line in `data/costco_revenue_breakdown.json` | Prohibited Jargon Phrase to Remove | Exact Replacement `role_in_flywheel` String |
| :--- | :--- | :--- | :--- |
| `foods_and_sundries` | `L75` | *(Refinement for plain-English clarity)* | `"High-frequency grocery and household staples driver; accounts for over two-fifths of merchandise sales and anchors regular member shopping trips."` |
| `non_foods` | `L94` | `"Treasure-hunt discretionary basket builder..."` | `"Rotating seasonal, electronics, appliance, and home goods selection; drives higher average basket sizes while maintaining strict inventory turnover discipline."` |
| `fresh_foods` | `L121` | `"...perishable weekly trip driver and rapid inventory-turn engine."` | `"Highest 2-year sales growth (+15.49%) among core warehouse departments; drives frequent weekly member visits and rapid inventory turnover across bakery, meat, produce, and deli."` |
| `warehouse_ancillary_and_other` | `L136` | `"...high-frequency traffic and renewal magnet..."` | `"Traffic-driving member services (discount gasoline, pharmacy, optical, food court, hearing aid, e-commerce, and travel) operated at near break-even margins to reinforce membership renewal."` |

#### 3.3.2 Complete Elimination of Algebraic & Code Shorthand in [`index.html`](file:///Users/diesel/Desktop/Costco/index.html)
`implementer-3` MUST replace every occurrence of the following strings across both static HTML (`L1137–2030`) and `<script>` template strings (`L2275–3395`):

| Baseline Location(s) in `index.html` | Prohibited Shorthand / Jargon | Required Straightforward English Replacement |
| :--- | :--- | :--- |
| `L1341` | `104.1% AP / Inventory Ratio (Negative Working-Capital Float)` | `104.15% Accounts Payable to Inventory Ratio (Supplier-Financed Inventory)` |
| `L1351` | `R_total ($254,453M) = Net Sales ($249,625M | 98.10%) + Membership Fees ($4,828M | 1.90%)` | `Total Revenue ($254,453M) = Net Sales ($249,625M | 98.10%) + Membership Fees ($4,828M | 1.90%)` |
| `L1355` | `OpInc ($9,285M) = Merch Contrib ($4,457M | 48.0%) + Fee Stream ($4,828M | 52.0%)` | `Operating Income ($9,285M) = Merchandise Profit ($4,457M | 48.00%) + Membership Fees ($4,828M | 52.00%)` |
| `L1369`, `L1396`, `L2515` | `Area √r (Coxcomb)` / `Coxcomb Area (√r)` | `By Area (Proportional Size)` |
| `L1370`, `L1397`, `L2516` | `Linear Radius r` / `Linear Radius (r)` | `By Radius (Linear Bar Length)` |
| `L1371`, `L2517` | `Share Angle θ_i` / `Share Angle (θ_i)` | `By Revenue Share (Slice Width)` |
| `L1398` | `3Y Multi-Year Overlay` | `3-Year Trend Overlay (FY22–FY24)` |
| `L1412` | `Dual-Ring Asymmetry` / `Ancillary 7-Subsegment Rose` | `Revenue vs. Profit Dual-Ring` / `Ancillary Businesses Breakdown` |
| `L1994` | `wayfinderAudit.valid === true` | `All Primary-Source Audit Checks Passed (100% Verified)` |
| `L2283` | `` `R_total $${fmtInt(fy24.total_revenue)}M` `` | `` `Total Revenue $${fmtInt(fy24.total_revenue)}M` `` |
| `L2665–2666`, `L2901`, `L2925` | `OpInc` / `OpM` | `Operating Income` / `Operating Margin` |

#### 3.3.3 Mandatory Plain-English Callout Boxes (`.plain-english-note` & `.chart-reading-note`)
- **5 Section Callout Cards (`.plain-english-note`, at least 1 in each of the 5 `<section>` elements):**
  1. `#section-executive-summary`: **"How Costco Makes Money in Plain English"** — Explains that Costco prices merchandise inside its warehouses almost at wholesale cost (`10.92%` gross margin cap vs. `24%–35%` at traditional retailers), so `98.10%` of revenue (`$249,625M` Net Sales) covers warehouse expenses (`$22,810M` SG&A) and leaves `$4,457M` (`48.00%` of operating profit), while `$4,828M` in annual Membership Fees (`1.90%` of revenue) contributes the other `52.00%` of Costco's `$9,285M` Operating Income.
  2. `#section-polar-graphs`: **"Why We Use Polar Coordinate Graphs & How to Read Them"** — Explains how circular polar charts display all 5 merchandise departments, 3 geographic regions, and the dual-ring revenue-vs.-profit comparison around a central hub without long scrolling bars.
  3. `#section-five-steps`: **"How the 5-Step Flywheel Reinforces Itself"** — Explains in plain English how `104.15%` Accounts Payable-to-Inventory coverage (`$19,421M` owed to suppliers vs. `$18,647M` of inventory on shelves; `12.60x` annual turnover = `~29` days on shelf vs. `~32` days payment terms) means Costco sells goods for cash before supplier invoices come due.
  4. `#section-gaap-model`: **"Reading the Income Statement & Cash Flow Table"** — Explains gross margin (`10.92%`), SG&A overhead (`9.14%`), operating margin (`3.65%`), Executive `2%` reward certificates (`$2,804M` deducted directly from gross sales as contra-revenue), and `2.08x` self-funded capital expenditures (`$9,808M` operating cash flow vs. `$4,710M` CapEx).
  5. `#section-wayfinder-audit`: **"What This Primary-Source Verification Audit Proves"** — Explains in plain English that every figure on the page is cross-checked automatically against Costco's FY2024 SEC Form 10-K filing (`CIK 0000909832`) with zero rounding drift or unverified estimates.
- **3 Polar Chart Reading Notes (`.chart-reading-note`, 1 inside each polar card `#polar-chart-categories`, `#polar-chart-geography`, `#polar-chart-flywheel`):**
  - Concise 2-sentence plain-English guide explaining what the slice angle, radius length, and mode buttons show, and inviting the reader to click or press `Enter` on any slice or companion table row.

---

### 3.4 Pillar 4 (`AC-04` — Owned by `implementer-4`): High-Legibility Polar Graphs, Callout Labels, Legends, Companion Tables & Verification Engine

#### 3.4.1 Polar SVG Viewport & Typography Upgrades (`#svg-polar-categories`, `#svg-polar-geography`, `#svg-polar-flywheel`)
- **Expanded `viewBox`:** Change all three polar `<svg>` elements (`L1379`, `L1406`, `L1429`) from `viewBox="-55 -28 510 456"` to:
  ```html
  viewBox="-80 -44 560 488"
  ```
  Wait/preserve center coordinates `cx = 200, cy = 200` and set `.polar-svg { width: 100%; height: auto; max-height: 440px; aspect-ratio: 560 / 488; overflow: visible; }`.
- **Upgraded SVG Text Classes (`<style>` in `R4`):**
  - `.polar-sector-label`: `font-size: 12.5px; font-weight: 700; fill: #0F172A; paint-order: stroke fill; stroke: #FFFFFF; stroke-width: 3.5px; stroke-linejoin: round;` (strictly $\ge 12\text{px}$).
  - `.polar-axis-label`: `font-size: 11px; font-weight: 600; fill: #334155; font-family: var(--font-mono); paint-order: stroke fill; stroke: #FFFFFF; stroke-width: 3.5px; stroke-linejoin: round;` (strictly $\ge 10.5\text{px}$).
  - `.polar-center-title`: `font-size: 13px; font-weight: 800; fill: #0F172A; font-family: var(--font-mono);` (strictly $\ge 12.5\text{px}$).
  - `.polar-center-sub`: `font-size: 10.5px; font-weight: 700; fill: #475569; text-transform: uppercase; letter-spacing: 0.04em;` (strictly $\ge 10\text{px}$).
- **Enlarged Center Hub (`renderPolarCenterHub`):**
  - Increase center hub `<circle>` radius from `r="36"` to `r="42"` ($\ge 40\text{px}$ radius / $84\text{px}$ diameter) with `fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"`.

#### 3.4.2 Deterministic Zero-Collision Polar Label Placement (`planner-2.4` `seq=#13` & `planner-2.5` `seq=#20`)
1. **Ring Scale Label Angular Offset (`renderPolarRingLabels`):**
   - Update `renderPolarRingLabels(cx, cy, rings, labelAngleDeg = 25)` so radial ring scale labels (`25%`, `50%`, `75%`, `100%` or `$50B`, `$100B`, `$150B`, `$183B`) are positioned along `25°` (`1 o'clock` ray) with `text-anchor="start"`, completely clear of the `0°` (`12 o'clock`) axis and all sector midpoint labels in `Equal Angle` and `By Revenue Share (Angle)` modes.
2. **Chart 1 (`#polar-chart-categories`) Sector Callout Label Positioning:**
   - Place external sector callout labels at `labelR = maxR + 24` (`164px` from center) with radial leader lines from `r = Math.max(rOuter, 58)` to `maxR + 14`.
   - Format labels as two high-contrast `<tspan>` lines:
     - Line 1 (`dy="-0.25em"`): Short department name + share (`Foods & Sundries (40.3%)`, `Non-Foods (26.2%)`, `Warehouse Ancillary (18.2%)`, `Fresh Foods (13.4%)`, `Membership Fees (1.9%)`).
     - Line 2 (`dy="1.2em"`, `font-family: var(--font-mono)`, `font-size: 11.5px`, `fill: #334155`): Exact dollar revenue (`$102,520M`, `$66,574M`, `$46,419M`, `$34,112M`, `$4,828M`).
   - In `By Revenue Share` (`data-cat-mode="angle"`) mode, clamp the narrow `Membership Fees (1.9%)` slice (`353.16°` to `360°`, midpoint `356.58°`) to `text-anchor="end"` at `(cx - 14, cy - maxR - 22)` (`x = 186, y = 38`) while `Foods & Sundries (40.3%)` sits at `72.52°` (`x = 356, y = 151`), guaranteeing `0px` bounding-box overlap.
3. **Chart 3 (`#polar-chart-flywheel`) Dual-Ring Mode (`data-fly-mode="asymmetry"`) Leader-Line Callout Fix (`planner-2.5` `seq=#20`):**
   - Do **NOT** place raw multi-line text directly on the inner ring (`r=48..84`) at `x=130` and `x=270` where `>= 12px` text collides with the `r=42` center hub.
   - Instead, route horizontal leader lines from the inner Operating Income ring (`(130, 200) -> (54, 200)` on the left for `48.0% Merch Profit ($4,457M)` and `(270, 200) -> (346, 200)` on the right for `52.0% Fee Profit ($4,828M)`) into the expanded `viewBox="-80 -44 560 488"` side margins with `text-anchor="end"` at `x=50` and `text-anchor="start"` at `x=350`, while outer Revenue ring callouts sit cleanly at top (`y=36`, `98.1% Net Sales $249,625M`) and bottom (`y=368`, `1.9% Membership Fees $4,828M`).
4. **Explicit HTML Color & Metric Legends (`.polar-html-legend`):**
   - Add `<div class="polar-html-legend" role="list">...</div>` immediately below each of the three `.polar-svg-stage` containers (`#polar-chart-categories`, `#polar-chart-geography`, `#polar-chart-flywheel`) displaying color swatches, department/segment names, dollar totals, and percentage shares.
5. **Companion Table Typography Upgrade:**
   - Upgrade `.polar-details-column .corp-table th, .polar-details-column .corp-table td` (`L617`) to `font-size: 12.5px; padding: 8px 10px; line-height: 1.4;`.

#### 3.4.3 Verification Engine Extension ([`src/costco_revenue_model.mjs`](file:///Users/diesel/Desktop/Costco/src/costco_revenue_model.mjs))
`implementer-4` owns [`src/costco_revenue_model.mjs`](file:///Users/diesel/Desktop/Costco/src/costco_revenue_model.mjs) and MUST preserve all existing exports (`loadFinancialDataset`, `verifyFinancialDataset`, `verifyCorporateWebReport`, `runVerificationCli`) and return keys while adding the following Spec 005 checks:
1. **In `verifyFinancialDataset(dataset)`:**
   - `plainEnglishDatasetRolesValid`: Assert none of `fy24.merchandise_categories[].role_in_flywheel` match `/treasure-hunt discretionary basket builder|renewal magnet|perishable weekly trip driver and rapid inventory-turn engine/i`. Append to `checks` and include in `valid`.
2. **In `verifyCorporateWebReport(htmlPath, dataset)`:**
   - `animatedSvgElementsPresent`: Assert `#svg-corporate-flywheel-hero` and `#svg-step-1`..`#svg-step-5` (`>= 5` step micro-SVGs) and `data-motion-toggle` / `#motion-toggle-btn` and `@media (prefers-reduced-motion: reduce)` and `is-motion-paused` exist in [`index.html`](file:///Users/diesel/Desktop/Costco/index.html).
   - `ditherVisualEffectsPresent`: Assert `#dither-bayer-navy`, `#dither-bayer-crimson`, `#dither-halftone-slate`, `#dither-polar-engraving`, and `.dither-accent-band` exist in [`index.html`](file:///Users/diesel/Desktop/Costco/index.html).
   - `simplifiedEnglishValid`: Assert `0` matches in [`index.html`](file:///Users/diesel/Desktop/Costco/index.html) for `/R_total\b|OpInc\s*\(\$9,285M\)\s*=\s*Merch Contrib|Area\s*√r\s*\(Coxcomb\)|Share Angle\s*θ_i|wayfinderAudit\.valid\s*===\s*true|Negative Working-Capital Float|treasure-hunt discretionary basket builder|renewal magnet|perishable weekly trip driver and rapid inventory-turn engine/i`, AND assert `>= 5` occurrences of `class="plain-english-note"` and `>= 3` occurrences of `class="chart-reading-note"`.
   - `polarLegibilityValid`: Assert all 3 polar SVGs use expanded `viewBox="-80 -44 560 488"`, `.polar-sector-label` font-size is `>= 12px`, `.polar-axis-label` font-size is `>= 10.5px`, and `polar-html-legend` appears `>= 3` times.
   - `responsiveArchitectureValid`: Assert [`index.html`](file:///Users/diesel/Desktop/Costco/index.html) contains fluid `clamp(` rules and `@media` breakpoints covering `1120px`, `1080px`, `860px`, `640px`, and `400px`.
   - Include all 5 new boolean flags in the returned report object and in the composite `valid` boolean.

---

### 3.5 Pillar 5 (`AC-05` — Owned by `implementer-5`): 100% Screen-Size-Agnostic Responsive Architecture & Keyboard Accessibility

#### 3.5.1 Fluid CSS Architecture & Responsive Breakpoints (`320px` to `2560px+`)
- **Fluid Typography & Spacing (`:root` in `R5`):**
  - Section `h1`: `clamp(1.45rem, 2.4vw + 0.6rem, 2.35rem)`
  - Section `h2`: `clamp(1.18rem, 1.6vw + 0.5rem, 1.65rem)`
  - Card `h3`: `clamp(0.98rem, 1vw + 0.45rem, 1.2rem)`
  - Primary KPI metric (`.kpi-primary-val`): `clamp(1.35rem, 2vw + 0.5rem, 2.05rem)`
  - Body copy: `clamp(0.9rem, 0.35vw + 0.82rem, 1.02rem)` (`line-height: 1.62`)
- **Grid & Flex Containment (`0px` Overflow Guarantee):**
  - Apply `min-width: 0; max-width: 100%;` to `.corp-main`, `.report-section`, `.polar-panel-card`, `.polar-svg-stage`, `.polar-details-column`, `.kpi-card`, `.step-card`, and `.table-scroll-wrapper`.
  - Wrap all `.corp-table` instances in `.table-scroll-wrapper { width: 100%; max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }`.
- **Mandatory Viewport Breakpoint Rules:**
  - `>= 1920px`: `.corp-layout { max-width: 1680px; margin: 0 auto; }` so 4K/ultra-wide screens (`1920px`, `2560px`) remain balanced.
  - `<= 1120px`: `.polar-grid-layout { grid-template-columns: minmax(0, 1fr); }` (stacks polar SVG stage cleanly above companion details/tables).
  - `<= 1080px`: `.corp-layout { grid-template-columns: minmax(0, 1fr); }` and `#table-of-contents` converts into a sticky horizontal wrap/pill bar with zero horizontal page overflow.
  - `<= 860px`: `.kpi-scorecard-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }`.
  - `<= 640px`: `.kpi-scorecard-grid { grid-template-columns: minmax(0, 1fr); }`; `.polar-panel-header`, `.section-header`, and `.corp-header-inner` stack cleanly; all interactive buttons (`.polar-mode-btn`, `.step-nav-btn`, `.ticket-tab-btn`, `#motion-toggle-btn`) enforce `min-height: 36px; padding: 6px 12px;`.
  - `<= 400px` (`320px`, `375px`, `390px` compact mobile): Reduce container padding to `12px`, wrap `.equation-pill` items cleanly (`white-space: normal; word-break: break-word;`), and scale `#svg-corporate-flywheel-hero` and `#svg-polar-*` via intrinsic `viewBox` (`width: 100%; height: auto;`) so `document.documentElement.scrollWidth <= window.innerWidth` holds at `320px`.

#### 3.5.2 Full Keyboard Accessibility (`bindInteractiveTableRows` & `bindTablistKeyboardNav`)
1. **`bindInteractiveTableRows()`:**
   - In `renderCategoryPolarChart()` and `renderGeographyPolarChart()`, render `<tr data-cat-row="${i}" tabindex="0" role="button" aria-selected="${i === activeCategoryIndex}">` and `<tr data-geo-row="${i}" tabindex="0" role="button" aria-selected="${i === activeGeoIndex}">`.
   - Attach `keydown` listeners supporting `Enter`/`Space` (activates row and prevents page scroll) and `ArrowUp`/`ArrowDown` (cycles selection), and restore focus to the newly rendered `[data-cat-row="${activeCategoryIndex}"]` / `[data-geo-row="${activeGeoIndex}"]` after innerHTML updates.
2. **`bindTablistKeyboardNav()`:**
   - Attach `ArrowLeft`, `ArrowRight`, `Home`, and `End` keyboard navigation to `[data-step-btn]` (`#step-nav-bar`) and `[data-ticket-tab]` (`#ticket-tab-bar`), moving focus alongside active tab selection.
3. **rAF-Gated Scroll Spy (`initScrollSpy()`):**
   - Guard scroll handler with `requestAnimationFrame` (`scrollTicking` flag) to keep scroll frame times well below `16ms`.

---

## 4. Operational Budgets & Stage 4 Verification Matrix (`tester-1`..`tester-5`)

| Verification Gate | Target / Budget | Verification Command / Method |
| :--- | :--- | :--- |
| **CLI Verification (`npm run verify`)** | Exit code `0`, `overallValid: true`, runtime $\le 250\text{ ms}$, RSS $\le 128\text{ MB}$ | `node src/costco_revenue_model.mjs --verify` |
| **Dataset & Embedded Parity** | `0` byte/value drift between [`data/costco_revenue_breakdown.json`](file:///Users/diesel/Desktop/Costco/data/costco_revenue_breakdown.json) and `EMBEDDED_DATASET` | `verifyCorporateWebReport().embeddedDatasetMatchesFile === true` |
| **Multi-Viewport Overflow Sweep** | `document.documentElement.scrollWidth <= window.innerWidth` across `320px`, `375px`, `390px`, `768px`, `1024px`, `1280px`, `1440px`, `1920px`, `2560px` | Headless Chromium / Playwright viewport sweep |
| **Polar SVG Label Collision Audit** | `0` pairwise `getBoundingClientRect()` intersections across all modes (`area`, `radius`, `angle`, `overlay`, `asymmetry`, `ancillary`) | Automated DOM bounding-box intersection check in headless Chromium |
| **Runtime Hygiene & Offline Self-Containment** | `0` console errors, `0` uncaught page errors, `0` external network requests, `0` Dreamcore markers | Headless Chromium request/console listener + `npm run verify` |
