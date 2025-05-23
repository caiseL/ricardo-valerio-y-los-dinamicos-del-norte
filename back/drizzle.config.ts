import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const databaseHost = process.env.POSTGRES_HOST || 'localhost';
const databasePort = process.env.POSTGRES_PORT || 5432;
const databaseUser = process.env.POSTGRES_USER || 'postgres';
const databasePassword = process.env.POSTGRES_PASSWORD || 'password';
const databaseName = process.env.POSTGRES_DB || 'postgres';

const url = `postgres://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`;

export default defineConfig({
  out: './migrations',
  schema: './src/**/*.entity.ts',
  dialect: 'postgresql',
  dbCredentials: { url },
});
