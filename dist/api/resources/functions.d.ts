export type ErrorObject = {
    status: string | number;
    message: string;
    success: boolean;
    error?: any;
};
export type Method = 'get' | 'post' | 'put' | 'patch' | 'del';
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
 * @returns {Promise<boolean>}
 */
export function isValidMediaURL(url: string | undefined, content_type?: "audio" | "video" | "image" | undefined, timeout?: number | undefined): Promise<boolean>;
/**
   * ### Takes an image URL or buffer of any type and returns a buffer or string.
   * - Image URL to buffer
   * - Image URL to UTF-8/binary/base64 encoded buffer
   * - Image URL to base64 encoded data string
   * - Any buffer to base64 data string
   * @param {string|Buffer|undefined} media
   * @param {'base64string'|'base64'|'utf-8'|'binary'|'binarystring'} [encoding]
   * @param {boolean} [datastringbuffer]
   * @returns {Promise<{data: string | Buffer | undefined, type: string | undefined}>}
   */
export function imageData(media: string | Buffer | undefined, encoding?: "binary" | "base64" | "utf-8" | "base64string" | "binarystring" | undefined, datastringbuffer?: boolean | undefined): Promise<{
    data: string | Buffer | undefined;
    type: string | undefined;
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
 * @function resizePNG resizes a PNG to 320px x 320px as required by Discord to use as a sticker.
 * @param {Buffer} buffer
 * @param {'image/png' | 'image/gif'} type
 * @param {number} [width=320]
 * @param {number} [height=320]
 * @param {number} [MAX_SIZE = 524288]
 * @returns {Promise<{image: Buffer} | {image: Buffer, startSize: number, startHeight: number, startWidth: number, finishSize: number, finishHeight: number, finishWidth: number}>}
 */
export function resizeImage(buffer: Buffer, type: 'image/png' | 'image/gif', width?: number | undefined, height?: number | undefined, MAX_SIZE?: number | undefined): Promise<{
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
 * @returns {string|Date|{timestamp: number, date: string, relative: string, full: string}}
 */
export function retrieveDate(value: string | number, snowflake: boolean, style?: 'relative' | 'date' | 'full' | 'all' | undefined): string | Date | {
    timestamp: number;
    date: string;
    relative: string;
    full: string;
};
/**
 * Validates a payload as JSON
 * @param {Object} payload
 * @returns {boolean}
 */
export function isValidJSON(payload: Object): boolean;
/**
 *
 * @param {Object} payload
 * @returns
 */
export function extendPayload(payload: Object): Object;
export function returnErr(r: any): {
    statusCode: any;
    message: any;
};
/**
 * @typedef {Object} ErrorObject
 * @property {string|number} status
 * @property {string} message
 * @property {boolean} success
 * @property {*} [error]
 */
/**
 * @param {AxiosError} error
 * @returns {ErrorObject}
 */
export function getAxiosError(error: AxiosError): ErrorObject;
import { AxiosError } from "axios";
export declare function attemptHandler(params: {
    method: Method;
    path: string;
    body?: Object | undefined;
    reason?: string | undefined;
}): Promise<any>;
export declare function sendAttachment(params: Object, path: string, method: Method): Promise<any>;
//# sourceMappingURL=functions.d.ts.map