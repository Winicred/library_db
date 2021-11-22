const db = require('../config/database')
const Book = require('../models/book')
const Category = require('../models/category')

const { DataTypes } = require('sequelize')

const BookCategories = db.define('BookCategories', {
    BookId: {
      type: DataTypes.INTEGER, 
    },
    CategoryId: {
      type: DataTypes.INTEGER, 
    }
  }, {
    timestamps:false
  })


Book.belongsToMany(Category, {
    through:BookCategories,
    as: "categories"
})

Category.belongsToMany(Book, {
    through: BookCategories,
    as: "books",
})

module.exports = BookCategories