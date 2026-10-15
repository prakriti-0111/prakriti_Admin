import axios from "actions/axios";

/**
 * How often an open page re-reads the rate. The API holds the feed for 10
 * minutes; this short cache only stops one screen asking several times at once.
 */
export const GOLD_RATE_TTL = 60 * 1000;

let cached = null; // { at, rates }
let inFlight = null; // concurrent callers share one request

/**
 * Today's per-karat gold rates (ex-GST), read from the API - the same cached
 * rate it prices invoices and metal payments with. The screens used to fetch
 * the third-party feed themselves, each at its own moment, so the Pay modal
 * and the invoice it settled quoted different rates.
 *
 * Resolves to { rate24, rate22, rate18, display }, or null when unavailable
 * (callers keep the stored price rather than showing a zero).
 */
export const fetchLiveGoldRates = ({ force = false } = {}) => {
  if (!force && cached && Date.now() - cached.at < GOLD_RATE_TTL) {
    return Promise.resolve(cached.rates);
  }
  if (inFlight) return inFlight;
  inFlight = axios
    .get("/superadmin/gold-rate", { timeout: 8000 })
    .then((res) => {
      const d = res.data && res.data.success ? res.data.data : null;
      const rate24 = d ? parseFloat(d.rate24) || 0 : 0;
      if (!(rate24 > 0)) return cached ? cached.rates : null;
      const rates = {
        rate24,
        rate22: parseFloat(d.rate22) || 0,
        rate18: parseFloat(d.rate18) || 0,
        display: d.display || "",
      };
      cached = { at: Date.now(), rates };
      return rates;
    })
    /* a failed refresh keeps the last rate rather than jumping the quote */
    .catch(() => (cached ? cached.rates : null))
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
};

/**
 * Per-gram rate a purity is billed at, by its purity % - the API's
 * liveRateForPurity bands (>=95 is 24K, >=85 22K, else 18K). Metal paid in is
 * valued at exactly this rate on its gross weight, the way the invoice bills it.
 */
export const purityRatePerGram = (purityValue, rates) => {
  const pct = parseFloat(purityValue) || 0;
  if (!rates || !(pct > 0)) return 0;
  if (pct >= 95) return rates.rate24;
  if (pct >= 85) return rates.rate22;
  return rates.rate18;
};

/**
 * The same value per FINE gram (gross x purity% = fine), for screens that work
 * in fine weight: fine x this = gross x purity rate. Mirrors the API's
 * metalPaymentQuote, which decides the amount actually saved.
 */
export const fineRatePerGram = (purityValue, rates) => {
  const pct = parseFloat(purityValue) || 0;
  const rate = purityRatePerGram(pct, rates);
  return rate > 0 ? (rate * 100) / pct : 0;
};

export const isGoldMaterial = (name) => /gold/i.test(name || "");

/**
 * The feed quotes one rate per karat, so a purity picks a karat band - it does
 * not scale the 24K rate. Those are not the same thing: 18 Carat is stored at
 * 76% here, but the feed derives its 18K figure as 24K x 18/24, so scaling by
 * 76% would quote above the feed's own 18K price.
 *
 * Bands match liveRateForPurity in the API's invoice pricing, so the sale page
 * and the invoice it produces cannot quote different rates.
 *
 * Accepts the purity name the cart sends ("18 Carat", "22 carat") or a karat
 * number; returns 0 when there is no live rate to apply.
 */
export const liveRateForPurity = (purity, rates) => {
  if (!rates) return 0;
  const found = String(purity).match(/\d+(\.\d+)?/);
  const karat = found ? parseFloat(found[0]) : 0;
  if (!(karat > 0)) return 0;
  if (karat >= 23) return rates.rate24;
  if (karat >= 20) return rates.rate22;
  return rates.rate18;
};

/**
 * The list rate that charges `live` once the sale's discount is taken off.
 *
 * per_gram_price is a LIST price, not what the customer pays: the stored rows
 * hold mrp x increase% = price (20909.09 x 55% = 11500), and the discount on
 * the sale line brings the list price back down to it. The feed quotes the
 * charged metal price, so writing it into per_gram_price unchanged would put a
 * charged price where a list price belongs and the discount would halve it -
 * 11292.75 would be sold at 6211/g. Grossing up by the same increase keeps the
 * arithmetic whole: 11292.75 / 55% = 20532.27, and 20532.27 x 55% = 11292.75.
 */
export const increasedRate = (live, increasePercent) => {
  const increase = parseFloat(increasePercent);
  if (!(live > 0)) return 0;
  /* no usable increase means no way to tell list from charged - leave the
     stored price alone rather than quote off the wrong basis */
  if (!(increase > 0 && increase <= 100)) return 0;
  return Math.round((live / (increase / 100)) * 100) / 100;
};

/**
 * Overwrites a cart material's per-gram list price with the live rate for its
 * purity, grossed up by that material's increase. Non-gold materials, an
 * unavailable feed and a missing increase are all left untouched.
 * org_* carries the same value: the discount controls reset back to it, and
 * resetting to the stored price would silently undo the live rate.
 */
export const applyLiveGoldRate = (material, rates, increasePercent) => {
  if (!rates || !isGoldMaterial(material.material_name)) return material;
  const live = liveRateForPurity(material.purity, rates);
  const rate = increasedRate(live, increasePercent);
  if (!(rate > 0)) return material;
  /* unchanged rate, unchanged object - lets a caller tell whether a refresh
     actually moved anything before it recalculates the whole form */
  if (parseFloat(material.per_gram_price) === rate) return material;
  return {
    ...material,
    rate,
    per_gram_price: rate,
    org_rate: rate,
    org_per_gram_price: rate,
  };
};

/**
 * Fine (24K) gold an invoice can be paid with, as the super admin's Pay Now
 * shows it: the billed gold's pakka weight (or weight x purity), less metal
 * already paid - pending payments included, so it cannot be paid twice;
 * declined ones not. Returns null when the invoice bills no gold.
 */
export const invoiceFineMetal = (products, payments, purityItems) => {
  const purityPct = {};
  (purityItems || []).forEach((p) => {
    if (p.name && p.value) purityPct[p.name.trim()] = parseFloat(p.value);
  });
  const pctOf = (name) => {
    const key = (name || "").trim();
    if (purityPct[key]) return purityPct[key];
    const pct = key.match(/\((\d+\.?\d*)%\)/);
    if (pct) return parseFloat(pct[1]);
    const carat = key.match(/(\d+\.?\d*)\s*(?:carat|k)\b/i);
    return carat ? (parseFloat(carat[1]) / 24) * 100 : 0;
  };
  let total = 0;
  (products || []).filter((p) => !p.is_return).forEach((product) => {
    (product.materials || []).forEach((m) => {
      if (!isGoldMaterial(m.material_name)) return;
      const pakka = parseFloat(m.pakka_weight) || 0;
      total += pakka > 0 ? pakka : ((parseFloat(m.weight) || 0) * pctOf(m.purity_name)) / 100;
    });
  });
  if (!(total > 0)) return null;
  const paid = (payments || [])
    .filter((row) => !/declin|fail|reject/i.test(String(row.action_value || "")))
    .reduce((sum, row) => sum + (parseFloat(row.weight) || 0), 0);
  return { total, paid, remaining: Math.max(total - paid, 0) };
};
