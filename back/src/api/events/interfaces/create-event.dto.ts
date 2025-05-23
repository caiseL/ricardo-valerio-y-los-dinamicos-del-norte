import 'reflect-metadata';

import { IsDateString, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserEventOptions } from './user-event-options.dto';


export class CreateEventDto {
  @IsString()
    name: string;

  @IsDateString()
    startDate: string;

  @IsDateString()
    endDate: string;

  @IsUUID()
    eventOptionId: string;

  @IsUUID()
    eventHallId: string;

  @ValidateNested({
    each: true,
  })
  @Type(() => UserEventOptions)
    details: UserEventOptions;
}
