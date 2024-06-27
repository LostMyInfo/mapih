// @ts-check
'use-strict';

const { WebhookType } = require('../../enum');
// Webhooks
// https://discord.com/developers/docs/resources/webhook#webhook-resource
const { attemptHandler, sendAttachment } = require('../resources/handlers');
const { imageData, getBadges, retrieveDate, avatarFromObject, extendPayload } = require('../resources/functions');

/**
 * @file
 * Webhooks are a low-effort way to post messages to channels in Discord.
 * They do not require a bot user or authentication to use.
 * @module webhooks
 */

module.exports = {

  /**
   * @summary
   * ### [Get Webhook]{@link https://discord.com/developers/docs/resources/webhook#get-webhook}
   * @example
   * await api.discord.webhooks.retrieve({
   *   webhook_id: '0000000000'
   * });
   * @memberof module:webhooks#
   * @function retrieve
   * @param {Object} params
   * @param {Snowflake} params.webhook_id
   * @returns {Promise<Webhook>} The [Webhook]{@link https://discord.com/developers/docs/resources/webhook#webhook-object} object for the given id
   */
  retrieve: async (params) => {
    const attempt = await attemptHandler({
      method: 'GET',
      endpoint: `webhooks/${params.webhook_id}`
    });
    attempt.typeName = WebhookType[attempt.type];
    if (attempt.user) {
      attempt.user.badges = getBadges(attempt.user.public_flags);
      attempt.user.created_at = retrieveDate(attempt.user.id, true);
    }
    if (attempt.avatar)
      attempt.avatar_url = avatarFromObject(attempt.id, attempt.avatar);
    return attempt;
  }, // End of Get Webhook

  /**
   * @summary
   * ### [Get Webhook with Token]{@link https://discord.com/developers/docs/resources/webhook#get-webhook-with-token}
   * - Same as `webhooks.retrieve()`, except does not require authentication and returns no user in the {@link Webhook} object.
   * @example
   * await api.discord.webhooks.retrieveWithToken({
   *   webhook_id: '0000000000',
   *   webhook_token: 'abcdef123456'
   * });
   * @memberof module:webhooks#
   * @function retrieveWithToken
   * @param {Object} params
   * @param {Snowflake} params.webhook_id
   * @param {string} params.webhook_token
   * @returns {Promise<Omit<Webhook, 'user'>>} The [Webhook]{@link https://discord.com/developers/docs/resources/webhook#webhook-object} object for the given id/token
   */
  retrieveWithToken: async (params) =>
    attemptHandler({
      method: 'GET',
      endpoint: `webhooks/${params.webhook_id}/${params.webhook_token}`
    }), // End of Get Webhook with Token

  /**
   * @summary
   * ### [Get Channel Webhooks]{@link https://discord.com/developers/docs/resources/webhook#get-channel-webhooks}
   * @example
   * await api.discord.webhooks.retrieveChannel({
   *   channel_id: '0000000000'
   * });
   * @memberof module:webhooks#
   * @function retrieveChannel
   * @param {Object} params
   * @param {Snowflake} params.channel_id
   * @returns {Promise<Webhook[]>} List of channel [Webhook]{@link https://discord.com/developers/docs/resources/webhook#webhook-object} objects
   */
  retrieveChannel: async (params) => {
    const attempt = await attemptHandler({
      method: 'GET',
      endpoint: `channels/${params.channel_id}/webhooks`
    });
    for (const webhook of attempt) {
      webhook.typeName = WebhookType[webhook.type];
      if (webhook.user) {
        webhook.user.badges = getBadges(webhook.user.public_flags);
        webhook.user.created_at = retrieveDate(webhook.user.id, true);
      }
      if (webhook.avatar)
        webhook.avatar_url = avatarFromObject(webhook.id, webhook.avatar);
    }
    return attempt;
  }, // End of Get Channel Webhooks

  /**
   * @summary
   * ### [Get Guild Webhooks]{@link https://discord.com/developers/docs/resources/webhook#get-guild-webhooks}
   * @example
   * await api.discord.webhooks.retrieveGuild({
   *   guild_id: '0000000000'
   * });
   * @memberof module:webhooks#
   * @function retrieveGuild
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<Webhook[]>} List of guild [Webhook]{@link https://discord.com/developers/docs/resources/webhook#webhook-object} objects
   */
  retrieveGuild: async (params) => {
    const attempt = await attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}/webhooks`
    });
    for (const webhook of attempt) {
      webhook.typeName = WebhookType[webhook.type];
      if (webhook.user) {
        webhook.user.badges = getBadges(webhook.user.public_flags);
        webhook.user.created_at = retrieveDate(webhook.user.id, true);
      }
      if (webhook.avatar)
        webhook.avatar_url = avatarFromObject(webhook.id, webhook.avatar);
    }
    return attempt;
  }, // End of Get Guild Webhooks

  /**
   * @summary
   * ### [Get Webhook Message]{@link https://discord.com/developers/docs/resources/webhook#get-webhook-message}
   * - Returns a previously-sent webhook message from the same token
   * @example
   * await api.discord.webhooks.retrieveMessage({
   *   webhook_id: '000000000000000',
   *   webhook_token: 'abcdefg1234567',
   *   message_id: '000000000000000'
   * });
   * @memberof module:webhooks#
   * @function retrieveMessage
   * @param {Object} params
   * @param {Snowflake} params.webhook_id
   * @param {string} params.webhook_token
   * @param {Snowflake} params.message_id
   * @param {Snowflake} [params.thread_id]
   * @returns {Promise<Message>} [Message]{@link https://discord.com/developers/docs/resources/channel#message-object} object
   */
  retrieveMessage: async (params) => {
    let endpoint = `webhooks/${params.webhook_id}/${params.webhook_token}/messages/${params.message_id}?`;
    endpoint += `${params.thread_id ? `&thread_id=${params.thread_id}` : ''}`;
    const attempt = await attemptHandler({
      method: 'GET',
      endpoint
    });
    return extendPayload(attempt/* , params*/);
  }, // End of Get Webhook Message

  /**
   * @summary
   * ### [Delete Webhook Message]{@link https://discord.com/developers/docs/resources/webhook#delete-webhook-message}
   * @example
   * await api.discord.webhooks.destroyMessage({
   *   webhook_id: '0000000000',
   *   webhook_token: 'abcdefg1234567',
   *   message_id: '0000000000'
   * });
   * @memberof module:webhooks#
   * @function destroyMessage
   * @param {Object} params
   * @param {Snowflake} params.webhook_id
   * @param {string} params.webhook_token
   * @param {Snowflake} params.message_id
   * @param {Snowflake} [params.thread_id]
   * @returns {Promise<{ statusCode: 204, type: 'discord', message: 'Success' }>} `204 No Content`
   */
  destroyMessage: async (params) => {
    let endpoint = `webhooks/${params.webhook_id}/${params.webhook_token}/messages/${params.message_id}?`;
    endpoint += `${params.thread_id ? `&thread_id=${params.thread_id}` : ''}`;
    return attemptHandler({
      method: 'DELETE',
      endpoint
    });
  }, // End of Delete Webhook Message

  /**
   * @summary
   * ### [Create Webhook]{@link https://discord.com/developers/docs/resources/webhook#create-webhook}
   * - Webhook names follow the nickname guidelines in the [Usernames and Nicknames]{@link https://discord.com/developers/docs/resources/user#usernames-and-nicknames} documentation, with the exception that webhook names can be up to 80 characters.
   * @example
   * await api.discord.webhooks.create({
   *   channel_id: '0000000000',
   *   name: 'MyNewWebhook',
   *   avatar: 'https://www.imgurl.com'
   * });
   * @memberof module:webhooks#
   * @function create
   * @param {Object} params
   * @param {Snowflake} params.channel_id
   * @param {string} params.name
   * @param {string} [params.avatar]
   * @returns {Promise<Webhook>} [Webhook]{@link https://discord.com/developers/docs/resources/webhook#webhook-object} object
   */
  create: async (params) =>
    attemptHandler({
      method: 'POST',
      endpoint: `channels/${params.channel_id}/webhooks`,
      body: {
        name: params.name,
        avatar: params.avatar ? (await imageData(params.avatar, 'base64string')).data : null
      }
    }), // End of Create Webhook

  /**
   * @summary
   * ### [Modify Webhook]{@link https://discord.com/developers/docs/resources/webhook#modify-webhook}
   * - Webhook names follow the nickname guidelines in the [Usernames and Nicknames]{@link https://discord.com/developers/docs/resources/user#usernames-and-nicknames} documentation, with the exception that webhook names can be up to 80 characters.
   * @example
   * await api.discord.webhooks.update({
   *   webhook_id: '0000000000',
   *   channel_id: '0000000000',
   *   name: 'MyNewWebhook',
   *   avatar: 'https://www.imgurl.com'
   * });
   * @memberof module:webhooks#
   * @function update
   * @param {Object} params
   * @param {Snowflake} params.webhook_id
   * @param {Snowflake} [params.channel_id] - The new channel id this webhook should be moved to
   * @param {string} [params.name]
   * @param {string | Buffer} [params.avatar]
   * @param {string} [params.reason]
   * @returns {Promise<Webhook>} The updated [Webhook]{@link https://discord.com/developers/docs/resources/webhook#webhook-object} object
   */
  update: async (params) => {
    if (params.avatar) params.avatar = (await imageData(params.avatar, 'base64string')).data;
    return attemptHandler({
      method: 'PATCH',
      endpoint: `webhooks/${params.webhook_id}`,
      body: params,
      reason: params.reason ?? null
    });
  }, // End of Modify Webhook

  /**
   * @summary
   * ### [Modify Webhook with Token]{@link https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token}
   * - Webhook names follow the nickname guidelines in the [Usernames and Nicknames]{@link https://discord.com/developers/docs/resources/user#usernames-and-nicknames} documentation, with the exception that webhook names can be up to 80 characters.
   * @example
   * await api.discord.webhooks.updateWithToken({
   *   webhook_id: '0000000000',
   *   webhook_token: 'abcdefg1234567',
   *   name: 'MyNewWebhook',
   *   avatar: 'https://www.imgurl.com'
   * });
   * @memberof module:webhooks#
   * @function updateWithToken
   * @param {Object} params
   * @param {Snowflake} params.webhook_id
   * @param {string} params.webhook_token
   * @param {string} [params.name]
   * @param {string | Buffer} [params.avatar]
   * @returns {Promise<Omit<Webhook, 'channel_id'>>} The updated [Webhook]{@link https://discord.com/developers/docs/resources/webhook#webhook-object} object
   */
  updateWithToken: async (params) => {
    if (params.avatar) params.avatar = (await imageData(params.avatar, 'base64string')).data;
    return attemptHandler({
      method: 'PATCH',
      endpoint: `webhooks/${params.webhook_id}/${params.webhook_token}`,
      body: params
    });
  }, // End of Modify Webhook with Token

  /**
   * @summary
   * ### [Delete Webhook]{@link https://discord.com/developers/docs/resources/webhook#delete-webhook}
   * @example
   * await api.discord.webhooks.destroy({
   *   webhook_id: '0000000000'
   * });
   * @memberof module:webhooks#
   * @function destroy
   * @param {Object} params
   * @param {Snowflake} params.webhook_id
   * @param {string} [params.reason]
   * @returns {Promise<{ statusCode: 204, type: 'discord', message: 'Success' }>} `204 No Content`
   */
  destroy: async (params) =>
    attemptHandler({
      method: 'DELETE',
      endpoint: `webhooks/${params.webhook_id}`,
      reason: params.reason ?? null
    }), // End of Delete Webhook

  /**
   * @summary
   * ### [Delete Webhook with Token]{@link https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token}
   * @example
   * await api.discord.webhooks.destroyWithToken({
   *   webhook_id: '0000000000',
   *   webhook_token: 'abcdefg1234567'
   * });
   * @memberof module:webhooks#
   * @function destroyWithToken
   * @param {Object} params
   * @param {Snowflake} params.webhook_id
   * @param {string} params.webhook_token
   * @returns {Promise<{ statusCode: 204, type: 'discord', message: 'Success' }>} `204 No Content`
   */
  destroyWithToken: async (params) =>
    attemptHandler({
      method: 'DELETE',
      endpoint: `webhooks/${params.webhook_id}/${params.webhook_token}`
    }), // End of Delete Webhook with Token

  /**
   * @summary
   * ### [Execute Webhook]{@link https://discord.com/developers/docs/resources/webhook#execute-webhook}
   * - When sending a message, you must provide a value for at least one of `content`, `embeds`, `components`, or `file`.
   * - If the webhook channel is a forum channel:
   *   - You must provide either thread_id in the query string params, or thread_name in the JSON/form params
   *   - If `thread_id` is provided, the message will send in that thread
   *   - if `thread_name` is provided, a thread with that name will be created in the forum channel
   * @example
   * await api.discord.webhooks.execute({
   *   webook_id: '0000000000',
   *   webhook_token: 'abcdefg',
   *   content: 'message contents here',
   *   username: 'webhook usernrame',
   *   avatar_url: 'https://imgurl.png',
   *   embeds: [{
   *     title: 'example',
   *     description: 'example'
   *   }]
   * });
   * @memberof module:webhooks#
   * @function execute
   * @param {Object} params
   * @param {Snowflake} params.webhook_id
   * @param {string} params.webhook_token
   * @param {string} [params.content] - The message contents (up to 2000 characters)
   * @param {string} [params.username] - Override the default username of the webhook
   * @param {string} [params.avatar_url] - Override the default avatar of the webhook
   * @param {boolean} [params.tts]
   * @param {Embed[]} [params.embeds] - Array of up to 10 embeds
   * @param {Array<Pick<Attachment, 'file' | 'filename' | ?'description'>>} [params.attachments]
   * @param {Component} [params.components] - Requires an application-owned webhook
   * @param {AllowedMentions} [params.allowed_mentions]
   * @param {MessageFlags} [params.flags]
   * @param {Snowflake[]} [params.applied_tags] - Array of tag ids to apply to the thread (requires the webhook channel to be a forum or media channel)
   * @param {string} [params.thread_name]
   * Name of thread to create
   *
   * Available only if the webhook is in a forum channel and a thread is not specified in query parameter
   * @param {Snowflake} [params.thread_id]
   * Send a message to the specified thread within a webhook's channel.
   *
   * The thread will automatically be unarchived
   * @param {boolean} [params.wait=false]
   * Waits for server confirmation of message send before response, and returns the created message body.
   *
   * When `false`, a message that is not saved does not return an error
   * @returns {Promise<{ statusCode: 204, type: 'discord', message: 'Success' }>} `204 No Content` response depending on the `wait` query parameter
   */
  execute: async (params) => {
    let endpoint = `webhooks/${params.webhook_id}/${params.webhook_token}?`;
    endpoint += `${params.thread_id ? `&thread_id=${params.thread_id}` : ''}`;
    endpoint += `${params.wait ? `&wait=${params.wait}` : false}`;
    if (params.attachments && params.attachments?.length)
      return sendAttachment(params, endpoint, 'POST');
    else {
      return attemptHandler({
        method: 'POST',
        endpoint,
        body: {
          username: params.username ?? null,
          avatar_url: params.avatar_url ?? null,
          content: params.content ?? '',
          embeds: params.embeds ?? [],
          components: params.components ?? [],
          tts: params.tts || false,
          allowed_mentions: params.allowed_mentions ?? null,
          flags: params.flags ?? null,
          thread_name: params.thread_name ?? null,
          applied_tags: params.applied_tags ?? null
        }
      });
    }
  }, // End of Execute Webhook

  /**
   * @summary
   * ### [Edit Webhook Message]{@link https://discord.com/developers/docs/resources/webhook#edit-webhook-message}
   * Edits a previously-sent webhook message from the same token.
   * - When the `content` field is edited:
   *   - The `mentions` array in the message object will be reconstructed from scratch based on the new content.
   *   - The `allowed_mentions` field of the edit request controls how this will happen.
   *   - If there is no explicit `allowed_mentions` in the edit request, the content will be parsed with `default` allowances
   *     - (without regard to whether or not an `allowed_mentions` was present in the request that originally created the message)
   * - The `attachments` array must contain all attachments that should be present after the edit, including retained and new attachments
   * @example
   * await api.discord.webhooks.updateMessage({
   *   webhook_id: '0000000000',
   *   webhook_token: 'abcdefg',
   *   message_id: '0000000000',
   *   content: 'new content',
   *   embeds: [{
   *     title: 'new title'
   *   }]
   * });
   * @memberof module:webhooks#
   * @function updateMessage
   * @param {Object} params
   * @param {Snowflake} params.webhook_id
   * @param {string} params.webhook_token
   * @param {Snowflake} params.message_id
   * @param {Snowflake} [params.thread_id]
   * @param {string} [params.content]
   * @param {Embed[]} [params.embeds]
   * @param {Array<Pick<Attachment, 'file' | 'filename' | ?'description'>>} [params.attachments]
   * @param {Component} [params.components]
   * @param {AllowedMentions} [params.allowed_mentions]
   * @returns {Promise<Message>} [Message]{@link https://discord.com/developers/docs/resources/channel#message-object} object
   */
  updateMessage: async (params) => {
    let endpoint = `webhooks/${params.webhook_id}/${params.webhook_token}/messages/${params.message_id}?`;
    endpoint += `${params.thread_id ? `&thread_id=${params.thread_id}` : ''}`;
    if (params.attachments && params.attachments?.length)
      return sendAttachment(params, endpoint, 'PATCH');
    else {
      return attemptHandler({
        method: 'PATCH',
        endpoint,
        body: params
      });
    }
  } // End of Modify Webhook Message
};
