import { createFileRoute } from "@tanstack/react-router";
import { AppPlatformPage } from "@/components/site/AppPlatformPage";

export const Route = createFileRoute("/app_/android")({
  head: () => ({ meta: [
    { title: "VonteVisualz for Android | App Preview" },
    { name: "description", content: "Preview VonteVisualz for Android with mobile website screenshots, music, portfolio and booking features. Android downloads are coming soon." },
    { property: "og:title", content: "VonteVisualz for Android | App Preview" },
    { property: "og:description", content: "Explore the creative empire on the web while the VonteVisualz Android app is unreleased." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AndroidPreview,
});

function AndroidPreview() { return <AppPlatformPage platform="Android" />; }