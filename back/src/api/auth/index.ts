import express, { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { LoginDto } from './interfaces/login.dto';

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
  console.log(loginDto);
});

router.get('/me', async (req: Request, res: Response) => {
  // TODO: use access token to get user info
});

export default router;

