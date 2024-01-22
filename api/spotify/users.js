/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { ResponseError } = require('../resources/Errors');
const { buildQueryString, removeFalsyFromObject } = require('../resources/functions');
const { handler } = require('../resources/handlers');
const { buildUser, buildArtists, buildAlbums, buildTrackList, find } = require('./functions');

/**
 * @file All Spotify API endpoints relating to Spotify users
 * @module users
 */

module.exports = {

  /**
   * @summary
   * ### [Get Current User's Profile]{@link https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile}
   * 
   * @example
   * await api.spotify.users.me();
   * 
   * @function me
   * @memberof module:users#
   * @returns {Promise<SpotifyUser|undefined>}
  */
  me: async () =>
    buildUser(await handler({
      method: 'GET',
      endpoint: 'me',
      oauth: true,
      scope: ['user-read-private', 'user-read-email'],
      handler: 'spotify'
    })),

  /**
   * @summary
   * ### [Get User's Top Items]{@link https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks}
   * 
   * @example
   * await api.spotify.users.topItems({ type: 'artists' });
   * 
   * @example
   * await api.spotify.users.topItems({ type: 'tracks' });
   * 
   * @example
   * await api.spotify.users.topItems({
   *   type: 'artists',
   *   limit: 5,
   *   time_range: 'short_term' // 4 weeks
   *   // time_range: 'medium_term' // 6 months
   *   // time_range: 'long_term' // several years
   * });
   * 
   * @function topItems
   * @memberof module:users#
   * @param {Object} options
   * @param {string} options.type - The type of entity to return (`artists` or `tracks`)
   * @param {string} [options.time_range] - Over what time frame the affinities are computed (`long_term` - several years, `medium_term` - 6 months, `short_term` - 4 weeks) (default `medium_term`)
   * @param {number} [options.limit] - The maximum number of items to return (default 20)
   * @param {number} [options.offset] - The index of the first item to return (default 0)
   * @param {string} [options.sort]
   * @returns {Promise<SpotifyReturn>}
   */
  topItems: async (options) => {
    const items = await handler({
      method: 'GET',
      endpoint: buildQueryString(`me/top/${options.type}`, {
        limit: options?.limit ?? 20,
        offset: options?.offset ?? 0,
        time_range: options?.time_range ?? 'medium_term'
      }),
      oauth: true,
      scope: ['user-top-read'],
      handler: 'spotify'
    });

    return removeFalsyFromObject({
      total: items.total,
      limit: items.limit,
      offset: items.offset !== 0 ? items.offset : undefined,
      [options.type]: options.type === 'tracks'
        ? buildTrackList(items, options?.sort)
        : buildArtists(items, options?.sort)
    });
  },
  
  /**
   * @summary
   * ### [Get User's Profile]{@link https://developer.spotify.com/documentation/web-api/reference/get-users-profile}
   * 
   * @example
   * await api.spotify.users.getProfile('zrrymvp05x6qim765b874e408');
   * 
   * @function getProfile
   * @memberof module:users#
   * @param {string} user_id 
   * @returns {Promise<SpotifyUser|undefined>}
   */
  getProfile: async (user_id) => {

    let user;
    try {
      user = buildUser(await handler({
        method: 'GET',
        endpoint: `users/${user_id}`,
        handler: 'spotify'
      }));
    } catch (/** @type {any} */ error) {
      if (error.status === 500)
        throw new ResponseError(null, null, 'spotify_error', { error: 'User not found' });
    }
    return user;
  }

};

