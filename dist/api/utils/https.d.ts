/**
 * @example
 * await https('https://example.com');
 *
 * await https({
 *   method: 'GET',
 *   url: 'https://example.com'
 * })
 *
 * // Leaving out headers will default to 'application/json'
 * await https({
 *   method: 'POST',
 *   url: 'https://example.com',
 *   body: {
 *     stuff: 'things'
 *   }
 * })
 * @param {Object} params
 * @param {string} [params.url]
 * @param {string} [params.method]
 * @param {Object|string} [params.body]
 * @param {*|HeadersInit} [params.headers]
 * @returns
 */
export function https(params: {
    url?: string | undefined;
    method?: string | undefined;
    body?: string | Object | undefined;
    headers?: any | HeadersInit;
}): Promise<any>;
//# sourceMappingURL=https.d.ts.map