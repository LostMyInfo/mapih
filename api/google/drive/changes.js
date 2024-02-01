/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString } = require('../../resources/functions');
const { handler } = require('../../resources/handlers');

/**
 * @module changes
 */

module.exports = {
 
  /**
   * @summary
   * ### [Get Starting Page Token]{@link https://developers.google.com/drive/api/reference/rest/v3/changes/getStartPageToken}
   *
   * @example
   * await api.google.drive.apps.retrieve('12345abcde')
   * 
   * @function getStartPageToken
   * @memberof module:changes#
   * @param {Object} options
   * @param {string} options.drive_id - The ID of the shared drive for which the starting pageToken for listing future changes from that shared drive will be returned
   * @param {boolean} [options.supports_all_drives] - Whether the requesting application supports both My Drives and shared drives
   * @returns {Promise<string>}
   */
  getStartPageToken: async (options) =>
    (await handler({
      method: 'GET',
      endpoint: buildQueryString('changes/startPageToken', {
        driveId: options.drive_id,
        supportsAllDrives: options.supports_all_drives || true
      }),
      handler: 'drive'
    }))?.startPageToken,

  /**
   * @summary
   * ### [List Changes For User Or Shared Drive]{@link https://developers.google.com/drive/api/reference/rest/v3/changes/list}
   *
   * @example
   * await api.google.drive.changes.list({
   *   page_token: 
   * });
   * 
   * @function list
   * @memberof module:changes#
   * @param {Object} options
   * @param {string} options.page_token - The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.
   * @param {string} [options.drive_id] - The shared drive from which changes will be returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier.
   * @param {number} [options.page_size] - The maximum number of changes to return per page
   * @param {boolean} [options.include_corpus_removals] - Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file
   * @param {boolean} [options.include_all_drives] - Whether both My Drive and shared drive items should be included in results
   * @param {boolean} [options.include_removed] - Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access
   * @param {boolean} [options.restrict_to_my_drive] - Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive.
   * @param {boolean} [options.supports_all_drives] - Whether the requesting application supports both My Drives and shared drives
   * @param {string[]} [options.spaces] - An array of spaces to query within the corpora. Supported values are `drive` and `appDataFolder`.
   * @param {string} [options.include_permissions] - Specifies which additional view's permissions to include in the response. Only `published` is supported.
   * @param {string[]} [options.include_labels] - An array of IDs of labels to include in the `labelInfo` part of the response
   * @returns {Promise<{kind: string, nextPageToken: string, newStartPageToken: string, changes: GoogleDriveChange[]}>}
   */
  list: async (options) =>
    handler({
      method: 'GET',
      endpoint: buildQueryString('changes', {
        driveId: options.drive_id,
        pageToken: options.page_token,
        pageSize: options.page_size,
        restrictToMyDrive: options.restrict_to_my_drive,
        spaces: options.spaces?.join(','),
        includeItemsFromAllDrives: options.include_all_drives || true,
        includeRemoved: options.include_removed || true,
        includeCorpusRemovals: options.include_corpus_removals || true,
        includeLabels: options.include_labels?.join(','),
        includePermissionsForView: options.include_permissions,
        supportsAllDrives: options.supports_all_drives

      }),
      handler: 'drive'
    }),
    
  /**
   * @summary
   * ### [Subscribe To Changes For A User]{@link https://developers.google.com/drive/api/reference/rest/v3/changes/watch}
   *
   * @example
   * await api.google.drive.changes.watch({
   *   page_token: 
   * });
   * 
   * @function watch
   * @memberof module:changes#
   * @param {Object} options
   * @param {string} options.id
   * @param {string} options.resource_id
   * @param {string} options.resource_uri
   * @param {string} options.type
   * @param {string} options.address
   * @param {string} options.page_token - The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.
   * @param {{[x: string]: string}} [options.params]
   * @param {string} [options.token]
   * @param {string} [options.expiration]
   * @param {boolean} [options.payload]
   * @param {string} [options.drive_id] - The shared drive from which changes will be returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier.
   * @param {number} [options.page_size] - The maximum number of changes to return per page
   * @param {boolean} [options.include_corpus_removals] - Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file
   * @param {boolean} [options.include_all_drives] - Whether both My Drive and shared drive items should be included in results
   * @param {boolean} [options.include_removed] - Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access
   * @param {boolean} [options.restrict_to_my_drive] - Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive.
   * @param {boolean} [options.supports_all_drives] - Whether the requesting application supports both My Drives and shared drives
   * @param {string[]} [options.spaces] - An array of spaces to query within the corpora. Supported values are `drive` and `appDataFolder`.
   * @param {string} [options.include_permissions] - Specifies which additional view's permissions to include in the response. Only `published` is supported.
   * @param {string[]} [options.include_labels] - An array of IDs of labels to include in the `labelInfo` part of the response
   * @returns {Promise<GoogleDriveChannel>}
   */
  watch: async (options) =>
    handler({
      method: 'POST',
      endpoint: buildQueryString('changes/watch', {
        driveId: options.drive_id,
        pageToken: options.page_token,
        pageSize: options.page_size,
        restrictToMyDrive: options.restrict_to_my_drive,
        spaces: options.spaces?.join(','),
        includeItemsFromAllDrives: options.include_all_drives || true,
        includeRemoved: options.include_removed || true,
        includeCorpusRemovals: options.include_corpus_removals || true,
        includeLabels: options.include_labels?.join(','),
        includePermissionsForView: options.include_permissions,
        supportsAllDrives: options.supports_all_drives
      }),
      body: {
        id: options.id,
        resourseId: options.resource_id,
        resourceUri: options.resource_uri,
        type: options.type,
        address: options.address,
        params: options.params,
        token: options.token,
        expiration: options.expiration,
        payload: options.payload
      },
      handler: 'drive'
    }),
  
  /**
   * @summary
   * ### [Stop Watching Resources Through A Channel]{@link https://developers.google.com/drive/api/reference/rest/v3/channels/stop}
   *
   * @example
   * await api.google.drive.changes.stop({
   *   page_token: 
   * });
   * 
   * @function stop
   * @memberof module:changes#
   * @param {Object} options
   * @param {string} options.id
   * @param {string} options.resource_id
   * @param {string} options.resource_uri
   * @param {string} options.type
   * @param {string} options.address
   * @param {{[x: string]: string}} [options.params]
   * @param {string} [options.token]
   * @param {string} [options.expiration]
   * @param {boolean} [options.payload]
   * @returns {Promise<void>}
   */
  stop: async (options) =>
    handler({
      method: 'POST',
      endpoint: 'channels/stop',
      body: {
        id: options.id,
        resourseId: options.resource_id,
        resourceUri: options.resource_uri,
        type: options.type,
        address: options.address,
        params: options.params,
        token: options.token,
        expiration: options.expiration,
        payload: options.payload
      },
      handler: 'drive'
    })

};