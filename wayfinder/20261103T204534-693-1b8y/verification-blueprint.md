# End-to-End Verification, Review & Deconfliction Blueprint: Costco Wholesale Corporation (`COST`) Webpage Refinement, Visual & Geometric Polish, Data Reconciliation, and Straightforward Technical English Overhaul

**Document Version:** 1.0 (Lead Verification & Review Coordinator Blueprint — Synthesized from Seed [`functional_specification_003.md`](../../functional_specification_003.md), [`refined-specification.md`](./refined-specification.md), [`implementation-blueprint.md`](./implementation-blueprint.md), and Live Implementer Blackboard Session `seq=#1`..`#9`+)  
**Run ID:** `20261103T204534-693-1b8y`  
**Author:** `tester` (Lead Verification & Review Coordinator)  
**Governing Specifications & Authoritative References:**
- [`LANGUAGE.md`](../../LANGUAGE.md) (Authoritative Domain Vocabulary & Evaluation Parameters)
- [`functional_specification_003.md`](../../functional_specification_003.md) (Seed Functional Specification)
- [`wayfinder/20261103T204534-693-1b8y/refined-specification.md`](./refined-specification.md) (Refined Technical Specification)
- [`wayfinder/20261103T204534-693-1b8y/implementation-blueprint.md`](./implementation-blueprint.md) (Module A–E Implementation Blueprint)
- [`wayfinder/20261103T204534-693-1b8y/mcp-tools.md`](./mcp-tools.md) (Provisioned `puppeteer` & `playwright` MCP Verification Playbooks 1–6)
- [`data/costco_revenue_breakdown.json`](../../data/costco_revenue_breakdown.json) (Canonical SEC Form 10-K Primary-Source Dataset)

**Live Implementer Blackboard Decisions Synthesized (`seq=#1`..`#13`):**
- `implementer-1` (`seq=#4`, `seq=#9`, `seq=#10` — **Module A:** [`index.html`](../../index.html) `<style>` block `L9–L983`, defining all 8 `REQUIRED_POLAR_CSS_SELECTORS`, `.polar-sector-path:focus-visible`, `.polar-overlay-legend`, `.drilldown-*` grid wells, `.sim-output-banner.is-breach`, `aspect-ratio: 510 / 456`, `contain: layout style`, and responsive `390px` / `1440px` media rules; completed and verified in commit `1b1ea15`)
- `implementer-2` (`seq=#7`, `seq=#8`, `seq=#12` — **Module B:** [`index.html`](../../index.html) static `<body>` markup `L985–L1850`, expanding `#svg-polar-categories`, `#svg-polar-geography`, and `#svg-polar-flywheel` `viewBox` to `"-55 -28 510 456"`, preserving all 15 `REQUIRED_CORPORATE_DOM_IDS` and 14 `REQUIRED_TOC_ANCHOR_TARGETS`, and stripping all raw `{...}` tokens, ` // ` dividers, and marketing metaphors from static HTML; completed and verified in commit `73b9e4a`)
- `implementer-3` (`seq=#1`, `seq=#6` — **Module C:** [`index.html`](../../index.html) embedded `<script>` IIFE `L1852–L3044`, reconciling `CATEGORY_DATA` and `GEOGRAPHY_DATA` with Note 11 & Item 2, implementing singleton `USD_FORMATTER`, `bindPolarSectorEvents()` with `Enter`/`Space` keydown + `data-fly-ring` focus restoration, `syncTocActiveState()` & `initScrollSpy()` with parent `.toc-link` synchronization, 3-Year Overlay SVG legend, `var(--cat-emerald)` token fix, and clean technical English strings)
- `implementer-4` (`seq=#3`, `seq=#5`, `seq=#11` — **Module D:** [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs) `L1–L1196`, implementing `OPT-01` pre-compiled regexes, single-pass `observedHrefTargets` `Set` lookup, `O(1)` `<style>` slice extraction, comment-safe `PROHIBITED_PSEUDOCODE_DIVIDER_REGEX`, and `GATE-WEB-01..04` in `verifyCorporateWebReport(rawOptions)` executing in `4.92 ms` and `47.14 MB` RSS; completed and verified in commit `cc2d787`)
- `implementer-5` (`seq=#2`, `seq=#13` — **Module E:** [`wayfinder/tickets/ticket-006.md`](../tickets/ticket-006.md), [`wayfinder/map.md`](../map.md), and [`README.md`](../../README.md) governance and plain technical English alignment plus visual verification screenshot `assets/20261103T204534-693-1b8y/implementer-5-polar-chart-categories-verified.png`; completed and verified in commit `8cffd93`)

**Status:** Authoritative Verification, Testing & Blackboard Deconfliction Blueprint (`wayfinder/20261103T204534-693-1b8y/verification-blueprint.md`). **Strict Pre-Code Gate (`DO NOT CODE YET`) Enforced Until `tester-1`..`5` Post Ownership Claims on the Blackboard.**

---

