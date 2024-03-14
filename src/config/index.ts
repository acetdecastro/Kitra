import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().min(1000),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
});

const envServer = envSchema.safeParse(process.env);

if (!envServer.success) {
  console.error(envServer.error.issues);
  throw new Error('There is an error with the server environment variables');
}

export const envConfig = envServer.data;
