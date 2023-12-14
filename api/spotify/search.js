/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { spotifyHandler } = require('../resources/functions');

module.exports = {

  /**
   * @example
   * await api.spotify.search({
   *   song: 'song name'
   * })
   * @example
   * await api.spotify.search({
   *    artist: 'artist name'
   * })
   * @example
   * await api.spotify.search({
   *   song: 'song name',
   *   artist: 'artist name',
   *   limit: 5,
   *   sort: 'popularity'
   * })
   * @param {Object} options
   * @param {string} [options.artist]
   * @param {string} [options.song]
   * @param {string} [options.album]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {string} [options.sort]
   * @returns {Promise<SpotifyReturn>}
  */
  async search(options) {
    
    const { song, artist, album, limit, offset } = options;
  
    let type = song ? 'track' : artist ? 'artist' : album ? 'album' : 'track';
    const q = song || artist || album;
  
    const endpoint = {
      q,
      type,
      limit,
      offset
    };

    if (type === 'track' && (artist || album))
      // @ts-ignore
      endpoint[artist ? 'artist' : 'album'] = artist || album;

    const attempt = await spotifyHandler({
      method: 'GET',
      endpoint: buildQueryString('search', endpoint)
    });

    // console.log('keys:', Object.keys(attempt));
    // console.log(JSON.stringify(attempt, null, 2));
    type = type === 'artist' ? 'artists' : type === 'track' ? 'tracks' : 'album';
    return buildSpotifyResponse(type, attempt, options.sort);
    
  },
  /**
   * 
   * @param {Object} options
   * @param {string} options.artist
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {string} [options.sort]
   * @returns {Promise<SpotifySearchArtistReturn>}
   */
  async artists(options) {
    const endpoint = buildQueryString('search', {
      type: 'artist',
      q: options.artist,
      limit: options.limit,
      offset: options.offset
    });
    // console.log('endpoint:', endpoint);
    const attempt = await spotifyHandler({
      method: 'GET',
      endpoint
    });
    
    return buildSpotifyResponse('artists', attempt, options.sort);
  },

  /**
   * 
   * @param {Object} options
   * @param {string} options.song
   * @param {string} [options.artist]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {string} [options.sort]
   * @returns 
   */
  async songs(options) {
    const endpoint = buildQueryString('search', {
      q: options.song,
      artist: options.artist,
      type: 'track',
      limit: options.limit,
      offset: options.offset
    });
    // console.log('endpoint:', endpoint);
    const attempt = await spotifyHandler({
      method: 'GET',
      // endpoint: 'search?q=satellites&artist=kevin%2520gates&type=track&limit=1&market=US'
      endpoint: 'search?q=doxy&artist=miles%20Davis&type=track'
    });
    // console.log(JSON.stringify(attempt, null, 2));
    return buildSpotifyResponse('tracks', attempt, options.sort);
  }
};

/**
 * 
 * @param {string} url 
 * @param {*} params 
 * @param {boolean} colon 
 * @returns {string}
 */
function buildQueryString(url, params, colon = false) {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      /*
      if (colon && key !== 'q') {
        key = `${key}:`
      }
      */
      queryParams.append(key, encodeURIComponent(value));
    }
  });
  let queryString = queryParams.toString();
  if (colon) 
    queryString = queryString.replace(/&/g, '%2520').replace(/(?<!q)=/g, '%3A');
  // console.log('query:', queryString);
  // if (colon) queryString = queryString.replace(/&/g, '%2520').replace(/(?<!q)=/g, '');
  // console.log('final:', `${url}?${queryString}`);
  return queryString ? `${url}?${queryString}` : url;
}

/**
 * 
 * @param {string} object 
 * @param {*} payload 
 * @param {string} [sort] 
 * @returns {SpotifyReturn}
 */
function buildSpotifyResponse(object, payload, sort) {
  /**
   * @type {SpotifyReturn}
   */
  const spotifyObject = {
    total: payload[object].total,
    limit: payload[object].limit,
    [object]: []
  };

  for (const item of payload[object].items) {
    // return console.log(JSON.stringify(item, null, 2))
    /**
     * @param {*} object 
     * @returns {SpotifyImages|undefined}
     */
    const buildImages = (object) => {
      const path = object === 'album'
        ? item.album?.images
        : item.images;
      const images = {
        large: (path?.find((/** @type {{ height: number; }} */ x) => x.height === 640))?.url,
        medium: (path?.find((/** @type {{ height: number; }} */ x) => x.height === 320 || x.height === 300))?.url,
        small: (path?.find((/** @type {{ height: number; }} */ x) => x.height === 160))?.url
      };
      if (images.large || images.medium || images.small)
        return images;
    };

    const album = item.album ? {
      name: item.album?.name,
      type: item.album?.album_type,
      tracks: item.album?.total_tracks,
      is_playable: item.album?.is_playable,
      release_date: item.album?.release_date,
      spotify_url: item.album?.external_urls?.spotify,
      images: buildImages('album') ? buildImages('album') : undefined
    } : undefined;

    spotifyObject[object].push({
      name: item.name,
      id: item.id,
      explicit: item.explicit,
      duration_seconds: Math.floor(item.duration_ms / 1000),
      popularity: item.popularity,
      followers: item.followers?.total,
      genres: item.genres,
      images: buildImages('tracks') ? buildImages('tracks') : undefined,
      spotify_url: item.external_urls?.spotify,
      preview_url: item.preview_url,
      uri: item.uri,
      album
    });
  }
  
  spotifyObject[object] = removeFalsyFromArray(spotifyObject[object]);

  if (sort)
    spotifyObject[object].sort((/** @type {{ [x: string]: number; }} */ a, /** @type {{ [x: string]: number; }} */ b) => {
      return b[sort] - a[sort];
    });
  
  return spotifyObject;
  
}

/**
 * 
 * @param {Array<*>} arr 
 * @returns 
 */
const removeFalsyFromArray = (arr) => {
  return arr.map(obj => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined && v !== false && v !== 0 && v !== '' && !Number.isNaN(v))
    );
  }).filter(obj => Object.keys(obj).length > 0);
};