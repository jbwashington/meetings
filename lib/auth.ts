import { db } from "./db";
import { env } from "@/env.mjs";

type UserId = string;
type IsAdmin = boolean;

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { siteConfig } from "@/config/site";
import { AdapterUser } from "next-auth/adapters";
import { resend } from "./vendors/resend";
import MagicLinkEmail from "@/components/emails/magic-link-email";

export const authOptions: NextAuthOptions = {
    // huh any! I know.
    // This is a temporary fix for prisma client.
    // @see https://github.com/prisma/prisma/issues/16117
    // TODO: fix db type as any
    adapter: PrismaAdapter(db as any),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        EmailProvider({
            from: env.RESEND_FROM,
            sendVerificationRequest: async ({ identifier, url, provider }) => {
                const user = await db.user.findUnique({
                    where: {
                        email: identifier,
                    },
                    select: {
                        emailVerified: true,
                    },
                });

                const { data, error } = await resend.emails.send({
                    from: provider.from as string,
                    to: identifier,
                    subject: "Sign in to your account",
                    react: MagicLinkEmail({
                        actionUrl: url,
                        siteName: siteConfig.name,
                        firstName: identifier.split("@")[0],
                        mailType: user?.emailVerified ? "login" : "register",
                    }),
                });
                if (error) {
                    throw new Error(error.message);
                }
            },
        }),
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user = {
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    image: token.picture,
                } as AdapterUser;
            }

            return session;
        },
        async jwt({ token, user }) {
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email,
                },
            });

            if (!dbUser) {
                if (user) {
                    token.id = user?.id;
                }
                return token;
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            };
        },
    },
};
