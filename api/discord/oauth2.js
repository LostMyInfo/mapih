const https = require(`../utils/https`);
/**
 * Discord Oauth2 implement. Created for the Autocode community
 * 
 * Discord API Resource: https://discord.com/developers/docs/topics/oauth2#oauth2 
 * 
 * RFC 6749: https://www.rfc-editor.org/rfc/rfc6749
 */
module.exports = {
  /**
   * Returns the user object of the requested account.
   * 
   * example:
   * ```js
   *   const oauth2 = require('discord-oauth2-zero');
   *   let credentials = await getCredentials(token);
   * ```
   * @param {object} token Bearer token object of client to retrieve credentials for.
   * @returns {Promise<object>} {...}
   * 
   * https://discord.com/developers/docs/resources/user#get-current-user
   */
  async getCredentials(token) {
    try {
      if (
        (res = await https.get({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/users/@me`),
          headers: {
            Authorization: `${token.token_type} ${token.access_token}`,
          },
          body: ``,
        }))
      ) {
        return JSON.parse(res.body);
      } else return false;
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * Returns a bearer token object for the bot owner. Usually used for development and testing.
   * 
   * example:
   * ```js
   *   const oauth2 = require('discord-oauth2-zero');
   *   let clientCredentials = await getClientCredentials(client_id, client_secret, scope);
   * ```
   * 
   * @param {string} client_id client id from developers portal.
   * @param {string} client_secret client secret from developers portal.
   * @param {string} scope scope of permissions to request.
   * @returns {Promise<object>}
   * {
   *   "access_token": string,
   *   "token_type": "Bearer",
   *   "expires_in": integer(ms),
   *   "scope": string
   * }
   * 
   * https://discord.com/developers/docs/topics/oauth2#client-credentials-grant
   */
  async getClientCredentials(client_id, client_secret, scope) {
    try {
      if (
        (res = await https.get({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/users/@me`),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}&scope=${scope}`,
        }))
      ) {
        return JSON.parse(res.body);
      } else return false;
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * Returns a bearer token object for the authorizing client.
   * 
   * example:
   * ```js
   *   const oauth2 = require('discord-oauth2-zero');
   *   let bearerToken = await oauth2.getToken(client_id, client_secret, oauth2_redirect, code);
   * ```
   * 
   * @param {string} client_id client id from developers portal.
   * @param {string} client_secret client secret from developers portal.
   * @param {string} oauth2_redirect URI encoded url for redirection.
   * @param {string} code string passed to endpoint during authorization attempts.
   * @returns {Promise<object>}
   * {
   *   "access_token": string,
   *   "token_type": "Bearer",
   *   "expires_in": integer(ms),
   *   "refresh_token": string,
   *   "scope": string
   * }
   * 
   * https://discord.com/developers/docs/topics/oauth2#authorization-code-grant
   */
  async getToken(client_id, client_secret, oauth2_redirect, code) {
    try {
      redirect = encodeURIComponent(oauth2_redirect);
      if (
        (oauth_ = await https.post({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/oauth2/token`),
          statusCode: 200,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect}&code=${code}`,
        }))
      ) {
        return JSON.parse(oauth_.body);
      } else return false;
    } catch (e) {
      console.log(e);
    }
  }, //eo getToken

  /**
  * Returns a fresh bearer token object for a previously authorized client.
  * 
  * example:
  * ```js
  *   const oauth2 = require('discord-oauth2-zero');
  *   let refreshToken = await oauth2.refreshToken(client_id, client_secret, refresh_token);
  * ```
  * 
  * @param {string} client_id client id from developers portal.
  * @param {string} client_secret client secret from developers portal.
  * @param {string} refresh_token URI encoded url for redirection.
  * @returns {Promise<object>}
  * {
  *   "access_token": string,
  *   "token_type": "Bearer",
  *   "expires_in": integer(ms),
  *   "refresh_token": string,
  *   "scope": string
  * }
  * 
  * https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-refresh-token-exchange-example
  */
  async refreshToken(client_id, client_secret, refresh_token) {
    try {
      if (
        (oauth_ = await https.post({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/oauth2/token`),
          statusCode: 200,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=refresh_token&client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refresh_token}`,
        }))
      ) {
        return JSON.parse(oauth_.body);
      } else return false;
    } catch (e) {
      console.log(e);
    }
  }, //eo refreshToken

  /**
   * Allows clients to unsubscribe from an authorized service. 
   * 
   * * **(this method is currently untested)** *
   * 
   * example:
   * ```js
   *   const oauth2 = require('discord-oauth2-zero');
   *   let revoked = await oauth2.revokeToken(client_id, client_secret, token);
   * ```
   * 
   * @param {string} client_id client id from developers portal.
   * @param {string} client_secret client secret from developers portal.
   * @param {string} token client access token.
   * 
   * As per RFC 7009: https://www.rfc-editor.org/rfc/rfc7009
  */
  async revokeToken(client_id, client_secret, token) {
    try {
      if (
        (oauth_ = await https.post({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/oauth2/token/revoke`),
          statusCode: 200,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `client_id=${client_id}&client_secret=${client_secret}&token=${token}`,
        }))
      ) {
        return JSON.parse(oauth_.body);
      } else return false;
    } catch (e) {
      console.log(e);
    }
  }, //eo revokeToken
};