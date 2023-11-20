// @ts-check

'use strict';

/**
 * @ignore
 * @global
 * @typedef {string} Snowflake
 */

/**
 * @ignore
 * @typedef {string} ISO8601Timestamp
 */

/**
 * @typedef {"ADD_REACTIONS"|"ADMINISTRATOR"|"ATTACH_FILES"|"BAN_MEMBERS"|"CHANGE NICKNAME"|"CONNECT"|"CREATE_INSTANT_INVITE"|"CREATE_PRIVATE_THREADS"|"CREATE_PUBLIC_THREADS"|"DEAFEN_MEMBERS"|"EMBED_LINKS"|"KICK_MEMBERS"|"MANAGE_CHANNELS"|"MANAGE_EMOJIS_AND_STICKERS"|"MANAGE_EVENTS"|"MANAGE_SERVER"|"MANAGE_MESSAGES"|"MANAGE_NICKNAMES"|"MANAGE_ROLES"|"MANAGE_THREADS"|"MANAGE_WEBHOOKS"|"MENTION_EVERYONE"|"MODERATE_MEMBERS"|"MOVE_MEMBERS"|"MUTE_MEMBERS"|"PRIORITY_SPEAKER"|"READ_MESSAGE_HISTORY"|"REQUEST_TO_SPEAK"|"SEND_MESSAGES"|"SEND_MESSAGES_IN_THREADS"|"SEND_TTS_MESSAGES"|"SPEAK"|"VIDEO"|"USE_APPLICATION_COMMANDS"|"USE_EMBEDDED_ACTIVITIES"|"USE_EXTERNAL_EMOJIS"|"USE_EXTERNAL_STICKERS"|"USE_VOICE_ACTIVITY"|"VIEW_AUDIT_LOG"|"VIEW_CHANNEL"|"VIEW_SERVER_INSIGHTS"} PermNames
 */

/**
 * @typedef {'Discord Employee'|'Partnered Server Owner'|'HypeSquad Events Member'|'Bug Hunter Level 1'|'House Bravery Member'|'House Brilliance Member'|'House Balance Member'|'Early Nitro Supporter'|'User is a team'|'Bug Hunter Level 2'|'Verified Bot'|'Early Verified Bot Developer'|'Discord Certified Moderator'|'Interactions Handler'|'Active Developer'} UserFlags
 */

/**
 * @summary [OAuth2 Scopes]{@link https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes}
 * @typedef {'activities.read'|'activites.write'|'applications.builds.read'|'applications.builds.upload'|'applications.commands'|'applications.commands.update'|'applications.commands.permissions.update'|'applications.entitlements'|'applications.store.update'|'bot'|'connections'|'dm_channels.read'|'email'|'gdm.join'|'guilds'|'guilds.join'|'guilds.members.read'|'identify'|'messages.read'|'relationships.read'|'role_connections.write'|'rpc'|'rpc.activities.write'|'rpc.notifications.read'|'rpc.voice.read'|'rpc.voice.write'|'voice'|'webhook.incoming'} OAuth2Scopes
 * | Name | Description |
 * |------|-------------|
 * | activities.read | allows your app to fetch data from a user's "Now Playing/Recently Played" list — not currently available for apps |
 * | activites.write | allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER) |
 * | applications.builds.read | allows your app to read build data for a user's applications |
 * | applications.builds.upload | allows your app to upload/update builds for a user's applications - requires Discord approval |
 * | applications.commands | allows your app to use commands in a guild |
 * | applications.commands.update | allows your app to update its commands using a Bearer token - client credentials grant only |
 * | applications.commands.permissions.update | allows your app to update permissions for its commands in a guild a user has permissions to |
 * | applications.entitlements | allows your app to read entitlements for a user's applications |
 * | applications.store.update | allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications |
 * | bot | for oauth2 bots, this puts the bot in the user's selected guild by default |
 * | connections | allows `/users/@me/connections` to return linked third-party accounts |
 * | dm_channels.read | allows your app to see information about the user's DMs and group DMs - requires Discord approval |
 * | email | enables `/users/@me` to return an email |
 * | gdm.join | allows your app to join users to a group dm |
 * | guilds | allows `/users/@me/guilds` to return basic information about all of a user's guilds |
 * | guilds.join | 	allows `/guilds/{guild.id}/members/{user.id}` to be used for joining users to a guild
 * | guilds.members.read | allows `/users/@me/guilds/{guild.id}/member` to return a user's member information in a guild |
 * | identify | allows `/users/@me` without `email`
 * | messages.read | for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)
 * | relationships.read | allows your app to know a user's friends and implicit relationships - requires Discord approval
 * | role_connections.write | allows your app to update a user's connection and metadata for the app
 * | rpc | for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval
 * | rpc.activities.write | for local rpc server access, this allows you to update a user's activity - requires Discord approval
 * | rpc.notifications.read | for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval
 * | rpc.voice.read | for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval
 * | rpc.voice.write | for local rpc server access, this allows you to update a user's voice settings - requires Discord approval
 * | voice | allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval
 * | webhook.incoming | this generates a webhook that is returned in the oauth token response for authorization code grants
 */
/**
 * @summary [OAuth2 Access Token Response]{@link https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-response}
 * @typedef {Object} AccessTokenResponse
 * @property {string} token_type - Type of token
 * @property {string} access_token
 * @property {string} refresh_token
 * @property {OAuth2Scopes[]} scope
 * @property {number} expires_in
 */

/**
 * @summary [Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure}
 * @description
 * There are 3 types of commands accessible in different interfaces: the chat input, a message's context menu (top-right menu or right-clicking in a message), and a user's context menu (right-clicking on a user)
 * @typedef {Object} ApplicationCommand
 * @property {Snowflake} id
 * @property {ApplicationCommandType} [type=1] - [Type of command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types}. Defaults to `1`.
 * @property {string} typeName
 * @property {Snowflake} application_id - ID of the parent application
 * @property {Snowflake} [guild_id] - Guild ID of the command, if not global
 * @property {string} name - [Name of command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming} (1-32 characters)
 * @property {LocalizationMap} [name_localizations] - Localization dictionary for `name` field. [Available locales]{@link https://discord.com/developers/docs/reference#locales}
 * @property {string} description - Description for `CHAT_INPUT` commands, 1-100 characters. Empty string for `USER` and `MESSAGE` commands. 
 * @property {LocalizationMap} [description_localizations] - Localization dictionary for `description` field.
 * @property {ApplicationCommandOption[]} [options] - Parameters for the command, max of 25. 
 * @property {string} default_member_permissions - Set of permissions represented as a bit set.
 * @property {boolean} [dm_permission] - Indicates whether the command is available in DMs with the app, only for globally-scoped commands.
 * @property {boolean} [nsfw=false] - Indicates whether the command is age-restricted.
 * @property {Snowflake} version - Autoincrementing version identifier updated during substantial record changes
 *
 * Set `default_member_permissions` to "0" to disable the command for everyone except admins by default,
 * and/or set dm_permission to false to disable globally-scoped commands inside of DMs with your app
 */

/**
 * @summary [Application Command Option]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 * @typedef {Object} ApplicationCommandOption
 * @property {ApplicationCommandOptionType} type - [Type of command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 * @property {string} name - [Name of command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming} (1-32 characters)
 * @property {LocalizationMap} [name_localizations] - Localization dictionary for `name` field. [Available locales]{@link https://discord.com/developers/docs/reference#locales}
 * @property {string} description - Description for `CHAT_INPUT` commands, 1-100 characters. Empty string for `USER` and `MESSAGE` commands. 
 * @property {LocalizationMap} [description_localizations] - Localization dictionary for `description` field.
 * @property {boolean} [required=false] - If the parameter is required or optional
 * @property {ApplicationCommandOptionChoice} [choices] - Choices for `STRING`, `INTEGER`, and `NUMBER` types for the user to pick from, max 25
 * @property {ApplicationCommandOption[]} [options] - If the option is a subcommand or subcommand group type, these nested options will be the parameters
 * @property {number} [channel_types] - If the option is a channel type, the channels shown will be restricted to these types
 * @property {number} [min_value] - For `INTEGER` options, double for NUMBER options	If the option is an INTEGER or NUMBER type, the minimum value permitted
 * @property {number} [max_value] - For `INTEGER` options, double for NUMBER options	If the option is an INTEGER or NUMBER type, the maximum value permitted
 * @property {number} [min_length] - For `STRING` options, the minimum allowed length (minimum of 0, maximum of 6000)
 * @property {number} [max_length] - For `STRING` options, the maximum allowed length (minimum of 1, maximum of 6000)
 * @property {boolean} [autocomplete] - If autocomplete interactions are enabled for this 'STRING`, `INTEGER`, or `NUMBER` type option
 */

/**
 * @summary Application Command Option Choice
 * @description
 * If you specify choices for an option, they are the only valid values for a user to pick
 * @typedef {Object} ApplicationCommandOptionChoice
 * @property {string} name - 1-100 character choice name
 * @property {LocalizationMap} [name_localizations] - Localization dictionary for `name` field. [Available locales]{@link https://discord.com/developers/docs/reference#locales}
 * @property {string | number} value - Value for the choice, up to 100 characters if string
 */

/**
 * @summary Application Command Types
 * @typedef {number} ApplicationCommandType
 * | name  | type | description |
 * |-------|------|-------------|
 * | Chat Input | 1 | Slash commands; a text-based command that shows up when a user types
 * | User       | 2 | A UI-based command that shows up when you right click or tap on a user
 * | Message    | 3 | A UI-based command that shows up when you right click or tap on a message
 */

/**
 * @summary Application Command [Option Types]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 * @typedef {number} ApplicationCommandOptionType
 * | name  | type | description |
 * |-------|------|-------------|
 * | Sub Command       | 1 |
 * | Sub Command Group | 2 |
 * | String            | 3 |
 * | Integer           | 4 | Any integer between -2^53 and 2^53
 * | Boolean           | 5 |
 * | User              | 6 |
 * | Channel           | 7 | Includes all channel types + categories
 * | Role              | 8 |
 * | Mentionable       | 9 | Includes users and roles
 * | Number            | 10 | Any double between -2^53 and 2^53
 * | Attachment        | 11 | {@link Attachment}
 */

/**
 * @ignore
 * @summary Presence Object in Presence Update Event
 * @typedef {Object} Presence
 * @property {Snowflake} userid
 * @property {'online'|'offline'|'idle'|'dnd'} newStatus
 * @property {'online'|'offline'|'idle'|'dnd'} [oldStatus]
 */

/**
 * @ignore
 * @summary Client Status Object
 * @description
 * Active sessions are indicated with an "online", "idle", or "dnd" string per platform. If a user is offline or invisible, the corresponding field is not present.
 * @typedef {Object} ClientStatus
 * @property {string} [desktop] - User's status set for an active desktop (Windows, Linux, Mac) application session
 * @property {string} [mobile] - User's status set for an active mobile (iOS, Android) application session
 * @property {string} [web] - User's status set for an active web (browser, bot user) application session
 */

/**
 * @summary ## [Sticker]{@link https://discord.com/developers/docs/resources/sticker#sticker-object} Object
 * @typedef {Object} Sticker
 * @property {string} id - ID of the sticker
 * @property {string} name - Name of the sticker
 * @property {string} [pack_id] - For standard stickers, ID of the pack the sticker is from
 * @property {?string} description - Description of the sticker
 * @property {string} tags - Autocomplete/suggestion tags for the sticker (max 200 characters)
 * @property {string} [asset] - Deprecated
 * @property {StickerType} type - [Type of sticker]{@link https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types}
 * @property {StickerFormatType} format_type - [Type of sticker format]{@link https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types}
 * @property {boolean} [available] - Whether this guild sticker can be used, may be false due to loss of Server boosts
 * @property {string} [guild_id] - ID of the guild that owns this sticker
 * @property {User} [user] - The [user]{@link User} that created this sticker
 * @property {number} [sort_value] - The standard sticker's sort order within its pack
 */

/**
 * @summary ## [Sticker Types]{@link https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types}
 * @typedef {number} StickerType
 * | Name | Value | Description |
 * |------|-------|-------------|
 * | Standard | 1 | Official sticker in a pack, part of Nitro or in a removed purchasable pack |
 * | Guild    | 2 | A Sticker uploaded to a guild for the guild's members |
 */

/**
 * @summary ## [Sticker Pack]{@link https://discord.com/developers/docs/resources/sticker#sticker-pack-object} Object
 * @typedef {Object} StickerPack
 * @property {string} id - ID of the sticker pack
 * @property {Sticker[]} stickers - The stickers in the pack
 * @property {string} name - Name of the sticker pack
 * @property {string} sku_id - ID of the pack's SKU
 * @property {string} [cover_sticker_id] - ID of a sticker in the pack which is shown as the pack's icon
 * @property {string} description - Description of the sticker pack
 * @property {string} [banner_asset_id] - ID of the sticker pack's [banner image]{@link https://discord.com/developers/docs/reference#image-formatting}
 */

/**
 * @summary ## [Sticker Format Types]{@link https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types}
 * @typedef {number} StickerFormatType
 * | Name | Value |
 * |------|-------|
 * | PNG    | 1 |
 * | APNG   | 2 |
 * | LOTTIE | 3 |
 * | GIF    | 4 |
 */

/**
 * Bot Partial Activity Object
 * @typedef {Object} BotActivity
 * @property {ActivityType} type - [Activity Type]{@link https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types}
 * @property {string} name
 * @property {?string} [state] - User's current party status, or text used for custom status
 * @property {?string} [url] - Stream URL, is validated when type is 1
 */

/**
 * @summary [Activity]{@link https://discord.com/developers/docs/topics/gateway-events#activity-object}
 * @typedef {Object} Activity
 * @property {string} name - Activity's name
 * @property {ActivityType} type - [Type of Activity]{@link https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types}
 * @property {?string} [url] - Stream URL, is validated when type is 1
 * @property {number} created_at - Unix timestamp (in milliseconds) of when the activity was added to the user's session
 * @property {{start: ?number, end: ?number}} [timestamps] - Unix timestamps for start and/or end of the game
 * @property {Snowflake} [application_id] - Application ID for the game
 * @property {?string} [details] - What the player is currently doing
 * @property {?string} [state] - User's current party status
 * @property {?PartialEmoji} [emoji] - Emoji used for custom status
 * @property {{id: string, size: Array<number>}} [party] - Information for the current party of the player
 * @property {{large_image: string, large_text: string, small_image: string, small_text: string}} [assets] - Images for the presence and their hover texts
 * @property {{join: string, spectate: string, match: string}} [secrets] - Secrets for Rich Presence joining and spectating
 * @property {boolean} [instance] - Whether or not the activity is an instanced game session
 * @property {?number} flags - [Activity Flags]{@link https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-flags} OR d together, describes what the payload includes
 * @property {Array<{label: string, url: string}>} [buttons] - Custom buttons shown in the Rich Presence (max 2)
 */

/**
 * @summary [Activity Type]{@link https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types}
 * @typedef {number} ActivityType
 * | ID | Name | Format | Example |
 * |----|------|--------|---------|
 * | 0  | Game | Playing {name} | "Playing Rocket League" |
 * | 1  | Streaming | Streaming {details} | "Streaming Rocket League" |
 * | 2  | Listening | Listening to {name} | "Listening to Spotify" |
 * | 3  | Watching  | Watching {name}     | "Watching YouTube Together" |
 * | 4  | Custom    | {emoji} {name}      | ":smiley: I am cool" |
 * | 5  | Competing | Competing in {name} | "Competing in Arena World Champions" |
 */
/**
 * @ignore
 * @summary Invite Target Type
 * @typedef {number} InviteTargetType
 * | Name | Value |
 * |------|-------|
 * | Stream  | 1  |
 * | Embedded Application | 2  |
 */

