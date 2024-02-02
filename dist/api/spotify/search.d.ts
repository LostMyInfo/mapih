export function advanced(options: {
    song?: string | undefined;
    artist?: string | undefined;
    album?: string | undefined;
    include?: string[] | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort?: string | undefined;
    year?: string | undefined;
    genre?: string | undefined;
    market?: string | undefined;
}): Promise<SpotifyReturn | undefined>;
export function artists(artist: string, options?: {
    limit?: number | undefined;
    offset?: number | undefined;
    sort?: string | undefined;
} | undefined): Promise<SpotifyReturn>;
export function songs(song: string, options?: {
    limit?: number | undefined;
    offset?: number | undefined;
    sort?: string | undefined;
} | undefined): Promise<any>;
//# sourceMappingURL=search.d.ts.map