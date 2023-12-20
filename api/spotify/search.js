/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { spotifyHandler, buildQueryString, buildSpotifyResponse } = require('../resources/functions');

/**
 * @file Search for items on Spotify
 * @module search
 */

module.exports = {

  /**
   * @example
   * await api.spotify.search({
   *   song: 'song name'
   * })
   * @example
   * await api.spotify.search({
   *    artist: 'artist name'
   * })
   * @example
   * await api.spotify.search({
   *   song: 'song name',
   *   artist: 'artist name',
   *   limit: 5,
   *   sort: 'popularity'
   * })
   * @param {Object} options
   * @param {string} [options.artist]
   * @param {string} [options.song]
   * @param {string} [options.album]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {string} [options.sort]
   * @returns {Promise<SpotifyReturn>}
  */
  async search(options) {
    
    const { song, artist, album, limit, offset } = options;
  
    let type = song ? 'track' : artist ? 'artist' : album ? 'album' : 'track';
    const q = song || artist || album;
  
    const endpoint = {
      q,
      type,
      limit,
      offset
    };

    if (type === 'track' && (artist || album))
      // @ts-ignore
      endpoint[artist ? 'artist' : 'album'] = artist || album;

    const attempt = await spotifyHandler({
      method: 'GET',
      endpoint: buildQueryString('search', endpoint)
    });
    
    type = type === 'artist' ? 'artists' : type === 'track' ? 'tracks' : 'album';
    return buildSpotifyResponse(type, attempt, options.sort);
    
  },
  /**
   * 
   * @param {Object} options
   * @param {string} options.artist
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {string} [options.sort]
   * @returns
   */
  async artists(options) {
    const endpoint = buildQueryString('search', {
      type: 'artist',
      q: options.artist,
      limit: options.limit,
      offset: options.offset
    });
    
    const attempt = await spotifyHandler({
      method: 'GET',
      endpoint
    });
    
    return buildSpotifyResponse('artists', attempt, options.sort);
  },

  /**
   * 
   * @param {Object} options
   * @param {string} options.song
   * @param {string} [options.artist]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {string} [options.sort]
   * @returns 
   */
  async songs(options) {
    const endpoint = buildQueryString('search', {
      q: options.song,
      artist: options.artist,
      type: 'track',
      limit: options.limit,
      offset: options.offset
    });
    
    const attempt = await spotifyHandler({
      method: 'GET',
      endpoint
    });
    return buildSpotifyResponse('tracks', attempt, options.sort);
  }
};