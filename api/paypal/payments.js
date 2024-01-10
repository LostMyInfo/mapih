/* eslint-disable node/no-extraneous-require */
/* eslint-disable node/no-unsupported-features/node-builtins */
// @ts-check
'use-strict';
const { https } = require('../utils/https');
const storage = require('../utils/storage');


/**
 * @file PayPal payments endpoints
 * @module PayPalPayments
 */

module.exports = {

  /**
   * @returns {Promise<string>}
   */
  access_token: async () => {
    const credentials = require('../../Api').get_paypal_token();
    if (!credentials && !process.env.paypal_client_id && !process.env.paypal_secret_key)
      throw new Error('PayPal credentials not set');

    const client_id = credentials?.client_id || process.env.paypal_client_id;
    const secret_key = credentials?.secret_key || process.env.paypal_secret_key;

    const token = await https({
      method: 'POST',
      url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${client_id}:${secret_key}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    await storage.set({
      key: 'paypalAuth',
      value: {
        access_token: token?.access_token,
        app_id: token?.app_id,
        expires: Date.now() + 32400000,
        scope: token?.scope,
        nonce: token?.nonce
      }
    });

    return token.access_token;
  }
};