/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString } = require('../resources/functions');
const { buildImages, fieldsToString, playlistsStruct, buildPlaylists, buildTrackList } = require('./functions');
const { handler } = require('../resources/handlers');
const { ResponseError } = require('../resources/Errors');

/**
 * @file All Spotify API endpoints relating to playlists
 * @module playlists
 */

module.exports = {

  /**
   * @summary
   * ### [Get a list of Spotify featured playlists]{@link https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists}
   * 
   * @example
   * await api.spotify.playlists.featured();
   * 
   * @example
   * await api.spotify.playlists.featured({
   *   limit: 5
   * });
   * 
   * @function featured
   * @memberof module:playlists#
   * @param {Object} [options]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {string} [options.country]
   * @returns {Promise<SpotifyPlaylistReturn>}
   */
  featured: async (options) =>
    playlistsStruct(await handler({
      method: 'GET',
      endpoint: buildQueryString('browse/featured-playlists', {
        limit: options?.limit ?? 20,
        offset: options?.offset ?? 0,
        country: options?.country ?? 'US'
      }),
      handler: 'spotify'
    })),
  
  /**
   * 
   * @summary
   * ### [Get Category's Playlists]{@link https://developer.spotify.com/documentation/web-api/reference/get-a-categories-playlists}
   * 
   * @example
   * await api.spotify.playlists.categories('party');
   * 
   * @example
   * await api.spotify.playlists.categories('party', {
   *   limit: 5
   * });
   * 
   * @function category
   * @memberof module:playlists#
   * @param {string} category_id 
   * @param {Object} [options]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {number} [options.country]
   * @returns {Promise<SpotifyPlaylistReturn>}
   */
  category: async (category_id, options) => {
    let category;
    try {
      category = playlistsStruct(await handler({
        method: 'GET',
        endpoint: buildQueryString(`browse/categories/${category_id}/playlists`, {
          limit: options?.limit ?? 20,
          offset: options?.offset ?? 0,
          country: options?.country ?? 'US'
        }),
        handler: 'spotify'
      }));
      return category;

    } catch (/** @type {any} */ error) {
      if (error.message === 'Specified id doesn\'t exist')
        throw new ResponseError(null, null, 'spotify_error', `Category doesn\'t exist: \`${category_id}\``);
      else throw error;
    }
  },
    
  /**
   * @summary
   * ### [Create Playlist]{@link https://developer.spotify.com/documentation/web-api/reference/create-playlist}
   * Create a playlist for a Spotify user. (The playlist will be empty until you add tracks.) Each user is generally limited to a maximum of 11000 playlists.
   * 
   * @example
   * await api.spotify.playlists.create({
   *   name: 'my new playlist',
   *   public: false
   * });
   *
   * @function create
   * @memberof module:playlists#
   * @param {Object} options
   * @param {string} options.user_id
   * @param {string} options.name - The name for the new playlist. This name does not need to be unique; a user may have several playlists with the same name.
   * @param {string} [options.description] - Value for playlist description as displayed in Spotify Clients and in the Web API.
   * @param {boolean} [options.public] - Whether playlist will be public (default true)
   * @param {boolean} [options.collaborative] - Whether the playlist will be collaborative. To create a collaborative playlist you must also set `public` to `false`.
   * @returns {Promise<?SpotifyPlaylist>}
   */
  create: async (options) =>
    buildPlaylists(await handler({
      method: 'POST',
      endpoint: `users/${options.user_id}/playlists`,
      body: {
        name: options.name,
        description: options.description ?? undefined,
        public: options.public || true,
        collaborative: options.collaborative || false
      },
      oauth: true,
      scope: ['playlist-modify-public', 'playlist-modify-private'],
      handler: 'spotify'
    })),
  
  /**
   * @summary
   * ### [Add Items to Playlist]{@link https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist}
   * Add one or more items to a user's playlist.
   * 
   * @example
   * await api.spotify.playlists.addTracks({
   *   playlist_id: '3cEYpjA9oz9GiPac4AsH4n',
   *   uris: [
   *     '4iV5W9uYEdYUVa79Axb7Rh',
   *     '1301WleyT98MSxVHPZCA6M,
   *   ]
   * });
   *
   * @function addTracks
   * @memberof module:playlists#
   * @param {Object} options
   * @param {string} options.playlist_id
   * @param {string[]} [options.uris] - An array of Spotify track IDs
   * @param {number} [options.position] - The position to insert the items, a zero-based index. If omitted, the items will be appended to the playlist.
   * @returns {Promise<{snapshot_id: string}>}
   */
  addTracks: async (options) =>
    handler({
      method: 'PUT',
      endpoint: `playlists/${options.playlist_id}/tracks?uris=${options.uris?.map((uri) => `spotify:track:${uri}`).join(',')}`,
      body: { position: options.position },
      oauth: true,
      scope: ['playlist-modify-public', 'playlist-modify-private'],
      handler: 'spotify'
    }),
  
  /**
   * @summary
   * ### [Change Playlist Details]{@link https://developer.spotify.com/documentation/web-api/reference/change-playlist-details}
   * Change a playlist's name and public/private state
   * 
   * @example
   * await api.spotify.playlists.update({
   *   name: 'my new playlist',
   *   public: false
   * });
   *
   * @function update
   * @memberof module:playlists#
   * @param {Object} options
   * @param {string} options.playlist_id
   * @param {string} [options.name] - The name for the new playlist. This name does not need to be unique; a user may have several playlists with the same name.
   * @param {string} [options.description] - Value for playlist description as displayed in Spotify Clients and in the Web API.
   * @param {boolean} [options.public] - Whether playlist will be public (default true)
   * @param {boolean} [options.collaborative] - Whether the playlist will be collaborative. To create a collaborative playlist you must also set `public` to `false`.
   * @returns {Promise<{body: { playlist_id: string, name?: string, description?: string, public?: boolean, collaborative?: boolean }, message: string, status: number, type: string}>}
   */
  update: async (options) =>
    handler({
      method: 'PUT',
      endpoint: `playlists/${options.playlist_id}`,
      body: {
        name: options.name ?? undefined,
        description: options.description ?? undefined,
        public: options.public || true,
        collaborative: options.collaborative || false
      },
      oauth: true,
      scope: ['playlist-modify-public', 'playlist-modify-private'],
      message: 'Playlist updated',
      payload: options,
      handler: 'spotify'
    }),
  
  /**
   * @summary
   * ### [Update Playlist Items]{@link https://developer.spotify.com/documentation/web-api/reference/reorder-or-replace-playlists-tracks}
   * Either reorder or replace items in a playlist depending on the request's parameters.  
   * - To reorder items, include range_start, insert_before, range_length and snapshot_id in the request's body.
   * - To replace items, include uris as either a query parameter or in the request's body.
   *   - Replacing items in a playlist will overwrite its existing items.  
   * 
   * Note: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters. These operations can't be applied together in a single request.
   * 
   * @example
   * await api.spotify.playlists.updateTracks({
   *   playlist_id: '3cEYpjA9oz9GiPac4AsH4n',
   *   uris: [
   *     '4iV5W9uYEdYUVa79Axb7Rh',
   *     '1301WleyT98MSxVHPZCA6M,
   *   ]
   * });
   *
   * @function updateTracks
   * @memberof module:playlists#
   * @param {Object} options
   * @param {string} options.playlist_id
   * @param {string[]} [options.uris] - An array of Spotify track IDs
   * @param {number} [options.range_start] - The position of the first item to be reordered
   * @param {number} [options.range_length] - The amount of items to be reordered. Defaults to 1 if not set. The range of items to be reordered begins from the `range_start` position, and includes the `range_length` subsequent items. Examples: To move the items at index 9-10 to the start of the playlist, `range_start` is set to 9, and `range_length` is set to 2.
   * @param {number} [options.insert_before] - The position where the items should be inserted. To reorder the items to the end of the playlist, simply set `insert_before` to the position after the last item. To reorder the first item to the last position in a playlist with 10 items, set `range_start` to 0, and `insert_before` to 10. Examples: To reorder the last item in a playlist with 10 items to the start of the playlist, set `range_start` to 9, and `insert_before` to 0.
   * @param {string} [options.snapshot_id] - The playlist's snapshot ID against which you want to make the changes
   * @returns {Promise<{snapshot_id: string}>}
   */
  updateTracks: async (options) =>
    handler({
      method: 'PUT',
      endpoint: `playlists/${options.playlist_id}/tracks?uris=${options.uris?.map((uri) => `spotify:track:${uri}`).join(',')}`,
      body: {
        range_start: options.range_start,
        range_length: options.range_length,
        insert_before: options.insert_before,
        snapshot_id: options.snapshot_id ?? undefined
      },
      oauth: true,
      scope: ['playlist-modify-public', 'playlist-modify-private'],
      handler: 'spotify'
    }),
  
  /**
   * @summary
   * ### [Remove Playlist Items]{@link https://developer.spotify.com/documentation/web-api/reference/remove-tracks-playlist}
   * 
   * @example
   * await api.spotify.playlists.removeTracks({
   *   playlist_id: '3cEYpjA9oz9GiPac4AsH4n',
   *   tracks: [
   *     { uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh' },
   *     { uri: 'spotify:track:1301WleyT98MSxVHPZCA6M' }
   *   ]
   * });
   *
   * @function removeTracks
   * @memberof module:playlists#
   * @param {Object} options
   * @param {string} options.playlist_id - The Spotify ID of the playlist
   * @param {Array<{[uri: string]: string}>} options.tracks - An array of objects containing Spotify URIs of the tracks or episodes to remove. A maximum of 100 objects can be sent at once.
   * @param {string} [options.snapshot_id] - The playlist's snapshot ID against which you want to make the changes
   * @returns {Promise<{snapshot_id: string}>}
   */
  removeTracks: async (options) =>
    handler({
      method: 'DELETE',
      endpoint: `playlists/${options.playlist_id}/tracks`,
      body: {
        tracks: options.tracks,
        description: options.snapshot_id ?? undefined
      },
      oauth: true,
      scope: ['playlist-modify-public', 'playlist-modify-private'],
      handler: 'spotify'
    }),
  
  /**
   * @summary
   * ### [Get Playlist Items]{@link https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks}
   * Get full details of the items of a playlist owned by a Spotify user.
   * 
   * @example
   * await api.spotify.playlists.retrieve({
   *   playlist_id: '3cEYpjA9oz9GiPac4AsH4n',
   *   fields: ['name', 'description']
   * });
   *
   * @example
   * await api.spotify.playlists.retrieve({
   *   playlist_id: '3cEYpjA9oz9GiPac4AsH4n',
   *   fields: { // fields=tracks.items(added_at)
   *     tracks: {
   *       items: ['added_at']
   *     }
   *   }
   * });
   *
   * @example
   * await api.spotify.playlists.retrieve({
   *   playlist_id: '3cEYpjA9oz9GiPac4AsH4n',
   *   fields: { // fields=tracks.items(track(name,href,album(name,href)))
   *     tracks: {
   *       items: [{
   *         track: ['name', 'href', {
   *           album: ['name', 'href']
   *         }]
   *       }]
   *     }
   *   }
   * });
   * 
   * @function retrieveTracks
   * @memberof module:playlists#
   * @param {Object} options
   * @param {string} options.playlist_id
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {Object} [options.fields] - Filters for the query
   * @returns {Promise<SpotifyPlaylist>}
   */
  retrieve: async (options) => {
    const playlist = await handler({
      method: 'GET',
      endpoint: buildQueryString(`playlists/${options.playlist_id}`, {
        fields: fieldsToString(options.fields)
      }),
      oauth: true,
      handler: 'spotify'
    });

    if (options.limit)
      playlist.tracks.items = playlist.tracks.items
        .sort((/** @type {{ added_at: string }} */ a, /** @type {{ added_at: string }} */ b) => new Date(b.added_at).getTime() - new Date(a.added_at).getTime())
        .slice(0, options.limit);
    
    return buildPlaylists(playlist);
  },

  /**
   * @summary
   * ### [Get Current User's Playlists]{@link https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists}
   * 
   * @example
   * await api.spotify.playlists.me();
   * 
   * @example
   * await api.spotify.playlists.me({
   *   limit: 5
   * });
   * 
   * @function me
   * @memberof module:playlists#
   * @param {Object} [options]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @returns {Promise<SpotifyPlaylistReturn>}
   */
  me: async (options) =>
    playlistsStruct(await handler({
      method: 'GET',
      endpoint: buildQueryString('me/playlists', {
        limit: options?.limit ?? 20,
        offset: options?.offset ?? 0
      }),
      oauth: true,
      scope: ['playlist-read-private'],
      handler: 'spotify'
    })),

  /**
   * @summary
   * ### [Get User's Playlists]{@link https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists}
   * 
   * @example
   * await api.spotify.playlists.user('3cEYpjA9oz9GiPac4AsH4n');
   * 
   * @example
   * await api.spotify.playlists.user('3cEYpjA9oz9GiPac4AsH4n', {
   *   limit: 5
   * });
   * 
   * @function user
   * @memberof module:playlists#
   * @param {string} user_id
   * @param {Object} [options]
   * @param {number} [options.limit] - The maximum number (1-50) of items to return (default 20)
   * @param {number} [options.offset] - The index of the first playlist to return (default 0, max 100,000). Use with `limit` to get the next set of playlists.
   * @returns {Promise<SpotifyPlaylistReturn>}
   */
  user: async (user_id, options) =>
    playlistsStruct(await handler({
      method: 'GET',
      endpoint: buildQueryString(`users/${user_id}/playlists`, {
        limit: options?.limit ?? 20,
        offset: options?.offset ?? 0
      }),
      oauth: true,
      scope: ['playlist-read-private', 'playlist-read-collaborative'],
      handler: 'spotify'
    })),

  /**
   * @summary
   * ### [Add Custom Playlist Cover Image]{@link https://developer.spotify.com/documentation/web-api/reference/upload-custom-playlist-cover}
   * Replace the image used to represent a specific playlist
   * 
   * @example
   * await api.spotify.playlists.updateCover('base64 jpeg image data');
   * 
   * @function updateCover
   * @memberof module:playlists#
   * @param {string} playlist_id
   * @param {string} image
   * @returns {Promise<SpotifyImages|undefined>}
   */
  updateCover: async (playlist_id, image) =>
    buildImages('images', await handler({
      method: 'PUT',
      endpoint: `playlists/${playlist_id}/images`,
      body: image,
      handler: 'spotify'
    })),
  
  /**
   * @summary
   * ### [Get Playlist Cover Image]{@link https://developer.spotify.com/documentation/web-api/reference/get-playlist-cover}
   * 
   * @example
   * await api.spotify.playlists.cover('3cEYpjA9oz9GiPac4AsH4n');
   * 
   * @function cover
   * @memberof module:playlists#
   * @param {string} playlist_id
   * @returns {Promise<SpotifyImages|undefined>}
   */
  cover: async (playlist_id) =>
    buildImages('images', await handler({
      method: 'GET',
      endpoint: `playlists/${playlist_id}/images`,
      handler: 'spotify'
    }))
};