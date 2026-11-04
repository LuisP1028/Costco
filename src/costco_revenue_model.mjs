import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT_DIR = path.resolve(MODULE_DIR, "..");

const REQUIRED_WAYFINDER_SECTIONS = [
  { heading: "## Destination", pattern: /^##\s+Destination\s*$/m },
  { heading: "## Notes", pattern: /^##\s+Notes\s*$/m },
  { heading: "## Decisions so far", pattern: /^##\s+Decisions so far\s*$/m },
  { heading: "## Not yet specified", pattern: /^##\s+Not yet specified\s*$/m },
  { heading: "## Out of scope", pattern: /^##\s+Out of scope\s*$/m }
];

const EXPECTED_TICKET_FILES = [
  "ticket-001.md",
  "ticket-002.md",
  "ticket-003.md",
  "ticket-004.md",
  "ticket-005.md",
  "ticket-006.md"
];

const REQUIRED_TICKET_HEADINGS = [
  { label: "## Question", regex: /^##\s+Question\s*$/m },
  { label: "## Blocked By", regex: /^##\s+Blocked By\s*$/m },
  { label: "## Resolution", regex: /^##\s+Resolution\s*$/m }
];

const REQUIRED_RESEARCH_CITATIONS = ["0000909832", "Form 10-K", "ASC 606"];
const REQUIRED_RESEARCH_FIGURES = ["254,453", "249,625", "4,828", "9,285", "7,367"];
const MIN_RESEARCH_MONOGRAPH_BYTES = 8000;
const GAAP_CONSERVATION_EPSILON = 1e-9;

const PROHIBITED_DREAMCORE_MARKERS = [
  "dreamcore",
  "seraphic",
  "vhs-scanlines",
  "film-grain-overlay",
  "meadow_portal.jpg",
  "poolroom_sanctuary.jpg",
  "sky_staircase.jpg",
  "tape hum",
  "stuck-clock",
  "dream-sky-canvas"
];

const REQUIRED_CORPORATE_DOM_IDS = [
  "table-of-contents",
  "section-executive-summary",
  "section-polar-graphs",
  "polar-chart-categories",
  "polar-chart-geography",
  "polar-chart-flywheel",
  "section-five-steps",
  "step-1",
  "step-2",
  "step-3",
  "step-4",
  "step-5",
  "section-gaap-model",
  "section-wayfinder-audit"
];

const REQUIRED_TOC_ANCHOR_TARGETS = [
  "section-executive-summary",
  "section-polar-graphs",
  "polar-chart-categories",
  "polar-chart-geography",
  "polar-chart-flywheel",
  "section-five-steps",
  "step-1",
  "step-2",
  "step-3",
  "step-4",
  "step-5",
  "section-gaap-model",
  "section-wayfinder-audit"
];

const REQUIRED_CORPORATE_BRAND_TOKENS = [
  "#E31837",
  "#005DAA",
  "#0F172A",
  "#F8FAFC",
  "#FFFFFF"
];

const REQUIRED_CORPORATE_BRAND_TOKENS_LOWER = REQUIRED_CORPORATE_BRAND_TOKENS.map((token) =>
  token.toLowerCase()
);

const EXPECTED_TICKET_SLUGS_LOWER = EXPECTED_TICKET_FILES.map((file) =>
  file.replace(/\.md$/, "").toLowerCase()
);

const REQUIRED_CORPORATE_WEB_FIGURES = [
  "254,453",
  "249,625",
  "4,828",
  "9,285",
  "7,367",
  "101,463",
  "63,973",
  "49,969",
  "34,220",
  "184,143",
  "35,436",
  "34,874",
  "10.92%",
  "92.9%",
  "104.15%",
  "52.00%"
];

const PROHIBITED_SPEC_TOKENS = [
  "{Net Sales}",
  "{Membership Fees}",
  "{Gross Margin Ceiling}",
  "{Operating Income Flywheel}"
];

const PROHIBITED_PROMOTIONAL_CLICHES = [
  "treasure-hunt discretionary basket builder",
  "renewal magnet",
  "perishable weekly trip driver and rapid inventory-turn engine",
  "negative working-capital float"
];

const PROHIBITED_ALGEBRAIC_AND_CODE_SHORTHAND = [
  "R_total",
  "OpInc ($9,285M) = Merch Contrib",
  "Area √r (Coxcomb)",
  "Area &radic;r",
  "Linear Radius r",
  "Share Angle θ_i",
  "Share Angle &theta;_i",
  "wayfinderAudit.valid === true",
  "Negative Working-Capital Float"
];

const REQUIRED_ANIMATED_SVG_IDS = [
  "svg-corporate-flywheel-hero",
  "svg-step-1",
  "svg-step-2",
  "svg-step-3",
  "svg-step-4",
  "svg-step-5",
  "motion-toggle-btn"
];

const REQUIRED_DITHER_PATTERN_IDS = [
  "dither-bayer-navy",
  "dither-bayer-crimson",
  "dither-halftone-slate",
  "dither-polar-engraving"
];

const PROHIBITED_PSEUDOCODE_DIVIDERS = [
  "Section 01 //",
  "Section 02 //",
  "Section 03 //",
  "Section 04 //",
  "Section 05 //",
  "DRILLDOWN //",
  "Step 01 //",
  "Step 02 //",
  "Step 03 //",
  "Step 04 //",
  "Step 05 //",
  "ticket-001.md //",
  "ticket-002.md //",
  "ticket-003.md //",
  "ticket-004.md //",
  "ticket-005.md //",
  "ticket-006.md //",
  "WAYFINDER TICKET //"
];

const PROHIBITED_PSEUDOCODE_DIVIDER_REGEX =
  /(?:Section\s+0[1-5]|Step\s+0[1-5]|ACTIVE\s+POLAR|DRILLDOWN|RESOLVED\s+WAYFINDER\s+TICKET|ticket-00[1-6]\.md)\s*\/\//i;

const REQUIRED_POLAR_CSS_SELECTORS = [
  ".polar-grid-ring",
  ".polar-axis-spoke",
  ".polar-sector-label",
  ".polar-center-title",
  ".polar-center-sub",
  ".drilldown-meta-grid",
  ".drilldown-meta-item",
  ".sim-output-banner.is-breach"
];

const REQUIRED_RECONCILED_CATEGORY_FIGURES = [
  ["85,629", "85629"],
  ["96,175", "96175"],
  ["101,463", "101463"],
  ["61,100", "61100"],
  ["60,865", "60865"],
  ["63,973", "63973"],
  ["46,474", "46474"],
  ["48,693", "48693"],
  ["49,969", "49969"],
  ["29,527", "29527"],
  ["31,977", "31977"],
  ["34,220", "34220"],
  ["703", "703/187"],
  ["187", "703/187"],
  ["499", "499/115"],
  ["115", "499/115"],
  ["113", "113/55"],
  ["55", "113/55"],
  ["91", "91/17"],
  ["17", "91/17"]
];

const PROHIBITED_UNVERIFIED_HISTORICAL_FIGURES = [
  "88,948",
  "88948",
  "96,936",
  "96936",
  "60,876",
  "60876",
  "60,292",
  "60292",
  "43,443",
  "43443",
  "29,463",
  "29463",
  "31,789",
  "31789",
  "704/124/62",
  "505/80/29",
  "103/35/30",
  "96/9/3"
];

const NEXT_H2_HEADING_REGEX = /^##\s+/m;
const BARE_TICKET_CLEAN_REGEX = /[`*_~]/g;
const BARE_TICKET_DIRECT_REGEX = /^(?:ticket[-_\s#]*\d+(?:\.md)?|#?\d+|t[-_]?\d+)$/i;
const BARE_TICKET_PATH_REGEX = /(?:^|[\\/])ticket[-_\s#]*\d+(?:\.md)?$/i;
const MD_EXTENSION_REGEX = /\.md$/i;
const WAYFINDER_RESEARCH_REGEX = /wayfinder:research/i;
const CLAIMED_BY_REGEX = /claimed[_\s]+by\s*:/i;
const RESOLVED_STATUS_REGEX = /(?:^|\n)[-*>\s]*\*?\*?status\*?\*?\s*:\s*`?resolved`?\s*(?:$|\n)/i;
const BARE_TICKET_ID_IN_PROSE_REGEX = /\bticket[-_]\d+\b/i;
const TICKET_HREF_REGEX = /ticket-\d+/i;
const SCRIPT_BLOCK_STRIP_REGEX = /<script\b[^>]*>[\s\S]*?<\/script>/gi;

function round4(value) {
  return Number(value.toFixed(4));
}

function formatSignedDelta(delta) {
  const rounded = round4(delta);
  return rounded > 0 ? `+${rounded}` : `${rounded}`;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function hasDefinedOwn(obj, key) {
  return hasOwn(obj, key) && obj[key] !== undefined;
}

function assertPlainObject(value, contextLabel) {
  if (!isPlainObject(value)) {
    throw new Error(`Financial dataset validation failed: "${contextLabel}" must be a non-null JSON object.`);
  }
  return value;
}

function assertNonEmptyString(obj, field, contextLabel) {
  const value = obj?.[field];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(
      `Financial dataset validation failed: "${contextLabel}.${field}" must be a non-empty string.`
    );
  }
  return value;
}

function assertFiniteNumber(obj, field, contextLabel) {
  const value = obj?.[field];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(
      `Invalid or missing numeric field "${field}" in ${contextLabel}: received ${JSON.stringify(value)}`
    );
  }
  return value;
}

function resolveTicketsDir(rootDir, mapPath, explicitTicketsDir) {
  if (explicitTicketsDir) {
    return path.resolve(explicitTicketsDir);
  }
  if (mapPath) {
    const siblingTicketsDir = path.join(path.dirname(mapPath), "tickets");
    if (fs.existsSync(siblingTicketsDir)) {
      return siblingTicketsDir;
    }
  }
  return path.join(rootDir, "wayfinder", "tickets");
}

function isBareTicketLabel(rawLabel) {
  const cleaned = String(rawLabel ?? "")
    .replace(BARE_TICKET_CLEAN_REGEX, "")
    .trim();
  if (!cleaned || cleaned.length < 10) {
    return true;
  }
  if (BARE_TICKET_DIRECT_REGEX.test(cleaned)) {
    return true;
  }
  if (BARE_TICKET_PATH_REGEX.test(cleaned) || MD_EXTENSION_REGEX.test(cleaned)) {
    return true;
  }
  return false;
}

function extractMarkdownSection(markdown, sectionHeadingRegex) {
  const match = sectionHeadingRegex.exec(markdown);
  if (!match) {
    return null;
  }
  const startOffset = match.index + match[0].length;
  const remainder = markdown.slice(startOffset);
  const nextHeadingMatch = NEXT_H2_HEADING_REGEX.exec(remainder);
  return nextHeadingMatch ? remainder.slice(0, nextHeadingMatch.index) : remainder;
}

function extractMarkdownLinks(markdownText) {
  const links = [];
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(markdownText)) !== null) {
    links.push({
      label: match[1],
      href: match[2].trim()
    });
  }
  return links;
}

function verifyCompanyMetadata(companyRecord) {
  const company = assertPlainObject(companyRecord, "company");
  assertNonEmptyString(company, "name", "company");
  if (company.ticker !== "COST") {
    throw new Error(
      `Financial dataset validation failed: expected company.ticker "COST", received ${JSON.stringify(company.ticker)}.`
    );
  }
  if (company.cik !== "0000909832") {
    throw new Error(
      `Financial dataset validation failed: expected company.cik "0000909832", received ${JSON.stringify(company.cik)}.`
    );
  }
  if (!Number.isInteger(company.fiscal_year)) {
    throw new Error('Financial dataset validation failed: "company.fiscal_year" must be an integer.');
  }
  assertNonEmptyString(company, "fiscal_year_end", "company");
  assertNonEmptyString(company, "currency", "company");
  assertNonEmptyString(company, "units", "company");
  return company;
}

function verifyIncomeStatementIdentities(incomeStatementRecord) {
  const cis = assertPlainObject(incomeStatementRecord, "consolidated_income_statement");
  const netSalesUsdM = assertFiniteNumber(cis, "net_sales_usd_m", "consolidated_income_statement");
  const membershipFeesUsdM = assertFiniteNumber(cis, "membership_fees_usd_m", "consolidated_income_statement");
  const totalRevenueUsdM = assertFiniteNumber(cis, "total_revenue_usd_m", "consolidated_income_statement");
  const merchandiseCostsUsdM = assertFiniteNumber(cis, "merchandise_costs_usd_m", "consolidated_income_statement");
  const sgaUsdM = assertFiniteNumber(
    cis,
    "selling_general_and_administrative_usd_m",
    "consolidated_income_statement"
  );
  const operatingIncomeUsdM = assertFiniteNumber(cis, "operating_income_usd_m", "consolidated_income_statement");
  const interestExpenseUsdM = assertFiniteNumber(cis, "interest_expense_usd_m", "consolidated_income_statement");
  const interestIncomeOtherNetUsdM = assertFiniteNumber(
    cis,
    "interest_income_and_other_net_usd_m",
    "consolidated_income_statement"
  );
  const incomeBeforeTaxesUsdM = assertFiniteNumber(cis, "income_before_taxes_usd_m", "consolidated_income_statement");
  const provisionForTaxesUsdM = assertFiniteNumber(
    cis,
    "provision_for_income_taxes_usd_m",
    "consolidated_income_statement"
  );
  const netIncomeUsdM = assertFiniteNumber(cis, "net_income_usd_m", "consolidated_income_statement");

  if (netSalesUsdM <= 0 || membershipFeesUsdM <= 0 || totalRevenueUsdM <= 0 || operatingIncomeUsdM <= 0) {
    throw new Error(
      "Financial dataset validation failed: revenue and operating income figures must be strictly positive."
    );
  }

  const expectedTotalRevenue = netSalesUsdM + membershipFeesUsdM;
  if (Math.abs(expectedTotalRevenue - totalRevenueUsdM) > GAAP_CONSERVATION_EPSILON) {
    const delta = expectedTotalRevenue - totalRevenueUsdM;
    throw new Error(
      `GAAP Consolidated Total Revenue Identity mismatch: net_sales_usd_m (${netSalesUsdM}) + membership_fees_usd_m (${membershipFeesUsdM}) = ${round4(expectedTotalRevenue)}, which does not equal total_revenue_usd_m (${totalRevenueUsdM}); delta = ${formatSignedDelta(delta)} USD million.`
    );
  }

  const expectedOperatingIncome = totalRevenueUsdM - merchandiseCostsUsdM - sgaUsdM;
  if (Math.abs(expectedOperatingIncome - operatingIncomeUsdM) > GAAP_CONSERVATION_EPSILON) {
    const delta = expectedOperatingIncome - operatingIncomeUsdM;
    throw new Error(
      `GAAP Consolidated Operating Income Identity mismatch: total_revenue_usd_m (${totalRevenueUsdM}) - merchandise_costs_usd_m (${merchandiseCostsUsdM}) - selling_general_and_administrative_usd_m (${sgaUsdM}) = ${round4(expectedOperatingIncome)}, which does not equal operating_income_usd_m (${operatingIncomeUsdM}); delta = ${formatSignedDelta(delta)} USD million.`
    );
  }

  const expectedPreTaxIncome = operatingIncomeUsdM - interestExpenseUsdM + interestIncomeOtherNetUsdM;
  if (Math.abs(expectedPreTaxIncome - incomeBeforeTaxesUsdM) > GAAP_CONSERVATION_EPSILON) {
    const delta = expectedPreTaxIncome - incomeBeforeTaxesUsdM;
    throw new Error(
      `GAAP Income Before Taxes Identity mismatch: operating_income_usd_m (${operatingIncomeUsdM}) - interest_expense_usd_m (${interestExpenseUsdM}) + interest_income_and_other_net_usd_m (${interestIncomeOtherNetUsdM}) = ${round4(expectedPreTaxIncome)}, which does not equal income_before_taxes_usd_m (${incomeBeforeTaxesUsdM}); delta = ${formatSignedDelta(delta)} USD million.`
    );
  }

  const expectedNetIncome = incomeBeforeTaxesUsdM - provisionForTaxesUsdM;
  if (Math.abs(expectedNetIncome - netIncomeUsdM) > GAAP_CONSERVATION_EPSILON) {
    const delta = expectedNetIncome - netIncomeUsdM;
    throw new Error(
      `GAAP Net Income Identity mismatch: income_before_taxes_usd_m (${incomeBeforeTaxesUsdM}) - provision_for_income_taxes_usd_m (${provisionForTaxesUsdM}) = ${round4(expectedNetIncome)}, which does not equal net_income_usd_m (${netIncomeUsdM}); delta = ${formatSignedDelta(delta)} USD million.`
    );
  }

  return {
    netSalesUsdM,
    membershipFeesUsdM,
    totalRevenueUsdM,
    merchandiseCostsUsdM,
    sgaUsdM,
    operatingIncomeUsdM
  };
}

function verifyHistoricalComparison(historicalEntries) {
  if (!Array.isArray(historicalEntries) || historicalEntries.length < 3) {
    throw new Error(
      "Financial dataset validation failed: historical_comparison must contain at least 3 fiscal years (FY2022–FY2024)."
    );
  }

  const observedYears = new Set();
  for (const entry of historicalEntries) {
    assertPlainObject(entry, "historical_comparison[]");
    const fy = assertFiniteNumber(entry, "fiscal_year", "historical_comparison[]");
    observedYears.add(fy);

    const histNetSales = assertFiniteNumber(entry, "net_sales_usd_m", `historical_comparison[${fy}]`);
    const histFees = assertFiniteNumber(entry, "membership_fees_usd_m", `historical_comparison[${fy}]`);
    const histTotalRev = assertFiniteNumber(entry, "total_revenue_usd_m", `historical_comparison[${fy}]`);
    const histCosts = assertFiniteNumber(entry, "merchandise_costs_usd_m", `historical_comparison[${fy}]`);
    const histOpInc = assertFiniteNumber(entry, "operating_income_usd_m", `historical_comparison[${fy}]`);
    assertFiniteNumber(entry, "net_income_usd_m", `historical_comparison[${fy}]`);

    if (Math.abs(histNetSales + histFees - histTotalRev) > GAAP_CONSERVATION_EPSILON) {
      const delta = histNetSales + histFees - histTotalRev;
      throw new Error(
        `Historical GAAP Total Revenue Identity mismatch in FY${fy}: ${histNetSales} + ${histFees} = ${round4(histNetSales + histFees)} !== ${histTotalRev} (delta = ${formatSignedDelta(delta)} USD million).`
      );
    }
    if (histTotalRev - histCosts <= 0) {
      throw new Error(
        `Historical gross profit invariant breach in FY${fy}: total_revenue_usd_m (${histTotalRev}) - merchandise_costs_usd_m (${histCosts}) must be strictly positive.`
      );
    }
    if (hasOwn(entry, "selling_general_and_administrative_usd_m")) {
      const histSga = assertFiniteNumber(
        entry,
        "selling_general_and_administrative_usd_m",
        `historical_comparison[${fy}]`
      );
      if (Math.abs(histTotalRev - histCosts - histSga - histOpInc) > GAAP_CONSERVATION_EPSILON) {
        const delta = histTotalRev - histCosts - histSga - histOpInc;
        throw new Error(
          `Historical GAAP Operating Income Identity mismatch in FY${fy}: ${histTotalRev} - ${histCosts} - ${histSga} !== ${histOpInc} (delta = ${formatSignedDelta(delta)} USD million).`
        );
      }
    }
  }

  for (const requiredYear of [2022, 2023, 2024]) {
    if (!observedYears.has(requiredYear)) {
      throw new Error(`Financial dataset validation failed: historical_comparison missing FY${requiredYear}.`);
    }
  }
}

function verifyMerchandiseCategories(categories, netSalesUsdM) {
  if (!Array.isArray(categories) || categories.length < 4) {
    throw new Error(
      "Financial dataset validation failed: merchandise_categories must contain Costco's 4 core disaggregated categories."
    );
  }

  let categoryShareSum = 0;
  let categorySalesDollarSum = 0;

  for (const cat of categories) {
    assertPlainObject(cat, "merchandise_categories[]");
    const categoryId = assertNonEmptyString(cat, "category_id", "merchandise_categories[]");
    assertNonEmptyString(cat, "name", `merchandise_categories[${categoryId}]`);
    const roleInFlywheel = assertNonEmptyString(cat, "role_in_flywheel", `merchandise_categories[${categoryId}]`);
    const lowerRole = roleInFlywheel.toLowerCase();
    for (const cliche of PROHIBITED_PROMOTIONAL_CLICHES) {
      if (lowerRole.includes(cliche)) {
        throw new Error(
          `Financial dataset validation failed: merchandise_categories[${categoryId}].role_in_flywheel contains prohibited promotional cliché "${cliche}".`
        );
      }
    }
    for (const specToken of PROHIBITED_SPEC_TOKENS) {
      if (roleInFlywheel.includes(specToken)) {
        throw new Error(
          `Financial dataset validation failed: merchandise_categories[${categoryId}].role_in_flywheel contains unrefined specification token "${specToken}".`
        );
      }
    }

    const share = assertFiniteNumber(cat, "share_of_net_sales_pct", `merchandise_categories[${categoryId}]`);
    const estSales = assertFiniteNumber(cat, "estimated_net_sales_usd_m", `merchandise_categories[${categoryId}]`);
    if (share <= 0 || estSales <= 0) {
      throw new Error(`Financial dataset validation failed: category "${categoryId}" must have positive sales.`);
    }
    if (!Array.isArray(cat.examples) || cat.examples.length === 0) {
      throw new Error(`Financial dataset validation failed: category "${categoryId}" requires non-empty examples.`);
    }

    categoryShareSum += share;
    categorySalesDollarSum += estSales;
  }

  const roundedCategoryShareSum = round4(categoryShareSum);
  if (Math.abs(roundedCategoryShareSum - 100.0) > 0.5) {
    throw new Error(
      `Merchandise category share drift: share_of_net_sales_pct sums to ${roundedCategoryShareSum}%, deviating from 100.0% by more than ±0.5%.`
    );
  }

  const maxCategoryDollarTolerance = Math.max(1, netSalesUsdM * 0.005);
  if (Math.abs(categorySalesDollarSum - netSalesUsdM) > maxCategoryDollarTolerance) {
    throw new Error(
      `Merchandise category dollar sum mismatch: estimated_net_sales_usd_m sums to ${categorySalesDollarSum} USD million vs. net_sales_usd_m ${netSalesUsdM} USD million.`
    );
  }

  return {
    merchandiseCategoryCount: categories.length,
    merchandiseCategoryShareSumPct: roundedCategoryShareSum,
    merchandiseCategoryNetSalesSumUsdM: categorySalesDollarSum
  };
}

function verifyGeographicSegments(segments, fiscalYear) {
  if (!Array.isArray(segments) || segments.length < 3) {
    throw new Error(
      "Financial dataset validation failed: geographic_segments must contain United States, Canada, and Other International."
    );
  }

  let geographicShareSum = 0;
  let totalWarehouseCount = 0;
  const segmentNames = new Set();

  for (const seg of segments) {
    assertPlainObject(seg, "geographic_segments[]");
    const segName = assertNonEmptyString(seg, "name", "geographic_segments[]");
    segmentNames.add(segName);

    const share = assertFiniteNumber(seg, "share_of_net_sales_pct", `geographic_segments[${segName}]`);
    const warehouses = assertFiniteNumber(seg, "warehouse_count", `geographic_segments[${segName}]`);
    if (share <= 0 || !Number.isInteger(warehouses) || warehouses <= 0) {
      throw new Error(
        `Financial dataset validation failed: geographic segment "${segName}" requires positive share and integer warehouse_count.`
      );
    }

    geographicShareSum += share;
    totalWarehouseCount += warehouses;
  }

  for (const expectedSeg of ["United States", "Canada", "Other International"]) {
    if (!segmentNames.has(expectedSeg)) {
      throw new Error(`Financial dataset validation failed: geographic_segments missing "${expectedSeg}".`);
    }
  }

  const roundedGeoShareSum = round4(geographicShareSum);
  if (Math.abs(roundedGeoShareSum - 100.0) > 0.5) {
    throw new Error(
      `Geographic segment share drift: share_of_net_sales_pct sums to ${roundedGeoShareSum}%, deviating from 100.0% by more than ±0.5%.`
    );
  }

  if (fiscalYear === 2024 && totalWarehouseCount !== 890) {
    throw new Error(
      `Geographic segment warehouse count mismatch for FY2024: expected 890 warehouses, received ${totalWarehouseCount}.`
    );
  }

  return {
    geographicSegmentCount: segments.length,
    geographicSegmentShareSumPct: roundedGeoShareSum,
    totalWarehouses: totalWarehouseCount
  };
}

/**
 * Validates Costco's structured financial dataset against all GAAP conservation
 * identities, disaggregation share bounds, membership invariants, and working-capital
 * ratios defined in functional_specification_001.md, functional_specification_002.md, and LANGUAGE.md.
 */
export function verifyFinancialDataset(data) {
  if (!isPlainObject(data)) {
    throw new Error("Financial dataset validation failed: dataset must be a non-null JSON object.");
  }

  const requiredTopKeys = [
    "company",
    "consolidated_income_statement",
    "historical_comparison",
    "merchandise_categories",
    "geographic_segments",
    "membership_metrics",
    "working_capital_balance_sheet",
    "primary_sources"
  ];

  for (const key of requiredTopKeys) {
    if (!hasOwn(data, key) || data[key] === null || data[key] === undefined) {
      throw new Error(`Financial dataset validation failed: missing required top-level key "${key}".`);
    }
  }

  const company = verifyCompanyMetadata(data.company);
  const {
    netSalesUsdM,
    membershipFeesUsdM,
    totalRevenueUsdM,
    merchandiseCostsUsdM,
    sgaUsdM,
    operatingIncomeUsdM
  } = verifyIncomeStatementIdentities(data.consolidated_income_statement);

  verifyHistoricalComparison(data.historical_comparison);
  const categorySummary = verifyMerchandiseCategories(data.merchandise_categories, netSalesUsdM);
  const geographicSummary = verifyGeographicSegments(data.geographic_segments, company.fiscal_year);

  const mm = assertPlainObject(data.membership_metrics, "membership_metrics");
  const paidMembersM = assertFiniteNumber(mm, "paid_household_members_m", "membership_metrics");
  const cardholdersTotalM = assertFiniteNumber(mm, "cardholders_total_m", "membership_metrics");
  const execPaidMembersM = assertFiniteNumber(mm, "executive_paid_members_m", "membership_metrics");
  assertFiniteNumber(mm, "executive_share_of_paid_members_pct", "membership_metrics");
  assertFiniteNumber(mm, "executive_share_of_worldwide_sales_pct", "membership_metrics");
  const renewalUsCanadaPct = assertFiniteNumber(mm, "renewal_rate_us_canada_pct", "membership_metrics");
  const renewalWorldwidePct = assertFiniteNumber(mm, "renewal_rate_worldwide_pct", "membership_metrics");
  assertFiniteNumber(mm, "gold_star_annual_fee_usd", "membership_metrics");
  assertFiniteNumber(mm, "executive_annual_fee_usd", "membership_metrics");

  if (
    paidMembersM <= 0 ||
    execPaidMembersM <= 0 ||
    execPaidMembersM > paidMembersM ||
    paidMembersM > cardholdersTotalM ||
    renewalUsCanadaPct <= 0 ||
    renewalUsCanadaPct > 100 ||
    renewalWorldwidePct <= 0 ||
    renewalWorldwidePct > 100
  ) {
    throw new Error("Financial dataset validation failed: membership_metrics values violate physical cohort bounds.");
  }

  const wc = assertPlainObject(data.working_capital_balance_sheet, "working_capital_balance_sheet");
  const merchandiseInventoriesUsdM = assertFiniteNumber(
    wc,
    "merchandise_inventories_usd_m",
    "working_capital_balance_sheet"
  );
  const accountsPayableUsdM = assertFiniteNumber(wc, "accounts_payable_usd_m", "working_capital_balance_sheet");
  const deferredMembershipFeesUsdM = assertFiniteNumber(
    wc,
    "deferred_membership_fees_liability_usd_m",
    "working_capital_balance_sheet"
  );
  if (merchandiseInventoriesUsdM <= 0 || accountsPayableUsdM <= 0 || deferredMembershipFeesUsdM <= 0) {
    throw new Error(
      "Financial dataset validation failed: working_capital_balance_sheet accounts must be strictly positive."
    );
  }

  if (!Array.isArray(data.primary_sources) || data.primary_sources.length === 0) {
    throw new Error("Financial dataset validation failed: primary_sources must be a non-empty array.");
  }
  let hasPrimary10KSource = false;
  for (const src of data.primary_sources) {
    assertPlainObject(src, "primary_sources[]");
    for (const field of ["source_id", "title", "filing_type", "cik", "filing_date", "period_end"]) {
      assertNonEmptyString(src, field, "primary_sources[]");
    }
    if (!Array.isArray(src.items_referenced) || src.items_referenced.length === 0) {
      throw new Error(
        `Financial dataset validation failed: primary_sources[${src.source_id}] requires non-empty items_referenced.`
      );
    }
    if (src.cik === "0000909832" && src.filing_type.includes("10-K")) {
      hasPrimary10KSource = true;
    }
  }
  if (!hasPrimary10KSource) {
    throw new Error(
      'Financial dataset validation failed: primary_sources must cite Costco SEC Form 10-K with CIK "0000909832".'
    );
  }

  const netSalesSharePct = round4((netSalesUsdM / totalRevenueUsdM) * 100);
  const membershipFeeShareOfRevenuePct = round4((membershipFeesUsdM / totalRevenueUsdM) * 100);
  const merchandiseGrossMarginDollarM = netSalesUsdM - merchandiseCostsUsdM;
  const merchandiseGrossMarginPct = round4((merchandiseGrossMarginDollarM / netSalesUsdM) * 100);
  const sgaPctOfNetSales = round4((sgaUsdM / netSalesUsdM) * 100);
  const membershipFeeShareOfOperatingIncomePct = round4((membershipFeesUsdM / operatingIncomeUsdM) * 100);
  const merchandiseOperatingContributionUsdM = merchandiseGrossMarginDollarM - sgaUsdM;
  const merchandiseOperatingContributionSharePct = round4(
    (merchandiseOperatingContributionUsdM / operatingIncomeUsdM) * 100
  );
  const accountsPayableToInventoryRatioPct = round4((accountsPayableUsdM / merchandiseInventoriesUsdM) * 100);

  if (merchandiseGrossMarginPct < 10.0 || merchandiseGrossMarginPct > 11.5) {
    throw new Error(
      `Gross Margin Ceiling invariant breach: merchandiseGrossMarginPct (${merchandiseGrossMarginPct}%) falls outside Costco's structural [10.0%, 11.5%] ceiling.`
    );
  }

  if (membershipFeeShareOfRevenuePct >= 2.5 || membershipFeeShareOfOperatingIncomePct <= 50.0) {
    throw new Error(
      `Operating Income Flywheel invariant breach: membership fees must represent < 2.5% of revenue (observed ${membershipFeeShareOfRevenuePct}%) and > 50.0% of operating income (observed ${membershipFeeShareOfOperatingIncomePct}%).`
    );
  }

  return {
    valid: true,
    totalRevenueCheck: true,
    operatingIncomeCheck: true,
    preTaxAndNetIncomeCheck: true,
    plainEnglishDatasetRolesValid: true,
    netSalesSharePct,
    membershipFeeShareOfRevenuePct,
    merchandiseGrossMarginDollarM,
    merchandiseGrossMarginPct,
    sgaPctOfNetSales,
    membershipFeeShareOfOperatingIncomePct,
    merchandiseOperatingContributionUsdM,
    merchandiseOperatingContributionSharePct,
    accountsPayableToInventoryRatioPct,
    formattedRatios: {
      netSalesSharePct: netSalesSharePct.toFixed(2),
      membershipFeeShareOfRevenuePct: membershipFeeShareOfRevenuePct.toFixed(2),
      merchandiseGrossMarginPct: merchandiseGrossMarginPct.toFixed(2),
      sgaPctOfNetSales: sgaPctOfNetSales.toFixed(2),
      membershipFeeShareOfOperatingIncomePct: membershipFeeShareOfOperatingIncomePct.toFixed(2),
      merchandiseOperatingContributionSharePct: merchandiseOperatingContributionSharePct.toFixed(2),
      accountsPayableToInventoryRatioPct: accountsPayableToInventoryRatioPct.toFixed(2)
    },
    disaggregationSummary: {
      ...categorySummary,
      ...geographicSummary
    }
  };
}

function verifySingleTicketMarkdown(ticketMarkdown, ticketLabel) {
  if (typeof ticketMarkdown !== "string" || !ticketMarkdown.trim()) {
    throw new Error(`Wayfinder audit failed for ${ticketLabel}: ticket content is empty or invalid.`);
  }
  if (!WAYFINDER_RESEARCH_REGEX.test(ticketMarkdown)) {
    throw new Error(
      `Wayfinder ticket audit failed for ${ticketLabel}: missing required "wayfinder:research" indicator.`
    );
  }
  if (!CLAIMED_BY_REGEX.test(ticketMarkdown)) {
    throw new Error(`Wayfinder ticket audit failed for ${ticketLabel}: missing required "Claimed by:" metadata.`);
  }
  if (!RESOLVED_STATUS_REGEX.test(ticketMarkdown)) {
    throw new Error(`Wayfinder ticket audit failed for ${ticketLabel}: ticket lacks "Status: resolved".`);
  }

  for (const requiredHeading of REQUIRED_TICKET_HEADINGS) {
    if (!requiredHeading.regex.test(ticketMarkdown)) {
      throw new Error(
        `Wayfinder ticket audit failed for ${ticketLabel}: missing required section "${requiredHeading.label}".`
      );
    }
  }

  const blockedBySection = extractMarkdownSection(ticketMarkdown, REQUIRED_TICKET_HEADINGS[1].regex) ?? "";
  for (const depLink of extractMarkdownLinks(blockedBySection)) {
    if (isBareTicketLabel(depLink.label)) {
      throw new Error(
        `Wayfinder "Refer by name" link invariant breach in ${ticketLabel} under "## Blocked By": bare link "[${depLink.label}](${depLink.href})".`
      );
    }
  }
  const blockedByWithoutLinks = blockedBySection.replace(/\[([^\]]*)\]\(([^)]+)\)/g, "$1");
  if (BARE_TICKET_ID_IN_PROSE_REGEX.test(blockedByWithoutLinks)) {
    throw new Error(
      `Wayfinder "Refer by name" invariant breach in ${ticketLabel} under "## Blocked By": bare ticket ID detected.`
    );
  }

  const resolutionSection = extractMarkdownSection(ticketMarkdown, REQUIRED_TICKET_HEADINGS[2].regex) ?? "";
  if (!resolutionSection.includes("research/costco_revenue_architecture.md")) {
    throw new Error(
      `Wayfinder ticket audit failed for ${ticketLabel}: "## Resolution" must link to research/costco_revenue_architecture.md.`
    );
  }
  if (!resolutionSection.includes("data/costco_revenue_breakdown.json")) {
    throw new Error(
      `Wayfinder ticket audit failed for ${ticketLabel}: "## Resolution" must link to data/costco_revenue_breakdown.json.`
    );
  }
}

/**
 * Audits wayfinder/map.md and wayfinder/tickets/ticket-001.md..ticket-006.md
 * enforcing required H2 headings, descriptive human-readable ticket links (zero bare IDs),
 * wayfinder:research classification, Status: resolved, and primary-source artifact links.
 */
export function verifyWayfinderArtifacts(rawOptions = {}) {
  let opts = null;
  if (typeof rawOptions === "string") {
    opts = { mapPath: rawOptions };
  } else if (isPlainObject(rawOptions)) {
    opts = rawOptions;
  }
  if (!opts) {
    throw new Error("Wayfinder audit failed: options must be an object or map file path string.");
  }

  const rootDir = opts.rootDir ? path.resolve(opts.rootDir) : DEFAULT_ROOT_DIR;
  const mapPath = opts.mapPath ? path.resolve(opts.mapPath) : path.join(rootDir, "wayfinder", "map.md");
  const ticketsDir = resolveTicketsDir(rootDir, opts.mapPath ? mapPath : null, opts.ticketsDir);

  const hasMapContentOverride =
    typeof opts.hasMapContentOverride === "boolean"
      ? opts.hasMapContentOverride
      : hasDefinedOwn(opts, "mapContent") || hasDefinedOwn(opts, "mapMarkdown");
  const mapContent = hasDefinedOwn(opts, "mapMarkdown") ? opts.mapMarkdown : opts.mapContent;

  const hasTicketContentsOverride =
    typeof opts.hasTicketContentsOverride === "boolean"
      ? opts.hasTicketContentsOverride
      : hasDefinedOwn(opts, "ticketContents") || hasDefinedOwn(opts, "tickets");
  const ticketContents = hasDefinedOwn(opts, "tickets") ? opts.tickets : opts.ticketContents;

  const mapLabel = mapPath || "wayfinder/map.md";
  let resolvedMapMarkdown;

  if (hasMapContentOverride) {
    if (typeof mapContent !== "string" || !mapContent.trim()) {
      throw new Error(`Wayfinder audit failed for ${mapLabel}: provided map markdown override is empty or invalid.`);
    }
    resolvedMapMarkdown = mapContent;
  } else {
    if (!fs.existsSync(mapPath)) {
      throw new Error(`Wayfinder audit failed: canonical map file not found at ${mapLabel}.`);
    }
    resolvedMapMarkdown = fs.readFileSync(mapPath, "utf8");
  }

  for (const section of REQUIRED_WAYFINDER_SECTIONS) {
    if (!section.pattern.test(resolvedMapMarkdown)) {
      throw new Error(
        `Wayfinder audit failed for ${mapLabel}: missing required canonical section heading "${section.heading}".`
      );
    }
  }

  for (const link of extractMarkdownLinks(resolvedMapMarkdown)) {
    if (TICKET_HREF_REGEX.test(link.href) && isBareTicketLabel(link.label)) {
      throw new Error(
        `Wayfinder "Refer by name" link invariant breach in ${mapLabel}: bare ticket link label "[${link.label}](${link.href})" is prohibited; wrap a descriptive human-readable title.`
      );
    }
  }

  const decisionsSection = extractMarkdownSection(resolvedMapMarkdown, REQUIRED_WAYFINDER_SECTIONS[2].pattern);
  if (!decisionsSection || !decisionsSection.trim()) {
    throw new Error(`Wayfinder audit failed for ${mapLabel}: "## Decisions so far" section is empty.`);
  }

  const decisionLinks = extractMarkdownLinks(decisionsSection);
  for (const link of decisionLinks) {
    if (isBareTicketLabel(link.label)) {
      throw new Error(
        `Wayfinder "Refer by name" link invariant breach under "## Decisions so far" in ${mapLabel}: link "[${link.label}](${link.href})" must use a descriptive human-readable title instead of a bare ticket ID.`
      );
    }
  }

  const decisionsWithoutLinks = decisionsSection.replace(/\[([^\]]*)\]\(([^)]+)\)/g, "$1");
  if (BARE_TICKET_ID_IN_PROSE_REGEX.test(decisionsWithoutLinks)) {
    throw new Error(
      `Wayfinder "Refer by name" invariant breach under "## Decisions so far" in ${mapLabel}: bare ticket identifier detected in prose/label.`
    );
  }

  const linkedTicketsByFilename = new Map();
  for (const link of decisionLinks) {
    const normalizedHref = link.href.split("#")[0].replace(/^\.\//, "");
    for (const expectedTicketFile of EXPECTED_TICKET_FILES) {
      if (normalizedHref === `tickets/${expectedTicketFile}`) {
        linkedTicketsByFilename.set(expectedTicketFile, link.label.trim());
      }
    }
  }

  for (const expectedTicketFile of EXPECTED_TICKET_FILES) {
    if (!linkedTicketsByFilename.has(expectedTicketFile)) {
      throw new Error(
        `Wayfinder audit failed for ${mapLabel}: "## Decisions so far" does not link "./tickets/${expectedTicketFile}".`
      );
    }
  }

  if (hasTicketContentsOverride && !isPlainObject(ticketContents)) {
    throw new Error("Wayfinder audit failed: provided tickets override must be a non-null plain object.");
  }

  if (hasTicketContentsOverride) {
    for (const [providedKey, providedMarkdown] of Object.entries(ticketContents)) {
      const normalizedKey = providedKey.endsWith(".md") ? providedKey : `${providedKey}.md`;
      const ticketLabel = path.join(ticketsDir, normalizedKey);
      verifySingleTicketMarkdown(providedMarkdown, ticketLabel);
    }
  }

  const ticketsVerified = [];
  for (const ticketFilename of EXPECTED_TICKET_FILES) {
    const ticketSlug = ticketFilename.replace(/\.md$/, "");
    const ticketFilePath = path.join(ticketsDir, ticketFilename);

    if (hasTicketContentsOverride) {
      const hasTicketKey = hasOwn(ticketContents, ticketFilename) || hasOwn(ticketContents, ticketSlug);
      if (!hasTicketKey) {
        throw new Error(
          `Wayfinder audit failed: required ticket "${ticketFilename}" missing from provided tickets override.`
        );
      }
    } else {
      if (!fs.existsSync(ticketFilePath)) {
        throw new Error(`Wayfinder audit failed: required ticket file not found at ${ticketFilePath}.`);
      }
      const ticketMarkdown = fs.readFileSync(ticketFilePath, "utf8");
      verifySingleTicketMarkdown(ticketMarkdown, ticketFilePath);
    }

    ticketsVerified.push({
      file: ticketFilename,
      title: linkedTicketsByFilename.get(ticketFilename),
      status: "resolved"
    });
  }

  return {
    valid: true,
    mapPath: mapLabel,
    requiredSectionsVerified: REQUIRED_WAYFINDER_SECTIONS.length,
    resolvedTicketCount: ticketsVerified.length,
    ticketsVerified
  };
}

/**
 * Audits research/costco_revenue_architecture.md for minimum substantive byte length (>= 8,000 bytes),
 * primary-source SEC Form 10-K / CIK 0000909832 / ASC 606 citations, and key FY2024 GAAP figures.
 */
export function verifyResearchMonograph(rawOptions = {}) {
  let opts = null;
  if (typeof rawOptions === "string") {
    opts = { researchPath: rawOptions };
  } else if (isPlainObject(rawOptions)) {
    opts = rawOptions;
  }
  if (!opts) {
    throw new Error("Research monograph audit failed: options must be an object or research file path string.");
  }

  const rootDir = opts.rootDir ? path.resolve(opts.rootDir) : DEFAULT_ROOT_DIR;
  const researchPath = opts.researchPath
    ? path.resolve(opts.researchPath)
    : path.join(rootDir, "research", "costco_revenue_architecture.md");
  const hasResearchContentOverride =
    typeof opts.hasResearchContentOverride === "boolean"
      ? opts.hasResearchContentOverride
      : hasDefinedOwn(opts, "researchContent") || hasDefinedOwn(opts, "researchMarkdown");
  const researchContent = hasDefinedOwn(opts, "researchMarkdown") ? opts.researchMarkdown : opts.researchContent;

  const researchLabel = researchPath || "research/costco_revenue_architecture.md";
  let resolvedResearchMarkdown;

  if (hasResearchContentOverride) {
    if (typeof researchContent !== "string") {
      throw new Error(
        `Research monograph audit failed for ${researchLabel}: provided research markdown override must be a string.`
      );
    }
    resolvedResearchMarkdown = researchContent;
  } else {
    if (!fs.existsSync(researchPath)) {
      throw new Error(`Research monograph audit failed: file not found at ${researchLabel}.`);
    }
    resolvedResearchMarkdown = fs.readFileSync(researchPath, "utf8");
  }

  const byteLength = Buffer.byteLength(resolvedResearchMarkdown, "utf8");
  if (byteLength < MIN_RESEARCH_MONOGRAPH_BYTES) {
    throw new Error(
      `Research monograph audit failed for ${researchLabel}: byte length (${byteLength} bytes) is below the ${MIN_RESEARCH_MONOGRAPH_BYTES}-byte minimum requirement.`
    );
  }

  for (const citation of REQUIRED_RESEARCH_CITATIONS) {
    if (!resolvedResearchMarkdown.includes(citation)) {
      throw new Error(
        `Research monograph audit failed for ${researchLabel}: missing required primary-source citation "${citation}".`
      );
    }
  }

  for (const figure of REQUIRED_RESEARCH_FIGURES) {
    if (!resolvedResearchMarkdown.includes(figure)) {
      throw new Error(
        `Research monograph audit failed for ${researchLabel}: missing required FY2024 primary-source figure "${figure}".`
      );
    }
  }

  return {
    valid: true,
    researchPath: researchLabel,
    byteLength,
    citationsVerified: [...REQUIRED_RESEARCH_CITATIONS],
    keyFiguresVerified: [...REQUIRED_RESEARCH_FIGURES]
  };
}

/**
 * Audits index.html to verify the institutional Corporate Business aesthetic,
 * sticky Table of Contents (#table-of-contents), 3 interactive Polar Graphs,
 * 5-Step sequential revenue generation walkthrough (#step-1..#step-5),
 * and complete elimination of deprecated Dreamcore markers.
 */
export function verifyCorporateWebReport(rawOptions = {}) {
  let opts = null;
  if (typeof rawOptions === "string") {
    opts = { htmlPath: rawOptions };
  } else if (isPlainObject(rawOptions)) {
    opts = rawOptions;
  }
  if (!opts) {
    throw new Error("Corporate web report audit failed: options must be an object or HTML file path string.");
  }

  const rootDir = opts.rootDir ? path.resolve(opts.rootDir) : DEFAULT_ROOT_DIR;
  const htmlPath = opts.htmlPath ? path.resolve(opts.htmlPath) : path.join(rootDir, "index.html");
  const hasHtmlContentOverride =
    typeof opts.hasHtmlContentOverride === "boolean"
      ? opts.hasHtmlContentOverride
      : hasDefinedOwn(opts, "htmlContent") || hasDefinedOwn(opts, "indexHtml");
  const htmlContent = hasDefinedOwn(opts, "indexHtml") ? opts.indexHtml : opts.htmlContent;

  const htmlLabel = htmlPath || "index.html";
  let resolvedHtml;

  if (hasHtmlContentOverride) {
    if (typeof htmlContent !== "string" || !htmlContent.trim()) {
      throw new Error(`Corporate web report audit failed for ${htmlLabel}: provided HTML override is empty or invalid.`);
    }
    resolvedHtml = htmlContent;
  } else {
    if (!fs.existsSync(htmlPath)) {
      throw new Error(`Corporate web report audit failed: file not found at ${htmlLabel}.`);
    }
    resolvedHtml = fs.readFileSync(htmlPath, "utf8");
    if (!resolvedHtml.trim()) {
      throw new Error(`Corporate web report audit failed for ${htmlLabel}: HTML file is empty.`);
    }
  }

  const lowerHtml = resolvedHtml.toLowerCase();
  for (const marker of PROHIBITED_DREAMCORE_MARKERS) {
    if (lowerHtml.includes(marker)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: residual Dreamcore/liminal marker "${marker}" detected.`
      );
    }
  }

  const declaredIds = new Set();
  const idRegex = /\bid=["']([a-zA-Z0-9_-]+)["']/g;
  let idMatch;
  while ((idMatch = idRegex.exec(resolvedHtml)) !== null) {
    declaredIds.add(idMatch[1]);
  }

  for (const requiredId of REQUIRED_CORPORATE_DOM_IDS) {
    if (!declaredIds.has(requiredId)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: missing required structural element "#${requiredId}".`
      );
    }
  }

  const observedHrefTargets = new Set();
  const hrefAnchorRegex = /\bhref=["']#([a-zA-Z0-9_-]+)["']/g;
  let hrefMatch;
  while ((hrefMatch = hrefAnchorRegex.exec(resolvedHtml)) !== null) {
    observedHrefTargets.add(hrefMatch[1]);
  }

  for (const targetId of REQUIRED_TOC_ANCHOR_TARGETS) {
    if (!observedHrefTargets.has(targetId)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: Table of Contents is missing anchor link href="#${targetId}".`
      );
    }
  }

  for (const targetAnchor of observedHrefTargets) {
    if (!declaredIds.has(targetAnchor)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: broken internal anchor link href="#${targetAnchor}" (target ID not found in DOM).`
      );
    }
  }

  for (let i = 0; i < REQUIRED_CORPORATE_BRAND_TOKENS.length; i += 1) {
    if (!lowerHtml.includes(REQUIRED_CORPORATE_BRAND_TOKENS_LOWER[i])) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: missing corporate design token "${REQUIRED_CORPORATE_BRAND_TOKENS[i]}".`
      );
    }
  }

  for (const figure of REQUIRED_CORPORATE_WEB_FIGURES) {
    if (!resolvedHtml.includes(figure)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: missing primary-source figure "${figure}".`
      );
    }
  }

  for (let i = 0; i < EXPECTED_TICKET_FILES.length; i += 1) {
    if (!lowerHtml.includes(EXPECTED_TICKET_SLUGS_LOWER[i])) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: missing Wayfinder reference to "${EXPECTED_TICKET_FILES[i]}".`
      );
    }
  }

  for (const specToken of PROHIBITED_SPEC_TOKENS) {
    if (resolvedHtml.includes(specToken)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: unrefined specification token "${specToken}" detected in reader-facing HTML.`
      );
    }
  }

  for (const divider of PROHIBITED_PSEUDOCODE_DIVIDERS) {
    if (resolvedHtml.includes(divider)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: pseudo-code divider "${divider}" detected in reader-facing HTML.`
      );
    }
  }

  const htmlWithoutScripts = resolvedHtml.replace(SCRIPT_BLOCK_STRIP_REGEX, "");
  const dividerMatch = PROHIBITED_PSEUDOCODE_DIVIDER_REGEX.exec(resolvedHtml);
  if (dividerMatch || htmlWithoutScripts.includes(" // ")) {
    const foundToken = dividerMatch ? dividerMatch[0] : " // ";
    throw new Error(
      `Corporate web report audit failed for ${htmlLabel}: pseudo-code divider "${foundToken}" detected in reader-facing HTML.`
    );
  }

  const styleBlocks = [];
  const styleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  let styleMatch;
  while ((styleMatch = styleRegex.exec(resolvedHtml)) !== null) {
    styleBlocks.push(styleMatch[1]);
  }
  const combinedCss = styleBlocks.join("\n");
  for (const selector of REQUIRED_POLAR_CSS_SELECTORS) {
    if (!combinedCss.includes(selector)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: missing required CSS style rule "${selector}" in <style>.`
      );
    }
  }
  if (resolvedHtml.includes("--emerald-audit")) {
    throw new Error(
      `Corporate web report audit failed for ${htmlLabel}: undefined CSS custom property "--emerald-audit" detected.`
    );
  }

  for (const [formattedFig, rawFig] of REQUIRED_RECONCILED_CATEGORY_FIGURES) {
    if (!resolvedHtml.includes(formattedFig) && !resolvedHtml.includes(rawFig)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: missing audited Note 11 / Item 2 figure "${formattedFig}".`
      );
    }
  }

  for (const legacyFig of PROHIBITED_UNVERIFIED_HISTORICAL_FIGURES) {
    if (resolvedHtml.includes(legacyFig)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: unverified historical figure "${legacyFig}" detected (diverges from Note 11 / Item 2).`
      );
    }
  }

  for (const animId of REQUIRED_ANIMATED_SVG_IDS) {
    if (!declaredIds.has(animId)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: missing required corporate animated SVG or motion control element "#${animId}" (AC-01).`
      );
    }
  }
  if (!combinedCss.includes("prefers-reduced-motion: reduce") || !resolvedHtml.includes("is-motion-paused")) {
    throw new Error(
      `Corporate web report audit failed for ${htmlLabel}: missing reduced-motion CSS or pause state support (AC-01).`
    );
  }

  for (const ditherId of REQUIRED_DITHER_PATTERN_IDS) {
    if (!declaredIds.has(ditherId)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: missing required ordered Bayer / halftone dither pattern "#${ditherId}" (AC-02).`
      );
    }
  }
  if (!combinedCss.includes(".dither-accent-band")) {
    throw new Error(
      `Corporate web report audit failed for ${htmlLabel}: missing ".dither-accent-band" CSS rule (AC-02).`
    );
  }

  for (const shorthand of PROHIBITED_ALGEBRAIC_AND_CODE_SHORTHAND) {
    if (resolvedHtml.includes(shorthand)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: prohibited algebraic/code shorthand "${shorthand}" detected (AC-03).`
      );
    }
  }
  for (const cliche of PROHIBITED_PROMOTIONAL_CLICHES) {
    if (lowerHtml.includes(cliche)) {
      throw new Error(
        `Corporate web report audit failed for ${htmlLabel}: prohibited promotional cliché "${cliche}" detected (AC-03).`
      );
    }
  }

  const plainEnglishNoteCount = (resolvedHtml.match(/class=["'][^"']*\bplain-english-note\b[^"']*["']/g) || []).length;
  const chartReadingNoteCount = (resolvedHtml.match(/class=["'][^"']*\bchart-reading-note\b[^"']*["']/g) || []).length;
  if (plainEnglishNoteCount < 5 || chartReadingNoteCount < 3) {
    throw new Error(
      `Corporate web report audit failed for ${htmlLabel}: expected >= 5 .plain-english-note (found ${plainEnglishNoteCount}) and >= 3 .chart-reading-note (found ${chartReadingNoteCount}) boxes (AC-03).`
    );
  }

  const paddedPolarViewBoxCount = (resolvedHtml.match(/viewBox=["']-80 -44 560 488["']/g) || []).length;
  const polarHtmlLegendCount = (resolvedHtml.match(/class=["'][^"']*\bpolar-html-legend\b[^"']*["']/g) || []).length;
  if (paddedPolarViewBoxCount < 3 || polarHtmlLegendCount < 3 || !combinedCss.includes("paint-order: stroke fill")) {
    throw new Error(
      `Corporate web report audit failed for ${htmlLabel}: missing padded polar viewBox="-80 -44 560 488" (found ${paddedPolarViewBoxCount}), .polar-html-legend (found ${polarHtmlLegendCount}), or halo stroke rule (AC-04).`
    );
  }

  if (
    !combinedCss.includes("clamp(") ||
    !combinedCss.includes("minmax(0, 1fr)") ||
    !resolvedHtml.includes("bindInteractiveTableRows") ||
    !resolvedHtml.includes("bindTablistKeyboardNav")
  ) {
    throw new Error(
      `Corporate web report audit failed for ${htmlLabel}: missing fluid clamp(), minmax(0, 1fr), or keyboard accessibility helpers (AC-05).`
    );
  }

  return {
    valid: true,
    htmlPath: htmlLabel,
    byteLength: Buffer.byteLength(resolvedHtml, "utf8"),
    tableOfContentsVerified: true,
    polarChartsVerified: [
      "polar-chart-categories",
      "polar-chart-geography",
      "polar-chart-flywheel"
    ],
    fiveStepsVerified: ["step-1", "step-2", "step-3", "step-4", "step-5"],
    dreamcoreMarkersDetected: 0,
    specTokensDetected: 0,
    polarCssSelectorsVerified: true,
    historicalNote11Reconciled: true,
    animatedSvgElementsPresent: true,
    corporateAnimatedSvgVerified: true,
    ditherVisualEffectsPresent: true,
    ditherEffectsVerified: true,
    simplifiedEnglishValid: true,
    plainEnglishNotesVerified: true,
    polarLegibilityValid: true,
    legibleGraphTypographyVerified: true,
    responsiveArchitectureValid: true,
    responsiveScreenAgnosticVerified: true,
    keyboardAccessibilityVerified: true
  };
}

export const verifyIndexHtml = verifyCorporateWebReport;

function normalizeModelOptions(rawOptions) {
  if (rawOptions === undefined) {
    return {};
  }
  if (typeof rawOptions === "string") {
    return rawOptions.endsWith(".json") ? { dataPath: rawOptions } : { rootDir: rawOptions };
  }
  if (!isPlainObject(rawOptions)) {
    throw new Error("Invalid options passed to loadAndVerifyCostcoModel: expected an options object.");
  }
  if (
    hasOwn(rawOptions, "consolidated_income_statement") ||
    (hasOwn(rawOptions, "company") &&
      !hasOwn(rawOptions, "rootDir") &&
      !hasOwn(rawOptions, "dataPath") &&
      !hasOwn(rawOptions, "data"))
  ) {
    return { data: rawOptions };
  }
  return rawOptions;
}

/**
 * Loads and cross-verifies Costco Wholesale Corporation's structured SEC Form 10-K
 * financial dataset, canonical Wayfinder decision map and resolved tickets,
 * primary-source research monograph, and corporate interactive web report
 * with zero external network calls.
 */
export function loadAndVerifyCostcoModel(rawOptions = {}) {
  const startTime = performance.now();
  const options = normalizeModelOptions(rawOptions);

  const rootDir = options.rootDir ? path.resolve(options.rootDir) : DEFAULT_ROOT_DIR;
  const dataPath = options.dataPath
    ? path.resolve(options.dataPath)
    : path.join(rootDir, "data", "costco_revenue_breakdown.json");
  const mapPath = options.mapPath ? path.resolve(options.mapPath) : path.join(rootDir, "wayfinder", "map.md");
  const ticketsDir = resolveTicketsDir(rootDir, options.mapPath ? mapPath : null, options.ticketsDir);
  const researchPath = options.researchPath
    ? path.resolve(options.researchPath)
    : path.join(rootDir, "research", "costco_revenue_architecture.md");
  const htmlPath = options.htmlPath ? path.resolve(options.htmlPath) : path.join(rootDir, "index.html");

  const hasDataOverride = hasDefinedOwn(options, "data") || hasDefinedOwn(options, "dataset");
  let dataset;
  if (hasDataOverride) {
    dataset = hasDefinedOwn(options, "data") ? options.data : options.dataset;
  } else {
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Financial dataset file not found at ${dataPath}.`);
    }
    const rawJson = fs.readFileSync(dataPath, "utf8");
    try {
      dataset = JSON.parse(rawJson);
    } catch (parseErr) {
      throw new Error(`Failed to parse JSON financial dataset at ${dataPath}: ${parseErr.message}`);
    }
  }

  const financialMetrics = verifyFinancialDataset(dataset);

  const hasMapContentOverride = hasDefinedOwn(options, "mapMarkdown") || hasDefinedOwn(options, "mapContent");
  const mapContent = hasDefinedOwn(options, "mapMarkdown") ? options.mapMarkdown : options.mapContent;
  const hasTicketContentsOverride = hasDefinedOwn(options, "tickets") || hasDefinedOwn(options, "ticketContents");
  const ticketContents = hasDefinedOwn(options, "tickets") ? options.tickets : options.ticketContents;

  const wayfinderAudit = verifyWayfinderArtifacts({
    mapPath,
    ticketsDir,
    ...(hasMapContentOverride ? { mapContent, hasMapContentOverride: true } : {}),
    ...(hasTicketContentsOverride ? { ticketContents, hasTicketContentsOverride: true } : {})
  });

  const hasResearchContentOverride =
    hasDefinedOwn(options, "researchMarkdown") || hasDefinedOwn(options, "researchContent");
  const researchContent = hasDefinedOwn(options, "researchMarkdown")
    ? options.researchMarkdown
    : options.researchContent;

  const researchAudit = verifyResearchMonograph({
    researchPath,
    ...(hasResearchContentOverride ? { researchContent, hasResearchContentOverride: true } : {})
  });

  const hasHtmlContentOverride = hasDefinedOwn(options, "htmlContent") || hasDefinedOwn(options, "indexHtml");
  const htmlContent = hasDefinedOwn(options, "indexHtml") ? options.indexHtml : options.htmlContent;

  const corporateWebAudit = verifyCorporateWebReport({
    htmlPath,
    ...(hasHtmlContentOverride ? { htmlContent, hasHtmlContentOverride: true } : {})
  });

  const elapsedMs = round4(performance.now() - startTime);
  const rssMb = round4(process.memoryUsage().rss / (1024 * 1024));

  return {
    status: "VERIFIED",
    overallValid: true,
    mode: options.verifyOnly ? "verify" : "report",
    company: dataset.company,
    ...financialMetrics,
    wayfinderAudit,
    researchAudit,
    corporateWebAudit,
    telemetry: {
      elapsedMs,
      rssMb,
      externalNetworkRequests: 0
    }
  };
}

