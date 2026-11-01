---
title: Membership Fee Tier Structure, Renewal Rate Dynamics, and Fee Increase Cadence
type: wayfinder:research
claimed_by: wayfinder-implementer
status: resolved
---

# Membership Fee Tier Structure, Renewal Rate Dynamics, and Fee Increase Cadence

- **Classification:** `wayfinder:research`
- **Claimed by:** `wayfinder-implementer`
- **Status:** resolved

## Question

How do Costco's paid membership tiers (Gold Star, Business, and Executive 2% Reward), renewal rate dynamics (`92.9%` U.S./Canada, `90.5%` worldwide), Executive sales concentration (`73.3%` of worldwide net sales), and the September 1, 2024 fee increase (`$60→$65` and `$120→$130`) compound recurring high-margin `{Membership Fees}`?

## Blocked By

- [Two-Pillar Revenue Engine and ASC 606 Recognition Mechanics](./ticket-001.md)

## Resolution

Verified directly against *Costco Wholesale Corporation Form 10-K for the Fiscal Year Ended September 1, 2024* (`CIK: 0000909832`, Accession No. `0000909832-24-000049`, Item 1 — Membership, pp. 4–5 and Item 7 — Membership Fees, p. 25):

1. **Paid Household Base & Total Cardholder Scale (FY2024 Item 1, p. 5):**
   - **Gold Star Paid Members:** **`63.7M`** (`63,700` thousand; up from `58.8M` in FY2023 and `54.0M` in FY2022).
   - **Business Paid Members (incl. Affiliates):** **`12.5M`** (`12,500` thousand; up from `12.2M` in FY2023 and `11.8M` in FY2022).
   - **Total Paid Members:** **`76.2M`** (`+7.32%` YoY).
   - **Free Household Cards:** **`60.6M`** (1 bundled household card per paid membership), bringing **Total Cardholders Worldwide** to **`136.8M`** (up from `127.9M` in FY2023 and `118.9M` in FY2022).
2. **Executive Membership Penetration & Sales Concentration (Item 1, pp. 4–5):**
   - Paid Executive members reached **`35.4M`** in FY2024 (up from `32.3M` in FY2023 and `29.1M` in FY2022), representing **`46.5%`** (`46.46%`) of total paid members while generating approximately **`73.3%` of worldwide `{Net Sales}`**.
   - Because Executive members earn a `2%` annual reward certificate redeemable inside Costco warehouses, higher basket sizes self-select into the `$130/year` tier, raising switching costs and locking in renewal rates.
3. **Renewal Rate Dynamics & Trailing Measurement Methodology (Item 1, p. 4 & Item 7, p. 25):**
   - At FY2024 end, member renewal rates reached **`92.9%` in the U.S. and Canada** and **`90.5%` worldwide**, explicitly buoyed by rising Executive tier penetration.
   - Costco computes renewal rates (excluding Business affiliates) as a trailing calculation capturing renewals during the `7-to-18-month` window prior to the reporting date, reflecting that the majority of renewing members renew within six months of their expiration date.
4. **September 1, 2024 U.S. & Canada Fee Increase & Two-Year Deferred Revenue Lift (Item 1, p. 5 & Item 7, p. 25):**
   - Effective **September 1, 2024**, U.S. and Canada annual fees increased from **`$60` to `$65`** for Gold Star, Business, and Business affiliates (`+$5/year`), and from **`$120` to `$130`** (`$65` base + `$65` upgrade; `+$10/year`) for Executive Membership, alongside raising the maximum annual 2% reward cap from **`$1,000` to `$1,250`**.
   - Under ratable 12-month deferred revenue accounting (`ASC 606`), Item 7 discloses that these fee changes are expected to add approximately **`$370M`** in incremental membership fee revenue over FY2025–FY2026 (`~$190M` in FY2025, weighted toward the second half of FY2025).

**Canonical Artifact Links:**
- Primary-Source Monograph (Sections 3.1 & 3.2): [research/costco_revenue_architecture.md](../../research/costco_revenue_architecture.md)
- Structured Financial Dataset (`membership_metrics`, `consolidated_income_statement`): [data/costco_revenue_breakdown.json](../../data/costco_revenue_breakdown.json)
