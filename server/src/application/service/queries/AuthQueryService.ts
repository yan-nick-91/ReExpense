import { AppDataSource } from '../../../infrastructure/database/data-source.js';
import { User } from '../../../domain/entities/User.js';
import type { UserResponseDTO } from '../../dto/out/UserResponseResponse.js';
import { verifyFoundUser } from '../../../domain/business/validations.js';

export class AuthQueryService {
  private userRepository = AppDataSource.getRepository(User);

  async isAuthenticated(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    verifyFoundUser(user, 'User not found');
  }
}
