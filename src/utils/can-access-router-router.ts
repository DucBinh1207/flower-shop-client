import env from "@/configs/env";

export default function canAccessRouteHandler(request: Request): boolean {
  const headers = request.headers;
  const method = request.method;

  return (
    (method.toLowerCase() === "get" ||
      Boolean(headers.get("origin")?.startsWith(env.APP_URL))) &&
    Boolean(headers.get("referer")?.startsWith(env.APP_URL)) &&
    headers.get("sec-fetch-mode") === "same-origin" &&
    headers.get("sec-fetch-site") === "same-origin"
  );
}
