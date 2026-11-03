# Stack, API, MCP & Library Usage Guide: Costco Wholesale Corporation (`COST`) Interactive Corporate Report & Verification Engine

**Run ID:** `20261103T204534-693-1b8y`  
**Agent:** `planner-2.3` (Stack, API, MCP & Library Usage Architect)  
**Governing Specification:** [`wayfinder/20261103T204534-693-1b8y/refined-specification.md`](./refined-specification.md) ([`functional_specification_003.md`](../../functional_specification_003.md))  
**Authoritative Vocabulary:** [`LANGUAGE.md`](../../LANGUAGE.md)  
**Upstream Scanner Inputs:**
- [`wayfinder/20261103T204534-693-1b8y/installed-libraries.md`](./installed-libraries.md) (`library-installer`)
- [`wayfinder/20261103T204534-693-1b8y/library-functions.md`](./library-functions.md) (`function-mapper`)
- [`wayfinder/20261103T204534-693-1b8y/api-schemas.md`](./api-schemas.md) (`api-schema-mapper`)
- [`wayfinder/20261103T204534-693-1b8y/mcp-tools.md`](./mcp-tools.md) (`mcp-provisioner`)
- [`wayfinder/20261103T204534-693-1b8y/codebase-map.md`](./codebase-map.md) (`codebase-mapper`)  
**Status:** Practical Stack Usage Baseline for `plan-2`, Implementers, Reviewers & Testers. **DO NOT CODE YET.**

---

## 1. Purpose, Scope & Working Baseline Framing

This document synthesizes the verified runtimes, native language primitives, CSS3/SVG coordinate patterns, primary-source JSON schemas, and Model Context Protocol (MCP) browser automation tools into a practical **"how this stack should be used"** implementation guide for upgrading [`index.html`](../../index.html), [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs), [`README.md`](../../README.md), and [`wayfinder/tickets/ticket-006.md`](../tickets/ticket-006.md).

> [!IMPORTANT]
> **Working Baseline Framing:** This guide serves as a strong, opinionated, empirically verified starting foundation designed to accelerate downstream coding and verification agents. It is a practical working baseline rather than a rigid philosophical ceremony—where live runtime telemetry or browser layout measurements reveal a tighter adjustment (such as exact SVG `viewBox` padding or `IntersectionObserver` threshold tuning), agents should always honor live runtime reality (`RULE[user_global]`) while strictly enforcing every invariant in [`LANGUAGE.md`](../../LANGUAGE.md) and [`refined-specification.md`](./refined-specification.md).

```mermaid
flowchart LR
    subgraph Offline Ground Truth
        JSON["data/costco_revenue_breakdown.json\n(RFC 8259 · Audited FY22–FY24 10-K)"]
        MONO["research/costco_revenue_architecture.md\n(CIK 0000909832 Monograph)"]
        WF["wayfinder/map.md +\ntickets/ticket-001..006.md"]
    end

    subgraph Browser Client Stack (index.html)
        HTML5["Semantic HTML5\n(Plain Technical English)"]
        CSS3["CSS3 Custom Properties, Grid & SVG Rules\n(.polar-grid-ring, .drilldown-meta-grid, .is-breach)"]
        SVG["Inline SVG Polar Coordinate Engine\n(viewBox='-55 -28 510 456', rInner=34..42px)"]
        IIFE["Vanilla ES2022 IIFE Controllers\n(Reconciled Data + Scroll-Spy + Keyboard A11y)"]
        HTML5 --> SVG
        CSS3 --> SVG
        IIFE --> SVG
    end

    subgraph Node.js v24.9.0 ESM Verifier (src/costco_revenue_model.mjs)
        NODE["Node Builtins Only\n(node:fs, path, process, perf_hooks, url)"]
        VERIFY["verifyCorporateWebReport()\n(<250ms, <128MB RSS, 0 Network Calls)"]
        NODE --> VERIFY
    end

    subgraph Live MCP Verification Harness
        PUP["puppeteer MCP\n(Direct file:/// Zero-Daemon Checks)"]
        PW["playwright MCP + python3 http.server\n(A11y Tree, Enter/Space Keys, 390px/1440px)"]
    end

    JSON -. "100% Note 11 & Item 2\nData Reconciliation" .-> IIFE
    JSON --> VERIFY
    MONO --> VERIFY
    WF --> VERIFY
    HTML5 --> VERIFY
    SVG --> PUP
    SVG --> PW
```

---

## 2. Runtime & Language Baseline

### 2.1 Node.js `v24.9.0` Native ESM Verification Stack ([`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs))

- **Executable & Module Mode:** `/opt/homebrew/bin/node` (`v24.9.0`), native ECMAScript Modules (`"type": "module"` in [`package.json`](../../package.json)).
- **Allowed Imports (Built-In Node Core Only):**
  ```javascript
  import fs from "node:fs";
  import path from "node:path";
  import process from "node:process";
  import { performance } from "node:perf_hooks";
  import { fileURLToPath } from "node:url";
  ```
- **Zero External Runtime Dependencies & Zero Network Calls:**
  - Do **not** import third-party npm packages (`cheerio`, `jsdom`, `chalk`, `zod`, etc.) in [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs).
  - Do **not** invoke `fetch()`, `http.request()`, or `https.get()`. `telemetry.externalNetworkRequests` must remain strictly `0`.
- **Operational Budgets (`RULE[user_global]`):**
  - **Wall-Clock Latency:** $\le 250\text{ ms}$ (empirical baseline: **`7.64 ms`**).
  - **Memory Footprint (RSS):** $\le 128\text{ MB}$ (empirical baseline: **`46.53 MB`**).
- **Idiomatic Coding Conventions in `src/costco_revenue_model.mjs`:**
  - Use `const` by default and `let` only for loop counters or regex cursors.
  - Fail fast (`throw new Error(...)`) with descriptive context naming the exact file label (`htmlLabel`) and the exact offending token, missing CSS selector, or unverified number. Never swallow exceptions or return `false` silently.
  - Preserve all 6 exported symbols and their polymorphic option signatures (`rawOptions?: string | object`):
    1. `verifyFinancialDataset(data)`
    2. `verifyWayfinderArtifacts(rawOptions = {})`
    3. `verifyResearchMonograph(rawOptions = {})`
    4. `verifyCorporateWebReport(rawOptions = {})`
    5. `verifyIndexHtml` (alias of `verifyCorporateWebReport`)
    6. `loadAndVerifyCostcoModel(rawOptions = {})`

### 2.2 Browser Client Stack ([`index.html`](../../index.html))

