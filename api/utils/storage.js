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
 * api.utils.storage.get('password'); //=> 'abcd1234'
 *
 * @param {string} key
 * @returns {any}
 */
const get = (key) => (find(key, _cache) || {}).value || null;

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
  validateKeyVals(options);
  const {
    key, value, ttl, ttlCb,
    allow_overwrite = options.allow_overwrite !== false
  } = options;

  validateTTL(ttl);
  validateTTLCallback(ttlCb);

  const oldValue = find(key, _cache);
  if (oldValue && JSON.stringify(options) == JSON.stringify(oldValue)) return;
  if (oldValue && 'allow_overwrite' in oldValue && !allow_overwrite) 
    throw new Error(`The value for \`${key}\` is not allowed to be overwritten.`);

  if (oldValue)
    if (!_history.length || (oldValue && oldValue !== value) || !_history.some(x => x.key === key)) {
      !_history.length || !_history.some(x => x.key === key)
        ? _history.push({ key, values: [[value, Date.now()]] })
        : (_history.find((x) => x.key === key))?.values?.push([value, Date.now()]);
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

module.exports = {
  set,
  get,
  merge,
  push,
  
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
   * @returns {boolean}
   */
  equals: (key, value) => get(key) && get(key) === value,

  /**
   * @example
   * api.utils.storage.history('password');
   * // [
   * //   { key: 'first', timestamp: 1703037628164 },
   * //   { key: 'second', timestamp: 1703037861827 },
   * //   { key: 'third', timestamp: 1703037890201 }
   * // ]
   *
   * @param {string} key
   * @returns {{value: any, timestamp: number}[]|undefined}
   */
  history: (key) => (_history.find((x) => x.key === key))?.values?.map((x) => ({ 
    value: x[0], timestamp: x[1] 
  }))

  
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