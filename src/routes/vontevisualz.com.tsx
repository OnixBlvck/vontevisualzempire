import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/vontevisualz.com")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
