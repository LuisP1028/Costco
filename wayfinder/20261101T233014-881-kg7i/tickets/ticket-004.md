---
id: ticket-004
title: Deterministic Revenue Verification Engine, Fail-Fast Audit Invariants, and Live NPM CLI Entry-Point Wiring (src/costco_revenue_model.mjs and package.json)
stage: implement
claimed_by: wayfinder-read-and-plan
status: resolved
---

# Deterministic Revenue Verification Engine, Fail-Fast Audit Invariants, and Live NPM CLI Entry-Point Wiring (`src/costco_revenue_model.mjs` and `package.json`)

- **Target Execution Stage:** `implement` (independent automated test suite authoring and execution reserved strictly for `tester` under `INV-NO-SELF-TEST-01`)
- **Claimed by:** `wayfinder-read-and-plan`
- **Status:** `resolved`

## Question

What exact exported Node.js ESM API signature, GAAP accounting & domain ratio formulas, numeric rounding/formatting representation, Wayfinder & Research cross-audit checks, fail-fast `Error` diagnostics, operational latency/memory budgets, and `package.json` CLI script bindings must `src/costco_revenue_model.mjs` and `package.json` implement so the integrated live runtime satisfies `AC-03`, `AC-04`, `INV-GOAL-01`, and `RULE[user_global]`?

## Blocked By

- [Structured SEC Form 10-K Financial Dataset Schema and GAAP Conservation Contract (data/costco_revenue_breakdown.json)](./ticket-001.md)
- [Primary-Source SEC Form 10-K Research Monograph Architecture and Citation Contract (research/costco_revenue_architecture.md)](./ticket-002.md)
- [Canonical Repository Wayfinder Decision Map and Five Resolved Research Tickets (wayfinder/map.md and wayfinder/tickets/ticket-001.md..ticket-005.md)](./ticket-003.md)

## Mandatory Target Deliverables (MANDATORY_TARGET)

Both files must be created/modified by `implement` and recorded as `CHANGED` in `handoff/20261101T233014-881-kg7i/implementer-status.txt`:

1. `src/costco_revenue_model.mjs` — Create as the zero-dependency Node.js ESM deterministic revenue decomposition engine, Wayfinder/Research cross-auditor, and live CLI executable entry point (`node src/costco_revenue_model.mjs` and `node src/costco_revenue_model.mjs --verify`).
2. `package.json` — Modify existing root `package.json` (currently lines 1–8 containing `"name": "costco"`, `"private": true`, `"type": "module"`, `"devDependencies": { "@ai-hero/sandcastle": "^0.12.0" }`) to add `"scripts": { "start": "node src/costco_revenue_model.mjs", "verify": "node src/costco_revenue_model.mjs --verify" }` while preserving all existing fields intact.

## Read-Only Discovery Context (READ_ONLY_CONTEXT)

- `LANGUAGE.md` — Authoritative evaluation taxonomy (`{errors}`, `{correctness}`, `{functionality}`, `{correct required outputs}`) and Costco domain glossary.
- `.gitignore` — Confirms `node_modules/`, `.sandcastle/logs/`, `.sandcastle/worktrees/`, `scratch/`, and `.scratch/` remain untracked.
- `assets/20261101T233014-881-kg7i/plan-sec-fy2024-10k-disclosures.json` & `assets/20261101T233014-881-kg7i/plan-sec-fy2024-10k-xbrl-extract.json` — Empirically verified FY2024 SEC EDGAR anchors.
- Scanner reconnaissance artifacts listed in `handoff/20261101T233014-881-kg7i/plan-scan-1.txt` and `handoff/20261101T233014-881-kg7i/plan-scan-2.txt`.

## Resolution

### 1. Exported Analytical & Verification API Contract (`src/costco_revenue_model.mjs`)

