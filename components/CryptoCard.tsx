"use client";

import { followCoin } from "@/app/actions/follow-coin";
import { unfollowCoin } from "@/app/actions/unfollow-coin";
import { UserFollow } from "@/lib/repositories/userFollows";
import { Star, StarOff } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CryptoCardProps {
  coin: {
    id: number;
    shortname: string;
    name: string;
    image_link: string | null;
  };
  userFollow: Partial<UserFollow> | undefined;
}

export default function CryptoCard({ coin, userFollow }: CryptoCardProps) {
  const [isTracked, setIsTracked] = useState(!!userFollow);
  const [frequency, setFrequency] = useState<"daily" | "weekly">(
    userFollow?.update_frequency || "daily",
  );
  const [isPending, startTransition] = useTransition();

  const handleToggleTracking = () => {
    const newIsTracked = !isTracked;
    setIsTracked(newIsTracked);

    startTransition(async () => {
      try {
        if (newIsTracked) {
          await followCoin(coin.id, frequency);
        } else {
          await unfollowCoin(coin.id);
        }
      } catch (error) {
        setIsTracked(!newIsTracked);
      }
    });
  };

  const handleFrequencyChange = (newFrequency: "daily" | "weekly") => {
    setFrequency(newFrequency);

    if (isTracked) {
      startTransition(async () => {
        try {
          await followCoin(coin.id, newFrequency);
        } catch (error) {
          setFrequency(frequency);
        }
      });
    }
  };

  return (
    <div className="card p-4 flex items-center gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {coin.image_link ? (
          <Image
            src={coin.image_link}
            alt={coin.name}
            className="h-10 w-10 rounded-full flex-shrink-0"
            width={40}
            height={40}
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-slate-300">
              {coin.shortname.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white truncate">{coin.name}</h3>
          <p className="text-sm text-slate-400">
            {coin.shortname.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isTracked && (
          <Select
            value={frequency}
            onValueChange={handleFrequencyChange}
            disabled={isPending}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        <Button
          onClick={handleToggleTracking}
          disabled={isPending}
          className={`flex items-center gap-2 ${
            isTracked
              ? "bg-primary-600 hover:bg-primary-700 text-white"
              : "bg-slate-800 hover:bg-slate-700 text-slate-300"
          }`}
        >
          {isTracked ? (
            <>
              <Star className="h-4 w-4 fill-current" />
              Following
            </>
          ) : (
            <>
              <StarOff className="h-4 w-4" />
              Follow
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
