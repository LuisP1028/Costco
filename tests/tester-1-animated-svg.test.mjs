import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  verifyFinancialDataset,
  verifyWayfinderArtifacts,
  verifyResearchMonograph,
  verifyCorporateWebReport,
  verifyIndexHtml,
  loadAndVerifyCostcoModel
} from "../src/costco_revenue_model.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const INDEX_HTML_PATH = path.join(REPO_ROOT, "index.html");
const ASSETS_DIR = path.join(REPO_ROOT, "assets", "20261104T004059-606-j6a7");
const PYTHON_BIN = fs.existsSync("/opt/anaconda3/bin/python3")
  ? "/opt/anaconda3/bin/python3"
  : "python3";

describe("Tester-1: System Architecture, Execution DAG & Corporate Animated SVG Verification (AC-01 / M1..M6)", () => {
  it("1. verifies Execution DAG orchestration, module I/O contracts, and operational budgets (<=250ms, <=128MB RSS, 0 network)", () => {
    const t0 = performance.now();
    const report = loadAndVerifyCostcoModel({ rootDir: REPO_ROOT });
    const wallElapsedMs = performance.now() - t0;

    assert.equal(report.status, "VERIFIED");
    assert.equal(report.overallValid, true);
    assert.equal(report.valid, true);
    assert.equal(report.totalRevenueCheck, true);
    assert.equal(report.operatingIncomeCheck, true);
    assert.equal(report.preTaxAndNetIncomeCheck, true);
    assert.equal(report.plainEnglishDatasetRolesValid, true);

    // Verify discrete module contracts (M2, M6)
    const rawDataset = JSON.parse(
      fs.readFileSync(path.join(REPO_ROOT, "data", "costco_revenue_breakdown.json"), "utf8")
    );
    const finAudit = verifyFinancialDataset(rawDataset);
    assert.equal(finAudit.valid, true);
    assert.equal(finAudit.plainEnglishDatasetRolesValid, true);

    const wfAudit = verifyWayfinderArtifacts({
      mapPath: path.join(REPO_ROOT, "wayfinder", "map.md"),
      ticketsDir: path.join(REPO_ROOT, "wayfinder", "tickets")
    });
    assert.equal(wfAudit.valid, true);
    assert.equal(wfAudit.resolvedTicketCount, 6);

    const resAudit = verifyResearchMonograph({
      researchPath: path.join(REPO_ROOT, "research", "costco_revenue_architecture.md")
    });
    assert.equal(resAudit.valid, true);

    // Primary-source Form 10-K formatted ratio invariants
    assert.equal(report.formattedRatios.netSalesSharePct, "98.10");
    assert.equal(report.formattedRatios.membershipFeeShareOfRevenuePct, "1.90");
    assert.equal(report.formattedRatios.merchandiseGrossMarginPct, "10.92");
    assert.equal(report.formattedRatios.sgaPctOfNetSales, "9.14");
    assert.equal(report.formattedRatios.membershipFeeShareOfOperatingIncomePct, "52.00");
    assert.equal(report.formattedRatios.merchandiseOperatingContributionSharePct, "48.00");
    assert.equal(report.formattedRatios.accountsPayableToInventoryRatioPct, "104.15");
    assert.equal(report.merchandiseOperatingContributionUsdM, 4457);

    // Sub-module audit objects in Execution DAG output
    assert.equal(report.wayfinderAudit.valid, true);
    assert.equal(report.wayfinderAudit.resolvedTicketCount, 6);
    assert.equal(report.researchAudit.valid, true);
    assert.equal(report.corporateWebAudit.valid, true);
    assert.equal(report.corporateWebAudit.animatedSvgElementsPresent, true);
    assert.equal(report.corporateWebAudit.corporateAnimatedSvgVerified, true);
    assert.equal(report.corporateWebAudit.ditherVisualEffectsPresent, true);
    assert.equal(report.corporateWebAudit.simplifiedEnglishValid, true);
    assert.equal(report.corporateWebAudit.polarLegibilityValid, true);
    assert.equal(report.corporateWebAudit.responsiveArchitectureValid, true);
    assert.equal(report.corporateWebAudit.keyboardAccessibilityVerified, true);

    // Alias parity check: verifyIndexHtml === verifyCorporateWebReport
    assert.equal(verifyIndexHtml, verifyCorporateWebReport);

    // Operational budget gates
    assert.ok(
      report.telemetry.elapsedMs <= 250,
      `Expected telemetry.elapsedMs <= 250ms, got ${report.telemetry.elapsedMs}ms`
    );
    assert.ok(
      wallElapsedMs <= 250,
      `Expected wall-clock execution <= 250ms, got ${wallElapsedMs.toFixed(2)}ms`
    );
    assert.ok(
      report.telemetry.rssMb <= 128,
      `Expected telemetry.rssMb <= 128MB, got ${report.telemetry.rssMb}MB`
    );
    assert.equal(report.telemetry.externalNetworkRequests, 0);
  });

  it("2. enforces fail-fast negative boundary checks on M1 animated SVG & motion contracts in verifyCorporateWebReport", () => {
    const rawHtml = fs.readFileSync(INDEX_HTML_PATH, "utf8");
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "costco-tester-1-"));

    try {
      // Case A: Missing #svg-corporate-flywheel-hero
      const missingHeroPath = path.join(tmpDir, "missing-hero.html");
      fs.writeFileSync(
        missingHeroPath,
        rawHtml.replaceAll("svg-corporate-flywheel-hero", "svg-removed-hero"),
        "utf8"
      );
      assert.throws(
        () => verifyCorporateWebReport({ htmlPath: missingHeroPath }),
        /svg-corporate-flywheel-hero/i,
        "Must fail fast when #svg-corporate-flywheel-hero is missing"
      );

      // Case B: Missing #svg-step-3 micro-SVG
      const missingStepSvgPath = path.join(tmpDir, "missing-step-svg.html");
      fs.writeFileSync(
        missingStepSvgPath,
        rawHtml.replaceAll("svg-step-3", "svg-removed-step-3"),
        "utf8"
      );
      assert.throws(
        () => verifyCorporateWebReport({ htmlPath: missingStepSvgPath }),
        /svg-step-3/i,
        "Must fail fast when a step micro-SVG (#svg-step-3) is missing"
      );

      // Case C: Missing prefers-reduced-motion: reduce media query
      const missingReducedMotionPath = path.join(tmpDir, "missing-reduced-motion.html");
      fs.writeFileSync(
        missingReducedMotionPath,
        rawHtml.replaceAll("prefers-reduced-motion: reduce", "prefers-color-scheme: light"),
        "utf8"
      );
      assert.throws(
        () => verifyCorporateWebReport({ htmlPath: missingReducedMotionPath }),
        /reduced-motion/i,
        "Must fail fast when @media (prefers-reduced-motion: reduce) is missing"
      );

      // Case D: Injected Dreamcore marker
      const dreamcorePath = path.join(tmpDir, "dreamcore.html");
      fs.writeFileSync(
        dreamcorePath,
        rawHtml.replace("</body>", "<div>vhs-scanlines dreamcore</div></body>"),
        "utf8"
      );
      assert.throws(
        () => verifyCorporateWebReport({ htmlPath: dreamcorePath }),
        /Dreamcore/i,
        "Must fail fast when prohibited Dreamcore markers are present"
      );
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("3. verifies live Chromium DOM, animated SVG schematics, bidirectional step-to-hero sync, and motion pause/reduced-motion controls", () => {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
    const fileUrl = pathToFileURL(INDEX_HTML_PATH).href;
    const screenshotPath = path.join(ASSETS_DIR, "tester-1-flywheel-hero.png");

    const pyScript = `
import json
import sys
from playwright.sync_api import sync_playwright

file_url = sys.argv[1]
screenshot_path = sys.argv[2]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    page = context.new_page()

    console_errors = []
    page_errors = []
    external_requests = []

    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda err: page_errors.append(str(err)))
    page.on("request", lambda req: external_requests.append(req.url) if req.url.startswith(("http://", "https://")) else None)

    page.goto(file_url, wait_until="domcontentloaded")

    svg_inventory = page.evaluate("""() => {
      const countById = (id) => document.querySelectorAll('[id="' + id + '"]').length;
      const hero = document.getElementById("svg-corporate-flywheel-hero");
      const heroRect = hero ? hero.getBoundingClientRect() : null;
      const heroText = hero ? (hero.textContent || "") : "";

      const stepSvgs = [1, 2, 3, 4, 5].map((n) => {
        const el = document.getElementById("svg-step-" + n);
        return {
          id: "svg-step-" + n,
          exists: Boolean(el),
          insideStepCard: Boolean(el && el.closest("#step-" + n)),
          hasTitle: Boolean(el && el.querySelector("title")),
          animatedPathCount: el ? el.querySelectorAll(".corp-anim-flow-path").length : 0
        };
      });

      const polarSvgs = ["svg-polar-categories", "svg-polar-geography", "svg-polar-flywheel"].map((id) => {
        const el = document.getElementById(id);
        return {
          id,
          exists: Boolean(el),
          compassRingCount: el ? el.querySelectorAll(".polar-compass-ring").length : 0,
          sweepIndicatorCount: el ? el.querySelectorAll(".polar-sweep-indicator").length : 0,
          activeArcCount: el ? el.querySelectorAll(".polar-active-arc").length : 0
        };
      });

      return {
        uniqueIds: {
          motionToggleBtn: countById("motion-toggle-btn"),
          flywheelHero: countById("svg-corporate-flywheel-hero"),
          polarCategories: countById("svg-polar-categories"),
          polarGeography: countById("svg-polar-geography"),
          polarFlywheel: countById("svg-polar-flywheel")
        },
        hero: {
          exists: Boolean(hero),
          role: hero ? hero.getAttribute("role") : null,
          viewBox: hero ? hero.getAttribute("viewBox") : null,
          hasTitle: Boolean(hero && hero.querySelector("title#flywheel-hero-title")),
          hasDesc: Boolean(hero && hero.querySelector("desc#flywheel-hero-desc")),
          width: heroRect ? heroRect.width : 0,
          height: heroRect ? heroRect.height : 0,
          nodeCount: hero ? hero.querySelectorAll("[data-hero-node]").length : 0,
          flowCount: hero ? hero.querySelectorAll("[data-hero-flow].corp-anim-flow-path").length : 0,
          text: heroText
        },
        stepSvgs,
        polarSvgs
      };
    }""")

    step_sync_results = {}
    for step_num in [1, 2, 3, 4, 5]:
        page.click(f'[data-step-btn="{step_num}"]')
        step_sync_results[str(step_num)] = page.evaluate("""(sNum) => {
          const activeHeroNodes = Array.from(
            document.querySelectorAll("#svg-corporate-flywheel-hero [data-hero-node].is-active-node")
          ).map((el) => Number(el.getAttribute("data-hero-node")));
          const linkedHeroNodes = Array.from(
            document.querySelectorAll("#svg-corporate-flywheel-hero [data-hero-node].is-step-linked")
          ).map((el) => Number(el.getAttribute("data-hero-node")));
          const activeFlows = Array.from(
            document.querySelectorAll("#svg-corporate-flywheel-hero [data-hero-flow].is-active-flow")
          ).map((el) => Number(el.getAttribute("data-hero-flow")));
          const stepCardActive = document.getElementById("step-" + sNum)?.classList.contains("is-active-step");
          const stepSvgRect = document.getElementById("svg-step-" + sNum)?.getBoundingClientRect();
          const statusText = document.getElementById("flywheel-hero-status")?.textContent || "";
          return {
            activeHeroNodes,
            linkedHeroNodes,
            activeFlows,
            stepCardActive,
            stepSvgWidth: stepSvgRect ? stepSvgRect.width : 0,
            statusText
          };
        }""", step_num)

    # Reverse direction: clicking [data-flywheel-node="3"] activates Step 4
    page.click('#svg-corporate-flywheel-hero [data-flywheel-node="3"]')
    reverse_sync_step4 = page.evaluate("""() => ({
      step4Active: document.getElementById("step-4")?.classList.contains("is-active-step"),
      btn4Selected: document.querySelector('[data-step-btn="4"]')?.getAttribute("aria-selected")
    })""")

    # Interactive table row click & active arc update
    page.click('#tbody-polar-categories [data-cat-row="2"]')
    cat_row_selection = page.evaluate("""() => {
      const selectedSector = document.querySelector('#svg-polar-categories [data-cat-sector="2"]');
      const activeArc = document.querySelector('#svg-polar-categories [data-polar-active-arc="cat"]');
      return {
        sectorSelected: Boolean(selectedSector?.classList.contains("is-selected")),
        arcMatchesSector: activeArc?.getAttribute("d") === selectedSector?.getAttribute("d")
      };
    }""")

    initial_motion = page.evaluate("""() => {
      const btn = document.getElementById("motion-toggle-btn");
      const flowPath = document.querySelector("#svg-corporate-flywheel-hero .corp-anim-flow-path");
      const cs = flowPath ? window.getComputedStyle(flowPath) : null;
      return {
        isPausedClass: document.documentElement.classList.contains("is-motion-paused"),
        ariaPressed: btn?.getAttribute("aria-pressed"),
        animationPlayState: cs?.animationPlayState,
        animationName: cs?.animationName
      };
    }""")

    page.click("#motion-toggle-btn")
    paused_motion = page.evaluate("""() => {
      const btn = document.getElementById("motion-toggle-btn");
      const label = btn?.querySelector("[data-motion-label]")?.textContent?.trim();
      const flowPath = document.querySelector("#svg-corporate-flywheel-hero .corp-anim-flow-path");
      const compassRing = document.querySelector("#svg-polar-categories .polar-compass-ring");
      const heroSvg = document.getElementById("svg-corporate-flywheel-hero");
      const csFlow = flowPath ? window.getComputedStyle(flowPath) : null;
      const csRing = compassRing ? window.getComputedStyle(compassRing) : null;
      return {
        isPausedClass: document.documentElement.classList.contains("is-motion-paused"),
        animationsPausedClass: document.documentElement.classList.contains("animations-paused"),
        ariaPressed: btn?.getAttribute("aria-pressed"),
        label,
        flowPlayState: csFlow?.animationPlayState,
        ringPlayState: csRing?.animationPlayState,
        svgAnimationsPaused: heroSvg && typeof heroSvg.animationsPaused === "function" ? heroSvg.animationsPaused() : true
      };
    }""")

    page.click("#motion-toggle-btn")
    resumed_motion = page.evaluate("""() => {
      const btn = document.getElementById("motion-toggle-btn");
      const label = btn?.querySelector("[data-motion-label]")?.textContent?.trim();
      const heroSvg = document.getElementById("svg-corporate-flywheel-hero");
      return {
        isPausedClass: document.documentElement.classList.contains("is-motion-paused"),
        ariaPressed: btn?.getAttribute("aria-pressed"),
        label,
        svgAnimationsPaused: heroSvg && typeof heroSvg.animationsPaused === "function" ? heroSvg.animationsPaused() : false
      };
    }""")

    page.emulate_media(reduced_motion="reduce")
    page.reload(wait_until="domcontentloaded")
    reduced_motion_state = page.evaluate("""() => {
      const flowPath = document.querySelector("#svg-corporate-flywheel-hero .corp-anim-flow-path");
      const cs = flowPath ? window.getComputedStyle(flowPath) : null;
      return {
        matchesMedia: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        isPausedClass: document.documentElement.classList.contains("is-motion-paused"),
        animationPlayState: cs?.animationPlayState,
        animationName: cs?.animationName
      };
    }""")

    page.locator("#svg-corporate-flywheel-hero").screenshot(path=screenshot_path)
    context.close()
    browser.close()

    print(json.dumps({
      "consoleErrors": console_errors,
      "pageErrors": page_errors,
      "externalRequests": external_requests,
      "svgInventory": svg_inventory,
      "stepSyncResults": step_sync_results,
      "reverseSyncStep4": reverse_sync_step4,
      "catRowSelection": cat_row_selection,
      "initialMotion": initial_motion,
      "pausedMotion": paused_motion,
      "resumedMotion": resumed_motion,
      "reducedMotionState": reduced_motion_state
    }))
`;

    const stdout = execFileSync(PYTHON_BIN, ["-c", pyScript, fileUrl, screenshotPath], {
      encoding: "utf8",
      maxBuffer: 16 * 1024 * 1024
    });
    const result = JSON.parse(stdout.trim());

    // 3.1 Zero runtime errors & zero external network requests
    assert.deepEqual(result.consoleErrors, [], `Expected 0 console errors, got: ${result.consoleErrors.join("; ")}`);
    assert.deepEqual(result.pageErrors, [], `Expected 0 page errors, got: ${result.pageErrors.join("; ")}`);
    assert.deepEqual(result.externalRequests, [], `Expected 0 external network requests, got: ${result.externalRequests.join("; ")}`);

    // 3.2 Canonical ID uniqueness & SVG schematic inventory
    const { svgInventory } = result;
    assert.equal(svgInventory.uniqueIds.motionToggleBtn, 1, "Must have exactly 1 #motion-toggle-btn");
    assert.equal(svgInventory.uniqueIds.flywheelHero, 1, "Must have exactly 1 #svg-corporate-flywheel-hero");
    assert.equal(svgInventory.uniqueIds.polarCategories, 1);
    assert.equal(svgInventory.uniqueIds.polarGeography, 1);
    assert.equal(svgInventory.uniqueIds.polarFlywheel, 1);

    assert.equal(svgInventory.hero.exists, true);
    assert.equal(svgInventory.hero.role, "img");
    assert.equal(svgInventory.hero.hasTitle, true);
    assert.equal(svgInventory.hero.hasDesc, true);
    assert.ok(svgInventory.hero.width > 200 && svgInventory.hero.height > 40);
    assert.equal(svgInventory.hero.nodeCount, 4, "Hero flywheel must have 4 telemetry nodes");
    assert.equal(svgInventory.hero.flowCount, 4, "Hero flywheel must have 4 animated flow paths");

    for (const token of [
      "$4,828M",
      "1.90%",
      "$249,625M",
      "98.10%",
      "10.92%",
      "104.15%",
      "$4,457M",
      "48.00%",
      "$9,285M",
      "52.00%",
      "$7,367M"
    ]) {
      assert.ok(
        svgInventory.hero.text.includes(token),
        `Expected #svg-corporate-flywheel-hero to display primary-source figure ${token}`
      );
    }

    for (const stepSvg of svgInventory.stepSvgs) {
      assert.equal(stepSvg.exists, true, `${stepSvg.id} must exist`);
      assert.equal(stepSvg.insideStepCard, true, `${stepSvg.id} must reside inside its step card`);
      assert.equal(stepSvg.hasTitle, true, `${stepSvg.id} must contain an accessible <title>`);
      assert.ok(stepSvg.animatedPathCount >= 1, `${stepSvg.id} must have >=1 .corp-anim-flow-path`);
    }

    for (const polar of svgInventory.polarSvgs) {
      assert.equal(polar.exists, true, `${polar.id} must exist`);
      assert.ok(polar.compassRingCount >= 1, `${polar.id} must render .polar-compass-ring`);
      assert.ok(polar.sweepIndicatorCount >= 1, `${polar.id} must render .polar-sweep-indicator`);
      assert.ok(polar.activeArcCount >= 1, `${polar.id} must render .polar-active-arc`);
    }

    // 3.3 Bidirectional Step-to-Hero Flywheel Synchronization
    const expectedStepToNode = { 1: 1, 2: 2, 3: 2, 4: 3, 5: 4 };
    for (const [stepStr, expectedNode] of Object.entries(expectedStepToNode)) {
      const syncState = result.stepSyncResults[stepStr];
      assert.deepEqual(syncState.activeHeroNodes, [expectedNode]);
      assert.deepEqual(syncState.linkedHeroNodes, [expectedNode]);
      assert.deepEqual(syncState.activeFlows, [expectedNode]);
      assert.equal(syncState.stepCardActive, true);
      assert.ok(syncState.stepSvgWidth > 100, `Active #svg-step-${stepStr} must be visible with width > 100px`);
      assert.ok(
        syncState.statusText.includes(`Node 0${expectedNode} Active`),
        `Expected #flywheel-hero-status to reflect Node 0${expectedNode}, got: ${syncState.statusText}`
      );
    }

    assert.equal(result.reverseSyncStep4.step4Active, true);
    assert.equal(result.reverseSyncStep4.btn4Selected, "true");

    // 3.4 Interactive table row click & active arc update
    assert.equal(result.catRowSelection.sectorSelected, true);
    assert.equal(result.catRowSelection.arcMatchesSector, true);

    // 3.5 Motion Pause Toggle (#motion-toggle-btn) & SMIL/CSS pause verification
    assert.equal(result.initialMotion.isPausedClass, false);
    assert.equal(result.initialMotion.ariaPressed, "false");
    assert.equal(result.initialMotion.animationPlayState, "running");
    assert.notEqual(result.initialMotion.animationName, "none");

    assert.equal(result.pausedMotion.isPausedClass, true);
    assert.equal(result.pausedMotion.animationsPausedClass, true);
    assert.equal(result.pausedMotion.ariaPressed, "true");
    assert.equal(result.pausedMotion.label, "Play Animations");
    assert.equal(result.pausedMotion.flowPlayState, "paused");
    assert.equal(result.pausedMotion.ringPlayState, "paused");
    assert.equal(result.pausedMotion.svgAnimationsPaused, true);

    assert.equal(result.resumedMotion.isPausedClass, false);
    assert.equal(result.resumedMotion.ariaPressed, "false");
    assert.equal(result.resumedMotion.label, "Pause Animations");
    assert.equal(result.resumedMotion.svgAnimationsPaused, false);

    // 3.6 Emulate @media (prefers-reduced-motion: reduce)
    assert.equal(result.reducedMotionState.matchesMedia, true);
    assert.equal(result.reducedMotionState.isPausedClass, true);
    assert.equal(result.reducedMotionState.animationPlayState, "paused");
    assert.equal(result.reducedMotionState.animationName, "none");

    fs.writeFileSync(
      path.join(ASSETS_DIR, "tester-1-telemetry.json"),
      JSON.stringify(
        {
          agent: "tester-1",
          runId: "20261104T004059-606-j6a7",
          status: "VERIFIED",
          consoleErrors: result.consoleErrors.length,
          pageErrors: result.pageErrors.length,
          externalRequests: result.externalRequests.length,
          uniqueIds: svgInventory.uniqueIds,
          heroFlywheel: {
            nodeCount: svgInventory.hero.nodeCount,
            flowCount: svgInventory.hero.flowCount,
            viewBox: svgInventory.hero.viewBox
          },
          stepSvgsVerified: svgInventory.stepSvgs.length,
          polarSvgsVerified: svgInventory.polarSvgs.length
        },
        null,
        2
      ),
      "utf8"
    );
  });
});
