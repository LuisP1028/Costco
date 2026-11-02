---
id: ticket-002
title: Primary-Source SEC Form 10-K Research Monograph Architecture and Citation Contract (research/costco_revenue_architecture.md)
stage: implement
claimed_by: wayfinder-read-and-plan
status: resolved
---

# Primary-Source SEC Form 10-K Research Monograph Architecture and Citation Contract (`research/costco_revenue_architecture.md`)

- **Target Execution Stage:** `implement` (independent automated test suite authoring and execution reserved strictly for `tester` under `INV-NO-SELF-TEST-01`)
- **Claimed by:** `wayfinder-read-and-plan`
- **Status:** `resolved`

## Question

What exact 7-section monograph architecture, primary-source SEC Form 10-K item/note citations, ASC 606 revenue recognition mechanics, multi-year quantitative tables, domain vocabulary bindings (`LANGUAGE.md`), and Wayfinder cross-references must `research/costco_revenue_architecture.md` deliver to satisfy `AC-02` and the `researchAudit` contract in `src/costco_revenue_model.mjs`?

## Blocked By

- [Structured SEC Form 10-K Financial Dataset Schema and GAAP Conservation Contract (data/costco_revenue_breakdown.json)](./ticket-001.md)

## Mandatory Target Deliverables (MANDATORY_TARGET)

- `research/costco_revenue_architecture.md` — Create as a comprehensive, primary-source cited Markdown research monograph ($\ge 8,000$ UTF-8 bytes; target $14,000\text{–}22,000$ bytes of substantive analytical prose and verified SEC tables). Must be recorded as `CHANGED` in `handoff/20261101T233014-881-kg7i/implementer-status.txt`.

## Read-Only Discovery Context (READ_ONLY_CONTEXT)

- `LANGUAGE.md` — Authoritative domain glossary (`{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`).
- `assets/20261101T233014-881-kg7i/plan-sec-submissions-0000909832.json` — Verified SEC EDGAR filing metadata (`CIK 0000909832`).
- `assets/20261101T233014-881-kg7i/plan-sec-fy2024-10k-xbrl-extract.json` — Verified XBRL financial statement tags.
- `assets/20261101T233014-881-kg7i/plan-sec-fy2024-10k-disclosures.json` — Verbatim FY2024 Form 10-K (`0000909832-24-000049`) disclosures.
- Scanner reconnaissance artifacts listed in `handoff/20261101T233014-881-kg7i/plan-scan-1.txt` and `handoff/20261101T233014-881-kg7i/plan-scan-2.txt`.

## Resolution

### 1. Primary-Source Citation & Byte-Size Invariants

1. **Strict Primary-Source Grounding (`/research` Protocol):**
   - Every quantitative metric, accounting policy, disaggregation share, and working-capital ratio must explicitly cite Costco Wholesale Corporation's SEC Form 10-K for FY2024 ended September 1, 2024 (`CIK: 0000909832`, Accession `0000909832-24-000049`, filed October 9, 2024) by specific Item and Note (`Item 1 — Business`, `Item 2 — Properties`, `Item 7 — MD&A`, `Item 8 — Consolidated Financial Statements`, `Note 1 — Summary of Significant Accounting Policies`, `Note 11 — Segment Reporting`). Zero uncited secondary blog claims are permitted.
2. **Audit Anchor Presence (`researchAudit` Alignment):**
   - Document size must exceed `8,000` bytes (`Buffer.byteLength >= 8000`).
   - Must explicitly cite `0000909832`, `Form 10-K`, and `ASC 606`.
   - Must present exact comma-formatted FY2024 GAAP figures (`$254,453`, `$249,625`, `$4,828`, `$222,358`, `$22,810`, `$9,285`, `$7,367`, `$18,647`, `$19,421`, `$2,501`) and exact computed ratios (`98.10%`, `1.90%`, `10.92%`, `9.14%`, `52.00%`, `104.15%`, `92.9%`, `90.5%`, `46.5%`, `73.3%`).
   - Must synchronize every figure identically with `data/costco_revenue_breakdown.json`.

### 2. Locked 7-Section Monograph Blueprint

`research/costco_revenue_architecture.md` must implement these seven structured sections:

