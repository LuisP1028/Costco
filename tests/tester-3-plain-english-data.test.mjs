import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  loadAndVerifyCostcoModel,
  verifyCorporateWebReport,
  verifyFinancialDataset,
  verifyIndexHtml,
  verifyResearchMonograph,
  verifyWayfinderArtifacts
} from "../src/costco_revenue_model.mjs";

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(TEST_DIR, "..");
const DATA_PATH = path.join(ROOT_DIR, "data", "costco_revenue_breakdown.json");
const MAP_PATH = path.join(ROOT_DIR, "wayfinder", "map.md");
const TICKET_006_PATH = path.join(ROOT_DIR, "wayfinder", "tickets", "ticket-006.md");
const README_PATH = path.join(ROOT_DIR, "README.md");
const HTML_PATH = path.join(ROOT_DIR, "index.html");
const RESEARCH_PATH = path.join(ROOT_DIR, "research", "costco_revenue_architecture.md");
const PYTHON_BIN = "/Users/diesel/Desktop/Costco/.sandcastle/bin/python3";

const PROHIBITED_CLICHES = [
  "treasure-hunt discretionary basket builder",
  "renewal magnet",
  "perishable weekly trip driver and rapid inventory-turn engine",
  "negative working-capital float"
];

const PROHIBITED_SHORTHAND = [
  "R_total",
  "OpInc ($9,285M) = Merch Contrib",
  "Area √r (Coxcomb)",
  "Area &radic;r",
  "Linear Radius r",
  "Share Angle θ_i",
  "Share Angle &theta;_i",
  "θ_i",
  "&theta;_i",
  "wayfinderAudit.valid === true",
  "Negative Working-Capital Float"
];

const PROHIBITED_SPEC_TOKENS = [
  "{Net Sales}",
  "{Membership Fees}",
  "{Gross Margin Ceiling}",
  "{Operating Income Flywheel}"
];

test("Pillar 3 (AC-03 / M3): data/costco_revenue_breakdown.json plain-English roles & SEC 10-K parity", () => {
  const rawJson = fs.readFileSync(DATA_PATH, "utf8");
  const dataset = JSON.parse(rawJson);

  const audit = verifyFinancialDataset(dataset);
  assert.equal(audit.valid, true);
  assert.equal(audit.plainEnglishDatasetRolesValid, true);
  assert.equal(audit.totalRevenueCheck, true);
  assert.equal(audit.operatingIncomeCheck, true);
  assert.equal(audit.preTaxAndNetIncomeCheck, true);
  assert.equal(audit.formattedRatios.netSalesSharePct, "98.10");
  assert.equal(audit.formattedRatios.membershipFeeShareOfRevenuePct, "1.90");
  assert.equal(audit.formattedRatios.merchandiseGrossMarginPct, "10.92");
  assert.equal(audit.formattedRatios.sgaPctOfNetSales, "9.14");
  assert.equal(audit.formattedRatios.membershipFeeShareOfOperatingIncomePct, "52.00");
  assert.equal(audit.formattedRatios.merchandiseOperatingContributionSharePct, "48.00");
  assert.equal(audit.formattedRatios.accountsPayableToInventoryRatioPct, "104.15");

  assert.equal(dataset.merchandise_categories.length, 4);
  for (const cat of dataset.merchandise_categories) {
    assert.equal(typeof cat.role_in_flywheel, "string");
    assert.ok(cat.role_in_flywheel.trim().length > 25);
    const lowerRole = cat.role_in_flywheel.toLowerCase();
    for (const cliche of PROHIBITED_CLICHES) {
      assert.ok(
        !lowerRole.includes(cliche),
        `Category ${cat.category_id} contains prohibited promotional cliché "${cliche}"`
      );
    }
    for (const token of PROHIBITED_SPEC_TOKENS) {
      assert.ok(
        !cat.role_in_flywheel.includes(token),
        `Category ${cat.category_id} contains raw spec token "${token}"`
      );
    }
  }
});

