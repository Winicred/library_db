const db = require('../config/database')

const { DataTypes } = require('sequelize')

const Book = db.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    pageCount: {
        type: DataTypes.INTEGER,
    },
    shortDescription: {
        type: DataTypes.STRING
    },
    longDescription: {
        type: DataTypes.STRING(3000)
    },
    publishedDate: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false
}
)

module.exports = Book