1. **Section 1: Executive Summary & Consolidated Revenue Identity ($R_{\text{total}} = R_{\text{net\_sales}} + R_{\text{membership\_fees}}$)**
   - Articulate Costco's two-pillar economic engine using [`LANGUAGE.md`](../LANGUAGE.md) terms (`{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`).
   - Present a complete multi-year Markdown comparison table across **FY2022** (52 weeks ended Aug 28, 2022), **FY2023** (53 weeks ended Sept 3, 2023), and **FY2024** (52 weeks ended Sept 1, 2024):
     - `{Net Sales}`: `$222,730M` (FY22) → `$237,710M` (FY23) → `$249,625M` (FY24, `98.10%` of Total Revenue)
     - `{Membership Fees}`: `$4,224M` (FY22) → `$4,580M` (FY23) → `$4,828M` (FY24, `1.90%` of Total Revenue)
     - Total Revenue: `$226,954M` (FY22) → `$242,290M` (FY23) → `$254,453M` (FY24)
     - Merchandise Costs: `$199,382M` (FY22) → `$212,586M` (FY23) → `$222,358M` (FY24)
     - Merchandise Gross Margin ($ and % of `{Net Sales}`): `$23,348M` / `10.48%` (FY22) → `$25,124M` / `10.57%` (FY23) → `$27,267M` / `10.92%` (FY24)
     - SG&A (inclusive of preopening costs per Note 1, $ and % of `{Net Sales}`): `$19,779M` / `8.88%` (FY22) → `$21,590M` / `9.08%` (FY23) → `$22,810M` / `9.14%` (FY24)
     - Operating Income: `$7,793M` (FY22) → `$8,114M` (FY23) → `$9,285M` (FY24)
     - Net Income Attributable to Costco: `$5,844M` (FY22) → `$6,292M` (FY23) → `$7,367M` (FY24)
   - Cite *Form 10-K (FY2024, CIK 0000909832), Item 7 (Results of Operations) and Item 8 (Consolidated Statements of Income)*.

2. **Section 2: `{Net Sales}` Disaggregation by Merchandise Category & Geographic Segment**
   - Present the exact Note 11 (*Disaggregated Revenue*) multi-year category table (FY2022–FY2024), highlighting that e-commerce and business center sales are allocated into their respective categories:
     - **Foods and Sundries**: `$101,463M` (`40.65%` of FY2024 `{Net Sales}`)
     - **Non-Foods**: `$63,973M` (`25.63%`)
     - **Fresh Foods**: `$34,220M` (`13.71%`)
     - **Warehouse Ancillary and Other Businesses**: `$49,969M` (`20.02%`)
     - **Total `{Net Sales}`**: `$249,625M` (`100.00%`)
   - Present the Note 11 (*Segment Reporting*) & Item 2 (*Properties*) geographic segment breakdown at September 1, 2024 (`890` total warehouses across `130.9M` sq ft):
     - **United States** (incl. Puerto Rico): `$184,143M` total revenue (`72.37%`), `$6,217M` operating income, `614` warehouses (`499` owned, `115` leased), `219,000` employees.
     - **Canada**: `$34,874M` total revenue (`13.71%`), `$1,648M` operating income, `108` warehouses (`91` owned, `17` leased), `53,000` employees.
     - **Other International** (Mexico, Japan, U.K., Korea, Australia, Taiwan, China, Spain, France, Iceland, New Zealand, Sweden): `$35,436M` total revenue (`13.93%`), `$1,420M` operating income, `168` warehouses (`113` owned, `55` leased), `61,000` employees.

3. **Section 3: `{Membership Fees}` Architecture, Tier Mix & ASC 606 Deferred Revenue Accounting**
   - Document FY2024 membership scale from Item 1 & Item 7: `76.2M` total paid members (`63.7M` Gold Star + `12.5M` Business incl. affiliates) plus `60.6M` household cards = `136.8M` total cardholders.
   - Analyze Executive Membership economics: `35.4M` paid Executive members (`46.5%` of paid members, generating `73.3%` of worldwide net sales).
   - Document trailing renewal rates (`92.9%` U.S. & Canada, `90.5%` worldwide, captured over the 7-to-18-month trailing window excluding Business affiliates) and the **September 1, 2024** U.S./Canada fee increase (`$60 → $65` Gold Star/Business, `$120 → $130` Executive, maximum annual 2% reward cap raised from `$1,000 → $1,250`).
   - Detail **ASC 606** accounting mechanics from Note 1 (*Revenue Recognition*):
     - Principal vs. agent gross recognition; point-of-sale recognition for warehouse purchases vs. shipment recognition for e-commerce/special orders; gross refund liability & recovery asset reserves; shop card deferral & breakage.
     - Ratable 12-month deferred revenue recognition of `{Membership Fees}` (`$2,501M` `Deferred membership fees` current liability at FY2024 end vs. `$2,337M` at FY2023 end).
     - Executive 2% reward accounted for as a **contra-revenue reduction against `{Net Sales}`** (net of estimated breakage), totaling `$2,804M` in FY2024 (`$2,576M` in FY2023; `$2,307M` in FY2022) with accrued member rewards recorded on the balance sheet—never booked as a marketing expense or netted against `{Membership Fees}`.

