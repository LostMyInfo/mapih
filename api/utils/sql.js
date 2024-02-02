// @ts-check
const mysql = require('mysql2/promise');

module.exports = {
  execute: async (/** @type {string} */queryString) => await connect('execute', queryString),
  query: async (/** @type {string} */queryString) => await connect('query', queryString),
  queryAll: async (/** @type {string} */queryString) => await connect('queryAll', queryString),
  queryOne: async (/** @type {string} */queryString) => await connect('queryOne', queryString),
  queryInsert: async (/** @type {string} */queryString) => await connect('queryInsert', queryString),
  queryUpdate: async (/** @type {string} */queryString) => await connect('queryUpdate', queryString)
};

/**
 * @param {string} method 
 * @param {string} string 
 * @returns 
 */
async function connect(method, string) {
  try {
    const connection = await mysql.createConnection(process.env.db_connection_uri ?? {
      host: process.env.db_host,
      port: process.env.db_port ? parseInt(process.env.db_port) : undefined,
      user: process.env.db_user,
      password: process.env.db_password,
      database: process.env.db_database,
      charset: 'utf8mb4',
      ssl: { rejectUnauthorized: false },
      debug: false,
      trace: false,
      connectTimeout: 10000,
      waitForConnections: true,
      connectionLimit: 100,
      queueLimit: 0,
      stringifyObjects: true,
      supportBigNumbers: true,
      bigNumberStrings: true,
      namedPlaceholders: true,
      dateStrings: true,
      typeCast: true,
      timezone: 'local',
      flags: []
    // enableKeepAlive: false
    });

    const result = await connection[method === 'execute' ? 'execute' : 'query'](string);
    await connection.end();
    
    return method === 'execute' || method === 'query'
      ? (result[0] || false)
      : method === 'queryAll' ? result || false
        : method === 'queryOne' ? result[0][0] || false
          : method === 'queryInsert' ? result.insertId || false
            : result.affectedRows || false;
                    
  } catch (error) {
    console.log(error);
  }
}