/**
 * @summary [Invite]{@link https://discord.com/developers/docs/resources/invite#invite-metadata-object} Object
 * @example
 * {
 *   code: '0vCdhLbwjZZTWZLD',
 *   guild: {
 *     id: '165176875973476352',
 *     name: 'OnSocket Support',
 *     splash: null,
 *     banner: null,
 *     description: 'No girls allowed',
 *     icon: null,
 *     features: [ 'NEWS', 'DISCOVERABLE' ],
 *     verification_level: 2,
 *     vanity_url_code: null,
 *     nsfw_level: 0,
 *     premium_subscription_count: 5
 *   },
 *   channel: {
 *     id: '115590097100865541',
 *     name: 'support',
 *     type: 0
 *   },
 *   inviter: {
 *     id: '298617055190712322',
 *     username: 'LostMyInfo',
 *     avatar: '161fca985f4f8c45770e249ab38a47cd',
 *     discriminator: '0001',
 *     public_flags: 4194432
 *   },
 *   target_type: 1,
 *   target_user: {
 *     id: '165176875973476352',
 *     username: 'bob',
 *     avatar: null,
 *     discriminator: '1234',
 *     public_flags: 64
 *   }
 * }
 * @typedef {Object} Invite
 * @property {string} code - The invites code
 * @property {PartialInviteGuild} [guild] - The guild the invite originated from
 * @property {PartialChannel} channel - The channel the invite is for
 * @property {User} [inviter] - The user who created the invite
 * @property {InviteTargetType} [target_type] - The [type of target]{@link https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types} for this voice channel invite
 * @property {User} [target_user] - The user whose stream to display for this voice channel stream invite
 * @property {Object} [target_application] - The embedded application to open for this voice channel embedded application
 * @property {number} [approximate_presence_count] - Approximate count of online members, returned from the `GET /invites/<code>` endpoint when `with_counts` is `true`
 * @property {number} [approximate_member_count] - Approximate count of total members, returned from the `GET /invites/<code>` endpoint when `with_counts` is `true`
 * @property {ISO8601Timestamp} [expires_at] - The expiration date of this invite, returned from the `GET /invites/<code>` endpoint when `with_expiration` is `true`
 * @property {GuildScheduledEvent} [guild_scheduled_event] - The guild scheduled event data, returned from the `GET /invites/<code>` endpoint when `guild_scheduled_event_id` is a valid guild scheduled event id
 */

/**
 * @summary [Extended Invite]{@link https://discord.com/developers/docs/resources/invite#invite-metadata-object} Object
 * @typedef {Object} ExtendedInvite
 * @property {string} code - The invites code
 * @property {string} url - The invite link
 * @property {PartialInviteGuild} [guild] - The guild the invite originated from
 * @property {PartialChannel} [channel] - The channel the invite is for
 * @property {User} [inviter] - The user who created the invite
 * @property {InviteTargetType} [target_type] - The [type of target]{@link https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types} for this voice channel invite
 * @property {User} [target_user] - The user whose stream to display for this voice channel stream invite
 * @property {Object} [target_application] - The embedded application to open for this voice channel embedded application
 * @property {number} [approximate_presence_count] - Approximate count of online members, returned from the `GET /invites/<code>` endpoint when `with_counts` is `true`
 * @property {number} [approximate_member_count] - Approximate count of total members, returned from the `GET /invites/<code>` endpoint when `with_counts` is `true`
 * @property {ISO8601Timestamp} [expires_at] - The expiration date of this invite, returned from the `GET /invites/<code>` endpoint when `with_expiration` is `true`
 * @property {GuildScheduledEvent} [guild_scheduled_event] - The guild scheduled event data, returned from the `GET /invites/<code>` endpoint when `guild_scheduled_event_id` is a valid guild scheduled event id
 * @property {number} uses - Number of times this invite has been used
 * @property {number} max_uses - Max number of times this invite can be used
 * @property {number} max_age - Duration (in seconds) after which the invite expires
 * @property {boolean} temporary - Whether this invite only grants temporary membership
 * @property {ISO8601Timestamp} created_at - When this invite was created
 */

/**
 * @summary [User]{@link https://discord.com/developers/docs/resources/user#user-object} Object
 * @typedef {Object} ExtendedUser
 * @property {UserFlags[]} badges
 * @property {Date} created_at
 * @property {Snowflake} id The user's id
 * @property {string} username - The user's username
 * @property {string} discriminator - The user's 4-digit discord-tag
 * @property {string} global_name
 * @property {string} [display_name]
 * @property {?string} avatar - The user's avatar hash
 * @property {?string} [avatarURL] - The user's avatar URL (only when retrieving user with API)
 * @property {?{sku_id: Snowflake, asset: string}} avatar_decoration_data
 * @property {boolean} [bot] - Whether the user belongs to an OAuth2 application
 * @property {boolean} [system] - Whether the user is an Official Discord System user
 * @property {boolean} [mfa_enabled] - Whether the user has two factor enabled
 * @property {?string} [banner] - The user's banner hash
 * @property {?string} [bannerURL] - The user's banner URL (only when retrieving user with API)
 * @property {number | null} [accent_color] - The user's banner color encoded as an integer representation of a hex code
 * @property {string} [locale] - The user's chosen language option
 * @property {boolean} [verified] - Whether the email on this account has been verified
 * @property {string | null} [email] - The user's email
 * @property {number} [flags] - The flags on a user's account
 * @property {NitroPremiumType} [premium_type] - The [type of Nitro subscription]{@link https://discord.com/developers/docs/resources/user#user-object-premium-types} on a user's account
 * @property {number} public_flags - The public flags on a user's account
 */

/**
 * @summary [User]{@link https://discord.com/developers/docs/resources/user#user-object} Object
 * @typedef {Object} User
 * @property {UserFlags[]} badges
 * @property {Date} created_at
 * @property {Snowflake} id The user's id
 * @property {string} username - The user's username
 * @property {string} discriminator - The user's 4-digit discord-tag
 * @property {string} global_name
 * @property {string} [display_name]
 * @property {?string} avatar - The user's avatar hash
 * @property {?string} [avatarURL] - The user's avatar URL (only when retrieving user with API)
 * @property {?{sku_id: Snowflake, asset: string}} avatar_decoration_data
 * @property {boolean} [bot] - Whether the user belongs to an OAuth2 application
 * @property {boolean} [system] - Whether the user is an Official Discord System user
 * @property {number} public_flags - The public flags on a user's account
 * @property {NitroPremiumType} [premium_type] - The [type of Nitro subscription]{@link https://discord.com/developers/docs/resources/user#user-object-premium-types} on a user's account
 */

/**
 * @summary [Premium Type]{@link https://discord.com/developers/docs/resources/user#user-object-premium-types}
 * @typedef {number} NitroPremiumType
 * | Type | Value |
 * |------|-------|
 * | None          | 0 |
 * | Nitro Classic | 1 |
 * | Nitro         | 2 |
 * | Nitro Basic   | 3 |
 */
/**
 * @summary [Emoji]{@link https://discord.com/developers/docs/resources/emoji#emoji-object} Object
 * @typedef {Object} Emoji
 * @property {?string} id - ID of the emoji
 * @property {?string} name - Name of the avatar. Can be `null` only in reaction emoji objects.
 * @property {Snowflake[]} [roles] - Role allowed to use this emoji. Array of [role object]{@link https://discord.com/developers/docs/topics/permissions#role-object} ids
 * @property {User} [user] - {@link User} that created this emoji.
 * @property {boolean} [require_colons] - Whether this emoji must be wrapped in colons.
 * @property {boolean} [animated] - Whether this emoji is animated.
 * @property {boolean} [managed] - Whether this emoji is managed.
 * @property {boolean} [available] - Whether this emoji can be used, may be false due to loss of Server Boosts.
 */

/**
 * @summary [Guild]{@link https://discord.com/developers/docs/resources/guild#guild-object} Object
 * @typedef {Object} Guild 
 * @property {string} name - Guild name (2-100 characters, excluding trailing and leading whitespace)
 * @property {Snowflake} id - Guild ID
 * @property {boolean} [owner] - True if [the user]{@link https://discord.com/developers/docs/resources/user#get-current-user-guilds} is the owner of the guild
 * @property {Snowflake} owner_id - ID of guild owner
 * @property {string} [description] - Description of the guild
 * @property {?string} icon - [Icon hash]{@link https://discord.com/developers/docs/reference#image-formatting}
 * @property {?string} [icon_hash] - [Icon hash]{@link https://discord.com/developers/docs/reference#image-formatting}, returned when in the template object
 * @property {?string} splash - Splash hash
 * @property {?string} discovery_splash - Discovery splash hash; only present for guilds with the `DISCOVERABLE` feature
 * @property {?string} banner - Banner hash
 * @property {string} [permissions] - Total permissions for [the user]{@link https://discord.com/developers/docs/resources/user#get-current-user-guilds} in the guild (excludes overwrites)
 * @property {?Snowflake} afk_channel_id - ID of the afk channel
 * @property {number} afk_timeout - afk timeout in seconds, can be set to: 60, 300, 900, 1800, 3600
 * @property {boolean} [widget_enabled] - True if the server widget is enabled
 * @property {?Snowflake} [widget_channel_id] - The channel id that the widget will generate an invite to, or `null` if set to no invite
 * @property {GuildVerificationLevel} verification_level - [Verification level]{@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level} required for the guild
 * @property {DefaultMessageNotificationLevel} default_message_notifications - [Default Message Notifications] {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
 * @property {ExplicitContentFilterLevel} explicit_content_filter - [Explicit content filter level]{@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
 * @property {Role[]} roles - Role in the guild
 * @property {Emoji[]} emojis - Custom guild emojis
 * @property {GuildFeatures[]} features - Enabled guild features
 * @property {GuildMFALevel} mfa_level - Required [MFA level]{@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level} for the guild
 * @property {?Snowflake} application_id - Application id of the guild creator if it is bot-created
 * @property {?Snowflake} system_channel_id - The id of the channel where guild notices such as welcome messages and boost events are posted
 * @property {number} system_channel_flags - [System channel flags]{@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags}
 * @property {?Snowflake} rules_channel_id - The id of the channel where Community guilds can display rules and/or guidelines
 * @property {?number} [max_presences] - The maximum number of presences for the guild (null is always returned, apart from the largest of guilds)
 * @property {number} [max_members] - The maximum number of members for the guild
 * @property {?string} vanity_url_code - The vanity url code for the guild
 * @property {number} premium_tier - [Premium tier]{@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier} (Server Boost level)
 * @property {number} [premium_subscription_count] - The number of boosts this guild currently has
 * @property {string} preferred_locale - The preferred [locale]{@link https://discord.com/developers/docs/reference#locales} of a Community guild; used in server discovery and notices from Discord, and sent in interactions; defaults to "en-US"
 * @property {?Snowflake} public_updates_channel_id - The id of the channel where admins and moderators of Community guilds receive notices from Discord
 * @property {number} [max_video_channel_users] - The maximum amount of users in a video channel
 * @property {number} [max_stage_video_channel_users]
 * @property {number} [approximate_member_count] - Approximate number of members in this guild, returned from the `GET /guilds/<id>` endpoint when `with_counts` is `true`
 * @property {number} [approximate_presence_count] - Approximate number of non-offline members in this guild, returned from the `GET /guilds/<id>` endpoint when `with_counts` is `true`
 * @property {GuildWelcomeScreen} [welcome_screen] - The welcome screen of a Community guild, shown to new members, returned in an [Invite]{@link https://discord.com/developers/docs/resources/invite#invite-object}'s guild object
 * @property {GuildNSFWLevel} nsfw_level - [Guild's nsfw level]{@link https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level}
 * @property {Sticker[]} [stickers] - Custom guild stickers
 * @property {boolean} premium_progress_bar_enabled - Whether the guild has the boost progress bar enabled
 * @property {number} [emojiCount]
 * @property {number} [stickerCount]
 * @property {number} channelCount
 * @property {number} roleCount
 * @property {string} [icon_url]
 * @property {string} [banner_url]
 * @property {string} [splash_url]
 * @property {string} [discovery_splash_url]
 * @property {?*} inventory_settings
 */

/**
 * @summary [Voice State]{@link https://discord.com/developers/docs/resources/voice#voice-state-object} Object
 * @description Used to represent a user's voice connection status
 * @typedef {Object} VoiceState
 * @property {Snowflake} [guild_id] - The guild ID this voice state is for
 * @property {Snowflake} channel_id - The channel ID this user is connected to
 * @property {Snowflake} user_id - The user ID this voice state is for
 * @property {Member} [member] - The guild member this voice state is for
 * @property {string} session_id - The session ID for this voice state
 * @property {boolean} deaf Whether this user is deafened by the server
 * @property {boolean} mute Whether this user is muted by the server
 * @property {boolean} self_deaf Whether this user is locally deafened
 * @property {boolean} self_mute Whether this user is locally muted
 * @property {boolean} [self_stream] Whether this user is streaming using "Go Live"
 * @property {boolean} self_video Whether this user's camera is enabled
 * @property {boolean} suppress - Whether this user's permission to speak is denied
 * @property {ISO8601Timestamp} request_to_speak_timestamp - The time at which the user requested to speak
 */

/**
 * @summary [Channel]{@link https://discord.com/developers/docs/resources/channel#channel-object}
 * @typedef {Object} Channel
 * @property {Snowflake} id - The ID of this channel
 * @property {ChannelType} type - The [type of channel]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
 * @property {string} typeName
 * @property {Snowflake} [guild_id] - The id of the guild (may be missing for some channel objects received over gateway guild dispatches)
 * @property {number} [position] - Sorting position of the channel
 * @property {Overwrite[]} [permission_overwrites] - Explicit permission overwrites for members and roles
 * @property {string} [name] - The name of the channel (1-100 characters)
 * @property {?string} [topic] - The channel topic (0-4096 characters for GUILD_FORUM channels, 0-1024 characters for all others)
 * @property {boolean} [nsfw] - Whether the channel is nsfw
 * @property {?Snowflake} [last_message_id] - The id of the last message sent in this channel (or thread for GUILD_FORUM channels) (may not point to an existing or valid message or thread)
 * @property {number} [bitrate] - The bitrate (in bits) of the voice channel
 * @property {number} [user_limit] - The user limit of the voice channel
 * @property {number} [rate_limit_per_user] - Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected
 * @property {User[]} [recipients] - The recipients of the DM
 * @property {?string} [icon] - Icon hash of the group DM
 * @property {Snowflake} [owner_id] - ID of the creator of the group DM or thread
 * @property {Snowflake} [application_id] - Application id of the group DM creator if it is bot-created
 * @property {boolean} [managed] - For group DM channels: whether the channel is managed by an application via the `gdm.join` OAuth2 scope
 * @property {?Snowflake} [parent_id] - For guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
 * @property {?string} [last_pin_timestamp] - When the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
 * @property {?string} [rtc_region] - [Voice region]{@link https://discord.com/developers/docs/resources/voice#voice-region-object} id for the voice channel, automatic when set to null
 * @property {number} [voice_quality_mode] - The camera [video quality mode]{@link https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes} of the voice channel, 1 when not present
 * @property {number} [message_count] - Number of messages (not including the initial message or deleted messages) in a thread
 * @property {number} [member_count] - An approximate count of users in a thread, stops counting at 50
 * @property {ThreadMetadata} [thread_metadata] - Thread-specific fields not needed by other channels
 * @property {ThreadMember} [member] - Thread member object for the current user, if they have joined the thread, only included on certain API endpoints
 * @property {number} [default_auto_archive_duration] - Default duration, copied onto newly created threads, in minutes, threads will stop showing in the channel list after the specified period of inactivity, can be set to: 60, 1440, 4320, 10080
 * @property {string} [permissions] - Computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a slash command interaction
 * @property {?ChannelFlags} flags - [Channel flags]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-flags} combined as a [bitfield]{@link https://en.wikipedia.org/wiki/Bit_field}
 * @property {number} [total_message_sent] - Number of messages ever sent in a thread, it's similar to `message_count` on message creation, but will not decrement the number when a message is deleted
 * @property {ForumTag[]} [available_tags] - The set of tags that can be used in a `GUILD_FORUM` channel
 * @property {Snowflake[]} [applied_tags] - The IDs of the set of tags that have been applied to a thread in a `GUILD_FORUM` channel
 * @property {DefaultReaction} [default_reaction_emoji] - The emoji to show in the add reaction button on a thread in a `GUILD_FORUM` channel
 * @property {number} [default_thread_rate_limit_per_user] - The initial `rate_limit_per_user` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update.
 * @property {?SortOrderType} [default_sort_order] - The [Default Sort Order Type]{@link https://discord.com/developers/docs/resources/channel#channel-object-sort-order-types} used to order posts in `GUILD_FORUM` channels. Defaults to `null`, which indicates a preferred sort order hasn't been set by a channel admin
 * @property {ForumLayoutType} [default_forum_layout] - The [Default Forum Layout]{@link https://discord.com/developers/docs/resources/channel#channel-object-forum-layout-types} view used to display posts in `GUILD_FORUM` channels. Defaults to `0`, which indicates a layout view has not been set by a channel admin
 */

