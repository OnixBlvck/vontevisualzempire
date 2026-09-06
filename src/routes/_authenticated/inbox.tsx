import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMyBookingRequests } from "@/lib/bookings.functions";
import { supabase } from "@/integrations/supabase/client";

const BRANDS: Record<string, string> = {
  inknior: "InkNior — Tattoo",
  onyxblvck: "Onyx Blvck — Music",
  fastcutedits: "FastCutEdits — Design",
};

export const Route = createFileRoute("/_authenticated/inbox")({
  head: () => ({
    meta: [
      { title: "Booking Inbox | VonteVisualz" },
      {
        name: "description",
        content:
          "Review the booking requests you sent to InkNior, Onyx Blvck and FastCutEdits, with their current status.",
      },
      { property: "og:title", content: "Booking Inbox | VonteVisualz" },
      {
        property: "og:description",
        content: "Track your VonteVisualz booking requests and their status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inbox,
});

function Inbox() {
  const fetchRequests = useServerFn(listMyBookingRequests);
  const { data, isPending, error } = useQuery({
    queryKey: ["booking-requests"],
    queryFn: () => fetchRequests(),
  });

  return (
    <main className="mx-auto max-w-[1000px] px-4 py-14 lg:px-8">
      <p className="label-xs text-royal">Empire Access</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="metal-text text-3xl">Booking Inbox</h1>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground">
            ← Back to site
          </Link>
          <button
            type="button"
            onClick={() => {
              void supabase.auth.signOut().then(() => {
                window.location.href = "/";
              });
            }}
            className="text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </div>

      {isPending && <p className="mt-8 text-xs text-muted-foreground">Loading your requests…</p>}
      {error && (
        <p role="alert" className="mt-8 text-xs text-destructive">
          Could not load your requests: {error.message}
        </p>
      )}
      {data && data.length === 0 && (
        <p className="mt-8 text-xs text-muted-foreground">
          No requests yet. Send one from the contact section on the homepage.
        </p>
      )}

      <div className="mt-8 grid gap-4">
        {data?.map((r) => (
          <article key={r.id} className="panel p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="display text-base tracking-[0.12em] text-silver">
                {BRANDS[r.business] ?? r.business}
              </h2>
              <span className="border border-royal/40 bg-royal/10 px-3 py-1 text-[0.55rem] tracking-[0.2em] uppercase text-silver">
                {r.status}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{r.details}</p>
            <dl className="mt-4 grid gap-1 text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground">
              <div className="flex gap-2">
                <dt>Name</dt>
                <dd className="text-silver">{r.full_name}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Email</dt>
                <dd className="normal-case tracking-normal text-silver">{r.contact_email}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Preferred date</dt>
                <dd className="text-silver">{r.preferred_date ?? "Flexible"}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Sent</dt>
                <dd className="text-silver">{new Date(r.created_at).toLocaleString()}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </main>
  );
}
