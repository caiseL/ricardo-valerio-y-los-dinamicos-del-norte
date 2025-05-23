import express, { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { LoginDto } from './interfaces/login.dto';
import { sign, verify } from 'jsonwebtoken';
import { AuthConfig } from '../../config/auth.config';
import { UserTokenDto } from './interfaces/user-token.dto';

const router = express.Router();

const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'Invalid request body',
    });
  }

  const dto = new LoginDto();
  dto.email = req.body.email;
  dto.password = req.body.password;
  dto.type = req.body.type;

  const validationError = await validate(dto);

  if (validationError.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: validationError,
    });
  }

  res.locals.login = dto;
  next();
};

router.post<{}, {}>('/login', [loginValidator], async (_: Request, res: Response) => {
  const loginDto: LoginDto = res.locals.login;

  // TODO: check in database if email and password match anyone using type

  // they match, then
  const payload: UserTokenDto = {
    userId: '1',
    type: loginDto.type,
  };
  const jwtSecret = AuthConfig.jwtSecret();
  const accessToken = sign(payload, jwtSecret, {
    expiresIn: '8h',
  });

  return res.status(200).json({
    accessToken,
  });
});

const userAuthenticator = async (req: Request, res: Response, next: NextFunction) => {
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
  next();
};


router.get('/me', [userAuthenticator], async (_: Request, res: Response) => {
  const user = res.locals.user as UserTokenDto;
  res.status(200).json({
    userId: user.userId,
    type: user.type,
  });
});

export default router;
