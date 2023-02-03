'use strict';

const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, '../../backups/reservas.js'));
const json = JSON.parse(data);
const propriedades = [...new Set(json.map(({ property }) => JSON.stringify({ id: property })))].map(a => JSON.parse(a));

module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface.bulkInsert('propriedades', propriedades, {}),
  down: async (queryInterface, _Sequelize) => queryInterface.bulkDelete('propriedades', null, {}),
};