## 1. Executive Summary & `LANGUAGE.md` Verification Mandate

This blueprint defines the end-to-end verification architecture, deterministic CLI audit gates, headless browser (`puppeteer` / `playwright` MCP) inspection playbooks, negative mutation tests, performance/memory budget checks, and strict Blackboard file/test ownership boundaries for `tester-1` through `tester-5`.

Every verification check, test assertion, and surgical remediation executed during the testing phase MUST strictly enforce [`LANGUAGE.md`](../../LANGUAGE.md) and `RULE[user_global]`:

| Evaluation Parameter | Verification & Acceptance Contract |
| :--- | :--- |
| **`{errors}`** | Zero tolerance for: (1) any raw `{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, or `{Operating Income Flywheel}` curly-brace token in [`index.html`](../../index.html) or [`README.md`](../../README.md); (2) any ` // ` pseudo-code divider in visible headings, section eyebrows, drill-down headers, step telemetry boxes, or ticket tabs; (3) unstyled `.polar-grid-ring` (`fill: rgb(0, 0, 0)`), invisible `.polar-axis-spoke` (`stroke: none`), uncentered `.polar-center-title`/`.polar-center-sub`, clipped SVG sector labels at `390px` or `1440px`, unstyled `.drilldown-meta-grid`/`.drilldown-meta-item`, missing `.sim-output-banner.is-breach`, or undefined `var(--emerald-audit)`; (4) any discrepancy between Note 11 / Item 2 figures in [`index.html`](../../index.html) and [`data/costco_revenue_breakdown.json`](../../data/costco_revenue_breakdown.json); (5) residual Dreamcore markers or broken corporate DOM IDs; (6) runtime browser console errors, network requests (`> 0`), or non-zero exit codes from `npm run verify`. |
| **`{correctness}`** | Exact mathematical, accounting, geometric, and editorial fidelity across all deliverables: consolidated revenue `$254,453M = $249,625M + $4,828M` (FY24), `$242,290M = $237,710M + $4,580M` (FY23), `$226,954M = $222,730M + $4,224M` (FY22); Note 11 category sales reconciled to the exact dollar million (`85,629`/`96,175`/`101,463` Foods and Sundries `+5.50%`; `61,100`/`60,865`/`63,973` Non-Foods `+5.11%`; `46,474`/`48,693`/`49,969` Warehouse Ancillary `+2.62%`; `29,527`/`31,977`/`34,220` Fresh Foods `+7.01%`); Item 2 warehouse ownership reconciled (`890` total = `703` owned land & building + `187` leased [`134` land leases w/ owned building = `837` owned buildings]; U.S. `614` [`499`/`115`], Other Intl `168` [`113`/`55`, Spain `4`], Canada `108` [`91`/`17`]); `10.92%` gross margin (`$27,267M`), `9.14%` SG&A (`$22,810M`), `$4,457M` (`48.00%`) net merchandise contribution, `$4,828M` (`52.00%`) membership fee share of `$9,285M` operating income, `$7,367M` net income, `12.60x` inventory turnover, and `104.15%` AP (`$19,421M`) to inventory (`$18,647M`) ratio. |
| **`{functionality}`** | Complete end-to-end interactive user experience on `1440×900` desktop and `390×844` mobile viewports with clean, straightforward technical English, crisp hairline SVG polar charts with zero clipped labels across all 9 chart modes, full pointer and keyboard (`Enter`/`Space`) interactivity with focus preservation, live scroll-spy Table of Contents highlighting (activating both `.toc-sublink` and parent `.toc-link`), crimson simulator ceiling-breach state (`> 11.50%`), and deterministic CLI verification (`npm run verify`) in $\le 250\text{ ms}$ with `0` external network calls. |
| **`{correct required outputs}`** | (1) Refined [`index.html`](../../index.html), (2) Enhanced [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs), (3) Reconciled [`wayfinder/tickets/ticket-006.md`](../tickets/ticket-006.md), [`wayfinder/map.md`](../map.md), and [`README.md`](../../README.md), all passing `node src/costco_revenue_model.mjs --verify` with `status: "VERIFIED"`, `exitCode: 0`, and `0` uncommitted or stray test artifacts polluting tracked source files. |

---

## 2. End-to-End Verification Architecture & Execution DAG

