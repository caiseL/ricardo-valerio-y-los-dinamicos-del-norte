import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class EventOptions {
  @IsNumber()
    attendees: number;

  @IsBoolean()
    catering: boolean;

  @IsNumber()
    costPerHour: number;

  @IsNumber()
    costPerAttendee: number;

  @IsNumber()
    cateringCostPerAttendee: number;

  @IsString({ each: true })
    musicOptions: string[];

  @IsString({ each: true })
    menuOptions: string[];
}
