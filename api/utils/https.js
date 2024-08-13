/* eslint-disable node/no-unsupported-features/node-builtins */
// @ts-check

const { ResponseError } = require('../resources/Errors');

/**
 * @typedef {Object} httpsOptions
 * @property {string|string[]} [url]
 * @property {string} [method]
 * @property {any} [body]
 * @property {HeadersInit} [headers]
 * @property {FormData} [formdata]
 * @property {string} [message]
 * @property {string} [errorMessage]
 * @property {string} [hint]
 * @property {any} [payload]
 * @property {'json'|'text'|'arrayBuffer'|'blob'|'formData'} [response_type]
 * @property {Object} [discord_params]
 * @property {boolean} [dropbox_content]
 * @property {any} [file]
 */

/**
 * @example
 * await https('https://example.com');
 *
 * await https({
 *   method: 'GET',
 *   url: 'https://example.com'
 * })
 *
 * // Leaving out headers will default to 'application/json'
 * await https({
 *   method: 'POST',
 *   url: 'https://example.com',
 *   body: {
 *     stuff: 'things'
 *   }
 * })
 * @param {httpsOptions|string} params
 * @returns {Promise<any>}
 */
async function https(params) {

  const
    {
      url: raw_url,
      method = 'GET',
      body = undefined,
      headers: raw_headers = {},
      formdata = undefined,
      message = undefined,
      errorMessage = undefined,
      hint = undefined,
      payload = undefined,
      response_type = 'json',
      discord_params = undefined,
      dropbox_content = false,
      file = undefined
    } = typeof params === 'string' ? { url: params } : params,
    url = process_url(raw_url),
    headers = process_headers(raw_headers, body),
    _body = process_body(body, formdata, file, dropbox_content),
    options = {
      method, headers,
      ...(_body && { body: _body })
    };

  // console.log('\nurl in https:', url);
  // console.log('headers in https:', headers);
  // console.log('body in https:', _body);

  return retry_request(url, options, {
    message,
    errorMessage,
    hint,
    payload,
    response_type,
    discord_params
  });
}

/**
 * @param {string|string[]|undefined} url
 * @returns
 */
function process_url(url) {
  if (!url) throw new Error('Please provide a url');
  if (Array.isArray(url)) {
    const { buildQueryStringFromArrays } = require('../resources/functions');
    url = buildQueryStringFromArrays(url);
  }
  return !/^https?:\/\//.test(url) ? `https://${url}` : url;
}

/**
 *
 * @param {HeadersInit} headers
 * @param {any} body
 * @returns
 */
function process_headers(headers, body) {
  const headers_ = new Headers(headers);
  if (!headers_.has('Content-Type'))
    headers_.append('Content-Type',
      body instanceof URLSearchParams
        ? 'application/x-www-form-urlencoded'
        : 'application/json; charset=UTF-8'
    );
  return headers_;
}

/**
 *
 * @param {any} body
 * @param {FormData|undefined} formdata
 * @param {any} file
 * @param {boolean} dropbox_content
 * @returns
 */
function process_body(body, formdata, file, dropbox_content) {
  if (formdata) return formdata;
  if (body && typeof body === 'object' && !(body instanceof URLSearchParams))
    return JSON.stringify(body);
  if (dropbox_content && file) return file;
  return body;
}

/**
 *
 * @param {string} url
 * @param {httpsOptions} options
 * @param {*} params
 * @returns
 */
async function retry_request(url, options, params) {
  const
    { removeFalsyFromObject } = require('../resources/functions'),
    { authorize } = require('../resources/handlers'),
    maxRetries = 3;

  let retries = 0, response;

  while (retries < maxRetries) {
    try {
      response = await fetch(url, options);
      const
        type = url.match(/discord|slack|spotify|dropbox|openai|anthropic|youtube|google|imgur|twitter/)?.[0],
        data = await processResponse(response, params);
      // if (data.error || data.error_summary || !response.ok) console.log('data in retry_request:', data);

      if (response.ok && (response.status === 204 || params.message))
        return removeFalsyFromObject({
          statusCode: response.status,
          type: /discord/.test(url) ? 'discord' : 'spotify',
          message: /discord/.test(url) ? 'Success' : params.message ?? '',
          body: params.payload ?? ''
        });


      if (response.status === 429) {
        const resetAfter = parseInt(response.headers.get('x-ratelimit-reset-after') || '0');
        if (resetAfter > 0) {
          console.log(`Rate limited. Waiting for ${resetAfter} seconds before retrying...`);
          await new Promise((resolve) => setTimeout(resolve, resetAfter * 1000));
          retries++;
          continue;
        }
      }

      if ((!response.ok || (data && data.ok === false)) && type) {
        if (response.status === 401 && /dropbox|slack|spotify|imgur|twitter|box|google/.test(type)) {
          // console.log('type.charAt(0).toUpperCase() + type.slice(1):', type.charAt(0).toUpperCase() + type.slice(1));
          throw await authorize(type?.charAt(0).toUpperCase() + type?.slice(1));
        }
        throw createResponseError(url, response, data, params);
      }
      return data;
    } catch (/** @type {any} */ error) {
      // if (error instanceof ResponseError) {
      throw error;
      /* } else if (response?.status !== 401 && response?.status !== 429) {
        console.log(`Error occurred in https: ${error.message}`);
        retries++;
        if (retries < maxRetries) {
          console.log(`Retrying (attempt ${retries})...`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          throw error;
        }
      } else throw error;
      */
    }
  }
}

/**
 *
 * @param {string} url
 * @param {Response} response
 * @param {any} data
 * @param {httpsOptions} param3
 * @returns
 */
function createResponseError(url, response, data, { errorMessage, hint, discord_params }) {
  const match = url.match(/discord|slack|spotify|dropbox|openai|anthropic|youtube|google|imgur|twitter/)?.[0];

  if (match === 'twitter' && response.status === 404) {
    return { authorize: match };
  }

  return new ResponseError(
    data?.data ?? data,
    response,
    `${match}_error`,
    errorMessage || hint ? { error: errorMessage, hint } : undefined,
    discord_params
  );
}

/**
 * @param {Response} response
 * @param {httpsOptions} param1
 * @returns
 */
async function processResponse(response, { response_type }) {
  try {
    return await response[response_type ?? 'json']();
  } catch {
    return await response.text();
  }
}

module.exports = { https };
