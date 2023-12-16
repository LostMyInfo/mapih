/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { spotifyHandler, buildQueryString, buildSpotifyResponse } = require('../resources/functions');

module.exports = {
  async getMe() {
    
    const attempt = await spotifyHandler({
      method: 'GET',
      endpoint: 'me'
    });
    return attempt;
    // console.log(attempt);
  }
};