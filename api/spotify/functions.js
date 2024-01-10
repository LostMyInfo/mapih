// @ts-check

const { removeFalsyFromArray, removeFalsyFromObject } = require('../resources/functions');

/**
 * @param {any} payload 
 * @param {any} [artists] 
 * @returns {SpotifyArtist[]}
 */
function buildArtists(payload, artists = []) {
  if ((payload.item?.artists && payload.item?.artists.length) || (payload.currently_playing?.artists && payload.currently_playing?.artists.length) || (payload.artists && payload.artists.length)) {
    for (const artist of payload.item?.artists ?? payload.currently_playing?.artists ?? payload.artists)
      artists.push({
        name: artist.name,
        id: artist.id,
        spotify_url: artist.external_urls?.spotify,
        uri: artist.uri
      });
  }
  return removeFalsyFromArray(artists);
}
  
/**
 * @param {any} payload 
 * @returns {SpotifyAlbum|undefined}
 */
function buildAlbum(payload) {
  // console.log(lightOrange('\npayload in buildAlbum'), payload);
  const prop = payload.item?.album ?? payload.currently_playing?.album ?? payload.album ?? payload.track?.album;
  if (!prop) return undefined;

  const result = prop ? {
    name: prop.name,
    id: prop.id,
    type: prop.album_type,
    tracks: prop.total_tracks,
    is_playable: prop.is_playable,
    release_date: prop.release_date,
    spotify_url: prop.external_urls?.spotify,
    uri: prop.uri,
    images: buildImages('null', prop),
    artists: buildArtists(payload)
  } : undefined;

  return removeFalsyFromObject(result);
}

/**
 * @param {any} payload 
 * @param {string} method 
 * @returns
 */
const playbackStruct = (payload, method) => {
  log('playbackStruct', payload);
  log('arist in playbackStruct', payload.item?.artists?.[0]);
  const track = buildTrack(payload, 'item');
  const result = removeFalsyFromObject({
    device: payload.device,
    progress_ms: payload.progress_ms,
    is_playing: payload.is_playing,
    shuffle_state: payload.shuffle_state,
    repeat_state: payload.repeat_state,
    parent_type: payload.context.type,
    parent_spotify_url: payload.context?.external_urls?.spotify,
    parent_uri: payload.context?.uri,
    actions: payload.actions,
    album: buildAlbum(payload),
    artists: buildArtists(payload)
  });

  return method === 'currentTrack'
    ? { ...result, ...track }
    : { track, ...result };
};

/**
 * @param {any} payload
 * @param {string} item
 * @returns {SpotifyTrack}
 */
const buildTrack = (payload, item) => {
  log('buildTrack', payload);
  const prop = payload[item];
  // console.log(red('\nprop in buildTrack():'), prop);
  return removeFalsyFromObject({
    name: prop.name,
    id: prop.id,
    popularity: prop.popularity,
    duration_seconds: Math.floor(prop.duration_ms / 1000),
    preview_url: prop.preview_url,
    spotify_url: prop.external_urls?.spotify_url,
    uri: prop.uri,
    explicit: prop.explicit,
    artists: buildArtists(payload),
    album: buildAlbum(payload)
  });
};

/**
 * 
 * @param {any} payload 
 * @param {any} [tracks] 
 * @returns {SpotifyTrack[]|undefined}
 */
const buildTrackList = (payload, tracks = []) => {
  log('buildTrackList', payload);
  log('keys in buildTrackList', Object.keys(payload));
  if (
    (
      (payload.queue && payload.queue.length) ||
      (payload.items && payload.items.length) ||
      (payload.tracks?.items && payload.tracks.items.length)
    )
    
  ) {
    for (const entry of payload.queue ?? payload.items ?? payload.tracks?.items) {
      // return console.log('\nEntry in tracks.push\n', entry);
      const item = payload.queue ? entry : entry.track;
      if (!item) return;
      // return console.log('item', item)
      tracks.push(removeFalsyFromObject({
        added_at: entry.added_at,
        primary_color: entry.primary_color,
        video_thumbnail: entry.video_thumbail?.url,
        added_by: entry.added_by && entry.added_by.uri !== 'spotify:user:' ? {
          id: entry.added_by.id,
          spotify_url: entry.added_by.external_urls?.spotify,
          uri: entry.added_by.uri,
          followers: entry.added_by.followers?.total
        } : entry.added_by ? 'Spotify' : null,
        name: item.name,
        id: item.id,
        played_at: entry.played_at,
        explicit: item.explicit,
        duration_seconds: Math.floor(item.duration_ms / 1000),
        popularity: item.popularity,
        followers: item.followers?.total,
        genres: item.genres,
        images: item.images ? buildImages('tracks', item, false) : undefined,
        spotify_url: item.external_urls?.spotify,
        preview_url: item.preview_url,
        uri: item.uri,
        album: buildAlbum(item),
        artists: buildArtists(item),
        parent_type: payload.queue ? undefined : entry.context?.type,
        parent_spotify_url: payload.queue ? undefined : entry.context?.external_urls?.spotify,
        parent_uri: payload.queue ? undefined : entry.context?.uri
      }));
    }
    return removeFalsyFromArray(tracks);
  }
  return undefined;
};

