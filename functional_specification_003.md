# Functional Specification 003: Costco Wholesale Corporation (`COST`) Webpage Refinement, Visual & Geometric Polish, Data Reconciliation, and Straightforward Technical English Editorial Overhaul

**Document Version:** 1.0 (`/craft-documentation` Functional Specification; Reconciled with [`LANGUAGE.md`](file:///Users/diesel/desktop/costco/LANGUAGE.md), [`functional_specification_002.md`](file:///Users/diesel/desktop/costco/functional_specification_002.md), [`wayfinder/map.md`](file:///Users/diesel/desktop/costco/wayfinder/map.md), and [`data/costco_revenue_breakdown.json`](file:///Users/diesel/desktop/costco/data/costco_revenue_breakdown.json))  
**Status:** Authoritative Functional & Operational Requirements Specification (`functional_specification_003.md`).  
**DO NOT CODE YET.** Contains zero implementation syntax, internal helper scaffolding, or mechanical code diffs.

---

## 1. Executive Summary & Core Objective

This specification defines the desired `{functionality}`, domain taxonomy alignment ([`LANGUAGE.md`](file:///Users/diesel/desktop/costco/LANGUAGE.md)), visual and geometric refinement requirements, primary-source data reconciliation rules, straightforward technical English editorial standards, operational budgets, edge-case failure boundaries, and objectively measurable `{correct required outputs}` for refining and ironing over the interactive corporate report ([`index.html`](file:///Users/diesel/desktop/costco/index.html)) and its deterministic verification suite ([`src/costco_revenue_model.mjs`](file:///Users/diesel/desktop/costco/src/costco_revenue_model.mjs)).

While the existing webpage is structurally well organized into five logical sections and its headline FY2024 figures are factual, empirical inspection of [`index.html`](file:///Users/diesel/desktop/costco/index.html) against [`data/costco_revenue_breakdown.json`](file:///Users/diesel/desktop/costco/data/costco_revenue_breakdown.json) and [`research/costco_revenue_architecture.md`](file:///Users/diesel/desktop/costco/research/costco_revenue_architecture.md) surfaces four root-cause systemic defects that must be eliminated:

1. **Straightforward Technical English Editorial Overhaul:**
   - The current webpage leaks raw curly-brace specification tokens (`{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`) directly into reader-facing headings, paragraphs, tables, and chart captions, alongside pseudo-code double-slash prefixes (`Section 01 // Institutional Executive Briefing`, `Step 01 // Primary-Source SEC 10-K Telemetry`) and promotional metaphors (`Gatekeeper Subscription`, `High-Frequency Trip Magnets`, `Subscription Annuity`, `treasure-hunt discretionary basket builder`).
   - All visible prose, headings, table labels, chart callouts, step explanations, simulator readouts, and ticket summaries in [`index.html`](file:///Users/diesel/desktop/costco/index.html) MUST be rewritten in clear, direct, **straightforward technical English**—explaining the accounting, warehouse operations, inventory turnover, and cash-flow mechanics plainly without raw `{...}` braces, `//` decorative separators, or marketing jargon.
2. **Polar Graph SVG Rendering, Label Framing & Drill-Down Card Polish:**
   - The interactive polar charts currently emit SVG concentric grid circles, radial axis spokes, center hub titles/subtitles, and outer sector labels whose visual presentation rules were omitted from the page stylesheet—causing SVG concentric grid rings to default to opaque black fill (`#000000`), radial spokes to render invisibly (`stroke: none`), center hub labels to render off-center without middle text anchoring, and outer sector callouts to clip against the `400×400` SVG viewport boundaries.
   - Similarly, the interactive sector drill-down cards and the simulator ceiling-breach alert state rely on unstyled layout containers and an undefined color token, causing label-and-value metadata pairs to run together without spacing or visual hierarchy.
   - Every polar chart, legend, and drill-down card must be visually ironed over so that grid rings render as crisp hairline guides, radial spokes and ticks terminate cleanly, outer callouts fit comfortably inside the SVG viewport at all desktop and mobile widths (`390px` to `1440px+`), and drill-down cards display structured, high-contrast key-value grids.
3. **Exact Multi-Year Note 11 & Item 2 Primary-Source Data Reconciliation in `index.html`:**
   - While FY2024 figures in [`index.html`](file:///Users/diesel/desktop/costco/index.html) match the SEC Form 10-K, the embedded historical FY2022 and FY2023 merchandise category figures and geographic owned/leased warehouse counts in the webpage diverge from [`data/costco_revenue_breakdown.json`](file:///Users/diesel/desktop/costco/data/costco_revenue_breakdown.json) and Note 11 / Item 2 of the FY2024 Form 10-K (for example, showing `$88,948M` and `$96,936M` for FY2022 and FY2023 Foods and Sundries instead of the audited Note 11 figures of `$85,629M` and `$96,175M`, and listing `704` owned warehouses instead of `703` owned and `187` leased).
   - Every multi-year category figure, share percentage, year-over-year growth rate, and warehouse ownership count in [`index.html`](file:///Users/diesel/desktop/costco/index.html) must be 100% reconciled with [`data/costco_revenue_breakdown.json`](file:///Users/diesel/desktop/costco/data/costco_revenue_breakdown.json) and [`research/costco_revenue_architecture.md`](file:///Users/diesel/desktop/costco/research/costco_revenue_architecture.md).
4. **Interactive Scroll-Spy, Keyboard Accessibility & Verification Hardening:**
   - The sticky Table of Contents (`#table-of-contents`) must actively track viewport scroll position across all 5 sections and sub-anchors (not only click events), interactive SVG polar sectors must respond to keyboard navigation (`Enter` and `Space`) in addition to pointer clicks, and [`src/costco_revenue_model.mjs`](file:///Users/diesel/desktop/costco/src/costco_revenue_model.mjs) must enforce deterministic checks against raw curly-brace token leakage, unstyled SVG/drill-down selectors, and historical Note 11 figure drift.

---

## 2. Authoritative Domain Vocabulary & Taxonomy Alignment (`LANGUAGE.md`)

All planning, implementation, review, and verification stages MUST strictly adopt the evaluation parameters and domain vocabulary defined in [`LANGUAGE.md`](file:///Users/diesel/desktop/costco/LANGUAGE.md):

- **`{errors}`**: Explicit failure states or structural invariant breaches, specifically including:
  1. Leaking raw curly-brace taxonomy markers (`{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`) or `//` pseudo-code separators into visible reader-facing text in [`index.html`](file:///Users/diesel/desktop/costco/index.html),
  2. Rendering unstyled SVG polar grid rings (defaulting to solid black fill instead of transparent fill with hairline stroke), invisible radial spokes, uncentered hub labels, clipped outer sector labels, or unformatted drill-down metadata items,
  3. Any discrepancy between the multi-year Note 11 category figures or Item 2 warehouse ownership counts in [`index.html`](file:///Users/diesel/desktop/costco/index.html) and the verified primary-source dataset in [`data/costco_revenue_breakdown.json`](file:///Users/diesel/desktop/costco/data/costco_revenue_breakdown.json),
  4. Retaining any legacy Dreamcore / Y2K aesthetic markers or breaking any required corporate DOM IDs (`#table-of-contents`, `#section-executive-summary`, `#section-polar-graphs`, `#polar-chart-categories`, `#polar-chart-geography`, `#polar-chart-flywheel`, `#section-five-steps`, `#step-1`..`#step-5`, `#section-gaap-model`, `#section-wayfinder-audit`),
  5. Browser runtime console errors, uncaught page exceptions, broken internal anchor links, or non-zero exit codes from `npm run verify` (`RULE[user_global]`).
- **`{correctness}`**: Exact mathematical, accounting, geometric, and editorial fidelity across all repository deliverables:
  1. Consolidated total revenue equals the exact sum of `{Net Sales}` (`$249,625M`, `98.10%`) and `{Membership Fees}` (`$4,828M`, `1.90%`) = `$254,453M` in FY2024 (and `$222,730M + $4,224M = $226,954M` in FY2022; `$237,710M + $4,580M = $242,290M` in FY2023),
  2. Note 11 disaggregated `{Net Sales}` across all three reported fiscal years in [`index.html`](file:///Users/diesel/desktop/costco/index.html) match [`data/costco_revenue_breakdown.json`](file:///Users/diesel/desktop/costco/data/costco_revenue_breakdown.json) to the exact dollar million:
     - **Foods and Sundries:** FY2022 `$85,629M` (`38.45%`), FY2023 `$96,175M` (`40.46%`), FY2024 `$101,463M` (`40.65%`, `+5.50%` YoY),
     - **Non-Foods:** FY2022 `$61,100M` (`27.43%`), FY2023 `$60,865M` (`25.60%`), FY2024 `$63,973M` (`25.63%`, `+5.11%` YoY),
     - **Warehouse Ancillary and Other Businesses:** FY2022 `$46,474M` (`20.87%`), FY2023 `$48,693M` (`20.48%`), FY2024 `$49,969M` (`20.02%`, `+2.62%` YoY),
     - **Fresh Foods:** FY2022 `$29,527M` (`13.26%`), FY2023 `$31,977M` (`13.45%`), FY2024 `$34,220M` (`13.71%`, `+7.01%` YoY),
  3. Note 11 and Item 2 geographic segment metrics in [`index.html`](file:///Users/diesel/desktop/costco/index.html) match [`data/costco_revenue_breakdown.json`](file:///Users/diesel/desktop/costco/data/costco_revenue_breakdown.json):
     - **United States:** `$184,143M` revenue (`72.37%`), `$6,217M` operating income (`3.38%` margin), `614` warehouses (`499` owned, `115` leased, `91.1M` sq ft, `219,000` employees),
     - **Other International:** `$35,436M` revenue (`13.93%`), `$1,420M` operating income (`4.01%` margin), `168` warehouses (`113` owned, `55` leased across 12 countries: Mexico `40`, Japan `35`, U.K. `29`, Korea `19`, Australia `15`, Taiwan `14`, China `7`, Spain `4`, France `2`, Iceland `1`, New Zealand `1`, Sweden `1`; `24.3M` sq ft, `61,000` employees),
     - **Canada:** `$34,874M` revenue (`13.71%`), `$1,648M` operating income (`4.73%` margin), `108` warehouses (`91` owned, `17` leased, `15.5M` sq ft, `53,000` employees),
     - **Consolidated Total:** `$254,453M` revenue, `$9,285M` operating income (`3.65%` margin), `890` warehouses (`703` owned land and building, `187` leased—of which `134` are land-only leases where Costco owns the building, meaning Costco owns `837` of `890` building structures; `130.9M` sq ft warehouse floor space, `31.9M` sq ft depot space, `333,000` employees),
  4. Merchandise gross margin adheres to Costco's `{Gross Margin Ceiling}` (`10.92%` or `$27,267M` in FY2024 vs. `9.14%` or `$22,810M` SG&A), leaving `$4,457M` (`48.00%`) in net merchandise operating contribution so that `$4,828M` (`52.00%`) in `{Membership Fees}` drives `$9,285M` in operating income and `$7,367M` in net income, reinforced by `12.60x` inventory turnover and `104.15%` accounts payable (`$19,421M`) to merchandise inventory (`$18,647M`) coverage.
- **`{functionality}`**: End-to-end user experience where a reader can open [`index.html`](file:///Users/diesel/desktop/costco/index.html) on desktop (`1440px`) or mobile (`390px`), read every section in clean, straightforward technical English, inspect properly styled and framed SVG polar charts without black background circles or clipped labels, interact via mouse or keyboard across all controls, follow live scroll-spy highlighting in the sticky Table of Contents, and verify the entire repository via `npm run verify` in $\le 250\text{ ms}$ with `0` external network requests.
- **`{correct required outputs}`**:
  1. Refined [`index.html`](file:///Users/diesel/desktop/costco/index.html) with complete visual/SVG styling, reconciled FY2022–FY2024 Note 11 & Item 2 data, scroll-spy and keyboard accessibility, and straightforward technical English throughout,
  2. Reconciled [`wayfinder/map.md`](file:///Users/diesel/desktop/costco/wayfinder/map.md) and [`wayfinder/tickets/ticket-006.md`](file:///Users/diesel/desktop/costco/wayfinder/tickets/ticket-006.md) (or an additional resolved ticket if warranted, keeping all ticket links descriptive and human-readable),
  3. Enhanced [`src/costco_revenue_model.mjs`](file:///Users/diesel/desktop/costco/src/costco_revenue_model.mjs) and [`README.md`](file:///Users/diesel/desktop/costco/README.md) that deterministically audit the refined webpage's visual/CSS selectors, historical Note 11 numbers, and clean technical English prose invariants.

---

## 3. Functional Requirements: Editorial Simplification, Visual & Geometric Refinement, Data Reconciliation & Interactive Polish

```mermaid
flowchart LR
    A["1. Editorial Refinement (Straightforward Technical English)"] --> B["2. SVG Polar Chart & Drill-Down Visual Polish"]
    B --> C["3. Note 11 & Item 2 Multi-Year Data Reconciliation"]
    C --> D["4. Scroll-Spy, Keyboard A11y & Deterministic Audit"]
```

### 3.1 Requirement 1: Straightforward Technical English Editorial Standards (`index.html`)

1. **Complete Removal of Raw Specification Syntax & Decorative Pseudo-Code Separators:**
   - Remove all raw curly braces around domain terms (`{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`) from visible HTML headings, body copy, KPI labels, table headers/cells, chart captions, simulator banners, and script-rendered strings in [`index.html`](file:///Users/diesel/desktop/costco/index.html). Write the terms naturally in plain technical English: **Net Sales**, **Membership Fees**, **Gross Margin Ceiling** (or **10.92% gross margin cap**), and **Operating Income Flywheel** (or **operating profit structure**).
   - Replace all `//` pseudo-code dividers in section eyebrows, drill-down headers, step telemetry headers, and ticket tabs (such as `Section 01 // Institutional Executive Briefing`, `ACTIVE POLAR SECTOR DRILLDOWN // NOTE 11 MERCHANDISE CATEGORY`, `Step 01 // Primary-Source SEC 10-K Telemetry`, and `ticket-001.md // Two-Pillar & ASC 606`) with clean typographic labels (e.g., `Section 01 · Executive Summary`, `Selected Category Detail · Note 11`, `Step 1 Key Figures (FY2024 Form 10-K)`, and `ticket-001.md · Revenue Recognition (ASC 606)`).
2. **Direct, Plain-Spoken Technical Explanations Across All Five Sections:**
   - Replace promotional buzzwords and figurative idioms (`Gatekeeper Subscription`, `High-Frequency Trip Magnets`, `Subscription Annuity`, `treasure-hunt discretionary basket builder`, `perceive unmistakable value`, `threatens the 92.9% renewal moat`) with straightforward technical English that states the physical and accounting mechanism directly:
     - **Section 01 (Executive Summary & FY2024 GAAP Scorecard):** State clearly how Costco generated `$254,453M` in total revenue across `890` warehouses in FY2024 (`$249,625M` from merchandise net sales and `$4,828M` from annual membership fees), capped merchandise gross margin at `10.92%` (`$27,267M`), kept SG&A expenses at `9.14%` of net sales (`$22,810M`), and combined `$4,457M` of net merchandise operating profit (`48.00%`) with `$4,828M` of membership fees (`52.00%`) to earn `$9,285M` in operating income and `$7,367M` in net income.
     - **Section 02 (Polar Revenue Graphs):** Explain in plain technical English what each polar chart measures, how each scaling mode works (area-proportional radius where sector area is proportional to dollar volume, linear radius where radial length is proportional to dollar volume, and share-weighted angle where sector angle matches revenue share), and what the selected category, geographic region, or profit ring contributes.
     - **Section 03 (How Costco Generates Revenue in 5 Steps):**
       - *Step 1 — Paid Membership Access and Executive Tier Concentration (`$4,828M` Membership Fees):* Explain upfront cash collection (`$65` base / `$130` Executive effective September 1, 2024; `$60`/`$120` during FY2024), ratable 12-month recognition under `ASC 606` against `$2,501M` in deferred membership fees, `76.2M` paid members (`136.8M` total cardholders), `92.9%` U.S./Canada and `90.5%` worldwide renewal rates, and `35.4M` Executive members (`46.5%` of paid members) generating `73.3%` of worldwide net sales with `$2,804M` in 2% rewards deducted directly from net sales.
       - *Step 2 — High-Volume Purchasing Across Fewer Than 4,000 SKUs (`$249,625M` Net Sales):* Explain how carrying fewer than `4,000` active warehouse SKUs concentrates over `$62M` of annual purchasing volume per average item across `890` clubs, how direct-to-floor pallet cross-docking through `31.9M` sq ft of depots lowers handling labor, and how Kirkland Signature private-label goods (`~30%+` of sales) lower member prices while adding `+36 bps` to core merchandise margin.
       - *Step 3 — Ancillary Businesses and E-Commerce Fulfillment (`$49,969M` Ancillary + `~7%` E-Commerce):* Explain how `719` gas stations (`~12%` of net sales, `~$30.0B`, `+1%` gallon volume), pharmacies (`+3%` YoY ancillary dollar growth leader), optical centers, hearing aid centers, tire installation, and food courts drive frequent repeat visits, while e-commerce (`~7%` of net sales, `+16%` comparable growth across `9,000–10,000` online SKUs) and digitally originated sales (`~9%` of net sales, including Costco Logistics, Costco Next, and Costco Travel) handle big-and-bulky and online orders.
       - *Step 4 — The 10.92% Gross Margin Cap and Supplier-Financed Inventory (`104.15%` Accounts Payable to Inventory):* Explain how Costco limits merchandise gross margin to `10.92%` (`$249,625M` net sales minus `$222,358M` merchandise costs = `$27,267M`), operates at `9.14%` SG&A (`$22,810M`), and turns inventory `12.60x` per year (`28.97` days of inventory vs. `31.88` days payable) so that `$19,421M` in accounts payable covers `104.15%` of `$18,647M` in merchandise inventory (`+$774M` supplier-funded float).
       - *Step 5 — Operating Profit Conversion (`$9,285M` Operating Income to `$7,367M` Net Income):* Explain how `$27,267M` in merchandise gross margin minus `$22,810M` in SG&A leaves `$4,457M` (`48.00%`) in net merchandise operating contribution, allowing `$4,828M` (`52.00%`) in membership fees to bring consolidated operating income to `$9,285M` (`3.65%` margin), plus `+$455M` net interest and other income (`$624M` interest/other income minus `$169M` interest expense = `$9,740M` pre-tax income) less `$2,373M` income tax (`24.36%` effective rate) = `$7,367M` net income (`$16.56` diluted EPS).
     - **Section 04 & Section 05 (GAAP Waterfall, Simulator & Wayfinder Audit):** Ensure every table description, simulator readout, ceiling-breach alert, and ticket summary uses clean, concise technical prose.

### 3.2 Requirement 2: Visual, Geometric & Stylesheet Polish for Polar Charts and Drill-Down Cards (`index.html`)

1. **Complete Stylesheet Coverage for All SVG Polar Elements:**
   - Concentric radial grid rings (`.polar-grid-ring`) MUST explicitly render with `fill: none`, a subtle slate stroke (`#CBD5E1` or `#E2E8F0`), and dashed hairline geometry so they never default to solid black SVG circles.
   - Radial axis spokes (`.polar-axis-spoke`) MUST render with a crisp `1px` slate stroke (`#CBD5E1`) radiating from the center hub to the outer ring boundary.
   - Center hub labels (`.polar-center-title` and `.polar-center-sub`) MUST be horizontally centered (`text-anchor: middle`), tabular-numeral monospace (`--font-mono`), and sized to fit cleanly inside the inner hub circle (`r = 28..42px`) without touching the hub stroke.
   - Sector callout labels (`.polar-sector-label`) and axis/value sub-labels (`.polar-axis-label`) MUST have explicit typographic rules (`11px–12.5px` font size, high-contrast slate/brand fills, and clean line separation).
2. **Unclipped Polar Viewport & Callout Geometry:**
   - The SVG coordinate space (`viewBox`) and radial label placement for `#svg-polar-categories`, `#svg-polar-geography`, and `#svg-polar-flywheel` MUST provide sufficient horizontal and vertical margin around the outer grid ring so that every sector label and dollar/percentage callout fits completely inside the SVG `viewBox` without clipping or overlapping adjacent labels across all view modes (`FY2024`, `FY2023`, `FY2022`, `3-Year Overlay`, `Area √r`, `Linear r`, `Share Angle θ_i`, `Total Revenue`, `Operating Income`, `Warehouses`, `Dual-Ring Asymmetry`, and `Ancillary Rose`).
   - In `3-Year Overlay` mode on `#polar-chart-categories`, include a clear visual legend or caption key distinguishing the `FY2024` filled sector from the `FY2023` and `FY2022` comparison rings.
3. **Structured Drill-Down Cards & Simulator Breach Styling:**
   - Define complete layout and typographic styles for the drill-down card sub-elements (`.drilldown-eyebrow`, `.drilldown-title`, `.drilldown-copy`, `.drilldown-meta-grid`, and `.drilldown-meta-item`), arranging the 3 metadata items in a responsive grid of bordered wells where the metric label sits above the bold monospace value with clear visual separation.
   - Define the `.sim-output-banner.is-breach` warning state with a high-contrast Costco Crimson border (`#E31837`) and subtle crimson tint background so breaching the `11.50%` gross margin ceiling produces an immediate, unmistakable visual state transition.
   - Replace any undefined CSS custom property references (such as `var(--emerald-audit)`) with defined `:root` tokens (`var(--cat-emerald)`).

### 3.3 Requirement 3: Primary-Source Data Reconciliation Across `index.html` and `data/costco_revenue_breakdown.json`

1. **Exact Note 11 Merchandise Category Historical Figures (FY2022–FY2024):**
   - Reconcile the merchandise category data table and polar chart dataset in [`index.html`](file:///Users/diesel/desktop/costco/index.html) with [`data/costco_revenue_breakdown.json`](file:///Users/diesel/desktop/costco/data/costco_revenue_breakdown.json) and Note 11 of the FY2024 Form 10-K:
     - **Foods and Sundries:** FY2022 `$85,629M` (`38.45%`), FY2023 `$96,175M` (`40.46%`), FY2024 `$101,463M` (`40.65%`, `+5.50%` YoY),
     - **Non-Foods:** FY2022 `$61,100M` (`27.43%`), FY2023 `$60,865M` (`25.60%`), FY2024 `$63,973M` (`25.63%`, `+5.11%` YoY),
     - **Warehouse Ancillary and Other Businesses:** FY2022 `$46,474M` (`20.87%`), FY2023 `$48,693M` (`20.48%`), FY2024 `$49,969M` (`20.02%`, `+2.62%` YoY),
     - **Fresh Foods:** FY2022 `$29,527M` (`13.26%`), FY2023 `$31,977M` (`13.45%`), FY2024 `$34,220M` (`13.71%`, `+7.01%` YoY),
     - **Total Net Sales:** FY2022 `$222,730M` (`100.00%`), FY2023 `$237,710M` (`100.00%`), FY2024 `$249,625M` (`100.01%` sum of rounded shares; `100.00%` exact; `+5.01%` YoY).
2. **Exact Item 2 & Note 11 Geographic Segment & Property Ownership Figures:**
   - Reconcile the geographic segment data in [`index.html`](file:///Users/diesel/desktop/costco/index.html) with [`data/costco_revenue_breakdown.json`](file:///Users/diesel/desktop/costco/data/costco_revenue_breakdown.json) and Item 2 (p. 18) / Note 11 (p. 61) of the FY2024 Form 10-K:
     - **United States:** `614` warehouses (`499` owned land and building, `115` leased), `91.1M` sq ft, `219,000` employees,
     - **Other International:** `168` warehouses (`113` owned land and building, `55` leased across Mexico `40`, Japan `35`, U.K. `29`, Korea `19`, Australia `15`, Taiwan `14`, China `7`, Spain `4`, France `2`, Iceland `1`, New Zealand `1`, Sweden `1`), `24.3M` sq ft, `61,000` employees,
     - **Canada:** `108` warehouses (`91` owned land and building, `17` leased), `15.5M` sq ft, `53,000` employees,
     - **Worldwide Total:** `890` warehouses (`703` owned land and building, `187` leased—including `134` land-only leases where Costco owns the building, totaling `837` owned buildings), `130.9M` sq ft operating floor space, `31.9M` sq ft depot/logistics space, `333,000` employees.

### 3.4 Requirement 4: Interactive Scroll-Spy, Keyboard Accessibility & Deterministic Verification (`src/costco_revenue_model.mjs`)

1. **Live Scroll-Spy & Sub-Link Highlighting on `#table-of-contents`:**
   - Scrolling through [`index.html`](file:///Users/diesel/desktop/costco/index.html) must automatically update `.is-active` and `aria-current="location"` on the corresponding top-level `.toc-link` and sub-section `.toc-sublink` in `#table-of-contents`.
   - Clicking any `.toc-sublink` (such as `#polar-chart-categories` or `#step-3`) must highlight both that `.toc-sublink` and its parent `.toc-link`, and when a step link (`#step-1`..`#step-5`) is activated, synchronize the 5-step controller to that step.
2. **Keyboard Accessibility on Interactive SVG Polar Sectors:**
   - Every interactive SVG sector (`[role="button"][tabindex="0"]`) across `#svg-polar-categories`, `#svg-polar-geography`, and `#svg-polar-flywheel` must support keyboard activation via `Enter` and `Space` keys in addition to pointer `click` events, with a visible focus indicator (`:focus-visible`).
3. **Deterministic Verification Enhancements in `src/costco_revenue_model.mjs`:**
   - `verifyCorporateWebReport` in [`src/costco_revenue_model.mjs`](file:///Users/diesel/desktop/costco/src/costco_revenue_model.mjs) must preserve all existing CLI flags, exported function signatures, and return schema fields while additionally verifying that:
     - Zero raw `{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, or `{Operating Income Flywheel}` curly-brace tokens appear in [`index.html`](file:///Users/diesel/desktop/costco/index.html),
     - Required polar SVG and drill-down CSS selectors (`.polar-grid-ring`, `.polar-axis-spoke`, `.polar-sector-label`, `.polar-center-title`, `.drilldown-meta-grid`, `.sim-output-banner.is-breach`) are defined in the `<style>` block of [`index.html`](file:///Users/diesel/desktop/costco/index.html),
     - All audited multi-year Note 11 category figures (`85,629` / `85629`, `96,175` / `96175`, `101,463`, `61,100` / `61100`, `60,865` / `60865`, `63,973`, `46,474` / `46474`, `48,693` / `48693`, `49,969`, `29,527` / `29527`, `31,977` / `31977`, `34,220`) are present and reconciled in [`index.html`](file:///Users/diesel/desktop/costco/index.html).

---

## 4. Operational & Performance Budgets

Grounded in live empirical baseline measurements of the workspace (`node src/costco_revenue_model.mjs --verify` measured at **`12.19 ms`** elapsed wall-clock time and **`46.23 MB`** RSS with **`0`** network calls):

1. **Zero External Network Dependency at Verification & Browser Runtime:**
   - `node src/costco_revenue_model.mjs --verify` and [`index.html`](file:///Users/diesel/desktop/costco/index.html) MUST execute with **`0` external network requests** (all styles, data, and SVG polar rendering must be self-contained).
2. **Execution Latency Budget:**
   - `node src/costco_revenue_model.mjs --verify` MUST complete in **$\le 250\text{ ms}$** wall-clock time.
   - Interactive UI state transitions in [`index.html`](file:///Users/diesel/desktop/costco/index.html) (toggling polar chart years/modes, selecting sectors, stepping through Steps 1–5, switching GAAP table years, and moving sensitivity sliders) MUST complete in **$\le 16\text{ ms}$** (single 60fps frame).
3. **Memory Footprint Budget:**
   - CLI verification RSS MUST remain **$\le 128\text{ MB}$**.

---

## 5. Edge Cases, Failure Modes & Deterministic Recovery

1. **Leakage of Raw `{...}` Specification Tokens in Reader-Facing Copy:**
   - *Condition:* [`index.html`](file:///Users/diesel/desktop/costco/index.html) contains raw `{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, or `{Operating Income Flywheel}` tokens in visible HTML or script-rendered UI strings.
   - *Required Behavior:* `verifyCorporateWebReport` in [`src/costco_revenue_model.mjs`](file:///Users/diesel/desktop/costco/src/costco_revenue_model.mjs) must fail fast with an explicit `{error}` identifying the unrefined token.
2. **Missing SVG Polar or Drill-Down Stylesheet Rules:**
   - *Condition:* [`index.html`](file:///Users/diesel/desktop/costco/index.html) omits CSS rules for `.polar-grid-ring`, `.polar-axis-spoke`, `.polar-sector-label`, `.polar-center-title`, `.drilldown-meta-grid`, or `.sim-output-banner.is-breach`, or references an undefined CSS variable like `--emerald-audit`.
   - *Required Behavior:* `verifyCorporateWebReport` must fail fast with an explicit diagnostic message naming the missing style rule.
3. **Historical Note 11 Category or Item 2 Warehouse Count Drift:**
   - *Condition:* [`index.html`](file:///Users/diesel/desktop/costco/index.html) contains unverified FY2022/FY2023 category numbers or mismatched warehouse ownership counts that diverge from [`data/costco_revenue_breakdown.json`](file:///Users/diesel/desktop/costco/data/costco_revenue_breakdown.json).
   - *Required Behavior:* `verifyCorporateWebReport` must fail fast with an explicit data-reconciliation error.
4. **Narrow Viewport (`390px`) & Long Label Overflow on Polar Charts:**
   - *Condition:* Switching polar chart modes or resizing the viewport to `390px` mobile width causes SVG sector labels to clip at the `viewBox` edges or causes horizontal page overflow.
   - *Required Behavior:* Responsive CSS and padded SVG `viewBox` coordinates must keep all polar labels legible and contained within their card bounds across both `1440px` desktop and `390px` mobile viewports.

---

## 6. Acceptance Criteria & `{correct required outputs}`

The implementation is `{sufficient}` if and only if all of the following objectively measurable criteria are satisfied on `main`:

1. **`AC-01` (Straightforward Technical English Throughout `index.html`):**
   - [`index.html`](file:///Users/diesel/desktop/costco/index.html) contains zero raw `{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, or `{Operating Income Flywheel}` curly-brace tokens and zero `//` decorative pseudo-code separators in visible text, presenting all 5 sections and all 5 revenue steps in clear, direct, straightforward technical English.
2. **`AC-02` (Ironed-Over SVG Polar Graphs & Drill-Down Cards):**
   - All three interactive polar charts (`#polar-chart-categories`, `#polar-chart-geography`, `#polar-chart-flywheel`) render with transparent, dashed hairline grid rings (`.polar-grid-ring`), visible radial spokes (`.polar-axis-spoke`), centered hub text (`.polar-center-title`, `.polar-center-sub`), unclipped outer sector labels, keyboard accessibility (`Enter`/`Space`), and structured key-value drill-down cards (`.drilldown-meta-grid`, `.drilldown-meta-item`).
3. **`AC-03` (100% Primary-Source Data Reconciliation Across FY2022–FY2024):**
   - Every multi-year Note 11 merchandise category figure (`$85,629M` / `$96,175M` / `$101,463M` Foods & Sundries; `$61,100M` / `$60,865M` / `$63,973M` Non-Foods; `$46,474M` / `$48,693M` / `$49,969M` Warehouse Ancillary; `$29,527M` / `$31,977M` / `$34,220M` Fresh Foods) and Item 2 warehouse ownership figure (`703` owned land & building, `187` leased across `614` U.S., `108` Canada, and `168` Other International clubs) in [`index.html`](file:///Users/diesel/desktop/costco/index.html) matches [`data/costco_revenue_breakdown.json`](file:///Users/diesel/desktop/costco/data/costco_revenue_breakdown.json).
4. **`AC-04` (Sticky Scroll-Spy Table of Contents & Simulator Breach State):**
   - `#table-of-contents` tracks scroll position across sections and sub-anchors, and the sensitivity simulator visibly transitions to its crimson warning state (`.sim-output-banner.is-breach`) whenever simulated merchandise gross margin exceeds `11.50%`.
5. **`AC-05` (Wayfinder Governance & Deterministic CLI Verification):**
   - [`wayfinder/map.md`](file:///Users/diesel/desktop/costco/wayfinder/map.md) and [`wayfinder/tickets/ticket-001.md`](file:///Users/diesel/desktop/costco/wayfinder/tickets/ticket-001.md) through [`wayfinder/tickets/ticket-006.md`](file:///Users/diesel/desktop/costco/wayfinder/tickets/ticket-006.md) remain valid and resolved, and `npm run verify` (`node src/costco_revenue_model.mjs --verify`) completes in $\le 250\text{ ms}$ with `0` external network calls and `status: "VERIFIED"`.
