// @ts-check
'use-strict';

const { SlackErrorCodes, Messages } = require('./ErrorMessages');

// DELETE `| string` from DiscordError

class ResponseError extends Error {
  
  /**
   * @param {?DiscordError} res 
   * @param {?Response} response
   * @param {string} type
   * @param {{ error?: string, hint?: string } | undefined} [content]
   */
  constructor(res, response, type, { error, hint } = {}) {
    super();

    // const { error, hint } = content || {};

    this.type = type;
    if (response?.status && response?.status !== 200)
      this.code = response.status;
    if (response?.statusText && response?.statusText !== 'OK')
      if (!/Forbidden|Unknown Error/gi) this.statusText = response.statusText;
    
    if (type === 'discord_error') {
      if (!res && !error && !hint) return;
      if ((res && (res.message || (res.error && typeof res.error === 'string'))) || error)
        this.message = res ? res.message && typeof res.message === 'string' ? res.message : res.error && typeof res.error === 'string' ? res.error : error || '' : '';

      if (res) {
        if (res.message && typeof res.message === 'string') this.message = res.message;
        else if (res.error && typeof res.error === 'string') this.message = res.error;

        /** @type {number} */
        if (res.code && res.code !== 0) this.code = res.code;
        if (res.retry_after) this.retry_after = res.retry_after;
        if (res.global) this.global = res.global;
          
        if (DiscordError(res))
          this.details = DiscordError(res);
      }
            
    } else if (type === 'slack_error') {
      if (!res && !error && !hint) return;
      if ((res && (res.message || (res.error && typeof res.error === 'string'))) || error)
        this.message = res ? res.message && typeof res.message === 'string' ? res.message : res.error && typeof res.error === 'string' ? res.error : error || '' : '';
      if (res && SlackError(res))
        this.details = SlackError(res);
    
    } else if (type === 'spotify_error') {
      if (!res && !error && !hint) return;
      
      if (res && res.error) {
        this.message = typeof res.error !== 'string' ? res.error.message : res.error;
        if (typeof res.error !== 'string' && res.error.reason && !/unknown/i.test(res.error.reason))
          this.reason = res.error.reason.toLowerCase().replace(/_/g, ' ');
      }
      if (res && res.error_description)
        this.details = res.error_description;

      if (error) this.message = error;
      if (hint) this.hint = hint;

    } else if (type === 'dropbox_error') {
      if (!res && !error && !hint) return;
      // if (typeof res === 'string')
      // this.details = res;
      if (error) this.message = error;
      if (hint) this.hint = hint;
      if (res && res.error_summary)
        this.details = res.error_summary;

    } else if (type === 'openai_error') {
      // console.log('res in error\n', res);
      if (!res && !error && !hint) return;
      if (error) this.message = error;
      else if (res && res.error) {
        this.message = typeof res.error !== 'string' ? res.error.message : '';
        this.details = typeof res.error !== 'string' && res.error.type ? res.error.type : '';
        if (typeof res.error !== 'string' && res.error.param)
          this.param = typeof res.error !== 'string' && res.error.param ? res.error.param : '';
      }
      if (hint) this.hint = hint;
    } else if (type === 'google_error') {
      const reasons = [];
      if (!res && !error && !hint) return;
      console.log('res in google error:', JSON.stringify(res, null, 2));
      if (res && res.error && typeof res.error === 'object') {
        if (typeof res.error.status === 'string')
          this.status = res.error.status?.toLowerCase().replace(/_/g, ' ');
        this.message = res.error.message;
        if (res.error.errors?.length)
          for (const error of res.error.errors) {
            if (error.message) {
              if (!res.error.message) this.message = error.message;
              if (error.reason) reasons.push(error.reason);
            }
          }
        if (res.error.details?.length)
          for (const detail of res.error.details)
            if (/ErrorInfo/.test(detail['@type']))
              if (detail.reason) reasons.push(detail.reason?.toLowerCase().replace(/_/g, ' '));
              // this.reason = detail.reason?.toLowerCase().replace(/_/g, ' ');
      }
      if (reasons.length) this.reason = reasons.join(', ');
      if (error) this.message = error;
      if (hint) this.hint = hint;

    } else if (type === 'imgur_error') {
      if (!res && !error && !hint) return;
      console.log('res in errors imgur:', res);
      if ((res && (res.message || (res.error && typeof res.error === 'string'))) || error)
        this.message = res ? res.message && typeof res.message === 'string' ? res.message : res.error && typeof res.error === 'string' ? res.error : error || '' : '';
    
    } else if (type === 'twitter_error') {
      console.log('res in twitter error:\n', res);
      if (res?.status === 429 && response?.headers.get('x-rate-limit-reset')) {
        const reset = response.headers.get('x-rate-limit-reset');
        if (reset) this.wait_until = new Date(parseInt(reset) * 1000).toTimeString();
      }
      if (!res && !error && !hint) return;

      if (res?.reason) this.reason = res?.reason;
      if (res?.required_enrollment) this.required_enrollment = res?.required_enrollment;
      if (res?.error && typeof res?.error === 'string') this.message = res.error;
      else if (res?.title) this.message = res.title;
      else if (res?.errors && res?.errors.length && res?.errors[0].label) this.message = res.errors[0].label;
      else if (res?.errors && res?.errors.length && res?.errors[0].detail) this.message = res.errors[0].detail.split(':')[0];

      if (res?.error_description) this.details = res.error_description;
      else if (res?.detail) this.details = res.detail;

      if (res?.errors && res?.errors.length) {
        if (res.errors[0].parameters) this.parameter = Object.keys(res.errors[0].parameters)[0];
        else if (res.errors[0].parameter) this.parameter = res.errors[0].parameter;
        if (res.errors[0].message) this.reason = res.errors[0].message;//  ?? res.errors[0];
        if (res.errors[0].resource_type) this.resource_type = res.errors[0].resource_type;
        if (res.errors[0].value) this.resource_value = res.errors[0].value;
        // console.log('res.errors', Object.keys(res.errors[0].parameters)[0]);
      }
      
    }
  }
};

