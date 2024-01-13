/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString, removeFalsyFromObject } = require('../resources/functions');
const { buildTrack, find, buildTrackList } = require('./functions');
const { handler } = require('../resources/handlers');

/**
 * @file All Spotify API endpoints relating to songs
 * @module songs
 */

module.exports = {

  /**
   * @summary
   * ### [Get Track]{@link https://developer.spotify.com/documentation/web-api/reference/get-track}
   * 
   * @example
   * await api.spotify.songs.retrieve('song name');
   * 
   * @function retrieve
   * @memberof module:songs#
   * @param {string} query
   * @returns {Promise<SpotifyTrack>}
   */
  retrieve: async (query) => {

    const track = await find(query, 'tracks');
    
    return buildTrack(await handler({
      method: 'GET',
      endpoint: buildQueryString(`tracks/${track}`, {
        market: 'US'
      }),
      handler: 'spotify'
    }));
  },

  /**
   * @summary
   * ### [Get Several Tracks]{@link https://developer.spotify.com/documentation/web-api/reference/get-several-tracks}
   * 
   * @example
   * await api.spotify.songs.retrieveMany([
   *   'song name',
   *   'song name'
   * ]);
   * 
   * @example
   * await api.spotify.songs.retrieveMany(
   *   [ 'song name', 'song name'],
   *   { sort: 'popularity' }
   * );
   * 
   * @function retrieveMany
   * @memberof module:songs#
   * @param {string[]} query
   * @param {Object} [options]
   * @param {string} [options.sort]
   * @param {string[]} [songs]
   * @param {string[]} [unknowns]
   * @returns {Promise<{total: number, found: number, message?: string, tracks: SpotifyTrack[] | undefined}>}
   */
  retrieveMany: async (query, options, songs = [], unknowns = []) => {

    for (const song of query) {
      const id = await find(song, 'tracks');
      id ? songs.push(id) : unknowns.push(song);
    }

    const tracks = buildTrackList(await handler({
      method: 'GET',
      endpoint: buildQueryString('tracks', {
        ids: songs.join(','),
        market: 'US'
      }),
      handler: 'spotify'
    }), options?.sort);

    return removeFalsyFromObject({
      total: query.length,
      found: tracks?.length ?? 0,
      message: unknowns.length
        ? `Song${unknowns.length > 1 ? 's' : ''} not found: ${unknowns.join(', ')}`
        : undefined,
      tracks
    });
  },

  /**
   * @summary
   * ### [Get Recommendations]{@link https://developer.spotify.com/documentation/web-api/reference/get-recommendations}
   * Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks.  
   * If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.  
   * For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.  
   * 
   * @example
   * await api.spotify.playlists.recommendations(
   *   artists: ['artist name', 'another name'],
   *   songs: ['song name'],
   *   limit: 5,
   *   min_duration_ms: 5000
   * );
   * 
   * @function recommendations
   * @memberof module:songs#
   * @param {Object} options
   * @param {string[]} [options.artists] - An array of Spotify IDs for seed artists
   * @param {string[]} [options.genres] - An array of any genres in the set of [available genre seeds]{@link https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres}
   * @param {string[]} [options.songs] - An array of Spotify IDs for a seed track
   * @param {number} [options.limit]
   * @param {number} [options.min_acousticness]
   * @param {number} [options.max_acousticness]
   * @param {number} [options.target_acousticness]
   * @param {number} [options.min_danceability]
   * @param {number} [options.max_danceability]
   * @param {number} [options.target_danceability]
   * @param {number} [options.min_duration_ms]
   * @param {number} [options.max_duration_ms]
   * @param {number} [options.target_duration_ms]
   * @param {number} [options.min_energy]
   * @param {number} [options.max_energy]
   * @param {number} [options.target_energy]
   * @param {number} [options.min_instrumentalness]
   * @param {number} [options.max_instrumentalness]
   * @param {number} [options.target_instrumentalness]
   * @param {number} [options.min_key]
   * @param {number} [options.max_key]
   * @param {number} [options.target_key]
   * @param {number} [options.min_liveness]
   * @param {number} [options.max_liveness]
   * @param {number} [options.target_liveness]
   * @param {number} [options.min_loudness]
   * @param {number} [options.max_loudness]
   * @param {number} [options.target_loudness]
   * @param {number} [options.min_mode]
   * @param {number} [options.max_mode]
   * @param {number} [options.target_mode]
   * @param {number} [options.min_popularity]
   * @param {number} [options.max_popularity]
   * @param {number} [options.target_popularity]
   * @param {number} [options.min_speechiness]
   * @param {number} [options.max_speechiness]
   * @param {number} [options.target_speechiness]
   * @param {number} [options.min_tempo]
   * @param {number} [options.max_tempo]
   * @param {number} [options.target_tempo]
   * @param {number} [options.min_time_signature]
   * @param {number} [options.max_time_signature]
   * @param {number} [options.target_time_signature]
   * @param {number} [options.min_valence]
   * @param {number} [options.max_valence]
   * @param {number} [options.target_valence]
   * @param {string[]} [artists]
   * @param {string[]} [tracks]
   * @param {string[]} [genres]
   * @returns {Promise<{seeds: SpotifyRecommendationSeed[], tracks: SpotifyTrack[]|undefined}>}
   */
  recommendations: async (options, artists = [], tracks = [], genres = []) => {

    const availableGenres = require('./functions').genres;
    
    /**
     * @param {string[]|undefined} option 
     * @param {'artists'|'tracks'} type 
     * @param {string[]} array 
     */
    const processOptions = async (option, type, array) => {
      if (option)
        for (const item of option) {
          const id = await find(item, type);
          if (id) array.push(id);
        }
    };

    await processOptions(options.artists, 'artists', artists);
    await processOptions(options.songs, 'tracks', tracks);

    if (options.genres) {
      genres.push(...options.genres.filter(genre => availableGenres.includes(genre)));
    }
    
    const result = await handler({
      method: 'GET',
      endpoint: buildQueryString('recommendations', {
        seed_artists: artists.join(',') || undefined,
        seed_tracks: tracks.join(',') || undefined,
        seed_genres: genres.join(',') || undefined,
        ...options
      }),
      handler: 'spotify'
    });

    const seeds = result.seeds.map((/** @type {{href: string, [x: string]: any}} */{ href, ...rest }) => ({ ...rest }));
    
    return {
      seeds,
      tracks: buildTrackList(result)
    };
  },
  
  /**
   * @summary
   * ### [Save Tracks for Current User]{@link https://developer.spotify.com/documentation/web-api/reference/save-tracks-user}
   * 
   * @example
   * await api.spotify.songs.save([
   *   'song name',
   *   'song name'
   * ]);
   * 
   * @function save
   * @memberof module:songs#
   * @param {string[]} ids
   * @param {string[]} [songs]
   * @param {{[x: string]: string}} [mapped]
   * @param {{[x: string]: string}} [saved]
   * @returns {Promise<{total: number, found: number, saved: {[x: string]: string}}>}
   */
  save: async (ids, songs = [], mapped = {}, saved = {}) => {

    for (const song of ids) {
      const id = await find(song, 'tracks');
      if (id) {
        mapped[id] = song;
        songs.push(id);
      } else saved[song] = 'not found';
    }

    await handler({
      method: 'PUT',
      endpoint: buildQueryString('me/tracks', {
        ids: songs.join(',')
      }),
      oauth: true,
      scope: ['user-library-modify'],
      handler: 'spotify'
    });

    songs.forEach((song) => saved[mapped[song]] = 'saved');
    
    return {
      total: ids.length,
      found: songs?.length ?? 0,
      saved
    };
      
  },

  /**
   * @summary
   * ### [Remove User's Saved Tracks]{@link https://developer.spotify.com/documentation/web-api/reference/remove-tracks-user}
   * 
   * @example
   * await api.spotify.songs.unsave([
   *   'song name',
   *   'song name'
   * ]);
   * 
   * @function unsave
   * @memberof module:songs#
   * @param {string[]} ids
   * @param {string[]} [songs]
   * @param {{[x: string]: string}} [mapped]
   * @param {{[x: string]: string}} [saved]
   * @returns {Promise<{total: number, found: number, saved: {[x: string]: string}}>}
   */
  unsave: async (ids, songs = [], mapped = {}, saved = {}) => {

    for (const song of ids) {
      const id = await find(song, 'tracks');
      if (id) {
        mapped[id] = song;
        songs.push(id);
      } else saved[song] = 'not found';
    }

    await handler({
      method: 'DELETE',
      endpoint: buildQueryString('me/tracks', {
        ids: songs.join(',')
      }),
      oauth: true,
      scope: ['user-library-modify'],
      handler: 'spotify'
    });

    songs.forEach((song) => saved[mapped[song]] = 'removed');
    
    return {
      total: ids.length,
      found: songs?.length ?? 0,
      saved
    };
  },

  /**
   * @summary
   * ### [Get Track's Audio Analysis]{@link https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis}
   * Get a low-level audio analysis for a track in the Spotify catalog.   
   * The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.
   * 
   * @example
   * await api.spotify.songs.analyze('song name');
   * 
   * @function analyze
   * @memberof module:songs#
   * @param {string} query
   * @returns {Promise<SpotifyAnalysis>}
   */
  analyze: async (query) => {

    const track = await find(query, 'tracks', true);
    
    return handler({
      method: 'GET',
      endpoint: `audio-analysis/${track}`,
      handler: 'spotify'
    });

  },

  /**
   * @summary
   * ### [Get Track's Audio Features]{@link https://developer.spotify.com/documentation/web-api/reference/get-audio-features}
   * Get audio feature information for a single track.
   * 
   * @example
   * await api.spotify.songs.audioFeatures('song name');
   * 
   * @function audioFeatures
   * @memberof module:songs#
   * @param {string} query
   * @returns {Promise<SpotifyAudioFeatures>}
   */
  audioFeatures: async (query) => {

    const track = await find(query, 'tracks', true);
    
    return handler({
      method: 'GET',
      endpoint: `audio-features/${track}`,
      handler: 'spotify'
    });

  },

  /**
   * @summary
   * ### [Get Several Tracks' Audio Features]{@link https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features}
   * Get audio features for multiple tracks.
   * 
   * @example
   * await api.spotify.songs.audioFeaturesMany([
   *   'song name',
   *   'song name'
   * ]);
   * 
   * @function audioFeaturesMany
   * @memberof module:songs#
   * @param {string[]} query
   * @param {string[]} [songs]
   * @param {string[]} [unknowns]
   * @returns {Promise<{total: number, found: number, message: string|undefined, audio_features: SpotifyAudioFeatures[]}>}
   */
  audioFeaturesMany: async (query, songs = [], unknowns = []) => {
    
    for (const song of query) {
      const id = await find(song, 'tracks');
      id ? songs.push(id) : unknowns.push(song);
    }

    const tracks = await handler({
      method: 'GET',
      endpoint: buildQueryString('audio-features', {
        ids: songs.join(',')
      }),
      handler: 'spotify'
    });

    return {
      total: query.length,
      found: tracks?.length ?? 0,
      message: unknowns.length
        ? `Song${unknowns.length > 1 ? 's' : ''} not found: ${unknowns.join(', ')}`
        : undefined,
      audio_features: tracks.audio_features
    };

  }
};

