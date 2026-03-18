import crypto from 'crypto';
import { AppDataSource } from '../../../infrastructure/database/data-source.js';
import { User } from '../../../domain/entities/User.js';
import { verifyFoundUser } from '../../../domain/business/validations.js';
import { TokenException } from '../../../domain/exceptions/AuthenticationExceptions.js';

export class AuthQueryService {
  private userRepository = AppDataSource.getRepository(User);

  async isAuthenticated(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    verifyFoundUser(user, 'User not found');
  }

  async validateResetPasswordToken(token: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await this.userRepository.findOne({
      where: { passwordResetToken: hashedToken },
    });

    if (
      !user ||
      !user.passwordResetExpires ||
      user.passwordResetExpires! < new Date()
    ) {
      throw new TokenException('Token invalid or expired');
    }
  }
}
