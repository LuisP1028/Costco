# /wayfinder/api-schemas: External API & Data Connection Reconnaissance Map

**Run ID:** `20261103T204534-693-1b8y`  
**Agent:** `api-schema-mapper` (Scanning & Reconnaissance Node)  
**Governing Specification:** [`functional_specification_003.md`](../../functional_specification_003.md)  
**Authoritative Domain Glossary:** [`LANGUAGE.md`](../../LANGUAGE.md)  
**Verification Baseline:** `npm run verify` (`node src/costco_revenue_model.mjs --verify`)  
**Status:** Reconnaissance Complete — Live Endpoint Payloads Probed, Captured & Mapped to Primary Ground-Truth Dataset. `DO NOT CODE YET` Enforced.

---

## 1. Architectural Role & Execution Constraints

In accordance with [`RULE[user_global]`](../../LANGUAGE.md) and [`functional_specification_003.md`](../../functional_specification_003.md), the `api-schema-mapper` assesses all required external APIs, remote services, and data payloads, verifies primary data sources via live read-only probes, and maps the exact field schemas, types, and nullability constraints.

### 1.1 Core Architectural Invariants
1. **Zero External Network Dependency at Browser & CLI Runtime (`RULE[user_global]`):**
   - Both `index.html` (interactive presentation) and `node src/costco_revenue_model.mjs --verify` (deterministic verification suite) MUST execute in a completely self-contained, offline sandbox with **zero (0) external network calls**.
   - All styling, datasets, and SVG polar chart geometries must load locally without CDN roundtrips or runtime fetches.
2. **Ground-Truth External Reconciliation:**
   - The canonical local dataset (`data/costco_revenue_breakdown.json`) is reconciled against audited primary filings from the U.S. Securities and Exchange Commission (SEC) EDGAR system for Costco Wholesale Corporation (`COST`, CIK `0000909832`).
   - Live endpoints were probed to confirm schema stability, accession numbers, and US-GAAP taxonomy tags.
3. **Fail-Fast Boundary Enforcement:**
   - Any divergence between local report figures in `index.html` and audited Note 11 / Item 2 primary disclosures triggers immediate verification failure in `src/costco_revenue_model.mjs`.

---

## 2. External API & Primary Source Connection Register

| Target Service / System | Endpoint URL | Protocol / Method | Auth / Headers | Rate / Concurrency Limits | HTTP Status Probed | Saved Asset Path |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC EDGAR Submissions API** | `https://data.sec.gov/submissions/CIK0000909832.json` | HTTPS / HTTP/2 `GET` | Required: `User-Agent: Sample Company Name AdminContact@<domain>.com` | $\le 10\text{ req/sec}$ per IP/UA | `200 OK` (156 KB) | `assets/20261103T204534-693-1b8y/api-schema-mapper-sec-submissions.json` |
| **SEC EDGAR Company Facts XBRL API** | `https://data.sec.gov/api/xbrl/companyfacts/CIK0000909832.json` | HTTPS / HTTP/2 `GET` | Required: `User-Agent: Sample Company Name AdminContact@<domain>.com` | $\le 10\text{ req/sec}$ per IP/UA | `200 OK` (3.5 MB) | `assets/20261103T204534-693-1b8y/api-schema-mapper-sec-companyfacts.json` |
| **SEC EDGAR Form 10-K Filing Document** | `https://www.sec.gov/Archives/edgar/data/909832/000090983224000049/cost-20240901.htm` | HTTPS / HTTP/2 `GET` | Required: `User-Agent: Sample Company Name AdminContact@<domain>.com` | $\le 10\text{ req/sec}$ per IP/UA | `200 OK` (1.4 MB) | `assets/20261103T204534-693-1b8y/api-schema-mapper-cost-20240901.htm` |
| **SEC EDGAR Form 8-K Filing Document** | `https://www.sec.gov/Archives/edgar/data/909832/000090983224000043/cost-20240926.htm` | HTTPS / HTTP/2 `GET` | Required: `User-Agent: Sample Company Name AdminContact@<domain>.com` | $\le 10\text{ req/sec}$ per IP/UA | `200 OK` (23 KB) | `assets/20261103T204534-693-1b8y/api-schema-mapper-sec-8k-20240926.htm` |
| **Local Canonical Data Store** | `data/costco_revenue_breakdown.json` | Local File System (JSON) | None (Offline POSIX read) | I/O bound ($\le 12\text{ ms}$) | Local File (`200 OK` equivalent) | `assets/20261103T204534-693-1b8y/api-schema-mapper-local-data-schema.json` |

