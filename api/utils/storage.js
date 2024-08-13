/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const
  path = require('path'),
  CACHE = path.join(process.cwd(), '.mapih', '.stor'),
  // CACHE = process.cwd() + '/.mapih/.stor',
  // HIST = process.cwd() + '/.hist',
  LISTENERS = path.join(process.cwd(), '.mapih', '.listeners'),
  { readFileSync, writeFileSync, statSync } = require('fs'),
  { writeFile, readFile, mkdir, stat } = require('fs/promises');

/** @type {_File[]} */
let _cache;

/** @type {_History[]} */
// let _history;

/** @type {_Listener} */
let _listeners;

let cacheLoaded = false;

// loadCache();

/**
 * @param {any} value
 * @returns {boolean}
 */
const isSetObject = (value) => value && typeof value === 'object' && value.type === 'Set' && Array.isArray(value.value);

/**
 * @param {string} key
 * @param {_File[]} file
 * @returns {_File|undefined}
 */
const find = (key, file) => {
  const entry = file?.find((e) => e.key === key);
  if (!entry) return undefined;

  if (isSetObject(entry.value))
    return { ...entry, value: new Set(entry.value.value) };

  return entry;
};

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
const get = async (key, options) => ensureCacheLoaded(async () => {
  const { value, saveCache } = prepareGet(key, options?.default);

  if (options?.delete) {
    const deletePromises = [ _del(key) ];
    if (!options.keep_listeners) deletePromises.push(removeListener(key));
    // if (!options.keep_history) deletePromises.push(clearHistory(key));
    await Promise.all(deletePromises);
  }

  if (saveCache) await save(_cache);

  if (isSetObject(value))
    return new Set(value.value);

  return value;
});

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
const getSync = (key, options) => ensureCacheLoaded(() => {
  const { value, saveCache } = prepareGet(key, options?.default);

  if (options?.delete) {
    _delSync(key);
    if (!options?.keep_listeners) removeListenerSync(key);
    // if (!options?.keep_history) clearHistorySync(key);
  }

  if (saveCache) saveSync(_cache);
  return value;
});

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
const getMany = async (keys = []) => ensureCacheLoaded(async () => {
  const values = await Promise.all(keys.map(key => get(key)));
  return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
});

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
const getManySync = (keys = []) => ensureCacheLoaded(() => {
  const values = keys.map(key => getSync(key));
  return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
});

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
const set = async (options) => ensureCacheLoaded(async () => {
  validate(options);
  const { key, value, ttl, ttlCb, on_change } = options;

  // await saveHistory(key, value);
  if (on_change) await addListener(key, on_change);
  const entry = prepareSet({
    ...options,
    value: value instanceof Set ? { type: 'Set', value: Array.from(value) } : value
  });

  if (entry?.expire !== undefined && !isNaN(entry.expire))
    entry.timeout = setTimeout(async () => {
      await _del(key);
      if (ttlCb) ttlCb(key, value);
    }, ttl);

  await save(_cache);
  return value;
});

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
const setSync = (options = { key: '', value: undefined }) => ensureCacheLoaded(() => {
  validate(options);
  const { key, value, ttl, ttlCb, on_change } = options;

  // saveHistorySync(key, value);
  if (on_change) addListenerSync(key, on_change);
  const entry = prepareSet(options);

  if (entry?.expire !== undefined && !isNaN(entry.expire))
    entry.timeout = setTimeout(() => {
      _delSync(key);
      if (ttlCb) ttlCb(key, value);
    }, ttl);

  saveSync(_cache);
  return value;
});

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
const setMany = async (entries = { key: '', value: undefined }) => ensureCacheLoaded(async () => {
  return Promise.all(
    Object.entries(entries).map(([key, value]) =>
      set({ key, value })
    )
  );
});

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
const setManySync = (entries = { key: '', value: undefined }) => ensureCacheLoaded(() => {
  return Object.entries(entries).map(([key, value]) =>
    setSync({ key, value })
  );
});

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
const _delete = async (key, options = { keep_history: false, keep_listeners: false }) => ensureCacheLoaded(async () => {
  const old = find(key, _cache);
  if (!old) return false;

  onChange(key);

  // if (!options.keep_history) await clearHistory(key);
  if (!options.keep_listeners) await removeListener(key);
  if (old.timeout) clearTimeout(old.timeout);
  if (!old.expire || (!isNaN(old.expire) && old.expire < Date.now())) {
    await _del(key);
    return true;
  }
  return false;
});

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
const deleteSync = (key, options = { keep_history: false, keep_listeners: false }) => ensureCacheLoaded(() => {
  const old = find(key, _cache);
  if (!old) return false;

  onChange(key);

  // if (!options.keep_history) clearHistorySync(key);
  if (!options.keep_listeners) removeListenerSync(key);
  if (old.timeout) clearTimeout(old.timeout);
  if (!old.expire || (!isNaN(old.expire) && old.expire < Date.now())) {
    _delSync(key);
    return true;
  }
  return false;
});

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
const deleteMany = async (keys = []) => ensureCacheLoaded(async () => Promise.all(keys.map((key) => _delete(key))));

