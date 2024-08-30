// @ts-check
const mysql = require('mysql2/promise');

/**
 * Custom error class for MySQL Storage operations
 * @extends Error
 */
class MySQLStorageError extends Error {
  /**
   * @param {string} message - Error message
   * @param {string} operation - The operation that caused the error
   * @param {MySQLOriginalError | Error} originalError - The original error object
   */
  constructor(message, operation, originalError) {
    super(message);
    this.name = 'MySQLStorageError';
    this.operation = operation;
    this.originalError = originalError;
  }
}

/**
 * MySQL Storage class for key-value operations
 */
class MySQLStorage {

  /** @type {?MySQLStorage} */
  static instance = null;

  /**
   * @param {MySQLStorageConfig} [config={}] - Configuration object
   */
  constructor(config = {}) {
    if (!MySQLStorage.instance) {

      /** @type {MySQLStorageConfig} */
      this.config = {
        host: config.host || process.env.DB_HOST || 'localhost',
        port: config.port ?? parseInt(process.env.DB_PORT || '3306', 10),
        user: config.user || process.env.DB_USER,
        password: config.password || process.env.DB_PASSWORD,
        database: config.database || process.env.DB_DATABASE,
        tableName: config.tableName || process.env.DB_TABLE || 'key_value_store'
      };

      /** @type {?mysql.Pool} */
      this.pool = null;

      /** @type {boolean} */
      this.isInitialized = false;

      MySQLStorage.instance = this;
    }

    return MySQLStorage.instance;
  }

