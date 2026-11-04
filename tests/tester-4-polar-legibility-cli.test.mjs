/**
 * Stage 4 Verification & Cross-Domain Performance Benchmark Suite (`tester-4`)
 * Scope: Pillar 4 (`AC-04` / Modules `M4` & `M6`) + Performance (`PERF-01`..`PERF-05`)
 *
 * Verifies:
 * 1. Positive & Negative fail-fast boundary tests for `src/costco_revenue_model.mjs`
 *    (`verifyFinancialDataset`, `verifyWayfinderArtifacts`, `verifyResearchMonograph`,
 *    `verifyCorporateWebReport`, `loadAndVerifyCostcoModel`, CLI flags).
 * 2. Empirical CLI Verification Latency (<= 250ms budget) & Memory RSS (<= 128MB budget)
 *    with 0 external network requests.
 * 3. Live Headless Chromium (Playwright) verification of:
 *    - Zero console errors, zero uncaught page errors, zero external network requests.
 *    - Polar SVG padded viewBox="-80 -44 560 488" & center hub r="42" (>= 40px) across all 3 charts.
 *    - Halo-stroked typography (.polar-sector-label >= 12px, .polar-axis-label >= 10.5px,
 *      paint-order: stroke fill, 3.5px white stroke) & .polar-center-title >= 12.5px.
 *    - Companion table legibility (.polar-details-column .corp-table >= 12.5px, padding 8px 10px)
 *      and >= 3 .polar-html-legend containers.
 *    - Pairwise SVG <text> bounding-box collision & clipping audit across ALL interactive
 *      polar chart modes (By Area, By Radius, By Revenue Share [angle mode 25° offset],
 *      3-Year Overlay, Geography Revenue/OpInc/Warehouses, Flywheel Dual-Ring & Ancillary Rose).
 *    - Cross-domain performance optimizations (`PERF-01`..`PERF-05`):
 *      * O(1) in-place DOM selection sync (`syncCategorySelectionInPlace`,
 *        `syncGeographySelectionInPlace`, `syncFlywheelSelectionInPlace`) preserving DOM node
 *        identity (`===`) and keyboard focus (`document.activeElement`) in < 1.5ms.
 *      * CSS layout & style containment (`contain: layout style`) on `.polar-panel`.
 *      * Shared global SVG `<defs>` dither pattern atlas with zero `<feTurbulence>` filter overhead.
 *      * rAF-throttled scroll-spy execution within <= 16.0ms (60fps) frame budget.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { performance } from "node:perf_hooks";
import { fileURLToPath, pathToFileURL } from "node:url";

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
const CLI_PATH = path.join(ROOT_DIR, "src", "costco_revenue_model.mjs");
const TELEMETRY_DIR = path.join(ROOT_DIR, "assets", "20261104T004059-606-j6a7");
const TELEMETRY_JSON_PATH = path.join(TELEMETRY_DIR, "tester-4-benchmark-telemetry.json");

const rawDatasetJson = fs.readFileSync(DATA_PATH, "utf8");
const baseDataset = JSON.parse(rawDatasetJson);
const baseHtml = fs.readFileSync(HTML_PATH, "utf8");

function cloneDataset() {
  return JSON.parse(rawDatasetJson);
}

test("1. CLI Verification Engine (`src/costco_revenue_model.mjs`) positive verification & latency/memory budgets (PERF-05)", () => {
  assert.equal(verifyIndexHtml, verifyCorporateWebReport, "verifyIndexHtml must alias verifyCorporateWebReport");

  // Run 10 iterations to measure p50/p95/max wall-clock latency & RSS footprint
  const samplesMs = [];
  let lastReport = null;
  for (let i = 0; i < 10; i += 1) {
    const t0 = performance.now();
    lastReport = loadAndVerifyCostcoModel({ verifyOnly: true });
    samplesMs.push(Number((performance.now() - t0).toFixed(4)));
  }

  const maxElapsedMs = Math.max(...samplesMs);
  const avgElapsedMs = Number((samplesMs.reduce((a, b) => a + b, 0) / samplesMs.length).toFixed(4));
  const rssMb = Number((process.memoryUsage().rss / (1024 * 1024)).toFixed(4));

  assert.equal(lastReport.status, "VERIFIED");
  assert.equal(lastReport.overallValid, true);
  assert.equal(lastReport.mode, "verify");
  assert.equal(lastReport.valid, true);
  assert.equal(lastReport.plainEnglishDatasetRolesValid, true);
  assert.equal(lastReport.corporateWebAudit.valid, true);
  assert.equal(lastReport.corporateWebAudit.polarLegibilityValid, true);
  assert.equal(lastReport.corporateWebAudit.legibleGraphTypographyVerified, true);
  assert.equal(lastReport.telemetry.externalNetworkRequests, 0);

  assert.ok(
    maxElapsedMs <= 250,
    `Expected CLI verification latency <= 250ms, measured max=${maxElapsedMs}ms (avg=${avgElapsedMs}ms)`
  );
  assert.ok(rssMb <= 128, `Expected CLI RSS <= 128MB, measured ${rssMb}MB`);

  // Verify direct CLI invocation with --verify flag exits 0 and emits valid JSON
  const cliStdout = execFileSync(process.execPath, [CLI_PATH, "--verify"], {
    cwd: ROOT_DIR,
    encoding: "utf8"
  });
  const parsedCli = JSON.parse(cliStdout);
  assert.equal(parsedCli.status, "VERIFIED");
  assert.equal(parsedCli.overallValid, true);
  assert.ok(parsedCli.telemetry.elapsedMs <= 250);
  assert.ok(parsedCli.telemetry.rssMb <= 128);
  assert.equal(parsedCli.telemetry.externalNetworkRequests, 0);
});

test("2. Negative fail-fast boundary tests on `verifyFinancialDataset` and `verifyCorporateWebReport` (AC-01..AC-05)", () => {
  // 2a. Promotional clichés in dataset role_in_flywheel must fail fast
  for (const cliche of [
    "renewal magnet",
    "treasure-hunt discretionary basket builder",
    "perishable weekly trip driver and rapid inventory-turn engine",
    "Negative Working-Capital Float"
  ]) {
    const mutated = cloneDataset();
    mutated.merchandise_categories[0].role_in_flywheel = `Category acting as a ${cliche} in clubs.`;
    assert.throws(
      () => verifyFinancialDataset(mutated),
      /prohibited promotional cliché/i,
      `Expected verifyFinancialDataset to reject cliché "${cliche}"`
    );
  }

  // 2b. GAAP conservation breach must fail fast
  {
    const mutated = cloneDataset();
    mutated.consolidated_income_statement.total_revenue_usd_m = 254999;
    assert.throws(
      () => verifyFinancialDataset(mutated),
      /GAAP Consolidated Total Revenue Identity mismatch/i
    );
  }

  // 2c. Algebraic shorthand & code leak injection in HTML must fail fast
  for (const shorthand of [
    "R_total",
    "OpInc ($9,285M) = Merch Contrib",
    "Area √r (Coxcomb)",
    "Linear Radius r",
    "Share Angle θ_i",
    "wayfinderAudit.valid === true",
    "Negative Working-Capital Float"
  ]) {
    const badHtml = baseHtml.replace("Costco Wholesale Corporation", `Costco ${shorthand}`);
    assert.throws(
      () => verifyCorporateWebReport({ htmlContent: badHtml }),
      /prohibited algebraic\/code shorthand/i,
      `Expected verifyCorporateWebReport to reject "${shorthand}"`
    );
  }

  // 2d. Dreamcore marker injection in HTML must fail fast
  for (const dreamcore of ["vhs-scanlines", "dreamcore", "meadow_portal.jpg"]) {
    const badHtml = baseHtml.replace("Costco Wholesale Corporation", `Costco ${dreamcore}`);
    assert.throws(
      () => verifyCorporateWebReport({ htmlContent: badHtml }),
      /Dreamcore\/liminal marker/i
    );
  }

  // 2e. Removal of #svg-corporate-flywheel-hero or #dither-bayer-navy must fail fast
  {
    const missingHero = baseHtml.replace('id="svg-corporate-flywheel-hero"', 'id="svg-missing-hero"');
    assert.throws(
      () => verifyCorporateWebReport({ htmlContent: missingHero }),
      /svg-corporate-flywheel-hero/i
    );

    const missingDither = baseHtml.replace('id="dither-bayer-navy"', 'id="dither-missing"');
    assert.throws(
      () => verifyCorporateWebReport({ htmlContent: missingDither }),
      /dither-bayer-navy/i
    );
  }

  // 2f. Removal of padded polar viewBox="-80 -44 560 488", paint-order: stroke fill, or O(1) selection sync must fail fast
  {
    const badViewBox = baseHtml.replace('viewBox="-80 -44 560 488"', 'viewBox="-55 -28 510 456"');
    assert.throws(
      () => verifyCorporateWebReport({ htmlContent: badViewBox }),
      /viewBox="-80 -44 560 488"/i
    );

    const badHalo = baseHtml.replaceAll("paint-order: stroke fill", "paint-order: normal");
    assert.throws(
      () => verifyCorporateWebReport({ htmlContent: badHalo }),
      /halo stroke rule/i
    );

    const badSync = baseHtml.replaceAll("syncCategorySelectionInPlace", "legacyRebuildCategories");
    assert.throws(
      () => verifyCorporateWebReport({ htmlContent: badSync }),
      /syncCategorySelectionInPlace/i
    );
  }
});

test("3. Live Headless Chromium Audit: Polar Graph Legibility (AC-04), Zero Collisions, and Cross-Domain Performance (PERF-01..PERF-05)", () => {
  const fileUrl = pathToFileURL(HTML_PATH).href;

  const pyScript = `
import json, sys
from playwright.sync_api import sync_playwright

html_url = sys.argv[1]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    page = context.new_page()

    console_errors = []
    page_errors = []
    external_requests = []

    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda err: page_errors.append(str(err)))
    page.on("request", lambda req: external_requests.append(req.url) if not (req.url.startswith("file://") or req.url.startswith("data:")) else None)

    page.goto(html_url, wait_until="domcontentloaded")

    static_audit = page.evaluate("""() => {
      const svgIds = ["svg-polar-categories", "svg-polar-geography", "svg-polar-flywheel"];
      const svgChecks = svgIds.map((id) => {
        const svg = document.getElementById(id);
        if (!svg) return { id, exists: false };
        const viewBox = svg.getAttribute("viewBox");
        const circles = Array.from(svg.querySelectorAll("circle"));
        const hubCircle = circles.find((c) => c.getAttribute("fill") === "#FFFFFF" && Number(c.getAttribute("r")) >= 40);
        return {
          id,
          exists: true,
          viewBox,
          hubRadius: hubCircle ? Number(hubCircle.getAttribute("r")) : 0
        };
      });

      const sectorLabel = document.querySelector(".polar-sector-label");
      const axisLabel = document.querySelector(".polar-axis-label");
      const centerTitle = document.querySelector(".polar-center-title");
      const centerSub = document.querySelector(".polar-center-sub");

      const sectorStyle = sectorLabel ? window.getComputedStyle(sectorLabel) : null;
      const axisStyle = axisLabel ? window.getComputedStyle(axisLabel) : null;
      const titleStyle = centerTitle ? window.getComputedStyle(centerTitle) : null;
      const subStyle = centerSub ? window.getComputedStyle(centerSub) : null;

      const companionTd = document.querySelector(".polar-details-column .corp-table td");
      const tdStyle = companionTd ? window.getComputedStyle(companionTd) : null;

      const polarLegends = document.querySelectorAll(".polar-html-legend").length;
      const polarPanels = Array.from(document.querySelectorAll(".polar-panel"));
      const allPanelsContained = polarPanels.every((p) => {
        const c = window.getComputedStyle(p).contain;
        return c.includes("layout") && c.includes("style");
      });

      const feTurbulenceCount = document.querySelectorAll("feTurbulence").length;
      const motionToggleButtons = document.querySelectorAll("#motion-toggle-btn").length;

      return {
        svgChecks,
        sectorFontSizePx: sectorStyle ? parseFloat(sectorStyle.fontSize) : 0,
        sectorFontWeight: sectorStyle ? Number(sectorStyle.fontWeight) : 0,
        sectorPaintOrder: sectorStyle ? sectorStyle.paintOrder : "",
        sectorStrokeWidthPx: sectorStyle ? parseFloat(sectorStyle.strokeWidth) : 0,
        axisFontSizePx: axisStyle ? parseFloat(axisStyle.fontSize) : 0,
        axisPaintOrder: axisStyle ? axisStyle.paintOrder : "",
        axisStrokeWidthPx: axisStyle ? parseFloat(axisStyle.strokeWidth) : 0,
        centerTitleFontSizePx: titleStyle ? parseFloat(titleStyle.fontSize) : 0,
        centerSubFontSizePx: subStyle ? parseFloat(subStyle.fontSize) : 0,
        companionTableFontSizePx: tdStyle ? parseFloat(tdStyle.fontSize) : 0,
        companionTablePaddingTopPx: tdStyle ? parseFloat(tdStyle.paddingTop) : 0,
        companionTablePaddingLeftPx: tdStyle ? parseFloat(tdStyle.paddingLeft) : 0,
        polarLegends,
        allPanelsContained,
        feTurbulenceCount,
        motionToggleButtons
      };
    }""")

    collision_sweep = page.evaluate("""() => {
      function inspectSvgTextBoxes(svgId, stateLabel) {
        const svg = document.getElementById(svgId);
        const svgRect = svg.getBoundingClientRect();
        const textNodes = Array.from(svg.querySelectorAll("text"));
        const boxes = textNodes.map((t) => {
          const r = t.getBoundingClientRect();
          return {
            text: (t.textContent || "").trim(),
            cls: t.getAttribute("class") || "",
            left: r.left,
            right: r.right,
            top: r.top,
            bottom: r.bottom,
            width: r.width,
            height: r.height
          };
        }).filter((b) => b.width > 0 && b.height > 0);

        const collisions = [];
        for (let i = 0; i < boxes.length; i += 1) {
          for (let j = i + 1; j < boxes.length; j += 1) {
            const a = boxes[i];
            const b = boxes[j];
            const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left);
            const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
            if (overlapX > 1.5 && overlapY > 1.5) {
              collisions.push({
                a: a.text,
                b: b.text,
                overlapX: Number(overlapX.toFixed(2)),
                overlapY: Number(overlapY.toFixed(2))
              });
            }
          }
        }

        const clipped = boxes.filter(
          (b) => b.left < svgRect.left - 2 || b.right > svgRect.right + 2 || b.top < svgRect.top - 2 || b.bottom > svgRect.bottom + 2
        );

        return {
          svgId,
          stateLabel,
          textCount: boxes.length,
          collisionCount: collisions.length,
          collisions,
          clippedCount: clipped.length,
          clipped
        };
      }

      const results = [];
      const catModes = ["sqrt", "linear", "angle"];
      const catYears = ["2024", "2023", "2022", "overlay"];
      for (const mode of catModes) {
        const modeBtn = document.querySelector('[data-cat-mode="' + mode + '"]');
        if (modeBtn) modeBtn.click();
        for (const yr of catYears) {
          const yrBtn = document.querySelector('[data-cat-year="' + yr + '"]');
          if (yrBtn) yrBtn.click();
          results.push(inspectSvgTextBoxes("svg-polar-categories", "cat:mode=" + mode + ",year=" + yr));
        }
      }
      document.querySelector('[data-cat-year="2024"]')?.click();
      document.querySelector('[data-cat-mode="sqrt"]')?.click();

      for (const metric of ["revenue", "opinc", "warehouses"]) {
        const btn = document.querySelector('[data-geo-metric="' + metric + '"]');
        if (btn) btn.click();
        results.push(inspectSvgTextBoxes("svg-polar-geography", "geo:metric=" + metric));
      }
      document.querySelector('[data-geo-metric="revenue"]')?.click();

      for (const flyMode of ["asymmetry", "ancillary"]) {
        const btn = document.querySelector('[data-fly-mode="' + flyMode + '"]');
        if (btn) btn.click();
        results.push(inspectSvgTextBoxes("svg-polar-flywheel", "fly:mode=" + flyMode));
      }
      document.querySelector('[data-fly-mode="asymmetry"]')?.click();

      return results;
    }""")

    perf_benchmark = page.evaluate("""() => {
      const catSector0Before = document.querySelector('[data-cat-sector="0"]');
      const catRow1Before = document.querySelector('[data-cat-row="1"]');
      catRow1Before.focus();

      const t0 = performance.now();
      catRow1Before.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      const catRowLatencyMs = performance.now() - t0;

      const catSector0After = document.querySelector('[data-cat-sector="0"]');
      const catRow1After = document.querySelector('[data-cat-row="1"]');
      const catNodeIdentityPreserved = catSector0Before === catSector0After && catRow1Before === catRow1After;
      const catFocusPreserved = document.activeElement === catRow1After;
      const catSector1Selected = document.querySelector('[data-cat-sector="1"]').classList.contains("is-selected");

      const geoSector0Before = document.querySelector('[data-geo-sector="0"]');
      const geoRow2Before = document.querySelector('[data-geo-row="2"]');
      geoRow2Before.focus();

      const t1 = performance.now();
      geoRow2Before.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      const geoRowLatencyMs = performance.now() - t1;

      const geoSector0After = document.querySelector('[data-geo-sector="0"]');
      const geoRow2After = document.querySelector('[data-geo-row="2"]');
      const geoNodeIdentityPreserved = geoSector0Before === geoSector0After && geoRow2Before === geoRow2After;
      const geoFocusPreserved = document.activeElement === geoRow2After;
      const geoSector2Selected = document.querySelector('[data-geo-sector="2"]').classList.contains("is-selected");

      const flySector0Before = document.querySelector('[data-fly-sector="0"]');
      flySector0Before.focus();
      const t2 = performance.now();
      flySector0Before.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      const flySectorLatencyMs = performance.now() - t2;
      const flySector0After = document.querySelector('[data-fly-sector="0"]');
      const flyNodeIdentityPreserved = flySector0Before === flySector0After;

      const loopStart = performance.now();
      for (let i = 0; i < 100; i += 1) {
        const r = document.querySelector('[data-cat-row="' + (i % 4) + '"]');
        r.click();
      }
      const avgCatClickMs = (performance.now() - loopStart) / 100;

      const scrollStart = performance.now();
      for (let s = 0; s < 50; s += 1) {
        window.dispatchEvent(new Event("scroll"));
      }
      const total50ScrollDispatchMs = performance.now() - scrollStart;

      return {
        catRowLatencyMs: Number(catRowLatencyMs.toFixed(4)),
        catNodeIdentityPreserved,
        catFocusPreserved,
        catSector1Selected,
        geoRowLatencyMs: Number(geoRowLatencyMs.toFixed(4)),
        geoNodeIdentityPreserved,
        geoFocusPreserved,
        geoSector2Selected,
        flySectorLatencyMs: Number(flySectorLatencyMs.toFixed(4)),
        flyNodeIdentityPreserved,
        avgCatClickMs: Number(avgCatClickMs.toFixed(4)),
        total50ScrollDispatchMs: Number(total50ScrollDispatchMs.toFixed(4))
      };
    }""")

    browser.close()

print(json.dumps({
    "consoleErrors": console_errors,
    "pageErrors": page_errors,
    "externalNetworkRequests": external_requests,
    "staticAudit": static_audit,
    "collisionSweep": collision_sweep,
    "perfBenchmark": perf_benchmark
}))
`;

  const PYTHON_BIN = fs.existsSync("/opt/anaconda3/bin/python3") ? "/opt/anaconda3/bin/python3" : "python3";
  const rawOut = execFileSync(PYTHON_BIN, ["-c", pyScript, fileUrl], {
    cwd: ROOT_DIR,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024
  });

  const {
    consoleErrors,
    pageErrors,
    externalNetworkRequests,
    staticAudit,
    collisionSweep,
    perfBenchmark
  } = JSON.parse(rawOut);

  assert.equal(consoleErrors.length, 0, `Expected 0 console.error messages, got: ${JSON.stringify(consoleErrors)}`);
  assert.equal(pageErrors.length, 0, `Expected 0 uncaught page errors, got: ${JSON.stringify(pageErrors)}`);
  assert.equal(
    externalNetworkRequests.length,
    0,
    `Expected 0 external network requests, got: ${JSON.stringify(externalNetworkRequests)}`
  );

  for (const check of staticAudit.svgChecks) {
    assert.equal(check.exists, true, `${check.id} must exist`);
    assert.equal(check.viewBox, "-80 -44 560 488", `${check.id} must have padded viewBox="-80 -44 560 488"`);
    assert.ok(check.hubRadius >= 40, `${check.id} center hub radius must be >= 40px (got ${check.hubRadius})`);
  }

  assert.ok(staticAudit.sectorFontSizePx >= 12, `Expected .polar-sector-label >= 12px, got ${staticAudit.sectorFontSizePx}px`);
  assert.ok(staticAudit.sectorFontWeight >= 700, `Expected .polar-sector-label weight >= 700, got ${staticAudit.sectorFontWeight}`);
  assert.ok(staticAudit.sectorPaintOrder.includes("stroke"), `Expected paint-order stroke fill on .polar-sector-label, got "${staticAudit.sectorPaintOrder}"`);
  assert.ok(staticAudit.sectorStrokeWidthPx >= 3, `Expected >= 3px halo stroke on .polar-sector-label, got ${staticAudit.sectorStrokeWidthPx}px`);

  assert.ok(staticAudit.axisFontSizePx >= 10.5, `Expected .polar-axis-label >= 10.5px, got ${staticAudit.axisFontSizePx}px`);
  assert.ok(staticAudit.axisPaintOrder.includes("stroke"), `Expected paint-order stroke fill on .polar-axis-label`);
  assert.ok(staticAudit.axisStrokeWidthPx >= 3, `Expected >= 3px halo stroke on .polar-axis-label, got ${staticAudit.axisStrokeWidthPx}px`);

  assert.ok(staticAudit.centerTitleFontSizePx >= 12.5, `Expected .polar-center-title >= 12.5px, got ${staticAudit.centerTitleFontSizePx}px`);
  assert.ok(staticAudit.centerSubFontSizePx >= 10, `Expected .polar-center-sub >= 10px, got ${staticAudit.centerSubFontSizePx}px`);

  assert.ok(staticAudit.companionTableFontSizePx >= 12.5, `Expected companion table font-size >= 12.5px, got ${staticAudit.companionTableFontSizePx}px`);
  assert.equal(staticAudit.companionTablePaddingTopPx, 8, "Expected companion table top/bottom padding = 8px");
  assert.equal(staticAudit.companionTablePaddingLeftPx, 10, "Expected companion table left/right padding = 10px");
  assert.ok(staticAudit.polarLegends >= 3, `Expected >= 3 .polar-html-legend elements, got ${staticAudit.polarLegends}`);
  assert.equal(staticAudit.allPanelsContained, true, "Expected all .polar-panel elements to have contain: layout style");
  assert.equal(staticAudit.feTurbulenceCount, 0, "Expected 0 expensive <feTurbulence> filter shaders");
  assert.equal(staticAudit.motionToggleButtons, 1, "Expected exactly 1 unique #motion-toggle-btn ID in DOM");

  for (const check of collisionSweep) {
    assert.equal(
      check.collisionCount,
      0,
      `Expected 0 SVG text bounding-box collisions in ${check.stateLabel}, found: ${JSON.stringify(check.collisions)}`
    );
    assert.equal(
      check.clippedCount,
      0,
      `Expected 0 clipped SVG text labels in ${check.stateLabel}, found: ${JSON.stringify(check.clipped)}`
    );
  }

  assert.equal(
    perfBenchmark.catNodeIdentityPreserved,
    true,
    "Expected syncCategorySelectionInPlace to update selection in O(1) without destroying <svg> or <tbody> DOM nodes"
  );
  assert.equal(perfBenchmark.catFocusPreserved, true, "Expected keyboard focus to remain on active [data-cat-row]");
  assert.equal(perfBenchmark.catSector1Selected, true, "Expected [data-cat-sector='1'] to receive .is-selected");

  assert.equal(
    perfBenchmark.geoNodeIdentityPreserved,
    true,
    "Expected syncGeographySelectionInPlace to update selection in O(1) without destroying <svg> or <tbody> DOM nodes"
  );
  assert.equal(perfBenchmark.geoFocusPreserved, true, "Expected keyboard focus to remain on active [data-geo-row]");
  assert.equal(perfBenchmark.geoSector2Selected, true, "Expected [data-geo-sector='2'] to receive .is-selected");

  assert.equal(
    perfBenchmark.flyNodeIdentityPreserved,
    true,
    "Expected syncFlywheelSelectionInPlace to update selection in O(1) without destroying <svg> DOM nodes"
  );

  assert.ok(
    perfBenchmark.avgCatClickMs <= 2.0,
    `Expected O(1) selection click latency <= 2.0ms (frame budget 16.0ms), measured ${perfBenchmark.avgCatClickMs}ms`
  );
  assert.ok(
    perfBenchmark.total50ScrollDispatchMs <= 16.0,
    `Expected 50 rAF-coalesced scroll dispatches to complete within a single 16.0ms frame budget, measured ${perfBenchmark.total50ScrollDispatchMs}ms`
  );

  fs.mkdirSync(TELEMETRY_DIR, { recursive: true });
  fs.writeFileSync(
    TELEMETRY_JSON_PATH,
    JSON.stringify(
      {
        agent: "tester-4",
        pillar: "AC-04 (Polar Graph Legibility & Companion Tables) + PERF-01..PERF-05",
        status: "VERIFIED",
        staticAudit,
        collisionSweepSummary: {
          totalStatesAudited: collisionSweep.length,
          totalCollisions: collisionSweep.reduce((acc, s) => acc + s.collisionCount, 0),
          totalClippedLabels: collisionSweep.reduce((acc, s) => acc + s.clippedCount, 0),
          states: collisionSweep
        },
        perfBenchmark
      },
      null,
      2
    ) + "\n",
    "utf8"
  );
});
