---
id: ticket-004
title: Six-Ticket Wayfinder Audit, Corporate HTML Verification Engine, and Documentation Synchronization (src/costco_revenue_model.mjs and README.md)
stage: implement
claimed_by: wayfinder-read-and-plan
status: resolved
---

# Six-Ticket Wayfinder Audit, Corporate HTML Verification Engine, and Documentation Synchronization (`src/costco_revenue_model.mjs` and `README.md`)

- **Target Execution Stage:** `implement` (independent automated acceptance test suite authoring and execution reserved strictly for `tester` under `INV-NO-SELF-TEST-01`)
- **Claimed by:** `wayfinder-read-and-plan`
- **Status:** `resolved`

## Question

What exact modifications to `src/costco_revenue_model.mjs` and `README.md` are required so that `npm start` and `npm run verify` (`node src/costco_revenue_model.mjs --verify`) programmatically audit all 6 resolved Wayfinder tickets (`ticket-001.md` through `ticket-006.md`), deterministically verify the structural and visual integrity of the corporate `index.html` deliverable (failing fast on any residual Dreamcore markers or missing Table of Contents, 5-step walkthrough, or polar graph containers), preserve backward-compatible programmatic override options, and complete in $\le 250\text{ ms}$ with `0` network calls?

## Blocked By

- [Corporate Business Visual Design System, Sticky Scroll-Spy Table of Contents, and Dreamcore Elimination (index.html)](./ticket-001.md)
- [Interactive SVG/Canvas Polar Revenue Disaggregation Suite — Category, Geography, and Operating Profit Flywheel (index.html)](./ticket-002.md)
- [Sequential 5-Step Revenue Generation Walkthrough, Multi-Year GAAP Waterfall, and Flywheel Sensitivity Simulator (index.html)](./ticket-003.md)

## Mandatory Target Deliverables (MANDATORY_TARGET)

- `src/costco_revenue_model.mjs` — Update `EXPECTED_TICKET_FILES` (`L18–L24`) to include `"ticket-006.md"`, implement and export `verifyCorporateWebReport(rawOptions = {})` (also aliased as `verifyIndexHtml`), integrate `corporateWebAudit` into `loadAndVerifyCostcoModel(rawOptions = {})` (`L857–L928`), and support `--html <path>` in `parseCliArgs` (`L938–L960`). Must be recorded as `CHANGED` in `handoff/20261103T002028-356-yon6/implementer-status.txt`.
- `README.md` — Replace the Dreamcore repository documentation (`L1–L33`) with the institutional Corporate Executive Revenue Architecture documentation covering `index.html` (Sticky Table of Contents, 3 Interactive Polar Graphs, 5-Step Sequential Walkthrough, GAAP Waterfall & Flywheel Simulator), `wayfinder/map.md` and `ticket-001.md`..`ticket-006.md`, `research/costco_revenue_architecture.md`, `data/costco_revenue_breakdown.json`, and `src/costco_revenue_model.mjs`. Must be recorded as `CHANGED` in `handoff/20261103T002028-356-yon6/implementer-status.txt`.

## Read-Only Discovery Context (READ_ONLY_CONTEXT)

- `LANGUAGE.md` — Authoritative evaluation parameters (`{errors}`, `{correctness}`, `{functionality}`, `{correct required outputs}`, `{sufficient}`, `{insufficient}`).
- `functional_specification_002.md` — Sections 1.5, 2, 4, 5, and 6 (`AC-01` through `AC-05`).
- `wayfinder/map.md` and `wayfinder/tickets/ticket-001.md` through `wayfinder/tickets/ticket-006.md` — Already present on disk, carrying `wayfinder:research`, `Status: resolved`, and linked from `wayfinder/map.md` under `## Decisions so far` using descriptive human-readable titles.
- `data/costco_revenue_breakdown.json` and `research/costco_revenue_architecture.md` — Canonical primary-source dataset and monograph.
- `package.json` — Already defines `"start": "node src/costco_revenue_model.mjs"` and `"verify": "node src/costco_revenue_model.mjs --verify"`.
- `assets/20261103T002028-356-yon6/plan-corporate-polar-and-5step-contract.json` — Verified DOM IDs, forbidden Dreamcore tokens, and required figures.

## Resolution

### 1. Root-Cause Remediation in `src/costco_revenue_model.mjs` (`INV-ROOT-CAUSE-AGENCY-01`)