/**
 * @summary DM Channel
 * @typedef {Object} DMChannel
 * @property {Snowflake} id
 * @property {Snowflake} last_message_id - The id of the last message sent in this channel
 * @property {ChannelType} type - The [type of channel]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
 * @property {ChannelFlags} flags - [Channel flags]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-flags} combined as a [bitfield]{@link https://en.wikipedia.org/wiki/Bit_field}
 * @property {User[]} recipients
 */

/**
 * @summary [Message]{@link https://discord.com/developers/docs/resources/channel#message-object}
 * @typedef {Object} Message
 * @property {Snowflake} id - id of the message
 * @property {Snowflake} channel_id - id of the channel the message was sent in
 * @property {User} author - The author of this message
 * @property {string} [content] - Contents of the message
 * @property {ISO8601Timestamp} timestamp - When this message was sent
 * @property {?ISO8601Timestamp} edited_timestamp - When this message was edited (or null if never edited)
 * @property {boolean} tts - Whether this was a TTS message
 * @property {boolean} mention_everyone - Whether this message mentions everyone
 * @property {User[]} mentions - Users specifically mentioned in the message
 * @property {string[]} mention_roles - Roles specifically mentioned in this message
 * @property {ChannelMention[]} [mention_channels] - Channels specifically mentioned in this messag
 * @property {Attachment[]} attachments - Any attached files
 * @property {Embed[]} embeds - Any embedded content
 * @property {Reaction[]} [reactions] - Reactions to the message
 * @property {number|string} [nonce] - Used for validating a message was sent
 * @property {boolean} pinned - Whether this message is pinned
 * @property {Snowflake} [webhook_id] - If the message is generated by a webhook, this is the webhook's id
 * @property {MessageType} type - [Type of message]{@link https://discord.com/developers/docs/resources/channel#message-object-message-types}
 * @property {string} typeName
 * @property {MessageActivity} [activity] - [Message Activity]{@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure} object.
 * @property {Application} [application] - [Partial Application]{@link https://discord.com/developers/docs/resources/application#application-object} object.
 * @property {Snowflake} [application_id] - If the message is an [Interaction]{@link https://discord.com/developers/docs/interactions/receiving-and-responding} or application-owned webhook, this is the id of the application
 * @property {MessageReference} [message_reference] - [Message reference]{@link https://discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure} object. Data showing the source of a crosspost, channel follow add, pin, or reply message. 
 * @property {?MessageFlags} flags - [Message flags]{@link https://discord.com/developers/docs/resources/channel#message-object-message-flags} combined as a [bitfield]{@link https://en.wikipedia.org/wiki/Bit_field}
 * @property {Message} [referenced_message] - The message associated with the message_reference
 * @property {MessageInteraction} [interaction] - Sent if the message is a response to an [Interaction]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object}
 * @property {Channel} [thread] - Thread that was started from this message, includes [Thread Member]{@link https://discord.com/developers/docs/resources/channel#thread-member-object} object
 * @property {Component} components - Sent if the message contains components like buttons, action rows, or other interactive components
 * @property {StickerItem[]} [sticker_items] - Sent if the message contains stickers
 * @property {number} [position]
 * @property {RoleSubscriptionData} [role_subscription_data] - Data of the role subscription purchase or renewal that prompted this `ROLE_SUBSCRIPTION_PURCHASE` message
 */

/**
 * @summary [Forum Thread Message Params Object]{@link https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel-forum-thread-message-params-object}
 * @typedef {Object} ForumThreadMessageParams
 * @property {string} [content] - Message contents (up to 2000 characters)
 * @property {Embed[]} [embeds] - Up to 10 `rich` embeds (up to 6000 characters)
 * @property {Component} [components]
 * @property {Attachment[]} [attachments] - Attachment objects with `filename` and `description`
 * @property {AllowedMentions} [allowed_mentions]
 * @property {Snowflake[]} [sticker_ids] - IDs of up to 3 [stickers]{@link https://discord.com/developers/docs/resources/sticker#sticker-object} in the server to send in the message
 * @property {?MessageFlags} flags - [Message flags]{@link https://discord.com/developers/docs/resources/channel#message-object-message-flags} combined as a [bitfield]{@link https://en.wikipedia.org/wiki/Bit_field} (only `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATIONS` can be set)
 */

/**
 * @summary [Sort Order Types]{@link https://discord.com/developers/docs/resources/channel#channel-object-sort-order-types}
 * @typedef {number} SortOrderType
 * | Flag | Value | Description |
 * |------|-------|-------------|
 * | Latest Activity | 0 | Sort forum posts by activity
 * | Creation Date   | 1 | Sort forum posts by creation time (from most recent to oldest)
 */

/**
 * @typedef {Object} PartialEmoji
 * @property {?Snowflake} id
 * @property {string} name
 * @property {boolean} [animated=false]
 */

/**
 * @summary [Forum Layout Types]{@link https://discord.com/developers/docs/resources/channel#channel-object-forum-layout-types}
 * @typedef {number} ForumLayoutType
 * | Flag | Value | Description |
 * |------|-------|-------------|
 * | Not Set      | 0 | No default has been set for forum channel
 * | List View    | 1 | Display posts as a list
 * | Gallery View | 2 | Display posts as a collection of tiles
 */

/**
 * @summary [Sticker Item]{@link https://discord.com/developers/docs/resources/sticker#sticker-item-object}
 * @typedef {Object} StickerItem
 * @property {Snowflake} id - id of the sticker
 * @property {string} name - Name of the sticker
 * @property {StickerFormatType} format_type - [Type of sticker format]{@link https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types}
 */

/**
 * @summary [Followed Channel]{@link https://discord.com/developers/docs/resources/channel#followed-channel-object}
 * @typedef {Object} FollowedChannel
 * @property {Snowflake} channel_id
 * @property {Snowflake} webhook_id
 */

/**
 * @summary [Application]{@link https://discord.com/developers/docs/resources/application#application-object}
 * @typedef {Object} Application
 * @property {Snowflake} id - The id of the app
 * @property {string} name - The name of the app
 * @property {?string} icon - The icon hash of the app
 * @property {string} description - The description of the app
 * @property {string[]} [rpc_origins] - An array of rpc origin urls, if rpc is enabled
 * @property {boolean} bot_public - When false, only app owner can join the app's bot to guilds
 * @property {boolean} bot_require_code_grant - When true, the app's bot will only join upon completion of the full OAuth2 code grant flow
 * @property {string} [terms_of_service_url] - The url of the app's terms of service
 * @property {string} [privacy_policy_url] - The url of the app's privacy policy
 * @property {User} [owner] - Partial User object containing info on the owner of the application
 * @property {string} verify_key - The hex encoded key for verification in interactions and the GameSDK's [GetTicket]{@link https://discord.com/developers/docs/game-sdk/applications#getticket}
 * @property {?Team} team - If the application belongs to a team, this will be a list of members of that team
 * @property {Snowflake} [guild_id] - If this application is a game sold on Discord, this field will be the guild to which it has been linked
 * @property {Snowflake} [primary_sku_id] - If this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists
 * @property {string} [slug] - If this application is a game sold on Discord, this field will be the URL slug that links to the store page
 * @property {string} [cover_image] - The application's default rich presence invite [cover image hash]{@link https://discord.com/developers/docs/reference#image-formatting}
 * @property {?number} flags - The application's public [flags]{@link https://discord.com/developers/docs/resources/application#application-object-application-flags}
 * @property {string[]} [tags] - Up to 5 tags describing the content and functionality of the application
 * @property {InstallParams} [install_params] - Settings for the application's default in-app authorization link, if enabled
 * @property {string} [custom_install_url] - The application's default custom authorization link, if enabled
 * @property {string} [role_connections_verification_url] - The application's role connection verification entry point, which when configured will render the app as a verification method in the guild role verification configuration
 */

/**
 * @summary [Team Membership State]{@link https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum}
 * @typedef {number} MembershipState
 * | Name | Value |
 * |------|-------|
 * | Invited | 1 |
 * | Accepted | 2 |
 */

/**
 * @summary [Team Member]{@link https://discord.com/developers/docs/topics/teams#data-models-team-member-object}
 * @typedef {Object} TeamMember
 * @property {User} user - The avatar, discriminator, id, and username of the user
 * @property {MembershipState} membership_state - The user's [membership state]{@link https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum} on the team
 * @property {string[]} permissions - Will always be ["*"]
 * @property {Snowflake} team_id - The id of the parent team of which they are a member
 */

/**
 * @summary [Team]{@link https://discord.com/developers/docs/topics/teams#data-models-team-object}
 * @typedef {Object} Team
 * @property {?string} icon
 * @property {Snowflake} id
 * @property {TeamMember[]} members
 * @property {string} name
 * @property {Snowflake} owner_user_id
 */

/**
 * @summary [Install Params]{@link https://discord.com/developers/docs/resources/application#install-params-object}
 * @typedef {Object} InstallParams
 * @property {string[]} scopes - The [scopes]{@link https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes} to add the application to the server with
 * @property {string} permissions - The [permissions]{@link https://discord.com/developers/docs/topics/permissions} to request for the bot role
 */

/**
 * @summary [Message Activity]{@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure}
 * @typedef {Object} MessageActivity
 * @property {MessageActivityType} type - [Type of Message Activity]{@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-types}
 * @property {string} [party_id] - party_id from a Rich Presence event
 */

/**
 * @summary [Message Activity Types]{@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-types}
 * @typedef {number} MessageActivityType
 * | Type | Value |
 * | Join | 1 |
 * | Spectate | 2 |
 * | Listen | 3 |
 * | Join Request | 5 |
 */

/**
 * @summary [Channel Mention]{@link https://discord.com/developers/docs/resources/channel#channel-mention-object}
 * @typedef {Object} ChannelMention
 * @property {Snowflake} id - id of the channel
 * @property {Snowflake} guild_id - id of the guild containing the channel
 * @property {ChannelType} type - The [type]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types} of channel
 * @property {string} name - The name of the channel
 */

/**
 * @summary [Reaction]{@link https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure}
 * @typedef {Object} Reaction
 * @property {number} count - Times this emoji has been used to react
 * @property {boolean} me - Whether the current user reacted using this emoji
 * @property {PartialEmoji} emoji - Emoji Information
 */

/**
 * @summary [Thread Member]{@link https://discord.com/developers/docs/resources/channel#thread-member-object} Object
 * @description
 * The `member` field is only present when `with_member` is set to `true` when calling [List Thread Members]{@link https://discord.com/developers/docs/resources/channel#list-thread-members} or [Get Thread Member]{@link https://discord.com/developers/docs/resources/channel#get-thread-member}
 * @typedef {Object} ThreadMember
 * @property {Snowflake} [id] - ID of the thread
 * @property {Snowflake} [user_id] - ID of the user
 * @property {ISO8601Timestamp} join_timestamp - Time the user last joined the thread
 * @property {number} flags - Any user-thread settings, currently only used for notifications
 * @property {Member} [member] - Additional information about the user
 */

/**
 * @summary [Stage Instance]{@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object} Object
 * @typedef {Object} StageInstance
 * @property {Snowflake} id
 * @property {Snowflake} guild_id
 * @property {Snowflake} channel_id - The id of the associated Stage channel
 * @property {string} topic - The topic of the Stage instance (1-120 characters)
 * @property {StagePrivacyLevel} privacy_level - The [privacy level]{@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level} of the Stage instance
 * @property {?Snowflake} guild_scheduled_event_id - The id of the scheduled event for this Stage instance
 */

/**
 * @summary [Guild Scheduled Event]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object} Object
 * @typedef {Object} GuildScheduledEvent
 * @property {Snowflake} id - The ID of the scheduled event
 * @property {Snowflake} guild_id - The guild id which the scheduled event belongs to
 * @property {?Snowflake} channel_id - The channel id in which the scheduled event will be hosted, or null if [scheduled entity type]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types} is `EXTERNAL`
 * @property {?Snowflake} [creator_id] - The id of the user that created the scheduled event
 * @property {string} name - The name of the scheduled event (1-100 characters)
 * @property {?string} [description] - The description of the scheduled event (1-1000 characters)
 * @property {ISO8601Timestamp} scheduled_start_time - The time the scheduled event will start
 * @property {?ISO8601Timestamp} scheduled_end_time - The time the scheduled event will end, required if entity_type is `EXTERNAL`
 * @property {EventPrivacyLevel} privacy_level - The [privacy level]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level} of the scheduled event
 * @property {EventStatus} status - The [status]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status} of the scheduled event
 * @property {EventEntityType} entity_type - The [type]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types} of scheduled event
 * @property {?Snowflake} entity_id - The id of an entity associated with a guild scheduled event
 * @property {EventEntityMetadata} entity_metadata - Additional metadata for the guild scheduled event
 * @property {EventUser} [creator] - The user that created the scheduled event
 * @property {number} [user_count] - The number of users subscribed to the scheduled event
 * @property {?string} [image] - The [cover image hash]{@link https://discord.com/developers/docs/reference#image-formatting} of the scheduled event
 */

/**
 * @summary [Connection]{@link https://discord.com/developers/docs/resources/user#connection-object} object
 * @typedef {Object} Connection
 * @property {string} id - ID of the conncetion account
 * @property {string} name - The username of the connection account
 * @property {string} type - The [service]{@link https://discord.com/developers/docs/resources/user#connection-object-services} of this connection
 * @property {boolean} [revoked] - Whether the connection is revoked
 * @property {Partial<Array<GuildIntegration>>} [integrations] - An array of partial server integrations
 * @property {boolean} verified - Whether the connection is verified
 * @property {boolean} friend_sync - Whether friend sync is enabled for this connection
 * @property {boolean} show_activity - Whether activities related to this connection will be shown in presence updates
 * @property {boolean} two_way_link - Whether this connection has a corresponding third party OAuth2 token
 * @property {number} visibility - [visibility]{@link https://discord.com/developers/docs/resources/user#connection-object-visibility-types} of this connection
 */

