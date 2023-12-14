/**
 * @param {Object} options
 * @param {string} [options.artist]
 * @param {string} [options.song]
 * @param {string} [options.album]
 * @param {number} [options.limit]
 * @param {number} [options.offset]
 * @param {string} [options.sort]
 * @returns {Promise<SpotifyReturn>}
*/
export function search(options: {
    artist?: string | undefined;
    song?: string | undefined;
    album?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort?: string | undefined;
}): Promise<SpotifyReturn>;
/**
 *
 * @param {Object} options
 * @param {string} options.artist
 * @param {number} [options.limit]
 * @param {number} [options.offset]
 * @param {string} [options.sort]
 * @returns {Promise<SpotifySearchArtistReturn>}
 */
export function artists(options: {
    artist: string;
    limit?: number | undefined;
    offset?: number | undefined;
    sort?: string | undefined;
}): Promise<SpotifySearchArtistReturn>;
/**
 *
 * @param {Object} options
 * @param {string} options.song
 * @param {string} [options.artist]
 * @param {number} [options.limit]
 * @param {number} [options.offset]
 * @param {string} [options.sort]
 * @returns
 */
export function songs(options: {
    song: string;
    artist?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort?: string | undefined;
}): Promise<SpotifyReturn>;
//# sourceMappingURL=search.d.ts.map