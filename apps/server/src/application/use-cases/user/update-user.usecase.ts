import { User } from 'src/application/domains/entities/user.entity';
import { UserRepository } from 'src/application/repositories/user.repository';
import { UpdateUserDto } from 'src/infra/http/dtos/update-user.dto';

export class UpdateUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(
    id: string,
    { email, name, profileImage }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findByIdOrThrow(id);
    return await this.userRepository.update(id, {
      email,
      name,
      profileImage: profileImage || user.profileImage,
    });
  }
}