- **Self-Contained Single-File Architecture:**
  - All HTML5 structure, CSS3 rules (`<style>` lines `9–983`), inline SVG containers (`#svg-polar-categories`, `#svg-polar-geography`, `#svg-polar-flywheel`), and interactive ES2022/ES5-compatible JavaScript (`<script>` IIFE lines `1852–3044`) reside inside [`index.html`](../../index.html).
  - Zero external `<link rel="stylesheet">`, zero `@import url(...)`, zero Google Fonts CDNs, and zero external `<script src="...">`.
- **Idiomatic JavaScript Style Inside the `<script>` IIFE:**
  - Keep all client code inside the single strict-mode IIFE:
    ```javascript
    (function () {
      "use strict";
      // Data constants, pure geometry helpers, view renderers, and init()
    })();
    ```
  - **Important Comment Rule Inside `<script>`:** Because `verifyCorporateWebReport` will audit [`index.html`](../../index.html) for leaked ` // ` pseudo-code dividers, prefer standard block comments `/* ... */` or ensure single-line comments never appear inside string literals or visible HTML text.
  - **Fast Number Formatting (`formatUsdM`):** Use a cached `Intl.NumberFormat("en-US")` instance rather than calling `Number(num).toLocaleString("en-US")` repeatedly during 60fps range-slider `input` events:
    ```javascript
    var USD_FORMATTER = new Intl.NumberFormat("en-US");
    function formatUsdM(num) {
      return "$" + USD_FORMATTER.format(Number(num)) + "M";
    }
    ```
- **Idiomatic CSS3 & Layout Isolation:**
  - Reference design tokens from `:root` (`--costco-crimson: #E31837`, `--costco-navy: #005DAA`, `--ink-primary: #0F172A`, `--bg-canvas: #F8FAFC`, `--bg-card: #FFFFFF`, `--cat-emerald: #059669`, `--border-subtle: #E2E8F0`, `--border-strong: #CBD5E1`).
  - Never reference undefined custom properties (replace `var(--emerald-audit)` at line `2881` with `var(--cat-emerald)`).
  - Apply `font-variant-numeric: tabular-nums;` and `font-family: var(--font-mono);` on all financial figures, percentages, and polar center/axis readouts so columns and labels never jitter during interactive state updates.

---

## 3. Opinionated Usage Patterns for Required Refinements

### 3.1 Pattern 1: Straightforward Technical English Editorial Style Guide (`index.html`, `README.md`, `ticket-006.md`)

All reader-facing prose in [`index.html`](../../index.html) (both static HTML markup in lines `985–1850` and JavaScript data/template strings in lines `1852–3044`), [`README.md`](../../README.md), and [`wayfinder/tickets/ticket-006.md`](../tickets/ticket-006.md) must be written in clear, direct, **straightforward technical English**.

#### Rule 1A — Strip All Raw Curly-Brace Specification Tokens (`0` Occurrences Allowed)
In [`LANGUAGE.md`](../../LANGUAGE.md), `{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, and `{Operating Income Flywheel}` are glossary identifiers. In [`index.html`](../../index.html) and [`README.md`](../../README.md), **never** wrap these terms in `{...}` curly braces:

| Prohibited Raw Token in `index.html` | Required Plain Technical English Replacement |
| :--- | :--- |
| `{Net Sales}` | `Net Sales` (or `merchandise net sales` in lower-case prose) |
| `{Membership Fees}` | `Membership Fees` (or `annual membership fees` in lower-case prose) |
| `{Gross Margin Ceiling}` | `Gross Margin Ceiling` (or `10.92% gross margin cap`) |
| `{Operating Income Flywheel}` | `Operating Income Flywheel` (or `operating profit structure`) |

#### Rule 1B — Replace All `//` Pseudo-Code Dividers with Clean Typography (`·` or `—`)
Replace every `//` separator in visible UI text with a middle dot (`·`) or em-dash (`—`):

| Current `index.html` String (Prohibited `//`) | Required Straightforward Technical English Replacement |
| :--- | :--- |
| `Section 01 // Institutional Executive Briefing` | `Section 01 · Executive Summary` |
| `Section 02 // Interactive Polar Coordinate Visual Analytics` | `Section 02 · Interactive Polar Revenue Charts` |
| `Section 03 // Sequential Business Model Walkthrough` | `Section 03 · Five-Step Revenue Model` |
| `Section 04 // Quantitative Financial Conservation & Stress Testing` | `Section 04 · Multi-Year GAAP Income Statement & Sensitivity Simulator` |
| `Section 05 // Primary-Source Governance & Decision Lineage` | `Section 05 · Primary-Source SEC Form 10-K Citations & Wayfinder Audit` |
| `ACTIVE POLAR SECTOR DRILLDOWN // NOTE 11 MERCHANDISE CATEGORY` | `Selected Category Detail · Note 11 Merchandise Disaggregation` |
| `ACTIVE POLAR SECTOR DRILLDOWN // NOTE 11 GEOGRAPHIC SEGMENT` | `Selected Segment Detail · Note 11 & Item 2 Geographic Operations` |
| `ACTIVE POLAR RING DRILLDOWN // STRUCTURAL REVENUE VS. PROFIT ASYMMETRY` | `Selected Pillar Detail · Revenue Share vs. Operating Income Contribution` |
| `ACTIVE POLAR SECTOR DRILLDOWN // ANCILLARY & OMNICHANNEL SUB-DRIVER` | `Selected Channel Detail · Warehouse Ancillary & E-Commerce Operations` |
| `Step 01 // Primary-Source SEC 10-K Telemetry` (..`Step 05 // ...`) | `Step 1 Key Figures (FY2024 Form 10-K)` (..`Step 5 Key Figures (FY2024 Form 10-K)`) |
| `ticket-001.md // Two-Pillar & ASC 606` | `ticket-001.md · Revenue Recognition (ASC 606)` |
| `ticket-002.md // Note 11 & <4,000 SKUs` | `ticket-002.md · Merchandise Categories & SKUs` |
| `ticket-003.md // 92.9% Renewal & Exec Tier` | `ticket-003.md · Membership Tiers & Renewals` |
| `ticket-004.md // 719 Gas & Omnichannel` | `ticket-004.md · Ancillary & E-Commerce` |
| `ticket-005.md // 10.92% Cap & 104.15% Float` | `ticket-005.md · Gross Margin Cap & Working Capital` |
| `ticket-006.md // Corporate UI & Polar Suite` | `ticket-006.md · Corporate Report & Polar Charts` |
| `RESOLVED WAYFINDER TICKET // ` | `Resolved Wayfinder Ticket · ` |

