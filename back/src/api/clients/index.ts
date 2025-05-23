import express, { NextFunction, Request, Response } from 'express';
import { CreateClientDto } from './interfaces/create-client.dto';
import { validate } from 'class-validator';

const router = express.Router();

const createClientValidator = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'Invalid request body',
    });
  }

  const dto = new CreateClientDto();
  dto.name = req.body.name;
  dto.email = req.body.email;
  dto.password = req.body.password;
  dto.phoneNumber = req.body.phoneNumber;

  const validationError = await validate(dto);

  if (validationError.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: validationError,
    });
  }

  res.locals.client = dto;
  next();
};

router.post<{}, {}>('/', [createClientValidator], async (_: Request, res: Response) => {
  const clientDto: CreateClientDto = res.locals.client;
  console.log(clientDto);
});

export default router;

