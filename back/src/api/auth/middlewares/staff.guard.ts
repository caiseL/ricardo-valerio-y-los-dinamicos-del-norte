import { NextFunction, Request, Response } from 'express';
import { UserType } from '../interfaces/user-type.enum';
import { UserTokenDto } from '../interfaces/user-token.dto';
import { userTokenValidator } from './user-token-validator';

export const staffGuard = async (req: Request, res: Response, next: NextFunction) => {
  const errorMessage = await userTokenValidator(req, res);
  if (errorMessage) {
    return res.status(401).json({
      message: errorMessage,
    });
  }

  const user = res.locals.user as UserTokenDto;

  if (!user) {
    return res.status(401).json({
      message: 'User not found',
    });
  }

  if (user.type !== UserType.STAFF) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  next();
};
