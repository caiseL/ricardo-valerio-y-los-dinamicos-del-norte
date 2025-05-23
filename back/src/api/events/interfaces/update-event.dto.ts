import { IsDateString, IsEnum, IsUUID } from 'class-validator';
import { EventStatus } from './event-status.enum';

export class UpdateEventDto {
  @IsDateString()
    startDate: string;

  @IsDateString()
    endDate: string;

  @IsUUID()
    eventOptionId: string;

  @IsUUID()
    eventHallId: string;

  @IsEnum(EventStatus)
    status: EventStatus;

  details: any;
}