#### Rule 1C — Replace Promotional Metaphors with Direct Accounting & Operational Prose
Replace figurative marketing phrases across Sections 01–05 and JavaScript objects (`CATEGORY_DATA`, `FLYWHEEL_ASYMMETRY_DATA`, `ANCILLARY_ROSE_DATA`, `STEP_SUMMARIES`, `renderGaapWaterfall`, `updateSimulator`) with direct descriptions of the physical warehouse operations and GAAP accounting mechanics:

| Promotional / Figurative Phrase to Remove | Straightforward Technical English Replacement |
| :--- | :--- |
| `Gatekeeper Subscription — Paid Membership Tiers & 92.9% Renewal Lock-In` | `Paid Membership Access and Executive Tier Concentration ($4,828M Membership Fees)` |
| `Concentrated Purchasing Scale — <4,000 Warehouse SKUs & Kirkland Signature` | `High-Volume Purchasing Across Fewer Than 4,000 SKUs ($249,625M Net Sales)` |
| `High-Frequency Trip Magnets — 719 Gas Stations, Ancillary Services & Omnichannel Logistics` | `Ancillary Businesses and E-Commerce Fulfillment ($49,969M Ancillary + ~7% E-Commerce)` |
| `Disciplined Pricing & Negative Working Capital — The 10.92% {Gross Margin Ceiling} & 104.15% Supplier Float` | `The 10.92% Gross Margin Cap and Supplier-Financed Inventory (104.15% Accounts Payable to Inventory)` |
| `The {Operating Income Flywheel} — Converting $4,828M of Fees into 52.00% of Consolidated Operating Profit` | `Operating Profit Conversion ($9,285M Operating Income to $7,367M Net Income)` |
| `Membership Gate ($4,828M)` / `719 Gas & Digital Magnets` (stepper pills) | `Paid Membership ($4,828M)` / `Ancillary & E-Commerce` |
| `Subscription Annuity` | `Annual Membership Fees (ASC 606 Ratable Recognition)` |
| `treasure-hunt discovery loop` / `treasure-hunt discretionary basket builder` | `high-value hardlines, softlines, and seasonal merchandise rotation` |
| `high-frequency weekly parking-lot trip magnet` / `pulls cardholders onto warehouse parking lots` | `drives frequent repeat member visits to warehouse locations through fuel and pharmacy savings` |
| `perceive unmistakable value` / `threatens the 92.9% renewal moat` | `receive consistent unit-price savings over standard retail, supporting the 92.9% U.S./Canada renewal rate` / `reduces Costco's price advantage over supermarkets and risks lowering membership renewal rates` |

---

### 3.2 Pattern 2: Inline SVG Polar Coordinate Geometry & CSS Styling Baseline (`index.html`)

#### Root Cause of Current SVG Rendering Defects
In the current [`index.html`](../../index.html), `renderPolarGrid()` and `renderPolarCategories()` / `renderPolarGeography()` / `renderPolarFlywheel()` emit `<circle class="polar-grid-ring">`, `<line class="polar-axis-spoke">`, `<text class="polar-center-title">`, `<text class="polar-center-sub">`, `<text class="polar-sector-label">`, `<text class="polar-axis-label">`, and `<div class="drilldown-meta-grid">`, but **none of those classes are defined in `<style>`**. Because SVG `<circle>` defaults to `fill: #000000` (opaque solid black) when `fill` is omitted, the four concentric grid rings render as a solid black circle obliterating the chart background.

#### Required CSS Rules to Add in `<style>` (Before `@media (max-width: 1080px)` around Line `966`)

```css
    /* Polar SVG Grid Rings, Spokes, Hub Typography & Callout Labels */
    .polar-grid-ring {
      fill: none;
      stroke: var(--border-strong);
      stroke-width: 1px;
      stroke-dasharray: 3 3;
    }

    .polar-axis-spoke {
      stroke: var(--border-strong);
      stroke-width: 1px;
    }

    .polar-center-title {
      text-anchor: middle;
      font-family: var(--font-mono);
      font-size: 11.5px;
      font-weight: 800;
      fill: var(--ink-primary);
    }

    .polar-center-sub {
      text-anchor: middle;
      font-family: var(--font-mono);
      font-size: 9.5px;
      font-weight: 600;
      fill: var(--ink-muted);
    }

    .polar-sector-label {
      font-family: var(--font-sans);
      font-size: 11.5px;
      font-weight: 700;
      fill: var(--ink-primary);
    }

    .polar-axis-label {
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 600;
      fill: var(--ink-secondary);
    }

    .polar-sector-path:focus-visible {
      outline: none;
      stroke: var(--ink-primary);
      stroke-width: 2.5px;
      opacity: 1;
    }

    /* Polar Drill-Down Card Typography & Key-Value Metadata Grid */
    .drilldown-eyebrow {
      font-family: var(--font-mono);
      font-size: 10.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--costco-crimson);
      margin-bottom: 4px;
    }

    .drilldown-title {
      font-size: 15px;
      font-weight: 800;
      color: var(--ink-primary);
      margin-bottom: 6px;
    }

    .drilldown-copy {
      font-size: 13px;
      color: var(--ink-secondary);
      line-height: 1.55;
    }

    .drilldown-meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--border-subtle);
    }

    .drilldown-meta-item {
      background: var(--bg-well);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .drilldown-meta-item span {
      font-size: 11px;
      font-weight: 600;
      color: var(--ink-muted);
    }

    .drilldown-meta-item strong {
      font-family: var(--font-mono);
      font-size: 12.5px;
      font-weight: 800;
      color: var(--ink-primary);
    }

    /* Sensitivity Simulator Gross Margin Ceiling Breach State */
    .sim-output-banner.is-breach {
      background: var(--costco-crimson-soft);
      border-color: var(--costco-crimson);
      border-left: 4px solid var(--costco-crimson);
      color: var(--ink-primary);
    }
```

#### Padded SVG `viewBox` & Polar Callout Geometry
1. **Expand `viewBox` on all three `<svg>` elements (`#svg-polar-categories`, `#svg-polar-geography`, `#svg-polar-flywheel`):**
   - Change `viewBox="0 0 400 400"` to **`viewBox="-55 -28 510 456"`** in the static HTML markup (lines `1237`, `1294`, `1351`), and increase `.polar-svg` `max-width` from `380px` to `430px` so the chart remains visually prominent while giving horizontal callout labels ($x \in [-55, 455]$, $y \in [-28, 428]$ around center $(200, 200)$) a `55px` horizontal margin and `28px` vertical margin on each side.
