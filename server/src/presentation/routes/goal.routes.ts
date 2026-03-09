import { Router } from 'express';
import { GoalCommandService } from './../../application/service/commands/GoalCommandService.js';
import { GoalQueryService } from './../../application/service/queries/GoalQueryService.js';
import type { GoalDTO } from '../../application/dto/in/GoalDTO.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import type { AuthRequest } from '../../types/authTypes.js';

const router = Router();
const goalCommandService = new GoalCommandService();
const goalQueryService = new GoalQueryService();

router.post('/create', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const dto: GoalDTO = req.body;
    const result = await goalCommandService.create(userId, dto);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const result = await goalQueryService.getAllGoalsByUserId(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/update/:goalId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const goalId = req.params.goalId as string
    const userId = req.user!.id;
    const dto: GoalDTO = req.body;
    const result = await goalCommandService.update(userId, goalId, dto);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:goalId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const goalId = req.params.goalId as string;
    const userId = req.user!.id;
    await goalCommandService.delete(userId, goalId)
    res.status(204).json({ message: 'Goal successfully deleted'})
  } catch (err) {
    res.status(500).json({ error: 'Internal server error'})
  }
})

export default router;
