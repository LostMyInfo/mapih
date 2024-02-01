/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString, removeFalsyFromObject } = require('../resources/functions');
const { handler } = require('../resources/handlers');
const { buildTrackList, buildAlbums, buildArtists, find } = require('./resources/functions');

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
   * await api.spotify.artists.retrieve({
   *   artist_name: 'artist name to search for'
   * });
   * 
   * @example
   * await api.spotify.artists.retrieve({
   *   artist_id: 'ID of specific artist'
   * });
   * 
   * @function retrieve
   * @memberof module:artists#
   * @param {Object} options
   * @param {string} [options.artist_name]
   * @param {string} [options.artist_id]
   * @returns {Promise<SpotifyArtist>}
   */
  retrieve: async ({ artist_name = undefined, artist_id = undefined }) => {
    const id = artist_name ? await find(artist_name, 'tracks', true) : artist_id;
    const artist = await handler({
      method: 'GET',
      endpoint: `artists/${id}`,
      handler: 'spotify'
    });

    return buildArtists(artist)[0];
  },

  /**
   * @summary
   * ### [Get Several Artists]{@link https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists}
   * 
   * @example
   * await api.spotify.artists.retrieveMany({
   *   artist_names: [
   *     'artist name',
   *     'artist name'
   *   ]
   * });
   * 
   * @example
   * await api.spotify.artists.retrieveMany({
   *   artist_ids: [
   *     'artist id',
   *     'artist id'
   *   ]
   * });
   * 
   * @function retrieveMany
   * @memberof module:artists#
   * @param {Object} options
   * @param {string[]} [options.artist_names]
   * @param {string[]} [options.artist_ids]
   * @param {string} [options.sort]
   * @param {string[]} [artists]
   * @param {string[]} [unknowns]
   * @returns {Promise<{total: number, found: number, message?: string, artists: SpotifyArtist[]|undefined}>}
   */
  retrieveMany: async ({ artist_ids = undefined, artist_names = undefined, sort = undefined }, artists = [], unknowns = []) => {

    // @ts-ignore
    for (const artist of artist_ids ?? artist_names) {
      const id = artist_names ? await find(artist, 'artists') : artist;
      id ? artists.push(id) : unknowns.push(artist);
    }

    const items = buildArtists(await handler({
      method: 'GET',
      endpoint: buildQueryString('artists', {
        ids: artists.join(','),
        market: 'US'
      }),
      handler: 'spotify'
    }), sort);

    return removeFalsyFromObject({
      total: artist_names?.length ?? artist_ids?.length,
      found: items?.length ?? 0,
      message: unknowns.length
        ? `Artist${unknowns.length > 1 ? 's' : ''} not found: ${unknowns.join(', ')}`
        : undefined,
      artists: items
    });
  },

  /**
   * @summary
   * ### [Get Artist's Top Songs]{@link https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks}
   * Get Spotify catalog information about an artist's top songs by country
   * 
   * @example
   * await api.spotify.artists.topSongs({
   *   artist_name: 'artist name',
   *   // artist_id: 'specific ID',
   *   limit: 3
   * });
   * 
   * @function topSongs
   * @memberof module:artists#
   * @param {Object} options
   * @param {string} [options.artist_name]
   * @param {string} [options.artist_id]
   * @param {number|undefined} [options.limit]
   * @param {string} [options.market]
   * @returns {Promise<SpotifyTrack[]|undefined>}
   */
  topSongs: async ({ artist_name = undefined, artist_id = undefined, market = 'US', limit = undefined }) => {
    const id = artist_name ? await find(artist_name, 'artists', true) : artist_id;
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
   * ### [Get Artist's Albums]{@link https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums}
   * 
   * @example
   * await api.spotify.artists.albums({
   *   artist_name: 'artist name to search for'
   * });
   * 
   * @example
   * await api.spotify.artists.albums({
   *   artist_id: 'ID of specific artist'
   * });
   * 
   * @function albums
   * @memberof module:artists#
   * @param {Object} options
   * @param {string} [options.artist_name]
   * @param {string} [options.artist_id]
   * @param {Array<string>} [options.include_groups] - An array of keywords that will be used to filter the response.  
   * If not supplied, all album types will be returned.
   * - Valid values are `album`, `single`, `appears_on`, `compilation`
   * - Example: [ 'single, appears_on' ]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {string} [options.market]
   * @returns {Promise<{total: number, limit: number, offset: number, albums: SpotifyAlbum[]|undefined}>}
   */
  albums: async (options = {}) => {
    const id = options.artist_name ? await find(options.artist_name, 'artists', true) : options.artist_id;
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
   * ### [Get Artist's Related Artists]{@link https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists}
   * 
   * @example
   * await api.spotify.artists.related({
   *   artist_name: 'artist name to search for'
   * });
   * 
   * @example
   * await api.spotify.artists.related({
   *   artist_id: 'ID of specific artist'
   * });
   * 
   * @function related
   * @memberof module:artists#
   * @param {Object} options
   * @param {string} [options.artist_name]
   * @param {string} [options.artist_id]
   * @param {number} [options.limit]
   * @returns {Promise<SpotifyArtist[]>}
   */
  related: async ({ artist_id = undefined, artist_name = undefined, limit = 20 }) => {

    const id = artist_name ? await find(artist_name, 'artists', true) : artist_id;
    
    let artists = (await handler({
      method: 'GET',
      endpoint: `artists/${id}/related-artists`,
      handler: 'spotify'
    }))?.artists;

    // return console.log(artists)
    if (limit && !isNaN(limit))
      artists = artists.slice(0, limit);

    return buildArtists(artists, undefined);
  },

  /**
   * @summary
   * ### [Follow Artists or Users]{@link https://developer.spotify.com/documentation/web-api/reference/follow-artists-users}
   * Add the current user as a follower of one or more artists or other Spotify users
   * 
   * @example
   * await api.spotify.artists.follow({
   *   type: 'artist',
   *   artist_names: ['name 1', 'name 2']
   *   // artist_ids: ['2CIMQHirSU0MQqyYHq0eOx']
   * });
   * 
   * @function follow
   * @memberof module:artists#
   * @param {Object} options
   * @param {string} [options.type] - Either `artist` or `user`
   * @param {string[]} [options.artist_names]
   * @param {string[]} [options.artist_ids]
   * @param {string[]} [artists]
   * @param {{[x: string]: string}} [mapped]
   * @param {{[x: string]: string}} [followed]
   * @returns {Promise<{total: number|undefined, found: number, followed: {[x: string]: string}}>}
   */
  follow: async ({ artist_ids = undefined, artist_names = undefined, type = 'artist' }, artists = [], mapped = {}, followed = {}) => {

    // @ts-ignore
    for (const artist of artist_ids ?? artist_names) {
      const id = artist_names ? await find(artist, 'artists') : artist;
      if (id) {
        mapped[id] = artist;
        artists.push(id);
      } else followed[artist] = 'not found';
    }

    const items = await handler({
      method: 'PUT',
      endpoint: buildQueryString('me/following', {
        type,
        ids: artists.join(',')
      }),
      oauth: true,
      scope: ['user-follow-modify'],
      handler: 'spotify'
      /*
      message: unknowns.length
        ? `Artist${unknowns.length > 1 ? 's' : ''} not found: ${unknowns.join(', ')}`
        : `Successfully followed ${type}`
      */
    });

    /*
    artists.forEach((artist, index) => {
      followed[mapped[artist]] = items[index] ? 'followed' : 'false';
    });
    */

    artists.forEach((artist) => followed[mapped[artist]] = 'followed');

    return {
      total: artist_names?.length ?? artist_ids?.length,
      found: artists?.length ?? 0,
      followed
    };
  },
  
  /**
   * @summary
   * ### [Unfollow Artists or Users]{@link https://developer.spotify.com/documentation/web-api/reference/unfollow-artists-users}
   * Remove the current user as a follower of one or more artists or other Spotify users
   * 
   * @example
   * await api.spotify.artists.unfollow({
   *   type: 'artist',
   *   artist_names: ['name 1', 'name 2']
   *   // artist_ids: ['2CIMQHirSU0MQqyYHq0eOx']
   * });
   * 
   * @function unFollow
   * @memberof module:artists#
   * @param {Object} options
   * @param {string} [options.type] - Either `artist` or `user`
   * @param {string[]} [options.artist_names]
   * @param {string[]} [options.artist_ids]
   * @param {string[]} [artists]
   * @param {{[x: string]: string}} [mapped]
   * @param {{[x: string]: string}} [unfollowed]
   * @returns {Promise<{total: number|undefined, found: number, unfollowed: {[x: string]: string}}>}
   */
  unFollow: async ({ artist_ids = undefined, artist_names = undefined, type = 'artist' }, artists = [], mapped = {}, unfollowed = {}) => {

    // @ts-ignore
    for (const artist of artist_ids ?? artist_names) {
      const id = artist_names ? await find(artist, 'artists') : artist;
      if (id) {
        mapped[id] = artist;
        artists.push(id);
      } else unfollowed[artist] = 'not found';
    }

    await handler({
      method: 'DELETE',
      endpoint: buildQueryString('me/following', {
        type,
        ids: artists.join(',')
      }),
      oauth: true,
      scope: ['user-follow-modify'],
      handler: 'spotify'
      /*
      message: unknowns.length
        ? `Artist${unknowns.length > 1 ? 's' : ''} not found: ${unknowns.join(', ')}`
        : `Successfully followed ${type}`
      */
    });

    artists.forEach((artist) => unfollowed[mapped[artist]] = 'unfollowed');

    return {
      total: artist_names?.length ?? artist_ids?.length,
      found: artists?.length ?? 0,
      unfollowed
    };
  },

  /**
   * @summary
   * ### [Get Followed Artists]{@link https://developer.spotify.com/documentation/web-api/reference/get-followed}
   * 
   * @example
   * await api.spotify.artists.following();
   * 
   * @example
   * await api.spotify.artists.following({
   *   sort: 'popularity',
   *   limit: 10
   * });
   * 
   * @function following
   * @memberof module:artists#
   * @param {Object} [options]
   * @param {number} [options.limit] - The maximum number (1-50) of items to return (default 20)
   * @param {string} [options.after] - The last artist ID retrieved from the previous request
   * @param {string} [options.sort]
   * @returns {Promise<SpotifyReturn>}
   */
  following: async (options) => {

    const items = await handler({
      method: 'GET',
      endpoint: buildQueryString('me/following', {
        type: 'artist',
        limit: options?.limit ?? 20,
        after: options?.after ?? undefined
      }),
      oauth: true,
      scope: ['user-follow-read'],
      handler: 'spotify'
    });

    return removeFalsyFromObject({
      total: items.total,
      limit: items.limit,
      offset: items.offset !== 0 ? items.offset : undefined,
      artists: buildArtists(items, options?.sort)
    });
  },


  /**
   * @summary
   * ### [Check If User Follows Artists or Users]{@link https://developer.spotify.com/documentation/web-api/reference/check-current-user-follows}
   * 
   * @example
   * await api.spotify.artists.isFollowing({
   *   type: 'artist',
   *   artist_names: ['name 1', 'name 2']
   *   // artist_ids: ['2CIMQHirSU0MQqyYHq0eOx']
   * });
   * 
   * @function isFollowing
   * @memberof module:artists#
   * @param {Object} options
   * @param {string} [options.type] - Either `artist` or `user`
   * @param {string[]} [options.artist_names]
   * @param {string[]} [options.artist_ids]
   * @param {string[]} [artists]
   * @param {{[x: string]: string}} [mapped]
   * @param {{[x: string]: string}} [following]
   * @returns {Promise<{total: number|undefined, found: number, following: {[x: string]: string}}>}
   */
  isFollowing: async ({ artist_ids = undefined, artist_names = undefined, type = 'artist' }, artists = [], mapped = {}, following = {}) => {

    // @ts-ignore
    for (const artist of artist_ids ?? artist_names) {
      const id = artist_names ? await find(artist, 'artists') : artist;
      if (id) {
        mapped[id] = artist;
        artists.push(id);
      } else following[artist] = 'not found';
    }

    const items = await handler({
      method: 'GET',
      endpoint: buildQueryString('me/following/contains', {
        type,
        ids: artists.join(',')
      }),
      oauth: true,
      scope: ['user-follow-read'],
      handler: 'spotify'
      /*
      message: unknowns.length
        ? `Artist${unknowns.length > 1 ? 's' : ''} not found: ${unknowns.join(', ')}`
        : `Successfully followed ${type}`
      */
    });

    artists.forEach((artist, index) => {
      following[mapped[artist]] = items[index] ? 'following' : 'false';
    });

    // artists.forEach((artist) => following[mapped[artist]] = 'following');

    return {
      total: artist_names?.length ?? artist_ids?.length,
      found: artists?.length ?? 0,
      following
    };
  }
  
};