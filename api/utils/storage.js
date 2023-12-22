// @ts-check
const CACHE = process.cwd() + '/.stor',
  HIST = process.cwd() + '/.hist',
  { readFileSync, writeFileSync, statSync } = require('fs'),
  { writeFile } = require('fs/promises');

/** @type {_File[]} */
let _cache;

/** @type {_File[]} */
let _history;

loadCache();

/**
 * @param {string} key
 * @param {_File[]} file
 * @returns {_File|undefined}
 */
const find = (key, file) => file?.find((e) => e.key === key);

/**
 * @param {Array<any>} arr 
 * @returns {Array<any>}
 */
const removeDuplicates = (arr) => Array.from(new Set(arr));

/**
 * @param {any} v 
 * @returns {boolean}
 */
const isObject = (v) => !!v && typeof v === 'object' && !Array.isArray(v);

/**
 * @example
 * await api.utils.storage.get('password'); //=> 'abcd1234'
 *
 * @example
 * // Set default value if value doesn't exist
 * await api.utils.storage.get('password', {
 *   default: 'defaultValue'
 * }); //=> 'defaultValue'
 *
 * @example
 * // Delete entry after retrieving the value
 * await api.utils.storage.get('password', {
 *   delete: true
 * }); //=> 'defaultValue'
 *
 * await api.utils.storage.get('password'); //=> null
 *
 * @param {string} key
 * @param {Object} [options]
 * @param {any} [options.default] - Set default value if value doesn't exist
 * @param {boolean} [options.delete] - Delete entry after retrieving the value
 * @returns {Promise<any>}
 */
const get = async (key, options = {}) => {
  const value = (find(key, _cache) || {}).value || null;
  if (value) {
    if (options?.delete) await _del(key);
    return value;
  }
  if (value === null && options?.default) {
    _cache.push({ key, value: options.default });
    await save(_cache);
    return options?.default;
  }
};

// ////////////////////// GETMANY ////////////////////////
/**
 * @example
 * await api.utils.storage.getMany(['password', 'password2', 'password3'])
 * //=> { password: 'abc123', password2: '123abc', password3: undefined }
 *
 * @param {Array<string>} keys
 * @returns {Promise<{[x: string]: any}>}
 */
const getMany = async (keys = []) => {
  /** @type {{[x: string]: any}} */
  const results = {};
  
  await Promise.all(keys.map(async (key) => {
    const value = await get(key);
    results[key] = value;
  }));

  return results;
};


// //////////////////////// SET //////////////////////////
/**
 * @example
 * await api.utils.storage.set({
 *   key: 'password',
 *   value: 'abcd1234'
 * });
 *
 * @example
 * await api.utils.storage.set({
 *   key: 'password',
 *   value: 'abcd1234',
 *   ttl: 5000, // 5 seconds
 *   ttlCb: () => console.log('password expired')
 * });
 * 
 * @example
 * await api.utils.storage.set({
 *   key: 'password',
 *   value: 'abcd1234',
 *   allow_overwrite: false
 * });
 * 
 * await api.utils.storage.set({
 *   key: 'password',
 *   value: 'newvalue',
 * }); //=> error
 *
 * @param {Object} options
 * @param {string} options.key
 * @param {*} options.value
 * @param {number} [options.ttl] - Amount of time in ms that this value will be stored
 * @param {Function} [options.ttlCb] - A function to invoke upon expiration
 * @param {boolean} [options.allow_overwrite] - Whether to allow this key's value to be overwritten
 * @returns 
 */
