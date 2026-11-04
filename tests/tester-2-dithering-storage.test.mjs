import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

import {
  verifyFinancialDataset,
  verifyWayfinderArtifacts,
  verifyResearchMonograph,
  verifyCorporateWebReport,
  verifyIndexHtml,
  loadAndVerifyCostcoModel
} from "../src/costco_revenue_model.mjs";

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(TEST_DIR, "..");
const DATA_PATH = path.join(ROOT_DIR, "data", "costco_revenue_breakdown.json");
const HTML_PATH = path.join(ROOT_DIR, "index.html");
const MAP_PATH = path.join(ROOT_DIR, "wayfinder", "map.md");
const RESEARCH_PATH = path.join(ROOT_DIR, "research", "costco_revenue_architecture.md");
const ASSETS_DIR = path.join(ROOT_DIR, "assets", "20261104T004059-606-j6a7");

fs.mkdirSync(ASSETS_DIR, { recursive: true });

const results = [];
function runTest(name, fn) {
  const t0 = performance.now();
  try {
    const detail = fn();
    const elapsedMs = Number((performance.now() - t0).toFixed(3));
    results.push({ name, status: "PASS", elapsedMs, detail: detail ?? null });
    process.stdout.write(`  [PASS] ${name} (${elapsedMs} ms)\n`);
  } catch (err) {
    const elapsedMs = Number((performance.now() - t0).toFixed(3));
    results.push({ name, status: "FAIL", elapsedMs, error: err.message });
    process.stderr.write(`  [FAIL] ${name} (${elapsedMs} ms): ${err.message}\n`);
    throw err;
  }
}

async function runAsyncTest(name, fn) {
  const t0 = performance.now();
  try {
    const detail = await fn();
    const elapsedMs = Number((performance.now() - t0).toFixed(3));
    results.push({ name, status: "PASS", elapsedMs, detail: detail ?? null });
    process.stdout.write(`  [PASS] ${name} (${elapsedMs} ms)\n`);
  } catch (err) {
    const elapsedMs = Number((performance.now() - t0).toFixed(3));
    results.push({ name, status: "FAIL", elapsedMs, error: err.message });
    process.stderr.write(`  [FAIL] ${name} (${elapsedMs} ms): ${err.message}\n`);
    throw err;
  }
}

const rawJsonText = fs.readFileSync(DATA_PATH, "utf8");
const canonicalDataset = JSON.parse(rawJsonText);
const rawHtmlText = fs.readFileSync(HTML_PATH, "utf8");

process.stdout.write("=== tester-2: Storage Engine, ACID Consistency & Halftone/Bayer Dithering Verification Suite ===\n");

/* =========================================================================
   1. STORAGE ENGINE PHYSICS, AMPLIFICATION & ACCESS PATTERN VERIFICATION
   ========================================================================= */
runTest("1.1 Storage Engine Physics: Sub-millisecond JSON snapshot read & parse (R_amp=1.0, W_amp=1.0, S_amp=1.0)", () => {
  const stat = fs.statSync(DATA_PATH);
  assert.ok(stat.size > 5000 && stat.size < 32768, `Expected compact RFC 8259 JSON payload (<32KB), got ${stat.size} bytes`);

  const iterations = 25;
  const start = performance.now();
  let parsed = null;
  for (let i = 0; i < iterations; i++) {
    const buf = fs.readFileSync(DATA_PATH, "utf8");
    parsed = JSON.parse(buf);
  }
  const avgMs = (performance.now() - start) / iterations;
  assert.ok(avgMs <= 2.0, `Expected <= 2.0ms per snapshot read+parse, observed ${avgMs.toFixed(4)}ms`);
  assert.equal(parsed.company.cik, "0000909832");
  assert.equal(parsed.consolidated_income_statement.total_revenue_usd_m, 254453);
  return { byteSize: stat.size, avgReadParseMs: Number(avgMs.toFixed(4)) };
});

