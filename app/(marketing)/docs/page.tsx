import { notFound } from "next/navigation"
import { Metadata } from "next"
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'

import { getDocFromSlug } from "@/lib/mdx"
import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { absoluteUrl } from "@/lib/utils"
import { components } from "@/components/mdx-components"

import "@/styles/mdx.css"

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getDocFromSlug("")

  if (!doc) {
    return {
      title: "Documentation",
      description: "The Neighborhood School PTA Documentation",
    }
  }

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", doc.title)
  ogUrl.searchParams.set("type", "Documentation")
  ogUrl.searchParams.set("mode", "light")

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl("/docs"),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [ogUrl.toString()],
    },
  }
}

export default async function DocsIndexPage() {
  const doc = await getDocFromSlug("")

  if (!doc) {
    notFound()
  }

  return (
    <article className="container max-w-3xl py-6 lg:py-12">
      <div className="space-y-4">
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">
          {doc.title}
        </h1>
        {doc.description && (
          <p className="text-xl text-muted-foreground">{doc.description}</p>
        )}
      </div>
      <hr className="my-4" />
      <MDXRemote 
        source={doc.content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
          },
        }}
      />
    </article>
  )
}