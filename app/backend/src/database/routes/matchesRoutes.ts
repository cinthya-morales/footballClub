import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const router = Router();

router.get('/', MatchesController.getAll);
router.post('/', MatchesController.createMatch);
router.patch('/:id/finish', MatchesController.finish);
router.patch('/:id', MatchesController.updateById);

export default router;
