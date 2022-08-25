import { Model, INTEGER, NUMBER } from 'sequelize';
import db from '.';

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

export default Matches;
