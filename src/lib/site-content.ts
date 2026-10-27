// Browser-safe types, defaults and helpers for owner-editable site content.

export const BUSINESS_IDS = ["inknior", "onyxblvck", "fastcutedits"] as const;
export type BusinessId = (typeof BUSINESS_IDS)[number];

export const BUSINESS_LABELS: Record<BusinessId, string> = {
  inknior: "InkNior",
  onyxblvck: "Onyx Blvck",
  fastcutedits: "FastCutEdits",
};

export type ServiceRow = {
  id: string;
  business: BusinessId;
  name: string;
  price_label: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
};

/** Approved values used until the owner saves different ones in the admin area. */
export const DEFAULT_SETTINGS = {
  contact_phone: "(832) 599-7747",
  contact_email: "VONTEVISUALZ@GMAIL.COM",
  website_url: "https://vontevisualz.com",
  instagram_onyxblvck: "https://www.instagram.com/iamonixblvck/",
  instagram_fastcutedits: "https://www.instagram.com/fast.cuteditz/",
  instagram_inknior: "https://www.instagram.com/inknior/",
  inknior_deposit_cents: "3000",
  announcement: "",
  seo_home_title: "VonteVisualz | Tattoos, Music & Design Creative Empire",
  seo_home_description:
    "VonteVisualz is the creative empire behind InkNior tattoo artistry, Onyx Blvck music, and FastCutEdits design. Book your session in Houston, Texas.",
  whatsapp_alert_number: "18325997747",
};

export type SettingKey = keyof typeof DEFAULT_SETTINGS;
export type SiteSettings = Record<SettingKey, string>;
export const SETTING_KEYS = Object.keys(DEFAULT_SETTINGS) as SettingKey[];

export const SETTING_LABELS: Record<SettingKey, string> = {
  contact_phone: "Phone",
  contact_email: "Email",
  website_url: "Website",
  instagram_onyxblvck: "Onyx Blvck Instagram",
  instagram_fastcutedits: "FastCutEdits Instagram",
  instagram_inknior: "InkNior Instagram",
  inknior_deposit_cents: "InkNior deposit (cents)",
  announcement: "Homepage announcement (leave empty to hide)",
  seo_home_title: "Homepage title (search results)",
  seo_home_description: "Homepage description (search results)",
  whatsapp_alert_number: "WhatsApp alert number (digits, with country code)",
};

export type SiteContent = {
  services: ServiceRow[];
  settings: SiteSettings;
  loadError: boolean;
};

export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`;
}

export function formatDeposit(cents: string): string {
  const value = Number.parseInt(cents, 10);
  if (!Number.isFinite(value) || value <= 0) return "";
  return `$${(value / 100).toFixed(value % 100 === 0 ? 0 : 2)}`;
}

export function servicesFor(services: ServiceRow[], business: BusinessId): ServiceRow[] {
  return services
    .filter((s) => s.business === business && s.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);
}
