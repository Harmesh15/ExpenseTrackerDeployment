const sequelize = require("../utils/db-connection");
const { DataTypes } = require("sequelize");

const users = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalExpense: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

module.exports = users;