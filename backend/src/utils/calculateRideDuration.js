/** @format */

export function calculateRideDurationHours(fromPincode, toPincode) {
  const from = Math.abs(parseInt(fromPincode, 10));
  const to = Math.abs(parseInt(toPincode, 10));
  const diff = Math.abs(to - from);
  return diff % 24; // hours within a day
}
