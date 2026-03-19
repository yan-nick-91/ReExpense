import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { AuthCommandService } from '../../src/application/service/commands/AuthCommandService';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../../src/infrastructure/database/data-source';

const mockRepository = vi.hoisted(() => ({
  findOne: vi.fn(),
  create: vi.fn(),
  save: vi.fn(),
}));

vi.mock('../../src/domain/entities/User', () => ({
  User: class User {
    id!: string;
    email!: string;
    password!: string;
  },
}));

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashedPassword'),
    compare: vi.fn().mockResolvedValue(true),
  },
}));

vi.mock('../../src/infrastructure/database/data-source', () => ({
  AppDataSource: {
    getRepository: vi.fn().mockReturnValue(mockRepository),
  },
}));

vi.mock('../../src/application/service/commands/SavingCommandService');
vi.mock('../../src/application/service/commands/MailingCommandService');

describe('AuthCommandService', () => {
  let authCommandService: AuthCommandService;

  beforeEach(() => {
    vi.mocked(AppDataSource.getRepository).mockReturnValue(
      mockRepository as any,
    );
    authCommandService = new AuthCommandService();
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
    vi.mocked(bcrypt.hash).mockResolvedValue('hashedPassword' as never);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should register a new user and return a token', async () => {
    const dto = { email: 'test@example.com', password: 'Password123!' };
    const savedUser = { id: '1', email: dto.email };

    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.create.mockReturnValue(savedUser);
    mockRepository.save.mockReturnValue(savedUser);

    const result = await authCommandService.register(dto);
    expect(result.token).toBeDefined();
    expect(mockRepository.save).toHaveBeenCalledOnce();
  });

  it('should throw an exception when email is in use', async () => {
    const dto = { email: 'test@example.com', password: 'Password123!' };
    mockRepository.findOne.mockResolvedValue({ id: '1', email: dto.email });
    await expect(authCommandService.register(dto)).rejects.toThrow(
      'Email already in use',
    );
  });

  it('should thrown an exception when the password length is below its minimum', async () => {
    const dto = { email: 'test@example.com', password: 'P@s5' };
    await expect(authCommandService.register(dto)).rejects.toThrow(
      'Password must at least be 8 characters',
    );
  });

  it('should login a user and return a token', async () => {
    const dto = { email: 'test@example.com', password: 'Password123!' };
    mockRepository.findOne.mockResolvedValue({
      id: '1',
      email: dto.email,
      password: 'hashedPassword',
    });

    const result = await authCommandService.login(dto);
    expect(result.token).toBeDefined();
  });

  it('should throw an exception when password is invalid', async () => {
    const dto = { email: 'test@example.com', password: 'wr0ngPa$$word' };
    mockRepository.findOne.mockResolvedValue({
      id: '1',
      email: dto.email,
      password: 'hashedPassword',
    });

    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
    expect(authCommandService.login(dto)).rejects.toThrow(
      'Invalid credentials',
    );
  });

  it('should update the password of user and return a new token', async () => {
    const dto = { currentPassword: 'Password123!', newPassword: 'n3wPa$$word' };
    const user = { id: '1', email: 'test@example', password: 'hashedPassword' };
    mockRepository.findOne.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    mockRepository.save.mockResolvedValue(user);
    const result = await authCommandService.updatePassword('1', dto);
    expect(result.token).toBeDefined();
  });

  it('should throw an exception when the current password is incorrect', async () => {
    const dto = {
      currentPassword: 'WrongPassword123!',
      newPassword: 'n3wPa$$word',
    };

    mockRepository.findOne.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
    expect(authCommandService.updatePassword('1', dto)).rejects.toThrow(
      'Invalid credentials',
    );
  });

  it('should throw an exception when the new password equals the current', async () => {
    const dto = {
      currentPassword: 'n3wPa$$word',
      newPassword: 'n3wPa$$word',
    };

    mockRepository.findOne.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
    await expect(authCommandService.updatePassword('1', dto)).rejects.toThrow(
      'New password cannot be equals as the current password',
    );
  });
});
