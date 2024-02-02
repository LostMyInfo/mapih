/**
 * @param {string} object
 * @param {any} item
 * @param {boolean} [top_tracks]
 * @returns {SpotifyImages|undefined}
 */
export function buildImages(object: string, item: any, top_tracks?: boolean | undefined): SpotifyImages | undefined;
/**
 * @param {string} object
 * @param {any} payload
 * @param {string} [sort]
 * @returns {SpotifyReturn|SpotifyTrack[]}
 */
export function buildSpotifyResponse(object: string, payload: any, sort?: string | undefined): SpotifyReturn | SpotifyTrack[];
/**
 * @param {any} payload
 * @param {string} [sort]
 * @param {string} [property]
 * @param {any} [artists]
 * @returns {SpotifyArtist[]}
 */
export function buildArtists(payload: any, sort?: string | undefined, property?: string | undefined, artists?: any): SpotifyArtist[];
/**
 * @param {any} payload
 * @returns {SpotifyAlbum|undefined}
 */
export function buildAlbum(payload: any): SpotifyAlbum | undefined;
/**
 *
 * @param {any} payload
 * @param {any} albums
 * @returns {SpotifyAlbum[]|undefined}
 */
export function buildAlbums(payload: any, albums?: any): SpotifyAlbum[] | undefined;
/**
 * @param {any} payload
 * @param {string} method
 * @returns
 */
export function playbackStruct(payload: any, method: string): any;
/**
 * @param {any} payload
 * @param {string} [item]
 * @returns {SpotifyTrack}
 */
export function buildTrack(payload: any, item?: string | undefined): SpotifyTrack;
/**
 *
 * @param {any} payload
 * @param {string} [sort]
 * @param {any} [tracks]
 * @returns {SpotifyTrack[]|undefined}
 */
export function buildTrackList(payload: any, sort?: string | undefined, tracks?: any): SpotifyTrack[] | undefined;
/**
 * @param {any} payload
 * @param {boolean} [shortTrack]
 * @param {any} [playlists]
 * @returns {any}
 */
export function buildPlaylists(payload: any, shortTrack?: boolean | undefined, playlists?: any): any;
/**
 * @param {any} user
 * @returns {SpotifyUser|undefined}
 */
export function buildUser(user: any): SpotifyUser | undefined;
/**
 * @param {any} fields
 * @returns {string}
 */
export function fieldsToString(fields: any): string;
/**
 * @param {string} query
 * @param {'tracks'|'artists'|'albums'} type
 * @param {boolean} [throwErr]
 * @returns {Promise<string|undefined>}
 */
export function find(query: string, type: 'tracks' | 'artists' | 'albums', throwErr?: boolean | undefined): Promise<string | undefined>;
export declare const genres: string[];
//# sourceMappingURL=functions.d.ts.map