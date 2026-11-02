---
title: Gross Margin Ceiling, Negative Working-Capital Inventory Funding, and Operating Income Flywheel
type: wayfinder:research
claimed_by: wayfinder-implementer
status: resolved
---

# Gross Margin Ceiling, Negative Working-Capital Inventory Funding, and Operating Income Flywheel

- **Classification:** `wayfinder:research`
- **Claimed by:** `wayfinder-implementer`
- **Status:** resolved

## Question

What is the exact mathematical relationship connecting Costco's `{Gross Margin Ceiling}` (`10.92%` merchandise gross margin in FY2024), lean SG&A (`9.14%` of `{Net Sales}`), negative working-capital inventory funding (`Accounts Payable / Merchandise Inventories = 104.15%`), and the `{Operating Income Flywheel}` wherein `{Membership Fees}` (`1.90%` of revenue) generate `52.00%` of consolidated operating profit?

## Blocked By

- [Two-Pillar Revenue Engine and ASC 606 Recognition Mechanics](./ticket-001.md)
- [Merchandise Category Disaggregation, SKU Discipline, and Kirkland Signature Economics](./ticket-002.md)
- [Membership Fee Tier Structure, Renewal Rate Dynamics, and Fee Increase Cadence](./ticket-003.md)

## Resolution

Verified directly against *Costco Wholesale Corporation Form 10-K for the Fiscal Year Ended September 1, 2024* (`CIK: 0000909832`, Accession No. `0000909832-24-000049`, Item 7 — Gross Margin & SG&A, pp. 25–26, Item 8 — Consolidated Statements of Income & Consolidated Balance Sheets, pp. 35 & 37, and Note 1 — Merchandise Inventories, Merchandise Costs & SG&A, pp. 45–47):

1. **Adherence to the Structural `{Gross Margin Ceiling}` (`10.0% <= GM <= 11.5%`):**
   - **FY2024 Merchandise Gross Margin ($):** `$249,625M` `{Net Sales}` - `$222,358M` `Merchandise costs` = **`$27,267M`**.
   - **FY2024 Merchandise Gross Margin (%):** `($27,267M / $249,625M) * 100` = **`10.9232%`** (**`10.92%`**), compared with `10.57%` (`$25,124M`) in FY2023 and `10.48%` (`$23,348M`) in FY2022 (Item 7, p. 25).
   - **Lean SG&A Structure:** `Selling, general and administrative` expenses (which include warehouse preopening costs per Note 1, p. 47) totaled **`$22,810M`**, or **`9.1377%`** (**`9.14%`**) of `{Net Sales}` (`9.08%` in FY2023; `8.88%` in FY2022).
2. **Exact Decomposition of the `{Operating Income Flywheel}` (`$9,285M` FY2024 Operating Income):**
   - **Net Merchandise Operating Contribution:** `$27,267M` Merchandise Gross Margin - `$22,810M` SG&A = **`$4,457M`**, representing **`48.0022%`** (**`48.00%`**) of consolidated operating income (`1.79%` operating margin on `{Net Sales}`).
   - **`{Membership Fees}` Operating Contribution:** **`$4,828M`**, representing **`51.9978%`** (**`52.00%`**) of consolidated operating income despite constituting only **`1.8974%`** (**`1.90%`**) of consolidated total revenue (`$254,453M`).
   - **Consolidated Operating & Net Income Conservation:** `$4,457M + $4,828M = $9,285M` Operating Income; `$9,285M - $169M` Interest Expense `+ $624M` Interest Income & Other, Net `= $9,740M` Income Before Taxes; `$9,740M - $2,373M` Tax Provision (`24.36%` effective rate) `= $7,367M` Net Income.
3. **Negative Working-Capital Inventory Funding (`AP / Inventory = 104.15%`):**
   - At September 1, 2024, `Merchandise inventories` stood at **`$18,647M`** (`$13,625M` U.S. LIFO, `$1,895M` Canada FIFO, `$3,127M` Other International FIFO; FY2023 total `$16,651M`) against `Accounts payable` of **`$19,421M`** (FY2023: `$17,483M`) (Item 8, p. 37; Note 1, Schedule R24).
   - **Supplier Inventory Coverage Ratio:** `($19,421M / $18,647M) * 100` = **`104.1508%`** (**`104.15%`**; FY2023: `105.00%`), proving trade suppliers finance `100%` of Costco's floor inventory plus **`+$774M`** in excess cash float.
   - **Rapid Cash Conversion Velocity:** Average FY2024 inventory turnover reached **`12.60x`** (`$222,358M / $17,649M` average inventory, or `~28.97` days inventory outstanding vs. `~31.88` days payable outstanding on ending AP), augmented by **`$2,501M`** in upfront `Deferred membership fees` and **`$2,435M`** in `Accrued member rewards`.

**Canonical Artifact Links:**
- Primary-Source Monograph (Sections 4.1 & 6): [research/costco_revenue_architecture.md](../../research/costco_revenue_architecture.md)
- Structured Financial Dataset (`consolidated_income_statement`, `working_capital_balance_sheet`): [data/costco_revenue_breakdown.json](../../data/costco_revenue_breakdown.json)