/**
 * @summary Application Role Connection Metadata Type
 * @typedef {number} ApplicationRoleConnectionMetadataType
 * | Type | Value | Description |
 * |------|-------|-------------|
 * INTEGER_LESS_THAN_OR_EQUAL | 1 | The metadata value (`integer`) is less than or equal to the guild's configured value (`integer`) |
 * INTEGER_GREATER_THAN_OR_EQUAL | 2 | The metadata value (`integer`) is greater than or equal to the guild's configured value (`integer`) |
 * INTEGER_EQUAL | 3 | The metadata value (`integer`) is equal to the guild's configured value (`integer`) |
 * INTEGER_NOT_EQUAL | 4 | The metadata value (`integer`) is not equal to the guild's configured value (`integer`) |
 * DATETIME_LESS_THAN_OR_EQUAL | 5 | The metadata value (ISO8601 string) is less than or equal to the guild's configured value (`integer`; days before current date) |
 * DATETIME_GREATER_THAN_OR_EQUAL | 6 | The metadata value (ISO8601 string) is greater than or equal to the guild's configured value (`integer`; days before current date) |
 * BOOLEAN_EQUAL | 7 | The metadata value (`integer`) is equal to the guild's configured value (`integer`; 1) |
 * BOOLEAN_NOT_EQUAL | 8 | The metadata value (`integer`) is not equal to the guild's configured value (``integer``; 1) |
 */

/**
 * @summary [Application Role Connection Metadata]{@link https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object}
 * @typedef {Object} ApplicationRoleConnectionMetadata
 * @property {ApplicationRoleConnectionMetadataType} type - [Type of metadata] value
 * @property {string} key - Dictionary key for the metadata field (must be `a-z`, `0-9`, or `_` characters; 1-50 characters)
 * @property {string} name - Name of the metadata field (1-100 characters)
 * @property {LocalizationMap} [name_localizations] - Translations of the name
 * @property {string} description - Description of the metadata field (1-200 characters)
 * @property {LocalizationMap} [description_localizations] - Translations of the description
 */

/**
 * @summary [Application Role Connection]{@link https://discord.com/developers/docs/resources/user#application-role-connection-object}
 * @typedef {Object} ApplicationRoleConnection
 * @property {?string} platform_name - The vanity name of the platform a bot has connected (max 50 characters)
 * @property {?string} platform_username - The username on the platform a bot has connected (max 100 characters)
 * @property {ApplicationRoleConnectionMetadata} metadata - Object mapping [application role connection metadata]{@link ApplicationRoleConnectionMetadata} keys to their string-ified value (max 100 characters) for the user on the platform a bot has connected
 */

/**
 * @summary [Application Command Permission Type]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type}
 * @typedef {number} ApplicationCommandPermissionType
 * | Name | Value |
 * |------|-------|
 * | Role    | 1 |
 * | User    | 2 |
 * | Channel | 3 |
 */

/**
 * @summary [Guild Application Command Permissions]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object}
 * @typedef {Object} GuildApplicationCommandPermissions
 * @property {Snowflake} id - ID of the command or the application ID
 * @property {Snowflake} application_id - ID of the application the command belongs to
 * @property {Snowflake} guild_id - ID of the guild
 * @property {ApplicationCommandPermissions[]} permissions - Permissions for the command in the guild, max of 100
 */

/**
 * @summary [Application Command Permissions]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-structure}
 * @typedef {Object} ApplicationCommandPermissions
 * @property {Snowflake} id - ID of the command or the application ID
 * @property {ApplicationCommandPermissionType} type - [Application command permission type]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type}
 * @property {boolean} permission - `true` to allow, `false` to disallow
 */


/**
 * @summary [Auto Moderation Event Type]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types}
 * @typedef {number} AutoModEventType
 * | Event Type | Value | Description |
 * |------------|-------|-------------|
 * | Message Send | 1 | When a member sends or edits a message in the guild |
 */

/**
 * @summary [Auto Moderation Trigger Types]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types}
 * @typedef {number} AutoModTriggerType
 * | Trigger Type | Value | Description |
 * |--------------|-------|-------------|
 * | Keyword        | 1 | Check if content contains words from a user defined list of keywords |
 * | Spam           | 3 | Check if content represents generic spam |
 * | Keyword Preset | 4 | Check if content contains words from internal pre-defined wordsets |
 * | Mention Spam   | 5 | Check if content contains more unique mentions than allowed |
 */

/**
 * @summary [Auto Moderation Keyword Preset Types]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-preset-types}
 * @typedef {number} AutoModKeywordPresetTypes
 * | Preset Type | Value | Description |
 * |--------------|-------|-------------|
 * | Profanity      | 1 | Words that may be considered forms of swearing or cursing |
 * | Sexual Content | 2 | Words that refer to sexually explicit behavior or activity |
 * | Slurs          | 3 | Personal insults or words that may be considered hate speech |
 */

/**
 * @summary Auto Moderation Trigger Metadata
 * @description [Additional data]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata} used to determine whether a rule should be triggered.
 * Different fields are relevant based on the value of trigger_type.
 * @typedef {Object} AutoModTriggerMetadata
 * @property {string[]} keyword_filter - Substrings which will be searched for in content (Maximum of 1000)
 * @property {string[]} regex_patterns - Regular expression patterns which will be matched against content (Maximum of 10)
 * @property {AutoModKeywordPresetTypes[]} presets - The internally pre-defined wordsets which will be searched for in content
 * @property {string[]} allow_list - Substrings which should not trigger the rule (Maximum of 100 or 1000)
 * @property {number} mention_total_limit - Total number of unique role and user mentions allowed per message (Maximum of 50)
 */

/**
 * @summary [Auto Moderation Action Types]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types}
 * @typedef {number} AutoModActionType
 * | Action Type | Value | Description |
 * |--------------|-------|-------------|
 * | Block Message      | 1 | Blocks a members message and prevents it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked |
 * | Send Alert Message | 2 | Logs user content to a specified channel |
 * | Timeout            | 3 | Timeout user for a specified duration |
 */

/**
 * @summary Auto Moderation Action Metadata
 * @description [Additional data]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-metadata} used when an action is executed. Different fields are relevant based on the value of action type.
 * | Field | Associated Action Types | Constraints |
 * |--------------|-------|-------------|
 * | channel_id       | Send Alert Message | Existing channel |
 * | duration_seconds | Timeout | Maximum of 2419200 seconds (4 weeks) |
 * | custom_message   | Block Message | Maximum of 150 characters |
 * @typedef {Object} AutoModActionMetadata
 * @property {Snowflake} channel_id - Channel to which user content should be logged
 * @property {number} duration_seconds - Timeout duration in seconds
 * @property {string} [custom_message] - Additional explanation that will be shown to members whenever their message is blocked
 */

/**
 * @summary [Auto Moderation Action]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object}
 * @description
 * An action which will execute whenever a rule is triggered
 * @typedef {Object} AutoModAction
 * @property {AutoModActionType} type
 * @property {AutoModActionMetadata} [metadata] - Additional metadata needed during execution for this specific action type
 */

/** 
 * @summary [Auto Moderation Rule]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object}
 * @example {@lang json}
 * {
 *   "id": "969707018069872670",
 *   "guild_id": "613425648685547541",
 *   "name": "Keyword Filter 1",
 *   "creator_id": "423457898095789043",
 *   "trigger_type": 1,
 *   "event_type": 1,
 *   "actions": [
 *     {
 *       "type": 1,
 *       "metadata": { "custom_message": "Please keep financial discussions limited to the #finance channel" }
 *     },
 *     {
 *       "type": 2,
 *       "metadata": { "channel_id": "123456789123456789" }
 *     },
 *     {
 *       "type": 3,
 *       "metadata": { "duration_seconds": 60 }
 *     }
 *   ],
 *   "trigger_metadata": {
 *     "keyword_filter": ["cat*", "*dog", "*ana*", "i like c++"],
 *     "regex_patterns": ["(b|c)at", "^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$"]
 *    },
 *   "enabled": true,
 *   "exempt_roles": ["323456789123456789", "423456789123456789"],
 *   "exempt_channels": ["523456789123456789"]
 * }
 * @typedef {Object} AutoModRule
 * @property {Snowflake} id
 * @property {Snowflake} guild_id
 * @property {string} name - The rule name
 * @property {Snowflake} creator_id - The user which first created this rule
 * @property {AutoModEventType} event_type - The rule [event type]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types}
 * @property {AutoModTriggerType} trigger_type - The rule [trigger type]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types}
 * @property {AutoModTriggerMetadata} trigger_metadata - The rule [trigger metadata]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata}
 * @property {AutoModAction[]} actions - The actions which will execute when the rule is triggered
 * @property {boolean} enabled - Whether the rule is enabled
 * @property {Snowflake[]} exempt_roles - The role ids that should not be affected by the rule (Maximum of 20)
 * @property {Snowflake[]} exempt_channels - The channel ids that should not be affected by the rule (Maximum of 50)
 */

/**
 * @summary [Audit Log Change]{@link https://discord.com/developers/docs/resources/audit-log#audit-log-change-object} Object
 * @description
 * Many audit log events include a changes array in their entry object. The structure for the individual changes varies based on the event type and its changed objects, so apps shouldn't depend on a single pattern of handling audit log events.
 *
 * If `new_value` is not present in the change object while `old_value` is, it indicates that the property has been reset or set to `null`.
 * If `old_value` isn't included, it indicated that the property was previously `null`
 * @typedef {Object} AuditLogChange
 * @property {*} [new_value] - New value of the key
 * @property {*} [old_value] - Old value of the key
 * @property {string} key - Name of the changed entity, with a few exceptions
 */

/**
 * @summary [Optional Audit Entry Info]{@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info}
 * @typedef {Object} OptionalAuditEntryInfo
 * @property {Snowflake} [application_id] - ID of the app whose permissions were targeted // APPLICATION_COMMAND_PERMISSION_UPDATE
 * @property {string} [auto_moderation_rule_name] - Name of the Auto Moderation rule that was triggered // AUTO_MODERATION_BLOCK_MESSAGE & AUTO_MODERATION_FLAG_TO_CHANNEL & AUTO_MODERATION_USER_COMMUNICATION_DISABLED
 * @property {string} [auto_moderation_rule_trigger_type] - Trigger type of the Auto Moderation rule that was triggered // AUTO_MODERATION_BLOCK_MESSAGE & AUTO_MODERATION_FLAG_TO_CHANNEL & AUTO_MODERATION_USER_COMMUNICATION_DISABLED
 * @property {Snowflake} [channel_id] - Channel in which the entities were targeted // MEMBER_MOVE & MESSAGE_PIN & MESSAGE_UNPIN & MESSAGE_DELETE & STAGE_INSTANCE_CREATE & STAGE_INSTANCE_UPDATE & STAGE_INSTANCE_DELETE & AUTO_MODERATION_BLOCK_MESSAGE & AUTO_MODERATION_FLAG_TO_CHANNEL & AUTO_MODERATION_USER_COMMUNICATION_DISABLED
 * @property {string} [count] - Number of entities that were targeted // MESSAGE_DELETE & MESSAGE_BULK_DELETE & MEMBER_DISCONNECT & MEMBER_MOVE
 * @property {number} [delete_member_days] - Number of days after which inactive members were kicked // MEMBER_PRUNE
 * @property {Snowflake} [id] - ID of the overwritten entity // CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE
 * @property {string} [members_removed] - Number of members removed by the prune // MEMBER_PRUNE
 * @property {Snowflake} [message_id] - ID of the message that was targeted // MESSAGE_PIN & MESSAGE_UNPIN
 * @property {string} [role_name] - Name of the role if type is "0" (not present if type is "1") // CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE
 * @property {string} [type] - Type of overwritten entity - role ("0") or member ("1") // CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE
 */

/**
 * @summary [Audit Log Entry]{@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object}
 * @description
 * Each audit log entry represents a single administrative action (or event), indicated by action_type.
 * Most entries contain one to many changes in the changes array that affected an entity in Discord—whether that'sa user, channel, guild, emoji, or something else.
 * @typedef {Object} AuditLogEntry
 * @property {string} action_name
 * @property {Snowflake} [target_id] - ID of the affected entity (webhook, user, role, etc.)
 * @property {AuditLogChange[]} [changes] - Changes made to the target_id
 * @property {Snowflake} user_id - User or app that made the changes
 * @property {Snowflake} id - ID of the entry
 * @property {AuditLogEventType} action_type - [Type of action]{@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events} that occured
 * @property {OptionalAuditEntryInfo} [options] - Additional info for certain event types
 * @property {string} [reason] - Reason for the change (1-512 characters)
 */

/**
 * @summary [Audit Log]{@link https://discord.com/developers/docs/resources/audit-log#audit-log-bject}
 * @description
 * When an administrative action is performed in a guild, an entry is added to its audit log.
 * @typedef {Object} AuditLog
 * @property {ApplicationCommand[]} application_commands - List of application commands referenced in the audit log
 * @property {AuditLogEntry[]} audit_log_entries - List of audit log entries, sorted from most to least recent
 * @property {AutoModRule[]} auto_moderation_rules - List of auto moderation rules referenced in the audit log
 * @property {GuildScheduledEvent[]} guild_scheduled_events - List of guild scheduled events referenced in the audit log
 * @property {Partial<Array<GuildIntegration>>} integrations - List of partial integration objects
 * @property {Channel[]} threads - List of threads referenced in the audit log*
 * @property {User[]} users - List of users referenced in the audit log
 * @property {Webhook[]} webhooks - List of webhooks referenced in the audit log
 */

/**
 * @summary [Audit Log Events]{@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events}
 * @typedef {number} AuditLogEventType
 * | Event | Value | Description |
 * |-------|-------|-------------|
 * | Guild Update | 1 | Server settings were updated |
 * | Channel Create | 10 | Channel was created |
 * | Channel Update | 11 | Channel settings were updated |
 * | Channel Delete | 12 | Channel was deleted |
 * | Channel Overwrite Create | 13 | Permission overwrite was added to a channel |
 * | Channel Overwrite Update | 14 | Permission overwrite was updated for a channel |
 * | Channel Overwrite Delete | 15 | Permission overwrite was deleted from a channel |
 * | Member Kick | 20 | Member was removed from server |
 * | Member Prune | 21 | Members were pruned from server |
 * | Member Ban Add | 22 | Member was banned from server |
 * | Member Ban Remove | 23 | Server ban was lifted for a member |
 * | Member Update | 24 | Member was updated in server |
 * | Member Role Update | 25 | Member was added or removed from a role |
 * | Member Move | 26 | Member was moved to a different voice channel	|
 * | Member Disconnect | 27 | Member was disconnected from a voice channel |
 * | Bot Add | 28 | Bot user was added to server |
 * | Role Create | 30 | Role was created
 * | Role Update | 31 | Role was edited
 * | Role Delete | 32 | Role was deleted
 * | Invite Create | 40 | Server invite was created
 * | Invite Update | 41 | Server invite was updated
 * | Invite Delete | 42 | Server invite was deleted
 * | Webhook Create | 50 | Webhook was created
 * | Webhook Update | 51 | Webhook properties or channel were updated
 * | Webhook Delete | 52 | Webhook was deleted
 * | Emoji Create | 60 | Emoji was created
 * | Emoji Update | 61 | Emoji name was updated
 * | Emoji Delete | 62 | Emoji was deleted
 * | Message Delete | 72 | Single message was deleted
 * | Message Bulk Delete | 73 | Multiple messages were deleted
 * | Message Pin | 74 | Message was pinned to a channel
 * | Message Unpin | 75 | Message was unpinned from a channel
 * | Integration Create | 80 | App was added to server
 * | Integration Update | 81 | App was updated
 * | Integration Delete | 82 | App was removed from server
 * | Stage Instance Create | 83 | Stage instance was created (stage channel becomes live)
 * | Stage Instance Update | 84 | Stage instance details were updated
 * | Stage Instance Delete | 85  | Stage instance was deleted {no longer live}
 * | Sticker Create | 90 | Sticker was created
 * | Sticker Update | 91 | Sticker details were updated
 * | Sticker Delete | 92 | Sticker was deleted
 * | Guild Scheduled Event Create | 100 | Event was created
 * | Guild Scheduled Event Update | 101 | Event was updated
 * | Guild Scheduled Event Delete | 102 | Event was cancelled
 * | Thread Create | 110 | Thread was created in a channel
 * | Thread Update | 111 | Thread was updated
 * | Thread Delete | 112 | Thread was deleted
 * | Application Command Permission Update | 121 | Permissions were updated for a command 
 * | Auto Moderation Rule Create | 140 | Auto Moderation rule was created
 * | Auto Moderation Rule Update | 141 | Auto Moderation rule was updated
 * | Auto Moderation Rule Delete | 142 | Auto Moderation rule was deleted
 * | Auto Moderation Block Message | 143 | Message was blocked by Auto Moderation
 * | Auto Moderation Flag To Channel | 144 | Message was flagged by Auto Moderation
 * | Auto Moderation User Communication Disabled | 145 | Member was timed out by Auto Moderation
 */

