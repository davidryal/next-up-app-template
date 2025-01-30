import { createDataStreamResponse, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  return createDataStreamResponse({
    execute: async (dataStream) => {
      const result = await streamText({
        model: openai("gpt-3.5-turbo"),
        messages
      });

      result.mergeIntoDataStream(dataStream);
    }
  });
}
