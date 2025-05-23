import express, { Request, Response } from 'express';
import database from '../../database';
import { eventHallsTable } from './event-hall.entity';

const router = express.Router();

router.get<{}, {}>('/', async (_: Request, res: Response) => {
  const eventHalls = await database.select().from(eventHallsTable);
  return res.status(200).send(eventHalls);
});

export default router;