1. **Zero External Runtime Network Calls & Pure Node Built-Ins:**
   - Use exclusively Node.js standard built-in modules (`node:fs`, `node:path`, `node:url`, `node:process`, `node:perf_hooks`). Make **`0` network requests** at runtime.
   - Resolve default repository root deterministically relative to `import.meta.url` (`path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")`) so CLI and programmatic calls succeed regardless of caller working directory, while honoring `options.rootDir` when supplied.
2. **Primary Exported Function & Flexible Override Parameters:**
   - Export `loadAndVerifyCostcoModel(options = {})` (plus named helper exports `verifyFinancialDataset`, `verifyWayfinderArtifacts`, `verifyResearchMonograph` that `loadAndVerifyCostcoModel` invokes directly in its active call path — zero dead helpers).
   - `options` must accept **both** filesystem path overrides and direct in-memory payload overrides so callers and automated failure-mode tests can pass either custom files or mutated objects directly:
     - `rootDir` (string, defaults to repo root)
     - `dataPath` (string, defaults to `path.join(rootDir, "data/costco_revenue_breakdown.json")`)
     - `mapPath` (string, defaults to `path.join(rootDir, "wayfinder/map.md")`)
     - `ticketsDir` (string, defaults to `path.join(rootDir, "wayfinder/tickets")`)
     - `researchPath` (string, defaults to `path.join(rootDir, "research/costco_revenue_architecture.md")`)
     - `data` (object override: if provided, validate `options.data` directly instead of reading `dataPath`)
     - `mapMarkdown` / `mapContent` (string override: if provided, audit this Markdown string directly instead of reading `mapPath`)
     - `tickets` / `ticketContents` (object mapping `"ticket-001.md"`..`"ticket-005.md"` to Markdown string content: if provided, audit those strings instead of reading from `ticketsDir`)
     - `researchMarkdown` / `researchContent` (string override: if provided, audit this Markdown string instead of reading `researchPath`)

### 2. Fail-Fast Accounting Identities, Domain Bounds & Ratio Precision Contract

`loadAndVerifyCostcoModel(options)` must validate every invariant below and **immediately throw a descriptive `Error`** (never returning silent fallback defaults or swallowing exceptions per `RULE[user_global]`) whenever any check fails:

1. **GAAP Income Statement Conservation Identities (`Section 3.4`, `Section 5.1`, `AC-03`):**
   - `totalRevenueCheck`: Verify `net_sales_usd_m + membership_fees_usd_m === total_revenue_usd_m` (`249625 + 4828 === 254453`). On mismatch, throw an `Error` naming `"Consolidated Total Revenue Identity"` and exact dollar delta `(net_sales_usd_m + membership_fees_usd_m) - total_revenue_usd_m`.
   - `operatingIncomeCheck`: Verify `total_revenue_usd_m - merchandise_costs_usd_m - selling_general_and_administrative_usd_m === operating_income_usd_m` (`254453 - 222358 - 22810 === 9285`). On mismatch, throw an `Error` naming `"Consolidated Operating Income Identity"` and exact dollar delta.
   - `preTaxAndNetIncomeCheck`: Verify `operating_income_usd_m - interest_expense_usd_m + interest_income_and_other_net_usd_m === income_before_taxes_usd_m` (`9285 - 169 + 624 === 9740`) and `income_before_taxes_usd_m - provision_for_income_taxes_usd_m === net_income_usd_m` (`9740 - 2373 === 7367`). On mismatch, throw an `Error` with exact delta.
   - `historicalComparisonCheck`: Verify `historical_comparison` is a non-empty array containing FY2022, FY2023, and FY2024 entries, and each entry satisfies `net_sales_usd_m + membership_fees_usd_m === total_revenue_usd_m` and `total_revenue_usd_m - merchandise_costs_usd_m > 0`.
