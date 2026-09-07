import axios from "axios";

/**
 * How long a fetched rate is considered current, and how often an open page
 * re-reads it. Arriving on a page more than this long after the last read
 * fetches again, so the quote is never staler than one interval.
 */
export const GOLD_RATE_TTL = 5 * 60 * 1000;

let cached = null; // { at, rates }
let inFlight = null; // concurrent callers share one request

/**
 * Live per-karat gold rates.
 *
 * The feed also quotes retailer_per_gram, which already carries the 3% GST.
 * Taking that would tax the customer twice, because the sale adds igst on top
 * of whatever rate it is given - so the ex-GST base_per_gram is the one to use.
 *
 * Resolves to null when the feed is unavailable, and callers keep the stored
 * price in that case rather than showing a zero.
 */
export const fetchLiveGoldRates = ({ force = false } = {}) => {
  if (!force && cached && Date.now() - cached.at < GOLD_RATE_TTL) {
    return Promise.resolve(cached.rates);
  }
  if (inFlight) return inFlight;
  inFlight = axios
    /* Bounded on purpose: this is a third-party feed and the sale page waits on
       it. Without a timeout a hung feed leaves the product table empty with no
       spinner, because the cart request is behind it. Same 5s the API uses. */
    .get(process.env.GOLD_RATE_URL, { timeout: 5000 })
    .then((res) => {
      const perGram =
        (res.data && (res.data.base_per_gram || res.data.per_gram)) || {};
      const rate24 = parseFloat(perGram["24K"]) || 0;
      if (!(rate24 > 0)) return cached ? cached.rates : null;
      const rates = {
        rate24,
        rate22: parseFloat(perGram["22K"]) || 0,
        rate18: parseFloat(perGram["18K"]) || 0,
      };
      cached = { at: Date.now(), rates };
      return rates;
    })
    /* A refresh that fails keeps the last rate we did get. Dropping to the
       stored admin price would jump the quote mid-sale, which is worse than
       holding a rate a few minutes old. */
    .catch(() => (cached ? cached.rates : null))
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
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
