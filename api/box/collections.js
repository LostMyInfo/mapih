/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString } = require('../resources/functions');
const { handler } = require('../resources/handlers');

/**
 * @file All Box API endpoints relating to collections
 * @module collections
 */

module.exports = {

  /**
   * @summary
   * ### [List all collections]{@link https://developer.box.com/reference/get-collections}
   * @example
   * await api.box.collections.list({
   *   fields: ['id', 'type', 'name'],
   *   limit: 5
   * });
   * 
   * @function list
   * @memberof module:collections#
   * @param {Object} [options]
   * @param {string[]} [options.fields] - Attributes to include in the response. This can be used to request fields that are not normally returned in a standard response.
   * @param {number} [options.limit] - The maximum number of items to return per page (max: 1000)
   * @param {number} [options.offset] - The offset of the item at which to begin the response (default 0)
   * @returns {Promise<BoxCollection>}
   */
  list: async (options) => 
    handler({
      method: 'GET',
      endpoint: buildQueryString('collections', {
        fields: options?.fields ?? undefined,
        limit: options?.limit ?? undefined,
        offset: options?.offset ?? 0
      }),
      handler: 'box'
    })
};