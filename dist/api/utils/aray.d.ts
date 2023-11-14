/**
 *
 * @param {Object} params
 * @param {string | number} params.index
 * @param {*} params.value
 * @param {number} [params.ttl]
 * @returns {Promise<boolean>}
 */
export function put(params: {
    index: string | number;
    value: any;
    ttl?: number | undefined;
}): Promise<boolean>;
/**
 *
 * @param {Object} params
 * @param {string | number} params.index
 * @returns {Promise<?*>}
 */
export function get(params: {
    index: string | number;
}): Promise<any>;
export function remove(params: any): Promise<unknown>;
//# sourceMappingURL=aray.d.ts.map