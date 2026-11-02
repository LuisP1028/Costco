---
title: Merchandise Category Disaggregation, SKU Discipline, and Kirkland Signature Economics
type: wayfinder:research
claimed_by: wayfinder-implementer
status: resolved
---

# Merchandise Category Disaggregation, SKU Discipline, and Kirkland Signature Economics

- **Classification:** `wayfinder:research`
- **Claimed by:** `wayfinder-implementer`
- **Status:** resolved

## Question

How do Costco's FY2024 `{Net Sales}` (`$249,625M`) disaggregate across core and ancillary merchandise categories and reportable geographic segments, and how do limited warehouse SKU curation (`< 4,000` active SKUs) and **Kirkland Signature** private-label penetration drive supplier purchasing power and category velocity?

## Blocked By

- [Two-Pillar Revenue Engine and ASC 606 Recognition Mechanics](./ticket-001.md)

## Resolution

Verified directly against *Costco Wholesale Corporation Form 10-K for the Fiscal Year Ended September 1, 2024* (`CIK: 0000909832`, Accession No. `0000909832-24-000049`, Item 1 — Business, Item 2 — Properties, and Item 8, Note 11 — Segment Reporting):

1. **Note 11 Disaggregated `{Net Sales}` by Merchandise Category (FY2024 = `$249,625M`):**
   - Note 11 (*Disaggregated Revenue*, p. 61) allocates e-commerce and business center sales directly into their applicable merchandise categories, reconciling to `100.00%` of consolidated `{Net Sales}` (`100.01%` sum of 2-decimal rounded shares):
     - **Foods and Sundries:** **`$101,463M`** (**`40.65%`** of `{Net Sales}`; FY2023 `$96,175M`; FY2022 `$85,629M`) — sundries, dry grocery, candy, cooler, freezer, deli, liquor, and tobacco; high-frequency staple repeat-visit anchor.
     - **Non-Foods:** **`$63,973M`** (**`25.63%`** of `{Net Sales}`; FY2023 `$60,865M`; FY2022 `$61,100M`) — major appliances, small electronics, health & beauty aids, hardware, lawn & garden, sporting goods, tires, toys & seasonal, office supplies, automotive, apparel, furniture, domestics, housewares, special order kiosk, and jewelry; discretionary "treasure-hunt" basket builder.
     - **Fresh Foods:** **`$34,220M`** (**`13.71%`** of `{Net Sales}`; FY2023 `$31,977M`; FY2022 `$29,527M`) — meat, produce, service deli, and bakery; perishable weekly trip driver with rapid turnover.
     - **Warehouse Ancillary and Other Businesses:** **`$49,969M`** (**`20.02%`** of `{Net Sales}`; FY2023 `$48,693M`; FY2022 `$46,474M`) — gasoline, pharmacy, optical, food court, hearing aids, tire installation, and Costco Travel.
2. **Geographic Segment & Warehouse Footprint Disaggregation (Note 11 & Item 2, `890` Warehouses):**
   - **United States (incl. Puerto Rico):** `$184,143M` total revenue (**`72.37%`**), `$6,217M` operating income, **`614` warehouses** (`499` owned, `115` leased; `91.1M` sq ft; `219,000` employees).
   - **Canada:** `$34,874M` total revenue (**`13.71%`**), `$1,648M` operating income, **`108` warehouses** (`91` owned, `17` leased; `15.5M` sq ft; `53,000` employees).
   - **Other International (12 countries):** `$35,436M` total revenue (**`13.93%`**), `$1,420M` operating income, **`168` warehouses** (`113` owned, `55` leased; `24.3M` sq ft; `61,000` employees across Mexico `40`, Japan `35`, U.K. `29`, Korea `19`, Australia `15`, Taiwan `14`, China `7`, Spain `4`, France `2`, Iceland `1`, New Zealand `1`, Sweden `1`).
3. **SKU Discipline (`< 4,000` Active Warehouse SKUs) & Pallet-Floor Economics (Item 1, p. 4):**
   - Core warehouses carry **fewer than `4,000` active SKUs** (`9,000–10,000` SKUs online), compared to `30,000+` SKUs at traditional supermarkets. Concentrating `$249,625M` of `{Net Sales}` onto `< 4,000` warehouse SKUs generates `>$62M` of annual purchasing volume per average SKU, maximizing vendor consideration discounts (Note 1, p. 47) and enabling case/pallet floor presentation directly from cross-docking depots (`31.9M` sq ft).
4. **Kirkland Signature Private-Label Flywheel (Item 1, p. 6 & Item 1A, p. 11):**
   - Kirkland Signature items (supported by Costco's own meat, bakery, optical, roastery, and packaging facilities) are priced **lower than national brands** while **earning higher gross margins** and representing a growing share (`~30%+`) of overall sales, enforcing supplier pricing discipline across every aisle.

**Canonical Artifact Links:**
- Primary-Source Monograph (Sections 2, 4.2 & 4.3): [research/costco_revenue_architecture.md](../../research/costco_revenue_architecture.md)
- Structured Financial Dataset (`merchandise_categories`, `geographic_segments`): [data/costco_revenue_breakdown.json](../../data/costco_revenue_breakdown.json)
