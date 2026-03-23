import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import type { AuthRequest } from '../../types/authTypes.js';
import { TransactionCommandService } from '../../application/service/commands/TransactionCommandService.js';
import type { CreateTransactionDTO } from '../../application/dto/in/CreateTransactionDTO.js';
import { TransactionQueryService } from '../../application/service/queries/TransactionQueryService.js';

const router = Router();
const transactionCommandService = new TransactionCommandService();
const transactionQueryService = new TransactionQueryService();

router.post('/create', authMiddleware, async (req: AuthRequest, res) => {
  const dto: CreateTransactionDTO = req.body;
  const result = await transactionCommandService.create(req.user!.id, dto);
  res.status(201).json(result);
});

router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  const { savingId } = req.body
  const result =
    await transactionQueryService.getAllTransactionBySavingId(savingId);
  return res.status(200).json(result);
});

export default router;
