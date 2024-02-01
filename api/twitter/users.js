/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString } = require('../resources/functions');
const { handler } = require('../resources/handlers');

/**
 * @module users
 */

module.exports = {

  /**
   * @summary
   * ### [Get Current User's Information]{@link https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-me}
   * @example
   * await api.twitter.users.me()
   * 
   * @function me
   * @memberof module:tweets#
   * @param {Object} [options]
   * @param {string[]} [options.tweet_fields]
   * @param {string[]} [options.user_fields]
   * @param {boolean} [options.pinned_tweet_id]
   * @returns {Promise<TwitterUser | undefined>}
   */
  me: async (options) => {
    const attempt = await handler({
      method: 'GET',
      endpoint: buildQueryString('users/me', {
        expansions: options?.pinned_tweet_id ? 'pinned_tweet_id' : undefined,
        'user.fields': options?.user_fields?.join(','),
        'tweet.fields': options?.tweet_fields?.join(',')
      }),
      handler: 'twitter'
    });

    return attempt?.data ?? attempt;
  }
    
};