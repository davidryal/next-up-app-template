import { NextResponse } from "next/server";
import fs from "fs";
import OpenAI from "openai";

// Only create OpenAI instance if API key is present
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) 
  : null;

export async function POST(req: Request) {
  // Skip API key validation during build
  if (process.env.NODE_ENV === 'production' && !process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key will be required in production" }, 
      { status: 200 }
    );
  }

  // Validate API key is present for actual requests
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key is missing" }, 
      { status: 500 }
    );
  }

  const body = await req.json();

  const base64Audio = body.audio;

  // Convert the base64 audio data to a Buffer
  const audio = Buffer.from(base64Audio, "base64");

  // Define the file path for storing the temporary WAV file
  const filePath = "tmp/input.wav";

  try {
    // Ensure tmp directory exists
    if (!fs.existsSync('tmp')) {
      fs.mkdirSync('tmp');
    }

    // Write the audio data to a temporary WAV file synchronously
    fs.writeFileSync(filePath, audio);

    // Create a readable stream from the temporary WAV file
    const readStream = fs.createReadStream(filePath);

    // Only attempt transcription if OpenAI client is initialized
    const data = openai 
      ? await openai.audio.transcriptions.create({
          file: readStream,
          model: "whisper-1",
        })
      : { text: "Transcription unavailable" };

    // Remove the temporary file after successful processing
    fs.unlinkSync(filePath);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.json(
      { error: "Failed to process audio" }, 
      { status: 500 }
    );
  }
}
