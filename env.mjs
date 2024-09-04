import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        OPENAI_API_KEY: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_SERVER_URL: z.string().min(1),
    },
    runtimeEnv: {
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
});