const { Pool } = require('pg');

const pool = new Pool({
  user: 'lily',
  password: '1359',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'md_press'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
