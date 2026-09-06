import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { works } from "@/data/portfolio";

const SITE = "https://vontevisualz.com";

export default defineTool({
  name: "list_portfolio",
  title: "List portfolio work",
  description:
    "List published VonteVisualz portfolio pieces (flyers, cover art, logos, video stills) with their brand and category.",
  inputSchema: {
    brand: z
      .enum(["InkNior", "Onyx Blvck", "FastCutEdits"])
      .optional()
      .describe("Optional brand filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ brand }) => {
    const items = works
      .filter((w) => (brand ? w.brand === brand : true))
      .map((w) => ({ id: w.id, title: w.title, category: w.category, brand: w.brand }));
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ portfolio_url: `${SITE}/portfolio`, items }, null, 2),
        },
      ],
    };
  },
});
