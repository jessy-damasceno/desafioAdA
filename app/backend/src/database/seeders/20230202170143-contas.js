'use strict';
const path = require('path');
const fs = require('fs');

const DAYS_OF_WEEK = {
  domingo: 0,
  segunda: 1,
  terca: 2,
  quarta: 3,
  quinta: 4,
  sexta: 5,
  sabado: 6,
}

const getDateFromString = (arg) => {
  const str = arg.split('-').reverse().join('-') + 'T00:00:00';
  return new Date(Date.parse(str));
};

function getNextDayOfWeek(arg, dayOfWeek) {
  const date = getDateFromString(arg);
  let resultDate = new Date(date.getTime());

  resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);

  if (date - resultDate === 0) { resultDate.setDate(date.getDate() + 7); }

  return resultDate;
};

const addDaysTo = (arg, daysOf) => {
  let resultDate = getDateFromString(arg);
  resultDate.setDate(resultDate.getDate() + daysOf);

  return resultDate;
};

const toPayFactory = (obj, index) => {
  const toPay = { type: 'A pagar', reserve: index + 1, property: obj.property };

  toPay.price = obj.extrasWithoutTax;
  toPay.dueDate = getNextDayOfWeek(obj.checkOut, DAYS_OF_WEEK['terca']);

  return toPay;
};

const toReceiveFactory = (obj, index) => {
  const toReceive = { type: 'A receber', reserve: index + 1, property: obj.property };

  if(obj.portal === 'Booking.com') {
    toReceive.price = JSON.stringify(
      parseFloat(obj.totalWithoutTax) - parseFloat(obj.personalizedCommission));

    toReceive.dueDate = getDateFromString(obj.checkOut);
  } else if (obj.portal === 'Airbnb.com') {
    toReceive.price = JSON.stringify(
      parseFloat(obj.totalWithoutTax) - parseFloat(obj.personalizedCommission));

    toReceive.dueDate = addDaysTo(obj.checkOut);
  }

  return toReceive;
};

const data = fs.readFileSync(path.resolve(__dirname, '../../backups/reservas.js'));
const json = JSON.parse(data);

const contas = [];

json.forEach((obj, index) => {
  if(obj.portal === ('Booking.com' || 'Airbnb.com')) {
    contas.push(toPayFactory(obj, index));
    contas.push(toReceiveFactory(obj, index));
  };

});

module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface.bulkInsert('contas', contas, {}),
  down: async (queryInterface, _Sequelize) => queryInterface.bulkDelete('contas', null, {}),
};
