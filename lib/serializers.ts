import { createSerializer } from "nuqs";
import { donateDialogParser } from "./parsers/donate-dialog";

export const successUrlSerializer = () => {

    const serialize = createSerializer(donateDialogParser);

    const successURL = serialize({
        open: true,
        success: true,
        sessionId: "{CHECKOUT_SESSION_ID}",
    });

    return successURL;
}

export const defaultUrlSerializer = async () => {

    const serialize = createSerializer(donateDialogParser);

    const successURL = serialize({
        open: true,
        name: "",
        email: "",
        includeFees: false,
        donationAmount: 50,
        recurring: false,
        success: false,
        clientSecret: "",
        sessionId: "",
    });

    return successURL;
}

export const stripeCheckoutSerializer = () => {
    const serialize = createSerializer(donateDialogParser);
    return serialize;
};