import zod from 'zod';

const envSchema = zod.object({
  PORT: zod.string(),
  DB_NAME: zod.string(),
  DB_PORT: zod.string(),
  DB_USER: zod.string(),
  DB_PASS: zod.string(),
  DB_HOST: zod.string(),
  SECRETKEY: zod.string(),
});

export const env = envSchema.parse(process.env);
