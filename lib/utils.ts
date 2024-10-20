import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}
export const addStripeTransactionFees = (amount: number) => {
    // 2.9% + 30¢ per successful charge for domestic cards
    const fee = amount * 0.029 + 0.3;
    return Number((amount + fee).toFixed(2));
};

export const getStripeTransactionFees = (amount: number) => {
    // 2.9% + 30¢ per successful charge for domestic cards
    const fee = amount * 0.029 + 0.3;
    return fee;
    };

export const longFloatToUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateDonationAmount = ({
    amount,
    includeFees,
}: {
    amount: number;
    includeFees: boolean;
}) => {
    let amountInCents = amount * 100;
    if (includeFees) {
        const transactionFees = addStripeTransactionFees(amount);
        amountInCents += transactionFees;
    }
    return Math.round(amountInCents);
};

export const convertCentsToDollars = (amount: number): string => {
    return longFloatToUSD(amount / 100);
};