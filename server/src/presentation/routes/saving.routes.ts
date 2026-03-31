import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import type { AuthRequest } from '../../types/authTypes.js';
import { SavingCommandService } from '../../application/service/commands/SavingCommandService.js';
import { SavingQueryService } from '../../application/service/queries/SavingQueryService.js';

const router = Router();
const savingCommandService = new SavingCommandService();
const savingQueryService = new SavingQueryService();

router.post('/create', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user?.id as string;
    const dto = req.body;
    const result = await savingCommandService.createNewSaving(userId, dto);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user?.id as string;
    const result = await savingQueryService.getAllSavingBalances(userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:savingId',
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const savingId = req.params.savingId as string;
      const result = await savingQueryService.getSavingBySavingId(savingId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  '/delete/:savingId',
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const savingId = req.params.savingId as string;
      await savingCommandService.deleteSaving(savingId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
);

export default router;
