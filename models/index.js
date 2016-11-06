const Sequelize = require('sequelize');
const dbConfig = require('config').database;

console.log(dbConfig);

let db = {};

let sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
  host: '127.0.0.1',
  dialect: 'mysql'
});

function connect() {
  sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
}

module.exports = {
  "connect": connect
};