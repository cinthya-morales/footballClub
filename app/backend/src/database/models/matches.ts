import { Model, INTEGER, NUMBER } from 'sequelize';
import db from '.';
import Teams from './teams';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: number;
}

Matches.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    homeTeam: {
      type: NUMBER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: NUMBER,
      allowNull: false,
    },
    awayTeam: {
      type: NUMBER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: NUMBER,
      allowNull: false,
    },
    inProgress: {
      type: NUMBER,
      allowNull: false,
    },
  },
  {
    // https://github.com/sequelize/sequelize/issues/10857 Importância do underscored
    modelName: 'matches', sequelize: db, timestamps: false, underscored: true,
  },
);

Matches.belongsTo(Teams, { foreignKey: 'away_team', as: 'teamAway' });
Matches.belongsTo(Teams, { foreignKey: 'home_team', as: 'teamHome' });

Teams.hasMany(Matches, { foreignKey: 'away_team', as: 'away_team' });
Teams.hasMany(Matches, { foreignKey: 'home_team', as: 'home_team' });

export default Matches;
