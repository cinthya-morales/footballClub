import NotFound from '../errors/NotFound';
import Unauthorized from '../errors/Unauthorized';
import Token from '../helpers/token';
import IMatches from '../interfaces/IMatches';
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

  static async createMatch(
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }:IMatches,
    token: string,
  ) {
    Token.decode(token);
    if (homeTeam === awayTeam) {
      throw new Unauthorized('It is not possible to create a match with two equal teams');
    }
    const homeTeamCheck = await Teams.findOne({ where: { id: homeTeam } });
    const awayTeamCheck = await Teams.findOne({ where: { id: awayTeam } });
    if (!homeTeamCheck || !awayTeamCheck) {
      throw new NotFound('There is no team with such id!');
    }
    const data = await Matches.create(
      { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true },
    );
    return data;
  }

  static async updateById({ homeTeamGoals, awayTeamGoals }:IMatches, id: number) {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  static async finish(id: number) {
    await Matches.update({ inProgress: false }, { where: { id } });
  }
}

export default MatchesService;