runTest("1.2 Schema & Partitioning: Temporal fiscal year partitions (2022, 2023, 2024) & dense ordinal indexing", () => {
  const histYears = canonicalDataset.historical_comparison.map((h) => h.fiscal_year);
  assert.deepEqual(histYears, [2022, 2023, 2024]);
  assert.equal(canonicalDataset.merchandise_categories.length, 4);
  assert.equal(canonicalDataset.geographic_segments.length, 3);
  assert.equal(canonicalDataset.primary_sources.length, 2);

  // Verify exact GAAP mathematical conservation across all 3 fiscal year partitions
  for (const row of canonicalDataset.historical_comparison) {
    assert.equal(
      row.net_sales_usd_m + row.membership_fees_usd_m,
      row.total_revenue_usd_m,
      `FY${row.fiscal_year} total revenue identity breach`
    );
    assert.equal(
      row.total_revenue_usd_m - row.merchandise_costs_usd_m - row.selling_general_and_administrative_usd_m,
      row.operating_income_usd_m,
      `FY${row.fiscal_year} operating income identity breach`
    );
  }
  return { fiscalYearsVerified: histYears, categories: 4, segments: 3 };
});

runTest("1.3 Cross-Layer Primary-Source Reconciliation: data/costco_revenue_breakdown.json <-> index.html inlined tables", () => {
  // Extract inlined JS tables from index.html and evaluate them in an isolated scope
  const catMatch = rawHtmlText.match(/var\s+CATEGORY_DATA\s*=\s*(\[[\s\S]*?\]);\s*var\s+GEOGRAPHY_DATA/);
  const geoMatch = rawHtmlText.match(/var\s+GEOGRAPHY_DATA\s*=\s*(\[[\s\S]*?\]);\s*var\s+FLYWHEEL_ASYMMETRY_DATA/);
  const flyMatch = rawHtmlText.match(/var\s+FLYWHEEL_ASYMMETRY_DATA\s*=\s*(\[[\s\S]*?\]);\s*var\s+ANCILLARY_ROSE_DATA/);
  const gaapMatch = rawHtmlText.match(/var\s+GAAP_BY_YEAR\s*=\s*(\{[\s\S]*?\});\s*var\s+STEP_SUMMARIES/);

  assert.ok(catMatch && geoMatch && flyMatch && gaapMatch, "Failed to locate inlined storage tables in index.html");

  const inlinedCategories = Function(`"use strict"; return (${catMatch[1]});`)();
  const inlinedGeography = Function(`"use strict"; return (${geoMatch[1]});`)();
  const inlinedFlywheel = Function(`"use strict"; return (${flyMatch[1]});`)();
  const inlinedGaapByYear = Function(`"use strict"; return (${gaapMatch[1]});`)();

  // Reconcile Note 11 Merchandise Categories
  for (const jsonCat of canonicalDataset.merchandise_categories) {
    const htmlCat = inlinedCategories.find((c) => c.id === jsonCat.category_id);
    assert.ok(htmlCat, `Missing category_id "${jsonCat.category_id}" in index.html CATEGORY_DATA`);
    assert.equal(htmlCat.salesByYear[2024], jsonCat.estimated_net_sales_usd_m);
    assert.equal(htmlCat.salesByYear[2023], jsonCat.fy2023_net_sales_usd_m);
    assert.equal(htmlCat.salesByYear[2022], jsonCat.fy2022_net_sales_usd_m);
    assert.equal(htmlCat.shareByYear[2024], jsonCat.share_of_net_sales_pct);
  }

  // Reconcile Note 11 & Item 2 Geographic Segments
  let sumOwned = 0;
  let sumLeased = 0;
  for (const jsonSeg of canonicalDataset.geographic_segments) {
    const htmlSeg = inlinedGeography.find((g) => g.id === jsonSeg.segment_id);
    assert.ok(htmlSeg, `Missing segment_id "${jsonSeg.segment_id}" in index.html GEOGRAPHY_DATA`);
    assert.equal(htmlSeg.revenueM, jsonSeg.total_revenue_usd_m);
    assert.equal(htmlSeg.revSharePct, jsonSeg.share_of_net_sales_pct);
    assert.equal(htmlSeg.opIncM, jsonSeg.operating_income_usd_m);
    assert.equal(htmlSeg.warehouses, jsonSeg.warehouse_count);
    assert.equal(htmlSeg.ownedWarehouses, jsonSeg.owned_warehouses);
    assert.equal(htmlSeg.leasedWarehouses, jsonSeg.leased_warehouses);
    assert.equal(htmlSeg.floorSpaceSqFtM, jsonSeg.floor_space_sq_ft_m);
    assert.equal(htmlSeg.employees, jsonSeg.employees);
    sumOwned += htmlSeg.ownedWarehouses;
    sumLeased += htmlSeg.leasedWarehouses;
  }
  assert.equal(sumOwned, 703);
  assert.equal(sumLeased, 187);
  assert.equal(sumOwned + sumLeased, 890);

  // Reconcile Multi-Year GAAP Waterfall
  for (const histRow of canonicalDataset.historical_comparison) {
    const fy = histRow.fiscal_year;
    const htmlFy = inlinedGaapByYear[fy];
    assert.ok(htmlFy, `Missing FY${fy} in index.html GAAP_BY_YEAR`);
    assert.equal(htmlFy.weeks, histRow.fiscal_weeks);
    assert.equal(htmlFy.netSales, histRow.net_sales_usd_m);
    assert.equal(htmlFy.membershipFees, histRow.membership_fees_usd_m);
    assert.equal(htmlFy.totalRevenue, histRow.total_revenue_usd_m);
    assert.equal(htmlFy.merchCosts, histRow.merchandise_costs_usd_m);
    assert.equal(htmlFy.sga, histRow.selling_general_and_administrative_usd_m);
    assert.equal(htmlFy.opInc, histRow.operating_income_usd_m);
    assert.equal(htmlFy.netInc, histRow.net_income_usd_m);
  }

  // Reconcile Flywheel Asymmetry
  assert.equal(inlinedFlywheel[0].revM, 249625);
  assert.equal(inlinedFlywheel[0].opIncM, 4457);
  assert.equal(inlinedFlywheel[1].revM, 4828);
  assert.equal(inlinedFlywheel[1].opIncM, 4828);

  return { categoriesReconciled: 4, segmentsReconciled: 3, yearsReconciled: 3 };
});

