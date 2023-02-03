"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("reservas", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      checkIn: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      checkOut: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      rentPrice: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rentTax: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      property: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "propriedades",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      locality: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      extrasPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      extrasTax: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      payment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pending: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      portal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("reservas");
  },
};
