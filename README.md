# Costco Wholesale Corporation (`NASDAQ: COST`, `CIK: 0000909832`) — Corporate Revenue Architecture & Interactive Polar Graph Suite

An institutional **Corporate Executive Financial Report** ([`index.html`](./index.html)), primary-source SEC Form 10-K research monograph, `/wayfinder` decision map, structured GAAP financial dataset, and zero-network verification CLI explaining how **Costco Wholesale Corporation** generates **`$254,453M`** in consolidated revenue and converts high-velocity warehouse volume (`{Net Sales}` of **`$249,625M`**) plus recurring club subscriptions (`{Membership Fees}` of **`$4,828M`**) into **`$9,285M`** of operating income and **`$7,367M`** of net income.

## Repository Contents

1. **Interactive Corporate Executive Financial Report ([`index.html`](./index.html))**:
   - **Institutional Corporate Aesthetic**: Designed in an executive slate-and-white corporate financial layout (`#F8FAFC` background canvas, `#FFFFFF` cards, `#0F172A` typography, `tabular-nums` monospace numerals) anchored in Costco Wholesale Corporation's signature brand palette (**Costco Crimson `#E31837`** and **Costco Executive Navy `#005DAA`**).
   - **Persistent Scroll-Spy Table of Contents (`#table-of-contents`)**: Sticky sidebar navigation indexing all 5 report sections, all 3 interactive polar graphs, and all 5 sequential revenue generation steps (`#step-1` through `#step-5`) with smooth scrolling and active `IntersectionObserver` scroll-spy state tracking.
   - **Interactive Polar Graph Revenue Disaggregation Suite (`#section-polar-graphs`)**:
     - **2.1 Merchandise Category Polar Rose (`#polar-chart-categories`)**: Interactive SVG Nightingale Rose / Coxcomb polar chart of Note 11 disaggregated `{Net Sales}` (`$249,625M` in FY2024: **Foods and Sundries `$101,463M` [`40.65%`]**, **Non-Foods `$63,973M` [`25.63%`]**, **Warehouse Ancillary and Other `$49,969M` [`20.02%`]**, and **Fresh Foods `$34,220M` [`13.71%`]**) across `FY2024`, `FY2023`, `FY2022`, and a `3-Year Overlay`, with `Area √r (Coxcomb)`, `Linear Radius r`, and `Share Angle θ_i` polar geometry modes.
     - **2.2 Geographic Segment Polar Chart (`#polar-chart-geography`)**: Interactive SVG radial polar chart of Note 11 geographic segments across **`890` warehouses** (`130.9M sq ft`): **United States (`$184,143M` revenue [`72.37%`], `$6,217M` OpInc, `614` clubs)**, **Other International (`$35,436M` revenue [`13.93%`], `$1,420M` OpInc, `168` clubs across 12 countries)**, and **Canada (`$34,874M` revenue [`13.71%`], `$1,648M` OpInc [`4.73%` margin], `108` clubs)**.
     - **2.3 Revenue vs. `{Operating Income Flywheel}` & Ancillary Polar Graph (`#polar-chart-flywheel`)**: Dual-ring polar comparison showing how `{Net Sales}` (`98.10%` of revenue) and `{Membership Fees}` (`1.90%` of revenue) invert into `48.00%` (`$4,457M`) vs. **`52.00%` (`$4,828M`)** of consolidated operating income (`$9,285M`), plus an interactive polar rose of Ancillary & Digital sub-drivers (**`~$30.0B` Gasoline across `719` stations**, **`~$20.0B` Pharmacy/Optical/Food Court/Tire**, **`~$17.5B` E-Commerce**, and **`~$5.0B` Costco Logistics / Next / Travel**).
   - **How Costco Generates Revenue in 5 Sequential Steps (`#section-five-steps`)**:
     - **Step 1 (`#step-1`) — Gatekeeper Subscription**: Paid Membership Tiers (`76.2M` paid members, `136.8M` cardholders), `92.9%` U.S./Canada renewal (`90.5%` worldwide), `35.4M` Executive members (`46.5%` of paid base driving `73.3%` of sales), `ASC 606` ratable 12-month amortization (`$2,501M` deferred liability), and `$2,804M` Executive 2% reward contra-revenue.
     - **Step 2 (`#step-2`) — Concentrated Purchasing Scale**: `<4,000` active warehouse SKUs (`>$62.4M` annual volume per SKU), `~30%+` Kirkland Signature penetration (`+36 bps` core margin lift), and cross-docked pallet-floor logistics across `890` clubs and `31.9M sq ft` of depots.
     - **Step 3 (`#step-3`) — High-Frequency Trip Magnets**: `719` member-only gas stations (`~12%` of `{Net Sales}` / `~$30.0B`), Pharmacy/Optical/Food Court (`~$20.0B`), E-Commerce (`~7%` of sales / `~$17.5B`, `+16%` comp growth), Digitally Originated Sales (`~9%` / `~$22.5B`), and Citibank co-branded Visa royalties.
     - **Step 4 (`#step-4`) — Disciplined Pricing & Negative Working Capital**: The **`10.92%` `{Gross Margin Ceiling}`** (`$27,267M` gross margin on `$249,625M` `{Net Sales}`), lean **`9.14%` SG&A** (`$22,810M`), `12.60x` inventory turnover, and **`104.15%` Accounts Payable / Inventory coverage** (`$19,421M` AP vs. `$18,647M` Inventory = `+$774M` supplier-financed float).
     - **Step 5 (`#step-5`) — The `{Operating Income Flywheel}` & Net Profit**: `$4,457M` net merchandise contribution (`48.00%`) + `$4,828M` `{Membership Fees}` (**`52.00%` of operating profit**) = **`$9,285M` Operating Income** $\rightarrow$ **`$9,740M` Pre-Tax Income** (`+$455M` net interest/other) $\rightarrow$ **`$7,367M` Consolidated Net Income**.
   - **Multi-Year GAAP Waterfall & Flywheel Sensitivity Simulator (`#section-gaap-model`)**: Toggle audited FY2022, FY2023, and FY2024 income statements and stress-test Merchandise Gross Margin %, SG&A %, and the September 1, 2024 Membership Fee Lift (`+$370M`).
