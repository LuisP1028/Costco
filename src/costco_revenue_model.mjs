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
  "ticket-005.md"
];

const REQUIRED_RESEARCH_CITATIONS = ["0000909832", "Form 10-K", "ASC 606"];
const REQUIRED_RESEARCH_FIGURES = ["254,453", "249,625", "4,828", "9,285", "7,367"];
const MIN_RESEARCH_MONOGRAPH_BYTES = 8000;

function round4(value) {
  return Number(value.toFixed(4));
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function hasDefinedOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined;
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

function isBareTicketLabel(rawLabel) {
  const cleaned = String(rawLabel ?? "")
    .replace(/[`*_~]/g, "")
    .trim();
  if (!cleaned) {
    return true;
  }
  if (/^(?:ticket[-_\s#]*\d+(?:\.md)?|#?\d+|t[-_]?\d+)$/i.test(cleaned)) {
    return true;
  }
  if (cleaned.length < 10) {
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
  const nextHeadingMatch = /^##\s+/m.exec(remainder);
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

/**
 * Validates Costco's structured financial dataset against all GAAP conservation
 * identities, disaggregation share bounds, membership invariants, and working-capital
 * ratios defined in functional_specification_001.md and LANGUAGE.md.
 */
export function verifyFinancialDataset(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
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

  const { company } = data;
  if (typeof company.name !== "string" || !company.name.trim()) {
    throw new Error('Financial dataset validation failed: "company.name" must be a non-empty string.');
  }
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

  const cis = data.consolidated_income_statement;
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

  // GAAP Identity 1: Total Revenue === Net Sales + Membership Fees
  const expectedTotalRevenue = netSalesUsdM + membershipFeesUsdM;
  if (expectedTotalRevenue !== totalRevenueUsdM) {
    const delta = expectedTotalRevenue - totalRevenueUsdM;
    throw new Error(
      `GAAP Consolidated Total Revenue Identity mismatch: net_sales_usd_m (${netSalesUsdM}) + membership_fees_usd_m (${membershipFeesUsdM}) = ${expectedTotalRevenue}, which does not equal total_revenue_usd_m (${totalRevenueUsdM}); delta = ${delta > 0 ? `+${delta}` : delta} USD million.`
    );
  }

  // GAAP Identity 2: Operating Income === Total Revenue - Merchandise Costs - SG&A
  const expectedOperatingIncome = totalRevenueUsdM - merchandiseCostsUsdM - sgaUsdM;
  if (expectedOperatingIncome !== operatingIncomeUsdM) {
    const delta = expectedOperatingIncome - operatingIncomeUsdM;
    throw new Error(
      `GAAP Consolidated Operating Income Identity mismatch: total_revenue_usd_m (${totalRevenueUsdM}) - merchandise_costs_usd_m (${merchandiseCostsUsdM}) - selling_general_and_administrative_usd_m (${sgaUsdM}) = ${expectedOperatingIncome}, which does not equal operating_income_usd_m (${operatingIncomeUsdM}); delta = ${delta > 0 ? `+${delta}` : delta} USD million.`
    );
  }

  // GAAP Identity 3: Pre-Tax Income & Net Income Conservation
  const expectedPreTaxIncome = operatingIncomeUsdM - interestExpenseUsdM + interestIncomeOtherNetUsdM;
  if (expectedPreTaxIncome !== incomeBeforeTaxesUsdM) {
    const delta = expectedPreTaxIncome - incomeBeforeTaxesUsdM;
    throw new Error(
      `GAAP Income Before Taxes Identity mismatch: operating_income_usd_m (${operatingIncomeUsdM}) - interest_expense_usd_m (${interestExpenseUsdM}) + interest_income_and_other_net_usd_m (${interestIncomeOtherNetUsdM}) = ${expectedPreTaxIncome}, which does not equal income_before_taxes_usd_m (${incomeBeforeTaxesUsdM}); delta = ${delta > 0 ? `+${delta}` : delta} USD million.`
    );
  }

  const expectedNetIncome = incomeBeforeTaxesUsdM - provisionForTaxesUsdM;
  if (expectedNetIncome !== netIncomeUsdM) {
    const delta = expectedNetIncome - netIncomeUsdM;
    throw new Error(
      `GAAP Net Income Identity mismatch: income_before_taxes_usd_m (${incomeBeforeTaxesUsdM}) - provision_for_income_taxes_usd_m (${provisionForTaxesUsdM}) = ${expectedNetIncome}, which does not equal net_income_usd_m (${netIncomeUsdM}); delta = ${delta > 0 ? `+${delta}` : delta} USD million.`
    );
  }

  // Multi-year historical comparison verification
  if (!Array.isArray(data.historical_comparison) || data.historical_comparison.length < 3) {
    throw new Error(
      "Financial dataset validation failed: historical_comparison must contain at least 3 fiscal years (FY2022–FY2024)."
    );
  }
  const observedYears = new Set();
  for (const entry of data.historical_comparison) {
    const fy = assertFiniteNumber(entry, "fiscal_year", "historical_comparison[]");
    observedYears.add(fy);
    const histNetSales = assertFiniteNumber(entry, "net_sales_usd_m", `historical_comparison[${fy}]`);
    const histFees = assertFiniteNumber(entry, "membership_fees_usd_m", `historical_comparison[${fy}]`);
    const histTotalRev = assertFiniteNumber(entry, "total_revenue_usd_m", `historical_comparison[${fy}]`);
    const histCosts = assertFiniteNumber(entry, "merchandise_costs_usd_m", `historical_comparison[${fy}]`);
    const histOpInc = assertFiniteNumber(entry, "operating_income_usd_m", `historical_comparison[${fy}]`);
    assertFiniteNumber(entry, "net_income_usd_m", `historical_comparison[${fy}]`);

    if (histNetSales + histFees !== histTotalRev) {
      const delta = histNetSales + histFees - histTotalRev;
      throw new Error(
        `Historical GAAP Total Revenue Identity mismatch in FY${fy}: ${histNetSales} + ${histFees} = ${histNetSales + histFees} !== ${histTotalRev} (delta = ${delta} USD million).`
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
      if (histTotalRev - histCosts - histSga !== histOpInc) {
        const delta = histTotalRev - histCosts - histSga - histOpInc;
        throw new Error(
          `Historical GAAP Operating Income Identity mismatch in FY${fy}: ${histTotalRev} - ${histCosts} - ${histSga} !== ${histOpInc} (delta = ${delta} USD million).`
        );
      }
    }
  }
  for (const requiredYear of [2022, 2023, 2024]) {
    if (!observedYears.has(requiredYear)) {
      throw new Error(`Financial dataset validation failed: historical_comparison missing FY${requiredYear}.`);
    }
  }

  // Disaggregated merchandise categories conservation
  if (!Array.isArray(data.merchandise_categories) || data.merchandise_categories.length < 4) {
    throw new Error(
      "Financial dataset validation failed: merchandise_categories must contain Costco's 4 core disaggregated categories."
    );
  }
  let categoryShareSum = 0;
  let categorySalesDollarSum = 0;
  for (const cat of data.merchandise_categories) {
    if (typeof cat?.category_id !== "string" || !cat.category_id.trim()) {
      throw new Error("Financial dataset validation failed: merchandise_categories entry missing category_id.");
    }
    if (typeof cat?.name !== "string" || !cat.name.trim()) {
      throw new Error(`Financial dataset validation failed: category "${cat.category_id}" missing name.`);
    }
    const share = assertFiniteNumber(cat, "share_of_net_sales_pct", `merchandise_categories[${cat.category_id}]`);
    const estSales = assertFiniteNumber(
      cat,
      "estimated_net_sales_usd_m",
      `merchandise_categories[${cat.category_id}]`
    );
    if (share <= 0 || estSales <= 0) {
      throw new Error(`Financial dataset validation failed: category "${cat.category_id}" must have positive sales.`);
    }
    if (!Array.isArray(cat.examples) || cat.examples.length === 0) {
      throw new Error(`Financial dataset validation failed: category "${cat.category_id}" requires non-empty examples.`);
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

  // Geographic segments conservation
  if (!Array.isArray(data.geographic_segments) || data.geographic_segments.length < 3) {
    throw new Error(
      "Financial dataset validation failed: geographic_segments must contain United States, Canada, and Other International."
    );
  }
  let geographicShareSum = 0;
  let totalWarehouseCount = 0;
  const segmentNames = new Set();
  for (const seg of data.geographic_segments) {
    if (typeof seg?.name !== "string" || !seg.name.trim()) {
      throw new Error("Financial dataset validation failed: geographic_segments entry missing name.");
    }
    segmentNames.add(seg.name);
    const share = assertFiniteNumber(seg, "share_of_net_sales_pct", `geographic_segments[${seg.name}]`);
    const warehouses = assertFiniteNumber(seg, "warehouse_count", `geographic_segments[${seg.name}]`);
    if (share <= 0 || !Number.isInteger(warehouses) || warehouses <= 0) {
      throw new Error(
        `Financial dataset validation failed: geographic segment "${seg.name}" requires positive share and integer warehouse_count.`
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
  if (company.fiscal_year === 2024 && totalWarehouseCount !== 890) {
    throw new Error(
      `Geographic segment warehouse count mismatch for FY2024: expected 890 warehouses, received ${totalWarehouseCount}.`
    );
  }

  // Membership metrics validation
  const mm = data.membership_metrics;
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

  // Working capital balance sheet validation
  const wc = data.working_capital_balance_sheet;
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

  // Primary sources validation
  if (!Array.isArray(data.primary_sources) || data.primary_sources.length === 0) {
    throw new Error("Financial dataset validation failed: primary_sources must be a non-empty array.");
  }
  let hasPrimary10KSource = false;
  for (const src of data.primary_sources) {
    for (const field of ["source_id", "title", "filing_type", "cik", "filing_date", "period_end"]) {
      if (typeof src?.[field] !== "string" || !src[field].trim()) {
        throw new Error(`Financial dataset validation failed: primary_sources entry missing "${field}".`);
      }
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

  // Compute exact analytical flywheel ratios
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

  // Enforce structural Gross Margin Ceiling (10.0% <= GM <= 11.5%)
  if (merchandiseGrossMarginPct < 10.0 || merchandiseGrossMarginPct > 11.5) {
    throw new Error(
      `Gross Margin Ceiling invariant breach: merchandiseGrossMarginPct (${merchandiseGrossMarginPct}%) falls outside Costco's structural [10.0%, 11.5%] ceiling.`
    );
  }

  // Enforce structural Operating Income Flywheel (< 2.5% of revenue; > 50% of operating income)
  if (membershipFeeShareOfRevenuePct >= 2.5 || membershipFeeShareOfOperatingIncomePct <= 50.0) {
    throw new Error(
      `Operating Income Flywheel invariant breach: membership fees must represent < 2.5% of revenue (observed ${membershipFeeShareOfRevenuePct}%) and > 50.0% of operating income (observed ${membershipFeeShareOfOperatingIncomePct}%).`
    );
  }

  return {
    totalRevenueCheck: true,
    operatingIncomeCheck: true,
    preTaxAndNetIncomeCheck: true,
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
      merchandiseCategoryCount: data.merchandise_categories.length,
      merchandiseCategoryShareSumPct: roundedCategoryShareSum,
      merchandiseCategoryNetSalesSumUsdM: categorySalesDollarSum,
      geographicSegmentCount: data.geographic_segments.length,
      geographicSegmentShareSumPct: roundedGeoShareSum,
      totalWarehouses: totalWarehouseCount
    }
  };
}

