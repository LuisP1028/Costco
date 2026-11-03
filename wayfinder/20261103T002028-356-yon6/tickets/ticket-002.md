---
id: ticket-002
title: Interactive SVG/Canvas Polar Revenue Disaggregation Suite — Category, Geography, and Operating Profit Flywheel (index.html)
stage: implement
claimed_by: wayfinder-read-and-plan
status: resolved
---

# Interactive SVG/Canvas Polar Revenue Disaggregation Suite — Category, Geography, and Operating Profit Flywheel (`index.html`)

- **Target Execution Stage:** `implement` (independent automated acceptance test suite authoring and execution reserved strictly for `tester` under `INV-NO-SELF-TEST-01`)
- **Claimed by:** `wayfinder-read-and-plan`
- **Status:** `resolved`

## Question

What exact polar coordinate geometry, SVG/Canvas rendering architecture, interactive controls, and primary-source SEC Form 10-K data bindings must `#section-polar-graphs` (`#polar-chart-categories`, `#polar-chart-geography`, and `#polar-chart-flywheel`) implement in `index.html` to visually and quantitatively showcase where Costco Wholesale Corporation generates its `$254,453M` consolidated revenue and `$9,285M` operating income within a $\le 16\text{ ms}$ single-frame re-render budget?

## Blocked By

- [Corporate Business Visual Design System, Sticky Scroll-Spy Table of Contents, and Dreamcore Elimination (index.html)](./ticket-001.md)

## Mandatory Target Deliverables (MANDATORY_TARGET)

- `index.html` — Implement `#section-polar-graphs` containing the 3 interactive polar graph containers (`#polar-chart-categories`, `#polar-chart-geography`, `#polar-chart-flywheel`), live controls, interactive sector tooltips/drill-down cards, and tabular legends. Must be recorded as `CHANGED` in `handoff/20261103T002028-356-yon6/implementer-status.txt`.

## Read-Only Discovery Context (READ_ONLY_CONTEXT)

- `LANGUAGE.md` — Authoritative definitions of `{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`, and `{correctness}`.
- `functional_specification_002.md` — Section 3.3 (`Requirement 3: Interactive Polar Graph Suite`) and `AC-03`.
- `data/costco_revenue_breakdown.json` — Primary-source Note 11 `merchandise_categories` (FY2022–FY2024) and `geographic_segments` (FY2024).
- `assets/20261103T002028-356-yon6/plan-corporate-polar-and-5step-contract.json` — Pre-computed polar angles ($\theta_i$), linear and area-proportional ($\sqrt{r}$) radial scaling ratios, and sub-driver data.
- Scanner reconnaissance reports in `wayfinder/20261103T002028-356-yon6/plan-scan-1-report.md` and `wayfinder/20261103T002028-356-yon6/plan-scan-2-report.md`.

## Resolution

### 1. Polar Coordinate Rendering Architecture & $\le 16\text{ ms}$ Frame Budget

All three polar visualizations inside `#section-polar-graphs` must be rendered using deterministic inline SVG (or high-DPI Canvas + accessible SVG/DOM controls) with concentric radial grid rings (`25%`, `50%`, `75%`, `100%` scale rings), angular degree/sector spokes, crisp white sector dividers, interactive sector `<path>` / `<g>` elements with `tabindex="0"`, `role="button"`, `aria-label`, and `data-*` attributes, and zero external library dependencies. Because each chart updates at most `3` to `8` polar sectors per state change, synchronous DOM/SVG attribute updates complete in $< 2\text{ ms}$ (well inside the $\le 16\text{ ms}$ 60fps budget).