// ////////////////////// each /////////////////////////

/**
 * @example
 * await api.utils.storage.each((x) => console.log(x))
 *
 * @param {(item: any) => void | Promise<void>} callback
 * @returns {Promise<void>}
 */
const each = async (callback) => ensureCacheLoaded(async () => {
  if (typeof callback !== 'function')
    throw new Error('Callback must be a function');
  await Promise.all(_cache.map((item) => callback(item)));
});

// ////////////////////// eachSync /////////////////////////

/**
 * @example
 * api.utils.storage.eachSync((x) => console.log(x))
 *
 * @param {(item: any) => void} callback
 * @returns {void}
 */
const eachSync = (callback) => ensureCacheLoaded(() => {
  if (typeof callback !== 'function')
    throw new Error('Callback must be a function');
  if (callback.constructor.name === 'AsyncFunction')
    throw new Error('Callback must be synchronous for eachSync');

  _cache.forEach((x) => callback(x));
});

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
 * @param {object} value
 * @returns {Promise<object>}
 */
const merge = async (key, value) => ensureCacheLoaded(async () => {
  if (!isObject(value))
    throw new Error('New value must be an object');

  const oldVal = await get(key) || {};

  if (!isObject(oldVal))
    throw new Error('Existing value must be an object or not exist');

  await set({ key, value: { ...oldVal, ...value } });
  onChange(key);
  // await saveHistory(key, mergedValue);

  return { ...oldVal, ...value };
});

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
 * @param {object} value
 * @returns {object}
 */
const mergeSync = (key, value) => ensureCacheLoaded(() => {
  if (!isObject(value))
    throw new Error('New value must be an object');

  const oldVal = getSync(key) || {};

  if (!isObject(oldVal))
    throw new Error('Existing value must be an object or not exist');

  setSync({ key, value: { ...oldVal, ...value } });
  onChange(key);
  // saveHistorySync(key, mergedValue);

  return { ...oldVal, ...value };
});

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
const push = async (key, ...args) => ensureCacheLoaded(async () => {
  const
    oldValues = await get(key) || [],
    value = preparePush(oldValues, ...args);
  // await saveHistory(key, value);
  await set({ key, value });
  onChange(key);

  return value;
});

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
 * @returns {Array<any>}
 */
const pushSync = (key, ...args) => ensureCacheLoaded(() => {
  const
    oldValues = getSync(key) || [],
    value = preparePush(oldValues, ...args);
  // await saveHistory(key, value);
  setSync({ key, value });
  onChange(key);

  return value;
});

// ////////////////////// search /////////////////////////

