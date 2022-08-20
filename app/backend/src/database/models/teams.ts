import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'teams', sequelize: db, timestamps: false,
  },
);

export default Teams;
