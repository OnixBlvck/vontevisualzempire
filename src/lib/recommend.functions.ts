import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const recommendationSchema = z.object({
  business: z.enum(["inknior", "onyxblvck", "fastcutedits"]),
  headline: z.string(),
  reason: z.string(),
  suggested_services: z.array(z.string()),
});

export type Recommendation = z.infer<typeof recommendationSchema>;

const INSTRUCTIONS = `You recommend which VonteVisualz business fits a visitor's event or project.
Businesses and their only approved services and prices:
- inknior (InkNior, tattoo artistry): Names & Lettering $40+, Blackwork $60/hr, Realism $60/hr, $30 deposit.
- fastcutedits (FastCutEdits, design): Flyers $30+, Graphic Edits $60+, Cover Art $80+, Branding Package $159+, Web Design $299+.
- onyxblvck (Onyx Blvck, music artist): Hook Only $50, Verse Only $50, Full Songwriting $100, Recording $40/hr, Features $100, Beats $30, Mixing/Mastering $80–$100.
Pick the single best business. headline: one short line. reason: 1-3 sentences. suggested_services: 1-3 names from that business's list only.
Never invent services, prices, availability, or confirm bookings. Always spell the artist "Onyx Blvck".`;

export const recommendBusiness = createServerFn({ method: "POST" })
  .inputValidator((input: { description: string }) =>
    z.object({ description: z.string().trim().min(10).max(1000) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText, Output } = await import("ai");
    const apiKey = process.env['LOVABLE_API_KEY'];
    if (!apiKey) throw new Error("AI is not configured.");

    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });

    try {
      const result = streamText({
        model: provider.responses("openai/gpt-6-astra"),
        messages: [
          { role: "system", content: INSTRUCTIONS },
          { role: "user", content: data.description },
        ],
        output: Output.object({ schema: recommendationSchema }),
        maxRetries: 0,
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });
      return (await result.output) as Recommendation;
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode;
      if (status === 429) throw new Error("Too many requests right now. Please try again in a minute.");
      if (status === 402 || status === 403) throw new Error("The recommender is unavailable right now.");
      throw new Error("Could not get a recommendation. Please try again.");
    }
  });
