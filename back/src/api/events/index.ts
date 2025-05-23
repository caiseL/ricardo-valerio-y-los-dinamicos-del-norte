import express, { NextFunction, Request, Response } from 'express';
import { CreateEventDto } from './interfaces/create-event.dto';
import { validate } from 'class-validator';
import { Event, eventsTable } from './event.entity';
import { EventStatus } from './interfaces/event-status.enum';
import database from '../../database';
import { clientGuard } from '../auth/middlewares/client.guard';
import { UserTokenDto } from '../auth/interfaces/user-token.dto';
import { and, between, eq } from 'drizzle-orm';
import { eventHallsTable } from '../event-halls/event-hall.entity';
import { UpdateEventDto } from './interfaces/update-event.dto';
import { eventOptionsTable } from '../event-options/event-option.entity';

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

  const eventHallExists = await database.select().from(eventHallsTable).where(
    eq(
      eventHallsTable.id,
      eventHallId,
    ),
  );
  if (!eventHallExists || eventHallExists.length === 0) {
    return res.status(404).json({
      message: 'Event hall not found',
    });
  }

  const eventOptionExists = await database.select().from(eventOptionsTable).where(
    eq(
      eventOptionsTable.id,
      eventOptionId,
    ),
  );
  if (!eventOptionExists || eventOptionExists.length === 0) {
    return res.status(404).json({
      message: 'Event option not found',
    });
  }

  // TODO: do json validation on detals and eventOption.restrictions

  if (endDate < startDate) {
    return res.status(400).json({
      message: 'End date must be greater than start date',
    });
  }

  const isEventHallOccupied = await database.select().from(eventsTable).where(
    and(
      eq(
        eventsTable.eventHallId,
        eventHallId,
      ),
      between(
        eventsTable.startDate,
        new Date(startDate),
        new Date(endDate),
      ),
    ),
  );
  if (isEventHallOccupied.length > 0) {
    return res.status(400).json({
      message: 'Event hall is already occupied',
    });
  }

  const cost = 0;
  const status = EventStatus.PENDING;
  const event = await database.insert(eventsTable).values({
    clientId: token.userId,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    eventHallId,
    eventOptionId,
    cost: cost.toString(),
    status,
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
      cost,
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

const updateEventValidator = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'Invalid request body',
    });
  }

  const dto = new UpdateEventDto();
  dto.startDate = req.body.startDate;
  dto.endDate = req.body.endDate;
  dto.eventOptionId = req.body.eventOptionId;
  dto.eventHallId = req.body.eventHallId;
  dto.details = req.body.details;
  dto.status = req.body.status;

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


router.put<{}, {}>('/:eventId', [clientGuard, updateEventValidator, getEventValidator], async (req: Request, res: Response) => {
  const eventId = res.locals.eventId;
  const eventDto: UpdateEventDto = req.body;
  const token = res.locals.user as UserTokenDto;

  const { startDate, endDate, eventOptionId, eventHallId, status, details } = eventDto;

  const event: Event[] = await database.update(eventsTable).set({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    eventOptionId,
    eventHallId,
    details,
    status,
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
