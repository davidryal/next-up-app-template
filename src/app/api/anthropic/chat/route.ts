import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export const runtime = "edge";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const result = await streamText({
    model: anthropic("claude-3-5-sonnet-20240620"),
    messages: messages,
    system: "You are a helpful AI assistant",
  });

  return result.toDataStreamResponse();
}
