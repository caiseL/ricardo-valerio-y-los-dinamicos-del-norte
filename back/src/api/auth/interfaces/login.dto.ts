import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { UserType } from './user-type.enum';

export class LoginDto {
  @IsEmail()
    email: string;

  @IsString()
  @Length(5, 20)
    password: string;

  @IsEnum(UserType)
    type: UserType;
}