test("Pillar 3 (AC-03 / M3): index.html contains >= 5 .plain-english-note, >= 3 .chart-reading-note, and 0 shorthand/clichés", () => {
  const html = fs.readFileSync(HTML_PATH, "utf8");
  const lowerHtml = html.toLowerCase();

  const webAudit = verifyCorporateWebReport({ htmlPath: HTML_PATH });
  assert.equal(webAudit.valid, true);
  assert.equal(webAudit.simplifiedEnglishValid, true);
  assert.equal(webAudit.plainEnglishNotesVerified, true);
  assert.equal(verifyIndexHtml, verifyCorporateWebReport);

  for (const shorthand of PROHIBITED_SHORTHAND) {
    assert.ok(!html.includes(shorthand), `index.html contains prohibited shorthand "${shorthand}"`);
  }
  for (const cliche of PROHIBITED_CLICHES) {
    assert.ok(!lowerHtml.includes(cliche), `index.html contains prohibited cliché "${cliche}"`);
  }
  for (const token of PROHIBITED_SPEC_TOKENS) {
    assert.ok(!html.includes(token), `index.html contains raw spec token "${token}"`);
  }

  // Plain-English equation banner checks
  assert.ok(
    html.includes("Total Revenue ($254,453M) = Net Sales ($249,625M | 98.10%) + Membership Fees ($4,828M | 1.90%)") ||
      html.includes("Total Revenue ($254,453M) = Net Sales ($249,625M) + Membership Fees ($4,828M)"),
    "Missing plain-English Total Revenue equation banner"
  );
  assert.ok(
    html.includes(
      "Operating Income ($9,285M) = Net Merchandise Profit ($4,457M, or 48.00%) + Membership Fees ($4,828M, or 52.00%)"
    ),
    "Missing plain-English Operating Income equation banner"
  );

  // Plain-English Polar Mode Buttons
  assert.ok(html.includes("By Area (Square-Root Scale)"));
  assert.ok(html.includes("By Radius (Linear Scale)"));
  assert.ok(html.includes("By Revenue Share (Angle)"));

  // Plain-English Wayfinder Audit Summary
  assert.ok(html.includes("Verified: 6 resolved research tickets and canonical decision map"));

  // Plain-English note & chart-reading-note counts
  const plainNoteMatches = html.match(/class=["'][^"']*\bplain-english-note\b[^"']*["']/g) || [];
  const chartNoteMatches = html.match(/class=["'][^"']*\bchart-reading-note\b[^"']*["']/g) || [];
  assert.ok(plainNoteMatches.length >= 5, `Expected >= 5 .plain-english-note, found ${plainNoteMatches.length}`);
  assert.ok(chartNoteMatches.length >= 3, `Expected >= 3 .chart-reading-note, found ${chartNoteMatches.length}`);
});

test("Pillar 3 (AC-03 / M3): Wayfinder map.md, ticket-006.md, research monograph, and README.md alignment", () => {
  const wayfinderAudit = verifyWayfinderArtifacts({ mapPath: MAP_PATH });
  assert.equal(wayfinderAudit.valid, true);
  assert.equal(wayfinderAudit.requiredSectionsVerified, 5);
  assert.equal(wayfinderAudit.resolvedTicketCount, 6);

  const researchAudit = verifyResearchMonograph({ researchPath: RESEARCH_PATH });
  assert.equal(researchAudit.valid, true);
  assert.ok(researchAudit.byteLength >= 8000);

  const mapMd = fs.readFileSync(MAP_PATH, "utf8");
  const ticket006Md = fs.readFileSync(TICKET_006_PATH, "utf8");
  const readmeMd = fs.readFileSync(README_PATH, "utf8");

  assert.ok(mapMd.includes(".plain-english-note"));
  assert.ok(ticket006Md.includes(".plain-english-note"));
  assert.ok(readmeMd.includes(".plain-english-note"));
  assert.ok(readmeMd.includes("By Area (Square-Root Scale)"));
  assert.ok(readmeMd.includes("By Radius (Linear Scale)"));
  assert.ok(readmeMd.includes("By Revenue Share (Angle)"));
});

test("Pillar 3 (AC-03 / M3): Fail-fast negative boundary tests on dataset clichés and HTML shorthand", () => {
  const baseData = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const baseHtml = fs.readFileSync(HTML_PATH, "utf8");

  for (const cliche of PROHIBITED_CLICHES) {
    const mutatedData = structuredClone(baseData);
    mutatedData.merchandise_categories[0].role_in_flywheel = `Contains forbidden ${cliche} phrase.`;
    assert.throws(
      () => verifyFinancialDataset(mutatedData),
      /prohibited promotional cliché/i,
      `verifyFinancialDataset should reject cliché "${cliche}"`
    );
  }

  for (const specToken of PROHIBITED_SPEC_TOKENS) {
    const mutatedData = structuredClone(baseData);
    mutatedData.merchandise_categories[1].role_in_flywheel = `Leaked ${specToken} in dataset role.`;
    assert.throws(
      () => verifyFinancialDataset(mutatedData),
      /unrefined specification token/i,
      `verifyFinancialDataset should reject spec token "${specToken}"`
    );
  }

  for (const shorthand of [
    "R_total",
    "OpInc ($9,285M) = Merch Contrib",
    "Area √r (Coxcomb)",
    "Linear Radius r",
    "Share Angle θ_i",
    "wayfinderAudit.valid === true",
    "Negative Working-Capital Float"
  ]) {
    const mutatedHtml = baseHtml.replace("Costco Wholesale Corporation", `Costco ${shorthand}`);
    assert.throws(
      () => verifyCorporateWebReport({ htmlContent: mutatedHtml }),
      /prohibited algebraic\/code shorthand/i,
      `verifyCorporateWebReport should reject shorthand "${shorthand}"`
    );
  }

  // Verify removing .plain-english-note triggers fail-fast error
  const htmlWithoutPlainNotes = baseHtml.replace(/plain-english-note/g, "removed-note");
  assert.throws(
    () => verifyCorporateWebReport({ htmlContent: htmlWithoutPlainNotes }),
    /expected >= 5 \.plain-english-note/i
  );
});

test("Pillar 3 (AC-03 / M3): End-to-end loadAndVerifyCostcoModel telemetry budget & live headless browser DOM audit", () => {
  const t0 = performance.now();
  const report = loadAndVerifyCostcoModel({ verifyOnly: true });
  const elapsed = performance.now() - t0;

  assert.equal(report.status, "VERIFIED");
  assert.equal(report.overallValid, true);
  assert.equal(report.telemetry.externalNetworkRequests, 0);
  assert.ok(report.telemetry.elapsedMs <= 250, `CLI elapsedMs ${report.telemetry.elapsedMs} exceeded 250ms`);
  assert.ok(elapsed <= 250, `Measured wall time ${elapsed}ms exceeded 250ms`);
  assert.ok(report.telemetry.rssMb <= 128, `RSS ${report.telemetry.rssMb}MB exceeded 128MB`);

  // Live headless Chromium verification via Python Playwright 1.58.0
  const pyScript = `
import json, pathlib, sys
from playwright.sync_api import sync_playwright

html_uri = pathlib.Path(${JSON.stringify(HTML_PATH)}).resolve().as_uri()
console_errors = []
page_errors = []
external_requests = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    page = context.new_page()
    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda err: page_errors.append(str(err)))
    page.on("request", lambda req: external_requests.append(req.url) if not req.url.startswith(("file://", "data:")) else None)

    page.goto(html_uri, wait_until="domcontentloaded")

    result = page.evaluate("""() => {
      const sections = [
        'section-executive-summary',
        'section-polar-graphs',
        'section-five-steps',
        'section-gaap-model',
        'section-wayfinder-audit'
      ];
      const sectionNoteCounts = sections.map(id => {
        const el = document.getElementById(id);
        return el ? el.querySelectorAll('.plain-english-note').length : 0;
      });
      const charts = [
        'polar-chart-categories',
        'polar-chart-geography',
        'polar-chart-flywheel'
      ];
      const chartNoteCounts = charts.map(id => {
        const el = document.getElementById(id);
        return el ? el.querySelectorAll('.chart-reading-note').length : 0;
      });
      const allNotesText = Array.from(document.querySelectorAll('.plain-english-note, .chart-reading-note'))
        .map(el => el.innerText)
        .join(' ');
      const bodyText = document.body.innerText;
      const prohibited = [
        'R_total',
        'OpInc ($9,285M) = Merch Contrib',
        'Area √r',
        'Linear Radius r',
        'Share Angle θ_i',
        'θ_i',
        'wayfinderAudit.valid === true',
        'Negative Working-Capital Float',
        'treasure-hunt discretionary basket builder',
        'renewal magnet',
        'perishable weekly trip driver and rapid inventory-turn engine'
      ];
      const foundProhibited = prohibited.filter(t => bodyText.toLowerCase().includes(t.toLowerCase()));
      return {
        sectionNoteCounts,
        chartNoteCounts,
        hasMarkupCapExplanation: allNotesText.includes('10.92%') && (allNotesText.includes('25%') || allNotesText.includes('40%')),
        hasSupplierFloatExplanation: allNotesText.includes('104.15%') && allNotesText.includes('12.60') && allNotesText.includes('$774M'),
        hasFeeLeverageExplanation: allNotesText.includes('1.90%') && allNotesText.includes('52.00%') && allNotesText.includes('$9,285M'),
        hasContraRevenueExplanation: allNotesText.includes('$2,804M') && allNotesText.includes('73.3%'),
        foundProhibited,
        catSvgRendered: (document.getElementById('svg-polar-categories')?.innerHTML.length || 0) > 500,
        geoSvgRendered: (document.getElementById('svg-polar-geography')?.innerHTML.length || 0) > 500,
        flySvgRendered: (document.getElementById('svg-polar-flywheel')?.innerHTML.length || 0) > 500
      };
    }""")
    context.close()
    browser.close()

print(json.dumps({
    "consoleErrors": console_errors,
    "pageErrors": page_errors,
    "externalRequests": external_requests,
    "domAudit": result
}))
`;

  const rawOut = execFileSync(PYTHON_BIN, ["-c", pyScript], { encoding: "utf8" });
  const browserReport = JSON.parse(rawOut.trim());

  assert.deepEqual(browserReport.consoleErrors, [], "Expected 0 browser console errors");
  assert.deepEqual(browserReport.pageErrors, [], "Expected 0 uncaught browser page errors");
  assert.deepEqual(browserReport.externalRequests, [], "Expected 0 external network requests");
  assert.deepEqual(browserReport.domAudit.foundProhibited, []);
  assert.ok(browserReport.domAudit.sectionNoteCounts.every((c) => c >= 1));
  assert.ok(browserReport.domAudit.chartNoteCounts.every((c) => c >= 1));
  assert.equal(browserReport.domAudit.hasMarkupCapExplanation, true);
  assert.equal(browserReport.domAudit.hasSupplierFloatExplanation, true);
  assert.equal(browserReport.domAudit.hasFeeLeverageExplanation, true);
  assert.equal(browserReport.domAudit.hasContraRevenueExplanation, true);
  assert.equal(browserReport.domAudit.catSvgRendered, true);
  assert.equal(browserReport.domAudit.geoSvgRendered, true);
  assert.equal(browserReport.domAudit.flySvgRendered, true);
});
