const { DataTypes } = require("sequelize");
const sequelize = require('../utils/db-connection');

const content = sequelize.define('content', {
    id:
    {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    ContentUrl:
    {
        type: DataTypes.STRING,
        allowNull: false

    }

})

module.exports = content;