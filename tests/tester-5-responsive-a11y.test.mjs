import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import {
  loadAndVerifyCostcoModel,
  verifyCorporateWebReport,
} from '../src/costco_revenue_model.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function resolvePlaywrightMjs() {
  const candidates = [
    path.join(ROOT_DIR, 'node_modules/playwright/index.mjs'),
    '/Users/diesel/.npm/_npx/86170c4cd1c5da32/node_modules/playwright/index.mjs',
    '/Users/diesel/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs',
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  const npxRoot = '/Users/diesel/.npm/_npx';
  if (fs.existsSync(npxRoot)) {
    for (const entry of fs.readdirSync(npxRoot)) {
      const p = path.join(npxRoot, entry, 'node_modules/playwright/index.mjs');
      if (fs.existsSync(p)) return p;
    }
  }
  throw new Error('Playwright index.mjs not found in local or npx cache');
}

const PLAYWRIGHT_MJS = resolvePlaywrightMjs();

test('AC-05.1: Deterministic CLI Verification & Static Responsive/A11y Invariants', () => {
  const result = loadAndVerifyCostcoModel({ rootDir: ROOT_DIR, verifyOnly: true });
  assert.equal(result.status, 'VERIFIED', 'Costco model verification must be VERIFIED');
  assert.equal(result.overallValid, true, 'overallValid must be true');
  assert.ok(result.telemetry.elapsedMs <= 250, `Verification elapsedMs (${result.telemetry.elapsedMs}ms) must be <= 250ms`);
  assert.ok(result.telemetry.rssMb <= 128, `Verification rssMb (${result.telemetry.rssMb}MB) must be <= 128MB`);
  assert.equal(result.telemetry.externalNetworkRequests, 0, 'External network requests must be 0');

  const webReport = verifyCorporateWebReport({ rootDir: ROOT_DIR });
  assert.equal(webReport.valid, true, 'verifyCorporateWebReport must return valid: true');
  assert.equal(webReport.responsiveArchitectureValid, true, 'responsiveArchitectureValid must be true');
  assert.equal(webReport.responsiveScreenAgnosticVerified, true, 'responsiveScreenAgnosticVerified must be true');
  assert.equal(webReport.keyboardAccessibilityVerified, true, 'keyboardAccessibilityVerified must be true');
  assert.equal(webReport.polarLegibilityValid, true, 'polarLegibilityValid must be true');
  assert.equal(webReport.legibleGraphTypographyVerified, true, 'legibleGraphTypographyVerified must be true');
  assert.equal(webReport.simplifiedEnglishValid, true, 'simplifiedEnglishValid must be true');
  assert.equal(webReport.plainEnglishNotesVerified, true, 'plainEnglishNotesVerified must be true');
  assert.equal(webReport.animatedSvgElementsPresent, true, 'animatedSvgElementsPresent must be true');
  assert.equal(webReport.corporateAnimatedSvgVerified, true, 'corporateAnimatedSvgVerified must be true');
  assert.equal(webReport.ditherVisualEffectsPresent, true, 'ditherVisualEffectsPresent must be true');
  assert.equal(webReport.ditherEffectsVerified, true, 'ditherEffectsVerified must be true');

  const html = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
  assert.ok(!/html\s*,\s*body\s*\{[^}]*overflow-x\s*:\s*hidden/i.test(html), 'html, body must not mask overflow with overflow-x: hidden');
  assert.ok(html.includes('syncCategorySelectionInPlace'), 'In-place category selection sync must exist');
  assert.ok(html.includes('syncGeographySelectionInPlace'), 'In-place geography selection sync must exist');
});

