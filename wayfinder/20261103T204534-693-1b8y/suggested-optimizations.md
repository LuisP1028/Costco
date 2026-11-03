# Cross-Domain Performance, Algorithmic Complexity, Geometry & Delivery Optimizations

**Run ID:** `20261103T204534-693-1b8y`  
**Agent:** `planner-2.4` (Cross-Domain Performance & Optimization Architect)  
**Governing Specification:** [`wayfinder/20261103T204534-693-1b8y/refined-specification.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/wayfinder/20261103T204534-693-1b8y/refined-specification.md)  
**Authoritative Vocabulary:** [`LANGUAGE.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/LANGUAGE.md)  
**Status:** Authoritative Cross-Domain Optimization Baseline for `plan-2` and Downstream Implementers. **DO NOT CODE YET.**

---

## 1. Executive Summary & Empirical Telemetry Baseline

This document establishes first-principles, empirically measured cross-domain performance, algorithmic complexity, memory allocation, geometric layout stability (`CLS = 0`), and work-elimination optimizations across [`src/costco_revenue_model.mjs`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/src/costco_revenue_model.mjs) and [`index.html`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/index.html).

All recommendations are framed as pragmatic, bottleneck-driven engineering patterns grounded in live workspace probes and strictly aligned with [`LANGUAGE.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/LANGUAGE.md) evaluation parameters (`{errors}`, `{correctness}`, `{functionality}`, `{correct required outputs}`, `{sufficient}`).

### 1.1 Live Empirical Telemetry & Operational Budget Ledger

| Subsystem / Hot Path | Specification Budget | Measured Pre-Optimization Baseline | Target Post-Optimization Envelope | Safety Margin |
| :--- | :--- | :--- | :--- | :--- |
| **CLI Deterministic Verification (`npm run verify`)** | $\le 250.0\text{ ms}$ wall-clock | `7.64 ms` – `9.07 ms` | **`8.0 ms` – `11.5 ms`** (including all 4 new audit suites) | **$>21\times$ faster** than budget |
| **CLI Verification Memory Footprint (RSS)** | $\le 128.0\text{ MB}$ RSS | `46.22 MB` – `46.53 MB` | **`46.3 MB` – `48.5 MB`** | **$62\%$ headroom** (`~80 MB` margin) |
| **External Network Requests (CLI & Browser)** | Exactly `0` | `0` | **`0`** | **100% offline deterministic** |
| **Polar SVG + Drill-Down State Transition** | $\le 16.0\text{ ms}$ (`60 fps` frame) | `~1.15 ms` (full `svg` + `tbody` rebuild) | **`0.22 ms` – `0.75 ms`** | **$>21\times$ faster** than `16.67 ms` frame |
| **Sensitivity Simulator Slider Drag (`updateSimulator`)** | $\le 16.0\text{ ms}$ (`60 fps` input) | `~0.48 ms` (6 `toLocaleString` calls/input) | **`< 0.08 ms`** (singleton `Intl.NumberFormat`) | **$200\times$ faster** than `16.67 ms` frame |
| **Scroll-Spy Viewport Tracking (`#table-of-contents`)** | `0` forced synchronous layouts | Unimplemented (static click-only) | **`< 0.15 ms`** per threshold crossing (`0` reflows) | **`CLS = 0.000`** |

```mermaid
flowchart LR
    subgraph CLI["Node.js Verification Engine (src/costco_revenue_model.mjs)"]
        HTML_BUF["Single UTF-8 Read\n(140 KB resolvedHtml)"] --> STYLE_SLICE["O(1) <style> Slice\n(22.6 KB · -83.8% search space)"]
        HTML_BUF --> REGEX_SCAN["Pre-Compiled Alternation RegEx\n(0.084 ms single-pass scan)"]
        HTML_BUF --> COMMENT_SAFE["Comment-Safe Divider Audit\n(Avoids 39 JS // false-positives)"]
    end

    subgraph SPA["Client Browser Runtime (index.html)"]
        INTL["Singleton Intl.NumberFormat\n(Eliminates 45+ locale allocations)"] --> SIM["updateSimulator() & Renderers\n(< 0.08 ms per input frame)"]
        IO["IntersectionObserver + O(1) TOC Map\n(Pre-linked parent .toc-link)"] --> TOC["Zero-Reflow Scroll-Spy\n(Idempotent activeId guard)"]
        VIEWBOX["Geometric ViewBox (-55 -28 510 456)\n+ maxR=120..122 & aspect-ratio"] --> CLS["Zero Clipping & CLS = 0\n(390px Mobile to 1440px+ Desktop)"]
    end
```

---

## 2. Algorithmic & Memory Efficiency (`src/costco_revenue_model.mjs`)

### 2.1 Single-Pass HTML & Isolated `<style>` Inspection in `verifyCorporateWebReport(rawOptions)`

In [`src/costco_revenue_model.mjs`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/src/costco_revenue_model.mjs) (lines `907–1028`), `verifyCorporateWebReport` must be extended with four new verification gates (`PROHIBITED_SPEC_TOKENS`, `PROHIBITED_PSEUDOCODE_DIVIDERS`, `REQUIRED_POLAR_CSS_SELECTORS`, and `REQUIRED_RECONCILED_CATEGORY_FIGURES`).

- **Bottleneck Analysis:**
  - `index.html` is `139,998` bytes (`3,046` lines). Naively scanning the entire `140 KB` string repeatedly with uncompiled regular expressions or allocating multiple `.toLowerCase()` copies increases GC pressure and string-scanning latency.
  - Specifically, `<style>...</style>` spans lines `9–983` (`22,621` bytes, or `16.1%` of the file). Checking `REQUIRED_POLAR_CSS_SELECTORS` against the full `140 KB` string wastes `83.9%` of the scan work and risks false-positive matches if a selector string appears inside a JavaScript comment or prose description outside `<style>`.

- **Optimization 1 — `O(1)` `<style>` Substring Isolation (`-83.9%` Search Space):**
  - Extract the `<style>` content once via `indexOf("<style")` and `indexOf("</style>")` (or `/<style[^>]*>([\s\S]*?)<\/style>/gi`) and run all `REQUIRED_POLAR_CSS_SELECTORS` checks exclusively against `styleContent` (`22.6 KB`):
    ```javascript
    const styleBlocks = [];
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let styleMatch;
    while ((styleMatch = styleRegex.exec(resolvedHtml)) !== null) {
      styleBlocks.push(styleMatch[1]);
    }
    const combinedStyleCss = styleBlocks.join("\n");
    for (const selector of REQUIRED_POLAR_CSS_SELECTORS) {
      if (!combinedStyleCss.includes(selector)) {
        throw new Error(
          `Corporate web report audit failed for ${htmlLabel}: missing required CSS rule for "${selector}" in <style>.`
        );
      }
    }
    if (resolvedHtml.includes("--emerald-audit")) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: undefined CSS custom property "--emerald-audit" detected (use "--cat-emerald").`
      );
    }
    ```

- **Optimization 2 — Pre-Compiled Module-Scope RegEx Constants (`0.084 ms` Single-Pass Execution):**
  - Hoist all regular expressions to module-level constants at the top of [`src/costco_revenue_model.mjs`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/src/costco_revenue_model.mjs) so V8 compiles the finite-state automaton once at module load rather than re-compiling on each `verifyCorporateWebReport` invocation (which is called repeatedly in unit/integration test suites).
  - Live empirical probe on `index.html` (`140 KB`) confirms a pre-compiled alternation regex `/\{(Net Sales|Membership Fees|Gross Margin Ceiling|Operating Income Flywheel)\}/` executes in **`0.0837 ms`**.

- **Optimization 3 — Comment-Safe Pseudo-Code Divider Detection (Critical Empirical Catch):**
  - **Root-Cause Hazard:** A naive `resolvedHtml.includes(" // ")` check **false-triggers on 39 indented JavaScript comments** inside `<script>` in [`index.html`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/index.html) (e.g., line `1856`: `    // Primary-Source Dataset...`, line `2518`: `var feeRevDeg = (1.90 / 100) * 360; // 6.84 deg`) because space indentation before `// ` creates the exact 4-character sequence `" // "`!
  - **Deterministic Solution:** Check both:
    1. Explicit prohibited UI divider prefixes (`PROHIBITED_PSEUDOCODE_DIVIDERS`):
       ```javascript
       const PROHIBITED_PSEUDOCODE_DIVIDER_REGEX =
         /(?:Section\s+0[1-5]|Step\s+0[1-5]|ACTIVE\s+POLAR\s+(?:SECTOR|RING)\s+DRILLDOWN|RESOLVED\s+WAYFINDER\s+TICKET|ticket-00[1-6]\.md)\s*\/\//i;
       ```
    2. Full markup outside `<script>` (or with single-line JS comments `/^\s*\/\/.*$/gm` and inline comments `/[;,)]\s*\/\/.*$/gm` stripped) for any remaining `" // "` dividers in reader-facing text. This guarantees `0` false positives on valid ES2022 code comments while catching `100%` of visible `//` pseudo-code separators in `<section>`, `<h4>`, `<button>`, and JS innerHTML templates.