/**
 * Searches for keys in the cache that contain the given string and returns their values.
 *
 * @example
 * // Set up some example data
 * await api.utils.storage.set({ key: 'something', value: 51 });
 * await api.utils.storage.set({ key: 'somethingElse', value: 18 });
 * await api.utils.storage.set({ key: 'something3', value: 12 });
 * await api.utils.storage.set({ key: 'SOMETHING4', value: 100 });
 *
 * // Basic search (case-insensitive by default)
 * const result1 = await api.utils.storage.search('something');
 * console.log(result1);
 * //=> { something: 51, somethingElse: 18, something3: 12, SOMETHING4: 100 }
 *
 * // Case-sensitive search
 * const result2 = await api.utils.storage.search('something', { caseSensitive: true });
 * console.log(result2);
 * //=> { something: 51, something3: 12 }
 *
 * // Limit the number of results
 * const result3 = await api.utils.storage.search('something', { limit: 2 });
 * console.log(result3);
 * //=> { something: 51, somethingElse: 18 }
 *
 * // Combine options
 * const result4 = await api.utils.storage.search('SOMETHING', { caseSensitive: true, limit: 1 });
 * console.log(result4);
 * //=> { SOMETHING4: 100 }
 *
 * @param {string} searchString - The string to search for in the keys.
 * @param {object} [options] - Search options.
 * @param {boolean} [options.caseSensitive=false] - Whether the search should be case-sensitive.
 * @param {number} [options.limit] - Maximum number of results to return.
 * @returns {Promise<{[key: string]: any}>} An object with matching keys and their values.
 */
const search = async (searchString, options = {}) => ensureCacheLoaded(async () => {
  let count = 0;
  const
    { caseSensitive = false, limit } = options,

    /** @type {{[key: string]: any}} */
    results = {},
    compareFunction = caseSensitive
      ? (/** @type {string} */ key) => key.includes(searchString)
      : (/** @type {string} */ key) => key.toLowerCase().includes(searchString.toLowerCase());

  for (const { key, value } of _cache) {
    if (compareFunction(key)) {
      results[key] = value;
      count++;
      if (limit && count >= limit) break;
    }
  }

  return results;
});

// ////////////////////// searchSync /////////////////////////

/**
 * Synchronously searches for keys in the cache that contain the given string and returns their values.
 *
 * @example
 * // Set up some example data
 * api.utils.storage.setSync({ key: 'something', value: 51 });
 * api.utils.storage.setSync({ key: 'somethingElse', value: 18 });
 * api.utils.storage.setSync({ key: 'something3', value: 12 });
 * api.utils.storage.setSync({ key: 'SOMETHING4', value: 100 });
 *
 * // Basic search (case-insensitive by default)
 * const result1 = api.utils.storage.searchSync('something');
 * console.log(result1);
 * //=> { something: 51, somethingElse: 18, something3: 12, SOMETHING4: 100 }
 *
 * // Case-sensitive search
 * const result2 = api.utils.storage.searchSync('something', { caseSensitive: true });
 * console.log(result2);
 * //=> { something: 51, something3: 12 }
 *
 * // Limit the number of results
 * const result3 = api.utils.storage.searchSync('something', { limit: 2 });
 * console.log(result3);
 * //=> { something: 51, somethingElse: 18 }
 *
 * // Combine options
 * const result4 = api.utils.storage.searchSync('SOMETHING', { caseSensitive: true, limit: 1 });
 * console.log(result4);
 * //=> { SOMETHING4: 100 }
 *
 * @param {string} searchString - The string to search for in the keys.
 * @param {object} [options] - Search options.
 * @param {boolean} [options.caseSensitive=false] - Whether the search should be case-sensitive.
 * @param {number} [options.limit] - Maximum number of results to return.
 * @returns {{[key: string]: any}} An object with matching keys and their values.
 */
const searchSync = (searchString, options = {}) => ensureCacheLoaded(() => {
  let count = 0;
  const
    { caseSensitive = false, limit } = options,
    /** @type {{[key: string]: any}} */
    results = {},
    compareFunction = caseSensitive
      ? (/** @type {string} */ key) => key.includes(searchString)
      : (/** @type {string} */ key) => key.toLowerCase().includes(searchString.toLowerCase());

  for (const { key, value } of _cache) {
    if (compareFunction(key)) {
      results[key] = value;
      count++;
      if (limit && count >= limit) break;
    }
  }

  return results;
});

