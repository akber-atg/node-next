import { loadEnvConfig } from '@next/env';
import { neon } from '@neondatabase/serverless';

// Forces Next.js to load .env.local, .env, etc., even when executed via tsx/node
const projectDir = process.cwd();
loadEnvConfig(projectDir);

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env.local');
}

export const sql = neon(process.env.DATABASE_URL);