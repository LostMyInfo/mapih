export function retrieve({ artist_name, artist_id }: {
    artist_name?: string | undefined;
    artist_id?: string | undefined;
}): Promise<SpotifyArtist>;
export function retrieveMany({ artist_ids, artist_names, sort }: {
    artist_names?: string[] | undefined;
    artist_ids?: string[] | undefined;
    sort?: string | undefined;
}, artists?: string[] | undefined, unknowns?: string[] | undefined): Promise<{
    total: number;
    found: number;
    message?: string | undefined;
    artists: SpotifyArtist[] | undefined;
}>;
export function topSongs({ artist_name, artist_id, market, limit }: {
    artist_name?: string | undefined;
    artist_id?: string | undefined;
    limit?: number | undefined;
    market?: string | undefined;
}): Promise<SpotifyTrack[] | undefined>;
export function albums(options?: {
    artist_name?: string | undefined;
    artist_id?: string | undefined;
    include_groups?: string[] | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    market?: string | undefined;
}): Promise<{
    total: number;
    limit: number;
    offset: number;
    albums: SpotifyAlbum[] | undefined;
}>;
export function related({ artist_id, artist_name, limit }: {
    artist_name?: string | undefined;
    artist_id?: string | undefined;
    limit?: number | undefined;
}): Promise<SpotifyArtist[]>;
export function follow({ artist_ids, artist_names, type }: {
    type?: string | undefined;
    artist_names?: string[] | undefined;
    artist_ids?: string[] | undefined;
}, artists?: string[] | undefined, mapped?: {
    [x: string]: string;
} | undefined, followed?: {
    [x: string]: string;
} | undefined): Promise<{
    total: number | undefined;
    found: number;
    followed: {
        [x: string]: string;
    };
}>;
export function unFollow({ artist_ids, artist_names, type }: {
    type?: string | undefined;
    artist_names?: string[] | undefined;
    artist_ids?: string[] | undefined;
}, artists?: string[] | undefined, mapped?: {
    [x: string]: string;
} | undefined, unfollowed?: {
    [x: string]: string;
} | undefined): Promise<{
    total: number | undefined;
    found: number;
    unfollowed: {
        [x: string]: string;
    };
}>;
export function following(options?: {
    limit?: number | undefined;
    after?: string | undefined;
    sort?: string | undefined;
} | undefined): Promise<SpotifyReturn>;
export function isFollowing({ artist_ids, artist_names, type }: {
    type?: string | undefined;
    artist_names?: string[] | undefined;
    artist_ids?: string[] | undefined;
}, artists?: string[] | undefined, mapped?: {
    [x: string]: string;
} | undefined, following?: {
    [x: string]: string;
} | undefined): Promise<{
    total: number | undefined;
    found: number;
    following: {
        [x: string]: string;
    };
}>;
//# sourceMappingURL=artists.d.ts.map