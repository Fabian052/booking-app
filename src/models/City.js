const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const City = sequelize.define("city", {
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  countryId: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
});

module.exports = City;
