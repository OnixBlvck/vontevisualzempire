import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { createPublicServerClient } from "@/lib/public-supabase";
import {
  DEFAULT_SETTINGS,
  SETTING_KEYS,
  type ServiceRow,
  type SettingKey,
  type SiteContent,
} from "@/lib/site-content";

export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContent> => {
    const supabase = createPublicServerClient();
    const [servicesResult, settingsResult] = await Promise.all([
      supabase
        .from("services")
        .select("id, business, name, price_label, description, sort_order, is_active")
        .eq("is_active", true)
        .order("business")
        .order("sort_order"),
      supabase.from("site_settings").select("key, value"),
    ]);

    const settings = { ...DEFAULT_SETTINGS };
    for (const row of settingsResult.data ?? []) {
      if ((SETTING_KEYS as string[]).includes(row.key)) settings[row.key as SettingKey] = row.value;
    }

    const loadError = Boolean(servicesResult.error || settingsResult.error);
    if (loadError) {
      console.error("Site content load failed", servicesResult.error, settingsResult.error);
    }

    return {
      services: (servicesResult.data ?? []) as ServiceRow[],
      settings,
      loadError,
    };
  },
);

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContent(),
  staleTime: 60_000,
});

export type PublicMimsItem = {
  id: string;
  kind: string;
  title: string;
  summary: string | null;
  body: string | null;
  status: string | null;
  video_url: string | null;
  image_url: string | null;
  sort_order: number;
};

export const getPublicMimsItems = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ items: PublicMimsItem[]; loadError: boolean }> => {
    const supabase = createPublicServerClient();
    const { data, error } = await supabase
      .from("mims_items")
      .select("id, kind, title, summary, body, status, video_url, image_path, sort_order")
      .eq("is_public", true)
      .order("sort_order")
      .order("created_at");

    if (error) {
      console.error("Make It Make Sense load failed", error);
      return { items: [], loadError: true };
    }

    const items = await Promise.all(
      (data ?? []).map(async ({ image_path, ...item }) => {
        let image_url: string | null = null;
        if (image_path) {
          const signed = await supabase.storage
            .from("site-assets")
            .createSignedUrl(image_path, 60 * 60 * 6);
          image_url = signed.data?.signedUrl ?? null;
        }
        return { ...item, image_url };
      }),
    );
    return { items, loadError: false };
  },
);

export const publicMimsQuery = queryOptions({
  queryKey: ["mims-public"],
  queryFn: () => getPublicMimsItems(),
  staleTime: 60_000,
});
