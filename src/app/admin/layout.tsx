import { Metadata } from "next";
import AdminLayout from "./_components/admin-layout";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "admin",
    default: "admin",
  },
  description: "admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
