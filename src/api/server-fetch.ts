import env from "@/configs/env";
import { AUTH_TOKEN } from "@/constants/key";
import { cookies } from "next/headers";

const BASE_URL = env.API_BASE_URL;
const TIMEOUT = 60000; // 60 seconds
const DEFAULT_OPTIONS: RequestInit = {
  mode: "cors",
  credentials: "omit",
  cache: "no-store",
};

type Options = RequestInit & { params?: URLSearchParams };

async function serverFetch<TData = unknown>(
  endpoint: string,
  options: Options,
  authen?: boolean,
): Promise<{
  status: number;
  data: TData;
}> {
  const url = `${BASE_URL}${endpoint}`;

  const headers = new Headers(options.headers);

  if (options.method === "POST" || options.method === "PUT") {
    headers.set("Content-Type", "application/json");
  }

  if (authen) {
    const cookieStore = cookies();
    const token = cookieStore.get(AUTH_TOKEN);

    if (token) {
      headers.set("authorization", `Bearer ${token.value}`);
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      ...DEFAULT_OPTIONS,
      ...options,
      headers,
    });

    if (!response.ok) {
      const isResponseJson = response.headers
        .get("content-type")
        ?.includes("application/json");

      if (isResponseJson) {
        const json = await response.json();

        return Promise.reject(json);
      }

      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
      });
    }

    const json = await response.json();

    return {
      status: response.status,
      data: json as TData,
    };
  } catch (error) {
    const _error =
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
          }
        : {
            name: "unknown error",
            message: JSON.stringify(error),
          };

    return Promise.reject({ reason: _error });
    /* v8 ignore next */
  } finally {
    clearTimeout(timeoutId);
  }
}

export default serverFetch;
