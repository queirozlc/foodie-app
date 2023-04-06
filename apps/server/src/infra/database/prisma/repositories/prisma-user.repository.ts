import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { RoleName } from '@prisma/client';
import { User } from 'src/application/domains/entities/user.entity';
import { UserRepository } from 'src/application/repositories/user.repository';
import { CreateUserDto } from 'src/infra/http/dtos/create-user.dto';
import { UpdateUserDto } from 'src/infra/http/dtos/update-user.dto';
import { RoleMapper } from '../mappers/role.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByIdOrThrow(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },

      include: {
        roles: true,
      },
    });

    if (user === null) {
      throw new BadRequestException('User not found');
    }

    return {
      ...user,
      profileImage: user?.profile_image,
      roles: user.roles.map((role) => RoleMapper.toDomain(role)),
    };
  }

  async createUser({
    email,
    name,
    password,
    profileImage,
  }: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password,
        profile_image: profileImage,
        roles: {
          connect: {
            name: RoleName.COSTUMER,
          },
        },
      },
    });

    return {
      email,
      name,
      password,
      profileImage: user.profile_image,
    };
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const { email, name, profileImage } = data;

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        profile_image: profileImage,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        roles: true,
      },
    });

    return {
      ...user,
      profileImage: user.profile_image,
      roles: user.roles.map((role) => RoleMapper.toDomain(role)),
    };
  }
  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.user.delete({
        where: {
          id,
        },
      }),
    ]);
  }
}