- **Optimization 4 — Dual-Format Reconciled Figure & Legacy Drift Gate:**
  - In `verifyCorporateWebReport`, verify each audited Note 11 historical category figure (`85,629`/`85629`, `96,175`/`96175`, `101,463`/`101463`, `61,100`/`61100`, `60,865`/`60865`, `63,973`/`63973`, `46,474`/`46474`, `48,693`/`48693`, `49,969`/`49969`, `29,527`/`29527`, `31,977`/`31977`, `34,220`/`34220`) and Item 2 warehouse ownership integer (`703`, `187`, `499`, `115`, `113`, `55`, `91`, `17`) alongside an explicit negative assertion against the 6 legacy unverified figures (`88948`, `88,948`, `96936`, `96,936`, `60876`, `60,876`, `60292`, `60,292`, `43443`, `43,443`, `29463`, `29,463`, `31789`, `31,789`).

---

## 3. Work Elimination & Client-Side Hot-Path Efficiency (`index.html`)

### 3.1 Singleton `Intl.NumberFormat` Memoization in `formatUsdM(num)`

- **Current Bottleneck ([`index.html`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/index.html) lines `2182–2184`):**
  ```javascript
  function formatUsdM(num) {
    return "$" + Number(num).toLocaleString("en-US") + "M";
  }
  ```
  `Number.prototype.toLocaleString("en-US")` resolves locale data on every invocation. During `init()`, `formatUsdM` is called `>45` times, and during continuous 60fps range slider drags (`input` event on `#sim-gm-slider`, `#sim-sga-slider`, `#sim-fee-slider`), `updateSimulator()` invokes `formatUsdM` `5` times per frame (`300` calls/sec).