const set = async (options = { key: '', value: undefined }) => {
  
  const {
    key, value, ttl, ttlCb,
    allow_overwrite = options.allow_overwrite !== false
  } = options;

  validate(options);

  const oldValue = find(key, _cache);

  if (oldValue && JSON.stringify(options) == JSON.stringify(oldValue)) return;
  if (oldValue && 'allow_overwrite' in oldValue && !allow_overwrite) 
    throw new Error(`The value for \`${key}\` is not allowed to be overwritten.`);

  if (oldValue) 
    if (!_history.length || oldValue.value !== value || !_history.some((x) => x.key === key)) {
      if (!_history.length || !_history.some((x) => x.key === key)) {
        if (!_history.find((x) => x.key === key)?.values?.some((y) => y.includes(value)))
          _history.push({ key, values: [[value, Date.now()]] });
      } else if (!_history.find((x) => x.key === key)?.values?.some((y) => y.includes(value)))
        (_history.find((x) => x.key === key))?.values?.push([value, Date.now()]);
      await save(_history, 'history');
    }

  /**
   * @type {string|undefined}
   */
  let newkey = undefined, newvalue = undefined;

  if (!!options && typeof options === 'object' && options.constructor === Object && !key)
    for (const k of Object.keys(options)) {
      !get(key) ? newkey = k.split(/\\?\./).join('\\.') : '';
      newvalue = options[k];
    }

  /** @type {_File} */
  const entry = {
    key: newkey ?? key, value: newvalue ?? value,
    expire: ttl ? ttl + Date.now() : undefined,
    allow_overwrite: allow_overwrite ? undefined : false
  };

  if (entry.expire !== undefined && !isNaN(entry.expire))
    entry.timeout = setTimeout(async () => {
      await _del(key);
      if (ttlCb) ttlCb(key, value);
    }, ttl);
  
  const index = _cache.findIndex((i) => i.key === find(newkey ?? key, _cache)?.key);
  if (index !== -1) _cache[index] = entry;
  else _cache.push(entry);

  await save(_cache);
  return value;
};

// ////////////////////// SETMANY ////////////////////////
/**
 * @example
 * await api.utils.storage.setMany({
 *   keyname1: 'value1',
 *   keyname2: 'value2',
 *   keyname3: 'value3'
 * })
 *
 * @param {Object} entries
 * @param {string} entries.key
 * @param {any} entries.value
 * @returns {Promise<undefined>}
 */
const setMany = async (entries = { key: '', value: undefined }) => {
  const setPromises = Object.entries(entries).map(([key, value]) =>
    set({ key, value }));
  await Promise.all(setPromises);
};

// ////////////////////// DELETE ////////////////////////
/**
 * @example
 * await api.utils.storage.delete('password'); //=> true
 *
 * @param {string} key
 * @returns {Promise<boolean>}
 */
const _delete = async (key) => {
  const old = find(key, _cache);
  if (old) {
    clearTimeout(old.timeout);
    if (!old.expire || (!isNaN(old.expire) && old.expire < Date.now())) {
      await _del(key);
      return true;
    }
  }
  return false;
};


/**
 * @example
 * await api.utils.storage.deleteMany(['password', 'password2', 'password3]);
 * //=> [true, true, false]
 * 
 * @param {string[]} keys - Array of keys to delete
 * @returns {Promise<boolean[]>} - Promise resolving to an array of booleans indicating success or failure for each deletion operation
 */
const deleteMany = async (keys = []) => {
  const deletionResults = [];

  for (const key of keys) {
    const success = await _delete(key);
    deletionResults.push(success);
  }

  return deletionResults;
};

// ////////////////////// MERGE /////////////////////////
/**
 * @example
 * await api.utils.storage.set({
 *   key: 'object',
 *   value: { a: 'b' }
 * });
 * 
 * await api.utils.storage.merge('object', { c: 'd' });
 * //=> new value: { a: 'b', c: 'd' }
 * 
 * await api.utils.storage.merge('object', { a: 'z' });
 * //=> new value: { a: 'z', c: 'd' }
 *
 * @param {string} key
 * @param {any} value
 * @returns {Promise<any>}
 */
const merge = async (key, value) => {
  const oldVal = get(key);
  if (isObject(value) && isObject(oldVal)) {
    value = Object.assign(get(key), value);
  } else throw new Error('Both new and old values must to be objects');
  return set({ key, value });
};

// ////////////////////// PUSH /////////////////////////

/**
 * @example
 * await api.utils.storage.set({
 *   key: 'array',
 *   value: [1, 2]
 * });
 * 
 * await api.utils.storage.push('array', 3, 4);
 * //=> new value: [1, 2, 3, 4]
 * 
 * await api.utils.storage.push('array', [5, 6], 7);
 * //=> new value: [ 1, 2, [ 5, 6 ], 7 ]
 *
 * // keep duplicates
 * await api.utils.storage.push('array', 1, 7);
 * //=> new value: [ 1, 2, [ 5, 6 ], 7, 1, 7 ]
 * 
 * // filter out duplicates
 * await api.utils.storage.push('array', 1, 7, {
 *   unique: true
 * });
 * //=> new value: [ 1, 2, [ 5, 6 ], 7 ]
 * 
 * @param {string} key
 * @param {...any} args
 * @returns {Promise<Array<any>>}
 */