```mermaid
flowchart TD
    subgraph GroundTruth["1. Primary-Source Ground Truth (Read-Only)"]
        JSON["data/costco_revenue_breakdown.json\n(251 lines · 8,844 B · SEC Form 10-K)"]
        MONO["research/costco_revenue_architecture.md\n(322 lines · 40.1 KB · CIK 0000909832)"]
    end

    subgraph Deliverables["2. Merged Implementation Deliverables (Modules A–E)"]
        HTML["index.html\n• Module A: <style> (L9-L983)\n• Module B: <body> (L985-L1850)\n• Module C: <script> IIFE (L1852-L3044)"]
        CLI["src/costco_revenue_model.mjs\n• Module D: GATE-FIN-01..05 & GATE-WEB-01..04"]
        DOCS["wayfinder/tickets/ticket-006.md\nwayfinder/map.md · README.md\n• Module E: Governance & Plain Technical English"]
    end

    subgraph Testers["3. Parallel Deconflicted Verification Suite (tester-1 .. tester-5)"]
        T1["tester-1: Unit, API Contract &\nNegative Gate Suite\n(Exports, Overrides, GATE-FIN/WEB)"]
        T2["tester-2: Storage, Note 11 / Item 2\nData Reconciliation & Wayfinder Audit\n(FY22-FY24 Exact Figures & Tickets)"]
        T3["tester-3: Editorial Technical English,\nTOC Scroll-Spy & Keyboard A11y\n(Playbooks 1, 4, 5)"]
        T4["tester-4: Performance, Complexity &\nOperational Budget Telemetry\n(<=250ms CLI, <=128MB RSS, <=16ms UI)"]
        T5["tester-5: Visual, Polar SVG Geometry &\nResponsive Viewport Verification\n(Playbooks 2 & 6: 390px & 1440px)"]
    end

    JSON --> T1 & T2
    MONO --> T1 & T2
    CLI --> T1 & T4
    DOCS --> T2
    HTML --> T2 & T3 & T4 & T5

    T1 & T2 & T3 & T4 & T5 --> FINAL["Final Gate: npm run verify\n(status: 'VERIFIED', exitCode: 0, 0 Network Calls)"]
```

---

## 3. Strict `tester-1`..`5` Ownership Matrix & Blackboard Deconfliction Protocol

### 3.1 Mandatory Pre-Code Blackboard Registration (`DO NOT CODE YET` Gate)

To prevent race conditions, duplicate test harnesses, or overlapping edits during the `tester-1`..`5` verification session:

1. **Mandatory Blackboard Claim Before Any File Write (`DO NOT CODE YET`):**
   - Upon startup, each `tester-x` agent MUST first run `blackboard read --since 0` and post a `blackboard claim` declaring:
     1. Its assigned verification domain (`T1` through `T5`),
     2. Its exclusive verification report / test script path under `assets/20261103T204534-693-1b8y/tester-<N>-*` (and/or `handoff/20261103T204534-693-1b8y/tester-<N>.txt`), and
     3. Its exclusive remediation target boundary (only claimed if a defect is discovered that requires a surgical code fix).
2. **Zero Duplicate Test Harnesses & Clean Worktree Rule:**
   - Each `tester-x` agent writes its verification evidence to its own namespaced artifact file (`assets/20261103T204534-693-1b8y/tester-1-unit-contracts.json`, `tester-2-data-reconciliation.json`, `tester-3-editorial-a11y.json`, `tester-4-performance-budgets.json`, `tester-5-visual-geometry.json`) and its own handoff file (`handoff/20261103T204534-693-1b8y/tester-<N>.txt`).
   - Any temporary scratch probe scripts MUST be executed in memory (`node -e "..."`) or cleaned up before `git commit` so the repository root and `src/` remain clean and deterministic.
3. **Strict Remediation Serialization Lock (If a Bug Fix Is Required):**
   - If all 5 implementer modules (`Modules A–E`) already pass a tester's assertions, the tester MUST NOT touch any application source file (`index.html`, `src/costco_revenue_model.mjs`, `wayfinder/tickets/ticket-006.md`, `wayfinder/map.md`, `README.md`), avoiding unnecessary git merge conflicts across `agent/tester-1..5` branches!
   - A `tester-x` agent may modify an application file **if and only if** an assertion fails AND that file/line-range lies strictly within that tester's designated Remediation Boundary in **Table 3.2** below, after posting a `type=claim` + `type=finding` on the Blackboard.
   - **[`data/costco_revenue_breakdown.json`](../../data/costco_revenue_breakdown.json), [`research/costco_revenue_architecture.md`](../../research/costco_revenue_architecture.md), and [`package.json`](../../package.json) are 100% READ-ONLY** across all testers.

### 3.2 `tester-1`..`5` Responsibility & File Ownership Partition Table

