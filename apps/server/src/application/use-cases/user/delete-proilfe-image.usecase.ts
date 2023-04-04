import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user.repository';

@Injectable()
export class DeleteProfileImageUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findByIdOrThrow(userId);

    if (!user) throw new BadRequestException('User not found.');

    const image = user.profileImage;

    await this.userRepository.update(userId, {
      ...user,
      profileImage: null,
    });

    console.log(user);

    if (!image) {
      throw new BadRequestException('User does not have profile Image');
    }

    return image.split('/').pop();
  }
}
