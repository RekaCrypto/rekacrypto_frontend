"use client";

import Image from "next/image";
import { useState } from "react";

export function NewsImage({ newsId }: { newsId: string }) {
  const [src, setSrc] = useState(
    `https://qptoeobygvvjzgtjhtfn.supabase.co/storage/v1/object/news-images/${newsId}.png`,
  );

  return (
    <Image
      src={src}
      alt="Crypto illustration"
      fill
      className="object-cover opacity-60"
      onError={() => {
        setSrc(
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1456&q=80",
        );
      }}
    />
  );
}