/**
 * @param {any} payload 
 * @returns {SpotifyPlaylistReturn}
 */
const playlistsStruct = (payload) => removeFalsyFromObject({
  message: payload.message,
  total: payload.playlists?.total ?? payload.total,
  limit: payload.playlists?.limit ?? payload.limit,
  offset: payload.playlists?.offset ?? payload.offset,
  playlists: buildPlaylists(payload)
});


/**
 * @param {any} payload 
 * @param {boolean} [shortTrack]
 * @param {any} [playlists] 
 * @returns {any}
 */
function buildPlaylists(payload, shortTrack, playlists = []) {
  if (((!payload.playlists || !payload.playlists?.items?.length) && payload.type !== 'playlist') && !payload.items?.length) return null;
  log('buildPlaylists', payload.playlists.items[0]);
  /** @param {any} playlist */
  const struct = (playlist) => ({
    name: playlist.name,
    description: playlist.description,
    id: playlist.id,
    tracks_href: playlist.tracks.href,
    tracks_total: playlist.tracks.total,
    owner: playlist.owner && playlist.owner.uri !== 'spotify:user:spotify' ? removeFalsyFromObject({
      display_name: playlist.owner?.displayname,
      id: playlist.owner?.id,
      spotify_url: playlist.owner?.external_urls.spotify,
      uri: playlist.owner?.uri,
      href: playlist.owner?.href,
      followers: playlist.owner?.followers?.total
    }) : playlist.owner ? 'Spotify' : null,
    spotify_url: playlist.external_urls.spotify,
    uri: playlist.uri,
    public: playlist.public,
    collaborative: playlist.collaborative,
    primary_color: playlist.primary_color,
    images: buildImages('null', payload),
    tracks: !shortTrack ? buildTrackList(payload) : undefined
  });

  if (payload.type === 'playlist') return removeFalsyFromObject(struct(payload));
  else
    for (const playlist of payload.playlists?.items ?? payload.items) {
      // return log('playlist', playlist);
      playlists.push(removeFalsyFromObject(struct(playlist)));
    }

  return playlists;
}

/**
 * @param {any} fields 
 * @returns {string}
 */
