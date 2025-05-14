"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-white p-8 text-center shadow-md">
          <i className="bx bx-lock-alt mb-4 text-5xl text-primary"></i>
          <h1 className="mb-2 text-2xl font-bold">Đăng nhập để tiếp tục</h1>
          <p className="mb-4 text-gray-600">
            Bạn cần đăng nhập để truy cập trang này.
          </p>
          <div className="animate-pulse">
            <p className="text-sm text-gray-500">
              Đang chuyển hướng đến trang đăng nhập...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="bg-gray-light flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
