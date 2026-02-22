import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../../../../config/config.js';
import { AppDataSource } from '../../../infrastructure/database/data-source.js';
import { User } from '../../../domain/entities/User.js';
import type { AuthUserDTO } from '../../dto/in/AuthUserDTO.js';
import type { UserTokenResponseDTO } from '../../dto/out/UserTokenResponseDTO.js';
import type { AuthUpdatePasswordDTO } from '../../dto/in/AuthUpdatePasswordDTO.js';
import {
  emailAlreadyTaken,
  isValidEmail,
  verifyFoundUser,
  verifyPasswordLength,
  verifyPassword,
} from '../../../domain/business/validations.js';
import { InvalidCredentialsException } from '../../../domain/exceptions/InvalidCredentialsException.js';

export class AuthCommandService {
  private userRepository = AppDataSource.getRepository(User);

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

  // helpers
  private signToken(userId: string) {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
  }
}
