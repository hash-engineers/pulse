import { config } from 'dotenv';
import { z, ZodError } from 'zod';
import { expand } from 'dotenv-expand';

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(5000),
  BCRYPT_SALT_ROUND: z.coerce.number(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),
  USER_EMAIL: z.string(),
  USER_PASS: z.string(),
  BASE_URL: z.string(),
  DEFAULT_APP_REDIRECT_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  REDIS_URI: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'missing required values in .env:\n';

    error.issues.forEach(issue => (message += issue.path[0] + '\n'));

    const err = new Error(message);
    err.stack = '';
    throw err;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);
