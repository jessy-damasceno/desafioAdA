import { INTEGER, STRING, DATEONLY, Model } from 'sequelize';
import db from '.';
import Propriedade from './Propriedade';

class Conta extends Model {
  id: number;
  type: 'a pagar' | 'a receber';
  property: number;
  price: string;
  dueDate: Date;
  commission: string;
}

Conta.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: STRING,
    allowNull: false,
  },
  property: {
    type: INTEGER,
    allowNull: false,
  },
  price: {
    type: STRING,
    allowNull: false,
  },
  dueDate: {
    type: DATEONLY,
    allowNull: false,
  },
  commission: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'reservas',
  underscored: true,
  timestamps: false,
});

Conta.belongsTo(Propriedade, { foreignKey: 'property', as: 'property' });

Propriedade.hasMany(Conta, { foreignKey: 'property', as: 'property' });

export default Conta;
