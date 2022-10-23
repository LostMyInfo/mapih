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
export function getCredentials(token: any): Promise<any>;
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
export function getCredentials(token: any): Promise<any>;
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
export function getClientCredentials(client_id: string, client_secret: string, scope: string): Promise<any>;
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
export function getClientCredentials(client_id: string, client_secret: string, scope: string): Promise<any>;
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
export function getToken(client_id: string, client_secret: string, oauth2_redirect: string, code: string): Promise<any>;
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
export function getToken(client_id: string, client_secret: string, oauth2_redirect: string, code: string): Promise<any>;
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
export function refreshToken(client_id: string, client_secret: string, refresh_token: string): Promise<any>;
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
export function refreshToken(client_id: string, client_secret: string, refresh_token: string): Promise<any>;
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
export function revokeToken(client_id: string, client_secret: string, token: string): Promise<any>;
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
export function revokeToken(client_id: string, client_secret: string, token: string): Promise<any>;
//# sourceMappingURL=oauth2.d.ts.map