---

## 3. Verbatim Payload Schemas & Fields

### 3.1 SEC EDGAR Submissions API (`CIK0000909832.json`)

- **Host:** `data.sec.gov`
- **Path:** `/submissions/CIK0000909832.json`
- **Method:** `GET`
- **Authentication:** Unauthenticated public REST endpoint; strictly enforces SEC Fair Access Policy requiring custom `User-Agent`.
- **Observed Response Schema (Verbatim Paths & Types):**

```typescript
interface SecEdgarSubmissionsResponse {
  cik: string;                           // "0000909832" (10-digit zero-padded string)
  entityType: string;                    // "operating"
  sic: string;                           // "5331" (Retail-Variety Stores)
  sicDescription: string;                // "Retail-Variety Stores"
  ownerOrg: string;                      // "07 Trade & Services"
  insiderTransactionForOwnerExists: number;  // 0
  insiderTransactionForIssuerExists: number; // 1
  name: string;                          // "COSTCO WHOLESALE CORP /NEW"
  tickers: string[];                     // ["COST"]
  exchanges: string[];                   // ["Nasdaq"]
  ein: string;                           // "911223280"
  description: string;                   // ""
  website: string;                       // ""
  investorWebsite: string;               // ""
  category: string;                      // "Large accelerated filer"
  fiscalYearEnd: string;                 // "0901" (MMDD)
  stateOfIncorporation: string;          // "WA"
  stateOfIncorporationDescription: string; // "WA"
  addresses: {
    mailing: SecAddress;
    business: SecAddress;
  };
  phone: string;                         // "425-313-8100"
  flags: string;                         // ""
  formerNames: Array<{
    name: string;
    from: string;
    to: string;
  }>;
  filings: {
    recent: {
      accessionNumber: string[];         // e.g. "0000909832-24-000049" (FY2024 10-K)
      filingDate: string[];              // "YYYY-MM-DD" e.g. "2024-10-09"
      reportDate: string[];              // "YYYY-MM-DD" e.g. "2024-09-01"
      acceptanceDateTime: string[];      // ISO 8601 string "2024-10-09T10:01:22.000Z"
      act: string[];                     // "34"
      form: string[];                    // "10-K", "8-K", "10-Q", "DEF 14A"
      fileNumber: string[];              // "000-20355"
      filmNumber: string[];              // "241334812"
      items: string[];                   // e.g. "2.02" for 8-K
      size: number[];                    // e.g. 1498002 bytes
      isXBRL: number[];                  // 1 or 0
      isInlineXBRL: number[];            // 1 or 0
      primaryDocument: string[];         // e.g. "cost-20240901.htm"
      primaryDocDescription: string[];   // "FORM 10-K"
    };
    files: Array<{
      name: string;
      filingCount: number;
      filingFrom: string;
      filingTo: string;
    }>;
  };
}

interface SecAddress {
  street1: string;                       // "999 LAKE DRIVE"
  street2: string | null;                // null
  city: string;                          // "ISSAQUAH"
  stateOrCountry: string;                // "WA"
  zipCode: string;                       // "98027"
  stateOrCountryDescription: string;     // "WASHINGTON"
}
```

---

### 3.2 SEC EDGAR Company Facts XBRL API (`companyfacts/CIK0000909832.json`)

- **Host:** `data.sec.gov`
- **Path:** `/api/xbrl/companyfacts/CIK0000909832.json`
- **Method:** `GET`
- **Observed Structure:** 476 `us-gaap` concepts detailing multi-year audited facts.
- **Top-Level Schema:**

