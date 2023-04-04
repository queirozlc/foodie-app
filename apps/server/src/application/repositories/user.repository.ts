import { CreateUserDto } from 'src/infra/http/dtos/create-user.dto';
import { UpdateUserDto } from 'src/infra/http/dtos/update-user.dto';
import { User } from '../domains/entities/user.entity';

export abstract class UserRepository {
  abstract createUser(data: CreateUserDto): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract existsByEmail(email: string): Promise<boolean>;
  abstract findByIdOrThrow(id: string): Promise<User>;
  abstract update(id: string, data: UpdateUserDto): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
