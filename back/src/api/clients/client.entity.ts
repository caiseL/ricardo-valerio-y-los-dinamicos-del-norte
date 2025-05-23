import {
  pgTable,
  text,
  uuid,
} from 'drizzle-orm/pg-core';

export const clientsTable = pgTable('clients', {
  id: uuid().primaryKey().defaultRandom(),
  email: text(),
  name: text(),
  password: text(),
  phoneNumber: text(),
});

export type Client = typeof clientsTable.$inferSelect;
