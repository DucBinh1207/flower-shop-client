import { notoSansJPFont } from "../styles/fonts";

import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";

import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "./_components/react-query-provider";
import { SessionProvider } from "@/components/contexts/session";

export const metadata: Metadata = {
  title: {
    template: "SeedBloom",
    default: "SeedBloom",
  },
  description: "SeedBloom",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="ja"
      translate="no"
      className={notoSansJPFont.variable}
    >
      <body>
        <ReactQueryProvider>
          <SessionProvider>
            <Toaster />
            <Suspense>{children}</Suspense>
          </SessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
