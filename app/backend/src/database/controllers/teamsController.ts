import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teamsService';

class TeamsController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allTeams = await TeamsService.getAll();
      res.status(200).json(allTeams);
    } catch (e) {
      next(e);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await TeamsService.getById(id);
      res.status(200).json(team);
    } catch (e) {
      next(e);
    }
  }
}

export default TeamsController;
