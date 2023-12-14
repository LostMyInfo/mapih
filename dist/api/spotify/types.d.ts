type SpotifyReturn = {
    /**
     * - The maximum number of items in the response
     */
    limit: number;
    /**
     * - The offset of the items returned (as set in the query or by default)
     */
    offset?: number | undefined;
    /**
     * - The total number of items available to return
     */
    total: number;
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
};
type SpotifyArtist = {
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
type SpotifyTrack = {
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
};
type SpotifyAlbum = {
    name: string;
    id: string;
    /**
     * - album, single, compilation
     */
    album_type: string;
    popularity: number;
    /**
     * - yyyy-mm
     */
    release_date: string;
    total_tracks: number;
    preview_url: string | null;
    /**
     * - The Spotify external URL for the object
     */
    spotify_url: string;
    uri: string;
    artists: SpotifyPartialArtist[];
    images?: SpotifyImages | undefined;
};
type SpotifyPartialArtist = {
    name: string;
    id: string;
    /**
     * - The Spotify external URL for the object
     */
    spotify_url: string;
    uri: string;
};
type SpotifyImages = {
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
//# sourceMappingURL=types.d.ts.map