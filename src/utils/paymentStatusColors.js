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
 * WHY CHIPS AND NOT COLOURED TEXT
 * Yellow text cannot be both yellow and readable on a white row. Measured
 * against white, every shade that still reads as yellow fails WCAG AA:
 * #ffd54f is 1.6:1, the old #ff9800 is 2.2:1, and you have to go all the way
 * to #946a00 (4.9:1) to pass - by which point it looks olive, not yellow.
 * Dark text on a yellow fill sidesteps the problem entirely at 9.3:1, better
 * than the plain green (5.1:1) and red (4.0:1) already in use, so all three
 * states render as chips for consistency.
 *
 * "Pending" is the receiver's view (their move, so they get Accept/Decline).
 * "Awaiting Approval" and "Sent" are the sender's view of the same transaction
 * - nothing for them to act on, so no buttons, but the money has not landed
 * yet either. Both are therefore yellow, not green.
 */

const CHIP = {
  display: "inline-block",
  padding: "2px 10px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: 600,
  lineHeight: "18px",
  whiteSpace: "nowrap",
};

/** Waiting on someone - 9.27:1 on its own fill. */
export const WAITING_CHIP = {
  ...CHIP,
  color: "#3d2f00",
  backgroundColor: "#ffd54f",
};

/** Settled. */
export const SETTLED_CHIP = {
  ...CHIP,
  color: "#0f3d17",
  backgroundColor: "#a5d6a7",
};

/** Refused. */
export const REFUSED_CHIP = {
  ...CHIP,
  color: "#4d1010",
  backgroundColor: "#ef9a9a",
};

export const PAYMENT_STATUS_COLORS = [
  { value: "Pending", color: "#3d2f00", style: WAITING_CHIP },
  { value: "Awaiting Approval", color: "#3d2f00", style: WAITING_CHIP },
  { value: "Sent", color: "#3d2f00", style: WAITING_CHIP },
  { value: "Accepted", color: "#0f3d17", style: SETTLED_CHIP },
  { value: "Processed", color: "#0f3d17", style: SETTLED_CHIP },
  { value: "Declined", color: "#4d1010", style: REFUSED_CHIP },
];

export default PAYMENT_STATUS_COLORS;
