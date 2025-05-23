import {
  pgTable,
  text,
  uuid,
  timestamp,
  decimal,
  jsonb,
} from 'drizzle-orm/pg-core';
import { clientsTable } from '../clients/client.entity';
import { eventOptionsTable } from '../event-options/event-option.entity';

export const eventsTable = pgTable('events', {
  id: uuid().primaryKey().defaultRandom(),
  clientId: uuid().references(() => clientsTable.id),
  eventOptionId: uuid().references(() => eventOptionsTable.id),
  // eventHallId: uuid().references(() => eventHall.id),
  start: timestamp(),
  end: timestamp(),
  cost: decimal({ precision: 10, scale: 2 }),
  progress: text(),
  details: jsonb(),
});

export type Event = typeof eventsTable.$inferSelect;