```typescript
interface SecCompanyFactsResponse {
  cik: number;                           // 909832 (integer format in company facts)
  entityName: string;                    // "COSTCO WHOLESALE CORP /NEW"
  facts: {
    dei: Record<string, SecFactConcept>;
    "us-gaap": Record<string, SecFactConcept>;
    srt: Record<string, SecFactConcept>;
    ffd: Record<string, SecFactConcept>;
  };
}

interface SecFactConcept {
  label: string;                         // Human-readable taxonomy label
  description: string;                   // GAAP accounting policy definition
  units: {
    USD?: SecUsdFactEntry[];             // Monetary values in unscaled USD
    shares?: SecShareFactEntry[];        // Share counts
    pure?: SecPureFactEntry[];           // Dimensionless percentages / ratios
  };
}

interface SecUsdFactEntry {
  start?: string;                        // "YYYY-MM-DD" (for duration periods)
  end: string;                           // "YYYY-MM-DD" (period end date)
  val: number;                           // Unscaled integer (e.g. 254453000000)
  fy: number;                            // Fiscal year integer (e.g. 2024)
  fp: "FY" | "Q1" | "Q2" | "Q3" | "Q4";  // Fiscal period
  form: "10-K" | "10-Q" | "8-K";         // Source filing
  filed: string;                         // "YYYY-MM-DD" filing date
  frame?: string;                        // e.g. "CY2024Q3", "CY2023"
  accn: string;                          // Accession number string
}
```

#### Audited US-GAAP Concepts Captured from Live Telemetry:

