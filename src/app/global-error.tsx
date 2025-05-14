"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang="ja">
      <body>
        <main className="bg-component-background app-h-screen flex items-center justify-center">
          <div className="rounded-4 border-component-gray-20 bg-main-white shadow-2 mx-4 flex flex-col items-center gap-4 border p-6">
            <h2 className="typography-l tablet:typography-xl">
              Root something went wrong!
            </h2>
          </div>
        </main>
      </body>
    </html>
  );
}
