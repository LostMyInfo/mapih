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
 * @returns 
 */
async function https(params) {
  let url = typeof params === 'string'
    ? params
    : params.url;
  
  if (!url) throw new Error('Please provide a url');
  if (!url.startsWith('https://') && !url.startsWith('http://'))
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
    if (!response.ok) {
      if (url.includes('discord'))
        throw new ResponseError(await response.json(), response, 'discord_error');
      else if (url.includes('slack'))
        throw new ResponseError(await response.json(), response, 'slack_error');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

module.exports = { https };