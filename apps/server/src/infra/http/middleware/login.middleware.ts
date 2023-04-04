import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { NestMiddleware } from '@nestjs/common/interfaces/middleware';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { SignInUserDto } from '../dtos/signin-user.dto';

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: (error?: any) => void) {
    const body = req.body;

    const signInUserDto = new SignInUserDto();
    signInUserDto.email = body.email;
    signInUserDto.password = body.password;

    const validations = await validate(signInUserDto);

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [...acc, ...Object.values(curr.constraints)];
        }, []),
      );
    }

    next();
  }
}
