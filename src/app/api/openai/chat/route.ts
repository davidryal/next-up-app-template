import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages: messages,
    system: "You are a helpful AI assistant",
  });

  return result.toDataStreamResponse();
}
