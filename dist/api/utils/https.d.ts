/**
 * the `get` method. Https only, uses port: 443.
 * @example
 * ```js
 * await https.get({
 *   url: encodeURI('discord.com'),
 *   path: encodeURI(`/api/channels/${params.channel_id}`),
 *   headers: {
 *     'Content-Type': 'application/json',
 *      Authorization: `Bot ${process.env.token}`
 *   },
 *   body: ''
 * })
 * ```
 * @param {Object} params
 * @param {string} params.url
 * @param {string} [params.path]
 * @param {number} [params.port]
 * @param {*} [params.body]
 * @param {*} [params.headers]
 * @param {boolean} [params.rejectUnauthorized]
 * @returns any
 */
export function get(params: {
    url: string;
    path?: string | undefined;
    port?: number | undefined;
    body?: any;
    headers?: any;
    rejectUnauthorized?: boolean | undefined;
}): Promise<any>;
export function get80(params: any): Promise<any>;
export function post(params: any): Promise<any>;
export function put(params: any): Promise<any>;
export function patch(params: any): Promise<any>;
export function del(params: any): Promise<any>;
//# sourceMappingURL=https.d.ts.map