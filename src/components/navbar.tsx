/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-lines */
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

import { useCartStore } from "src/store/cartStore";

import { Logo } from "./logo";
import { SearchBar } from "./search-bar";
import { ShoppingCart } from "./shopping-cart";
import { Route } from "next";
import { useSession } from "./contexts/session";
import { deleteAuthTokenFromInternalServer } from "@/api/internal-auth-token-api";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useWishlistStore } from "src/store/wishlistStore";
import useConvertSearchStateToRequestParams from "@/hooks/use-convert-search-state-to-request-params";
import { StateCategoryQuery } from "src/app/admin/categories/_hooks/use-categories";
import { getCategories } from "@/api/categories-api";
import { useQuery } from "@tanstack/react-query";

export function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLLIElement>(null);

  const query = useConvertSearchStateToRequestParams<
      NonNullable<StateCategoryQuery>
    >({
      page: 1,
      limit: 5,
      search: "",
    });

  const {
    data: { data: categories = [] } = {},
    isLoading: isLoadingCategories,
  } = useQuery({
    queryKey: ["categories-navbar"],
    queryFn: () => getCategories(query),
  });

  const { items : WishListItem } = useWishlistStore();
  const { items } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const { isAuthenticated, user, clearSession } = useSession();
  const location = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await deleteAuthTokenFromInternalServer();
      clearSession();
      router.replace("/login");
    } catch (error) {}
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <React.Fragment>
      <header className="sticky top-0 z-50 bg-white bg-white/95 backdrop-blur-md">
        {/* Top announcement bar */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary to-green-500 py-2.5 text-center text-sm font-medium tracking-wide text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCAwTDEwLjk3IDUuODc4TDE2IDYuNTcyTDEyIDEwLjk3TDEzLjA5IDE2TDggMTMuODc4TDIuOTEgMTZMNCAxMC45N0wwIDYuNTcyTDUuMDMgNS44NzhMOCAwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20" />
          <p>
            Miễn phí vận chuyển cho đơn hàng từ 300.000₫ -{" "}
            <Link
              href="/"
              className="font-medium underline transition-colors hover:text-white/90"
            >
              Xem ưu đãi
            </Link>
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Logo size="medium" />

            {/* Search Bar - Desktop */}
            <div className="hidden w-2/5 md:block">
              <SearchBar />
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              <Link
                href="/search"
                className="rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-50/80 hover:text-primary md:hidden"
                aria-label="Tìm kiếm"
              >
                <i className="bx bx-search text-xl" />
              </Link>

              {isAuthenticated ? (
                <div
                  className="relative"
                  ref={userDropdownRef}
                >
                  <button
                    className="group flex items-center gap-1.5 rounded-full px-2 py-1.5 text-gray-700 transition-all hover:bg-primary/5 hover:text-primary"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    aria-label="Menu người dùng"
                  >
                    <Avatar className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/20 ring-2 ring-white transition-all group-hover:ring-primary/5">
                      <AvatarImage
                        src={user?.avatar}
                        alt="avatar"
                      />
                      <AvatarFallback>
                        <i className="bx bx-user text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="line-clamp-1 hidden max-w-[100px] text-sm font-medium md:block">
                      {user?.name}
                    </span>
                    <i className="bx bx-chevron-down hidden text-sm opacity-70 transition-transform group-hover:translate-y-0.5 md:block" />
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg backdrop-blur-sm">
                      <div className="border-b border-gray-50 bg-gradient-to-r from-primary/5 to-transparent px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name}
                        </p>
                        <p className="mt-1 truncate text-xs text-gray-500">
                          {user?.email}
                        </p>
                      </div>

                      <div className="space-y-1 p-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50/80"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <i className="bx bx-user-circle text-lg text-primary/80" />
                          <span>Tài khoản của tôi</span>
                        </Link>

                        <Link
                          href="/orders"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50/80"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <i className="bx bx-package text-lg text-primary/80" />
                          <span>Đơn hàng của tôi</span>
                        </Link>

                        <Link
                          href="/wishlist"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50/80"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <i className="bx bx-heart text-lg text-primary/80" />
                          <span>Danh sách yêu thích</span>
                        </Link>

                        {user?.role === "admin" && (
                          <Link
                            href="/admin"
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50/80"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <i className="bx bx-cog text-lg text-primary/80" />
                            <span>Quản trị viên</span>
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-gray-50 p-2">
                        <button
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            handleLogout();
                          }}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50/80"
                        >
                          <i className="bx bx-log-out text-lg" />
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="group flex items-center gap-1.5 rounded-full px-2 py-1.5 text-gray-700 transition-all hover:bg-primary/5 hover:text-primary"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/20 ring-2 ring-white transition-all group-hover:ring-primary/5">
                    <i className="bx bx-user text-primary" />
                  </div>
                  <span className="hidden text-sm font-medium md:block">
                    Đăng nhập
                  </span>
                </Link>
              )}

              <Link
                href="/wishlist"
                className="group relative rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-50/80 hover:text-primary"
                aria-label="Danh sách yêu thích"
              >
                <i className="bx bx-heart text-xl transition-transform group-hover:scale-110" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-xs font-medium text-white shadow-sm">
                  {WishListItem.length}
                </span>
              </Link>

              <button
                className="group relative rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-50/80 hover:text-primary"
                onClick={() => setIsCartOpen(true)}
                aria-label="Giỏ hàng"
              >
                <i className="bx bx-cart text-xl transition-transform group-hover:scale-110" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-primary to-green-500 text-xs font-medium text-white shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                className="group rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-50/80 hover:text-primary md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
              >
                <i
                  className={`bx ${isMobileMenuOpen ? "bx-x" : "bx-menu"} text-xl transition-transform group-hover:scale-110`}
                />
              </button>
            </div>
          </div>

          {/* Category menu */}
          <nav className="hidden border-t border-gray-100 shadow-sm md:block">
            <ul className="flex justify-center space-x-8 py-3 text-sm font-medium">
              <li>
                <Link
                  href="/"
                  className={`group inline-flex items-center rounded-md px-3 py-2 transition-colors hover:bg-gray-50/80 hover:text-primary ${location === "/" ? "font-medium text-primary" : "text-gray-700"}`}
                >
                  <i className="bx bx-home-alt mr-1.5 text-lg transition-transform group-hover:scale-110" />
                  <span className="relative">
                    Trang chủ
                    {location === "/" && (
                      <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-primary" />
                    )}
                  </span>
                </Link>
              </li>
              <li
                className="relative"
                ref={categoryDropdownRef}
              >
                <button
                  className={`group flex items-center rounded-md px-3 py-2 transition-colors ${isCategoryDropdownOpen ? "bg-gray-50/80 text-primary" : "text-gray-700 hover:bg-gray-50/80 hover:text-primary"}`}
                  onClick={() =>
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                >
                  <i className="bx bx-category mr-1.5 text-lg transition-transform group-hover:scale-110" />
                  <span>Danh mục</span>
                  <i
                    className={`bx ${isCategoryDropdownOpen ? "bx-chevron-up" : "bx-chevron-down"} ml-1.5 text-sm opacity-70 transition-transform`}
                  />
                </button>

                {isCategoryDropdownOpen && (
                  <div className="absolute left-0 z-40 mt-1 w-64 rounded-md border border-gray-100 bg-white py-2 shadow-lg">
                    <div className="mb-1 border-b border-gray-50 px-4 py-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        Danh mục sản phẩm
                      </h3>
                      <p className="mt-0.5 text-xs text-gray-500">
                        Khám phá sản phẩm theo từng danh mục
                      </p>
                    </div>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/products?categoryId=${category.id}` as Route}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50/80 hover:text-primary"
                        onClick={() => setIsCategoryDropdownOpen(false)}
                      >
                        <div className="h-7 w-7 flex-shrink-0 overflow-hidden rounded-full border border-gray-100">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span>{category.name}</span>
                        <span className="ml-auto rounded-full bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
                          {category.productCount}
                        </span>
                      </Link>
                    ))}
                    <div className="my-1 border-t border-gray-50 pt-1" />
                    <Link
                      href="/categories"
                      className="group flex items-center px-4 py-2 text-sm font-medium text-primary hover:bg-gray-50/80"
                      onClick={() => setIsCategoryDropdownOpen(false)}
                    >
                      <span>Xem tất cả</span>
                      <i className="bx bx-right-arrow-alt ml-1 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                )}
              </li>
              <li>
                <Link
                  href="/products"
                  className={`group inline-flex items-center rounded-md px-3 py-2 transition-colors hover:bg-gray-50/80 hover:text-primary ${location === "/products" ? "font-medium text-primary" : "text-gray-700"}`}
                >
                  <i className="bx bx-store mr-1.5 text-lg transition-transform group-hover:scale-110" />
                  <span className="relative">
                    Sản phẩm
                    {location === "/products" && (
                      <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-primary" />
                    )}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`group inline-flex items-center rounded-md px-3 py-2 transition-colors hover:bg-gray-50/80 hover:text-primary ${location === "/blog" ? "font-medium text-primary" : "text-gray-700"}`}
                >
                  <i className="bx bx-book-open mr-1.5 text-lg transition-transform group-hover:scale-110" />
                  <span className="relative">
                    Hướng dẫn trồng
                    {location === "/blog" && (
                      <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-primary" />
                    )}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`group inline-flex items-center rounded-md px-3 py-2 transition-colors hover:bg-gray-50/80 hover:text-primary ${location === "/about" ? "font-medium text-primary" : "text-gray-700"}`}
                >
                  <i className="bx bx-info-circle mr-1.5 text-lg transition-transform group-hover:scale-110" />
                  <span className="relative">
                    Về chúng tôi
                    {location === "/about" && (
                      <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-primary" />
                    )}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`group inline-flex items-center rounded-md px-3 py-2 transition-colors hover:bg-gray-50/80 hover:text-primary ${location === "/contact" ? "font-medium text-primary" : "text-gray-700"}`}
                >
                  <i className="bx bx-envelope mr-1.5 text-lg transition-transform group-hover:scale-110" />
                  <span className="relative">
                    Liên hệ
                    {location === "/contact" && (
                      <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-primary" />
                    )}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile menu */}
          <div
            className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} absolute left-0 top-full z-50 max-h-[80vh] w-full overflow-y-auto border-t border-gray-200 bg-white shadow-lg`}
          >
            <div className="p-4">
              <div className="mb-4 flex justify-center">
                <Logo size="small" />
              </div>
              <div className="relative mb-5 w-full">
                <SearchBar isMobile={true} />
              </div>

              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className={`flex items-center rounded-md px-3 py-2.5 hover:bg-gray-50 ${location === "/" ? "font-medium text-primary" : "text-gray-700"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="bx bx-home-alt mr-3 text-lg" />
                    Trang chủ
                  </Link>
                </li>

                <li className="relative">
                  <button
                    className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-50"
                    onClick={() =>
                      setIsMobileCategoryOpen(!isMobileCategoryOpen)
                    }
                  >
                    <div className="flex items-center">
                      <i className="bx bx-category mr-3 text-lg" />
                      <span>Danh mục sản phẩm</span>
                    </div>
                    <i
                      className={`bx ${isMobileCategoryOpen ? "bx-chevron-up" : "bx-chevron-down"} transition-transform`}
                    />
                  </button>

                  <div
                    className={`${isMobileCategoryOpen ? "block" : "hidden"} mb-1 ml-7 mt-1 space-y-1 border-l-2 border-gray-200 pl-4`}
                  >
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}` as Route}
                        className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="mr-2 h-5 w-5 rounded-full object-cover"
                        />
                        {category.name}
                      </Link>
                    ))}
                    <Link
                      href="/categories"
                      className="flex items-center rounded-md px-3 py-2 font-medium text-primary hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Xem tất cả danh mục
                      <i className="bx bx-right-arrow-alt ml-1" />
                    </Link>
                  </div>
                </li>

                <li>
                  <Link
                    href="/products"
                    className={`flex items-center rounded-md px-3 py-2.5 hover:bg-gray-50 ${location === "/products" ? "font-medium text-primary" : "text-gray-700"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="bx bx-store mr-3 text-lg" />
                    Sản phẩm
                  </Link>
                </li>

                <li>
                  <Link
                    href="/blog"
                    className={`flex items-center rounded-md px-3 py-2.5 hover:bg-gray-50 ${location === "/blog" ? "font-medium text-primary" : "text-gray-700"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="bx bx-book-open mr-3 text-lg" />
                    Hướng dẫn trồng
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className={`flex items-center rounded-md px-3 py-2.5 hover:bg-gray-50 ${location === "/about" ? "font-medium text-primary" : "text-gray-700"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="bx bx-info-circle mr-3 text-lg" />
                    Về chúng tôi
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className={`flex items-center rounded-md px-3 py-2.5 hover:bg-gray-50 ${location === "/contact" ? "font-medium text-primary" : "text-gray-700"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="bx bx-envelope mr-3 text-lg" />
                    Liên hệ
                  </Link>
                </li>

                <li className="my-2 border-t border-gray-200 pt-2">
                  <Link
                    href="/wishlist"
                    className="flex items-center rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="bx bx-heart mr-3 text-lg" />
                    Danh sách yêu thích
                  </Link>
                </li>

                {isAuthenticated ? (
                  <React.Fragment>
                    <li className="my-2 border-t border-gray-200 pt-2">
                      <div className="flex items-center px-3 py-2.5">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <i className="bx bx-user text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                    </li>

                    <li>
                      <Link
                        href="/profile"
                        className="flex items-center rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="bx bx-user-circle mr-3 text-lg" />
                        Tài khoản của tôi
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/orders"
                        className="flex items-center rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="bx bx-package mr-3 text-lg" />
                        Đơn hàng của tôi
                      </Link>
                    </li>

                    {user?.role === "admin" && (
                      <li>
                        <Link
                          href="/admin"
                          className="flex items-center rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <i className="bx bx-cog mr-3 text-lg" />
                          Quản trị viên
                        </Link>
                      </li>
                    )}

                    <li>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // logout();
                        }}
                        className="flex w-full items-center rounded-md px-3 py-2.5 text-red-600 hover:bg-red-50"
                      >
                        <i className="bx bx-log-out mr-3 text-lg" />
                        Đăng xuất
                      </button>
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li className="my-2 border-t border-gray-200 pt-2">
                      <Link
                        href="/login"
                        className="flex items-center rounded-md bg-primary/10 px-3 py-2.5 font-medium text-primary hover:bg-primary/20"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="bx bx-log-in mr-3 text-lg" />
                        Đăng nhập
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/register"
                        className="flex items-center rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <i className="bx bx-user-plus mr-3 text-lg" />
                        Đăng ký
                      </Link>
                    </li>
                  </React.Fragment>
                )}
              </ul>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <a
                    href="tel:+84987654321"
                    className="flex items-center"
                  >
                    <i className="bx bx-phone mr-1 text-lg" />
                    Hotline: 0987 654 321
                  </a>
                  <div className="flex items-center space-x-2">
                    <a
                      href="#"
                      aria-label="Facebook"
                      className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      <i className="bx bxl-facebook text-lg" />
                    </a>
                    <a
                      href="#"
                      aria-label="Instagram"
                      className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      <i className="bx bxl-instagram text-lg" />
                    </a>
                    <a
                      href="#"
                      aria-label="Youtube"
                      className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      <i className="bx bxl-youtube text-lg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Mobile overlay */}
      {(isMobileMenuOpen || isCartOpen) && (
        <div
          role="presentation"
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsCartOpen(false);
          }}
        />
      )}
    </React.Fragment>
  );
}
