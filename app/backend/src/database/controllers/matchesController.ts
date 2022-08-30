import { Request, Response, NextFunction } from 'express';
import NotFound from '../errors/NotFound';
import Unauthorized from '../errors/Unauthorized';
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

  static async createMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const matchReq = req.body;
      const token = req.headers.authorization || '';
      const data = await MatchesService.createMatch(matchReq, token);
      res.status(201).json(data);
    } catch (e) {
      if (e instanceof Unauthorized) {
        return res.status(401).json({ message: e.message });
      } if (e instanceof NotFound) {
        return res.status(404).json({ message: e.message });
      }
      next(e);
    }
  }

  static async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const score = req.body;
      await MatchesService.updateById(score, Number(id));
      res.status(200).json({ message: 'Updated' });
    } catch (e) {
      next(e);
    }
  }

  static async finish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MatchesService.finish(Number(id));
      res.status(200).json({ message: 'Finished' });
    } catch (e) {
      next(e);
    }
  }
}

export default MatchesController;
