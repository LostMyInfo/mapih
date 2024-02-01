/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { handler } = require('../../resources/handlers');

/**
 * @module about
 */

module.exports = {

  /**
   * @summary
   * ### [Get Information About The User]{@link https://developers.google.com/drive/api/reference/rest/v3/about/get}
   * 
   * @example
   * await api.google.drive.about()
   * 
   * @function about
   * @memberof module:about#
   * @returns {Promise<GoogleDriveAbout>}
   */
  about: async () =>
    handler({
      method: 'GET',
      endpoint: 'about?fields=*',
      handler: 'drive'
    })

};