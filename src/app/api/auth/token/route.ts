import env from "@/configs/env";
import { AUTH_TOKEN } from "@/constants/key";
import canAccessRouteHandler from "@/utils/can-access-router-router";
import isNumber from "@/utils/is-number";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { z } from "zod";

const postRequestBodySchema = z.object({
  accessToken: z.string(),
});

const defaultCookieOptions = {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secure: env.IS_PRODUCTION_ENV,
} as const;

/**
 * Store token into the server cookie
 *
 * @param request
 * @returns
 */
export async function POST(request: Request) {
  if (!canAccessRouteHandler(request)) {
    return Response.json({ message: "failed" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const body = postRequestBodySchema.parse(json);
    const decoded = jwtDecode(body.accessToken);
    const expires = isNumber(decoded.exp) ? decoded.exp * 1000 : undefined;

    cookies().set({
      ...defaultCookieOptions,
      name: AUTH_TOKEN,
      value: body.accessToken,
      expires,
    });

    return Response.json({ message: "saved" });
  } catch (error) {
    return Response.json({ message: "failed" }, { status: 400 });
  } finally {
  }
}

/**
 * Get token from the server cookie
 *
 * @param request
 * @returns
 */
export async function GET(request: Request) {
  if (!canAccessRouteHandler(request)) {
    return Response.json({ message: "failed" }, { status: 403 });
  }

  try {
    const authToken = cookies().get(AUTH_TOKEN)?.value ?? null;

    return Response.json({ message: "ok", authToken });
  } catch (error) {
    return Response.json({ message: "failed" }, { status: 400 });
  } finally {
  }
}

/**
 * Delete token from the server cookie
 *
 * @param request
 * @returns
 */
export async function DELETE(request: Request) {
  if (!canAccessRouteHandler(request)) {
    return Response.json({ message: "failed" }, { status: 403 });
  }

  try {
    cookies().delete({
      ...defaultCookieOptions,
      name: AUTH_TOKEN,
    });

    return Response.json({ message: "deleted" });
  } catch (error) {
    return Response.json({ message: "failed" }, { status: 400 });
  } finally {
  }
}
