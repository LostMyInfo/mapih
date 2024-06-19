/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const CACHE = process.cwd() + '/.stor',
  HIST = process.cwd() + '/.hist',
  LISTENERS = process.cwd() + '/.listeners',
  { readFileSync, writeFileSync, statSync } = require('fs'),
  { writeFile, readFile } = require('fs/promises');

/** @type {_File[]} */
let _cache;

/** @type {_History[]} */
let _history;

/** @type {_Listener} */
let _listeners;

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
 * @param {boolean} [options.keep_history] - Keeps the history for this key. For use only when using the delete option.
 * @param {boolean} [options.keep_listeners] - Keeps the listeners for this key. For use only when using the delete option.
 * @returns {Promise<any>}
 */
const get = async (key, options) => {
  const { value, saveCache } = prepareGet(key, options?.default);

  if (options?.delete) {
    const deletePromises = [ _del(key) ];
    if (!options.keep_listeners) deletePromises.push(removeListener(key));
    if (!options.keep_history) deletePromises.push(clearHistory(key));
    await Promise.all(deletePromises);
  }

  if (saveCache) await save(_cache);
  return value;
};

/**
 * @example
 * api.utils.storage.getSync('password'); //=> 'abcd1234'
 *
 * @example
 * // Set default value if value doesn't exist
 * api.utils.storage.getSync('password', {
 *   default: 'defaultValue'
 * }); //=> 'defaultValue'
 *
 * @example
 * // Delete entry after retrieving the value
 * api.utils.storage.getSync('password', {
 *   delete: true
 * }); //=> 'defaultValue'
 *
 * api.utils.storage.getSync('password'); //=> null
 *
 * @param {string} key
 * @param {Object} [options]
 * @param {any} [options.default] - Set default value if value doesn't exist
 * @param {boolean} [options.delete] - Delete entry after retrieving the value
 * @param {boolean} [options.keep_history] - Keeps the history for this key. For use only when using the delete option.
 * @param {boolean} [options.keep_listeners] - Keeps the listeners for this key. For use only when using the delete option.
 * @returns {any}
 */
const getSync = (key, options) => {
  const { value, saveCache } = prepareGet(key, options?.default);

  if (options?.delete) {
    _delSync(key);
    if (!options?.keep_listeners) removeListenerSync(key);
    if (!options?.keep_history) clearHistorySync(key);
  }

  if (saveCache) saveSync(_cache);
  return value;
};

// ////////////////////// GETMANY ////////////////////////
/**
 * Get multiple key's values at a time.
 * \* This will not trigger any listeners
 *
 * @example
 * await api.utils.storage.getMany(['password', 'password2', 'password3'])
 * //=> { password: 'abc123', password2: '123abc', password3: undefined }
 *
 * @param {Array<string>} keys
 * @returns {Promise<{[x: string]: any}>}
 */
const getMany = async (keys = []) => {
  const values = await Promise.all(keys.map(key => get(key)));
  return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
};

// ////////////////////// GETMANYSYNC ////////////////////////
/**
 * Get multiple key's values at a time.
 * \* This will not trigger any listeners
 *
 * @example
 * api.utils.storage.getManySync(['password', 'password2', 'password3'])
 * //=> { password: 'abc123', password2: '123abc', password3: undefined }
 *
 * @param {Array<string>} keys
 * @returns {{[x: string]: any}}
 */