1. **Six-Ticket Wayfinder Verification (`EXPECTED_TICKET_FILES`, `L18–L24`):**
   - Update `EXPECTED_TICKET_FILES` from 5 tickets to all **6** canonical resolved tickets:
     ```js
     const EXPECTED_TICKET_FILES = [
       "ticket-001.md",
       "ticket-002.md",
       "ticket-003.md",
       "ticket-004.md",
       "ticket-005.md",
       "ticket-006.md"
     ];
     ```
   - `verifyWayfinderArtifacts()` will now require `wayfinder/map.md` to link `./tickets/ticket-001.md` through `./tickets/ticket-006.md` under `## Decisions so far` using descriptive human-readable titles (rejecting any bare `[ticket-006]` label) and verify `resolvedTicketCount === 6`.
   - Note on `hasTicketContentsOverride`: When a caller passes an in-memory `tickets` / `ticketContents` override object to `verifyWayfinderArtifacts`, if the caller provides all 5 original tickets (`ticket-001.md`..`ticket-005.md`) without `ticket-006.md` OR provides all 6 tickets (`ticket-001.md`..`ticket-006.md`), wait: per `functional_specification_002.md` Section 5.3 ("Wayfinder Ticket Count & Link Integrity (`ticket-001.md` .. `ticket-006.md`): Condition: `wayfinder/map.md` omits any of the resolved tickets or uses a bare ticket ID (`[ticket-006]`) instead of a descriptive human-readable title. Required Behavior: `verifyWayfinderArtifacts` in `src/costco_revenue_model.mjs` must throw a deterministic Error enforcing the `/wayfinder` 'Refer by name' invariant"), `EXPECTED_TICKET_FILES` must strictly require `ticket-001.md` through `ticket-006.md` on disk, and for in-memory `ticketContents` overrides, validate every provided ticket entry via `verifySingleTicketMarkdown` and require every ticket linked in the active `resolvedMapMarkdown` (which is `ticket-001.md`..`ticket-006.md` on disk).

