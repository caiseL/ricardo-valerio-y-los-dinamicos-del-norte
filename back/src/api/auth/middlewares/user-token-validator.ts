import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthConfig } from '../../../config/auth.config';
import { UserTokenDto } from '../interfaces/user-token.dto';

export const userTokenValidator = async (req: Request, res: Response) => {
  const headers = req.headers;

  if (!headers.authorization) {
    return 'Authorization header is missing';
  }

  const token = headers.authorization.split(' ')[1];
  if (!token) {
    return 'Token is missing';
  }

  const jwtSecret = AuthConfig.jwtSecret();
  const decoded = verify(token, jwtSecret);
  if (!decoded) {
    return 'Invalid token';
  }

  const userToken: UserTokenDto = decoded as UserTokenDto;
  res.locals.user = userToken;
};