const getManySync = (keys = []) => {
  const values = keys.map(key => getSync(key));
  return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
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
 * @param {Function} [options.on_change] - A function to invoke when key is modified
 * @returns
 */
const set = async (options) => {
  validate(options);
  const { key, value, ttl, ttlCb, on_change } = options;

  await saveHistory(key, value);
  if (on_change) await addListener(key, on_change);
  const entry = prepareSet(options);

  if (entry?.expire !== undefined && !isNaN(entry.expire))
    entry.timeout = setTimeout(async () => {
      await _del(key);
      if (ttlCb) ttlCb(key, value);
    }, ttl);

  await save(_cache);
  return value;
};

// //////////////////////// setSync //////////////////////////
/**
 * @example
 * api.utils.storage.setSync({
 *   key: 'password',
 *   value: 'abcd1234'
 * });
 *
 * @example
 * api.utils.storage.setSync({
 *   key: 'password',
 *   value: 'abcd1234',
 *   ttl: 5000, // 5 seconds
 *   ttlCb: () => console.log('password expired')
 * });
 *
 * @example
 * api.utils.storage.setSync({
 *   key: 'password',
 *   value: 'abcd1234',
 *   allow_overwrite: false
 * });
 *
 * api.utils.storage.setSync({
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
 * @param {Function} [options.on_change] - A function to invoke when key is modified
 * @returns
 */
const setSync = (options = { key: '', value: undefined }) => {
  validate(options);
  const { key, value, ttl, ttlCb, on_change } = options;

  saveHistorySync(key, value);
  if (on_change) addListenerSync(key, on_change);
  const entry = prepareSet(options);

  if (entry?.expire !== undefined && !isNaN(entry.expire))
    entry.timeout = setTimeout(() => {
      _delSync(key);
      if (ttlCb) ttlCb(key, value);
    }, ttl);

  saveSync(_cache);
  return value;
};

// ////////////////////// setMany ////////////////////////
/**
 * Set multiple key's values at a time.
 * \* This will not trigger any listeners
 *
 * @example
 * await api.utils.storage.setMany({
 *   keyname1: 'value1',
 *   keyname2: 'value2',
 *   keyname3: 'value3'
 * })
 *
 * @param {Record<string, any>} entries
 * @returns {Promise<any[]>}
 */
const setMany = async (entries = { key: '', value: undefined }) =>
  Promise.all(
    Object.entries(entries).map(([key, value]) =>
      set({ key, value })
    )
  );

// ////////////////////// SETMANYSYNC ////////////////////////
/**
 * Set multiple key's values at a time.
 * \* This will not trigger any listeners
 *
 * @example
 * api.utils.storage.setManySync({
 *   keyname1: 'value1',
 *   keyname2: 'value2',
 *   keyname3: 'value3'
 * })
 *
 * @param {Record<string, any>} entries
 * @returns {any[]}
 */
const setManySync = (entries = { key: '', value: undefined }) =>
  Object.entries(entries).map(([key, value]) =>
    setSync({ key, value })
  );

// ////////////////////// delete ////////////////////////
/**
 * @example
 * await api.utils.storage.delete('password'); //=> true
 *
 * @param {string} key
 * @param {Object} [options]
 * @param {boolean} [options.keep_history]
 * @param {boolean} [options.keep_listeners]
 * @returns {Promise<boolean>}
 */
const _delete = async (key, options = { keep_history: false, keep_listeners: false }) => {
  const old = find(key, _cache);
  if (!old) return false;

  onChange(key);

  if (!options.keep_history) await clearHistory(key);
  if (!options.keep_listeners) await removeListener(key);
  if (old.timeout) clearTimeout(old.timeout);
  if (!old.expire || (!isNaN(old.expire) && old.expire < Date.now())) {
    await _del(key);
    return true;
  }
  return false;
};

// ////////////////////// deleteSync ////////////////////////
/**
 * @example
 * api.utils.storage.deleteSync('password'); //=> true
 *
 * @example
 * api.utils.storage.deleteSync('password', {
 *   keep_history: true
 * });
 *
 * @param {string} key
 * @param {Object} [options]
 * @param {boolean} [options.keep_history]
 * @param {boolean} [options.keep_listeners]
 * @returns {boolean}
 */
const deleteSync = (key, options = { keep_history: false, keep_listeners: false }) => {
  const old = find(key, _cache);
  if (!old) return false;

  onChange(key);

  if (!options.keep_history) clearHistorySync(key);
  if (!options.keep_listeners) removeListenerSync(key);
  if (old.timeout) clearTimeout(old.timeout);
  if (!old.expire || (!isNaN(old.expire) && old.expire < Date.now())) {
    _delSync(key);
    return true;
  }
  return false;
};

// ////////////////////// deleteMany ////////////////////////

/**
 * Delete multiple entries at a time.
 * \* This will not trigger any listeners
 * \* This will clear all listeners and/or history for the deleted keys
 *
 * @example
 * await api.utils.storage.deleteMany(['password', 'password2', 'password3]);
 * //=> [true, true, false]
 *
 * @param {string[]} keys - Array of keys to delete
 * @returns {Promise<boolean[]>} - Promise resolving to an array of booleans indicating success or failure for each deletion operation
 */
const deleteMany = async (keys = []) => Promise.all(keys.map(key => _delete(key)));

// ////////////////////// each /////////////////////////

/**
 * @example
 * await api.utils.storage.each((x) => console.log(x))
 *
 * @param {Function} callback
 */
const each = async (callback) => {
  if (typeof callback !== 'function')
    throw new Error('Callback must be a function');
  _cache.forEach(async (x) => {
    await callback(x);
  });
};

// ////////////////////// eachSync /////////////////////////

/**
 * @example
 * api.utils.storage.eachSync((x) => console.log(x))
 *
 * @param {Function} callback
 */
const eachSync = (callback) => {
  if (typeof callback !== 'function')
    throw new Error('Callback must be a function');
  _cache.forEach((x) => {
    callback(x);
  });
};

// ////////////////////// merge /////////////////////////
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
  const oldVal = await get(key);
  if (isObject(value) && isObject(oldVal)) {
    value = Object.assign(oldVal, value);
  } else throw new Error('Both new and old values must be objects');

  onChange(key);
  await saveHistory(key, value);
  return set({ key, value });
};

