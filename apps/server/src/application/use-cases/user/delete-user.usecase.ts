import { Injectable } from '@nestjs/common/decorators';
import { UserRepository } from 'src/application/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findByIdOrThrow(id);
    await this.userRepository.delete(user.id);
  }
}
