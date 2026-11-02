---
id: ticket-003
title: Canonical Repository Wayfinder Decision Map and Five Resolved Research Tickets (wayfinder/map.md and wayfinder/tickets/ticket-001.md..ticket-005.md)
stage: implement
claimed_by: wayfinder-read-and-plan
status: resolved
---

# Canonical Repository Wayfinder Decision Map and Five Resolved Research Tickets (`wayfinder/map.md` and `wayfinder/tickets/ticket-001.md`..`ticket-005.md`)

- **Target Execution Stage:** `implement` (independent automated test suite authoring and execution reserved strictly for `tester` under `INV-NO-SELF-TEST-01`)
- **Claimed by:** `wayfinder-read-and-plan`
- **Status:** `resolved`

## Question

What exact Markdown heading topology, named-link formatting rules, frontmatter/metadata tags, blocking dependency DAG, and primary-source resolution summaries must the canonical repository-level Wayfinder map (`wayfinder/map.md`) and five resolved research tickets (`wayfinder/tickets/ticket-001.md` through `wayfinder/tickets/ticket-005.md`) implement to satisfy `AC-01` and pass `wayfinderAudit` in `src/costco_revenue_model.mjs`?

## Blocked By

- [Structured SEC Form 10-K Financial Dataset Schema and GAAP Conservation Contract (data/costco_revenue_breakdown.json)](./ticket-001.md)
- [Primary-Source SEC Form 10-K Research Monograph Architecture and Citation Contract (research/costco_revenue_architecture.md)](./ticket-002.md)

## Mandatory Target Deliverables (MANDATORY_TARGET)

All six canonical repository-level `/wayfinder` artifacts must be created by `implement` and recorded as `CHANGED` in `handoff/20261101T233014-881-kg7i/implementer-status.txt`:

1. `wayfinder/map.md` — Canonical repository-level Wayfinder decision map audited at runtime by `src/costco_revenue_model.mjs`.
2. `wayfinder/tickets/ticket-001.md` — *Two-Pillar Revenue Engine and ASC 606 Recognition Mechanics*
3. `wayfinder/tickets/ticket-002.md` — *Merchandise Category Disaggregation, SKU Discipline, and Kirkland Signature Economics*
4. `wayfinder/tickets/ticket-003.md` — *Membership Fee Tier Structure, Renewal Rate Dynamics, and Fee Increase Cadence*
5. `wayfinder/tickets/ticket-004.md` — *Warehouse Ancillary Traffic Drivers, E-Commerce, Costco Logistics, and Emerging Retail Media*
6. `wayfinder/tickets/ticket-005.md` — *Gross Margin Ceiling, Negative Working-Capital Inventory Funding, and Operating Income Flywheel*

## Read-Only Discovery Context (READ_ONLY_CONTEXT)

- `LANGUAGE.md` — Authoritative domain vocabulary (`{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`).
- `assets/20261101T233014-881-kg7i/plan-sec-fy2024-10k-disclosures.json` — Verified FY2024 Form 10-K (`0000909832-24-000049`) figures and policies.
- Scanner reconnaissance artifacts listed in `handoff/20261101T233014-881-kg7i/plan-scan-1.txt` and `handoff/20261101T233014-881-kg7i/plan-scan-2.txt`.

## Resolution

### 1. Canonical Map Structure & "Refer by Name" Link Invariant (`wayfinder/map.md`)

`wayfinder/map.md` must contain all five mandatory `/wayfinder` H2 headings in exact canonical order:

