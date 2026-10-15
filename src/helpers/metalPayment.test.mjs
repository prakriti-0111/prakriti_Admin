/* Check for the Pay Now modal's metal maths: node src/helpers/metalPayment.test.mjs
   Lives outside metalPayment.mjs so webpack never sees the node: imports. */
import { strict as assert } from "node:assert";
import { metalValuesFromFine } from "./metalPayment.mjs";

// Metal is valued as the invoice bills gold: gross x the purity's own live
// karat rate. Screens pass the rate per FINE gram (purity rate / purity%), so
// 10g gross of any purity must settle at exactly 10 x its purity rate.
const rate24 = 14750.1; // 24 Carat (99.50) billed at the 24K rate
const rate18 = 11062.58; // 18 Carat (76) billed at the 18K rate

const paid24K = metalValuesFromFine((10 * 99.5) / 100, {
  purityPct: 99.5,
  ratePerGram: (rate24 * 100) / 99.5,
});
assert.equal(paid24K.weight, 10);
assert.equal(paid24K.amount, round2(10 * rate24)); // 147501, as billed

const paid18K = metalValuesFromFine((10 * 76) / 100, {
  purityPct: 76,
  ratePerGram: (rate18 * 100) / 76,
});
assert.equal(paid18K.weight, 10);
assert.equal(paid18K.amount, round2(10 * rate18)); // 110625.8, as billed

// The amount comes from the rounded gross the API stores and prices, so a
// fine weight whose gross needs rounding still shows the saved figure.
const odd = metalValuesFromFine(1.233, { purityPct: 99.9, ratePerGram: (rate24 * 100) / 99.9 });
assert.equal(odd.weight, 1.234);
assert.equal(odd.amount, round2(1.234 * rate24));

function round2(n) {
  return parseFloat(n.toFixed(2));
}

const opts = { purityPct: 76, ratePerGram: 10000, maxFine: 7.6 };

// 10g gross of 76% purity settles 7.6g fine, worth 7.6 x 10000.
assert.deepEqual(metalValuesFromFine((10 * 76) / 100, opts), {
  effective_weight: 7.6,
  weight: 10,
  amount: 76000,
});

// Amount typed back in must land on the same gross weight — the round trip is
// the whole point of routing both inputs through one function.
assert.equal(metalValuesFromFine(76000 / 10000, opts).weight, 10);

// Neither direction may exceed the fine metal still owed on the invoice.
assert.deepEqual(metalValuesFromFine(999, opts), {
  effective_weight: 7.6,
  weight: 10,
  amount: 76000,
});
assert.equal(metalValuesFromFine(999999 / 10000, opts).amount, 76000);

// Cleared / nonsense input empties the partner fields instead of showing NaN.
assert.deepEqual(metalValuesFromFine("", opts), {
  effective_weight: 0,
  weight: "",
  amount: "",
});
assert.equal(metalValuesFromFine(-5, opts).amount, "");

// No live rate yet: weights still work, amount stays blank.
assert.deepEqual(metalValuesFromFine(7.6, { purityPct: 76 }), {
  effective_weight: 7.6,
  weight: 10,
  amount: "",
});

console.log("metalPayment check OK");
