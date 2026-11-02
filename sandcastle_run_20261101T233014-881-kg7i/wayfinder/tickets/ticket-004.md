---
title: Warehouse Ancillary Traffic Drivers, E-Commerce, Costco Logistics, and Emerging Retail Media
type: wayfinder:research
claimed_by: wayfinder-implementer
status: resolved
---

# Warehouse Ancillary Traffic Drivers, E-Commerce, Costco Logistics, and Emerging Retail Media

- **Classification:** `wayfinder:research`
- **Claimed by:** `wayfinder-implementer`
- **Status:** resolved

## Question

What quantitative and structural roles do Costco's Warehouse Ancillary departments (Gasoline, Pharmacy, Optical, Food Court, Hearing Aids, Tire Installation), e-commerce and digitally originated channels, Costco Logistics, Costco Next, Costco Travel, and co-branded Citibank Visa / retail media ecosystems play in driving warehouse visit frequency, renewal retention, and incremental revenue?

## Blocked By

- [Two-Pillar Revenue Engine and ASC 606 Recognition Mechanics](./ticket-001.md)
- [Merchandise Category Disaggregation, SKU Discipline, and Kirkland Signature Economics](./ticket-002.md)

## Resolution

Verified directly against *Costco Wholesale Corporation Form 10-K for the Fiscal Year Ended September 1, 2024* (`CIK: 0000909832`, Accession No. `0000909832-24-000049`, Item 1 — Business, pp. 3–4, Item 7 — Net Sales & Gross Margin, pp. 24–25, Note 1 — Revenue Recognition, p. 47, and Note 11 — Disaggregated Revenue, p. 61):

1. **Warehouse Ancillary Frequency Magnets (`$49,969M` / `20.02%` of FY2024 `{Net Sales}`):**
   - **Gasoline (`719` Stations; `~12%` of Total `{Net Sales}`):** Costco operated `719` member-only gas stations at FY2024 end (across all operating countries except Korea and Sweden), generating `~12%` of consolidated `{Net Sales}` (`~$30B`). In FY2024, physical gallon volume rose `~1%` (`+$400M` / `+17 bps` impact despite 52 vs. 53 weeks), partially offset by a `-3%` decline in average retail price per gallon (`-$917M` / `-39 bps`) (Item 1, p. 4; Item 7, p. 24). Rapid daily fuel turnover pulls cardholders onto club premises weekly and contributed positively to FY2024 ancillary gross margin (`+19 bps` ancillary & e-commerce gross margin lift per Item 7, p. 25).
   - **Healthcare & Service Anchors:** **Pharmacy** led total ancillary dollar sales growth (`+3%`, `+$1,276M`) in FY2024 (Item 7, p. 24), complemented by **Optical** dispensing centers, **Hearing Aid** centers, **Tire Installation** centers, and iconic value-anchored **Food Courts** that reinforce everyday price trust.
2. **E-Commerce (`~7%` of `{Net Sales}`), Digitally Originated Sales (`~9%`), Big-and-Bulky Logistics & Extended Digital Channels:**
   - Costco operates e-commerce sites in eight markets (U.S., Canada, Mexico, U.K., Korea, Taiwan, Japan, Australia) offering `9,000–10,000` SKUs. In FY2024, e-commerce represented **`~7%` of total `{Net Sales}`** (`~$17.5B`) and accelerated to **`+16%` comparable sales growth** (Item 1, p. 4; Item 7, p. 24).
   - **Digitally Originated Sales**—member purchases initiated via a digital device across e-commerce, business delivery, travel, and same-day grocery—represented **`~9%` of total `{Net Sales}`** (`~$22.5B`) (Item 1, p. 4).
   - Direct-to-member big-and-bulky appliance and furniture delivery (**Costco Logistics**, with fulfillment expensed inside `Merchandise costs` per Note 1), supplier-curated direct-to-member assortments (**Costco Next**), Business Center commercial delivery, and **Costco Travel** (vacation packages, car rentals, and cruises exclusively for members in the U.S., Canada, and U.K. per Item 1, p. 4) expand share-of-wallet without adding warehouse floor SKUs.
3. **Co-Branded Citibank Visa Royalties & Closed-Loop Retail Media Flywheel (Note 1, p. 47):**
   - **Citibank, N.A.** is the exclusive issuer of co-branded credit cards to U.S. members (alongside co-branded card programs in Canada and select international subsidiaries). Costco receives ongoing royalty consideration on member card spend outside Costco, using a portion to fund annual cardholder rebate certificates (issued in February, expiring December 31, redeemable at Costco warehouses, net of estimated breakage), lowering payment acceptance friction and enriching first-party member transaction data for digital merchandising and retail media monetization.

**Canonical Artifact Links:**
- Primary-Source Monograph (Sections 2.2 & 5): [research/costco_revenue_architecture.md](../../research/costco_revenue_architecture.md)
- Structured Financial Dataset (`merchandise_categories` -> `warehouse_ancillary_and_other`): [data/costco_revenue_breakdown.json](../../data/costco_revenue_breakdown.json)
