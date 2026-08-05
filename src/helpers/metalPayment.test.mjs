/* Check for the Pay Now modal's metal maths: node src/helpers/metalPayment.test.mjs
   Lives outside metalPayment.mjs so webpack never sees the node: imports. */
import { strict as assert } from "node:assert";
import {
  metalValuesFromFine,
  purePerGramRate,
  referencePurityPct,
} from "./metalPayment.mjs";

// The live feed quotes 24K, which the purity master calls 99.50 — so 24 Carat
// metal must settle at the quoted rate exactly, never 99.50% of it.
const purityItems = [
  { id: 1, name: "24 Carat", value: "99.50" },
  { id: 2, name: "22 Carat", value: "91.60" },
  { id: 3, name: "18 Carat", value: "76" },
];
const spot = 14422;

assert.equal(referencePurityPct(purityItems), 99.5);
assert.equal(referencePurityPct([]), 100);

const pureRate = purePerGramRate(spot, purityItems);
const paid24K = metalValuesFromFine((10 * 99.5) / 100, {
  purityPct: 99.5,
  ratePerGram: pureRate,
});
assert.equal(paid24K.weight, 10);
assert.equal(paid24K.amount, round2(10 * spot)); // 144220, not 143498.90

// 18 Carat still prices off the same pure rate, pro rata to its purity.
const paid18K = metalValuesFromFine((10 * 76) / 100, {
  purityPct: 76,
  ratePerGram: pureRate,
});
assert.equal(paid18K.weight, 10);
// 10g at 76% is 7.638g of 24 Carat metal, priced at the quoted 24K rate.
assert.equal(paid18K.amount, round2(((10 * 76) / 99.5) * spot));

assert.equal(purePerGramRate(0, purityItems), 0);

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
