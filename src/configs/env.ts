import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  API_BASE_URL: z.string().url(),
  APP_URL: z.string().url(),
});

const parsedEnv = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

const IS_DEVELOPMENT_ENV = parsedEnv.NODE_ENV === "development";

const IS_PRODUCTION_ENV = parsedEnv.NODE_ENV === "production";

const IS_TEST_ENV = parsedEnv.NODE_ENV === "test";

const env = {
  ...parsedEnv,
  IS_DEVELOPMENT_ENV,
  IS_PRODUCTION_ENV,
  IS_TEST_ENV,
};

export default env;
