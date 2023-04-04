import { Role } from 'src/application/domains/entities/role.entity';

export class UserToken {
  id?: string;
  name: string;
  email: string;
  profileImage?: string;
  roles?: Role[];
}
