const mariadb = require('mariadb');

const conn = mariadb.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  connectionLimit: 5,
});

module.exports.conn = conn;
