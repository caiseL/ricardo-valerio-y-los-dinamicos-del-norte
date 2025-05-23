import express, { NextFunction, Request, Response } from 'express';
import { CreateEventDto } from './interfaces/create-event.dto';
import { validate } from 'class-validator';
import { Event } from './event';

const router = express.Router();

const createEventValidator = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'Invalid request body',
    });
  }

  const dto = new CreateEventDto();
  dto.startDate = req.body.startDate;
  dto.endDate = req.body.endDate;
  dto.eventOptionId = req.body.eventOptionId;
  dto.placeId = req.body.placeId;
  dto.details = req.body.details;

  const validationError = await validate(dto);

  if (validationError.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: validationError,
    });
  }

  res.locals.event = dto;
  next();
};

router.post<{}, {}>('/', [createEventValidator], async (_: Request, res: Response) => {
  const eventDto: CreateEventDto = res.locals.event;
  console.log(eventDto);
});



router.get('/me', async (_: Request, res: Response) => {
  const events: Event[] = [];
  return res.status(200).json({
    events,
  });
});

const getEventValidator = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.eventId;
  if (!eventId) {
    return res.status(400).json({
      message: 'Invalid request body',
    });
  }

  res.locals.eventId = eventId;
  next();
};

router.get(':/:eventId', [getEventValidator], async (req: Request, res: Response) => {
  const eventId = res.locals.eventId;
  const event: Event = {
    id: eventId,
    name: 'Sample Event',
    description: 'Sample Description',
    date: new Date(),
    location: 'Sample Location',
    organizerId: '1',
  };

  return res.status(200).json({
    event,
  });
});

router.put<{}, {}>('/:eventId', [createEventValidator, getEventValidator], async (req: Request, res: Response) => {
  const eventId = res.locals.eventId;
  const eventDto: CreateEventDto = req.body;

  console.log(eventId, eventDto);
  return res.status(200).json({
    message: 'Event updated successfully',
  });
});

router.delete<{}, {}>('/:eventId', [getEventValidator], async (req: Request, res: Response) => {
  const eventId = res.locals.eventId;

  console.log(eventId);
  return res.status(200).json({
    message: 'Event deleted successfully',
  });
});

export default router;
