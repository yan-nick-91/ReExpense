import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { JWT_SECRET } from '../../../config/config.js';
import { AppDataSource } from '../../../infrastructure/database/data-source.js';
import { User } from '../../../domain/entities/User.js';
import { MailCommandService } from './MailCommandService.js';
import type { AuthUserDTO } from '../../dto/in/AuthUserDTO.js';
import type { UserTokenResponseDTO } from '../../dto/out/UserTokenResponseDTO.js';
import type { AuthUpdatePasswordDTO } from '../../dto/in/AuthUpdatePasswordDTO.js';
import type { ResetPasswordRequestDTO } from './../../dto/in/ResetPasswordRequestDTO.js';
import {
  emailAlreadyTaken,
  isValidEmail,
  verifyFoundUser,
  verifyPasswordLength,
  verifyPassword,
} from '../../../domain/business/validations.js';
import { generateResetToken } from '../../utils/generators.js';
import { SavingCommandService } from './SavingCommandService.js';
import {
  InvalidCredentialsException,
  TokenException,
} from '../../../domain/exceptions/AuthenticationExceptions.js';
import { NotFoundException } from '../../../domain/exceptions/GeneralExceptions.js';

export class AuthCommandService {
  private userRepository = AppDataSource.getRepository(User);
  private savingCommandService = new SavingCommandService();
  private mailCommandService = new MailCommandService();

  async register(dto: AuthUserDTO): Promise<UserTokenResponseDTO> {
    const { email, password } = dto;
    isValidEmail(email);
    verifyPasswordLength(password);

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    emailAlreadyTaken(existingUser);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    await this.savingCommandService.initializeFirstSaving(user.id);

    const token = this.signToken(savedUser.id);
    return { token };
  }

  async login(dto: AuthUserDTO): Promise<UserTokenResponseDTO> {
    const { email, password } = dto;
    const user = await this.userRepository.findOne({ where: { email } });
    verifyFoundUser(user, 'Invalid credentials');

    const isValid = await bcrypt.compare(password, user!.password);
    if (!isValid) throw new InvalidCredentialsException('Invalid credentials');

    const token = this.signToken(user!.id);
    return { token };
  }

  async updatePassword(
    userId: string,
    dto: AuthUpdatePasswordDTO,
  ): Promise<UserTokenResponseDTO> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const currentPassword = await bcrypt.compare(
      dto.currentPassword,
      user!.password,
    );
    verifyPassword(currentPassword);

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    user!.password = hashedPassword;

    const savedUser = await this.userRepository.save(user!);
    const newToken = this.signToken(savedUser.id);
    return { token: newToken };
  }

  async forgotPassword(
    dto: ResetPasswordRequestDTO,
  ): Promise<{ message: string }> {
    const { email } = dto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException("User's email not found");

    const { resetToken, hashedToken } = generateResetToken();
    user.passwordResetToken = hashedToken;
    const oneHour = 1000 * 60 * 60;
    user.passwordResetExpires = new Date(Date.now() + oneHour);
    await this.userRepository.save(user);

    const resetUrl = `${process.env.FRONTEND_URL}/reset/password/${resetToken}`;
    await this.mailCommandService.forgotPassword(
      { email: user.email },
      resetUrl,
    );
    return { message: `Message sent to email ${user.email}` };
  }

  async resetPassword(token: string, newPassword: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await this.userRepository.findOne({
      where: { passwordResetToken: hashedToken },
    });

    if (
      !user ||
      !user.passwordResetExpires ||
      user.passwordResetExpires < new Date()
    ) {
      throw new TokenException('Token is invalid or expired');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await this.userRepository.save(user);
  }

  // helpers
  private signToken(userId: string) {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
  }
}