// ////////////////////// mergeSync /////////////////////////
/**
 * @example
 * api.utils.storage.setSync({
 *   key: 'object',
 *   value: { a: 'b' }
 * });
 *
 * api.utils.storage.mergeSync('object', { c: 'd' });
 * //=> new value: { a: 'b', c: 'd' }
 *
 * api.utils.storage.mergeSync('object', { a: 'z' });
 * //=> new value: { a: 'z', c: 'd' }
 *
 * @param {string} key
 * @param {any} value
 * @returns {any}
 */
const mergeSync = (key, value) => {
  const oldVal = getSync(key);
  if (isObject(value) && isObject(oldVal)) {
    value = Object.assign(oldVal, value);
  } else throw new Error('Both new and old values must to be objects');

  onChange(key);
  saveHistorySync(key, value);
  return setSync({ key, value });
};

// ////////////////////// push /////////////////////////

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
  onChange(key);
  const oldValues = await get(key);
  const value = preparePush(oldValues, ...args);
  await saveHistory(key, value);
  return set({ key, value });
};

// ////////////////////// pushSync /////////////////////////

/**
 * @example
 * api.utils.storage.setSync({
 *   key: 'array',
 *   value: [1, 2]
 * });
 *
 * api.utils.storage.pushSync('array', 3, 4);
 * //=> new value: [1, 2, 3, 4]
 *
 * api.utils.storage.pushSync('array', [5, 6], 7);
 * //=> new value: [ 1, 2, [ 5, 6 ], 7 ]
 *
 * // keep duplicates
 * api.utils.storage.pushSync('array', 1, 7);
 * //=> new value: [ 1, 2, [ 5, 6 ], 7, 1, 7 ]
 *
 * // filter out duplicates
 * api.utils.storage.pushSync('array', 1, 7, {
 *   unique: true
 * });
 * //=> new value: [ 1, 2, [ 5, 6 ], 7 ]
 *
 * @param {string} key
 * @param {...any} args
 * @returns {Promise<Array<any>>}
 */
