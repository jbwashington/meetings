import { getChatCompletion } from '@/lib/actions/get-chat-completion';
import { ChatCompletionSystemMessageParam } from 'groq-sdk/resources/chat/completions.mjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {

    const choices = await getChatCompletion(req.body.messages);
    console.log(choices)

    if (choices?.length > 0) {
        const newSystemMessageSchema: ChatCompletionSystemMessageParam = {
            role: "system",
            content: choices[0].message.content as string,
        };
        res.json(newSystemMessageSchema);
    } else {
        // send error
        res.status(500).send("No response from Groq");
    }

}
