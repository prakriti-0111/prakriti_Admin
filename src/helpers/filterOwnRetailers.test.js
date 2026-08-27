/**
 * Smallest check that fails if the downline scoping breaks. Run with:
 *   node src/helpers/filterOwnRetailers.test.js
 * Mirrors helper.js filterOwnRetailers, minus the secureLocalStorage lookup.
 */
const assert = require("assert");

const isEmpty = (value) =>
  value == null ||
  (value.hasOwnProperty("length") && value.length === 0) ||
  (value.constructor === Object && Object.keys(value).length === 0);

const filterOwnRetailers = (retailers, downline, loggedInId) => {
  let ids = [loggedInId]
    .concat((downline || []).map((user) => user.id))
    .filter((id) => !isEmpty(id))
    .map(String);

  return (retailers || []).filter(
    (retailer) =>
      isEmpty(retailer.created_by) ||
      ids.indexOf(String(retailer.created_by)) !== -1,
  );
};

/* admin 10 owns distributor 20 and sales executive 30; distributor 99 is
   another admin's and its retailers must not leak into the picker */
const downline = [{ id: 20 }, { id: 30 }];
const retailers = [
  { id: 1, company_name: "mine", created_by: 10 },
  { id: 2, company_name: "my distributor's", created_by: "20" },
  { id: 3, company_name: "my se's", created_by: 30 },
  { id: 4, company_name: "other distributor's", created_by: 99 },
];

assert.deepStrictEqual(
  filterOwnRetailers(retailers, downline, 10).map((r) => r.id),
  [1, 2, 3],
  "other distributor's retailer leaked in",
);

/* the API is the only thing that can scope a payload with no created_by, so
   those pass through untouched instead of silently vanishing */
assert.deepStrictEqual(
  filterOwnRetailers([{ id: 5 }, { id: 6, created_by: 99 }], downline, 10).map(
    (r) => r.id,
  ),
  [5],
);

assert.deepStrictEqual(filterOwnRetailers(null, downline, 10), []);
assert.deepStrictEqual(
  filterOwnRetailers(retailers, [], 10).map((r) => r.id),
  [1],
);

console.log("filterOwnRetailers ok");
