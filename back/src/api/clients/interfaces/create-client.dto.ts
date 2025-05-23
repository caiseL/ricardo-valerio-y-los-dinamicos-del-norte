import { IsEmail, IsNumberString, IsString, Length } from 'class-validator';

export class CreateClientDto {
  @IsEmail()
    email: string;

  @IsString()
  @Length(5, 20)
    name: string;

  @IsString()
  @Length(8, 20)
    password: string;

  @IsNumberString()
  @Length(10)
    phoneNumber: string;
}
