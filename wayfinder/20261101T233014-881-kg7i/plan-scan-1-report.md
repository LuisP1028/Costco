# Wayfinder Plan Scan 1 Report: Codebase Static Scan, External API Reconnaissance, and Schema Auditing

**Agent ID:** `plan-scan-1` (Planning Node / Scanner 1)  
**Run ID:** `20261101T233014-881-kg7i`  
**Git Branch:** `agent/plan-scan-1-20261101T233014-881-kg7i`  
**Governing Specification:** [`functional_specification_001.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-scan-1-20261101T233014-881-kg7i/functional_specification_001.md)  
**Authoritative Glossary & Taxonomy:** [`LANGUAGE.md`](file:///Users/diesel/Desktop/Costco/.sandcastle/worktrees/agent-plan-scan-1-20261101T233014-881-kg7i/LANGUAGE.md)  
**Execution Gate:** **STRICT "DO NOT CODE YET" (`INV-BOUNDARY-01`)**. Zero implementation code, test code, or implementation steps generated.

---

## 1. Governing Context & Execution Boundary

This deterministic static scan and external API reconnaissance report was executed by the planning node (`plan-scan-1`, Agent 1) in concurrent isolation within git worktree `agent/plan-scan-1-20261101T233014-881-kg7i`.

In accordance with core invariants:
1. **Single Seed Binding (`INV-HANDOFF-01`):** Binds strictly and exclusively to `functional_specification_001.md`, `LANGUAGE.md`, and `.sandcastle/mcp.md`.
2. **Causal Independence (`INV-PARALLEL-01`):** Executes without reading, expecting, or searching for `wayfinder/20261101T233014-881-kg7i/map.md` or `wayfinder/20261101T233014-881-kg7i/tickets/*` (which belong strictly to the concurrent `plan` worktree).
3. **Disjoint Output Enforcement:** All external assets downloaded and saved to disk are strictly prefixed with `plan-scan-1-` in `assets/20261101T233014-881-kg7i/`. The scan report is written exclusively to `wayfinder/20261101T233014-881-kg7i/plan-scan-1-report.md`. The handoff manifest is atomically overwritten at `handoff/20261101T233014-881-kg7i/plan-scan-1.txt`.
4. **Three-Way Ephemeral Blackboard Mesh Coordination:** Coordinated live with `plan` and `plan-scan-2` over loopback HTTP via `.sandcastle/bin/blackboard`. Claimed and fully resolved request `#4` from `plan`, published primary scan scope claim `#1`, empirical reconnaissance findings `#9`, and cross-verified XBRL/10-K financial metrics with `plan-scan-2` (`#10`, `#11`).

---

## 2. Master Component Dependency Cone Register

Every repository file inspected during the static scan is cataloged below, classified strictly as either a **Candidate Mandatory Target Deliverable (`MANDATORY_TARGET`)** (a production file or manifest that must be modified or created by downstream stages to satisfy `functional_specification_001.md`) or **Read-Only Discovery Context (`READ_ONLY_CONTEXT`)** (an immutable reference file, schema, or asset inspected for context only).

| Repository-Relative Path | Classification | Verbatim Symbols / Interfaces Inspected | Operational Role & Surrounding Context |
| :--- | :--- | :--- | :--- |
| `package.json` | `MANDATORY_TARGET` | `"name": "costco"`, `"type": "module"`, `"devDependencies"`: `@ai-hero/sandcastle: ^0.12.0` | **Root Package Manifest:** Governs Node.js ESM execution. Lacks `"scripts"` block. Downstream implement stage must wire `"scripts": { "start": "node src/costco_revenue_model.mjs", "verify": "node src/costco_revenue_model.mjs --verify" }`. |
| `src/costco_revenue_model.mjs` | `MANDATORY_TARGET` (Candidate) | `loadAndVerifyCostcoModel(options)`, CLI entry point | **Live Analytical Engine:** Specced live verification CLI and exportable analytical API. Currently absent from worktree (see Deficiency Register). Must verify GAAP accounting identities, compute financial ratios, audit Wayfinder links, and exit code `0` in $\le 250\text{ ms}$ with $\le 128\text{ MB}$ RSS. |
| `data/costco_revenue_breakdown.json` | `MANDATORY_TARGET` (Candidate) | `company`, `consolidated_income_statement`, `historical_comparison`, `merchandise_categories`, `geographic_segments`, `membership_metrics`, `working_capital_balance_sheet`, `primary_sources` | **Structured Financial Dataset:** Specced machine-readable financial model. Currently absent from worktree (see Deficiency Register). Empirically grounded by captured SEC EDGAR FY2024 Form 10-K disclosures. |
| `research/costco_revenue_architecture.md` | `MANDATORY_TARGET` (Candidate) | Markdown monograph $\ge 8,000$ bytes, Sections 1–7, primary-source SEC Form 10-K citations | **Primary-Source Monograph:** Specced comprehensive monograph detailing Costco's revenue pillars, ASC 606 mechanics, renewal flywheels, margin ceiling, and working capital. Currently absent from worktree (see Deficiency Register). |
| `wayfinder/map.md` | `MANDATORY_TARGET` (Candidate) | `## Destination`, `## Notes`, `## Decisions so far`, `## Not yet specified`, `## Out of scope` | **Canonical Wayfinder Decision Map:** Root-level Wayfinder decision map. Must index tickets `ticket-001.md` through `ticket-005.md` using human-readable title links (zero bare ticket-NNN text). Concurrently scaffolded by `plan` in run directory and authored to repo root in implement. |
| `wayfinder/tickets/ticket-001.md` through `ticket-005.md` | `MANDATORY_TARGET` (Candidate) | `wayfinder:research`, `Claimed by:`, `Status: resolved`, `## Question`, `## Blocked By`, `## Resolution` | **Resolved Decision & Research Tickets:** Five atomic research tickets covering two-pillar revenue engine, SKU/Kirkland economics, membership tier economics, ancillary/traffic drivers, and gross margin ceiling/working capital float. |
| `package-lock.json` | `READ_ONLY_CONTEXT` | npm lockfile (v3, node 24+) | **Dependency Lock:** Locked dependencies for local sandbox tooling. |
| `LANGUAGE.md` | `READ_ONLY_CONTEXT` | `{errors}`, `{correctness}`, `{functionality}`, `{correct required outputs}`, `{sufficient}`, `{insufficient}`, `{Net Sales}`, `{Membership Fees}`, `{Gross Margin Ceiling}`, `{Operating Income Flywheel}` | **Authoritative System Glossary:** Dictates exact definitions of evaluation parameters and revenue architecture domain vocabulary across all pipeline nodes. |
| `.sandcastle/mcp.md` | `READ_ONLY_CONTEXT` | MCP servers (`google-colab`, `google-drive`, `postgres`, `playwright`, etc.), schema lookup paths, role access boundaries | **Host MCP Registry:** Defines authorized tool access and non-mutating read-only constraints for scanners. |
| `.gitignore` | `READ_ONLY_CONTEXT` | `node_modules/`, `.sandcastle/worktrees/`, `.sandcastle/logs/` | **Repository Hygiene Policy:** Ensures build artifacts, temporary caches, and worktrees remain strictly untracked. |

---

## 3. Candidate External Datasource & Schema Audit Register

Active read-only reconnaissance was conducted against authoritative primary sources for **Costco Wholesale Corporation (`NASDAQ: COST`, `CIK: 0000909832`)** via the U.S. Securities and Exchange Commission (SEC EDGAR) public APIs and archive repositories.

### 3.1 Probed External Endpoints & Verification Telemetry

| Endpoint / Datasource | Method | Request Headers | HTTP Status | Response Size | Primary Artifact Saved |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `https://data.sec.gov/submissions/CIK0000909832.json` | `GET` | `User-Agent: ResearchAgent/1.0 (research@example.com)` | `200 OK` | `159,569 bytes` | `assets/20261101T233014-881-kg7i/plan-scan-1-sec-edgar-submissions.json` |
| `https://data.sec.gov/api/xbrl/companyfacts/CIK0000909832.json` | `GET` | `User-Agent: ResearchAgent/1.0 (research@example.com)` | `200 OK` | `3,694,553 bytes` | `assets/20261101T233014-881-kg7i/plan-scan-1-sec-edgar-companyfacts.json` |
| `https://www.sec.gov/Archives/edgar/data/909832/000090983224000049/cost-20240901.htm` | `GET` | `User-Agent: ResearchAgent/1.0 (research@example.com)` | `200 OK` | `1,497,997 bytes` | `assets/20261101T233014-881-kg7i/plan-scan-1-cost-20240901.htm` |
| Synthesized Ground-Truth Primary Financial Dataset | Local Python Extraction | N/A | Local File | `7,349 bytes` | `assets/20261101T233014-881-kg7i/plan-scan-1-costco-fy2024-verified-extracted.json` |

### 3.2 Authoritative Filing Metadata (`plan-scan-1-sec-edgar-submissions.json`)
- **Entity Legal Name:** `COSTCO WHOLESALE CORP /NEW`
- **CIK:** `0000909832`
- **Ticker:** `COST` (Exchange: `Nasdaq`)
- **SIC Code:** `5331` (Retail-Variety Stores)
- **State of Incorporation:** `WA` (Washington)
- **Principal Executive Office:** `999 Lake Drive, Issaquah, WA 98027`
- **FY2024 Form 10-K Accession Number:** `0000909832-24-000049`
- **Filing Date:** `2024-10-09`
- **Period of Report Date:** `2024-09-01` (Fiscal year ended September 1, 2024; 52 weeks)
- **Primary Document:** `cost-20240901.htm` (Inline XBRL Form 10-K Annual Report)

---

## 4. Empirical Schema & Quantitative Disclosures Audit

The data extracted and verified directly from Costco Wholesale Corporation's FY2024 Form 10-K filing (`assets/20261101T233014-881-kg7i/plan-scan-1-cost-20240901.htm`) and SEC EDGAR XBRL company facts (`assets/20261101T233014-881-kg7i/plan-scan-1-sec-edgar-companyfacts.json`) satisfies all GAAP accounting identities and specced domain equations without deviation.

### 4.1 Consolidated Income Statement Audit (Item 8)
Values reported in USD Millions ($M):

| Line Item | FY2024 (52 Wks, ended 2024-09-01) | FY2023 (53 Wks, ended 2023-09-03) | FY2022 (52 Wks, ended 2022-08-28) | Accounting Equation / Verification |
| :--- | :--- | :--- | :--- | :--- |
| **Net Sales** | `$249,625` | `$237,710` | `$222,730` | Point-of-sale & delivery merchandise sales net of returns & taxes |
| **Membership Fees** | `$4,828` | `$4,580` | `$4,224` | Deferred revenue recognized ratably over 12 months |
| **Total Revenue** | `$254,453` | `$242,290` | `$226,954` | Exact identity: $249,625 + 4,828 = 254,453$ |
| **Merchandise Costs** | `$222,358` | `$212,586` | `$199,382` | Merchandise gross margin: $249,625 - 222,358 = \$27,267\text{M}$ ($10.9232\%$) |
| **Selling, General & Administrative** | `$22,810` | `$21,590` | `$19,779` | SG&A % of Net Sales: $(22,810 / 249,625) \times 100 = 9.1377\%$ |
| **Operating Income** | `$9,285` | `$8,114` | `$7,793` | Exact identity: $254,453 - 222,358 - 22,810 = 9,285$ |
| **Interest Expense** | `$(169)` | `$(160)` | `$(158)` | Financial expense |
| **Interest Income & Other, Net** | `$624` | `$533` | `$205` | Net other income |
| **Income Before Income Taxes** | `$9,740` | `$8,487` | `$7,840` | Exact identity: $9,285 - 169 + 624 = 9,740$ |
| **Provision for Income Taxes** | `$2,373` | `$2,195` | `$1,925` | Effective tax rate: $24.36\%$ |
| **Net Income Attributable to Costco** | `$7,367` | `$6,292` | `$5,844` | Exact identity: $9,740 - 2,373 = 7,367$ (FY2022 had noncontrolling $71M) |

### 4.2 Disaggregated Revenue by Merchandise Category (Item 8, Note 11)
Net sales disaggregation reported in Note 11 (Segment Reporting — Disaggregated Revenue):

| Merchandise Category | FY2024 Net Sales ($M) | Net Sales Share (%) | Specific Category Inclusions Disclosed in Note 11 & Item 1 |
| :--- | :--- | :--- | :--- |
| **Foods and Sundries** | `$101,463` | `40.6462%` (~`40.65%`) | Sundries, dry grocery, candy, cooler, freezer, deli, liquor, tobacco |
| **Non-Foods** | `$63,973` | `25.6276%` (~`25.63%`) | Major appliances, electronics, health & beauty aids, hardware, garden, sporting goods, tires, toys, seasonal, office, auto, apparel, furniture |
| **Fresh Foods** | `$34,220` | `13.7086%` (~`13.71%`) | Meat, produce, service deli, bakery |
| **Warehouse Ancillary & Other** | `$49,969` | `20.0176%` (~`20.02%`) | Gasoline (719 stations, ~12% net sales), pharmacy, optical, food court, hearing aids, tire installation, e-commerce (~7% net sales), business centers, travel |
| **Total Net Sales** | **`$249,625`** | **`100.0000%`** | Category share sum is exactly $100.00\%$ (within $\pm 0.5\%$ budget) |

### 4.3 Geographic Segment Disaggregation & Warehouse Footprint (Item 1, Item 2, Note 11)
At fiscal year end September 1, 2024, Costco operated **890 membership warehouses** worldwide:

| Geographic Segment | FY2024 Total Revenue ($M) | Revenue Share (%) | Operating Income ($M) | Warehouses at FY24 End | Warehouse Share (%) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **United States & Puerto Rico** | `$184,143` | `72.3682%` | `$6,217` | `614` (499 owned, 115 leased) | `68.99%` |
| **Canada** | `$34,874` | `13.7055%` | `$1,648` | `108` (91 owned, 17 leased) | `12.13%` |
| **Other International** | `$35,436` | `13.9263%` | `$1,420` | `168` (113 owned, 55 leased) | `18.88%` |
| **Consolidated Total** | **`$254,453`** | **`100.0000%`** | **`$9,285`** | **`890`** (703 owned, 187 leased) | **`100.00%`** |

*Note on Other International:* Warehouses comprise 40 in Mexico, 35 in Japan, 29 in the U.K., 19 in Korea, 15 in Australia, 14 in Taiwan, 7 in China, 4 in Spain, 2 in France, 1 in Iceland, 1 in New Zealand, and 1 in Sweden.

### 4.4 Membership Metrics & ASC 606 Deferred Revenue Accounting (Item 1, Note 1)
- **Paid Household Members:** `76.2 million` (76,200 thousand: Gold Star 63,700 thousand; Business 12,500 thousand).
- **Total Cardholders:** `136.8 million` (including 60,600 thousand free household cards).
- **Executive Membership Penetration:** `35.4 million` paid Executive members, representing **`46.46%`** of paid members and **`73.3%`** of worldwide net sales.
- **Member Renewal Rates:**
  - **U.S. and Canada:** `92.9%`
  - **Worldwide:** `90.5%`
- **Annual Membership Fee Structure:**
  - *FY2024:* `$60` (Gold Star & Business), `$120` ($60 base + $60 upgrade; Executive 2% reward capped at $1,000).
  - *Effective September 1, 2024:* `$65` (Gold Star & Business), `$130` ($65 base + $65 upgrade; Executive 2% reward capped at $1,250).
- **ASC 606 Revenue Recognition Mechanics:**
  - Membership fees collected upfront are recognized ratably over the 12-month membership period.
  - Deferred Membership Fees current liability on the balance sheet: **`$2,501M`** at FY2024 end (up from `$2,337M` in FY2023).
  - Executive 2% reward is recorded as a direct **reduction in sales (contra-revenue)** net of breakage: **`$2,804M`** in FY2024, `$2,576M` in FY2023, and `$2,307M` in FY2022.
  - Accrued Member Rewards liability: **`$2,435M`** at FY2024 end.

### 4.5 Negative Working Capital & Inventory Float Financing (Item 8)
- **Merchandise Inventories:** **`$18,647M`**
- **Accounts Payable:** **`$19,421M`**
- **Accounts Payable to Inventory Ratio:**
  $$\frac{\text{AP}}{\text{Inventory}} = \frac{\$19,421\text{M}}{\$18,647\text{M}} = 104.1508\%$$
- **Working-Capital Float Analysis:** Suppliers finance **104.15%** of Costco's total merchandise inventory. Because inventory turns ~12–13 times annually (~28–30 days on hand) while trade payable terms typically allow 30–45 days, Costco generates positive cash flow before paying suppliers.

### 4.6 The `{Operating Income Flywheel}` Mathematical Reconciliation
- **Total Revenue:** `$254,453M` (100.0%)
  - `{Net Sales}`: `$249,625M` (`98.1026%`)
  - `{Membership Fees}`: `$4,828M` (`1.8974%`)
- **Consolidated Operating Income:** `$9,285M` (100.0%)
  - `{Membership Fees}` contribution: $\frac{\$4,828\text{M}}{\$9,285\text{M}} = \mathbf{51.9978\%}$ (~**`52.00%`**)
  - Merchandise operating margin contribution:
    $$\text{Merchandise Gross Margin} - \text{SG\&A} = (\$249,625\text{M} - \$222,358\text{M}) - \$22,810\text{M} = \$27,267\text{M} - \$22,810\text{M} = \mathbf{\$4,457M}\ (48.0022\%)$$
- **Conclusion:** While `{Membership Fees}` account for less than $2\%$ of top-line revenue ($1.90\%$), they drive **over half ($52.00\%$) of consolidated operating income**.

---

## 5. Explicit Deficiency & Systemic Obstacle Register

In adherence to `INV-ABSENCE-01`, this register enumerates requirements in `functional_specification_001.md` that are currently absent from the workspace or require architectural remediation:

| Deficiency / Obstacle ID | Component / Target | Nature of Deficiency | Architectural Remediation Required |
| :--- | :--- | :--- | :--- |
| `DEF-01` | `package.json` | Missing CLI scripts block for `"start"` and `"verify"`. | Implementer must update `package.json` with `"scripts": { "start": "node src/costco_revenue_model.mjs", "verify": "node src/costco_revenue_model.mjs --verify" }`. |
| `DEF-02` | `src/costco_revenue_model.mjs` | File does not yet exist in worktree. | Implementer must create this live entry point exporting `loadAndVerifyCostcoModel(options)`, computing all ratios, validating GAAP identities, and executing local audits in $\le 250\text{ ms}$ with $\le 128\text{ MB}$ RSS and 0 network requests. |
| `DEF-03` | `data/costco_revenue_breakdown.json` | File does not yet exist in worktree. | Implementer must create this structured JSON matching the audited SEC EDGAR Form 10-K disclosures saved in `assets/20261101T233014-881-kg7i/plan-scan-1-costco-fy2024-verified-extracted.json`. |
| `DEF-04` | `research/costco_revenue_architecture.md` | File does not yet exist in worktree. | Implementer must create this $\ge 8,000$ byte research monograph citing SEC Form 10-K sections across Sections 1–7. |
| `DEF-05` | `wayfinder/map.md` & `wayfinder/tickets/ticket-001.md`..`ticket-005.md` | Canonical repo-level Wayfinder map and tickets do not exist on `main`. | Planning node (`plan`) scaffolds `wayfinder/20261101T233014-881-kg7i/map.md` and tickets; implement stage creates canonical repo-level `wayfinder/map.md` with descriptive title links (zero bare ticket IDs). |
| `OBS-01` | Preopening Expenses Classification | Clarification on whether preopening expenses are reported as a distinct operating line. | Probed Note 1 confirms preopening expenses are folded directly into SG&A (no separate line item exists on the Consolidated Statements of Income). |
| `OBS-02` | Executive 2% Reward Accounting | Clarification on whether Executive rewards are treated as operating expenses or contra-revenue. | Probed Note 1 confirms Executive rewards ($2,804M in FY2024) are recorded as a reduction of net sales (contra-revenue) under ASC 606, not as an operating expense. |

---

## 6. Sufficiency & Scan Certification

- **Dependency Cone Exhaustiveness:** The complete component dependency cone—including `package.json`, missing target artifacts (`src/costco_revenue_model.mjs`, `data/costco_revenue_breakdown.json`, `research/costco_revenue_architecture.md`, `wayfinder/map.md`), and reference glossaries—has been exhaustively cataloged.
- **Verifiable Empirical Grounding:** All candidate external endpoints, financial figures, accounting identities, and membership metrics have been verified against primary SEC EDGAR Form 10-K filings (`CIK 0000909832`, accession `0000909832-24-000049`) and downloaded into `assets/20261101T233014-881-kg7i/plan-scan-1-*`. Zero guesswork or hallucinated values were used.
- **Sufficiency Determination:** The findings and audited assets in this report provide `{sufficient}` context for downstream planning (`plan`) and implementation (`implementer`) to execute without ambiguity.

---

## 7. Handoff Manifest Affirmation

The dedicated handoff manifest for this stage is atomically overwritten at:
`handoff/20261101T233014-881-kg7i/plan-scan-1.txt`

It contains exclusively the repository-relative filepaths of all identified and reviewed codebase component files, this authored report, and all downloaded assets in `assets/20261101T233014-881-kg7i/plan-scan-1-*` (strictly omitting seed paths such as `functional_specification_001.md`).

---

## 8. Coding Gate Affirmation

**DO NOT CODE YET: Implementation coding gate remains locked. Zero application code, test code, or implementation steps have been generated.**
