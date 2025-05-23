"use client";

import { useSession } from "@/components/contexts/session";
import { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { user } = useSession();
  const router = useRouter();
  const location = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, []);

  const menuItems = [
    { label: "Tổng quan", path: "/admin", icon: "bx-home-alt" },
    { label: "Danh mục", path: "/admin/categories", icon: "bx-category" },
    { label: "Nhà cung cấp", path: "/admin/supplies", icon: "bx-building-house" },
    { label: "Sản phẩm", path: "/admin/products", icon: "bx-package" },
    { label: "Đơn hàng", path: "/admin/orders", icon: "bx-cart" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              className="mr-3 text-gray-700 md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <i
                className={`bx ${isSidebarOpen ? "bx-x" : "bx-menu"} text-2xl`}
              ></i>
            </button>
            <Link
              href="/"
              className="flex items-center"
            >
              <i className="bx bxs-leaf text-2xl text-primary"></i>
              <span className="ml-2 font-montserrat text-xl font-bold text-primary">
                SeedBloom
              </span>
              <span className="ml-2 rounded bg-gray-200 px-2 py-0.5 text-sm">
                Admin
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center text-sm text-gray-600 hover:text-primary"
            >
              <i className="bx bx-store mr-1 text-lg"></i>
              <span className="hidden md:inline">Xem cửa hàng</span>
            </Link>
            <div className="group relative">
              <button className="flex items-center text-gray-700">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="ml-2 hidden md:inline">{user?.name}</span>
                <i className="bx bx-chevron-down ml-1"></i>
              </button>
              <div className="absolute right-0 z-10 mt-2 hidden w-48 rounded-md bg-white py-1 shadow-lg group-hover:block">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Tài khoản
                </Link>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    // logout();
                    router.push("/login");
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${isSidebarOpen ? "block" : "hidden"} fixed left-0 top-16 z-10 h-[calc(100vh-56px)] w-64 overflow-y-auto bg-white shadow-md transition-all duration-300 ease-in-out md:sticky md:top-0 md:block`}
        >
          <nav className="p-4 pt-6">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path as Route}
                    className={`flex items-center rounded-lg px-4 py-3 ${location === item.path ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    <i className={`bx ${item.icon} mr-3 text-xl`}></i>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