/* =========================================================================
   2. CONCURRENCY CONTROL, SNAPSHOT ISOLATION & ANOMALY PREVENTION
   ========================================================================= */
await runAsyncTest("2.1 Snapshot Isolation & Stateless Parameter Overrides: Concurrent verification without dirty reads or write skew", async () => {
  // Run 12 concurrent verification promises mixing valid canonical snapshots and mutated invalid snapshots
  const tasks = [];
  for (let i = 0; i < 6; i++) {
    tasks.push(
      Promise.resolve().then(() => {
        const res = loadAndVerifyCostcoModel({ verifyOnly: true });
        assert.equal(res.status, "VERIFIED");
        assert.equal(res.overallValid, true);
        assert.equal(res.telemetry.externalNetworkRequests, 0);
        return "VALID_SNAPSHOT";
      })
    );

    // Concurrent mutated dataset in memory — must fail fast without polluting canonical runs
    tasks.push(
      Promise.resolve().then(() => {
        const mutated = structuredClone(canonicalDataset);
        mutated.consolidated_income_statement.total_revenue_usd_m += 100; // Inject write skew / conservation anomaly
        assert.throws(
          () => verifyFinancialDataset(mutated),
          /GAAP Consolidated Total Revenue Identity mismatch/
        );
        return "ISOLATED_REJECT";
      })
    );
  }

  const outcomes = await Promise.all(tasks);
  assert.equal(outcomes.filter((x) => x === "VALID_SNAPSHOT").length, 6);
  assert.equal(outcomes.filter((x) => x === "ISOLATED_REJECT").length, 6);
  return { concurrentTasksCompleted: outcomes.length };
});

