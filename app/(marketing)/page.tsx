import Link from "next/link";

import { siteConfig } from "@/config/site";

import { cal } from "@/lib/calendar";
import { env } from "@/env.mjs";
import { calendar_v3 } from "@googleapis/calendar";
import { Icons } from "@/components/ui/icons";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

interface EventParams {
    calendarId: string;
    timeMin: string;
    maxResults: number;
    singleEvents: boolean;
    orderBy: string;
}

const getEvents = async () => {
    const params: EventParams = {
        calendarId: env.GOOGLE_CALENDAR_ID,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
    };
    const events = await cal.events.list(params);
    return events.data.items;
};

export default async function IndexPage() {
    const events = await getEvents();


    return (
        <>
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <Link
                        href={siteConfig.links.instagram}
                        className={badgeVariants({ variant: "default" })}
                        target="_blank"
                    >
                    <Icons.twitter className='w-4 h-4 mr-2' />@neighborhoodgram
                    </Link>
                    <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                        Upcoming Events
                    </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2">
            {events && events.map((event) => (
                <div
                    key={event.id}
                    className="rounded-lg"
                >
                    <p className="text-md font-semibold mb-2">
                        {event.summary}
                    </p>
                    <p className="text-muted-foreground text-sm">
                        {event.start?.dateTime
                            ? new Date(event.start.dateTime).toLocaleString()
                            : ""}
                    </p>
                </div>
            ))}
        </div>
                </div>
            </section>
            <section
                className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
            >
                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Contents
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Select your role and find everything you need in one place.
                    </p>
                </div>
                <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <div className="space-y-2">
                                <h3 className="font-bold">Prospective Parent</h3>
                                <p className="text-sm text-muted-foreground">
                                I am a parent looking to enroll my child in TNS.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <div className="space-y-2">
                                <h3 className="font-bold">Current Parent</h3>
                                <p className="text-sm">
                                I am a parent of a current student at TNS.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <div className="space-y-2">
                                <h3 className="font-bold">PTA Member</h3>
                                <p className="text-sm text-muted-foreground">
                                I am a member of the TNS PTA.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <div className="space-y-2">
                                <h3 className="font-bold">Faculty</h3>
                                <p className="text-sm text-muted-foreground">
                                I am a faculty member at TNS.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 mx-auto text-center md:max-w-screen-lg space-y-4">
<p className='font-sans text-2xl font-extrabold'>
                    Want to help fund the 2024-2025 school year?
</p>
                    <Link href="#" className={buttonVariants({ variant: 'default', size: "lg" })}>
                    Make a donation to TNS PTA
                    </Link>
                </div>
            </section>
        </>
    );
}
