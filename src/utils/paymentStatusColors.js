/**
 * Colours for the payment/wallet status column, in one place.
 *
 * Every screen that lists payments used to carry its own copy of this array,
 * and they had drifted: the wallet screen coloured four statuses, the six
 * invoice screens coloured only two, so a pending payment rendered with no
 * colour at all on a sale or purchase view.
 *
 * The rule is one idea in three colours:
 *   yellow  - still waiting, whichever side is waiting on the other
 *   green   - settled, nothing left to do
 *   red     - refused
 *
 * "Pending" is the receiver's view (their move, so they get Accept/Decline).
 * "Awaiting Approval" and "Sent" are the sender's view of the same transaction
 * - nothing for them to act on, so no buttons, but the money has not landed
 * yet either. Both are therefore yellow, not green.
 */
export const PAYMENT_STATUS_COLORS = [
  { value: "Pending", color: "#e6a700" },
  { value: "Awaiting Approval", color: "#e6a700" },
  { value: "Sent", color: "#e6a700" },
  { value: "Accepted", color: "green" },
  { value: "Processed", color: "green" },
  { value: "Declined", color: "red" },
];

export default PAYMENT_STATUS_COLORS;
