---
id: ticket-003
title: Sequential 5-Step Revenue Generation Walkthrough, Multi-Year GAAP Waterfall, and Flywheel Sensitivity Simulator (index.html)
stage: implement
claimed_by: wayfinder-read-and-plan
status: resolved
---

# Sequential 5-Step Revenue Generation Walkthrough, Multi-Year GAAP Waterfall, and Flywheel Sensitivity Simulator (`index.html`)

- **Target Execution Stage:** `implement` (independent automated acceptance test suite authoring and execution reserved strictly for `tester` under `INV-NO-SELF-TEST-01`)
- **Claimed by:** `wayfinder-read-and-plan`
- **Status:** `resolved`

## Question

How must `index.html` structure and wire the sequential 5-Step Revenue Generation Walkthrough (`#section-five-steps` containing `#step-1` through `#step-5` plus an interactive Stepper Controller), the Multi-Year GAAP Conservation Waterfall & `{Operating Income Flywheel}` Sensitivity Simulator (`#section-gaap-model`), and the Primary-Source SEC Form 10-K & 6-Ticket Wayfinder Audit Explorer (`#section-wayfinder-audit`) so that every accounting formula, primary-source metric, and interactive control operates deterministically with zero console or page errors?

## Blocked By

- [Corporate Business Visual Design System, Sticky Scroll-Spy Table of Contents, and Dreamcore Elimination (index.html)](./ticket-001.md)

## Mandatory Target Deliverables (MANDATORY_TARGET)

- `index.html` — Implement `#section-five-steps` (`#step-1`, `#step-2`, `#step-3`, `#step-4`, `#step-5` + interactive Stepper Controller), `#section-gaap-model` (Multi-Year FY2022–FY2024 GAAP Waterfall table + live Flywheel Sensitivity Simulator sliders), and `#section-wayfinder-audit` (6-Ticket Wayfinder Decision Inspector + SEC Form 10-K citation links). Must be recorded as `CHANGED` in `handoff/20261103T002028-356-yon6/implementer-status.txt`.

## Read-Only Discovery Context (READ_ONLY_CONTEXT)

- `LANGUAGE.md` — Authoritative domain vocabulary (`{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`) and evaluation taxonomy.
- `functional_specification_002.md` — Sections 3.4, 3.5, and `AC-04`.
- `data/costco_revenue_breakdown.json` — Verified FY2022–FY2024 income statements, Note 11 categories/segments, membership metrics, and working-capital balance sheet accounts.
- `research/costco_revenue_architecture.md` — Sections 1–7 primary-source SEC Form 10-K citations.
- `wayfinder/tickets/ticket-001.md` through `wayfinder/tickets/ticket-006.md` — Canonical resolved research tickets.
- `assets/20261103T002028-356-yon6/plan-corporate-polar-and-5step-contract.json` — Verified 5-step metrics and GAAP equations.

## Resolution

### 1. Requirement 4: "How Costco Generates Revenue in 5 Steps" Sequential Walkthrough (`#section-five-steps`)

`#section-five-steps` must provide both a full vertical corporate narrative layout (where `#step-1` through `#step-5` are always present in the DOM and directly targetable via anchor links from `#table-of-contents`) and an interactive **Stepper Controller** (`[data-step-btn="1"]`..`[data-step-btn="5"]`, Previous/Next buttons `#step-prev-btn` / `#step-next-btn`, and keyboard shortcuts `1`–`5` when not focused in an input) that highlights the active step card (`.is-active-step`), updates a live **Step Focus Summary Banner**, and cross-links the corresponding Wayfinder research ticket:

1. **Step 1 (`id="step-1"`): Gatekeeper Subscription — Paid Membership Tiers & `92.9%` Renewal Lock-In (`$4,828M` `{Membership Fees}`)**
   - **Core Mechanism:** Customers pay an annual upfront membership fee before accessing warehouse clubs or member-only online pricing (`$65/yr` Gold Star & Business, `$130/yr` Executive effective Sept 1, 2024; `$60/$120` during FY2024).
   - **Verified SEC Form 10-K Figures & Accounting Equation:**
     - `76.2M` total paid members (`63.7M` Gold Star + `12.5M` Business, `+7.32%` YoY) + `60.6M` free household cards = **`136.8M` total cardholders worldwide**.
     - **`35.4M` paid Executive members** (`46.5%` of paid member base) generating **`73.3%` of worldwide `{Net Sales}`**.
     - **`92.9%` U.S./Canada** and **`90.5%` worldwide** trailing 7-to-18-month renewal rates.
     - **`$2,501M` `Deferred membership fees`** current balance-sheet liability amortized ratably (`1/12` per month) over 12 months under `ASC 606` into `$4,828M` earned `{Membership Fees}` (`1.90%` of total revenue).
     - **`$2,804M` Executive 2% reward** recognized under `ASC 606` as a direct **contra-revenue reduction against `{Net Sales}`** (never SG&A), with `$2,435M` carried in `Accrued member rewards`.
     - **September 1, 2024 Fee Increase:** U.S./Canada base fee rose `$60→$65` and Executive rose `$120→$130` (annual 2% reward cap `$1,000→$1,250`), projected to add **`+$370M`** over FY2025–FY2026 (`~$190M` in FY2025).
   - **Wayfinder Cross-References:** [Two-Pillar Revenue Engine and ASC 606 Recognition Mechanics](wayfinder/tickets/ticket-001.md) and [Membership Fee Tier Structure, Renewal Rate Dynamics, and Fee Increase Cadence](wayfinder/tickets/ticket-003.md).

