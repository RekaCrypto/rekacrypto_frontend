"use client";

import { generateTelegramLinkToken } from "@/app/actions/generate-telegram-link-token";

export default function ConnectTelegramButton() {
  const handleConnect = async () => {
    const token = await generateTelegramLinkToken();

    const telegramUrl = `https://t.me/rekacrypto_alerts_bot?start=${token}`;

    window.open(telegramUrl, "_blank");
  };

  return <button onClick={handleConnect}>Connect Telegram</button>;
}
