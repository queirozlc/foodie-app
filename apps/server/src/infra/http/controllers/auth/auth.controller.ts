import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticateUserUseCase } from 'src/application/use-cases/auth/authenticate-user.usecase';
import { CreateUserUseCase } from 'src/application/use-cases/auth/create-user.usecase';
import { IsPublic } from 'src/infra/http/decorators/is-public.decorator';
import { AuthRequest } from '../../dtos/auth-request.dto';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { JwtResponse } from '../../dtos/jwt-response.entity';
import { LocalGuard } from '../../guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly authenticateUser: AuthenticateUserUseCase,
  ) {}

  @IsPublic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateUserDto): Promise<JwtResponse> {
    return await this.createUserUseCase.execute(data);
  }

  @IsPublic()
  @UseGuards(LocalGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async authenticate(@Request() data: AuthRequest): Promise<JwtResponse> {
    const { user } = data;
    return await this.authenticateUser.execute(user);
  }
}
