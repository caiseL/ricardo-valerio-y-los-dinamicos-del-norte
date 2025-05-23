import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UserEventOptions {
  @IsNumber()
    attendees: number;

  @IsBoolean()
    catering: boolean;

  @IsString()
    menu: string;

  @IsString()
    music: string;
}

