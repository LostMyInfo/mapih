export declare function retrieve({ album_id, album_name }: {
    album_name?: string | undefined;
    album_id?: string | undefined;
}): Promise<SpotifyAlbum | undefined>;
export declare function retrieveMany({ album_ids, album_names, sort }: {
    album_names?: string | undefined;
    album_ids?: string | undefined;
    sort?: string | undefined;
}, albums?: string[] | undefined, unknowns?: string[] | undefined): Promise<{
    total: number;
    found: number;
    message?: string | undefined;
    albums: SpotifyAlbum[] | undefined;
}>;
export declare function songs({ album_id, album_name, sort, limit }: {
    album_name?: string | undefined;
    album_id?: string | undefined;
    sort?: string | undefined;
    limit?: number | undefined;
}, albums?: string[] | undefined, unknowns?: string[] | undefined): Promise<SpotifyTrack[] | undefined>;
export declare function _new({ limit, offset }: {
    limit?: number | undefined;
    offset?: number | undefined;
}): Promise<SpotifyAlbum[] | undefined>;
export { _new as new };
export declare function save({ album_ids, album_names }: {
    album_names?: string[] | undefined;
    album_ids?: string[] | undefined;
}, albums?: string[] | undefined, mapped?: {
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
export declare function unsave({ album_ids, album_names }: {
    album_names?: string[] | undefined;
    album_ids?: string[] | undefined;
}, albums?: string[] | undefined, mapped?: {
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
export declare function saved(options?: {
    limit?: number | undefined;
    offset?: string | undefined;
    sort?: string | undefined;
} | undefined): Promise<SpotifyReturn>;
export declare function isSaved({ album_ids, album_names }: {
    album_names?: string[] | undefined;
    album_ids?: string[] | undefined;
}, albums?: string[] | undefined, mapped?: {
    [x: string]: string;
} | undefined, saved?: {
    [x: string]: string | boolean;
} | undefined): Promise<{
    total: number | undefined;
    found: number;
    saved: {
        [x: string]: string | boolean;
    };
} | undefined>;
//# sourceMappingURL=albums.d.ts.map