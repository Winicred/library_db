const db = require('../config/database')

const { DataTypes } = require('sequelize')

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
    },
    email: {
        type: DataTypes.STRING(100),
    },
    password: {
        type: DataTypes.STRING(255),
    },
}, {
    timestamps: false
}
)

module.exports = User