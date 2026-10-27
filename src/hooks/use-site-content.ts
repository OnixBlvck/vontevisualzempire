import { useSuspenseQuery } from "@tanstack/react-query";
import { siteContentQuery } from "@/lib/site-content.functions";

/** Owner-editable services and settings; preloaded by the root route loader. */
export function useSiteContent() {
  return useSuspenseQuery(siteContentQuery).data;
}