/**
 * @summary [Webhook Types]{@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types}
 * @typedef {number} WebhookType
 * | Name | Value | Description |
 * |-------|------|-------------|
 * | Incoming | 1 | Incoming Webhooks can post messages to channels with a generated token |
 * | Channel Follower | 2 | Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels
 * | Application | 3 | Application webhooks are webhooks used with Interactions
 * @example
 * // Incoming Webhook
 * {
 *   name: 'test webhook',
 *   type: 1,
 *   channel_id: '199737254929760256'.
 *   token: 'asdfasdfasdf',
 *   avatar: null,
 *   guild_id: '199737254929760256',
 *   id: '223704706495545344',
 *   application_id: null,
 *   user: {
 *     username: 'test',
 *     discriminator: '0001',
 *     avatar: null,
 *     public_flags: 131328
 *   }
 * }
 * @example
 * // Application Webhook
 * {
 *   type: 3,
 *   id: '658822586720976555',
 *   name: 'Clyde',
 *   avatar: null,
 *   channel_id: null,
 *   guild_id: null,
 *   application_id: '658822586720976555'
 * }
 */
/**
 * @summary [Webhook]{@link https://discord.com/developers/docs/resources/webhook#webhook-object}
 * @typedef {Object} Webhook
 * @property {Snowflake} id - The ID of the webhook
 * @property {WebhookType} type - The [type]{@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types} of the webhook
 * @property {?Snowflake} [guild_id] - The guild ID this webhook is for, if any
 * @property {?Snowflake} channel_id - The channel ID this webhook is for, if any
 * @property {User} [user] - The user this webhook was created by
 * @property {?string} name - The default name of the webhook
 * @property {?string} avatar - The default user avatar hash of the webhook
 * @property {string} [token] - The secure token of the webhook (Incoming Webhooks)
 * @property {?Snowflake} application_id - The bot/OAuth2 application that created this webhook
 * @property {{id: Snowflake, name: string, icon: string}} [source_guild] - The guild of the channel that this webhook is following (Channel Follower Webhooks)
 * @property {{id: Snowflake, name: string}} [source_channel] - The channel that this webhook is following (Channel Follower Webhooks)
 * @property {string} [url] - The URL used for executing the webhook (returned by the webhooks OAuth2 flow)
 */

/**
 * @summary Partial Channel
 * @typedef {Object} PartialChannel
 * @property {Snowflake} id - The id of the channel
 * @property {number} type - The type of the channel
 * @property {string} name - The name of the channel (1-100 characters)
 */

/**
 * @ignore
 * @summary [Channel Flags]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-flags}
 * @typedef {number} ChannelFlags
 * | Flag | Value | Description |
 * |------|-------|-------------|
 * | Pinned | 1 << 1 | This thread is pinned to the top of its parent `GUILD_FORUM` channel
 * | Required Tag | 1 << 4 | Whether a tag is required to be specified when creating a thread in a `GUILD_FORUM` channel. Tags are specified in the `applied_tags` field.
 */

/**
 * @summary [Thread Metadata]{@link https://discord.com/developers/docs/resources/channel#thread-metadata-object} Object
 * @description 
 * Contains a number of thread-specific channel fields that are not needed by other channel types
 * @typedef {Object} ThreadMetadata
 * @property {boolean} archived - Whether the thread is archived
 * @property {number} auto_archive_duration - The thread will stop showing in the channel list after `auto_archive_duration` minutes of inactivity, can be set to: 60, 1440, 4320, 10080
 * @property {ISO8601Timestamp} archive_timestamp - Timestamp when the thread's archive status was last changed
 * @property {boolean} locked - Whether the thread is locked; when a thread is locked, only users with `MANAGE_THREADS` can unarchive it
 * @property {boolean} [invitable] - Whether non-moderators can add other non-moderators to a thread; only available on private threads
 * @property {?ISO8601Timestamp} [create_timestamp] - Timestamp when the thread was created; only populated for threads created after 2022-01-09
 */

/**
 * @summary [Forum Tag]{@link https://discord.com/developers/docs/resources/channel#forum-tag-object} Object
 * @description 
 * Represents a tag that is able to be applied to a thread in a `GUILD_FORUM` channel
 * @typedef {Object} ForumTag
 * @property {Snowflake} id - The id of the tag
 * @property {string} name - The name of the tag (0-20 characters)
 * @property {boolean} moderated - Whether this tag can only be added to or removed from threads by a member with the `MANAGE_THREADS` permission
 * @property {?Snowflake} emoji_id - The id of a guild's custom emoji
 * @property {?string} emoji_name - The unicode character of the emoji
 */

/**
 * @summary [Default Reaction]{@link https://discord.com/developers/docs/resources/channel#default-reaction-object} Object
 * @description
 * An object that specifies the emoji to use as the default way to react to a forum post.
 * Exactly one of `emoji_id` and `emoji_name` must be set.
 * @typedef {Object} DefaultReaction
 * @property {?Snowflake} emoji_id
 * @property {?string} emoji_name
 */

/**
 * @summary [Embed]{@link https://discord.com/developers/docs/resources/channel#embed-object} Object
 * @typedef {Object} Embed
 * @property {string} [type]
 * @property {string} [title] - 256 character limit
 * @property {string | string[]} [description] - 4096 character limit
 * @property {?number} [color] - 0xhex or integer
 * @property {string} [url] - URL for the title of the embed
 * @property {number | Date | ISO8601Timestamp} [timestamp] - Timestamp of embed content
 * @property {{text: string, icon_url: ?string}} [footer] - Footer information for the bottom of the embed
 * @property {{name: string, url: string, icon_url: ?string}} [author] - Author information for the top of the embed
 * @property {{url: string}} [image] - Image information
 * @property {{url: string}} [thumbnail] - Thumbnail image for top right of the embed
 * @property {EmbedField[]} [fields] - Up to 25 field objects
 */

/**
 * Embed Field
 * @typedef {Object} EmbedField
 * @property {string} name - Name of the field (256 character limit)
 * @property {string} value - Value of the field (1024 character limit)
 * @property {boolean} [inline] - Whether or not this field should display inline
 */
/**
 * @summary [Attachment]{@link https://discord.com/developers/docs/resources/channel#attachment-object} Object
 * @description
 * For the `attachments` array in Message Create/Edit requests, only the `id` is required.
 * @typedef {Object} Attachment
 * @property {Snowflake} id - Attachment ID
 * @property {Buffer | string | undefined} file - File to send
 * @property {string} filename - Name of file attached
 * @property {string} [description] - Description for the file (max 1024 characters)
 * @property {string} [content_type] - The attachment's media type
 * @property {number} size - Size of file in bytes
 * @property {string} url - Source URL of file
 * @property {string} proxy_url - A proxied URL of file
 * @property {number} [height] - Height of file (if image)
 * @property {number} [width] - Width of file (if image)
 * @property {boolean} [ephemeral] - Whether this attachment is ephemeral
 * @property {number} [duration_secs] - The duration of the audio file (currently for voice messages)
 * @property {string} [waveform] - base64 encoded bytearray representing a sampled waveform
 */

/**
 * @summary [Recurrence Rule]
 * @description
 * ???
 * @typedef {Object} RecurrenceRule
 * @property {ISO8601Timestamp} start
 * @property {?ISO8601Timestamp} end
 * @property {RecurrenceRuleFrequency} frequency
 * @property {number} interval
 * @property {?RecurrenceRuleWeekdays[]} by_weekday
 * @property {?RecurrenceRuleMonths[]} by_month
 * @property {?unknown[]} by_month_day 
 * @property {?unknown[]} by_year_day
 * @property {?number} count
 */

/**
 * @summary [Recurrence Rule Frequencies]{@link }
 * @typedef {number} RecurrenceRuleFrequency
 * | Type | Value |
 * |------|-------|
 * | Yearly  | 0 |
 * | Monthly | 1 |
 * | Weekly  | 2 |
 * | Daily   | 3 |
 */

/**
 * @summary [Recurrence Rule Months]{@link }
 * @typedef {number} RecurrenceRuleMonths
 * | Type | Value |
 * |------|-------|
 * | January   | 1 |
 * | February  | 2 |
 * | March     | 3 |
 * | April     | 4 |
 * | May       | 5 |
 * | June      | 6 |
 * | July      | 7 |
 * | August    | 8 |
 * | September | 9 |
 * | October   | 10 |
 * | November  | 11 |
 * | December  | 12 |
 */

/**
 * @summary [Recurrence Rule Weekdays]{@link }
 * @typedef {number} RecurrenceRuleWeekdays
 * | Type | Value |
 * |------|-------|
 * | Monday    | 0 |
 * | Tuesday   | 1 |
 * | Wednesday | 2 |
 * | Thursday  | 3 |
 * | Friday    | 4 |
 * | Saturday  | 5 |
 * | Sunday    | 6 |
 */

/**
 * @summary [Allowed Mention Types]{@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types}
 * @typedef {'roles'|'users'|'everyone'} AllowedMentionsType
 * | Type | Value | Description |
 * |------|-------|-------------|
 * | Role Mentions     | 'roles'    | Controls role mentions |
 * | User Mentions     | 'users'    | Controls user mentions |
 * | Everyone Mentions | 'everyone' | Controls `@everyone` and `@here` mentions |
 */

/**
 * @summary [Allowed Mentions Object]{@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mentions-structure}
 * @description
 * The allowed mention field allows for more granular control over mentions without various hacks to the message content.
 * This will always validate against message content to avoid phantom pings (e.g. to ping everyone, you must still have `@everyone` in the message content), and check against user/bot permissions.
 * If `allowed_mentions` is not passed in (i.e. the key does not exist), the mentions will be parsed via the content.
 * This corresponds with existing behavior.
 * In the example below we would ping `@here` (and also `@role124` and `@user123`)
 * @example
 * {
 *   content: '@here Hi there from <@123>, cc <@&124>'
 * }
 * // to suppress all mentions in a message, use:
 * {
 *   content: '@everyone hi there, <@&123>',
 *   allowed_mentions: {
 *     parse: []
 *   }
 * }
 * @see {@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mentions-reference}
 * @typedef {Object} AllowedMentions
 * @property {AllowedMentionsType[]} parse - An array of [allowed mention types]{@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types} to parse from the content.
 * @property {Snowflake[]} roles - Array of role_ids to mention (Max size of 100)
 * @property {Snowflake[]} users - Array of user_ids to mention (Max size of 100)
 * @property {boolean} replied_user - For replies, whether to mention the author of the message being replied to (default false)
 */

/**
 * @summary [Message Reference Object]{@link https://discord.com/developers/docs/resources/channel#message-reference-object}
 * @description
 * `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
 * @see {@link https://discord.com/developers/docs/resources/channel#message-types}
 * @typedef {Object} MessageReference
 * @property {Snowflake} [message_id] - ID of the originating message
 * @property {Snowflake} [channel_id] - ID of the originating message's channel
 * @property {Snowflake} [guild_id] - ID of the originating message's guild
 * @property {boolean} [fail_if_not_exists=true] - When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true
 */

/**
 * @summary [Message Flags]{@link https://discord.com/developers/docs/resources/channel#message-object-message-flags}
 * @typedef {number} MessageFlags
 * | Type | Value | Description |
 * |------|-------|-------------|
 * | Crossposted | 1 << 0 | This message has been published to subscribed channels (via Channel Following) |
 * | IsCrosspost | 1 << 1 | This message originated from a message in another channel (via Channel Following) |
 * | SuppressEmbeds | 1 << 2 | Do not include any embeds when serializing this message |
 * | SourceMessageDeleted | 1 << 3 | The source message for this crosspost has been deleted (via Channel Following) |
 * | Urgent | 1 << 4 | This message came from the urgent message system |
 * | HasThread | 1 << 5 | This message has an associated thread, which shares its id |
 * | Ephemeral | 1 << 6 | This message is only visible to the user who invoked the Interaction |
 * | Loading | 1 << 7 | This message is an Interaction Response and the bot is "thinking" |
 * | FailedToMentionSomeRolesInThread | 1 << 8 | This message failed to mention some roles and add their members to the thread |
 */

/**
 * @summary [Channel Types]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
 * @typedef {number} ChannelType
 * | Type | Value | Description |
 * |------|-------|-------------|
 * | Guild Text          | 0 | A text channel within a guild |
 * | DM                  | 1 | A direct message between users |
 * | Guild Voice         | 2 | A voice channel within a server |
 * | Group DM            | 3 | A direct message between multiple users |
 * | Guild Category      | 4 | An organizational category that contains up to 50 channels |
 * | Guild Announcement  | 5 | A channel that users can follow and crosspost into their own server |
 * | Announcement Thread | 10 | A temporary sub-channel within a `GUILD_ANNOUNCEMENT` channel |
 * | Public Thread       | 11 | A temporary sub-channel within a `GUILD_TEXT` or `GUILD_FORUM` channel |
 * | Private Thread      | 12 | A temporary sub-channel within a `GUILD_TEXT` channel that is only viewable by those invited and those with the `MANAGE_THREADS` permission |
 * | Guild Stage Voice   | 13 | A voice channel for hosting events with an audience |
 * | Guild Directory     | 14 | The channel in a hub containing the listed servers |
 * | Guild Forum         | 15 | Channel that can only contain threads |
 * | Guild Media         | 16 | Channel that can only contain media threads |
 */

/**
 * @summary [Message Types]{@link https://discord.com/developers/docs/resources/channel#message-object-message-types}
 * @typedef {number} MessageType
 * | Type | Value |
 * |------|-------|
 * | Default | 0 |
 * | Recipient Add | 1 |
 * | Recipient Remove | 2 |
 * | Call | 3 |
 * | Channel Name Change | 4 |
 * | Channel Icon Change | 5 |
 * | Channel Pinned Message | 6 |
 * | User Join | 7 |
 * | Guild Boost | 8 |
 * | Guild Boost Tier 1 | 9 |
 * | Guild Boost Tier 2 | 10 |
 * | Guild Boost Tier 3 | 11 |
 * | Channel Follow Add | 12 |
 * | Guild Discovery Disqualified | 14 |
 * | Guild Discovery Requalified | 15 |
 * | Guild Discovery Grace Period Initial Warning | 16 |
 * | Guild Discovery Grace Period Final Warning | 17 |
 * | Thread Created | 18 |
 * | Reply | 19 |
 * | Chat Input Command | 20 |
 * | Thread Starter Message | 21 |
 * | Guild Invite Reminder | 22 |
 * | Context Menu Command | 23 |
 * | Auto Moderation Action | 24 |
 * | Role Subscription Purchase | 25 |
 * | Interaction Premium Upsell | 26 |
 * | Stage Start | 27 |
 * | Stage End | 28 |
 * | Stage Speaker | 29 |
 * | Stage Topic | 31 |
 * | Guild Application Premium Subscription | 32 |
 */
