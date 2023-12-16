/**
 * @typedef {Object} SpotifyReturn
 * @property {number} [limit] - The maximum number of items in the response
 * @property {number} [offset] - The offset of the items returned (as set in the query or by default)
 * @property {number} [total] - The total number of items available to return
 * @property {SpotifyArtist[]} [artists] - An array of Artist objects
 * @property {SpotifyTrack[]} [tracks] - An array of Track objects
 * @property {SpotifyAlbum[]} [albums] - An array of Album objects
 */
 
/**
 * @typedef {Object} SpotifyArtist
 * @property {string} name
 * @property {string} id
 * @property {number} popularity
 * @property {number} followers
 * @property {Array<string>} genres
 * @property {SpotifyImages} [images]
 * @property {string} spotify_url - The Spotify external URL for the object
 * @property {string} uri
 */

/**
 * @typedef {Object} SpotifyTrack
 * @property {string} name
 * @property {string} id
 * @property {number} popularity
 * @property {number} duration_seconds
 * @property {boolean} [explicit]
 * @property {?string} preview_url
 * @property {string} spotify_url - The Spotify external URL for the object
 * @property {string} uri
 * @property {SpotifyArtist[]} [artists]
 * @property {SpotifyAlbum} [album]
 */

/**
 * @typedef {Object} SpotifyAlbum
 * @property {string} name
 * @property {string} id
 * @property {string} album_type - album, single, compilation
 * @property {number} popularity
 * @property {string} release_date - yyyy-mm
 * @property {number} total_tracks
 * @property {?string} preview_url
 * @property {string} spotify_url - The Spotify external URL for the object
 * @property {string} uri
 * @property {SpotifyPartialArtist[]} artists
 * @property {SpotifyImages} [images]
 * 
 */

/**
 * @typedef {Object} SpotifyPartialArtist
 * @property {string} name
 * @property {string} id
 * @property {string} spotify_url - The Spotify external URL for the object
 * @property {string} uri
 */
 
/**
 * @typedef {Object} SpotifyImages
 * @property {string} [small] - 160x160 image url
 * @property {string} [medium] - 320x320 image url
 * @property {string} [large] - 640x640 image url
 */

/**
 * @typedef {Object} SpotifyUser
 * @property {string} display_name
 * @property {string} id
 * @property {string} [email] - This field is only available when the current user has granted access to the `user-read-email` scope
 * @property {string} spotify_url
 * @property {string} uri
 * @property {number} followers
 * @property {ExplicitContent} explicit_content
 * @property {string} [subscription] This field is only available when the current user has granted access to the `user-read-private` scope
 * @property {string} [profile_image]
 */

/**
 * @typedef {Object} ExplicitContent
 * @property {boolean} filter_enabled - When true, indicates that explicit content should not be played
 * @property {boolean} filter_locked - When true, indicates that the explicit content setting is locked and can't be changed by the user
 */