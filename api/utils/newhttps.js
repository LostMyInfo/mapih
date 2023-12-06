// @ts-check
const { ResponseError } = require('../resources/Errors');

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
 * @param {string} [params.url] 
 * @param {string} [params.method]
 * @param {Object|string} [params.body]
 * @param {*|HeadersInit} [params.headers] 
 * @param {string} [match]
 * @returns 
 */
async function https(params, match = undefined) {
  let url = typeof params === 'string' ? params : params.url;
  if (!url) throw new Error('Please provide a url');
  if (!url.startsWith('http'))
    url = `https://${url}`;

  const headers = new Headers(params.headers || {});
  if (params.method !== 'GET' && !headers.has('Content-Type'))
    headers.append('Content-Type', 'application/json; charset=UTF-8');

  const body = params.body && typeof params.body === 'object' ?
    JSON.stringify(params.body) :
    params.body;

  const options = {
    method: params.method || 'GET',
    headers: headers,
    ...(body && { body })
  };

  try {
    const response = await fetch(url, options);
    // console.log(response);
    const json = await response.json().catch(() => null);

    if (response.ok && response.status === 204)
      return { statusCode: response.status, message: 'success' };
    
    if (!response.ok || (json && json.ok == false))
      throw (match = (url.match(/discord|slack/))?.[0])
        ? new ResponseError(json, response, `${match}_error`)
        : new Error(`Request failed with status ${response.status}: ${response.statusText}`);

    /*
    if (!response.ok || (json && json.ok == false)) {
      throw url.includes('discord')
        ? new ResponseError(json, response, 'discord_error')
        : url.includes('slack')
          ? new ResponseError(json, response, 'slack_error')
          : new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    }
    */
    /*
    let jsonResponse;
    try {
      jsonResponse = await response.json();
    } catch (error) { }
    // console.log('jsonResponse:', jsonResponse);
    console.log('response.ok:', response.ok);
    if (response.ok && response.status >= 200 && response.status <= 300 && jsonResponse)
      return jsonResponse;

    if (!response.ok || (jsonResponse && jsonResponse.ok == false)) {
      if (url.includes('discord'))
        throw new ResponseError(jsonResponse, response, 'discord_error');
      else if (url.includes('slack'))
        throw new ResponseError(jsonResponse, response, 'slack_error');
      else
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    }
    */
  
    return json;
  } catch (error) {
    throw error;
  }
}

module.exports = { https };