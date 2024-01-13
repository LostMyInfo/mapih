/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { ResponseError } = require('../resources/Errors');
const { buildQueryString, removeFalsyFromObject } = require('../resources/functions');
const { handler } = require('../resources/handlers');
const { buildUser, buildArtists, buildTrackList, find } = require('./functions');

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
   * await api.spotify.users.topItems('artists');
   * 
   * @example
   * await api.spotify.users.topItems('tracks');
   * 
   * @example
   * await api.spotify.users.topItems('artists', {
   *   limit: 5,
   *   time_range: 'short_term' // 4 weeks
   *   // time_range: 'medium_term' // 6 months
   *   // time_range: 'long_term' // several years
   * });
   * 
   * @function topItems
   * @memberof module:users#
   * @param {string} type - The type of entity to return (`artists` or `tracks`)
   * @param {Object} [options]
   * @param {string} [options.time_range] - Over what time frame the affinities are computed (`long_term` - several years, `medium_term` - 6 months, `short_term` - 4 weeks) (default `medium_term`)
   * @param {number} [options.limit] - The maximum number of items to return (default 20)
   * @param {number} [options.offset] - The index of the first item to return (default 0)
   * @param {string} [options.sort]
   * @returns {Promise<SpotifyReturn>}
   */
  topItems: async (type, options) => {
    const items = await handler({
      method: 'GET',
      endpoint: buildQueryString(`me/top/${type}`, {
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
      [type]: type === 'tracks' ? buildTrackList(items, options?.sort) : buildArtists(items, options?.sort)
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
        // oauth: true,
        // scope: ['user-read-private', 'user-read-email'],
        handler: 'spotify'
      }));
    } catch (/** @type {any} */ error) {
      if (error.status === 500)
        throw new ResponseError(null, null, 'spotify_error', 'User not found');
    }
    return user;
  },

  /**
   * @summary
   * ### [Get User's Saved Tracks]{@link https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks}
   * 
   * @example
   * await api.spotify.users.saved();
   * 
   * @example
   * await api.spotify.users.saved({
   *   sort: 'popularity',
   *   limit: 10
   * });
   * 
   * @function saved
   * @memberof module:users#
   * @param {Object} [options]
   * @param {number} [options.limit] - The maximum number (1-50) of items to return (default 20)
   * @param {string} [options.offset] - The last artist ID retrieved from the previous request
   * @param {string} [options.sort]
   * @returns {Promise<SpotifyReturn>}
   */
  saved: async (options) => {

    const items = await handler({
      method: 'GET',
      endpoint: buildQueryString('me/tracks', {
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
      tracks: buildTrackList(items, options?.sort)
    });
  },

  /**
   * @summary
   * ### [Check User's Saved Tracks]{@link https://developer.spotify.com/documentation/web-api/reference/check-users-saved-tracks}
   * 
   * @example
   * await api.spotify.users.isSaved([
   *   'song name',
   *   'song name'
   * ]);
   * 
   * @function isSaved
   * @memberof module:users#
   * @param {string[]} ids
   * @param {string[]} [songs]
   * @param {{[x: string]: string}} [mapped]
   * @param {{[x: string]: boolean|string}} [saved]
   * @returns {Promise<{total: number, found: number, saved: {[x: string]: string|boolean}}>}
   */
  isSaved: async (ids, songs = [], mapped = {}, saved = {}) => {

    for (const song of ids) {
      const id = await find(song, 'tracks');
      
      if (id) {
        mapped[id] = song;
        songs.push(id);
      } else saved[song] = 'not found';
    }
    
    const items = await handler({
      method: 'GET',
      endpoint: buildQueryString('me/tracks/contains', {
        ids: songs.join(',')
      }),
      oauth: true,
      scope: ['user-library-read'],
      handler: 'spotify'
    });
    
    songs.forEach((song, index) => {
      saved[mapped[song]] = items[index] || false;
      // saved[song in saved ? song : items[index] || false] = items[index] || false;
    });
    
    return {
      total: ids.length,
      found: songs?.length ?? 0,
      saved
    };
  },

  /**
   * @summary
   * ### [Get User's Top Items]{@link https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks}
   * 
   * @example
   * await api.spotify.users.following();
   * 
   * @example
   * await api.spotify.users.following({
   *   sort: 'popularity',
   *   limit: 10
   * });
   * 
   * @function following
   * @memberof module:users#
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
   * await api.spotify.users.isFollowing({
   *   type: 'artist',
   *   ids: [
   *     '2CIMQHirSU0MQqyYHq0eOx',
   *     '57dN52uHvrHOxijzpIgu3E'
   *   ]
   * });
   * 
   * @function isFollowing
   * @memberof module:users#
   * @param {Object} options
   * @param {string} options.type - The type of entity to return (`artists` or `tracks`)
   * @param {string[]} options.ids - An array of the artist/user/playlist IDs to check
   * @returns {Promise<boolean[]>}
   */
  isFollowing: async (options) =>
    handler({
      method: 'GET',
      endpoint: buildQueryString('me/following/contains', {
        type: options.type,
        ids: options.ids.join(',')
      }),
      oauth: true,
      scope: ['user-follow-read'],
      handler: 'spotify'
    }),
  

  /**
   * @summary
   * ### [Check if Users Follow Playlist]{@link https://developer.spotify.com/documentation/web-api/reference/check-if-user-follows-playlist}
   * 
   * @example
   * await api.spotify.users.isFollowingPlaylist({
   *   playlist_id: '3cEYpjA9oz9GiPac4AsH4n',
   *   ids: [
   *     'jmperezperez',
   *     'thelinmichael'
   *   ]
   * });
   * 
   * @function isFollowingPlaylist
   * @memberof module:users#
   * @param {Object} options
   * @param {string} options.playlist_id - The Spotify ID of the playlist
   * @param {string[]} options.ids - An array of the users that you want to check to see if they follow the playlist (max: 5)
   * @returns {Promise<boolean[]>}
   */
  isFollowingPlaylist: async (options) =>
    handler({
      method: 'GET',
      endpoint: buildQueryString(`playlists/${options.playlist_id}/followers/contains`, {
        ids: options.ids.join(',')
      }),
      // oauth: true,
      // scope: ['user-follow-read'],
      handler: 'spotify'
    }),
  
  /**
   * @summary
   * ### [Follow Artists or Users]{@link https://developer.spotify.com/documentation/web-api/reference/follow-artists-users}
   * Add the current user as a follower of one or more artists or other Spotify users
   * 
   * @example
   * await api.spotify.users.follow({
   *   type: 'artist',
   *   id: ['2CIMQHirSU0MQqyYHq0eOx']
   * });
   * 
   * @function follow
   * @memberof module:users#
   * @param {Object} options
   * @param {string} options.type - Either `artist` or `user`
   * @param {string[]} options.ids - An array of user or artist IDs that you want to follow (max: 50)
   * @returns {Promise<boolean[]>}
   */
  follow: async (options) =>
    handler({
      method: 'PUT',
      endpoint: buildQueryString('me/following', {
        ids: options.ids.join(',')
      }),
      oauth: true,
      scope: ['user-follow-modify'],
      handler: 'spotify',
      message: `Successfully followed ${options.type}`
    }),
  
  /**
   * @summary
   * ### [Unfollow Artists or Users]{@link https://developer.spotify.com/documentation/web-api/reference/unfollow-artists-users}
   * Remove the current user as a follower of one or more artists or other Spotify users
   * 
   * @example
   * await api.spotify.users.unFollow({
   *   type: 'artist',
   *   id: ['2CIMQHirSU0MQqyYHq0eOx']
   * });
   * 
   * @function unFollow
   * @memberof module:users#
   * @param {Object} options
   * @param {string} options.type - Either `artist` or `user`
   * @param {string[]} options.ids - An array of user or artist IDs that you want to follow (max: 50)
   * @returns {Promise<boolean[]>}
   */
  unFollow: async (options) =>
    handler({
      method: 'DELETE',
      endpoint: buildQueryString('me/following', {
        ids: options.ids.join(',')
      }),
      oauth: true,
      scope: ['user-follow-modify'],
      handler: 'spotify',
      message: `Successfully unfollowed ${options.type}`
    }),
  
  /**
   * @summary
   * ### [Follow Playlist]{@link https://developer.spotify.com/documentation/web-api/reference/follow-playlist}
   * Add the current user as a follower of a playlist
   * 
   * @example
   * await api.spotify.users.followPlaylist({
   *   playlist_id: '3cEYpjA9oz9GiPac4AsH4n'
   * });
   * 
   * @function followPlaylist
   * @memberof module:users#
   * @param {string} playlist_id
   * @param {boolean} [public]
   * @returns {Promise<{statusText: number, type: string, message: string}>}
   */
  followPlaylist: async (playlist_id, public = true) =>
    handler({
      method: 'PUT',
      endpoint: `playlists/${playlist_id}/followers`,
      body: { public },
      oauth: true,
      scope: ['playlist-modify-public', 'playlist-modify-private'],
      handler: 'spotify',
      message: 'Successfully followed playlist'
    }),
  
  /**
   * @summary
   * ### [Unfollow Playlist]{@link https://developer.spotify.com/documentation/web-api/reference/unfollow-playlist}
   * Remove the current user as a follower of a playlist
   * 
   * @example
   * await api.spotify.users.unFollowPlaylist({
   *   playlist_id: '3cEYpjA9oz9GiPac4AsH4n'
   * });
   * 
   * @function unFollowPlaylist
   * @memberof module:users#
   * @param {string} playlist_id
   * @returns {Promise<{statusText: number, type: string, message: string}>}
   */
  unFollowPlaylist: async (playlist_id) =>
    handler({
      method: 'DELETE',
      endpoint: `playlists/${playlist_id}/followers`,
      oauth: true,
      scope: ['playlist-modify-public', 'playlist-modify-private'],
      handler: 'spotify',
      message: 'Successfully unfollowed playlist'
    })

  
};

