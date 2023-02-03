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
  modelName: 'reservas',
  underscored: true,
  timestamps: false,
});

Conta.belongsTo(Propriedade, { foreignKey: 'property', as: 'property' });
Conta.belongsTo(Reserva, { foreignKey: 'reserve', as: 'reserve' });

Propriedade.hasMany(Conta, { foreignKey: 'property', as: 'property' });
Reserva.hasMany(Conta, { foreignKey: 'reserve', as: 'reserve' });

export default Conta;
