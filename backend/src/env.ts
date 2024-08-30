import { config } from 'dotenv';
import { z, ZodError } from 'zod';
import { expand } from 'dotenv-expand';

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(5000),
  USER_EMAIL: z.string(),
  USER_PASSWORD: z.string(),
  CLIENT_MAIN_URL: z.string(),
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
