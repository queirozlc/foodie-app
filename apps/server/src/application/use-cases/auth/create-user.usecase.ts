import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/application/repositories/user.repository';
import { CreateUserDto } from 'src/infra/http/dtos/create-user.dto';
import { JwtPayload } from 'src/infra/http/dtos/jwt-payload.dto';
import { JwtResponse } from 'src/infra/http/dtos/jwt-response.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: CreateUserDto): Promise<JwtResponse> {
    const { email, password, name, profileImage } = data;

    if (await this.repository.existsByEmail(email)) {
      throw new BadRequestException('User already exists');
    }

    const userCreated = await this.repository.createUser({
      email,
      password: bcrypt.hashSync(password, 10),
      name,
      profileImage,
    });

    const payload: JwtPayload = {
      email: userCreated.email,
      name: userCreated.name,
      sub: userCreated.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
