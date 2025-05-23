import express, { NextFunction, Request, Response } from 'express';
import { CreateEventDto } from './interfaces/create-event.dto';
import { validate } from 'class-validator';
import { Event, eventsTable } from './event.entity';
import { EventStatus } from './interfaces/event-status.enum';
import database from '../../database';
import { clientGuard } from '../auth/middlewares/client.guard';
import { UserTokenDto } from '../auth/interfaces/user-token.dto';
import { and, eq } from 'drizzle-orm';

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
  dto.eventHallId = req.body.eventHallId;
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

router.post<{}, {}>('/', [clientGuard, createEventValidator], async (_: Request, res: Response) => {
  const eventDto = res.locals.event as CreateEventDto;
  const token = res.locals.user as UserTokenDto;

  const { startDate, endDate, eventOptionId, eventHallId, details } = eventDto;

  const status = EventStatus.PENDING;
  const event = await database.insert(eventsTable).values({
    clientId: token.userId,
    startDate,
    endDate,
    eventHallId,
    eventOptionId,
    cost: '0',
    status: EventStatus.PENDING,
    details,
  }).returning();

  if (!event) {
    return res.status(500).json({
      message: 'Error creating staff',
    });
  }

  const id = event[0].id;
  return res.status(201).json({
    message: 'Event created successfully',
    event: {
      id,
      startDate,
      endDate,
      eventOptionId,
      eventHallId,
      cost: 0,
      status,
      details,
    },
  });
});

router.get('/me', async (_: Request, res: Response) => {
  const token = res.locals.user as UserTokenDto;
  const events: Event[] = await database.select().from(eventsTable).where(
    eq(
      eventsTable.clientId,
      token.userId,
    ),
  );
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

router.get(':/:eventId', [clientGuard, getEventValidator], async (req: Request, res: Response) => {
  const eventId = res.locals.eventId;
  const token = res.locals.user as UserTokenDto;

  const event: Event[] = await database.select().from(eventsTable).where(
    and(
      eq(
        eventsTable.clientId,
        token.userId,
      ),
      eq(
        eventsTable.id,
        eventId,
      ),
    ),
  );
  if (!event) {
    return res.status(404).json({
      message: 'Event not found',
    });
  }

  return res.status(200).json({
    event,
  });
});

router.put<{}, {}>('/:eventId', [clientGuard, createEventValidator, getEventValidator], async (req: Request, res: Response) => {
  const eventId = res.locals.eventId;
  const eventDto: CreateEventDto = req.body;
  const token = res.locals.user as UserTokenDto;

  const { startDate, endDate, eventOptionId, eventHallId, details } = eventDto;

  const event: Event[] = await database.update(eventsTable).set({
    startDate,
    endDate,
    eventOptionId,
    eventHallId,
    details,
  }).where(
    and(
      eq(
        eventsTable.clientId,
        token.userId,
      ),
      eq(
        eventsTable.id,
        eventId,
      ),
    ),
  ).returning();

  if (!event) {
    return res.status(404).json({
      message: 'Event not found',
    });
  }

  return res.status(200).json({
    message: 'Event updated successfully',
  });
});

router.delete<{}, {}>('/:eventId', [clientGuard, getEventValidator], async (req: Request, res: Response) => {
  const eventId = res.locals.eventId;
  const token = res.locals.user as UserTokenDto;

  const event: Event[] = await database.delete(eventsTable).where(
    and(
      eq(
        eventsTable.clientId,
        token.userId,
      ),
      eq(
        eventsTable.id,
        eventId,
      ),
    ),
  ).returning();

  if (!event) {
    return res.status(404).json({
      message: 'Event not found',
    });
  }

  return res.status(200).json({
    message: 'Event deleted successfully',
  });
});

export default router;
