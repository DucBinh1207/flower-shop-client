import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <main className="bg-main-white app-h-screen flex select-none flex-col items-center justify-center p-10">
      <h1 className="text-text-black mt-[40px] text-[48px] font-bold leading-[48px]">
        404
      </h1>
      <h2 className="typography-xxl text-text-black font-bold">Not Found</h2>
      <Button className="mt-5">
        {" "}
        <Link href="/">Return Home Page</Link>
      </Button>
    </main>
  );
}
