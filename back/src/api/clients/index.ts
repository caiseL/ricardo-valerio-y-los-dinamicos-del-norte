import express, { NextFunction, Request, Response } from 'express';
import { CreateClientDto } from './interfaces/create-client.dto';
import { validate } from 'class-validator';
import database from '../../database';
import { clientsTable } from './client.entity';

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
  const result = await database.insert(clientsTable).values(
    {
      name: clientDto.name,
      email: clientDto.email,
      password: clientDto.password,
      phoneNumber: clientDto.phoneNumber,
    },
  ).returning();

  if (!result) {
    return res.status(500).json({
      message: 'Error creating client',
    });
  }

  const id = result[0].id;
  return res.status(201).json({
    message: 'Client created successfully',
    client: {
      id,
      name: clientDto.name,
      email: clientDto.email,
      phoneNumber: clientDto.phoneNumber,
    },
  });
});

export default router;

