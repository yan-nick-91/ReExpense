import { Router } from 'express';
import { revokeToken } from '../../infrastructure/token.store.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { AuthCommandService } from '../../application/service/commands/AuthCommandService.js';
import { AuthQueryService } from './../../application/service/queries/AuthQueryService.js';
import { type AuthRequest } from '../../types/authTypes.js';
import type { AuthUserDTO } from '../../application/dto/in/AuthUserDTO.js';
import type { AuthUpdatePasswordDTO } from './../../application/dto/in/AuthUpdatePasswordDTO.js';
import type { ResetPasswordRequestDTO } from './../../application/dto/in/ResetPasswordRequestDTO.js';

const router = Router();
const authCommandService = new AuthCommandService();
const authQueryService = new AuthQueryService();

router.post('/register', async (req, res, next) => {
  try {
    const dto: AuthUserDTO = req.body;
    const result = await authCommandService.register(dto);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const dto: AuthUserDTO = req.body;
    const result = await authCommandService.login(dto);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/authenticated',
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    await authQueryService.isAuthenticated(req.user!.id);
    try {
      return res.status(200).json({
        user: req.user,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  '/update/password',
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const dto: AuthUpdatePasswordDTO = req.body;
      const userId = req.user!.id;
      const result = await authCommandService.updatePassword(userId, dto);
      return res.status(201).json({ message: 'Password updated', result });
    } catch (err) {
      next(err);
    }
  },
);

router.post('/forgot/password', async (req, res, next) => {
  try {
    const dto: ResetPasswordRequestDTO = req.body;
    const result = await authCommandService.forgotPassword(dto);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/reset/password/validate/:token', async (req, res, next) => {
  const { token } = req.params;
  
  try {
    await authQueryService.validateResetPasswordToken(token!);
    res.status(200).json({ valid: true });
  } catch (err) {
    next(err);
  }
});

router.post('/reset/password/:token', async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    await authCommandService.resetPassword(token, newPassword);
    res.status(200).json({ message: 'Password updated' });
  } catch (err) {
    next(err);
  }
});

router.delete('/logout', authMiddleware, (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1]!;
  revokeToken(token);
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
