/* eslint-disable node/no-extraneous-require */
/* eslint-disable node/no-unsupported-features/node-builtins */
// @ts-check
'use-strict';
const { https } = require('../utils/https');
const storage = require('../utils/storage');
const { authorize: auth, refresh: fresh } = require('../resources/handlers');

/**
 * @file Dropbox OAuth2 endpoints
 * @module DropboxOAuth
 */

module.exports = {
  /**
   * @param {Object} [params]
   * @param {string} [params.channel_id]
   */
  authorize: async (params) => await auth('Dropbox', { channel_id: params?.channel_id }),
  refresh: async () => await fresh('dropbox'),

  refresh1: async () => {
    const credentials = require('../../Api').get_dropbox_token();
    const token = await storage.get('dropboxAuth');
    
    const refresh = await https({
      method: 'post',
      url: 'https://api.dropboxapi.com/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // @ts-ignore
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
        client_id: credentials?.client_id || process.env.dropbox_client_id,
        client_secret: credentials?.client_secret || process.env.dropbox_client_secret
      })
    });

    // console.log('refresh', refresh);
    await storage.set({
      key: 'dropboxAuth',
      value: {
        access_token: refresh?.access_token,
        refresh_token: token?.refresh_token,
        expires: Date.now() + 14400000,
        scope: refresh?.scope ?? (credentials?.scope ? credentials.scope.join(' ') : 'account_info.read account_info.write contacts.read contacts.write file_requests.read file_requests.write files.content.read files.content.write files.metadata.read files.metadata.write sharing.read sharing.write')
      }
    });

    return refresh.access_token;
  }
};