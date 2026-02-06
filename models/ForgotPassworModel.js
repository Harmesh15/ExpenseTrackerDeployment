const sequelize = require("../utils/db-connection");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const forgotpassword = sequelize.define("forgotpassword", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = forgotpassword;
