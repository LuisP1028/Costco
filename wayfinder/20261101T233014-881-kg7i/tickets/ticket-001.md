---
id: ticket-001
title: Structured SEC Form 10-K Financial Dataset Schema and GAAP Conservation Contract (data/costco_revenue_breakdown.json)
stage: implement
claimed_by: wayfinder-read-and-plan
status: resolved
---

# Structured SEC Form 10-K Financial Dataset Schema and GAAP Conservation Contract (`data/costco_revenue_breakdown.json`)

- **Target Execution Stage:** `implement` (independent automated test suite authoring and execution reserved strictly for `tester` under `INV-NO-SELF-TEST-01`)
- **Claimed by:** `wayfinder-read-and-plan`
- **Status:** `resolved`

## Question

What exact JSON schema, field names, data types, multi-year historical figures, disaggregated merchandise category and geographic segment tables, membership metrics, working-capital balance sheet accounts, and primary-source SEC EDGAR citations must `data/costco_revenue_breakdown.json` establish so that every GAAP accounting identity and domain invariant in `functional_specification_001.md` reconciles identically against Costco Wholesale Corporation's FY2024 Form 10-K (`CIK: 0000909832`, Accession `0000909832-24-000049`)?

## Blocked By

None (foundational primary-source data contract).

## Mandatory Target Deliverables (MANDATORY_TARGET)

- `data/costco_revenue_breakdown.json` — Create as the canonical machine-readable FY2024 / multi-year primary financial dataset consumed at runtime by `src/costco_revenue_model.mjs` and cross-referenced by `research/costco_revenue_architecture.md` and `wayfinder/tickets/ticket-001.md`..`ticket-005.md`. Must be recorded as `CHANGED` in `handoff/20261101T233014-881-kg7i/implementer-status.txt`.

## Read-Only Discovery Context (READ_ONLY_CONTEXT)

- `LANGUAGE.md` — Authoritative domain glossary (`{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`) and evaluation taxonomy.
- `assets/20261101T233014-881-kg7i/plan-sec-submissions-0000909832.json` — Verified SEC EDGAR filing index for `COSTCO WHOLESALE CORP /NEW` (`CIK 0000909832`).
- `assets/20261101T233014-881-kg7i/plan-sec-fy2024-10k-xbrl-extract.json` — Verified XBRL `us-gaap` facts extracted from Accession `0000909832-24-000049`.
- `assets/20261101T233014-881-kg7i/plan-sec-fy2024-10k-disclosures.json` — Verified verbatim Item 1, Item 2, Item 7, Item 8, Note 1, and Note 11 tables from `cost-20240901.htm`.
- Scanner reconnaissance artifacts listed in `handoff/20261101T233014-881-kg7i/plan-scan-1.txt` and `handoff/20261101T233014-881-kg7i/plan-scan-2.txt`.

## Resolution

### 1. Primary-Source Provenance & Architectural Reconciliations (`INV-ROOT-CAUSE-AGENCY-01`)

1. **Authoritative Filing Provenance:**
   - Primary source: *Costco Wholesale Corporation Form 10-K for the Fiscal Year Ended September 1, 2024* (52 weeks), filed with the SEC on `2024-10-09`, `CIK: 0000909832`, Accession Number `0000909832-24-000049`, primary document `cost-20240901.htm` (`https://www.sec.gov/Archives/edgar/data/909832/000090983224000049/cost-20240901.htm`).
   - Supporting earnings release context: *Costco Wholesale Corporation Form 8-K (Q4 & Fiscal Year 2024 Operating Results)*, filed `2024-09-26`, Accession Number `0000909832-24-000043`.
2. **Preopening Expenses Accounting Reconciliation (Note 1 & Item 8):**
   - In the FY2024 Form 10-K Consolidated Statements of Income, preopening expenses are folded directly into `Selling, general and administrative` (`$22,810M` in FY2024; retrospectively presented as `$21,590M` in FY2023 and `$19,779M` in FY2022), rather than reported as a separate income-statement line item. Consequently, the operating income identity holds with zero residual across all three fiscal years:
     - FY2024: `254453 - 222358 - 22810 === 9285`
     - FY2023: `242290 - 212586 - 21590 === 8114`
     - FY2022: `226954 - 199382 - 19779 === 7793`
3. **Geographic Segment Revenue Basis Reconciliation (Note 11 & Item 2):**
   - In Note 11 (*Segment Reporting*), Costco reports geographic segment top-line revenue on a consolidated `Total revenue` basis (`United States: $184,143M`, `Canada: $34,874M`, `Other International: $35,436M`, summing to `$254,453M`), paired with Item 2 (*Properties*) warehouse counts (`United States: 614`, `Canada: 108`, `Other International: 168`, summing to `890` warehouses at September 1, 2024). Because `{Net Sales}` constitute `98.10%` of Total Revenue across uniform warehouse operations, each segment entry in `geographic_segments` records `share_of_net_sales_pct` using the exact 2-decimal Note 11 segment share (`72.37`, `13.71`, `13.93`, summing to `100.01%`, well within `100.0% ± 0.5%`), alongside exact `total_revenue_usd_m`, `operating_income_usd_m`, `warehouse_count`, and an explicit `basis_note` documenting Note 11's consolidated segment revenue reporting basis.