const pushSync = (key, ...args) => {
  onChange(key);
  const oldValues = getSync(key);
  const value = preparePush(oldValues, ...args);
  saveHistorySync(key, value);
  return setSync({ key, value });
};

// ////////////////////// search /////////////////////////

/**
 * @example
 * await api.utils.storage.search('something');
 * //=> { something: 51, somethingelse: 18, something3: 12 }
 *
 * @param {string} str
 * @param {{[x: string]: any}} res
 * @returns {Promise<{[x: string]: any}>}
 */
const search = async (str, res = {}) => {
  const arr = _cache.map((e) => e.key);
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i].indexOf(str) > -1) res[arr[i]] = await get(arr[i]);
  }
  return res;
};

// ////////////////////// searchSync /////////////////////////

/**
 * @param {string} str
 * @param {{[x: string]: any}} res
 * @returns {{[x: string]: any}}
 */
const searchSync = (str, res = {}) => {
  const arr = _cache.map((e) => e.key);
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i].indexOf(str) > -1) res[arr[i]] = getSync(arr[i]);
  }
  return res;
};

// ////////////////////// increment /////////////////////////

/**
 * @example
 * await api.utils.storage.increment('keyName', 5);
 *
 * @param {string} key
 * @param {number|string} amount
 */
const increment = async (key, amount = 1) => {
  const value = prepareIncrDecr(key, amount, 'incr');
  return set({ key, value });
};

// ////////////////////// incrementSync /////////////////////////

/**
 * @example
 * api.utils.storage.increment('keyName', 5);
 *
 * @param {string} key
 * @param {number|string} amount
 */
const incrementSync = (key, amount = 1) => {
  const value = prepareIncrDecr(key, amount, 'incr');
  return setSync({ key, value });
};

// ////////////////////// decrement /////////////////////////

/**
 * @example
 * await api.utils.storage.decrement('keyName', 5);
 *
 * @param {string} key
 * @param {number|string} amount
 */
const decrement = async (key, amount = 1) => {
  const value = prepareIncrDecr(key, amount);
  return set({ key, value });
};

// ////////////////////// decrementSync /////////////////////////

/**
 * @example
 * api.utils.storage.decrementSync('keyName', 5);
 * @param {string} key
 * @param {number|string} amount
 */
const decrementSync = async (key, amount = 1) => {
  const value = prepareIncrDecr(key, amount);
  return setSync({ key, value });
};

// ////////////////////// export /////////////////////////
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

/**
 * @example
 * // Clear history for a specific key
 * await api.utils.storage.clearHistory('password');
 *
 * // Clear all entries in history
 * await api.utils.storage.clearHistory();
 *
 * @param {string} key
 * @param {Array<_History>} [filtered]
 * @returns {Promise<void>}
 */
async function clearHistory(key, filtered = []) {
  if (key) {
    onChange(key);
    filtered = _history.filter((x) => x.key !== key);
  }
  await writeFile(HIST, JSON.stringify(filtered));
}

/**
 * @example
 * // Clear history for a specific key
 * api.utils.storage.clearHistorySync('password');
 *
 * // Clear all entries in history
 * api.utils.storage.clearHistorySync();
 *
 * @param {string} key
 * @param {Array<_History>} [filtered]
 * @returns {void}
 */
function clearHistorySync(key, filtered = []) {
  if (key) {
    onChange(key);
    filtered = _history.filter((x) => x.key !== key);
  }
  writeFileSync(HIST, JSON.stringify(filtered));
}
// ///////////////////////////////////////////////////////
// ////////////////////// HELPERS ////////////////////////
// ///////////////////////////////////////////////////////

/**
 * @param {string} key
 * @param {any} [defaultVal]
 * @returns {{value: any, saveCache: boolean}}
 */