2. **Inner Hub Radius (`rInner`), Outer Radius (`maxR`) & Trigonometric Callout Fit (`planner-2.4` + `planner-2.3` Joint Verification):**
   - Use `rInner = 36` (on Categories, Geography, and Flywheel Ancillary Rose; `42` on Flywheel Asymmetry hub) so two-line centered hub labels (`FY24` / `$249.6B`, `$254.5B` / `Total Rev`, `$9,285M` / `FY24 OpInc`, `$49.97B` / `Ancillary`) sit cleanly inside the white center circle without touching the `#CBD5E1` border.
   - **Trigonometric Bounding-Box Fit:** Inside `viewBox="-55 -28 510 456"` ($X \in [-55, 455], Y \in [-28, 428]$), set `maxR = 120` (up to `122`) and place outer sector callouts at `polarPoint(cx, cy, maxR + 15, midDeg)` (so callout anchor radius $r_{\text{label}} = 135\text{px}$). At $r_{\text{label}} = 135\text{px}$, even the longest callout strings (`614 Clubs ($299.9M/Club)` at $60^\circ$ and `Pharmacy +3% YoY (+$1,276M)` at $135^\circ$ / $315^\circ$) span $X \in [-45.6, 450.8]$, remaining strictly inside `[-55, 455] × [-28, 428]` across all 9 chart modes and at both `390px` mobile and `1440px` desktop viewports (alternatively, if keeping `maxR = 132..136`, widen `viewBox` to `"-90 -28 580 456"`).
3. **3-Year Overlay Visual Legend (`catState.year === "overlay"`):**
   - When `catState.year === "overlay"` is active in `renderPolarCategories()`, append a concise SVG legend strip at the bottom of the `viewBox` (e.g., `y = 414`) or inside `#polar-cat-caption` clearly distinguishing:
     - **Solid Fill:** `FY2024 ($249,625M)`
     - **Dark Dashed Outline (`#0F172A`, `stroke-dasharray="5 2"`):** `FY2023 ($237,710M)`
     - **Slate Dotted Outline (`#64748B`, `stroke-dasharray="2 2"`):** `FY2022 ($222,730M)`

---

### 3.3 Pattern 3: Primary-Source Data Reconciliation (`CATEGORY_DATA` & `GEOGRAPHY_DATA`)

Drop-in reconciled datasets for [`index.html`](../../index.html) (lines `1857–1962`), matching [`data/costco_revenue_breakdown.json`](../../data/costco_revenue_breakdown.json) 100%:

```javascript
    var CATEGORY_DATA = [
      {
        id: "foods_and_sundries",
        name: "Foods and Sundries",
        shortName: "Foods & Sundries",
        color: "#005DAA",
        salesByYear: { 2022: 85629, 2023: 96175, 2024: 101463 },
        shareByYear: { 2022: 38.45, 2023: 40.46, 2024: 40.65 },
        yoy24: "+5.50%",
        departments: "Dry grocery, snacks, candy, alcoholic and non-alcoholic beverages, cleaning supplies, household paper and sundries",
        role: "Largest merchandise category ($101,463M or 40.65% of FY2024 Net Sales; +5.50% YoY); anchors recurring household grocery replenishment and high-volume Kirkland Signature pantry staples."
      },
      {
        id: "non_foods",
        name: "Non-Foods",
        shortName: "Non-Foods",
        color: "#0F172A",
        salesByYear: { 2022: 61100, 2023: 60865, 2024: 63973 },
        shareByYear: { 2022: 27.43, 2023: 25.60, 2024: 25.63 },
        yoy24: "+5.11%",
        departments: "Major appliances, consumer electronics, health and beauty aids, hardware, lawn and garden, apparel, jewelry, housewares, automotive",
        role: "Second-largest merchandise category ($63,973M or 25.63% of FY2024 Net Sales; +5.11% YoY); combines hardlines, softlines, seasonal merchandise rotation, and big-and-bulky appliance delivery through Costco Logistics."
      },
      {
        id: "warehouse_ancillary_and_other",
        name: "Warehouse Ancillary and Other Businesses",
        shortName: "Ancillary & Other",
        color: "#E31837",
        salesByYear: { 2022: 46474, 2023: 48693, 2024: 49969 },
        shareByYear: { 2022: 20.87, 2023: 20.48, 2024: 20.02 },
        yoy24: "+2.62%",
        departments: "719 Gasoline stations (~$30B / ~12% of Net Sales), Pharmacy (+3% YoY / +$1,276M), Optical, Food Court, Hearing Aids, Tire Installation, E-Commerce, Costco Travel",
        role: "Generates $49,969M (20.02% of FY2024 Net Sales; +2.62% YoY). Below-market retail fuel and prescription pharmacy pricing drive frequent repeat member visits to warehouse locations."
      },
      {
        id: "fresh_foods",
        name: "Fresh Foods",
        shortName: "Fresh Foods",
        color: "#059669",
        salesByYear: { 2022: 29527, 2023: 31977, 2024: 34220 },
        shareByYear: { 2022: 13.26, 2023: 13.45, 2024: 13.71 },
        yoy24: "+7.01%",
        departments: "Meat (including vertically integrated processing plants), fresh produce, service deli ($4.99 rotisserie chicken), in-warehouse bakery",
        role: "Fastest-growing merchandise category in FY2024 ($34,220M or 13.71% of Net Sales; +7.01% YoY); drives weekly perishable shopping trips and supports 12.60x annual inventory turnover."
      }
    ];

    var GEOGRAPHY_DATA = [
      {
        id: "united_states",
        name: "United States (incl. Puerto Rico)",
        shortName: "United States",
        color: "#005DAA",
        revenueM: 184143,
        revSharePct: 72.37,
        opIncM: 6217,
        opIncSharePct: 66.96,
        opMarginPct: 3.38,
        warehouses: 614,
        clubSharePct: 68.99,
        ownedWarehouses: 499,
        leasedWarehouses: 115,
        floorSpaceSqFtM: 91.1,
        employees: 219000,
        revPerClubM: 299.91,
        opIncPerClubM: 10.13,
        role: "Primary domestic operating segment (614 warehouses across 47 U.S. states, Washington D.C., and Puerto Rico; 499 owned and 115 leased across 91.1M sq ft with 219,000 employees), generating $184,143M in total revenue (72.37%) and $6,217M in operating income."
      },
      {
        id: "other_international",
        name: "Other International (12 Countries)",
        shortName: "Other Intl",
        color: "#059669",
        revenueM: 35436,
        revSharePct: 13.93,
        opIncM: 1420,
        opIncSharePct: 15.29,
        opMarginPct: 4.01,
        warehouses: 168,
        clubSharePct: 18.88,
        ownedWarehouses: 113,
        leasedWarehouses: 55,
        floorSpaceSqFtM: 24.3,
        employees: 61000,
        revPerClubM: 210.93,
        opIncPerClubM: 8.45,
        role: "International operating segment across 12 countries: Mexico (40), Japan (35), U.K. (29), Korea (19), Australia (15), Taiwan (14), China (7), Spain (4), France (2), Iceland (1), New Zealand (1), and Sweden (1) (113 owned and 55 leased across 24.3M sq ft with 61,000 employees), generating $35,436M in revenue and $1,420M in operating income (4.01% margin)."
      },
      {
        id: "canada",
        name: "Canada",
        shortName: "Canada",
        color: "#E31837",
        revenueM: 34874,
        revSharePct: 13.71,
        opIncM: 1648,
        opIncSharePct: 17.75,
        opMarginPct: 4.73,
        warehouses: 108,
        clubSharePct: 12.13,
        ownedWarehouses: 91,
        leasedWarehouses: 17,
        floorSpaceSqFtM: 15.5,
        employees: 53000,
        revPerClubM: 322.91,
        opIncPerClubM: 15.26,
        role: "Highest-productivity geographic segment per warehouse: 108 Canadian clubs (91 owned and 17 leased across 15.5M sq ft with 53,000 employees) average $322.91M in revenue per club and $15.26M in operating income per club at a 4.73% operating margin ($1,648M operating income)."
      }
    ];
```