// ////////////////////// increment /////////////////////////

/**
 * Increments the value stored at the given key by the specified amount.
 * If the key doesn't exist, it initializes it with the amount.
 *
 * @example
 * // Increment by 1 (default)
 * await api.utils.storage.increment('visits');
 * //=> 1
 *
 * // Increment by 5
 * await api.utils.storage.increment('score', 5);
 * //=> 5
 *
 * // Increment existing value
 * await api.utils.storage.set({key: 'counter', value: 10});
 * await api.utils.storage.increment('counter', 3);
 * //=> 13
 *
 * @param {string} key - The key of the value to increment.
 * @param {number} [amount=1] - The amount to increment by.
 * @returns {Promise<number>} The new value after incrementing.
 * @throws {Error} If the amount is not a valid number or if the existing value cannot be converted to a number.
 */
const increment = async (key, amount = 1) => ensureCacheLoaded(async () => {
  const value = prepareIncrDecr(key, amount, 'incr');
  await set({ key, value });
  return value;
});

// ////////////////////// incrementSync /////////////////////////

/**
 * Increments the value stored at the given key by the specified amount.
 * If the key doesn't exist, it initializes it with the amount.
 *
 * @example
 * // Increment by 1 (default)
 * api.utils.storage.incrementSync('visits');
 * //=> 1
 *
 * // Increment by 5
 * api.utils.storage.incrementSync('score', 5);
 * //=> 5
 *
 * // Increment existing value
 * api.utils.storage.setSync({key: 'counter', value: 10});
 * api.utils.storage.incrementSync('counter', 3);
 * //=> 13
 *
 * @param {string} key - The key of the value to increment.
 * @param {number} [amount=1] - The amount to increment by.
 * @returns {number} The new value after incrementing.
 * @throws {Error} If the amount is not a valid number or if the existing value cannot be converted to a number.
 */
const incrementSync = (key, amount = 1) => ensureCacheLoaded(() => {
  const value = prepareIncrDecr(key, amount, 'incr');
  setSync({ key, value });
  return value;
});

// ////////////////////// decrement /////////////////////////

/**
 * Decrements the value stored at the given key by the specified amount.
 * If the key doesn't exist, it initializes it with the negative of the amount.
 *
 * @example
 * // Decrement by 1 (default)
 * await api.utils.storage.decrement('lives');
 * //=> -1
 *
 * // Decrement by 5
 * await api.utils.storage.decrement('score', 5);
 * //=> -5
 *
 * // Decrement existing value
 * await api.utils.storage.set({key: 'counter', value: 10});
 * await api.utils.storage.decrement('counter', 3);
 * //=> 7
 *
 * @param {string} key - The key of the value to decrement.
 * @param {number} [amount=1] - The amount to decrement by.
 * @returns {Promise<number>} The new value after decrementing.
 * @throws {Error} If the amount is not a valid number or if the existing value cannot be converted to a number.
 */
const decrement = async (key, amount = 1) => ensureCacheLoaded(async () => {
  const value = prepareIncrDecr(key, amount, 'decr');
  await set({ key, value });
  return value;
});

// ////////////////////// decrementSync /////////////////////////

/**
 * Decrements the value stored at the given key by the specified amount.
 * If the key doesn't exist, it initializes it with the negative of the amount.
 *
 * @example
 * // Decrement by 1 (default)
 * api.utils.storage.decrementSync('lives');
 * //=> -1
 *
 * // Decrement by 5
 * api.utils.storage.decrementSync('score', 5);
 * //=> -5
 *
 * // Decrement existing value
 * api.utils.storage.setSync({key: 'counter', value: 10});
 * api.utils.storage.decrementSync('counter', 3);
 * //=> 7
 *
 * @param {string} key - The key of the value to decrement.
 * @param {number} [amount=1] - The amount to decrement by.
 * @returns {number} The new value after decrementing.
 * @throws {Error} If the amount is not a valid number or if the existing value cannot be converted to a number.
 */