2. **Disaggregation & Balance Sheet Conservation (`Section 3.3`, `Section 5.4`):**
   - `merchandise_categories`: Non-empty array (4 core categories); sum of `share_of_net_sales_pct` must satisfy `Math.abs(categoryShareSum - 100.0) <= 0.5` (throwing an `Error` reporting exact `categoryShareSum` if violated), and sum of `estimated_net_sales_usd_m` must equal `net_sales_usd_m` (`249625`).
   - `geographic_segments`: Non-empty array (`United States`, `Canada`, `Other International`); sum of `share_of_net_sales_pct` must satisfy `Math.abs(geoShareSum - 100.0) <= 0.5` (throwing an `Error` reporting exact `geoShareSum` if violated), and sum of `warehouse_count` must equal `890`.
   - `working_capital_balance_sheet` & `primary_sources`: Verify positive finite numbers for `merchandise_inventories_usd_m` (`18647`), `accounts_payable_usd_m` (`19421`), and `deferred_membership_fees_liability_usd_m` (`2501`), and verify `primary_sources` is a non-empty array containing at least one `CIK` `"0000909832"` Form `10-K` citation.
3. **Computed Ratios & Domain Flywheel Invariants (`Section 2`, `Section 3.4`, `AC-04`):**
   - Compute exact 4-decimal rounded JavaScript numbers (`Number(val.toFixed(4))`) on the returned verification object **and** provide a `formattedRatios` (2-decimal fixed strings `"98.10"`, `"1.90"`, `"10.92"`, `"9.14"`, `"52.00"`, `"48.00"`, `"104.15"`) sub-object so both numeric precision assertions (`98.1026` / `toFixed(2) === "98.10"`) and CLI text/JSON assertions (`98.10`, `1.90`, `10.92`, `52.00`, `104.15`) succeed unambiguously:
     - `netSalesSharePct`: `98.1026` (`(249625 / 254453) * 100`)
     - `membershipFeeShareOfRevenuePct`: `1.8974` (`(4828 / 254453) * 100`) — enforce `< 2.5`
     - `merchandiseGrossMarginDollarM`: `27267` (`249625 - 222358`)
     - `merchandiseGrossMarginPct`: `10.9232` (`(27267 / 249625) * 100`) — enforce `{Gross Margin Ceiling}` `10.0 <= merchandiseGrossMarginPct <= 11.5`
     - `sgaPctOfNetSales`: `9.1377` (`(22810 / 249625) * 100`)
     - `membershipFeeShareOfOperatingIncomePct`: `51.9978` (`(4828 / 9285) * 100`) — enforce `{Operating Income Flywheel}` `> 50.0`
     - `merchandiseOperatingContributionUsdM`: `4457` (`(249625 - 222358) - 22810`)
     - `merchandiseOperatingContributionSharePct`: `48.0022` (`(4457 / 9285) * 100`)
     - `accountsPayableToInventoryRatioPct`: `104.1508` (`(19421 / 18647) * 100`)

### 3. Wayfinder & Research Cross-Audit Contracts (`Section 3.4`, `Section 5.2–5.3`, `AC-01`, `AC-02`)

1. **`wayfinderAudit`:**
   - Verify `wayfinder/map.md` exists and contains all five required H2 headings: `## Destination`, `## Notes`, `## Decisions so far`, `## Not yet specified`, `## Out of scope`.
   - Extract the `## Decisions so far` section (and inspect the full document for ticket links):
     - Parse all Markdown links `[label](href)`. For any link targeting a ticket file (`ticket-001.md`..`ticket-005.md`) OR any link under `## Decisions so far`, fail fast with an explicit `Error` if `label.trim()` matches a bare ticket ID/filename pattern (`/^(ticket[-_\s]?\d+(\.md)?|#?\d+)$/i`) or has fewer than 10 characters of descriptive title text (`Section 5.2`).
     - Confirm all 5 canonical tickets (`ticket-001.md` through `ticket-005.md`) are linked under `## Decisions so far` via `./tickets/ticket-00N.md` (or `tickets/ticket-00N.md`).
   - Inspect each of the 5 ticket files (`ticket-001.md`..`ticket-005.md`):
     - Confirm existence, `wayfinder:research` indicator, `Claimed by:`, `Status: resolved` (exact case-insensitive regex `/status:\s*resolved/i`), `## Question`, `## Blocked By`, and `## Resolution` referencing `research/costco_revenue_architecture.md` and `data/costco_revenue_breakdown.json`.
     - Confirm any markdown link inside `## Blocked By` also uses a descriptive human-readable title rather than a bare `ticket-00N` label.
   - Return `{ valid: true, mapPath, requiredSectionsVerified: 5, resolvedTicketCount: 5, ticketsVerified: [...] }`.
