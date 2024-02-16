export type SpotifyReturn = {
    /**
     * - The maximum number of items in the response
     */
    limit?: number | undefined;
    /**
     * - The offset of the items returned (as set in the query or by default)
     */
    offset?: number | undefined;
    /**
     * - The total number of items available to return
     */
    total?: number | undefined;
    /**
     * - The total number of items available to return
     */
    total_tracks?: number | undefined;
    /**
     * - The total number of items available to return
     */
    total_artists?: number | undefined;
    /**
     * - The total number of items available to return
     */
    total_albums?: number | undefined;
    /**
     * - An array of Artist objects
     */
    artists?: SpotifyArtist[] | undefined;
    /**
     * - An array of Track objects
     */
    tracks?: SpotifyTrack[] | undefined;
    /**
     * - An array of Album objects
     */
    albums?: SpotifyAlbum[] | undefined;
    device?: SpotifyDevice[] | undefined;
};
export type SpotifyArtist = {
    name: string;
    id: string;
    popularity: number;
    followers: number;
    genres: Array<string>;
    images?: SpotifyImages | undefined;
    /**
     * - The Spotify external URL for the object
     */
    spotify_url: string;
    uri: string;
};
export type SpotifyTrack = {
    name: string;
    id: string;
    popularity: number;
    duration_seconds: number;
    explicit?: boolean | undefined;
    preview_url: string | null;
    /**
     * - The Spotify external URL for the object
     */
    spotify_url: string;
    uri: string;
    artists?: SpotifyArtist[] | undefined;
    album?: SpotifyAlbum | undefined;
    played_at?: string | undefined;
    followers?: number | undefined;
    genres?: string[] | undefined;
    images?: SpotifyImages | undefined;
    parent_type?: string | undefined;
    parent_spotify_url?: string | undefined;
    parent_uri?: string | undefined;
    progress_ms?: number | undefined;
    is_playing?: boolean | undefined;
    added_at?: string | undefined;
    added_by?: string | {
        id?: string | undefined;
        spotify_url?: string | undefined;
        uri?: string | undefined;
        followers?: number | undefined;
    } | null | undefined;
};
export type SpotifyAlbum = {
    name: string;
    id: string;
    /**
     * - album, single, compilation
     */
    album_type: string;
    popularity?: number | undefined;
    /**
     * - yyyy-mm
     */
    release_date: string;
    total_tracks?: number | undefined;
    tracks?: number | undefined;
    preview_url: string | null;
    /**
     * - The Spotify external URL for the object
     */
    spotify_url: string;
    uri: string;
    artists: SpotifyPartialArtist[];
    images?: SpotifyImages | undefined;
};
export type SpotifyPartialArtist = {
    name: string;
    id: string;
    /**
     * - The Spotify external URL for the object
     */
    spotify_url: string;
    uri: string;
};
export type SpotifyRecommendationSeed = {
    /**
     * - The number of tracks available after min_* and max_* filters have been applied
     */
    afterFilteringSize: number;
    /**
     * - The number of tracks available after relinking for regional availability
     */
    afterRelinkingSize: number;
    /**
     * - The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter.
     */
    id: string;
    /**
     * - The number of recommended tracks available for this seed
     */
    initialPoolSize: number;
    /**
     * - The entity type of this seed. One of artist, track or genre.
     */
    type: string;
};
export type SpotifyImageObject = {
    height: number | null;
    width: number | null;
    url: string;
};
export type SpotifyImages = {
    /**
     * - 160x160 image url
     */
    small?: string | undefined;
    /**
     * - 320x320 image url
     */
    medium?: string | undefined;
    /**
     * - 640x640 image url
     */
    large?: string | undefined;
};
export type SpotifyUser = {
    display_name: string;
    id: string;
    /**
     * - This field is only available when the current user has granted access to the `user-read-email` scope
     */
    email?: string | undefined;
    spotify_url: string;
    uri: string;
    followers: number;
    explicit_content: ExplicitContent;
    /**
     * This field is only available when the current user has granted access to the `user-read-private` scope
     */
    subscription?: string | undefined;
    profile_image?: string | undefined;
};
export type ExplicitContent = {
    /**
     * - When true, indicates that explicit content should not be played
     */
    filter_enabled: boolean;
    /**
     * - When true, indicates that the explicit content setting is locked and can't be changed by the user
     */
    filter_locked: boolean;
};
export type SpotifyPlayback = {
    /**
     * - The device that is currently active
     */
    device?: SpotifyDevice | undefined;
    parent_type: string;
    /**
     * - If something is currently playing
     */
    is_playing: boolean;
    /**
     * - Progress into the currently playing track or episode
     */
    progress_ms: number;
    /**
     * - Whether shuffle is on
     */
    shuffle_state: boolean;
    /**
     * - `off`, `track`, `context`
     */
    repeat_state: string;
    /**
     * - The Spotify URL for the object
     */
    parent_spotify_url: string | null;
    parent_uri: string;
    track: SpotifyTrack;
    /**
     * - Allows to update the user interface based on which playback actions are available within the current context
     */
    actions: SpotifyActions;
};
export type SpotifyDevice = {
    /**
     * - The device ID
     */
    id: string | null;
    /**
     * - A human-readable name for the device
     */
    name: string;
    /**
     * - Device type
     */
    type: string;
    /**
     * - If this device is the currently active device
     */
    is_active: boolean;
    /**
     * - If this device is currently in a private session
     */
    is_private_session: boolean;
    /**
     * - Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device.
     */
    is_restricted: boolean;
    /**
     * - If this device can be used to set the volume
     */
    supports_volume: boolean;
    /**
     * - The current volume in percent
     */
    volume_percent: number;
};
export type SpotifyActions = {
    allows?: SpotifyActionsOptions | undefined;
    disallows?: SpotifyActionsOptions | undefined;
};
export type SpotifyActionsOptions = {
    /**
     * - Interrupting playback
     */
    interrupting_playback?: boolean | undefined;
    /**
     * - Pausing
     */
    pausing?: boolean | undefined;
    /**
     * - Resuming
     */
    resuming?: boolean | undefined;
    /**
     * - Seeking playback location
     */
    seeking?: boolean | undefined;
    /**
     * - Skipping to the next context
     */
    skipping_next?: boolean | undefined;
    /**
     * - Skipping to the previous context
     */
    skipping_prev?: boolean | undefined;
    /**
     * - Toggling repeat context flag
     */
    toggling_repeat_context?: boolean | undefined;
    /**
     * - Toggling shuffle flag
     */
    toggling_shuffle?: boolean | undefined;
    /**
     * - Toggling repeat track flag
     */
    toggling_repeat_track?: boolean | undefined;
    /**
     * - Transfering playback between devices
     */
    transferring_playback?: boolean | undefined;
};
export type SpotifyPlaylist = {
    /**
     * - The name of the playlist
     */
    name: string;
    /**
     * - The playlist description. Only returned for modified, verified playlists
     */
    description: string | null;
    /**
     * - The Spotify ID for the playlist
     */
    id: string;
    /**
     * - Information about the followers of the playlist
     */
    followers: number;
    /**
     * - The user that owns the playlist
     */
    owner: SpotifyPlaylistOwner;
    /**
     * - The Spotify URL for the object
     */
    spotify_url: string;
    /**
     * - The Spotify URI for the playlist
     */
    uri: string;
    /**
     * - The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant.
     */
    public: boolean | null;
    /**
     * - Whether the owner allows other users to modify the playlist
     */
    collaborative: boolean | null;
    primary_color: string | null;
    /**
     * - The images for the playlist
     */
    images?: SpotifyImages | undefined;
    /**
     * - A link to the Web API endpoint where full details of the playlist's tracks can be retrieved
     */
    tracks_href: string;
    /**
     * - The number of tracks in the playlist
     */
    total_tracks: number;
    /**
     * - The tracks of the playlist
     */
    tracks: SpotifyTrack[];
};
export type SpotifyPlaylistReturn = {
    /**
     * - The maximum number of items in the response
     */
    limit: number;
    /**
     * - The offset of the items returned (as set in the query or by default)
     */
    offset: number;
    /**
     * - The total number of items available to return
     */
    total: number;
    /**
     * - An array of Artist objects
     */
    playlists: SpotifySimplifiedPaylist[];
};
export type SpotifySimplifiedPaylist = {
    /**
     * - The name of the playlist
     */
    name: string;
    /**
     * - The playlist description. Only returned for modified, verified playlists
     */
    description: string | null;
    /**
     * - The Spotify ID for the playlist
     */
    id: string;
    /**
     * - The user that owns the playlist
     */
    owner: SpotifyPlaylistOwner;
    /**
     * - The Spotify URL for the object
     */
    spotify_url: string;
    /**
     * - The Spotify URI for the playlist
     */
    uri: string;
    /**
     * - The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant.
     */
    public: boolean | null;
    /**
     * - Whether the owner allows other users to modify the playlist
     */
    collaborative: boolean | null;
    primary_color: string | null;
    /**
     * - The images for the playlist
     */
    images?: SpotifyImages | undefined;
    /**
     * - A link to the Web API endpoint where full details of the playlist's tracks can be retrieved
     */
    tracks_href: string;
    /**
     * - The number of tracks in the playlist
     */
    total_tracks: number;
};
export type SpotifyPlaylistOwner = {
    /**
     * - The name displayed on the user's profile
     */
    display_name: string | null;
    /**
     * - The Spotify user ID for this user
     */
    id: string;
    /**
     * - The spotify URI for this user
     */
    uri: string;
    /**
     * - A link to the Web API endpoint for this user
     */
    href: string;
    /**
     * - The Spotify URL for the object
     */
    spotify_url: string;
    followers?: number | undefined;
};
export type SpotifyAnalysisMeta = {
    /**
     * - The version of the Analyzer used to analyze this track
     */
    analyzer_version: string;
    /**
     * - The platform used to read the track's audio data
     */
    platform: string;
    /**
     * - A detailed status code for this track
     */
    detailed_status: string;
    /**
     * - The return code of the analyzer process. 0 if successful, 1 if any errors occurred.
     */
    status_code: number;
    /**
     * - The Unix timestamp (in seconds) at which this track was analyzed
     */
    timestamp: number;
    /**
     * - The amount of time taken to analyze this track
     */
    analysis_time: number;
    /**
     * - The method used to read the track's audio data
     */
    input_process: string;
};
export type SpotifyAnalysisTrack = {
    /**
     * - The exact number of audio samples analyzed from this track
     */
    num_samples: number;
    /**
     * - Length of the track in seconds
     */
    duration: number;
    /**
     * - This field will always contain the empty string
     */
    sample_md5: string;
    /**
     * - An offset to the start of the region of the track that was analyzed
     */
    offset_seconds: number;
    /**
     * - The length of the region of the track was analyzed, if a subset of the track was analyzed
     */
    window_seconds: number;
    /**
     * - The sample rate used to decode and analyze this track
     */
    analysis_sample_rate: number;
    /**
     * - The number of channels used for analysis. If 1, all channels are summed together to mono before analysis
     */
    analysis_channels: number;
    /**
     * - The time, in seconds, at which the track's fade-out period starts. If the track has no fade-out, this should match the track's length.
     */
    end_of_fade_in: number;
    /**
     * - The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.
     */
    loudness: number;
    /**
     * - The overall estimated tempo of a track in beats per minute (BPM)
     */
    tempo: number;
    /**
     * - The confidence, from 0.0 to 1.0, of the reliability of the `tempo`
     */
    tempo_confidence: number;
    /**
     * - An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".
     */
    time_signature: number;
    /**
     * - The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`
     */
    time_signature_confidence: number;
    /**
     * - The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
     */
    key: number;
    /**
     * - The confidence, from 0.0 to 1.0, of the reliability of the `key`
     */
    key_confidence: number;
    /**
     * - Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
     */
    mode: number;
    /**
     * - The confidence, from 0.0 to 1.0, of the reliability of the mode
     */
    mode_confidence: number;
    /**
     * - An [Echo Nest Musical Fingerprint (ENMFP)]{@link https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4} codestring for this track
     */
    codestring: string;
    /**
     * - A version number for the Echo Nest Musical Fingerprint format used in the codestring field
     */
    code_version: number;
    /**
     * - An [EchoPrint]{@link https://github.com/spotify/echoprint-codegen} codestring for this track
     */
    echoprintstring: string;
    /**
     * - A version number for the EchoPrint format used in the echoprintstring field
     */
    echoprint_version: number;
    /**
     * - A [Synchstring]{@link https://github.com/echonest/synchdata} for this track
     */
    synchstring: string;
    /**
     * - A version number for the Synchstring used in the synchstring field
     */
    synch_version: number;
    /**
     * - A Rhythmstring for this track
     */
    rhythmstring: string;
    /**
     * - A version number for the Rhythmstring used in the rhythmstring field
     */
    rhythm_version: number;
};
/**
 * - bars, beats, tatums
 */
