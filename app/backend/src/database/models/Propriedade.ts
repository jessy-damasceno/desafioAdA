import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class Propriedade extends Model {
  id: number;
  name: string;
}

Propriedade.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize: db,
  modelName: 'propriedades',
  underscored: true,
  timestamps: false,
});

export default Propriedade;