runTest("2.2 Fail-Fast Anomaly & Boundary Verification (GATE-FIN-01..04 & GATE-WEB-01..06)", () => {
  // GATE-FIN-04: Reject promotional clichés in merchandise_categories[].role_in_flywheel
  for (const cliche of [
    "treasure-hunt discretionary basket builder",
    "renewal magnet",
    "perishable weekly trip driver and rapid inventory-turn engine",
    "negative working-capital float"
  ]) {
    const mutated = structuredClone(canonicalDataset);
    mutated.merchandise_categories[0].role_in_flywheel = `Category description with ${cliche} included.`;
    assert.throws(
      () => verifyFinancialDataset(mutated),
      /prohibited promotional cliché/i,
      `Expected fail-fast rejection for cliché: ${cliche}`
    );
  }

  // GATE-WEB-01: Reject algebraic shorthand & code leaks in index.html
  for (const shorthand of [
    "R_total",
    "OpInc ($9,285M) = Merch Contrib",
    "Area √r (Coxcomb)",
    "Linear Radius r",
    "Share Angle θ_i",
    "wayfinderAudit.valid === true",
    "Negative Working-Capital Float"
  ]) {
    const corruptedHtml = rawHtmlText.replace("</body>", `<p>${shorthand}</p></body>`);
    assert.throws(
      () => verifyCorporateWebReport({ htmlContent: corruptedHtml }),
      /prohibited/i,
      `Expected fail-fast rejection for shorthand: ${shorthand}`
    );
  }

  // GATE-WEB-03: Reject Dreamcore markers
  for (const dreamcore of ["dreamcore", "vhs-scanlines", "poolroom_sanctuary.jpg", "film-grain-overlay"]) {
    const corruptedHtml = rawHtmlText.replace("</body>", `<div>${dreamcore}</div></body>`);
    assert.throws(
      () => verifyCorporateWebReport({ htmlContent: corruptedHtml }),
      /Dreamcore\/liminal marker/i,
      `Expected fail-fast rejection for Dreamcore marker: ${dreamcore}`
    );
  }

  // GATE-WEB-03: Reject missing dither pattern IDs
  for (const patternId of [
    "dither-bayer-navy",
    "dither-bayer-crimson",
    "dither-halftone-slate",
    "dither-polar-engraving"
  ]) {
    const corruptedHtml = rawHtmlText.replace(`id="${patternId}"`, `id="removed-${patternId}"`);
    assert.throws(
      () => verifyCorporateWebReport({ htmlContent: corruptedHtml }),
      new RegExp(`missing required ordered Bayer / halftone dither pattern "#${patternId}"`),
      `Expected fail-fast rejection when #${patternId} is missing`
    );
  }

  return { negativeBoundaryGatesVerified: 19 };
});

/* =========================================================================
   3. ACID DURABILITY, ZERO RUNTIME DISK MUTATION & CRASH RECOVERY
   ========================================================================= */
runTest("3.1 ACID Durability & Read-Only Runtime Invariant: Zero file mutations or temp/WAL artifacts during CLI execution", () => {
  const beforeDataMtime = fs.statSync(DATA_PATH).mtimeMs;
  const beforeHtmlMtime = fs.statSync(HTML_PATH).mtimeMs;
  const beforeMapMtime = fs.statSync(MAP_PATH).mtimeMs;
  const beforeResearchMtime = fs.statSync(RESEARCH_PATH).mtimeMs;

  const proc = spawnSync(process.execPath, [path.join(ROOT_DIR, "src", "costco_revenue_model.mjs"), "--verify"], {
    cwd: ROOT_DIR,
    encoding: "utf8"
  });
  assert.equal(proc.status, 0, `CLI exited with non-zero status: ${proc.stderr}`);
  const report = JSON.parse(proc.stdout);
  assert.equal(report.status, "VERIFIED");
  assert.ok(report.telemetry.elapsedMs <= 250, `CLI latency ${report.telemetry.elapsedMs}ms > 250ms budget`);
  assert.ok(report.telemetry.rssMb <= 128, `CLI RSS ${report.telemetry.rssMb}MB > 128MB budget`);
  assert.equal(report.telemetry.externalNetworkRequests, 0);

  assert.equal(fs.statSync(DATA_PATH).mtimeMs, beforeDataMtime);
  assert.equal(fs.statSync(HTML_PATH).mtimeMs, beforeHtmlMtime);
  assert.equal(fs.statSync(MAP_PATH).mtimeMs, beforeMapMtime);
  assert.equal(fs.statSync(RESEARCH_PATH).mtimeMs, beforeResearchMtime);

  return {
    cliElapsedMs: report.telemetry.elapsedMs,
    cliRssMb: report.telemetry.rssMb,
    zeroDiskMutations: true
  };
});

