import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthConfig } from '../../../config/auth.config';
import { UserTokenDto } from '../interfaces/user-token.dto';

export const userTokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers;

  if (!headers.authorization) {
    return res.status(401).json({
      message: 'Authorization header is missing',
    });
  }

  const token = headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Token is missing',
    });
  }

  const jwtSecret = AuthConfig.jwtSecret();
  const decoded = verify(token, jwtSecret);
  if (!decoded) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }

  const userToken: UserTokenDto = decoded as UserTokenDto;
  res.locals.user = userToken;
};
