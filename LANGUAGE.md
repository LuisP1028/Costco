---
name: system-glossary-evaluation-parameters
hostname: local-workspace
description: A comprehensive glossary defining the strict evaluation parameters and Costco revenue domain terminology used for assessing code errors, correctness, functionality, and documentation sufficiency within the Costco repository.
---

# Evaluation Parameters

## {errors}
- Explicit failure states or structural invariant breaches surfaced during the planning, execution, or verification of a component.
- **Qualifiers:** Stack traces, syntax errors, unhandled exceptions, compilation failures, non-zero exit codes, fatal timeouts, severe warnings that halt execution, silent exception suppression or arbitrary default fallbacks (`RULE[user_global]`), disconnected dead-code helpers, unverified secondary-source claims lacking primary-source SEC/investor citations, or unfulfilled specification requirements.

## {correctness}
- The precise execution and contract fidelity of a component within its operational context, verifying that it performs its designated task without logical, mathematical, or state-transition flaws and without silent fallbacks, even if no explicit `{errors}` are thrown.
- **Qualifiers:** The code and research deliverables process data properly, financial math and GAAP accounting identities ($R_{\text{total}} = R_{\text{net\_sales}} + R_{\text{membership\_fees}}$, gross margin vs. operating income contribution) are accurate, loops and state transitions terminate deterministically, schemas/types and Wayfinder map/ticket structures are respected across upstream and downstream callers, and root causes are addressed directly rather than masked.

## {functionality}
- The broader, global objective or business logic the component is meant to achieve within the larger integrated system under real-world runtime conditions.
- **Qualifiers:** Does the outcome genuinely solve the user's problem end-to-end across the live system call graph and repository deliverables? Does it integrate seamlessly with surrounding subsystems (`/wayfinder` decision maps, `/research` primary-source monographs, and programmatic verification/modeling artifacts) and operate reliably within real-world physical, scale, and operational constraints rather than only passing synthetic checks on paper?

## {correct required outputs}
- The exact, literal expected state and observable system behavior after a component executes successfully in its real runtime context. This must be objectively measurable.
- **Qualifiers:** Specific terminal log messages, exact return values (e.g., true, null), precise file or persistence state changes (e.g., canonical `wayfinder/map.md`, resolved `wayfinder/tickets/ticket-NNN.md` files, primary-source cited research reports under `research/`, and verified financial data models), verified live telemetry metrics, or specific API response codes (e.g., 200 OK).

## {sufficient}
- The state of documentation, planning, or verification where zero ambiguity remains, architectural root causes and surrounding system dependencies are accounted for, physical and runtime feasibility is empirically grounded, and the coding assistant can implement and verify the end-to-end `{functionality}` without guessing, inventing workarounds, or relying on synthetic mocks.
- **Qualifiers:** All necessary file structures, live caller wiring, Wayfinder ticket topologies, and primary-source verification rules are provided; dependencies and operational budgets are empirically verified; step-by-step logic and edge cases are clearly outlined; and the `{correct required outputs}` are established.

## {insufficient}
- The state of documentation, planning, or verification where critical context is missing, ambiguous, physically unfeasible, or restricted to superficial symptoms, requiring the assistant to make assumptions, ignore surrounding systemic obstacles, or rely on narrow stubs.
- **Qualifiers:** Missing file schemas, undefined variables, vague instructions, unverified financial/latency assumptions, omitted live caller integration, reliance on uncited secondary blog write-ups instead of primary SEC Form 10-K / Annual Report disclosures, missing error-handling parameters, or lack of context regarding how a component interacts with the broader codebase.

---

# Domain Vocabulary: Costco Wholesale Corporation (`COST`) Revenue Architecture

## {Net Sales}
- Revenue recognized from merchandise sales across Costco's warehouse club operations and e-commerce channels, net of sales taxes and member returns/allowances, including core merchandise categories (Foods & Sundries, Non-Foods, Fresh Foods), Warehouse Ancillary businesses (Gasoline, Pharmacy, Optical, Food Court, Hearing Aid, Tire Installation), and E-Commerce / Costco Logistics.

## {Membership Fees}
- Recurring annual fee revenue collected from Gold Star, Business, and Executive (2% reward tier) members, recognized ratably over the 12-month membership period under ASC 606 (with deferred membership fees recorded as a current liability on the balance sheet until earned).

## {Gross Margin Ceiling}
- Costco's disciplined pricing policy that caps merchandise markups (~10%–11% gross margin on `{Net Sales}`), passing supplier scale and Kirkland Signature private-label efficiencies directly to members to maximize renewal rates (~90%+ global, ~92.5%+ US/Canada) and volume velocity.

## {Operating Income Flywheel}
- The structural economic relationship wherein low-margin, high-velocity `{Net Sales}` cover warehouse operating & SG&A expenses (reinforced by negative working-capital inventory turnover where accounts payable fund merchandise inventory), enabling high-margin `{Membership Fees}` to represent the majority share of consolidated operating income and net income.
