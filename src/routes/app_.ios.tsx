import { createFileRoute } from "@tanstack/react-router";
import { AppPlatformPage } from "@/components/site/AppPlatformPage";

export const Route = createFileRoute("/app_/ios")({
  head: () => ({ meta: [
    { title: "VonteVisualz for iOS | App Preview" },
    { name: "description", content: "Preview VonteVisualz for iOS with mobile website screenshots, music, portfolio and booking features. iOS downloads are coming soon." },
    { property: "og:title", content: "VonteVisualz for iOS | App Preview" },
    { property: "og:description", content: "Explore the creative empire on the web while the VonteVisualz iOS app is unreleased." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: IOSPreview,
});

function IOSPreview() { return <AppPlatformPage platform="iOS" />; }