### 2. Locked Schema & Exact Empirical Values for `data/costco_revenue_breakdown.json`

`data/costco_revenue_breakdown.json` must be valid UTF-8 JSON containing these 8 top-level keys and exact verified values:

1. **`company` (Object):**
   - `name`: `"Costco Wholesale Corporation"`
   - `ticker`: `"COST"`
   - `exchange`: `"NASDAQ"`
   - `cik`: `"0000909832"`
   - `fiscal_year`: `2024`
   - `fiscal_year_end`: `"2024-09-01"`
   - `fiscal_weeks`: `52`
   - `currency`: `"USD"`
   - `units`: `"millions"`
2. **`consolidated_income_statement` (Object — all integer USD millions from FY2024 Item 8):**
   - `net_sales_usd_m`: `249625`
   - `membership_fees_usd_m`: `4828`
   - `total_revenue_usd_m`: `254453`
   - `merchandise_costs_usd_m`: `222358`
   - `selling_general_and_administrative_usd_m`: `22810`
   - `operating_income_usd_m`: `9285`
   - `interest_expense_usd_m`: `169`
   - `interest_income_and_other_net_usd_m`: `624`
   - `income_before_taxes_usd_m`: `9740`
   - `provision_for_income_taxes_usd_m`: `2373`
   - `net_income_usd_m`: `7367`
3. **`historical_comparison` (Array of 3 Objects — FY2022, FY2023, FY2024 in chronological order):**
   - **FY2022** (`fiscal_year: 2022`, `fiscal_year_end: "2022-08-28"`, `fiscal_weeks: 52`): `net_sales_usd_m: 222730`, `membership_fees_usd_m: 4224`, `total_revenue_usd_m: 226954`, `merchandise_costs_usd_m: 199382`, `selling_general_and_administrative_usd_m: 19779`, `operating_income_usd_m: 7793`, `net_income_usd_m: 5844` (net income attributable to Costco after `$71M` noncontrolling interest prior to the Taiwan minority buyout; consolidated net income `$5,915M`).
   - **FY2023** (`fiscal_year: 2023`, `fiscal_year_end: "2023-09-03"`, `fiscal_weeks: 53`): `net_sales_usd_m: 237710`, `membership_fees_usd_m: 4580`, `total_revenue_usd_m: 242290`, `merchandise_costs_usd_m: 212586`, `selling_general_and_administrative_usd_m: 21590`, `operating_income_usd_m: 8114`, `net_income_usd_m: 6292`.
   - **FY2024** (`fiscal_year: 2024`, `fiscal_year_end: "2024-09-01"`, `fiscal_weeks: 52`): `net_sales_usd_m: 249625`, `membership_fees_usd_m: 4828`, `total_revenue_usd_m: 254453`, `merchandise_costs_usd_m: 222358`, `selling_general_and_administrative_usd_m: 22810`, `operating_income_usd_m: 9285`, `net_income_usd_m: 7367`.
4. **`merchandise_categories` (Array of 4 Objects — exact Note 11 Disaggregated Revenue figures):**
   -Note 11 allocates e-commerce and business center net sales directly to their respective merchandise categories, summing to exact FY2024 `{Net Sales}` (`101463 + 63973 + 34220 + 49969 === 249625`):
   - `foods_and_sundries`: `name: "Foods and Sundries"`, `share_of_net_sales_pct: 40.65`, `estimated_net_sales_usd_m: 101463`, `role_in_flywheel`: high-frequency staple repeat-visit anchor, `examples`: `["sundries", "dry grocery", "candy", "cooler", "freezer", "deli", "liquor", "tobacco"]`
   - `non_foods`: `name: "Non-Foods"`, `share_of_net_sales_pct: 25.63`, `estimated_net_sales_usd_m: 63973`, `role_in_flywheel`: treasure-hunt discretionary basket builder & Kirkland/brand value showcase, `examples`: `["major appliances", "small electronics", "health and beauty aids", "hardware", "lawn and garden", "sporting goods", "tires", "apparel", "furniture", "housewares", "jewelry"]`
   - `fresh_foods`: `name: "Fresh Foods"`, `share_of_net_sales_pct: 13.71`, `estimated_net_sales_usd_m: 34220`, `role_in_flywheel`: perishable weekly trip driver & high inventory-turn velocity engine, `examples`: `["meat", "produce", "service deli", "bakery"]`
   - `warehouse_ancillary_and_other`: `name: "Warehouse Ancillary and Other Businesses"`, `share_of_net_sales_pct: 20.02`, `estimated_net_sales_usd_m: 49969`, `role_in_flywheel`: high-frequency member trip & renewal magnet (gasoline alone ~12% of net sales across 719 stations), `examples`: `["gasoline", "pharmacy", "optical", "food court", "hearing aids", "tire installation", "costco travel"]`
   - Sum of `share_of_net_sales_pct`: `40.65 + 25.63 + 13.71 + 20.02 = 100.01` (`|100.01 - 100.0| = 0.01 <= 0.5`).
