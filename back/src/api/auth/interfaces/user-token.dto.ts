import { UserType } from './user-type.enum';

export interface UserTokenDto {
  userId: string;
  type: UserType
}
