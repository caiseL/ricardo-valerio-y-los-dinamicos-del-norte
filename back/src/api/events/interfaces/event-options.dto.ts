import { IsNumber, IsString } from 'class-validator';

export class EventOptions {
  @IsNumber()
    minAttendees: number;

  @IsNumber()
    maxAttendees: number;

  @IsNumber()
    baseCost: number;

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
