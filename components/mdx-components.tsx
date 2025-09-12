import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MdxCard } from "./mdx-card";
import { Button } from "./ui/button";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Callout } from "./callout";
import { DirectoryCard } from "./mdx-directory-card";

interface MdxElementProps {
    className?: string;
    props?: React.HTMLAttributes<HTMLElement>;
}

export const components = {
    Image: (props: React.ComponentProps<typeof Image>) => (
        <Image {...props} alt={props.alt} />
    ),
    Card: MdxCard,
    DirectoryCard: DirectoryCard,
    Button,
    CardDescription,
    CardHeader,
    CardTitle,
    Callout,
    h1: ({ className, ...props }: MdxElementProps) => (
        <h1
            className={cn(
                "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }: MdxElementProps) => (
        <h2
            className={cn(
                "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: MdxElementProps) => (
        <h3
            className={cn(
                "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h4: ({ className, ...props }: MdxElementProps) => (
        <h4
            className={cn(
                "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h5: ({ className, ...props }: MdxElementProps) => (
        <h5
            className={cn(
                "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h6: ({ className, ...props }: MdxElementProps) => (
        <h6
            className={cn(
                "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    a: ({ className, ...props }: MdxElementProps) => (
        <a
            className={cn("font-medium underline underline-offset-4", className)}
            {...props}
        />
    ),
    p: ({ className, ...props }: MdxElementProps) => (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
            {...props}
        />
    ),
    ul: ({ className, ...props }: MdxElementProps) => (
        <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: MdxElementProps) => (
        <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: MdxElementProps) => (
        <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: MdxElementProps) => (
        <blockquote
            className={cn(
                "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
                className
            )}
            {...props}
        />
    ),
    img: ({ 
        className, 
        alt, 
        src,
        width,
        height,
        ...props 
    }: React.ImgHTMLAttributes<HTMLImageElement>) => {
        // For MDX images, we may not have width/height, so we use fill with a container
        if (!src) return null;
        
        // Check if width and height are provided
        const hasSize = width && height;
        
        if (hasSize) {
            return (
                <Image
                    className={cn("rounded-md border", className)}
                    alt={alt || ""}
                    src={src as string}
                    width={typeof width === 'number' ? width : parseInt(width as string, 10)}
                    height={typeof height === 'number' ? height : parseInt(height as string, 10)}
                />
            );
        }
        
        // If no size provided, use a container with aspect ratio
        return (
            <div className="relative my-4 overflow-hidden rounded-md border">
                <Image
                    className={cn("object-contain", className)}
                    alt={alt || ""}
                    src={src as string}
                    width={800}
                    height={600}
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
        );
    },
    hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 w-full overflow-y-auto">
            <table className={cn("w-full", className)} {...props} />
        </div>
    ),
    tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr
            className={cn("m-0 border-t p-0 even:bg-muted", className)}
            {...props}
        />
    ),
    th: ({ className, ...props }: MdxElementProps) => (
        <th
            className={cn(
                "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
                className
            )}
            {...props}
        />
    ),
    td: ({ className, ...props }: MdxElementProps) => (
        <td
            className={cn(
                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
                className
            )}
            {...props}
        />
    ),
    pre: ({ className, ...props }: MdxElementProps) => (
        <pre
            className={cn(
                "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
                className
            )}
            {...props}
        />
    ),
    code: ({ className, ...props }: MdxElementProps) => (
        <code
            className={cn(
                "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
                className
            )}
            {...props}
        />
    ),
    kbd: ({ className, ...props }: MdxElementProps) => (
        <kbd
            className={cn(
                "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100",
                className
            )}
            {...props}
        />
    ),
};

// Legacy component for backward compatibility
interface MdxProps {
    code: string;
}

export function Mdx({ code }: MdxProps) {
    // This is now a placeholder as we're using MDXRemote directly
    // If you need to use this component, you'll need to render MDX differently
    return (
        <div className="mdx">
            <p>MDX content should be rendered using MDXRemote</p>
        </div>
    );
}