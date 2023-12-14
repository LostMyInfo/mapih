declare const _exports: Cache;
export = _exports;
/**
 * @callback
 */
declare class Cache {
    /**
     *
     * @param {Object} params
     * @param {string} params.key
     * @param {*} params.value
     * @param {number} [params.ttl]
     * @param {Function} [params.ttlCb]
     * @returns
     */
    put: ({ key, value, ttl, ttlCb }: {
        key: string;
        value: any;
        ttl?: number | undefined;
        ttlCb?: Function | undefined;
    }) => Promise<any>;
    /**
     *
     * @param {string} key
     * @returns {any}
     */
    get: (key: string) => any;
    /**
     * @param {string} key
     * @returns {Promise<boolean>}
     */
    delete: (key: string) => Promise<boolean>;
    clear: () => void;
    entries: () => any;
    keys: () => any;
    size: () => any;
    toJson: () => string;
    export: () => string;
}
//# sourceMappingURL=store.d.ts.map