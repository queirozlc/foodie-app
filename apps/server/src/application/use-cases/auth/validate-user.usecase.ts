import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { User } from 'src/application/domains/entities/user.entity';
import { UserRepository } from 'src/application/repositories/user.repository';

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(email: string, password: string): Promise<User> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Email or password incorrect');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Email or password incorrect');
    }

    return {
      ...user,
      createdAt: undefined,
      updatedAt: undefined,
    };
  }
}
