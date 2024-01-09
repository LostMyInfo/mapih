/* eslint-disable node/no-extraneous-require */
/* eslint-disable node/no-unsupported-features/node-builtins */
// @ts-check
'use-strict';
const { authorize: auth } = require('../resources/handlers');

/**
 * @file Slack OAuth2 endpoints
 * @module SlackOAuth
 */

module.exports = {

  /**
   * @param {Object} [params]
   * @param {string} [params.channel_id]
   */
  authorize: async (params) => await auth('Slack', { channel_id: params?.channel_id })
};