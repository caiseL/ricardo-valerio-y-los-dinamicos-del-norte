import express, { Request, Response } from 'express';
import { EventOption } from './event-option.entity';

const router = express.Router();

router.get<{}, {}>('/', async (_: Request, res: Response) => {
  const eventOptions: EventOption[] = [
    {
      id: '1',
      name: 'Wedding',
      restrictions: {},
    },
  ];
  res.status(200).send(eventOptions);
});

export default router;
