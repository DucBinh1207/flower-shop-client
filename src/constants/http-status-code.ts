export const HttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SYSTEM_ERROR: 500,
  MAINTENANCE_ERROR: 503,
} as const;

export type HttpStatusCodeType =
  (typeof HttpStatusCode)[keyof typeof HttpStatusCode];
