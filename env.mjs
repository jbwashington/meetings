import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        OPENAI_API_KEY: z.string().min(1),
        GROQ_API_KEY: z.string().min(1),
        NEXTAUTH_SECRET: z.string().min(1),
        RESEND_API_KEY: z.string().min(1),
        RESEND_FROM: z.string().min(1),
        IS_DEBUG: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.string().min(1),
    },
    runtimeEnv: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        GROQ_API_KEY: process.env.GROQ_API_KEY,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        RESEND_FROM: process.env.RESEND_FROM,
        IS_DEBUG: process.env.IS_DEBUG,
    },
});