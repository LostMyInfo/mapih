/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString } = require('../resources/functions');
const { buildTrack, buildTrackList, playbackStruct } = require('./functions');
const { handler } = require('../resources/handlers');

/**
 * @file All Spotify API endpoints relating to player
 * @module playback
 */

module.exports = {

  /**
   * @summary
   * ### [Get Playback State]{@link https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback}
   * @example
   * await api.spotify.playback.state();
   * 
   * @function state
   * @memberof module:playback#
   * @param {Object} [params]
   * @param {string} [params.market] - An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified, only content that is available in that market will be returned.
   * @param {string} [params.additional_types] - A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.
   * @returns {Promise<SpotifyPlayback>}
   */
  state: async (params) => {
    const result = await handler({
      method: 'GET',
      endpoint: buildQueryString('me/player', {
        market: params?.market ?? undefined,
        addition_types: params?.additional_types ?? undefined
      }),
      oauth: true,
      scope: ['user-read-playback-state'],
      message: 'Playback not available or active',
      handler: 'spotify'
    });
    
    if (result.statusCode === 204) return result;
    return playbackStruct(result, 'state');
  },

  /**
   * @summary
   * ### [Get Currently Playing Track]{@link https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track}
   * @example
   * await api.spotify.playback.currentTrack();
   * 
   * @function currentTrack
   * @memberof module:playback#
   * @param {Object} [params]
   * @param {string} [params.market] - An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. If a country code is specified, only content that is available in that market will be returned.
   * @param {string} [params.additional_types] - A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.
   * @returns {Promise<SpotifyTrack>}
   */
  currentTrack: async (params) =>
    playbackStruct(await handler({
      method: 'GET',
      endpoint: buildQueryString('me/player/currently-playing', {
        market: params?.market ?? undefined,
        addition_types: params?.additional_types ?? undefined
      }),
      oauth: true,
      scope: ['user-read-currently-playing'],
      handler: 'spotify'
    }), 'currentTrack'),

  /**
   * @summary
   * ### [Get Available Devices]{@link https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices}
   * @example
   * await api.spotify.playback.devices();
   * 
   * @function devices
   * @memberof module:playback#
   * @returns {Promise<SpotifyDevice[]>}
   */
  devices: async () =>
    (await handler({
      method: 'GET',
      endpoint: 'me/player/devices',
      oauth: true,
      scope: ['user-read-playback-state'],
      handler: 'spotify'
    }))?.devices,

  /**
   * @summary
   * ### [Start/Resume Playback]{@link https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback}
   * Start a new context or resume current playback on the user's active device. This API only works for users who have Spotify Premium.
   * 
   * @example
   * await api.spotify.playback.togglePlayback();
   * 
   * @function togglePlayback
   * @memberof module:playback#
   * @param {Object} [params]
   * @param {string} [params.device_id] - The id of the device this command is targeting. If not supplied, the user's currently active device is the target.
   * @param {string} [params.context_uri] - Spotify URI of the context to play. Valid contexts are albums, artists & playlists. {context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}
   * @param {string[]} [params.uris] - A JSON array of the Spotify track URIs to play
   * @param {number} [params.position_ms]
   * @returns {Promise<{statusText: number, type: string, message: string}>}
   */
  togglePlayback: async (params) =>
    handler({
      method: 'PUT',
      endpoint: params?.device_id ? `me/player/play?device_id=${params.device_id}` : 'me/player/play',
      body: {
        context_uri: params?.context_uri ?? undefined,
        uris: params?.uris ?? undefined,
        position_ms: params?.position_ms ?? undefined
      },
      oauth: true,
      scope: ['user-modify-playback-state'],
      message: 'Started/resumed playback',
      handler: 'spotify'
    }),

  /**
   * @summary
   * ### [Pause Playback]{@link https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback}
   * Pause playback on the user's account. This API only works for users who have Spotify Premium.
   * 
   * @example
   * await api.spotify.playback.pause('abcdefg');
   * 
   * @function pause
   * @memberof module:playback#
   * @param {string} [device_id]
   * @returns {Promise<{statusText: number, type: string, message: string}>}
   */
  pause: async (device_id) =>
    handler({
      method: 'PUT',
      endpoint: device_id ? `me/player/pause?device_id=${device_id}` : 'me/player/pause',
      oauth: true,
      scope: ['user-modify-playback-state'],
      message: 'Playback paused',
      handler: 'spotify'
    }),

  /**
   * @summary
   * ### [Skip To Next]{@link https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track}
   * Skips to next track in the user’s queue. This API only works for users who have Spotify Premium.
   * 
   * @example
   * await api.spotify.playback.skip('abcdefg');
   * 
   * @function skip
   * @memberof module:playback#
   * @param {string} [device_id]
   * @returns {Promise<{statusText: number, type: string, message: string}>}
   */
  skip: async (device_id) =>
    handler({
      method: 'PUT',
      endpoint: device_id ? `me/player/next?device_id=${device_id}` : 'me/player/next',
      oauth: true,
      scope: ['user-modify-playback-state'],
      message: 'Skipped to next track',
      handler: 'spotify'
    }),

  /**
   * @summary
   * ### [Skip To Previous]{@link https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track}
   * Skips to previous track in the user’s queue. This API only works for users who have Spotify Premium.
   * 
   * @example
   * await api.spotify.playback.previous('abcdefg');
   * 
   * @function previous
   * @memberof module:playback#
   * @param {string} [device_id]
   * @returns {Promise<{statusText: number, type: string, message: string}>}
   */
  previous: async (device_id) =>
    handler({
      method: 'PUT',
      endpoint: device_id ? `me/player/previous?device_id=${device_id}` : 'me/player/previous',
      oauth: true,
      scope: ['user-modify-playback-state'],
      message: 'Skipped to previous track',
      handler: 'spotify'
    }),

  /**
   * @summary
   * ### [Skip To Previous]{@link https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track}
   * Seeks to the given position in the user’s currently playing track. This API only works for users who have Spotify Premium.
   * 
   * @example
   * await api.spotify.playback.seek('abcdefg', 25000);
   * 
   * @function seek
   * @memberof module:playback#
   * @param {string} [device_id]
   * @param {number} [position_ms]
   * @returns {Promise<{statusText: number, type: string, message: string}>}
   */
  seek: async (device_id, position_ms) =>
    handler({
      method: 'PUT',
      endpoint: buildQueryString('me/player/seek', {
        device_id, position_ms
      }),
      oauth: true,
      scope: ['user-modify-playback-state'],
      message: `Seeked to ${position_ms}`,
      handler: 'spotify'
    }),

  /**
   * @summary
   * ### [Set Playback Volume]{@link https://developer.spotify.com/documentation/web-api/reference/set-volume-for-users-playback}
   * Set the volume for the user’s current playback device. This API only works for users who have Spotify Premium.
   * 
   * @example
   * await api.spotify.playback.setVolume(100, 'abcdefg');
   * 
   * @function setVolume
   * @memberof module:playback#
   * @param {number} volume_percent
   * @param {string} [device_id]
   * @returns {Promise<{statusText: number, type: string, message: string}>}
   */
  setVolume: async (volume_percent, device_id) =>
    handler({
      method: 'PUT',
      endpoint: buildQueryString('me/player/volume', {
        device_id, volume_percent
      }),
      oauth: true,
      scope: ['user-modify-playback-state'],
      message: `Set volume to ${volume_percent}%`,
      handler: 'spotify'
    }),

  /**
   * @summary
   * ### [Toggle Playback Shuffle]{@link https://developer.spotify.com/documentation/web-api/reference/toggle-shuffle-for-users-playback}
   * Toggle shuffle on or off for user’s playback. This API only works for users who have Spotify Premium.
   * 
   * @example
   * await api.spotify.playback.toggleShuffle(true);
   * 
   * @function toggleShuffle
   * @memberof module:playback#
   * @param {boolean} state
   * @param {string} [device_id]
   * @returns {Promise<{statusText: number, type: string, message: string}>}
   */
  toggleShuffle: async (state, device_id) =>
    handler({
      method: 'PUT',
      endpoint: buildQueryString('me/player/shuffle', {
        device_id, state
      }),
      oauth: true,
      scope: ['user-modify-playback-state'],
      message: `Turned shuffle ${state ? 'on' : 'off'}`,
      handler: 'spotify'
    }),

  /**
   * @summary
   * ### [Set Repeat Mode]{@link https://developer.spotify.com/documentation/web-api/reference/set-repeat-mode-on-users-playback}
   * Set the repeat mode for the user's playback. This API only works for users who have Spotify Premium.
   * 
   * @example
   * await api.spotify.playback.toggleRepeat('track');
   * 
   * @function toggleRepeat
   * @memberof module:playback#
   * @param {boolean} state - `track`, `context` or `off`
   * @param {string} [device_id]
   * @returns {Promise<{statusText: number, type: string, message: string}>}
   */
  toggleRepeat: async (state, device_id) =>
    handler({
      method: 'PUT',
      endpoint: buildQueryString('me/player/repeat', {
        device_id, state
      }),
      oauth: true,
      scope: ['user-modify-playback-state'],
      message: `Turned repeat ${state ? 'on' : 'off'}`,
      handler: 'spotify'
    }),

  /**
   * @summary
   * ### [Get the User's Queue]{@link https://developer.spotify.com/documentation/web-api/reference/get-queue}
   * Get the list of objects that make up the user's queue.
   * @example
   * await api.spotify.playback.getQueue();
   * 
   * @function queue
   * @memberof module:playback#
   * @returns {Promise<{currently_playing: SpotifyTrack, queue: SpotifyTrack[]|undefined}|undefined>}
   */
  queue: async () => {
    const result = await handler({
      method: 'GET',
      endpoint: 'me/player/queue',
      oauth: true,
      scope: ['user-read-playback-state', 'user-read-currently-playing'],
      handler: 'spotify'
    });

    if (!result.currently_playing && !result.queue?.length)
      return undefined;
    return {
      currently_playing: buildTrack(result, 'currently_playing'),
      queue: buildTrackList(result)
    };
    
  },

  /**
   * @summary
   * ### [Get Recently Played Tracks]{@link https://developer.spotify.com/documentation/web-api/reference/get-recently-played}
   * Get tracks from the current user's recently played tracks. Note: Currently doesn't support podcast episodes.
   * @example
   * await api.spotify.playback.recentlyPlayed({
   *   limit: 5
   * });
   * 
   * @function recentlyPlayed
   * @memberof module:playback#
   * @param {Object} [options]
   * @param {number} [options.limit] - The maximum number (1-50) of items to return (default 20)
   * @param {number} [options.after] - A Unix timestamp in milliseconds. Returns all items after (but not including) this cursor position. If after is specified, before must not be specified.
   * @param {number} [options.before] - A Unix timestamp in milliseconds. Returns all items before (but not including) this cursor position. If before is specified, after must not be specified.
   * @returns {Promise<SpotifyTrack[]|undefined>}
   */
  recentlyPlayed: async (options) =>
    buildTrackList(await handler({
      method: 'GET',
      endpoint: buildQueryString('me/player/recently-played', {
        limit: options?.limit ?? 20,
        after: options?.after ?? undefined,
        before: options?.before ?? undefined
      }),
      oauth: true,
      scope: ['user-read-recently-played'],
      handler: 'spotify'
    })),

  /**
   * @summary
   * ### [Add Item to Playback Queue]{@link https://developer.spotify.com/documentation/web-api/reference/add-to-queue}
   * Add an item to the end of the user's current playback queue. This API only works for users who have Spotify Premium.
   * @example
   * await api.spotify.playback.addToQueue({
   *   uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh'
   * });
   * 
   * @function addToQueue
   * @memberof module:playback#
   * @param {Object} options 
   * @param {string} options.uri - The uri of the item to add to the queue. Must be a track or an episode uri.
   * @param {string} [options.device_id]  - The id of the device this command is targeting. If not supplied, the user's currently active device is the target.
   * @returns {Promise<{statusText: number, type: string, message: string}>}
   */
  addToQueue: async (options) =>
    handler({
      method: 'POST',
      endpoint: buildQueryString('me/player/queue', {
        uri: options?.uri,
        device_id: options?.device_id ?? undefined
      }),
      oauth: true,
      scope: ['user-modify-playback-state'],
      message: 'Successfully added to playback queue',
      handler: 'spotify'
    }),

  /**
   * @summary
   * ### [Transfer Playback]{@link https://developer.spotify.com/documentation/web-api/reference/transfer-a-users-playback}
   * Transfer playback to a new device and optionally begin playback. This API only works for users who have Spotify Premium.
   * @example
   * await api.spotify.playback.transfer({
   *   device_id: '74ASZWbe4lXaubB36ztrGX'
   * });
   * 
   * @function transfer
   * @memberof module:playback#
   * @param {Object} options 
   * @param {string} options.device_id - The ID of the device on which playback should be started/transferred
   * @param {boolean} [options.play]  - Whether playback starts on new device or if current state is kept
   * @returns {Promise<{statusText: number, type: string, message: string}>}
   */
  transfer: async (options) =>
    handler({
      method: 'PUT',
      endpoint: 'me/player',
      body: {
        device_ids: [options.device_id],
        play: options.play || true
      },
      oauth: true,
      scope: ['user-modify-playback-state'],
      message: 'Successfully transferred playback',
      handler: 'spotify'
    })
};