And in `renderPolarGeography()` (lines `2439–2476`), display the reconciled Item 2 property ownership breakdown:
- Per segment row in `#tbody-polar-geography`: `g.warehouses + " (" + g.ownedWarehouses + " owned / " + g.leasedWarehouses + " leased)"`
- Consolidated footer row in `#tbody-polar-geography`: `890 (703 owned / 187 leased)`
- Caption (`#polar-geo-caption` when `geoState.metric === "warehouses"`): `"Metric: Warehouse Property Footprint (890 Total: 703 Owned Land & Building, 187 Leased [134 Land Leases with Owned Building = 837 Owned Buildings], 130.9M Sq Ft)"`

---

### 3.4 Pattern 4: Keyboard Accessibility (`bindPolarSectorEvents`) & Sticky Scroll-Spy TOC (`syncTocActiveState` + `initScrollSpy`)

#### A. Reusable Polar Sector Pointer & Keyboard Helper (`bindPolarSectorEvents`)
Because `renderPolarCategories()`, `renderPolarGeography()`, and `renderPolarFlywheel()` re-assign `svg.innerHTML = svgMarkup` on every selection change, the previously focused `<path>` element is destroyed on re-render. Use this exact helper to bind pointer clicks, `Enter`/`Space` keyboard activation, and post-render focus restoration:

```javascript
    function bindPolarSectorEvents(svgElement, dataAttr, onSelect) {
      if (!svgElement) return;
      var sectorPaths = svgElement.querySelectorAll("[" + dataAttr + "]");
      for (var s = 0; s < sectorPaths.length; s++) {
        sectorPaths[s].addEventListener("click", function () {
          var idx = Number(this.getAttribute(dataAttr));
          onSelect(idx, false, null);
        });
        sectorPaths[s].addEventListener("keydown", function (evt) {
          if (evt.key === "Enter" || evt.key === " " || evt.key === "Spacebar") {
            evt.preventDefault();
            var idx = Number(this.getAttribute(dataAttr));
            var ringId = this.getAttribute("data-fly-ring");
            onSelect(idx, true, ringId);
          }
        });
      }
    }
```

And inside each renderer (e.g., `renderPolarCategories()`):
```javascript
      bindPolarSectorEvents(svg, "data-cat-sector", function (selectedIdx, restoreFocus) {
        catState.selectedIndex = selectedIdx;
        renderPolarCategories();
        if (restoreFocus) {
          var nextFocusEl = svg.querySelector('[data-cat-sector="' + selectedIdx + '"]');
          if (nextFocusEl && typeof nextFocusEl.focus === "function") {
            nextFocusEl.focus();
          }
        }
      });
```
*(In `renderPolarFlywheel()`, add `data-fly-ring="outer"` on the two outer-ring `<path>` elements and `data-fly-ring="inner"` on the two inner-ring `<path>` elements so focus restoration can query `ringId ? '[data-fly-sector="' + selectedIdx + '"][data-fly-ring="' + ringId + '"]' : '[data-fly-sector="' + selectedIdx + '"]'`.)*

#### B. Sticky Table of Contents Scroll-Spy & Parent-Link Synchronization (`syncTocActiveState` & `initScrollSpy`)
When a `.toc-sublink` (such as `#polar-chart-categories` or `#step-3`) is clicked or scrolled into view, **both** that `.toc-sublink` and its parent `.toc-link` (`#section-polar-graphs` or `#section-five-steps`) must receive `.is-active`, and the active target link must receive `aria-current="location"`:

```javascript
    var activeTocTargetId = "";

    function syncTocActiveState(targetId) {
      if (!targetId || targetId === activeTocTargetId) return;
      activeTocTargetId = targetId;

      var allTocAnchors = document.querySelectorAll("#table-of-contents a[data-toc-target]");
      var activeAnchor = null;

      for (var i = 0; i < allTocAnchors.length; i++) {
        var link = allTocAnchors[i];
        var isMatch = link.getAttribute("data-toc-target") === targetId;
        link.classList.toggle("is-active", isMatch);
        if (isMatch) {
          link.setAttribute("aria-current", "location");
          activeAnchor = link;
        } else {
          link.removeAttribute("aria-current");
        }
      }

      if (activeAnchor && activeAnchor.classList.contains("toc-sublink")) {
        var parentList = activeAnchor.closest(".toc-sublist");
        var parentLi = parentList ? parentList.parentElement : null;
        var parentLink = parentLi ? parentLi.querySelector(":scope > a.toc-link") : null;
        if (parentLink) {
          parentLink.classList.add("is-active");
        }
      }
    }

    function initScrollSpy() {
      var targetIds = [
        "section-executive-summary",
        "section-polar-graphs",
        "polar-chart-categories",
        "polar-chart-geography",
        "polar-chart-flywheel",
        "section-five-steps",
        "step-1",
        "step-2",
        "step-3",
        "step-4",
        "step-5",
        "section-gaap-model",
        "section-wayfinder-audit"
      ];
      var trackedElements = [];
      for (var i = 0; i < targetIds.length; i++) {
        var el = document.getElementById(targetIds[i]);
        if (el) trackedElements.push(el);
      }

      function updateFromScrollPosition() {
        var thresholdY = window.scrollY + 140;
        var currentId = trackedElements.length ? trackedElements[0].id : "section-executive-summary";
        for (var j = 0; j < trackedElements.length; j++) {
          var rect = trackedElements[j].getBoundingClientRect();
          var absTop = rect.top + window.scrollY;
          if (absTop <= thresholdY) {
            currentId = trackedElements[j].id;
          }
        }
        syncTocActiveState(currentId);
      }

      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(
          function (entries) {
            for (var k = 0; k < entries.length; k++) {
              if (entries[k].isIntersecting) {
                syncTocActiveState(entries[k].target.id);
              }
            }
          },
          { root: null, rootMargin: "-96px 0px -65% 0px", threshold: 0.05 }
        );
        for (var m = 0; m < trackedElements.length; m++) {
          observer.observe(trackedElements[m]);
        }
      }

      window.addEventListener("scroll", updateFromScrollPosition, { passive: true });
    }
```

