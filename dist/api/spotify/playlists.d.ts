export function featured(options?: {
    limit?: number | undefined;
    offset?: number | undefined;
    country?: string | undefined;
} | undefined): Promise<SpotifyPlaylistReturn>;
export function category(category_id: string, options?: {
    limit?: number | undefined;
    offset?: number | undefined;
    country?: number | undefined;
} | undefined): Promise<SpotifyPlaylistReturn>;
export function create(options: {
    name: string;
    description?: string | undefined;
    public?: boolean | undefined;
    collaborative?: boolean | undefined;
}): Promise<SpotifyPlaylist | null>;
export function addSongs(options: {
    playlist_id: string;
    song_ids?: string[] | undefined;
    position?: number | undefined;
}): Promise<{
    snapshot_id: string;
}>;
export function update(options: {
    playlist_id: string;
    name?: string | undefined;
    description?: string | undefined;
    public?: boolean | undefined;
    collaborative?: boolean | undefined;
}): Promise<{
    body: {
        playlist_id: string;
        name?: string | undefined;
        description?: string | undefined;
        public?: boolean | undefined;
        collaborative?: boolean | undefined;
    };
    message: string;
    status: number;
    type: string;
}>;
export function updateSongs(options: {
    playlist_id: string;
    song_ids?: string[] | undefined;
    range_start?: number | undefined;
    range_length?: number | undefined;
    insert_before?: number | undefined;
    snapshot_id?: string | undefined;
}): Promise<{
    snapshot_id: string;
}>;
export function removeSongs(options: {
    playlist_id: string;
    uris: string[];
    snapshot_id?: string | undefined;
}): Promise<{
    snapshot_id: string;
}>;
export function retrieveSongs(options: {
    playlist_id: string;
    limit?: number | undefined;
    offset?: number | undefined;
    fields?: Object | undefined;
}): Promise<SpotifyPlaylist>;
export function created(options?: {
    limit?: number | undefined;
    offset?: number | undefined;
} | undefined): Promise<SpotifyPlaylistReturn>;
export function following(options?: {
    limit?: number | undefined;
    offset?: number | undefined;
} | undefined): Promise<SpotifyPlaylistReturn>;
export function user(user_id: string, options?: {
    limit?: number | undefined;
    offset?: number | undefined;
} | undefined): Promise<SpotifyPlaylistReturn>;
export function isFollowing(options: {
    playlist_id: string;
    user_ids: string[];
}): Promise<boolean[]>;
export function follow(playlist_id: string, public?: boolean | undefined): Promise<{
    statusText: number;
    type: string;
    message: string;
}>;
export function unFollow(playlist_id: string): Promise<{
    statusText: number;
    type: string;
    message: string;
}>;
export function updateCover(playlist_id: string, image: string): Promise<SpotifyImages | undefined>;
export function cover(playlist_id: string): Promise<SpotifyImages | undefined>;
//# sourceMappingURL=playlists.d.ts.map