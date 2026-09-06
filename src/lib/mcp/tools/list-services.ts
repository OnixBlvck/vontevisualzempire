import { defineTool } from "@lovable.dev/mcp-js";

type Business = {
  business: string;
  brand: string;
  focus: string;
  services: string[];
  pricing_note: string;
  instagram: string;
};

const SERVICES: Business[] = [
  {
    business: "inknior",
    brand: "InkNior",
    focus: "Tattoo artistry / permanent identity",
    services: ["Blackwork", "Realism", "Lettering", "Custom"],
    pricing_note: "$30 deposit to secure your time",
    instagram: "https://www.instagram.com/inknior/",
  },
  {
    business: "onyxblvck",
    brand: "Onyx Blvck",
    focus: "Music / artist identity",
    services: ["Releases", "Cover Art", "Visual Rollout", "Artist Branding"],
    pricing_note: "Inquire for project scope",
    instagram: "https://www.instagram.com/iamonixblvck/",
  },
  {
    business: "fastcutedits",
    brand: "FastCutEdits",
    focus: "Graphic design / visual identity",
    services: ["Video Editing", "Graphic Design", "Branding", "Cover Art"],
    pricing_note: "Inquire for project scope",
    instagram: "https://www.instagram.com/fast.cuteditz/",
  },
];

export default defineTool({
  name: "list_services",
  title: "List services",
  description:
    "List the three VonteVisualz businesses (InkNior tattoo, Onyx Blvck music, FastCutEdits design) with their services and pricing notes.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SERVICES, null, 2) }],
    structuredContent: { businesses: SERVICES },
  }),
});