| Agent ID | Verification Domain | Exclusive Verification Artifact(s) | Exclusive Remediation Boundary (Only If Defect Found) | Primary Acceptance Criteria Covered |
| :--- | :--- | :--- | :--- | :--- |
| **`tester-1`** | **Unit Tests, Exported Function Contracts & Negative Gate Verification** (`Module D` API & In-Memory Overrides) | `assets/20261103T204534-693-1b8y/tester-1-unit-contracts.json`<br>`handoff/20261103T204534-693-1b8y/tester-1.txt` | [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs)<br>(`lines 1–906` & `1028–1196`: exported signatures, option normalizers, CLI arg parser, `verifyFinancialDataset`, `verifyWayfinderArtifacts`, `verifyResearchMonograph`) | `AC-05` (All 6 exported functions, CLI flags, backward-compatible return schema, and fail-fast negative override tests) |
| **`tester-2`** | **Storage Integrity, Primary-Source Note 11 / Item 2 Data Reconciliation & Wayfinder Governance** (`Module C` Data & `Module E`) | `assets/20261103T204534-693-1b8y/tester-2-data-reconciliation.json`<br>`handoff/20261103T204534-693-1b8y/tester-2.txt` | [`wayfinder/tickets/ticket-006.md`](../tickets/ticket-006.md), [`wayfinder/map.md`](../map.md), [`README.md`](../../README.md), and [`index.html`](../../index.html) data arrays (`L1856–L2139`: `CATEGORY_DATA`, `GEOGRAPHY_DATA`) | `AC-03` & `AC-05` (100% Note 11 FY22–FY24 category reconciliation, Item 2 `703`/`187` warehouse ownership, `Spain (4)`, Wayfinder links & `README.md`) |
| **`tester-3`** | **Straightforward Technical English Editorial Audit, Sticky TOC Scroll-Spy & Keyboard A11y** (`Module B` & `Module C` Controllers) | `assets/20261103T204534-693-1b8y/tester-3-editorial-a11y.json`<br>`handoff/20261103T204534-693-1b8y/tester-3.txt` | [`index.html`](../../index.html) static `<body>` prose (`L985–L1850`) and interactive controllers (`L2635–L3044`: `bindPolarSectorEvents`, `syncTocActiveState`, `initScrollSpy`, `setActiveStep`, `updateSimulator`, `renderTicketInspector`) | `AC-01` & `AC-04` (Playbooks 1, 4, 5: zero `{...}` tokens, zero ` // ` dividers, plain technical English, TOC scroll-spy + parent sync, `Enter`/`Space` SVG focus restore, `.is-breach` transition) |
| **`tester-4`** | **Performance, Algorithmic Complexity, Operational Budgets & `verifyCorporateWebReport` Gates** (`Module D` `GATE-WEB-01..04`) | `assets/20261103T204534-693-1b8y/tester-4-performance-budgets.json`<br>`handoff/20261103T204534-693-1b8y/tester-4.txt` | [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs)<br>(`lines 907–1027`: `verifyCorporateWebReport` `GATE-WEB-01..04` & `OPT-01`) | `AC-05` & Section 4 Budgets ($\le 250\text{ ms}$ CLI wall-clock, $\le 128\text{ MB}$ RSS, `0` network calls, $\le 16\text{ ms}$ UI frame latency, `OPT-01`..`OPT-05`, and `GATE-WEB-01..04` mutation tests) |
| **`tester-5`** | **Visual, Stylesheet, Polar SVG Geometry & Responsive Viewport Verification** (`Module A` `<style>` & Polar SVG Renderers) | `assets/20261103T204534-693-1b8y/tester-5-visual-geometry.json`<br>`handoff/20261103T204534-693-1b8y/tester-5.txt` | [`index.html`](../../index.html) `<style>` block (`L9–L983`) and Polar SVG coordinate renderers (`L2140–L2634`: `renderPolarGrid`, `renderPolarCategories`, `renderPolarGeography`, `renderPolarFlywheel`) | `AC-02` & `AC-04` (Playbooks 2 & 6: `.polar-grid-ring` `fill: none`, `.polar-axis-spoke` visible stroke, centered hub text, unclipped labels in `viewBox="-55 -28 510 456"` across all 9 modes at `390px` & `1440px`, 3-Year Overlay legend, structured `.drilldown-meta-grid`) |

---

## 4. Detailed Verification Specifications by Tester Slot (`tester-1` .. `tester-5`)

### 4.1 `tester-1`: Unit Tests, Exported Function Contracts & Negative Override Suite

`tester-1` verifies the programmatic API and contract fidelity of [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs):

1. **Exported Symbol & Signature Verification:**
   - Import [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs) in Node.js `v24.9.0` and assert that all 6 exports exist as functions:
     - `verifyFinancialDataset(data)`
     - `verifyWayfinderArtifacts(rawOptions)`
     - `verifyResearchMonograph(rawOptions)`
     - `verifyCorporateWebReport(rawOptions)`
     - `verifyIndexHtml(rawOptions)` (strictly `=== verifyCorporateWebReport`)
     - `loadAndVerifyCostcoModel(rawOptions)`
2. **Backward-Compatible Return Schema Verification:**
   - Invoke `loadAndVerifyCostcoModel({ verifyOnly: true })` and verify:
     - `status === "VERIFIED"`, `mode === "verify"`, `company.ticker === "COST"`, `company.cik === "0000909832"`.
     - `totalRevenueCheck === true`, `operatingIncomeCheck === true`, `preTaxAndNetIncomeCheck === true`.
     - `formattedRatios.netSalesSharePct === "98.10%"`, `membershipFeeShareOfRevenuePct === "1.90%"`, `merchandiseGrossMarginPct === "10.92%"`, `sgaPctOfNetSales === "9.14%"`, `membershipFeeShareOfOperatingIncomePct === "52.00%"`, `merchandiseOperatingContributionSharePct === "48.00%"`, `accountsPayableToInventoryRatioPct === "104.15%"`.
     - `corporateWebAudit.valid === true`, `tableOfContentsVerified === true`, `polarChartsVerified` equals `["polar-chart-categories", "polar-chart-geography", "polar-chart-flywheel"]`, `fiveStepsVerified` equals `["step-1", "step-2", "step-3", "step-4", "step-5"]`, `dreamcoreMarkersDetected === 0`, `specTokensDetected === 0` (or `editorialBraceTokensDetected === 0`), `polarCssSelectorsVerified === true`, `historicalNote11Reconciled === true`.
