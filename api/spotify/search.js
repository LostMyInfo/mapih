/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString, removeFalsyFromObject } = require('../resources/functions');
const { buildTrackList, buildAlbums, buildArtists } = require('./functions');
const { handler } = require('../resources/handlers');

/**
 * @file Search for items on Spotify
 * @module search
 */

module.exports = {

  /**
   * @summary
   * ### [Search for Item (Advanced)]{@link https://developer.spotify.com/documentation/web-api/reference/search}
   * 
   * @example
   * await api.spotify.search.advanced({
   *   song: 'song name',
   *   year: '1992'
   * })
   * 
   * @example
   * await api.spotify.search.advanced({
   *   artist: 'artist name',
   *   include: ['songs', 'artists'],
   *   year: '1992-2002'
   * })
   * 
   * @example
   * await api.spotify.search.advanced({
   *   song: 'song name',
   *   artist: 'artist name',
   *   limit: 5,
   *   sort: 'popularity'
   * })
   * 
   * @function advanced
   * @memberof module:search#
   * @param {Object} options
   * @param {string} [options.song]
   * @param {string} [options.artist]
   * @param {string} [options.album]
   * @param {string[]} [options.include]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {string} [options.sort]
   * @param {string} [options.year]
   * @param {string} [options.genre]
   * @param {string} [options.market]
   * @returns {Promise<SpotifyReturn|undefined>}
  */
  advanced: async (options) => {
    
    const { song, artist, album, include } = options;
  
    const endpoint = `${song || artist || album} ` + ['song', 'artist', 'album', 'year', 'genre']
      // @ts-ignore
      .map((param) => options[param]
        // @ts-ignore
        ? `${param === 'song' ? 'track' : param}:${options[param]}`
        : null
      )
      .filter(Boolean)
      .join(' ');

    // console.log('endpoint:', endpoint);
    // const type = include ? include.join(',').replace('songs', 'track') : endpoint ? 'track' : 'track,artist,album';
    /*
    
    let endpoint = song ?? artist ?? album;
    console.log('endpoint1:', endpoint);

    if (song) endpoint += ` track:${song}`;
    if (artist) endpoint += ` artist:${artist}`;
    if (album) endpoint += ` album:${album}`;
    if (year) endpoint += ` year:${year}`;
    if (genre) endpoint += ` genre:${genre}`;

    const type = include
      ? include.join(',').replace('song', 'track')
      : song ? 'track' : artist ? 'artist' : album ? 'album' : 'track';
    */
    const attempt = await handler({
      method: 'GET',
      endpoint: buildQueryString('search', {
        q: endpoint,
        type: include
          ? include.join(',').replace('songs', 'track').replace('artists', 'artist').replace('albums', 'album')
          : 'track,artist,album', // song ? 'track' : artist ? 'artist' : album ? 'album' : 'track,artist,album';,
        limit: options.limit,
        offset: options.offset,
        market: options.market ?? 'US'
      }),
      handler: 'spotify'
    });
    // return console.log(attempt)
  
    return removeFalsyFromObject({
      total_tracks: attempt.tracks?.total && attempt.tracks?.total !== 0 ? attempt.tracks.total : undefined,
      total_artists: attempt.artists?.total && attempt.artists?.total !== 0 ? attempt.artists.total : undefined,
      total_albums: attempt.albums?.total && attempt.albums?.total !== 0 ? attempt.albums.total : undefined,
      limit: attempt.tracks?.limit ?? attempt.albums?.limit ?? attempt.artists?.limit,
      offset: (attempt.tracks?.offset ?? attempt.albums?.offset ?? attempt.artists?.offset) !== 0 ? attempt.tracks?.offset ?? attempt.albums?.offset ?? attempt.artists?.offset : undefined,
      tracks: attempt.tracks ? buildTrackList(attempt, options.sort) : undefined,
      artists: attempt.artists ? buildArtists(attempt, options.sort) : undefined,
      albums: attempt.albums ? buildAlbums(attempt) : undefined
    });
    // console.log(attempt.tracks?.items[0]);
    // console.log(attempt[`${type}s`].items[0]);
    // type = type === 'artist' ? 'artists' : type === 'track' ? 'tracks' : 'album';
    // @ts-ignore
    // return buildSpotifyResponse(type, attempt, options.sort);
    
  },
  /**
   * @summary
   * ### [Search For Artists]{@link https://developer.spotify.com/documentation/web-api/reference/search}
   * 
   * @example
   * await api.spotify.search.artists('artist name')
   * 
   * @example
   * await api.spotify.search.artists('artist name', {
   *   limit: 5,
   *   sort: 'popularity'
   * })
   * 
   * @function artists
   * @memberof module:search#
   * @param {string} artist
   * @param {Object} [options]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {string} [options.sort]
   * @returns {Promise<SpotifyReturn>}
   */
  artists: async (artist, options) => {
    const artists = await handler({
      method: 'GET',
      endpoint: buildQueryString('search', {
        type: 'artist',
        q: artist,
        limit: options?.limit,
        offset: options?.offset
      }),
      handler: 'spotify'
    });

    return removeFalsyFromObject({
      total: artists.artists.total,
      limit: artists.artists.limit,
      offset: artists.artists.offset !== 0 ? artists.artists.offset : undefined,
      artists: buildArtists(artists, options?.sort)
    });

    /*
    if (options.sort)
      result.artists.sort((a, b) => {
        return b[options.sort] - a[options.sort];
      });
    */
  },

  /**
   * @summary
   * ### [Search for Songs]{@link https://developer.spotify.com/documentation/web-api/reference/search}
   * 
   * @example
   * await api.spotify.search.songs('song name')
   * 
   * @example
   * await api.spotify.search.songs('song name', {
   *   limit: 5,
   *   sort: 'popularity'
   * })
   * 
   * @function songs
   * @memberof module:search#
   * @param {string} song
   * @param {Object} [options]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {string} [options.sort]
   * @returns 
   */
  songs: async (song, options) => {
    const tracks = await handler({
      method: 'GET',
      endpoint: buildQueryString('search', {
        type: 'track',
        q: song,
        limit: options?.limit,
        offset: options?.offset
      }),
      handler: 'spotify'
    });

    return removeFalsyFromObject({
      total: tracks.tracks.total,
      limit: tracks.tracks.limit,
      offset: tracks.tracks.offset !== 0 ? tracks.tracks.offset : undefined,
      songs: buildTrackList(tracks, options?.sort)
    });
  }
  
};