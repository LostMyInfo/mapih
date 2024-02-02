export function retrieve({ song_name, song_id }: {
    song_name?: string | undefined;
    song_id?: string | undefined;
}): Promise<SpotifyTrack>;
export function retrieveMany({ song_ids, song_names, sort }: {
    song_names?: string[] | undefined;
    song_ids?: string[] | undefined;
    sort?: string | undefined;
}, songs?: string[] | undefined, unknowns?: string[] | undefined): Promise<{
    total: number;
    found: number;
    message?: string | undefined;
    tracks: SpotifyTrack[] | undefined;
} | undefined>;
export function recommendations(options: {
    artists?: string[] | undefined;
    genres?: string[] | undefined;
    songs?: string[] | undefined;
    limit?: number | undefined;
    min_acousticness?: number | undefined;
    max_acousticness?: number | undefined;
    target_acousticness?: number | undefined;
    min_danceability?: number | undefined;
    max_danceability?: number | undefined;
    target_danceability?: number | undefined;
    min_duration_ms?: number | undefined;
    max_duration_ms?: number | undefined;
    target_duration_ms?: number | undefined;
    min_energy?: number | undefined;
    max_energy?: number | undefined;
    target_energy?: number | undefined;
    min_instrumentalness?: number | undefined;
    max_instrumentalness?: number | undefined;
    target_instrumentalness?: number | undefined;
    min_key?: number | undefined;
    max_key?: number | undefined;
    target_key?: number | undefined;
    min_liveness?: number | undefined;
    max_liveness?: number | undefined;
    target_liveness?: number | undefined;
    min_loudness?: number | undefined;
    max_loudness?: number | undefined;
    target_loudness?: number | undefined;
    min_mode?: number | undefined;
    max_mode?: number | undefined;
    target_mode?: number | undefined;
    min_popularity?: number | undefined;
    max_popularity?: number | undefined;
    target_popularity?: number | undefined;
    min_speechiness?: number | undefined;
    max_speechiness?: number | undefined;
    target_speechiness?: number | undefined;
    min_tempo?: number | undefined;
    max_tempo?: number | undefined;
    target_tempo?: number | undefined;
    min_time_signature?: number | undefined;
    max_time_signature?: number | undefined;
    target_time_signature?: number | undefined;
    min_valence?: number | undefined;
    max_valence?: number | undefined;
    target_valence?: number | undefined;
}, artists?: string[] | undefined, tracks?: string[] | undefined, genres?: string[] | undefined): Promise<{
    seeds: SpotifyRecommendationSeed[];
    tracks: SpotifyTrack[] | undefined;
}>;
export function save({ song_ids, song_names }: {
    song_names?: string[] | undefined;
    song_ids?: string[] | undefined;
}, songs?: string[] | undefined, mapped?: {
    [x: string]: string;
} | undefined, saved?: {
    [x: string]: string;
} | undefined): Promise<{
    total: number | undefined;
    found: number;
    saved: {
        [x: string]: string;
    };
}>;
export function unsave({ song_ids, song_names }: {
    song_names?: string[] | undefined;
    song_ids?: string[] | undefined;
}, songs?: string[] | undefined, mapped?: {
    [x: string]: string;
} | undefined, removed?: {
    [x: string]: string;
} | undefined): Promise<{
    total: number | undefined;
    found: number;
    removed: {
        [x: string]: string;
    };
}>;
export function saved(options?: {
    limit?: number | undefined;
    offset?: string | undefined;
    sort?: string | undefined;
} | undefined): Promise<SpotifyReturn>;
export function isSaved(ids: string[], songs?: string[] | undefined, mapped?: {
    [x: string]: string;
} | undefined, saved?: {
    [x: string]: string | boolean;
} | undefined): Promise<{
    total: number;
    found: number;
    saved: {
        [x: string]: string | boolean;
    };
}>;
export function analyze({ song_id, song_name }: {
    song_id?: string | undefined;
    song_name?: string | undefined;
}): Promise<SpotifyAnalysis>;
export function audioFeatures({ song_id, song_name }: {
    song_id?: string | undefined;
    song_name?: string | undefined;
}): Promise<SpotifyAudioFeatures>;
export function audioFeaturesMany({ song_ids, song_names }: {
    song_ids?: string | undefined;
    song_names?: string | undefined;
}, songs?: string[] | undefined, unknowns?: string[] | undefined): Promise<{
    total: number | undefined;
    found: number;
    message: string | undefined;
    audio_features: SpotifyAudioFeatures[];
} | undefined>;
//# sourceMappingURL=songs.d.ts.map