3. **In-Memory Negative Override & Fail-Fast Exception Suite (`RULE[user_global]`):**
   - Using in-memory overrides (`htmlContent`, `data`, `mapContent`, `ticketContents`, `researchContent`)—**without touching disk files**—verify that [`src/costco_revenue_model.mjs`](../../src/costco_revenue_model.mjs) throws descriptive `Error` exceptions on:
     - **Financial Identity Breaches (`GATE-FIN-01..05`):** Mutating `net_sales_usd_m` (`249625 -> 249000`), `operating_income_usd_m` (`9285 -> 9000`), `merchandise_categories` sum, `geographic_segments` warehouse sum (`890 -> 889`), or breaching the `10.0%–11.5%` gross margin ceiling.
     - **Wayfinder & Research Breaches:** Removing a required H2 section from `mapContent`, injecting a bare ticket link `[ticket-001.md](./tickets/ticket-001.md)`, changing `status: resolved` to `open`, or removing `0000909832` from `researchContent`.
     - **Web Report Breaches (`GATE-WEB-01..04`):**
       - Injecting `"{Net Sales}"`, `"{Membership Fees}"`, `"{Gross Margin Ceiling}"`, or `"{Operating Income Flywheel}"` into `htmlContent`.
       - Injecting `"Section 01 // Institutional"` or `"ACTIVE POLAR SECTOR DRILLDOWN //"` or `"ticket-001.md //"` into `htmlContent` (while confirming that valid JavaScript comments like `// comment` inside `<script>` do NOT false-trigger!).
       - Removing any of the 8 `REQUIRED_POLAR_CSS_SELECTORS` (`.polar-grid-ring`, `.polar-axis-spoke`, `.polar-sector-label`, `.polar-center-title`, `.polar-center-sub`, `.drilldown-meta-grid`, `.drilldown-meta-item`, `.sim-output-banner.is-breach`) from `<style>` or injecting `--emerald-audit`.
       - Removing an audited Note 11 historical figure (`85629` / `85,629`) or injecting a legacy unverified figure (`88,948`, `96,936`, `60,876`, `60,292`, `43,443`, `29,463`, `31,789`, `704/124/62`).

---

### 4.2 `tester-2`: Primary-Source Data Reconciliation (`Note 11` & `Item 2`) & Wayfinder Governance Audit

`tester-2` performs a 100% field-by-field primary-source reconciliation between [`data/costco_revenue_breakdown.json`](../../data/costco_revenue_breakdown.json), [`index.html`](../../index.html), [`wayfinder/map.md`](../map.md), [`wayfinder/tickets/ticket-001.md`](../tickets/ticket-001.md)..[`ticket-006.md`](../tickets/ticket-006.md), and [`README.md`](../../README.md):

1. **Note 11 Disaggregated Merchandise Category Reconciliation (`FY2022–FY2024`):**
   - Verify both in `CATEGORY_DATA` inside [`index.html`](../../index.html) and in live rendered `#tbody-polar-categories` / `#polar-category-drilldown` DOM that every integer, share percentage, and YoY growth rate matches [`data/costco_revenue_breakdown.json`](../../data/costco_revenue_breakdown.json):
     - **Foods and Sundries (`foods_and_sundries`):** FY2022 `$85,629M` (`38.45%`), FY2023 `$96,175M` (`40.46%`), FY2024 `$101,463M` (`40.65%`, `+5.50%` YoY).
     - **Non-Foods (`non_foods`):** FY2022 `$61,100M` (`27.43%`), FY2023 `$60,865M` (`25.60%`), FY2024 `$63,973M` (`25.63%`, `+5.11%` YoY).
     - **Warehouse Ancillary and Other Businesses (`warehouse_ancillary_and_other`):** FY2022 `$46,474M` (`20.87%`), FY2023 `$48,693M` (`20.48%`), FY2024 `$49,969M` (`20.02%`, `+2.62%` YoY).
     - **Fresh Foods (`fresh_foods`):** FY2022 `$29,527M` (`13.26%`), FY2023 `$31,977M` (`13.45%`), FY2024 `$34,220M` (`13.71%`, `+7.01%` YoY).
     - **Consolidated Note 11 Net Sales Totals:** FY2022 `$222,730M`, FY2023 `$237,710M`, FY2024 `$249,625M` (`+5.01%` YoY).
     - **Zero Legacy Drift:** Confirm `0` occurrences of `88948`, `88,948`, `96936`, `96,936`, `60876`, `60,876`, `60292`, `60,292`, `43443`, `43,443`, `29463`, `29,463`, `31789`, `31,789`, `+4.67%`, `+6.11%`, or `+7.65%` anywhere in [`index.html`](../../index.html).