export type SpotifyAnalysisTimeIntervals = {
    /**
     * - The starting point (in seconds) of the time interval
     */
    start: number;
    /**
     * - The duration (in seconds) of the time interval
     */
    duration: number;
    /**
     * - The confidence, from 0.0 to 1.0, of the reliability of the interval
     */
    confidence: number;
};
export type SpotifyAnalysisSections = {
    /**
     * - The starting point (in seconds) of the section
     */
    start: number;
    /**
     * - The duration (in seconds) of the section
     */
    duration: number;
    /**
     * - The confidence, from 0.0 to 1.0, of the reliability of the section's "designation"
     */
    confidence: number;
    /**
     * - The overall loudness of the section in decibels (dB)
     */
    loudness: number;
    /**
     * - The overall estimated tempo of the section in beats per minute (BPM)
     */
    tempo: number;
    /**
     * - The confidence, from 0.0 to 1.0, of the reliability of the tempo. Some tracks contain tempo changes or sounds which don't contain tempo (like pure speech) which would correspond to a low value in this field.
     */
    tempo_confidence: number;
    /**
     * - The estimated overall key of the section. The values in this field ranging from 0 to 11 mapping to pitches using standard Pitch Class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on). If no key was detected, the value is -1.
     */
    key: number;
    /**
     * - The confidence, from 0.0 to 1.0, of the reliability of the key. Songs with many key changes may correspond to low values in this field.
     */
    key_confidence: number;
    /**
     * - Indicates the modality (major or minor) of a section, the type of scale from which its melodic content is derived. This field will contain a 0 for "minor", a 1 for "major", or a -1 for no result. Note that the major key (e.g. C major) could more likely be confused with the minor key at 3 semitones lower (e.g. A minor) as both keys carry the same pitches.
     */
    mode: number;
    /**
     * - The confidence, from 0.0 to 1.0, of the reliability of the mode
     */
    mode_confidence: number;
    /**
     * - An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".
     */
    time_signature: number;
    /**
     * - The confidence, from 0.0 to 1.0, of the reliability of the time_signature. Sections with time signature changes may correspond to low values in this field.
     */
    time_signature_confidence: number;
};
export type SpotifyAnalysisSegments = {
    /**
     * - The starting point (in seconds) of the segment
     */
    start: number;
    /**
     * - The duration (in seconds) of the segment
     */
    duration: number;
    /**
     * - The confidence, from 0.0 to 1.0, of the reliability of the segmentation. Segments of the song which are difficult to logically segment (e.g: noise) may correspond to low values in this field.
     */
    confidence: number;
    /**
     * - The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.
     */
    loudness_start: number;
    /**
     * - The segment-relative offset of the segment peak loudness in seconds. Combined with `loudness_start` and `loudness_max`, these components can be used to desctibe the "attack" of the segment.
     */
    loudness_max_time: number;
    /**
     * - The peak loudness of the segment in decibels (dB). Combined with `loudness_start` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.
     */
    loudness_max: number;
    /**
     * - The offset loudness of the segment in decibels (dB). This value should be equivalent to the `loudness_start` of the following segment.
     */
    loudness_end: number;
    /**
     * - Pitch content is given by a “chroma” vector, corresponding to the 12 pitch classes C, C#, D to B, with values ranging from 0 to 1 that describe the relative dominance of every pitch in the chromatic scale. For example a C Major chord would likely be represented by large values of C, E and G (i.e. classes 0, 4, and 7).
     */
    pitches: number[];
    /**
     * - Timbre is the quality of a musical note or sound that distinguishes different types of musical instruments, or voices. It is a complex notion also referred to as sound color, texture, or tone quality, and is derived from the shape of a segment’s spectro-temporal surface, independently of pitch and loudness. The timbre feature is a vector that includes 12 unbounded values roughly centered around 0. Those values are high level abstractions of the spectral surface, ordered by degree of importance.
     */
    timbre: number[];
};
export type SpotifyAnalysis = {
    /**
     * - Metadata for the audio analysis
     */
    meta: SpotifyAnalysisMeta;
    track: SpotifyAnalysisTrack;
    /**
     * - The time intervals of the bars throughout the track. A bar (or measure) is a segment of time defined as a given number of beats.
     */
    bars: SpotifyAnalysisTimeIntervals[];
    /**
     * - The time intervals of beats throughout the track. A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums.
     */
    beats: SpotifyAnalysisTimeIntervals[];
    /**
     * - A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments).
     */
    tatums: SpotifyAnalysisTimeIntervals[];
    /**
     * - Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc.
     */
    sections: SpotifyAnalysisSections[];
    /**
     * - Each segment contains a roughly conisistent sound throughout its duration
     */
    segments: SpotifyAnalysisSegments[];
};
export type SpotifyAudioFeatures = {
    /**
     * - A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
     */
    acousticness: number;
    /**
     * - A URL to access the full audio analysis of this track. An access token is required to access this data.
     */
    analysis_url: number;
    /**
     * - Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
     */
    danceability: number;
    /**
     * - The duration of the track in milliseconds
     */
    duration_ms: number;
    /**
     * - Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
     */
    energy: number;
    /**
     * - The Spotify ID for the track
     */
    id: number;
    /**
     * - Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
     */
    instrumentalness: number;
    /**
     * - The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
     */
    key: number;
    /**
     * - Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
     */
    liveness: number;
    /**
     * - The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.
     */
    loudness: number;
    /**
     * - Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
     */
    mode: number;
    /**
     * - Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
     */
    speechiness: number;
    /**
     * - The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
     */
    tempo: number;
    /**
     * - An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".
     */
    time_signature: number;
    /**
     * - A link to the Web API endpoint providing full details of the track
     */
    track_href: number;
    /**
     * - Always `audio_features`
     */
    type: number;
    /**
     * - The Spotify URI for the track
     */
    uri: number;
    /**
     * - A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
     */
    valence: number;
};
//# sourceMappingURL=types.d.ts.map