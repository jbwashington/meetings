import {
    ComputedFields,
    defineDocumentType,
    makeSource,
} from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer/source-files').ComputedFields} */
const defaultComputedFields: ComputedFields = {
    slug: {
        type: "string",
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
        type: "string",
        resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
};

export const Doc = defineDocumentType(() => ({
    name: "Doc",
    filePathPattern: `docs/**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            description: "The title of the doc",
            required: true,
        },
        description: {
            description: "The description of the doc",
            type: "string",
        },
        published: {
            type: "boolean",
            description: "Whether the doc is published or not",
            default: true,
        },
    },
    computedFields: defaultComputedFields,
}));

export const Guide = defineDocumentType(() => ({
    name: "Guide",
    filePathPattern: `guides/**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            description: "The title of the guide",
            required: true,
        },
        description: {
            type: "string",
            description: "The description of the guide",
        },
        date: {
            type: "date",
            description: "The date of the guide",
            required: true,
        },
        published: {
            type: "boolean",
            description: "Whether the guide is published or not",
            default: true,
        },
        featured: {
            type: "boolean",
            description: "Whether the guide is featured or not",
            default: false,
        },
    },
    computedFields: defaultComputedFields,
}));

export const Post = defineDocumentType(() => ({
    name: "Post",
    filePathPattern: `blog/**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            description: "The title of the post",
            required: true,
        },
        description: {
            description: "The description of the post",
            type: "string",
        },
        date: {
            type: "date",
            description: "The date of the post",
            required: true,
        },
        published: {
            type: "boolean",
            description: "Whether the post is published or not",
            default: true,
        },
        image: {
            type: "string",
            description: "The image filepath of the post",
            required: true,
        },
        authors: {
            // Reference types are not embedded.
            // Until this is fixed, we can use a simple list.
            // type: "reference",
            // of: Author,
            type: "list",
            description: "The author or authors of the post",
            of: { type: "string" },
            required: true,
        },
    },
    computedFields: defaultComputedFields,
}));

export const Author = defineDocumentType(() => ({
    name: "Author",
    filePathPattern: `authors/**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            description: "The name of the author",
            required: true,
        },
        description: {
            type: "string",
            description: "The description of the author",
        },
        avatar: {
            type: "string",
            description: "The file path of the author avatar",
            required: true,
        },
        twitter: {
            type: "string",
            description: "The twitter handle of the author without the @",
            required: true,
        },
    },
    computedFields: defaultComputedFields,
}));

export const Page = defineDocumentType(() => ({
    name: "Page",
    filePathPattern: `pages/**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            description: "The title of page",
            required: true,
        },
        description: {
            type: "string",
            description: "The description of the page",
        },
    },
    computedFields: defaultComputedFields,
}));

export default makeSource({
    contentDirPath: "./content",
    documentTypes: [Page, Doc, Guide, Post, Author],
    // disableImportAliasWarning: true,
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: "github-dark",
                    onVisitLine(node: { children: string | any[] }) {
                        // Prevent lines from collapsing in `display: grid` mode, and allow empty
                        // lines to be copy/pasted
                        if (node.children.length === 0) {
                            node.children = [{ type: "text", value: " " }];
                        }
                    },
                    onVisitHighlightedLine(node: {
                        properties: { className: string[] };
                    }) {
                        // node.properties.className.push("line--highlighted")

                        // FIX: I changed remark-gmf 4.0.0 to 3.0.1 (return a lot errors in mdx?)
                        // And solve error on onVisitHighlightedLine with code from : https://stackoverflow.com/questions/76549262/onvisithighlightedline-cannot-push-classname-using-rehype-pretty-code
                        const nodeClass = node.properties.className;

                        if (nodeClass && nodeClass.length > 0) {
                            node.properties.className.push("line--highlighted");
                        } else {
                            node.properties.className = ["line--highlighted"];
                        }
                    },
                    onVisitHighlightedWord(node: {
                        properties: { className: string[] };
                    }) {
                        node.properties.className = ["word--highlighted"];
                    },
                },
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ["subheading-anchor"],
                        ariaLabel: "Link to section",
                    },
                },
            ],
        ],
    },
});
