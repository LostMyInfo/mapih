/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString, removeFalsyFromObject } = require('../resources/functions');
const { handler } = require('../resources/handlers');
const { buildAlbum, buildAlbums, buildTrackList, find } = require('./functions');

/**
 * @file All Spotify API endpoints relating to albums
 * @module albums
 */

module.exports = {
  
  /**
   * @summary
   * ### [Get Album]{@link https://developer.spotify.com/documentation/web-api/reference/get-an-album}
   * Get Spotify catalog information for a single album
   * 
   * @example
   * await api.spotify.albums.retrieve({
   *   album_name: 'album name to search for'
   * });
   * 
   * @example
   * await api.spotify.albums.retrieve({
   *   album_id: 'ID of specific album'
   * });
   * 
   * @function retrieve
   * @memberof module:albums#
   * @param {Object} options
   * @param {string} [options.album_name]
   * @param {string} [options.album_id]
   * @returns {Promise<SpotifyAlbum | undefined>}
   */
  retrieve: async ({ album_id = undefined, album_name = undefined }) => {
    const id = album_name ? await find(album_name, 'albums', true) : album_id;
    const album = await handler({
      method: 'GET',
      endpoint: `albums/${id}`,
      handler: 'spotify'
    });

    return buildAlbum(album);
  },

  /**
   * @summary
   * ### [Get Several Albums]{@link https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums}
   * 
   * @example
   * await api.spotify.albums.retrieveMany({
   *   album_names: [
   *     'album name',
   *     'album name'
   *   ]
   * });
   * 
   * @example
   * await api.spotify.albums.retrieveMany({
   *   album_ids: [
   *     'album id',
   *     'album id'
   *   ]
   * });
   * 
   * @function retrieveMany
   * @memberof module:albums#
   * @param {Object} options
   * @param {string} [options.album_names]
   * @param {string} [options.album_ids]
   * @param {string} [options.sort]
   * @param {string[]} [albums]
   * @param {string[]} [unknowns]
   * @returns {Promise<{total: number, found: number, message?: string, albums: SpotifyAlbum[]|undefined}>}
   */
  retrieveMany: async ({ album_ids = undefined, album_names = undefined, sort = undefined }, albums = [], unknowns = []) => {

    // @ts-ignore
    for (const album of album_ids ?? album_names) {
      const id = album_names ? await find(album, 'albums') : album;
      id ? albums.push(id) : unknowns.push(album);
    }

    const items = buildAlbums(await handler({
      method: 'GET',
      endpoint: buildQueryString('albums', {
        ids: albums.join(','),
        market: 'US'
      }),
      handler: 'spotify'
    }), sort);

    return removeFalsyFromObject({
      total: album_names?.length ?? album_ids?.length,
      found: items?.length ?? 0,
      message: unknowns.length
        ? `album${unknowns.length > 1 ? 's' : ''} not found: ${unknowns.join(', ')}`
        : undefined,
      albums: items
    });
  },

  /**
   * @summary
   * ### [Get Album Tracks]{@link https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks}
   * 
   * @example
   * await api.spotify.albums.songs({
   *   album_name: 'album name'
   * });
   * 
   * @example
   * await api.spotify.albums.songs({
   *   album_id: ID of specific album
   * });
   * 
   * @function songs
   * @memberof module:albums#
   * @param {Object} options
   * @param {string} [options.album_name]
   * @param {string} [options.album_id]
   * @param {string} [options.sort]
   * @param {number} [options.limit]
   * @param {string[]} [albums]
   * @param {string[]} [unknowns]
   * @returns {Promise<SpotifyTrack[]|undefined>}
   */
  songs: async ({ album_id = undefined, album_name = undefined, sort = undefined, limit = 20 }, albums = [], unknowns = []) => {

    // @ts-ignore
    const id = album_name ? await find(album_name, 'albums', true) : album_id;

    return buildTrackList(await handler({
      method: 'GET',
      endpoint: buildQueryString(`albums/${id}`, {
        limit,
        market: 'US'
      }),
      handler: 'spotify'
    }), sort);

  },

  /**
   * @summary
   * ### [Get New Releases]{@link https://developer.spotify.com/documentation/web-api/reference/get-new-releases}
   * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
   * 
   * @example
   * await api.spotify.albums.new();
   * 
   * @example
   * await api.spotify.albums.new({
   *   limit: 5
   * });
   * 
   * @function new
   * @memberof module:albums#
   * @param {Object} options
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @returns {Promise<SpotifyAlbum[] | undefined>}
   */
  new: async ({ limit = 20, offset = 0 }) =>
    buildAlbums(await handler({
      method: 'GET',
      endpoint: buildQueryString('browse/new-releases', {
        limit,
        offset
      }),
      handler: 'spotify'
    })),
  
  /**
   * @summary
   * ### [Save Albums for Current User]{@link https://developer.spotify.com/documentation/web-api/reference/save-albums-user}
   * 
   * @example
   * await api.spotify.albums.save({
   *   album_names: [
   *     'album name',
   *     'album name'
   *   ]
   * });
   * 
   * @function save
   * @memberof module:albums#
   * @param {Object} options
   * @param {string[]} [options.album_names]
   * @param {string[]} [options.album_ids]
   * @param {string[]} [albums]
   * @param {{[x: string]: string}} [mapped]
   * @param {{[x: string]: string}} [saved]
   * @returns {Promise<{total: number|undefined, found: number, saved: {[x: string]: string}}>}
   */
  save: async ({ album_ids = undefined, album_names = undefined }, albums = [], mapped = {}, saved = {}) => {

    // @ts-ignore
    for (const album of album_ids ?? album_names) {
      const id = album_names ? await find(album, 'albums') : album;
      if (id) {
        mapped[id] = album;
        albums.push(id);
      } else saved[album] = 'not found';
    }

    await handler({
      method: 'PUT',
      endpoint: buildQueryString('me/albums', {
        ids: albums.join(',')
      }),
      oauth: true,
      scope: ['user-library-modify'],
      handler: 'spotify'
    });

    albums.forEach((album) => saved[mapped[album]] = 'saved');
    
    return {
      total: album_names?.length ?? album_ids?.length,
      found: albums?.length ?? 0,
      saved
    };
      
  },

  /**
   * @summary
   * ### [Remove Users' Saved Albums]{@link https://developer.spotify.com/documentation/web-api/reference/remove-albums-user}
   * 
   * @example
   * await api.spotify.albums.unsave({
   *   album_names: [
   *     'album name',
   *     'album name'
   *   ]
   * });
   * 
   * @function unsave
   * @memberof module:albums#
   * @param {Object} options
   * @param {string[]} [options.album_names]
   * @param {string[]} [options.album_ids]
   * @param {string[]} [albums]
   * @param {{[x: string]: string}} [mapped]
   * @param {{[x: string]: string}} [saved]
   * @returns {Promise<{total: number|undefined, found: number, saved: {[x: string]: string}}>}
   */
  unsave: async ({ album_ids = undefined, album_names = undefined }, albums = [], mapped = {}, saved = {}) => {

    // @ts-ignore
    for (const album of album_ids ?? album_names) {
      const id = album_names ? await find(album, 'albums') : album;
      if (id) {
        mapped[id] = album;
        albums.push(id);
      } else saved[album] = 'not found';
    }

    await handler({
      method: 'DELETE',
      endpoint: buildQueryString('me/albums', {
        ids: albums.join(',')
      }),
      oauth: true,
      scope: ['user-library-modify'],
      handler: 'spotify'
    });

    albums.forEach((album) => saved[mapped[album]] = 'removed');
    
    return {
      total: album_names?.length ?? album_ids?.length,
      found: albums?.length ?? 0,
      saved
    };
  },

  /**
   * @summary
   * ### [Get User's Saved Albums]{@link https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums}
   * 
   * @example
   * await api.spotify.albums.saved();
   * 
   * @example
   * await api.spotify.albums.saved({
   *   sort: 'popularity',
   *   limit: 10
   * });
   * 
   * @function saved
   * @memberof module:albums#
   * @param {Object} [options]
   * @param {number} [options.limit] - The maximum number (1-50) of items to return (default 20)
   * @param {string} [options.offset] - The last album ID retrieved from the previous request
   * @param {string} [options.sort]
   * @returns {Promise<SpotifyReturn>}
   */
  saved: async (options) => {

    const items = await handler({
      method: 'GET',
      endpoint: buildQueryString('me/albums', {
        market: 'US',
        limit: options?.limit ?? 20,
        offset: options?.offset ?? 0
      }),
      oauth: true,
      scope: ['user-library-read'],
      handler: 'spotify'
    });

    // console.log('saved tracks', items)
    return removeFalsyFromObject({
      total: items.total,
      limit: items.limit,
      offset: items.offset !== 0 ? items.offset : undefined,
      albums: buildAlbums(items, options?.sort)
    });
  },

  /**
   * @summary
   * ### [Check User's Saved Albums]{@link https://developer.spotify.com/documentation/web-api/reference/check-users-saved-albums}
   * 
   * @example
   * await api.spotify.albums.isSaved({
   *   album_names: [
   *     'album name',
   *     'album name'
   *   ]
   * });
   * 
   * @function isSaved
   * @memberof module:albums#
   * @param {Object} options
   * @param {string[]} [options.album_names]
   * @param {string[]} [options.album_ids]
   * @param {string[]} [albums]
   * @param {{[x: string]: string}} [mapped]
   * @param {{[x: string]: boolean|string}} [saved]
   * @returns {Promise<{total: number|undefined, found: number, saved: {[x: string]: string|boolean}} | undefined>}
   */
  isSaved: async ({ album_ids = undefined, album_names = undefined }, albums = [], mapped = {}, saved = {}) => {

    if (!album_ids && !album_names) return;
    
    // @ts-ignore
    for (const album of album_ids ?? album_names) {
      const id = album_names ? await find(album, 'albums') : album;
      
      if (id) {
        mapped[id] = album;
        albums.push(id);
      } else saved[album] = 'not found';
    }
    
    const items = await handler({
      method: 'GET',
      endpoint: buildQueryString('me/albums/contains', {
        ids: albums.join(',')
      }),
      oauth: true,
      scope: ['user-library-read'],
      handler: 'spotify'
    });
    
    albums.forEach((album, index) => {
      saved[mapped[album]] = items[index] || false;
      // saved[album in saved ? album : items[index] || false] = items[index] || false;
    });
    
    return {
      total: album_names?.length ?? album_ids?.length,
      found: albums?.length ?? 0,
      saved
    };
  }
  
};