/**
 * @summary [Component Types]{@link https://discord.com/developers/docs/interactions/message-components#component-object-component-types}
 * @typedef {number} ComponentType
 * | Type | Name | Description |
 * |------|------|-------------|
 * | 1 | Action Row     | Container for other components |
 * | 2 | Button         | {@link Button} |
 * | 3 | String Select  | [Select menu]{@link SelectMenu} for picking from defined text options |
 * | 4 | Text Input     | {@link Modal} |
 * | 5 | User Select    | Select menu for users |
 * | 6 | Role Select    | Select menu for roles |
 * | 7 | Mentionable Select | Select menu for mentionables (users and roles) |
 * | 8 | Channel Select | Select menu for channels |
 */


/**
 * @summary [Button Styles]{@link https://discord.com/developers/docs/interactions/message-components#button-object-button-styles}
 * @typedef {number} ButtonStyle
 * | Name | Value | Color |
 * |------|-------|-------|
 * | Primary   | 1 | blurple |
 * | Secondary | 2 | grey |
 * | Success   | 3 | green |
 * | Danger    | 4 | red |
 * | Link      | 5 | grey, navigates to a URL |
 */

/**
 * @summary [Text Input Styles]{@link https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-styles}
 * @typedef {number} TextInputStyle
 * | Name | Value | Description |
 * |------|-------|-------------|
 * | Short | 1 | Single-line input |
 * | Paragraph | 2 | Multi-line input |
 */

/**
 * @typedef {object} MemberParams
 * @property {Snowflake[]} roles
 * @property {number} hexColor
 * @property {?Date} unusual_dm_activity_until
 * @property {?Date} premium_since
 * @property {boolean} pending
 * @property {?string} nick
 * @property {boolean} mute
 * @property {Date} joined_at
 * @property {number} flags
 * @property {boolean} deaf
 * @property {?Date} communication_disabled_until
 * @property {?string} avatar
 * @property {PermNames[]} permission_names
 * @property {string} displayName
 * @property {string} displayAvatar
 */

// @property {import('../../../../../../src/enums/enum').PERMISSION_NAMES[]} permission_names


/**
 * @typedef {Object} MessageInteraction
 * @property {Snowflake} id
 * @property {InteractionType} type
 * @property {string} name
 * @property {User} user
 * @property {MemberParams} [member]
 */

/**
 * @summary [Interaction]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object}
 * @typedef {Object} Interaction
 * @property {Snowflake} id
 * @property {Snowflake} application_id
 * @property {InteractionType} type - [Type of interaction]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type}
 * @property {InteractionData} data - Interaction data payload
 * @property {Snowflake} guild_id
 * @property {Snowflake} [channel_id]
 * @property {Member} member - Guild member data for the invoking user, including permissions
 * @property {User} [user] - User object for the invoking user, if invoked in a DM
 * @property {string} token - Continuation token for responding to the interaction
 * @property {number} version - Read-only property, always 1
 * @property {Message} message - For components, the message they were attached to
 * @property {string} [app_permissions] - Bitwise set of permissions the app or bot has within the channel the interaction was sent from
 * @property {string} [locale] - Selected language of the invoking user
 * @property {string} [guild_locale] - Guild's preferred locale, if invoked in a guild
 * @property {Entitlement[]} entitlements
 * @property {Snowflake[]} entitlement_sku_ids
 * @property {Channel} channel
 * @property {GuildParams} guild
 */

/**
 * @typedef {Pick<Guild,
 *   'id' | 'name' | 'description' | 'splash' | 'banner' | 'icon' | 'features' | 'nsfw_level' | 'vanity_url_code' | 'premium_subscription_count' | 'verification_level'
 * >} PartialInviteGuild
 */

/**
 * @summary [Partial Guild Object]{@link https://discord.com/developers/docs/resources/user#get-current-user-guilds-example-partial-guild}
 * @typedef {Pick<Guild,
 *   'id' | 'name' | 'icon' | 'owner' | 'permissions' | 'features'
 * >} PartialGuild
 */

/**
 * @summary [Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object}
 * @typedef {Object} Member
 * @property {string} displayName
 * @property {string} displayAvatar
 * @property {number} [hexColor]
 * @property {User} user - The [user]{@link User} this guild member represents
 * @property {string | null} nick - This user's guild nickname
 * @property {string | null} avatar - The member's guild avatar hash
 * @property {Snowflake[]} roles - Array of role object ids
 * @property {ISO8601Timestamp} joined_at - When the user joined the server
 * @property {ISO8601Timestamp | null} premium_since - When the user started boosting the server
 * @property {boolean} deaf - Whether the user is deafened in voice channels
 * @property {boolean} mute - Whether the user is muted in voice channels
 * @property {number} flags - [Guild member flags]{@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags} represented as a bit set. Defaults to 0.
 * @property {boolean} pending - Whether the user has not yet passed the guilds Membership Screening requirements
 * @property {string} permissions - Total permissions of the member in the channel
 * @property {ISO8601Timestamp} communication_disabled_until - When the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out
 * @property {PermNames[]} permission_names
 */

/**
 * @summary [Role]{@link https://discord.com/developers/docs/topics/permissions#role-object}
 * @typedef {Object} Role
 * @property {Snowflake} id - Role id
 * @property {string} name - Role name
 * @property {number} color - Integer representation of hexadecimal color code
 * @property {string} hexColor
 * @property {boolean} hoist - If this role is pinned in the user listing
 * @property {boolean} mentionable - Whether this role is mentionable
 * @property {string} permissions - Permission bit set
 * @property {string | null} [unicode_emoji] - Role unicode emoji
 * @property {number} position - Position of this role
 * @property {string | null} [icon] - Role icon hash
 * @property {string} [icon_url]
 * @property {RoleTags} [tags] - The [tags]{@link RoleTags} this role has
 * @property {boolean} managed - Whether this role is managed by an integration
 * @property {number} flags
 * @property {PermNames[]} permission_names
 */

/**
 * @summary [Role Tags]{@link https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure}
 * @typedef {Object} RoleTags
 * @property {Snowflake} bot_id - The id of the bot this role belongs to
 * @property {Snowflake} integration_id - The id of the integration this role belongs to
 * @property {null} premium_subscriber - Whether this is the guild's Booster role
 * @property {Snowflake} subscription_listing_id - The id of this role's subscription sku and listing
 * @property {null} available_for_purchase - Whether this role is available for purchase
 * @property {null} guild_connection - Whether this role is a guild's linked role
 */

/**
 * @summary [Role Subscription Data]{@link https://discord.com/developers/docs/resources/channel#role-subscription-data-object}
 * @typedef {Object} RoleSubscriptionData
 * @property {Snowflake} role_subscription_listing_id - The id of the SKU and listing that the user is subscribed to
 * @property {string} tier_name - The name of the tier that the user is subscribed to
 * @property {number} total_months_subscribed - The cumulative number of months that the user has been subscribed for
 * @property {boolean} is_renewal - Whether this notification is for a renewal rather than a new purchase
 */

/**
 * @summary [Overwrite]{@link https://discord.com/developers/docs/resources/channel#overwrite-object}
 * @typedef {Object} Overwrite
 * @property {Snowflake} id
 * @property {string} allow
 * @property {string} deny
 * @property {number} type - 0 for role, 1 for member
 */

/**
 * @summary [Video Quality Modes]{@link https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes}
 * @typedef {number} VideoQualityMode
 * | Mode | Value | Description |
 * |------|-------|-------------|
 * | Auto | 1 | Discord chooses the quality for optimal performance |
 * | Full | 2 | 720p |
 */

/**
 * @summary [Guild Verification Level]{@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level}
 * @typedef {number} GuildVerificationLevel
 * | Level | Integer | Description |
 * |-------|---------|-------------|
 * | None      | 0 | Unrestricted |
 * | Low       | 1 | Must have verified email on account |
 * | Medium    | 2 | Must be registered on Discord for longer than 5 minutes |
 * | High      | 3 | Must be a member of the server for longer than 10 minutes |
 * | Very High | 4 | Must have a verified phone number |
 */

/**
 * @summary [Default Message Notification Level]{@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
 * @typedef {number} DefaultMessageNotificationLevel
 * | Key | Value | Description |
 * |-----|-------|-------------|
 * | All Messages  | 0 | Members will receive notifications for all messages by default |
 * | Only Mentions | 1 | Members will receive notifications only for messages that `@mention` them by default |
 */

/**
 * @summary [Explicit Content Filter Level]{@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
 * @typedef {number} ExplicitContentFilterLevel
 * | Level | Integer | Description |
 * |-------|---------|-------------|
 * | Disabled              | 0 | Media content will not be scanned |
 * | Members without roles | 1 | Media content sent by members without roles will be scanned |
 * | All members           | 2 | Media content sent by all members will be scanned |
 */

/**
 * @summary [Guild MFA Level]{@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level}
 * @typedef {number} GuildMFALevel
 * | Level | Integer | Description |
 * |-------|---------|-------------|
 * | None     | 0 | Guild has no MFA/2FA requirement for moderation actions |
 * | Elevated | 1 | Guild has a 2FA requirement for moderation actions |
 */

/**
 * @summary Guild NSFW Level
 * @typedef {number} GuildNSFWLevel
 * | Level | Value |
 * |-------|-------|
 * | Default        | 0 |
 * | Explicit       | 1 |
 * | Safe           | 2 |
 * | Age-Restricted | 3 |
 */

/**
 * @summary System Channel Flags
 * @typedef {number} SystemChannelFlags
 * | Flag | Value | Description |
 * |------|-------|-------------|
 * SUPPRESS_JOIN_NOTIFICATIONS | 1 << 0 | Supress member join notifications |
 * SUPPRESS_PREMIUM_SUBSCRIPTIONS | 1 << 1 | Suppress server boost notifications |
 * SUPPRESS_GUILD_REMINDER_NOTIFICATIONS | 1 << 2 | Suppress server setup tips |
 * SUPPRESS_JOIN_NOTIFICATION_REPLIES | 1 << 3 | Hide member join sticker reply buttons |
 * SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS | 1 << 4 | Suppress role subscription purchase and renewal notifications |
 * SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES | 1 << 5 | Hide role subscription sticker reply buttons |
 */

/**
 * @summary Guild Features
 * @typedef {'ANIMATED_BANNER'|'ANIMATED_ICON'|'APPLICATION_COMMAND_PERMISSIONS_V2'|'AUTO_MODERATION'|'BANNER'|'COMMUNITY'|'CREATOR_MONETIZABLE_PROVISIONAL'|'CREATOR_STORE_PAGE'|'DEVELOPER_SUPPORT_SERVER'|'DISCOVERABLE'|'FEATURABLE'|'INVITES_DISABLED'|'INVITE_SPLASH'|'MEMBER_VERIFICATION_GATE_ENABLED'|'MORE_STICKERS'|'NEWS'|'PARTNERED'|'PREVIEW_ENABLED'|'ROLE_ICONS'|'ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE'|'ROLE_SUBSCRIPTIONS_ENABLED'|'TICKETED_EVENTS_ENABLED'|'VANITY_URL'|'VERIFIED'|'VIP_REGIONS'|'WELCOME_SCREEN_ENABLED'} GuildFeatures
 * | Feature | Description |
 * |---------|-------------|
 * | Animated Banner | guild has access to set an animated guild banner image |
 * | Animated Icon | guild has access to set an animated guild icon |
 * | Application Command Permissions V2 | guild is using the old permissions configuration behavior |
 * | Auto Moderation | guild has set up auto moderation rules |
 * | Banner | guild has access to set a guild banner image |
 * | Community | guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates |
 * | Creator Monetizable Provisional | guild has enabled monetization |
 * | Creator Store Page | guild has enabled the role subscription promo page |
 * | Developer Support Server | guild has been set as a support server on the App Directory |
 * | Discoverable | guild is able to be discovered in the directory |
 * | Featurable | guild is able to be featured in the directory |
 * | Invites Disabled | guild has paused invites, preventing new users from joining |
 * | Invite Splash | guild has access to set an invite splash background |
 * | Member Verification Gate Enabled | guild has enabled Membership Screening |
 * | More Stickers | guild has increased custom sticker slots |
 * | News | guild has access to create announcement channels |
 * | Partnered | guild is partnered |
 * | Preview Enabled | guild can be previewed before joining via Membership Screening or the directory |
 * | Role Icons | guild is able to set role icons |
 * | Role subscription available for purchase | guild has role subscriptions that can be purchased |
 * | Role Subscriptions Enabled | guild has enabled role subscriptions |
 * | Ticketed Events Enabled | guild has enabled ticketed events |
 * | Vanity URL | guild has access to set a vanity URL |
 * | Verified | guild is verified |
 * | VIP Regions | guild has access to set 384kbps bitrate in voice (previously VIP voice servers) |
 * | Welcome Screen Enabled | guild has enabled the welcome screen |
 */

/**
 * @summary Mutable Guild Features
 * @typedef {'COMMUNITY'|'DISCOVERABLE'|'INVITES_DISABLED'|'RAID_ALERTS_DISABLED'} MutableGuildFeatures
 * | Feature | Required Permissions | Effects |
 * |---------|----------------------|---------|
 * | Community | Administrator | Enables Community Features in the guild |
 * | Discoverable | Administrator | Enables discovery in the guild, making it publicly listed |
 * | Invites Disabled | Manage Guild | Pauses all invites/access to the server |
 * | Raid Alerts Disabled | Manage Guild | Disables alerts for join raids |
 */

/**
 * @summary [Welcome Screen]{@link https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-structure}
 * @typedef {Object} GuildWelcomeScreen
 * @property {?string} description - The server description shown in the welcome screen
 * @property {GuildWelcomeScreenChannel[]} welcome_channels - The channels shown in the welcome screen, up to 5
 */

/**
 * @summary [Welcome Screen Channel]{@link https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure}
 * @typedef {Object} GuildWelcomeScreenChannel
 * @property {Snowflake} channel_id - The channel's ID
 * @property {string} description - The description shown for the channel
 * @property {?Snowflake} emoji_id - The emoji ID, if the emoji is custom
 * @property {?string} emoji_name - The emoji name if custom, the unicode character if standard, or `null` if no emoji is set
 */

/**
 * @summary [Stage Instance Privacy Level]{@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level}
 * @typedef {number} StagePrivacyLevel
 * | Name | Value |
 * |------|-------|
 * | Public  | 1  |
 * | Private | 2  |
 */


/**
 * @summary [Guild Scheduled Event Privacy Level]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level}
 * @typedef {number} EventPrivacyLevel
 * Name | Value
 * -----|------
 * Guild Only | 2 
 */


/** 
 * @summary [Guild Scheduled Event Status]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status}
 * @typedef {number} EventStatus
 * | Name | Value |
 * |------|-------|
 * | Scheduled | 1 |
 * | Active    | 2 |
 * | Completd  | 3 |
 * | Canceled  | 4 |
 * 
 * 
 * Once status is set to `COMPLETED` or `CANCELED`, the status can no longer be updated
 * 
 * Valid Guild Scheduled Event Status Transitions:
 * 
 * SCHEDULED --> ACTIVE
 * 
 * ACTIVE --------> COMPLETED
 *
 * SCHEDULED --> CANCELED
 */

/**
 * @summary [Guild Scheduled Event Entity Metadata]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-metadata}
 * @description
 * Required for events with `'entity_type': EXTERNAL`
 * @typedef {Object} EventEntityMetadata
 * @property {string} [location] - Location of the event (1-100 characters)
 * @property {Snowflake[]} speaker_ids - Undocumented
 */

/**
 * @summary [Guild Scheduled Event User]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-user-object}
 * @typedef {Object} EventUser
 * @property {Snowflake} guild_scheduled_event_id - The scheduled event id which the user subscribed to
 * @property {User} user - User which subscribed to an event
 * @property {Member} [member] - Guild member data for this user for the guild which this event belongs to, if any
 */

