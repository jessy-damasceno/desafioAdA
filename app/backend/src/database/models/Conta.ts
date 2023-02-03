import { INTEGER, STRING, DATEONLY, Model } from 'sequelize';
import db from '.';
import Propriedade from './Propriedade';
import Reserva from './Reserva';

class Conta extends Model {
  id: number;
  type: 'A pagar' | 'A receber';
  reserve: number;
  property: number;
  price: string;
  dueDate: Date;
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
  reserve: {
    type: INTEGER,
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
}, {
  sequelize: db,
  modelName: 'contas',
  underscored: false,
  timestamps: false,
});

Conta.belongsTo(Propriedade, { foreignKey: 'property', as: 'propertyOf' });
Conta.belongsTo(Reserva, { foreignKey: 'reserve', as: 'reserveOf' });

Propriedade.hasMany(Conta, { foreignKey: 'property', as: 'propertyOf' });
Reserva.hasMany(Conta, { foreignKey: 'reserve', as: 'reserveOf' });

export default Conta;
