import { INTEGER, STRING, DATEONLY, Model } from 'sequelize';
import db from '.';

class Conta extends Model {
  id: number;
  type: 'a pagar' | 'a receber';
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

export default Conta;
