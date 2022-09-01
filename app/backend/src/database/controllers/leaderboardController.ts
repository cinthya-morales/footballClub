import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  static async getHomeScore(req: Request, res: Response, _next: NextFunction) {
    const result = await LeaderboardService.getHomeScore();
    res.status(200).json(result);
  }
}

export default LeaderboardController;