2. **Step 2 (`id="step-2"`): Concentrated Purchasing Scale — `<4,000` Warehouse SKUs & Kirkland Signature (`$249,625M` `{Net Sales}`)**
   - **Core Mechanism:** Rather than stocking `30,000+` SKUs like conventional supermarkets, Costco curates **fewer than `4,000` active warehouse SKUs** across **`890` clubs** (`130.9M` sq ft), channeling **`>$62M` of annual purchasing volume into each average SKU**.
   - **Verified SEC Form 10-K Figures & Accounting Equation:**
     - Note 11 Disaggregated `{Net Sales}` (`$249,625M` total, `98.10%` of consolidated revenue): **Foods and Sundries `$101,463M` (`40.65%`)**, **Non-Foods `$63,973M` (`25.63%`)**, **Warehouse Ancillary & Other `$49,969M` (`20.02%`)**, and **Fresh Foods `$34,220M` (`13.71%`)**.
     - **Kirkland Signature Private Label:** Represents **`~30%+`** of sales, priced `15%–20%+` below national brands while earning higher gross margin basis points (driving a **`+36 bps`** core merchandise gross margin expansion in FY2024) and enforcing vendor price discipline.
     - **Cross-Docked Pallet Velocity:** Manufacturers ship full pallets through **`31.9M` sq ft** of cross-docking depots directly onto warehouse concrete floors, minimizing handling labor and shrinkage.
   - **Wayfinder Cross-Reference:** [Merchandise Category Disaggregation, SKU Discipline, and Kirkland Signature Economics](wayfinder/tickets/ticket-002.md).

3. **Step 3 (`id="step-3"`): High-Frequency Trip Magnets — `719` Gas Stations, Ancillary Services & Omnichannel Logistics (`$49,969M` Ancillary + `~7%` E-Commerce)**
   - **Core Mechanism:** Ultra-low-margin ancillary departments pull members onto warehouse parking lots weekly, while digital and big-and-bulky fulfillment capture incremental wallet share without crowding warehouse floor SKUs.
   - **Verified SEC Form 10-K Figures & Accounting Equation:**
     - **`719` member-only gas stations** generating **`~12%` of consolidated `{Net Sales}` (`~$30.0B`)** with `+1%` physical gallon volume growth (`+$400M`) in FY2024.
     - **Pharmacy** (`+3%` YoY ancillary dollar growth leader, `+$1,276M`), **Optical**, **Hearing Aids**, **Tire Installation**, and the iconic **`$1.50` Hot Dog & Soda Food Court** (`+19 bps` ancillary & e-commerce gross margin lift).
     - **E-Commerce (`~7%` of `{Net Sales}` / `~$17.5B`, `+16%` comparable sales growth** across `9,000–10,000` online SKUs) and **Digitally Originated Sales (`~9%` of `{Net Sales}` / `~$22.5B`)**.
     - **Costco Logistics** (big-and-bulky delivery expensed in `Merchandise costs`), **Costco Next** (supplier-direct), **Costco Travel**, and **Citibank co-branded Visa** royalties & February reward certificates.
   - **Wayfinder Cross-Reference:** [Warehouse Ancillary Traffic Drivers, E-Commerce, Costco Logistics, and Emerging Retail Media](wayfinder/tickets/ticket-004.md).

4. **Step 4 (`id="step-4"`): Disciplined Pricing & Negative Working Capital — The `10.92%` `{Gross Margin Ceiling}` & `104.15%` Supplier Float**
   - **Core Mechanism:** Costco caps merchandise markups so that `{Net Sales}` (`$249,625M`) minus `Merchandise costs` (`$222,358M`) yields a **`10.92%` `{Gross Margin Ceiling}`** (`$27,267M`), passing supplier volume rebates (`Note 1`) directly back to members in lower shelf prices.
   - **Verified SEC Form 10-K Figures & Accounting Equation:**
     - **Merchandise Gross Margin:** `($249,625M - $222,358M) / $249,625M = $27,267M / $249,625M = 10.9232%` (**`10.92%`**, strictly within the `[10.0%, 11.5%]` `{Gross Margin Ceiling}`).
     - **Lean SG&A Structure:** **`$22,810M` (`9.14%` of `{Net Sales}`**, inclusive of warehouse preopening expenses per Note 1), aided by owning the building structure at `837` of `890` clubs (`703` land+building owned + `134` land-only leases).
     - **Negative Working-Capital Inventory Funding:** **`12.60x` average inventory turnover** (`~28.97` Days Inventory Outstanding vs. `~31.88` Days Payable Outstanding); **`$19,421M` `Accounts payable` / `$18,647M` `Merchandise inventories` = `104.15%` (`104.1508%`)**, proving trade suppliers finance `100%` of floor inventory plus **`+$774M`** in excess cash float.
   - **Wayfinder Cross-Reference:** [Gross Margin Ceiling, Negative Working-Capital Inventory Funding, and Operating Income Flywheel](wayfinder/tickets/ticket-005.md).