  /**
   * Initialize the database connection and create the table if it doesn't exist
   * @returns {Promise<void>}
   * @throws {MySQLStorageError}
   */
  async initialize() {
    if (this.isInitialized) return;
    if (!this.config.database) throw new MySQLStorageError('Database name is required', 'initialize', new Error('Database is undefined'));

    try {
      this.pool = mysql.createPool({
        host: this.config.host,
        user: this.config.user,
        password: this.config.password,
        database: this.config.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      await this.createTable();
      this.isInitialized = true;
      // console.log('MySQL Storage initialized successfully');
    } catch (/** @type {any} */ error) {
      throw new MySQLStorageError('Failed to initialize storage', 'initialize', error);
    }
  }

  /**
   * Create the key-value table if it doesn't exist
   * @returns {Promise<void>}
   * @throws {MySQLStorageError}
   */
  async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${this.config.tableName} (
        key_name VARCHAR(255) PRIMARY KEY,
        value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    try {
      if (!this.pool)
        throw new Error('Database pool is not initialized');

      await this.pool.query(createTableQuery);
    } catch (/** @type {any} */ error) {
      throw new MySQLStorageError('Failed to create table', 'createTable', error);
    }
  }

  /**
   * Ensure the database connection is established and return the pool
   * @returns {Promise<mysql.Pool>}
   * @throws {MySQLStorageError}
   */
  async getPool() {
    if (!this.isInitialized) await this.initialize();
    if (!this.pool) throw new MySQLStorageError('Database pool is not initialized', 'getPool', new Error('Pool is null'));
    return this.pool;
  }

  /**
   * Set a value for a key
   * @param {string} key - The key to set
   * @param {*} value - The value to set
   * @returns {Promise<boolean>} - True if the operation was successful
   * @throws {MySQLStorageError}
   */
  async set(key, value) {
    const
      pool = await this.getPool(),
      query = `
        INSERT INTO ${this.config.tableName} (key_name, value)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE value = ?
      `;

    try {
      const [result] = /** @type {[mysql.ResultSetHeader, mysql.FieldPacket[]]} */ (
        await pool.query(query, [key, JSON.stringify(value), JSON.stringify(value)])
      );
      return result.affectedRows > 0;
    } catch (/** @type {any} */ error) {
      throw new MySQLStorageError('Failed to set value', 'set', error);
    }
  }

  /**
   * Get the value for a key
   * @param {string} key - The key to get
   * @returns {Promise<*|null>} - The value for the key, or null if not found
   * @throws {MySQLStorageError}
   */
  async get(key) {
    const
      pool = await this.getPool(),
      query = `SELECT value FROM ${this.config.tableName} WHERE key_name = ?`;

    try {
      const [rows] = /** @type {[mysql.RowDataPacket[], mysql.FieldPacket[]]} */ (
        await pool.query(query, [key])
      );
      if (rows.length > 0) return JSON.parse(rows[0].value);
      return null;
    } catch (/** @type {any} */ error) {
      if (error instanceof SyntaxError)
        throw new MySQLStorageError('Failed to parse stored JSON', 'get', error);
      throw new MySQLStorageError('Failed to get value', 'get', error);
    }
  }

  /**
   * Delete a key-value pair
   * @param {string} key - The key to delete
   * @returns {Promise<boolean>} - True if the key was deleted, false if it didn't exist
   * @throws {MySQLStorageError}
   */
  async delete(key) {
    const
      pool = await this.getPool(),
      query = `DELETE FROM ${this.config.tableName} WHERE key_name = ?`;

    try {
      const [result] = /** @type {[mysql.ResultSetHeader, mysql.FieldPacket[]]} */ (
        await pool.query(query, [key])
      );
      return result.affectedRows > 0;
    } catch (/** @type {any} */ error) {
      throw new MySQLStorageError('Failed to delete key', 'delete', error);
    }
  }

  /**
   * Check if a key exists
   * @param {string} key - The key to check
   * @returns {Promise<boolean>} - True if the key exists, false otherwise
   * @throws {MySQLStorageError}
   */
  async has(key) {
    const
      pool = await this.getPool(),
      query = `SELECT 1 FROM ${this.config.tableName} WHERE key_name = ?`;

    try {
      const [rows] = /** @type {[mysql.RowDataPacket[], mysql.FieldPacket[]]} */ (
        await pool.query(query, [key])
      );
      return rows.length > 0;
    } catch (/** @type {any} */ error) {
      throw new MySQLStorageError('Failed to check key existence', 'has', error);
    }
  }

  /**
   * Clear all key-value pairs
   * @returns {Promise<void>}
   * @throws {MySQLStorageError}
   */
  async clear() {
    const
      pool = await this.getPool(),
      query = `TRUNCATE TABLE ${this.config.tableName}`;

    try {
      await pool.query(query);
    } catch (/** @type {any} */ error) {
      throw new MySQLStorageError('Failed to clear storage', 'clear', error);
    }
  }

  /**
   * Get all keys
   * @returns {Promise<string[]>} - Array of all keys
   * @throws {MySQLStorageError}
   */
  async keys() {
    const
      pool = await this.getPool(),
      query = `SELECT key_name FROM ${this.config.tableName}`;

    try {
      const [rows] = /** @type {[mysql.RowDataPacket[], mysql.FieldPacket[]]} */ (
        await pool.query(query)
      );
      return rows.map(row => row.key_name);
    } catch (/** @type {any} */ error) {
      throw new MySQLStorageError('Failed to get keys', 'keys', error);
    }
  }

  /**
   * Get the number of key-value pairs
   * @returns {Promise<number>} - The number of key-value pairs
   * @throws {MySQLStorageError}
   */
  async size() {
    const
      pool = await this.getPool(),
      query = `SELECT COUNT(*) as count FROM ${this.config.tableName}`;

    try {
      const [rows] = /** @type {[mysql.RowDataPacket[], mysql.FieldPacket[]]} */ (
        await pool.query(query)
      );
      return rows[0].count;
    } catch (/** @type {any} */ error) {
      throw new MySQLStorageError('Failed to get size', 'size', error);
    }
  }

  /**
   * Close the database connection
   * @returns {Promise<void>}
   * @throws {MySQLStorageError}
   */
  static async closeConnection() {
    if (MySQLStorage.instance && MySQLStorage.instance.pool) {
      try {
        await MySQLStorage.instance.pool.end();
        console.log('Database connection closed');
      } catch (/** @type {any} */ error) {
        throw new MySQLStorageError('Failed to close database connection', 'closeConnection', error);
      }
    }
  }
}

// Ensure the connection is closed when the Node process exits
process.on('exit', () => {
  MySQLStorage.closeConnection().catch(console.error);
});

// Handle other termination signals
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal => {
  process.on(signal, () => {
    MySQLStorage.closeConnection().catch(console.error);
    process.exit();
  });
});

module.exports = { MySQLStorage, MySQLStorageError };

/**
 * @typedef {Object} MySQLStorageConfig
 * @property {string} [host] - The database host
 * @property {number} [port] - The database port
 * @property {string} [user] - The database user
 * @property {string} [password] - The database password
 * @property {string} [database] - The database name
 * @property {string} [tableName] - The table name for key-value storage
 */

/**
 * Represents the structure of an original MySQL error.
 * @typedef {Object} MySQLOriginalError
 * @property {string} message - The error message
 * @property {string} code - The error code
 * @property {string} errno - The error number
 * @property {string} sql - The SQL query that caused the error
 * @property {string} sqlState - The SQL state
 * @property {string} sqlMessage - The SQL message
 */