And in the TOC click listener inside `init()`:
```javascript
      var tocLinks = document.querySelectorAll("#table-of-contents a[data-toc-target]");
      for (var t = 0; t < tocLinks.length; t++) {
        tocLinks[t].addEventListener("click", function () {
          var targetId = this.getAttribute("data-toc-target");
          var stepAttr = this.getAttribute("data-toc-step");
          if (stepAttr) {
            setActiveStep(Number(stepAttr), false);
          }
          activeTocTargetId = ""; // Force immediate update on click
          syncTocActiveState(targetId);
        });
      }
```

---

### 3.5 Pattern 5: Deterministic Verification Extension in [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs)

Add the following constants at the top of [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs) (after `REQUIRED_CORPORATE_WEB_FIGURES` at line `109`) and enforce them inside `verifyCorporateWebReport(rawOptions)`:

```javascript
const PROHIBITED_SPEC_TOKENS = [
  "{Net Sales}",
  "{Membership Fees}",
  "{Gross Margin Ceiling}",
  "{Operating Income Flywheel}"
];

const PROHIBITED_PSEUDOCODE_DIVIDERS = [
  "Section 01 //",
  "Section 02 //",
  "Section 03 //",
  "Section 04 //",
  "Section 05 //",
  "DRILLDOWN //",
  "Step 01 //",
  "Step 02 //",
  "Step 03 //",
  "Step 04 //",
  "Step 05 //",
  "ticket-001.md //",
  "ticket-002.md //",
  "ticket-003.md //",
  "ticket-004.md //",
  "ticket-005.md //",
  "ticket-006.md //",
  "TICKET //"
];

const REQUIRED_POLAR_CSS_SELECTORS = [
  ".polar-grid-ring",
  ".polar-axis-spoke",
  ".polar-sector-label",
  ".polar-center-title",
  ".polar-center-sub",
  ".drilldown-meta-grid",
  ".drilldown-meta-item",
  ".sim-output-banner.is-breach"
];

const REQUIRED_RECONCILED_CATEGORY_GROUPS = [
  { label: "Foods and Sundries FY2022 ($85,629M)", tokens: ["85,629", "85629"] },
  { label: "Foods and Sundries FY2023 ($96,175M)", tokens: ["96,175", "96175"] },
  { label: "Foods and Sundries FY2024 ($101,463M)", tokens: ["101,463", "101463"] },
  { label: "Non-Foods FY2022 ($61,100M)", tokens: ["61,100", "61100"] },
  { label: "Non-Foods FY2023 ($60,865M)", tokens: ["60,865", "60865"] },
  { label: "Non-Foods FY2024 ($63,973M)", tokens: ["63,973", "63973"] },
  { label: "Warehouse Ancillary FY2022 ($46,474M)", tokens: ["46,474", "46474"] },
  { label: "Warehouse Ancillary FY2023 ($48,693M)", tokens: ["48,693", "48693"] },
  { label: "Warehouse Ancillary FY2024 ($49,969M)", tokens: ["49,969", "49969"] },
  { label: "Fresh Foods FY2022 ($29,527M)", tokens: ["29,527", "29527"] },
  { label: "Fresh Foods FY2023 ($31,977M)", tokens: ["31,977", "31977"] },
  { label: "Fresh Foods FY2024 ($34,220M)", tokens: ["34,220", "34220"] },
  { label: "Item 2 Owned Warehouses (703)", tokens: ["703"] },
  { label: "Item 2 Leased Warehouses (187)", tokens: ["187"] }
];

const PROHIBITED_UNVERIFIED_CATEGORY_FIGURES = [
  "88948", "88,948",
  "96936", "96,936",
  "60876", "60,876",
  "60292", "60,292",
  "43443", "43,443",
  "29463", "29,463",
  "31789", "31,789"
];
```

And inside `verifyCorporateWebReport(rawOptions)` (just before `return` at line `1013`):

```javascript
  for (const specToken of PROHIBITED_SPEC_TOKENS) {
    if (resolvedHtml.includes(specToken)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: unrefined specification token "${specToken}" detected in reader-facing HTML.`
      );
    }
  }

  for (const divider of PROHIBITED_PSEUDOCODE_DIVIDERS) {
    if (resolvedHtml.includes(divider)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: pseudo-code divider "${divider}" detected in reader-facing HTML.`
      );
    }
  }

  const styleBlocks = [];
  const styleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  let styleMatch;
  while ((styleMatch = styleRegex.exec(resolvedHtml)) !== null) {
    styleBlocks.push(styleMatch[1]);
  }
  const combinedCss = styleBlocks.join("\n");

  for (const selector of REQUIRED_POLAR_CSS_SELECTORS) {
    if (!combinedCss.includes(selector)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: missing required CSS rule "${selector}" in <style>.`
      );
    }
  }

  if (resolvedHtml.includes("--emerald-audit")) {
    throw new Error(
      `Corporate web report audit failed for ${htmlLabel}: undefined CSS custom property "--emerald-audit" detected (use "--cat-emerald").`
    );
  }

  for (const group of REQUIRED_RECONCILED_CATEGORY_GROUPS) {
    const found = group.tokens.some((tok) => resolvedHtml.includes(tok));
    if (!found) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: missing audited Note 11 / Item 2 figure for ${group.label}.`
      );
    }
  }

  for (const legacyFig of PROHIBITED_UNVERIFIED_CATEGORY_FIGURES) {
    if (resolvedHtml.includes(legacyFig)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: unverified legacy category figure "${legacyFig}" detected (must reconcile with Note 11 of FY2024 Form 10-K).`
      );
    }
  }
```

And include the backward-compatible telemetry fields in the `verifyCorporateWebReport` return object:
```javascript
  return {
    valid: true,
    htmlPath: htmlLabel,
    byteLength: Buffer.byteLength(resolvedHtml, "utf8"),
    tableOfContentsVerified: true,
    polarChartsVerified: [
      "polar-chart-categories",
      "polar-chart-geography",
      "polar-chart-flywheel"
    ],
    fiveStepsVerified: ["step-1", "step-2", "step-3", "step-4", "step-5"],
    dreamcoreMarkersDetected: 0,
    specTokensDetected: 0,
    polarCssSelectorsVerified: true,
    historicalNote11Reconciled: true
  };
