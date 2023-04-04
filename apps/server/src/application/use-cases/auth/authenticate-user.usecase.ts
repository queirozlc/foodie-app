import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/infra/http/dtos/jwt-payload.dto';
import { JwtResponse } from 'src/infra/http/dtos/jwt-response.entity';
import { User } from '../../domains/entities/user.entity';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(user: User): Promise<JwtResponse> {
    const payload: JwtPayload = {
      email: user.email,
      name: user.name,
      profileImage: user.profileImage,
      roles: user.roles,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
