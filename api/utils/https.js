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
   * @param {string} [params.message]
   * @param {any} [params.payload]
   * @param {'json'|'text'|'arrayBuffer'|'blob'|'formData'} [params.response_type]
   * @param {string} [match]
   * @returns 
   */
  async https(params, match = undefined) {
    let url = typeof params === 'string' ? params : params.url;
    if (!url) throw new Error('Please provide a url');

    if (Array.isArray(url)) {
      const { buildQueryStringFromArrays } = require('../resources/functions');
      url = buildQueryStringFromArrays(url);
    }
    
    if (!url.startsWith('http'))
      url = `https://${url}`;

    const headers = new Headers(params.headers || {});
    if (!headers.has('Content-Type'))
      headers.append('Content-Type',
        params.body instanceof URLSearchParams
          ? 'application/x-www-form-urlencoded'
          : 'application/json; charset=UTF-8'
      );

    const body =
      params.body && typeof params.body === 'object' &&
        params.body.constructor.name !== 'URLSearchParams'
        ? JSON.stringify(params.body)
        : params.body;
    
    const options = {
      method: params.method || 'GET',
      headers: headers,
      ...(body && { body })
    };

    try {
      const response = await fetch(url, options);
      
      let data;
      try {
        // console.log('TRY');
        data = params.response_type
          ? await response[`${params.response_type}`]()
          : await response.clone().json();
      } catch {
        // console.log('CATCH');
        data = data || await response.text();
      }

      // console.log('data in https:\n', data || response);
      // console.log(params);
      if (response.ok && (response.status === 204 || params.message))
        return {
          statusCode: response.status,
          type: /discord/.test(url) ? 'discord' : 'spotify',
          message: /discord/.test(url)
            ? 'Success'
            : params.message ?? '',
          body: params.payload ?? ''
        };
      
      if (!response.ok || (data && data.ok == false))
        throw (match = (url.match(/discord|slack|spotify|dropbox|openai/))?.[0])
          ? new ResponseError(data, response, `${match}_error`)
          : new Error(`Request failed with status ${response.status}: ${response.statusText}\n${data ? 'Error: ' + JSON.stringify(data, null, 2) : ''}`);
  
      return data;
    } catch (error) {
      throw error;
    }
  }
};