/**
 * @summary [Guild Scheduled Event Entity Type]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types}
 * @typedef {number} EventEntityType
 * | Name | Value |
 * |------|-------|
 * | Stage Instance | 1 |
 * | Voice    | 2 |
 * | External  | 3 |
 */

/**
 * @summary [Guild Preview]{@link https://discord.com/developers/docs/resources/guild#guild-preview-object}
 * @typedef {Object} GuildPreview
 * @property {Snowflake} id - Guild ID
 * @property {string} name - Guild name (2-100 characters)
 * @property {string | null} icon - Icon hash
 * @property {string | null} splash - Splash hash
 * @property {string | null} discovery_splash - Discovery_splash hash
 * @property {Emoji[]} emojis - Custom guild emojis
 * @property {Sticker[]} stickers - Custom guild stickers
 * @property {GuildFeatures[]} features - Enabled guild features
 * @property {number} approximate_member_count - Approximate number of members in this guild
 * @property {number} approximate_presence_count - Approximate number of online members in this guild
 * @property {string} description - The description for the guild
 */

/**
 * @summary [Guild Ban]{@link https://discord.com/developers/docs/resources/guild#ban-object}
 * @example
 * {
 *   reason: 'being too cool',
 *   user: {
 *     username: 'Goodsie',
 *     discriminator: '1410',
 *     id: '274685280429015040',
 *     avatar: 'asdfasdf',
 *     public_flags: 4194368
 *   }
 * }
 * @typedef {Object} GuildBan
 * @property {?string} reason - The reason for the ban
 * @property {User} user - The banned user
 */

/**
 * @summary [Guild Voice Region]{@link https://discord.com/developers/docs/resources/voice#voice-region-object}
 * @typedef {Object} GuildVoiceRegion
 * @property {string} id - Unique ID for the region
 * @property {string} name - Name of the region
 * @property {boolean} optimal - `true` for a single server that is closest to the current user's client
 * @property {boolean} deprecated - Whether this is a deprecated voice region
 * @property {boolean} custom - Whether this is a custom voice region (used for events/etc)
 */

/**
 * @summary Guild Integration Expire Behavior
 * @typedef {number} GuildIntegrationExpireBehavior
 * | Name | Value |
 * |------|-------|
 * | Kick | 0 |
 * | Remove Role | 1 |
 */

/**
 * @summary Guild Integration Account
 * @typedef {Object} GuildIntegrationAccount
 * @property {string} id - ID of the account
 * @property {string} name - Name of the account
 */

/**
 * @summary Guild Integration Application
 * @typedef {Object} GuildIntegrationApplication
 * @property {Snowflake} id - The ID of the app
 * @property {string} name - The name of the app
 * @property {string | null} icon - The icon hash of the app
 * @property {string} description - The description of the app
 * @property {User} [bot] - The bot associated with this application
 */

/**
 * @summary [Guild Integration]{@link https://discord.com/developers/docs/resources/guild#integration-object}
 * @typedef {Object} GuildIntegration
 * @property {Snowflake} id - Integration ID
 * @property {string} name - Integration name
 * @property {'twitch' | 'youtube' | 'discord'} type - Integration type
 * @property {boolean} [enabled] - Is this integration enabled
 * @property {boolean} [syncing] - Is this integration syncing
 * @property {Snowflake} [role_id] - ID that this integration uses for "subscribers"
 * @property {boolean} [enable_emoticons] - Whether emoticons should be synced for this integration
 * @property {GuildIntegrationExpireBehavior} [expire_behavior] - The behavior of expiring subscribers
 * @property {number} [expire_grace_period] - The grace period (in days) before expiring subscribers
 * @property {User} [user] - User for this integration
 * @property {GuildIntegrationAccount} account - Integration account information
 * @property {string} [synced_at] - When this integration was last synced
 * @property {number} [subscriber_count] - How many subscribers this integration has
 * @property {boolean} [revoked] - Has this integration been revoked
 * @property {GuildIntegrationApplication} [application] - The bot/OAuth2 application for discord integrations
 */

/**
 * @summary [Guild Widget]{@link https://discord.com/developers/docs/resources/guild#guild-widget-object}
 * @typedef {Object} GuildWidget 
 * @property {Snowflake} id - Guild ID
 * @property {string} name - Guild name (2-100 characters)
 * @property {?string} instant_invite - Instant invite for the guilds specified widget invite channel
 * @property {PartialChannel[]} channels - Voice and stage channels which are accessible by `@everyone`
 * @property {GuildWidgetUser} members - Special widget user objects that includes users presence
 * @property {number} presence_count - Number of online members in this guild
 */

/**
 * @summary [Guild Widget Settings]{@link https://discord.com/developers/docs/resources/guild#guild-widget-settings-object}
 * @typedef {Object} GuildWidgetSettings
 * @property {boolean} enabled - Whether the widget is enabled
 * @property {Snowflake} channel_id - The widget channel ID
 */

/**
 * @summary [Guild Widget Style Options]{@link https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options}
 * @description
 * - [Shield]{@link https://discord.com/api/guilds/81384788765712384/widget.png?style=shield} - shield style widget with Discord icon and guild members online count (default)
 * - [banner1]{@link https://discord.com/api/guilds/81384788765712384/widget.png?style=banner1} - large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget
 * - [banner2]{@link https://discord.com/api/guilds/81384788765712384/widget.png?style=banner2} - smaller widget style with guild icon, name and online count. Split on the right with Discord logo
 * - [banner3]{@link https://discord.com/api/guilds/81384788765712384/widget.png?style=banner3} - large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right
 * - [banner4]{@link https://discord.com/api/guilds/81384788765712384/widget.png?style=banner4} - large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom
 * @typedef {string} GuildWidgetStyleOptions
 */

/**
 * @summary Guild Widget Partial User Objects
 * @typedef {Object} GuildWidgetUser
 * @property {string} id - Anonymized to prevent abuse
 * @property {string} username
 * @property {string} discriminator - Anonymized to prevent abuse
 * @property {string} avatar - Anonymized to prevent abuse
 * @property {string} status - User presence
 * @property {string} avatar_url
 */

/**
 * @summary [Guild Template]{@link https://discord.com/developers/docs/resources/guild-template#guild-template-object}
 * @description
 * Represents a code that when used, creates a guild based on a snapshot of an existing guild
 * @typedef {Object} GuildTemplate 
 * @property {string} name - Template name
 * @property {string} code - The template code (unique ID)
 * @property {?string} description - The description for the template
 * @property {number} usage_count - Number of times this template has been used
 * @property {Snowflake} creator_id - The ID of the user who created the template
 * @property {User} creator - The user who created the template
 * @property {string} created_at - When this template was created
 * @property {string} updated_at - When this template was last synced to the source guild
 * @property {Snowflake} source_guild_id - The ID of the guild this template is based on
 * @property {Object} serialized_source_guild - The guild snapshot this template contains
 * @property {?boolean} is_dirty - Whether the template has unsynced changes
 */

/**
 * @summary [Guild Onboarding]{@link https://discord.com/developers/docs/resources/guild#guild-onboarding-object}
 * @description
 * Represents the [onboarding]{@link https://support.discord.com/hc/en-us/articles/11074987197975-Community-Onboarding-FAQ} flow for a guild
 * @typedef {Object} GuildOnboarding
 * @property {Snowflake} guild_id - ID of the guild this onboarding is part of
 * @property {OnboardingPrompt[]} prompts - Prompts shown during onboarding and in customize community
 * @property {Snowflake[]} default_channel_ids - Channel IDs that members get opted into automatically
 * @property {boolean} enabled - Whether onboarding is enabled in the guild
 */

/**
 * @summary [Onboarding Prompt]{@link https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-prompt-structure}
 * @typedef {Object} OnboardingPrompt
 * @property {Snowflake} id - ID of the prompt
 * @property {OnboardingPromptType} type - Type of prompt
 * @property {OnboardingPromptOption[]} options - Options available within the prompt
 * @property {string} title - Title of the prompt
 * @property {boolean} single_select - Indicates whether users are limited to selecting one option for the prompt
 * @property {boolean} required - Indicates whether the prompt is required before a user completes the onboarding flow
 * @property {boolean} in_onboarding
 * - Indicates whether the prompt is present in the onboarding flow.
 * - If `false`, the prompt will only appear in the Channels & Roles tab
 */

/**
 * @summary [Prompt Option]{@link https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-option-structure}
 * @typedef {Object} OnboardingPromptOption
 * @property {Snowflake} id - ID of the prompt option
 * @property {Snowflake[]} channel_ids - IDs for channels a member is added to when the option is selected
 * @property {Snowflake[]} role_ids - IDs for roles assigned to a member when the option is selected
 * @property {Emoji} emoji - Emoji of the option
 * @property {string} title - Title of the option
 * @property {?string} description - Description of the option
 */

/**
 * @summary [Onboarding Prompt Types]{@link https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-types}
 * @typedef {number} OnboardingPromptType
 * | Name | Value |
 * |------|-------|
 * | Multiple Choice | 0  |
 * | Dropdown        | 1  |
 */

/**
 * @summary [Onboarding Mode]{@link https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-mode}
 * @typedef {number} OnboardingMode
 * | Name | Value |
 * |------|-------|
 * | Onboarding Default  | 0  |
 * | Onboarding Advanced | 1  |
 */

/**
 * @summary [Guild Home Settings]{@link }
 * @description
 * Represents the [onboarding]{@link } flow for a guild
 * @typedef {Object} GuildHomeSettings
 * @property {Snowflake} guild_id
 * @property {boolean} enabled
 * @property {WelcomeMessage} [welcome_message]
 * @property {NewMemberAction} [new_member_actions]
 * @property {ResourceChannel[]} [resource_channels]
 */

/**
 * @summary [WelcomeMessage]{@link }
 * @typedef {Object} WelcomeMessage
 * @property {Snowflake[]} author_ids
 * @property {string} message
 */

/**
 * @summary [Resource Channel]{@link }
 * @typedef {Object} ResourceChannel
 * @property {Snowflake} channel_id
 * @property {string} title
 * @property {string} description
 * @property {?PartialEmoji} [emoji]
 * @property {?string} [icon]
 * 
 */
/**
 * @summary [New Member Action]{@link }
 * @typedef {Object} NewMemberAction
 * @property {Snowflake} channel_id
 * @property {NewMemberActionType} action_type
 * @property {string} title
 * @property {string} description
 * @property {?PartialEmoji} [emoji]
 * @property {?string} [icon]
 */

/**
 * @summary [New Member Action Type]{@link }
 * @typedef {number} NewMemberActionType
 * | Name | Value |
 * |------|-------|
 * | View | 0  |
 * | Talk | 1  |
 */

/**
 * @summary [Guild Create Event]{@link https://discord.com/developers/docs/topics/gateway-events#guild-create}
 * @typedef {Object} GuildParams
 * @property {Snowflake} id
 * @property {string} name
 * @property {string} created_at
 * @property {?string} description
 * @property {GuildMFALevel} mfa_level
 * @property {boolean} premium_progress_bar_enabled
 * @property {unknown} hub_type
 * @property {?Snowflake} latest_onboarding_question_id
 * @property {?string} vanity_url_code
 * @property {?Snowflake} public_updates_channel_id
 * @property {number} max_stage_video_channel_users
 * @property {?string} splash
 * @property {boolean} lazy
 * @property {number} premium_subscription_count
 * @property {SystemChannelFlags} system_channel_flags
 * @property {DefaultMessageNotificationLevel} default_message_notifications
 * @property {?string} banner
 * @property {number} max_members
 * @property {?Snowflake} safety_alerts_channel_id
 * @property {LocaleString} preferred_locale
 * @property {?string} discovery_splash
 * @property {?string} icon
 * @property {GuildHashes} guild_hashes
 * @property {boolean} nsfw
 * @property {GuildVerificationLevel} verification_level
 * @property {GuildNSFWLevel} nsfw_level
 * @property {?Snowflake} application_id
 * @property {Snowflake} owner_id
 * @property {Array<Object>} embedded_activities
 * @property {unknown} home_header
 * @property {?Snowflake} rules_channel_id
 * @property {?Snowflake} system_channel_id
 * @property {number} afk_timeout
 * @property {number} premium_tier
 * @property {number} max_video_channel_user
 * @property {?Snowflake} afk_channel_id
 * @property {ExplicitContentFilterLevel} explicit_content_filter
 * @property {Sticker[]} stickers
 * @property {Emoji[]} emojis
 * @property {Role[]} roles
 * @property {Date | string} joined_at
 * @property {?unknown} incidents_data 
 * @property {boolean} large
 * @property {boolean} unavailable - `true` if this guild is unavailable due to an outage
 * @property {Member[]} members
 * @property {?Channel[]} threads
 * @property {Channel[]} channels
 * @property {GuildFeatures[]} features
 * @property {GuildPresenceParams[]} presences - Presences of the members in the guild, will only include non-offline members if the size is greater than `large` threshold
 * @property {VoiceState[]} voice_states
 * @property {GuildScheduledEvent[]} guild_scheduled_events
 * @property {StageInstance[]} stage_instances
 * @property {SoundboardSound[]} soundboard_sounds
 * @property {Object<string, number>} application_command_counts
 * @property {number} [emojiCount]
 * @property {number} [stickerCount]
 * @property {number} channelCount
 * @property {number} roleCount
 * @property {number} member_count
 * @property {string} [icon_url]
 * @property {string} [banner_url]
 * @property {string} [splash_url]
 * @property {string} [discovery_splash_url]
 */

/**
 * @summary [Presence Update Event]{@link https://discord.com/developers/docs/topics/gateway-events#presence-update}
 * @typedef {object} GuildPresenceParams
 * @property {Pick<User, 'id'>} user
 * @property {Snowflake} guild_id
 * @property {'online'|'offline'|'idle'|'dnd'} status
 * @property {Activity[]} activities
 * @property {ClientStatus} client_status
 */

/**
 * @summary [Mention Object in MESSAGE_CREATE Event]{@link https://discord.com/developers/docs/topics/gateway-events#message-create-message-create-extra-fields}
 * @typedef {object} MessageCreateMentions
 * @property {string} username
 * @property {?string} global_name
 * @property {string} [display_name]
 * @property {Snowflake} id
 * @property {?string} avatar
 * @property {?string} avatar_decoration_data
 * @property {number} public_flags
 * @property {MemberParams} member
 */

/**
 * @typedef {object} GuildHashes
 * @property {number} version
 * @property {{omitted: boolean, hash: string}} roles
 * @property {{omitted: boolean, hash: string}} metadata
 * @property {{omitted: boolean, hash: string}} channels
 */

/**
 * @summary [Presence Update Event]{@link https://discord.com/developers/docs/topics/gateway-events#presence-update}
 * @typedef {object} PresenceUpdate
 * @property {User} user
 * @property {MemberParams} member
 * @property {Snowflake} guild_id
 * @property {'online'|'offline'|'idle'|'dnd'} status
 * @property {Activity[]} activities
 * @property {ClientStatus} client_status
 * @property {number} timestamp
 */

/**
 * [Soundboard Sound]{@link }
 * - undocumented soundboard object
 * @typedef {Object} SoundboardSound
 * @property {number} volume
 * @property {Snowflake} user_id
 * @property {Snowflake} sound_id
 * @property {string} name
 * @property {Snowflake} guild_id
 * @property {?string} emoji_name
 * @property {?Snowflake} emoji_id
 * @property {boolean} available
 */
