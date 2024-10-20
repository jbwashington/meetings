import {
    parseAsBoolean,
    parseAsFloat,
    parseAsString,
    parseAsStringEnum,
} from "nuqs";

export const donateDialogParser = {
    open: parseAsBoolean
        .withDefault(false)
        .withOptions({ clearOnDefault: true }),
    recurring: parseAsBoolean
        .withDefault(false)
        .withOptions({ clearOnDefault: true }),
    success: parseAsBoolean
        .withDefault(false)
        .withOptions({ clearOnDefault: true }),
    donationAmount: parseAsFloat
        .withDefault(0.00)
        .withOptions({ clearOnDefault: true }),
    name: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    email: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    includeFees: parseAsBoolean
        .withDefault(false)
        .withOptions({ clearOnDefault: true }),
    paymentIntent: parseAsString
        .withDefault("")
        .withOptions({ clearOnDefault: true }),
    paymentIntentClientSecret: parseAsString
        .withDefault("")
        .withOptions({ clearOnDefault: true }),
    clientSecret: parseAsString
        .withDefault("")
        .withOptions({ clearOnDefault: true }),
    redirectStatus: parseAsStringEnum(["open", "complete"])
        .withDefault("open")
        .withOptions({ clearOnDefault: true }),
    sessionId: parseAsString
        .withDefault("")
        .withOptions({ clearOnDefault: true }),
};