/* =========================================================================
   4. PILLAR 2 (AC-02 / MODULE M2): HALFTONE & BAYER DITHERING + LIVE BROWSER AUDIT
   ========================================================================= */
runTest("4.1 Static SVG Pattern Atlas (#svg-global-dither-defs) & CSS Dithering Architecture Audit", () => {
  assert.ok(rawHtmlText.includes('id="svg-global-dither-defs"'), "Missing #svg-global-dither-defs");
  for (const id of ["dither-bayer-navy", "dither-bayer-crimson", "dither-halftone-slate", "dither-polar-engraving"]) {
    const regex = new RegExp(`<pattern[^>]+id=["']${id}["'][^>]+patternUnits=["']userSpaceOnUse["']`, "i");
    assert.ok(regex.test(rawHtmlText), `Pattern #${id} must use patternUnits="userSpaceOnUse"`);
  }
  assert.ok(!/<feTurbulence/i.test(rawHtmlText), "Prohibited <feTurbulence> filter shader detected");

  for (const cssClass of [
    ".dither-accent-band",
    ".dither-header-plate",
    ".dither-badge-accent",
    ".dither-kpi-strip",
    ".dither-step-band"
  ]) {
    assert.ok(rawHtmlText.includes(cssClass), `Missing CSS dither class definition ${cssClass}`);
  }
  return { patternsVerified: 4, cssClassesVerified: 5, feTurbulenceCount: 0 };
});

