/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString, removeFalsyFromObject } = require('../../resources/functions');
const { handler } = require('../../resources/handlers');

/**
 * @module files
 */

module.exports = {

  /**
   * @summary
   * ### [Get A File's Metadata]{@link https://developers.google.com/drive/api/reference/rest/v3/files/get}
   * 
   * @example
   * await api.google.drive.files.retrieve({
   *   file_id: 'asdf'
   * });
   * 
   * @function retrieve
   * @memberof module:files#
   * @param {Object} options
   * @param {string} options.file_id
   * @param {boolean} [options.acknowledge_abuse]
   * @param {boolean} [options.supports_all_drives]
   * @param {string} [options.include_permissions]
   * @param {string[]} [options.include_labels]
   * @returns {Promise<GoogleDriveFile>}
   */
  retrieve: async (options) =>
    handler({
      method: 'GET',
      endpoint: buildQueryString(`files/${options.file_id}`, {
        acknowledgeAbuse: options.acknowledge_abuse,
        supportsAllDrives: options.supports_all_drives,
        includePermissionsForView: options.include_permissions,
        includeLabels: options.include_labels?.join(',')
      }),
      handler: 'drive'
    }),
  
  /**
   * @summary
   * ### [Lists The User's Files]{@link https://developers.google.com/drive/api/reference/rest/v3/files/list}
   * 
   * @example
   * await api.google.drive.files.list({
   *   query: 'mimeType contains \'javascript\''
   * });
   * 
   * @function list
   * @memberof module:files#
   * @param {Object} [options]
   * @param {string} [options.drive_id] - ID of the shared drive to search
   * @param {string} [options.query] - A query for filtering the file results
   * @param {string} [options.type] - Bodies of items (files/documents) to which the query applies. Supported bodies are `user`, `domain`, `drive`, and `allDrives`. Prefer `user` or `drive` to `allDrives` for efficiency. By default, corpora is set to `user`. However, this can change depending on the filter set through the 'q' parameter.
   * @param {boolean} [options.trashed]
   * @param {boolean} [options.include_all_drives] - Whether both My Drive and shared drive items should be included in results
   * @param {string} [options.include_permissions] - Specifies which additional view's permissions to include in the response. Only 'published' is supported.
   * @param {string[]} [options.include_labels]
   * @param {string[]} [options.sort] - An array of sort keys. 
   * @param {number} [options.page_size] - The maximum number of comments to return per page
   * @param {string} [options.page_token] - The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.
   * @param {string[]} [options.spaces] - An array of spaces to query within the corpora. Supported values are `drive` and `appDataFolder`.
   * @param {boolean} [options.supports_all_drives] - Whether the requesting application supports both My Drives and shared drives
   * @returns {Promise<{nextPageToken: string, incompleteSearch: boolean, files?: GoogleDriveFile[], folders?: GoogleDriveFile[]} | undefined>}
   */
  list: async (options) =>
    buildFiles(await handler({
      method: 'GET',
      endpoint: buildQueryString('files', {
        q: options?.query,
        corpora: options?.type,
        includeItemsFromAllDrives: options?.include_all_drives,
        orderBy: options?.sort?.join(','),
        pageSize: options?.page_size,
        pageToken: options?.page_token,
        spaces: options?.spaces?.join(','),
        drive_id: options?.drive_id,
        supportsAllDrives: options?.supports_all_drives,
        includePermissionsForView: options?.include_permissions,
        includeLabels: options?.include_labels?.join(','),
        trashed: options?.trashed || false
      }),
      handler: 'drive'
    }))

};

/**
 * @param {*} payload 
 * @returns {{nextPageToken: string, incompleteSearch: boolean, files?: GoogleDriveFile[], folders?: GoogleDriveFile[]} | undefined}
 */
function buildFiles(payload) {
  if (!payload || !payload.files?.length) return;
  return removeFalsyFromObject({
    nextPageToken: payload.nextPageToken,
    incompleteSearch: payload.incompleteSearch,
    files: payload.files.filter((/** @type {GoogleDriveFile} */ x) => !/folder/i.test(x.mimeType)),
    folders: payload.files.filter((/** @type {GoogleDriveFile} */ x) => /folder/i.test(x.mimeType))
  });

}