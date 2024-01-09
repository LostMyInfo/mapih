/**
 * @typedef {Object} SpotifyReturn
 * @property {number} [limit] - The maximum number of items in the response
 * @property {number} [offset] - The offset of the items returned (as set in the query or by default)
 * @property {number} [total] - The total number of items available to return
 * @property {SpotifyArtist[]} [artists] - An array of Artist objects
 * @property {SpotifyTrack[]} [tracks] - An array of Track objects
 * @property {SpotifyAlbum[]} [albums] - An array of Album objects
 * @property {SpotifyDevice[]} [device]
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
 * @property {string} [played_at]
 * @property {number} [followers]
 * @property {string[]} [genres]
 * @property {SpotifyImages} [images]
 * @property {string} [parent_type]
 * @property {string} [parent_spotify_url]
 * @property {string} [parent_uri]
 * @property {number} [progress_ms]
 * @property {boolean} [is_playing]
 * @property {string} [added_at]
 * @property {string|?{id?: string, spotify_url?: string, uri?: string, followers?: number}} [added_by]
 */

/**
 * @typedef {Object} SpotifyAlbum
 * @property {string} name
 * @property {string} id
 * @property {string} album_type - album, single, compilation
 * @property {number} [popularity]
 * @property {string} release_date - yyyy-mm
 * @property {number} [total_tracks]
 * @property {number} [tracks]
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

/**
 * @typedef {Object} SpotifyPlayback
 * @property {SpotifyDevice} [device] - The device that is currently active
 * @property {string} parent_type
 * @property {boolean} is_playing - If something is currently playing
 * @property {number} progress_ms - Progress into the currently playing track or episode
 * @property {boolean} shuffle_state - Whether shuffle is on
 * @property {string} repeat_state - `off`, `track`, `context`
 * @property {?string} parent_spotify_url - The Spotify URL for the object
 * @property {string} parent_uri
 * @property {SpotifyTrack} track
 * @property {SpotifyActions} actions - Allows to update the user interface based on which playback actions are available within the current context
 */

/**
 * @typedef {Object} SpotifyDevice
 * @property {?string} id - The device ID
 * @property {string} name - A human-readable name for the device
 * @property {string} type - Device type
 * @property {boolean} is_active - If this device is the currently active device
 * @property {boolean} is_private_session - If this device is currently in a private session
 * @property {boolean} is_restricted - Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device.
 * @property {boolean} supports_volume - If this device can be used to set the volume
 * @property {number} volume_percent - The current volume in percent
 */

/**
 * @typedef {Object} SpotifyActions
 * @property {SpotifyActionsOptions} [allows]
 * @property {SpotifyActionsOptions} [disallows]
 */

/**
 * @typedef {Object} SpotifyActionsOptions
 * @property {boolean} [interrupting_playback] - Interrupting playback
 * @property {boolean} [pausing] - Pausing
 * @property {boolean} [resuming] - Resuming
 * @property {boolean} [seeking] - Seeking playback location
 * @property {boolean} [skipping_next] - Skipping to the next context
 * @property {boolean} [skipping_prev] - Skipping to the previous context
 * @property {boolean} [toggling_repeat_context] - Toggling repeat context flag
 * @property {boolean} [toggling_shuffle] - Toggling shuffle flag
 * @property {boolean} [toggling_repeat_track] - Toggling repeat track flag
 * @property {boolean} [transferring_playback] - Transfering playback between devices
 */

/**
 * @typedef {Object} SpotifyPlaylist
 * @property {string} name - The name of the playlist
 * @property {?string} description - The playlist description. Only returned for modified, verified playlists
 * @property {string} id - The Spotify ID for the playlist
 * @property {number} followers - Information about the followers of the playlist
 * @property {SpotifyPlaylistOwner} owner - The user that owns the playlist
 * @property {string} spotify_url - The Spotify URL for the object
 * @property {string} uri - The Spotify URI for the playlist
 * @property {?boolean} public - The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant.
 * @property {?boolean} collaborative - Whether the owner allows other users to modify the playlist
 * @property {?string} primary_color
 * @property {SpotifyImages} [images] - The images for the playlist
 * @property {string} tracks_href - A link to the Web API endpoint where full details of the playlist's tracks can be retrieved
 * @property {number} total_tracks - The number of tracks in the playlist
 * @property {SpotifyTrack[]} tracks - The tracks of the playlist
 */

/**
 * @typedef {Object} SpotifyPlaylistReturn
 * @property {number} limit - The maximum number of items in the response
 * @property {number} offset - The offset of the items returned (as set in the query or by default)
 * @property {number} total - The total number of items available to return
 * @property {SpotifySimplifiedPaylist[]} playlists - An array of Artist objects
 */

/**
 * @typedef {Object} SpotifySimplifiedPaylist
 * @property {string} name - The name of the playlist
 * @property {?string} description - The playlist description. Only returned for modified, verified playlists
 * @property {string} id - The Spotify ID for the playlist
 * @property {SpotifyPlaylistOwner} owner - The user that owns the playlist
 * @property {string} spotify_url - The Spotify URL for the object
 * @property {string} uri - The Spotify URI for the playlist
 * @property {?boolean} public - The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant.
 * @property {?boolean} collaborative - Whether the owner allows other users to modify the playlist
 * @property {?string} primary_color
 * @property {SpotifyImages} [images] - The images for the playlist
 * @property {string} tracks_href - A link to the Web API endpoint where full details of the playlist's tracks can be retrieved
 * @property {number} total_tracks - The number of tracks in the playlist
 */

/**
 * @typedef {Object} SpotifyPlaylistOwner
 * @property {?string} display_name - The name displayed on the user's profile
 * @property {string} id - The Spotify user ID for this user
 * @property {string} uri - The spotify URI for this user
 * @property {string} href - A link to the Web API endpoint for this user
 * @property {string} spotify_url - The Spotify URL for the object
 * @property {number} [followers]
 */

