import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

const envServer = envSchema.safeParse(process.env);

if (!envServer.success) {
  console.error(envServer.error.issues);
  throw new Error("There is an error with the server environment variables");
}

export const envConfig = envServer.data;
