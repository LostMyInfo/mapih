export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
/**
 * API Handler Creator
 * @param {Object} options
 * @param {Method} options.method
 * @param {string} options.endpoint
 * @param {string} options.handler
 * @param {Headers} [options.headers]
 * @param {Object} [options.body]
 * @param {boolean} [options.oauth]
 * @param {string[]} [options.scope]
 * @param {string} [options.message]
 * @param {string} [options.errorMessage]
 * @param {string} [options.hint]
 * @param {any} [options.payload]
 * @param {string} [options.type]
 * @param {boolean} [options.formdata]
 * @param {string} [options.googleEndpoint]
 * @param {'json'|'text'|'arrayBuffer'|'blob'|'formData'} [options.response_type]
 * @returns {Promise<*>}
 * @private
 */
export function handler(options: {
    method: Method;
    endpoint: string;
    handler: string;
    headers?: Headers | undefined;
    body?: Object | undefined;
    oauth?: boolean | undefined;
    scope?: string[] | undefined;
    message?: string | undefined;
    errorMessage?: string | undefined;
    hint?: string | undefined;
    payload?: any;
    type?: string | undefined;
    formdata?: boolean | undefined;
    googleEndpoint?: string | undefined;
    response_type?: "formData" | "text" | "blob" | "json" | "arrayBuffer" | undefined;
}): Promise<any>;
/**
 * API Handler Creator
 * @param {Object} params
 * @param {Method} params.method
 * @param {string} params.endpoint
 * @param {Object} [params.body]
 * @param {?string} [params.reason]
 * @returns {Promise<*>}
 * @private
 */
export function attemptHandler(params: {
    method: Method;
    endpoint: string;
    body?: Object | undefined;
    reason?: string | null | undefined;
}): Promise<any>;
/**
 * API Handler Creator
 * @param {Object} options
 * @param {Method} options.method
 * @param {string} options.endpoint
 * @param {Headers} [options.headers]
 * @param {Object} [options.body]
 * @param {string} [options.type]
 * @returns {Promise<*>}
 * @private
 */
export function paypalHandler(options: {
    method: Method;
    endpoint: string;
    headers?: Headers | undefined;
    body?: Object | undefined;
    type?: string | undefined;
}): Promise<any>;
/**
 * Handles multipart form-data for Discord attachments
 * @param {*} params
 * @param {string} path
 * @param {Method} method
 * @private
 */
export function sendAttachment(params: any, path: string, method: Method): Promise<any>;
/**
 * @param {string} type
 * @param {string} handler
 * @returns {string|undefined}
 */
export function token(type: string, handler: string): string | undefined;
/**
 *
 * @param {'Slack' | 'Spotify' | 'Dropbox' | 'Box' | 'Google' | 'Imgur' | 'Twitter'} type
 * @param {string} handler
 * @param {string[]} [scope]
 * @param {string} [service]
 * @returns
 */
export function oauthToken(type: 'Slack' | 'Spotify' | 'Dropbox' | 'Box' | 'Google' | 'Imgur' | 'Twitter', handler: string, scope?: string[] | undefined, service?: string | undefined): Promise<any>;
/**
 * @param {'Slack' | 'Spotify' | 'Box' | 'Dropbox' | 'Google' | 'Imgur' | 'Twitter'} type
 * @param {?{channel_id: string}} [params]
 * @param {string} [handler]
 * @param {string} [service]
 */
export function authorize(type: 'Slack' | 'Spotify' | 'Box' | 'Dropbox' | 'Google' | 'Imgur' | 'Twitter', params?: {
    channel_id: string;
} | null | undefined, handler?: string | undefined, service?: string | undefined): Promise<string | Message>;
/**
 * @param {string} type
 * @param {string} [google]
 * @returns {Promise<string|undefined>}
 */
export function refresh(type: string, google?: string | undefined): Promise<string | undefined>;
/**
 * @param {string} key
 * @returns {Promise<?any>}
 */
export function getTokens(key: string): Promise<any | null>;
/**
 * @param {{key: string, value: any}} param0
 * @returns {Promise<void>}
 */
export function setTokens({ key, value }: {
    key: string;
    value: any;
}): Promise<void>;
//# sourceMappingURL=handlers.d.ts.map