---
title: Two-Pillar Revenue Engine and ASC 606 Recognition Mechanics
type: wayfinder:research
claimed_by: wayfinder-implementer
status: resolved
---

# Two-Pillar Revenue Engine and ASC 606 Recognition Mechanics

- **Classification:** `wayfinder:research`
- **Claimed by:** `wayfinder-implementer`
- **Status:** resolved

## Question

How does Costco Wholesale Corporation (`NASDAQ: COST`, `CIK: 0000909832`) partition consolidated top-line revenue between `{Net Sales}` and `{Membership Fees}`, and what exact `ASC 606` accounting recognition policies govern warehouse point-of-sale purchases, e-commerce shipments, sales return reserves, 12-month deferred membership fee liabilities, and Executive 2% reward contra-revenue reductions?

## Blocked By

None (foundational primary-source revenue recognition and GAAP conservation ticket).

## Resolution

Verified directly against *Costco Wholesale Corporation Form 10-K for the Fiscal Year Ended September 1, 2024* (`CIK: 0000909832`, Accession No. `0000909832-24-000049`, Item 7, Item 8 — Consolidated Statements of Income & Consolidated Balance Sheets, and Note 1 — Summary of Significant Accounting Policies):

1. **Two-Pillar Consolidated Revenue Identity ($R_{\text{total}} = R_{\text{net\_sales}} + R_{\text{membership\_fees}}$):**
   - **FY2024 (52 weeks ended September 1, 2024):** `{Net Sales}` of **`$249,625M`** (`98.1026%`, or `98.10%` of total revenue) + `{Membership Fees}` of **`$4,828M`** (`1.8974%`, or `1.90%` of total revenue) = **`$254,453M`** Consolidated Total Revenue (Item 8, p. 35).
   - **Multi-Year Conservation:** Holds identically across FY2023 (`$237,710M + $4,580M = $242,290M`, 53 weeks) and FY2022 (`$222,730M + $4,224M = $226,954M`, 52 weeks).
2. **Principal Gross Recognition & Point-of-Transfer Timing (`ASC 606`, Note 1, p. 46):**
   - Costco acts as the **principal** for the majority of its transactions because it controls merchandise or services prior to transfer to the member, recognizing `{Net Sales}` on a **gross basis** (including gross shipping fees where applicable, net of sales taxes remitted to government agencies and estimated member returns).
   - **Warehouse Register Sales:** Recognized immediately at the **point of sale**.
   - **E-Commerce & Special Orders:** Recognized upon **shipment** to the member; direct-to-member shipping and handling fulfillment expenses are recorded as incurred inside `Merchandise costs`.
   - **Ancillary Warehouse Pickup & Stored-Value Shop Cards:** Ancillary orders awaiting pickup (`Deferred sales`) and non-expiring proprietary Costco shop cards (net of estimated breakage) are carried in `Other current liabilities` until pickup or redemption.
3. **Gross Sales Return Reserves (Note 1, p. 46):**
   - Costco estimates return reserves using historical merchandise return trends, reducing `{Net Sales}` and `Merchandise costs` accordingly while recording a **refund liability** (`Other current liabilities`) and an **asset for recovery** (`Other current assets`) on a gross basis on the Consolidated Balance Sheet.
4. **Ratable 12-Month Deferred `{Membership Fees}` Accounting (Note 1, p. 46):**
   - Annual membership fees are collected upfront, recorded in the current balance-sheet liability **`Deferred membership fees`** (**`$2,501M`** at September 1, 2024 vs. `$2,337M` at September 3, 2023), and recognized **ratably over the one-year membership period**, net of refunds.
5. **Executive 2% Reward Contra-Revenue Accounting (Note 1, pp. 46–47):**
   - Executive members earn a non-expiring `2%` reward on qualified purchases (capped at `$1,000/year` during FY2024; raised to `$1,250/year` effective September 1, 2024) redeemable at Costco warehouses.
   - Under `ASC 606`, Costco accounts for this reward—net of estimated non-redemption breakage—as a direct **contra-revenue reduction in `{Net Sales}`** (never as an SG&A marketing expense or offset to `{Membership Fees}`), totaling **`$2,804M` in FY2024**, `$2,576M` in FY2023, and `$2,307M` in FY2022, with the unpaid balance carried in `Accrued member rewards` (**`$2,435M`** at FY2024 end).

**Canonical Artifact Links:**
- Primary-Source Monograph (Sections 1 & 3.3): [research/costco_revenue_architecture.md](../../research/costco_revenue_architecture.md)
- Structured Financial Dataset (`consolidated_income_statement`, `historical_comparison`, `working_capital_balance_sheet`): [data/costco_revenue_breakdown.json](../../data/costco_revenue_breakdown.json)
