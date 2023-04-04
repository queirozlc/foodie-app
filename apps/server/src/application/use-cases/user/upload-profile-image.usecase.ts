import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { UserRepository } from 'src/application/repositories/user.repository';

@Injectable()
export class UploadProfileImageUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, imageUrl: string): Promise<void> {
    const user = await this.userRepository.findByIdOrThrow(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.userRepository.update(userId, {
      ...user,
      profileImage: imageUrl,
    });
  }
}