/**
 * @summary [SKU]{@link https://discord.com/developers/docs/monetization/skus#sku-object}
 * @typedef {Object} SKU
 * @property {Snowflake} id - ID of SKU
 * @property {Snowflake} application_id - ID of the parent application
 * @property {SKUType} type - The [type of SKU]{@link https://discord.com/developers/docs/monetization/skus#sku-object-sku-types}
 * @property {string} name - Customer-facing name of your premium offering
 * @property {string} slug - System-generated URL slug based on the SKU's name
 * @property {?Snowflake} dependent_sku_id - ???
 * @property {?string} manifest_labels - ???
 * @property {?ISO8601Timestamp} release_date - ???
 * @property {SKUAccessType} access_type - ???
 * @property {string[]} features - ???
 * @property {SKUFlags} flags - ???
 * @property {boolean} premium - ???
 * @property {boolean} show_age_gate - ???
 */

/**
 * @summary SKU Flags
 * @typedef {number} SKUFlags
 * | Flag | Value |
 * |--------------------|--------|
 * | Guild Subscription | 1 << 7 |
 * | User Subscription  | 1 << 8 |
 * - The `flags` field can be used to differentiate user and server subscriptions with a bitwise `&&` operator.
 */

/**
 * @summary SKU Access Types
 * @typedef {number} SKUAccessType
 * ### For subscriptions, there are two types of access levels you can offer to users:
 * - Guild Subscriptions: A subscription purchased by a user and applied to a single server. Everyone in that server gets your premium benefits.
 * - User Subscriptions: A subscription purchased by a user for themselves. They get access to your premium benefits in every server.
 */

/**
 * @summary [Sku Type]{@link https://discord.com/developers/docs/game-sdk/store#data-models-skutype-enum}
 * @typedef {number} SKUType
 * - For subscriptions, SKUs will have a type of either `SUBSCRIPTION` represented by `type: 5` or `SUBSCRIPTION_GROUP` represented by `type: 6`.
 * - For any current implementations, you will want to use the SKU defined by `type: 5`.
 * - A `SUBSCRIPTION_GROUP` is automatically created for each `SUBSCRIPTION` SKU and are not used at this time.
 * 
 * | Type | ID | Description |
 * |-----------------|---|-------------|
 * | Subscription    | 5 | Represents a recurring subscription |
 * | Scription_Group | 6 | System-generated group for each SUBSCRIPTION SKU created |
 */

/**
 * @summary [SkuPrice]{@link https://discord.com/developers/docs/game-sdk/store#data-models-skuprice-struct}
 * @typedef {Object} SkuPrice
 * @property {Uint32Array} Amount
 * @property {string} Currency
 */

/**
 * @summary [Entitlement Type]{@link https://discord.com/developers/docs/game-sdk/store#data-models-entitlementtype-enum}
 * @typedef {number} EntitlementType
 * | Type | ID    | Description |
 * |------|-------|-------------|
 * | Application Subscription| 8 | Entitlement was purchased as an app subscription |
 */

/**
 * @ignore
 * @typedef {Object} PartialEntitlement
 * @property {Snowflake} id - ID of the entitlement
 * @property {Snowflake} sku_id - ID of the SKU
 * @property {Snowflake} application_id
 * @property {number} gift_code_flags - ???
 * @property {boolean} deleted - ???
 * @property {Snowflake} promotion_id - ???
 * @property {Snowflake} [user_id]
 * @property {Snowflake} [guild_id]
 * @property {EntitlementType} type - The [type of entitlement]{@link https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-types}
 * @property {boolean} consumed - Not applicable for App Subscriptions. Subscriptions are not consumed and will be `false`.
 */
/**
 * @summary [Entitlement]{@link https://discord.com/developers/docs/game-sdk/store#data-models-entitlement-struct}
 * @typedef {Object} Entitlement
 * @property {Snowflake} id - ID of the entitlement
 * @property {Snowflake} sku_id - ID of the SKU
 * @property {Snowflake} application_id
 * @property {Snowflake} subscription_id - ???
 * @property {number} gift_code_flags - ???
 * @property {boolean} deleted - ???
 * @property {Snowflake} promotion_id - ???
 * @property {Snowflake} [user_id]
 * @property {Snowflake} [guild_id]
 * @property {EntitlementType} type - The [type of entitlement]{@link https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-types}
 * @property {boolean} consumed - Not applicable for App Subscriptions. Subscriptions are not consumed and will be `false`.
 * @property {ISO8601Timestamp} [starts_at] - Start date at which the entitlement is valid. Not present when using test entitlements
 * @property {ISO8601Timestamp} [ends_at] - Date at which the entitlement is no longer valid. Not present when using test entitlements
 */

/**
     * A Discord locale string, possible values are:
     * * en-US (English, US)
     * * en-GB (English, UK)
     * * bg (Bulgarian)
     * * zh-CN (Chinese, China)
     * * zh-TW (Chinese, Taiwan)
     * * hr (Croatian)
     * * cs (Czech)
     * * da (Danish)
     * * nl (Dutch)
     * * fi (Finnish)
     * * fr (French)
     * * de (German)
     * * el (Greek)
     * * hi (Hindi)
     * * hu (Hungarian)
     * * it (Italian)
     * * ja (Japanese)
     * * ko (Korean)
     * * lt (Lithuanian)
     * * no (Norwegian)
     * * pl (Polish)
     * * pt-BR (Portuguese, Brazilian)
     * * ro (Romanian, Romania)
     * * ru (Russian)
     * * es-ES (Spanish)
     * * sv-SE (Swedish)
     * * th (Thai)
     * * tr (Turkish)
     * * uk (Ukrainian)
     * * vi (Vietnamese)
     * @see {@link https://discord.com/developers/docs/reference#locales}
     * @typedef {string} Locale
     */

// @ts-ignore
const Locale = {
  Indonesian: 'id',
  EnglishUS: 'en-US',
  EnglishGB: 'en-GB',
  Bulgarian: 'bg',
  ChineseCN: 'zh-CN',
  ChineseTW: 'zh-TW',
  Croatian: 'hr',
  Czech: 'cs',
  Danish: 'da',
  Dutch: 'nl',
  Finnish: 'fi',
  French: 'fr',
  German: 'de',
  Greek: 'el',
  Hindi: 'hi',
  Hungarian: 'hu',
  Italian: 'it',
  Japanese: 'ja',
  Korean: 'ko',
  Lithuanian: 'lt',
  Norwegian: 'no',
  Polish: 'pl',
  PortugueseBR: 'pt-BR',
  Romanian: 'ro',
  Russian: 'ru',
  SpanishES: 'es-ES',
  Swedish: 'sv-SE',
  Thai: 'th',
  Turkish: 'tr',
  Ukrainian: 'uk',
  Vietnamese: 'vi'
};

/**
 * A type alias representing a locale string, which is one of the available Discord locales
 *
 * @typedef {Locale} LocaleString
 */

/**
 * A type alias representing a partial localization map, which maps Discord locales to localized strings
 *
 * @global
 * @typedef {Object<LocaleString, string | null>} LocalizationMap
 */

/**
 * @global
 */

/**
 * @summary [Button Component]{@link https://discord.com/developers/docs/interactions/message-components#buttons}
 * - An Action Row can contain up to 5 buttons
 * - An Action Row containing buttons cannot also contain any select menu components
 * @typedef {Object} Button
 * @property {ComponentType} type - The type of the component (2 for button).
 * @property {ButtonStyle} style - The button's [style]{@link ButtonStyle}
 * @property {string} [label] - Text that appears on the button; max 80 characters
 * @property {PartialEmoji} [emoji] - The emoji to be displayed on the button.
 * @property {string} [custom_id] - Developer-defined identifier for the button; max 100 characters
 * @property {string} [url] - URL for link-style buttons
 * @property {boolean} [disabled=false] - Whether the button is disabled.
 */

/**
 * @summary [Select Menu Component]{@link https://discord.com/developers/docs/interactions/message-components#select-menus}
 * @typedef {Object} SelectMenu
 * @property {ComponentType} type - The [type]{@link ComponentType} of the component (3-8 for select menus).
 * @property {string} custom_id - A unique identifier for the select menu.
 * @property {SelectOption[]} [options] - Specified choices in a select menu (only required and available for string selects (type `3`); max 25
 * @property {ChannelType} [channel_types] - List of channel types to include in the channel select component (type `8`)
 * @property {string} [placeholder] - The text to be displayed when no option is selected.
 * @property {number} [min_values=1] - Minimum number of items that must be chosen; min 0, max 25
 * @property {number} [max_values=1] - Maximum number of items that can be chosen; max 25
 * @property {boolean} [disabled=false] - Whether the button is disabled.
 */

/** 
 * @summary [Select Menu Option]{@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
 * @typedef {Object} SelectOption
 * @property {string} label - User-facing name of the option; max 100 characters
 * @property {string} value - Dev-defined value of the option; max 100 characters
 * @property {string} [description] - Additional description of the option; max 100 characters
 * @property {PartialEmoji} [emoji] - The emoji to be displayed for the option.
 * @property {boolean} [default=false] - Will show this option as selected by default
 */

/**
 * @summary Text Input Component ([Modal]{@link https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure})
 * @typedef {Object} Modal
 * @property {ComponentType} type - The type of the component (`4` for text input)
 * @property {string} custom_id - Developer-defined identifier for the input; max 100 characters
 * @property {TextInputStyle} style - The [text input style]{@link TextInputStyle}
 * @property {string} label - Label for this component; max 45 characters
 * @property {number} [min_length] - Minimum input length for a text input; min 0, max 4000
 * @property {number} [max_length] - Maximum input length for a text input; min 1, max 4000
 * @property {boolean} [required=true] - Whether this component is required to be filled
 * @property {string} [value] - Pre-filled value for this component; max 4000 characters
 * @property {string} [placeholder] - Custom placeholder text if the input is empty; max 100 characters
 */

/**
 * @summary [Action Rows]{@link https://discord.com/developers/docs/interactions/message-components#action-rows}
 * An Action Row is a non-interactive container component for other types of components.
 * 
 * It has a `type: 1` and a sub-array of [Message Components]{@link MessageComponent}
 * - You can have up to 5 Action Rows per message
 * - An Action Row cannot contain another Action Row
 * @example
 * {
 *   content: 'This is a Components array with an Action Row,
 *   components: [
 *     {
 *       type: 1,
 *       components: []
 *     }
 *   ]
 * }
 * // @property {MessageComponent[] | InteractionData[]} components
 * 
 * @template {MessageActionRow | Modal} C
 * @typedef {Object} ActionRow
 * @property {C[]} components - Placeholder for components
 * @property {number} type - Must be 1 for 'ACTION_ROW'
 */
// @template {MessageActionRow | Modal} C
// @template {ActionRowComponentTypes} C

/*
 * @template C
 * @typedef {Object} ActionRow
 * @property {C[]} components - Placeholder for components
 * @property {1} type - Must be 1 for 'ACTION_ROW'
 */

/**
 * @typedef {Button | SelectMenu} MessageActionRow
 * A variety of message component types
 * - [Button]{@link Button}
 * - [Select Menu]{@link SelectMenu}
 */

/**
 * @summary [Message Components]{@link https://discord.com/developers/docs/interactions/message-components#message-components}
 * A framework for adding interactive elements to the messages your app or bot sends.
 * - The top-level `components` field is an array of [Action Row]{@link ActionRow} components.
 * @example
 * {
 *   content: 'This is a components field with a button component',
 *   components: [
 *     {
 *       type: 1,
 *       components: [
 *         {
 *           type: 2,
 *           label: 'Click me!',
 *           style: 1,
 *           custom_id: 'click_one'
 *         }
 *       ]
 *     }
 *   ]
 * }
 * @typedef {Array<ActionRow<Button | SelectMenu | Modal>>} Component
 */

/**
 * @summary [Interaction Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type}
 * | Type | Value |
 * |------|-------|
 * | Ping | 1 |
 * | Application Command | 2 |
 * | Message Component | 3 |
 * | Application Command Autocomplete | 4 |
 * | Modal Submit | 5 |
 * @typedef {number} InteractionType
 */


/**
 * @summary [Application Command Interaction Data Option]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-interaction-data-option-structure}
 * - All options have names, and an option can either be a parameter and input value--in which case `value` will be set--or it can denote a subcommand or group--in which case it will contain a top-level key and another array of `options`.
 * - `value` and `options` are mutually exclusive
 * @typedef {Object} ApplicationCommandInteractionDataOption
 * @property {string} name
 * @property {ApplicationCommandOptionType} type
 * @property {string | number | boolean} [value]
 * @property {ApplicationCommandInteractionDataOption[]} [options]
 * @property {boolean} [focused]
 */

/**
 * @summary [Application Command Data]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-data-structure}
 * - Sent in `APPLICATION_COMMAND` AND `APPLICATION_COMMAND_AUTOCOMPLETE` interactions.
 * @typedef {Object} ApplicationCommandInteractionData
 * @property {Snowflake} id
 * @property {string} name
 * @property {ApplicationCommandType} type
 * @property {ResolvedData} [resolved]
 * @property {ApplicationCommandInteractionDataOption[]} [options]
 * @property {Snowflake} guild_id
 * @property {Snowflake} [target_id]
 */

/**
 * @summary [Resolved Data]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-resolved-data-structure}
 * - Partial Member objects are missing `user`, `deaf` and `mute` fields.
 * - Partial Channel objects only have `id`, `name`, `type` and `permissions` fields.
 * - Threads will also have `thread_metadata` and `parent_id` fields.
 * @typedef {Object} ResolvedData
 * @property {Object<Snowflake, User>} [users] - The ids and [User]{@link https://discord.com/developers/docs/resources/user#user-object} objects
 * @property {Object<Snowflake, MemberParams>} [members] - The ids and partial [Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object} objects
 * @property {Object<Snowflake, Role>} [roles] - The ids and [Role]{@link https://discord.com/developers/docs/topics/permissions#role-object} objects
 * @property {Object<Snowflake, Channel>} [channels] - The ids and partial [Channel]{@link https://discord.com/developers/docs/resources/channel#channel-object} objects
 * @property {Object<Snowflake, Message>} [messages] - The ids and partial [Message]{@link https://discord.com/developers/docs/resources/channel#message-object} objects
 * @property {Object<Snowflake, Attachment>} [attachments] - The ids and [Attachment]{@link https://discord.com/developers/docs/resources/channel#attachment-object} objects
 */

/**
 * @typedef {Object} MessageComponentInteractionData
 * @property {string} custom_id
 * @property {ComponentType} component_type
 * @property {string[]} [values]
 */

/**
 * @typedef {Object} ModalSubmitComponentData
 * @property {string} value - Input value for text input
 * @property {ComponentType} type - The type of the component (4 for Modal).
 * @property {string} custom_id - Custom ID of the text input field
 */

/**
 * @typedef {Object} ModalSubmitInteractionData
 * @property {string} custom_id
 * @property {Array<ActionRow<ModalSubmitComponentData>>} [components]
 */

/**
 * @summary [Interaction Data]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-data}
 * @typedef {ModalSubmitInteractionData | ApplicationCommandInteractionData | MessageComponentInteractionData} InteractionData
 */

/**
 * @typedef {Object} ExtendedPayload
 * @property {User} [user]
 * @property {Member} [member]
 * @property {Interaction} [interaction]
 * @property {Message} [message]
 * @property {Channel} channel
 * @property {string} [username]
 * @property {Snowflake} [guild_id]
 * @property {Snowflake} [user_id]
 * @property {Snowflake} [id]
 * @property {User} [author]
 * @property {User} [inviter]
 * @property {User} [target_user]
 * @property {ISO8601Timestamp} [created_at]
 * @property {Message[]} [mentions]
 * @property {string[]} [badges]
 * @property {string} [nick]
 * @property {ResolvedData} [data]
 * @property {string} [url]
 * @property {number} [uses]
 * @property {number} [max_uses]
 * @property {number} [max_age]
 * @property {boolean} [temporary]
 */