import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  decimal,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// EVENT_HALL Table
export const eventHall = pgTable('event_hall', {
  id: serial('ID').primaryKey().notNull(),
  name: text('NAME'),
  location: text('LOCATION'),
});

// CLIENTS Table
export const clients = pgTable('CLIENTS', {
  id: serial('ID').primaryKey().notNull(),
  email: text('EMAIL'), 
  name: text('NAME'),
  password: text('PASSWORD'), 
  phone: text('PHONE'),
});

// STAFF Table
export const staff = pgTable('STAFF', {
  id: serial('ID').primaryKey().notNull(),
  email: text('EMAIL'),
  name: text('NAME'),
  password: text('PASSWORD'), 
  phone: text('PHONE'), 
  shift: text('SHIFT'),
});

// EVENT_OPTION Table
export const eventOption = pgTable('EVENT_OPTION', {
  id: serial('ID').primaryKey().notNull(),
  name: text('NAME'),
  restrictions: jsonb('RESTRICTIONS'), 
});

// PLACES Table (Define before EVENT because EVENT references it)
export const places = pgTable('PLACES', {
  id: serial('ID').primaryKey().notNull(),
  name: text('NAME'),
});

// EVENT Table
export const event = pgTable('EVENT', {
  id: serial('ID').primaryKey().notNull(),
  clientId: integer('CLIENT_ID').references(() => clients.id),
  eventHallId: integer('EVENT_HALL_ID').references(() => eventHall.id),
  start: timestamp('START'), 
  end: timestamp('END'),    
  cost: decimal('COST', { precision: 10, scale: 2 }),
  progress: text('PROGRESS'),
  eventOptionId: integer('EVENT_OPTION').references(() => eventOption.id),
  placeId: integer('PLACE').references(() => places.id), 
  details: jsonb('DETAILS'), 
});

// --- RELATIONS ---
export const salonRelations = relations(eventHall, ({ many }) => ({
  // Example: if salon had staff or events directly associated
  // staff: many(staff),
  // events: many(event),
}));

export const clientsRelations = relations(clients, ({ many }) => ({
  events: many(event), // A client can have many events
}));

export const staffRelations = relations(staff, ({ many }) => ({
  // Example: if staff were assigned to events
  // assignedEvents: many(eventAssignments), // (if you had an event_staff_assignment table)
}));

export const eventOptionRelations = relations(eventOption, ({ many }) => ({
  events: many(event), // An event option can be used in many events
}));

export const placesRelations = relations(places, ({ many }) => ({
  events: many(event), // A place can host many events
}));

export const eventRelations = relations(event, ({ one }) => ({
  client: one(clients, {
    fields: [event.clientId],
    references: [clients.id],
  }),
  eventOption: one(eventOption, {
    fields: [event.eventOptionId],
    references: [eventOption.id],
  }),
  place: one(places, {
    fields: [event.placeId],
    references: [places.id],
  }),
}));