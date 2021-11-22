const db = require('../config/database')

const { DataTypes } = require('sequelize')

const Author = db.define('Author', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
    }
}, {
    timestamps: false
}
)

module.exports = Author