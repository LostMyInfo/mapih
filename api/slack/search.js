// @ts-check
const { slackHandler, buildQueryString } = require('../resources/functions');

/**
 * @file All Slack API endpoints relating to searching
 * @module search
 */

module.exports = {

  /**
   * @summary
   * ### [Searches for messages and files matching a query]{@link https://api.slack.com/methods/search.all}
   * @example
   * await api.slack.search.all({
   *   query: 'something to look for',
   *   count: 10,
   *   highlight: true,
   *   page: 2
   * });
   * @memberof module:search#
   * @function all
   * @param {Object} params
   * @param {string} params.query - Search query. May contains booleans, etc.
	 * @param {number} [params.count] - Number of items to return per page (default 20)
   * @param {boolean} [params.highlight] - Whether to enable query highlight markers
   * @param {number} [params.page] - Page number of results to return (default 1)
   * @param {string} [params.sort] - Return matches sorted by either `score` or `timestamp` (default `score`)
   * @param {string} [params.sort_dir] - Change sort direction to ascending (`asc`) or descending (`desc`). Value should be one of `asc` or `desc`.
   * @param {string} [params.team_id] - Encoded team id to search in, required if org token is used
   * @returns {Promise<MatchResponse>}
   */
  all: async (params) => {
    const endpoint = buildQueryString('search.all', {
      query: params.query,
      count: params.count ?? 20,
      limit: params.highlight || false,
      page: params.page ?? 1,
      sort: params.sort ?? 'score',
      sort_dir: params.sort_dir ?? undefined,
      team_id: params.team_id ?? undefined
    });
    return slackHandler({
      method: 'GET',
      endpoint
    });
  },

  /**
   * @summary
   * ### [Searches for messages matching a query]{@link https://api.slack.com/methods/search.messages}
   * @example
   * await api.slack.search.messages({
   *   query: 'something to look for',
   *   count: 10,
   *   highlight: true,
   *   page: 2
   * });
   * @memberof module:search#
   * @function messages
   * @param {Object} params
   * @param {string} params.query - Search query
	 * @param {number} [params.count] - Number of items to return per page (default 20)
   * @param {string} [params.cursor] - Use this when getting results with cursormark pagination
   * @param {boolean} [params.highlight] - Whether to enable query highlight markers
   * @param {number} [params.page] - Page number of results to return (default 1)
   * @param {string} [params.sort] - Return matches sorted by either `score` or `timestamp` (default `score`)
   * @param {string} [params.sort_dir] - Change sort direction to ascending (`asc`) or descending (`desc`). Value should be one of `asc` or `desc`.
   * @param {string} [params.team_id] - Encoded team id to search in, required if org token is used
   * @returns {Promise<{ok: boolean, messages: { matches: Matches[], pagination: Pagination, paging: Paging, total: number }, query: string}>}
   */
  messages: async (params) => {
    const endpoint = buildQueryString('search.messages', {
      query: params.query,
      count: params.count ?? 20,
      cursor: params.cursor ?? undefined,
      limit: params.highlight || false,
      page: params.page ?? 1,
      sort: params.sort ?? 'score',
      sort_dir: params.sort_dir ?? undefined,
      team_id: params.team_id ?? undefined
    });
    return slackHandler({
      method: 'GET',
      endpoint
    });
  },

  /**
   * @summary
   * ### [Searches for files matching a query]{@link https://api.slack.com/methods/search.files}
   * @example
   * await api.slack.search.files({
   *   query: 'something to look for',
   *   count: 10,
   *   highlight: true,
   *   page: 2
   * });
   * @memberof module:search#
   * @function files
   * @param {Object} params
   * @param {string} params.query - Search query
	 * @param {number} [params.count] - Number of items to return per page (default 20)
   * @param {boolean} [params.highlight] - Whether to enable query highlight markers
   * @param {number} [params.page] - Page number of results to return (default 1)
   * @param {string} [params.sort] - Return matches sorted by either `score` or `timestamp` (default `score`)
   * @param {string} [params.sort_dir] - Change sort direction to ascending (`asc`) or descending (`desc`). Value should be one of `asc` or `desc`.
   * @param {string} [params.team_id] - Encoded team id to search in, required if org token is used
   * @returns {Promise<{ok: boolean, files: { matches: Matches[], pagination: Pagination, paging: Paging, total: number }, query: string}>}
   */
  files: async (params) => {
    const endpoint = buildQueryString('search.files', {
      query: params.query,
      count: params.count ?? 20,
      limit: params.highlight || false,
      page: params.page ?? 1,
      sort: params.sort ?? 'score',
      sort_dir: params.sort_dir ?? undefined,
      team_id: params.team_id ?? undefined
    });
    return slackHandler({
      method: 'GET',
      endpoint
    });
  }
};