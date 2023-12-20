/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { spotifyHandler, buildQueryString, buildSpotifyResponse } = require('../resources/functions');

/**
 * @file All Spotify API endpoints relating to playlists
 * @module playlists
 */

module.exports = {

  /**
   * @summary
   * ### [Get a list of Spotify featured playlists]{@link https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists}
   * @example
   * await api.spotify.playlists.featured();
   * @example
   * await api.spotify.playlists.featured({
   *   limit: 5
   * });
   * @function featured
   * @memberof module:playlists#
   * @param {Object} [options]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @returns {Promise<SpotifyAlbum[]>}
   */
  async featured(options) {
    const endpoint = options ? buildQueryString('browse/featured-playlists', {
      limit: options.limit ?? 20,
      offset: options.offset ?? 0,
      country: 'US'
    }) : 'browse/featured-playlists';

    const attempt = await spotifyHandler({
      method: 'GET',
      endpoint
    });
    return attempt;
    // console.log(attempt);
  }
};