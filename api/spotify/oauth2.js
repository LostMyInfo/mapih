/* eslint-disable node/no-unsupported-features/node-builtins */
// @ts-check
'use-strict';
const { https } = require('../utils/https');
const storage = require('../utils/storage');
const { authorize: auth, refresh: fresh } = require('../resources/handlers');

/**
 * @file Spotify OAuth2 endpoints
 * @module SpotifyOAuth2
 */

module.exports = {

  /**
   * @param {Object} [params]
   * @param {string} [params.channel_id]
   */
  authorize: async (params) => await auth('Slack', { channel_id: params?.channel_id }),
  refresh: async () => await fresh('spotify'),
  
  refresh1: async () => {
    const credentials = require('../../Api').get_spotify_token();
    const token = await storage.get('spotifyAuth');
    // if (refresh_token.expires <= Date.now())
    // throw new Error('this access token is expired.');
    
    
    // console.log('Object.keys(token) in refresh():', Object.keys(token));
    const refresh = await https({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from((credentials?.client_id || process.env.spotify_client_id) + ':' + (credentials?.client_secret || process.env.spotify_client_secret)).toString('base64')
      },
      // @ts-ignore
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
        client_id: credentials?.client_id || process.env.spotify_client_id
      })
    });

    // console.log('refresh', refresh);
    await storage.set({
      key: 'spotifyAuth',
      value: {
        access_token: refresh?.access_token,
        refresh_token: token?.refresh_token,
        expires: Date.now() + 3600000,
        scope: credentials?.scope ? credentials.scope.join(' ') : 'user-read-email user-read-private user-library-read user-library-modify user-top-read user-read-recently-played user-read-playback-position user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public app-remote-control streaming user-read-playback-state user-modify-playback-state user-read-currently-playing ugc-image-upload'
      }
    });

    return refresh.access_token;
  }
};