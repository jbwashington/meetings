"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
// import { toast } from "@/components/ui/use-toast"
import { DialogProps } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { docsConfig } from "@/config/docs";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
    CircleIcon,
    FileIcon,
    LaptopIcon,
    MoonIcon,
    SunIcon,
} from "lucide-react";

export function DocsSearch({ ...props }: DialogProps) {
    const router = useRouter();

    const [open, setOpen] = React.useState(false);
    const { setTheme } = useTheme();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
                if (
                    (e.target instanceof HTMLElement &&
                        e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                ) {
                    return;
                }

                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    //   function onSubmit(event: React.SyntheticEvent) {
    //     event.preventDefault()

    //     return toast({
    //       title: "Not implemented",
    //       description: "We're still working on the search.",
    //     })
    //   }

    const tableOfContents = docsConfig.mainNav.concat(docsConfig.sidebarNav);

    return (
        <>
            <Button
                variant="outline"
                className={cn(
                    "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
                )}
                onClick={() => setOpen(true)}
                {...props}
            >
                <span className="hidden lg:inline-flex">
                    Search documentation...
                </span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {tableOfContents.map((group) => (
                        <CommandGroup key={group.title} heading={group.title}>
                            {group.items &&
                                group.items.map((navItem) => (
                                    <CommandItem
                                        key={navItem.href}
                                        value={navItem.title}
                                        onSelect={() => {
                                            runCommand(() =>
                                                router.push(
                                                    navItem.href as string
                                                )
                                            );
                                        }}
                                    >
                                        <div className="mr-2 flex h-4 w-4 items-center justify-center">
                                            <CircleIcon className="h-3 w-3" />
                                        </div>
                                        {navItem.title}
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    ))}
                    <CommandSeparator />
                    <CommandGroup heading="Theme">
                        <CommandItem
                            onSelect={() => runCommand(() => setTheme("light"))}
                        >
                            <SunIcon className="mr-2 h-4 w-4" />
                            Light
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => setTheme("dark"))}
                        >
                            <MoonIcon className="mr-2 h-4 w-4" />
                            Dark
                        </CommandItem>
                        <CommandItem
                            onSelect={() =>
                                runCommand(() => setTheme("system"))
                            }
                        >
                            <LaptopIcon className="mr-2 h-4 w-4" />
                            System
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