function fieldsToString(fields) {
  let string = '';
  if (typeof fields === 'object') {
    Object.entries(fields)
      .map(([a, b]) => {
        string += a + '.';
        if (typeof b === 'object') {
          Object.entries(b)
            .map(([c, d]) => {
              string += c;
              if (Array.isArray(d)) {
                string += '(';
                for (const d1 of d) {
                  if (typeof d1 === 'string') {
                    string += d1 + ',';
                  } else if (Array.isArray(d1)) {
                    console.log('d1 is array');
                  } else if (typeof d1 === 'object') {
                    Object.entries(d1)
                      .map(([e, f]) => {
                        string += e;
                        if (Array.isArray(f)) {
                          string += '(';
                          for (const f1 of f) {
                            if (typeof f1 === 'string') {
                              string += f1 + ', ';
                            } else if (Array.isArray(f1)) {
                              console.log('f1 is array');
                            } else {
                              Object.entries(f1)
                                .map(([g, h]) => {
                                  string += g;
                                  if (Array.isArray(h)) {
                                    string += '(';
                                    for (const h1 of h) {
                                      if (typeof h1 === 'string') {
                                        string += h1 + ', ';
                                      } else {
                                        console.log('fuck this shit');
                                      }
                                    }
                                  }
                                });
                            }
                          }
                        }
                      });
                  }
                }
              } else if (typeof d === 'object') {
                console.log('d is object...');
              }
            });
        }
      });
  }
  string = string.replace(/,\s*$/, '');
  string += ')'.repeat((string.match(/\(/g) || []).length);

  return string;
}

/**
 * @param {string} object 
 * @param {any} payload 
 * @param {string} [sort] 
 * @returns {SpotifyReturn|SpotifyTrack[]}
 */
function buildSpotifyResponse(object, payload, sort) {
  const prop = object.split(':')[0];
  const top_tracks = object === 'tracks:top';
  const artist_albums = object === 'artist:albums';

  /**
   * @type {SpotifyReturn|{tracks: SpotifyTrack[]}}
   */
  const spotifyObject = {
    [prop]: []
  };

  if (top_tracks) {
    spotifyObject.total = payload[prop].total;
    spotifyObject.limit = payload[prop].limit;
  }

  const items = top_tracks ? payload['tracks'] : artist_albums ? payload.items : payload[prop].items;
  for (const item of items) {
    
    /*
    let artists = [];
    if (item.artists && item.artists.length) {
      for (const artist of item.artists)
        artists.push({
          name: artist.name,
          id: artist.id,
          spotify_url: artist.external_urls?.spotify,
          uri: artist.uri
        });
    }

    artists = artists.length ? removeFalsyFromArray(artists) : undefined;
    */
    const artists = buildArtists(payload);
    const album = buildAlbum(payload);
    /*
    let album = item.album ? {
      name: item.album?.name,
      type: item.album?.album_type,
      tracks: item.album?.total_tracks,
      is_playable: item.album?.is_playable,
      release_date: item.album?.release_date,
      spotify_url: item.album?.external_urls?.spotify,
      images: buildImages('album', item, top_tracks) ? buildImages('album', item, top_tracks) : undefined
    } : undefined;

    album = album ? removeFalsyFromObject(album) : undefined;
    */
    
    // @ts-ignore
    spotifyObject[prop].push({
      name: item.name,
      id: item.id,
      explicit: item.explicit,
      duration_seconds: Math.floor(item.duration_ms / 1000),
      popularity: item.popularity,
      followers: item.followers?.total,
      genres: item.genres,
      images: buildImages('tracks', item, top_tracks) ? buildImages('tracks', item, top_tracks) : undefined,
      spotify_url: item.external_urls?.spotify,
      preview_url: item.preview_url,
      uri: item.uri,
      artists: artists.length ? artists : undefined,
      album
    });
  }
  
  // @ts-ignore
  spotifyObject[prop] = removeFalsyFromArray(spotifyObject[prop]);

  if (sort)
    // @ts-ignore
    spotifyObject[prop].sort((/** @type {{ [x: string]: number; }} */ a, /** @type {{ [x: string]: number; }} */ b) => {
      return b[sort] - a[sort];
    });
  
  // @ts-ignore
  return top_tracks ? spotifyObject[prop] : spotifyObject;
}

/**
 * @param {any} item 
 * @returns {Array<SpotifyImageObject>|undefined}
 */
function findImagesArray(item) {
  if (Array.isArray(item))
    for (const element of item) {
      const images = element.images ?? findImagesArray(element);
      if (images) return images;
    }
  else if (item && Array.isArray(item.images))
    return item.images;
  return undefined;
  // return Array.isArray(item) ? item.find((el) => el.images) : undefined;
}

/**
 * @param {any} object 
 * @param {any} item
 * @param {boolean} [top_tracks]
 * @returns {SpotifyImages|undefined}
 */
function buildImages(object, item, top_tracks) {
  // console.log('object in buildImages\n', object);
  // return console.log('item:', item)
  
  const path = findImagesArray(object === 'album' || top_tracks
    ? item.album?.images
    : object === 'images'
      ? item
      : (item.images ?? item.playlists.items));
  
  
  // path = findImagesArray(path);
  if (!path || !path.length) return;
  // return console.log('findimagesarray:', findImagesArray(path))
  // return console.log('path:', path);
  
  // console.log('path in nuildimages\n', path);
  let images = {
    large: (path?.find((/** @type {SpotifyImageObject} */ x) => x.height && x.height >= 600))?.url,
    medium: (path?.find((/** @type {SpotifyImageObject} */ x) => (x.height && x.height >= 300 && x.height < 600) || !x.height))?.url,
    small: (path?.find((/** @type {SpotifyImageObject} */ x) => x.height && x.height < 300))?.url
  };
  images = images ? removeFalsyFromObject(images) : undefined;
  return images && (images.large || images.medium || images.small) ? images : undefined;

};

/**
 * @typedef {Object} SpotifyImageObject
 * @property {?number} height
 * @property {?number} width
 * @property {string} url
 */

module.exports = {
  buildImages,
  buildSpotifyResponse,
  buildArtists,
  buildAlbum,
  playbackStruct,
  buildTrack,
  buildTrackList,
  playlistsStruct,
  buildPlaylists,
  fieldsToString
};

/** @param {string} content */
function lighterBlue(content) {
  return `\u001b[38;5;117;1m${content}\u001b[0m`;
}

/** @param {string} content */
function red(content) {
  return `\u001b[38;5;196;1m${content}\u001b[0m`;
}

/**
 * 
 * @param {string} fn 
 * @param {any} payload
 * @param {string} [color] 
 */
function log(fn, payload, color = 'red') {
  /** @type {{[x: string]: string}} */
  const colors = {
    orange: '\u001b[38;5;117;1m',
    red: '\u001b[38;5;196;1m'
  };

  const dashesBefore = Math.floor((90 - ` payload in ${fn}() `.length) / 2);
  const dashesAfter = Math.ceil((90 - ` payload in ${fn}() `.length) / 2);
  
  console.log(`\n${colors[color]}${'-'.repeat(90)}\n${'-'.repeat(dashesBefore)} payload in ${fn}() ${'-'.repeat(dashesAfter)}\n${'-'.repeat(90)}\u001b[0m\n`, payload);
  // console.log(`\n${colors[color]}${'-'.repeat(70)}\n${'-'.repeat(Math.floor(70 - `payload in ${fn}()`.length / 2))}${`payload in ${fn}()`}${'-'.repeat(Math.ceil(70 - `payload in ${fn}()`.length / 2))}\n${'-'.repeat(70)}${'\u001b[0m'}\n`);
}
