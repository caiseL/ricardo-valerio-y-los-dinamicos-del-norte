import { IsDate, IsEnum, IsJSON, IsUUID } from 'class-validator';
import { EventStatus } from './event-status.enum';

export class UpdateEventDto {
  @IsDate()
    startDate: Date;

  @IsDate()
    endDate: Date;

  @IsUUID()
    eventOptionId: string;

  @IsUUID()
    eventHallId: string;

  @IsJSON()
    details: any;

  @IsEnum(EventStatus)
    status: EventStatus;
}
