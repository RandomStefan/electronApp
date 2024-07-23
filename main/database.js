const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: console.log  // This will log SQL queries
});

const Entry = sequelize.define('Entry', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

sequelize.sync({ force: false })  // This will recreate the table. Remove 'force: true' after first run
  .then(() => console.log('Database synchronized'));

module.exports = { sequelize, Entry };