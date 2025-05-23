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
  name: text(),
  clientId: uuid().references(() => clientsTable.id),
  eventOptionId: uuid().references(() => eventOptionsTable.id),
  eventHallId: uuid().references(() => eventHallsTable.id),
  startDate: timestamp(),
  endDate: timestamp(),
  cost: decimal({ precision: 10, scale: 2 }),
  status: text(),
  details: jsonb(),
});

export type Event = typeof eventsTable.$inferSelect;
