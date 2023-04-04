import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/application/domains/entities/user.entity';
import { LocalStrategy } from 'src/application/strategies/local.strategy';
import { ValidateUserUseCase } from 'src/application/use-cases/auth/validate-user.usecase';

@Injectable()
export class PassportLocalStrategy
  extends PassportStrategy(Strategy, 'local')
  implements LocalStrategy
{
  constructor(private readonly validateUserUseCase: ValidateUserUseCase) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return await this.validateUserUseCase.execute(email, password);
  }
}
