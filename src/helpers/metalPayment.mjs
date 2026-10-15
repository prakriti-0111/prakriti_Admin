/**
 * Metal payment maths for the Pay Now modal.
 *
 * The fine (24K-equivalent) weight is the anchor that ties the three inputs
 * together, so Amount and Weight can each drive the other without drifting:
 *
 *   gross x purity%    = fine
 *   fine  x pure rate  = amount
 *
 * `maxFine` is the fine metal still owed on the invoice. Clamping here — in
 * the one place both directions pass through — is what stops either input
 * being used to over-pay.
 *
 * Kept dependency-free — webpack bundles this, so nothing node-only may leak
 * in. The check lives next door: `node src/helpers/metalPayment.test.mjs`.
 */
export function metalValuesFromFine(
  fine,
  { purityPct = 100, ratePerGram = 0, maxFine = null } = {},
) {
  const pct = parseFloat(purityPct) || 100;
  const rate = parseFloat(ratePerGram) || 0;
  const wanted = parseFloat(fine) || 0;
  const capped = maxFine !== null && wanted > maxFine ? maxFine : wanted;

  if (!(capped > 0)) return { effective_weight: 0, weight: "", amount: "" };

  // Amount from the ROUNDED gross, as the API prices what it stores
  // (gross x purity rate, purity rate = fine rate x purity%) - so the figure
  // shown is the figure saved, to the paisa.
  const weight = round((capped * 100) / pct, 3);
  return {
    effective_weight: round(capped, 3),
    weight,
    amount: rate > 0 ? round(weight * round((rate * pct) / 100, 2), 2) : "",
  };
}

const round = (n, dp) => parseFloat(n.toFixed(dp));
