/* eslint-disable node/no-unsupported-features/node-builtins */
// @ts-check
'use-strict';
const { https } = require('../utils/https');
const { attemptHandler } = require('../resources/handlers');

/**
 * @file OAuth2 endpoints
 * @module oauth2
 */


module.exports = {

  /**
   * @summary
   * ### [Get Current Bot Application Information]{@link https://discord.com/developers/docs/topics/oauth2#get-current-bot-application-information}
   * @example
   * await api.discord.oauth2.appInfo();
   * @memberof module:oauth2#
   * @function appInfo
   * @returns {Promise<Application>} The bots [Application]{@link https://discord.com/developers/docs/resources/application#application-object} object
   */
  appInfo: async () =>
    attemptHandler({
      method: 'GET',
      endpoint: 'oauth2/token'
    }),
  
  /**
   * @summary
   * ### [Get Current Authorization Information]{@link https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information}
   * @example
   * await api.discord.oauth2.authorizationInfo();
   * @memberof module:oauth2#
   * @function authorizationInfo
   * @returns {Promise<{application: Application, scopes: Array<string>, expires: ISO8601Timestamp, user?: User}>} Returns info about the current authorization. Requires authentication with a bearer token.
   */
  /*
  authorizationInfo: async () =>
    attemptHandler({
      method: 'GET',
      endpoint: 'oauth2/@me'
    })
  */

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
      return oauth('authorization_code', client_id, client_secret, { oauth2_redirect, code });
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
      return oauth('refresh_token', client_id, client_secret, { refresh_token });
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
      return oauth('revoke', client_id, client_secret, { token });
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
      return oauth('user', undefined, undefined, { token });
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
      return oauth('client_credentials', client_id, client_secret, { scope });
    }

  }
};

/**
 * @param {string} grant_type
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
    
    let path = /auth|oke/gi.test(grant_type)
      ? '/api/oauth2/token' : '/api/users/@me';
    if (grant_type === 'revoke') path += '/revoke';

    const method = /auth|oke/gi.test(grant_type) ? 'POST' : 'GET';

    /**
     * @type {{grant_type?: string, client_id?: string, client_secret?: string, redirect_uri?: string, code?: string, refresh_token?: string, scope?: string, token?: string}|undefined}
     */
    let body = {
      grant_type, client_id, client_secret
    };
    
    if (grant_type === 'authorization_code' && oauth2_redirect && code) {
      body['redirect_uri'] = oauth2_redirect;
      body['code'] = code;
    } else if (grant_type === 'refresh_token' && refresh_token) 
      body['refresh_token'] = refresh_token;
    else if (grant_type === 'client_credentials' && scope)
      body['scope'] = scope;
    else if (grant_type === 'user' && token)
      body = undefined;
    else if (grant_type === 'revoke' && token) {
      body['token'] = token.access_token ?? token.refresh_token;
    }
        
    // @ts-ignore
    body = new URLSearchParams(body);

        
    const headers = grant_type === 'getUserCreds'
      ? { Authorization: `${token?.token_type} ${token?.access_token}` }
      : { 'Content-Type': 'application/x-www-form-urlencoded' };

    /**
     * @typedef {Object} ResponseBody
     * @property {string} url
     * @property {string} method
     * @property {Object} headers
     * @property {Object} [body]
     * @property {number} [statusCode]
     */

    /**
     * @type {ResponseBody}
     */
    const responseBody = {
      url: `https://discord.com${path}`,
      method,
      headers,
      body
    };

    if (method === 'POST')
      responseBody.statusCode = 200;

    return https(responseBody);
    
  } catch (e) {
    console.log(e);
    throw e;
  }
}