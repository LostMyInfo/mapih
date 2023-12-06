// @ts-check
/* eslint-disable node/no-unsupported-features/es-syntax */
'use strict';

const { attemptHandler, imageData, getBadges, resizeImage, retrieveDate, avatarFromObject, parsePermissions, generateCDN, extendPayload, token } = require('../resources/functions');
const { ScheduledEventStatus, ScheduledEventEntityType } = require('../../enum');
const { ResponseError } = require('../resources/Errors');

/**
 * @file All Discord API endpoints relating to guild functions
 * @module guilds
 */

module.exports = {

  /**
   * @summary
   * ### [Create Guild]{@link https://discord.com/developers/docs/resources/guild#create-guild}
   * This endpoint can be used only by bots in less than 10 servers.
   * 
   * When using the `roles` parameter:
   * - The first member of the array is used to change properties of the guild's `@everyone` role.
   * - The required `id` field within each role object is an integer placeholder.
   *   - It is to allow you to [overwrite]{@link https://discord.com/developers/docs/resources/channel#overwrite-object} a role's permissions in a channel while also passing in channels within the channels array.
   * 
   * When using the channels parameter:
   * - The `position` field is ignored, and none of the default channels are created.
   * - The `id` field within each channel object may be set to an integer placeholder.
   *   - Its purpose is to allow you to create `GUILD_CATEGORY` channels by setting the `parent_id` field on any children to the category's `id` field.
   * - Category channels must be listed before any children.
   * @example
   * await api.discord.guilds.create({
   *   name: "Eric's Server",
   *   icon: 'https://imgurl.png', // or buffer
   *   default_message_notifications: 1, // ONLY_MENTIONS
   *   verification_level: 0, // NONE
   *   explicit_content_filter: 0, // DISABLED
   *   roles: [{
   *      name: 'Administrator',
   *      permissions: 1 << 3,
   *      hoist: 'true',
   *      mentionable: 'false'
   *   }],
   *   channels: [
   *     {
   *       name: 'my-category',
   *       type: 4, // GUILD_CATEGORY
   *       id: 1
   *     },
   *     {
   *       name: 'bot-testing',
   *       type: 0, // GUILD_TEXT
   *       id: 2,
   *       parent_id: 1 // 'my-category'
   *     }
   *   ]
   * });
   * @function create
   * @fires guilds#create
   * @memberof module:guilds#
   * @param {Object} params
   * @param {string} params.name - Name of the guild (2-100 characters)
   * @param {string} [params.region]
   * @param {Role[]} [params.roles] - New guild roles
   * @param {PartialChannel[]} [params.channels] - New guild's channels
   * @param {string} [params.icon] - base64 1024x1024 png/jpeg image for the guild icon
   * @param {GuildVerificationLevel} [params.verification_level] - [Verification level]{@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level}
   * @param {DefaultMessageNotificationLevel} [params.default_message_notifications] - Default [message notification level]{@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
   * @param {ExplicitContentFilterLevel} [params.explicit_content_filter] - [Explicit content filter]{@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
   * @param {Snowflake} [params.afk_channel_id] - id for afk channel
   * @param {60|300|900|1800|3600} [params.afk_timeout] - afk timeout in seconds (60, 300, 900, 1800, 3600)
   * @param {Snowflake} [params.system_channel_id] - id of the channel where guild notices (welcome messages and boost events) are posted
   * @param {SystemChannelFlags} [params.system_channel_flags] - [System channel flags]{@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags}
   * @returns {Promise<Guild>} [Guild]{@link https://discord.com/developers/docs/resources/guild#guild-object} object
   */
  create: async (params) => attemptHandler({
    method: 'POST',
    endpoint: 'guilds',
    body: {
      name: params.name,
      roles: params.roles ?? [],
      channels: params.channels ?? [],
      icon: params.icon ? (await imageData(params.icon, 'base64string')).data : null,
      default_message_notifications: params.default_message_notifications ?? null,
      verification_level: params.verification_level ?? null,
      explicit_content_filter: params.explicit_content_filter ?? null,
      afk_channel_id: params.afk_channel_id ?? null,
      afk_timeout: params.afk_timeout ?? null,
      system_channel_id: params.system_channel_id ?? null,
      system_channel_flags: params.system_channel_flags ?? null
    }
  }),

  /**
   * @summary
   * ### [Modify Guild]{@link https://discord.com/developers/docs/resources/guild#modify-guild}
   * Fires a [Guild Update]{@link https://discord.com/developers/docs/topics/gateway-events#guild-update} Gateway event
   * @function update
   * @fires guilds#update
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {string} [params.name] - Name of the guild (2-100 characters)
   * @param {string} [params.description] - Description for the guild
   * @param {Snowflake} [params.owner_id] - User ID to transfer guild ownership to
   * @param {string} [params.region]
   * @param {string | Buffer} [params.icon] - base64 128x128 image for the guild icon
   * @param {string | Buffer} [params.splash] - base64 16:9 png/jpeg image for the guild splash
   * @param {string | Buffer} [params.discovery_splash] - base64 16:9 png/jpeg image for the guild discovery splash
   * @param {string | Buffer} [params.banner] base64 16:9 png/jpeg image for the guild banner
   * @param {GuildVerificationLevel} [params.verification_level] - [Verification level]{@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level}
   * @param {DefaultMessageNotificationLevel} [params.default_message_notifications] - Default [message notification level]{@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
   * @param {ExplicitContentFilterLevel} [params.explicit_content_filter] - [Explicit content filter]{@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
   * @param {Snowflake} [params.rules_channel_id] - id of the channel where Community guilds display rules and/or guidelines
   * @param {Snowflake} [params.public_updates_channel_id] - id of the channel where admins and moderators of Community guilds receive notices from Discord
   * @param {GuildFeatures[]} [params.features] - Array of [guild feature]{@link https://discord.com/developers/docs/resources/guild#guild-object-guild-features} strings
   * @param {Snowflake} [params.afk_channel_id] - id for afk channel
   * @param {60|300|900|1800|3600} [params.afk_timeout] - afk timeout in seconds (60, 300, 900, 1800, 3600)
   * @param {Snowflake} [params.system_channel_id] - id of the channel where guild notices (welcome messages and boost events) are posted
   * @param {SystemChannelFlags} [params.system_channel_flags] - [System channel flags]{@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags}
   * @param {boolean} [params.premium_progress_bar_enabled] - Whether the guild's boost progress bar should be enabled
   * @param {string} [params.reason]
   * @returns {Promise<Guild>} The updated [Guild]{@link https://discord.com/developers/docs/resources/guild#guild-object} object
   */
  update: async (params) => {
    if (params.icon) params.icon = (await imageData(params.icon, 'base64string')).data;
    if (params.banner) params.banner = (await imageData(params.banner, 'base64string')).data;
    if (params.splash) params.splash = (await imageData(params.splash, 'base64string')).data;
    if (params.discovery_splash) params.discovery_splash = (await imageData(params.discovery_splash, 'base64string')).data;
      
    return attemptHandler({
      method: 'PATCH',
      endpoint: `guilds/${params.guild_id}`,
      body: params,
      reason: params.reason ?? null
    });
  }, // End of Modify Guild

  /**
   * @summary
   * ### [Delete Guild]{@link https://discord.com/developers/docs/resources/guild#delete-guild}
   * @function destroy
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<{statusCode: string, message: string}>} `204 No Content`
   */
  destroy: async (params) =>
    attemptHandler({
      method: 'DELETE',
      endpoint: `guilds/${params.guild_id}`
    }), // End of Delete Guild

  /**
   * @summary
   * ### [Get Guild]{@link https://discord.com/developers/docs/resources/guild#get-guild}
   * - If `with_counts` is set to `true`, this endpoint will also return `approximate_member_count` and `approximate_presence_count` for the guild.
   * @example
   * await api.discord.guilds.retrieve({
   *   guild_id: '0000000000'
   * });
   * @function retrieve
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {boolean} [params.with_counts=false] - When `true`, will return approximate member and presence counts for the guild.
   * @returns {Promise<Guild>} The [Guild]{@link https://discord.com/developers/docs/resources/guild#guild-object} object for the given ID.
   */
  retrieve: async (params) => {
    const attempt = await attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}?with_counts=${params.with_counts || false}`
    });

    attempt.channelCount = attempt.channels?.length;
    attempt.roleCount = attempt.roles?.length;

    if (attempt.emojis?.length)
      attempt.emojiCount = attempt.emojis?.length;
    if (attempt.stickers?.length)
      attempt.stickerCount = attempt.stickers?.length;
    
    if (attempt.icon)
      attempt.icon_url = generateCDN(attempt, 'icon');
    if (attempt.banner)
      attempt.banner_url = generateCDN(attempt, 'banner');
    if (attempt.splash)
      attempt.splash_url = generateCDN(attempt, 'splash');
    if (attempt.discovery_splash)
      attempt.discovery_splash_url = generateCDN(attempt, 'discovery_splash');
    
    for (const role of attempt.roles) {
      role.permission_names = [];
      if (role.permissions > 0)
        role.permission_names = parsePermissions(role.permissions);
    }
    return attempt;
  }, // End of Get Guild

  /**
   * @summary
   * ### [Get Guild Preview]{@link https://discord.com/developers/docs/resources/guild#get-guild-preview}
   * - If the user is not in the guild, then the guild must be lurkable.
   * @function getPreview
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<GuildPreview>} [Guild Preview]{@link https://discord.com/developers/docs/resources/guild#guild-preview-object} object for the given ID.
   */
  getPreview: async (params) =>
    attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}/preview`
    }), // End of Get Guild Preview

  /**
   * @summary
   * ### [Get Guild Ban]{@link https://discord.com/developers/docs/resources/guild#get-guild-ban}
   * Returns a ban object for the given user or a 404 not found if the ban cannot be found.
   * - Requires the `BAN_MEMBERS` permission.
   * @example
   * await api.discord.guilds.retrieveBan({
   *   guild_id: '0000000000',
   *   user_id: '0000000000'
   * });
   * @function retrieveBan
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {Snowflake} params.user_id
   * @returns {Promise<GuildBan>} [Ban]{@link https://discord.com/developers/docs/resources/guild#ban-object} object for the given user or a `404 not found`.
   */
  retrieveBan: async (params) => {
    const attempt = await attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}/bans/${params.user_id}`
    });
    attempt.user.created_at = retrieveDate(attempt.user.id, true);
    attempt.user.badges = getBadges(attempt.user.public_flags);
    return attempt;
  }, // End of Get Guild Ban

  /**
   * @summary
   * ### [Get Guild Bans]{@link https://discord.com/developers/docs/resources/guild#get-guild-bans}
   * @example
   * await api.discord.guilds.getAllBans({
   *   guild_id: '0000000000',
   *   limit: 50,
   *   after: '0000000000'
   * });
   * @function getAllBans
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {number} [params.limit=1000] - Number of users to return (1-1000)
   * @param {Snowflake} [params.before=null] - Consider only users before given user ID
   * @param {Snowflake} [params.after=null] - Consider only users after given user ID
   * @returns {Promise<GuildBan[]>} List of [Ban]{@link https://discord.com/developers/docs/resources/guild#ban-object} objects for the users banned from this guild.
   */
  getAllBans: async (params) => {
    let endpoint = `guilds/${params.guild_id}/bans?`;
    endpoint += `${params.limit ? `&limit=${params.limit}` : ''}`;
    endpoint += `${params.before ? `&before=${params.before}` : ''}`;
    endpoint += `${params.after ? `&after=${params.after}` : ''}`;
      
    const attempt = await attemptHandler({
      method: 'GET',
      endpoint
    });
    for (const ban of attempt) {
      ban.user.created_at = retrieveDate(attempt.user.id, true);
      ban.user.badges = getBadges(attempt.user.public_flags);
    }
    return attempt;
  }, // End of Get Guild Bans

  /**
   * @summary
   * ### [Create Guild Ban]{@link https://discord.com/developers/docs/resources/guild#create-guild-ban}, and optionally delete previous messages sent by the banned user.
   * - Requires the `BAN_MEMBERS` permission.
   * @example
   * await api.discord.guilds.createBan({
   *   guild_id: '0000000000',
   *   user_id: '0000000000',
   *   delete_message_seconds: 604800
   * });
   * @function createBan
   * @fires guilds#ban_add
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {Snowflake} params.user_id
   * @param {number} [params.delete_message_seconds=0] Number of seconds to delete messages for, between 0 and 604800 (7 days).
   * @param {string} [params.reason]
   * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
   */
  createBan: async (params) => attemptHandler({
    method: 'PUT',
    endpoint: `guilds/${params.guild_id}/bans/${params.user_id}`,
    body: {
      delete_message_seconds: params.delete_message_seconds ?? 0
    },
    reason: params.reason ?? null
  }), // End of Create Guild Ban

  /**
   * @summary
   * ### [Remove Guild Ban]{@link https://discord.com/developers/docs/resources/guild#remove-guild-ban}
   * - Requires the `BAN_MEMBERS` permission.
   * @example
   * await api.discord.guilds.removeBan({
   *   guild_id: '0000000000',
   *   user_id: '0000000000'
   * });
   * @function removeBan
   * @fires guilds#ban_remove
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {Snowflake} params.user_id
   * @param {string} [params.reason]
   * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
   */
  removeBan: async (params) =>
    attemptHandler({
      method: 'PUT',
      endpoint: `guilds/${params.guild_id}/bans/${params.user_id}`,
      reason: params.reason ?? null
    }), // End of Create Guild Ban

  /**
   * @summary
   * ### [Get Guild Invites]{@link https://discord.com/developers/docs/resources/guild#get-guild-invites}
   * @function getInvites
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<ExtendedInvite[]>} List of [Invite]{@link https://discord.com/developers/docs/resources/invite#invite-object} objects (with [Invite Metadata]{@link https://discord.com/developers/docs/resources/invite#invite-metadata-object}) for the guild.
   */
  getInvites: async (params) => {
    const attempt = await attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}/invites`
    });
    for (let a of attempt)
      a = extendPayload(a);

    return attempt;
  }, // End of Get Guild Invites

  /**
   * @summary
   * ### [Modify Guild MFA Level]{@link https://discord.com/developers/docs/resources/guild#modify-guild-mfa-level}
   * - Requires guild ownership.
   * @example
   * await api.discord.guilds.modifyMFAlevel({
   *   guild_id: '0000000000',
   *   level: 0
   * });
   * @function modifyMFAlevel
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id - Name of the webhook (1-80 characters)
   * @param {GuildMFALevel} params.level - [MFA Level]{@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level}
   * @returns {Promise<GuildMFALevel>} The updated [MFA Level]{@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level} 
   */
  modifyMFAlevel: async (params) =>
    attemptHandler({
      method: 'POST',
      endpoint: `guilds/${params.guild_id}/mfa`,
      body: { level: params.level }
    }), // End of Modify Guild MFA Level

  /**
   * @summary
   * ### [Get Guild Prune Count]{@link https://discord.com/developers/docs/resources/guild#get-guild-prune-count}
   * - By default, prune will not remove users with roles.
   * - You can optionally include specific roles in your prune by providing the `include_roles` parameter.
   * - Any inactive user that has a subset of the provided role(s) will be counted in the prune and users with additional roles will not.
   * @example
   * await api.discord.guilds.getPruneCount({
   *   guild_id: '0000000000',
   *   days: 3,
   *   include_roles: [
   *     '0000000000'
   *   ]
   * });
   * @function getPruneCount
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {number} [params.days=7] - Number of days to count prune for (1-30) (Default 7)
   * @param {Snowflake[]} [params.include_roles=[]] - Role(s) to include
   * @returns {Promise<{pruned: number}>} An object with one `pruned` key indicating the number of members that would be removed in a prune operation.
   */
  getPruneCount: async (params) => {
    let endpoint = `guilds/${params.guild_id}/prune?`;
    endpoint += `${params.days ? `&days=${params.days}` : ''}`;
    endpoint += `${params.include_roles ? `&include_roles=${params.include_roles}` : ''}`;
    
    return attemptHandler({
      method: 'GET',
      endpoint,
      body: {}
    });
  }, // End of Get Guild Prune Count

  /**
   * @summary
   * ### [Begin Guild Prune]{@link https://discord.com/developers/docs/resources/guild#begin-guild-prune}
   * - For large guilds it's recommended to set the `compute_prune_count` option to `false`, forcing `pruned` to `null`.
   * - By default, prune will not remove users with roles.
   * - You can optionally include specific roles in your prune by providing the `include_roles` parameter.
   * - Any inactive user that has a subset of the provided role(s) will be counted in the prune and users with additional roles will not.
   * @example
   * await api.discord.guilds.beginPrune({
   *   guild_id: '0000000000',
   *   days: 3,
   *   compute_prune_count: true,
   *   include_roles: [
   *     '0000000000'
   *   ]
   * });
   * @function beginPrune
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {number} params.days - Number of days to prune (1-30) (default 7)
   * @param {boolean} params.compute_prune_count - Whether `pruned` is returned, discouraged for large guilds (default true)
   * @param {Snowflake[]} [params.include_roles=[]] - Role(s) to include
   * @param {string} [params.reason]
   * @returns {Promise<{pruned: number}>} An object with one `pruned` key indicating the number of members that were removed in the prune operation.
   */
  beginPrune: async (params) =>
    attemptHandler({
      method: 'POST',
      endpoint: `guilds/${params.guild_id}/prune`,
      body: {
        days: params.days ?? 7,
        compute_prune_count: params.compute_prune_count || true,
        include_roles: params.include_roles ?? []
      },
      reason: params.reason ?? null
    }), // End of Begin Guild Prune

  /**
   * @summary
   * ### [Get Guild Voice Regions]{@link https://discord.com/developers/docs/resources/guild#get-guild-voice-regions}
   * @function getVoiceRegions
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<GuildVoiceRegion[]>} List of [Voice Region]{@link https://discord.com/developers/docs/resources/voice#voice-region-object} objects for the guild.
   */
  getVoiceRegions: async (params) =>
    attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}/regions`
    }), // End of Get Guild Voice Regions
  
  /**
   * @summary
   * ### [Get Guild Integrations]{@link https://discord.com/developers/docs/resources/guild#get-guild-integrations}
   * - This endpoint returns a maximum of 50 integrations.
   * - If a guild has more integrations, they cannot be accessed.
   * @example
   * await api.discord.guilds.getIntegrations({
   *   guild_id: '0000000000'
   * });
   * @function getIntegrations
   * @fires guilds#integrations_update
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<GuildIntegration[]>} List of [Integration]{@link https://discord.com/developers/docs/resources/guild#integration-object} objects for the guild.
   */
  getIntegrations: async (params) =>
    attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}/integrations`
    }), // End of Get Guild Integrations

  /**
   * @summary
   * ### [Delete Guild Integration]{@link https://discord.com/developers/docs/resources/guild#delete-guild-integration}
   * - Delete the attached [Integration]{@link https://discord.com/developers/docs/resources/guild#integration-object} object for the guild.
   * - Deletes any associated webhooks and kicks the associated bot if there is one.
   * @example
   * await api.discord.guilds.destroyIntegration({
   *   guild_id: '0000000000',
   *   integration_id: '0000000000'
   * });
   * @function destroyIntegration
   * @fires guilds#integrations_update
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {Snowflake} params.integration_id
   * @param {string} [params.reason]
   * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
   */
  destroyIntegration: async (params) =>
    attemptHandler({
      method: 'DELETE',
      endpoint: `guilds/${params.guild_id}/integrations/${params.integration_id}`,
      reason: params.reason ?? null
    }), // End of Delete Guild Integration

  /**
   * @summary
   * ### [Get Guild Widget]{@link https://discord.com/developers/docs/resources/guild#get-guild-widget}
   * @function retrieveWidget
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<GuildWidget>} [Guild Widget]{@link https://discord.com/developers/docs/resources/guild#get-guild-widget} object for the guild
   */
  retrieveWidget: async (params) =>
    attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}/widget.json`
    }), // End Get Guild Widget
  
  /**
   * @summary
   * ### [Get Guild Widget Settings]{@link https://discord.com/developers/docs/resources/guild#get-guild-widget-settings}
   * @function retrieveWidgetSettings
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<GuildWidgetSettings>} [Guild Widget Settings]{@link https://discord.com/developers/docs/resources/guild#guild-widget-settings-object} object
   */
  retrieveWidgetSettings: async (params) =>
    attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}/widget`
    }), // End Get Guild Widget Settings
  
  /**
   * @summary
   * ### [Get Guild Widget Image]{@link https://discord.com/developers/docs/resources/guild#get-guild-widget-image}
   * [Widget Style Options:]{@link https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options}
   * - [SHIELD]{@link https://discord.com/api/guilds/81384788765712384/widget.png?style=shield}
   *   - Shield style widget with Discord icon and guild members online count
   * - [BANNER1]{@link https://discord.com/api/guilds/81384788765712384/widget.png?style=banner1}
   *   - Large image with guild icon, name, and online count
   *   - "POWERED BY DISCORD" as the footer of the widget
   * - [BANNER2]{@link https://discord.com/api/guilds/81384788765712384/widget.png?style=banner2}
   *   - Smaller widget style with guild icon, name and online count
   *   - Split on the right with Discord logo
   * - [BANNER3]{@link https://discord.com/api/guilds/81384788765712384/widget.png?style=banner3}
   *   - Large image with guild icon, name, and online count
   *   - In the footer, Discord logo on the left and "Chat Now" on the right
   * - [BANNER4]{@link https://discord.com/api/guilds/81384788765712384/widget.png?style=banner4}
   *   - Large Discord logo at the top of the widget
   *   - Guild icon, name and online count in the middle
   *   - "JOIN MY SERVER" button at the bottom
   * @example
   * await api.discord.guilds.retrieveWidgetImage({
   *   guild_id: '0000000000',
   *   style: 'banner3'
   * });
   * @function retrieveWidget
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {'shield'|'banner1'|'banner2'|'banner3'|'banner4'} [params.style='shield']
   * @returns {Promise<ArrayBuffer>} A PNG image widget for the guild
   */
  retrieveWidgetImage: async (params) =>
    attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}/widget.png?style=${params.style ?? 'shield'}`
    }), // End Get Guild Widget Image
  
  /**
   * @summary
   * ### [Modify Guild Widget]{@link https://discord.com/developers/docs/resources/guild#modify-guild-widget}
   * @example
   * await api.discord.guilds.modifyWidget({
   *   guild_id: '0000000000',
   *   channel_id: '0000000000',
   *   enabled: true
   * });
   * @function modifyWidget
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {boolean} [params.enabled] - Whether the widget is enabled
   * @param {Snowflake} [params.channel_id] - The widget channel ID
   * @param {string} [params.reason]
   * @returns {Promise<GuildWidget>} The updated [Guild Widget]{@link https://discord.com/developers/docs/resources/guild#get-guild-widget} object for the guild
   */
  modifyWidget: async (params) =>
    attemptHandler({
      method: 'PATCH',
      endpoint: `guilds/${params.guild_id}/widget`,
      body: params,
      reason: params.reason ?? null
    }), // End of Modify Guild Widget

  /**
   * @summary
   * ### [Get Guild Vanity URL]{@link https://discord.com/developers/docs/resources/guild#get-guild-vanity-url}
   * @function retrieveVanityURL
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<{code: number, uses: number}>} A partial [Invite]{@link https://discord.com/developers/docs/resources/invite#invite-object} object for guilds with that feature enabled
   */
  retrieveVanityURL: async (params) =>
    attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}/vanity-url`
    }), // End of Get$|y Guild Vanity URL
  
  /**
   * @summary
   * ### [Get Guild Welcome Screen]{@link https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen}
   * @function retrieveWelcomeScreen
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<GuildWelcomeScreen>} The [Welcome Screen]{@link https://discord.com/developers/docs/resources/guild#welcome-screen-object} object for the guild
   */
  getWelcomeScreen: async (params) =>
    attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}/welcome-screen`
    }), // End of Get Guild Welcome Screen
  
  /**
   * @summary
   * ### [Modify Guild Welcome Screen]{@link https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen}
   * @example
   * await api.discord.guilds.modifyWelcomeScreen({
   *   guild_id: '0000000000',
   *   enabled: true
   * });
   * @function modifyWelcomeScreen
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {boolean} [params.enabled] - Whether the welcome screen is enabled
   * @param {GuildWelcomeScreenChannel[]} [params.welcome_channels] - Channels linked in the welcome screen and their display options
   * @param {string} [params.description] - The server description to show in the welcome screen
   * @param {string} [params.reason]
   * @returns {Promise<GuildWelcomeScreen>} The updated [Welcome Screen]{@link https://discord.com/developers/docs/resources/guild#welcome-screen-object} object
   */
  modifyWelcomeScreen: async (params) =>
    attemptHandler({
      method: 'PATCH',
      endpoint: `guilds/${params.guild_id}/welcome-screen`,
      body: params,
      reason: params.reason ?? null
    }), // End of Modify Guild Welcome Screen
  
  /**
   * @summary
   * ### [Get Guild Onboarding]{@link https://discord.com/developers/docs/resources/guild#get-guild-onboarding}
   * - placeholder description
   * @example
   * await api.discord.guilds.getOnboarding({
   *   guild_id: '0000000000'
   * });
   * @function getOnboarding
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<GuildOnboarding>} The [Onboarding]{@link https://discord.com/developers/docs/resources/guild#guild-onboarding-object} object for the guild.
   */
  getOnboarding: async (params) =>
    attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}/onboarding`
    }), // End of Get Guild Onboarding
  
  /**
   * @summary
   * ### [Modify Guild Onboarding]{@link https://discord.com/developers/docs/resources/guild#modify-guild-onboarding}
   * - Modifies the onboarding configuration of the guild.
   * - Onboarding enforces constraints when enabled.
   * - These constraints are that there must be at least 7 Default Channels and at least 5 of them must allow sending messages to the `@everyone` role.
   * - The mode field modifies what is considered when enforcing these constraints.
   * @example
   * await api.discord.guilds.modifyOnboarding({
   *   guild_id: '0000000000',
   *   prompts: [{
   *     id: '0000000000',
   *     type: 0,
   *     title: 'prompt title',
   *     single_select: true,
   *     required: true,
   *     in_onboarding: true,
   *     options: [{
   *       title: 'option title',
   *       description: 'option description',
   *       id: '0000000000',
   *       channel_ids: [
   *         '0000000000'
   *       ],
   *       role_ids: [
   *         '0000000000'
   *       ],
   *       emoji: {
   *         id: '0000000000',
   *         name: 'emojiName',
   *         animated: false
   *       }
   *     }]
   *   }]
   * });
   * @function modifyOnboarding
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {OnboardingPrompt[]} params.prompts - Prompts shown during onboarding and in customize community
   * @param {Snowflake[]} params.default_channel_ids - Channel IDs that members get opted into automatically
   * @param {boolean} params.enabled - Whether onboarding is enabled in the guild
   * @param {OnboardingMode} params.mode - Current mode of onboarding
   * @param {string} [params.reason]
   * @returns {Promise<GuildOnboarding>} The [Onboarding]{@link https://discord.com/developers/docs/resources/guild#guild-onboarding-object} object for the guild.
   */
  modifyOnboarding: async (params) =>
    attemptHandler({
      method: 'PUT',
      endpoint: `guilds/${params.guild_id}/onboarding`,
      reason: params.reason ?? null
    }), // End of Modify Guild Onbaording
  
  /**
   * @summary
   * ### [Modify Guild Welcome Screen]{@link https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen}
   * @example
   * await api.discord.guilds.newMemberWelcome({
   *   guild_id: '0000000000'
   * });
   * @function newMemberWelcome
   * @memberof module:guilds#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<GuildHomeSettings>}
   */
  newMemberWelcome: async (params) =>
    attemptHandler({
      method: 'GET',
      endpoint: `guilds/${params.guild_id}/new-member-welcome`
    }), // End of Get New Member Welcome


  // ///////////////////////////////////////////////////////////////////
  // ////////////////////////// GUILDS.CHANNELS /////////////////////////
  // ///////////////////////////////////////////////////////////////////
  // https://discord.com/developers/docs/resources/guild#get-guild-channels

  /**
 * @summary All functions relating to guild channels
 * @memberof module:guilds
 * @namespace channels
 */

  channels: {

    /**
     * @summary
     * ### [Get Guild Channels]{@link https://discord.com/developers/docs/resources/guild#get-guild-channels}
     * - Does not include threads.
     * 
     * @example
     * await api.discord.guilds.channels.getAll({
     *   guild_id: '0000000000'
     * });
     * @function getAll
     * @memberof module:guilds.channels#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @returns {Promise<Channel[]>} List of [Channel]{@link https://discord.com/developers/docs/resources/channel#channel-object} objects.
     */
    getAll: async (params) =>
      attemptHandler({
        method: 'GET',
        endpoint: `guilds/${params.guild_id}/channels`
      }), // End of Get Guild Channels
  
    /**
     * @summary
     * ### [Create Guild Channel]{@link https://discord.com/developers/docs/resources/guild#create-guild-channel}
     * - If setting permission overwrites, only permissions your bot has in the guild can be allowed/denied.
     * - All parameters to this endpoint are optional and nullable excluding `name`.
     * 
     * @example
     * await api.discord.guilds.channels.create({
     *   guild_id: '0000000000',
     *   name: 'new-channel',
     *   type: 0,
     *   topic: 'channel topic',
     *   position: 19
     * });
     * @function create
     * @memberof module:guilds.channels#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {string} params.name - Channel name (1-100 characters) - All channel types
     * @param {?ChannelType} [params.type] - The [type]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types} of channel - All channel types
     * @param {?string} [params.topic] - Channel topic (0-1024 characters) - Text/Announcement/Forum/Media channel types
     * @param {?number} [params.bitrate] - The bitrate (in bits) of the voice or stage channel (min 8000) - Voice/Stage channel types
     * @param {?number} [params.user_limit] - The user limit of the voice channel - Voice/Stage channel types
     * @param {?number} [params.rate_limit_per_user] - Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected	- Text/Announcement/Forum/Media channel types
     * @param {?number} [params.position] - Sorting position of the channel - All channel types
     * @param {?Overwrite[]} [params.permission_overwrites] - The channel's permission overwrites - All channel types
     * @param {?Snowflake} [params.parent_id] - The id of the parent category for a channel - Text, Voice, Announcement, Stage, Forum, Media channel types
     * @param {?boolean} [params.nsfw] - Whether the channel is nsfw - Text, Voice, Announcement, Stage, Forum channel types
     * @param {?string} [params.rtc_region] - Channel voice region id of the voice or stage channel, automatic when set to null - Voice/Stage channel types
     * @param {?VideoQualityMode} [params.video_quality_mode] - The camera video quality mode of the voice channel - Voice/Stage channel types
     * @param {?number} [params.default_auto_archive_duration] - The default duration that the clients use (not the API) for newly created threads in the channel, in minutes, to automatically archive the thread after recent activity - Text/Announcement/Forum/Media channel types
     * @param {?DefaultReaction} [params.default_reaction_emoji] - Emoji to show in the add reaction button on a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel - Forum/Media channel types
     * @param {?ForumTag[]} [params.available_tags] - Set of tags that can be used in a `GUILD_FORUM` or a `GUILD_MEDIA` channel - Forum/Media channel types
     * @param {?SortOrderType} [params.default_sort_order] The default sort order type used to order posts in `GUILD_FORUM` and `GUILD_MEDIA` channels - Forum/Media channel types
     * @param {?ForumLayoutType} [params.default_forum_layout] - The default forum layout view used to display posts in `GUILD_FORUM` channels
     * @param {?number} [params.default_thread_rate_limit_per_user] - The initial rate_limit_per_user to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update.
     * @param {string} [params.reason]
     * @returns {Promise<Channel[]>} The new [Channel]{@link https://discord.com/developers/docs/resources/channel#channel-object} object on success.
     */
    create: async (params) =>
      attemptHandler({
        method: 'POST',
        endpoint: `guilds/${params.guild_id}/channels`,
        body: {
          name: params.name,
          type: params.type ?? 0,
          topic: params.topic ?? null,
          bitrate: (params.type === 2 || params.type === 13) && params.type ? params.type : null,
          user_limit: (params.type === 2 || params.type === 13) && params.user_limit ? params.user_limit : null,
          rate_limit_per_user: params.rate_limit_per_user ?? null,
          position: params.position ?? null,
          permission_overwrites: params.permission_overwrites ?? null,
          parent_id: params.parent_id ?? null,
          nsfw: params.nsfw || null,
          rtc_region: (params.type === 2 || params.type === 13) && params.rtc_region ? params.rtc_region : null,
          default_auto_archive_duration: params.default_auto_archive_duration ?? null,
          default_reaction_emoji: (params.type === 14 || params.type === 15) && params.default_reaction_emoji ? params.default_reaction_emoji : null,
          default_sort_order: (params.type === 14 || params.type === 15) && params.default_sort_order ? params.default_sort_order : null,
          available_tags: (params.type === 14 || params.type === 15) && params.available_tags ? params.available_tags : null,
          default_forum_layout: params.type === 15 && params.default_forum_layout ? params.default_forum_layout : null,
          default_thread_rate_limit_per_user: params.default_thread_rate_limit_per_user ?? null
        },
        reason: params.reason ?? null
      }), // End of Create Guild Channel
  
    /**
     * @summary
     * ### [Modify Guild Channel Positions]{@link https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions}
     * @example
     * await api.discord.guilds.channels.modifyPositions({
     *   guild_id: '0000000000',
     *   channels: [{
     *     id: '0000000000',
     *     position: 4,
     *     lock_permissions: true,
     *     parent_id: '0000000000'
     *   }]
     * });
     * @function modifyPositions
     * @memberof module:guilds.channels#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {ModifyPositionsChannel[]} params.channels
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    modifyPositions: async (params) =>
      attemptHandler({
        method: 'PATCH',
        endpoint: `guilds/${params.guild_id}/channels`,
        body: params.channels
      }) // End of Modify Guild Channel Positions
  },

  // ///////////////////////////////////////////////////////////////////
  // ////////////////////////// GUILDS.MEMBERS /////////////////////////
  // ///////////////////////////////////////////////////////////////////
  // https://discord.com/developers/docs/resources/guild#get-guild-member

  /**
   * @summary All functions relating to guild members
   * @memberof module:guilds
   * @namespace members
   */

  members: {

    /**
     * @summary
     * ### [Get Guild Member]{@link https://discord.com/developers/docs/resources/guild#get-guild-member}
     * @example
     * await api.discord.guilds.members.retrieve({
     *   guild_id: '0000000000',
     *   user_id: '0000000000'
     * });
     * @function retrieve
     * @memberof module:guilds.members#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.user_id
     * @param {boolean} [params.member_only] - Whether to return a member object without the user object
     * @returns {Promise<Member>} [Guild Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object} object
     */
    retrieve: async (params) => {
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint: `guilds/${params.guild_id}/members/${params.user_id}`
      });
      if (!params.member_only) {
        return extendPayload(attempt/* , params*/);
      }
      const { user, ...newMember } = attempt;
      return extendPayload(newMember/* , params*/); 
    }, // End of Get Guild Member

    /**
     * @summary
     * ### [List Guild Members]{@link https://discord.com/developers/docs/resources/guild#list-guild-members}
     * @example
     * await api.discord.guilds.members.getAll({
     *   guild_id: '0000000000',
     *   limit: 1000 // default 1
     * });
     * @function getAll
     * @memberof module:guilds.members#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {number} [params.limit=1] - Max number of members to return (1-1000)
     * @param {Snowflake} [params.after=0] - The highest user id in the previous page
     * @returns {Promise<Member[]>} List of [Guild Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object} objects
     */
    getAll: async (params) => {
      let endpoint = `guilds/${params.guild_id}/members?`;
      endpoint += `${params.limit ? `&limit=${params.limit}` : ''}`;
      endpoint += `${params.after ? `&after=${params.after}` : ''}`;
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint
      });
      attempt.forEach((/** @type {Member} */ member) => {
        member.user.badges = getBadges(member.user.public_flags);
        member.displayAvatar = avatarFromObject(member.user.id, member.user.avatar, params.guild_id, member.avatar);
        member.displayName = member.nick ?? member.user.display_name ?? member.user.global_name ?? member.user.username;
        member.user.created_at = retrieveDate(member.user.id, true);
      });
      return attempt;
    }, // End of get_members

    /**
     * @summary
     * ### [Search Guild Members]{@link https://discord.com/developers/docs/resources/guild#search-guild-members}
     * @example
     * await api.discord.guilds.members.search({
     *   guild_id: '0000000000',
     *   query: 'MobbinOnEm',
     *   limit: 1
     * @function search
     * @memberof module:guilds.members#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {number} [params.query] - Query string to match username(s) and nickname(s) against
     * @param {string} [params.limit=1] - Max number of members to return (1-1000)
     * @returns {Promise<Member[]>} List of [Guild Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object} objects whose username or nickname starts with a provided string
     */
    search: async (params) => {
      let endpoint = `guilds/${params.guild_id}/members/search?query=${params.query}`;
      endpoint += `${params.limit ? `&limit=${params.limit}` : ''}`;
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint
      });
      const [payload] = attempt || [];
      if (payload.length === 1) {
        payload.user.badges = getBadges(payload.user.public_flags);
        payload.displayAvatar = avatarFromObject(payload.user.id, payload.user.avatar, params.guild_id, payload.avatar);
        payload.displayName = payload.nick ?? payload.user.display_name ?? payload.user.global_name ?? payload.user.username;
        payload.user.created_at = retrieveDate(payload.user.id, true);
      } else {
        payload.forEach((/** @type {Member} */ member) => {
          member.user.badges = getBadges(member.user.public_flags);
          member.displayAvatar = avatarFromObject(member.user.id, member.user.avatar, params.guild_id, member.avatar);
          member.displayName = member.nick ?? member.user.display_name ?? member.user.global_name ?? member.user.username;
          member.user.created_at = retrieveDate(member.user.id, true);
        });
      }
      return payload;
    }, // End Search Guild Member

    // ================================== //
    // PLACEHOLDER FOR 'ADD GUILD MEMBER' //
    // ================================== //

    /**
     * @summary
     * ### [Remove Guild Members]{@link https://discord.com/developers/docs/resources/guild#remove-guild-member}
     * @example
     * await api.discord.guilds.members.remove({
     *   guild_id: '0000000000',
     *   user_id: '0000000000',
     *   reason: 'Not cool enough'
     * });
     * @function remove
     * @memberof module:guilds.members#
     * @fires guilds#member_remove
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.user_id
     * @param {string} [params.reason] - Reason for the kick
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    remove: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `guilds/${params.guild_id}/members/${params.user_id}`,
        reason: params.reason ?? null
      }), // End of Remove Guild Member

    /**
     * @summary
     * ### [Modify Guild Member]{@link https://discord.com/developers/docs/resources/guild#modify-guild-member}
     * @example
     * await api.discord.guilds.members.update({
     *   guild_id: '0000000000',
     *   user_id: '0000000000',
     *   nick: 'coolNewNickname'
     * });
     * @function update
     * @memberof module:guilds.members#
     * @fires guilds#member_update
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.user_id
     * @param {string} [params.nick] - Value to set user's nickname to (requires `MANAGE_NICKNAMES`)
     * @param {Snowflake[]} [params.roles] - Array of role ids the member is assigned (requires `MANAGE_ROLES`)
     * @param {boolean} [params.mute] - Whether the user is muted in voice channels. Will throw a 400 error if the user is not in a voice channel (requires `MUTE_MEMBERS`)
     * @param {boolean} [params.deaf] - Whether the user is deafened in voice channels. Will throw a 400 error if the user is not in a voice channel (requires `DEAFEN_MEMBERS`)
     * @param {Snowflake} [params.channel_id] - ID of channel to move user to (if they are connected to voice) (requires `MOVE_MEMBERS`)
     * @param {ISO8601Timestamp} [params.communication_disabled_until] - When the user's [timeout]{@link https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ} will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out (requires `MODERATE_MEMBERS`)
     * @param {GuildMemberFlags} [params.flags] - [Guild member flags]{@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags} (requires `MODERATE_MEMBERS`)
     * @param {string} [params.reason]
     * @returns {Promise<Member>} The updated [Guild Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object} object for the specified user
     */
    update: async (params) => {
      const attempt = await attemptHandler({
        method: 'PATCH',
        endpoint: `guilds/${params.guild_id}/members/${params.user_id}`,
        body: params,
        reason: params.reason ?? null
      });
      attempt.displayName = attempt.nick ?? attempt.user.display_name ?? attempt.user.global_name ?? attempt.user.username;
      attempt.displayAvatar = avatarFromObject(attempt.user.id, attempt.user.avatar, params.guild_id, attempt.avatar);
      attempt.user.created_at = retrieveDate(attempt.user.id, true);
      attempt.user.badges = getBadges(attempt.user.public_flags);
      return attempt;
    }, // End of Modify Guild Member

    /**
     * @summary
     * ### [Modify Current Member]{@link https://discord.com/developers/docs/resources/guild#modify-current-member}
     * @example
     * await api.discord.guilds.members.updateCurrent({
     *   guild_id: '0000000000',
     *   nick: 'myNewNickname'
     * });
     * @function updateCurrent
     * @memberof module:guilds.members#
     * @fires guilds#member_update
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} [params.nick] - Value to set user's nickname to (requires `CHANGE_NICKNAME`)
     * @param {string} [params.reason]
     * @returns {Promise<Member>} The updated [Guild Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object} object
     */
    updateCurrent: async (params) =>
      attemptHandler({
        method: 'PATCH',
        endpoint: `guilds/${params.guild_id}/members/@me`,
        body: params,
        reason: params.reason ?? null
      }), // End of Modify Current Member

    /**
     * @summary
     * ### [Add Guild Member Role]{@link https://discord.com/developers/docs/resources/guild#add-guild-member-role}
     * @example
     * await api.discord.guilds.members.addRole({
     *   guild_id: '0000000000',
     *   user_id: '0000000000',
     *   role_id: '0000000000'
     * });
     * @memberof module:guilds.members#
     * @function addRole
     * @fires guilds#member_update
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.user_id
     * @param {Snowflake} params.role_id
     * @param {string} [params.reason]
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    addRole: async (params) =>
      attemptHandler({
        method: 'PUT',
        endpoint: `guilds/${params.guild_id}/members/${params.user_id}/roles/${params.role_id}`,
        reason: params.reason ?? null
      }), // End of Add Guild Member Role

    /**
     * @summary
     * ### [Remove Guild Member Role]{@link https://discord.com/developers/docs/resources/guild#remove-guild-member-role}
     * @example
     * await api.discord.guilds.members.removeRole({
     *   guild_id: '0000000000',
     *   user_id: '0000000000',
     *   role_id: '0000000000'
     * });
     * @memberof module:guilds.members#
     * @fires guilds#member_update
     * @function removeRole
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.user_id
     * @param {Snowflake} params.role_id
     * @param {string} [params.reason]
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    removeRole: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `guilds/${params.guild_id}/members/${params.user_id}/roles/${params.role_id}`,
        reason: params.reason ?? null
      }), // End of Remove Guild Member Role

    /**
     * @summary
     * ### Get a guild member's permission names
     * - Cross references a user role set with the guild role set to create a set of permission names
     * @example
     * const x = params.member.roles;
     * const y = params.guild.roles;
     * 
     * const permNames = getPermissionNames(x, y);
     * @function getPermissionNames
     * @memberof module:guilds.members#
     * @param {Snowflake[]} userRoles - User role set
     * @param {Role[]} guildRoles - Guild role set
     * @returns {PermissionNames[]} List of Guild Member's' [Permission Names]{@link https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags}
     */
    getPermissionNames: (userRoles, guildRoles) => {
    
      /**
       * @type {PermissionNames[]}
       */
      const names = [];
      try {
        for (const userRole of userRoles) {
          const guildRole = guildRoles.find((role) => role.id === userRole);
          if (guildRole && guildRole.permission_names) {
            guildRole.permission_names.forEach((permission) => {
              if (!names.includes(permission))
                names.push(permission);
            });
          }
        }
      } catch (e) {
        console.error(e);
      }
      return names;
    }, // End Get Permission Names

    /**
     * @summary
     * ### Update a member's timeout
     * - Sets/adjusts/clears a member's timeout
     * @example // Set a 5 minute timeout for a member
     * await api.discord.guilds.members.timeout({
     *   guild_id: '00000',
     *   user_id: '00000',
     *   duration: 300 // 5 minutes
     * });
     * @example // Clear a member's timeout
     * await api.discord.guilds.members.timeout({
     *   guild_id: '00000',
     *   user_id: '00000'
     * });
     * @function timeout
     * @memberof module:guilds.members#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.user_id
     * @param {?number} [params.duration] - Duration in seconds to set timeout. Set to `null` or omit to clear timeout.
     * @param {string} [params.reason]
     * @returns {Promise<Member>} The updated [Guild Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object} object
     */
    timeout: async (params) => {

      let timestamp;
      if (params.duration)
        timestamp = (new Date(new Date().getTime() + params.duration * 1000)).toISOString();
      else timestamp = null;

      const attempt = await attemptHandler({
        method: 'PATCH',
        endpoint: `guilds/${params.guild_id}/members/${params.user_id}`,
        body: {
          communication_disabled_until: timestamp
        },
        reason: params.reason ?? null
      });

      return extendPayload(attempt/* , params*/);

    } // End of timeout member
  },

  
  // ///////////////////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////////////////
  // /////////////////////////// GUILDS.ROLES //////////////////////////
  // ///////////////////////////////////////////////////////////////////
  /**
   * @summary All functions relating to guild roles
   * @memberof module:guilds
   * @namespace roles
   */
  roles: {
  
    /**
     * @summary
     * ### Retrieve a role by ID
     * @example
     * await api.discord.guilds.roles.retrieve({
     *   role_id: '000000000',
     *   guild_id: '0000000000'
     * });
     * @memberof module:guilds.roles#
     * @function retrieve
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.role_id
     * @returns {Promise<Role>} [Role]{@link https://discord.com/developers/docs/topics/permissions#role-object} object
     */
    retrieve: async (params) => {
      const roles = await attemptHandler({
        method: 'GET',
        endpoint: `guilds/${params.guild_id}/roles`
      });
      const targetRole = roles.find((/** @type {Role} */ x) => x.id === params.role_id);
      if (!targetRole)
        throw new Error('\nNo role found for the provided role_id\n');
      return targetRole;
    },

    /**
     * @summary
     * ### [Get Guild Roles]{@link https://discord.com/developers/docs/resources/guild#get-guild-roles}
     * @example
     * await api.discord.guilds.roles.getAll(params);
     * @example
     * await api.discord.guilds.roles.getAll({
     *   guild_id: '0000000000'
     * });
     * @function getAll
     * @memberof module:guilds.roles#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @returns {Promise<Role[]>} List of [Role]{@link https://discord.com/developers/docs/topics/permissions#role-object} objects for the guild.
     */
    getAll: async (params) => {
  
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint: `guilds/${params.guild_id}/roles`
      });

      for (const role of attempt) {
        role.permission_names = [];
        if (role.permissions > 0) 
          role.permission_names = parsePermissions(role.permissions);
      }
      return attempt;
    }, // End of Get Guild Roles

    /**
     * @summary
     * ### [Create Guild Role]{@link https://discord.com/developers/docs/resources/guild#create-guild-role}
     * @example
     * await api.discord.guilds.roles.create({
     *   guild_id: '0000000000',
     *   name: 'noobs',
     *   hoist: true,
     *   mentionable: false,
     * });
     * @function create
     * @memberof module:guilds.roles#
     * @fires guilds#role_create
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {string} [params.name="new role"] - Name of the role (max 100 characters)
     * @param {string} [params.permissions] - Bitwise value of the enabled/disabled permissions
     * @param {number} [params.color=0] - RGB color value
     * @param {boolean} [params.hoist=false] - Whether the role should be displayed separately in the sidebar
     * @param {string} [params.icon=null] - The role's icon image (if the guild has the `ROLE_ICONS` feature)
     * @param {string} [params.unicode_emoji=null] - The role's unicode emoji as a standard emoji (if the guild has the `ROLE_ICONS` feature)
     * @param {boolean} [params.mentionable=false] - Whether the role should be mentionable
     * @param {string} [params.reason]
     * @returns {Promise<Role>} [Role]{@link https://discord.com/developers/docs/topics/permissions#role-object} object
     */
    create: async (params) => {
      const attempt = await attemptHandler({
        method: 'POST',
        endpoint: `guilds/${params.guild_id}/roles`,
        body: {
          name: params.name ?? 'new role',
          permissions: params.permissions ?? null,
          color: params.color ?? 0,
          hoist: params.hoist || false,
          icon: params.icon ? (await imageData(params.icon, 'base64string')).data : null,
          unicode_emoji: params.unicode_emoji ?? null,
          mentionable: params.mentionable || false
        },
        reason: params.reason ?? null
      });
      if (attempt.permissions > 0)
        attempt.permission_names = parsePermissions(attempt.permissions);
      return attempt;
    }, // End of Create Guild Role

    /**
     * @summary
     * ### [Modify Guild Role]{@link https://discord.com/developers/docs/resources/guild#modify-guild-role}
     * @example
     * await api.discord.guilds.roles.update({
     *   guild_id: '0000000000',
     *   role_id: '0000000000',
     *   name: 'noobs',
     *   hoist: true,
     *   mentionable: false,
     * });
     * @function update
     * @memberof module:guilds.roles#
     * @fires guilds#role_update
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.role_id
     * @param {string} [params.name="new role"] - Name of the role (max 100 characters)
     * @param {string} [params.permissions] - Bitwise value of the enabled/disabled permissions
     * @param {number} [params.color=0] - RGB color value
     * @param {boolean} [params.hoist=false] - Whether the role should be displayed separately in the sidebar
     * @param {string | Buffer} [params.icon=null] - The role's icon image (if the guild has the `ROLE_ICONS` feature)
     * @param {string} [params.unicode_emoji=null] - The role's unicode emoji as a standard emoji (if the guild has the `ROLE_ICONS` feature)
     * @param {boolean} [params.mentionable=false] - Whether the role should be mentionable
     * @param {string} [params.reason]
     * @returns {Promise<Role>} The updated [Role]{@link https://discord.com/developers/docs/topics/permissions#role-object} object
     */
    update: async (params) => {
      if (params.icon) params.icon = (await imageData(params.icon, 'base64string')).data;

      const attempt = await attemptHandler({
        method: 'PATCH',
        endpoint: `guilds/${params.guild_id}/roles/${params.role_id}`,
        body: params,
        reason: params.reason ?? null
      });
      if (attempt.permissions > 0)
        attempt.permission_names = parsePermissions(attempt.permissions);
      return attempt;
    }, // End of Modify Guild Role

    /**
     * @summary
     * ### [Delete Guild Role]{@link https://discord.com/developers/docs/resources/guild#delete-guild-role}
     * @example
     * await api.discord.guilds.roles.destroy({
     *   guild_id: '0000000000',
     *   role_id: '0000000000'
     * });
     * @function destroy
     * @memberof module:guilds.roles#
     * @fires guilds#role_delete
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.role_id
     * @param {string} [params.reason]
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    destroy: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `guilds/${params.guild_id}/roles/${params.role_id}`,
        reason: params.reason ?? null
      }), // End of Delete Guild Role

    /**
     * @summary
     * ### [Modify Guild Role Positions]{@link https://discord.com/developers/docs/resources/guild#modify-guild-role-positions}
     * @example
     * await api.discord.guilds.roles.modifyPositions({
     *   guild_id: '0000000000',
     *   roles: [
     *     {
     *       id: '0000000000',
     *       position: 5
     *     },
     *     {
     *       id: '0000000000',
     *       position: 2
     *     }
     *   ]
     * });
     * @function modifyPositions
     * @memberof module:guilds.roles#
     * @fires guilds#role_update
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {{id: Snowflake, position: number}[]} params.roles
     * @param {string} [params.reason]
     * @returns {Promise<Role[]>} List of all of the guild's [Role]{@link https://discord.com/developers/docs/topics/permissions#role-object} objects
     */
    modifyPositions: async (params) => 
      attemptHandler({
        method: 'PATCH',
        endpoint: `guilds/${params.guild_id}/roles`,
        body: params.roles,
        reason: params.reason ?? null
      }) // End of Modify Guild Role Positions
    
  },

  // ///////////////////////////////////////////////////////////////////
  // ////////////////////////// GUILDS.EMOJIS //////////////////////////
  // ///////////////////////////////////////////////////////////////////
  // https://discord.com/developers/docs/resources/emoji#emoji-resource
  /**
   * @summary All functions relating to guild emojis
   * @memberof module:guilds
   * @namespace emojis
   */
  emojis: {

    /**
     * @summary
     * ### [Get Guild Emoji]{@link https://discord.com/developers/docs/resources/emoji#get-guild-emoji}
     * @example
     * await api.discord.guilds.emojis.retrieve({
     *   guild_id: '0000000000',
     *   emoji_id: '0000000000'
     * });
     * @function retrieve
     * @memberof module:guilds.emojis#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.emoji_id
     * @returns {Promise<Emoji>} [Emoji]{@link https://discord.com/developers/docs/resources/emoji#emoji-object} object for the given guild and emoji IDs.
     */
    retrieve: async (params) =>
      attemptHandler({
        method: 'GET',
        endpoint: `guilds/${params.guild_id}/emojis/${params.emoji_id}`
      }), // End of Get Guild Emoji

    /**
     * @summary
     * ### [List Guild Emojis]{@link https://discord.com/developers/docs/resources/emoji#list-guild-emojis}
     * @example
     * await api.discord.guilds.emojis.getAll({
     *   guild_id: '0000000000'
     * });
     * @function getAll
     * @memberof module:guilds.emojis#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @returns {Promise<Emoji[]>} List of [Emoji]{@link https://discord.com/developers/docs/resources/emoji#emoji-object} objects for the given guild.
     */
    getAll: async (params) =>
      attemptHandler({
        method: 'GET',
        endpoint: `guilds/${params.guild_id}/emojis`
      }), // End of List Guild Emojis

    /**
     * @summary
     * ### [Create Guild Emoji]{@link https://discord.com/developers/docs/resources/emoji#create-guild-emoji}
     * @description
     * Emojis have a maximum file size of 256kb
     * @example
     * await api.discord.guilds.emojis.create({
     *   guild_id: '0000000000',
     *   name: 'CoolNewEmoji',
     *   image: 'https://www.url.com` // or image buffer
     * });
     * @function create
     * @memberof module:guilds.emojis#
     * @fires guilds#emojis_update
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {string} params.name - Name of the emoji
     * @param {string | Buffer} params.image - The URL or buffer of the image to use
     * @param {Snowflake[]} [params.roles] - Roles allowed to use this emoji
     * @param {string} [params.reason]
     * @returns {Promise<Emoji>} [Emoji]{@link https://discord.com/developers/docs/resources/emoji#emoji-object} object
     */
    create: async (params) =>
      attemptHandler({
        method: 'POST',
        endpoint: `guilds/${params.guild_id}/emojis`,
        body: {
          name: params.name,
          image: params.image ? (await imageData(params.image, 'base64string')).data : null,
          roles: params.roles ?? []
        },
        reason: params.reason ?? null
      }), // End of Create Guild Emoji

    /**
     * @summary
     * ### [Modify Guild Emoji]{@link https://discord.com/developers/docs/resources/emoji#modify-guild-emoji}
     * @example
     * await api.discord.guilds.emojis.update({
     *   guild_id: '0000000000',
     *   emoji_id: '0000000000',
     *   name: 'CoolNewNewEmoji',
     * });
     * @function update
     * @memberof module:guilds.emojis#
     * @fires guilds#emojis_update
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.emoji_id
     * @param {string} params.name - Name of the emoji
     * @param {Snowflake[]} [params.roles] - Roles allowed to use this emoji
     * @param {string} [params.reason]
     * @returns {Promise<Emoji>} The updated [Emoji]{@link https://discord.com/developers/docs/resources/emoji#emoji-object} object
     */
    update: async (params) =>
      attemptHandler({
        method: 'PATCH',
        endpoint: `guilds/${params.guild_id}/emojis/${params.emoji_id}`,
        body: params,
        reason: params.reason
      }), // End of Modify Guild Emoji

    /**
     * @summary
     * ### [Delete Guild Emoji]{@link https://discord.com/developers/docs/resources/emoji#delete-guild-emoji}
     * @example
     * await api.discord.guilds.emojis.destroy({
     *   guild_id: '0000000000',
     *   emoji_id: '0000000000'
     * });
     * @function destroy
     * @memberof module:guilds.emojis#
     * @fires guilds#emojis_update
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.emoji_id
     * @param {string} [params.reason]
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    destroy: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `guilds/${params.guild_id}/emojis/${params.emoji_id}`,
        reason: params.reason ?? null
      }) // End of Delete Guild Emoji
  },


  // ///////////////////////////////////////////////////////////////////
  // ////////////////////////// GUILDS.STICKERS ////////////////////////
  // ///////////////////////////////////////////////////////////////////
  // https://discord.com/developers/docs/resources/emoji#emoji-resource
  /**
   * @summary All functions relating to guild stickers
   * @memberof module:guilds
   * @namespace stickers
   */
  stickers: {
  
    /**
     * @summary
     * ### [Get Guild Sticker]{@link https://discord.com/developers/docs/resources/sticker#get-sticker}
     * @example
     * await api.discord.guilds.stickers.retrieve({
     *   sticker_id: '0000000000'
     * });
     * @function retrieve
     * @memberof module:guilds.stickers#
     * @param {Object} params
     * @param {Snowflake} params.sticker_id
     * @returns {Promise<Sticker>} [Sticker]{@link https://discord.com/developers/docs/resources/sticker#sticker-object} object for the given guild and emoji IDs.
     */
    retrieve: async (params) =>
      attemptHandler({
        method: 'GET',
        endpoint: `stickers/${params.sticker_id}`
      }), // End of Get Sticker

    /**
     * @summary
     * ### [List Nitro Sticker Packs]{@link https://discord.com/developers/docs/resources/sticker#list-nitro-sticker-packs}
     * @example
     * await api.discord.guilds.stickers.nitroPacks();
     * @function nitroPacks
     * @memberof module:guilds.stickers#
     * @returns {Promise<StickerPack[]>} List of [Sticker Pack]{@link https://discord.com/developers/docs/resources/sticker#sticker-pack-object} objects available to Nitro subscribers
     */
    nitroPacks: async () =>
      attemptHandler({
        method: 'GET',
        endpoint: 'sticker-packs'
      }), // End of List Nitro Sticker Packs

    /**
     * @summary
     * ### [List Guild Stickers]{@link https://discord.com/developers/docs/resources/sticker#list-guild-stickers}
     * - Includes user fields if the bot has the MANAGE_GUILD_EXPRESSIONS permission.
     * @example
     * await api.discord.guilds.stickers.getAll({
     *   guild_id: '0000000000'
     * });
     * @function getAll
     * @memberof module:guilds.stickers#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @returns {Promise<Sticker[]>} List of [Sticker]{@link https://discord.com/developers/docs/resources/sticker#sticker-object} objects for the given guild.
     */
    getAll: async (params) =>
      attemptHandler({
        method: 'GET',
        endpoint: `guilds/${params.guild_id}/stickers`
      }), // End of Get Sticker

    /**
     * @summary
     * ### [Get Guild Sticker]{@link https://discord.com/developers/docs/resources/sticker#get-guild-sticker}
     * - Includes the user field if the bot has the MANAGE_GUILD_EXPRESSIONS permission.
     * @example
     * await api.discord.guilds.stickers.retrieveGuildSticker({
     *   guild_id: '0000000000',
     *   sticker_id: '0000000000'
     * });
     * @function retrieveGuildSticker
     * @memberof module:guilds.stickers#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.sticker_id
     * @returns {Promise<Sticker>} [Sticker]{@link https://discord.com/developers/docs/resources/sticker#sticker-object} object for the given guild and sticker IDs
     */
    retrieveGuildSticker: async (params) =>
      attemptHandler({
        method: 'GET',
        endpoint: `guilds/${params.guild_id}/stickers/${params.sticker_id}`
      }), // End of Get Guild Sticker

    /**
     * @summary
     * ### [Modify Guild Sticker]{@link https://discord.com/developers/docs/resources/sticker#modify-guild-sticker}
     * - Requires the `MANAGE_GUILD_EXPRESSIONS` permission
     * @example
     * await api.discord.guilds.stickers.update({
     *   guild_id: '0000000000',
     *   sticker_id: '0000000000',
     *   name: 'newStickerName'
     * });
     * @function update
     * @memberof module:guilds.stickers#
     * @fires guilds#stickers_update
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.sticker_id
     * @param {string} [params.name] - Name of the sticker (2-30 characters)
     * @param {?string} [params.description] - Description of the sticker (empty or 2-100 characters)
     * @param {string} [params.tags] - Autocomplete/suggestion tags for the sticker (max 200 characters)
     * @param {string} [params.reason]
     * @returns {Promise<Sticker>} The updated [Sticker]{@link https://discord.com/developers/docs/resources/sticker#sticker-object} object
     */
    update: async (params) =>
      attemptHandler({
        method: 'PATCH',
        endpoint: `guilds/${params.guild_id}/stickers/${params.sticker_id}`,
        body: params,
        reason: params.reason ?? null
      }), // End of Modify Guild Sticker

    /**
     * @summary
     * ### [Delete Guild Sticker]{@link https://discord.com/developers/docs/resources/sticker#delete-guild-sticker}
     * - Requires the `MANAGE_GUILD_EXPRESSIONS` permission
     * @example
     * await guilds.stickers.destroy({
     *   guild_id: '0000000000',
     *   sticker_id: '0000000000'
     * });
     * @function destroy
     * @memberof module:guilds.stickers#
     * @fires guilds#stickers_update
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.sticker_id
     * @param {string} [params.reason]
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    destroy: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `guilds/${params.guild_id}/stickers/${params.sticker_id}`,
        reason: params.reason ?? null
      }), // End of Delete Guild Sticker

    /**
     * @summary
     * ### [Create Guild Sticker]{@link https://discord.com/developers/docs/resources/sticker#create-guild-sticker}
     * - Requires the `MANAGE_GUILD_EXPRESSIONS` permission
     * @example
     * await guilds.stickers.create({
     *   guild_id: '0000000000',
     *   name: 'coolStickerName',
     *   description: 'testing', // optional
     *   tags: 'placeholder',
     *   file: 'https://stickerURL.gif' // or buffer
     * });
     * @function create
     * @memberof module:guilds.stickers#
     * @fires guilds#stickers_update
     * @param {Object} params
     * @param {Snowflake} params.guild_id 
     * @param {string} params.name
     * @param {string} [params.description]
     * @param {string} params.tags - Autocomplete/suggestion tags for the sticker (max 200 characters)
     * @param {string | Buffer | undefined} params.file
     * The sticker file to upload.
     * 
     * Must be a PNG, APNG, or GIF, max 512 KB
     * @returns {Promise<Sticker|undefined>} [Sticker]{@link https://discord.com/developers/docs/resources/sticker#sticker-object} object
     */
    create: async (params) => {
      const form = new FormData();
      try {
      
        const file = await imageData(params.file);
        const { data, type } = file;
        if (!type || !data || !(data instanceof Buffer)) return;
        // const trueType = (imageInfo(data)).mimeType;
      
        const newFile = await resizeImage(data, type);
        if (!newFile)
          throw new Error('There was an error while converting/resizing the asset');
        
        // file = new Blob([buffer]);
        
        form.append('file', new Blob([newFile.image], { type: 'image/png' }), 'filename');
        form.append('name', params.name);
        if (params.description)
          form.append('description', params.description);
        form.append('tags', params.tags);

        const response = await fetch(`https://discord.com/api/v10/guilds/${params.guild_id}/stickers`, {
          method: 'POST',
          body: form,
          headers: {
            'Authorization': `Bot ${token('discord')}`
          }
        });

        if (!response.ok)
          throw new ResponseError(await response.json(), response, 'discord_error');
  
        return response.json();
        
      } catch (e) {
        throw e;
      }
    } // End of Create Guild Sticker
  },

  // ///////////////////////////////////////////////////////////////////
  // ////////////////////////// GUILDS.EVENTS //////////////////////////
  // ///////////////////////////////////////////////////////////////////
  // https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event
  /**
   * @summary All functions relating to Guild Scheduled Events
   * @memberof module:guilds
   * @namespace events
   */
  events: {

    /**
     * @summary
     * ### [Get Guild Scheduled Event]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event}
     * @example
     * await api.discord.guilds.events.retrieve({
     *   guild_id: '0000000000',
     *   guild_scheduled_event_id: '0000000000',
     *   with_user_count: true
     * });
     * @function retrieve
     * @memberof module:guilds.events#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.guild_scheduled_event_id
     * @param {boolean} [params.with_user_count] - Include number of users subscribed to this event
     * @returns {Promise<GuildScheduledEvent>} [Guild Scheduled Event]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object} object
     */
    retrieve: async (params) => {
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint: `guilds/${params.guild_id}/scheduled-events/${params.guild_scheduled_event_id}?with_user_count=${params.with_user_count || true}`
      });
      if (attempt.creator) {
        attempt.creator.badges = getBadges(attempt.creator.public_flags);
        attempt.creator.created_at = retrieveDate(attempt.creator.id, true);
        if (attempt.creator.avatar)
          attempt.creator.avatarURL = avatarFromObject(attempt.creator.id, attempt.creator.avatar);
      }
      attempt.statusName = ScheduledEventStatus[attempt.status];
      attempt.entityTypeName = ScheduledEventEntityType[attempt.entity_type];
      return attempt;
    }, // End of Get Guild Scheduled Event

    /**
     * @summary
     * ### [List Scheduled Events for Guild]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild}
     * @example
     * await api.discord.guilds.events.getAll({
     *   guild_id: '0000000000',
     *   with_user_count: true
     * });
     * @function getAll
     * @memberof module:guilds.events#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {boolean} [params.with_user_count] - Include number of users subscribed to this event
     * @returns {Promise<GuildScheduledEvent[]>} [Guild Scheduled Event]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object} object
     */
    getAll: async (params) => {
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint: `guilds/${params.guild_id}/scheduled-events?with_user_count=${params.with_user_count || true}`
      });
      for (const event of attempt) {
        if (event.creator) {
          event.creator.badges = getBadges(event.creator.public_flags);
          event.creator.created_at = retrieveDate(event.creator.id, true);
          if (event.creator.avatar)
            event.creator.avatarURL = avatarFromObject(event.creator.id, event.creator.avatar);
        }
        event.statusName = ScheduledEventStatus[event.status];
        event.entityTypeName = ScheduledEventEntityType[event.entity_type];
      }
      return attempt;
    }, // End of List Scheduled Events for Guild

    /**
     * @summary
     * ### [Get Guild Scheduled Event Users]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users}
     * - Guild member data, if it exists, is included if the `with_member` query parameter is set.
     * @example
     * await api.discord.guilds.events.getUsers({
     *   guild_id: '0000000000',
     *   guild_scheduled_event_id: '0000000000',
     *   limit: 10,
     *   with_member: true
     * });
     * @function getUsers
     * @memberof module:guilds.events#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.guild_scheduled_event_id
     * @param {number} [params.limit=100] - Number of users to return (up to maximum 100)
     * @param {boolean} [params.with_member=false] - Include guild member data if it exists
     * @param {Snowflake} [params.before=null] - Consider only users before given user id
     * @param {Snowflake} [params.after=null] - Consider only users after given user id
     * @returns {Promise<EventUser[]>} A list of [Guild Scheduled Event User]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-user-object} objects
     */
    getUsers: async (params) => {
      let endpoint = `guilds/${params.guild_id}/scheduled-events/${params.guild_scheduled_event_id}/users?`;
      endpoint += `${params.limit ? `&limit=${params.limit}` : ''}`;
      endpoint += `${params.with_member ? `&with_member=${params.with_member}` : ''}`;
      endpoint += `${params.before ? `&before=${params.before}` : ''}`;
      endpoint += `${params.after ? `&after=${params.after}` : ''}`;
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint
      });
      for (const event of attempt) {
        event.user.badges = getBadges(event.user.public_flags);
        event.user.created_at = retrieveDate(event.user.id, true);
        if (event.member) {
          event.member.displayName = event.member.nick ?? event.user.display_name ?? event.user.global_name ?? event.user.username;
          event.member.displayAvatar = avatarFromObject(event.user.id, event.user.avatar, params.guild_id, event.member.nick);
        }
      }
      return attempt;
    }, // End of Get Guild Scheduled Event Users

    /**
     * @summary
     * ### [Create Guild Scheduled Event]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event}
     * @example
     * await api.discord.guilds.events.create({
     *   guild_id: '0000000000',
     *   name: 'Cool Event Name',
     *   privacy_level: 2,
     *   scheduled_start_time: '2023-04-04T11:00:00',
     *   entity_type: 2,
     *   channel_id: '0000000000'
     * });
     * @function create
     * @memberof module:guilds.events#
     * @fires guilds#scheduled_event_create
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {string} params.name
     * @param {string} [params.description]
     * @param {string | Buffer} [params.image] - The cover image of the event
     * @param {Snowflake} [params.channel_id] - Required for VOICE and STAGE events
     * @param {EventPrivacyLevel} params.privacy_level
     * @param {EventEntityType} params.entity_type
     * @param {EventEntityMetadata} [params.entity_metadata] - Required for events with `'entity_type': EXTERNAL`
     * @param {ISO8601Timestamp} params.scheduled_start_time
     * @param {ISO8601Timestamp} [params.scheduled_end_time] - Required for events with `'entity_type': EXTERNAL`
     * @param {string} [params.reason]
     * @returns {Promise<GuildScheduledEvent>} [Guild Scheduled Event]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object} object
     */
    create: async (params) => {
      if ((params.entity_type === 1 || params.entity_type === 2) && !params.channel_id)
        throw new Error('channel_id is required for VOICE and STAGE events');

      return attemptHandler({
        method: 'POST',
        endpoint: `guilds/${params.guild_id}/scheduled-events`,
        body: {
          name: params.name,
          description: params.description ?? null,
          image: params.image ? (await imageData(params.image, 'base64string')).data : null,
          channel_id: params.channel_id ?? null,
          entity_type: params.entity_type ?? null,
          entity_metadata: params.entity_metadata ?? null,
          privacy_level: params.privacy_level ?? 2,
          scheduled_start_time: params.scheduled_start_time ?? null,
          scheduled_end_time: params.scheduled_end_time ?? null
        },
        reason: params.reason ?? null
      });
    }, // End of Create Guild Scheduled Event

    /**
     * @summary
     * ### [Modify Guild Scheduled Event]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event}
     * To start or end an event, use this endpoint to modify the event's [status]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status} field.
     * @example
     * await api.discord.guilds.events.update({
     *   guild_id: '0000000000',
     *   guild_scheduled_event_id: '0000000000'
     *   name: 'Edited Event Name',
     *   status: 2 // ACTIVE
     * });
     * @function update
     * @memberof module:guilds.events#
     * @fires guilds#scheduled_event_update
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.guild_scheduled_event_id
     * @param {string} [params.name]
     * @param {string} [params.description]
     * @param {string | Buffer} [params.image] - The cover image of the event
     * @param {EventStatus} [params.status] - [Status]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status}
     * @param {?Snowflake} [params.channel_id] - Required for VOICE and STAGE events
     * @param {EventPrivacyLevel} [params.privacy_level] - [Privacy level]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level}
     * @param {EventEntityType} [params.entity_type] - [Entity type]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types}
     * @param {EventEntityMetadata} [params.entity_metadata] - [Entity metadata]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-metadata} - Required for events with `'entity_type': EXTERNAL`
     * @param {ISO8601Timestamp} [params.scheduled_start_time]
     * @param {ISO8601Timestamp} [params.scheduled_end_time] - Required for events with `'entity_type': EXTERNAL`
     * @param {string} [params.reason]
     * @returns {Promise<GuildScheduledEvent>} The modified [Guild Scheduled Event]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object} object
     */
    update: async (params) => {
      if (params.image) params.image = (await imageData(params.image, 'base64string')).data;
      if ((params.entity_type === 3) && !params.channel_id)
        params.channel_id = null;

      return attemptHandler({
        method: 'PATCH',
        endpoint: `guilds/${params.guild_id}/scheduled-events/${params.guild_scheduled_event_id}`,
        body: params,
        reason: params.reason ?? null
      });
    }, // End of Modify Guild Scheduled Event

    /**
     * @summary
     * ### [Delete Guild Scheduled Event]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event}
     * @example
     * await api.discord.guilds.events.destroy({
     *   guild_id: '0000000000',
     *   guild_scheduled_event_id: '0000000000'
     * });
     * @function destroy
     * @memberof module:guilds.events#
     * @fires guilds#scheduled_event_delete
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.guild_scheduled_event_id
     * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
     */
    destroy: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `guilds/${params.guild_id}/scheduled-events/${params.guild_scheduled_event_id}`
      }) // End of Delete Guild Scheduled Event
  },

  // ///////////////////////////////////////////////////////////////////
  // ///////////////////////// GUILDS.TEMPLATES ////////////////////////
  // ///////////////////////////////////////////////////////////////////
  // https://discord.com/developers/docs/resources/guild-template#guild-template-resource
  /**
   * @summary All functions relating to Guild Templates
   * @memberof module:guilds
   * @namespace templates
   */
  templates: {

    /**
     * @summary
     * ### [Get Guild Template]{@link https://discord.com/developers/docs/resources/guild-template#get-guild-template}
     * @example
     * await api.discord.guilds.templates.retrieve({
     *   template_code: '0000000000'
     * });
     * @function retrieve
     * @memberof module:guilds.templates#
     * @param {Object} params
     * @param {Snowflake} params.template_code
     * @returns {Promise<GuildTemplate>} A [Guild Template]{@link https://discord.com/developers/docs/resources/guild-template#guild-template-object} object for the given code
     */
    retrieve: async (params) =>
      attemptHandler({
        method: 'GET',
        endpoint: `guilds/templates/${params.template_code}`
      }), // End of Get Guild Template

    /**
     * @summary
     * ### [Get Guild Templates]{@link https://discord.com/developers/docs/resources/guild-template#get-guild-templates}
     * - Requires the `MANAGE_GUILD` permission
     * @example
     * await api.discord.guilds.templates.getAll({
     *  guild_id: '0000000000'
     * });
     * @function getAll
     * @memberof module:guilds.templates#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @returns {Promise<GuildTemplate[]>} Array of [Guild Template]{@link https://discord.com/developers/docs/resources/guild-template#guild-template-object} objects
     */
    getAll: async (params) =>
      attemptHandler({
        method: 'GET',
        endpoint: `guilds/${params.guild_id}/templates`
      }), // End of Get Guild Templates

    /**
     * @summary
     * ### [Create Guild Template]{@link https://discord.com/developers/docs/resources/guild-template#create-guild-template}
     * - Requires the `MANAGE_GUILD` permission
     * - 
     * @example
     * await api.discord.guilds.templates.create({
     *   guild_id: '0000000000',
     *   name: 'My Guild Template'
     * });
     * @function create
     * @memberof module:guilds.templates#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {string} params.name - Name for the template (1-100 characters)
     * @param {string} [params.description] - Description for the template (0-120 characters)
     * @returns {Promise<GuildTemplate>} The created [Guild Template]{@link https://discord.com/developers/docs/resources/guild-template#guild-template-object} object
     */
    create: async (params) =>
      attemptHandler({
        method: 'POST',
        endpoint: `guilds/${params.guild_id}/templates`,
        body: {
          name: params.name,
          description: params.description ?? null
        }
      }), // End of Create Guild Template

    /**
     * @summary
     * ### [Create Guild from Guild Template]{@link https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template}
     * - Can be used only by bots in less than 10 guilds
     * @example
     * await api.discord.guilds.templates.createGuild({
     *   template_code: '0000000000'
     * });
     * @function createGuild
     * @memberof module:guilds.templates#
     * @fires guilds#create
     * @param {Object} params
     * @param {Snowflake} params.template_code
     * @param {string} params.name - Name of the guild (2-100 characters)
     * @param {string} [params.icon] - base64 128x128 image for the guild icon
     * @returns {Promise<Guild>} A [Guild]{@link https://discord.com/developers/docs/resources/guild#guild-object} object for the given code
     */
    createGuild: async (params) =>
      attemptHandler({
        method: 'POST',
        endpoint: `guilds/templates/${params.template_code}`,
        body: {
          name: params.name,
          icon: params.icon ? (await imageData(params.icon, 'base64string')).data : null
        }
      }), // End of Create Guild from Guild Template

    /**
     * @summary
     * ### [Sync Guild Template]{@link https://discord.com/developers/docs/resources/guild-template#sync-guild-template}
     * - Requires the `MANAGE_GUILD` permission
     * @example
     * await api.discord.guilds.templates.sync({
     *   guild_id: '0000000000',
     *   template_code: '0000000000'
     * });
     * @function sync
     * @memberof module:guilds.templates#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.template_code
     * @returns {Promise<Guild>} The [Guild Template]{@link https://discord.com/developers/docs/resources/guild-template#guild-template-object} object
     */
    sync: async (params) =>
      attemptHandler({
        method: 'PUT',
        endpoint: `guilds/${params.guild_id}/templates/${params.template_code}`
      }), // End of Sync Guild Template

    /**
     * @summary
     * ### [Modify Guild Template]{@link https://discord.com/developers/docs/resources/guild-template#modify-guild-template}
     * - Requires the `MANAGE_GUILD` permission
     * @example
     * await api.discord.guilds.templates.update({
     *   guild_id: '0000000000',
     *   template_code: '0000000000'
     * });
     * @function update
     * @memberof module:guilds.templates#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.template_code
     * @param {string} [params.name] - Name for the template (1-100 characters)
     * @param {string} [params.description] - Description for the template (0-120 characters)
     * @returns {Promise<GuildTemplate>} The updated [Guild Template]{@link https://discord.com/developers/docs/resources/guild-template#guild-template-object} object
     */
    update: async (params) =>
      attemptHandler({
        method: 'PATCH',
        endpoint: `guilds/${params.guild_id}/templates/${params.template_code}`,
        body: params
      }), // End of Modify Guild Template

    /**
     * @summary
     * ### [Delete Guild Template]{@link https://discord.com/developers/docs/resources/guild-template#delete-guild-template}
     * - Requires the `MANAGE_GUILD` permission
     * @example
     * await api.discord.guilds.templates.destroy({
     *   guild_id: '0000000000',
     *   template_code: '0000000000'
     * });
     * @function destroy
     * @memberof module:guilds.templates#
     * @param {Object} params
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.template_code
     * @returns {Promise<GuildTemplate>} The deleted [Guild Template]{@link https://discord.com/developers/docs/resources/guild-template#guild-template-object} object
     */
    destroy: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `guilds/${params.guild_id}/templates/${params.template_code}`
      }) // End of Delete Guild Template
  }
};