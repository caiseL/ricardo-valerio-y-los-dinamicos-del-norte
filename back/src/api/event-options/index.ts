import express, { Request, Response } from 'express';
import { eventOptionsTable } from './event-option.entity';
import database from '../../database';

const router = express.Router();

router.get<{}, {}>('/', async (_: Request, res: Response) => {
  const eventOptions = await database.select().from(eventOptionsTable);
  return res.status(200).send(eventOptions);
});

export default router;
