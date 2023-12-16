/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { spotifyHandler, buildSpotifyResponse } = require('../resources/functions');

module.exports = {
  
  /**
   * @summary
   * ### [Get Artist's Top Tracks]{@link https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks}
   * Get Spotify catalog information about an artist's top tracks by country
   * @example
   * await api.spotify.artists.top_tracks('123456789');
   * @function top_tracks
   * @memberof module:artists#
   * @param {string} id
   * @param {Object} options
   * @param {number} [options.limit]
   * @param {string} [options.market]
   * @returns {Promise<SpotifyTrack[]>}
   */
  async top_tracks(id, options = {}) {
    const { limit, market } = options;
    const top = await spotifyHandler({
      method: 'GET',
      endpoint: `artists/${id}/top-tracks?market=${market ?? 'US'}`
    });
    if (top && limit && !isNaN(limit) && limit < top.tracks?.length)
      top.tracks = top.tracks.sort((a, b) => b.popularity - a.popularity).slice(0, limit);
    // console.log('LENGTH:', top.tracks[0].artists);
    return buildSpotifyResponse('tracks:top', top);
  }
  
};