| Concept Identifier (`facts['us-gaap'][concept]`) | Label | FY2024 Value (`val`) | FY2023 Value (`val`) | FY2022 Value (`val`) | Mapped Local Field (`costco_revenue_breakdown.json`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `RevenueFromContractWithCustomerExcludingAssessedTax` | Revenue from Contract with Customer, Excluding Assessed Tax | `$254,453,000,000` | `$242,290,000,000` | `$226,954,000,000` | `consolidated_income_statement.total_revenue_usd_m` (`$254,453M`) |
| `CostOfGoodsAndServicesSold` | Cost of Goods and Services Sold | `$222,358,000,000` | `$212,586,000,000` | `$199,382,000,000` | `consolidated_income_statement.merchandise_costs_usd_m` (`$222,358M`) |
| `SellingGeneralAndAdministrativeExpense` | Selling, General and Administrative Expense | `$22,810,000,000` | `$21,590,000,000` | `$19,779,000,000` | `consolidated_income_statement.selling_general_and_administrative_usd_m` (`$22,810M`) |
| `OperatingIncomeLoss` | Operating Income (Loss) | `$9,285,000,000` | `$8,114,000,000` | `$7,793,000,000` | `consolidated_income_statement.operating_income_usd_m` (`$9,285M`) |
| `NetIncomeLoss` | Net Income (Loss) Attributable to Parent | `$7,367,000,000` | `$6,292,000,000` | `$5,844,000,000` | `consolidated_income_statement.net_income_usd_m` (`$7,367M`) |
| `InventoryNet` | Inventory, Net | `$18,647,000,000` | `$16,651,000,000` | `$15,217,000,000` | `working_capital_balance_sheet.merchandise_inventories_usd_m` (`$18,647M`) |
| `AccountsPayableCurrent` | Accounts Payable, Current | `$19,421,000,000` | `$17,483,000,000` | `$15,862,000,000` | `working_capital_balance_sheet.accounts_payable_usd_m` (`$19,421M`) |
| `DeferredRevenueCurrent` | Deferred Revenue, Current | `$2,854,000,000` | `$2,501,000,000` (10-K Note 1) | `$2,337,000,000` | `working_capital_balance_sheet.deferred_membership_fees_liability_usd_m` |

---

### 3.3 SEC EDGAR Form 10-K Primary Document (`cost-20240901.htm`)

- **Host:** `www.sec.gov`
- **Filing Accession:** `0000909832-24-000049`
- **Filing Date:** `2024-10-09` (Period ended: `2024-09-01`)
- **Key Disclosures Grounded for `functional_specification_003.md`:**

#### 1. Note 11 — Segment Reporting: Disaggregated Net Sales by Category (audited in $ Millions)
*Specification Requirement 3.3 & AC-03 Data Reconciliation:*
- **Foods and Sundries:**
  - FY2024: `$101,463M` (`40.65%` share of net sales, `+5.50%` YoY growth)
  - FY2023: `$96,175M` (`40.46%` share of net sales)
  - FY2022: `$85,629M` (`38.45%` share of net sales)
- **Non-Foods:**
  - FY2024: `$63,973M` (`25.63%` share of net sales, `+5.11%` YoY growth)
  - FY2023: `$60,865M` (`25.60%` share of net sales)
  - FY2022: `$61,100M` (`27.43%` share of net sales)
- **Warehouse Ancillary and Other Businesses:**
  - FY2024: `$49,969M` (`20.02%` share of net sales, `+2.62%` YoY growth)
  - FY2023: `$48,693M` (`20.48%` share of net sales)
  - FY2022: `$46,474M` (`20.87%` share of net sales)
- **Fresh Foods:**
  - FY2024: `$34,220M` (`13.71%` share of net sales, `+7.01%` YoY growth)
  - FY2023: `$31,977M` (`13.45%` share of net sales)
  - FY2022: `$29,527M` (`13.26%` share of net sales)
- **Total Net Sales:**
  - FY2024: `$249,625M` (`100.00%`, `+5.01%` YoY growth)
  - FY2023: `$237,710M` (`100.00%`, `+6.73%` YoY growth)
  - FY2022: `$222,730M` (`100.00%`)

#### 2. Note 11 & Item 2 — Geographic Segments & Property Footprint (FY2024)
- **United States (including Puerto Rico):**
  - Total Revenue: `$184,143M` (`72.37%` share of total revenue)
  - Operating Income: `$6,217M` (`3.38%` operating margin)
  - Warehouses: `614` clubs (`499` owned land & building, `115` leased)
  - Operating Floor Space: `91.1M` sq ft
  - Employees: `219,000`
- **Other International (12 countries: Mexico 40, Japan 35, U.K. 29, Korea 19, Australia 15, Taiwan 14, China 7, Spain 4, France 2, Iceland 1, New Zealand 1, Sweden 1):**
  - Total Revenue: `$35,436M` (`13.93%` share of total revenue)
  - Operating Income: `$1,420M` (`4.01%` operating margin)
  - Warehouses: `168` clubs (`113` owned land & building, `55` leased)
  - Operating Floor Space: `24.3M` sq ft
  - Employees: `61,000`
- **Canada:**
  - Total Revenue: `$34,874M` (`13.71%` share of total revenue)
  - Operating Income: `$1,648M` (`4.73%` operating margin)
  - Warehouses: `108` clubs (`91` owned land & building, `17` leased)
  - Operating Floor Space: `15.5M` sq ft
  - Employees: `53,000`
- **Consolidated Total:**
  - Total Revenue: `$254,453M`
  - Operating Income: `$9,285M` (`3.65%` operating margin)
  - Warehouses: `890` clubs (`703` owned land & building, `187` leased—of which `134` are land-only leases where Costco owns the building structure, meaning Costco owns `837` of `890` building structures)
  - Operating Floor Space: `130.9M` sq ft
  - Depot / Cross-Dock Space: `31.9M` sq ft across `32` depots
  - Total Employees: `333,000`

#### 3. Item 1 & Item 7 — Membership Economics & ASC 606 Recognition
- **Total Paid Household Members:** `76.2M` (`63.7M` Gold Star, `12.5M` Business)
- **Total Household Cards:** `60.6M`
- **Total Cardholders:** `136.8M`
- **Executive Tier Concentration:** `35.4M` paid members (`46.5%` of paid members) generating `73.3%` of worldwide net sales.
- **Executive 2% Reward Contra-Revenue:** `$2,804M` deducted directly from net sales under ASC 606.
- **Deferred Membership Fees Liability:** `$2,501M` on balance sheet recognized ratably over 12 months.
- **Renewal Rates:** `92.9%` in U.S. and Canada; `90.5%` worldwide.
- **Fee Increase (Sept 1, 2024):** `$65` Gold Star / `$130` Executive (previously `$60` / `$120` in FY2024).

#### 4. Item 8 — Working Capital Float & Gross Margin Mechanics
- **Merchandise Inventories:** `$18,647M`
- **Accounts Payable:** `$19,421M`
- **Accounts Payable to Inventory Coverage:** `104.15%` (`+$774M` supplier-financed inventory float).
- **Inventory Turnover:** `12.60x` per year (`28.97` inventory days vs. `31.88` payable days; negative working capital cycle).
- **Merchandise Gross Margin Ceiling:** `10.92%` (`$249,625M` Net Sales minus `$222,358M` Merchandise Costs = `$27,267M`).
- **SG&A Overhead:** `9.14%` (`$22,810M`).
- **Net Merchandise Operating Contribution:** `$4,457M` (`48.00%` of operating income).
- **Membership Fees:** `$4,828M` (`52.00%` of operating income).
- **Consolidated Operating Income:** `$9,285M` (`$4,457M + $4,828M`).

---

## 4. Canonical Local Data Contract: `data/costco_revenue_breakdown.json`

The offline dataset `data/costco_revenue_breakdown.json` serves as the single source of truth for the local application.

```typescript
export interface CostcoRevenueDataset {
  company: {
    name: string;                        // "Costco Wholesale Corporation"
    ticker: string;                      // "COST"
    exchange: string;                    // "NASDAQ"
    cik: string;                         // "0000909832"
    fiscal_year: number;                 // 2024
    fiscal_year_end: string;             // "2024-09-01"
    fiscal_weeks: number;                // 52
    currency: string;                    // "USD"
    units: string;                       // "millions"
  };
  consolidated_income_statement: {
    net_sales_usd_m: number;             // 249625
    membership_fees_usd_m: number;       // 4828
    total_revenue_usd_m: number;         // 254453
    merchandise_costs_usd_m: number;     // 222358
    selling_general_and_administrative_usd_m: number; // 22810
    operating_income_usd_m: number;      // 9285
    interest_expense_usd_m: number;      // 169
    interest_income_and_other_net_usd_m: number; // 624
    income_before_taxes_usd_m: number;   // 9740
    provision_for_income_taxes_usd_m: number; // 2373
    net_income_usd_m: number;            // 7367
  };
  historical_comparison: Array<{
    fiscal_year: number;                 // 2022 | 2023
    fiscal_year_end: string;             // "YYYY-MM-DD"
    fiscal_weeks: number;                // 52 | 53
    net_sales_usd_m: number;
    membership_fees_usd_m: number;
    total_revenue_usd_m: number;
    merchandise_costs_usd_m: number;
    selling_general_and_administrative_usd_m: number;
    operating_income_usd_m: number;
    net_income_usd_m: number;
    net_income_including_noncontrolling_interests_usd_m?: number;
  }>;
  merchandise_categories: Array<{
    category_id: "foods_and_sundries" | "non_foods" | "fresh_foods" | "warehouse_ancillary_and_other";
    name: string;
    share_of_net_sales_pct: number;      // e.g. 40.65
    estimated_net_sales_usd_m: number;   // e.g. 101463
    fy2023_net_sales_usd_m: number;      // e.g. 96175
    fy2022_net_sales_usd_m: number;      // e.g. 85629
    role_in_flywheel: string;
    examples: string[];
  }>;
  geographic_segments: Array<{
    segment_id: "united_states" | "canada" | "other_international";
    name: string;
    share_of_net_sales_pct: number;      // e.g. 72.37
    total_revenue_usd_m: number;         // e.g. 184143
    operating_income_usd_m: number;      // e.g. 6217
    warehouse_count: number;             // e.g. 614
    owned_warehouses: number;            // e.g. 499
    leased_warehouses: number;           // e.g. 115
    floor_space_sq_ft_m: number;         // e.g. 91.1
    employees: number;                   // e.g. 219000
    basis_note: string;
  }>;
  membership_metrics: {
    gold_star_paid_members_m: number;    // 63.7
    business_paid_members_m: number;     // 12.5
    paid_household_members_m: number;    // 76.2
    household_cards_m: number;           // 60.6
    cardholders_total_m: number;         // 136.8
    executive_paid_members_m: number;    // 35.4
    executive_share_of_paid_members_pct: number; // 46.5
    executive_share_of_worldwide_sales_pct: number; // 73.3
    executive_reward_contra_revenue_usd_m: number; // 2804
    accrued_member_rewards_liability_usd_m: number; // 2435
    renewal_rate_us_canada_pct: number;  // 92.9
    renewal_rate_worldwide_pct: number;  // 90.5
    gold_star_annual_fee_usd: number;    // 65
    gold_star_annual_fee_fy2024_prior_to_sept_2024_usd: number; // 60
    executive_annual_fee_usd: number;    // 130
    executive_annual_fee_fy2024_prior_to_sept_2024_usd: number; // 120
    executive_annual_reward_cap_usd: number; // 1250
    fee_increase_effective_date: string; // "2024-09-01"
  };
  working_capital_balance_sheet: {
    merchandise_inventories_usd_m: number; // 18647
    accounts_payable_usd_m: number;      // 19421
    deferred_membership_fees_liability_usd_m: number; // 2501
    accrued_member_rewards_liability_usd_m: number;   // 2435
    prior_year_merchandise_inventories_usd_m: number; // 16651
    prior_year_accounts_payable_usd_m: number;        // 17483
    prior_year_deferred_membership_fees_liability_usd_m: number; // 2337
  };
  primary_sources: Array<{
    source_id: string;                   // "sec-10k-fy2024" | "sec-8k-q4-fy2024"
    title: string;
    filing_type: string;
    cik: string;
    accession_number: string;
    filing_date: string;
    period_end: string;
    url: string;
    items_referenced: string[];
  }>;
}
```

---

## 5. Error & Boundary Conditions

1. **SEC Fair Access Rate Throttling (`HTTP 429 Too Many Requests`):**
   - *Condition:* Sending $>10\text{ requests per second}$ to `data.sec.gov`.
   - *Behavior:* SEC gateway issues `429 Too Many Requests` and drops connections.
   - *Architecture Invariant:* Probing is strictly bounded to the scanning phase. At browser runtime and verification time, no requests are made to SEC EDGAR.
2. **Missing or Non-Compliant `User-Agent` Header (`HTTP 403 Forbidden`):**
   - *Condition:* Probing `data.sec.gov` with generic or empty `User-Agent` (e.g. `curl/7.88.1`).
   - *Behavior:* SEC edge proxy returns `HTTP 403 Forbidden` with body `"Your Request Has Been Blocked"`.
   - *Compliance:* All probes declare standard format: `User-Agent: AntigravityAuditor/1.0 (auditor@costco-audit.org)`.
3. **Data Reconciliation Drift in `index.html`:**
   - *Condition:* Incomplete Note 11 category historical updates (e.g. retaining `$88,948M` or `$96,936M` instead of `$85,629M` and `$96,175M` for Foods & Sundries, or `704` instead of `703` owned warehouses).
   - *Behavior:* `verifyCorporateWebReport` in `src/costco_revenue_model.mjs` fails fast with an explicit diff against `data/costco_revenue_breakdown.json`.
4. **SVG Polar Viewport Boundary Clipping:**
   - *Condition:* Long currency/category strings (e.g. `Warehouse Ancillary and Other Businesses: $49,969M (20.02%)`) rendered at radial extremities exceeding `viewBox="0 0 400 400"`.
   - *Remediation Schema:* Polar SVG engines must compute radial coordinates using bounded radii ($r \le 120\text{px}$) with text anchoring (`middle` or dynamic `start`/`end` based on quadrant) and provide outer margin buffers.

---

## 6. Artifact Registry

The authentic schemas, live-probed responses, and extracted financial contracts have been preserved in the repository:

1. `assets/20261103T204534-693-1b8y/api-schema-mapper-sec-submissions.json` (156 KB) — Verbatim SEC EDGAR submissions payload for CIK `0000909832`.
2. `assets/20261103T204534-693-1b8y/api-schema-mapper-sec-companyfacts.json` (3.5 MB) — Complete XBRL facts payload containing 476 US-GAAP concepts.
3. `assets/20261103T204534-693-1b8y/api-schema-mapper-cost-20240901.htm` (1.4 MB) — Primary Form 10-K filing document (Items 1, 2, 7, 8 and Notes 1 & 11).
4. `assets/20261103T204534-693-1b8y/api-schema-mapper-sec-8k-20240926.htm` (23 KB) — Primary Form 8-K Q4/FY2024 earnings announcement.
5. `assets/20261103T204534-693-1b8y/api-schema-mapper-costco-verified-extracted.json` (8.5 KB) — Structured extract and reconciliation of all FY22–FY24 metrics and operational ratios.
6. `assets/20261103T204534-693-1b8y/api-schema-mapper-local-data-schema.json` (7.8 KB) — Formal JSON Schema (Draft-07) validating `data/costco_revenue_breakdown.json`.
