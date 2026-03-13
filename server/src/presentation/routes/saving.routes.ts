import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import type { AuthRequest } from '../../types/authTypes.js';
import { SavingQueryService } from '../../application/service/queries/SavingQueryService.js';

const router = Router();
const savingQueryService = new SavingQueryService();

router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id as string
    const result = await savingQueryService.getAllSavingBalances(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// router.get('/:savingId', authMiddleware, async (req: AuthRequest, res) => {
//   try {
//     const savingId = req.params.savingId as string;
//     const result = await savingQueryService.getSavingBySavingId(savingId);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ error: 'Internal service error' });
//   }
// });

export default router;
