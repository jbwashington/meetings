import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PTABudgetChart } from "./charts/pta-budget";
import Link from "next/link";
import { Route } from "next";
import DonateFormWrapper from "./forms/donate-form-wrapper";

export default function DonateSection() {
    return (
        <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
                <div>
                    <h1 className="text-6xl font-extrabold mb-4 capitalize">
                        Your donations empower innovative progressive education.
                    </h1>
                    <p className="text-lg text-muted-foreground mb-4">
                        As one of the East Village&apos;s leading progressive public schools, we believe every child deserves{" "}
                        <b>personalized, culturally responsive education</b> that nurtures their whole development.
                        Your support helps us maintain{" "}
                        <b>small class sizes, innovative teaching approaches</b>, and the enriched learning environment
                        that sets our students up for lifelong success.
                    </p>
                    <p className="text-lg text-muted-foreground mb-4">
                        Our progressive educational approach centers on{" "}
                        <b>social-emotional learning, anti-bias education</b>, and
                        creating an inclusive community where every student thrives.
                        With your support, we provide{" "}
                        <b>enrichment programs, teaching assistants, and innovative resources</b>{" "}
                        that make The Neighborhood School a model for progressive public education in the East Village.
                    </p>
                    <h2 className="text-2xl font-semibold mb-2 capitalize">
                        PTA funds go towards:
                    </h2>
                    <PTABudgetChart />
                </div>
            </div>
            <div>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="leading-loose">
                            Your donation is fully tax deductible; the
                            Neighborhood School PTA is a 501(c)(3) charitable
                            organization.
                        </CardTitle>
                        <CardDescription>
                            Every donation directly supports teachers and students through
                            innovative programs, enrichment activities, and educational resources.
                            Your contribution helps maintain our progressive educational excellence
                            and ensures every child at TNS receives the personalized attention
                            that makes our East Village community so extraordinary.
                        </CardDescription>
                    </CardHeader>
                    <DonateFormWrapper />
                </Card>
            </div>
        </div>
    );
}