test('AC-05.2: Live Headless Chromium 9-Viewport Responsive Sweep, Polar Collision Check & Keyboard Accessibility', () => {
  const script = `
    import { chromium } from ${JSON.stringify(PLAYWRIGHT_MJS)};
    import path from 'node:path';
    import { pathToFileURL } from 'node:url';

    const rootDir = ${JSON.stringify(ROOT_DIR)};
    const fileUrl = pathToFileURL(path.join(rootDir, 'index.html')).href;
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleErrors = [];
    const pageErrors = [];
    const externalNetworkRequests = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => {
      pageErrors.push(String(err));
    });
    page.on('request', (req) => {
      const url = req.url();
      if (!url.startsWith('file://') && !url.startsWith('data:')) {
        externalNetworkRequests.push(url);
      }
    });

    await page.goto(fileUrl, { waitUntil: 'load' });

    const viewports = [
      { width: 320, height: 640 },
      { width: 375, height: 667 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1280, height: 800 },
      { width: 1440, height: 900 },
      { width: 1920, height: 1080 },
      { width: 2560, height: 1440 }
    ];

    const viewportChecks = [];
    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.waitForTimeout(35);
      const metrics = await page.evaluate(() => {
        const docEl = document.documentElement;
        const toc = document.getElementById('table-of-contents');
        const polarGrid = document.querySelector('.polar-grid-layout');
        const tocStyle = toc ? window.getComputedStyle(toc) : null;
        const polarGridStyle = polarGrid ? window.getComputedStyle(polarGrid) : null;
        const cols = polarGridStyle ? polarGridStyle.gridTemplateColumns.trim().split(/\\s+(?![^()]*\\))/).length : 0;
        const svgs = ['#svg-polar-categories', '#svg-polar-geography', '#svg-polar-flywheel'].map((sel) => {
          const el = document.querySelector(sel);
          const r = el.getBoundingClientRect();
          return { sel, width: r.width, height: r.height, fitsViewport: r.right <= window.innerWidth + 0.5 && r.left >= -0.5 };
        });
        return {
          innerWidth: window.innerWidth,
          scrollWidth: docEl.scrollWidth,
          overflowPx: Math.max(0, docEl.scrollWidth - window.innerWidth),
          tocPosition: tocStyle ? tocStyle.position : null,
          polarGridCols: cols,
          svgs
        };
      });
      viewportChecks.push({ ...vp, ...metrics });
    }

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(35);

    async function inspectSvgLabels(svgSelector) {
      return await page.evaluate((sel) => {
        const svg = document.querySelector(sel);
        const svgRect = svg.getBoundingClientRect();
        const texts = Array.from(svg.querySelectorAll('text')).filter((t) => {
          const style = window.getComputedStyle(t);
          return style.display !== 'none' && style.visibility !== 'hidden' && (t.textContent || '').trim().length > 0;
        });
        const boxes = texts.map((t, idx) => {
          const r = t.getBoundingClientRect();
          return {
            idx,
            text: (t.textContent || '').trim(),
            left: r.left,
            top: r.top,
            right: r.right,
            bottom: r.bottom,
            width: r.width,
            height: r.height
          };
        }).filter((b) => b.width > 0 && b.height > 0);

        const collisions = [];
        for (let i = 0; i < boxes.length; i++) {
          for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i];
            const b = boxes[j];
            const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
            const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
            if (ox > 1.5 && oy > 1.5) {
              collisions.push({ a: a.text, b: b.text, ox, oy });
            }
          }
        }
        const clipped = boxes.filter((b) => (
          b.left < svgRect.left - 1.5 ||
          b.top < svgRect.top - 1.5 ||
          b.right > svgRect.right + 1.5 ||
          b.bottom > svgRect.bottom + 1.5
        ));
        return { textCount: boxes.length, collisionCount: collisions.length, clippedCount: clipped.length, collisions, clipped };
      }, svgSelector);
    }

    const polarChecks = [];
    for (const mode of ['sqrt', 'linear', 'angle']) {
      await page.click(\`[data-cat-mode="\${mode}"]\`);
      for (const year of ['2024', '2023', '2022', 'overlay']) {
        await page.click(\`[data-cat-year="\${year}"]\`);
        const res = await inspectSvgLabels('#svg-polar-categories');
        polarChecks.push({ chart: 'categories', mode, year, ...res });
      }
    }
    for (const metric of ['revenue', 'opinc', 'warehouses']) {
      await page.click(\`[data-geo-metric="\${metric}"]\`);
      const res = await inspectSvgLabels('#svg-polar-geography');
      polarChecks.push({ chart: 'geography', mode: metric, year: '2025', ...res });
    }
    for (const mode of ['asymmetry', 'ancillary']) {
      await page.click(\`[data-fly-mode="\${mode}"]\`);
      const res = await inspectSvgLabels('#svg-polar-flywheel');
      polarChecks.push({ chart: 'flywheel', mode, year: '2025', ...res });
    }

    // Reset category mode/year to default for keyboard checks
    await page.click('[data-cat-year="2024"]');
    await page.click('[data-cat-mode="sqrt"]');

    // Keyboard A11y verification
    await page.focus('[data-cat-row="0"]');
    await page.keyboard.press('Enter');
    const catEnter = await page.evaluate(() => ({
      activeAttr: document.activeElement?.getAttribute('data-cat-row'),
      ariaSelected: document.activeElement?.getAttribute('aria-selected'),
      title: document.querySelector('#polar-category-drilldown .drilldown-title')?.textContent?.trim()
    }));

    await page.keyboard.press('ArrowDown');
    const catArrowDown = await page.evaluate(() => ({
      activeAttr: document.activeElement?.getAttribute('data-cat-row'),
      ariaSelected: document.activeElement?.getAttribute('aria-selected')
    }));

    await page.keyboard.press('End');
    const catEnd = await page.evaluate(() => ({
      activeAttr: document.activeElement?.getAttribute('data-cat-row'),
      ariaSelected: document.activeElement?.getAttribute('aria-selected')
    }));

    await page.keyboard.press('Home');
    const catHome = await page.evaluate(() => ({
      activeAttr: document.activeElement?.getAttribute('data-cat-row'),
      ariaSelected: document.activeElement?.getAttribute('aria-selected')
    }));

    await page.focus('[data-cat-sector="3"]');
    await page.keyboard.press('Space');
    const sectorSpace = await page.evaluate(() => ({
      activeAttr: document.activeElement?.getAttribute('data-cat-sector'),
      title: document.querySelector('#polar-category-drilldown .drilldown-title')?.textContent?.trim()
    }));

    await page.focus('[data-geo-row="1"]');
    await page.keyboard.press('Enter');
    const geoEnter = await page.evaluate(() => ({
      activeAttr: document.activeElement?.getAttribute('data-geo-row'),
      ariaSelected: document.activeElement?.getAttribute('aria-selected'),
      title: document.querySelector('#polar-geography-drilldown .drilldown-title')?.textContent?.trim()
    }));

    await page.focus('[data-step-btn="1"]');
    await page.keyboard.press('ArrowRight');
    const stepRight = await page.evaluate(() => ({
      activeStep: document.activeElement?.getAttribute('data-step-btn'),
      ariaSelected: document.activeElement?.getAttribute('aria-selected')
    }));

    await page.focus('[data-ticket-tab="0"]');
    await page.keyboard.press('ArrowRight');
    const ticketRight = await page.evaluate(() => ({
      activeTicket: document.activeElement?.getAttribute('data-ticket-tab'),
      ariaPressed: document.activeElement?.getAttribute('aria-pressed')
    }));

    await page.focus('#motion-toggle-btn');
    await page.keyboard.press('Enter');
    const motionPaused = await page.evaluate(() => ({
      isPaused: document.documentElement.classList.contains('is-motion-paused'),
      ariaPressed: document.getElementById('motion-toggle-btn')?.getAttribute('aria-pressed')
    }));
    await page.keyboard.press('Space');
    const motionRunning = await page.evaluate(() => ({
      isPaused: document.documentElement.classList.contains('is-motion-paused'),
      ariaPressed: document.getElementById('motion-toggle-btn')?.getAttribute('aria-pressed')
    }));

    await browser.close();
    console.log(JSON.stringify({
      consoleErrors,
      pageErrors,
      externalNetworkRequests,
      viewportChecks,
      polarChecks,
      keyboard: {
        catEnter,
        catArrowDown,
        catEnd,
        catHome,
        sectorSpace,
        geoEnter,
        stepRight,
        ticketRight,
        motionPaused,
        motionRunning
      }
    }));
  `;

  const stdout = execFileSync(process.execPath, ['--input-type=module', '-e', script], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });

  const telemetry = JSON.parse(stdout.trim());

  assert.equal(telemetry.consoleErrors.length, 0, `Expected 0 console errors, got: ${JSON.stringify(telemetry.consoleErrors)}`);
  assert.equal(telemetry.pageErrors.length, 0, `Expected 0 page errors, got: ${JSON.stringify(telemetry.pageErrors)}`);
  assert.equal(telemetry.externalNetworkRequests.length, 0, `Expected 0 external network requests, got: ${JSON.stringify(telemetry.externalNetworkRequests)}`);

  for (const vp of telemetry.viewportChecks) {
    assert.equal(vp.overflowPx, 0, `Viewport ${vp.width}x${vp.height} must have 0px horizontal overflow (got ${vp.overflowPx}px)`);
    for (const svg of vp.svgs) {
      assert.equal(svg.fitsViewport, true, `SVG ${svg.sel} must fit within viewport ${vp.width}px`);
    }
    if (vp.width <= 1024) {
      assert.equal(vp.tocPosition, 'static', `TOC must be static at ${vp.width}px`);
      assert.equal(vp.polarGridCols, 1, `Polar grid must be 1 column at ${vp.width}px`);
    }
    if (vp.width >= 1440) {
      assert.equal(vp.tocPosition, 'sticky', `TOC must be sticky at ${vp.width}px`);
      assert.equal(vp.polarGridCols, 2, `Polar grid must be 2 columns at ${vp.width}px`);
    }
  }

  for (const pc of telemetry.polarChecks) {
    assert.equal(
      pc.collisionCount,
      0,
      `Polar chart ${pc.chart} (${pc.mode}, ${pc.year}) must have 0 label collisions, got: ${JSON.stringify(pc.collisions)}`
    );
    assert.equal(
      pc.clippedCount,
      0,
      `Polar chart ${pc.chart} (${pc.mode}, ${pc.year}) must have 0 clipped labels, got: ${JSON.stringify(pc.clipped)}`
    );
  }

  assert.equal(telemetry.keyboard.catEnter.activeAttr, '0', 'Focus must remain on row 0 after Enter');
  assert.equal(telemetry.keyboard.catEnter.ariaSelected, 'true', 'Row 0 must have aria-selected=true');
  assert.equal(telemetry.keyboard.catArrowDown.activeAttr, '1', 'ArrowDown must move focus to row 1');
  assert.equal(telemetry.keyboard.catEnd.activeAttr, '3', 'End key must move focus to last category row (3)');
  assert.equal(telemetry.keyboard.catHome.activeAttr, '0', 'Home key must move focus to first category row (0)');
  assert.equal(telemetry.keyboard.sectorSpace.activeAttr, '3', 'Space on SVG sector 3 must retain focus on sector 3');
  assert.ok(telemetry.keyboard.sectorSpace.title.includes('Fresh Foods'), 'Space on sector 3 must update drill-down title to Fresh Foods');
  assert.equal(telemetry.keyboard.geoEnter.activeAttr, '1', 'Enter on geography row 1 must retain focus');
  assert.equal(telemetry.keyboard.stepRight.activeStep, '2', 'ArrowRight on step 1 must move focus to step 2');
  assert.equal(telemetry.keyboard.ticketRight.activeTicket, '1', 'ArrowRight on ticket 0 must move focus to ticket 1');
  assert.equal(telemetry.keyboard.motionPaused.isPaused, true, 'Enter on #motion-toggle-btn must pause motion');
  assert.equal(telemetry.keyboard.motionPaused.ariaPressed, 'true', 'Enter on #motion-toggle-btn must set aria-pressed=true');
  assert.equal(telemetry.keyboard.motionRunning.isPaused, false, 'Space on #motion-toggle-btn must resume motion');
  assert.equal(telemetry.keyboard.motionRunning.ariaPressed, 'false', 'Space on #motion-toggle-btn must set aria-pressed=false');
});
