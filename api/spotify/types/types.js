/**
 * @typedef {Object} SpotifyReturn
 * @property {number} [limit] - The maximum number of items in the response
 * @property {number} [offset] - The offset of the items returned (as set in the query or by default)
 * @property {number} [total] - The total number of items available to return
 * @property {number} [total_tracks] - The total number of items available to return
 * @property {number} [total_artists] - The total number of items available to return
 * @property {number} [total_albums] - The total number of items available to return
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
 * @typedef {Object} SpotifyRecommendationSeed
 * @property {number} afterFilteringSize - The number of tracks available after min_* and max_* filters have been applied
 * @property {number} afterRelinkingSize - The number of tracks available after relinking for regional availability
 * @property {string} id - The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter.
 * @property {number} initialPoolSize - The number of recommended tracks available for this seed
 * @property {string} type - The entity type of this seed. One of artist, track or genre.
 */

/**
 * @typedef {Object} SpotifyImageObject
 * @property {?number} height
 * @property {?number} width
 * @property {string} url
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

/**
 * @typedef {Object} SpotifyAnalysisMeta
 * @property {string} analyzer_version - The version of the Analyzer used to analyze this track
 * @property {string} platform - The platform used to read the track's audio data
 * @property {string} detailed_status - A detailed status code for this track
 * @property {number} status_code - The return code of the analyzer process. 0 if successful, 1 if any errors occurred.
 * @property {number} timestamp - The Unix timestamp (in seconds) at which this track was analyzed
 * @property {number} analysis_time - The amount of time taken to analyze this track
 * @property {string} input_process - The method used to read the track's audio data
 */

/**
 * @typedef {Object} SpotifyAnalysisTrack
 * @property {number} num_samples - The exact number of audio samples analyzed from this track
 * @property {number} duration - Length of the track in seconds
 * @property {string} sample_md5 - This field will always contain the empty string
 * @property {number} offset_seconds - An offset to the start of the region of the track that was analyzed
 * @property {number} window_seconds - The length of the region of the track was analyzed, if a subset of the track was analyzed
 * @property {number} analysis_sample_rate - The sample rate used to decode and analyze this track
 * @property {number} analysis_channels - The number of channels used for analysis. If 1, all channels are summed together to mono before analysis
 * @property {number} end_of_fade_in - The time, in seconds, at which the track's fade-out period starts. If the track has no fade-out, this should match the track's length.
 * @property {number} loudness - The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.
 * @property {number} tempo - The overall estimated tempo of a track in beats per minute (BPM)
 * @property {number} tempo_confidence - The confidence, from 0.0 to 1.0, of the reliability of the `tempo`
 * @property {number} time_signature - An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".
 * @property {number} time_signature_confidence - The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`
 * @property {number} key - The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
 * @property {number} key_confidence - The confidence, from 0.0 to 1.0, of the reliability of the `key`
 * @property {number} mode - Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
 * @property {number} mode_confidence - The confidence, from 0.0 to 1.0, of the reliability of the mode
 * @property {string} codestring - An [Echo Nest Musical Fingerprint (ENMFP)]{@link https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4} codestring for this track
 * @property {number} code_version - A version number for the Echo Nest Musical Fingerprint format used in the codestring field
 * @property {string} echoprintstring - An [EchoPrint]{@link https://github.com/spotify/echoprint-codegen} codestring for this track
 * @property {number} echoprint_version - A version number for the EchoPrint format used in the echoprintstring field
 * @property {string} synchstring - A [Synchstring]{@link https://github.com/echonest/synchdata} for this track
 * @property {number} synch_version - A version number for the Synchstring used in the synchstring field
 * @property {string} rhythmstring - A Rhythmstring for this track
 * @property {number} rhythm_version - A version number for the Rhythmstring used in the rhythmstring field
 */

/**
 * @typedef {Object} SpotifyAnalysisTimeIntervals - bars, beats, tatums
 * @property {number} start - The starting point (in seconds) of the time interval
 * @property {number} duration - The duration (in seconds) of the time interval
 * @property {number} confidence - The confidence, from 0.0 to 1.0, of the reliability of the interval
 */

