// @ts-check
import "./env.mjs";
import { withNextDevtools } from "@next-devtools/core/plugin";
import withMDX from "@next/mdx";

!process.env.SKIP_ENV_VALIDATION && (await import("./env.mjs"));

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        mdxRs: true,
    },
    pageExtensions: ["ts", "tsx", "mdx"],
};

export default withNextDevtools(withMDX()(config));
