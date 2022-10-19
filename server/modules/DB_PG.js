const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DBSERVER,
  port: process.env.DBPORT,
  database: process.env.DBNAME,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  max: parseInt(process.env.DBPG_MAX_CONNECTIONS),
  idleTimeoutMillis: parseInt(process.env.DBPG_IDLETIMEOUTMILLLIS),
  connectionTimeoutMillis: parseInt(process.env.DBPG_CONNECTIONTIMEOUTMILLES),
});

async function query(text, params) {
  try {
    res = await pool.query(text, params);
    // console.log("await res ==>", res)
    return res;
  } catch (err) {
    return { err: 1 };
  }
}
async function getConnected() {
  try {
    const { rowCount } = await query("SELECT 1", []);
    return !!rowCount;
  } catch (err) {
    console.log("err getConnected ==>", err);
    return false;
  }
}

module.exports = {
  query: (text, params) => query(text, params),
  callback: (text, params, callback) => pool.query(text, params, callback),
  getConnected: () => getConnected(),
};
