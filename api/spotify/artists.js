/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { spotifyHandler, buildSpotifyResponse, buildQueryString } = require('../resources/functions');
const { search } = require('./search');

/**
 * @file All Spotify API endpoints relating to artists
 * @module artists
 */

module.exports = {
  
  /**
   * @summary
   * ### [Get Artist's Top Tracks]{@link https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks}
   * Get Spotify catalog information about an artist's top tracks by country
   * @example
   * await api.spotify.artists.top_tracks('spice girls', { limit: 3 });
   * @example
   * await api.spotify.artists.top_tracks('123456789');
   * @function top_tracks
   * @memberof module:artists#
   * @param {string} query - Artist ID or name
   * @param {Object} options
   * @param {number} [options.limit]
   * @param {string} [options.market]
   * @returns {Promise<SpotifyTrack[]>}
   */
  async top_tracks(query, options = {}) {
    const { limit, market } = options;
    
    const id = findArtist(query);
    const top = await spotifyHandler({
      method: 'GET',
      endpoint: `artists/${id}/top-tracks?market=${market ?? 'US'}`
    });

    if (top && limit && !isNaN(limit) && limit < top.tracks?.length)
      top.tracks = top.tracks.sort((/** @type {{ popularity: number; }} */ a, /** @type {{ popularity: number; }} */ b) => b.popularity - a.popularity).slice(0, limit);
    // console.log('LENGTH:', top.tracks[0].artists);
    return buildSpotifyResponse('tracks:top', top);
  },

  /**
   * @summary
   * ### [Get Spotify catalog information about an artist's albums]{@link https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums}
   * @example
   * await api.spotify.artists.albums('spice girls', { limit: 3 });
   * @example
   * await api.spotify.artists.albums('123456789');
   * @function albums
   * @memberof module:artists#
   * @param {string} query - Artist ID or name
   * @param {Object} options
   * @param {Array<string>} [options.include_groups] - An array of keywords that will be used to filter the response.  
   * If not supplied, all album types will be returned.
   * - Valid values are `album`, `single`, `appears_on`, `compilation`
   * - Example: [ 'single, appears_on' ]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {string} [options.market]
   * @returns {Promise<SpotifyAlbum[]>}
   */
  async albums(query, options = {}) {
    const { limit, market, include_groups, offset } = options;
    let groups;
    const id = await findArtist(query);
    console.log('id:', id);
    if (include_groups)
      groups = include_groups.join(', ');
    const endpoint = buildQueryString(`artists/${id}/albums`, {
      include_groups: groups, limit, offset, market
    });

    let albums = await spotifyHandler({
      method: 'GET',
      endpoint
    });

    if (albums && limit && !isNaN(limit) && limit < albums?.length)
      albums = albums.sort((/** @type {{ popularity: number; }} */ a, /** @type {{ popularity: number; }} */ b) => b.popularity - a.popularity).slice(0, limit);
    // console.log('LENGTH:', top.tracks[0].artists);
    return buildSpotifyResponse('artist:albums', albums);
  }
  
};

/**
 * @param {string} query 
 * @returns {Promise<string>}
 */
async function findArtist(query) {
  const [artist] = (await search({
    artist: query
  }))?.artists || [];
  if (!artist.id)
    throw new Error('Artist not found');

  return artist.id;
}