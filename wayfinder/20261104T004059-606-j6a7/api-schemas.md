# /wayfinder/api-schemas: External API, Data Connection & Payload Schema Map (`functional_specification_005.md`)

**Run ID:** `20261104T004059-606-j6a7`  
**Agent:** `api-schema-mapper` (External API, Service Connection & Payload Schema Reconnaissance Scanner)  
**Governing Specification:** [`functional_specification_005.md`](../../functional_specification_005.md)  
**Authoritative Domain Glossary:** [`LANGUAGE.md`](../../LANGUAGE.md)  
**Verification Baseline:** `npm run verify` (`node src/costco_revenue_model.mjs --verify` — `16.98 ms` elapsed, `46.84 MB` RSS, `0` external network requests)  
**Status:** Reconnaissance Complete — Live Endpoint Payloads Probed, Captured & Mapped to Local Dataset, UI Data Contracts, and Verification Schemas. `DO NOT CODE YET` Enforced.

---

## 1. Architectural Role & Connection Invariants

In accordance with [`RULE[user_global]`](../../LANGUAGE.md) and [`functional_specification_005.md`](../../functional_specification_005.md), `api-schema-mapper` inventories all external APIs, primary-source SEC EDGAR data connections, local JSON dataset contracts, client-side UI payload schemas in [`index.html`](../../index.html), and programmatic verification schemas in [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs).

### 1.1 Core Runtime & Network Constraints
1. **Zero External Network Dependency at Browser & CLI Runtime (`RULE[user_global]` & Spec §4.1):**
   - Both [`index.html`](../../index.html) (browser runtime) and `node src/costco_revenue_model.mjs --verify` (CLI verification) MUST execute with **`0` external network requests** (`telemetry.externalNetworkRequests === 0`).
   - All stylesheets, fonts (`Inter` / system sans-serif + `JetBrains Mono` / system monospace), primary-source financial datasets, **corporate animated SVG elements**, and **ordered Bayer / halftone dithered SVG `<pattern>` / `<filter>` / CSS data-URI textures** must be 100% self-contained inline within [`index.html`](../../index.html).
2. **Primary-Source SEC EDGAR Ground-Truth Reconciliation:**
   - All numbers in [`data/costco_revenue_breakdown.json`](../../data/costco_revenue_breakdown.json) and [`index.html`](../../index.html) are anchored to audited SEC EDGAR filings for Costco Wholesale Corporation (`NASDAQ: COST`, `CIK: 0000909832`, FY2024 Form 10-K Accession `0000909832-24-000049`).
3. **Performance & Memory Budgets:**
   - CLI verification (`node src/costco_revenue_model.mjs --verify`): **$\le 250\text{ ms}$** wall-clock time (live baseline: `16.98 ms`) and **$\le 128\text{ MB}$** RSS (live baseline: `46.84 MB`).
   - Browser UI & SVG animations: **$\le 16\text{ ms}$** frame budget (`60fps`), pausing or settling into static high-contrast frames under `@media (prefers-reduced-motion: reduce)` or user pause/play toggle.

---

## 2. External API & Primary Source Connection Register

