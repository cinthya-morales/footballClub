import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/matchesService';

class MatchesController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allTeams = await MatchesService.getAll();
      res.status(200).json(allTeams);
    } catch (e) {
      next(e);
    }
  }
}

export default MatchesController;
