// @ts-check
'use-strict';

/**
 * @file OAuth2 endpoints
 * @module oauth2
 */

const { isValidJSON, returnErr } = require('../resources/functions');
const https = require('../utils/https');

module.exports = {

  /**
   * @summary OAuth2 token functions
   * @memberof module:oauth2
   * @namespace token
   */

  token: {

    /**
     * @summary
     * ### [Get Access Token]{@link https://discord.com/developers/docs/topics/oauth2#authorization-code-grant}
     * @example
     * await oauth.token.get({
     *   client_id: process.env.client_id,
     *   client_secret: process.env.client_secret,
     *   oauth2_redirect: process.env.oauth2_redirect
     *   code: params.code
     * });
     * @function get
     * @memberof module:oauth2.token#
     * @param {Object} params
     * @param {Snowflake} params.client_id
     * @param {string} params.client_secret
     * @param {string} params.oauth2_redirect
     * @param {string} params.code
     * @returns {Promise<?AccessTokenResponse>}
     */
    get: async (params) => {
      const { client_id, client_secret, oauth2_redirect, code } = params;
      return oauth('getToken', client_id, client_secret, { oauth2_redirect, code });
    },

    /**
     * @summary
     * ### [Get Refresh Token]{@link https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-refresh-token-exchange-example}
     * @example
     * await oauth.token.refresh({
     *   client_id: process.env.client_id,
     *   client_secret: process.env.client_secret,
     *   refresh_token: ??
     * });
     * @function refresh
     * @memberof module:oauth2.token#
     * @param {Object} params
     * @param {Snowflake} params.client_id
     * @param {string} params.client_secret
     * @param {string} params.refresh_token
     * @returns {Promise<?AccessTokenResponse>}
     */
    refresh: async (params) => {
      const { client_id, client_secret, refresh_token } = params;
      return oauth('refreshToken', client_id, client_secret, { refresh_token });
    },

    /**
     * @summary
     * ### [Revoke Refresh Token]
     * @example
     * await oauth.token.revoke({
     *   client_id: process.env.client_id,
     *   client_secret: process.env.client_secret,
     *   token: token
     * });
     * @function revoke
     * @memberof module:oauth2.token#
     * @param {Object} params
     * @param {Snowflake} params.client_id
     * @param {string} params.client_secret
     * @param {AccessTokenResponse} params.token
     * @returns {Promise<?AccessTokenResponse>}
     */
    revoke: async (params) => {
      const { client_id, client_secret, token } = params;
      return oauth('revokeToken', client_id, client_secret, { token });
    }

  },

  /**
   * @summary OAuth2 credential functions
   * @memberof module:oauth2
   * @namespace credentials
   */

  credentials: {

    /**
     * @summary
     * ### [Get Current User]{@link https://discord.com/developers/docs/resources/user#get-current-user}
     * @example
     * await oauth.credentials.user({ token });
     * @function user
     * @memberof module:oauth2.credentials#
     * @param {Object} params
     * @param {AccessTokenResponse} params.token
     * @returns {Promise<?User>}
     */
    user: (params) => {
      const { token } = params;
      return oauth('getUserCreds', undefined, undefined, { token });
    },

    /**
     * @summary
     * ### [Get Client Credentials]{@link https://discord.com/developers/docs/topics/oauth2#client-credentials-grant}
     * @example
     * await oauth.credentials.client({
     *   client_id: process.env.client_id,
     *   client_secret: process.env.client_secret,
     *   scope: scope
     * });
     * @function client
     * @memberof module:oauth2.credentials#
     * @param {Object} params
     * @param {Snowflake} params.client_id
     * @param {string} params.client_secret
     * @param {string} params.scope
     * @returns {Promise<?Omit<AccessTokenResponse, 'refresh_token'>>}
     */
    client: (params) => {
      const { client_id, client_secret, scope } = params;
      return oauth('getClientCreds', client_id, client_secret, { scope });
    }

  }
};

/**
 * @param {'getClientCreds'|'getUserCreds'|'getToken'|'refreshToken'|'revokeToken'} grant_type
 * @param {Snowflake} [client_id]
 * @param {string} [client_secret]
 * @param {Object} options
 * @param {string} [options.oauth2_redirect] - The OAuth2 redirect URI.
 * @param {string} [options.refresh_token] - The refresh token.
 * @param {string} [options.scope] - The OAuth2 scope.
 * @param {string} [options.code] - The authorization code.
 * @param {AccessTokenResponse} [options.token] - The token.
 * @returns {Promise<?AccessTokenResponse & User & Omit<AccessTokenResponse, 'refresh_token'>>} - The OAuth2 token or false if there was an error.
 */
async function oauth(grant_type, client_id, client_secret, options = {}) {
  try {
    const { oauth2_redirect, refresh_token, scope, code, token } = options;
    if (!client_id || !client_secret || (!oauth2_redirect && !refresh_token && !scope && !code && !token)) return null;
    
    let path = grant_type.includes('Token')
      ? '/api/oauth2/token' : '/api/users/@me';
    if (grant_type === 'revokeToken') path += '/revoke';

    const method = grant_type.includes('Token') ? 'post' : 'get';
    const types = {
      getToken: 'authorization_code',
      refreshToken: 'refresh_token',
      revokeToken: 'revoke',
      getClientCreds: 'client_credentials',
      getUserCreds: 'user'
    };

    let body = `grant_type=${types[grant_type]}&client_id=${client_id}&client_secret=${client_secret}`;
    
    if (types[grant_type] === 'authorization_code' && oauth2_redirect && code)
      body += `&redirect_uri=${encodeURIComponent(oauth2_redirect)}&code=${code}`;
    else if (types[grant_type] === 'refresh_token' && refresh_token)
      body += `&refresh_token=${refresh_token}`;
    else if (types[grant_type] === 'client_credentials' && scope)
      body += `&scope=${scope}`;
    else if (types[grant_type] === 'user' && token)
      body = '';
    else if (types[grant_type] === 'revoke' && token)
      body = `${body.replace(/^(.*?)&/, '')}&token=${token}`;
        
    const headers = grant_type === 'getUserCreds'
      ? { Authorization: `${token?.token_type} ${token?.access_token}` }
      : { 'Content-Type': 'application/x-www-form-urlencoded' };

    /**
     * @typedef {Object} ResponseBody
     * @property {string} url
     * @property {string} path
     * @property {Object} headers
     * @property {Object} [body]
     * @property {number} [statusCode]
     */

    /**
     * @type {ResponseBody}
     */
    const responseBody = {
      url: encodeURI('discord.com'),
      path: encodeURI(path),
      headers,
      body
    };

    if (method === 'post')
      responseBody.statusCode = 200;

    const attempt = await https[method](responseBody);
    
    if (attempt.statusCode >= 200) {
      try {
        return JSON.parse(attempt.body);
      } catch {
        return attempt.body;
      }
    } else {
      throw new Error(
        attempt.body.length
          ? isValidJSON(attempt.body)
            ? returnErr(attempt)
            : attempt.body
          : attempt
      );
    }
    
  } catch (e) {
    console.log(e);
    throw e;
  }
}