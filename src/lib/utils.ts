import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0
  }).format(value);
}

export function percent(value: number) {
  return `${value.toFixed(1)}%`;
}

export function scoreTone(score: number) {
  if (score >= 85) return "excellent";
  if (score >= 70) return "good";
  return "risk";
}
