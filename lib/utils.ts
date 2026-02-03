import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Parse coins from search params supporting both repeated `coins` and comma-separated values
export function parseCoinsParam(param?: string | string[]): string[] {
  if (!param) return [];
  const arr = Array.isArray(param) ? param : [param];
  return Array.from(
    new Set(
      arr
        .flatMap((v) => v.split(","))
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  );
}

// Build href preserving state with multi coins
export function buildHref(state: {
  coins?: string[];
  search?: string;
  date?: "today" | "week" | "month" | "year";
}) {
  const q = new URLSearchParams();
  if (state.search) q.set("search", state.search);
  if (state.date) q.set("date", state.date);
  for (const c of state.coins || []) q.append("coins", c);
  const qs = q.toString();
  return qs ? `/?${qs}` : "/";
}

// Toggle coin selection
export function toggleCoin(current: string[], coin: string): string[] {
  return current.includes(coin)
    ? current.filter((c) => c !== coin)
    : [...current, coin];
}

// Chip styling constants
export const CHIP_STYLES = {
  base: "badge cursor-pointer select-none transition-colors",
  inactive: "bg-white/5 text-slate-300 ring-white/10 hover:bg-white/10",
  active: "bg-primary-600 text-white ring-primary-500/40 hover:bg-primary-600",
};