function prepareGet(key, defaultVal) {
  // const { getPathValue } = require('../resources/functions');
  const value = (find(key, _cache) || {}).value || null;

  /*
  if (value === null && key.split('.').length > 1) {
    const [object, ...path] = key.split('.');
    key = object;
    value = (find(object, _cache) || {}).value || null;
    value = getPathValue(value, path.join('.'));
  } else */

  if (value === null && defaultVal) {
    _cache.push({ key, value: defaultVal });
  }

  onChange(key);
  return {
    value: value ?? defaultVal ?? null,
    saveCache: !!defaultVal
  };
}

/**
 * @param {Object} options
 * @param {string} options.key
 * @param {*} options.value
 * @param {number} [options.ttl] - Amount of time in ms that this value will be stored
 * @param {Function} [options.ttlCb] - A function to invoke upon expiration
 * @param {boolean} [options.allow_overwrite] - Whether to allow this key's value to be overwritten
 * @param {Function} [options.on_change] - A function to invoke when key is modified
 * @returns {{key: string, value: any, expire?: number|undefined, allow_overwrite?: boolean|undefined, timeout?: Object|undefined}|undefined}
 */
function prepareSet(options) {
  const {
    key, value, ttl, allow_overwrite = options.allow_overwrite !== false
  } = options;
  onChange(key);

  /**
   * @type {string|undefined}
   */
  let newkey = undefined, newvalue = undefined;

  if (!!options && typeof options === 'object' && options.constructor === Object && !key)
    for (const k of Object.keys(options)) {
      newkey = k.split(/\\?\./).join('\\.') || k;
      // @ts-ignore
      newvalue = options[k];
    }

  if (!value && !newvalue) return;
  const oldValue = find(key ?? newkey, _cache);

  if (oldValue && (JSON.stringify(value ?? newvalue) == JSON.stringify(oldValue.value))) return;
  if (oldValue && 'allow_overwrite' in oldValue && !allow_overwrite)
    throw new Error(`The value for \`${key}\` is not allowed to be overwritten.`);

  const entry = {
    key: newkey ?? key, value: newvalue ?? value,
    expire: ttl ? ttl + Date.now() : undefined,
    allow_overwrite: allow_overwrite ? undefined : false
  };

  const index = _cache.findIndex((i) => i.key === find(newkey ?? key, _cache)?.key);
  if (index !== -1) _cache[index] = entry;
  else _cache.push(entry);

  return entry;
}

/**
 * @param {Array<any>} oldValues
 * @param {...any} args
 * @returns {Array<any>}
 */
function preparePush(oldValues = [], ...args) {
  oldValues = oldValues ?? [];
  // args = args.filter(arg => arg !== undefined && arg !== null);
  args = (args.filter((x) => Array.isArray(x))).length && args.length === 1
    ? args[0]
    : args.filter(arg => arg !== undefined && arg !== null);

  const { unique = false } = typeof args[args.length - 1] === 'object' ? args.pop() : {};

  if (oldValues && !Array.isArray(oldValues)) throw new Error('Existing value must be an Array');
  const value = unique
    ? removeDuplicates([...oldValues, ...args])
    : [...oldValues, ...args];

  return value;
}

/**
 * @param {string} key
 * @param {number|string} amount
 * @param {'incr'|'decr'} [method]
 * @returns {number}
 */
function prepareIncrDecr(key, amount = 1, method) {
  if (!(amount = parseInt(String(amount), 10)))
    throw new Error('Amount needs to be a number or a string representation of a number.');

  let value = (find(key, _cache) || {}).value || null;
  if (!value) value = 0;
  else if (!(value = parseInt(value, 10)))
    throw new Error('Existing value needs to be a number or a string representation of a number.');

  return method === 'incr' ? value + amount : value - amount;
}

/**
 * @param {string} key
 * @returns {Promise<void>}
 */
async function _del(key) {
  _cache = _cache.filter((e) => e.key !== key);
  await save(_cache);
}

/**
 * @param {string} key
 * @returns {void}
 */
