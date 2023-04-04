import { Role } from 'src/application/domains/entities/role.entity';

export class JwtPayload {
  sub: string;
  email: string;
  name: string;
  profileImage?: string;
  roles?: Role[];
  iat?: number;
  exp?: number;
}
