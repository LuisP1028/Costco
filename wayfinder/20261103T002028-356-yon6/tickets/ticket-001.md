---
id: ticket-001
title: Corporate Business Visual Design System, Sticky Scroll-Spy Table of Contents, and Dreamcore Elimination (index.html)
stage: implement
claimed_by: wayfinder-read-and-plan
status: resolved
---

# Corporate Business Visual Design System, Sticky Scroll-Spy Table of Contents, and Dreamcore Elimination (`index.html`)

- **Target Execution Stage:** `implement` (independent automated acceptance test suite authoring and execution reserved strictly for `tester` under `INV-NO-SELF-TEST-01`)
- **Claimed by:** `wayfinder-read-and-plan`
- **Status:** `resolved`

## Question

How must `index.html` eliminate every residual Dreamcore / Y2K liminal visual and audio artifact (`#seraphic-watcher-btn`, `.vhs-scanlines`, `#film-grain-overlay`, `#dream-sky-canvas`, `meadow_portal.jpg`, `poolroom_sanctuary.jpg`, `sky_staircase.jpg`, `tape hum`, `#stuck-clock`) and establish an authoritative Corporate Business & Investor Relations layout system featuring Costco Wholesale Corporation's institutional brand palette (`#E31837` Costco Crimson, `#005DAA` Costco Executive Navy, `#FFFFFF` / `#F8FAFC` surfaces, `#0F172A` typography), an Executive KPI Scorecard (`#section-executive-summary`), and a persistent sticky scroll-spy Table of Contents (`#table-of-contents`) linking to all report sections and all 5 sequential revenue steps?

## Blocked By

None (foundational corporate layout, design token, and navigation architecture ticket).

## Mandatory Target Deliverables (MANDATORY_TARGET)

- `index.html` — Replace the entire retro Dreamcore implementation (`L1–L2407`) with a self-contained, zero-network-dependency Corporate Executive Revenue Architecture single-page report. Must be recorded as `CHANGED` in `handoff/20261103T002028-356-yon6/implementer-status.txt`.

## Read-Only Discovery Context (READ_ONLY_CONTEXT)

- `LANGUAGE.md` — Authoritative evaluation parameters (`{errors}`, `{correctness}`, `{functionality}`, `{correct required outputs}`, `{sufficient}`, `{insufficient}`) and domain vocabulary (`{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`).
- `functional_specification_002.md` — Sections 1, 2, 3.1, 3.2, 4, 5, and 6 (`AC-02`).
- `data/costco_revenue_breakdown.json` — Canonical SEC Form 10-K financial dataset (`CIK: 0000909832`, Accession `0000909832-24-000049`).
- `wayfinder/tickets/ticket-006.md` — Resolved research decision ticket specifying the corporate design architecture and Table of Contents.
- `assets/20261103T002028-356-yon6/plan-corporate-polar-and-5step-contract.json` — Verified design token, DOM ID, prohibited Dreamcore token, and polar/step data contract.
- Scanner reconnaissance artifacts in `wayfinder/20261103T002028-356-yon6/plan-scan-1-report.md`, `wayfinder/20261103T002028-356-yon6/plan-scan-2-report.md`, `assets/20261103T002028-356-yon6/plan-scan-1-*`, and `assets/20261103T002028-356-yon6/plan-scan-2-*`.

## Resolution

### 1. Complete Elimination of Dreamcore / Liminal Artifacts (`INV-ROOT-CAUSE-AGENCY-01`)

`index.html` must completely purge all Dreamcore CSS rules, DOM elements, image tags, Web Audio synthesizers, and JavaScript state objects identified in the static scan of `index.html` (`L1–L2407`):
1. **Prohibited Substrings & Selectors (Zero Occurrences Permitted Anywhere in `index.html`, Including Comments):**
   - `dreamcore`, `seraphic`, `vhs-scanlines`, `film-grain-overlay`, `meadow_portal.jpg`, `poolroom_sanctuary.jpg`, `sky_staircase.jpg`, `tape hum`, `stuck-clock`, `dream-sky-canvas`, `half-asleep`, `floating-echo-layer`, `liminal-topbar`, `DreamAudioEngine`, `animateDreamscape`, `DREAM_STRATA`, `DRIFT_WHISPERS`, `ECHO_PHRASES`.
2. **Zero External Network Requests (`0` Network Calls):**
   - `index.html` must not load external web fonts, CDN scripts, or external images. All styling, corporate SVG icons, interactive SVG/Canvas polar charts, and embedded `COSTCO_DATA` / `WAYFINDER_TICKETS` JSON structures must be 100% self-contained inside `index.html`.

### 2. Institutional Corporate Business Design System & Top Header Bar

1. **CSS Custom Properties & Color Palette (`:root`):**
   - Page Canvas Background: `#F8FAFC` (`--bg-canvas: #F8FAFC`)
   - Elevated Card Surface: `#FFFFFF` (`--bg-card: #FFFFFF`)
   - Subtle Data Well / Table Header Surface: `#F1F5F9` (`--bg-well: #F1F5F9`)
   - Structural Hairline Border (`1px solid`): `#E2E8F0` (`--border-subtle: #E2E8F0`) and `#CBD5E1` (`--border-strong: #CBD5E1`)
   - Primary Typography Ink: `#0F172A` (`--ink-primary: #0F172A`)
   - Secondary Body Ink: `#334155` (`--ink-secondary: #334155`)
   - Muted Caption / Axis Ink: `#64748B` (`--ink-muted: #64748B`)
   - Costco Wholesale Crimson: `#E31837` (`--costco-crimson: #E31837`)
   - Costco Executive Navy: `#005DAA` (`--costco-navy: #005DAA`)
   - Analytical Polar Category Accents: Emerald `#059669`, Amber `#D97706`, Teal `#0D9488`, Indigo `#4F46E5`.
