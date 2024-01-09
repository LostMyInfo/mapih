// @ts-check
const { handler } = require('../resources/handlers');
const { buildQueryString } = require('../resources/functions');

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
    handler({
      method: 'POST',
      endpoint: 'conversations.create',
      body: {
        name: params.name,
        is_private: params.is_private || false,
        team_id: params.team_id ?? undefined
      },
      handler: 'slack'
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
   * @returns {Promise<{channel: string; no_op?: boolean; already_open?: boolean}>} 
   */
  open: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'conversations.open',
      body: {
        channel: params.channel ?? undefined,
        prevent_creation: params.prevent_creation || false,
        return_im: params.return_im || false,
        users: params.users ?? undefined
      },
      handler: 'slack'
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
   * @param {string} params.channel - ID of conversation to close
   * @returns {Promise<{ok: boolean; no_op?: boolean; already_closed?: boolean}>}
   */
  close: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'conversations.close',
      body: {
        channel: params.channel
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Archives a conversation]{@link https://api.slack.com/methods/conversations.archive}
   * @example
   * await api.slack.conversations.archive({
   *   channel: 'G1234567890'
   * });
   * @memberof module:conversations#
   * @function archive
   * @param {Object} params
   * @param {string} params.channel - ID of conversation to archive
   * @returns {Promise<{ok: boolean}>}
   */
  archive: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'conversations.archive',
      body: {
        channel: params.channel
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Reverses conversation archival]{@link https://api.slack.com/methods/conversations.unarchive}
   * @example
   * await api.slack.conversations.unarchive({
   *   channel: 'G1234567890'
   * });
   * @memberof module:conversations#
   * @function unarchive
   * @param {Object} params
   * @param {string} params.channel - ID of conversation to unarchive
   * @returns {Promise<{ok: boolean}>}
   */
  unarchive: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'conversations.unarchive',
      body: {
        channel: params.channel
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Renames a conversation]{@link https://api.slack.com/methods/conversations.rename}
   * @example
   * await api.slack.conversations.rename({
   *   channel: 'G1234567890',
   *   name: 'new name'
   * });
   * @memberof module:conversations#
   * @function rename
   * @param {Object} params
   * @param {string} params.channel - ID of conversation to rename
   * @param {string} params.name - New name for conversation
   * @returns {Promise<{ok: boolean; channel: SlackChannel}>}
   */
  rename: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'conversations.rename',
      body: {
        channel: params.channel,
        name: params.name
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Sets the topic for a conversation]{@link https://api.slack.com/methods/conversations.setTopic}
   * @example
   * await api.slack.conversations.setTopic({
   *   channel: 'G1234567890',
   *   topic: 'new topic!'
   * });
   * @memberof module:conversations#
   * @function setTopic
   * @param {Object} params
   * @param {string} params.channel - Conversation to set the topic of
   * @param {string} params.topic - The new topic string. Does not support formatting or linkification.
   * @returns {Promise<{ok: boolean; channel: SlackChannel}>}
   */
  setTopic: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'conversations.setTopic',
      body: {
        channel: params.channel,
        topic: params.topic
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Sets the purpose for a conversation]{@link https://api.slack.com/methods/conversations.setPurpose}
   * @example
   * await api.slack.conversations.setPurpose({
   *   channel: 'G1234567890',
   *   purpose: 'new topic!'
   * });
   * @memberof module:conversations#
   * @function setPurpose
   * @param {Object} params
   * @param {string} params.channel - Conversation to set the purpose of
   * @param {string} params.purpose - A new, specialer purpose
   * @returns {Promise<{ok: boolean; purpose?: string}>}
   */
  setPurpose: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'conversations.setPurpose',
      body: {
        channel: params.channel,
        topic: params.purpose
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Joins an existing conversation]{@link https://api.slack.com/methods/conversations.join}
   * @example
   * await api.slack.conversations.join({
   *   channel: '123456789'
   * });
   * @memberof module:conversations#
   * @function join
   * @param {Object} params
   * @param {string} params.channel - ID of conversation to join
   * @returns {Promise<{channel: SlackChannel; warning?: string; response_metadata?: { warnings?: Array<string> }}>} 
   */
  join: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'conversations.join',
      body: {
        channel: params.channel
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Leaves a conversation]{@link https://api.slack.com/methods/conversations.leave}
   * @example
   * await api.slack.conversations.leave({
   *   channel: '123456789'
   * });
   * @memberof module:conversations#
   * @function leave
   * @param {Object} params
   * @param {string} params.channel - ID of conversation to leave
   * @returns {Promise<{ok: boolean; not_in_channel?: boolean}>} 
   */
  leave: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'conversations.leave',
      body: {
        channel: params.channel
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Removes a user from a conversation]{@link https://api.slack.com/methods/conversations.kick}
   * @example
   * await api.slack.conversations.kick({
   *   channel: '123456789',
   *   user: 'C1234567890'
   * });
   * @memberof module:conversations#
   * @function kick
   * @param {Object} params
   * @param {string} params.channel - ID of conversation to remove user from
   * @param {string} params.user - User ID to be removed
   * @returns {Promise<{ok: boolean; error?: string}>} 
   */
  kick: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'conversations.kick',
      body: {
        channel: params.channel,
        user: params.user
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Invites users to a channel]{@link https://api.slack.com/methods/conversations.invite}
   * @example
   * await api.slack.conversations.invite({
   *   channel: 'C1234567890',
   *   users: ['W1234567890']
   * });
   * @memberof module:conversations#
   * @function invite
   * @param {Object} params
   * @param {string} params.channel - The ID of the public or private channel to invite user(s) to
   * @param {Array<string>} params.users - An array of user IDs. Up to 1000.
   * @param {boolean} [params.force] - When set to true and multiple user IDs are provided, continue inviting the valid ones while disregarding invalid IDs. Defaults to false.
   * @returns {Promise<SlackChannel>} a list of limited channel-like [conversation objects]{@link https://api.slack.com/types/conversation}
   */
  invite: async (params) =>
    (await handler({
      method: 'POST',
      endpoint: 'conversations.invite',
      body: {
        channel: params.channel,
        users: params.users.join(','),
        force: params.force || false
      },
      handler: 'slack'
    }))?.channel,

  /**
   * @summary
   * ### [Approves an invitation to a Slack Connect channel]{@link https://api.slack.com/methods/conversations.approveSharedInvite}
   * @example
   * await api.slack.conversations.approveSharedInvite({
   *   invite_id: '123123123'
   * });
   * @memberof module:conversations#
   * @function approveSharedInvite
   * @param {Object} params
   * @param {string} params.invite_id - ID of the shared channel invite to approve
   * @param {string} [params.target_team] - The team or enterprise id of the other party involved in the invitation you are approving
   * @returns {Promise<{ok: boolean}>}
   */
  approveSharedInvite: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'conversations.approveSharedInvite',
      body: {
        invite_id: params.invite_id,
        target_team: params.target_team ?? undefined
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Accepts an invitation to a Slack Connect channel]{@link https://api.slack.com/methods/conversations.acceptSharedInvite}
   * Must provide either `invite_id` or `channel_id`.
   * 
   * @example
   * await api.slack.conversations.acceptSharedInvite({
   *   channel_name: 'something-cool',
   *   channel_id: '123456'
   * });
   * @memberof module:conversations#
   * @function acceptSharedInvite
   * @param {Object} params
   * @param {string} params.channel_name - Name of the channel. If the channel does not exist already in your workspace, this name is the one that the channel will take.
   * @param {string} [params.channel_id] - ID of the channel that you'd like to accept
   * @param {string} [params.invite_id] - ID of the invite that you’d like to accept
   * @param {boolean} [params.free_trial_accepted] - Whether you'd like to use your workspace's free trial to begin using Slack Connect
   * @param {boolean} [params.is_private] - Whether the channel should be private
   * @param {string} [params.team_id] - The ID of the workspace to accept the channel in
   * @returns {Promise<{ok: boolean, implicit_approval?: boolean, channel_id?: string, invite_id?: string}>}
   */
  acceptSharedInvite: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'conversations.acceptSharedInvite',
      body: {
        channel_name: params.channel_name,
        channel_id: params.channel_id ?? undefined,
        invite_id: params.invite_id ?? undefined,
        free_trial_accepted: params.free_trial_accepted || false,
        is_private: params.is_private || false,
        team_id: params.team_id ?? undefined
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Declines a Slack Connect channel invite]{@link https://api.slack.com/methods/conversations.declineSharedInvite}
   * 
   * @example
   * await api.slack.conversations.declineSharedInvite({
   *   channel_name: 'something-cool',
   *   invite_id: '123456'
   * });
   * @memberof module:conversations#
   * @function declineSharedInvite
   * @param {Object} params
   * @param {string} params.invite_id - ID of the Slack Connect invite to decline
   * @param {string} [params.target_team] - The team or enterprise id of the other party involved in the invitation you are declining
   * @returns {Promise<{ok: boolean}>}
   */
  declineSharedInvite: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'conversations.declineSharedInvite',
      body: {
        invite_id: params.invite_id,
        target_team: params.target_team ?? undefined
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Lists shared channel invites that have been generated or received but have not been approved by all parties]{@link https://api.slack.com/methods/conversations.listConnectInvites}
   * @example
   * await api.slack.conversations.listConnectInvites({
   *   count: 5
   * });
   * @memberof module:conversations#
   * @function listConnectInvites
   * @param {Object} params
   * @param {number} [params.count] - Maximum number of invites to return
   * @param {string} [params.cursor] - Set to next_cursor returned by previous call to list items in subsequent page
   * @param {string} [params.team_id] - Encoded team id for the workspace to retrieve invites for, required if org token is used
   * @returns {Promise<SlackConversationsListConnectInviteResponse>} Returns a paginated list of invites that represesent pending shared channel invitations sent or received
   */
  listConnectInvites: async (params) =>
    (await handler({
      method: 'POST',
      endpoint: 'conversations.listConnectInvites',
      body: {
        count: params.count ?? 100,
        cursor: params.cursor ?? undefined,
        team_id: params.team_id ?? undefined
      },
      handler: 'slack'
    }))?.invites,

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
  info: async (params) =>
    handler({
      method: 'GET',
      endpoint: buildQueryString('conversations.info', {
        channel: params.channel,
        include_locale: params.include_locale || false,
        include_num_members: params.include_num_members || false
      }),
      handler: 'slack'
    }),

  /**
   * @summary
   * ### [Retrieve a thread of messages posted to a conversation]{@link https://api.slack.com/methods/conversations.replies}
   * @example
   * await api.slack.conversations.replies({
   *   channel: '123456789',
   *   ts: 1234567890.123456
   * });
   * @memberof module:conversations#
   * @function replies
   * @param {Object} params
   * @param {string} params.channel - Conversation ID to fetch thread from
   * @param {boolean} [params.ts] - Unique identifier of either a thread’s parent message or a message in the thread
   * @param {string} [params.cursor] - Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`
   * @param {boolean} [params.include_all_metadata] - Return all metadata associated with this message
   * @param {boolean} [params.inclusive] - Include messages with `oldest` or `latest` timestamps in results. Ignored unless either timestamp is specified
   * @param {string} [params.latest] - Only messages before this Unix timestamp will be included in results. Default is the current time.
   * @param {number} [params.limit] - The maximum number of items to return
   * @param {string} [params.oldest] - Only messages after this Unix timestamp will be included in results
   * @returns {Promise<{ok: boolean; messages: SlackMessage[]; has_more: boolean; response_metadata: { next_cursor: string; } }>}
   */
  replies: async (params) =>
    handler({
      method: 'GET',
      endpoint: buildQueryString('conversations.replies', {
        channel: params.channel,
        ts: params.ts,
        cursor: params.cursor ?? undefined,
        include_all_metadata: params.include_all_metadata || false,
        inclusive: params.inclusive ?? undefined,
        latest: params.latest ?? undefined,
        limit: params.limit ?? 100,
        oldest: params.oldest ?? undefined
      }),
      handler: 'slack'
    }),

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
   * @returns {Promise<{messages: SlackMessage[], has_more: boolean, pin_count: number, channel_actions_ts: ?number, channel_actions_count: number}>}
   */
  history: async (params) =>
    handler({
      method: 'GET',
      endpoint: buildQueryString('conversations.history', {
        channel: params.channel,
        cursor: params.cursor ?? undefined,
        include_all_metadata: params.include_all_metadata || false,
        inclusive: params.inclusive ?? undefined,
        latest: params.latest ?? undefined,
        limit: params.limit ?? 100,
        oldest: params.oldest ?? undefined
      }),
      handler: 'slack'
    }),

  /**
   * @summary
   * ### [Lists all channels in a Slack team]{@link https://api.slack.com/methods/conversations.list}
   * @example
   * await api.slack.conversations.list({
   *   exclude_archived: true
   * });
   * @memberof module:conversations#
   * @function list
   * @param {Object} params
   * @param {string} [params.cursor] - Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`
   * @param {boolean} [params.exclude_archived] - Whether to exclude archived channels from the list
   * @param {string} [params.team_id] - encoded team id to list channels in, required if token belongs to org-wide app
   * @param {string} [params.types] - Mix and match channel types by providing a comma-separated list of any combination of `public_channel`, `private_channel`, `mpim`, `im`. Default `public_channel`
   * @param {number} [params.limit] - The maximum number of items to return
   * @returns {Promise<SlackChannel[]>} a list of limited channel-like [conversation objects]{@link https://api.slack.com/types/conversation}
   */
  list: async (params) =>
    handler({
      method: 'GET',
      endpoint: buildQueryString('conversations.list', {
        cursor: params.cursor ?? undefined,
        exclude_archived: params.exclude_archived || false,
        team_id: params.team_id ?? undefined,
        types: params.types ?? undefined,
        limit: params.limit ?? 100
      }),
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Retrieve members of a conversation]{@link https://api.slack.com/methods/conversations.members}
   * @example
   * await api.slack.conversations.members({
   *   channel: 'C1234567890',
   *   limit: 5
   * });
   * @memberof module:conversations#
   * @function members
   * @param {Object} params
   * @param {string} params.channel - ID of the conversation to retrieve members for
   * @param {string} [params.cursor] - Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`
   * @param {number} [params.limit] - The maximum number of items to return. Default 100.
   * @returns {Promise<{ok: boolean, members: Array<string>, response_metadata?: { next_cursor: string } }>}
   */
  members: async (params) =>
    handler({
      method: 'GET',
      endpoint: buildQueryString('conversations.members', {
        channel: params.channel,
        cursor: params.cursor ?? undefined,
        limit: params.limit ?? 100
      }),
      handler: 'slack'
    })
};