const push = async (key, ...args) => {
  const { unique = false } = typeof args[args.length - 1] === 'object' ? args.pop() : {};
  const oldValues = get(key);
  if (!Array.isArray(oldValues)) throw new Error('Existing value must be an Array');
  const value = unique
    ? removeDuplicates([...oldValues, ...args])
    : [...oldValues, ...args];
  return set({ key, value });
};

// ////////////////////// EXPORT /////////////////////////
/**
 * @example
 * api.utils.storage.export();
 * //=> {"password": {"value": "abcd1234"}}
 *
 * @returns {{[x: string]: { value: any, expire?: number }}}
 */
const _export = () => {

  /** @type {{[x: string]: { value: any, expire?: number }}} */
  const exported = {};

  for (const key of _cache) {
    if (key.key === 'history') continue;
    exported[key.key] = key.value;
    if (key.expire) exported[key.key].expire = key.expire;
  }
  return exported;
};

// ///////////////////////////////////////////////////////
// ////////////////////// HELPERS ////////////////////////
// ///////////////////////////////////////////////////////

/**
 * @param {string} key
 * @returns {Promise<void>}
 */
async function _del(key) {
  _cache = _cache.filter((e) => e.key !== key);
  await save(_cache);
}

function loadCache() {
  try {
    // @ts-ignore
    _cache = JSON.parse(readFileSync(CACHE));
  } catch (error) {
    // @ts-ignore
    if (error.code === 'ENOENT')
      writeFileSync(CACHE, JSON.stringify([]));
    _cache = [];
  }

  try {
    // @ts-ignore
    _history = JSON.parse(readFileSync(HIST));
  } catch (error) {
    // @ts-ignore
    if (error.code === 'ENOENT')
      writeFileSync(HIST, JSON.stringify([]));
    _history = [];
  }
}

/**
 * @param {_File[]} content
 * @param {string} [file]
 */
async function save(content, file) {
  if (file === 'history') {
    try {
      return writeFile(HIST, JSON.stringify(content));
    } catch (e) {
      throw new Error('Unable to save history:');
    }
  }

  /**
   * @type {Array<Object>}
   */
  const timeouts = [];
  content.forEach((item) => {
    if (item.timeout) {
      timeouts.push(item.key, item.timeout);
      delete item.timeout;
    }
  });

  try {
    const cacheString = JSON.stringify(content);

    content.forEach((item) => {
      if (timeouts[0] === item['key'])
        item.timeout = timeouts[1];
    });

    await writeFile(CACHE, cacheString);
  } catch (e) {
    throw new Error('Unable to save cache:');
  }
};

/**
 * @param {Object} options
 * @param {string|undefined} [options.key]
 * @param {any} [options.value] 
 */
function validateKeyVals(options) {
  if (typeof options !== 'object' || Array.isArray(options))
    throw new Error('Parameters must be an object.');

  if (('key' in options || 'value' in options) && !('key' in options && 'value' in options))
    throw new Error('If providing `key` or `value`, both `key` and `value` are required.');

  if (!options.value) throw new Error(`Value of \`${options.key}\` is undefined`);
}


/**
 * @param {number} [ttl]
 */
function validateTTL(ttl) {
  if (typeof ttl !== 'undefined' && (typeof ttl !== 'number' || isNaN(ttl) || ttl <= 0))
    throw new Error('ttl must be a positive number');
}

/**
 * @param {Function} [ttlCb]
 */
function validateTTLCallback(ttlCb) {
  if (typeof ttlCb !== 'undefined' && typeof ttlCb !== 'function')
    throw new Error('ttlCb must be a function');
}

/**
 * @param {Object} [options]
 * @param {string} [options.key]
 * @param {any} [options.value]
 * @param {number} [options.ttl]
 * @param {Function} [options.ttlCb]
 */
function validate(options) {
  if (!options)
    throw new Error('Please provide the required parameters');
  validateKeyVals(options);
  validateTTL(options.ttl);
  validateTTLCallback(options.ttlCb);
}

