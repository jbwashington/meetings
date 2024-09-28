"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { PTABudgetChart } from "../charts/pta-budget";
import Link from "next/link";

export default function DonateForm() {
    const [isRecurring, setIsRecurring] = useState(false);
    const [amount, setAmount] = useState("25");
    const [customAmount, setCustomAmount] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Here you would typically handle the donation submission
        console.log("Donation submitted:", {
            isRecurring,
            amount: amount === "custom" ? customAmount : amount,
        });
    };
    return (
        <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
                <div>
                    <h1 className="text-6xl font-extrabold mb-4 capitalize">
                        Your donations empower us to protect our children.
                    </h1>
                    <p className="text-lg text-muted-foreground mb-4">
                        Thanks to community efforts, we&apos;ve successfully
                        lobbied to{" "}
                        <b>reduce the number of lockdown drills in schools</b>,
                        a change that was{" "}
                        <Link
                            href="https://www.whitehouse.gov/briefing-room/presidential-actions/2024/09/26/executive-order-on-combating-emerging-firearms-threats-and-improving-school-based-active-shooter-drills/#:~:text=Sec.%204.%C2%A0%20Understanding%20and,to%2C%20active%2Dshooter%20drills."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-foreground"
                        >
                            recently signed into law by the White House
                        </Link>
                        . Together, we can keep pushing for sensible policies
                        that{" "}
                        <b>
                            prioritize the safety and emotional health of our
                            students
                        </b>
                        .
                    </p>
                    <p className="text-lg text-muted-foreground mb-4">
                        Your support also helps us offer services that fulfill
                        our school mission of providing social-emotional
                        wellness, advancing our{" "}
                        <b>anti-bias/anti-racist curriculum</b>, and sustaining
                        a student-to-teacher ratio that ensures{" "}
                        <b>
                            every child receives the attention and care they
                            deserve
                        </b>
                        .
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
                            Your donation is fully tax deductible; <br /> the
                            Neighborhood School PTA is a 501(c)(3) charitable
                            organization.
                        </CardTitle>
                        <CardDescription>
                            Donations big and small allow TNS to continue our
                            incredible mission and create a safe and nurturing
                            environment for our children. The PTA raises money
                            to fund so many of the programs and partnerships
                            that make TNS so very special!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="recurring">
                                        Monthly Donation
                                    </Label>
                                    <Switch
                                        id="recurring"
                                        checked={isRecurring}
                                        onCheckedChange={setIsRecurring}
                                    />
                                </div>
                                <RadioGroup
                                    value={amount}
                                    onValueChange={setAmount}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    {["10", "25", "50", "100"].map((value) => (
                                        <div key={value}>
                                            <RadioGroupItem
                                                value={value}
                                                id={`amount-${value}`}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={`amount-${value}`}
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                ${value}
                                            </Label>
                                        </div>
                                    ))}
                                    <div className="col-span-2">
                                        <RadioGroupItem
                                            value="custom"
                                            id="amount-custom"
                                            className="peer sr-only"
                                        />
                                        <Label
                                            htmlFor="amount-custom"
                                            className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <span className="mr-2 capitalize">
                                                Custom amount:
                                            </span>
                                            <Input
                                                type="number"
                                                placeholder="Enter custom amount"
                                                value={customAmount}
                                                onChange={(e) => {
                                                    setCustomAmount(
                                                        e.target.value
                                                    );
                                                    setAmount("custom");
                                                }}
                                                className="w-fit"
                                            />
                                        </Label>
                                    </div>
                                </RadioGroup>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Johneisha Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="johneisha@example.com"
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            {isRecurring
                                ? "Start Monthly Donation"
                                : "Donate Now"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