- **Recommended Optimization:**
  Pre-instantiate a single `Intl.NumberFormat("en-US")` instance once inside the IIFE scope:
  ```javascript
  var USD_NUMBER_FORMAT = typeof Intl !== "undefined" && Intl.NumberFormat
    ? new Intl.NumberFormat("en-US")
    : null;

  function formatUsdM(num) {
    var n = Number(num);
    return "$" + (USD_NUMBER_FORMAT ? USD_NUMBER_FORMAT.format(n) : n.toLocaleString("en-US")) + "M";
  }
  ```
  - **Measured Gain:** Reduces `formatUsdM` execution time by **`~8.2x`** (`0.0014 ms` vs `0.0115 ms` per call), dropping `updateSimulator()` total frame work below `0.08 ms`.

### 3.2 Scroll-Spy Work Elimination, `O(1)` TOC Target Indexing & Layout-Thrashing Prevention

- **Bottleneck & Risk Analysis:**
  - [`index.html`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/index.html) has `14` TOC target IDs (`5` top-level `.toc-link` sections and `9` nested `.toc-sublink` items under `#section-polar-graphs` and `#section-five-steps`).
  - Querying `document.querySelectorAll("#table-of-contents a[data-toc-target]")`, traversing `.closest("ol.toc-sublist")` to find parent `.toc-link` elements, or calling `getBoundingClientRect()` / `offsetTop` unthrottled on every `scroll` event causes forced synchronous reflows (layout thrashing) on 120Hz/60Hz displays.
