import { Router } from 'express';
import { GoalCommandService } from './../../application/service/commands/GoalCommandService.js';
import { GoalQueryService } from './../../application/service/queries/GoalQueryService.js';
import type { GoalDTO } from '../../application/dto/in/GoalDTO.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import type { AuthRequest } from '../../types/authTypes.js';

const router = Router();
const goalCommandService = new GoalCommandService();
const goalQueryService = new GoalQueryService();

router.post('/create', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const dto: GoalDTO = req.body;
    const result = await goalCommandService.create(dto);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:savingId',
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const userId = req.user!.id;
      const savingId = req.params.savingId as string;
      const result = await goalQueryService.getAllGoalsBySavingId(
        userId,
        savingId,
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  '/update/:goalId',
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const goalId = req.params.goalId as string;
      const dto: GoalDTO = req.body;
      const result = await goalCommandService.update(goalId, dto);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  '/delete/:goalId',
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const goalId = req.params.goalId as string;
      const userId = req.user!.id;
      await goalCommandService.delete(userId, goalId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
);

export default router;