Standard polar-to-Cartesian sector path formula (with $0^\circ$ at 12 o'clock / $-\pi/2$ radians):
$$x(\theta, r) = c_x + r \cdot \cos(\theta - \tfrac{\pi}{2}), \quad y(\theta, r) = c_y + r \cdot \sin(\theta - \tfrac{\pi}{2})$$

### 2. Polar Graph 1: `{Net Sales}` by Merchandise Category (`#polar-chart-categories` — Note 11 Disaggregation)

1. **Primary-Source Data Binding (`$249,625M` FY2024, `$237,710M` FY2023, `$222,730M` FY2022):**
   - **Foods and Sundries (`foods_and_sundries`, Navy `#005DAA`):**
     - `FY2024`: **`$101,463M`** (`40.65%` share of `{Net Sales}`, `+5.50%` YoY)
     - `FY2023`: **`$96,175M`** (`40.46%` share)
     - `FY2022`: **`$85,629M`** (`38.45%` share)
     - Sub-departments: Sundries, dry grocery, candy, cooler, freezer, deli, liquor, tobacco.
   - **Non-Foods (`non_foods`, Indigo `#4F46E5`):**
     - `FY2024`: **`$63,973M`** (`25.63%` share of `{Net Sales}`, `+5.11%` YoY)
     - `FY2023`: **`$60,865M`** (`25.60%` share)
     - `FY2022`: **`$61,100M`** (`27.43%` share)
     - Sub-departments: Major appliances, small electronics, health & beauty aids, hardware, lawn & garden, sporting goods, tires, toys & seasonal, office supplies, automotive, apparel, furniture, domestics, housewares, special order kiosk, jewelry.
   - **Warehouse Ancillary and Other Businesses (`warehouse_ancillary_and_other`, Crimson `#E31837`):**
     - `FY2024`: **`$49,969M`** (`20.02%` share of `{Net Sales}`, `+2.62%` YoY)
     - `FY2023`: **`$48,693M`** (`20.48%` share)
     - `FY2022`: **`$46,474M`** (`20.87%` share)
     - Sub-departments: `719` Gasoline stations (`~12%` of net sales / `~$30.0B`), pharmacy (`+3%` YoY growth leader), optical, food court, hearing aids, tire installation, Costco Travel.
   - **Fresh Foods (`fresh_foods`, Emerald `#059669`):**
     - `FY2024`: **`$34,220M`** (`13.71%` share of `{Net Sales}`, `+7.01%` YoY)
     - `FY2023`: **`$31,977M`** (`13.45%` share)
     - `FY2022`: **`$29,527M`** (`13.26%` share)
     - Sub-departments: Meat, produce, service deli, bakery.
2. **Required Interactive Controls for `#polar-chart-categories`:**
   - **Fiscal Year Selector (`[data-cat-year="2024"]`, `[data-cat-year="2023"]`, `[data-cat-year="2022"]`, `[data-cat-year="overlay"]`):** Dynamically updates polar sector radii, dollar readouts, share percentages, and YoY growth badges, with `Multi-Year Overlay` rendering concentric comparison rings for `FY2022`, `FY2023`, and `FY2024`.
   - **Polar Geometry / Scale Mode Selector (`[data-cat-mode="sqrt"]`, `[data-cat-mode="linear"]`, `[data-cat-mode="angle"]`):**
     - `Area-Proportional √r (Coxcomb 90°)` (default Nightingale Rose mode): Equal `90°` sector angles ($\Delta\theta_i = 90^\circ$), radius scaled by $r_i = R_{\max}\sqrt{V_i / V_{\max}}$ so sector area is strictly proportional to category dollar volume.
     - `Radius-Proportional r (Coxcomb 90°)`: Equal `90°` sector angles ($\Delta\theta_i = 90^\circ$), radius scaled linearly by $r_i = R_{\max}(V_i / V_{\max})$.
     - `Share-Weighted Sector Angle (Variable θ_i)`: Sector angle proportional to share ($\Delta\theta_i = 360^\circ \times \text{share}_i$: `146.33°`, `92.26°`, `72.06°`, `49.35°`), with radius encoding YoY growth / volume velocity.
   - **Interactive Sector Selection & Drill-Down Card (`#polar-category-drilldown`):** Clicking or hovering any polar sector highlights the sector and updates the drill-down card with the category's FY2022–FY2024 dollar progression, share of `{Net Sales}`, YoY growth, sub-departments, `<4,000` SKU curation strategy, and role in the `{Operating Income Flywheel}`.

### 3. Polar Graph 2: Consolidated Revenue & Operating Profit by Geographic Segment (`#polar-chart-geography`)

1. **Primary-Source Data Binding (Note 11 & Item 2 — `$254,453M` Revenue, `$9,285M` Operating Income, `890` Warehouses):**
   - **United States (`united_states`, Navy `#005DAA`):** `$184,143M` consolidated revenue (`72.37%` share), `$6,217M` operating income (`66.96%` of OpInc; **`3.38%` operating margin**), `614` warehouses (`499` owned, `115` leased; `91.1M` sq ft; `$299.9M/club`), `219,000` employees.
   - **Other International (`other_international`, Teal `#0D9488`):** `$35,436M` consolidated revenue (`13.93%` share), `$1,420M` operating income (`15.29%` of OpInc; **`4.01%` operating margin**), `168` warehouses (`113` owned, `55` leased across 12 countries: Mexico `40`, Japan `35`, U.K. `29`, Korea `19`, Australia `15`, Taiwan `14`, China `7`, Spain `4`, France `2`, Iceland `1`, New Zealand `1`, Sweden `1`; `24.3M` sq ft; `$210.9M/club`), `61,000` employees.
   - **Canada (`canada`, Crimson `#E31837`):** `$34,874M` consolidated revenue (`13.71%` share), `$1,648M` operating income (`17.75%` of OpInc; **`4.73%` operating margin**), `108` warehouses (`91` owned, `17` leased; `15.5M` sq ft; `$322.9M/club`), `53,000` employees.
2. **Required Interactive Controls for `#polar-chart-geography`:**
   - **Radial Metric Toggle (`[data-geo-metric="revenue"]`, `[data-geo-metric="opinc"]`, `[data-geo-metric="warehouses"]`):**
     - `Consolidated Revenue ($M & Share %)`: Plots `$184,143M` (`72.37%`), `$35,436M` (`13.93%`), and `$34,874M` (`13.71%`).
     - `Operating Income ($M & Operating Margin %)`: Plots `$6,217M` (`3.38%` margin), `$1,648M` (`4.73%` margin), and `$1,420M` (`4.01%` margin), visually spotlighting how Canada (`4.73%`) and Other International (`4.01%`) achieve higher operating margins than the U.S. (`3.38%`).
     - `Warehouse Count & Revenue per Club ($285.9M avg)`: Plots `614` U.S. (`$299.9M/club`), `168` Other Intl (`$210.9M/club`), and `108` Canada (`$322.9M/club`) across all `890` clubs (`130.9M` sq ft).
   - **Interactive Segment Drill-Down Card (`#polar-geography-drilldown`):** Displays real-estate ownership breakdown (`703` owned land & building across `890` clubs), employee count (`333,000` total), and segment profitability metrics.

### 4. Polar Graph 3: Revenue Pillar vs. `{Operating Income Flywheel}` Polar Comparison & Ancillary Sub-Drivers (`#polar-chart-flywheel`)

1. **Dual-Ring / Comparative Polar Asymmetry View:**
   - **Outer Ring / Top-Line Revenue Share (`$254,453M` Total Revenue):**
     - `{Net Sales}`: **`$249,625M`** (**`98.10%`** of consolidated revenue, `353.17°` arc)
     - `{Membership Fees}`: **`$4,828M`** (**`1.90%`** of consolidated revenue, `6.83°` arc)
   - **Inner Ring / Consolidated Operating Income Contribution (`$9,285M` Operating Income):**
     - Net Merchandise Operating Contribution (`$27,267M` Gross Margin `- $22,810M` SG&A): **`$4,457M`** (**`48.00%`** of operating income, `172.81°` arc)
     - `{Membership Fees}` Operating Contribution: **`$4,828M`** (**`52.00%`** of operating income, `187.19°` arc)
2. **Ancillary & Omnichannel Sub-Driver Polar Rose Decomposition (Toggleable or Paired Inside `#polar-chart-flywheel`):**
   - Plots Costco's high-frequency traffic and digital revenue sub-engines:
     - **Gasoline (`719` stations):** **`~$30.0B`** (`~12%` of consolidated `{Net Sales}`, `+1%` FY2024 gallon volume growth)
     - **Pharmacy, Optical, Food Court, Hearing Aids & Tire Installation:** **`~$20.0B`** (remaining portion of `$49,969M` Warehouse Ancillary & Other; Pharmacy `+3%` YoY dollar growth leader)
     - **E-Commerce (`9,000–10,000` online SKUs):** **`~$17.5B`** (`~7%` of `{Net Sales}`, `+16%` FY2024 comparable sales growth)
     - **Additional Digitally Originated, Costco Logistics, Costco Next & Costco Travel:** **`~$5.0B`** (bringing total Digitally Originated sales to `~9%` of `{Net Sales}` / `~$22.5B`), plus Citibank co-branded Visa royalty & February reward certificate ecosystem.
   - **Interactive Sub-Driver Inspector (`#polar-flywheel-drilldown`):** Clicking any ring or sub-driver sector updates the detailed breakdown panel explaining its exact role in driving warehouse trip frequency and membership renewal.
