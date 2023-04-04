import { Roles } from '@prisma/client';
import { Role } from 'src/application/domains/entities/role.entity';
import { RoleName } from 'src/application/enums/role.enum';

export class RoleMapper {
  static toDomain(prismaRoles: Roles): Role {
    const { id, name } = prismaRoles;

    return {
      id,
      name: name as RoleName,
    };
  }
}