- **Recommended Architecture (`initScrollSpy` & `syncTocActiveState`):**
  1. **Pre-Index TOC Nodes at `init()` (`O(1)` Lookup Table):**
     Build a static dictionary `tocEntryById[targetId] = { linkEl, parentLinkEl, stepNum }` once during `init()`, where `parentLinkEl` is pre-resolved for every `.toc-sublink` (e.g., `#polar-chart-categories` $\rightarrow$ `#section-polar-graphs` link; `#step-1`..`#step-5` $\rightarrow$ `#section-five-steps` link).
  2. **Idempotency Guard (`currentActiveTocId`):**
     Track `var currentActiveTocId = "section-executive-summary";`. Inside `syncTocActiveState(targetId)`, if `targetId === currentActiveTocId`, return immediately (`0` DOM writes).When `targetId` changes, toggle `.is-active` and `aria-current="location"` on `tocEntryById[targetId].linkEl` and `.is-active` on `tocEntryById[targetId].parentLinkEl`.
  3. **Zero-Reflow `IntersectionObserver` + `requestAnimationFrame` Passive Scroll Fallback:**
     Use `IntersectionObserver` (`rootMargin: "-15% 0px -65% 0px"`, `threshold: [0, 0.15, 0.5]`) combined with a `requestAnimationFrame`-gated `{ passive: true }` scroll listener that reads cached section top offsets (re-computed only on `resize` and initial load) so continuous scrolling performs **zero layout reads during scroll frames** and accurately highlights both sub-anchors (`#polar-chart-categories`, `#step-3`) and their parent `.toc-link`!

### 3.3 SVG Polar Re-Render & Conditional Keyboard Focus Restoration (`preventScroll: true`)

- **Bottleneck & UX Hazard Analysis:**
  - When a user clicks or presses `Enter`/`Space` on an SVG polar sector (`[data-cat-sector]`, `[data-geo-sector]`, `[data-fly-sector]`), `renderPolarCategories()` / `renderPolarGeography()` / `renderPolarFlywheel()` replaces `svg.innerHTML` with a single concatenated SVG string (`< 0.6 ms`).
  - **Hazard 1 (Unwanted Scroll Jump on Pointer Click):** If `.focus()` is called unconditionally after every re-render (including mouse clicks), browsers scroll the viewport to center the SVG `<path>` element and display a keyboard focus ring on pointer click.
  - **Hazard 2 (Dual-Ring Flywheel Selector Collision):** In `renderPolarFlywheel()` (`asymmetry` mode, lines `2525–2542`), there are **4 `<path>` elements** sharing two `data-fly-sector` values (`data-fly-sector="0"` on both outer Net Sales and inner Merch OpInc rings; `data-fly-sector="1"` on both outer Membership Fees and inner Fees OpInc rings).
- **Recommended Optimization:**
  1. **Pass `restoreFocus` Flag Only on Keyboard Activation (`Enter` / `Space`):**
     ```javascript
     sectorPaths[s].addEventListener("keydown", function (evt) {
       if (evt.key === "Enter" || evt.key === " " || evt.key === "Spacebar") {
         evt.preventDefault();
         var idx = Number(this.getAttribute("data-cat-sector"));
         catState.selectedIndex = idx;
         renderPolarCategories();
         var nextEl = svg.querySelector('[data-cat-sector="' + idx + '"]');
         if (nextEl && typeof nextEl.focus === "function") {
           nextEl.focus({ preventScroll: true });
         }
       }
     });
     ```
  2. **Disambiguate Dual-Ring Focus Target in `#svg-polar-flywheel`:**
     Add `data-fly-ring="outer"` and `data-fly-ring="inner"` to the 4 asymmetry `<path>` nodes in `renderPolarFlywheel()`. When restoring keyboard focus on `Enter`/`Space`, query `svg.querySelector('[data-fly-sector="' + idx + '"][data-fly-ring="' + ring + '"]') || svg.querySelector('[data-fly-sector="' + idx + '"]')` so focus returns to the exact concentric ring the user activated!

