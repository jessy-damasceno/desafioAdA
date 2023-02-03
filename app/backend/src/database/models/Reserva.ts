import { INTEGER, STRING, DATEONLY, Model, BOOLEAN } from 'sequelize';
import db from '.';
import Propriedade from './Propriedade';

class Reserva extends Model {
  id: number;
  checkIn: Date;
  checkOut: Date;
  rentPrice: string;
  rentTax: number;
  property: number;
  locality: string;
  extrasPrice: number;
  extrasTax: number;
  total: string;
  payment: string;
  pending: boolean;
  portal: string;
}

Reserva.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  checkIn: {
    type: DATEONLY,
    allowNull: false,
  },
  checkOut: {
    type: DATEONLY,
    allowNull: false,
  },
  rentPrice: {
    type: STRING,
    allowNull: false,
  },
  rentTax: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  property: {
    type: INTEGER,
    allowNull: false,
  },
  locality: {
    type: STRING,
    allowNull: false,
  },
  extrasPrice: {
    type: INTEGER,
    allowNull: false,
  },
  extrasTax: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  total: {
    type: STRING,
    allowNull: false,
  },
  payment: {
    type: STRING,
    allowNull: false,
  },
  pending: {
    type: BOOLEAN,
    allowNull: false,
  },
  portal: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'reservas',
  underscored: true,
  timestamps: false,
});

Reserva.belongsTo(Propriedade, { foreignKey: 'property', as: 'property' });

Propriedade.hasMany(Reserva, { foreignKey: 'property', as: 'property' });

export default Reserva;
