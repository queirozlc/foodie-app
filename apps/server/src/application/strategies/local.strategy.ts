import { User } from '../domains/entities/user.entity';

export abstract class LocalStrategy {
  abstract validate(email: string, password: string): Promise<User>;
}
