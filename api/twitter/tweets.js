/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { handler } = require('../resources/handlers');

/**
 * @module tweets
 */

module.exports = {

  /**
   * @summary
   * ### [Post A Tweet]{@link https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/create}
   * @example
   * await api.google.drive.about()
   * 
   * @function create
   * @memberof module:tweets#
   * @param {Object} options
   * @param {string} [options.text]
   * @param {string} [options.direct_message_deep_link]
   * @param {boolean} [options.for_super_followers_only]
   * @param {string} [options.place_id]
   * @param {string[]} [options.media_ids]
   * @param {string[]} [options.tagged_users_ids]
   * @param {Object} [options.poll]
   * @param {number} [options.poll.duration]
   * @param {string[]} [options.poll.options]
   * @param {string} [options.quote_tweet_id]
   * @param {string[]} [options.exclude_reply_user_ids]
   * @param {string} [options.in_reply_to_tweet_id]
   * @param {string} [options.reply_settings]
   * @returns {Promise<{id: string, text: string} | undefined>}
   */
  create: async (options) =>
    handler({
      method: 'POST',
      endpoint: 'tweets',
      body: {
        text: options.text,
        direct_message_deep_link: options.direct_message_deep_link,
        for_super_followers_only: options.for_super_followers_only,
        geo: options.place_id ? { place_id: options.place_id } : undefined,
        media: options.media_ids || options.tagged_users_ids ? {
          media_ids: options.media_ids,
          tagged_users_ids: options.tagged_users_ids
        } : undefined,
        poll: options.poll ? {
          duration_minutes: options.poll.duration,
          options: options.poll.options
        } : undefined,
        quote_tweet_id: options.quote_tweet_id,
        reply: options.exclude_reply_user_ids || options.in_reply_to_tweet_id ? {
          exclude_reply_user_ids: options.exclude_reply_user_ids,
          in_reply_to_tweet_id: options.in_reply_to_tweet_id
        } : undefined,
        reply_settings: options.reply_settings
      },
      handler: 'twitter'
    })

};