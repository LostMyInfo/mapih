// @ts-check
const { slackHandler, buildQueryString } = require('../resources/functions');

/**
 * @file All Slack API endpoints relating to users
 * @module users
 */

module.exports = {

  /**
   * @summary
   * ### [Get User's Info]{@link https://api.slack.com/methods/users.info}
   * @example
   * await api.slack.users.info({
   *   user: 'U0680E4DA3S'
   * });
   * @memberof module:users#
   * @function info
   * @param {Object} params
   * @param {string} params.user
	 * @param {boolean} [params.include_locale]
   * @returns {Promise<SlackUser>} A Slack [User]{@link https://api.slack.com/types/user} object..
   */
  info: async ({ user, include_locale = false }) =>
    slackHandler({
      method: 'GET',
      endpoint: `users.info?user=${user}&include_locale=${include_locale}`
    }),

  /**
   * @summary
   * ### [List All Users In A Slack Team]{@link https://api.slack.com/methods/users.list}
   * @example
   * await api.slack.users.list();
   *
   * await api.slack.users.list({
   *   include_locale: true,
   *   limit: 20
   * });
   * @memberof module:users#
   * @function list
   * @param {Object} [params]
   * @param {string} [params.cursor]
	 * @param {boolean} [params.include_locale]
   * @param {number} [params.limit]
   * @param {string} [params.team_id]
   * @returns {Promise<SlackUser[]>} A Paginated Slack [User]{@link https://api.slack.com/types/user} object.
   */
  list: async (params) => {
    const endpoint = buildQueryString('users.list', {
      cursor: params?.cursor,
      include_locale: params?.include_locale,
      limit: params?.limit,
      team_id: params?.team_id
    });
    return slackHandler({
      method: 'GET',
      endpoint
    });
  },

  /**
   * @summary
   * ### [Identify User]{@link https://api.slack.com/methods/users.identify}
   * @example
   * await api.slack.users.identify();
   * @memberof module:users#
   * @function identify
   * @returns {Promise<temp>}
   */
  identify: async () => 
    slackHandler({
      method: 'GET',
      endpoint: 'users.identity'
    }),

  /**
   * @summary
   * ### [Get User's Profile]{@link https://api.slack.com/methods/users.profile.get}
   * @example
   * await api.slack.users.getProfile({
   *   include_labels: true,
   *   user: 'U0680E4DA3S'
   * });
   * @memberof module:users#
   * @function getProfile
   * @param {Object} [params]
   * @param {string} [params.user]
	 * @param {boolean} [params.include_labels]
   * @returns {Promise<UserProfile>} A Paginated Slack [User]{@link https://api.slack.com/types/user} object.
   */
  getProfile: async (params) => {
    const endpoint = buildQueryString('users.profile.get', {
      user: params?.user,
      include_labels: params?.include_labels
    });
    return slackHandler({
      method: 'GET',
      endpoint
    });
  },
  
  /**
   * @summary
   * ### [Find User With Email Address]{@link https://api.slack.com/methods/users.lookupByEmail}
   * @example
   * await api.slack.users.lookup({
   *   email: 'sup@yahoo.com'
   * })
   * @memberof module:users#
   * @function lookup
   * @param {Object} params
   * @param {string} params.email
   * @returns {Promise<{ok: boolean, user: SlackUser}>}
   */
  lookup: async ({ email }) =>
    slackHandler({
      method: 'GET',
      endpoint: 'users.lookupByEmail?email=' + email
    })
};