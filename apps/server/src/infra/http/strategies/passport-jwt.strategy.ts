import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtStrategy } from 'src/application/strategies/jwt.strategy';
import { JwtPayload } from '../dtos/jwt-payload.dto';
import { UserToken } from '../dtos/user-token.dto';

@Injectable()
export class PassportJwtStrategy
  extends PassportStrategy(Strategy, 'jwt')
  implements JwtStrategy
{
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<UserToken> {
    const { sub, email, name, profileImage, roles } = payload;

    return {
      id: sub,
      email,
      name,
      profileImage,
      roles,
    };
  }
}
