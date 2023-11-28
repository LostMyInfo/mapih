// @ts-check
'use strict';

const { attemptHandler, sendAttachment, imageData, getBadges, retrieveDate, avatarFromObject, generateCDN } = require('../resources/functions');

// Users
// https://discord.com/developers/docs/resources/user#users-resource

/**
 * @file All functions relating to Discord users
 * @module users
 */

module.exports = {

  /**
   * @summary
   * ### [Get User]{@link https://discord.com/developers/docs/resources/user#get-user}
   * @example
   * await api.discord.users.retrieve({
   *   user_id: '0000000000'
   * });
   * @memberof module:users#
   * @function retrieve
   * @param {object} params
   * @param {Snowflake} params.user_id
   * @returns {Promise<User>} [User]{@link https://discord.com/developers/docs/resources/user#user-object} object
   */
  retrieve: async (params) => {
    const attempt = await attemptHandler({
      method: 'get',
      path: `users/${params.user_id}`
    });
    attempt.badges = getBadges(attempt.public_flags ?? attempt.flags);
    attempt.created_at = retrieveDate(attempt.id, true);
    attempt.avatarURL = avatarFromObject(attempt.id, attempt.avatar);
    if (attempt.banner)
      attempt.bannerURL = generateCDN(attempt, 'banner');
    return attempt;
  }, // End of Get User

  /**
   * @summary
   * ### [Get Current User]{@link https://discord.com/developers/docs/resources/user#get-current-user}
   * - For OAuth2, this requires the `identify` scope, which will return the object without an email.
   * - If `email` scope is provided, the object will inlude an email.
   * @example
   * await api.discord.users.currentUser();
   * @memberof module:users#
   * @function currentUser
   * @returns {Promise<User>} [User]{@link https://discord.com/developers/docs/resources/user#user-object} object
   */
  currentUser: async () =>
    attemptHandler({
      method: 'get',
      path: 'users/@me'
    }), // End of Get Current User
  
  /** 
   * @summary
   * ### [Get Current User Guilds]{@link https://discord.com/developers/docs/resources/user#get-current-user-guilds}
   * - Requires the `guilds` OAuth2 scope.
   * - This endpoint returns 200 guilds by default, which is the maximum number of guilds a non-bot user can join.
   * - Therefore, pagination is not needed for integrations that need to get a list of the users' guilds.
   * @example
   * await api.discord.users.myGuilds(params);
   * @example
   * await api.discord.users.myGuilds();
   * @function myGuilds
   * @memberof module:users#
   * @param {object} [params=null]
   * @param {number} [params.limit=200] - Max number of guilds to return (1-200)
   * @param {Snowflake} [params.before] - Get guilds before this guild ID
   * @param {Snowflake} [params.after] - Get guilds after this guild ID
   * @returns {Promise<PartialGuild[]>} List of [partial Guild]{@link https://discord.com/developers/docs/resources/user#get-current-user-guilds-example-partial-guild} objects
   */
  myGuilds: async (params) => {
    let path = 'users/@me/guilds?';
    if (params) {
      path += `${params.limit ? `&limit=${params.limit}` : ''}`;
      path += `${params.before ? `&before=${params.before}` : ''}`;
      path += `${params.after ? `&after=${params.after}` : ''}`;
    }
    const attempt = await attemptHandler({
      method: 'get',
      path
    });
    for (const guild of attempt) {
      if (guild.icon)
        guild.icon_url = generateCDN(guild, 'icon');
      if (guild.banner)
        guild.banner_url = generateCDN(guild, 'banner');
      if (guild.splash)
        guild.splash_url = generateCDN(guild, 'splash');
      if (guild.discovery_splash)
        guild.discovery_splash_url = generateCDN(guild, 'discovery_splash');
    }
    return attempt;
  }, // End of Get Current User Guilds

  /** 
   * @summary
   * ### [Get Current User Guild Member]{@link https://discord.com/developers/docs/resources/user#get-current-user-guild-member}
   * - Requires the `guilds.members.read` OAuth2 scope.
   * @example
   * await api.discord.users.currentMember({
   *   guild_id: '0000000000'
   * });
   * @function currentMember
   * @memberof module:users#
   * @param {object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<Member>} [Guild Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object} object
   */
  currentMember: async (params) =>
    attemptHandler({
      method: 'get',
      path: `users/@me/guilds/${params.guild_id}/member`
    }), // End of Get Current User Guild Member

  /**
   * @summary
   * ### [Modify Current User]{@link https://discord.com/developers/docs/resources/user#modify-current-user}
   * @example
   * await api.discord.users.modifyCurrent({
   *   username: 'newUsername',
   *   avatar: 'https://www.imgURL.com' // or buffer
   * });
   * @function modifyCurrent
   * @memberof module:users#
   * @fires users#update
   * @param {object} params
   * @param {string} [params.username] - User's username, if changed may cause the user's discriminator to be randomized.
   * @param {?string | Buffer} [params.avatar] - If passed, modifies the user's avatar
   * @returns {Promise<User>} [User]{@link https://discord.com/developers/docs/resources/user#user-object} object
   */
  modifyCurrent: async (params) =>
    attemptHandler({
      method: 'post',
      path: 'users/@me',
      body: {
        username: params.username ?? null,
        avatar: params.avatar ? (await imageData(params.avatar, 'base64string')).data : null
      }
    }), // End of Modify Current User
  
  /** 
   * @summary
   * ### [Get User Connections]{@link https://discord.com/developers/docs/resources/user#get-user-connections}
   * - Requires the `connections` OAuth2 scope.
   * @example
   * await api.discord.users.connections();
   * @function connections
   * @memberof module:users#
   * @returns {Promise<Connection[]>} List of [Connection]{@link https://discord.com/developers/docs/resources/user#connection-object} objects
   */
  connections: async () =>
    attemptHandler({
      method: 'get',
      path: 'users/@me/connections'
    }), // End of Get User Connections

  /**
   * @summary
   * ### [Get User Application Role Connection]{@link https://discord.com/developers/docs/resources/user#get-user-application-role-connection}
   * - Requires an OAuth2 access token with `role_connections.write` scope for the application specified in the path
   * @example
   * await api.discord.users.appRoleConnection({
   *   application_id: '0000000000'
   * });
   * @function appRoleConnection
   * @memberof module:users#
   * @param {object} params
   * @param {Snowflake} params.application_id
   * @returns {Promise<ApplicationRoleConnection>} [Application Role Connection]{@link https://discord.com/developers/docs/resources/user#application-role-connection-object} for the user
   */
  appRoleConnection: async (params) =>
    attemptHandler({
      method: 'get',
      path: `users/@me/applications/${params.application_id}/role-connection`
    }), // End of Get User Application Role Connection

  /**
   * @summary
   * ### [Update User Application Role Connection]{@link https://discord.com/developers/docs/resources/user#update-user-application-role-connection}
   * - Requires an OAuth2 access token with `role_connections.write` scope for the application specified in the path
   * @example
   * await api.discord.users.updateAppRoleConnection({
   *   application_id: '0000000000',
   *   platform_name: 'OnSocket'
   * });
   * @function updateAppRoleConnection
   * @memberof module:users#
   * @param {object} params
   * @param {Snowflake} params.application_id
   * @param {string} [params.platform_name] - The vanity name of the platform a bot has connected (max 50 characters)
   * @param {string} [params.platform_username] - The username on the platform a bot has connected (max 100 characters)
   * @param {ApplicationRoleConnectionMetadata} [params.metadata]
   * @returns {Promise<object>} The [Application Role Connection]{@link https://discord.com/developers/docs/resources/user#application-role-connection-object} for the user
   */
  updateAppRoleConnection: async (params) =>
    attemptHandler({
      method: 'put',
      path: `users/@me/applications/${params.application_id}/role-connection`,
      body: {
        platform_name: params.platform_name ?? null,
        platform_username: params.platform_username ?? null,
        metadata: params.metadata ?? null
      }
    }), // End of Update User Application Role Connection
  
  /**
   * @summary
   * ### [Create DM]{@link https://discord.com/developers/docs/resources/user#create-dm}
   * @example
   * await api.discord.users.createDM({
   *   recipient_id: '0000000000',
   *   content: 'sup Eric',
   * });
   * @function createDM
   * @memberof module:users#
   * @param {object} params
   * @param {Snowflake} params.recipient_id
   * @param {string} [params.content] - Up to 2000 characters
   * @param {Embed[]} [params.embeds] - Up to 10 embeds (up to 6000 characters)
   * @param {Component} [params.components]
   * @param {Array<Pick<Attachment, 'file' | 'filename'>>} [params.attachments]
   * @param {AllowedMentions} [params.allowed_mentions]
   * @param {MessageReference} [params.message_reference] - Include to make your message a reply
   * @param {Snowflake[]} [params.sticker_ids] - Up to 3 stickers in the server to send in the message
   * @param {MessageFlags} [params.flags] - [Message Flags]{@link https://discord.com/developers/docs/resources/channel#message-object-message-flags} (only `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATION` can be set)
   * @param {boolean} [params.tts]
   * @returns {Promise<Message>} [Message]{@link https://discord.com/developers/docs/resources/channel#message-object} object
   */
  createDM: async (params) => {
    const response = await attemptHandler({
      method: 'post',
      path: 'users/@me/channels',
      body: {
        recipient_id: params.recipient_id
      }
    });

    if (params.attachments && params.attachments?.length)
      return sendAttachment(params, `channels/${response.id}/messages`, 'post');
    else {
      return attemptHandler({
        method: 'post',
        path: `channels/${response.id}/messages`,
        body: {
          content: params.content ?? '',
          embeds: params.embeds ?? [],
          components: params.components ?? [],
          tts: params.tts || false,
          allowed_mentions: params.allowed_mentions ?? null,
          message_reference: params.message_reference ?? null,
          sticker_ids: params.sticker_ids ?? null,
          attachments: params.attachments ?? [],
          flags: params.flags ?? null
        }
      });
    }  
  }, // End of Create DM

  /**
   * @summary
   * ### [Create Group DM]{@link https://discord.com/developers/docs/resources/user#create-group-dm}
   * @example
   * await api.discord.users.createGroupDM({
   *   access_tokens: [
   *     '0000000000',
   *     '0000000000'  
   *   ],
   *   nicks: {
   *     'user_id': 'nickname'
   *   },
   *   content: 'sup Eric',
   * });
   * @function createGroupDM
   * @memberof module:users#
   * @param {object} params
   * @param {string[]} params.access_tokens - Access tokens of users that have granted your app the `gdm.join` scope
   * @param {Object<string, string>} params.nicks
   * @param {string} [params.content] - Up to 2000 characters
   * @param {Embed[]} [params.embeds] - Up to 10 embeds (up to 6000 characters)
   * @param {Component} [params.components]
   * @param {Attachment[]} [params.attachments]
   * @param {AllowedMentions} [params.allowed_mentions]
   * @param {MessageReference} [params.message_reference] - Include to make your message a reply
   * @param {Snowflake[]} [params.sticker_ids] - Up to 3 stickers in the server to send in the message
   * @param {MessageFlags} [params.flags] - [Message Flags]{@link https://discord.com/developers/docs/resources/channel#message-object-message-flags} (only `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATION` can be set)
   * @param {boolean} [params.tts]
   * @param {number|string} [params.nonce]
   * @returns {Promise<Message>} [Message]{@link https://discord.com/developers/docs/resources/channel#message-object} object
   */
  createGroupDM: async (params) => {
    const DMChannel = await attemptHandler({
      method: 'post',
      path: 'users/@me/channels',
      body: {
        access_tokens: params.access_tokens,
        nicks: params.nicks
      }
    });

    if (params.attachments && params.attachments?.length)
      return sendAttachment(params, `channels/${DMChannel.id}/messages`, 'post');
    else {
      return attemptHandler({
        method: 'post',
        path: `channels/${DMChannel.id}/messages`,
        body: {
          content: params.content ?? '',
          embeds: params.embeds ?? [],
          components: params.components ?? [],
          tts: params.tts || false,
          allowed_mentions: params.allowed_mentions ?? null,
          message_reference: params.message_reference ?? null,
          sticker_ids: params.sticker_ids ?? null,
          flags: params.flags ?? null,
          nonce: params.nonce ?? null
        }
      });
    }
  }, // End of Create Group DM

  /**
   * @summary
   * ### [Leave Guild]{@link https://discord.com/developers/docs/resources/user#leave-guild}
   * @example
   * await api.discord.users.leaveGuild({
   *   guild_id: '0000000000'
   * });
   * @function leaveGuild
   * @memberof module:users#
   * @param {object} params
   * @param {string} params.guild_id
   * @returns {Promise<{statusCode: string, message: string}>} `204 No Content`
   */
  leaveGuild: async (params) =>
    attemptHandler({
      method: 'del',
      path: `users/@me/guilds/${params.guild_id}`
    }) // End of Leave Guild
};