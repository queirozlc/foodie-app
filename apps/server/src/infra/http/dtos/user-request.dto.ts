import { Request } from 'express';
import { User } from 'src/application/domains/entities/user.entity';

export class UserRequest extends Request {
  user: User;
}
