import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

router.get('/home', LeaderboardController.getHomeScore);

export default router;