```

---

## 4. Live Verification & MCP Tooling Playbook (`mcp-tools.md`)

Downstream implementers (`implementer-1`..`implementer-5`), reviewers (`reviewer`), and testers (`tester-1`..`tester-5`) must verify their work against **both** the deterministic Node.js CLI verifier and live headless browser rendering via the provisioned `puppeteer` and `playwright` MCP servers.

### 4.1 Step 0 — Deterministic CLI Gate ($\le 250\text{ ms}$, `0` Network Calls)

Run after every edit to [`index.html`](../../index.html), [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs), [`README.md`](../../README.md), or [`wayfinder/tickets/ticket-006.md`](../tickets/ticket-006.md):

```bash
npm run verify
# Equivalent to: node src/costco_revenue_model.mjs --verify
```
- **Required Output:** `status: "VERIFIED"`, `exitCode: 0`, `telemetry.elapsedMs <= 250`, `telemetry.rssMb <= 128`, `telemetry.externalNetworkRequests === 0`.

### 4.2 MCP Browser Verification Playbooks (`puppeteer` & `playwright`)

> [!TIP]
> **Choosing Between `puppeteer` and `playwright` MCP:**
> - **`puppeteer` MCP** supports direct `file:///.../index.html` URLs with **zero background HTTP servers**. Use `puppeteer` (`puppeteer_navigate`, `puppeteer_evaluate`, `puppeteer_screenshot`, `puppeteer_click`) for rapid zero-daemon DOM, computed-style, and screenshot checks.
> - **`playwright` MCP** blocks `file:///` navigation by design, so start a local loopback server (`python3 -m http.server 8765 --bind 127.0.0.1`) and navigate to `http://127.0.0.1:8765/index.html`. Use `playwright` (`browser_navigate`, `browser_snapshot`, `browser_press_key`, `browser_resize`, `browser_evaluate`, `browser_console_messages`) for accessibility tree snapshots, keyboard `Enter`/`Space` dispatch, responsive viewport resizing (`390×844` and `1440×900`), and runtime console error auditing.

#### Playbook 1: Editorial Token & Divider Audit (`AC-01`)
1. Navigate to `index.html` (`puppeteer_navigate` or `playwright` `browser_navigate`).
2. Evaluate via `browser_evaluate` (or `puppeteer_evaluate`):
   ```javascript
   () => {
     const text = document.body.innerText;
     const html = document.documentElement.innerHTML;
     return {
       curlyTokensInHtml: html.match(/\{(Net Sales|Membership Fees|Gross Margin Ceiling|Operating Income Flywheel)\}/g) || [],
       slashDividersInText: text.match(/\s\/\/\s/g) || []
     };
   }
   ```
3. **Pass Criterion:** Both `curlyTokensInHtml` and `slashDividersInText` return `[]` (`length === 0`).

#### Playbook 2: Polar SVG Computed Styles, Unclipped Viewport & 3-Year Overlay Key (`AC-02`)
1. Evaluate computed styles and bounding boxes across `#svg-polar-categories`, `#svg-polar-geography`, and `#svg-polar-flywheel` at both `1440×900` and `390×844`:
   ```javascript
   () => {
     const ring = document.querySelector(".polar-grid-ring");
     const spoke = document.querySelector(".polar-axis-spoke");
     const centerTitle = document.querySelector(".polar-center-title");
     const metaGrid = document.querySelector(".drilldown-meta-grid");
     const svgs = ["#svg-polar-categories", "#svg-polar-geography", "#svg-polar-flywheel"];
     const clippedLabels = [];

     for (const sel of svgs) {
       const svg = document.querySelector(sel);
       const svgRect = svg.getBoundingClientRect();
       for (const lbl of svg.querySelectorAll(".polar-sector-label, .polar-axis-label")) {
         const r = lbl.getBoundingClientRect();
         if (
           r.left < svgRect.left - 1 ||
           r.right > svgRect.right + 1 ||
           r.top < svgRect.top - 1 ||
           r.bottom > svgRect.bottom + 1
         ) {
           clippedLabels.push({ svg: sel, text: lbl.textContent, labelRect: r, svgRect });
         }
       }
     }

     return {
       ringFill: getComputedStyle(ring).fill,
       ringStroke: getComputedStyle(ring).stroke,
       spokeStroke: getComputedStyle(spoke).stroke,
       centerAnchor: getComputedStyle(centerTitle).textAnchor,
       metaGridDisplay: getComputedStyle(metaGrid).display,
       clippedLabels
     };
   }
   ```
2. **Pass Criterion:** `ringFill === "none"`, `ringStroke !== "none"`, `spokeStroke !== "none"`, `centerAnchor === "middle"`, `metaGridDisplay === "grid"`, and `clippedLabels.length === 0` across all chart modes (`FY2024`, `FY2023`, `FY2022`, `3-Year Overlay`, `Area √r`, `Linear r`, `Share Angle θ_i`, `Total Revenue`, `Operating Income`, `Warehouses`, `Dual-Ring`, `Ancillary Rose`).

#### Playbook 3: Primary-Source Multi-Year Note 11 & Item 2 Data Reconciliation (`AC-03`)
1. Evaluate `#tbody-polar-categories` and `#tbody-polar-geography` via `browser_evaluate`:
   ```javascript
   () => ({
     categoryRows: Array.from(document.querySelectorAll("#tbody-polar-categories tr")).map((tr) =>
       Array.from(tr.cells).map((td) => td.textContent.trim())
     ),
     geographyRows: Array.from(document.querySelectorAll("#tbody-polar-geography tr")).map((tr) =>
       Array.from(tr.cells).map((td) => td.textContent.trim())
     )
   })
   ```
2. **Pass Criterion:**
   - `#tbody-polar-categories` rows match Table 4.2A (`$85,629M` / `$96,175M` / `$101,463M` / `40.65%` / `+5.50%`; `$61,100M` / `$60,865M` / `$63,973M` / `25.63%` / `+5.11%`; `$46,474M` / `$48,693M` / `$49,969M` / `20.02%` / `+2.62%`; `$29,527M` / `$31,977M` / `$34,220M` / `13.71%` / `+7.01%`).
   - `#tbody-polar-geography` rows match Table 4.2B (`614` U.S. with `499` owned / `115` leased; `168` Other Intl with `113` owned / `55` leased; `108` Canada with `91` owned / `17` leased; `890` Consolidated with `703` owned / `187` leased).

