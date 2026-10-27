// Browser-safe booking options shared by the form, server validation and agent tools.

/** Hourly request slots, 10:00 AM through 8:00 PM. */
export const TIME_OPTIONS = Array.from({ length: 11 }, (_, i) => {
  const h = 10 + i;
  return `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? "PM" : "AM"}`;
}) as [string, ...string[]];

/** Earliest bookable date (YYYY-MM-DD): tomorrow, in UTC. */
export function earliestBookingDate(now: Date = new Date()): string {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return d.toISOString().slice(0, 10);
}

export const DEPOSIT_STATUS_LABELS: Record<string, string> = {
  not_required: "No deposit",
  awaiting_payment: "Deposit not paid yet",
  paid: "Deposit paid",
  refunded: "Deposit refunded",
  failed: "Deposit failed",
};
