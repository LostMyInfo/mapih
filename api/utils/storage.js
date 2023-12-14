// @ts-check

const { readFileSync, writeFileSync } = require('fs');
const { readFile, writeFile } = require('fs/promises');
const CACHE = process.cwd() + '/storage.json';

class Cache {
  constructor() {
    // @ts-ignore
    let _cache = JSON.parse(readFileSync(CACHE)), _size = _cache.length;
    // console.log(_cache);

    /**
     * @example
     * await api.utils.storage.put({
     *   key: 'something',
     *   value: 'things'
     * });
     * @example
     * await api.utils.storage.put({
     *   key: 'something else',
     *   value: 'stuff',
     *   ttl: 5000 // 5 seconds
     *   ttlCb: () => console.log('expired) 
     * })
     * @param {Object} params
     * @param {string} params.key
     * @param {*} params.value
     * @param {number} [params.ttl]
     * @param {Function} [params.ttlCb]
     * @returns
     */
    this.put = async ({ key, value, ttl, ttlCb }) => {
      validateTTL(ttl);
      validateTTLCallback(ttlCb);

      const record = {
        key,
        value,
        expire: ttl ? ttl + Date.now() : undefined
      };

      if (record.expire !== undefined && !isNaN(record.expire)) {
        setTimeout(async () => {
          await _del(key);
          if (ttlCb) ttlCb(key, value);
        }, ttl);
      }

      const existing = _cache.findIndex((/** @type {{ key: string; }} */ e) => e.key === key);
      if (existing !== -1) _cache[existing] = record;
      else {
        _cache.push(record);
        _size++;
      }

      await saveCache(_cache);
      // fs.writeFileSync(CACHE, JSON.stringify(_cache), { flags: 'w' })
      return value;
    };

    /**
     * @example
     * await api.utils.storage.get('something')
     * @param {string} key
     * @returns {any}
     */
    this.get = (key) =>
      (_cache.find((/** @type {{ key: string; }} */ e) => e.key === key) || {}).value || null;


    /**
     * @param {string} key
     * @returns {Promise<boolean>}
     */
    this.delete = async (key) => {
      const old = _cache.find((/** @type {{ key: string; }} */ e) => e.key === key);
      if (old) {
        clearTimeout(old.timeout);
        if (!old.expire || (!isNaN(old.expire) && old.expire < Date.now())) {
          await _del(key);
          return true;
        }
      }
      return false;
    };

    this.clear = () => {
      _size = 0;
      writeFileSync(CACHE, JSON.stringify([]), { flag: 'w' });
    };

    this.entries = () => _cache.map((/** @type {{ key: string; value: any; }} */ e) => [e.key, e.value]);
    this.keys = () => _cache.map((/** @type {{ key: string; }} */ e) => e.key);
    this.size = () => _size;
    this.toJson = () => JSON.stringify(_cache, null, 2);
    this.export = () => {

      /**
       * @type {{[key: string]: { value: *, expire: number | undefined}}}
       */
      const plainJS = {};
      for (const key of _cache) {
        plainJS[key.key] = {
          value: key.value,
          expire: key.expire || undefined
        };
      }
      return JSON.stringify(plainJS);
    };

    /**
     * @param {string} key
     */
    async function _del(key) {
      _cache = _cache.filter((/** @type {{ key: string; }} */ e) => e.key !== key);
      _size = _cache.length;
      await saveCache(_cache);
    }

    function loadCache() {
      try {
        const data = readFileSync(CACHE);
        console.log(data);
        // @ts-ignore
        _cache = JSON.parse(data);
        _size = _cache.length;
      } catch (error) {
        // Handle file read error or initialize cache if file doesn't exist
        _cache = [];
        _size = 0;
      }
    }

    /**
     * @param {any} _cache
     */
    async function saveCache(_cache) {
      try {
        await writeFile(CACHE, JSON.stringify(_cache), { flag: 'w' });
      } catch (error) {
        throw new Error('Unable to save cache');
      }
    }

    loadCache(); // Load cache when the Cache object is created

  }
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

module.exports = new Cache();
// module.exports.Cache = Cache;

/*
this.get = (key) => {
  const data = _cache[key];
  if (data && (!isNaN(data.expire) && data.expire >= Date.now()))
    return data.value;

  if (data) {
    _size--;
    delete _cache[key];
  }
  return null;
};
*/

/*
function Cache() {
  let _cache = Object.create(null),
    _size = 0;

  this.put = ({ key, value, ttl, ttlCb }) => {

    if (typeof ttl !== 'undefined' && (typeof ttl !== 'number' || isNaN(ttl) || ttl <= 0)) {
      throw new Error('ttl must be a positive number');
    } else if (typeof ttlCb !== 'undefined' && typeof ttlCb !== 'function') {
      throw new Error('ttlCb must be a function');
    }

    // const old = _cache[key];
    if (_cache[key]) clearTimeout(_cache[key].timeout);
    else _size++;

    const record = {
      value,
      expire: ttl + Date.now()
    };

    if (!isNaN(record.expire)) {
      record.timeout = setTimeout(
        function () {
          _del(key);
          if (ttlCb) ttlCb(key, value);
        }.bind(this), ttl
      );
    }
    _cache[key] = record;
    return value;
  };

  this.del = function (key) {
    const canDelete = true,
      old = _cache[key];
      
    if (old) {
      clearTimeout(old.timeout);
      if (!isNaN(old.expire) && old.expire < Date.now())
        canDelete = false;
    } else canDelete = false;

    if (canDelete) _del(key);
    return canDelete;
  };

  function _del(key) {
    _size--;
    delete _cache[key];
  }

  this.clear = () => {
    for (const key in _cache)
      clearTimeout(_cache[key].timeout);
    _size = 0;
    _cache = Object.create(null);
  };

  this.get = function (key) {
    const data = _cache[key];
    if (typeof data != 'undefined') {
      if (isNaN(data.expire) || data.expire >= Date.now())
        return data.value;
      else {
        _size--;
        delete _cache[key];
      }
    }
    return null;
  };
  
  this.keys = () => Object.keys(_cache);
  this.size = () => _size;
  
  this.export = () => {
    const plainJS = {};
    for (const key in _cache) {
      // const { value, expire = 'NaN' } = _cache[key];
      const record = _cache[key];
      plainJS[key] = {
        value: record.value,
        expire: record.expire || 'NaN'
      };
    }
    return JSON.stringify(plainJS);
  };
  */
/*
  this.import = function (JSONimport, options) {
    var cacheImport = JSON.parse(JSONimport),
      currTime = Date.now(),
      skipDupes = options && options.skipDupes;

    for (const key in cacheImport) {
      if (cacheImport.hasOwnProperty(key)) {
        if (skipDupes) {
          const existing = _cache[key];
          if (existing) continue;
        }

        var record = cacheImport[key],
          remaining = record.expire - currTime;

        if (remaining <= 0) {
          this.del(key);
          continue;
        }
        
        remaining = remaining > 0 ? remaining : undefined;

        this.put(key, record.value, remaining);
      }
    }
    return this.size();
  };
  */
// }

// module.exports = new Cache();
// module.exports.Cache = Cache;