import { CryptoCoin } from "@/lib/repositories/coins";
import { CryptoRecap } from "@/lib/repositories/cryptoRecaps";
import clsx from "clsx";
import Image from "next/image";
import ExpandableDescription from "./ExpandableDescription";
import { NewsImage } from "./NewsImage";

interface NewsCardProps {
  recap: CryptoRecap;
  coin: CryptoCoin;
  newsId: number;
}

export default function NewsCard({ recap, coin, newsId }: NewsCardProps) {
  return (
    <li className="card p-0 list-none overflow-hidden">
      <div className="relative w-full h-48 bg-gradient-to-br from-slate-800 to-slate-900">
        <NewsImage newsId={newsId.toString()} />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {coin?.image_link ? (
              <Image
                src={coin.image_link}
                alt={coin.name}
                className="h-6 w-6 rounded-full flex-shrink-0"
                width={24}
                height={24}
              />
            ) : null}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm font-medium text-slate-200 truncate">
                {coin?.name ?? recap.coin}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 min-w-[100px]">
            <div className="flex-1 h-2 bg-slate-700/30 rounded-full overflow-hidden">
              <div
                className={clsx(
                  "h-full rounded-full transition-all",
                  recap.forecast_indicator >= 7 &&
                    "bg-gradient-to-r from-emerald-500 to-emerald-400",
                  recap.forecast_indicator >= 4 &&
                    recap.forecast_indicator < 7 &&
                    "bg-gradient-to-r from-amber-500 to-amber-400",
                  recap.forecast_indicator < 4 &&
                    "bg-gradient-to-r from-rose-500 to-rose-400",
                )}
                style={{ width: `${recap.forecast_indicator * 10}%` }}
              />
            </div>
            <span
              className={clsx(
                "text-sm font-semibold tabular-nums min-w-[1.25rem] text-right",
                recap.forecast_indicator >= 7 && "text-emerald-300",
                recap.forecast_indicator >= 4 &&
                  recap.forecast_indicator < 7 &&
                  "text-amber-300",
                recap.forecast_indicator < 4 && "text-rose-300",
              )}
            >
              {recap.forecast_indicator}
            </span>
          </div>
        </div>

        <h3 className="mt-3 text-lg md:text-xl font-semibold text-slate-100 leading-tight">
          {recap.title}
        </h3>

        <div className="flex-1 min-h-0 mt-2">
          <ExpandableDescription
            text={recap.description}
            className="text-sm text-slate-300"
          />
        </div>

        {recap.sources?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {recap.sources.map((source, i) => (
              <a
                key={i}
                href={source}
                target="_blank"
                className="badge bg-white/5 text-slate-300 ring-white/10 hover:bg-white/10"
              >
                Source {i + 1}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  );
}
