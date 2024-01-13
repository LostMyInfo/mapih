/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString, removeFalsyFromObject } = require('../resources/functions');
const { handler } = require('../resources/handlers');
const { buildTrackList, buildAlbums, buildArtists, find } = require('./functions');

/**
 * @file All Spotify API endpoints relating to artists
 * @module artists
 */

module.exports = {
  
  /**
   * @summary
   * ### [Get Artist]{@link https://developer.spotify.com/documentation/web-api/reference/get-an-artist}
   * Get Spotify catalog information about an artist's top tracks by country
   * 
   * @example
   * await api.spotify.artists.topTracks('spice girls', { limit: 3 });
   * 
   * @example
   * await api.spotify.artists.retrieve('artist name');
   * 
   * @function retrieve
   * @memberof module:artists#
   * @param {string} query - Artist ID or name
   * @returns {Promise<SpotifyArtist>}
   */
  retrieve: async (query) => {
    const id = await find(query, 'artists', true);
    const top = await handler({
      method: 'GET',
      endpoint: `artists/${id}`,
      handler: 'spotify'
    });

    return buildArtists(top)[0];
  },

  /**
   * @summary
   * ### [Get Several Artists]{@link https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists}
   * 
   * @example
   * await api.spotify.artists.retrieveMany([
   *   'artist name',
   *   'artist name'
   * ]);
   * 
   * @example
   * await api.spotify.artists.retrieveMany(
   *   [ 'artist name', 'artist name'],
   *   { sort: 'popularity' }
   * );
   * 
   * @function retrieveMany
   * @memberof module:artists#
   * @param {string[]} query
   * @param {Object} [options]
   * @param {string} [options.sort]
   * @param {string[]} [artists]
   * @param {string[]} [unknowns]
   * @returns {Promise<{total: number, found: number, message?: string, artists: SpotifyArtist[]|undefined}>}
   */
  retrieveMany: async (query, options, artists = [], unknowns = []) => {

    for (const artist of query) {
      const id = await find(artist, 'artists');
      id ? artists.push(id) : unknowns.push(artist);
    }

    const items = buildArtists(await handler({
      method: 'GET',
      endpoint: buildQueryString('artists', {
        ids: artists.join(','),
        market: 'US'
      }),
      handler: 'spotify'
    }), options?.sort);

    return removeFalsyFromObject({
      total: query.length,
      found: items?.length ?? 0,
      message: unknowns.length
        ? `Artist${unknowns.length > 1 ? 's' : ''} not found: ${unknowns.join(', ')}`
        : undefined,
      artists: items
    });
  },

  /**
   * @summary
   * ### [Get Artist's Top Tracks]{@link https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks}
   * Get Spotify catalog information about an artist's top tracks by country
   * 
   * @example
   * await api.spotify.artists.topTracks('spice girls', { limit: 3 });
   * 
   * @example
   * await api.spotify.artists.topTracks('123456789');
   * 
   * @function topTracks
   * @memberof module:artists#
   * @param {string} query - Artist ID or name
   * @param {Object} options
   * @param {number|undefined} [options.limit]
   * @param {string} [options.market]
   * @returns {Promise<SpotifyTrack[]|undefined>}
   */
  topTracks: async (query, { market = 'US', limit = undefined }) => {
    const id = await find(query, 'artists', true);
    const top = await handler({
      method: 'GET',
      endpoint: `artists/${id}/top-tracks?market=${market}`,
      handler: 'spotify'
    });

    if (top && limit && !isNaN(limit) && limit < top.tracks?.length)
      top.tracks = top.tracks.sort((/** @type {{ popularity: number; }} */ a, /** @type {{ popularity: number; }} */ b) => b.popularity - a.popularity).slice(0, limit);
    
    return buildTrackList(top);
  },

  /**
   * @summary
   * ### [Get Spotify catalog information about an artist's albums]{@link https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums}
   * 
   * @example
   * await api.spotify.artists.albums('spice girls', { limit: 3 });
   * 
   * @example
   * await api.spotify.artists.albums('123456789');
   * 
   * @function albums
   * @memberof module:artists#
   * @param {string} query - Artist ID or name
   * @param {Object} [options]
   * @param {Array<string>} [options.include_groups] - An array of keywords that will be used to filter the response.  
   * If not supplied, all album types will be returned.
   * - Valid values are `album`, `single`, `appears_on`, `compilation`
   * - Example: [ 'single, appears_on' ]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {string} [options.market]
   * @returns {Promise<{total: number, limit: number, offset: number, albums: SpotifyAlbum[]|undefined}>}
   */
  albums: async (query, options = {}) => {
    const id = await find(query, 'artists', true);
    const albums = await handler({
      method: 'GET',
      endpoint: buildQueryString(`artists/${id}/albums`, {
        include_groups: options.include_groups?.join(', '),
        limit: options.limit ?? undefined,
        offset: options.offset ?? undefined,
        market: options.market ?? 'US'
      }),
      handler: 'spotify'
    });

    return {
      total: albums.total,
      limit: albums.limit,
      offset: albums.offset,
      albums: buildAlbums(albums)
    };
  },

  /**
   * @summary
   * ### [Get Track]{@link https://developer.spotify.com/documentation/web-api/reference/get-track}
   * 
   * @example
   * await api.spotify.artists.related('artist name');
   * 
   * @function related
   * @memberof module:artists#
   * @param {string} query
   * @param {number} [limit]
   * @returns {Promise<SpotifyArtist[]>}
   */
  related: async (query, limit) => {

    const id = await find(query, 'artists', true);
    
    let artists = (await handler({
      method: 'GET',
      endpoint: `artists/${id}/related-artists`,
      handler: 'spotify'
    }))?.artists;

    // return console.log(artists)
    if (limit && !isNaN(limit))
      artists = artists.slice(0, limit);

    return buildArtists(artists, undefined);
  }
  
};