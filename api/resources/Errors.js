// @ts-check
'use-strict';

const { SlackErrorCodes, Messages } = require('./ErrorMessages');

class ResponseError extends Error {
  
  /**
   * @param {DiscordError} res 
   * @param {Response} response
   * @param {string} type
   */
  constructor(res, response, type) {
    super();

    this.type = type;
    if (response.status !== 200) this.status = response.status;
    if (response.statusText !== 'OK') this.statusText = response.statusText;
    
    if (type === 'discord_error') {
      if (!res) return;
      this.message = res.message;
      /** @type {number} */
      if (res.code !== 0) this.code = res.code;
      if (res.retry_after) this.retry_after = res.retry_after;
      if (res.global) this.global = res.global;
      
      if (DiscordError(res))
        this.details = DiscordError(res);

    } else if (type === 'slack_error') {
      if (!res) return;
      this.message = res.error;
      // console.log('slack error');
      // console.log('res', res);
      if (SlackError(res)) {
        this.details = SlackError(res);
        /*
        const props = SlackError(res);
        console.log('props', props);
        if (!props && !Object.keys(props)?.length) return;
        for (const [k, v] of Object.entries(props))
          // console.log('k:', k);
          this[k] = v;
        */
      }
    } else if (type === 'spotify_error') {
      if (!res) return;
      if (typeof res.error !== 'string' && res.error?.message)
        this.message = res.error?.message;

      // console.log('res in errors', res);
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
 * Format the message for an error.
 * @param {string} code The error code
 * @param {Array<*>} args Arguments to pass for util format or as function args
 * @returns {string} Formatted string
 * @ignore
 */
function message(code, args) {
  console.log('code in message():', code);
  if (!(code in SlackErrorCodes)) throw new Error('Error code must be a valid Discord ErrorCode');
  const msg = Messages[code].method;
  if (!msg) throw new Error(`No message associated with error code: ${code}.`);
  if (typeof msg === 'function') return msg(...args);
  if (!args?.length) return msg;
  args.unshift(msg);
  return String(...args);
}

/**
 * @param {DiscordError} err 
 */
function DiscordError(err) {
  // ('error from discordError', JSON.stringify(err, null, 2));
  /**
   * @type {{ [s: string]: string|number|boolean; }}
   */
  const errinfo = {};
  
  /** @type {(k: string) => boolean} */ 
  const ignore = (k) => k !== 'errors' && k !== '_errors' && k !== 'code';

  /** @type {(v: any) => boolean} */ 
  const isObj = (v) => v && typeof v === 'object';
  
  /** @type {(k: Object) => Array<any>} */ 
  const entries = (obj) => Object.entries(obj);
  
  /** @type {(k: string) => boolean} */  
  const isIndex = (key) => /\d/.test(key);
  
  /** @type {(k: DiscordErrorErrors) => boolean} */ 
  const has = (v) => v && (v?.['_errors']?.[0]?.['message'] || Object.entries(v)?.[0]?.[1]?.['_errors']?.[0]?.['message']);

  /**
   * @param {string} k 
   * @param {*} v 
   * @returns {boolean}
   */
  const check = (k, v) => !isIndex(k) && ignore(k) && has(v);
  /**
   * @param {{ [s: string]: string|number|boolean; } | ArrayLike<any>} obj
   */
  function parseErrors(obj) {
    for (const [, value] of Object.entries(obj))
      if (isObj(value))
        for (const [key1, value1] of entries(value)) {
          if (check(key1, value1))
            errinfo[key1] = has(value1);
            
          if (isObj(value1)) 
            for (const [key2, value2] of entries(value1)) 
              if (isObj(value2)) 
                for (const [key3, value3] of entries(value2)) {
                  if (check(key3, value3))
                    errinfo[`${key1}[${key2}].${key3}`] = has(value3);
                    
                  if (isObj(value3)) 
                    for (const [key4, value4] of entries(value3)) {
                      if (check(key4, value4))
                        errinfo[`${key1}.${key2}[${key3}].${key4}`] = value4?.['_errors']?.[0]?.['message'];
                        
                      if (isObj(value4)) 
                        for (const [key5, value5] of entries(value4)) {
                          if (check(key5, value5))
                            errinfo[`${key1}[${key2}].${key3}[${key4}].${key5}`] = value5?.['_errors']?.[0]?.['message'];
                            
                          // deep components
                          if (isObj(value5)) 
                            for (const [key6, value6] of entries(value5))
                              if (isObj(value6))
                                for (const [key7, value7] of entries(value6))
                                  if (check(key7, value7))
                                    errinfo[`${key1}[${key2}].${key3}[${key4}].${key5}[${key6}].${key7}`] = value7?.['_errors']?.[0]?.['message'];
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
 * 
 * @param {DiscordError} err 
 * @returns 
 */
function SlackError(err) {
  // console.log('err in parseSlackError:\n', err);
  const errs = {};
  if (err.needed) errs['missing_scope'] = err.needed;
  if (!err.errors && !err.response_metadata && !err.warnings) {
    return err.needed ? errs : null; // { message: err.error };
  }
  

  for (const e of err.errors ?? err.response_metadata?.messages) {
    // console.log('e of err.errors:', e);
    const match = e.match(/(?:(?<=]\s)).*|^.*?(?:(?=:)|(?=\s\[))|(?<=:\/).*(?=\])/gmi);
    // const match = e.match(/^.*?(?:(?=:)|(?=\s\[))|(?<=:\/).*(?=\])/gmi);
    // console.log('match', match);
    const specificProp = e.match(/(?<=:\s)(\w+)(?!\[)/gi)?.[0];
    // console.log('specific prop:', specificProp);
    // const specificProp = e.match(/:\s(\w+)(?!\[)/i)?.[1];
    if (!match) return e;
    const [message, path] = match;
    let newPath = '';
    // path = path.split('/');
    // const prop = path[0];
    // errs[prop] = errs[prop] || [];
    // console.log('prop:', prop);
    
    for (const p of path.split('/')) {
      newPath += /\d/.test(p) ? `[${p}]` : `.${p}`;
    }
    
    // path = path.slice(2).join('.');
    newPath = newPath.slice(1);
    // console.log('newPath:', newPath);
    // console.log('path:', path);
    errs[newPath] = message;
    /*
    for (const block of blocks) {
      // const propname = ``
      if (specificProp) {
        errs[prop][`${message} (${newPath})`] = { [specificProp]: get(block, specificProp) };
      } else {
        console.log(get(block, path));
        errs[prop][`${message} (${newPath})`] = get(block, path);
      }
      console.log(errs);
    }
    */
  }
  // console.log('final errs', errs);
  return errs;
}

/**
 * @param {Object} obj
 * @param {string} path
 * @param {*} [defaultValue]
 * @returns
 */
function get(obj, path, defaultValue = undefined) {
  const travel = (/** @type {RegExp} */ regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((/** @type {Object} */ res, /** @type {string} */ key) => (
        res !== null && res !== undefined
          ? res[key]
          : res
      ), obj);
  const result
    = travel(/[,[\]]+?/) ||
    travel(/[,[\].]+?/);

  return result === undefined || result === obj
    ? defaultValue
    : result;
}

/**
 * @typedef {Object} DiscordError
 * @property {string} message
 * @property {boolean} [ok]
 * @property {string|{status: number, message: string}} [error]
 * @property {{messages: Array<string>}} [response_metadata]
 * @property {number} [code]
 * @property {boolean} [global]
 * @property {number} [retry_after]
 * @property {DiscordErrorErrors} [errors],
 * @property {string} [needed]
 * @property {Array<string>} [warnings]
 */

/**
 * @typedef {Object.<string|number, { _errors: { code: string, message: string }[] | any }> | { _errors: { code: string, message: string }[] }} DiscordErrorErrors
 */

module.exports = { ResponseError, DiscordError, SlackError };
