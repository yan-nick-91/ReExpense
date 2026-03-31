import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import type { AuthRequest } from '../../types/authTypes.js';
import { TransactionCommandService } from '../../application/service/commands/TransactionCommandService.js';
import type { CreateTransactionDTO } from '../../application/dto/in/CreateTransactionDTO.js';
import { TransactionQueryService } from '../../application/service/queries/TransactionQueryService.js';

const router = Router();
const transactionCommandService = new TransactionCommandService();
const transactionQueryService = new TransactionQueryService();

router.post('/create', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const dto: CreateTransactionDTO = req.body;
    const result = await transactionCommandService.create(req.user!.id, dto);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/:savingId', authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.user?.id as string;
  const savingId = req.params.savingId as string;
  const result = await transactionQueryService.getAllTransactionBySavingId(
    userId,
    savingId,
  );
  return res.status(200).json(result);
});

export default router;