2. **Note 11 & Item 2 Geographic Segment & Warehouse Ownership Reconciliation (`FY2024`):**
   - Verify in `GEOGRAPHY_DATA`, `#tbody-polar-geography`, `#polar-geo-caption`, and `#polar-geography-drilldown`:
     - **United States (`united_states`):** `$184,143M` revenue (`72.37%`), `$6,217M` operating income (`3.38%` margin, `66.96%` share), `614` warehouses (`499` owned, `115` leased -> `614 (499/115)`), `91.1M` sq ft, `219,000` employees (`$299.91M` rev/club).
     - **Other International (`other_international`):** `$35,436M` revenue (`13.93%`), `$1,420M` operating income (`4.01%` margin, `15.29%` share), `168` warehouses (`113` owned, `55` leased -> `168 (113/55)` across 12 countries: Mexico `40`, Japan `35`, U.K. `29`, Korea `19`, Australia `15`, Taiwan `14`, China `7`, **Spain `4`**, France `2`, Iceland `1`, New Zealand `1`, Sweden `1`), `24.3M` sq ft, `61,000` employees (`$210.93M` rev/club).
     - **Canada (`canada`):** `$34,874M` revenue (`13.71%`), `$1,648M` operating income (`4.73%` margin, `17.75%` share), `108` warehouses (`91` owned, `17` leased -> `108 (91/17)`), `15.5M` sq ft, `53,000` employees (`$322.91M` rev/club).
     - **Consolidated Total:** `$254,453M` revenue, `$9,285M` operating income (`3.65%` margin), `890` warehouses (`703` owned land & building, `187` leased -> `890 (703/187)`, including `134` land-only leases where Costco owns the building = `837` owned buildings; `130.9M` sq ft warehouse space + `31.9M` sq ft depot space; `333,000` employees).
     - **Zero Legacy Ownership Drift:** Confirm `0` occurrences of `704/124/62`, `505/80/29`, `103/35/30`, `96/9/3`, or `Spain (5)` in [`index.html`](../../index.html).
3. **Wayfinder Governance & Documentation Audit (`wayfinder/map.md`, `ticket-006.md`, `README.md`):**
   - Verify that [`wayfinder/map.md`](../map.md) preserves all 5 required H2 sections and descriptive ticket links wrapping `./tickets/ticket-001.md`..`./tickets/ticket-006.md`.
   - Verify that [`wayfinder/tickets/ticket-006.md`](../tickets/ticket-006.md) and [`README.md`](../../README.md) contain zero raw `{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, or `{Operating Income Flywheel}` curly-brace tokens in prose and accurately document the reconciled Note 11 / Item 2 figures and polar SVG/accessibility refinements.

---

### 4.3 `tester-3`: Straightforward Technical English Editorial Audit, Sticky TOC Scroll-Spy & Keyboard A11y (`Playbooks 1, 4, 5`)

`tester-3` verifies editorial clarity and interactive DOM/accessibility behavior across [`index.html`](../../index.html) using headless browser evaluation (`puppeteer` / `playwright` MCP):

1. **Playbook 1 — Straightforward Technical English & Token/Divider Audit (`AC-01`):**
   - Evaluate `document.body.innerText` and `document.documentElement.innerHTML` across all interactive states (clicking through all 5 steps `#step-1`..`#step-5`, all 6 Wayfinder tickets `ticket-001.md`..`ticket-006.md`, all 3 GAAP table years `2024`/`2023`/`2022`, and both nominal and breach simulator states) to confirm:
     - `0` occurrences of `{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}`, or any raw `{...}` token in `document.body.innerText`.
     - `0` occurrences of ` // ` pseudo-code dividers in `document.body.innerText`.
     - `0` occurrences of promotional metaphors (`Gatekeeper Subscription`, `High-Frequency Trip Magnets`, `Subscription Annuity`, `treasure-hunt`, `perceive unmistakable value`, `threatens the 92.9% renewal moat`).
2. **Playbook 4A — Sticky Table of Contents (`#table-of-contents`) Scroll-Spy & Parent Synchronization (`AC-04`):**
   - Verify that scrolling to each of the 5 top-level sections (`#section-executive-summary`, `#section-polar-graphs`, `#section-five-steps`, `#section-gaap-model`, `#section-wayfinder-audit`) and sub-anchors (`#polar-chart-categories`, `#polar-chart-geography`, `#polar-chart-flywheel`, `#step-1`..`#step-5`) updates `.is-active` and `aria-current="location"` on the corresponding link in `#table-of-contents`.
   - Verify that clicking any `.toc-sublink` (e.g., `a[data-toc-target="polar-chart-geography"]` or `a[data-toc-target="step-4"]`) sets `.is-active` and `aria-current="location"` on that `.toc-sublink` AND sets `.is-active` on its parent `.toc-link` (`a[data-toc-target="section-polar-graphs"]` or `a[data-toc-target="section-five-steps"]`), and when `data-toc-step="4"` is clicked, activates Step 4 (`#step-4.is-active-step`).