function _delSync(key) {
  _cache = _cache.filter((e) => e.key !== key);
  saveSync(_cache);
}

/**
 * @param {string} key
 * @returns {void}
 */
function onChange(key) {
  if (!_listeners.hasOwnProperty(key)) return;
  eval(_listeners[key])();
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

  try {
    // @ts-ignore
    _listeners = JSON.parse(readFileSync(LISTENERS));
  } catch (/** @type {any} */ error) {
    if (error.code === 'ENOENT')
      writeFileSync(LISTENERS, JSON.stringify({}));
    _listeners = {};
  }
}

/**
 * @param {_File[]} content
 * @param {string} [file]
 * @returns {{ content: string, file: string }}
 */
function prepareData(content, file) {
  if (file === 'history' || file === 'listeners')
    return {
      content: JSON.stringify(content),
      file: file === 'history' ? HIST : LISTENERS
    };

  /** @type {Array<Object>} */
  const timeouts = [];
  content.forEach((item) => {
    if (item.timeout) {
      timeouts.push(item.key, item.timeout);
      delete item.timeout;
    }
  });

  const cacheString = JSON.stringify(content);

  content.forEach((item) => {
    if (timeouts[0] === item['key'])
      item.timeout = timeouts[1];
  });

  return { content: cacheString, file: CACHE };
}

// //////////////////

/**
 * @param {_File[]} content
 * @param {string} [file]
 * @returns {Promise<void>}
 */
async function save(content, file) {
  const data = prepareData(content, file ?? undefined);
  try {
    await writeFile(data?.file, data?.content);
  } catch (e) {
    throw new Error(`Unable to save _${file ?? 'cache'}:`);
  }
}

/**
 * @param {_File[]} content
 * @param {string|undefined} [file]
 * @returns {void}
 */
function saveSync(content, file) {
  const data = prepareData(content, file ?? undefined);
  try {
    writeFileSync(data?.file, data?.content);
  } catch (e) {
    throw new Error(`Unable to save _${file ?? 'cache'}:`);
  }
}

// //////////////////

/**
 * @param {string} key
 * @param {any} value
 * @returns {void}
 */
function prepareHistory(key, value) {
  if (!_history.length || !_history.some((x) => x.key === key))
    _history.push({ key, values: [[value, Date.now()]] });
  else if (
    _history.some((x) => x.key === key) &&
    !_history.find((x) => x.key === key)?.values?.some((y) =>
      (JSON.stringify(value) === JSON.stringify(y[0])))
  ) (_history.find((x) => x.key === key))?.values?.push([value, Date.now()]);
}

/**
 * @param {string} key
 * @param {any} value
 * @returns {Promise<void>}
 */
async function saveHistory(key, value) {
  prepareHistory(key, value);
  await save(_history, 'history');
}

/**
 * @param {string} key
 * @param {any} value
 * @returns {void}
 */
function saveHistorySync(key, value) {
  prepareHistory(key, value);
  saveSync(_history, 'history');
}

// //////////////////

/**
 * @param {string} key
 * @returns {void}
 */
function prepareListeners(key) {
  _listeners = {};
  for (const [k, v] of Object.entries(_listeners)) {
    if (k === key) continue;
    _listeners[k] = v;
  }
}

/**
 * @param {string} key
 * @returns {Promise<void>}
 */
async function removeListener(key) {
  prepareListeners(key);
  // @ts-ignore
  await save(_listeners, 'listeners');
}

/**
 * @param {string} key
 * @returns {void}
 */
function removeListenerSync(key) {
  prepareListeners(key);
  // @ts-ignore
  saveSync(_listeners, 'listeners');
}

/**
 * @param {string} key
 * @param {Function} callback
 * @returns {Promise<void>}
 */
async function addListener(key, callback) {
  _listeners[key] = callback.toString();
  // @ts-ignore
  await save(_listeners, 'listeners');
}

