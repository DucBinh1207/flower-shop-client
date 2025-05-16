import env from "@/configs/env";

const apiURL = env.APP_URL + "api/auth/token";

/**
 * Save accessToken for internal server
 *
 * @param data
 * @returns
 */
export async function saveAuthTokenForInternalServer(data: {
  accessToken: string;
}) {
  return fetch(apiURL, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  });
}

/**
 * Get accessToken from internal server
 *
 * @returns
 */
export async function getAuthTokenFromInternalServer(): Promise<string | null> {
  try {
    const response = await fetch(apiURL, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data: { authToken: string | null } = await response.json();

    return data.authToken;
  } catch {
    return null;
  }
}

/**
 * Delete accessToken from internal server
 *
 * @returns
 */
export async function deleteAuthTokenFromInternalServer() {
  return fetch(apiURL, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
    cache: "no-store",
  });
}
