// @ts-check
const { handler } = require('../resources/handlers');
const { buildQueryString } = require('../resources/functions');

/**
 * @file All Slack API endpoints relating to files
 * @module files
 */

module.exports = {

  /**
   * @summary
   * ### [Gets information about a file]{@link https://api.slack.com/methods/files.info}
   * 
   * @example
   * await api.slack.files.info({
   *   file: 'F2147483862'
   * });
   * 
   * @memberof module:files#
   * @function info
   * @param {Object} params
   * @param {string} params.file
	 * @param {number} [params.count] - Number of items to return per page (default 100)
   * @param {string} [params.cursor] - Parameter for pagination. File comments are paginated for a single file. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`.
   * @param {number} [params.limit] - The maximum number of items to return (default 0)
   * @param {number} [params.page] - Page number of results to return (default 1)
   * @returns {Promise<{ok: boolean, file: SlackFile, comments: SlackComment[], response_metadata: { next_cursor: string }}>}
   */
  info: async (params) => 
    handler({
      method: 'GET',
      endpoint: buildQueryString('files.info', {
        file: params.file,
        count: params.count ?? 100,
        cursor: params.cursor ?? undefined,
        limit: params.limit ?? undefined,
        page: params.page ?? 1
      }),
      handler: 'slack'
    }),

  /**
   * @summary
   * ### [List for a team, in a channel, or from a user with applied filters]{@link https://api.slack.com/methods/files.list}
   * 
   * @example
   * await api.slack.files.list({
   *   channel: 'F2147483862',
   *   user: 'W1234567890',
   *   types: [images, gdocs]
   * });
   * 
   * @memberof module:files#
   * @function list
   * @param {Object} params
   * @param {string} [params.channel] - Filter files appearing in a specific channel, indicated by its ID
   * @param {string} [params.user] - Filter files created by a single user
	 * @param {boolean} [params.show_files_hidden_by_limit] - Show truncated file info for files hidden due to being too old, and the team who owns the file being over the file limit
   * @param {string} [params.team_id] - Encoded team id to list files in, required if org token is used
   * @param {Array<SlackFileTypes>} [params.type] - Filter files by type (default `all`)
   * @param {number} [params.page] - Page number of results to return (default 1)
   * @param {string} [params.ts_to] - Filter files created before this timestamp (inclusive)
   * @param {string} [params.ts_from] - Filter files created after this timestamp (inclusive)
   * @returns {Promise<{ok: boolean, files: SlackFile[], paging: { count: number, total: number, page: number, pages: number }}>}
   */
  list: async (params) =>
    handler({
      method: 'GET',
      endpoint: buildQueryString('files.list', {
        channel: params.channel ?? undefined,
        user: params.user ?? undefined,
        show_files_hidden_by_limit: params.show_files_hidden_by_limit || false,
        team_id: params.team_id ?? undefined,
        page: params.page ?? 1,
        type: params.type ?? undefined,
        ts_to: params.ts_to ?? undefined,
        ts_from: params.ts_from ?? undefined
      }),
      handler: 'slack'
    }),

  /**
   * @summary
   * ### [Deletes a file]{@link https://api.slack.com/methods/files.delete}
   * 
   * @example
   * await api.slack.files.delete({
   *   file: 'F2147483862'
   * });
   * 
   * @memberof module:files#
   * @function delete
   * @param {Object} params
   * @param {string} [params.file] - ID of file to delete
   * @returns {Promise<{ok: boolean}>}
   */
  delete: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'files.delete',
      body: {
        file: params.file
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Uploads or creates a file]{@link https://api.slack.com/methods/files.upload}
   * 
   * @example
   * await api.slack.files.upload({
   *   file: 'F2147483862'
   * });
   * 
   * @memberof module:files#
   * @function upload
   * @param {Object} params
   * @param {string} [params.file] - ID of file to delete
   * @returns {Promise<{ok: boolean}>}
   */
  /*
  upload: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'files.upload',
      body: {
        file: params.file
      }
    })
  */
  
  /**
   * @summary All functions relating to remote files
   * @memberof module:files
   * @namespace remote
   */
  remote: {

    /**
     * @summary
     * ### [Retrieve information about a remote file added to Slack]{@link https://api.slack.com/methods/files.remote.info}
     * 
     * @example
     * await api.slack.files.remote.info({
     *   file: 'F2147483862'
     * });
     * 
     * @memberof module:files#
     * @function info
     * @param {Object} params
     * @param {string} [params.file] - Specify a file by providing its ID
     * @param {number} [params.external_id] - Creator defined GUID for the file
     * @returns {Promise<{ok: boolean, file: SlackFile, comments: SlackComment[], response_metadata: { next_cursor: string }}>}
     */
    info: async (params) =>
      handler({
        method: 'GET',
        endpoint: buildQueryString('files.remote.info', {
          file: params.file ?? undefined,
          count: params.external_id ?? undefined
        }),
        handler: 'slack'
      }),

    /**
     * @summary
     * ### [Retrieve information about a remote file added to Slack]{@link https://api.slack.com/methods/files.remote.list}
     * 
     * @example
     * await api.slack.files.remote.list({
     *   channel: 'F2147483862',
     *   limit: 5
     * });
     * 
     * @memberof module:files#
     * @function list
     * @param {Object} params
     * @param {string} [params.channel] - Filter files appearing in a specific channel, indicated by its ID
     * @param {string} [params.cursor] - Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`
     * @param {number} [params.limit] - Show truncated file info for files hidden due to being to
     * @param {string} [params.ts_to] - Filter files created before this timestamp (inclusive)
     * @param {string} [params.ts_from] - Filter files created after this timestamp (inclusive)
     * @returns {Promise<{ok: boolean, files: SlackFileElement[], paging: { count: number, total: number, page: number, pages: number }}>}
     */
    list: async (params) =>
      handler({
        method: 'GET',
        endpoint: buildQueryString('files.remote.list', {
          channel: params.channel ?? undefined,
          user: params.cursor ?? undefined,
          team_id: params.limit ?? undefined,
          ts_to: params.ts_to ?? undefined,
          ts_from: params.ts_from ?? undefined
        }),
        handler: 'slack'
      })
  }
};