import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listServicesTool from "./tools/list-services";
import listPortfolioTool from "./tools/list-portfolio";
import createBookingRequestTool from "./tools/create-booking-request";
import listMyBookingRequestsTool from "./tools/list-my-booking-requests";

// The OAuth issuer must be the direct Supabase host; the project ref is the only
// value that survives publish unchanged and Vite inlines it at build time.
const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "vontevisualz-empire",
  title: "VonteVisualz Empire",
  version: "0.1.0",
  instructions:
    "Tools for VonteVisualz (https://vontevisualz.com, digital card at https://vontevisualz.com/card, app overview at https://vontevisualz.com/app, iOS preview at https://vontevisualz.com/app/ios, Android preview at https://vontevisualz.com/app/android). The mobile apps are unreleased: platform pages show current mobile website screenshots and web features, not native app screenshots. No App Store, Google Play, installation files or live app downloads are available; do not claim otherwise. Direct visitors to the web version at https://vontevisualz.com to use existing features. VonteVisualz is the creative empire behind InkNior (tattoo), Onyx Blvck (music) and FastCutEdits (design). Use `list_services` and `list_portfolio` to explore the work, `create_booking_request` to submit a booking for the signed-in person, and `list_my_booking_requests` to review their own requests.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listServicesTool, listPortfolioTool, createBookingRequestTool, listMyBookingRequestsTool],
});
