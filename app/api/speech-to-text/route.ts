import { NextResponse } from "next/server";
import fs from "fs";
import { openai } from "@/lib/vendors/openai";

export async function POST(request: Request) {

    const body = await request.json();
    const b64Audio = body.audio;
    const audio = Buffer.from(b64Audio, "base64");
    console.log(audio)
    const filePath = `/tmp/${Date.now()}.wav`;
    try {
        fs.writeFileSync(filePath, audio);

        const readStream = fs.createReadStream(filePath);
        console.log(readStream)

        const data = await openai.audio.transcriptions.create({
            file: readStream,
            model: "whisper-1",
        });

        console.log(data)
        fs.unlinkSync(filePath);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error writing audio file:", error);
        return NextResponse.json(
            { error: "Failed to write audio file" },
            { status: 500 }
        );
    }
}