2. **`researchAudit`:**
   - Verify `research/costco_revenue_architecture.md` exists and `Buffer.byteLength(content, "utf8") >= 8000`.
   - Verify presence of primary-source anchors: `"0000909832"`, `"Form 10-K"`, `"ASC 606"`, and all key FY2024 figures (`"254,453"`, `"249,625"`, `"4,828"`, `"9,285"`, `"7,367"`). If any anchor is missing or byte length `< 8000`, throw an explicit `Error` naming `research/costco_revenue_architecture.md` and the exact missing citation/figure or byte count (`Section 5.3`).
   - Return `{ valid: true, researchPath, byteLength, citationsVerified: ["0000909832", "Form 10-K", "ASC 606"], keyFiguresVerified: ["254,453", "249,625", "4,828", "9,285", "7,367"] }`.

### 4. Live CLI Output & `package.json` Wiring Contract (`Section 3.4.2`, `Section 4`, `AC-04`)

1. **`package.json` Live Entry-Point Scripts:**
   - Add `"scripts": { "start": "node src/costco_revenue_model.mjs", "verify": "node src/costco_revenue_model.mjs --verify" }`.
2. **CLI Direct-Execution Detection & Output Format:**
   - Detect direct CLI invocation cleanly via `import.meta.url` vs `path.resolve(process.argv[1])` (resolving `fs.realpathSync` so symlinks or relative invocations match reliably).
   - Support both default execution (`node src/costco_revenue_model.mjs` / `npm start`) and `--verify` flag (`node src/costco_revenue_model.mjs --verify` / `npm run verify`).
   - Output clean, deterministic `JSON.stringify(result, null, 2)` to `process.stdout` containing `status: "VERIFIED"`, `mode: args.includes("--verify") ? "verify" : "report"`, `company`, `totalRevenueCheck: true`, `operatingIncomeCheck: true`, `preTaxAndNetIncomeCheck: true`, all exact numeric ratio properties (`netSalesSharePct`, `membershipFeeShareOfRevenuePct`, `merchandiseGrossMarginDollarM`, `merchandiseGrossMarginPct`, `sgaPctOfNetSales`, `membershipFeeShareOfOperatingIncomePct`, `merchandiseOperatingContributionUsdM`, `merchandiseOperatingContributionSharePct`, `accountsPayableToInventoryRatioPct`), `formattedRatios` (with 2-decimal strings `"98.10"`, `"1.90"`, `"10.92"`, `"9.14"`, `"52.00"`, `"48.00"`, `"104.15"`), `disaggregationSummary`, `wayfinderAudit`, `researchAudit`, and `telemetry` (`elapsedMs`, `rssMb`), then exit with code `0`.
   - On any invariant failure during CLI execution, write the diagnostic `Error` message to `process.stderr` and exit with non-zero code `1` (while programmatic imports of `loadAndVerifyCostcoModel` throw the `Error` directly to the caller).
   - Verified physical runtime budget on local macOS Node `v24.9.0`: `~6–45 ms` wall-clock (`<= 250 ms` budget) and `~40–48 MB` RSS (`<= 128 MB` budget) with `0` network calls.