3. **Playbook 4B — SVG Polar Sector Keyboard Accessibility (`Enter` & `Space` + Focus Preservation) (`AC-02`):**
   - Across all three polar charts (`#svg-polar-categories`, `#svg-polar-geography`, `#svg-polar-flywheel` in both `asymmetry` and `ancillary` modes):
     - Verify every interactive `<path>` has `role="button"` and `tabindex="0"`.
     - Focus `[data-cat-sector="2"]`, dispatch `keydown` with `key: "Enter"`, and verify `#polar-category-drilldown` updates to **Warehouse Ancillary and Other Businesses (`$49,969M`)** AND `document.activeElement` remains on `[data-cat-sector="2"]`.
     - Focus `[data-geo-sector="2"]`, dispatch `keydown` with `key: " "` (`Space`), and verify `#polar-geography-drilldown` updates to **Canada (`$34,874M`, `91 Owned · 17 Leased`)** without scrolling the page (`preventDefault()`), AND `document.activeElement` remains on `[data-geo-sector="2"]`.
     - In `#svg-polar-flywheel` (`asymmetry` mode), focus `[data-fly-sector="1"][data-fly-ring="inner"]`, dispatch `keydown` with `key: "Enter"`, and verify `#polar-flywheel-drilldown` updates to **Membership Fees (`$4,828M` / `52.00%` of Operating Income)** and focus is restored to `[data-fly-sector="1"][data-fly-ring="inner"]`.
4. **Playbook 5 — Sensitivity Simulator Ceiling Breach State (`> 11.50%`) & Wayfinder Badge Token (`AC-04`):**
   - Set `#sim-gm-slider` to `12.00` (`> 11.50%`), dispatch `"input"`, and verify `#sim-output-banner.classList.contains("is-breach") === true`, computed `borderLeftColor === "rgb(227, 24, 55)"`, and plain-English governance message is displayed.
   - Click `#sim-reset-btn` and verify `#sim-gm-slider.value === "10.92"` and `#sim-output-banner.classList.contains("is-breach") === false`.
   - Inspect `#ticket-inspector-card` across all 6 ticket tabs and confirm `var(--cat-emerald)` is used (`0` occurrences of undefined `--emerald-audit`).

---

### 4.4 `tester-4`: Performance, Algorithmic Complexity, Operational Budgets & CLI Verification Gate

`tester-4` empirically benchmarks the CLI verification engine (`src/costco_revenue_model.mjs`) and client-side interactive hot paths against Section 4 operational budgets and `planner-2.4`'s `OPT-01`..`OPT-05` targets:

1. **CLI Operational Budget Verification (`npm run verify` / `node src/costco_revenue_model.mjs --verify`):**
   - Execute 10 consecutive cold/warm runs of `node src/costco_revenue_model.mjs --verify` and verify:
     - `exitCode === 0` and `status === "VERIFIED"`.
     - `telemetry.elapsedMs <= 250` (target envelope: `7.0 ms – 20.0 ms`).
     - `telemetry.rssMb <= 128` (target envelope: `45.0 MB – 55.0 MB`).
     - `telemetry.externalNetworkRequests === 0`.
2. **Client-Side Interactive Frame Latency Benchmark ($\le 16\text{ ms}$ / 60fps Budget):**
   - Using `performance.now()` inside headless Chromium (`puppeteer` / `playwright`), measure 50 iterations each of:
     - Switching `#polar-chart-categories` across `2024`, `2023`, `2022`, `overlay` and `sqrt`, `linear`, `angle` modes.
     - Switching `#polar-chart-geography` across `revenue`, `opinc`, `warehouses` modes.
     - Switching `#polar-chart-flywheel` across `asymmetry` and `ancillary` modes.
     - Stepping through `#step-1`..`#step-5` (`setActiveStep`).
     - Dragging `#sim-gm-slider`, `#sim-sga-slider`, and `#sim-fee-slider` (`updateSimulator` with singleton `Intl.NumberFormat`).
     - Triggering `syncTocActiveState(targetId)` across all 14 TOC targets.
   - Verify that p99 execution latency for every single UI state transition is strictly **$\le 16.0\text{ ms}$** (expected `< 2.0 ms`).
3. **`OPT-01`..`OPT-05` Verification:**
   - Verify `src/costco_revenue_model.mjs` uses module-scope pre-compiled constants, isolates `<style>...</style>` when checking `REQUIRED_POLAR_CSS_SELECTORS`, and uses comment-safe `PROHIBITED_PSEUDOCODE_DIVIDER_REGEX`.

---

### 4.5 `tester-5`: Visual, Stylesheet, Polar SVG Geometry & Responsive Viewport Verification (`Playbooks 2 & 6`)

