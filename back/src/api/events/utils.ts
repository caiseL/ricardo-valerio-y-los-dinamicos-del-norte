import { CreateEventDto } from './interfaces/create-event.dto';
import { EventOptions } from './interfaces/event-options.dto';

const comissionPercentage = 0.1; // 10%

export const calculateEventTotalCost = (createEventDto: CreateEventDto, eventOptions: EventOptions): number => {
  const userEventOptions = createEventDto.details;

  const startDate = new Date(createEventDto.startDate);
  const endDate = new Date(createEventDto.endDate);

  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
  const durationCost = eventOptions.costPerHour * durationInHours;

  const attendees = userEventOptions.attendees;
  const attendeeCost = eventOptions.costPerAttendee * attendees;

  const cateringCost = userEventOptions.catering ? eventOptions.cateringCostPerAttendee * attendees : 0;

  const baseCost = eventOptions.baseCost;
  const totalCost = baseCost + durationCost + attendeeCost + cateringCost;
  const commission = totalCost * comissionPercentage;
  return totalCost + commission;
};