const decrementSync = (key, amount = 1) => ensureCacheLoaded(() => {
  const value = prepareIncrDecr(key, amount, 'decr');
  setSync({ key, value });
  return value;
});

// ////////////////////// export /////////////////////////
/**
 * Exports the current state of the cache, excluding certain internal keys.
 *
 * @example
 * const exportedData = api.utils.storage.export();
 * console.log(exportedData);
 * //=> {
 * //     "password": { "value": "abcd1234" },
 * //     "visits": { "value": 42 },
 * //     "tempData": { "value": "someData", "expire": 1609459200000 }
 * //   }
 *
 * @returns {{[key: string]: { value: any, expire?: number }}}
 */
const _export = () => ensureCacheLoaded(() => {
  const

    /** @type {{[key: string]: { value: any, expire?: number }}} */
    exported = {},
    excludeKeys = ['history']; // Add any other keys you want to exclude

  for (const { key, value, expire } of _cache) {
    if (excludeKeys.includes(key)) continue;

    exported[key] = { value };
    if (expire !== undefined)
      exported[key].expire = expire;
  }

  return exported;
});

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
/*
async function clearHistory(key, filtered = []) {
  if (key) {
    onChange(key);
    filtered = _history.filter((x) => x.key !== key);
  }
  await writeFile(HIST, JSON.stringify(filtered));
}
*/
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
/*
function clearHistorySync(key, filtered = []) {
  if (key) {
    onChange(key);
    filtered = _history.filter((x) => x.key !== key);
  }
  writeFileSync(HIST, JSON.stringify(filtered));
}
*/
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
  const value = (find(key, _cache) || {}).value ?? null;

  /*
  if (value === null && key.split('.').length > 1) {
    const [object, ...path] = key.split('.');
    key = object;
    value = (find(object, _cache) || {}).value || null;
    value = getPathValue(value, path.join('.'));
  } else */

  const
    process = (/** @type {any} */ val) => val instanceof Set ? { type: 'Set', value: Array.from(val) } : val,
    processedValue = value === null && defaultVal !== undefined
      ? process(defaultVal)
      : process(value);

  if (value === null && defaultVal !== undefined) {
    _cache.push({ key, value: processedValue });

  }

  onChange(key);
  return {
    value: processedValue,
    saveCache: value === null && defaultVal !== undefined
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

  if (!('value' in options) && !newvalue) return;
  const oldValue = find(key ?? newkey, _cache);

  const compare = (/** @type {any} */ v1, /** @type {any} */ v2) => {
    if (v1 && v1.type === 'Set' && v2 instanceof Set)
      return JSON.stringify(v1.value) === JSON.stringify(Array.from(v2));
    return JSON.stringify(v1) === JSON.stringify(v2);
  };

  if (oldValue && compare(oldValue.value, value ?? newvalue)) return;
  if (oldValue && 'allow_overwrite' in oldValue && !allow_overwrite)
    throw new Error(`The value for \`${key}\` is not allowed to be overwritten.`);

  const entry = {
    key: newkey ?? key,
    value: newvalue ?? value,
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
  if (!Array.isArray(oldValues))
    throw new Error('Existing value must be an Array');

  const
    options = typeof args[args.length - 1] === 'object' && !Array.isArray(args[args.length - 1])
      ? args.pop()
      : {},
    { unique = false } = options,
    newValues = args.length === 1 && Array.isArray(args[0]) ? args[0] : args,
    filteredNewValues = newValues.filter(arg => arg !== undefined && arg !== null),
    value = unique
      ? [...new Set([...oldValues, ...filteredNewValues])]
      : [...oldValues, ...filteredNewValues];

  /*
  args = (args.filter((x) => Array.isArray(x))).length && args.length === 1
    ? args[0]
    : args.filter(arg => arg !== undefined && arg !== null);

  const { unique = false } = typeof args[args.length - 1] === 'object' ? args.pop() : {};

  const value = unique
    ? removeDuplicates([...oldValues, ...args])
    : [...oldValues, ...args];
  */

  return value;
}

/**
 * @param {string} key
 * @param {number} amount
 * @param {'incr'|'decr'} method
 * @returns {number}
 */
function prepareIncrDecr(key, amount, method) {
  const parsedAmount = Number(amount);
  if (isNaN(parsedAmount))
    throw new Error('Amount must be a valid number.');

  let value = (find(key, _cache) || {}).value;
  if (value === undefined || value === null) value = 0;
  else {
    const parsedValue = Number(value);
    if (isNaN(parsedValue))
      throw new Error('Existing value must be a number or a valid numeric string.');

    value = parsedValue;
  }

  return method === 'incr' ? value + parsedAmount : value - parsedAmount;
}

/**
 * Internal method to delete a key from the cache.
 *
 * @param {string} key - The key to delete from the cache.
 * @returns {Promise<void>}
 */
async function _del(key) {
  return ensureCacheLoaded(async () => {
    const index = _cache.findIndex((e) => e.key === key);

    if (index !== -1) {
      _cache.splice(index, 1);
      await save(_cache);
    }
  });
}

/**
 * Internal method to synchronously delete a key from the cache.
 *
 * @param {string} key - The key to delete from the cache.
 * @returns {void}
 */
function _delSync(key) {
  ensureCacheLoaded(() => {
    const index = _cache.findIndex((e) => e.key === key);

    if (index !== -1) {
      _cache.splice(index, 1);
      saveSync(_cache);
    }
  });
}

/**
 * @param {string} key
 * @returns {void}
 */
function onChange(key) {
  if (!_listeners.hasOwnProperty(key)) return;
  const listenerCode = _listeners[key];
  if (typeof listenerCode === 'string')
    eval(listenerCode)();
  else if (typeof listenerCode === 'function')
    // @ts-ignore
    listenerCode();
}

async function loadCache() {
  try {
    await mkdir(path.join(process.cwd(), '.mapih'), { recursive: true });
    // @ts-ignore
    _cache = JSON.parse(await readFile(CACHE, 'utf-8'));
  } catch (error) {
    // @ts-ignore
    if (error.code === 'ENOENT' || error instanceof SyntaxError)
      await writeFile(CACHE, JSON.stringify([]));
    _cache = [];
  }
  /*
  try {
    // @ts-ignore
    _history = JSON.parse(readFileSync(HIST));
  } catch (error) {
    // @ts-ignore
    if (error.code === 'ENOENT')
      writeFileSync(HIST, JSON.stringify([]));
    _history = [];
  }
  */
  try {
    // @ts-ignore
    _listeners = JSON.parse(await readFile(LISTENERS, 'utf-8'));
  } catch (/** @type {any} */ error) {
    if (error.code === 'ENOENT' || error instanceof SyntaxError)
      await writeFile(LISTENERS, JSON.stringify({}));
    _listeners = {};
  }

  cacheLoaded = true;
}

/**
 *
 * @param {Function} operation
 * @returns {any}
 */
function ensureCacheLoaded(operation) {
  if (!cacheLoaded) return loadCache().then(() => operation());
  return operation();
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
      // file: file === 'history' ? HIST : LISTENERS
      file: file === 'listeners' ? LISTENERS : ''
    };

  /** @type {Map<string, number>} */
  const timeouts = new Map();

  const _content = content.map((item) => {
    const { timeout, ...rest } = item;
    if (timeout) timeouts.set(item.key, timeout);
    return rest;
  });

  const cacheString = JSON.stringify(_content);

  content.forEach((item) => {
    if (timeouts.has(item.key))
      item.timeout = timeouts.get(item.key);
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
  try {
    const { content: _content, file: _file } = prepareData(content, file) || {};
    await writeFile(_file, _content);
  } catch (/** @type {any} */ error) {
    throw new Error(`Unable to save _${file ?? 'cache'}: ${error.message}`);
  }
}

/**
 * @param {_File[]} content
 * @param {string|undefined} [file]
 * @returns {void}
 */
function saveSync(content, file) {
  try {
    const { content: _content, file: _file } = prepareData(content, file) || {};
    writeFileSync(_file, _content);
  } catch (/** @type {any} */ error) {
    throw new Error(`Unable to save _${file ?? 'cache'}: ${error.message}`);
  }
}

// //////////////////

/**
 * @param {string} key
 * @param {any} value
 * @returns {void}
 */
/*
function prepareHistory(key, value) {
  if (!_history.length || !_history.some((x) => x.key === key))
    _history.push({ key, values: [[value, Date.now()]] });
  else if (
    _history.some((x) => x.key === key) &&
    !_history.find((x) => x.key === key)?.values?.some((y) =>
      (JSON.stringify(value) === JSON.stringify(y[0])))
  ) (_history.find((x) => x.key === key))?.values?.push([value, Date.now()]);
}
*/

/**
 * @param {string} key
 * @param {any} value
 * @returns {Promise<void>}
 */
/*
async function saveHistory(key, value) {
  prepareHistory(key, value);
  await save(_history, 'history');
}
*/

/**
 * @param {string} key
 * @param {any} value
 * @returns {void}
 */
/*
function saveHistorySync(key, value) {
  prepareHistory(key, value);
  saveSync(_history, 'history');
}
*/

// //////////////////

/**
 * @param {string} key
 * @returns {void}
 */
function prepareListeners(key) {
  const { [key]: _, ...rest } = _listeners;
  _listeners = rest;
}


/**
 * @param {string} key
 * @returns {Promise<void>}
 */
async function removeListener(key) {
  return ensureCacheLoaded(async () => {
    prepareListeners(key);
    // @ts-ignore
    await save(_listeners, 'listeners');
  });
}

/**
 * @param {string} key
 * @returns {void}
 */
function removeListenerSync(key) {
  return ensureCacheLoaded(() => {
    prepareListeners(key);
    // @ts-ignore
    saveSync(_listeners, 'listeners');
  });
}

/**
 * @param {string} key
 * @param {Function} callback
 * @returns {Promise<void>}
 */
async function addListener(key, callback) {
  return ensureCacheLoaded(async () => {
    _listeners[key] = callback.toString();
    // @ts-ignore
    await save(_listeners, 'listeners');
  });
}

/**
 * @param {string} key
 * @param {Function} callback
 * @returns {void}
 */
function addListenerSync(key, callback) {
  return ensureCacheLoaded(() => {
    _listeners[key] = callback.toString();
    // @ts-ignore
    saveSync(_listeners, 'listeners');
  });
}

// //////////////////

/**
 * @param {Object} options
 * @param {string|undefined} [options.key]
 * @param {any} [options.value]
 */
function validateKeyVals(options) {
  if (typeof options !== 'object' || options === null || Array.isArray(options))
    throw new Error('Parameters must be a non-null object.');

  if (('key' in options || 'value' in options) && !('key' in options && 'value' in options))
    throw new Error('If providing `key` or `value`, both `key` and `value` are required.');

  if (Object.keys(options).length === 0 || !('key' in options))
    return true;

  if (!('value' in options))
    throw new Error(`Value of \`${options.key}\` is undefined`);

  return true;
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
  set, setSync, setMany, setManySync,
  get, getSync, getMany, getManySync,
  deleteSync, deleteMany,
  merge, mergeSync,
  push, pushSync,
  search, searchSync,
  each, eachSync,
  increment, incrementSync,
  decrement, decrementSync,
  // clearHistory, clearHistorySync,

  /**
   * @example
   * api.utils.storage.filter((x) => x.key.includes('ass'));
   * //=> [{ key: 'password', value: 'abc123' }]
   *
   * @param {(file: _File) => boolean} predicate
   * @returns {_File[]}
   */
  filter: (predicate) => ensureCacheLoaded(() => _cache.filter(predicate)),

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
  filterValue: async (key, predicate) => ensureCacheLoaded(async () => {
    if (typeof predicate !== 'function')
      throw new Error('Predicate must be a function');

    const item = _cache.find(x => x.key === key);
    if (!item) return null;

    const filteredValue = Array.isArray(item.value)
      ? item.value.filter(predicate)
      : (predicate(item.value) ? item.value : null);

    return set({ key, value: filteredValue });
  }),

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
  all: async () => ensureCacheLoaded(() => JSON.parse(JSON.stringify(_cache))),

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
  allSync: () => ensureCacheLoaded(() => JSON.parse(JSON.stringify(_cache))),

  /**
   * @example
   * api.utils.storage.has('password'); //=> true
   *
   * @param {string} key
   * @returns {boolean}
   */
  has: (key) => ensureCacheLoaded(() => _cache.some(item => item.key === key)),

  /**
   * @example
   * api.utils.storage.entries();
   * //=> [ [ 'password', 'abcd1234' ], [ 'test', '4321dcba' ] ]
   *
   * @returns {Array<Array<string>>}
   */
  entries: () => ensureCacheLoaded(() => _cache.map(e => [e.key, e.value])),

  /**
   * @example
   * api.utils.storage.keys();
   * //=> ['password', 'stuff']
   *
   * @returns {Array<string>}
   */
  keys: () => ensureCacheLoaded(() => _cache.map(e => e.key)),

  /**
   * @example
   * api.utils.storage.values();
   * //=> ['abc123', '123abc']
   *
   * @returns {Array<any>}
   */
  values: () => ensureCacheLoaded(() => _cache.map(e => e.value)),

  /**
   * @example
   * api.utils.storage.size(); //=> 2
   *
   * @returns {number}
   */
  size: () => ensureCacheLoaded(() => _cache.length),

  /**
   * @example
   * await api.utils.storage.bytes(); // 1494 (bytes)
   *
   * @returns {Promise<number>}
   */
  bytes: async () => ensureCacheLoaded(async () => (await stat(CACHE)).size),

  /**
   * @example
   * api.utils.storage.bytesSync(); // 1494 (bytes)
   *
   * @returns {number}
   */
  bytesSync: () => ensureCacheLoaded(() => statSync(CACHE).size),

  /**
   * @example
   * api.utils.storage.toJson();
   * //=> [{"key":"array","value":[1,2,[5,6],7]},{"key":"password","value":"abc123"}]
   *
   * @returns {string}
   */
  toJson: () => ensureCacheLoaded(() => JSON.stringify(_cache.map(({ timeout, ...item }) => item))),

  /**
   * @example
   * await api.utils.storage.clear();
   *
   * @returns {Promise<void>}
   */
  clear: async () => ensureCacheLoaded(async () => {
    _cache = [];
    await writeFile(CACHE, '[]');
  }),

  /**
   * @example
   * api.utils.storage.clear();
   *
   * @returns {void}
   */
  clearSync: () => ensureCacheLoaded(() => {
    _cache = [];
    writeFileSync(CACHE, '[]');
  }),

  /**
   * @example
   * await api.utils.storage.equals('password', 'abcd1234');
   * //=> true
   *
   * @param {string} key
   * @param {any} value
   * @returns {Promise<boolean>}
   */
  equals: async (key, value) => ensureCacheLoaded(async () => await get(key) === value),

  /**
   * @example
   * api.utils.storage.equals('password', 'abcd1234');
   * //=> true
   *
   * @param {string} key
   * @param {any} value
   * @returns {boolean}
   */
  equalsSync: (key, value) => ensureCacheLoaded(() => getSync(key) === value)

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
  /*
  history: (key) => (_history.find((x) => x.key === key))?.values?.map((x) => ({
    value: x[0], timestamp: x[1]
  }))
  */
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
