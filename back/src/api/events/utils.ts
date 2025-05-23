import { CreateEventDto } from './interfaces/create-event.dto';

const comissionPercentage = 0.1; // 10%

export const calculateEventTotalCost = (createEventDto: CreateEventDto): number => {
  const startDate = new Date(createEventDto.startDate);
  const endDate = new Date(createEventDto.endDate);

  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
  const durationCost = createEventDto.details.costPerHour * durationInHours;

  const attendees = createEventDto.details.attendees;
  const attendeeCost = createEventDto.details.costPerAttendee * attendees;

  const cateringCost = createEventDto.details.catering ? createEventDto.details.cateringCostPerAttendee * createEventDto.details.attendees : 0;

  const totalCost = durationCost + attendeeCost + cateringCost;
  const commission = totalCost * comissionPercentage;
  return totalCost + commission;
};
