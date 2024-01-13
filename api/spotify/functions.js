// @ts-check

const { ResponseError } = require('../resources/Errors');
const { removeFalsyFromArray, removeFalsyFromObject, getPathValue } = require('../resources/functions');


/**
 * @param {any} payload
 * @param {string} [sort]
 * @param {string} [property]
 * @param {any} [artists] 
 * @returns {SpotifyArtist[]}
 */
function buildArtists(payload, sort, property, artists = []) {
  const items = property ? getPathValue(payload, property) : payload.item?.artists || payload.currently_playing?.artists || (payload.artists?.length ? payload.artists : undefined) || payload.artists?.items || payload.items || (payload.length && payload[0].type === 'artist' ? payload : undefined) || (payload.type === 'artist' ? [payload] : undefined);
  // console.log('ARRAY', items);
  // return log('buildArtists', payload);
  // if ((payload.item?.artists && payload.item?.artists.length) || (payload.currently_playing?.artists && payload.currently_playing?.artists.length) || (payload.artists && payload.artists.length)) {
  if (items?.length)
    for (const artist of items) {
      artists.push({
        name: artist.name,
        followers: artist.followers?.total,
        popularity: artist.popularity,
        images: buildImages('images', artist),
        genres: artist.genres?.length ? artist.genres : undefined,
        id: artist.id,
        spotify_url: artist.external_urls?.spotify,
        uri: artist.uri
      });
    }
  if (sort)
    artists.sort((/** @type {{ [x: string]: number; }} */ a, /** @type {{ [x: string]: number; }} */ b) => {
      return b[sort] - a[sort];
    });
  
  return artists.length ? removeFalsyFromArray(artists) : undefined;
}
  
/**
 * 
 * @param {any} payload 
 * @param {any} albums
 * @returns {SpotifyAlbum[]|undefined}
 */
function buildAlbums(payload, albums = []) {
  // log('buildAlbums', payload);
  if (!payload.items || !payload.items?.length) return;
  for (const album of payload.items)
    albums.push(buildAlbum(album));
  return albums;
}

/**
 * @param {any} payload 
 * @returns {SpotifyAlbum|undefined}
 */
function buildAlbum(payload) {
  // log('buildAlbum', payload);
  let prop = payload.item?.album ?? payload.currently_playing?.album ?? payload.album ?? payload.track?.album;
  prop = prop ?? (payload.type === 'album' ? payload : null);
  // console.log('PROP:', prop);
  if (!prop) return;

  return removeFalsyFromObject({
    name: prop.name,
    id: prop.id,
    type: prop.album_type,
    tracks: prop.total_tracks,
    is_playable: prop.is_playable,
    release_date: prop.release_date,
    spotify_url: prop.external_urls?.spotify,
    uri: prop.uri,
    images: buildImages(payload.type === 'album' ? 'images' : 'null', prop),
    artists: buildArtists(payload)
  });
}

/**
 * @param {any} payload 
 * @param {string} method 
 * @returns
 */
const playbackStruct = (payload, method) => {
  // log('playbackStruct', payload);
  // log('arist in playbackStruct', payload.item?.artists?.[0]);
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
 * @param {string} [item]
 * @returns {SpotifyTrack}
 */
const buildTrack = (payload, item) => {
  // log('buildTrack', payload);
  const prop = item ? payload[item] : payload;
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
 * @param {string} [sort]
 * @param {any} [tracks] 
 * @returns {SpotifyTrack[]|undefined}
 */
const buildTrackList = (payload, sort, tracks = []) => {
  // log('buildTrackList', payload);
  // log('keys in buildTrackList', Object.keys(payload));
  if (
    (
      (payload.queue && payload.queue.length) ||
      (payload.items && payload.items.length) ||
      (payload.tracks?.items && payload.tracks.items.length) ||
      (payload.tracks && payload.tracks.length && !payload.tracks?.items)
    )
    
  ) {
    for (const entry of payload.queue ?? payload.items ?? payload.tracks?.items ?? payload.tracks) {
      // return console.log('\nEntry in tracks.push\n', entry);
      let item = payload.queue || payload.tracks?.length || payload.tracks?.items?.length || payload.items?.length ? entry : entry.track;
      item = item.track ? item.track : item;
      // const item = payload.length ? entry : entry.track;
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
        parent_uri: payload.queue ? undefined : entry.context?.uri,
        is_local: item.is_local,
        is_playable: item.is_playable,
        linked_from: item.linked_from,
        restrictions: item.restrictions
      }));
    }

    if (sort)
      tracks.sort((/** @type {{ [x: string]: number; }} */ a, /** @type {{ [x: string]: number; }} */ b) => {
        return b[sort] - a[sort];
      });
    
    return tracks.length ? removeFalsyFromArray(tracks) : undefined;
  }
  return undefined;
};

/**
 * @param {any} payload 
 * @param {boolean} [shortTrack]
 * @param {any} [playlists] 
 * @returns {any}
 */
