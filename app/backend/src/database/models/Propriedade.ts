import { INTEGER, Model } from 'sequelize';
import db from '.';

class Propriedade extends Model {
  id: number;
}

Propriedade.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
}, {
  sequelize: db,
  modelName: 'propriedades',
  underscored: true,
  timestamps: false,
});

export default Propriedade;