2. **Typography & Numeric Alignment:**
   - Primary UI & Narrative Font Stack: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
   - Financial & Monospace Font Stack: `"JetBrains Mono", "SFMono-Regular", Menlo, Consolas, monospace`
   - All numeric tables, KPI values, percentages, basis points, and polar chart readouts must enforce `font-variant-numeric: tabular-nums`.
3. **Institutional Top Header Bar (`<header class="corporate-header">`):**
   - Displays entity identification: `COSTCO WHOLESALE CORPORATION · NASDAQ: COST · CIK: 0000909832`
   - Displays filing basis: `FY2024 SEC Form 10-K (Accession 0000909832-24-000049 · 52 Weeks Ended September 1, 2024)`
   - Displays deterministic verification badge: `STATUS: VERIFIED · 0 NETWORK CALLS`
   - Renders quick-jump navigation buttons to `#table-of-contents`, `#section-polar-graphs`, `#section-five-steps`, `#section-gaap-model`, and `#section-wayfinder-audit`.

### 3. Sticky Scroll-Spy Table of Contents (`#table-of-contents`) & Executive Summary (`#section-executive-summary`)

1. **Sticky Table of Contents (`<nav id="table-of-contents" aria-label="Table of Contents">`):**
   - Rendered in a sticky left-hand sidebar on desktop viewports (`>= 1024px`, `position: sticky; top: 80px`) and a clean collapsible/accessible top index card on mobile/tablet viewports (`< 1024px`).
   - Must contain structured, numbered anchor links (`<a href="#...">`) to every major section, polar chart sub-anchor, and each of the 5 sequential revenue steps:
     - `01. Executive Summary & GAAP Scorecard` → `href="#section-executive-summary"`
     - `02. Polar Revenue Disaggregation Suite` → `href="#section-polar-graphs"`
       - `2.1 Merchandise Category Polar Rose ($249.6B)` → `href="#polar-chart-categories"`
       - `2.2 Geographic Segment Polar Chart (890 Warehouses)` → `href="#polar-chart-geography"`
       - `2.3 Revenue vs. Operating Profit Polar Asymmetry` → `href="#polar-chart-flywheel"`
     - `03. How Costco Generates Revenue in 5 Steps` → `href="#section-five-steps"`
       - `Step 1: Paid Membership & Executive Tier Architecture` → `href="#step-1"`
       - `Step 2: <4,000 SKU Curation & Kirkland Signature Scale` → `href="#step-2"`
       - `Step 3: Ancillary Traffic Magnets & Digital Logistics` → `href="#step-3"`
       - `Step 4: 10.92% Gross Margin Ceiling & 104.15% AP Float` → `href="#step-4"`
       - `Step 5: Operating Income Flywheel & Net Profit Conversion` → `href="#step-5"`
     - `04. Multi-Year GAAP Waterfall & Sensitivity Simulator` → `href="#section-gaap-model"`
     - `05. Primary-Source SEC 10-K & Wayfinder Decision Audit` → `href="#section-wayfinder-audit"`
   - **Interactive Scroll-Spy & Click Behavior:**
     - Clicking any link in `#table-of-contents` smoothly scrolls to the target element, updates the active TOC link (`classList.toggle("is-active", ...)` and `aria-current="location"`), and if the target is `#step-1`..`#step-5`, synchronizes the active step in the 5-Step Walkthrough stepper controller.
     - An `IntersectionObserver` (with scroll listener fallback) tracks the currently visible section/step and updates `.is-active` and `aria-current="location"` inside `#table-of-contents` in real time.
2. **Section 1 — Executive Summary & FY2024 GAAP KPI Scorecard (`<section id="section-executive-summary">`):**
   - Renders the institutional executive thesis and a 6-card KPI Scorecard grid with primary-source SEC Form 10-K citations:
     1. **Consolidated Total Revenue:** `$254,453M` (`+5.02%` YoY; `$249,625M` `{Net Sales}` + `$4,828M` `{Membership Fees}`)
     2. **`{Net Sales}` (98.10% Share):** `$249,625M` (`<4,000` active warehouse SKUs across `890` warehouses worldwide)
     3. **`{Membership Fees}` (1.90% Share):** `$4,828M` (`52.00%` of consolidated operating income; `$2,501M` deferred fee liability)
     4. **`{Gross Margin Ceiling}`:** `10.92%` (`$27,267M` merchandise gross margin vs. `9.14%` / `$22,810M` SG&A)
     5. **Member Renewal Rate:** `92.9%` U.S./Canada (`90.5%` worldwide; `76.2M` paid members, `35.4M` Executive members = `73.3%` of sales)
     6. **Supplier Inventory Float (`AP / Inventory`) & Net Income:** `104.15%` (`$19,421M` AP / `$18,647M` Inventory; `12.60x` turn; `$9,285M` Operating Income → `$7,367M` Net Income).