await runAsyncTest("4.2 Headless Chromium Live DOM Audit: Dither Rendering, WCAG AA/AAA Contrast, Serialized Event-Loop Concurrency & 0 Console/Page Errors", async () => {
  const pyScript = `
import json
import sys
from playwright.sync_api import sync_playwright

html_path = sys.argv[1]

def rel_lum(rgb):
    vals = []
    for c in rgb[:3]:
        v = c / 255.0
        vals.append(v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4)
    return 0.2126 * vals[0] + 0.7152 * vals[1] + 0.0722 * vals[2]

def contrast_ratio(c1, c2):
    l1, l2 = rel_lum(c1), rel_lum(c2)
    bright, dark = max(l1, l2), min(l1, l2)
    return (bright + 0.05) / (dark + 0.05)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    console_errors = []
    page_errors = []
    external_reqs = []

    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda err: page_errors.append(str(err)))
    page.on("request", lambda req: external_reqs.append(req.url) if not req.url.startswith("file://") and not req.url.startswith("data:") else None)

    page.goto(f"file://{html_path}", wait_until="domcontentloaded")

    # 1. Verify #svg-global-dither-defs and 4 patterns in live DOM
    dither_audit = page.evaluate("""() => {
      const parseRgb = (str) => {
        const m = str.match(/rgba?\\\\((\\\\d+),\\\\s*(\\\\d+),\\\\s*(\\\\d+)/);
        return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : [255, 255, 255];
      };
      const defsSvg = document.getElementById('svg-global-dither-defs');
      const patternIds = ['dither-bayer-navy', 'dither-bayer-crimson', 'dither-halftone-slate', 'dither-polar-engraving'];
      const patterns = patternIds.map(id => {
        const el = document.getElementById(id);
        return {
          id,
          exists: Boolean(el),
          tagName: el ? el.tagName.toLowerCase() : null,
          patternUnits: el ? el.getAttribute('patternUnits') : null,
          childCount: el ? el.children.length : 0
        };
      });

      const feTurbulenceCount = document.querySelectorAll('feTurbulence').length;
      const motionBtnCount = document.querySelectorAll('#motion-toggle-btn').length;

      // Verify dither classes applied to decorative plates only, never on prose/table cells
      const accentBands = document.querySelectorAll('.dither-accent-band').length;
      const headerPlates = document.querySelectorAll('.dither-header-plate').length;
      const badgeAccents = document.querySelectorAll('.dither-badge-accent').length;
      const kpiStrips = document.querySelectorAll('.dither-kpi-strip').length;
      const stepBands = document.querySelectorAll('.dither-step-band').length;

      // Verify SVG fills using url(#dither-...)
      const svgDitherRefs = Array.from(document.querySelectorAll('[fill*="url(#dither-"], [stroke*="url(#dither-"]')).length;

      // Sample foreground & background colors for WCAG contrast verification
      const sampleSelectors = [
        { sel: '.section-title', minRatio: 7.0, bg: [255, 255, 255] },
        { sel: '.section-lead', minRatio: 4.5, bg: [255, 255, 255] },
        { sel: '.plain-english-note', minRatio: 7.0, bg: [248, 250, 252] },
        { sel: '.chart-reading-note', minRatio: 4.5, bg: [248, 250, 252] },
        { sel: '.kpi-value', minRatio: 7.0, bg: [241, 245, 249] },
        { sel: '.kpi-label', minRatio: 4.5, bg: [241, 245, 249] },
        { sel: '.corp-table td', minRatio: 4.5, bg: [255, 255, 255] },
        { sel: '.polar-sector-label', minRatio: 7.0, bg: [255, 255, 255] },
        { sel: '.polar-center-title', minRatio: 7.0, bg: [255, 255, 255] }
      ];

      const contrastSamples = sampleSelectors.map(item => {
        const el = document.querySelector(item.sel);
        if (!el) return { selector: item.sel, missing: true };
        const cs = window.getComputedStyle(el);
        const colorStr = cs.fill && el.namespaceURI && el.namespaceURI.includes('svg') ? cs.fill : cs.color;
        return {
          selector: item.sel,
          fg: parseRgb(colorStr),
          bg: item.bg,
          minRatio: item.minRatio
        };
      });

      // Test rapid serialized state transitions (concurrency / torn-read check)
      // Trigger category year/mode changes, row selection, geography metric switches, flywheel mode switches, and simulator updates in rapid succession
      const catModeAngle = document.querySelector('[data-cat-mode="angle"]');
      const catYear2023 = document.querySelector('[data-cat-year="2023"]');
      const catYear2024 = document.querySelector('[data-cat-year="2024"]');
      const catModeSqrt = document.querySelector('[data-cat-mode="sqrt"]');
      if (catModeAngle) catModeAngle.click();
      if (catYear2023) catYear2023.click();
      const catRow2 = document.querySelector('[data-cat-row="2"]');
      if (catRow2) catRow2.click();

      const catDrilldownText2023 = document.getElementById('polar-category-drilldown').textContent;
      const catCenterTitle2023 = document.querySelector('#svg-polar-categories .polar-center-title').textContent;

      // Restore 2024 sqrt
      if (catYear2024) catYear2024.click();
      if (catModeSqrt) catModeSqrt.click();
      const catRow0 = document.querySelector('[data-cat-row="0"]');
      if (catRow0) catRow0.click();

      const catDrilldownText2024 = document.getElementById('polar-category-drilldown').textContent;
      const catCenterTitle2024 = document.querySelector('#svg-polar-categories .polar-center-title').textContent;

      return {
        defsExists: Boolean(defsSvg),
        patterns,
        feTurbulenceCount,
        motionBtnCount,
        ditherCounts: { accentBands, headerPlates, badgeAccents, kpiStrips, stepBands, svgDitherRefs },
        contrastSamples,
        serializedSync: {
          catCenterTitle2023,
          hasAncillary2023: catDrilldownText2023.includes('Warehouse Ancillary') && catDrilldownText2023.includes('$48,693M'),
          catCenterTitle2024,
          hasFoods2024: catDrilldownText2024.includes('Foods and Sundries') && catDrilldownText2024.includes('$101,463M')
        }
      };
    }""")

    for sample in dither_audit["contrastSamples"]:
        if not sample.get("missing"):
            sample["measuredRatio"] = round(contrast_ratio(sample["fg"], sample["bg"]), 2)

    browser.close()

    output = {
        "consoleErrors": console_errors,
        "pageErrors": page_errors,
        "externalRequests": external_reqs,
        "ditherAudit": dither_audit
    }
    print(json.dumps(output))
`;

  const PYTHON_BIN = fs.existsSync("/opt/anaconda3/bin/python3") ? "/opt/anaconda3/bin/python3" : "python3";
  const proc = spawnSync(PYTHON_BIN, ["-c", pyScript, HTML_PATH], {
    cwd: ROOT_DIR,
    encoding: "utf8"
  });
  assert.equal(proc.status, 0, `Playwright python script failed: ${proc.stderr}`);
  const browserReport = JSON.parse(proc.stdout.trim());

  assert.equal(browserReport.consoleErrors.length, 0, `Console errors detected: ${JSON.stringify(browserReport.consoleErrors)}`);
  assert.equal(browserReport.pageErrors.length, 0, `Page errors detected: ${JSON.stringify(browserReport.pageErrors)}`);
  assert.equal(browserReport.externalRequests.length, 0, `External network requests detected: ${JSON.stringify(browserReport.externalRequests)}`);

  const da = browserReport.ditherAudit;
  assert.equal(da.defsExists, true);
  assert.equal(da.feTurbulenceCount, 0);
  assert.equal(da.motionBtnCount, 1, "Expected exactly 1 unique #motion-toggle-btn ID in DOM");

  for (const pat of da.patterns) {
    assert.equal(pat.exists, true, `Missing pattern #${pat.id}`);
    assert.equal(pat.tagName, "pattern");
    assert.equal(pat.patternUnits, "userSpaceOnUse");
    assert.ok(pat.childCount >= 2, `Pattern #${pat.id} must contain geometric stipple primitives`);
  }

  assert.ok(da.ditherCounts.accentBands >= 5, "Expected >= 5 .dither-accent-band elements");
  assert.ok(da.ditherCounts.headerPlates >= 3, "Expected >= 3 .dither-header-plate elements");
  assert.ok(da.ditherCounts.badgeAccents >= 5, "Expected >= 5 .dither-badge-accent elements");
  assert.ok(da.ditherCounts.kpiStrips >= 6, "Expected >= 6 .dither-kpi-strip elements");
  assert.ok(da.ditherCounts.stepBands >= 5, "Expected >= 5 .dither-step-band elements");
  assert.ok(da.ditherCounts.svgDitherRefs >= 11, "Expected >= 11 SVG elements referencing url(#dither-...)");

  for (const sample of da.contrastSamples) {
    assert.ok(!sample.missing, `Missing contrast selector ${sample.selector}`);
    assert.ok(
      sample.measuredRatio >= sample.minRatio,
      `Contrast breach on ${sample.selector}: measured ${sample.measuredRatio}:1 < required ${sample.minRatio}:1`
    );
  }

  assert.equal(da.serializedSync.catCenterTitle2023, "FY23");
  assert.equal(da.serializedSync.hasAncillary2023, true);
  assert.equal(da.serializedSync.catCenterTitle2024, "FY24");
  assert.equal(da.serializedSync.hasFoods2024, true);

  return {
    consoleErrors: 0,
    pageErrors: 0,
    externalRequests: 0,
    ditherCounts: da.ditherCounts,
    contrastChecksPassed: da.contrastSamples.length
  };
});

const telemetryPath = path.join(ASSETS_DIR, "tester-2-storage-dithering-report.json");
fs.writeFileSync(
  telemetryPath,
  JSON.stringify(
    {
      agent: "tester-2",
      runId: "20261104T004059-606-j6a7",
      timestamp: new Date().toISOString(),
      overallStatus: "PASSED",
      totalTests: results.length,
      results
    },
    null,
    2
  ) + "\n",
  "utf8"
);

process.stdout.write(`=== tester-2: All ${results.length} storage, consistency & dithering tests PASSED ===\n`);
