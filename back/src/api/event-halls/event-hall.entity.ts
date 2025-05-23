import {
  pgTable,
  text,
  uuid,
} from 'drizzle-orm/pg-core';

export const eventHallsTable = pgTable('event_halls', {
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
});

export type EventHall = typeof eventHallsTable.$inferSelect;
