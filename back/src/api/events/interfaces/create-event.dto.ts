import { IsDateString, IsUUID } from 'class-validator';

export class CreateEventDto {
  @IsDateString()
    startDate: string;

  @IsDateString()
    endDate: string;

  @IsUUID()
    eventOptionId: string;

  @IsUUID()
    eventHallId: string;

  details: any;
}
