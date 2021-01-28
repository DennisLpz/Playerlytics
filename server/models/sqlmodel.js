const { Pool } = require("pg");
//this is the link of user DB
const PG_URI =
  "POSTGRES-LINK";
  const pool = new Pool({
    connectionString: PG_URI,
  });
//this module export will will be used so we can run query methods on our SQL DB
  module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback);
    },
  };