function readCliOptionValue(argv, index, flagName) {
  const nextVal = argv[index + 1];
  if (!nextVal || nextVal.startsWith("--")) {
    throw new Error(`Missing path value for CLI option "${flagName}"`);
  }
  return nextVal;
}

function parseCliArgs(argv) {
  const options = {};
  const pathFlags = {
    "--root": "rootDir",
    "--data": "dataPath",
    "--map": "mapPath",
    "--tickets": "ticketsDir",
    "--research": "researchPath",
    "--html": "htmlPath"
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--verify") {
      options.verifyOnly = true;
    } else if (hasOwn(pathFlags, arg)) {
      options[pathFlags[arg]] = readCliOptionValue(argv, i, arg);
      i += 1;
    } else {
      throw new Error(`Unrecognized or incomplete CLI argument: "${arg}"`);
    }
  }
  return options;
}

function isDirectCliInvocation() {
  if (!process.argv[1]) {
    return false;
  }
  const modulePath = fileURLToPath(import.meta.url);
  const entryCandidate = path.resolve(process.argv[1]);
  if (!fs.existsSync(entryCandidate) || !fs.existsSync(modulePath)) {
    return entryCandidate === modulePath;
  }
  return fs.realpathSync(modulePath) === fs.realpathSync(entryCandidate);
}

if (isDirectCliInvocation()) {
  try {
    const cliOptions = parseCliArgs(process.argv.slice(2));
    const verificationReport = loadAndVerifyCostcoModel(cliOptions);
    process.stdout.write(`${JSON.stringify(verificationReport, null, 2)}\n`);
    process.exitCode = 0;
  } catch (error) {
    process.stderr.write(`[COSTCO_REVENUE_MODEL_ERROR] ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