#### Playbook 4: Sticky Scroll-Spy TOC & SVG Keyboard Accessibility (`AC-02` & `AC-04`)
1. Focus `[data-cat-sector="1"]` via `browser_evaluate` and press `Enter` via `browser_press_key` (`{"key": "Enter"}`), then focus `[data-geo-sector="2"]` and press `Space` (`{"key": " "}`).
2. Verify that `#polar-category-drilldown` updates to `Non-Foods`, `#polar-geography-drilldown` updates to `Canada`, `document.activeElement` remains on the newly rendered `[data-*-sector]` `<path>`, and `window.scrollY` did not jump on `Space`.
3. Click `.toc-sublink[data-toc-target="step-3"]` and verify:
   - `.toc-sublink[data-toc-target="step-3"]` has class `is-active` and `aria-current="location"`.
   - Parent `.toc-link[data-toc-target="section-five-steps"]` also has class `is-active`.
   - `#step-3` has class `is-active-step`.

#### Playbook 5: Sensitivity Simulator Gross Margin Ceiling Breach State (`AC-04`)
1. Set `#sim-gm-slider` to `12.00` and dispatch `input` event via `browser_evaluate`:
   ```javascript
   () => {
     const slider = document.getElementById("sim-gm-slider");
     slider.value = "12.00";
     slider.dispatchEvent(new Event("input", { bubbles: true }));
     const banner = document.getElementById("sim-output-banner");
     return {
       hasBreachClass: banner.classList.contains("is-breach"),
       borderLeftColor: getComputedStyle(banner).borderLeftColor,
       bannerText: banner.innerText
     };
   }
   ```
2. **Pass Criterion:** `hasBreachClass === true`, `borderLeftColor === "rgb(227, 24, 55)"`, and `bannerText` contains zero `{...}` tokens.

#### Playbook 6: Responsive Viewports (`390×844` & `1440×900`), Zero Horizontal Overflow & Zero Console Errors (`AC-02` & `AC-05`)
1. Call `browser_resize` with `{"width": 390, "height": 844}` and evaluate `document.documentElement.scrollWidth <= window.innerWidth` (must be `true`).
2. Call `browser_resize` with `{"width": 1440, "height": 900}` and evaluate `document.documentElement.scrollWidth <= window.innerWidth` (must be `true`).
3. Call `browser_console_messages` with `{"level": "error"}` and verify `0` runtime console errors.

---

## 5. Edge-Case Gotchas & Pitfalls Register

| # | Subsystem | Subtle Edge Case / Gotcha | Mandatory Remediation Pattern |
| :--- | :--- | :--- | :--- |
| **1** | `index.html` (`renderPolar*`) | **SVG Re-Render Destroys Active Keyboard Focus:** Setting `svg.innerHTML = svgMarkup` detaches the focused `<path role="button" tabindex="0">` node from the DOM, resetting `document.activeElement` to `<body>`. | In `bindPolarSectorEvents`, when `keydown` (`Enter` or `Space`) triggers selection, pass `restoreFocus = true` and immediately call `.focus()` on `svg.querySelector('[data-*-sector="' + selectedIdx + '"]')` after `renderPolar*()` completes. |
| **2** | `index.html` (`renderPolarFlywheel`) | **Duplicate `data-fly-sector` Attributes in Asymmetry Mode:** In dual-ring mode (`flyState.mode === "asymmetry"`), both the Outer Ring and Inner Ring emit paths with `data-fly-sector="0"` and `data-fly-sector="1"` (4 `<path>` nodes total). | Add `data-fly-ring="outer"` and `data-fly-ring="inner"` attributes to the outer and inner ring `<path>` elements so keyboard focus restoration re-focuses the exact ring the user activated. |
| **3** | `index.html` (`#table-of-contents`) | **Stale `.toc-sublink.is-active` & Missing Parent `.toc-link.is-active`:** The legacy click handler (lines `2971–2979`) only iterated over `.toc-link`, ignoring `.toc-sublink` entirely. | Query all `#table-of-contents a[data-toc-target]` in `syncTocActiveState(targetId)`, toggle `.is-active` and `aria-current="location"` on the exact match, and when a `.toc-sublink` matches, also add `.is-active` to its parent `li > a.toc-link`. |
| **4** | `index.html` (`CATEGORY_DATA` IDs) | **Category ID Alignment with Canonical JSON:** `index.html` line `1881` used `id: "warehouse_ancillary"` whereas `data/costco_revenue_breakdown.json` uses `category_id: "warehouse_ancillary_and_other"`. | Align `CATEGORY_DATA[2].id` to `"warehouse_ancillary_and_other"` and `name` to `"Warehouse Ancillary and Other Businesses"` (`shortName: "Ancillary & Other"`). |
| **5** | `index.html` (`GEOGRAPHY_DATA` Spain count) | **Country Warehouse Count Typo in Other International:** Line `1941` listed `Spain (5)` and `Taiwan (14), Australia (15)` resulting in a sum of `169` instead of `168` clubs. | Per Item 2 of the FY2024 Form 10-K, Spain has **`4`** warehouses (`40 + 35 + 29 + 19 + 15 + 14 + 7 + 4 + 2 + 1 + 1 + 1 = 168`). Update the country breakdown string to `Spain (4)`. |
| **6** | `src/costco_revenue_model.mjs` | **False-Positive CSS Selector Matches Outside `<style>`:** Checking `resolvedHtml.includes(".polar-grid-ring")` on the full HTML string could match prose in Wayfinder ticket summaries even if `<style>` were missing the rule. | Extract `<style>...</style>` content via `/<style\b[^>]*>([\s\S]*?)<\/style>/gi` first and assert that every selector in `REQUIRED_POLAR_CSS_SELECTORS` exists inside `combinedCss`. |
| **7** | `src/costco_revenue_model.mjs` | **Pseudo-Code `//` Divider Check vs. Valid `https://` URLs & Indented JS Comments (`    // ...`):** Checking `resolvedHtml.includes("//")` or raw `" // "` blindly across `resolvedHtml` would false-trigger on `https://www.sec.gov/...` or on the 39 indented JavaScript single-line comments inside `<script>` (where leading spaces + `// ` contain `" // "`). | Check against the explicit `PROHIBITED_PSEUDOCODE_DIVIDERS` array (`Section 01 //`..`Section 05 //`, `DRILLDOWN //`, `Step 01 //`..`Step 05 //`, `ticket-001.md //`..`ticket-006.md //`, `TICKET //`) or strip JS comment lines (`/^\s*\/\/.*$/gm` and `/;\s*\/\/.*$/gm`) before testing `/[A-Za-z0-9.]\s+\/\/\s+[A-Za-z0-9<']/`. In browser Playbook 1, inspect `document.body.innerText` (which excludes `<script>` tags) for `/\s\/\/\s/g`. |