/**
 * @param {string} key
 * @param {Function} callback
 * @returns {void}
 */
function addListenerSync(key, callback) {
  _listeners[key] = callback.toString();
  // @ts-ignore
  saveSync(_listeners, 'listeners');
}

// //////////////////

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

  if (!!options && typeof options === 'object' && options.constructor === Object && !options.key) return true;
  else if (!options.value) throw new Error(`Value of \`${options.key}\` is undefined`);
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
 * @param {Function} [listener]
 */
function validateListener(listener) {
  if (typeof listener !== 'undefined' && typeof listener !== 'function')
    throw new Error('listener must be a function');
}

/**
 * @param {Object} [options]
 * @param {string} [options.key]
 * @param {any} [options.value]
 * @param {number} [options.ttl]
 * @param {Function} [options.ttlCb]
 * @param {Function} [options.listener]
 */
function validate(options) {
  if (!options)
    throw new Error('Please provide the required parameters');
  validateKeyVals(options);
  validateTTL(options.ttl);
  validateTTLCallback(options.ttlCb);
  validateListener(options.listener);
}

module.exports = {
  set, setSync, setMany,
  get, getSync, getMany,
  deleteSync, deleteMany,
  merge, mergeSync,
  push, pushSync,
  search, searchSync,
  each, eachSync,
  increment, incrementSync,
  decrement, decrementSync,
  clearHistory, clearHistorySync,

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
   * await api.utils.storage.set({
   *   key: 'password',
   *   value: [1, 2, 3, 4, 5]
   * });
   *
   * await api.utils.storage.filterValue('password', (x) => x !== 2);
   *
   * await api.utils.storage.get('password');
   * //=> '[ 1, 3, 4, 5 ]'
   *
   * @param {string} key
   * @param {(value: any) => boolean} predicate
   * @returns {Promise<?any>}
   */
  filterValue: async (key, predicate) => {
    if (!predicate || typeof predicate !== 'function') return null;
    const result = _cache
      .filter((x) => x.key === key)
      .map((x) => {
        if (Array.isArray(x.value)) return x.value.filter(predicate);
        else return predicate(x.value) ? x.value : null;
      })
      .filter((x) => x !== null);

    return set({ key, value: result.length ? result[0] : null });
  },

  /**
   * @example
   * await api.utils.storage.all();
   * // [
   * //   { key: 'array', value: [ 1, 2, [Array], 7 ] },
   * //   { key: 'password', value: 'abc123' }
   * // ]
   * @returns {Promise<Array<_File[]>>}
   */
  // @ts-ignore
  all: async () => JSON.parse(await readFile(CACHE)),

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
  allSync: () => JSON.parse(readFileSync(CACHE)),

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
   * @returns {Array<any>}
   */
  values: () => _cache.map((e) => e.value),

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
   * await api.utils.storage.clear();
   *
   * @returns {Promise<void>}
   */
  clear: async () => await writeFile(CACHE, JSON.stringify([])),

  /**
   * @example
   * api.utils.storage.clear();
   *
   * @returns {void}
   */
  clearSync: () => writeFileSync(CACHE, JSON.stringify([])),

  /**
   * @example
   * await api.utils.storage.equals('password', 'abcd1234');
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
   * api.utils.storage.equals('password', 'abcd1234');
   * //=> true
   *
   * @param {string} key
   * @param {any} value
   * @returns {boolean}
   */
  equalsSync: (key, value) => {
    const found = getSync(key);
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
 * @property {Function} [on_change] - A function to invoke when changes are made to a specified key
 * @property {boolean} [allow_overwrite] - Whether to allow this key's value to be overwritten
 * @property {number|undefined} [expire]
 * @property {?any} [timeout]
 */

/**
 * @typedef {Object} _History
 * @property {string} key
 * @property {Array<Array<any>>} values
 */

/**
 * @typedef {{[key: string]: string}} _Listener
 */