5. **`geographic_segments` (Array of 3 Objects — Note 11 & Item 2):**
   - `United States` (`segment_id: "united_states"`): `name: "United States"`, `share_of_net_sales_pct: 72.37`, `total_revenue_usd_m: 184143`, `operating_income_usd_m: 6217`, `warehouse_count: 614`, `employees: 219000`
   - `Canada` (`segment_id: "canada"`): `name: "Canada"`, `share_of_net_sales_pct: 13.71`, `total_revenue_usd_m: 34874`, `operating_income_usd_m: 1648`, `warehouse_count: 108`, `employees: 53000`
   - `Other International` (`segment_id: "other_international"`): `name: "Other International"`, `share_of_net_sales_pct: 13.93`, `total_revenue_usd_m: 35436`, `operating_income_usd_m: 1420`, `warehouse_count: 168`, `employees: 61000`
   - Warehouse sum: `614 + 108 + 168 === 890`. Share sum: `72.37 + 13.71 + 13.93 = 100.01` (`<= ±0.5`).
6. **`membership_metrics` (Object — Item 1 & Item 7):**
   - `gold_star_paid_members_m`: `63.7`
   - `business_paid_members_m`: `12.5`
   - `paid_household_members_m`: `76.2`
   - `household_cards_m`: `60.6`
   - `cardholders_total_m`: `136.8`
   - `executive_paid_members_m`: `35.4`
   - `executive_share_of_paid_members_pct`: `46.5`
   - `executive_share_of_worldwide_sales_pct`: `73.3`
   - `executive_reward_contra_revenue_usd_m`: `2804`
   - `renewal_rate_us_canada_pct`: `92.9`
   - `renewal_rate_worldwide_pct`: `90.5`
   - `gold_star_annual_fee_usd`: `65`
   - `gold_star_annual_fee_fy2024_prior_to_sept_2024_usd`: `60`
   - `executive_annual_fee_usd`: `130`
   - `executive_annual_fee_fy2024_prior_to_sept_2024_usd`: `120`
   - `executive_annual_reward_cap_usd`: `1250`
   - `fee_increase_effective_date`: `"2024-09-01"`
7. **`working_capital_balance_sheet` (Object — Item 8 Consolidated Balance Sheets & Note 1 as of September 1, 2024):**
   - `merchandise_inventories_usd_m`: `18647`
   - `accounts_payable_usd_m`: `19421`
   - `deferred_membership_fees_liability_usd_m`: `2501`
   - `prior_year_merchandise_inventories_usd_m`: `16651`
   - `prior_year_accounts_payable_usd_m`: `17483`
   - `prior_year_deferred_membership_fees_liability_usd_m`: `2337`
8. **`primary_sources` (Non-empty Array of Citation Objects):**
   - Must include at minimum:
     - `source_id: "sec-10k-fy2024"`, `title: "Costco Wholesale Corporation Form 10-K for the Fiscal Year Ended September 1, 2024"`, `filing_type: "Form 10-K"`, `cik: "0000909832"`, `accession_number: "0000909832-24-000049"`, `filing_date: "2024-10-09"`, `period_end: "2024-09-01"`, `url: "https://www.sec.gov/Archives/edgar/data/909832/000090983224000049/cost-20240901.htm"`, `items_referenced: ["Item 1 — Business", "Item 2 — Properties", "Item 7 — Management's Discussion and Analysis of Financial Condition and Results of Operations", "Item 8 — Consolidated Statements of Income & Consolidated Balance Sheets", "Note 1 — Summary of Significant Accounting Policies (Revenue Recognition)", "Note 11 — Segment Reporting (Disaggregated Revenue)"]`
     - `source_id: "sec-8k-q4-fy2024"`, `title: "Costco Wholesale Corporation Form 8-K: Fourth Quarter and Fiscal Year 2024 Operating Results"`, `filing_type: "Form 8-K"`, `cik: "0000909832"`, `accession_number: "0000909832-24-000043"`, `filing_date: "2024-09-26"`, `period_end: "2024-09-01"`, `url: "https://www.sec.gov/Archives/edgar/data/909832/000090983224000043/cost-20240926.htm"`, `items_referenced: ["Item 2.02 — Results of Operations and Financial Condition"]`
