// @ts-check
'use-strict';

class ResponseError extends Error {
  /**
   * 
   * @param {DiscordError} res 
   * @param {Response} response
   * @param {string} type
   * 
   */
  constructor(res, response, type) {
    super();

    this.type = type;
    this.status = response.status;
    this.statusText = response.statusText;
    
    
    if (type === 'discord_error') {
      this.message = res.message;
      /** @type {number} */
      if (res.code !== 0) this.code = res.code;
      if (res.retry_after) this.retry_after = res.retry_after;
      if (res.global) this.global = res.global;
      
      if (DiscordError(res))
        this.details = DiscordError(res);

    } else if (type === 'slack_error') {
      // ...
    }
  }
  
  /*
  get name() {
    // console.log('this.name', this.name);
    // if (this.name === 'DiscordError')
    return `${super.name}`;
  }
  */
  
};

/**
 * 
 * @param {DiscordError} err 
 */
function DiscordError(err) {

  /**
   * @type {Object<string, string>}
   */
  const errinfo = {};
  const ignore = (/** @type {string} */ k) => k !== 'errors' && k !== '_errors' && k !== 'code';
  const isObj = (/** @type {*} */ val) => val && typeof val === 'object';
  const entries = (/** @type {Object} */ obj) => Object.entries(obj);
  const isNum = (/** @type {string} */ key) => /\d/.test(key);
  const has = (/** @type {DiscordErrorErrors} */ v) => v?.['_errors']?.[0]?.['message'] || Object.entries(v)?.[0]?.[1]?.['_errors']?.[0]?.['message'];

  /**
   * @param {string} k 
   * @param {*} v 
   * @returns 
   */
  const check = (k, v) => !isNum(k) && ignore(k) && has(v);
  /**
   * @param {{ [s: string]: any; } | ArrayLike<any>} obj
   */
  function parseErrors(obj) {
    for (const [, value] of Object.entries(obj)) {
      if (isObj(value)) {
        for (const [key1, value1] of entries(value)) {
          if (check(key1, value1))
            errinfo[key1] = has(value1);
          else if (isObj(value1)) {
            for (const [key2, value2] of entries(value1)) {
              if (isObj(value2)) {
                for (const [key3, value3] of entries(value2)) {
                  if (check(key3, value3))
                    errinfo[key1] = { [key3]: has(value3) };
                  else if (isObj(value3)) {
                    for (const [key4, value4] of entries(value3)) {
                      if (check(key4, value4))
                        errinfo[key1] = {
                          [key2]: {
                            [key4]: value4?.['_errors']?.[0]?.['message']
                          }
                        };
                      else if (isObj(value4)) {
                        for (const [key5, value5] of entries(value4)) {
                          if (check(key5, value5))
                            errinfo[key1] = {
                              [`${key3} (${key4})`]: {
                                [key5]: value5?.['_errors']?.[0]?.['message']
                              }
                            };
                          else if (isObj(value5)) {
                            for (const [, value6] of entries(value5)) {
                              if (isObj(value6)) {
                                for (const [key7, value7] of entries(value6)) {
                                  if (check(key7, value7))
                                    errinfo[key1] = {
                                      [key3]: {
                                        [key5]: {
                                          [key7]: value7?.['_errors']?.[0]?.['message']
                                        }
                                      }
                                    };
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return errinfo;
  }
  parseErrors(err);

  return err.errors ? errinfo : undefined;
}

/**
 * @typedef {Object} DiscordError
 * @property {number} code
 * @property {string} message
 * @property {boolean} [global]
 * @property {number} [retry_after]
 * @property {DiscordErrorErrors} [errors]
 */

/**
 * @typedef {Object.<string|number, { _errors: { code: string, message: string }[] | any }> | { _errors: { code: string, message: string }[] }} DiscordErrorErrors
 */

module.exports = { ResponseError, DiscordError };