// DELETE `| string` from DiscordError

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
  // console.log('error from discordError', JSON.stringify(err, null, 2));
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
   * @param {DiscordError} obj
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

  // console.log('errinfo:', errinfo);
  return err.errors ? errinfo : undefined;
}

/**
 * 
 * @param {DiscordError} err 
 * @returns 
 */
function SlackError(err) {
  console.log('err in parseSlackError:\n', err);
  const errs = {};
  if (err.needed) errs['missing_scope'] = err.needed;
  if (!err.errors && !err.response_metadata && !err.warnings) {
    return err.needed ? errs : null; // { message: err.error };
  }
  

  for (const e of err.errors ?? err.response_metadata?.messages) {
    // console.log('e of err.errors:', e);
    const match = e.match(/(?:(?<=]\s)).*|^.*?(?:(?=:)|(?=\s\[))|(?<=:\/).*(?=\])/gmi);
    // const match = e.match(/^.*?(?:(?=:)|(?=\s\[))|(?<=:\/).*(?=\])/gmi);
    console.log('match', match);
    const specificProp = e.match(/(?<=:\s)(\w+)(?!\[)/gi)?.[0];
    console.log('specific prop:', specificProp);
    // const specificProp = e.match(/:\s(\w+)(?!\[)/i)?.[1];
    if (!match) return e;
    let message, path;
    if (match.length === 1)
      message = match[0];
    else [message, path] = match;
    // const [message, path] = match;
    let newPath = '';
    // path = path.split('/');
    // const prop = path[0];
    // errs[prop] = errs[prop] || [];
    // console.log('prop:', prop);
    console.log('path:', path);
    if (path)
      for (const p of path.split('/')) {
        newPath += /\d/.test(p) ? `[${p}]` : `.${p}`;
      }
    
    // path = path.slice(2).join('.');
    newPath = path ? newPath.slice(1) : specificProp ? specificProp : 'error';
    // console.log('newPath:', newPath);
    // console.log('path:', path);
    // specificProp ? errs[message] = specificProp : errs[newPath] = message;
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
 * @property {string|{status?: number|string, message: string, reason?: string, param?: string, code?: ?number, type?: string, errors?: Array<{message?: string, domain?: string, reason?: string, extendedHelp?: string}>, details?: Array<{'@type': string, links?: Array<{description: string, url: string}>, reason?: string, domain?: string, metadata?: { service?: string, consumer?: string}}>}} [error]
 * @property {{messages: Array<string>}} [response_metadata]
 * @property {number} [code]
 * @property {boolean} [global]
 * @property {number} [retry_after]
 * @property {DiscordErrorErrors} [errors]
 * @property {string} [needed]
 * @property {Array<string>} [warnings]
 * @property {string} [error_description]
 * @property {string} [error_summary]
 * @property {string} [title]
 * @property {string} [detail]
 * @property {string} [reason]
 * @property {string} [required_enrollment]
 * @property {number} [status]
 */

/**
 * @typedef {Object.<string|number, { _errors: { code: string, message: string }[] | any }> | { _errors: { code: string, message: string }[] }} DiscordErrorErrors
 */

module.exports = { ResponseError, DiscordError, SlackError };
