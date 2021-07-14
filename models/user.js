const db = require("../db")
const { DataTypes } = require("sequelize")

const User = db.define("user", {
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    flastName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type:DataTypes.STRING(100),
        allowNull: false,
        //validation and constraint to disallow empty entry
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User