| Target Service / System | Endpoint URL / Path | Protocol / Method | Auth & Required Headers | Rate / Concurrency Limits | Live Probe Status | Saved Asset Path |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC EDGAR Submissions API** | `https://data.sec.gov/submissions/CIK0000909832.json` | HTTPS / HTTP/2 `GET` | `User-Agent: CostcoRevenueAudit/1.0 (audit@costco-revenue-model.org)` | $\le 10\text{ req/sec}$ per IP | `HTTP/2 200 OK` (156 KB) | `assets/20261104T004059-606-j6a7/api-schema-mapper-sec-submissions.json` |
| **SEC EDGAR Form 8-K Filing** | `https://www.sec.gov/Archives/edgar/data/909832/000090983224000043/cost-20240926.htm` | HTTPS / HTTP/2 `GET` | `User-Agent: CostcoRevenueAudit/1.0 (audit@costco-revenue-model.org)` | $\le 10\text{ req/sec}$ per IP | `HTTP/2 200 OK` (23.4 KB) | `assets/20261104T004059-606-j6a7/api-schema-mapper-sec-8k-20240926.htm` |
| **SEC EDGAR Form 10-K Filing** | `https://www.sec.gov/Archives/edgar/data/909832/000090983224000049/cost-20240901.htm` | HTTPS / HTTP/2 `GET` / `HEAD` | `User-Agent: CostcoRevenueAudit/1.0 (audit@costco-revenue-model.org)` | $\le 10\text{ req/sec}$ per IP | `HTTP/2 200 OK` (1.4 MB) | `assets/20261103T204534-693-1b8y/api-schema-mapper-cost-20240901.htm` |
| **SEC EDGAR Company Facts XBRL API** | `https://data.sec.gov/api/xbrl/companyfacts/CIK0000909832.json` | HTTPS / HTTP/2 `GET` (`HEAD` rejected with `403`) | `User-Agent: CostcoRevenueAudit/1.0 (audit@costco-revenue-model.org)` | $\le 10\text{ req/sec}$ per IP | `HTTP/2 200 OK` on `GET` (`403` on `HEAD`) | `assets/20261103T204534-693-1b8y/api-schema-mapper-sec-companyfacts.json` |
| **Local Canonical Financial Dataset** | `data/costco_revenue_breakdown.json` | Local POSIX File (`fs.readFileSync`) | None (Offline JSON) | Local disk I/O ($< 2\text{ ms}$) | `VERIFIED` (251 lines) | `assets/20261104T004059-606-j6a7/api-schema-mapper-local-data-schema.json` |
| **Extracted & Reconciled Spec 005 Payload** | `assets/20261104T004059-606-j6a7/api-schema-mapper-costco-verified-extracted.json` | Local JSON Artifact | None | N/A | `VERIFIED` | `assets/20261104T004059-606-j6a7/api-schema-mapper-costco-verified-extracted.json` |

---

## 3. Verbatim Payload Schemas & Field Contracts

### 3.1 SEC EDGAR Submissions API (`https://data.sec.gov/submissions/CIK0000909832.json`)

```typescript
interface SecEdgarSubmissionsResponse {
  cik: string;                           // "0000909832"
  entityType: string;                    // "operating"
  sic: string;                           // "5331"
  sicDescription: string;                // "Retail-Variety Stores"
  name: string;                          // "COSTCO WHOLESALE CORP /NEW"
  tickers: string[];                     // ["COST"]
  exchanges: string[];                   // ["Nasdaq"]
  ein: string;                           // "911223280"
  category: string;                      // "Large accelerated filer"
  fiscalYearEnd: string;                 // "0901"
  stateOfIncorporation: string;          // "WA"
  filings: {
    recent: {
      accessionNumber: string[];         // Includes "0000909832-24-000049" (FY24 10-K) & "0000909832-24-000043" (Q4/FY24 8-K)
      filingDate: string[];              // "2024-10-09" (10-K), "2024-09-26" (8-K)
      reportDate: string[];              // "2024-09-01"
      form: string[];                    // "10-K", "8-K", "10-Q"
      primaryDocument: string[];         // "cost-20240901.htm", "cost-20240926.htm"
    };
  };
}
```

### 3.2 Canonical Local Dataset Schema (`data/costco_revenue_breakdown.json`) & Spec 005 Plain-English Field Contract

`data/costco_revenue_breakdown.json` is validated by `verifyFinancialDataset(data)` in [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs). All existing top-level keys, nested field names, and numeric values MUST remain intact.