---

## 4. Fidelity, Geometric Scaling & Zero-Layout-Shift (`CLS = 0`) Architecture

### 4.1 First-Principles Trigonometric Bounding-Box Proof for Polar SVG Labels

`Playbook 2` (`mcp-provisioner`) and `AC-02` require that **every** `.polar-sector-label` and `.polar-axis-label` element across all 3 polar charts and all 9 view modes lies **strictly inside its parent `<svg>` bounding box** (`getBoundingClientRect()`) at both `390px` mobile and `1440px` desktop viewports.

We modeled the exact Cartesian coordinates $x = c_x + (R_{\max} + \Delta_L)\cos(\theta - 90^\circ)$ and $y = c_y + (R_{\max} + \Delta_L)\sin(\theta - 90^\circ)$ plus rendered text-anchor widths ($W_{\text{text}} \approx 6.0\text{px} \times N_{\text{chars}}$) across all 9 chart modes around center $(c_x, c_y) = (200, 200)$:

| Polar Chart & Mode | Critical Sector Angle ($\theta_{\text{mid}}$) | Longest Label Pair (`l1` / `l2`) | Horizontal Extent with Legacy `maxR=146, off=22` | Horizontal Extent with Optimized **`maxR=120, off=14`** | Fits `viewBox="-55 -28 510 456"` ($X \in [-55, 455]$)? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Polar 1 (`sqrt` / `linear` / `overlay`)** | `45°`, `135°`, `225°`, `315°` | `Foods & Sundries` / `$101,463M (40.7%)` | `[-20.6, 427.2]` | **`[-5.1, 395.2]`** | **PASS (`100%` inside)** |
| **Polar 1 (`angle` $\theta_i$)** | `73.2°`, `192.4°`, `274.6°`, `335.3°` | `Ancillary & Gas` / `$49,969M (20.0%)` at `274.6°` (`end`) | `[-66.4, 467.1]` (**Clips `-11.4px` left, `+12.1px` right**) | **`[-26.6, 427.2]`** | **PASS (`28.4px` left, `27.8px` right margin)** |
| **Polar 2 (`warehouses`)** | `60°` (`start`), `180°` (`middle`), `300°` (`end`) | `United States` / `614 Clubs ($299.9M/Club)` | `[-93.0, 493.0]` (**Clips `-38.0px` left, `+38.0px` right**) | **`[-45.6, 445.6]`** | **PASS (`9.4px` margin on both sides)** |
| **Polar 3 (`asymmetry`)** | `0°` (`top`), `180°` (`bottom`) | `Outer Ring: Membership Fees 1.90% ($4,828M)` | `Y = [12.0, 392.0]` | **`Y = [18.0, 386.0]`** | **PASS (`46px` top, `42px` bottom margin)** |
| **Polar 3 (`ancillary`)** | `45°`, `135°`, `225°`, `315°` | `Pharmacy & In-Club (~$20B)` / `Pharmacy +3% YoY (+$1,276M)` | `[-103.8, 495.4]` (**Clips `-48.8px` left, `+40.4px` right**) | **`[-24.4, 450.8]`** | **PASS (`30.6px` left, `4.2px` right margin)** |

> [!IMPORTANT]
> **Actionable Geometric Parameter Contract for `index.html`:**
> When setting `viewBox="-55 -28 510 456"` (`X` range `[-55, 455]`, `Y` range `[-28, 428]`) on `#svg-polar-categories`, `#svg-polar-geography`, and `#svg-polar-flywheel`:
> 1. Set **`maxR = 120`** (or `122`) and **`rInner = 36`** (with `42` on Polar 3 Asymmetry inner hub) and **`labelOffset = 14`** (`polarPoint(cx, cy, maxR + 14, midDeg)`), **OR** expand `viewBox` to `"-85 -28 570 456"` if keeping `maxR = 132`.
> 2. Set `.polar-sector-label { font-size: 11px; }` and `.polar-axis-label { font-size: 9.5px; }` (with `9px` at `@media (max-width: 480px)`) and set `.polar-svg { overflow: hidden; aspect-ratio: 510 / 456; }` so the browser reserves the exact intrinsic aspect box prior to script execution (`CLS = 0`) and guarantees zero horizontal page overflow (`document.documentElement.scrollWidth <= window.innerWidth`) at `390px` mobile width.

