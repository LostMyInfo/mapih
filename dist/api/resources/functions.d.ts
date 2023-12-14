export type Method = 'get' | 'post' | 'put' | 'patch' | 'del';
/**
 * @ignore
 * @param {Embed[]} embeds
 * @returns {Embed[]}
 */
export function embedModifier(embeds: Embed[]): Embed[];
/**
 *
 * @param {Snowflake} userID
 * @param {?string} avatarID
 * @param {Snowflake} [guildID]
 * @param {?string} [memberAvatarID]
 * @returns {string}
 */
export function avatarFromObject(userID: Snowflake, avatarID: string | null, guildID?: string | undefined, memberAvatarID?: string | null | undefined): string;
/**
 * @ignore
 * @param {?number} flags
 * @returns {string[]}
 */
export function getBadges(flags: number | null): string[];
/**
 * @param {number} permissions
 * @returns {string[]}
 */
export function parsePermissions(permissions: number): string[];
/**
 * @example
 * ```js
 * generateCDN(params.guild, 'icon');
 * generateCDN(params, 'banner');
 * generateCDN(params, 'splash');
 * ```
 * @param {Guild | User | Role} object
 * @param {'icon' | 'banner' | 'splash' | 'discovery_splash'} media
 * @param {'128' | '256' | '512' | '1024' | '4096'} [size]
 * @param {string} x
 * @returns {string | undefined} url
 */
export function generateCDN(object: Guild | User | Role, media: 'icon' | 'banner' | 'splash' | 'discovery_splash', size?: "128" | "256" | "512" | "1024" | "4096" | undefined, x?: string): string | undefined;
/**
 * Validates an image URL
 * @param {string|undefined} url
 * @param {'image'|'audio'|'video'} [content_type]
 * @param {number} [timeout]
 * @returns {Promise<boolean|undefined>}
 */
export function isValidMediaURL(url: string | undefined, content_type?: "audio" | "video" | "image" | undefined, timeout?: number | undefined): Promise<boolean | undefined>;
/**
 * ### Takes an image URL or buffer of any type and returns a buffer or string.
 * - Image URL to buffer
 * - Image URL to UTF-8/binary/base64 encoded buffer
 * - Image URL to base64 encoded data string
 * - Any buffer to base64 data string
 * @param {string|Buffer|undefined} media
 * @param {'base64string'|'base64'|'utf-8'|'binary'|'binarystring'} [encoding]
 * @param {boolean} [datastringbuffer]
 * @returns {Promise<{data: Buffer | string | undefined, type: string | null | undefined}>}
 */
export function imageData(media: string | Buffer | undefined, encoding?: "utf-8" | "base64" | "binary" | "base64string" | "binarystring" | undefined, datastringbuffer?: boolean | undefined): Promise<{
    data: Buffer | string | undefined;
    type: string | null | undefined;
}>;
/**
 * Validates an image buffer
 * @param {Buffer} buffer
 * @param {'image'|'audio'} [media_type]
 * @returns {boolean}
 */
export function isValidMediaBuffer(buffer: Buffer, media_type?: "audio" | "image" | undefined): boolean;
/**
 * Validates an image as URL or buffer
 * @param {string | Buffer | undefined} media
 * @param {'audio' | 'image'} [media_type]
 * @returns {Promise<?boolean>}
 */
export function isValidMedia(media: string | Buffer | undefined, media_type?: "audio" | "image" | undefined): Promise<boolean | null>;
/**
 * @function resizeImage resizes a PNG to 320px x 320px as required by Discord to use as a sticker.
 * @param {Buffer} buffer
 * @param {string} type
 * @param {number} [width=320]
 * @param {number} [height=320]
 * @param {number} [MAX_SIZE = 524288]
 * @returns {Promise<{image: Buffer} | {image: Buffer, startSize: number, startHeight: number, startWidth: number, finishSize: number, finishHeight: number, finishWidth: number}>}
 */
export function resizeImage(buffer: Buffer, type: string, width?: number | undefined, height?: number | undefined, MAX_SIZE?: number | undefined): Promise<{
    image: Buffer;
} | {
    image: Buffer;
    startSize: number;
    startHeight: number;
    startWidth: number;
    finishSize: number;
    finishHeight: number;
    finishWidth: number;
}>;
/**
 * @param {string|number} value
 * @param {boolean} snowflake
 * @param {'relative'|'date'|'full'|'all'|undefined} [style]
 * @returns {string}
 */
export function retrieveDate(value: string | number, snowflake: boolean, style?: 'relative' | 'date' | 'full' | 'all' | undefined): string;
/**
 * Validates a payload as JSON
 * @param {string} payload
 * @returns {boolean}
 */
export function isValidJSON(payload: string): boolean;
/**
 * @param {ExtendedInvite & Channel & Message & ExtendedUser & User & Member & ThreadMember & Interaction} payload
 * @returns
 */
export function extendPayload(payload: ExtendedInvite & Channel & Message & ExtendedUser & User & Member & ThreadMember & Interaction): ExtendedInvite & Channel & Message & ExtendedUser & User & Member & ThreadMember & Interaction;
/**
 * API Handler Creator
 * @param {Object} options
 * @param {Method} options.method
 * @param {string} options.endpoint
 * @param {Object} [options.body]
 * @returns {Promise<*>}
 * @private
 */
export function slackHandler(options: {
    method: Method;
    endpoint: string;
    body?: Object | undefined;
}): Promise<any>;
/**
 * API Handler Creator
 * @param {Object} options
 * @param {Method} options.method
 * @param {string} options.endpoint
 * @param {Object} [options.body]
 * @returns {Promise<*>}
 * @private
 */
export function spotifyHandler(options: {
    method: Method;
    endpoint: string;
    body?: Object | undefined;
}): Promise<any>;
/**
 * @param {string} url
 * @param {Object} params
 * @param {boolean} encode
 * @returns {string}
 */
export function buildQueryString(url: string, params: Object, encode?: boolean): string;
/**
 * @param {string} type
 * @returns {string}
 */
export function token(type: string): string;
export declare function attemptHandler(params: {
    method: Method;
    endpoint: string;
    body?: Object | undefined;
}): Promise<any>;
export declare function sendAttachment(params: any, path: string, method: Method): Promise<any>;
export function getAppId(): Promise<any>;
//# sourceMappingURL=functions.d.ts.map