```typescript
export interface CostcoRevenueBreakdownSchema {
  company: {
    name: "Costco Wholesale Corporation";
    ticker: "COST";
    exchange: "NASDAQ";
    cik: "0000909832";
    fiscal_year: 2024;
    fiscal_year_end: "2024-09-01";
    fiscal_weeks: 52;
    currency: "USD";
    units: "millions";
  };
  consolidated_income_statement: {
    net_sales_usd_m: 249625;
    membership_fees_usd_m: 4828;
    total_revenue_usd_m: 254453;
    merchandise_costs_usd_m: 222358;
    selling_general_and_administrative_usd_m: 22810;
    operating_income_usd_m: 9285;
    interest_expense_usd_m: 169;
    interest_income_and_other_net_usd_m: 624;
    income_before_taxes_usd_m: 9740;
    provision_for_income_taxes_usd_m: 2373;
    net_income_usd_m: 7367;
  };
  historical_comparison: Array<{
    fiscal_year: 2022 | 2023 | 2024;
    fiscal_year_end: "2022-08-28" | "2023-09-03" | "2024-09-01";
    fiscal_weeks: 52 | 53;
    net_sales_usd_m: 222730 | 237710 | 249625;
    membership_fees_usd_m: 4224 | 4580 | 4828;
    total_revenue_usd_m: 226954 | 242290 | 254453;
    merchandise_costs_usd_m: 199382 | 212586 | 222358;
    selling_general_and_administrative_usd_m: 19779 | 21590 | 22810;
    operating_income_usd_m: 7793 | 8114 | 9285;
    net_income_usd_m: 5844 | 6292 | 7367;
    net_income_including_noncontrolling_interests_usd_m: 5915 | 6292 | 7367;
  }>;
  merchandise_categories: Array<{
    category_id: "foods_and_sundries" | "non_foods" | "fresh_foods" | "warehouse_ancillary_and_other";
    name: string;
    share_of_net_sales_pct: number;      // 40.65 | 25.63 | 13.71 | 20.02 (sums to 100.01%)
    estimated_net_sales_usd_m: number;   // 101463 | 63973 | 34220 | 49969 (sums to 249625)
    fy2023_net_sales_usd_m: number;      // 96175 | 60865 | 31977 | 48693 (sums to 237710)
    fy2022_net_sales_usd_m: number;      // 85629 | 61100 | 29527 | 46474 (sums to 222730)
    role_in_flywheel: string;            // MUST BE REWRITTEN IN PLAIN ENGLISH (Spec 005 §3.3 & §3.6)
    examples: string[];
  }>;
  geographic_segments: Array<{
    segment_id: "united_states" | "canada" | "other_international";
    name: "United States" | "Canada" | "Other International";
    share_of_net_sales_pct: 72.37 | 13.71 | 13.93;
    total_revenue_usd_m: 184143 | 34874 | 35436;
    operating_income_usd_m: 6217 | 1648 | 1420;
    warehouse_count: 614 | 108 | 168;    // Sums to 890
    owned_warehouses: 499 | 91 | 113;    // Sums to 703
    leased_warehouses: 115 | 17 | 55;    // Sums to 187
    floor_space_sq_ft_m: 91.1 | 15.5 | 24.3;
    employees: 219000 | 53000 | 61000;
    basis_note: string;
  }>;
  membership_metrics: {
    gold_star_paid_members_m: 63.7;
    business_paid_members_m: 12.5;
    paid_household_members_m: 76.2;
    household_cards_m: 60.6;
    cardholders_total_m: 136.8;
    executive_paid_members_m: 35.4;
    executive_share_of_paid_members_pct: 46.5;
    executive_share_of_worldwide_sales_pct: 73.3;
    executive_reward_contra_revenue_usd_m: 2804;
    accrued_member_rewards_liability_usd_m: 2435;
    renewal_rate_us_canada_pct: 92.9;
    renewal_rate_worldwide_pct: 90.5;
    gold_star_annual_fee_usd: 65;
    gold_star_annual_fee_fy2024_prior_to_sept_2024_usd: 60;
    executive_annual_fee_usd: 130;
    executive_annual_fee_fy2024_prior_to_sept_2024_usd: 120;
    executive_annual_reward_cap_usd: 1250;
    fee_increase_effective_date: "2024-09-01";
  };
  working_capital_balance_sheet: {
    merchandise_inventories_usd_m: 18647;
    accounts_payable_usd_m: 19421;
    deferred_membership_fees_liability_usd_m: 2501;
    accrued_member_rewards_liability_usd_m: 2435;
    prior_year_merchandise_inventories_usd_m: 16651;
    prior_year_accounts_payable_usd_m: 17483;
    prior_year_deferred_membership_fees_liability_usd_m: 2337;
  };
  primary_sources: Array<{
    source_id: "sec-10k-fy2024" | "sec-8k-q4-fy2024";
    title: string;
    filing_type: "Form 10-K" | "Form 8-K";
    cik: "0000909832";
    accession_number: "0000909832-24-000049" | "0000909832-24-000043";
    filing_date: "2024-10-09" | "2024-09-26";
    period_end: "2024-09-01";
    url: string;
    items_referenced: string[];
  }>;
}
```

