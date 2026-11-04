# Refined Technical Specification: Costco Wholesale Corporation (`COST`) Corporate Animated SVG Elements, High-Density Halftone/Bayer Dithered Visual Effects, Simplified Straightforward English Explanations, Legible Graphs & Notes, and Screen-Size-Agnostic Responsive Architecture

**Specification Version:** 2.0 (Grounded Refinement of [`functional_specification_005.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/functional_specification_005.md) by `plan-1`)  
**Run ID:** `20261104T004059-606-j6a7`  
**Branch:** `agent/plan-20261104T004059-606-j6a7`  
**Authoritative Domain Vocabulary:** [`LANGUAGE.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/LANGUAGE.md)  
**Scanner Syntheses & Inputs:**
- [`wayfinder/20261104T004059-606-j6a7/codebase-map.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/codebase-map.md) (`codebase-mapper` finding `seq=#2` & `seq=#5`)
- [`wayfinder/20261104T004059-606-j6a7/api-schemas.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/api-schemas.md) (`api-schema-mapper` finding `seq=#4`)
- [`wayfinder/20261104T004059-606-j6a7/installed-libraries.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/installed-libraries.md) (`library-installer` finding `seq=#1`)
- [`wayfinder/20261104T004059-606-j6a7/mcp-tools.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/mcp-tools.md) (`mcp-provisioner` finding `seq=#3`)
- [`wayfinder/20261104T004059-606-j6a7/library-functions.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/library-functions.md) (`function-mapper` finding `seq=#6`)  
**Strict Gate Enforced:** **DO NOT CODE YET.** Specification, architectural contracts, and verification bounds only.

---

## 1. Executive Summary & Objective

This document provides the authoritative, technically precise refinement of [`functional_specification_005.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/functional_specification_005.md). It reconciles the five high-level business objectives of Spec 005 with the live empirical discoveries of the five Blackboard scanner agents (`codebase-mapper`, `api-schema-mapper`, `library-installer`, `mcp-provisioner`, and `function-mapper`).

The exact objective of this specification is to govern the implementation across Stages 2 through 4 (`plan-2` / `planner-2.1..2.5`, `implementer` / `implementer-1..5`, and `tester` / `tester-1..5`), upgrading Costco Wholesale Corporation's interactive web report ([`index.html`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/index.html)), structured financial dataset ([`data/costco_revenue_breakdown.json`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/data/costco_revenue_breakdown.json)), and verification engine ([`src/costco_revenue_model.mjs`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/src/costco_revenue_model.mjs)) across five concrete pillars:

1. **Corporate Animated SVG Elements (`AC-01`):** Purposeful animated SVG flow diagrams and schematics illustrating the 4-node revenue-to-profit flywheel and polar graph sweep/radar indicators, with a user pause/play toggle and full `@media (prefers-reduced-motion: reduce)` support.
2. **High-Density Halftone & Ordered Bayer Dithering Effects (`AC-02`):** Self-contained, zero-network SVG `<pattern>` and CSS dithering layers producing an institutional engraved corporate aesthetic without obscuring text contrast ($\ge 4.5:1$ text, $\ge 7:1$ primary metrics) and strictly avoiding prohibited Dreamcore markers.
3. **Simplified, Straightforward English Explanations (`AC-03`):** Complete elimination of algebraic shorthand (`R_total`, `OpInc ($9,285M) = Merch Contrib`, `Area √r (Coxcomb)`, `Linear Radius r`, `Share Angle θ_i`), code leaks (`wayfinderAudit.valid === true`), and promotional clichés (`treasure-hunt discretionary basket builder`, `renewal magnet`, `perishable weekly trip driver and rapid inventory-turn engine`), replacing them with plain-English explanatory callout notes (`.plain-english-note`).
4. **High-Legibility Graphs, Callouts, Legends & Tables (`AC-04`):** Expansion of SVG coordinate viewBox (`viewBox="-80 -44 560 488"`), high-contrast halo strokes (`paint-order: stroke fill; stroke: #FFFFFF; stroke-width: 3.5px`), offset non-colliding ring markers in revenue share angle mode, center-hub titles ($\ge 12.5\text{px}$), and companion table font sizes ($\ge 12.5\text{px}$).
5. **100% Screen-Size-Agnostic Responsive Architecture (`AC-05`):** Fluid typography (`clamp()`), fluid grid containers (`minmax(0, 1fr)`), zero horizontal page overflow (`scrollWidth <= innerWidth`) across `320px`, `390px`, `768px`, `1024px`, `1440px`, and `2560px` viewports, and full bidirectional keyboard accessibility (`tabindex="0"`, `Enter`/`Space` activation, roving tabindex).

All operations must strictly uphold the domain vocabulary of [`LANGUAGE.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/LANGUAGE.md), achieve `0` external network requests, execute the CLI verification in $\le 250\text{ ms}$ wall-clock time with $\le 128\text{ MB}$ RSS, and maintain $\le 16\text{ ms}$ (60fps) browser frame budgets.

---

## 2. Workspace Shape & Existing Code to Reuse (`codebase-mapper`)

Based on the live discovery in [`wayfinder/20261104T004059-606-j6a7/codebase-map.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/codebase-map.md), the repository consists of a self-contained vanilla web application and Node.js verification engine. Implementers MUST NOT rewrite or replace existing modules from scratch, but MUST reuse, refactor, and extend the following components at their exact source anchors:

### 2.1 Workspace File Hierarchy
```
/Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/
├── index.html                           # Primary interactive corporate report (152KB, 2,800+ lines)
├── src/
│   └── costco_revenue_model.mjs         # Deterministic verification engine & ESM CLI module (750+ lines)
├── data/
│   └── costco_revenue_breakdown.json    # Audited primary-source SEC Form 10-K dataset (28KB, 800+ lines)
├── wayfinder/
│   ├── map.md                           # Canonical architectural decision map (6 resolved tickets)
│   ├── tickets/
│   │   ├── ticket-001.md ... ticket-006.md # Grounded architectural research tickets
│   └── 20261104T004059-606-j6a7/       # Scanner and planner artifacts for Run 005
├── research/
│   └── costco_revenue_architecture.md   # Primary-source SEC Form 10-K research monograph (40KB)
├── package.json                         # Node.js ESM package configuration ("type": "module")
└── README.md                            # Executive overview, CLI manual, and operational budgets
```

### 2.2 Reusable Functions & Verification Anchors in `src/costco_revenue_model.mjs`
The implementation must preserve all public export contracts and reuse the existing validation helpers:
1. `verifyFinancialDataset(options)`: Reused to validate GAAP totals (`$254,453M` revenue, `$9,285M` operating income, `$7,367M` net income), segment breakdowns, and balance-sheet float ratios (`104.15%` AP-to-inventory coverage). Must be extended to check `role_in_flywheel` descriptions against promotional clichés.
2. `verifyWayfinderArtifacts(options)`: Reused to validate `wayfinder/map.md` and `wayfinder/tickets/ticket-001.md` through `ticket-006.md`.
3. `verifyResearchMonograph(options)`: Reused to validate Form 10-K citations and SEC accession numbers.
4. `verifyCorporateWebReport(options)` / `verifyIndexHtml(options)`: Reused to inspect HTML byte structure, required DOM IDs (`#table-of-contents`, `#section-executive-summary`, `#section-polar-graphs`, `#section-five-steps`, `#section-gaap-model`, `#section-wayfinder-audit`), and verify zero Dreamcore markers. Must be extended to verify SVG animation markers, dithering `<pattern>` elements, plain-English equation banners, collision-free CSS/viewBox rules, responsive viewport constraints, and keyboard handlers.
5. `loadAndVerifyCostcoModel(options)`: Primary orchestration entry point invoked by `node src/costco_revenue_model.mjs --verify`.

### 2.3 Reusable DOM & Controller Anchors in `index.html`
Implementers must preserve existing element IDs and extend existing controller routines:
1. **Interactive Polar Chart Controllers (lines 2350–2800):**
   - `renderPolarCategories(mode, year)`: Controls `#svg-polar-categories`. Reuse geometry calculations (`polarToCartesian`, `describeArcSector`), update `viewBox` to `-80 -44 560 488`, apply halo styling (`paint-order: stroke fill; stroke: #FFFFFF; stroke-width: 3.5px`), and offset ring scale labels during angle mode (`mode === 'angle'`).
   - `renderPolarGeography(year)`: Controls `#svg-polar-geography`. Reuse geographic metrics mapping and drill-down cards.
   - `renderPolarFlywheel(mode)`: Controls `#svg-polar-flywheel`. Reuse asymmetry dual-ring calculations, adding high-contrast pill badges.
2. **Interactive 5-Step Revenue Walkthrough Controller (lines 2300–2350):**
   - `setActiveStep(stepIndex)`: Synchronizes `#step-1`..`#step-5` card states, tab buttons (`[data-step-btn]`), and progress indicator. Must be extended to synchronize SVG flow highlights in the animated flywheel schematic.
3. **Interactive Financial Waterfall & Simulator Controllers (lines 2800–2850):**
   - `renderGaapWaterfall(year)`: Populates consolidated GAAP table and waterfall bar chart.
   - `updateSimulator()`: Calculates sensitivity adjustments on markup, SG&A, and membership fee growth.
4. **Wayfinder Ticket Inspector & ScrollSpy (lines 2850–2920):**
   - `renderTicketInspector(ticketIndex)`: Activates ticket tabs and modal/detail readout.
   - `initScrollSpy()`: Manages `#table-of-contents` active links via `IntersectionObserver`.

---

## 3. External Connections & Data Structures (`api-schema-mapper`)

As verified by `api-schema-mapper` in [`wayfinder/20261104T004059-606-j6a7/api-schemas.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/api-schemas.md), the system operates entirely offline using local JSON schemas and embedded client-side data structures aligned with SEC EDGAR primary sources (Costco CIK `0000909832`, Form 10-K Accession `0000909832-24-000049` and Form 8-K Accession `0000909832-24-000043`):

### 3.1 Primary-Source Financial Dataset (`data/costco_revenue_breakdown.json`)
The schema consists of five required root objects:
```json
{
  "company": {
    "name": "Costco Wholesale Corporation",
    "ticker": "COST",
    "exchange": "NASDAQ",
    "cik": "0000909832",
    "fiscal_year": 2024,
    "fiscal_year_end": "2024-09-01",
    "fiscal_weeks": 52,
    "currency": "USD",
    "units": "millions"
  },
  "consolidated_income_statement": { ... },
  "merchandise_categories": [
    {
      "name": "Foods and Sundries",
      "net_sales_usd_m": 101463,
      "net_sales_share_pct": 40.65,
      "growth_yoy_pct": 5.5,
      "historical_net_sales": { "fy2022": 85629, "fy2023": 96175, "fy2024": 101463 },
      "historical_share_pct": { "fy2022": 38.45, "fy2023": 40.46, "fy2024": 40.65 },
      "role_in_flywheel": "High-velocity everyday essentials that generate frequent member visits and rapid inventory turnover."
    },
    ...
  ],
  "geographic_segments": [ ... ],
  "working_capital_and_balance_sheet": { ... }
}
```

### 3.2 Required Plain-English Replacements in `data/costco_revenue_breakdown.json`
Promotional clichés in `merchandise_categories[].role_in_flywheel` MUST be replaced with exact, straightforward technical descriptions:
- **Foods and Sundries (line 75):**  
  *Old:* `"Essential household staples driving weekly visit frequency and high inventory turnover"`  
  *New:* `"High-velocity everyday essentials that generate frequent member visits and rapid inventory turnover."`
- **Non-Foods (line 94):**  
  *Old:* `"Treasure-hunt discretionary basket builder with higher product gross margin contribution"`  
  *New:* `"Higher-margin discretionary merchandise and seasonal goods that increase member transaction size."`
- **Warehouse Ancillary and Other Businesses (line 121):**  
  *Old:* `"High-frequency low-margin member visit driver and renewal magnet (gas, optical, pharmacy, food court, travel)"`  
  *New:* `"High-frequency warehouse services (gasoline, optical, pharmacy, food court, and travel) that reinforce membership value."`
- **Fresh Foods (line 136):**  
  *Old:* `"Perishable weekly trip driver and rapid inventory-turn engine"`  
  *New:* `"High-turnover fresh groceries and prepared foods that drive consistent weekly warehouse visits."`

### 3.3 Required Plain-English String Replacements in `index.html`
Implementers must replace all leaked shorthand and algebraic notation with clean plain English:
1. **Equation Banners (lines 1351, 1355):**  
   - Replace `R_total ($254,453M)` with:  
     `Total Revenue ($254,453M) = Net Sales ($249,625M) + Membership Fees ($4,828M)`
   - Replace `OpInc ($9,285M) = Merch Contrib ($4,457M) + MemberFees ($4,828M)` with:  
     `Operating Income ($9,285M) = Net Merchandise Profit ($4,457M, or 48.00%) + Membership Fees ($4,828M, or 52.00%)`
2. **Polar Chart Control Buttons (lines 1369, 1395–1397):**  
   - Replace `Area √r (Coxcomb)` with `By Area (Square-Root Scale)`
   - Replace `Linear Radius r` with `By Radius (Linear Scale)`
   - Replace `Share Angle θ_i` with `By Revenue Share (Angle)`
3. **Wayfinder Audit Summary (line 1994 & line 2283):**  
   - Replace `wayfinderAudit.valid === true` with:  
     `Verified: 6 resolved research tickets and canonical decision map`
   - In `WAYFINDER_TICKETS[0].summary` (line 2283), replace `R_total` with `Total Revenue`.
4. **Interactive Script Shorthand (line 2518):**  
   - Replace `'Share Angle (θ_i)'` with `'By Revenue Share (Angle)'`.

---

## 4. Languages, Libraries & Function Calls (`library-installer` & `function-mapper`)

As cataloged in [`wayfinder/20261104T004059-606-j6a7/installed-libraries.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/installed-libraries.md) and [`wayfinder/20261104T004059-606-j6a7/library-functions.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/library-functions.md), the system employs three runtime environments:

### 4.1 Client-Side Web Platform (HTML5 / CSS3 / Inline SVG / ES2022 Vanilla JS)
No runtime libraries (React, D3, jQuery) are permitted. All browser features are delivered via native browser APIs:

1. **Inline SVG Animation & Reduced-Motion Controller:**
   ```javascript
   function toggleAnimationPlayback() {
     const isPaused = document.documentElement.classList.toggle('animations-paused');
     const btn = document.getElementById('btn-toggle-animation');
     if (btn) {
       btn.setAttribute('aria-pressed', isPaused ? 'true' : 'false');
       btn.textContent = isPaused ? 'Resume Animations' : 'Pause Animations';
     }
     const svgAnimations = document.querySelectorAll('svg animate, svg animateTransform');
     svgAnimations.forEach(anim => {
       if (isPaused) {
         if (typeof anim.pauseAnimations === 'function') anim.pauseAnimations();
       } else {
         if (typeof anim.unpauseAnimations === 'function') anim.unpauseAnimations();
       }
     });
   }
   ```
2. **Halftone & Bayer Dithering SVG `<pattern>` Definitions:**
   Inline `<defs>` within `#svg-corporate-flywheel-hero` and polar SVGs defining 4x4 Bayer ordered dither matrices and 60° halftone stipple grids using corporate colors (`#005DAA`, `#E31837`, `#0F172A`, `#CBD5E1`).
3. **Collision-Free Polar Geometry Calculation:**
   ```javascript
   function describeArcSector(cx, cy, innerR, outerR, startAngleDeg, endAngleDeg) {
     const startRad = ((startAngleDeg - 90) * Math.PI) / 180;
     const endRad = ((endAngleDeg - 90) * Math.PI) / 180;
     const p1 = { x: cx + outerR * Math.cos(startRad), y: cy + outerR * Math.sin(startRad) };
     const p2 = { x: cx + outerR * Math.cos(endRad), y: cy + outerR * Math.sin(endRad) };
     const p3 = { x: cx + innerR * Math.cos(endRad), y: cy + innerR * Math.sin(endRad) };
     const p4 = { x: cx + innerR * Math.cos(startRad), y: cy + innerR * Math.sin(startRad) };
     const largeArc = (endAngleDeg - startAngleDeg) > 180 ? 1 : 0;
     return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} ` +
            `A ${outerR.toFixed(2)} ${outerR.toFixed(2)} 0 ${largeArc} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} ` +
            `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)} ` +
            `A ${innerR.toFixed(2)} ${innerR.toFixed(2)} 0 ${largeArc} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)} Z`;
   }
   ```
4. **Keyboard Accessibility & Roving Tablist Handler:**
   ```javascript
   function setupKeyboardNavigation(containerSelector, itemSelector, onActivate) {
     const container = document.querySelector(containerSelector);
     if (!container) return;
     const items = Array.from(container.querySelectorAll(itemSelector));
     items.forEach((item, index) => {
       item.setAttribute('tabindex', index === 0 ? '0' : '-1');
       item.addEventListener('keydown', (e) => {
         let targetIndex = -1;
         if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
           targetIndex = (index + 1) % items.length;
         } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
           targetIndex = (index - 1 + items.length) % items.length;
         } else if (e.key === 'Enter' || e.key === ' ') {
           e.preventDefault();
           onActivate(item, index);
           return;
         }
         if (targetIndex >= 0) {
           e.preventDefault();
           items[index].setAttribute('tabindex', '-1');
           items[targetIndex].setAttribute('tabindex', '0');
           items[targetIndex].focus();
           onActivate(items[targetIndex], targetIndex);
         }
       });
     });
   }
   ```

### 4.2 Deterministic Verification Engine (Node.js v24.9.0 ESM)
Implemented strictly using built-in modules (`node:fs`, `node:path`, `node:process`, `node:perf_hooks`, `node:url`) in [`src/costco_revenue_model.mjs`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/src/costco_revenue_model.mjs).
- Preserves all CLI options: `--verify`, `--root <path>`, `--data <path>`, `--map <path>`, `--tickets <dir>`, `--research <path>`, `--html <path>`.
- Preserves exported functions: `verifyFinancialDataset`, `verifyWayfinderArtifacts`, `verifyResearchMonograph`, `verifyCorporateWebReport`, `verifyIndexHtml`, `loadAndVerifyCostcoModel`.
- Enforces new Spec 005 checks: SVG animation tags, Bayer dithering `<pattern>` IDs, zero promotional clichés in dataset, zero leaked math/code shorthand, presence of `.plain-english-note` callouts, and responsive CSS viewport rules.

### 4.3 Headless Verification & Profiling Harness (Python 3.12.7 + Playwright 1.58.0)
Used in Stage 4 by `tester-1..5` to verify live DOM rendering across viewports (`320px`, `390px`, `768px`, `1024px`, `1440px`, `2560px`), check `document.documentElement.scrollWidth <= window.innerWidth`, and capture multi-viewport screenshots:
```python
from playwright.sync_api import sync_playwright

def verify_responsive_viewport(html_path: str, width: int, height: int):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": width, "height": height})
        page.goto(f"file://{html_path}")
        scroll_width = page.evaluate("document.documentElement.scrollWidth")
        inner_width = page.evaluate("window.innerWidth")
        assert scroll_width <= inner_width, f"Horizontal overflow at {width}px: scrollWidth={scroll_width} > innerWidth={inner_width}"
        browser.close()
```

---

## 5. MCP Tools & Verification Playbook (`mcp-provisioner`)

As detailed in [`wayfinder/20261104T004059-606-j6a7/mcp-tools.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/wayfinder/20261104T004059-606-j6a7/mcp-tools.md), two active MCP servers are provisioned for testing and visual auditing:

### 5.1 Active MCP Tools
1. **`puppeteer`:**
   - `puppeteer_navigate`: Direct file URL loading (`file:///Users/.../index.html`) with zero network overhead.
   - `puppeteer_evaluate`: Inspects DOM elements, bounding client rects, computed styles, text contrast, and overflow metrics.
   - `puppeteer_screenshot`: Captures element-level and viewport-level screenshots.
2. **`playwright`:**
   - `browser_navigate`: Navigates local web pages.
   - `browser_resize`: Resizes viewport across responsive breakpoints (`320x640`, `390x844`, `768x1024`, `1024x768`, `1440x900`, `2560x1440`).
   - `browser_emulate_media`: Tests `@media (prefers-reduced-motion: reduce)`.
   - `browser_press_key`: Verifies keyboard navigation (`Tab`, `Enter`, `Space`, `ArrowRight`, `ArrowLeft`) on table rows, polar chart sectors, and step tabs.
   - `browser_console_messages` & `browser_network_requests`: Audits page execution for `0` uncaught console errors and `0` external network requests.

### 5.2 Verification Playbooks for Stage 4
1. **Playbook 1: Corporate Animated SVG Flow & Reduced-Motion Verification:**
   - Load `index.html`, verify `#svg-corporate-flywheel-hero` exists and contains flow paths with `stroke-dasharray` and `stroke-dashoffset`.
   - Emulate `prefers-reduced-motion: reduce`, confirm animations halt or settle into static states.
   - Click `#btn-toggle-animation`, confirm `animations-paused` class is applied to `documentElement`.
2. **Playbook 2: Halftone & Bayer Dithering Inspection:**
   - Confirm SVG `<defs>` contains pattern IDs (`#pattern-bayer-dither`, `#pattern-halftone-dots`).
   - Confirm text contrast over all dithered areas exceeds `4.5:1` (WCAG AA).
   - Confirm zero prohibited Dreamcore tokens exist in DOM.
3. **Playbook 3: Plain-English & Editorial Legibility Audit:**
   - Query all occurrences of `R_total`, `OpInc`, `Area √r`, `Share Angle θ_i`, `wayfinderAudit.valid === true`. Must return `0`.
   - Inspect `.plain-english-note` elements in all 5 sections. Confirm plain-English explanations for gross margin cap, supplier float, and membership fee operating leverage.
4. **Playbook 4: Polar Chart Halo & Coordinate Padding Check:**
   - Switch `#polar-chart-categories` between `area`, `radius`, and `angle` modes.
   - Measure bounding boxes of `.polar-sector-label` and `.polar-axis-label`. Confirm all labels remain inside SVG boundary with `0` collisions.
5. **Playbook 5: Multi-Viewport Responsive Overflow Audit:**
   - Evaluate `document.documentElement.scrollWidth <= window.innerWidth` across `320px`, `390px`, `768px`, `1024px`, `1440px`, and `2560px`.
   - Confirm `#table-of-contents` collapses or stacks on screens $\le 1080\text{px}$.
6. **Playbook 6: Full Keyboard A11y & Dual-State Sync:**
   - Focus `[data-cat-row="0"]`, trigger `Enter`, verify corresponding SVG sector `[data-cat-sector="0"]` receives active class.
   - Focus step tab `[data-step-btn="1"]`, press `ArrowRight`, verify focus moves to `[data-step-btn="2"]` and active step card switches to `#step-2`.

---

## 6. Shared Contracts, Acceptance Criteria & Measurable Outputs

### 6.1 Objective Acceptance Criteria
- **`AC-01` (Corporate Animated SVG Elements & Motion Resilience):**
  - Institutional animated SVG flywheel diagram `#svg-corporate-flywheel-hero` and polar graph radar sweep indicators implemented.
  - `@media (prefers-reduced-motion: reduce)` and `#btn-toggle-animation` pause animations cleanly.
- **`AC-02` (Halftone & Ordered Bayer Dithering Corporate Effects):**
  - Self-contained SVG `<pattern>` and CSS Bayer dithering applied to header bands, card headers, and chart accents.
  - Text contrast $\ge 4.5:1$ maintained; zero Dreamcore markers present.
- **`AC-03` (Simplified Straightforward English Explanations & Notes):**
  - Plain-English note boxes (`.plain-english-note`) present in all sections explaining markup cap, supplier float, and fee leverage.
  - `role_in_flywheel` in [`data/costco_revenue_breakdown.json`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-20261104T004059-606-j6a7/data/costco_revenue_breakdown.json) rewritten to remove promotional clichés.
  - Zero algebraic shorthand (`R_total`, `θ_i`) or code leaks in reader-facing UI.
- **`AC-04` (High-Legibility Graphs, Labels, Legends & Tables):**
  - Polar SVG `viewBox` expanded to `-80 -44 560 488` with white halo strokes (`3.5px`) on all sector labels ($\ge 12\text{px}$) and axis labels ($\ge 10.5\text{px}$).
  - Collision-free radial markers in angle mode and legible companion tables ($\ge 12.5\text{px}$).
- **`AC-05` (Screen-Size-Agnostic Responsive Architecture & Verification):**
  - Zero horizontal overflow (`scrollWidth <= innerWidth`) across `320px`, `390px`, `768px`, `1024px`, `1440px`, and `2560px`.
  - Full bidirectional keyboard navigation across table rows, polar sectors, and tabs.
  - `npm run verify` (`node src/costco_revenue_model.mjs --verify`) passes with `status: "VERIFIED"`, `0` network calls, $\le 250\text{ ms}$ latency, and $\le 128\text{ MB}$ RSS.

### 6.2 Implementation Dispatch Matrix for Stage 2 & 3
The downstream Stage 2 planner (`plan-2`) and Stage 3 implementer (`implementer`) MUST dispatch 5 focused sub-agents aligned with the 5 pillars:
1. **`planner-2.1` / `implementer-1` (Corporate Animated SVG Elements):** Hero flywheel diagram, polar chart sweep/transitions, animated micro-schematics in 5-step cards, motion toggle, and reduced-motion CSS.
2. **`planner-2.2` / `implementer-2` (Halftone & Bayer Dithering Effects):** SVG pattern defs, CSS dither textures, contrast halos, and Dreamcore prevention.
3. **`planner-2.3` / `implementer-3` (Plain-English Explanations & Note Boxes):** Plain-English note boxes, dataset `role_in_flywheel` rewrites, equation banners, and eliminating code/algebraic shorthand.
4. **`planner-2.4` / `implementer-4` (Polar Graph Legibility & Companion Tables):** SVG viewBox padding, halo stroke styling, angle-mode marker offsets, and table font/padding upgrades.
5. **`planner-2.5` / `implementer-5` (Responsive Architecture & Keyboard A11y):** Fluid typography (`clamp()`), fluid grid containers, responsive TOC, keyboard event handlers, and Playwright multi-viewport headless verification.
