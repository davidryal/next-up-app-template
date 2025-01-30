import OpenAI from "openai";
import { createDataStreamResponse } from "ai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages
  });

  return createDataStreamResponse({
    execute: async (dataStream) => {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          dataStream.write(`0:${content}\n`);
        }
      }
      dataStream.write(`0:\n`);
    }
  });
}
