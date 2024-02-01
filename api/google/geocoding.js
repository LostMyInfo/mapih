/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { token } = require('../resources/handlers');
const { handler } = require('../resources/handlers');
const { https } = require('../utils/https');

/**
 * @module geocoding
 */

module.exports = {

  /**
   * @summary
   * ### [Convert Address To Coordinates]{@link https://developers.google.com/maps/documentation/geocoding/requests-geocoding}
   * 
   * @example
   * await api.google.geocoding('123 sesame street')
   * 
   * @function geocoding
   * @memberof module:geocoding#
   * @param {string} address
   * @returns {Promise<GoogleGeocodingResult>}
   */
  geocoding: async (address) => 
    (await https({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${token('google', 'google')}&address=${encodeURIComponent(address)}`
    }))?.results
};

