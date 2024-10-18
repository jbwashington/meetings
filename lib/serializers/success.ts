import { env } from "@/env.mjs";
import { createSerializer, parseAsBoolean, parseAsString } from "nuqs";

export const successUrlSerializer = () => {

    const urlParams = {
        donate: parseAsBoolean,
        success: parseAsBoolean,
        session_id: parseAsString,
    };

    const serializer = createSerializer(urlParams);

    const returnUrl = serializer({
        donate: true,
        success: true,
        session_id: "{CHECKOUT_SESSION_ID}",
    });

    return returnUrl;
}