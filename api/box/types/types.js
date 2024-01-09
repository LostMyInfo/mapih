/**
 * @typedef {Object} BoxCollection
 * @property {number} total_count
 * @property {number} limit
 * @property {number} offset
 * @property {{by: 'string', direction: string}[]} order
 * @property {BoxEntry[]} entries
 */

/**
 * @typedef {Object} BoxEntry
 * @property {number} id
 * @property {number} etag
 * @property {string} type
 * @property {number} sequence_id
 * @property {string} name
 */