2. **Wayfinder Map & Resolved Decision Tickets (`wayfinder/`)**:
   - [`wayfinder/map.md`](./wayfinder/map.md) and [`ticket-001.md`](./wayfinder/tickets/ticket-001.md) through [`ticket-006.md`](./wayfinder/tickets/ticket-006.md), plus Sandcastle planning artifacts under [`wayfinder/20261103T002028-356-yon6/`](./wayfinder/20261103T002028-356-yon6/map.md).
3. **Functional Specifications (`functional_specification.md` & `functional_specification_002.md`)**:
   - [`functional_specification_002.md`](./functional_specification_002.md) (Corporate Executive Revenue Architecture, Table of Contents, 5-Step Walkthrough & Polar Graphs).
4. **Primary-Source SEC Form 10-K Monograph (`research/`)**:
   - [`research/costco_revenue_architecture.md`](./research/costco_revenue_architecture.md) (`40.1 KB` primary-source monograph citing SEC EDGAR `CIK: 0000909832`, Accession `0000909832-24-000049`).
5. **Structured Financial Dataset & Verification CLI (`data/` & `src/`)**:
   - [`data/costco_revenue_breakdown.json`](./data/costco_revenue_breakdown.json) and [`src/costco_revenue_model.mjs`](./src/costco_revenue_model.mjs).

## Running Locally

```sh
# Verify GAAP identities, Wayfinder links, SEC Form 10-K citations, and Corporate Polar/5-Step DOM invariants (<25ms, 0 network calls)
npm run verify

# Serve the static Corporate Revenue Architecture report locally
python3 -m http.server 8088
```
