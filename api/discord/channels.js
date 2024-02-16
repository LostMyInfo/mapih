// @ts-check
'use strict';

// //////////////////////////////////////////////////////////////////////
// ////////////////////////////// CHANNELS //////////////////////////////
// //////////////////////////////////////////////////////////////////////
// https://discord.com/developers/docs/resources/channel#channels-resource
const { messageType, channelType } = require('../../enum');
const { embedModifier, extendPayload } = require('../resources/functions');
const { attemptHandler, sendAttachment } = require('../resources/handlers');
/*
let members;
(async (params) => {
  members = await getAll({ guild_id: params.guild_id, limit: 1000 });
})();
*/

/**
 * @file All Discord API functions relating to channels
 * @module channels
 */

module.exports = {
  
  /**
   * @summary
   * ### [Get Channel]{@link https://discord.com/developers/docs/resources/channel#get-channel}
   * @example
   * await api.discord.channels.retrieve({
   *   channel_id: '0000000000'
   * });
   * @memberof module:channels#
   * @function retrieve
   * @param {Object} params
   * @param {Snowflake} params.channel_id
   * @returns {Promise<Channel>} [Channel]{@link https://discord.com/developers/docs/resources/channel#channel-object} object
   */
  retrieve: async (params) => {
    const res = await attemptHandler({
      method: 'GET',
      endpoint: `channels/${params.channel_id}`
    });
    res.typeName = channelType[res.type];
    return res;
  }, // End of Get Channel
  
  /**
   * @summary
   * ### [Modify Channel]{@link https://discord.com/developers/docs/resources/channel#modify-channel}
   * - If modifying a category, individual Channel Update events will fire for each child channel that also changes.
   * 
   * Fires a [Channel Update]{@link https://discord.com/developers/docs/topics/gateway-events#channel-update} Gateway event.
   * @example
   * await api.discord.channels.update({
   *   channel_id: '0000000000',
   *   name: 'newName,
   *   position: 1
   * });
   * @memberof module:channels#
   * @function update
   * @fires channels#channel_update
   * @param {Object} params
   * @param {Snowflake} params.channel_id
   * @param {string} [params.name] - 1-100 character channel name
   * @param {ChannelType} [params.type] - The [type of channel]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
   * @param {?number} [params.position] - The position of the channel in the left-hand listing
   * @param {?string} [params.topic] - 0-1024 character channel topic (0-4096 characters for `GUILD_FORUM` channels)
   * @param {?boolean} [params.nsfw]
   * @param {?number} [params.rate_limit_per_user] - Amount of seconds a user has to wait before sending another message (0-21600)
   * @param {?number} [params.bitrate] - The bitrate (in bits) of the voice or stage channel; min 8000
   * @param {?number} [params.user_limit]
   * The user limit of the voice or stage channel.
   * 
   * Max 99 for voice channels and 10,000 for stage channels (0 refers to no limit).
   * @param {?Overwrite[]} [params.permission_overwrites]
   * ```js
   * [{
   *   type: 0, // '0' - role or '1' - members
   *   allow: '1024', // VIEW_CHANNEL
   *   deny: '2048' // SEND_MESSAGES
   * }]
   * ```
   * @param {?Snowflake} [params.parent_id] - ID of the new parent category for a channel
   * @param {?string} [params.rtc_region]
   * @param {?VideoQualityMode} [params.video_quality_mode]
   * @param {?number} [params.default_auto_archive_duration] - The default duration that the clients use (not the API) for newly created threads in the channel, in minutes, to automatically archive the thread after recent activity
   * @param {?ForumTag[]} [params.available_tags] - The set of [tag objects]{@link https://discord.com/developers/docs/resources/channel#forum-tag-object} that can be used in a `GUILD_FORUM` channel (limit 20)
   * @param {?DefaultReaction} [params.default_reaction_emoji] - The emoji to show in the add reaction button on a thread in a `GUILD_FORUM` channel
   * @param {number} [params.default_thread_rate_limit_per_user]
   * @param {?SortOrderType} [params.default_sort_order]
   * @param {ForumLayoutType} [params.default_forum_layout]
   * @param {ChannelFlags} [params.flags]
   * @param {string} [params.reason]
   * @returns {Promise<Channel>} The updated [Channel]{@link https://discord.com/developers/docs/resources/channel#channel-object} object
   */
  update: async (params) =>
    attemptHandler({
      method: 'PATCH',
      endpoint: `channels/${params.channel_id}`,
      body: params,
      reason: params.reason ?? null
    }), // End of Modify Channel
  
  /**
   * @summary
   * ### [Delete/Close Channel]{@link https://discord.com/developers/docs/resources/channel#deleteclose-channel}
   * - Delete a channel, or close a private message.
   * - Deleting a category does not delete its child channels; they will have their `parent_id` removed and a [Channel Update]{@link https://discord.com/developers/docs/topics/gateway-events#channel-update} Gateway event will fire for each of them.
   * 
   * Fires a [Channel Delete]{@link https://discord.com/developers/docs/topics/gateway-events#channel-delete} Gateway event (or [Thread Delete]{@link https://discord.com/developers/docs/topics/gateway-events#thread-delete} if the channel was a thread).
   * @example
   * await api.discord.channels.destroy({
   *   channel_id: '0000000000'
   * });
   * @memberof module:channels#
   * @function destroy
   * @fires channels#channel_delete
   * @param {Object} params
   * @param {Snowflake} params.channel_id
   * @param {string} [params.reason]
   * @returns {Promise<Channel>} The deleted [Channel]{@link https://discord.com/developers/docs/resources/channel#channel-object} object
   */
  destroy: async (params) =>
    attemptHandler({
      method: 'DELETE',
      endpoint: `channels/${params.channel_id}`,
      reason: params.reason ?? null
    }), // End of Delete/Close Channel
  
  /**
   * @summary
   * ### [Edit Channel Permissions]{@link https://discord.com/developers/docs/resources/channel#edit-channel-permissions}
   * - Edit the channel permission overwrites for a user or role in a channel.
   * - Only usable for guild channels.
   * - Only permissions your bot has in the guild or parent channel can be allowed/denied.
   * 
   * Fires a [Channel Update]{@link https://discord.com/developers/docs/topics/gateway-events#channel-update} Gateway event.
   * @example
   * await api.discord.channels.updatePermissions({
   *   channel_id: '0000000000',
   *   overwrite_id: '0000000000',
   *   type: 1, // member
   *   allow: '1024'
   * });
   * @memberof module:channels#
   * @function updatePermissions
   * @fires channels#channel_update
   * @param {Object} params
   * @param {Snowflake} params.channel_id
   * @param {Snowflake} params.overwrite_id
   * @param {0|1} params.type - 0 for a role or 1 for a member
   * @param {?string} [params.allow='0'] - The bitwise value of all allowed permissions (default '0')
   * @param {?string} [params.deny='0'] - The bitwise value of all disallowed permissions (default '0')
   * @param {string} [params.reason]
   * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
   */
  updatePermissions: async (params) => 
    attemptHandler({
      method: 'PUT',
      endpoint: `channels/${params.channel_id}/permissions/${params.overwrite_id}`,
      body: {
        type: params.type,
        allow: params.allow?.toString() ?? '0',
        deny: params.deny?.toString() ?? '0'
      },
      reason: params.reason ?? null
    }), // End of Edit Channel Permissions
  
  /**
   * @summary
   * ### [Delete Channel Permission]{@link https://discord.com/developers/docs/resources/channel#delete-channel-permission}
   * - Delete a channel permission overwrite for a user or role in a channel.
   * - Only usable for guild channels.
   * 
   * Fires a [Channel Update]{@link https://discord.com/developers/docs/topics/gateway-events#channel-update} Gateway event.
   * @example
   * await deletePermissions({
   *   channel_id: '0000000000',
   *   overwrite_id: '0000000000'
   * });
   * @memberof module:channels#
   * @function deletePermissions
   * @fires channels#channel_update
   * @param {Object} params
   * @param {Snowflake} params.channel_id
   * @param {Snowflake} params.overwrite_id
   * @param {string} [params.reason]
   * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
   */
  deletePermissions: async (params) =>
    attemptHandler({
      method: 'DELETE',
      endpoint: `channels/${params.channel_id}/permissions/${params.overwrite_id}`,
      reason: params.reason ?? null
    }), // End of Delete Channel Permission
  
  /**
   * @summary
   * ### [Get Channel Invites]{@link https://discord.com/developers/docs/resources/channel#get-channel-invites}
   * @example
   * await api.discord.channels.getInvites({
   *   channel_id: '0000000000'
   * });
   * @memberof module:channels#
   * @function getInvites
   * @param {Object} params
   * @param {Snowflake} params.channel_id
   * @returns {Promise<ExtendedInvite[]>} List of [Invite]{@link https://discord.com/developers/docs/resources/invite#invite-object} objects (with [invite metadata]{@link https://discord.com/developers/docs/resources/invite#invite-metadata-object})
   */
  getInvites: async (params) => {
    const attempt = await attemptHandler({
      method: 'GET',
      endpoint: `channels/${params.channel_id}/invites`
    });
    for (let a of attempt)
      a = /* await */extendPayload(a/* , params*/);
    return attempt;
  }, // End of Get Channel Invites
  
  /**
   * @summary
   * ### [Create Channel Invite]{@link https://discord.com/developers/docs/resources/channel#create-channel-invite}
   * 
   * Fires an [Invite Create]{@link https://discord.com/developers/docs/topics/gateway-events#invite-create} Gateway event.
   * @example
   * await api.discord.channels.inviteCreate({
   *   channel_id: '0000000000',
   *   max_age: 7200,
   *   max_uses: 1
   * });
   * @memberof module:channels#
   * @function inviteCreate
   * @fires channels#invite_create
   * @param {Object} params
   * @param {Snowflake} params.channel_id
   * @param {number} [params.max_age=86400]
   * Duration of invite in seconds before expiry, or 0 for never.
   * 
   * Between 0 and 604800 (7 days)
   * @param {number} [params.max_uses=0] - Max number of uses or 0 for unlimited. Between 0 and 100.
   * @param {boolean} [params.temporary=false] - Whether this invite only grants temporary membership.
   * @param {boolean} [params.unique=false] - If true, don't try to reuse a similar invite.
   * @param {InviteTargetType} [params.target_type] - The [type of target]{@link https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types} for this voice channel invite
   * @param {Snowflake} [params.target_user_id] - The id of the user whose stream to display for this invite.
   * Required if `target_type` is 1
   * 
   * The user must be streaming in the channel
   * @param {Snowflake} [params.target_application_id]
   * The id of the embedded application to open for this invite
   * 
   * Required if `target_type` is 2
   * 
   * The application must have the `EMBEDDED` flag
   * @param {string} [params.reason]
   * @returns {Promise<ExtendedInvite>} [Invite]{@link https://discord.com/developers/docs/resources/invite#invite-object} object
   */
  inviteCreate: async (params) => {
    const body = params ? {
      max_age: params.max_age ?? 86400,
      max_uses: params.max_uses ?? 0,
      temporary: params.temporary || false,
      unique: params.unique || false,
      target_type: params.target_type ?? null,
      target_user_id: params.target_user_id ?? null,
      target_application_id: params.target_application_id ?? null
    } : {};
    const attempt = await attemptHandler({
      method: 'POST',
      endpoint: `channels/${params.channel_id}/invites`,
      body,
      reason: params.reason ?? null
    });
    /*
    if (attempt.inviter) {
      attempt.inviter.created_at = retrieveDate(attempt.inviter.id);
      attempt.inviter.badges = getBadges(attempt.inviter.public_flags);
    }
    if (attempt.target_user) {
      attempt.target_user.created_at = retrieveDate(attempt.target_user.id);
      attempt.target_user.badges = getBadges(attempt.target_user.public_flags);
    }
    return attempt;
    */
    
    return extendPayload(attempt/* , params*/);
  }, // End of Create Channel Invite
  
  /**
   * @summary
   * ### [Trigger Typing Indicator]{@link https://discord.com/developers/docs/resources/channel#trigger-typing-indicator}
   * @example
   * await triggerTyping({
   *   channel_id: '0000000000'
   * });
   * @memberof module:channels#
   * @function typingCreate
   * @param {Object} params
   * @param {Snowflake} params.channel_id
   * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
   */
  typingCreate: async (params) =>
    attemptHandler({
      method: 'POST',
      endpoint: `channels/${params.channel_id}/typing`
    }), // End of Trigger Typing Indicator
  
  /**
   * @summary
   * ### [Follow Announcement Channel]{@link https://discord.com/developers/docs/resources/channel#follow-announcement-channel}
   * - Follow an Announcement Channel to send messages to a target channel.
   * 
   * Fires a [Webhooks Update]{@link https://discord.com/developers/docs/topics/gateway-events#webhooks-update} Gateway event.
   * @example
   * await api.discord.channels.followAnnouncementChannel({
   *   channel_id: '0000000000'
   *   webhook_channel_id: '0000000000'
   * });
   * @memberof module:channels#
   * @function followAnnouncementChannel
   * @param {Object} params
   * @param {Snowflake} params.channel_id
   * @param {Snowflake} params.webhook_channel_id - ID of target channel
   * @returns {Promise<FollowedChannel>} [Followed Channel]{@link https://discord.com/developers/docs/resources/channel#followed-channel-object} object
   */
  followAnnouncementChannel: async (params) =>
    attemptHandler({
      method: 'POST',
      endpoint: `channels/${params.channel_id}/followers`,
      body: {
        webhook_channel_id: params.webhook_channel_id
      }
    }), // End of Follow Announcement Channel
  
  /**
   * @summary
   * ### [Group DM Add Recipient]{@link https://discord.com/developers/docs/resources/channel#group-dm-add-recipient}
   * @example
   * await api.discord.channels.groupDMadd({
   *   channel_id: '0000000000',
   *   user_id: '0000000000',
   *   access_token: 'abcdef123456',
   *   nick: 'userNickname'
   * });
   * @memberof module:channels#
   * @function groupDMadd
   * @param {Object} params
   * @param {Snowflake} params.channel_id
   * @param {Snowflake} params.user_id
   * @param {string} params.access_token - Access token of a user that has granted your app the `gdm.join` scope
   * @param {string} [params.nick]
   * @returns {Promise<unknown>}
   */
  groupDMadd: async (params) =>
    attemptHandler({
      method: 'PUT',
      endpoint: `channels/${params.channel_id}/recipients/${params.user_id}`,
      body: {
        access_token: params.access_token,
        nick: params.nick ?? null
      }
    }), // End of Group DM Add Recipient
  
  /**
   * @summary
   * ### [Group DM Remove Recipient]{@link https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient}
   * @example
   * await api.discord.channels.groupDMremove({
   *   channel_id: '0000000000',
   *   user_id: '0000000000'
   * });
   * @memberof module:channels#
   * @function groupDMremove
   * @param {Object} params
   * @param {Snowflake} params.channel_id
   * @param {Snowflake} params.user_id
   * @returns {Promise<unknown>}
   */
  groupDMremove: async (params) =>
    attemptHandler({
      method: 'DELETE',
      endpoint: `channels/${params.channel_id}/recipients/${params.user_id}`
    }), // End of Group DM Remove Recipient

  
  // ///////////////////////////////////////////////////////////////////
  // ////////////////////////// CHANNELS.MESSAGES /////////////////////////
  // ///////////////////////////////////////////////////////////////////
  // https://discord.com/developers/docs/resources/channel#get-channel-messages
  
  /**
   * @summary All functions relating to channel messages
   * @namespace messages
   * @memberof module:channels
   */
  
  messages: {

    /**
     * @summary
     * ### [Get Channel Message]{@link https://discord.com/developers/docs/resources/channel#get-channel-message}
     * @example
     * await api.discord.channels.messages.retrieve({
     *   channel_id: '0000000000',
     *   message_id: '0000000000'
     * });
     * @memberof module:channels.messages#
     * @function retrieve
     * @param {Object} params
     * @param {Snowflake | undefined} params.channel_id
     * @param {Snowflake} params.message_id
     * @returns {Promise<Message>} [Message]{@link https://discord.com/developers/docs/resources/channel#message-object} object
     */
    retrieve: async (params) => {
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint: `channels/${params.channel_id}/messages/${params.message_id}`
      });
      attempt.typeName = messageType[attempt?.type];
      return extendPayload(attempt/* , params*/);
    }, // End of Get Channel Message
    
    /**
     * @summary
     * ### [Create Message]{@link https://discord.com/developers/docs/resources/channel#create-message}
     * - To create a message as a reply to another message, apps can include a [message_reference]{@link MessageReference} with a `message_id`.
     * - The `channel_id` and `guild_id` in the `message_reference` are optional, but will be validated if provided.
     * - When creating a message, apps must provide a value for at least one of `content`, `embeds`, `sticker_ids`, `components`, or `attachments`.
     * 
     * Fires a [Message Create]{@link https://discord.com/developers/docs/topics/gateway-events#message-create} Gateway event.
     * @example
     * await api.discord.channels.messages.create({
     *   channel_id: params.channel_id,
     *   content: 'sup Eric'
     * });
     * @example
     * await api.discord.channels.messages.create({
     *   channel_id: '0000000000',
     *   content: '',
     *   embeds: [{
     *     title: 'embed title',
     *     description: 'embed description'
     *   }],
     *   components: [{
     *     type: 1,
     *     components: [{
     *       type: 2, // button
     *       style: 1,
     *       label: 'buttonLabel',
     *       custom_id: 'asdfghjkl'
     *     }]
     *   }]
     * });
     * @example
     * await api.discord.channels.messages.create({
     *   channel_id: params.channel_id,
     *   content: 'this will surprese all mentions',
     *   allowed_mentions: {
     *     parse: []
     *   }
     * });
     * @memberof module:channels.messages#
     * @function create
     * @fires channels#message_create
     * @param {Object} params
     * @param {Snowflake | undefined} params.channel_id
     * @param {string} [params.content] - Up to 2000 characters
     * @param {Embed[]} [params.embeds] - Up to 10 embeds (up to 6000 characters)
     * @param {Component} [params.components]
     * @param {Pick<Attachment, 'file' | 'filename' | 'description'>[] | Pick<Attachment, 'file' | 'filename'>[]} [params.attachments]
     * @param {AllowedMentions} [params.allowed_mentions]
     * @param {MessageReference} [params.message_reference] - Include to make your message a reply
     * @param {Array<Snowflake>} [params.sticker_ids] - Up to 3 stickers in the server to send in the message
     * @param {MessageFlags} [params.flags] - [Message flags]{@link()} (only `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATION` can be set)
     * @param {boolean} [params.tts]
     * @param {number | string} [params.nonce]
     * @returns {Promise<Message>} [Message]{@link https://discord.com/developers/docs/resources/channel#message-object} object
     */
    create: async (params) => {
      if (params.embeds && params.embeds.length) {
        params.embeds = embedModifier(params.embeds);
      }
      if (params.attachments && params.attachments?.length)
        return sendAttachment(params, `channels/${params.channel_id}/messages`, 'POST');
      else {
        
        const attempt = await attemptHandler({
          method: 'POST',
          endpoint: `channels/${params.channel_id}/messages`,
          body: {
            content: params.content ?? '',
            embeds: params.embeds ?? [],
            components: params.components ?? [],
            tts: params.tts || false,
            allowed_mentions: params.allowed_mentions ?? null,
            message_reference: params.message_reference ?? null,
            sticker_ids: params.sticker_ids ?? null,
            attachments: params.attachments ?? [],
            flags: params.flags ?? null,
            nonce: params.nonce ?? null
          }
        });
        return extendPayload(attempt/* , params*/);
      }
    }, // End of Create Message
    
    /**
     * @summary
     * ### [Edit Message]{@link https://discord.com/developers/docs/resources/channel#edit-message}
     * - When the content field is edited, the mentions array in the message object will be reconstructed from scratch based on the new content.
     * - The allowed_mentions field of the edit request controls how this happens.
     * - If there is no explicit allowed_mentions in the edit request, the content will be parsed with default allowances, that is, without regard to whether or not an allowed_mentions was present in the request that originally created the message.
     * - The attachments array must contain all attachments that should be present after edit, including retained and new attachments provided in the request body.
     * 
     * Fires a [Message Update]{@link https://discord.com/developers/docs/topics/gateway-events#message-update} Gateway event.
     * @example
     * await api.discord.channels.messages.update({
     *   channel_id: '0000000000',
     *   message_id: '0000000000',
     *   content: 'new message content',
     * });
     * @function update
     * @fires channels#message_update
     * @memberof module:channels.messages#
     * @param {Object} params
     * @param {Snowflake | undefined} params.channel_id
     * @param {Snowflake} params.message_id
     * @param {string} [params.content] - Up to 2000 characters
     * @param {Embed[]} [params.embeds] - Up to 10 embeds (up to 6000 characters)
     * @param {Component} [params.components]
     * @param {Array<Pick<Attachment, 'file' | 'filename' | ?'description'>>} [params.attachments]
     * @param {AllowedMentions} [params.allowed_mentions]
     * @param {MessageFlags} [params.flags] - Only `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATION` can be set
     * @returns {Promise<Message>} The updated [Message]{@link https://discord.com/developers/docs/resources/channel#message-object} object
     */
    update: async (params) => {
      if (params.attachments && params.attachments?.length)
        return sendAttachment(params, `channels/${params.channel_id}/messages/${params.message_id}`, 'PATCH');
      else {
        const message = await attemptHandler({
          method: 'GET',
          endpoint: `channels/${params.channel_id}/messages/${params.message_id}`
        });

        const { embeds } = params;
        const embed = embeds?.[0] || undefined;
        
        const attempt = await attemptHandler({
          method: 'PATCH',
          endpoint: `channels/${params.channel_id}/messages/${params.message_id}`,
          body: {
            content: params.content ?? message.content,
            embeds: ('embeds' in params && !params.embeds?.length) || (!message.embeds?.length && !embed) ? [] : [{
              title: embed?.title ?? message.embeds?.[0]?.title,
              description: embed?.description ?? message.embeds?.[0]?.description,
              color: embed?.color ?? message.embeds?.[0]?.color,
              url: embed?.url ?? message.embeds?.[0]?.url,
              timestamp: embed?.timestamp ?? message.embeds?.[0]?.timestamp,
              image: { url: embed?.image?.url ?? message.embeds?.[0]?.image?.url },
              thumbnail: { url: embed?.thumbnail?.url ?? message.embeds?.[0]?.thumbnail?.url },
              author: {
                name: embed?.author?.name ?? message.embeds?.[0]?.author?.name,
                icon_url: embed?.author?.icon_url ?? message.embeds?.[0]?.author?.icon_url,
                url: embed?.author?.url ?? message.embeds?.[0]?.author?.url
              },
              footer: {
                text: embed?.footer?.text ?? message.embeds?.[0]?.footer?.text,
                icon_url: embed?.footer?.icon_url ?? message.embeds?.[0]?.footer?.icon_url
              },
              fields: embed?.fields ?? message.embeds?.[0]?.fields
            }],
            components: params.components && !params.components.length ? [] : (message.components ?? []),
            allowed_mentions: params.allowed_mentions
          }
        });
        return extendPayload(attempt/* , params*/);
      }  
    }, // End of Edit Message
    
    /**
     * @summary
     * ### [Delete Message]{@link https://discord.com/developers/docs/resources/channel#delete-message}
     * 
     * Fires a [Message Delete]{@link https://discord.com/developers/docs/topics/gateway-events#message-delete} Gateway event
     * @example
     * await api.discord.channels.messages.destroy({
     *   channel_id: '0000000000',
     *   message_id: '0000000000'
     * });
     * @function destroy
     * @fires channels#messages_delete
     * @memberof module:channels.messages#
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.message_id
     * @param {string} [params.reason]
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    destroy: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `channels/${params.channel_id}/messages/${params.message_id}`,
        reason: params.reason ?? null
      }), // End of Delete Message
    
    /**
     * @summary
     * ### [Bulk Delete Messages]{@link https://discord.com/developers/docs/resources/channel#bulk-delete-messages}
     * - This endpoint will not delete messages older than 2 weeks.
     * - If attempted to delete messages older than 2 weeks or have duplicate message IDs, it will fail with a `400 BAD REQUEST`
     * @example
     * await api.discord.channels.messages.bulkDelete({
     *   channel_id: '0000000000',
     *   messages: [
     *     '0000000000',
     *     '0000000000'
     *   ]
     * });
     * @memberof module:channels.messages#
     * @function bulkDelete
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake[]} params.messages
     * @param {string} [params.reason]
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    bulkDelete: async (params) =>
      attemptHandler({
        method: 'POST',
        endpoint: `channels/${params.channel_id}/messages/bulk-delete`,
        body: { messages: params.messages },
        reason: params.reason ?? null
      }), // End of Bulk Delete Messages

    /**
     * @summary
     * ### [Crosspost Message]{@link https://discord.com/developers/docs/resources/channel#crosspost-message}
     * 
     * Crosspost a message in an Announcement Channel to following channels.
     * @example
     * await api.discord.channels.messages.crosspost({
     *   channel_id: '0000000000',
     *   message_id: '0000000000'
     * });
     * @memberof module:channels.messages#
     * @function crosspost
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.message_id
     * @returns {Promise<Message>} [Message]{@link https://discord.com/developers/docs/resources/channel#message-object} object
     */
    crosspost: async (params) =>
      attemptHandler({
        method: 'POST',
        endpoint: `channels/${params.channel_id}/messages/${params.message_id}/crosspost`
      }), // End of Crosspost Message
  
    /**
     * @summary
     * ### [Get Channel Messages]{@link https://discord.com/developers/docs/resources/channel#get-channel-messages}
     * @example
     * await getAllMessages({
     *   channel_id: '000000000000000',
     *   limit: 50
     * });
     * @memberof module:channels.messages#
     * @function getAll
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {number} [params.limit=50] - Max number of messages to return (1-100). Default 50.
     * @param {Snowflake} [params.around] - Get messages around this message ID
     * @param {Snowflake} [params.before] - Get messages before this message ID
     * @param {Snowflake} [params.after] - Get messages after this message ID
     * @returns {Promise<Message[]>} Array of [Message]{@link https://discord.com/developers/docs/resources/channel#message-object} objects
     */
    getAll: async (params) => {
      let endpoint = `channels/${params.channel_id}/messages?`;
      endpoint += `${params.limit ? `&limit=${params.limit}` : ''}`;
      endpoint += `${params.around ? `&around=${params.around}` : ''}`;
      endpoint += `${params.before ? `&before=${params.before}` : ''}`;
      endpoint += `${params.after ? `&after=${params.after}` : ''}`;
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint
      });
      for (let message of attempt)
        message = /* await */extendPayload(message/* , params*/);
      return attempt;
    }, // End of Get Channel Messages

    /**
     * @summary
     * ### [Pin Message]{@link https://discord.com/developers/docs/resources/channel#pin-message}
     * 
     * Fires a [Channel Pins Update]{@link https://discord.com/developers/docs/topics/gateway-events#channel-pins-update} Gateway event.
     * @example
     * await api.discord.channels.pin({
     *   channel_id: '0000000000',
     *   message_id: '0000000000'
     * });
     * @memberof module:channels.messages#
     * @function pin
     * @fires channels#channel_pin_update
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.message_id
     * @param {string} [params.reason]
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    pin: async (params) =>
      attemptHandler({
        method: 'PUT',
        endpoint: `channels/${params.channel_id}/pins/${params.message_id}`,
        reason: params.reason ?? null
      }), // End of Pin Message

    /**
     * @summary
     * ### [Unpin Message]{@link https://discord.com/developers/docs/resources/channel#unpin-message}
     * 
     * Fires a [Channel Pins Update]{@link https://discord.com/developers/docs/topics/gateway-events#channel-pins-update} Gateway event.
     * @example
     * await api.discord.channels.unpin({
     *   channel_id: '0000000000',
     *   message_id: '0000000000'
     * });
     * @memberof module:channels.messages#
     * @function unpin
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.message_id
     * @param {string} [params.reason]
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    unpin: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `channels/${params.channel_id}/pins/${params.message_id}`,
        reason: params.reason ?? null
      }), // End of Unpin Message

    /**
     * @summary
     * ### [Get Pinned Messages]{@link https://discord.com/developers/docs/resources/channel#get-pinned-messages}
     * @example
     * await api.discord.channels.getPinned({
     *   channel_id: '0000000000'
     * });
     * @memberof module:channels.messages#
     * @function getPinned
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @returns {Promise<Message[]>} All pinned messages in the channel as an array of [Message]{@link https://discord.com/developers/docs/resources/channel#message-object}
     */
    getPinned: async (params) => {
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint: `channels/${params.channel_id}/pins`
      });
      for (let message of attempt)
        message = /* await */extendPayload(message/* , params*/);
      return attempt;
    } // End of Get Pinned Messages

  }, // End of channels.messages

  // ///////////////////////////////////////////////////////////////////
  // ///////////////////////// CHANNELS.THREADS ////////////////////////
  // ///////////////////////////////////////////////////////////////////

  /**
   * @summary The module containing thread-related functions.
   * @namespace threads
   * @memberof module:channels
   */
  threads: {

    /**
     * @summary
     * ### [Start Thread in Forum Channel]{@link https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel}
     * Creates a new thread in a forum channel, and sends a message within the created thread.
     * @example
     * await api.discord.channels.threads.forumThreadCreate({
     *   channel_id: '0000000000',
     *   name: 'thread name',
     *   message: {
     *     content: 'new message',
     *     embeds: [{
     *       title: 'example',
     *       description: 'example'
     *     }]
     *   },
     *   auto_archive_duration: 4320
     * });
     * @memberof module:channels.threads#
     * @function forumThreadCreate
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {string} params.name
     * @param {ForumThreadMessageParams} params.message - First message in the forum thread
     * @param {60 | 1440 | 4320 | 10080} [params.auto_archive_duration]
     * Duration in minutes to automatically archive the thread after recent activity
     * 
     * Can be set to: 60, 1440, 4320, 10080
     * @param {number} [params.rate_limit_per_user] - Amount of seconds a user has to wait before sending another message (0-21600)
     * @param {Snowflake[]} [params.applied_tags] - The IDs of the set of tags that have been applied to a thread in a `GUILD_FORUM` channel
     * @param {string} [params.reason]
     * @returns {Promise<Channel>} A channel with a nested message object
     */
    forumThreadCreate: async (params) => {
      const tag_ids = [];
      if (params.applied_tags) {
        /**
         * @type {ForumTag[]}
         */
        const availableTags = (await attemptHandler({
          method: 'GET',
          endpoint: `channels/${params.channel_id}`
        }))?.available_tags;
        const tagsMap = new Map();
        if (availableTags?.length)
          availableTags.forEach((tag) => {
            tagsMap.set(tag.id, tag);
            tagsMap.set(tag.name, tag);
          });
        
        for (const appliedTag of params.applied_tags)
          if (tagsMap.get(appliedTag))
            tag_ids.push((tagsMap.get(appliedTag)).id);
      }
      
      if (params.message?.attachments && params.message?.attachments?.length)
        return sendAttachment(params, `channels/${params.channel_id}/threads`, 'POST');
      else {
        return attemptHandler({
          method: 'POST',
          endpoint: `channels/${params.channel_id}/threads`,
          body: {
            name: params.name,
            message: {
              content: params?.message.content ?? null,
              embeds: params.message?.embeds ?? null,
              components: params.message?.components ?? null,
              allowed_mentions: params?.message.allowed_mentions ?? null,
              sticker_ids: params.message?.sticker_ids ?? null,
              flags: params.message?.flags ?? null
            },
            auto_archive_duration: params.auto_archive_duration ?? null,
            rate_limit_per_user: params.rate_limit_per_user ?? null,
            applied_tags: tag_ids
          },
          reason: params.reason ?? null
        });
      }
    }, // End of Start Thread in Forum Channel

    /**
     * @summary
     * ### [Start Thread from Message]{@link https://discord.com/developers/docs/resources/channel#start-thread-from-message}
     * Creates a new thread from an existing message.
     * - When called on a `GUILD_TEXT` channel, creates a `PUBLIC_THREAD`.
     * - When called on a `GUILD_ANNOUNCEMENT` channel, creates an `ANNOUNCEMENT_THREAD`.
     * - Does not work on a `GUILD_FORUM` channel.
     * - The ID of the created thread will be the same as the ID of the source message, and as such a message can only have a single thread created from it.
     * @example
     * await api.discord.channels.threads.createFromMessage({
     *   channel_id: '0000000000',
     *   message_id: '0000000000',
     *   name: 'thread name',
     *   auto_archive_duration: 10080
     * });
     * @memberof module:channels.threads#
     * @function createFromMessage
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.message_id
     * @param {string} params.name - 1-100 character channel name
     * @param {60 | 1440 | 4320 | 10080} [params.auto_archive_duration]
     * The amount of minutes to wait before automatically archiving the thread
     * 
     * Can be set to: 60, 1440, 4320, 10080
     * @param {number} [params.rate_limit_per_user] - Amount of seconds a user has to wait before sending another message (0-21600)
     * @param {string} [params.reason]
     * @returns {Promise<Channel>} [Channel]{@link https://discord.com/developers/docs/resources/channel#channel-object} on success
     */
    createFromMessage: async (params) =>
      attemptHandler({
        method: 'POST',
        endpoint: `channels/${params.channel_id}/messages/${params.message_id}/threads`,
        body: {
          name: params.name,
          auto_archive_duration: params.auto_archive_duration ?? null,
          rate_limit_per_user: params.rate_limit_per_user ?? null
        },
        reason: params.reason ?? null
      }), // End of Start Thread from Message
  
    /**
     * @summary
     * ### [Start Thread without Message]{@link https://discord.com/developers/docs/resources/channel#start-thread-without-message}
     * Creates a new thread that is not connected to an existing message.
     * @example
     * await api.discord.channels.threads.createWithoutMessage({
     *   channel_id: '0000000000',
     *   name: 'thread name',
     *   type: 11, // PUBLIC_THREAD
     *   auto_archive_duration: 10080,
     *   invitable: true
     * });
     * @memberof module:channels.threads#
     * @function createWithoutMessage
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {string} params.name - 1-100 character channel name
     * @param {ChannelType} [params.type=12]
     * The [type of thread]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types} to create.
     * 
     * Defaults to `12` - `PRIVATE_THREAD`
     * @param {boolean} [params.invitable] - Whether non-moderators can add other non-moderators to a thread; only available when creating a private thread
     * @param {60 | 1440 | 4320 | 10080} [params.auto_archive_duration]
     * The amount of minutes to wait before automatically archiving the thread
     * 
     * Can be set to: 60, 1440, 4320, 10080
     * @param {number} [params.rate_limit_per_user] - Amount of seconds a user has to wait before sending another message (0-21600)
     * @param {string} [params.reason]
     * @returns {Promise<Channel>} [Channel]{@link https://discord.com/developers/docs/resources/channel#channel-object} on success
     */
    createWithoutMessage: async (params) =>
      attemptHandler({
        method: 'POST',
        endpoint: `channels/${params.channel_id}/threads`,
        body: {
          name: params.name,
          type: params.type ?? 12,
          invitable: params.invitable || false,
          auto_archive_duration: params.auto_archive_duration ?? null,
          rate_limit_per_user: params.rate_limit_per_user ?? null
        },
        reason: params.reason ?? null
      }), // End of Start Thread from Message
  
    /**
     * @summary
     * ### [Join Thread]{@link https://discord.com/developers/docs/resources/channel#join-thread}
     * Adds the current user to a thread.
     * - Requires the thread is not archived.
     * @example
     * await api.discord.channels.threads.join({
     *   channel_id: '0000000000'
     * });
     * @memberof module:channels.threads#
     * @function join
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    join: async (params) =>
      attemptHandler({
        method: 'PUT',
        endpoint: `channels/${params.channel_id}/thread-members/@me`
      }), // End of Join Thread
  
    /**
     * @summary
     * ### [Leave Thread]{@link https://discord.com/developers/docs/resources/channel#leave-thread}
     * @description
     * Removes the current user from a thread.
     * - Requires the thread is not archived.
     * @example
     * await api.discord.channels.threads.leave({
     *   channel_id: '0000000000'
     * });
     * @memberof module:channels.threads#
     * @function leave
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    leave: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `channels/${params.channel_id}/thread-members/@me`
      }), // End of Leave Thread
  
    /**
     * @summary
     * ### [Add Thread Member]{@link https://discord.com/developers/docs/resources/channel#add-thread-member}
     * Adds another member to a thread.
     * - Requires the ability to send messages in the thread.
     * - Requires the thread is not archived.
     * @example
     * await api.discord.channels.threads.addMember({
     *   channel_id: '0000000000',
     *   user_id: '0000000000'
     * });
     * @memberof module:channels.threads#
     * @function addMember
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.user_id
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    addMember: async (params) =>
      attemptHandler({
        method: 'PUT',
        endpoint: `channels/${params.channel_id}/thread-members/${params.user_id}`
      }), // End of Add Thread Member
  
    /**
     * @summary
     * ### [Remove Thread Member]{@link https://discord.com/developers/docs/resources/channel#add-thread-member}
     * Removes another member to a thread.
     * - Requires the `MANAGE_THREADS` permission, or the creator of the thread if it is a `PRIVATE_THREAD`. 
     * - Requires the thread is not archived.
     * @example
     * await api.discord.channels.threads.removeMember({
     *   channel_id: '0000000000',
     *   user_id: '0000000000'
     * });
     * @memberof module:channels.threads#
     * @function removeMember
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.user_id
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    removeMember: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `channels/${params.channel_id}/thread-members/${params.user_id}`
      }), // End of Remove Thread Member
  
    /**
     * @summary
     * ### [Get Thread Member]{@link https://discord.com/developers/docs/resources/channel#get-thread-member}
     * - When `with_member` is set to `true`, the thread member object will include a `member` field containing a [Guild Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object} object
     * @example
     * await api.discord.channels.threads.getMember({
     *   channel_id: '0000000000',
     *   user_id: '0000000000',
     *   with_member: true
     * });
     * @memberof module:channels.threads#
     * @function retrieveMember
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.user_id
     * @param {boolean} [params.with_member] - Whether to include a [Guild Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object} object for the thread member
     * @returns {Promise<ThreadMember>} [Thread Member]{@link https://discord.com/developers/docs/resources/channel#thread-member-object} object for the specified user if they are a member of the thread, returns a `404` response otherwise
     */
    retrieveMember: async (params) => {
      let endpoint = `channels/${params.channel_id}/thread-members/${params.user_id}?`;
      endpoint += `${params.with_member ? `&with_member=${params.with_member}` : ''}`;
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint
      });
      return extendPayload(attempt/* , params*/);
    }, // End of Get Thread Member
  
    /**
     * @summary
     * ### [List Thread Members]{@link https://discord.com/developers/docs/resources/channel#list-thread-members}
     * - When `with_member` is set to `true`, the thread member object will include a `member` field containing a [Guild Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object} object
     * @example
     * await api.discord.channels.threads.getAllMembers({
     *   channel_id: '0000000000',
     *   with_member: true
     * });
     * @memberof module:channels.threads#
     * @function getAllMembers
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {boolean} [params.with_member] - Whether to include a [guild member object]{@link(https://discord.com/developers/docs/resources/guild#guild-member-object)} for the thread member
     * @param {Snowflake} [params.after] - Get thread members after this user ID
     * @param {number} [params.limit=100] - Max number of thread members to return (1-100). Defaults to 100.
     * @returns {Promise<ThreadMember[]>} An array of [Thread Members]{@link(https://discord.com/developers/docs/resources/channel#thread-member-object)} objects that are members of the thread
     */
    getAllMembers: async (params) => {
      let endpoint = `channels/${params.channel_id}/thread-members`;
      endpoint += `${params.with_member ? `&with_member=${params.with_member}` : ''}?`;
      endpoint += `${params.after ? `&after=${params.after}` : ''}`;
      endpoint += `${params.limit ? `&limit=${params.limit}` : ''}`;
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint
      });

      for (let a of attempt)
        a = /* await */extendPayload(a/* , params*/);
      return attempt;
      // return extendUser(attempt);
    }, // End of List Thread Members
  
    /**
     * @summary
     * ### [List Public Archived Threads]{@link https://discord.com/developers/docs/resources/channel#list-public-archived-threads}
     * Returns archived threads in the channel that are public.
     * - When called on a `GUILD_TEXT` channel, returns threads of [type]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types} `PUBLIC_THREAD`.
     * - When called on a `GUILD_ANNOUNCEMENT` channel, returns threads of [type]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types} `ANNOUNCEMENT_THREAD`.
     * - Threads are ordered by `archive_timestamp`, in descending order.
     * @example
     * await api.discord.channels.threads.getAllPublicArchived({
     *   channel_id: '0000000000',
     *   limit: 10
     * });
     * @memberof module:channels.threads#
     * @function getAllPublicArchived
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {number} [params.limit] - Optional maximum number of threads to return
     * @param {ISO8601Timestamp} [params.before] - Returns threads before this id or timestamp
     * @returns {Promise<Channel[] & ThreadMember[] & boolean>} Archived threads in the channel that are public.
     * [Response Body]{@linkhttps://discord.com/developers/docs/resources/channel#list-public-archived-threads-response-body}.
     */
    getAllPublicArchived: async (params) => {
      let endpoint = `channels/${params.channel_id}/threads/archived/public?`;
      endpoint += `${params.limit ? `&limit=${params.limit}` : ''}`;
      endpoint += `${params.before ? `&before=${params.before}` : ''}`;
      return attemptHandler({
        method: 'GET',
        endpoint
      });
    }, // End of List Public Archived Threads
  
    /**
     * @summary
     * ### [List Private Archived Threads]{@link https://discord.com/developers/docs/resources/channel#list-private-archived-threads}
     * Returns archived threads in the channel that are of [type]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types} `PRIVATE_THREAD`.
     * - Threads are ordered by `archive_timestamp`, in descending order.
     * @example
     * await api.discord.channels.threads.getAllPrivateArchived({
     *   channel_id: '0000000000',
     *   limit: 10
     * });
     * @memberof module:channels.threads#
     * @function getAllPrivateArchived
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {number} [params.limit] - Optional maximum number of threads to return
     * @param {ISO8601Timestamp} [params.before] - Returns threads before this timestamp
     * @returns {Promise<Channel[] & ThreadMember[] & boolean>} Archived threads in the channel that are public.
     * [Response Body]{@link https://discord.com/developers/docs/resources/channel#list-public-archived-threads-response-body}.
     */
    getAllPrivateArchived: async (params) => {
      let endpoint = `channels/${params.channel_id}/threads/archived/private?`;
      endpoint += `${params.limit ? `&limit=${params.limit}` : ''}`;
      endpoint += `${params.before ? `&before=${params.before}` : ''}`;
      return attemptHandler({
        method: 'GET',
        endpoint
      });
    }, // End of List Private Archived Threads
  
    /**
     * @summary
     * ### [List Joined Private Archived Threads]{@link https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads}
     * Returns archived threads in the channel that are of [type]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types} `PRIVATE_THREAD`, and the user has joined.
     * - Threads are ordered by their `id`, in descending order.
     * @example
     * await api.discord.channels.threads.listJoinedPrivateArchivedThreads({
     *   channel_id: '0000000000',
     *   limit: 10
     * });
     * @memberof module:channels.threads#
     * @function getAllJoinedPrivateArchived
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {number} [params.limit] - Optional maximum number of threads to return
     * @param {ISO8601Timestamp} [params.before] - Returns threads before this timestamp
     * @returns {Promise<Channel[] & ThreadMember[] & boolean>} Archived threads in the channel that are public.
     *  [Response Body]{@link https://discord.com/developers/docs/resources/channel#list-public-archived-threads-response-body}.
     */
    getAllJoinedPrivateArchived: async (params) => {
      let endpoint = `channels/${params.channel_id}/users/@me/threads/archived/private?`;
      endpoint += `${params.limit ? `&limit=${params.limit}` : ''}`;
      endpoint += `${params.before ? `&before=${params.before}` : ''}`;
      return attemptHandler({
        method: 'GET',
        endpoint
      });
    } // End of List Private Archived Threads
  
  }, // End of channels.threads
  
  // ///////////////////////////////////////////////////////////////////////
  // ////////////////////////// CHANNELS.REACTIONS /////////////////////////
  // ///////////////////////////////////////////////////////////////////////
  // https://discord.com/developers/docs/resources/channel#get-channel-messages
  
  /**
   * @summary All functions relating to channel reactions
   * @namespace reactions
   * @memberof module:channels
   */
  reactions: {
     
    /**
     * @summary
     * ### [Create Reaction]{@link https://discord.com/developers/docs/resources/channel#create-reaction}
     * @example
     * await api.discord.channels.reactions.create({
     *   channel_id: '0000000000000',
     *   message_id: '0000000000000',
     *   emoji: 'name:id'
     * });
     * @memberof module:channels.reactions#
     * @function create
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.message_id
     * @param {string} params.emoji
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    create: async (params) =>
      attemptHandler({
        method: 'PUT',
        endpoint: `channels/${params.channel_id}/messages/${params.message_id}/reactions/${params.emoji}/@me`
      }), // End of Create Reaction
    
    /**
     * @summary
     * ### [Create Multiple Reactions]{@link https://discord.com/developers/docs/resources/channel#create-reaction}
     * @example
     * await api.discord.channels.reactions.createMany({
     *   channel_id: '0000000000000',
     *   message_id: '0000000000000',
     *   emojis: [
     *     'name:id'
     *     'name:id'
     *   ],
     *   delay: 300
     * });
     * @memberof module:channels.reactions#
     * @function create
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.message_id
     * @param {string[]} params.emojis - An array of emoji parameters
     * @param {number} [params.delay] - The delay (in milliseconds) between each reaction (to help with rate-limiting)
     * @returns {Promise<undefined>} `204 No Content`
     */
    createMany: async (params) => {
      if (!params.emojis || !Array.isArray(params.emojis))
        throw new Error('\`emojis\` must be an array of \`emoji_name:emoji_id:\` strings');
      
      for (const emoji of params.emojis) {
        await attemptHandler({
          method: 'PUT',
          endpoint: `channels/${params.channel_id}/messages/${params.message_id}/reactions/${emoji}/@me`
        });
        await new Promise(resolve => setTimeout(resolve, params.delay ?? 300));
      }
      return undefined;
    },

    /**
     * @summary
     * ### [Delete Own Reaction]{@link https://discord.com/developers/docs/resources/channel#delete-own-reaction}
     * @example
     * await api.discord.channels.reactions.deleteOwn({
     *   channel_id: '0000000000000',
     *   message_id: '0000000000000',
     *   emoji: ':name:id'
     * });
     * @memberof module:channels.reactions#
     * @function deleteOwn
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.message_id
     * @param {string} params.emoji
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    deleteOwn: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `channels/${params.channel_id}/messages/${params.message_id}/reactions/${params.emoji}/@me`
      }), // End of Delete Own Reaction
    
    /**
     * @summary
     * ### [Delete User Reaction]{@link https://discord.com/developers/docs/resources/channel#delete-user-reaction}
     * @example
     * await api.discord.channels.reactions.deleteUser({
     *   channel_id: '0000000000000',
     *   message_id: '0000000000000',
     *   user_id: '0000000000',
     *   emoji: ':name:id'
     * });
     * @memberof module:channels.reactions#
     * @function deleteUser
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.message_id
     * @param {Snowflake} params.user_id
     * @param {string} params.emoji
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    deleteUser: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `channels/${params.channel_id}/messages/${params.message_id}/reactions/${params.emoji}/${params.user_id}`
      }), // End of Delete User Reaction
    
    /**
     * @summary
     * ### [Delete All Reactions]{@link https://discord.com/developers/docs/resources/channel#delete-all-reactions}
     * @example
     * await api.discord.channels.reactions.deleteAll({
     *   channel_id: '000000000000000000',
     *   message_id: '000000000000000000'
     * });
     * @memberof module:channels.reactions#
     * @function deleteAll
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.message_id
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    deleteAll: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `channels/${params.channel_id}/messages/${params.message_id}/reactions`
      }), // End of Delete All Reaction
    
    /**
     * @summary
     * ### [Delete All Reactions for Emoji]{@link https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji}
     * @example
     * await api.discord.channels.reactions.deleteAllEmoji({
     *   channel_id: '0000000000000',
     *   message_id: '0000000000000',
     *   emoji: ':name:id'
     * });
     * @memberof module:channels.reactions#
     * @function deleteAllEmoji
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.message_id
     * @param {string} params.emoji
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    deleteAllEmoji: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `channels/${params.channel_id}/messages/${params.message_id}/reactions/${params.emoji}`
      }), // End of Delete All Reactions for Emoji
    
    /**
     * @summary
     * ### [Get Reactions]{@link https://discord.com/developers/docs/resources/channel#get-reactions}
     * @example
     * await api.discord.channels.reactions.getUsers({
     *   channel_id: '0000000000',
     *   message_id: '0000000000',
     *   emoji: ':name:id,
     *   limit: 50
     * });
     * @memberof module:channels.reactions#
     * @function getUsers
     * @param {Object} params
     * @param {Snowflake} params.channel_id
     * @param {Snowflake} params.message_id
     * @param {string} params.emoji
     * @param {Snowflake} [params.after]
     * @param {number} [params.limit=25] - Max number of users to return (1-100). Default 25.
     * @returns {Promise<User[]>} Array of [User]{@link https://discord.com/developers/docs/resources/user#user-object} objects
     */
    getUsers: async (params) => {
      let endpoint = `channels/${params.channel_id}/messages/${params.message_id}/reactions/${params.emoji}?`;
      endpoint += `${params.limit ? `&limit=${params.limit}` : ''}`;
      endpoint += `${params.after ? `&after=${params.after}` : ''}`;
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint
      });

      for (let a of attempt)
        a = /* await */extendPayload(a/* , params*/);
      return attempt;
    } // End of Get Reactions
    
  }
};