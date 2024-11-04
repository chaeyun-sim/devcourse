const pool = require('./db');

const conn = async () => await pool.getConnection();

module.exports = conn;