module.exports = {
  set,
  setMany,
  get,
  getMany,
  deleteMany,
  merge,
  push,
  
  /**
   * @example
   * api.utils.storage.filter((x) => x.key.includes('ass'));
   * //=> [{ key: 'password', value: 'abc123' }]
   * 
   * @param {(file: _File) => boolean} predicate 
   * @returns {_File[]}
   */
  filter: (predicate) => _cache.filter(predicate),

  /**
   * @example
   * api.utils.storage.all();
   * // [
   * //   { key: 'array', value: [ 1, 2, [Array], 7 ] },
   * //   { key: 'password', value: 'abc123' }
   * // ]
   * @returns {Array<_File[]>}
   */
  // @ts-ignore
  all: () => JSON.parse(readFileSync(CACHE)),

  /**
   * @example
   * api.utils.storage.has('password'); //=> true
   *
   * @param {string} key
   * @returns {boolean}
   */
  has: (key) => !!find(key, _cache),
  
  /**
   * @example
   * api.utils.storage.entries();
   * //=> [ [ 'password', 'abcd1234' ], [ 'test', '4321dcba' ] ]
   *
   * @returns {Array<Array<string>>}
   */
  entries: () => _cache.map((e) => [e.key, e.value]),
  
  /**
   * @example
   * api.utils.storage.keys();
   * //=> ['password', 'stuff']
   *
   * @returns {Array<string>}
   */
  keys: () => _cache.map((e) => e.key),
  
  /**
   * @example
   * api.utils.storage.values();
   * //=> ['abc123', '123abc']
   *
   * @returns {Array<string>}
   */
  values: () => _cache.map((e) => e.key),

  /**
   * @example
   * api.utils.storage.size(); //=> 2
   *
   * @returns {number}
   */
  size: () => _cache.length,
  
  /**
   * @example
   * api.utils.storage.bytes(); // 1494 (bytes)
   * 
   * @returns {number}
   */
  bytes: () => statSync(CACHE).size,

  /**
   * @example
   * api.utils.storage.toJson();
   * //=> [{"key":"array","value":[1,2,[5,6],7]},{"key":"password","value":"abc123"}]
   *
   * @returns {string}
   */
  toJson: () => {
    _cache?.forEach((item) => {
      if (item?.timeout) delete item?.timeout;
    });
    return JSON.stringify(_cache);
  },
  
  /**
   * @example
   * api.utils.storage.clear();
   *
   * @returns {Promise<void>}
   */
  clear: async () => writeFile(CACHE, JSON.stringify([])),
  
  /**
   * @example
   * api.utils.storage.equals('password', 'abcd1234');
   * //=> true
   *
   * @param {string} key
   * @param {any} value
   * @returns {Promise<boolean>}
   */
  equals: async (key, value) => {
    const found = await get(key);
    return found && found === value;
  },

  /**
   * @example
   * api.utils.storage.history('password');
   * // [
   * //   { value: 'first', timestamp: 1703037628164 },
   * //   { value: 'second', timestamp: 1703037861827 },
   * //   { value: 'third', timestamp: 1703037890201 }
   * // ]
   *
   * @param {string} key
   * @returns {{value: any, timestamp: number}[]|undefined}
   */
  history: (key) => (_history.find((x) => x.key === key))?.values?.map((x) => ({ 
    value: x[0], timestamp: x[1] 
  })),

  /**
   * @example
   * // Clear history for a specific key
   * api.utils.storage.clearHistory('password');
   * 
   * // Clear all entries in history
   * api.utils.storage.clearHistory();
   *
   * @param {string} [key]
   * @param {any} [filtered]
   * @returns {undefined}
   */
  clearHistory: (key, filtered = []) => {
    if (key) filtered = _history.filter((x) => x.key !== key);
    writeFile(HIST, JSON.stringify(filtered));
  }
  
};

module.exports.delete = _delete;
module.exports.export = _export;

/**
 * @typedef {Object} _File
 * @property {string} key
 * @property {?any} [value]
 * @property {Array<Array<any>>} [values]
 * @property {number} [ttl] - The duration in ms this value will be stored
 * @property {Function} [ttlCb] - A function to invoke upon expiration
 * @property {boolean} [allow_overwrite] - Whether to allow this key's value to be overwritten
 * @property {number|undefined} [expire]
 * @property {?any} [timeout]
 */