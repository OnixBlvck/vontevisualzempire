// Square deposit checkout. Server-only: reads Square credentials from process.env.

const SQUARE_VERSION = "2025-01-23";

function squareConfig() {
  const token = process.env["SQUARE_ACCESS_TOKEN"];
  const locationId = process.env["SQUARE_LOCATION_ID"];
  const baseUrl =
    process.env["SQUARE_ENVIRONMENT"] === "production"
      ? "https://connect.squareup.com"
      : "https://connect.squareupsandbox.com";
  if (!token || !locationId) throw new Error("Square is not configured.");
  return { token, locationId, baseUrl };
}

async function squareFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { token, baseUrl } = squareConfig();
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Square-Version": SQUARE_VERSION,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const body = await response.text();
  if (!response.ok) {
    console.error(`Square request failed [${response.status}]: ${body}`);
    throw new Error(`Square request failed (${response.status}).`);
  }
  return JSON.parse(body) as T;
}

export async function createDepositCheckout(input: {
  bookingId: string;
  amountCents: number;
  buyerEmail: string;
  redirectUrl: string;
}): Promise<{ paymentLinkId: string; orderId: string; url: string }> {
  const { locationId } = squareConfig();
  const result = await squareFetch<{
    payment_link?: { id: string; url: string; order_id: string };
  }>("/v2/online-checkout/payment-links", {
    method: "POST",
    body: JSON.stringify({
      idempotency_key: `deposit-${input.bookingId}`,
      quick_pay: {
        name: "InkNior tattoo deposit",
        price_money: { amount: input.amountCents, currency: "USD" },
        location_id: locationId,
      },
      payment_note: `Booking request ${input.bookingId}`,
      checkout_options: { redirect_url: input.redirectUrl },
      pre_populated_data: { buyer_email: input.buyerEmail },
    }),
  });
  const link = result.payment_link;
  if (!link?.url || !link.order_id) throw new Error("Square did not return a checkout link.");
  return { paymentLinkId: link.id, orderId: link.order_id, url: link.url };
}

/** True once the deposit order has been fully paid. */
export async function isDepositOrderPaid(orderId: string): Promise<boolean> {
  const result = await squareFetch<{
    order?: {
      state?: string;
      tenders?: unknown[];
      net_amount_due_money?: { amount?: number };
    };
  }>(`/v2/orders/${encodeURIComponent(orderId)}`);
  const order = result.order;
  if (!order) return false;
  if (order.state === "COMPLETED") return true;
  return (order.tenders?.length ?? 0) > 0 && order.net_amount_due_money?.amount === 0;
}
