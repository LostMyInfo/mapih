/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString } = require('../../resources/functions');
const { handler } = require('../../resources/handlers');

/**
 * @module drives
 */

module.exports = {

  /**
   * @summary
   * ### [Get Shared Drive's Metadata]{@link https://developers.google.com/drive/api/reference/rest/v3/drives/get}
   * 
   * @example
   * await api.google.drive.drives.retrieve('asdf1234')
   * 
   * @function retrieve
   * @memberof module:drives#
   * @param {string} drive_id
   * @param {Object} [options]
   * @param {boolean} [options.admin_access]
   * @returns {Promise<GoogleDriveDrive>}
   */
  retrieve: async (drive_id, { admin_access } = {}) =>
    handler({
      method: 'GET',
      endpoint: `drives/${drive_id}${admin_access ? '?useDomainAdminAccess=true' : ''}`,
      handler: 'drive'
    }),
  
  /**
   * @summary
   * ### [List User's Shared Drives]{@link https://developers.google.com/drive/api/reference/rest/v3/drives/list}
   * 
   * @example
   * await api.google.drive.drives.list()
   * 
   * @example
   * await api.google.drive.drives.list({
   *   query: 'name contains "confidential"',
   *   // query: 'memberCount >=20'
   *   // query: 'hidden = false'
   * });
   * 
   * @function list
   * @memberof module:drives#
   * @param {Object} [options]
   * @param {string} [options.query]
   * @param {string} [options.page_token]
   * @param {number} [options.page_size]
   * @param {boolean} [options.admin_access]
   * @returns {Promise<{nextPageToken: string, drives: GoogleDriveDrive[]}>}
   */
  list: async ({ query, page_token, page_size, admin_access } = {}) =>
    handler({
      method: 'GET',
      endpoint: buildQueryString('drives', {
        query,
        pageToken: page_token,
        pageSize: page_size,
        useDomainAdminAccess: admin_access
      }),
      handler: 'drive'
    }),
  
  /**
   * @summary
   * ### [Create A Shared Drive]{@link https://developers.google.com/drive/api/reference/rest/v3/drives/create}
   * 
   * @example
   * await api.google.drive.drives.create({
   *   id: '123abc',
   *   name: 'new shared drive',
   *   hidden: true
   * });
   * 
   * @function create
   * @memberof module:drives#
   * @param {Object} options
   * @param {string} options.id
   * @param {string} options.name
   * @param {string} [options.colorRgb]
   * @param {string} [options.theme_id]
   * @param {GoogleDriveBackgroundImage} [options.background_image_file]
   * @param {boolean} [options.hidden]
   * @returns {Promise<GoogleDriveDrive>}
   */
  create: async (options) =>
    handler({
      method: 'POST',
      endpoint: `drives?requestId=${options.id}`,
      body: {
        name: options.name,
        colorRgb: options.colorRgb,
        themeId: options.theme_id,
        backgroundImageFile: options.background_image_file,
        hidden: options.hidden
      },
      handler: 'drive'
    }),
  
  /**
   * @summary
   * ### [Update A Shared Drive]{@link https://developers.google.com/drive/api/reference/rest/v3/drives/update}
   * 
   * @example
   * await api.google.drive.drives.update({
   *   drive_id: '123abc',
   *   name: 'new shared drive',
   *   hidden: true
   * });
   * 
   * @function update
   * @memberof module:drives#
   * @param {Object} options
   * @param {string} options.drive_id
   * @param {boolean} [options.admin_access]
   * @param {string} [options.name]
   * @param {string} [options.colorRgb]
   * @param {string} [options.theme_id]
   * @param {GoogleDriveBackgroundImage} [options.background_image_file]
   * @param {boolean} [options.hidden]
   * @returns {Promise<GoogleDriveDrive>}
   */
  update: async (options) =>
    handler({
      method: 'PATCH',
      endpoint: `drives/${options.drive_id}${options.admin_access ? '?useDomainAdminAccess=true' : ''}`,
      body: {
        name: options.name,
        colorRgb: options.colorRgb,
        themeId: options.theme_id,
        backgroundImageFile: options.background_image_file,
        hidden: options.hidden
      },
      handler: 'drive'
    }),
  
  /**
   * @summary
   * ### [Delete A Shared Drive]{@link https://developers.google.com/drive/api/reference/rest/v3/drives/delete}
   * 
   * @example
   * await api.google.drive.drives.delete({
   *   drive_id: '123abc'
   * });
   * 
   * @function delete
   * @memberof module:drives#
   * @param {Object} options
   * @param {string} options.drive_id
   * @param {boolean} [options.admin_access]
   * @param {boolean} [options.allow_item_deletion]
   * @returns {Promise<GoogleDriveDrive>}
   */
  delete: async (options) =>
    handler({
      method: 'DELETE',
      endpoint: buildQueryString(`drives/${options.drive_id}`, {
        useDomainAdminAccess: options.admin_access,
        allowItemDeletion: options.allow_item_deletion
      }),
      handler: 'drive'
    }),
  
  /**
   * @summary
   * ### [Hide A Shared Drive From Default View]{@link https://developers.google.com/drive/api/reference/rest/v3/drives/hide}
   * 
   * @example
   * await api.google.drive.drives.hide('abc123');
   * 
   * @function hide
   * @memberof module:drives#
   * @param {string} drive_id
   * @returns {Promise<GoogleDriveDrive>}
   */
  hide: async (drive_id) =>
    handler({
      method: 'POST',
      endpoint: `drives/${drive_id}/hide`,
      handler: 'drive'
    }),
  
  /**
   * @summary
   * ### [Restores A Shared Drive To The Default View]{@link https://developers.google.com/drive/api/reference/rest/v3/drives/unhide}
   * 
   * @example
   * await api.google.drive.drives.unhide('abc123');
   * 
   * @function unhide
   * @memberof module:drives#
   * @param {string} drive_id
   * @returns {Promise<GoogleDriveDrive>}
   */
  unhide: async (drive_id) =>
    handler({
      method: 'POST',
      endpoint: `drives/${drive_id}/unhide`,
      handler: 'drive'
    })

};