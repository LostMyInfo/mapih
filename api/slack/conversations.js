// @ts-check
const { slackHandler, buildQueryString } = require('../resources/functions');

/**
 * @file All Slack API endpoints relating to conversations (channels)
 * @module conversations
 */

module.exports = {

  /**
   * @summary
   * ### [Initiates a public or private channel-based conversation]{@link https://api.slack.com/methods/conversations.create}
   * @example
   * await api.slack.conversations.create({
   *   name: 'mychannel',
   *   is_private: true
   * });
   * @memberof module:conversations#
   * @function create
   * @param {Object} params
   * @param {string} params.name - Name of the public or private channel to create
   * @param {boolean} [params.is_private] - Create a private channel instead of a public one
   * @param {string} [params.team_id] - Encoded team id to create the channel in, required if org token is used
   * @returns {Promise<SlackChannel>}
   */
  create: async (params) =>
    slackHandler({
      method: 'POST',
      endpoint: 'conversations.create',
      body: {
        name: params.name,
        is_private: params.is_private || false,
        team_id: params.team_id ?? undefined
      }
    }),
  
  /**
   * @summary
   * ### [Opens or resumes a direct message or multi-person direct message]{@link https://api.slack.com/methods/conversations.open}
   * @example
   * await api.slack.conversations.open({
   *   channel: '123456789',
   *   prevent_creation: true,
   *   users: 'W1234567890,U2345678901,U3456789012,
   * });
   * @memberof module:conversations#
   * @function open
   * @param {Object} params
   * @param {string} [params.channel] - Resume a conversation by supplying an `im` or `mpim`'s ID. Or provide the `users` field instead.
   * @param {boolean} [params.prevent_creation] - Do not create a direct message or multi-person direct message. This is used to see if there is an existing dm or mpdm.
   * @param {boolean} [params.return_im] - Indicates you want the full IM channel definition in the response
   * @param {string} [params.users] - Comma separated lists of users. If only one user is included, this creates a 1:1 DM.
   * @returns {Promise<{channel: string; no_op: boolean; already_open: boolean}>} 
   */
  open: async (params) =>
    slackHandler({
      method: 'POST',
      endpoint: 'conversations.open',
      body: {
        channel: params.channel ?? undefined,
        prevent_creation: params.prevent_creation || false,
        return_im: params.return_im || false,
        users: params.users ?? undefined
      }
    }),
  
  /**
   * @summary
   * ### [Closes a direct message or multi-person direct message]{@link https://api.slack.com/methods/conversations.close}
   * @example
   * await api.slack.conversations.close({
   *   channel: 'G1234567890'
   * });
   * @memberof module:conversations#
   * @function close
   * @param {Object} params
   * @param {string} params.channel - Conversation to close
   * @returns {Promise<{no_op: boolean; already_closed: boolean}>}
   */
  close: async (params) =>
    slackHandler({
      method: 'POST',
      endpoint: 'conversations.close',
      body: {
        channel: params.channel
      }
    }),
  
  /**
   * @summary
   * ### [Retrieve information about a conversation]{@link https://api.slack.com/methods/conversations.info}
   * @example
   * await api.slack.conversations.info({
   *   channel: '123456789',
   *   include_num_members: true
   * });
   * @memberof module:conversations#
   * @function info
   * @param {Object} params
   * @param {string} params.channel - Conversation ID to learn more about
   * @param {boolean} [params.include_locale] - Whether to receive the locale for this conversation. Defaults to false.
   * @param {boolean} [params.include_num_members] - Whether to include the member count for the specified conversation. Defaults to false.
   * @returns {Promise<SlackChannel>} A list of [Application Role Connection Metadata]{@link https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object} objects for the given application.
   */
  info: async (params) => {
    const endpoint = buildQueryString('conversations.info', {
      channel: params.channel,
      include_locale: params.include_locale || false,
      include_num_members: params.include_num_members || false
    });
    return slackHandler({
      method: 'GET',
      endpoint
    });
  },

  /**
   * @summary
   * ### [Fetches a conversation's history of messages and events]{@link https://api.slack.com/methods/conversations.history}
   * @example
   * await api.slack.conversations.history({
   *   channel: '123456789',
   *   include_all_metadata: true,
   *   limit: 3
   * });
   * @memberof module:conversations#
   * @function history
   * @param {Object} params
   * @param {string} params.channel - Conversation ID to learn more about
   * @param {string} [params.cursor] - Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`
   * @param {boolean} [params.include_all_metadata] - Return all metadata associated with this message
   * @param {boolean} [params.inclusive] - Include messages with `oldest` or `latest` timestamps in results. Ignored unless either timestamp is specified
   * @param {string} [params.latest] - Only messages before this Unix timestamp will be included in results. Default is the current time.
   * @param {number} [params.limit] - The maximum number of items to return
   * @param {string} [params.oldest] - Only messages after this Unix timestamp will be included in results
   * @returns {Promise<{messages: SlackMessage[], has_more: boolean, pin_count: number, channel_actions_ts: ?number, channel_actions_count: number}>} A list of [Application Role Connection Metadata]{@link https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object} objects for the given application.
   */
  history: async (params) => {
    const endpoint = buildQueryString('conversations.history', {
      channel: params.channel,
      cursor: params.cursor ?? undefined,
      include_all_metadata: params.include_all_metadata || false,
      inclusive: params.inclusive ?? undefined,
      latest: params.latest ?? undefined,
      limit: params.limit ?? 100,
      oldest: params.oldest ?? undefined
    });
    return slackHandler({
      method: 'GET',
      endpoint
    });
  }
  
  
};