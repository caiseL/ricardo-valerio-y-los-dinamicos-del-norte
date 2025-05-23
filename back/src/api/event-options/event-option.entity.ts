import {
  pgTable,
  text,
  uuid,
  jsonb,
} from 'drizzle-orm/pg-core';

export const eventOptionsTable = pgTable('event_options', {
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
  options: jsonb(),
});

export type EventOption = typeof eventOptionsTable.$inferSelect;
