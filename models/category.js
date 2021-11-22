const db = require('../config/database')

const { DataTypes } = require('sequelize')

const Category = db.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    timestamps: false
}
)

module.exports = Category