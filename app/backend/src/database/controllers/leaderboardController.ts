import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  static async getHomeScore(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await LeaderboardService.getHomeScore();
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default LeaderboardController;
