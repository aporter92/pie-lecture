const Sequelize = require("sequelize")

const sequelize = new Sequelize("postgres://postgres:PG_PASSWORD@localhost:5432/pie-server")
//dbType://user:passsword@ipAddress:port/dbname

module.exports = sequelize