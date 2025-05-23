import express, { NextFunction, Request, Response } from 'express';
import { CreateStaffDto } from './interfaces/create-staff.dto';
import { validate } from 'class-validator';
import database from '../../database';
import { staffTable } from './staff.entity';

const router = express.Router();

const createStaffValidator = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'Invalid request body',
    });
  }

  const dto = new CreateStaffDto();
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

  res.locals.staff = dto;
  next();
};

router.post<{}, {}>('/', [createStaffValidator], async (_: Request, res: Response) => {
  const staffDto: CreateStaffDto = res.locals.staff;
  const { name, email, password, phoneNumber } = staffDto;
  const result = await database.insert(staffTable).values(
    {
      name,
      email,
      password,
      phoneNumber,
    },
  ).returning();

  if (!result) {
    return res.status(500).json({
      message: 'Error creating staff',
    });
  }

  const id = result[0].id;
  return res.status(201).json({
    message: 'Staff created successfully',
    client: {
      id,
      name,
      email,
      password,
    },
  });
});

export default router;
