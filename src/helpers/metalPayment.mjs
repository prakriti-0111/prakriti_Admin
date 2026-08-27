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

  return {
    effective_weight: round(capped, 3),
    weight: round((capped * 100) / pct, 3),
    amount: rate > 0 ? round(capped * rate, 2) : "",
  };
}

/**
 * The purity the live gold feed is already quoted at. The feed returns
 * per_gram["24K"], and 24 Carat in the purity master is 99.50 — not 100 — so
 * that price is a converted price already. Scaling it by 99.50% again would
 * discount 24K metal against its own rate.
 *
 * Falls back to 100 only when there is no purity master to read.
 */
export function referencePurityPct(purityItems) {
  const values = (purityItems || [])
    .map((p) => parseFloat(p?.value))
    .filter((v) => v > 0);
  return values.length ? Math.max(...values) : 100;
}

/**
 * Per-gram rate for notionally 100% pure metal, backed out of the quoted rate.
 * Everything else divides purity against 100, so this is the one place the
 * feed's own purity is undone.
 */
export function purePerGramRate(quotedPerGram, purityItems) {
  const quoted = parseFloat(quotedPerGram) || 0;
  if (!(quoted > 0)) return 0;
  return (quoted * 100) / referencePurityPct(purityItems);
}

const round = (n, dp) => parseFloat(n.toFixed(dp));
