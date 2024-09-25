const express = require('express');
const pool = require('./mariadb');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SHOW TABLES');
    res.send(`Database connection successful: ${JSON.stringify(rows)}`);
  } catch (err) {
    res.status(500).send(`Database connection failed: ${err.message}`);
  } finally {
    if (conn) conn.release();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
