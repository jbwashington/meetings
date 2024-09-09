"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Alert } from "../ui/alert";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useAudioRecorder, AudioRecorder } from "react-audio-voice-recorder";
import { getChatCompletion } from "@/lib/actions/get-chat-completion";
import { RefreshCw } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import {
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";

const formSchema = z.object({
    file: z.instanceof(FileList).optional(),
});

interface MessageSchema {
    role: "assistant" | "user" | "system";
    content: string;
}

// roles
const botRolePairProgrammer =
    "You are an expert pair programmer helping build an AI bot application with the OpenAI ChatGPT and Whisper APIs. The software is a web application built with NextJS with serverless functions, React functional components using TypeScript.";
const nocontext = "";

// personalities
const quirky =
    "You are quirky with a sense of humor. You crack jokes frequently in your responses.";
const drugDealer =
    "You are a snarky New York Times critic from the streets of Brooklyn. Sometimes you are rude and disrespectful. You often give harsh criticism in your responses.";
const straightLaced =
    "You are a straight laced corporate executive and only provide concise and accurate information.";

// brevities
const briefBrevity = "Your responses are always 1 to 2 sentences.";
const longBrevity = "Your responses are always 3 to 4 sentences.";
const whimsicalBrevity = "Your responses are always 5 to 6 sentences.";

// dials
const role = botRolePairProgrammer;
const personality = quirky;
const brevity = briefBrevity;

// FULL BOT CONTEXT
const botContext = `${role} ${personality} ${brevity}`;

export const Messages = () => {

    // const addAudioElement = (blob: Blob) => {
    //     const url = URL.createObjectURL(blob);
    //     const audio = document.createElement("audio");
    //     audio.src = url;
    //     audio.controls = true;
    //     document.body.appendChild(audio);
    // };

    const defaultContextSchema: MessageSchema = {
        role: "assistant",
        content: botContext,
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [messagesArray, setMessagesArray] = useState([defaultContextSchema]);

    useEffect(() => {
        const gptRequest = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("messagesArray in gptRequest fn", messagesArray);

                const gptResponse = await getChatCompletion(messagesArray);

                setLoading(false);
                if (gptResponse[0].message.content) {
                    const newMessage: MessageSchema = {
                        role: "assistant",
                        content: gptResponse[0].message.content,
                    };
                    setMessagesArray((prevState) => [...prevState, newMessage]);
                } else {
                    setError("No response returned from server.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (
            messagesArray.length > 1 &&
            !["system"].includes(messagesArray[messagesArray.length - 1].role)
        ) {
            gptRequest();
        }
    }, [messagesArray]);

    const updateMessagesArray = (newMessage: MessageSchema["content"]) => {
        const newMessageSchema: MessageSchema = {
            role: "user",
            content: newMessage,
        };
        console.log({ messagesArray });
        setMessagesArray((prevState) => [...prevState, newMessageSchema]);
    };

    // whisper request
    const whisperRequest = async (data: z.infer<typeof formSchema>) => {
        setError(null);
        setLoading(true);
        const formData = new FormData();
if (data.file && data.file.length > 0) {
    formData.append("file", data.file[0], "audio.wav");
}
try {
    const response = await fetch("/api/whisper", {
        method: "POST",
        body: formData,
    });
    const { text, error } = await response.json();
    if (response.ok) {
        updateMessagesArray(text);
    } else {
        setLoading(false);
        setError(error.message);
    }
} catch (error) {
    console.log({ error });
    setLoading(false);
    if (typeof error === "string") {
        setError(error);
    }
    if (error instanceof Error) {
        setError(error.message);
    }
    console.log("Error:", error);
}
    };

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data.file);
        const { file } = data;
        const response = whisperRequest({ file });
        console.log(response);
    };

    const fileRef = form.register("file");

    return (
        <>
            {error && (
                <Alert title="Bummer!" color="red" variant="destructive">
                    {error}
                </Alert>
            )}{" "}
            {!loading && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Audio File</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            placeholder="audio.mp3"
                                            {...fileRef}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        wav, mp3, m4a, mp4, mpeg, mpga, m4b,
                                        3gp, 3g2, mj2, aac, ogg, oga, wma, flac,
                                        alac, webm, aiff, or aifc.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            )}
            {loading && <Skeleton />}
            {!loading && messagesArray.length > 1 && (
                <Button
                    variant="default"
                    style={{ position: "absolute", marginLeft: "140px" }}
                    disabled={loading}
                    onClick={() => {
                        setMessagesArray([defaultContextSchema]);
                    }}
                    title="Start Over"
                >
                    <RefreshCw className="w-6 h-6" />
                </Button>
            )}
        </>
    );
};