function buildPlaylists(payload, shortTrack, playlists = []) {
  if (((!payload.playlists || !payload.playlists?.items?.length) && payload.type !== 'playlist')/* && !payload.items?.length*/) return null;
  // log('buildPlaylists', payload.playlists.items[0]);
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
                    // console.log('d1 is array');
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
                              // console.log('f1 is array');
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
                                        // console.log('fuck this shit');
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
                // console.log('d is object...');
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
  const artist_albums = object === 'albums';

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
  for (const item of items)

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
      artists: buildArtists(payload),
      album: buildAlbum(payload)
    });
  
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
 * @param {string} object 
 * @param {any} item
 * @param {boolean} [top_tracks]
 * @returns {SpotifyImages|undefined}
 */
function buildImages(object, item, top_tracks) {
  // console.log('object in buildImages\n', object);
  // return console.log('item:', item.images)
  // console.log(item.images);
  // console.log(getPathValue(item, 'images'))
  let path = object === 'album' || top_tracks
    ? item.album?.images
    : object === 'images'
      ? item
      : (item.images ?? item.playlists?.items);
  path = path.images ?? path;
  /*
  const path = findImagesArray(object === 'album' || top_tracks
    ? item.album?.images
    : object === 'images'
      ? item
      : (item.images ?? item.playlists?.items));
  */
  // console.log('path', path);
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
 * @param {any} user 
 * @returns {SpotifyUser|undefined}
 */
function buildUser(user) {
  if (!user || !('display_name' in user)) return;
  return removeFalsyFromObject({
    email: user.email,
    display_name: user.display_name,
    id: user.id,
    spotify_url: user.external_urls?.spotify,
    uri: user.uri,
    followers: user.followers?.total,
    images: buildImages('images', user),
    product: user.product,
    country: user.country,
    explicit_content: user.explicit_content
  });
}

/**
 * @param {string} query
 * @param {'tracks'|'artists'} type
 * @param {boolean} [throwErr]
 * @returns {Promise<string|undefined>}
 */
async function find(query, type, throwErr = false) {
  const { advanced } = require('./search');
  const [item] = (await advanced({
    song: type === 'tracks' ? query : undefined,
    artist: type === 'artists' ? query : undefined
    // include: [type === 'tracks' ? 'songs' : 'artists']
  }))?.[type] || [];
  // console.log(item);
  if (!item?.id && throwErr) 
    throw new ResponseError(null, null, 'spotify_error', `${type.slice(0, type.length - 1)} not found`);
  // console.log('item.id', item?.id);
  return item?.id || undefined;
}

module.exports = {
  buildImages,
  buildSpotifyResponse,
  buildArtists,
  buildAlbum,
  buildAlbums,
  playbackStruct,
  buildTrack,
  buildTrackList,
  buildPlaylists,
  buildUser,
  fieldsToString,
  find,
  genres: ['acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime', 'black-metal', 'bluegrass', 'blues', 'bossanova', 'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house', 'children', 'chill', 'classical', 'club', 'comedy', 'country', 'dance', 'dancehall', 'death-metal', 'deep-house', 'detroit-techno', 'disco', 'disney', 'drum-and-bass', 'dub', 'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk', 'forro', 'french', 'funk', 'garage', 'german', 'gospel', 'goth', 'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore', 'hardstyle', 'heavy-metal', 'hip-hop', 'holidays', 'honky-tonk', 'house', 'idm', 'indian', 'indie', 'indie-pop', 'industrial', 'iranian', 'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz', 'k-pop', 'kids', 'latin', 'latino', 'malay', 'mandopop', 'metal', 'metal-misc', 'metalcore', 'minimal-techno', 'movies', 'mpb', 'new-age', 'new-release', 'opera', 'pagode', 'party', 'philippines-opm', 'piano', 'pop', 'pop-film', 'post-dubstep', 'power-pop', 'progressive-house', 'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae', 'reggaeton', 'road-trip', 'rock', 'rock-n-roll', 'rockabilly', 'romance', 'sad', 'salsa', 'samba', 'sertanejo', 'show-tunes', 'singer-songwriter', 'ska', 'sleep', 'songwriter', 'soul', 'soundtracks', 'spanish', 'study', 'summer', 'swedish', 'synth-pop', 'tango', 'techno', 'trance', 'trip-hop', 'turkish', 'work-out', 'world-music']
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
  
  // console.log(`\n${colors[color]}${'-'.repeat(90)}\n${'-'.repeat(dashesBefore)} payload in ${fn}() ${'-'.repeat(dashesAfter)}\n${'-'.repeat(90)}\u001b[0m\n`, payload);
  // console.log(`\n${colors[color]}${'-'.repeat(70)}\n${'-'.repeat(Math.floor(70 - `payload in ${fn}()`.length / 2))}${`payload in ${fn}()`}${'-'.repeat(Math.ceil(70 - `payload in ${fn}()`.length / 2))}\n${'-'.repeat(70)}${'\u001b[0m'}\n`);
}