#### Mandatory `data/costco_revenue_breakdown.json` Field Value Remediation (`functional_specification_005.md` §3.3 & §3.6)

| `category_id` | Line | Current `role_in_flywheel` Value (Contains Prohibited Clichés) | Recommended Plain-English `role_in_flywheel` Value |
| :--- | :--- | :--- | :--- |
| `foods_and_sundries` | `75` | `"High-frequency staple repeat-visit anchor driving predictable pallet velocity and household pantry consolidation"` | `"Everyday grocery and household staples ($101,463M or 40.65% of FY2024 Net Sales) that bring members back regularly for bulk pantry goods, drinks, snacks, and cleaning supplies."` |
| `non_foods` | `94` | `"Treasure-hunt discretionary basket builder showcasing extreme brand-name and Kirkland Signature price gaps"` (**PROHIBITED:** `Treasure-hunt discretionary basket builder`) | `"Appliances, electronics, clothing, hardware, and seasonal home goods ($63,973M or 25.63% of FY2024 Net Sales) sold at low markups alongside Kirkland Signature products and Costco Logistics delivery."` |
| `fresh_foods` | `121` | `"Perishable weekly trip driver and rapid inventory-turn engine minimizing spoilage while anchoring perceived member value"` (**PROHIBITED:** `Perishable weekly trip driver and rapid inventory-turn engine`) | `"Fresh meat, produce, bakery, and deli items ($34,220M or 13.71% of FY2024 Net Sales, +7.01% YoY) that bring members into the warehouse every week and sell through quickly with minimal waste."` |
| `warehouse_ancillary_and_other` | `136` | `"High-frequency member trip and renewal magnet led by 719 gas stations (~12% of net sales), pharmacy, optical, food court, and Costco Travel"` (**PROHIBITED:** `renewal magnet`) | `"Gas stations (719 locations generating ~12% of net sales), pharmacy, optical, food court, hearing aids, tire installation, and Costco Travel ($49,969M or 20.02% of FY2024 Net Sales) that save members money on everyday services and encourage annual membership renewal."` |

---

### 3.3 Client-Side Embedded Data & Interactive DOM Contracts (`index.html`)

#### 1. Embedded JavaScript Data Structures (`index.html` lines 2027–2315)
- `CATEGORY_DATA`: 4-element array (`id`, `name`, `shortName`, `color`, `salesByYear: {2022, 2023, 2024}`, `shareByYear: {2022, 2023, 2024}`, `yoy24`, `departments`, `role`).
- `GEOGRAPHY_DATA`: 3-element array (`id`, `name`, `shortName`, `color`, `revenueM`, `revSharePct`, `opIncM`, `opIncSharePct`, `opMarginPct`, `warehouses`, `clubSharePct`, `ownedWarehouses`, `leasedWarehouses`, `floorSpaceSqFtM`, `employees`, `revPerClubM`, `opIncPerClubM`, `role`).
- `FLYWHEEL_ASYMMETRY_DATA`: 2-element array (`pillar_net_sales`, `pillar_membership_fees` with `revM`, `revSharePct`, `opIncM`, `opIncSharePct`, `detail`).
- `ANCILLARY_ROSE_DATA`: 4-element array (`anc_gasoline`, `anc_inclub`, `anc_ecomm`, `anc_digital_other` with `volumeB`, `shareOfSalesPct`, `metricBadge`, `svgBadge`, `detail`).
- `GAAP_BY_YEAR`: Keyed by `2022`, `2023`, `2024` (`weeks`, `periodEnd`, `netSales`, `membershipFees`, `totalRevenue`, `merchCosts`, `sga`, `opInc`, `intExp`, `intIncOther`, `preTax`, `tax`, `netInc`).
- `STEP_SUMMARIES`: Keyed by `1..5` (`title`, `text`).
- `WAYFINDER_TICKETS`: 6-element array (`id: "ticket-001.md".."ticket-006.md"`, `title`, `citation`, `summary`).
  - **CRITICAL SHORTHAND REMEDIATION (`index.html:2283`):** `WAYFINDER_TICKETS[0].summary` currently contains `R_total ($254,453M)`. Because `src/costco_revenue_model.mjs` checks `resolvedHtml` for `R_total`, line 2283 MUST be updated to `Total Revenue ($254,453M)`.

