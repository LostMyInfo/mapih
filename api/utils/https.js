/* eslint-disable node/no-unsupported-features/node-builtins */
// @ts-check
const { ResponseError } = require('../resources/Errors');

module.exports = {
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
   * @param {Object} params
   * @param {string|string[]} [params.url] 
   * @param {string} [params.method]
   * @param {any} [params.body]
   * @param {*|HeadersInit} [params.headers]
   * @param {boolean} [params.formdata]
   * @param {string} [params.message]
   * @param {string} [params.errorMessage]
   * @param {string} [params.hint]
   * @param {any} [params.payload]
   * @param {'json'|'text'|'arrayBuffer'|'blob'|'formData'} [params.response_type]
   * @param {Object} [params.discord_params]
   * @param {string} [match]
   * @returns 
   */
  async https(params, match = undefined) {
    const { removeFalsyFromObject } = require('../resources/functions');
    let url = typeof params === 'string' ? params : params.url;
    if (!url) throw new Error('Please provide a url');
    if (Array.isArray(url)) {
      const { buildQueryStringFromArrays } = require('../resources/functions');
      url = buildQueryStringFromArrays(url);
    }
    
    if (!/^https?:\/\//.test(url))
      url = `https://${url}`;

    const headers = new Headers(params.headers || {});
    if (!headers.has('Content-Type'))
      headers.append('Content-Type',
        params.body instanceof URLSearchParams
          ? 'application/x-www-form-urlencoded'
          : 'application/json; charset=UTF-8'
      );

    if (params.formdata)
      headers.set('Content-Type', 'multipart/form-data');

    const data = params.formdata ? new FormData() : undefined;
    if (params.formdata && data) {
      for (const [key, value] of Object.entries(params.body)) {
        data.append(key, value);
      }
    }

    const body =
      params.formdata && data ? data :
        params.body && typeof params.body === 'object' &&
        params.body.constructor.name !== 'URLSearchParams'
          ? JSON.stringify(params.body)
          : params.body;
    
    const options = {
      method: params.method || 'GET',
      headers: headers,
      ...(body && { body })
    };
    // console.log(options);

    const maxRetries = 3;
    let
      retries = 0,
      // remaining = 0,
      reset_after = 0;

    while (retries < maxRetries) {
      try {
        const response = await fetch(url, options);
        let data;
        try {
          data = await response.clone()[`${params.response_type ?? 'json'}`]();
        } catch {
          data = data ?? await response.text();
        }
        // console.log('remaining:', response.headers.get('x-ratelimit-remaining'));
        // console.log('reset-after:', response.headers.get('x-ratelimit-reset-after'));

        if (response.headers.has('x-ratelimit-reset-after')) {
          // remaining = parseInt(response.headers.get('x-ratelimit-remaining') || '');
          reset_after = parseInt(response.headers.get('x-ratelimit-reset-after') || '');
        }

        if (response.ok && (response.status === 204 || params.message))
          return removeFalsyFromObject({
            statusCode: response.status,
            type: /discord/.test(url) ? 'discord' : 'spotify',
            message: /discord/.test(url)
              ? 'Success'
              : params.message ?? '',
            body: params.payload ?? ''
          });

        if (response.status === 429) {
          if (reset_after !== 0) {
            console.log(`Rate limited. Waiting for ${reset_after} seconds before retrying...`);
            await new Promise((resolve) => setTimeout(resolve, reset_after * 1000));
            retries++;
            continue;
          }
        }

        if (!response.ok || (data && data.ok == false))
          throw (match = (url.match(/discord|slack|spotify|dropbox|openai|anthropic|youtube|google|imgur|twitter/))?.[0])
            ? match === 'twitter' && response.status === 404 ? { authorize: match } : new ResponseError(data?.data ?? data, response, `${match}_error`, params.errorMessage || params.hint ? { error: params.errorMessage, hint: params.hint } : undefined, params.discord_params)
            : new Error(`Request failed with status ${response.status}: ${response.statusText}\n${data ? JSON.stringify(data, null, 2) : ''}`);

        return data;
      } catch (/** @type {*} */ error) {
        if (error instanceof ResponseError) {
          throw error;
        } else {
          console.error(`Error occurred: ${error.message}`);
          retries++;
          if (retries < maxRetries) {
            console.log(`Retrying (attempt ${retries})...`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
          } else {
            throw error;
          }
        }
      }
    }

    /*
    try {
      const response = await fetch(url, options);
      // console.log('Response type:', response.type);
      // console.log('url from https:', url);
      let data;
      try {
        // console.log('TRY');
        // data = await response.clone().json();
        data = await response.clone()[`${params.response_type ?? 'json'}`]();
        // console.log('data 1', data);
      } catch {
        // console.log('CATCH');
        // console.log('Response type / catch:', response.type);
        data = data ?? await response.text();
      }
      // console.log('data\n', data);
      // console.log('Response type / postcatch:', response.type);
      // console.log('Response body used:', response.bodyUsed);

      // console.log(params);
      if (response.ok && (response.status === 204 || params.message))
        return removeFalsyFromObject({
          statusCode: response.status,
          type: /discord/.test(url) ? 'discord' : 'spotify',
          message: /discord/.test(url)
            ? 'Success'
            : params.message ?? '',
          body: params.payload ?? ''
        });
      
      if (!response.ok || (data && data.ok == false))
        throw (match = (url.match(/discord|slack|spotify|dropbox|openai|anthropic|youtube|google|imgur|twitter/))?.[0])
          ? match === 'twitter' && response.status === 404 ? { authorize: match } : new ResponseError(data?.data ?? data, response, `${match}_error`, params.errorMessage || params.hint ? { error: params.errorMessage, hint: params.hint } : undefined, params.discord_params)
          : new Error(`Request failed with status ${response.status}: ${response.statusText}\n${data ? JSON.stringify(data, null, 2) : ''}`);
  
      return data;
    } catch (error) {
      throw error;
  }
  */
  }
};