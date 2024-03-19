/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { ResponseError } = require('../resources/Errors');
const { handler } = require('../resources/handlers');
const users = require('./users');

/**
 * @module tweets
 */

module.exports = {

  /**
   * @summary
   * ### [Post A Tweet]{@link https://developer.twitter.com/en/docs/twitter-api/tweets/manage-tweets/api-reference/post-tweets}
   * @example
   * await api.twitter.tweets.create({
   *   
   * });
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
    }),
  
  /**
   * @summary
   * ### [Find Tweets By User]{@link https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets}
   *
   * @example
   * await api.twitter.tweets.timeline('1234567890');
   *
   * await api.twitter.users.tweets('1234567890', {
   *   user_fields: ['name', 'id', 'created_at']
   * });
   * 
   * @function timeline
   * @memberof module:tweets#
   * @param {Object} [options]
   * @param {TwitterTweetFields[]} [options.tweet_fields]
   * @param {TwitterUserFields[]} [options.user_fields]
   * @param {TwitterMediaFields[]} [options.media_fields]
   * @param {TwitterPlaceFields[]} [options.place_fields]
   * @param {TwitterPollFields[]} [options.poll_fields]
   * @param {TwitterExpansions[]} [options.expansions]
   * @param {string[]} [options.exclude]
   * @param {number} [options.max_results]
   * @param {string} [options.next_token]
   * @param {string} [options.pagination_token]
   * @param {string} [options.since_id]
   * @param {string} [options.until_id]
   * @param {string} [options.start_time]
   * @param {string} [options.end_time]
   * @returns {Promise<TwitterTweetLookupResponse>}
   */
  timeline: async (options) => {
    const me = await users.findMyID();
    console.log('me:', me);
    const attempt = await handler(users.request(`users/${me}/timelines/reverse_chronological`, options));
    if (attempt.errors?.length)
      throw new ResponseError(attempt, null, 'twitter_error');

    return attempt;
  }

};