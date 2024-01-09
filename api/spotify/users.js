/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { ResponseError } = require('../resources/Errors');
const { buildQueryString } = require('../resources/functions');
const { https } = require('../utils/https');
const { get } = require('../utils/storage');
const oauth2 = require('./oauth2');

/**
 * @file All Spotify API endpoints relating to Spotify users
 * @module users
 */

module.exports = {

  /**
   * 
   * @returns 
   */
  getMe: async () => {
    const token = await get('spotifyAuth');
    if (token.expires <= Date.now())
      token.access_token = await oauth2.refresh();

    return https({
      method: 'GET',
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + token.access_token }
    });
  },

  /**
   * @param {Object} params
   * @param {string} params.type - The type of entity to return (`artists` or `tracks`)
   * @param {string} [params.time_range] - Over what time frame the affinities are computed (`long_term` - several years, `medium_term` - 6 months, `short_term` - 4 weeks) (default `medium_term`)
   * @param {number} [params.limit] - The maximum number of items to return (default 20)
   * @param {number} [params.offset] - The index of the first item to return (default 0)
   * @returns 
   */
  myTopItems: async (params) => {
    const token = await get('spotifyAuth');
    if (token.expires <= Date.now())
      token.access_token = await oauth2.refresh();

    if (!token.scope?.includes('user-top-read'))
      throw new ResponseError(null, null, 'spotify_error', 'Your app does not have the required scope: `user-top-read`');

    const url = buildQueryString(`https://api.spotify.com/v1/me/top/${params.type}`, {
      limit: params.limit ?? 20,
      offset: params.offset ?? 0,
      time_range: params.time_range ?? 'medium_term'
    });

    const attempt = await https({
      method: 'GET',
      url,
      headers: { 'Authorization': 'Bearer ' + token.access_token }
    });

    // console.log(attempt);
    return attempt;
  },
  
  /**
   * @param {string} user_id 
   * @returns 
   */
  getProfile: async (user_id) => {
    const token = await get('spotifyAuth');
    if (token.expires <= Date.now())
      token.access_token = await oauth2.refresh();

    const user = await https({
      method: 'GET',
      url: `https://api.spotify.com/v1/users/${user_id}`,
      headers: {
        Authorization: 'Bearer ' + token.access_token
      }
    });

    console.log('user in getProfile:\n', user);

    if (!user || user.display_name === 'undefined')
      throw new ResponseError(null, null, 'spotify_error', 'User not found');

    return user;
  },

  /**
   * @param {Object} params
   * @param {string} params.type - The ID type: currently only `artist` is supported
   * @param {number} [params.limit] - The maximum number (1-50) of items to return (default 20)
   * @param {number} [params.after] - The last artist ID retrieved from the previous request
   * @returns 
   */
  myFollowedArtists: async (params) => {
    const token = await get('spotifyAuth');
    if (token.expires <= Date.now())
      token.access_token = await oauth2.refresh();

    if (!token.scope?.includes('user-follow-read'))
      throw new ResponseError(null, null, 'spotify_error', 'Your app does not have the required scope: `user-follow-read`');

    const url = buildQueryString(`https://api.spotify.com/v1/me/following/${params.type}`, {
      limit: params.limit ?? 20,
      after: params.after ?? undefined
    });

    return https({
      method: 'GET',
      url,
      headers: {
        Authorization: 'Bearer ' + token.access_token
      }
    });
  }
};