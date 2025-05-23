import express, { Request, Response } from 'express';
import { EventOption } from './event-option';

const router = express.Router();

router.get<{}, {}>('/', async (_: Request, res: Response) => {
  const eventOptions: EventOption[] = [
    {
      id: '1',
    },
  ];
  res.status(200).send(eventOptions);
});

export default router;
