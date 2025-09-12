// @ts-check
import "./env.mjs";
// import { withNextDevtools } from "@next-devtools/core/plugin";
import withMDX from "@next/mdx";

!process.env.SKIP_ENV_VALIDATION && (await import("./env.mjs"));

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "*",
            },
        ],
    },
    experimental: {
        mdxRs: true,
    },
    typedRoutes: true, // Re-enabled for proper route typing
    serverExternalPackages: ["@prisma/client"],
    pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMDX()(config);