5. **Step 5 (`id="step-5"`): The `{Operating Income Flywheel}` — Converting `$4,828M` of Fees into `52.00%` of Consolidated Operating Profit (`$9,285M` → `$7,367M` Net Income)**
   - **Core Mechanism:** Because the `10.92%` merchandise gross margin (`$27,267M`) exceeds the `9.14%` SG&A (`$22,810M`), retail warehouse operations generate **`$4,457M` (`48.00%`)** of net merchandise operating contribution, allowing `100%` of `{Membership Fees}` (**`$4,828M`, or `52.00%`** of consolidated operating income) to flow directly to operating profit.
   - **Verified SEC Form 10-K Figures & Accounting Equation:**
     - **Consolidated Operating Income:** `$4,457M` Merchandise Operating Contribution (`1.79%` of `{Net Sales}`) + `$4,828M` `{Membership Fees}` = **`$9,285M`** (`3.65%` consolidated operating margin).
     - **Pre-Tax & Net Income Conversion:** `$9,285M` Operating Income `- $169M` Interest Expense `+ $624M` Interest Income & Other, Net (interest earned on cash balances) = **`$9,740M` Income Before Taxes**; minus `$2,373M` Provision for Income Taxes (`24.36%` effective tax rate) = **`$7,367M` Consolidated Net Income** (`$16.56` diluted EPS).
   - **Wayfinder Cross-References:** [Gross Margin Ceiling, Negative Working-Capital Inventory Funding, and Operating Income Flywheel](wayfinder/tickets/ticket-005.md) and [Corporate Executive Design Architecture, Step-by-Step Revenue Walkthrough, and Interactive Polar Graphs](wayfinder/tickets/ticket-006.md).

### 2. Requirement 5: Multi-Year GAAP Waterfall, Sensitivity Simulator (`#section-gaap-model`) & 6-Ticket Wayfinder Audit Explorer (`#section-wayfinder-audit`)

1. **Multi-Year GAAP Conservation Table (`#section-gaap-model`):**
   - Year selector buttons (`[data-fy-btn="2022"]`, `[data-fy-btn="2023"]`, `[data-fy-btn="2024"]`, plus full 3-year side-by-side reference columns) reconciling `{Net Sales}`, `{Membership Fees}`, `Consolidated Total Revenue`, `Merchandise Costs`, `Merchandise Gross Margin ($ & %)`, `SG&A ($ & %)`, `Net Merchandise Operating Contribution ($ & % of OpInc)`, `{Membership Fees} Share of Operating Income (%)`, `Consolidated Operating Income`, `Interest Expense & Interest Income/Other Net`, `Income Before Taxes`, `Provision for Income Taxes`, and `Consolidated Net Income`.
2. **Interactive `{Operating Income Flywheel}` Sensitivity Simulator (`#section-gaap-model`):**
   - Sliders for **Merchandise Gross Margin % (`#sim-gm-slider`, range `9.50` to `14.00`, step `0.05`, default `10.92`)**, **SG&A % of Net Sales (`#sim-sga-slider`, range `8.50` to `10.50`, step `0.05`, default `9.14`)**, and **Membership Fee Lift (`#sim-fee-slider`, range `0` to `370`, step `10`, default `0`)**, plus a Reset to FY2024 GAAP Baseline button.
   - Real-time recomputation of simulated Merchandise Gross Margin ($M), SG&A ($M), Net Merchandise Operating Contribution ($M & % of OpInc), Membership Fees ($M & % of OpInc), Consolidated Operating Income ($M), and a prominent governance status banner (`#sim-output-banner`) that triggers an explicit warning when `gmPct > 11.50%` (breaching the `{Gross Margin Ceiling}`).
3. **Primary-Source SEC Form 10-K & 6-Ticket Wayfinder Decision Audit Explorer (`#section-wayfinder-audit`):**
   - Displays interactive selector tabs (`[data-ticket-tab="0"]` through `[data-ticket-tab="5"]`) and a comprehensive audit card (`#ticket-inspector-box`) for all **6 resolved Wayfinder decision tickets** (`ticket-001.md` through `ticket-006.md`), including each ticket's descriptive human-readable title, `wayfinder:research` classification, `Status: resolved`, `## Question`, `## Blocked By` lineage, `## Resolution` summary, and direct artifact links to `research/costco_revenue_architecture.md`, `data/costco_revenue_breakdown.json`, `wayfinder/map.md`, and `wayfinder/tickets/ticket-001.md`..`wayfinder/tickets/ticket-006.md`.
