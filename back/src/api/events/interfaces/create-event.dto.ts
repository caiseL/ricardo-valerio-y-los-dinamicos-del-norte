import { IsDate, IsJSON, IsUUID } from 'class-validator';

enum EventStatus {
}

export class CreateEventDto {
  @IsDate()
    startDate: Date;

  @IsDate()
    endDate: Date;

  @IsUUID()
    eventOptionId: string;

  @IsUUID()
    placeId: string;

  @IsJSON()
    details: any;
}
