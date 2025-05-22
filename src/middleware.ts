import { NextResponse } from "next/server";

import type { MiddlewareConfig, NextMiddleware } from "next/server";
import isUndefined from "./utils/is-undefined";
import { AdminRoute, ProtectedRoute, PublicRoute } from "./constants/route";
import serverFetch from "./api/server-fetch";
import { DataResponse } from "./api/type";
import { User } from "./types";
import { AUTH_TOKEN } from "./constants/key";

const PROTECTED_PATHS = [
  ProtectedRoute.CART,
  ProtectedRoute.CHECKOUT,
  ProtectedRoute.ORDERS,
  ProtectedRoute.PROFILE,
  ProtectedRoute.WISHLIST,
];

const ADMIN_PATHS = [
  AdminRoute.DASHBOARD,
  AdminRoute.CATEGORIES,
  AdminRoute.PRODUCTS,
  AdminRoute.ORDERS,
];

export const middleware: NextMiddleware = async (request) => {
  const requestPathname = request.nextUrl.pathname;
  const authToken = request.cookies.get(AUTH_TOKEN)?.value;
  const response = NextResponse.next();

  // // check for absent token
  if (isUndefined(authToken)) {
    // access protected route -> redirect to login
    if (PROTECTED_PATHS.some((path) => requestPathname.startsWith(path))) {
      const redirectPath =
        request.nextUrl.pathname.replace(/^\//, "") + request.nextUrl.search;

      const searchParams = new URLSearchParams({
        redirect: redirectPath,
      });

      return NextResponse.redirect(
        new URL(PublicRoute.LOGIN + `?${searchParams.toString()}`, request.url),
      );
    }

    // access unprotected route
    return response;
  }

  // /**
  //  * token is existing
  //  */
  // check authentication
  try {
    const userData = await serverFetch<
      DataResponse<{
        user: User;
      }>
    >(`auth/profile`, {}, true);

    if (userData) {
      if (
        userData.data.data.user.role !== "admin" &&
        requestPathname.startsWith("/admin")
      ) {
        return NextResponse.redirect(new URL(PublicRoute.HOME, request.url));
      }
    }
  } catch (error) {
    if (
      [...PROTECTED_PATHS, ...ADMIN_PATHS].some((path) =>
        requestPathname.startsWith(path),
      )
    ) {
      return NextResponse.redirect(new URL(PublicRoute.HOME, request.url));
    }
  }

  // access protected route
  return response;
};

export const config: MiddlewareConfig = {
  matcher: [
    "/",
    "/blog",
    "/products",
    "/login",
    "/register",
    "/contact",
    "/cart",
    "/checkout",
    "/orders",
    "/profile",
    "/wishlist",
    "/admin/",
    "/admin/products",
    "/admin/categories",
    "/admin/orders",
  ],
};