/**
 * Audits wayfinder/map.md and wayfinder/tickets/ticket-001.md..ticket-005.md
 * enforcing required H2 headings, descriptive human-readable ticket links (zero bare IDs),
 * wayfinder:research classification, Status: resolved, and primary-source artifact links.
 */
export function verifyWayfinderArtifacts(rawOptions = {}) {
  const opts =
    typeof rawOptions === "string"
      ? { mapPath: rawOptions }
      : rawOptions && typeof rawOptions === "object" && !Array.isArray(rawOptions)
        ? rawOptions
        : null;
  if (!opts) {
    throw new Error("Wayfinder audit failed: options must be an object or map file path string.");
  }

  const rootDir = opts.rootDir ? path.resolve(opts.rootDir) : DEFAULT_ROOT_DIR;
  const mapPath = opts.mapPath ? path.resolve(opts.mapPath) : path.join(rootDir, "wayfinder", "map.md");
  let ticketsDir;
  if (opts.ticketsDir) {
    ticketsDir = path.resolve(opts.ticketsDir);
  } else if (opts.mapPath) {
    const siblingTicketsDir = path.join(path.dirname(mapPath), "tickets");
    ticketsDir = fs.existsSync(siblingTicketsDir) ? siblingTicketsDir : path.join(rootDir, "wayfinder", "tickets");
  } else {
    ticketsDir = path.join(rootDir, "wayfinder", "tickets");
  }

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
    if (!mapPath || !fs.existsSync(mapPath)) {
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

  // Audit all ticket links across the entire map for bare ticket IDs
  const allMapLinks = extractMarkdownLinks(resolvedMapMarkdown);
  for (const link of allMapLinks) {
    if (/ticket-\d+/i.test(link.href) && isBareTicketLabel(link.label)) {
      throw new Error(
        `Wayfinder "Refer by name" link invariant breach in ${mapLabel}: bare ticket link label "[${link.label}](${link.href})" is prohibited; wrap a descriptive human-readable title.`
      );
    }
  }

  const decisionsSection = extractMarkdownSection(resolvedMapMarkdown, /^##\s+Decisions so far\s*$/m);
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

  // Reject unlinked bare ticket-00N references inside "## Decisions so far"
  const decisionsWithoutLinks = decisionsSection.replace(/\[([^\]]*)\]\(([^)]+)\)/g, "$1");
  if (/\bticket[-_]\d+\b/i.test(decisionsWithoutLinks)) {
    throw new Error(
      `Wayfinder "Refer by name" invariant breach under "## Decisions so far" in ${mapLabel}: bare ticket identifier detected in prose/label.`
    );
  }

  const linkedTicketsByFilename = new Map();
  for (const link of decisionLinks) {
    const normalizedHref = link.href.replace(/^\.\//, "");
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

  // Verify each of ticket-001.md .. ticket-005.md
  if (hasTicketContentsOverride && (!ticketContents || typeof ticketContents !== "object")) {
    throw new Error("Wayfinder audit failed: provided tickets override must be a non-null object.");
  }

  const ticketsVerified = [];
  for (const ticketFilename of EXPECTED_TICKET_FILES) {
    const ticketSlug = ticketFilename.replace(/\.md$/, "");
    const ticketFilePath = ticketsDir ? path.join(ticketsDir, ticketFilename) : `wayfinder/tickets/${ticketFilename}`;
    let ticketMarkdown;

    if (
      hasTicketContentsOverride &&
      (hasOwn(ticketContents, ticketFilename) || hasOwn(ticketContents, ticketSlug))
    ) {
      ticketMarkdown = hasOwn(ticketContents, ticketFilename)
        ? ticketContents[ticketFilename]
        : ticketContents[ticketSlug];
      if (typeof ticketMarkdown !== "string" || !ticketMarkdown.trim()) {
        throw new Error(`Wayfinder audit failed for ${ticketFilePath}: ticket override content is empty or invalid.`);
      }
    } else if (hasTicketContentsOverride && Object.keys(ticketContents).length > 0 && !ticketsDir) {
      throw new Error(`Wayfinder audit failed: missing ticket "${ticketFilename}" in provided tickets override.`);
    } else {
      if (!ticketsDir || !fs.existsSync(ticketFilePath)) {
        throw new Error(`Wayfinder audit failed: required ticket file not found at ${ticketFilePath}.`);
      }
      ticketMarkdown = fs.readFileSync(ticketFilePath, "utf8");
    }

    if (!/wayfinder:research/i.test(ticketMarkdown)) {
      throw new Error(
        `Wayfinder ticket audit failed for ${ticketFilePath}: missing required "wayfinder:research" indicator.`
      );
    }
    if (!/claimed[_\s]+by\s*:/i.test(ticketMarkdown)) {
      throw new Error(`Wayfinder ticket audit failed for ${ticketFilePath}: missing required "Claimed by:" metadata.`);
    }
    if (!/(?:^|\n)[-*>\s]*\*?\*?status\*?\*?\s*:\s*`?resolved`?\s*(?:$|\n)/i.test(ticketMarkdown)) {
      throw new Error(
        `Wayfinder ticket audit failed for ${ticketFilePath}: ticket lacks "Status: resolved".`
      );
    }
    for (const requiredTicketHeading of [
      { label: "## Question", regex: /^##\s+Question\s*$/m },
      { label: "## Blocked By", regex: /^##\s+Blocked By\s*$/m },
      { label: "## Resolution", regex: /^##\s+Resolution\s*$/m }
    ]) {
      if (!requiredTicketHeading.regex.test(ticketMarkdown)) {
        throw new Error(
          `Wayfinder ticket audit failed for ${ticketFilePath}: missing required section "${requiredTicketHeading.label}".`
        );
      }
    }

    const blockedBySection = extractMarkdownSection(ticketMarkdown, /^##\s+Blocked By\s*$/m) ?? "";
    for (const depLink of extractMarkdownLinks(blockedBySection)) {
      if (isBareTicketLabel(depLink.label)) {
        throw new Error(
          `Wayfinder "Refer by name" link invariant breach in ${ticketFilePath} under "## Blocked By": bare link "[${depLink.label}](${depLink.href})".`
        );
      }
    }
    const blockedByWithoutLinks = blockedBySection.replace(/\[([^\]]*)\]\(([^)]+)\)/g, "$1");
    if (/\bticket[-_]\d+\b/i.test(blockedByWithoutLinks)) {
      throw new Error(
        `Wayfinder "Refer by name" invariant breach in ${ticketFilePath} under "## Blocked By": bare ticket ID detected.`
      );
    }

    const resolutionSection = extractMarkdownSection(ticketMarkdown, /^##\s+Resolution\s*$/m) ?? "";
    if (!resolutionSection.includes("research/costco_revenue_architecture.md")) {
      throw new Error(
        `Wayfinder ticket audit failed for ${ticketFilePath}: "## Resolution" must link to research/costco_revenue_architecture.md.`
      );
    }
    if (!resolutionSection.includes("data/costco_revenue_breakdown.json")) {
      throw new Error(
        `Wayfinder ticket audit failed for ${ticketFilePath}: "## Resolution" must link to data/costco_revenue_breakdown.json.`
      );
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
  const opts =
    typeof rawOptions === "string"
      ? { researchPath: rawOptions }
      : rawOptions && typeof rawOptions === "object" && !Array.isArray(rawOptions)
        ? rawOptions
        : null;
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
    if (!researchPath || !fs.existsSync(researchPath)) {
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

function normalizeModelOptions(rawOptions) {
  if (rawOptions === undefined) {
    return {};
  }
  if (typeof rawOptions === "string") {
    return rawOptions.endsWith(".json") ? { dataPath: rawOptions } : { rootDir: rawOptions };
  }
  if (rawOptions === null || typeof rawOptions !== "object" || Array.isArray(rawOptions)) {
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
 * financial dataset, canonical Wayfinder decision map and resolved tickets, and
 * primary-source research monograph with zero external network calls.
 */
export function loadAndVerifyCostcoModel(rawOptions = {}) {
  const startTime = performance.now();
  const options = normalizeModelOptions(rawOptions);

  const rootDir = options.rootDir ? path.resolve(options.rootDir) : DEFAULT_ROOT_DIR;
  const dataPath = options.dataPath
    ? path.resolve(options.dataPath)
    : path.join(rootDir, "data", "costco_revenue_breakdown.json");
  const mapPath = options.mapPath ? path.resolve(options.mapPath) : path.join(rootDir, "wayfinder", "map.md");

  let ticketsDir;
  if (options.ticketsDir) {
    ticketsDir = path.resolve(options.ticketsDir);
  } else if (options.mapPath) {
    const siblingTicketsDir = path.join(path.dirname(mapPath), "tickets");
    ticketsDir = fs.existsSync(siblingTicketsDir) ? siblingTicketsDir : path.join(rootDir, "wayfinder", "tickets");
  } else {
    ticketsDir = path.join(rootDir, "wayfinder", "tickets");
  }

  const researchPath = options.researchPath
    ? path.resolve(options.researchPath)
    : path.join(rootDir, "research", "costco_revenue_architecture.md");

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

  const elapsedMs = round4(performance.now() - startTime);
  const rssMb = round4(process.memoryUsage().rss / (1024 * 1024));

  return {
    status: "VERIFIED",
    mode: options.verifyOnly ? "verify" : "report",
    company: dataset.company,
    ...financialMetrics,
    wayfinderAudit,
    researchAudit,
    telemetry: {
      elapsedMs,
      rssMb,
      externalNetworkRequests: 0
    }
  };
}

function parseCliArgs(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--verify") {
      options.verifyOnly = true;
    } else if (arg === "--root" && argv[i + 1]) {
      options.rootDir = argv[i + 1];
      i += 1;
    } else if (arg === "--data" && argv[i + 1]) {
      options.dataPath = argv[i + 1];
      i += 1;
    } else if (arg === "--map" && argv[i + 1]) {
      options.mapPath = argv[i + 1];
      i += 1;
    } else if (arg === "--tickets" && argv[i + 1]) {
      options.ticketsDir = argv[i + 1];
      i += 1;
    } else if (arg === "--research" && argv[i + 1]) {
      options.researchPath = argv[i + 1];
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
