'use server'

import { openai } from "../vendors/openai";
import { TranscriptionCreateParams } from "openai/resources/audio/transcriptions.mjs";

export const whisper = async ({
    mode = "transcriptions",
    file,
    response_format = "json",
    model = "whisper-1",
    prompt = "",
    temperature = 0,
    language = "en",
}: {
    mode: string;
    file: Buffer;
    response_format: TranscriptionCreateParams["response_format"];
    model: TranscriptionCreateParams["model"];
    prompt: TranscriptionCreateParams["prompt"];
    temperature: TranscriptionCreateParams["temperature"];
    language: TranscriptionCreateParams["language"];
}) => {
    const options: TranscriptionCreateParams = {
        file: new File([file], "audio.wav", { type: "audio/wav" }),
        model,
        prompt,
        response_format,
        temperature,
        language,
    };

    try {
        const response =
            mode === "translations"
                ? await openai.audio.translations.create(options)
                : await openai.audio.transcriptions.create(options);

        return response;
    } catch (error: any) {
        console.error(error.name, error.message);
        return null;
    }
};