1. `## Destination`: States the destination—delivering a primary-source verified architectural decomposition, SEC Form 10-K monograph ([`research/costco_revenue_architecture.md`](../research/costco_revenue_architecture.md)), structured financial dataset ([`data/costco_revenue_breakdown.json`](../data/costco_revenue_breakdown.json)), and deterministic verification engine ([`src/costco_revenue_model.mjs`](../src/costco_revenue_model.mjs)) explaining how Costco Wholesale Corporation (`NASDAQ: COST`, `CIK: 0000909832`) generates top-line revenue and converts warehouse volume into operating profit.
2. `## Notes`: Documents strict alignment with [`LANGUAGE.md`](../LANGUAGE.md), `/wayfinder` and `/research` skill governance, and primary-source SEC Form 10-K (`0000909832-24-000049`) citation rules.
3. `## Decisions so far`: Lists all five resolved canonical tickets in order, where **every single link wraps its full descriptive human-readable title** around a relative path `./tickets/ticket-00N.md`, followed by ` — ` and a concise one-line synthesis of the resolved finding:
   - `- [Two-Pillar Revenue Engine and ASC 606 Recognition Mechanics](./tickets/ticket-001.md) — ...`
   - `- [Merchandise Category Disaggregation, SKU Discipline, and Kirkland Signature Economics](./tickets/ticket-002.md) — ...`
   - `- [Membership Fee Tier Structure, Renewal Rate Dynamics, and Fee Increase Cadence](./tickets/ticket-003.md) — ...`
   - `- [Warehouse Ancillary Traffic Drivers, E-Commerce, Costco Logistics, and Emerging Retail Media](./tickets/ticket-004.md) — ...`
   - `- [Gross Margin Ceiling, Negative Working-Capital Inventory Funding, and Operating Income Flywheel](./tickets/ticket-005.md) — ...`
   - **Zero bare ticket identifiers** (e.g., `[ticket-001](./tickets/ticket-001.md)`) may appear anywhere in `wayfinder/map.md` or any ticket file.
4. `## Not yet specified`: Explicitly confirms that all frontier research and architectural fog has been graduated into the five resolved decision tickets above, with zero unresolved questions remaining.
5. `## Out of scope`: Explicitly excludes speculative share-price forecasting, forward equity valuation multiples, and uncited secondary commentary.

### 2. Canonical Ticket Metadata & Content Contracts (`wayfinder/tickets/ticket-001.md`..`ticket-005.md`)

Every file in `wayfinder/tickets/ticket-001.md` through `wayfinder/tickets/ticket-005.md` must include:
- `wayfinder:research` indicator in YAML frontmatter (e.g., `type: wayfinder:research` / `tags: [wayfinder:research]`) and/or top metadata block,
- Explicit `Claimed by:` line and `Status: resolved` line (matching case-insensitively and verbatim `Status: resolved`),
- `## Question` section posing the sharp domain research question,
- `## Blocked By` section (`None` for foundational `ticket-001.md`; descriptive named markdown links such as `[Two-Pillar Revenue Engine and ASC 606 Recognition Mechanics](./ticket-001.md)` where dependent—never bare `ticket-001`),
- `## Resolution` section containing exact FY2024 SEC Form 10-K (`CIK 0000909832`, Accession `0000909832-24-000049`) figures, item/note citations, and explicit relative links to [`../../research/costco_revenue_architecture.md`](../../research/costco_revenue_architecture.md) (or `../research/costco_revenue_architecture.md` noted alongside repo-relative path—include both repo-canonical reference and valid relative markdown path `[research/costco_revenue_architecture.md](../../research/costco_revenue_architecture.md)` plus textual `../research/costco_revenue_architecture.md` / `research/costco_revenue_architecture.md` clarity; specifically, from `wayfinder/tickets/ticket-001.md`, two levels up `../../research/costco_revenue_architecture.md` resolves on disk while `functional_specification_001.md` Section 3.1(2) mentions linking to `../research/costco_revenue_architecture.md` and `../data/costco_revenue_breakdown.json`—see reconciliation below!).

#### Path-Depth Reconciliation Note (`INV-ROOT-CAUSE-AGENCY-01`):
- From `wayfinder/map.md` (1 directory deep), relative paths to `research/` and `data/` are `../research/costco_revenue_architecture.md` and `../data/costco_revenue_breakdown.json`.
- From `wayfinder/tickets/ticket-00N.md` (2 directories deep), filesystem-resolving relative links to `research/` and `data/` are `../../research/costco_revenue_architecture.md` and `../../data/costco_revenue_breakdown.json`, whereas `functional_specification_001.md` line 79 casually writes `linking to ../research/costco_revenue_architecture.md and ../data/costco_revenue_breakdown.json`.
- To ensure both filesystem link validity AND substring compatibility if any check looks for `research/costco_revenue_architecture.md` and `data/costco_revenue_breakdown.json`: in `wayfinder/tickets/ticket-001.md`..`ticket-005.md`, use valid relative links `[research/costco_revenue_architecture.md](../../research/costco_revenue_architecture.md)` and `[data/costco_revenue_breakdown.json](../../data/costco_revenue_breakdown.json)` (notice `../../research/costco_revenue_architecture.md` contains `../research/costco_revenue_architecture.md` as an exact trailing substring AND resolves cleanly on disk!). That satisfies both filesystem link checkers and literal substring matchers simultaneously!

