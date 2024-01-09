// @ts-check
const { handler } = require('../resources/handlers');

/**
 * @file All Slack API endpoints relating to chat
 * @module chat
 */

module.exports = {

  /**
   * @summary
   * ### [Send Message To A Channel]{@link https://api.slack.com/methods/chat.postMessage}
   * 
   * @example
   * await api.slack.chat.post({
   *   channel: '000000000',
   *   text: 'Hello',
   *   blocks: [{
   *     type: 'section',
   *     block_id: 'section 0',
   *     text: {
   *       type: 'mrkdwn',
   *       text: 'Hello'
   *     }
   *   }]
   * });
   * 
   * @memberof module:chat#
   * @function post
   * @param {Object} params
   * @param {string} params.channel
   * @param {string} [params.text]
   * @param {SlackAttachmentBlock[]} [params.blocks]
   * @param {SlackMessageAttachment[]} [params.attachments]
   * @param {string} [params.icon_emoji]
   * @param {string} [params.icon_url]
   * @param {boolean} [params.link_names]
   * @param {string} [params.metadata]
   * @param {boolean} [params.mrkdwn]
   * @param {string} [params.parse]
   * @param {boolean} [params.reply_broadcast]
   * @param {string} [params.thread_ts]
   * @param {boolean} [params.unfurl_links]
   * @param {boolean} [params.unfurl_media]
   * @param {string} [params.username]
   * @returns {Promise<SlackMessageResponse>} A list of [Application Role Connection Metadata]{@link https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object} objects for the given application.
   */
  post: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'chat.postMessage',
      body: {
        channel: params.channel,
        text: params.text ?? '',
        attachments: params.attachments ?? [],
        blocks: params.blocks ?? [],
        metadata: typeof params.metadata === 'object'
          ? JSON.stringify(params.metadata)
          : params.metadata,
        parse: params.parse ?? undefined,
        reply_broadcast: params.reply_broadcast || false,
        icon_emoji: params.icon_emoji ?? undefined,
        icon_url: params.icon_url ?? undefined,
        link_names: params.link_names || false,
        mrkdwn: params.mrkdwn || true,
        thread_ts: params.thread_ts ?? undefined,
        unfurl_links: params.unfurl_links || false,
        unfurl_media: params.unfurl_media || false,
        username: params.username ?? undefined
      },
      handler: 'slack'
    }),

  /**
   * @summary
   * ### [Send Ephemeral Message To User In A Channel]{@link https://api.slack.com/methods/chat.postEphemeral}
   * 
   * @example
   * await api.slack.chat.postEphemeral({
   *   channel: '000000000',
   *   user: '00000000',
   *   text: 'Hello',
   *   blocks: [{
   *     type: 'section',
   *     block_id: 'section 0',
   *     text: {
   *       type: 'mrkdwn',
   *       text: 'Hello'
   *     }
   *   }]
   * });
   * 
   * @memberof module:chat#
   * @function postEphemeral
   * @param {Object} params
   * @param {string} params.channel
   * @param {string} params.user
   * @param {string} [params.text]
   * @param {SlackAttachmentBlock[]} [params.blocks]
   * @param {SlackMessageAttachment[]} [params.attachments]
   * @param {string} [params.icon_emoji]
   * @param {string} [params.icon_url]
   * @param {boolean} [params.link_names]
   * @param {string} [params.metadata]
   * @param {boolean} [params.mrkdwn]
   * @param {string} [params.parse]
   * @param {boolean} [params.reply_broadcast]
   * @param {string} [params.thread_ts]
   * @param {boolean} [params.unfurl_links]
   * @param {boolean} [params.unfurl_media]
   * @param {string} [params.username]
   * @returns {Promise<SlackMessageResponse>} A list of [Application Role Connection Metadata]{@link https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object} objects for the given application.
   */
  postEphemeral: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'chat.postEphemeral',
      body: {
        channel: params.channel,
        user: params.user,
        text: params.text ?? '',
        attachments: params.attachments ?? [],
        blocks: params.blocks ?? [],
        metadata: typeof params.metadata === 'object'
          ? JSON.stringify(params.metadata)
          : params.metadata,
        parse: params.parse ?? undefined,
        reply_broadcast: params.reply_broadcast || false,
        icon_emoji: params.icon_emoji ?? undefined,
        icon_url: params.icon_url ?? undefined,
        link_names: params.link_names || false,
        mrkdwn: params.mrkdwn || true,
        thread_ts: params.thread_ts ?? undefined,
        unfurl_links: params.unfurl_links || false,
        unfurl_media: params.unfurl_media || false,
        username: params.username ?? undefined
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Update Channel Message]{@link https://api.slack.com/methods/chat.update}
   * 
   * @example
   * await api.slack.chat.update({
   *   channel: '000000000',
   *   ts: '00000000',
   *   text: 'Hello',
   *   blocks: [{
   *     type: 'section',
   *     block_id: 'section 0',
   *     text: {
   *       type: 'mrkdwn',
   *       text: 'Hello'
   *     }
   *   }]
   * });
   * 
   * @memberof module:chat#
   * @function update
   * @param {Object} params
   * @param {string} params.channel
   * @param {string} params.timestamp
   * @param {string} [params.text]
   * @param {SlackAttachmentBlock[]} [params.blocks]
   * @param {SlackMessageAttachment[]} [params.attachments]
   * @param {Array<string>} [params.file_ids]
   * @param {boolean} [params.link_names]
   * @param {string} [params.metadata]
   * @param {string} [params.parse]
   * @param {boolean} [params.reply_broadcast]
   * @returns 
   */
  update: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'chat.update',
      body: {
        channel: params.channel,
        ts: params.timestamp,
        text: params.text ?? '',
        attachments: params.attachments ?? [],
        blocks: params.blocks ?? [],
        file_ids: params.file_ids ?? [],
        link_names: params.link_names || false,
        metadata: typeof params.metadata === 'object'
          ? JSON.stringify(params.metadata)
          : params.metadata,
        parse: params.parse ?? undefined,
        reply_broadcast: params.reply_broadcast || false
      },
      handler: 'slack'
    }),

  /**
   * @summary
   * ### [Delete Channel Message]{@link https://api.slack.com/methods/chat.delete}
   * 
   * @example
   * await api.slack.chat.destroy({
   *   channel: '000000000',
   *   ts: '00000000'
   * });
   * 
   * @memberof module:chat#
   * @function destroy
   * @param {Object} params
   * @param {string} params.channel
   * @param {string} params.timestamp
   * @returns {Promise<{ok: boolean, channel: string, ts: string}>}
   */
  destroy: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'chat.delete',
      body: {
        channel: params.channel,
        ts: params.timestamp
      },
      handler: 'slack'
    }),

  /**
   * @summary
   * ### [Share Me Message Into Channel]{@link https://api.slack.com/methods/chat.meMessage}
   * 
   * @example
   * await api.slack.chat.meMessage({
   *   channel: '000000000',
   *   text: 'Hello'
   * });
   * 
   * @memberof module:chat#
   * @function meMessage
   * @param {Object} params
   * @param {string} params.channel
   * @param {string} params.text
   * @returns {Promise<{ok: boolean, channel: string, ts: string}>}
   */
  meMessage: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'chat.meMessage',
      body: {
        channel: params.channel,
        text: params.text
      },
      handler: 'slack'
    }),

  /**
	 * @summary All functions relating to Slack Scheduled Messages
	 * @memberof module:chat
	 * @namespace scheduled
	 */

  scheduled: {

    /**
     * @summary
     * ### [Shedule A Message To Be Sent]{@link https://api.slack.com/methods/chat.scheduleMessage}
     * 
     * @example
     * await api.slack.chat.scheduled.create({
     *   channel: '000000000',
     *   post_at: Date.now() + 14400000,
     *   text: 'Hello',
     *   blocks: [{
     *     type: 'section',
     *     block_id: 'section 0',
     *     text: {
     *       type: 'mrkdwn',
     *       text: 'Hello'
     *     }
     *   }]
     * });
     * 
     * @memberof module:chat.scheduled#
     * @function create
     * @param {Object} params
     * @param {string} params.channel - Channel, private group, or DM channel to send message to. Can be an encoded ID, or a name.
     * @param {number} params.post_at - Unix timestamp representing the future time the message should post to Slack
     * @param {string} [params.text]
     * @param {SlackAttachmentBlock[]} [params.blocks]
     * @param {SlackMessageAttachment[]} [params.attachments]
     * @param {boolean} [params.as_user]
     * @param {boolean} [params.link_names]
     * @param {string} [params.parse]
     * @param {boolean} [params.reply_broadcast]
     * @param {string} [params.thread_ts]
     * @param {boolean} [params.unfurl_links]
     * @param {boolean} [params.unfurl_media]
     * @returns {Promise<{ok: boolean, channel: string, scheduled_message_id: string, post_at: string, message: SlackMessage}>} A list of [Application Role Connection Metadata]{@link https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object} objects for the given application.
     */
    create: async (params) =>
      handler({
        method: 'POST',
        endpoint: 'chat.scheduleMessage',
        body: {
          channel: params.channel,
          post_at: params.post_at,
          text: params.text ?? '',
          attachments: params.attachments ?? [],
          blocks: params.blocks ?? [],
          as_user: params.as_user || false,
          link_names: params.link_names || false,
          parse: params.parse ?? undefined,
          reply_broadcast: params.reply_broadcast || false,
          thread_ts: params.thread_ts ?? undefined,
          unfurl_links: params.unfurl_links || false,
          unfurl_media: params.unfurl_media || false
        },
        handler: 'slack'
      }),

    /**
     * @summary
     * ### [List All Scheduled Messages]{@link https://api.slack.com/methods/chat.scheduledMessages.list}
     * 
     * @example
     * await api.slack.chat.scheduled.list();
     * 
     * @example
     * await api.slack.chat.scheduled.list({
     *   channel: '000000000',
     *   limit: 5
     * });
     * 
     * @memberof module:chat.scheduled#
     * @function list
     * @param {Object} params
     * @param {string} params.channel - The channel of the scheduled messages
     * @param {string} [params.cursor] - For pagination purposes, this is the `cursor` value returned from a previous call to `chat.scheduled.list` indicating where you want to start this call from
     * @param {boolean} [params.team_id] - Encoded team id to list channels in, required if org token is used
     * @param {string} [params.latest] - Only messages before this Unix timestamp will be included in results. Default is the current time.
     * @param {number} [params.limit] - The maximum number of items to return
     * @param {string} [params.oldest] - Only messages after this Unix timestamp will be included in results
     * @returns {Promise<{ok: boolean, channel: string, scheduled_message_id: string, post_at: string, message: SlackMessage}>} A list of [Application Role Connection Metadata]{@link https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object} objects for the given application.
     */
    list: async (params) =>
      handler({
        method: 'POST',
        endpoint: 'chat.scheduledMessages.list',
        body: {
          channel: params.channel ?? undefined,
          cursor: params.cursor ?? undefined,
          latest: params.latest ?? undefined,
          limit: params.limit ?? undefined,
          oldest: params.oldest ?? undefined,
          team_id: params.team_id ?? undefined
        },
        handler: 'slack'
      })
  }
};