#### 2. Visible HTML & JS Strings Requiring Plain-English Replacement (`functional_specification_005.md` §3.3)
- `index.html:1341`: Replace `Negative Working-Capital Float` KPI label with `Supplier-Financed Inventory (AP to Inventory)`.
- `index.html:1348-1357` (`.executive-equation-banner`): Replace `R_total ($254,453M) = Net Sales ($249,625M) + Membership Fees ($4,828M)` and `OpInc ($9,285M) = Merch Contrib ($4,457M | 48.00%) + Membership Fees ($4,828M | 52.00%)` with:
  - `Total Revenue ($254,453M) = Net Sales ($249,625M) + Membership Fees ($4,828M)`
  - `Operating Income ($9,285M) = Net Merchandise Profit ($4,457M, or 48.00%) + Membership Fees ($4,828M, or 52.00%)`
- `index.html:1369-1370`: Replace `Area √r`, `Linear Radius r`, `Share Angle θ_i` in section lead prose with `By Area (Square-Root Scale)`, `By Radius (Linear Scale)`, and `By Revenue Share (Angle)`.
- `index.html:1395-1397`: Replace button labels `Area √r (Coxcomb)`, `Linear Radius r`, `Share Angle θ_i` with `By Area (Square-Root Scale)`, `By Radius (Linear Scale)`, `By Revenue Share (Angle)`.
- `index.html:1412` & `2514-2518`: Replace `#polar-cat-caption` text (`Area-Proportional √r`, `Linear Radius r`, `Share-Weighted Sector Angle θ_i`) with plain-English mode descriptions (`By Area (Square-Root Scale, 90° Sectors)`, `By Radius (Linear Scale, 90° Sectors)`, `By Revenue Share (Sector Angle)`).
- `index.html:1994`: Replace `<code>wayfinderAudit.valid === true</code> (6 resolved tickets verified)` with `Verified: 6 resolved research tickets and canonical decision map`.

#### 3. Required New DOM & CSS Contracts in `index.html` (`functional_specification_005.md` §3.1–§3.5)
- **Corporate Animated SVG Elements:**
  - `#svg-corporate-flywheel-hero` (animated 4-node corporate revenue & operating profit flywheel schematic in `#section-executive-summary`),
  - Step-level animated SVG mini-schematics inside `#step-1` through `#step-5`,
  - Polar chart animated sweep/selection rings and smooth sector transitions in `#svg-polar-categories`, `#svg-polar-geography`, `#svg-polar-flywheel`,
  - Accessible motion pause/play toggle button (`#motion-toggle-btn` / `[data-motion-toggle]`) and `@media (prefers-reduced-motion: reduce)` CSS rule.
- **Halftone & Ordered Bayer Dithering Definitions:**
  - Inline SVG `<defs>` containing `<pattern>` matrices (e.g., `#dither-bayer-navy`, `#dither-bayer-crimson`, `#dither-halftone-slate`) and CSS `.dither-accent-band` / `.dither-header-plate` accents that never sit behind body text or table numerals without solid high-contrast backing ($\ge 4.5:1$ contrast).
- **Plain-English Note Containers:**
  - `.plain-english-note` boxes in each of the 5 report sections and `.chart-reading-note` / `.polar-visual-legend` boxes in each of the 3 polar chart panels.
- **Polar Graph Legibility & Responsive Contracts:**
  - Padded SVG `viewBox` (e.g. `viewBox="-75 -40 550 480"`), `.polar-sector-label` (`font-size: 12px`, `paint-order: stroke fill`, `stroke: #FFFFFF`, `stroke-width: 3.5px`), `.polar-axis-label` (`font-size: 10.5px`–`11px` with white halo), center hub `r >= 40` with `.polar-center-title` (`font-size: 12.5px`) and `.polar-center-sub` (`font-size: 10px`), non-colliding ring scale angle in `By Revenue Share (Angle)` mode, and `.polar-details-column .corp-table` (`font-size: 12.5px`–`13px`, cell padding `8px 10px`).

---

