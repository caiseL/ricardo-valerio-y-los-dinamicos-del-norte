import { IsDate, IsJSON, IsUUID } from 'class-validator';

export class CreateEventDto {
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
}
