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
import { eventHallsTable } from '../event-halls/event-hall.entity';

export const eventsTable = pgTable('events', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  clientId: uuid().references(() => clientsTable.id).notNull(),
  eventOptionId: uuid().references(() => eventOptionsTable.id).notNull(),
  eventHallId: uuid().references(() => eventHallsTable.id).notNull(),
  startDate: timestamp().notNull(),
  endDate: timestamp().notNull(),
  cost: decimal({ precision: 10, scale: 2 }).notNull(),
  status: text().notNull(),
  details: jsonb().notNull(),
});

export type Event = typeof eventsTable.$inferSelect;
