'use strict';
const path = require('path');
const fs = require('fs');

const getDateFromString = (arg) => {
  const str = arg.split('-').reverse().join('-') + 'T00:00:00';
  return new Date(Date.parse(str));
};

const data = fs.readFileSync(path.resolve(__dirname, '../../backups/reservas.js'));
const json = JSON.parse(data);
const seeder = json.map((reserva) => {
  const obj = {
    checkIn: getDateFromString(reserva.checkIn),
    checkOut: getDateFromString(reserva.checkOut),
    rentPrice: reserva.rentPrice,
    rentTax: parseInt(reserva.rentTax),
    property: parseInt(reserva.property),
    extrasPrice: parseInt(reserva.extras),
    extrasTax: parseInt(reserva.extrasTax),
    total: reserva.total,
    payment: reserva.payment,
    pending: reserva.total === reserva.payment ? false : true,
    portal: reserva.portal,
  };

  return obj;
});

module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface.bulkInsert('reservas', seeder, {}),
  down: async (queryInterface, _Sequelize) => queryInterface.bulkDelete('reservas', null, {}),
};