2. **Exported Corporate Web Report Verification Function (`verifyCorporateWebReport` / `verifyIndexHtml`):**
   - Implement and export `verifyCorporateWebReport(rawOptions = {})` (and export `const verifyIndexHtml = verifyCorporateWebReport;` so both names are available to callers and tests):
   - **Accepted Options:**
     - `rawOptions` as a string path (`htmlPath`) or options object `{ rootDir, htmlPath, htmlContent, indexHtml, hasHtmlContentOverride }`.
     - Defaults `htmlPath` to `path.join(rootDir, "index.html")`.
   - **Fail-Fast Invariant Checks (`RULE[user_global]`):**
     1. **Non-Empty HTML Check:** Throw an `Error` if `index.html` is missing or empty.
     2. **Zero Residual Dreamcore / Liminal Markers (`PROHIBITED_DREAMCORE_MARKERS`):**
        - Check case-insensitively against every forbidden marker specified in `functional_specification_002.md` Section 2 & Section 5.1:
          - `"dreamcore"`
          - `"seraphic"`
          - `"vhs-scanlines"`
          - `"film-grain-overlay"`
          - `"meadow_portal.jpg"`
          - `"poolroom_sanctuary.jpg"`
          - `"sky_staircase.jpg"`
          - `"tape hum"`
          - `"stuck-clock"`
          - `"dream-sky-canvas"`
        - If any prohibited marker appears anywhere in `index.html`, throw an explicit `Error`:
          `Corporate web report audit failed for ${htmlLabel}: residual Dreamcore/liminal marker "${marker}" detected.`
     3. **Required Structural Container IDs (`REQUIRED_CORPORATE_DOM_IDS`):**
        - Verify that `index.html` defines every required element `id="..."`:
          - `"table-of-contents"` (Sticky Table of Contents)
          - `"section-executive-summary"` (Executive Summary & KPI Scorecard)
          - `"section-polar-graphs"` (Interactive Polar Graph Suite section)
          - `"polar-chart-categories"` (Polar Graph 1: Note 11 Merchandise Categories)
          - `"polar-chart-geography"` (Polar Graph 2: Note 11 Geographic Segments)
          - `"polar-chart-flywheel"` (Polar Graph 3: Revenue vs. Operating Profit Flywheel & Ancillary Mix)
          - `"section-five-steps"` (5-Step Revenue Generation Walkthrough section)
          - `"step-1"`, `"step-2"`, `"step-3"`, `"step-4"`, `"step-5"` (5 sequential revenue walkthrough steps)
          - `"section-gaap-model"` (Multi-Year GAAP Waterfall & Sensitivity Simulator)
          - `"section-wayfinder-audit"` (Primary-Source SEC Form 10-K & Wayfinder Decision Audit)
        - If any required ID is missing (`!new RegExp(\`\\\\bid=["']\${id}["']\`).test(html)`), throw an explicit `Error`:
          `Corporate web report audit failed for ${htmlLabel}: missing required structural element "#${id}".`
     4. **Table of Contents Anchor Link Integrity:**
        - Extract all internal anchor links (`href="#([a-zA-Z0-9_-]+)"`) inside `index.html` (and specifically verify `#table-of-contents` links to `#section-executive-summary`, `#section-polar-graphs`, `#section-five-steps`, `#step-1`, `#step-2`, `#step-3`, `#step-4`, `#step-5`, `#section-gaap-model`, and `#section-wayfinder-audit`), confirming that every referenced target ID exists as an `id="..."` attribute in the document. Throw an `Error` if any anchor link target is broken or missing.
     5. **Institutional Corporate Brand Palette & Primary-Source Figure Verification:**
        - Verify presence of Costco's corporate palette hex codes (`#E31837`, `#005DAA`, `#0F172A`, `#F8FAFC`, `#FFFFFF` — case-insensitive) and primary-source FY2024 figures (`254,453`, `249,625`, `4,828`, `9,285`, `7,367`, `101,463`, `63,973`, `49,969`, `34,220`, `184,143`, `35,436`, `34,874`, `10.92%`, `92.9%`, `104.15%`, `52.00%`) plus references to all 6 Wayfinder tickets (`ticket-001`..`ticket-006`).
   - **Return Structure of `verifyCorporateWebReport`:**
     ```js
     return {
       valid: true,
       htmlPath: htmlLabel,
       byteLength,
       tableOfContentsVerified: true,
       polarChartsVerified: [
         "polar-chart-categories",
         "polar-chart-geography",
         "polar-chart-flywheel"
       ],
       fiveStepsVerified: ["step-1", "step-2", "step-3", "step-4", "step-5"],
       dreamcoreMarkersDetected: 0
     };
     ```

3. **Integration into `loadAndVerifyCostcoModel(rawOptions = {})` & CLI:**
   - In `loadAndVerifyCostcoModel`, resolve `htmlPath = options.htmlPath ? path.resolve(options.htmlPath) : path.join(rootDir, "index.html")`, support `htmlContent` / `indexHtml` overrides (`hasHtmlContentOverride`), invoke `const corporateWebAudit = verifyCorporateWebReport(...)`, and include `corporateWebAudit` in the returned verification report object alongside `wayfinderAudit` and `researchAudit`.
   - In `parseCliArgs`, add `"--html": "htmlPath"` to `pathFlags`.

### 2. Documentation Synchronization in `README.md`

Update `README.md` (`L1–EOF`) to accurately document the Corporate Executive Revenue Architecture:
- Title: `# Costco Wholesale Corporation (NASDAQ: COST, CIK: 0000909832) — Corporate Executive Revenue Architecture`
- Document the 5 core sections of `index.html` (Sticky Table of Contents `#table-of-contents`, Executive KPI Scorecard, Interactive Polar Graph Suite `#polar-chart-categories` / `#polar-chart-geography` / `#polar-chart-flywheel`, 5-Step Sequential Revenue Generation Walkthrough `#step-1`..`#step-5`, and Multi-Year GAAP Waterfall & Flywheel Sensitivity Simulator + 6-Ticket Wayfinder Audit Explorer).
- Document all 6 resolved Wayfinder decision tickets (`wayfinder/tickets/ticket-001.md` through `wayfinder/tickets/ticket-006.md`), `wayfinder/map.md`, `research/costco_revenue_architecture.md`, `data/costco_revenue_breakdown.json`, and `src/costco_revenue_model.mjs` (`npm start` / `npm run verify`).
- Remove all references to "Dreamcore", "Seraphic Watcher", "1999", "VHS scanlines", or "tape hum".
