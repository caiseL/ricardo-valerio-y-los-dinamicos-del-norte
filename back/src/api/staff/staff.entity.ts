import {
  pgTable,
  text,
  boolean,
  uuid,
} from 'drizzle-orm/pg-core';

export const staffTable = pgTable('staff', {
  id: uuid().primaryKey().defaultRandom(),
  email: text(),
  name: text(),
  password: text(),
  phoneNumber: text(),
  isItMorningShift: boolean().default(false),
});
