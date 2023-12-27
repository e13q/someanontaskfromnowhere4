const DataTypes = require('sequelize');

const sequelize = require('../db-connection');

const Token = sequelize.define('Token', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Token;