/**
 * @typedef {Object} SpotifyAnalysisSections
 * @property {number} start - The starting point (in seconds) of the section
 * @property {number} duration - The duration (in seconds) of the section
 * @property {number} confidence - The confidence, from 0.0 to 1.0, of the reliability of the section's "designation"
 * @property {number} loudness - The overall loudness of the section in decibels (dB)
 * @property {number} tempo - The overall estimated tempo of the section in beats per minute (BPM)
 * @property {number} tempo_confidence - The confidence, from 0.0 to 1.0, of the reliability of the tempo. Some tracks contain tempo changes or sounds which don't contain tempo (like pure speech) which would correspond to a low value in this field.
 * @property {number} key - The estimated overall key of the section. The values in this field ranging from 0 to 11 mapping to pitches using standard Pitch Class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on). If no key was detected, the value is -1.
 * @property {number} key_confidence - The confidence, from 0.0 to 1.0, of the reliability of the key. Songs with many key changes may correspond to low values in this field.
 * @property {number} mode - Indicates the modality (major or minor) of a section, the type of scale from which its melodic content is derived. This field will contain a 0 for "minor", a 1 for "major", or a -1 for no result. Note that the major key (e.g. C major) could more likely be confused with the minor key at 3 semitones lower (e.g. A minor) as both keys carry the same pitches.
 * @property {number} mode_confidence - The confidence, from 0.0 to 1.0, of the reliability of the mode
 * @property {number} time_signature - An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".
 * @property {number} time_signature_confidence - The confidence, from 0.0 to 1.0, of the reliability of the time_signature. Sections with time signature changes may correspond to low values in this field.
 */

/**
 * @typedef {Object} SpotifyAnalysisSegments
 * @property {number} start - The starting point (in seconds) of the segment
 * @property {number} duration - The duration (in seconds) of the segment
 * @property {number} confidence - The confidence, from 0.0 to 1.0, of the reliability of the segmentation. Segments of the song which are difficult to logically segment (e.g: noise) may correspond to low values in this field.
 * @property {number} loudness_start - The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.
 * @property {number} loudness_max_time - The segment-relative offset of the segment peak loudness in seconds. Combined with `loudness_start` and `loudness_max`, these components can be used to desctibe the "attack" of the segment.
 * @property {number} loudness_max - The peak loudness of the segment in decibels (dB). Combined with `loudness_start` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.
 * @property {number} loudness_end - The offset loudness of the segment in decibels (dB). This value should be equivalent to the `loudness_start` of the following segment.
 * @property {number[]} pitches - Pitch content is given by a “chroma” vector, corresponding to the 12 pitch classes C, C#, D to B, with values ranging from 0 to 1 that describe the relative dominance of every pitch in the chromatic scale. For example a C Major chord would likely be represented by large values of C, E and G (i.e. classes 0, 4, and 7).
 * @property {number[]} timbre - Timbre is the quality of a musical note or sound that distinguishes different types of musical instruments, or voices. It is a complex notion also referred to as sound color, texture, or tone quality, and is derived from the shape of a segment’s spectro-temporal surface, independently of pitch and loudness. The timbre feature is a vector that includes 12 unbounded values roughly centered around 0. Those values are high level abstractions of the spectral surface, ordered by degree of importance.
 */

/**
 * @typedef {Object} SpotifyAnalysis
 * @property {SpotifyAnalysisMeta} meta - Metadata for the audio analysis
 * @property {SpotifyAnalysisTrack} track
 * @property {SpotifyAnalysisTimeIntervals[]} bars - The time intervals of the bars throughout the track. A bar (or measure) is a segment of time defined as a given number of beats.
 * @property {SpotifyAnalysisTimeIntervals[]} beats - The time intervals of beats throughout the track. A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums.
 * @property {SpotifyAnalysisTimeIntervals[]} tatums - A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments).
 * @property {SpotifyAnalysisSections[]} sections - Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc.
 * @property {SpotifyAnalysisSegments[]} segments - Each segment contains a roughly conisistent sound throughout its duration
 */

/**
 * @typedef {Object} SpotifyAudioFeatures
 * @property {number} acousticness - A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
 * @property {number} analysis_url - A URL to access the full audio analysis of this track. An access token is required to access this data.
 * @property {number} danceability - Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
 * @property {number} duration_ms - The duration of the track in milliseconds
 * @property {number} energy - Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
 * @property {number} id - The Spotify ID for the track
 * @property {number} instrumentalness - Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
 * @property {number} key - The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
 * @property {number} liveness - Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
 * @property {number} loudness - The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.
 * @property {number} mode - Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
 * @property {number} speechiness - Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
 * @property {number} tempo - The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
 * @property {number} time_signature - An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".
 * @property {number} track_href - A link to the Web API endpoint providing full details of the track
 * @property {number} type - Always `audio_features`
 * @property {number} uri - The Spotify URI for the track
 * @property {number} valence - A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
 */