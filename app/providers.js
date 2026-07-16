"use client";

import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { base } from "viem/chains";

// Wraps the whole app so it can run both as a normal website AND, once
// verified, as a Base Mini App inside the Base App. On a normal website
// this provider quietly does nothing extra - it only activates Mini App
// behavior when the app is actually opened inside a compatible client.
export function Providers({ children }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: "auto",
          theme: "base",
          name: "Quizverse",
          logo: (process.env.NEXT_PUBLIC_URL || "") + "/icon.png",
        },
      }}
    >
      {children}
    </MiniKitProvider>
  );
}