`tester-5` performs live visual, computed-style, and geometric bounding-box inspection of [`index.html`](../../index.html) across both **`1440×900` desktop** and **`390×844` mobile** viewports using `puppeteer` / `playwright` MCP:

1. **Playbook 2A — Computed CSS Styles on All Polar SVG & Drill-Down Selectors (`AC-02`):**
   - Evaluate `window.getComputedStyle(...)` in Chromium and assert:
     - `.polar-grid-ring`: `fill === "none"` (NEVER `rgb(0, 0, 0)`!), `stroke === "rgb(203, 213, 225)"` (`#CBD5E1`), `strokeDasharray` non-none (`3px, 3px`).
     - `.polar-axis-spoke`: `stroke === "rgb(203, 213, 225)"` (`#CBD5E1`), `strokeWidth === "1px"`.
     - `.polar-center-title` & `.polar-center-sub`: `textAnchor === "middle"`.
     - `.polar-sector-label` & `.polar-axis-label`: defined font sizes (`11px`–`11.5px` and `9.5px`–`10px`) and high-contrast fills (`rgb(15, 23, 42)` and `rgb(51, 65, 85)`).
     - `.drilldown-meta-grid`: `display === "grid"`.
     - `.drilldown-meta-item`: `display === "flex"`, `flexDirection === "column"`, `backgroundColor === "rgb(241, 245, 249)"` (`#F1F5F9`).
     - `.sim-output-banner.is-breach` (when active): `borderLeftColor === "rgb(227, 24, 55)"` (`#E31837`).
2. **Playbook 2B — Exhaustive 9-Mode SVG Polar Bounding-Box & Zero-Clipping Proof (`AC-02`):**
   - Verify that `#svg-polar-categories`, `#svg-polar-geography`, and `#svg-polar-flywheel` have `viewBox="-55 -28 510 456"`.
   - Cycle through **all 9 polar chart modes** at both `1440×900` and `390×844`:
     1. Categories — `FY2024` + `Area √r`
     2. Categories — `FY2023` + `Linear r`
     3. Categories — `FY2022` + `Share Angle θ_i`
     4. Categories — `3-Year Overlay` (and verify the inline 3-Year Overlay legend key is rendered and visible!)
     5. Geography — `Total Revenue ($254.5B)`
     6. Geography — `Operating Income ($9.29B)`
     7. Geography — `Warehouses (890)`
     8. Flywheel — `Revenue vs. Operating Profit (Dual-Ring)`
     9. Flywheel — `Ancillary & E-Commerce Rose ($49.97B)`
   - In every mode, measure `el.getBoundingClientRect()` for every `.polar-sector-label` and `.polar-axis-label` against its parent `svg.getBoundingClientRect()` (and `el.getBBox()` against `[-55, 455] × [-28, 428]`) and assert **zero horizontal or vertical clipping** (`textRect.left >= svgRect.left`, `textRect.right <= svgRect.right`, `textRect.top >= svgRect.top`, `textRect.bottom <= svgRect.bottom`).
   - Also verify that `.polar-center-title` and `.polar-center-sub` bounding boxes sit strictly inside the inner white hub circle (`r = 36..42px` around `(200, 200)`).
3. **Playbook 6 — Responsive Viewport Stability (`390×844` Mobile & `1440×900` Desktop), Zero Console Errors & Zero Network Calls (`AC-02`, `AC-05`):**
   - At `1440×900` desktop and `390×844` mobile viewports, assert `document.documentElement.scrollWidth <= window.innerWidth` (`0px` horizontal page overflow).
   - Capture visual screenshots (`assets/20261103T204534-693-1b8y/tester-5-polar-categories.png`, `tester-5-polar-geography.png`, `tester-5-polar-flywheel.png`, `tester-5-mobile-390px.png`) to empirically confirm crisp hairline concentric rings, centered hub labels, unclipped outer callouts, and structured drill-down cards.
   - Assert `0` browser console errors/warnings and `0` external network requests (`performance.getEntriesByType("resource")` contains zero `http://`/`https://` external URLs).

---

## 5. Final Sign-Off Checklist Before `tester-1`..`5` Completion

Before any `tester-x` agent runs `blackboard done` and outputs `<promise>COMPLETE</promise>`, it MUST verify:
1. `node src/costco_revenue_model.mjs --verify` (`npm run verify`) exits with code `0`, `status: "VERIFIED"`, `specTokensDetected: 0`, `polarCssSelectorsVerified: true`, `historicalNote11Reconciled: true`, `elapsedMs <= 250`, and `externalNetworkRequests: 0`.
2. `git status --short` shows zero untracked temporary scripts in the repository root and zero unintended modifications outside the tester's assigned artifact/handoff files (and deconflicted remediation boundary, if any).
3. Findings and verification metrics are posted to the Blackboard (`blackboard post --to all --type finding "..."`) and recorded in `handoff/20261103T204534-693-1b8y/tester-<N>.txt`.
