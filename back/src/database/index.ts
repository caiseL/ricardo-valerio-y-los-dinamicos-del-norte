import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const databaseHost = process.env.POSTGRES_HOST || 'localhost';
const databasePort = process.env.POSTGRES_PORT || 5432;
const databaseUser = process.env.POSTGRES_USER || 'postgres';
const databasePassword = process.env.POSTGRES_PASSWORD || 'password';
const databaseName = process.env.POSTGRES_DB || 'postgres';


const connectionString = `postgres://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`;

const database = drizzle(
  connectionString,
  {
    logger: true,
  },
);

export default database;
