const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite')
});

const Entry = sequelize.define('Entry', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    content:
    {
        type: DataTypes.TEXT
    }

});

sequelize.sync();

module.exports = { sequelize, Entry};