4. **Section 4: The `{Gross Margin Ceiling}`, SKU Discipline & Kirkland Signature Flywheel**
   - Quantify FY2024 merchandise gross margin: `($249,625M - $222,358M) / $249,625M = $27,267M / $249,625M = 10.92%` (`10.9232%`, up 35 bps from `10.57%` in FY2023), paired with disciplined SG&A of `$22,810M` (`9.14%` of `{Net Sales}`), leaving `$4,457M` (`48.00%` of consolidated operating income) in net merchandise operating contribution alongside `$4,828M` (`52.00%` of consolidated operating income) in `{Membership Fees}`.
   - Explain structural SKU curation (`< 4,000` active SKUs per warehouse vs. `9,000–10,000` online, compared with `30,000+` at conventional supermarkets), case/pallet floor presentation, direct manufacturer purchasing, and **Kirkland Signature** private-label penetration (lowering member prices below national brands while earning superior gross margin basis points and concentrating purchasing leverage per SKU).

5. **Section 5: Warehouse Ancillary Businesses, E-Commerce & Digital Monetization**
   - Quantify ancillary traffic magnets from Item 1 & Item 7: Gasoline (`719` gas stations at FY2024 end, representing `~12%` of total `{Net Sales}`, with FY2024 gallon volume up `~1%` offsetting `-3%` price/gallon deflation), Pharmacy, Optical, Food Court, Hearing Aids, and Tire Installation.
   - Document digital & omnichannel streams: E-commerce (`~7%` of FY2024 `{Net Sales}`, `+16%` comparable sales growth in FY2024) and total digitally originated sales (`~9%` of `{Net Sales}`, encompassing e-commerce, business delivery, Costco Travel, and same-day grocery), big-and-bulky fulfillment via Costco Logistics (Innovel acquisition integration), curated direct-to-member supplier marketplace via Costco Next, Costco Travel (U.S., Canada, U.K.), and co-branded Citi Visa / retail media ecosystem reinforcement.

6. **Section 6: Negative Working-Capital Cycle & Balance Sheet Cash Conversion**
   - Reconcile FY2024 Consolidated Balance Sheet working-capital lines (as of September 1, 2024, citing Item 8):
     - Merchandise Inventories: `$18,647M` (FY2023: `$16,651M`)
     - Accounts Payable: `$19,421M` (FY2023: `$17,483M`)
     - Accounts Payable to Inventory Ratio: `$19,421M / $18,647M = 104.15%` (`104.1508%`; FY2023: `105.00%`)
     - Merchandise Inventory Turnover: `$222,358M / (($16,651M + $18,647M) / 2) = 12.60x` annualized (`11.92x` on ending inventory; `~29–31` days inventory outstanding), meaning floor inventory converts to cash before trade payables fall due (`$774M` supplier-funded float excess over inventory), amplified by `$2,501M` of upfront cash collected in `Deferred membership fees`.

7. **Section 7: Primary-Source Bibliography & Wayfinder Ticket Cross-Reference**
   - Provide full bibliographic entries for Costco's FY2024 Form 10-K (`0000909832-24-000049`) and FY2024 Q4 Form 8-K (`0000909832-24-000043`).
   - Provide an explicit traceability table linking Sections 1–6 to [`wayfinder/map.md`](../wayfinder/map.md), all five resolved research tickets (`wayfinder/tickets/ticket-001.md` through `wayfinder/tickets/ticket-005.md`) using their full descriptive human-readable titles, [`data/costco_revenue_breakdown.json`](../data/costco_revenue_breakdown.json), and [`src/costco_revenue_model.mjs`](../src/costco_revenue_model.mjs).
