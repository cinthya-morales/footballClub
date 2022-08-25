import Matches from '../models/matches';
import Teams from '../models/teams';

class MatchesService {
  static async getAll() {
    const teams = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return teams;
  }
}

export default MatchesService;
