import { IHomeMatch, IMatchGoals } from '../interfaces/IHomeMatch';
import ILeaderboard from '../interfaces/ILeaderboard';
import Matches from '../models/matches';
import Teams from '../models/teams';
// import ILeaderboard from '../interfaces/ILeaderboard';

// const rawQuery2 = 'SELECT CAST(4 AS DECIMAL(4,3))';

// const queryTest = 'SELECT * FROM `TRYBE_FUTEBOL_CLUBE.Teams`';

class LeaderboardService {
  static async getHomeMatches() {
    const homeMatches = await Teams.findAll({
      include: [
        {
          model: Matches,
          as: 'teamHome',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: { inProgress: false },
        },
      ],
    });
    return homeMatches;
  }

  // Obtendo a lista de classificação dos times
  static async getHomeScore() {
    const getHomeMatches = await this.getHomeMatches() as unknown as IHomeMatch[];
    const result = getHomeMatches.map(({ teamName, teamHome }) => {
      const points = this.getHomePoints(teamHome);
      const teamBoard = {
        name: teamName,
        totalPoints: points,
        totalGames: teamHome.length,
        totalVictories: this.getHomeVictories(teamHome),
        totalDraws: this.getHomeDraws(teamHome),
        totalLosses: this.getHomeLosses(teamHome),
        goalsFavor: this.getHomeGoalsFavor(teamHome),
        goalsOwn: this.getHomeGoalsOwn(teamHome),
        goalsBalance: this.getHomeGoalsFavor(teamHome) - this.getHomeGoalsOwn(teamHome),
        efficiency: this.getEfficiency(points, teamHome.length),
      };
      return teamBoard;
    }) as unknown as ILeaderboard;
    return this.sortBoard(result);
  }

  static getHomePoints(matches: IMatchGoals[]) {
    const points = matches.map((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return 3 as number;
      } if (match.homeTeamGoals < match.awayTeamGoals) {
        return 0 as number;
      }
      return 1 as number;
    });
    return points.reduce((a, b) => a + b);
  }

  static getHomeVictories(matches: IMatchGoals[]) {
    const victories = matches.map((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return 1 as number;
      }
      return 0 as number;
    });
    return victories.reduce((a, b) => a + b);
  }

  static getHomeLosses(matches: IMatchGoals[]) {
    const victories = matches.map((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        return 1 as number;
      }
      return 0 as number;
    });
    return victories.reduce((a, b) => a + b);
  }

  static getHomeDraws(matches: IMatchGoals[]) {
    const draws = matches.map((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        return 1 as number;
      }
      return 0 as number;
    });
    return draws.reduce((a, b) => a + b);
  }

  static getHomeGoalsFavor(matches: IMatchGoals[]) {
    const goals = matches.map((match) => match.homeTeamGoals);
    return goals.reduce((a, b) => a + b);
  }

  static getHomeGoalsOwn(matches: IMatchGoals[]) {
    const goals = matches.map((match) => match.awayTeamGoals);
    return goals.reduce((a, b) => a + b);
  }

  static getEfficiency(totalPoints: number, totalGames: number) {
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  }

  static sortBoard(board: any) {
    return board.sort((a: any, b: any) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
  }
}

export default LeaderboardService;