### 3.4 Verification Engine API & Return Schema (`src/costco_revenue_model.mjs`)

All existing exported functions and CLI flags MUST be preserved:
- **CLI Flags:** `--verify`, `--root <dir>`, `--data <path>`, `--map <path>`, `--tickets <dir>`, `--research <path>`, `--html <path>`
- **Exported Functions:**
  - `verifyFinancialDataset(data)`
  - `verifyWayfinderArtifacts(rawOptions)`
  - `verifyResearchMonograph(rawOptions)`
  - `verifyCorporateWebReport(rawOptions)` (aliased as `verifyIndexHtml`)
  - `loadAndVerifyCostcoModel(rawOptions)`
- **Additional Invariants to Enforce in `src/costco_revenue_model.mjs` (Spec 005 §3.6):**
  1. `verifyFinancialDataset(data)`: Reject prohibited marketing clichés (`treasure-hunt discretionary basket builder`, `renewal magnet`, `perishable weekly trip driver and rapid inventory-turn engine`) in `merchandise_categories[].role_in_flywheel`.
  2. `verifyCorporateWebReport(rawOptions)`:
     - Reject prohibited shorthand and code leaks (`R_total`, `θ_i`, `&theta;_i`, `wayfinderAudit.valid === true`, `treasure-hunt discretionary basket builder`, `renewal magnet`, `perishable weekly trip driver and rapid inventory-turn engine`),
     - Verify corporate animated SVG elements (`#svg-corporate-flywheel-hero`, SVG animation/motion hooks, and `@media (prefers-reduced-motion: reduce)`),
     - Verify corporate halftone/Bayer dithered definitions (`<pattern` and dither CSS classes),
     - Verify plain-English explanatory note containers (`.plain-english-note`, `.chart-reading-note`),
     - Verify high-legibility SVG halo/typography rules (`paint-order: stroke fill`) and screen-size-agnostic responsive rules (`clamp(`, `@media`, `minmax(0, 1fr)`),
     - Verify keyboard accessibility bindings (`Enter`/`Space` on `[data-cat-row]`, `[data-geo-row]`, and polar sectors).

---

## 4. Error & Boundary Conditions

1. **SEC EDGAR `HEAD` Request Rejection on XBRL API (`HTTP 403 MissingAuthenticationTokenException`):**
   - *Observed Live Behavior:* Sending an HTTP `HEAD` (`curl -I`) request to `https://data.sec.gov/api/xbrl/companyfacts/CIK0000909832.json` returns `HTTP/2 403` with `x-amzn-errortype: MissingAuthenticationTokenException` because the AWS API Gateway backing `data.sec.gov/api/xbrl/*` only routes `GET` and `OPTIONS` methods (`access-control-allow-methods: GET,OPTIONS`), whereas `www.sec.gov/Archives/*` supports both `GET` and `HEAD`.
   - *Mitigation:* Always use `GET` with a compliant `User-Agent` header when probing `data.sec.gov`, and execute zero network calls at application/verification runtime.
2. **Prohibited Shorthand in `<script>` vs. HTML Markup:**
   - *Boundary Condition:* In [`index.html`](../../index.html), `R_total` appears both in HTML markup (line 1351) and inside `WAYFINDER_TICKETS[0].summary` in `<script>` (line 2283), while `θ_i` appears in HTML markup (`&theta;_i` on lines 1369, 1397) and in `<script>` (`θ_i` on line 2518).
   - *Mitigation:* Both HTML markup and `<script>` string literals must be cleaned so full-text verification checks on `resolvedHtml` pass with zero false positives or leaks.
3. **SVG Ring Scale Label vs. Sector Label Collision in `By Revenue Share (Angle)` Mode:**
   - *Boundary Condition:* In `#polar-chart-categories`, `renderPolarRingLabels` currently renders ring scale labels at 12 o'clock (`cx + 4`, `cy - r + 10`), which collides when sector angles shift or when `Non-Foods` / `Foods & Sundries` labels sit near top/bottom axes.
   - *Mitigation:* Place ring scale labels along a non-colliding diagonal angle (e.g., `45°` or `315°` spoke) or with high-contrast pill badges, and expand the SVG `viewBox` padding so outer labels never clip across `320px`–`2560px` viewports.
