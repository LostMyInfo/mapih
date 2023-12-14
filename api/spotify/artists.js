/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { spotifyHandler } = require('../resources/functions');

module.exports = {

  async top_tracks(id) {
    const top = await spotifyHandler({
      method: 'GET',
      endpoint: `artists/${id}/top-tracks?market=US`
    });

    // console.log(top);
    return buildSpotifyResponse('tracks:top', top);
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
    if (value !== undefined)
      queryParams.append(key, encodeURIComponent(value));
  });
  let queryString = queryParams.toString();
  if (colon) 
    queryString = queryString.replace(/&/g, '%2520').replace(/(?<!q)=/g, '%3A');
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
  const prop = object.split(':')[0];
  /**
   * @type {SpotifyReturn}
   */
  const spotifyObject = {
    total: payload[prop].total,
    limit: payload[prop].limit,
    [prop]: []
  };
  const items = object === 'tracks:top' ? payload['tracks'] : payload[prop].items;
  for (const item of items) {
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

    spotifyObject[prop].push({
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
  
  spotifyObject[prop] = removeFalsyFromArray(spotifyObject[prop]);

  if (sort)
    spotifyObject[prop].sort((/** @type {{ [x: string]: number; }} */ a, /** @type {{ [x: string]: number; }} */ b) => {
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