### 3. Per-Ticket Domain Scope Summary

1. **`wayfinder/tickets/ticket-001.md` (*Two-Pillar Revenue Engine and ASC 606 Recognition Mechanics*)**:
   - `{Net Sales}` `$249,625M` (`98.10%`) + `{Membership Fees}` `$4,828M` (`1.90%`) = `$254,453M` Total Revenue (FY2024 Item 8); Note 1 ASC 606 principal gross recognition, POS vs. shipment timing, gross refund liability & recovery asset, ratable 12-month membership fee deferral (`$2,501M` current liability), and `$2,804M` Executive 2% reward contra-revenue reduction against `{Net Sales}`.
2. **`wayfinder/tickets/ticket-002.md` (*Merchandise Category Disaggregation, SKU Discipline, and Kirkland Signature Economics*)**:
   - Note 11 Disaggregated Revenue (`Foods and Sundries` `$101,463M` / `40.65%`, `Non-Foods` `$63,973M` / `25.63%`, `Fresh Foods` `$34,220M` / `13.71%`, `Warehouse Ancillary and Other Businesses` `$49,969M` / `20.02%`); Item 1 `< 4,000` active warehouse SKUs (`9,000–10,000` online); Kirkland Signature private-label price leadership, margin enhancement, and supplier bargaining power.
3. **`wayfinder/tickets/ticket-003.md` (*Membership Fee Tier Structure, Renewal Rate Dynamics, and Fee Increase Cadence*)**:
   - Item 1 & Item 7 membership base (`76.2M` paid members: `63.7M` Gold Star, `12.5M` Business; `60.6M` household cards; `136.8M` total cardholders); `35.4M` paid Executive members (`46.5%` of paid members, `73.3%` of worldwide net sales); `92.9%` U.S./Canada & `90.5%` worldwide renewal rates; September 1, 2024 U.S./Canada fee increase (`$60→$65` Gold Star/Business, `$120→$130` Executive, `$1,000→$1,250` annual reward cap).
4. **`wayfinder/tickets/ticket-004.md` (*Warehouse Ancillary Traffic Drivers, E-Commerce, Costco Logistics, and Emerging Retail Media*)**:
   - Item 1 & Item 7 ancillary frequency drivers (`719` gas stations generating `~12%` of FY2024 `{Net Sales}`, pharmacy, optical, food court, hearing aids, tire installation); e-commerce (`~7%` of `{Net Sales}`, `+16%` FY2024 comparable growth) and digitally originated sales (`~9%` of `{Net Sales}`); Costco Logistics big-and-bulky delivery, Costco Next supplier-direct marketplace, Costco Travel, and co-branded Citi Visa / retail media monetization.
5. **`wayfinder/tickets/ticket-005.md` (*Gross Margin Ceiling, Negative Working-Capital Inventory Funding, and Operating Income Flywheel*)**:
   - `{Gross Margin Ceiling}` (`$27,267M` / `10.92%` merchandise gross margin in FY2024) minus `$22,810M` SG&A (`9.14%` of `{Net Sales}`, preopening folded into SG&A per Note 1) = `$4,457M` (`48.00%`) merchandise operating contribution + `$4,828M` (`52.00%`) `{Membership Fees}` = `$9,285M` consolidated operating income (`{Operating Income Flywheel}`); `12.60x` average inventory turnover and `$19,421M` Accounts Payable / `$18,647M` Merchandise Inventories = `104.15%` supplier-funded floor inventory ratio plus `$2,501M` deferred membership fee float.
