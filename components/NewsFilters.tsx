"use client";

import {
  CalendarIcon,
  CoinsIcon,
  FilterIcon,
  SortDescIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function NewsFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const currentDateFilter = searchParams.get("date") || "all";
  const currentCoinFilter = searchParams.get("coin") || "all";
  const currentSentimentFilter = searchParams.get("sentiment") || "all";
  const currentSort = searchParams.get("sort") || "latest";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-4 w-4 text-slate-400" />
        <Select
          value={currentDateFilter}
          onValueChange={(value) => updateParam("date", value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <CoinsIcon className="h-4 w-4 text-slate-400" />
        <Select
          value={currentCoinFilter}
          onValueChange={(value) => updateParam("coin", value)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All coins</SelectItem>
              <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
              <SelectItem value="eth">Ethereum (ETH)</SelectItem>
              <SelectItem value="sol">Solana (SOL)</SelectItem>
              <SelectItem value="bnb">Binance (BNB)</SelectItem>
              <SelectItem value="xrp">Ripple (XRP)</SelectItem>
              <SelectItem value="ada">Cardano (ADA)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <FilterIcon className="h-4 w-4 text-slate-400" />
        <Select
          value={currentSentimentFilter}
          onValueChange={(value) => updateParam("sentiment", value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All sentiment</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <SortDescIcon className="h-4 w-4 text-slate-400" />
        <Select
          value={currentSort}
          onValueChange={(value) => updateParam("sort", value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="latest">Latest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {(currentDateFilter !== "all" ||
        currentCoinFilter !== "all" ||
        currentSentimentFilter !== "all" ||
        currentSort !== "latest") && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => replace(pathname)}
          className="text-xs"
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
