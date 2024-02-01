/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString } = require('../../resources/functions');
const { handler } = require('../../resources/handlers');

/**
 * @module apps
 */

module.exports = {

  /**
   * @summary
   * ### [Get Information About A Specific App]{@link https://developers.google.com/drive/api/reference/rest/v3/apps/get}
   *
   * @example
   * await api.google.drive.apps.retrieve('12345abcde')
   * 
   * @function retrieve
   * @memberof module:apps#
   * @param {string} app_id
   * @returns {Promise<GoogleDriveApp>}
   */
  retrieve: async (app_id) =>
    handler({
      method: 'GET',
      endpoint: `apps/${app_id}`,
      handler: 'drive'
    }),
    
  /**
   * @summary
   * ### [List A User's Installed Apps]{@link https://developers.google.com/drive/api/reference/rest/v3/apps/list}
   *
   * @example
   * await api.google.drive.apps.list();
   * 
   * @example
   * await api.google.drive.apps.list({
   *   extensions: ['mp3', 'gif']
   * });
   * 
   * @function list
   * @memberof module:apps#
   * @param {Object} [options]
   * @param {string[]} [options.extensions] - An array of file extensions to limit returned results
   * @param {string[]} [options.mime_types] - An array of file MIME types to limit returned results
   * @param {string} [options.language_code]
   * @returns {Promise<GoogleDriveApp[]>}
   */
  list: async (options) =>
    (await handler({
      method: 'GET',
      endpoint: buildQueryString('apps', {
        appFilterExtensions: options?.extensions?.join(','),
        appFilterMimeTypes: options?.mime_types?.join(','),
        languageCode: options?.language_code
      }),
      handler: 'drive'
    }))?.items

};