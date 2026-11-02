# costco // 1999 — Dreamcore Revenue Architecture (`NASDAQ: COST`, `CIK: 0000909832`)

An interactive **Dreamcore** static HTML experience (`index.html`), primary-source SEC Form 10-K research monograph, `/wayfinder` decision map, structured GAAP financial dataset, and zero-network verification CLI explaining how **Costco Wholesale Corporation** generates `$254,453M` in consolidated revenue and converts high-velocity warehouse volume (`{Net Sales}` of `$249,625M`) plus recurring club subscriptions (`{Membership Fees}` of `$4,828M`) into `$9,285M` of operating income and `$7,367M` of net income.

## Repository Contents

1. **Interactive Dreamcore Static Page (`index.html`)**:
   - **Five Interactive Revenue Strata** (`1`–`5` keys or `wayfinder.idx`, corresponding to the 5 resolved Wayfinder tickets):
     - `01 // two-pillar engine ($254,453M)` — `98.10%` `{Net Sales}` (`$249,625M`) + `1.90%` `{Membership Fees}` (`$4,828M`), `ASC 606` point-of-sale vs. shipment recognition, `$2,501M` deferred fee liability, and `$2,804M` Executive 2% reward contra-revenue.
     - `02 // <4,000 SKUs & kirkland` — Note 11 category disaggregation (`40.65%` Foods & Sundries, `25.63%` Non-Foods, `20.02%` Warehouse Ancillary, `13.71%` Fresh Foods), `<4,000` warehouse SKUs (`>$62M/SKU`), and `890` clubs worldwide.
     - `03 // 92.9% renewal & executive halo` — `76.2M` paid members (`136.8M` cardholders), `35.4M` Executive paid members (`46.5%` of paid base driving `73.3%` of worldwide sales), `92.9%` U.S./Canada & `90.5%` global renewal rates, and the Sept 1, 2024 fee increase (`$60→$65` / `$120→$130`, `+$370M` 2-year lift).
     - `04 // 719 gas pumps & digital drift` — `$49,969M` Warehouse Ancillary traffic magnets (`719` gas stations = `~12%` of net sales, pharmacy, optical, food court), e-commerce (`~7%` of sales, `+16%` comp growth), Costco Logistics, Costco Next, Costco Travel, and Citibank Visa royalties.
     - `05 // 10.92% ceiling & 104.15% float` — The `10.92%` `{Gross Margin Ceiling}` (`$27,267M` margin vs. `9.14%` / `$22,810M` SG&A), the `{Operating Income Flywheel}` (`$4,828M` fees = `52.00%` of `$9,285M` operating income), and negative working-capital inventory funding (`$19,421M` AP / `$18,647M` Inventory = `104.15%`, `12.60x` turn).
   - **Interactive GAAP Waterfall & Flywheel Sensitivity Rig (`costco_flywheel_model.exe`)**: Toggle FY2022, FY2023, and FY2024 income statements and test live sliders for Merchandise Gross Margin %, SG&A %, and Membership Fee Lift.
   - **Dreamcore Atmospheric Engine**: Six-winged Seraphic Watcher SVG eye with cursor tracking & halation blink, 60 FPS procedural sky/horizon grid & soap-orb canvas, pre-baked `128×128` 35mm film grain, VHS scanlines, draggable 1999 pearl-bevel windows, and a `0.18 Hz` tape-warbled Web Audio synth pad.
2. **Wayfinder Map & Resolved Decision Tickets (`wayfinder/`)**:
   - [`wayfinder/map.md`](./wayfinder/map.md) and [`ticket-001.md`](./wayfinder/tickets/ticket-001.md) through [`ticket-005.md`](./wayfinder/tickets/ticket-005.md).
3. **Primary-Source SEC Form 10-K Monograph (`research/`)**:
   - [`research/costco_revenue_architecture.md`](./research/costco_revenue_architecture.md) (`40KB` primary-source monograph citing SEC EDGAR `CIK: 0000909832`, Accession `0000909832-24-000049`).
4. **Structured Financial Dataset & Verification CLI (`data/` & `src/`)**:
   - [`data/costco_revenue_breakdown.json`](./data/costco_revenue_breakdown.json) and [`src/costco_revenue_model.mjs`](./src/costco_revenue_model.mjs).
5. **Sandcastle Run Archive (`sandcastle_run_20261101T233014-881-kg7i/`)**:
   - Complete archive of all artifacts, SEC EDGAR XBRL/HTML extracts, handoff manifests, blackboard ledger, and stage logs from Sandcastle run `20261101T233014-881-kg7i`.

## Running Locally

```sh
# Verify GAAP identities, Wayfinder links, and SEC Form 10-K citations (<5ms, 0 network calls)
npm run verify

# Serve the static Dreamcore webpage locally
python3 -m http.server 8088
```
