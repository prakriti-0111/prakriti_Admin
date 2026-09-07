/**
 * The sale/create page quotes gold at the live rate and shows that rate above
 * the table. Three things are easy to get wrong, and each changes what the
 * customer pays or what the operator is told:
 *
 *  - the feed publishes one rate per karat, so a purity picks a band; scaling
 *    the 24K rate by the stored purity % (18 Carat is 76% here) quotes ABOVE
 *    the feed's own 18K figure, which is 24K x 18/24;
 *  - the feed's retailer figures include 3% GST, and the sale adds igst on
 *    top, so the ex-GST base is the one to price from;
 *  - a failed read must not silently drop to the stored admin price.
 *
 *   node test_gold_rate_helper.js
 */
const assert = require("assert");
const path = require("path");
const babel = require("@babel/core");
const Module = require("module");

let calls = 0;
let respond = () => ({
  data: {
    base_per_gram: { "24K": 15057, "22K": 13802.25, "18K": 11292.75 },
    retailer_per_gram: { "24K": 15508.71 },
    display: "Retailer (incl. 3% GST) · 24K ₹15,509/g",
  },
});
const file = path.join(__dirname, "src/helpers/goldRate.js");
const axiosPath = require.resolve("axios", { paths: [path.dirname(file)] });
require.cache[axiosPath] = {
  id: axiosPath, filename: axiosPath, loaded: true,
  exports: { get: async () => { calls += 1; return respond(); } },
};

const { code } = babel.transformFileSync(file, {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
  babelrc: false, configFile: false,
});
const mod = new Module(file);
mod.filename = file;
mod.paths = Module._nodeModulePaths(path.dirname(file));
mod._compile(code, file);
const { liveRateForPurity, isGoldMaterial, applyLiveGoldRate, fetchLiveGoldRates } = mod.exports;

const RATES = { rate24: 15057, rate22: 13802.25, rate18: 11292.75 };

// ── karat bands, from the purity names the cart actually sends ──
assert.strictEqual(liveRateForPurity("24 Carat", RATES), 15057, "24 Carat -> 24K");
assert.strictEqual(liveRateForPurity("22 carat", RATES), 13802.25, "22 carat -> 22K, case insensitive");
assert.strictEqual(liveRateForPurity("18 Carat", RATES), 11292.75, "18 Carat -> 18K");
assert.notStrictEqual(
  liveRateForPurity("18 Carat", RATES),
  parseFloat((15057 * 0.76).toFixed(2)),
  "18 Carat must take the feed's 18K rate, not 76% of the 24K rate"
);
assert.strictEqual(liveRateForPurity("18 Carat", null), 0, "no rates -> no live rate");
assert.strictEqual(liveRateForPurity("", RATES), 0, "no purity -> no live rate");

// ── only gold is repriced ──
assert.ok(isGoldMaterial("Gold yellow"));
assert.ok(!isGoldMaterial("10-Diamond"), "diamond is not gold");

const gold = { material_name: "Gold yellow", purity: "18 Carat", per_gram_price: 20909.09, rate: 20909.09 };
const applied = applyLiveGoldRate(gold, RATES);
assert.strictEqual(applied.per_gram_price, 11292.75, "gold takes the live rate");
assert.strictEqual(applied.rate, 11292.75, "the displayed rate follows");
assert.strictEqual(applied.org_per_gram_price, 11292.75,
  "org_* must carry the live rate too - the discount reset restores org, and a stored value there would silently undo it");

const diamond = { material_name: "10-Diamond", purity: "SI", per_gram_price: 345455, rate: 690.91 };
assert.deepStrictEqual(applyLiveGoldRate(diamond, RATES), diamond, "a non-gold material is untouched");
assert.deepStrictEqual(applyLiveGoldRate(gold, null), gold, "feed down -> stored price kept");

(async () => {
  const first = await fetchLiveGoldRates({ force: true });
  assert.strictEqual(calls, 1, "opening the page reads the feed");
  assert.strictEqual(first.rate18, 11292.75,
    "the ex-GST base rate is the one used - retailer_per_gram already carries 3% GST and the sale adds igst on top");

  // a failed read holds the last good rate rather than dropping to stored
  respond = () => { throw new Error("feed down"); };
  const afterFailure = await fetchLiveGoldRates({ force: true });
  assert.strictEqual(afterFailure.rate18, 11292.75,
    "a failed read keeps the last live rate, not the stored admin price");

  console.log("ok - karat bands, gold-only, org_* reset, ex-GST basis and failure fallback all hold");
})().catch((e) => { console.error("FAILED:", e.message); process.exit(1); });
