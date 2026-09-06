import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import emblem from "@/assets/vonte-emblem.jpg.asset.json";

function safeNext(value: unknown): string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/inbox";
}

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({ next: safeNext(search['next']) }),
  head: () => ({
    meta: [
      { title: "Sign In | VonteVisualz Empire Access" },
      {
        name: "description",
        content:
          "Sign in to VonteVisualz to send a booking request to InkNior, Onyx Blvck or FastCutEdits and track it in your inbox.",
      },
      { property: "og:title", content: "Sign In | VonteVisualz" },
      {
        property: "og:description",
        content: "Empire access — sign in to book and track your VonteVisualz requests.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: next });
    });
  }, [navigate, next]);

  async function signInWithGoogle() {
    setBusy(true);
    setError(null);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/auth?next=${encodeURIComponent(next)}`,
      });
      if (result.error) {
        setError(result.error.message ?? "Sign-in failed. Try again.");
        setBusy(false);
        return;
      }
      if (result.redirected) return;
      void navigate({ to: next });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign-in failed. Try again.");
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4">
      <div className="panel w-full max-w-sm p-8 text-center">
        <img src={emblem.url} alt="VonteVisualz emblem" className="mx-auto h-14 w-auto" />
        <h1 className="metal-text mt-4 text-2xl">Empire Access</h1>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Sign in to send a booking request and track it in your inbox.
        </p>
        {error && (
          <p role="alert" className="mt-4 text-[0.65rem] text-destructive">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={() => void signInWithGoogle()}
          disabled={busy}
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-royal/50 bg-royal/15 px-5 text-[0.62rem] tracking-[0.22em] uppercase transition-colors hover:bg-royal/35 disabled:opacity-60"
        >
          {busy ? "Connecting…" : "Continue with Google"}
        </button>
        <a
          href="/"
          className="mt-5 inline-block text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
        >
          ← Back to site
        </a>
      </div>
    </main>
  );
}
