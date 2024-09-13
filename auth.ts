import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import authConfig from "./auth.config";
import { db } from "./lib/db";

// TODO: assign roles
// type UserId = string;
// type IsAdmin = boolean;
 
export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
});