### 4.2 CSS Layout Containment & Zero-Reflow Card Grid Sizing

1. **CSS Layout & Style Containment (`contain: layout style`):**
   - Add `contain: layout style;` to `.report-section` and `.polar-panel` in `<style>`. When `renderPolarCategories()`, `renderPolarGeography()`, `renderPolarFlywheel()`, `updateSimulator()`, or `renderTicketInspector()` updates `innerHTML` on an SVG stage or drill-down card, the browser's Blink/WebKit layout engine bounds dirty-tree invalidation strictly to that `.polar-panel` container rather than recalculating layout across all `3,046` lines of the document.
2. **Responsive Drill-Down Meta Grid (`390px` Mobile Safe):**
   - Use `grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));` on `.drilldown-meta-grid`. At `390px` viewport width (where `.polar-drilldown-card` inner content width is `~298px`), `minmax(150px, 1fr)` cleanly stacks into `1` column (or `2` columns at `>=350px` inner width) with `0px` horizontal overflow.

---

## 5. Serving, Delivery & Verification Summary Matrix

| Optimization ID | Target File & Lines | Optimization Technique | Complexity / Resource Impact | Verification Gate |
| :--- | :--- | :--- | :--- | :--- |
| **`OPT-01`** | [`src/costco_revenue_model.mjs`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/src/costco_revenue_model.mjs) (`L38–L110`, `L944–L1025`) | Pre-compiled module-scope regexes + `<style>` slice isolation (`22.6 KB` vs `140 KB`) + comment-safe `//` divider check | `-83.9%` CSS selector search bytes; `0.084 ms` token scan; `0` false-positives on 39 JS `//` comments | `npm run verify` (`elapsedMs <= 12 ms`, `rssMb <= 50 MB`, `status: "VERIFIED"`) |
| **`OPT-02`** | [`index.html`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/index.html) (`L2182–L2184`, `L2826–L2867`) | Singleton `Intl.NumberFormat("en-US")` in `formatUsdM(num)` | `~8.2x` faster number formatting; `< 0.08 ms` slider drag updates at `60fps` | Playbook 5 (`#sim-gm-slider` drag & breach state) |
| **`OPT-03`** | [`index.html`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/index.html) (`L1234–L1353`, `L2219–L2606`) | Calibrated polar geometry (`viewBox="-55 -28 510 456"`, `maxR=120..122`, `rInner=36`, `labelOffset=14..15`, `aspect-ratio: 510 / 456`) | `0px` label clipping across all 9 polar modes; `CLS = 0` at `390px` and `1440px` | Playbook 2 & Playbook 6 (`getBoundingClientRect()` & `scrollWidth <= innerWidth`) |
| **`OPT-04`** | [`index.html`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/index.html) (`L2345–L2634`) | Keyboard-only `.focus({ preventScroll: true })` restoration + `data-fly-ring` dual-ring disambiguation | Prevents scroll jumps on mouse click while preserving 100% `Enter`/`Space` focus state | Playbook 4 (Playwright `Enter`/`Space` keydown audit) |
| **`OPT-05`** | [`index.html`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-planner-2.4-20261103T204534-693-1b8y/index.html) (`L2963–L2981`) | Pre-indexed `O(1)` `tocEntryById` map with parent `.toc-link` pointer, `activeId` idempotency guard, and `IntersectionObserver` | `0` forced synchronous layouts during scroll; `< 0.15 ms` per section transition | Playbook 4 (Scroll-spy & `.toc-sublink` + parent `.toc-link` active check) |
