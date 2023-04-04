import { Role } from './role.entity';

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  profileImage?: string;
  roles?: Role[];
}
