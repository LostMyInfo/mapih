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
 */
type Locale = string;
declare namespace Locale {
    const Indonesian: string;
    const EnglishUS: string;
    const EnglishGB: string;
    const Bulgarian: string;
    const ChineseCN: string;
    const ChineseTW: string;
    const Croatian: string;
    const Czech: string;
    const Danish: string;
    const Dutch: string;
    const Finnish: string;
    const French: string;
    const German: string;
    const Greek: string;
    const Hindi: string;
    const Hungarian: string;
    const Italian: string;
    const Japanese: string;
    const Korean: string;
    const Lithuanian: string;
    const Norwegian: string;
    const Polish: string;
    const PortugueseBR: string;
    const Romanian: string;
    const Russian: string;
    const SpanishES: string;
    const Swedish: string;
    const Thai: string;
    const Turkish: string;
    const Ukrainian: string;
    const Vietnamese: string;
}
type Snowflake = string;
type ISO8601Timestamp = string;
type PermNames = "ADD_REACTIONS" | "ADMINISTRATOR" | "ATTACH_FILES" | "BAN_MEMBERS" | "CHANGE NICKNAME" | "CONNECT" | "CREATE_INSTANT_INVITE" | "CREATE_PRIVATE_THREADS" | "CREATE_PUBLIC_THREADS" | "DEAFEN_MEMBERS" | "EMBED_LINKS" | "KICK_MEMBERS" | "MANAGE_CHANNELS" | "MANAGE_EMOJIS_AND_STICKERS" | "MANAGE_EVENTS" | "MANAGE_SERVER" | "MANAGE_MESSAGES" | "MANAGE_NICKNAMES" | "MANAGE_ROLES" | "MANAGE_THREADS" | "MANAGE_WEBHOOKS" | "MENTION_EVERYONE" | "MODERATE_MEMBERS" | "MOVE_MEMBERS" | "MUTE_MEMBERS" | "PRIORITY_SPEAKER" | "READ_MESSAGE_HISTORY" | "REQUEST_TO_SPEAK" | "SEND_MESSAGES" | "SEND_MESSAGES_IN_THREADS" | "SEND_TTS_MESSAGES" | "SPEAK" | "VIDEO" | "USE_APPLICATION_COMMANDS" | "USE_EMBEDDED_ACTIVITIES" | "USE_EXTERNAL_EMOJIS" | "USE_EXTERNAL_STICKERS" | "USE_VOICE_ACTIVITY" | "VIEW_AUDIT_LOG" | "VIEW_CHANNEL" | "VIEW_SERVER_INSIGHTS";
type UserFlags = 'Discord Employee' | 'Partnered Server Owner' | 'HypeSquad Events Member' | 'Bug Hunter Level 1' | 'House Bravery Member' | 'House Brilliance Member' | 'House Balance Member' | 'Early Nitro Supporter' | 'User is a team' | 'Bug Hunter Level 2' | 'Verified Bot' | 'Early Verified Bot Developer' | 'Discord Certified Moderator' | 'Interactions Handler' | 'Active Developer';
/**
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
type OAuth2Scopes = 'activities.read' | 'activites.write' | 'applications.builds.read' | 'applications.builds.upload' | 'applications.commands' | 'applications.commands.update' | 'applications.commands.permissions.update' | 'applications.entitlements' | 'applications.store.update' | 'bot' | 'connections' | 'dm_channels.read' | 'email' | 'gdm.join' | 'guilds' | 'guilds.join' | 'guilds.members.read' | 'identify' | 'messages.read' | 'relationships.read' | 'role_connections.write' | 'rpc' | 'rpc.activities.write' | 'rpc.notifications.read' | 'rpc.voice.read' | 'rpc.voice.write' | 'voice' | 'webhook.incoming';
type AccessTokenResponse = {
    /**
     * - Type of token
     */
    token_type: string;
    access_token: string;
    refresh_token: string;
    scope: OAuth2Scopes[];
    expires_in: number;
};
type ApplicationCommand = {
    id: Snowflake;
    /**
     * - [Type of command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types}. Defaults to `1`.
     */
    type?: number | undefined;
    trueType: string;
    /**
     * - ID of the parent application
     */
    application_id: Snowflake;
    /**
     * - Guild ID of the command, if not global
     */
    guild_id?: string | undefined;
    /**
     * - [Name of command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming} (1-32 characters)
     */
    name: string;
    /**
     * - Localization dictionary for `name` field. [Available locales]{@link https://discord.com/developers/docs/reference#locales}
     */
    name_localizations?: LocalizationMap;
    /**
     * - Description for `CHAT_INPUT` commands, 1-100 characters. Empty string for `USER` and `MESSAGE` commands.
     */
    description: string;
    /**
     * - Localization dictionary for `description` field.
     */
    description_localizations?: LocalizationMap;
    /**
     * - Parameters for the command, max of 25.
     */
    options?: ApplicationCommandOption[] | undefined;
    /**
     * - Set of permissions represented as a bit set.
     */
    default_member_permissions: string;
    /**
     * - Indicates whether the command is available in DMs with the app, only for globally-scoped commands.
     */
    dm_permission?: boolean | undefined;
    /**
     * - Indicates whether the command is age-restricted.
     */
    nsfw?: boolean | undefined;
    /**
     * - Autoincrementing version identifier updated during substantial record changes
     *
     * Set `default_member_permissions` to "0" to disable the command for everyone except admins by default,
     * and/or set dm_permission to false to disable globally-scoped commands inside of DMs with your app
     */
    version: Snowflake;
};
type ApplicationCommandOption = {
    /**
     * - [Type of command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
     */
    type: ApplicationCommandOptionType;
    /**
     * - [Name of command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming} (1-32 characters)
     */
    name: string;
    /**
     * - Localization dictionary for `name` field. [Available locales]{@link https://discord.com/developers/docs/reference#locales}
     */
    name_localizations?: LocalizationMap;
    /**
     * - Description for `CHAT_INPUT` commands, 1-100 characters. Empty string for `USER` and `MESSAGE` commands.
     */
    description: string;
    /**
     * - Localization dictionary for `description` field.
     */
    description_localizations?: LocalizationMap;
    /**
     * - If the parameter is required or optional
     */
    required?: boolean | undefined;
    /**
     * - Choices for `STRING`, `INTEGER`, and `NUMBER` types for the user to pick from, max 25
     */
    choices?: ApplicationCommandOptionChoice | undefined;
    /**
     * - If the option is a subcommand or subcommand group type, these nested options will be the parameters
     */
    options?: ApplicationCommandOption[] | undefined;
    /**
     * - If the option is a channel type, the channels shown will be restricted to these types
     */
    channel_types?: number | undefined;
    /**
     * - For `INTEGER` options, double for NUMBER options	If the option is an INTEGER or NUMBER type, the minimum value permitted
     */
    min_value?: number | undefined;
    /**
     * - For `INTEGER` options, double for NUMBER options	If the option is an INTEGER or NUMBER type, the maximum value permitted
     */
    max_value?: number | undefined;
    /**
     * - For `STRING` options, the minimum allowed length (minimum of 0, maximum of 6000)
     */
    min_length?: number | undefined;
    /**
     * - For `STRING` options, the maximum allowed length (minimum of 1, maximum of 6000)
     */
    max_length?: number | undefined;
    /**
     * - If autocomplete interactions are enabled for this 'STRING`, `INTEGER`, or `NUMBER` type option
     */
    autocomplete?: boolean | undefined;
};
type ApplicationCommandOptionChoice = {
    /**
     * - 1-100 character choice name
     */
    name: string;
    /**
     * - Localization dictionary for `name` field. [Available locales]{@link https://discord.com/developers/docs/reference#locales}
     */
    name_localizations?: LocalizationMap;
    /**
     * - Value for the choice, up to 100 characters if string
     */
    value: string | number;
};
/**
 * | name  | type | description |
 * |-------|------|-------------|
 * | Chat Input | 1 | Slash commands; a text-based command that shows up when a user types
 * | User       | 2 | A UI-based command that shows up when you right click or tap on a user
 * | Message    | 3 | A UI-based command that shows up when you right click or tap on a message
 */
type ApplicationCommandType = number;
/**
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
 * | Attachment        | 11 | {@link Attachment }
 */
type ApplicationCommandOptionType = number;
type Presence = {
    userid: Snowflake;
    newStatus: 'online' | 'offline' | 'idle' | 'dnd';
    oldStatus?: "idle" | "offline" | "online" | "dnd" | undefined;
};
type ClientStatus = {
    /**
     * - User's status set for an active desktop (Windows, Linux, Mac) application session
     */
    desktop?: string | undefined;
    /**
     * - User's status set for an active mobile (iOS, Android) application session
     */
    mobile?: string | undefined;
    /**
     * - User's status set for an active web (browser, bot user) application session
     */
    web?: string | undefined;
};
type Sticker = {
    /**
     * - ID of the sticker
     */
    id: string;
    /**
     * - Name of the sticker
     */
    name: string;
    /**
     * - For standard stickers, ID of the pack the sticker is from
     */
    pack_id?: string | undefined;
    /**
     * - Description of the sticker
     */
    description: string | null;
    /**
     * - Autocomplete/suggestion tags for the sticker (max 200 characters)
     */
    tags: string;
    /**
     * - Deprecated
     */
    asset?: string | undefined;
    /**
     * - [Type of sticker]{@link https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types}
     */
    type: StickerType;
    /**
     * - [Type of sticker format]{@link https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types}
     */
    format_type: StickerFormatType;
    /**
     * - Whether this guild sticker can be used, may be false due to loss of Server boosts
     */
    available?: boolean | undefined;
    /**
     * - ID of the guild that owns this sticker
     */
    guild_id?: string | undefined;
    /**
     * - The [user]{@link User } that created this sticker
     */
    user?: User | undefined;
    /**
     * - The standard sticker's sort order within its pack
     */
    sort_value?: number | undefined;
};
/**
 * | Name | Value | Description |
 * |------|-------|-------------|
 * | Standard | 1 | Official sticker in a pack, part of Nitro or in a removed purchasable pack |
 * | Guild    | 2 | A Sticker uploaded to a guild for the guild's members |
 */
type StickerType = number;
type StickerPack = {
    /**
     * - ID of the sticker pack
     */
    id: string;
    /**
     * - The stickers in the pack
     */
    stickers: Sticker[];
    /**
     * - Name of the sticker pack
     */
    name: string;
    /**
     * - ID of the pack's SKU
     */
    sku_id: string;
    /**
     * - ID of a sticker in the pack which is shown as the pack's icon
     */
    cover_sticker_id?: string | undefined;
    /**
     * - Description of the sticker pack
     */
    description: string;
    /**
     * - ID of the sticker pack's [banner image]{@link https://discord.com/developers/docs/reference#image-formatting}
     */
    banner_asset_id?: string | undefined;
};
/**
 * | Name | Value |
 * |------|-------|
 * | PNG    | 1 |
 * | APNG   | 2 |
 * | LOTTIE | 3 |
 * | GIF    | 4 |
 */
type StickerFormatType = number;
/**
 * Bot Partial Activity Object
 */
type BotActivity = {
    /**
     * - [Activity Type]{@link https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types}
     */
    type: ActivityType;
    name: string;
    /**
     * - User's current party status, or text used for custom status
     */
    state?: string | null | undefined;
    /**
     * - Stream URL, is validated when type is 1
     */
    url?: string | null | undefined;
};
type Activity = {
    /**
     * - Activity's name
     */
    name: string;
    /**
     * - [Type of Activity]{@link https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types}
     */
    type: ActivityType;
    /**
     * - Stream URL, is validated when type is 1
     */
    url?: string | null | undefined;
    /**
     * - Unix timestamp (in milliseconds) of when the activity was added to the user's session
     */
    created_at: number;
    /**
     * - Unix timestamps for start and/or end of the game
     */
    timestamps?: {
        start: number | null;
        end: number | null;
    } | undefined;
    /**
     * - Application ID for the game
     */
    application_id?: string | undefined;
    /**
     * - What the player is currently doing
     */
    details?: string | null | undefined;
    /**
     * - User's current party status
     */
    state?: string | null | undefined;
    /**
     * - Emoji used for custom status
     */
    emoji?: PartialEmoji | null | undefined;
    /**
     * - Information for the current party of the player
     */
    party?: {
        id: string;
        size: Array<number>;
    } | undefined;
    /**
     * - Images for the presence and their hover texts
     */
    assets?: {
        large_image: string;
        large_text: string;
        small_image: string;
        small_text: string;
    } | undefined;
    /**
     * - Secrets for Rich Presence joining and spectating
     */
    secrets?: {
        join: string;
        spectate: string;
        match: string;
    } | undefined;
    /**
     * - Whether or not the activity is an instanced game session
     */
    instance?: boolean | undefined;
    /**
     * - [Activity Flags]{@link https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-flags} OR d together, describes what the payload includes
     */
    flags: number | null;
    /**
     * - Custom buttons shown in the Rich Presence (max 2)
     */
    buttons?: {
        label: string;
        url: string;
    }[] | undefined;
};
/**
 * | ID | Name | Format | Example |
 * |----|------|--------|---------|
 * | 0  | Game | Playing {name} | "Playing Rocket League" |
 * | 1  | Streaming | Streaming {details} | "Streaming Rocket League" |
 * | 2  | Listening | Listening to {name} | "Listening to Spotify" |
 * | 3  | Watching  | Watching {name}     | "Watching YouTube Together" |
 * | 4  | Custom    | {emoji} {name}      | ":smiley: I am cool" |
 * | 5  | Competing | Competing in {name} | "Competing in Arena World Champions" |
 */
type ActivityType = number;
/**
 * | Name | Value |
 * |------|-------|
 * | Stream  | 1  |
 * | Embedded Application | 2  |
 */
type InviteTargetType = number;
type Invite = {
    /**
     * - The invites code
     */
    code: string;
    /**
     * - The guild the invite originated from
     */
    guild?: PartialInviteGuild | undefined;
    /**
     * - The channel the invite is for
     */
    channel: PartialChannel;
    /**
     * - The user who created the invite
     */
    inviter?: User | undefined;
    /**
     * - The [type of target]{@link https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types} for this voice channel invite
     */
    target_type?: number | undefined;
    /**
     * - The user whose stream to display for this voice channel stream invite
     */
    target_user?: User | undefined;
    /**
     * - The embedded application to open for this voice channel embedded application
     */
    target_application?: Object | undefined;
    /**
     * - Approximate count of online members, returned from the `GET /invites/<code>` endpoint when `with_counts` is `true`
     */
    approximate_presence_count?: number | undefined;
    /**
     * - Approximate count of total members, returned from the `GET /invites/<code>` endpoint when `with_counts` is `true`
     */
    approximate_member_count?: number | undefined;
    /**
     * - The expiration date of this invite, returned from the `GET /invites/<code>` endpoint when `with_expiration` is `true`
     */
    expires_at?: string | undefined;
    /**
     * - The guild scheduled event data, returned from the `GET /invites/<code>` endpoint when `guild_scheduled_event_id` is a valid guild scheduled event id
     */
    guild_scheduled_event?: GuildScheduledEvent | undefined;
};
type ExtendedInvite = {
    /**
     * - The invites code
     */
    code: string;
    /**
     * - The invite link
     */
    url: string;
    /**
     * - The guild the invite originated from
     */
    guild?: PartialInviteGuild | undefined;
    /**
     * - The channel the invite is for
     */
    channel?: PartialChannel | undefined;
    /**
     * - The user who created the invite
     */
    inviter?: User | undefined;
    /**
     * - The [type of target]{@link https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types} for this voice channel invite
     */
    target_type?: number | undefined;
    /**
     * - The user whose stream to display for this voice channel stream invite
     */
    target_user?: User | undefined;
    /**
     * - The embedded application to open for this voice channel embedded application
     */
    target_application?: Object | undefined;
    /**
     * - Approximate count of online members, returned from the `GET /invites/<code>` endpoint when `with_counts` is `true`
     */
    approximate_presence_count?: number | undefined;
    /**
     * - Approximate count of total members, returned from the `GET /invites/<code>` endpoint when `with_counts` is `true`
     */
    approximate_member_count?: number | undefined;
    /**
     * - The expiration date of this invite, returned from the `GET /invites/<code>` endpoint when `with_expiration` is `true`
     */
    expires_at?: string | undefined;
    /**
     * - The guild scheduled event data, returned from the `GET /invites/<code>` endpoint when `guild_scheduled_event_id` is a valid guild scheduled event id
     */
    guild_scheduled_event?: GuildScheduledEvent | undefined;
    /**
     * - Number of times this invite has been used
     */
    uses: number;
    /**
     * - Max number of times this invite can be used
     */
    max_uses: number;
    /**
     * - Duration (in seconds) after which the invite expires
     */
    max_age: number;
    /**
     * - Whether this invite only grants temporary membership
     */
    temporary: boolean;
    /**
     * - When this invite was created
     */
    created_at: ISO8601Timestamp;
};
type ExtendedUser = {
    badges: UserFlags[];
    created_at: Date;
    /**
     * The user's id
     */
    id: Snowflake;
    /**
     * - The user's username
     */
    username: string;
    /**
     * - The user's 4-digit discord-tag
     */
    discriminator: string;
    global_name: string;
    display_name?: string | undefined;
    /**
     * - The user's avatar hash
     */
    avatar: string | null;
    /**
     * - The user's avatar URL (only when retrieving user with API)
     */
    avatarURL?: string | null | undefined;
    avatar_decoration_data: {
        sku_id: Snowflake;
        asset: string;
    } | null;
    /**
     * - Whether the user belongs to an OAuth2 application
     */
    bot?: boolean | undefined;
    /**
     * - Whether the user is an Official Discord System user
     */
    system?: boolean | undefined;
    /**
     * - Whether the user has two factor enabled
     */
    mfa_enabled?: boolean | undefined;
    /**
     * - The user's banner hash
     */
    banner?: string | null | undefined;
    /**
     * - The user's banner URL (only when retrieving user with API)
     */
    bannerURL?: string | null | undefined;
    /**
     * - The user's banner color encoded as an integer representation of a hex code
     */
    accent_color?: number | null | undefined;
    /**
     * - The user's chosen language option
     */
    locale?: string | undefined;
    /**
     * - Whether the email on this account has been verified
     */
    verified?: boolean | undefined;
    /**
     * - The user's email
     */
    email?: string | null | undefined;
    /**
     * - The flags on a user's account
     */
    flags?: number | undefined;
    /**
     * - The [type of Nitro subscription]{@link https://discord.com/developers/docs/resources/user#user-object-premium-types} on a user's account
     */
    premium_type?: number | undefined;
    /**
     * - The public flags on a user's account
     */
    public_flags: number;
};
type User = {
    badges: UserFlags[];
    created_at: Date;
    /**
     * The user's id
     */
    id: Snowflake;
    /**
     * - The user's username
     */
    username: string;
    /**
     * - The user's 4-digit discord-tag
     */
    discriminator: string;
    global_name: string;
    display_name?: string | undefined;
    /**
     * - The user's avatar hash
     */
    avatar: string | null;
    /**
     * - The user's avatar URL (only when retrieving user with API)
     */
    avatarURL?: string | null | undefined;
    avatar_decoration_data: {
        sku_id: Snowflake;
        asset: string;
    } | null;
    /**
     * - Whether the user belongs to an OAuth2 application
     */
    bot?: boolean | undefined;
    /**
     * - Whether the user is an Official Discord System user
     */
    system?: boolean | undefined;
    /**
     * - The public flags on a user's account
     */
    public_flags: number;
    /**
     * - The [type of Nitro subscription]{@link https://discord.com/developers/docs/resources/user#user-object-premium-types} on a user's account
     */
    premium_type?: number | undefined;
};
/**
 * | Type | Value |
 * |------|-------|
 * | None          | 0 |
 * | Nitro Classic | 1 |
 * | Nitro         | 2 |
 * | Nitro Basic   | 3 |
 */
type NitroPremiumType = number;
type Emoji = {
    /**
     * - ID of the emoji
     */
    id: string | null;
    /**
     * - Name of the avatar. Can be `null` only in reaction emoji objects.
     */
    name: string | null;
    /**
     * - Role allowed to use this emoji. Array of [role object]{@link https://discord.com/developers/docs/topics/permissions#role-object} ids
     */
    roles?: string[] | undefined;
    /**
     * - {@link User } that created this emoji.
     */
    user?: User | undefined;
    /**
     * - Whether this emoji must be wrapped in colons.
     */
    require_colons?: boolean | undefined;
    /**
     * - Whether this emoji is animated.
     */
    animated?: boolean | undefined;
    /**
     * - Whether this emoji is managed.
     */
    managed?: boolean | undefined;
    /**
     * - Whether this emoji can be used, may be false due to loss of Server Boosts.
     */
    available?: boolean | undefined;
};
type Guild = {
    /**
     * - Guild name (2-100 characters, excluding trailing and leading whitespace)
     */
    name: string;
    /**
     * - Guild ID
     */
    id: Snowflake;
    /**
     * - True if [the user]{@link https://discord.com/developers/docs/resources/user#get-current-user-guilds} is the owner of the guild
     */
    owner?: boolean | undefined;
    /**
     * - ID of guild owner
     */
    owner_id: Snowflake;
    /**
     * - Description of the guild
     */
    description?: string | undefined;
    /**
     * - [Icon hash]{@link https://discord.com/developers/docs/reference#image-formatting}
     */
    icon: string | null;
    /**
     * - [Icon hash]{@link https://discord.com/developers/docs/reference#image-formatting}, returned when in the template object
     */
    icon_hash?: string | null | undefined;
    /**
     * - Splash hash
     */
    splash: string | null;
    /**
     * - Discovery splash hash; only present for guilds with the `DISCOVERABLE` feature
     */
    discovery_splash: string | null;
    /**
     * - Banner hash
     */
    banner: string | null;
    /**
     * - Total permissions for [the user]{@link https://discord.com/developers/docs/resources/user#get-current-user-guilds} in the guild (excludes overwrites)
     */
    permissions?: string | undefined;
    /**
     * - ID of the afk channel
     */
    afk_channel_id: Snowflake | null;
    /**
     * - afk timeout in seconds, can be set to: 60, 300, 900, 1800, 3600
     */
    afk_timeout: number;
    /**
     * - True if the server widget is enabled
     */
    widget_enabled?: boolean | undefined;
    /**
     * - The channel id that the widget will generate an invite to, or `null` if set to no invite
     */
    widget_channel_id?: string | null | undefined;
    /**
     * - [Verification level]{@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level} required for the guild
     */
    verification_level: GuildVerificationLevel;
    /**
     * - [Default Message Notifications] {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
     */
    default_message_notifications: DefaultMessageNotificationLevel;
    /**
     * - [Explicit content filter level]{@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
     */
    explicit_content_filter: ExplicitContentFilterLevel;
    /**
     * - Role in the guild
     */
    roles: Role[];
    /**
     * - Custom guild emojis
     */
    emojis: Emoji[];
    /**
     * - Enabled guild features
     */
    features: GuildFeatures[];
    /**
     * - Required [MFA level]{@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level} for the guild
     */
    mfa_level: GuildMFALevel;
    /**
     * - Application id of the guild creator if it is bot-created
     */
    application_id: Snowflake | null;
    /**
     * - The id of the channel where guild notices such as welcome messages and boost events are posted
     */
    system_channel_id: Snowflake | null;
    /**
     * - [System channel flags]{@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags}
     */
    system_channel_flags: number;
    /**
     * - The id of the channel where Community guilds can display rules and/or guidelines
     */
    rules_channel_id: Snowflake | null;
    /**
     * - The maximum number of presences for the guild (null is always returned, apart from the largest of guilds)
     */
    max_presences?: number | null | undefined;
    /**
     * - The maximum number of members for the guild
     */
    max_members?: number | undefined;
    /**
     * - The vanity url code for the guild
     */
    vanity_url_code: string | null;
    /**
     * - [Premium tier]{@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier} (Server Boost level)
     */
    premium_tier: number;
    /**
     * - The number of boosts this guild currently has
     */
    premium_subscription_count?: number | undefined;
    /**
     * - The preferred [locale]{@link https://discord.com/developers/docs/reference#locales} of a Community guild; used in server discovery and notices from Discord, and sent in interactions; defaults to "en-US"
     */
    preferred_locale: string;
    /**
     * - The id of the channel where admins and moderators of Community guilds receive notices from Discord
     */
    public_updates_channel_id: Snowflake | null;
    /**
     * - The maximum amount of users in a video channel
     */
    max_video_channel_users?: number | undefined;
    max_stage_video_channel_users?: number | undefined;
    /**
     * - Approximate number of members in this guild, returned from the `GET /guilds/<id>` endpoint when `with_counts` is `true`
     */
    approximate_member_count?: number | undefined;
    /**
     * - Approximate number of non-offline members in this guild, returned from the `GET /guilds/<id>` endpoint when `with_counts` is `true`
     */
    approximate_presence_count?: number | undefined;
    /**
     * - The welcome screen of a Community guild, shown to new members, returned in an [Invite]{@link https://discord.com/developers/docs/resources/invite#invite-object}'s guild object
     */
    welcome_screen?: GuildWelcomeScreen | undefined;
    /**
     * - [Guild's nsfw level]{@link https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level}
     */
    nsfw_level: GuildNSFWLevel;
    /**
     * - Custom guild stickers
     */
    stickers?: Sticker[] | undefined;
    /**
     * - Whether the guild has the boost progress bar enabled
     */
    premium_progress_bar_enabled: boolean;
    emojiCount?: number | undefined;
    stickerCount?: number | undefined;
    channelCount: number;
    roleCount: number;
    icon_url?: string | undefined;
    banner_url?: string | undefined;
    splash_url?: string | undefined;
    discovery_splash_url?: string | undefined;
    inventory_settings: any | null;
};
type VoiceState = {
    /**
     * - The guild ID this voice state is for
     */
    guild_id?: string | undefined;
    /**
     * - The channel ID this user is connected to
     */
    channel_id: Snowflake;
    /**
     * - The user ID this voice state is for
     */
    user_id: Snowflake;
    /**
     * - The guild member this voice state is for
     */
    member?: Member | undefined;
    /**
     * - The session ID for this voice state
     */
    session_id: string;
    /**
     * Whether this user is deafened by the server
     */
    deaf: boolean;
    /**
     * Whether this user is muted by the server
     */
    mute: boolean;
    /**
     * Whether this user is locally deafened
     */
    self_deaf: boolean;
    /**
     * Whether this user is locally muted
     */
    self_mute: boolean;
    /**
     * Whether this user is streaming using "Go Live"
     */
    self_stream?: boolean | undefined;
    /**
     * Whether this user's camera is enabled
     */
    self_video: boolean;
    /**
     * - Whether this user's permission to speak is denied
     */
    suppress: boolean;
    /**
     * - The time at which the user requested to speak
     */
    request_to_speak_timestamp: ISO8601Timestamp;
};
type Channel = {
    /**
     * - The ID of this channel
     */
    id: Snowflake;
    /**
     * - The [type of channel]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
     */
    type: ChannelType;
    trueType: string;
    /**
     * - The id of the guild (may be missing for some channel objects received over gateway guild dispatches)
     */
    guild_id?: string | undefined;
    /**
     * - Sorting position of the channel
     */
    position?: number | undefined;
    /**
     * - Explicit permission overwrites for members and roles
     */
    permission_overwrites?: Overwrite[] | undefined;
    /**
     * - The name of the channel (1-100 characters)
     */
    name?: string | undefined;
    /**
     * - The channel topic (0-4096 characters for GUILD_FORUM channels, 0-1024 characters for all others)
     */
    topic?: string | null | undefined;
    /**
     * - Whether the channel is nsfw
     */
    nsfw?: boolean | undefined;
    /**
     * - The id of the last message sent in this channel (or thread for GUILD_FORUM channels) (may not point to an existing or valid message or thread)
     */
    last_message_id?: string | null | undefined;
    /**
     * - The bitrate (in bits) of the voice channel
     */
    bitrate?: number | undefined;
    /**
     * - The user limit of the voice channel
     */
    user_limit?: number | undefined;
    /**
     * - Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected
     */
    rate_limit_per_user?: number | undefined;
    /**
     * - The recipients of the DM
     */
    recipients?: User[] | undefined;
    /**
     * - Icon hash of the group DM
     */
    icon?: string | null | undefined;
    /**
     * - ID of the creator of the group DM or thread
     */
    owner_id?: string | undefined;
    /**
     * - Application id of the group DM creator if it is bot-created
     */
    application_id?: string | undefined;
    /**
     * - For group DM channels: whether the channel is managed by an application via the `gdm.join` OAuth2 scope
     */
    managed?: boolean | undefined;
    /**
     * - For guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
     */
    parent_id?: string | null | undefined;
    /**
     * - When the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
     */
    last_pin_timestamp?: string | null | undefined;
    /**
     * - [Voice region]{@link https://discord.com/developers/docs/resources/voice#voice-region-object} id for the voice channel, automatic when set to null
     */
    rtc_region?: string | null | undefined;
    /**
     * - The camera [video quality mode]{@link https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes} of the voice channel, 1 when not present
     */
    voice_quality_mode?: number | undefined;
    /**
     * - Number of messages (not including the initial message or deleted messages) in a thread
     */
    message_count?: number | undefined;
    /**
     * - An approximate count of users in a thread, stops counting at 50
     */
    member_count?: number | undefined;
    /**
     * - Thread-specific fields not needed by other channels
     */
    thread_metadata?: ThreadMetadata | undefined;
    /**
     * - Thread member object for the current user, if they have joined the thread, only included on certain API endpoints
     */
    member?: ThreadMember | undefined;
    /**
     * - Default duration, copied onto newly created threads, in minutes, threads will stop showing in the channel list after the specified period of inactivity, can be set to: 60, 1440, 4320, 10080
     */
    default_auto_archive_duration?: number | undefined;
    /**
     * - Computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a slash command interaction
     */
    permissions?: string | undefined;
    /**
     * - [Channel flags]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-flags} combined as a [bitfield]{@link https://en.wikipedia.org/wiki/Bit_field}
     */
    flags: ChannelFlags | null;
    /**
     * - Number of messages ever sent in a thread, it's similar to `message_count` on message creation, but will not decrement the number when a message is deleted
     */
    total_message_sent?: number | undefined;
    /**
     * - The set of tags that can be used in a `GUILD_FORUM` channel
     */
    available_tags?: ForumTag[] | undefined;
    /**
     * - The IDs of the set of tags that have been applied to a thread in a `GUILD_FORUM` channel
     */
    applied_tags?: string[] | undefined;
    /**
     * - The emoji to show in the add reaction button on a thread in a `GUILD_FORUM` channel
     */
    default_reaction_emoji?: DefaultReaction | undefined;
    /**
     * - The initial `rate_limit_per_user` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update.
     */
    default_thread_rate_limit_per_user?: number | undefined;
    /**
     * - The [Default Sort Order Type]{@link https://discord.com/developers/docs/resources/channel#channel-object-sort-order-types} used to order posts in `GUILD_FORUM` channels. Defaults to `null`, which indicates a preferred sort order hasn't been set by a channel admin
     */
    default_sort_order?: number | null | undefined;
    /**
     * - The [Default Forum Layout]{@link https://discord.com/developers/docs/resources/channel#channel-object-forum-layout-types} view used to display posts in `GUILD_FORUM` channels. Defaults to `0`, which indicates a layout view has not been set by a channel admin
     */
    default_forum_layout?: number | undefined;
};
type DMChannel = {
    id: Snowflake;
    /**
     * - The id of the last message sent in this channel
     */
    last_message_id: Snowflake;
    /**
     * - The [type of channel]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
     */
    type: ChannelType;
    /**
     * - [Channel flags]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-flags} combined as a [bitfield]{@link https://en.wikipedia.org/wiki/Bit_field}
     */
    flags: ChannelFlags;
    recipients: User[];
};
type Message = {
    /**
     * - id of the message
     */
    id: Snowflake;
    /**
     * - id of the channel the message was sent in
     */
    channel_id: Snowflake;
    /**
     * - The author of this message
     */
    author: User;
    /**
     * - Contents of the message
     */
    content?: string | undefined;
    /**
     * - When this message was sent
     */
    timestamp: ISO8601Timestamp;
    /**
     * - When this message was edited (or null if never edited)
     */
    edited_timestamp: ISO8601Timestamp | null;
    /**
     * - Whether this was a TTS message
     */
    tts: boolean;
    /**
     * - Whether this message mentions everyone
     */
    mention_everyone: boolean;
    /**
     * - Users specifically mentioned in the message
     */
    mentions: User[];
    /**
     * - Roles specifically mentioned in this message
     */
    mention_roles: string[];
    /**
     * - Channels specifically mentioned in this messag
     */
    mention_channels?: ChannelMention[] | undefined;
    /**
     * - Any attached files
     */
    attachments: Attachment[];
    /**
     * - Any embedded content
     */
    embeds: Embed[];
    /**
     * - Reactions to the message
     */
    reactions?: Reaction[] | undefined;
    /**
     * - Used for validating a message was sent
     */
    nonce?: string | number | undefined;
    /**
     * - Whether this message is pinned
     */
    pinned: boolean;
    /**
     * - If the message is generated by a webhook, this is the webhook's id
     */
    webhook_id?: string | undefined;
    /**
     * - [Type of message]{@link https://discord.com/developers/docs/resources/channel#message-object-message-types}
     */
    type: MessageType;
    /**
     * - [Message Activity]{@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure} object.
     */
    activity?: MessageActivity | undefined;
    /**
     * - [Partial Application]{@link https://discord.com/developers/docs/resources/application#application-object} object.
     */
    application?: Application | undefined;
    /**
     * - If the message is an [Interaction]{@link https://discord.com/developers/docs/interactions/receiving-and-responding} or application-owned webhook, this is the id of the application
     */
    application_id?: string | undefined;
    /**
     * - [Message reference]{@link https://discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure} object. Data showing the source of a crosspost, channel follow add, pin, or reply message.
     */
    message_reference?: MessageReference | undefined;
    /**
     * - [Message flags]{@link https://discord.com/developers/docs/resources/channel#message-object-message-flags} combined as a [bitfield]{@link https://en.wikipedia.org/wiki/Bit_field}
     */
    flags: MessageFlags | null;
    /**
     * - The message associated with the message_reference
     */
    referenced_message?: Message | undefined;
    /**
     * - Sent if the message is a response to an [Interaction]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object}
     */
    interaction?: MessageInteraction | undefined;
    /**
     * - Thread that was started from this message, includes [Thread Member]{@link https://discord.com/developers/docs/resources/channel#thread-member-object} object
     */
    thread?: Channel | undefined;
    /**
     * - Sent if the message contains components like buttons, action rows, or other interactive components
     */
    components: Component;
    /**
     * - Sent if the message contains stickers
     */
    sticker_items?: StickerItem[] | undefined;
    position?: number | undefined;
    /**
     * - Data of the role subscription purchase or renewal that prompted this `ROLE_SUBSCRIPTION_PURCHASE` message
     */
    role_subscription_data?: RoleSubscriptionData | undefined;
};
type ForumThreadMessageParams = {
    /**
     * - Message contents (up to 2000 characters)
     */
    content?: string | undefined;
    /**
     * - Up to 10 `rich` embeds (up to 6000 characters)
     */
    embeds?: Embed[] | undefined;
    components?: Component | undefined;
    /**
     * - Attachment objects with `filename` and `description`
     */
    attachments?: Attachment[] | undefined;
    allowed_mentions?: AllowedMentions | undefined;
    /**
     * - IDs of up to 3 [stickers]{@link https://discord.com/developers/docs/resources/sticker#sticker-object} in the server to send in the message
     */
    sticker_ids?: string[] | undefined;
    /**
     * - [Message flags]{@link https://discord.com/developers/docs/resources/channel#message-object-message-flags} combined as a [bitfield]{@link https://en.wikipedia.org/wiki/Bit_field} (only `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATIONS` can be set)
     */
    flags: MessageFlags | null;
};
/**
 * | Flag | Value | Description |
 * |------|-------|-------------|
 * | Latest Activity | 0 | Sort forum posts by activity
 * | Creation Date   | 1 | Sort forum posts by creation time (from most recent to oldest)
 */
type SortOrderType = number;
type PartialEmoji = {
    id: Snowflake | null;
    name: string;
    animated?: boolean | undefined;
};
/**
 * | Flag | Value | Description |
 * |------|-------|-------------|
 * | Not Set      | 0 | No default has been set for forum channel
 * | List View    | 1 | Display posts as a list
 * | Gallery View | 2 | Display posts as a collection of tiles
 */
type ForumLayoutType = number;
type StickerItem = {
    /**
     * - id of the sticker
     */
    id: Snowflake;
    /**
     * - Name of the sticker
     */
    name: string;
    /**
     * - [Type of sticker format]{@link https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types}
     */
    format_type: StickerFormatType;
};
type FollowedChannel = {
    channel_id: Snowflake;
    webhook_id: Snowflake;
};
type Application = {
    /**
     * - The id of the app
     */
    id: Snowflake;
    /**
     * - The name of the app
     */
    name: string;
    /**
     * - The icon hash of the app
     */
    icon: string | null;
    /**
     * - The description of the app
     */
    description: string;
    /**
     * - An array of rpc origin urls, if rpc is enabled
     */
    rpc_origins?: string[] | undefined;
    /**
     * - When false, only app owner can join the app's bot to guilds
     */
    bot_public: boolean;
    /**
     * - When true, the app's bot will only join upon completion of the full OAuth2 code grant flow
     */
    bot_require_code_grant: boolean;
    /**
     * - The url of the app's terms of service
     */
    terms_of_service_url?: string | undefined;
    /**
     * - The url of the app's privacy policy
     */
    privacy_policy_url?: string | undefined;
    /**
     * - Partial User object containing info on the owner of the application
     */
    owner?: User | undefined;
    /**
     * - The hex encoded key for verification in interactions and the GameSDK's [GetTicket]{@link https://discord.com/developers/docs/game-sdk/applications#getticket}
     */
    verify_key: string;
    /**
     * - If the application belongs to a team, this will be a list of members of that team
     */
    team: Team | null;
    /**
     * - If this application is a game sold on Discord, this field will be the guild to which it has been linked
     */
    guild_id?: string | undefined;
    /**
     * - If this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists
     */
    primary_sku_id?: string | undefined;
    /**
     * - If this application is a game sold on Discord, this field will be the URL slug that links to the store page
     */
    slug?: string | undefined;
    /**
     * - The application's default rich presence invite [cover image hash]{@link https://discord.com/developers/docs/reference#image-formatting}
     */
    cover_image?: string | undefined;
    /**
     * - The application's public [flags]{@link https://discord.com/developers/docs/resources/application#application-object-application-flags}
     */
    flags: number | null;
    /**
     * - Up to 5 tags describing the content and functionality of the application
     */
    tags?: string[] | undefined;
    /**
     * - Settings for the application's default in-app authorization link, if enabled
     */
    install_params?: InstallParams | undefined;
    /**
     * - The application's default custom authorization link, if enabled
     */
    custom_install_url?: string | undefined;
    /**
     * - The application's role connection verification entry point, which when configured will render the app as a verification method in the guild role verification configuration
     */
    role_connections_verification_url?: string | undefined;
};
/**
 * | Name | Value |
 * |------|-------|
 * | Invited | 1 |
 * | Accepted | 2 |
 */
type MembershipState = number;
type TeamMember = {
    /**
     * - The avatar, discriminator, id, and username of the user
     */
    user: User;
    /**
     * - The user's [membership state]{@link https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum} on the team
     */
    membership_state: MembershipState;
    /**
     * - Will always be ["*"]
     */
    permissions: string[];
    /**
     * - The id of the parent team of which they are a member
     */
    team_id: Snowflake;
};
type Team = {
    icon: string | null;
    id: Snowflake;
    members: TeamMember[];
    name: string;
    owner_user_id: Snowflake;
};
type InstallParams = {
    /**
     * - The [scopes]{@link https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes} to add the application to the server with
     */
    scopes: string[];
    /**
     * - The [permissions]{@link https://discord.com/developers/docs/topics/permissions} to request for the bot role
     */
    permissions: string;
};
type MessageActivity = {
    /**
     * - [Type of Message Activity]{@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-types}
     */
    type: MessageActivityType;
    /**
     * - party_id from a Rich Presence event
     */
    party_id?: string | undefined;
};
/**
 * | Type | Value |
 * | Join | 1 |
 * | Spectate | 2 |
 * | Listen | 3 |
 * | Join Request | 5 |
 */
type MessageActivityType = number;
type ChannelMention = {
    /**
     * - id of the channel
     */
    id: Snowflake;
    /**
     * - id of the guild containing the channel
     */
    guild_id: Snowflake;
    /**
     * - The [type]{@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types} of channel
     */
    type: ChannelType;
    /**
     * - The name of the channel
     */
    name: string;
};
type Reaction = {
    /**
     * - Times this emoji has been used to react
     */
    count: number;
    /**
     * - Whether the current user reacted using this emoji
     */
    me: boolean;
    /**
     * - Emoji Information
     */
    emoji: PartialEmoji;
};
type ThreadMember = {
    /**
     * - ID of the thread
     */
    id?: string | undefined;
    /**
     * - ID of the user
     */
    user_id?: string | undefined;
    /**
     * - Time the user last joined the thread
     */
    join_timestamp: ISO8601Timestamp;
    /**
     * - Any user-thread settings, currently only used for notifications
     */
    flags: number;
    /**
     * - Additional information about the user
     */
    member?: Member | undefined;
};
type StageInstance = {
    id: Snowflake;
    guild_id: Snowflake;
    /**
     * - The id of the associated Stage channel
     */
    channel_id: Snowflake;
    /**
     * - The topic of the Stage instance (1-120 characters)
     */
    topic: string;
    /**
     * - The [privacy level]{@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level} of the Stage instance
     */
    privacy_level: StagePrivacyLevel;
    /**
     * - The id of the scheduled event for this Stage instance
     */
    guild_scheduled_event_id: Snowflake | null;
};
type GuildScheduledEvent = {
    /**
     * - The ID of the scheduled event
     */
    id: Snowflake;
    /**
     * - The guild id which the scheduled event belongs to
     */
    guild_id: Snowflake;
    /**
     * - The channel id in which the scheduled event will be hosted, or null if [scheduled entity type]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types} is `EXTERNAL`
     */
    channel_id: Snowflake | null;
    /**
     * - The id of the user that created the scheduled event
     */
    creator_id?: string | null | undefined;
    /**
     * - The name of the scheduled event (1-100 characters)
     */
    name: string;
    /**
     * - The description of the scheduled event (1-1000 characters)
     */
    description?: string | null | undefined;
    /**
     * - The time the scheduled event will start
     */
    scheduled_start_time: ISO8601Timestamp;
    /**
     * - The time the scheduled event will end, required if entity_type is `EXTERNAL`
     */
    scheduled_end_time: ISO8601Timestamp | null;
    /**
     * - The [privacy level]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level} of the scheduled event
     */
    privacy_level: EventPrivacyLevel;
    /**
     * - The [status]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status} of the scheduled event
     */
    status: EventStatus;
    /**
     * - The [type]{@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types} of scheduled event
     */
    entity_type: EventEntityType;
    /**
     * - The id of an entity associated with a guild scheduled event
     */
    entity_id: Snowflake | null;
    /**
     * - Additional metadata for the guild scheduled event
     */
    entity_metadata: EventEntityMetadata;
    /**
     * - The user that created the scheduled event
     */
    creator?: EventUser | undefined;
    /**
     * - The number of users subscribed to the scheduled event
     */
    user_count?: number | undefined;
    /**
     * - The [cover image hash]{@link https://discord.com/developers/docs/reference#image-formatting} of the scheduled event
     */
    image?: string | null | undefined;
};
type Connection = {
    /**
     * - ID of the conncetion account
     */
    id: string;
    /**
     * - The username of the connection account
     */
    name: string;
    /**
     * - The [service]{@link https://discord.com/developers/docs/resources/user#connection-object-services} of this connection
     */
    type: string;
    /**
     * - Whether the connection is revoked
     */
    revoked?: boolean | undefined;
    /**
     * - An array of partial server integrations
     */
    integrations?: (GuildIntegration | undefined)[] | undefined;
    /**
     * - Whether the connection is verified
     */
    verified: boolean;
    /**
     * - Whether friend sync is enabled for this connection
     */
    friend_sync: boolean;
    /**
     * - Whether activities related to this connection will be shown in presence updates
     */
    show_activity: boolean;
    /**
     * - Whether this connection has a corresponding third party OAuth2 token
     */
    two_way_link: boolean;
    /**
     * - [visibility]{@link https://discord.com/developers/docs/resources/user#connection-object-visibility-types} of this connection
     */
    visibility: number;
};
/**
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
type ApplicationRoleConnectionMetadataType = number;
type ApplicationRoleConnectionMetadata = {
    /**
     * - [Type of metadata] value
     */
    type: ApplicationRoleConnectionMetadataType;
    /**
     * - Dictionary key for the metadata field (must be `a-z`, `0-9`, or `_` characters; 1-50 characters)
     */
    key: string;
    /**
     * - Name of the metadata field (1-100 characters)
     */
    name: string;
    /**
     * - Translations of the name
     */
    name_localizations?: LocalizationMap;
    /**
     * - Description of the metadata field (1-200 characters)
     */
    description: string;
    /**
     * - Translations of the description
     */
    description_localizations?: LocalizationMap;
};
type ApplicationRoleConnection = {
    /**
     * - The vanity name of the platform a bot has connected (max 50 characters)
     */
    platform_name: string | null;
    /**
     * - The username on the platform a bot has connected (max 100 characters)
     */
    platform_username: string | null;
    /**
     * - Object mapping [application role connection metadata]{@link ApplicationRoleConnectionMetadata } keys to their string-ified value (max 100 characters) for the user on the platform a bot has connected
     */
    metadata: ApplicationRoleConnectionMetadata;
};
/**
 * | Name | Value |
 * |------|-------|
 * | Role    | 1 |
 * | User    | 2 |
 * | Channel | 3 |
 */
type ApplicationCommandPermissionType = number;
type GuildApplicationCommandPermissions = {
    /**
     * - ID of the command or the application ID
     */
    id: Snowflake;
    /**
     * - ID of the application the command belongs to
     */
    application_id: Snowflake;
    /**
     * - ID of the guild
     */
    guild_id: Snowflake;
    /**
     * - Permissions for the command in the guild, max of 100
     */
    permissions: ApplicationCommandPermissions[];
};
type ApplicationCommandPermissions = {
    /**
     * - ID of the command or the application ID
     */
    id: Snowflake;
    /**
     * - [Application command permission type]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type}
     */
    type: ApplicationCommandPermissionType;
    /**
     * - `true` to allow, `false` to disallow
     */
    permission: boolean;
};
/**
 * | Event Type | Value | Description |
 * |------------|-------|-------------|
 * | Message Send | 1 | When a member sends or edits a message in the guild |
 */
type AutoModEventType = number;
/**
 * | Trigger Type | Value | Description |
 * |--------------|-------|-------------|
 * | Keyword        | 1 | Check if content contains words from a user defined list of keywords |
 * | Spam           | 3 | Check if content represents generic spam |
 * | Keyword Preset | 4 | Check if content contains words from internal pre-defined wordsets |
 * | Mention Spam   | 5 | Check if content contains more unique mentions than allowed |
 */
type AutoModTriggerType = number;
/**
 * | Preset Type | Value | Description |
 * |--------------|-------|-------------|
 * | Profanity      | 1 | Words that may be considered forms of swearing or cursing |
 * | Sexual Content | 2 | Words that refer to sexually explicit behavior or activity |
 * | Slurs          | 3 | Personal insults or words that may be considered hate speech |
 */
type AutoModKeywordPresetTypes = number;
type AutoModTriggerMetadata = {
    /**
     * - Substrings which will be searched for in content (Maximum of 1000)
     */
    keyword_filter: string[];
    /**
     * - Regular expression patterns which will be matched against content (Maximum of 10)
     */
    regex_patterns: string[];
    /**
     * - The internally pre-defined wordsets which will be searched for in content
     */
    presets: AutoModKeywordPresetTypes[];
    /**
     * - Substrings which should not trigger the rule (Maximum of 100 or 1000)
     */
    allow_list: string[];
    /**
     * - Total number of unique role and user mentions allowed per message (Maximum of 50)
     */
    mention_total_limit: number;
};
/**
 * | Action Type | Value | Description |
 * |--------------|-------|-------------|
 * | Block Message      | 1 | Blocks a members message and prevents it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked |
 * | Send Alert Message | 2 | Logs user content to a specified channel |
 * | Timeout            | 3 | Timeout user for a specified duration |
 */
type AutoModActionType = number;
type AutoModActionMetadata = {
    /**
     * - Channel to which user content should be logged
     */
    channel_id: Snowflake;
    /**
     * - Timeout duration in seconds
     */
    duration_seconds: number;
    /**
     * - Additional explanation that will be shown to members whenever their message is blocked
     */
    custom_message?: string | undefined;
};
type AutoModAction = {
    type: AutoModActionType;
    /**
     * - Additional metadata needed during execution for this specific action type
     */
    metadata?: AutoModActionMetadata | undefined;
};
type AutoModRule = {
    id: Snowflake;
    guild_id: Snowflake;
    /**
     * - The rule name
     */
    name: string;
    /**
     * - The user which first created this rule
     */
    creator_id: Snowflake;
    /**
     * - The rule [event type]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types}
     */
    event_type: AutoModEventType;
    /**
     * - The rule [trigger type]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types}
     */
    trigger_type: AutoModTriggerType;
    /**
     * - The rule [trigger metadata]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata}
     */
    trigger_metadata: AutoModTriggerMetadata;
    /**
     * - The actions which will execute when the rule is triggered
     */
    actions: AutoModAction[];
    /**
     * - Whether the rule is enabled
     */
    enabled: boolean;
    /**
     * - The role ids that should not be affected by the rule (Maximum of 20)
     */
    exempt_roles: Snowflake[];
    /**
     * - The channel ids that should not be affected by the rule (Maximum of 50)
     */
    exempt_channels: Snowflake[];
};
type AuditLogChange = {
    /**
     * - New value of the key
     */
    new_value?: string;
    /**
     * - Old value of the key
     */
    old_value?: string;
    /**
     * - Name of the changed entity, with a few exceptions
     */
    key: string;
};
type OptionalAuditEntryInfo = {
    /**
     * - ID of the app whose permissions were targeted // APPLICATION_COMMAND_PERMISSION_UPDATE
     */
    application_id?: string | undefined;
    /**
     * - Name of the Auto Moderation rule that was triggered // AUTO_MODERATION_BLOCK_MESSAGE & AUTO_MODERATION_FLAG_TO_CHANNEL & AUTO_MODERATION_USER_COMMUNICATION_DISABLED
     */
    auto_moderation_rule_name?: string | undefined;
    /**
     * - Trigger type of the Auto Moderation rule that was triggered // AUTO_MODERATION_BLOCK_MESSAGE & AUTO_MODERATION_FLAG_TO_CHANNEL & AUTO_MODERATION_USER_COMMUNICATION_DISABLED
     */
    auto_moderation_rule_trigger_type?: string | undefined;
    /**
     * - Channel in which the entities were targeted // MEMBER_MOVE & MESSAGE_PIN & MESSAGE_UNPIN & MESSAGE_DELETE & STAGE_INSTANCE_CREATE & STAGE_INSTANCE_UPDATE & STAGE_INSTANCE_DELETE & AUTO_MODERATION_BLOCK_MESSAGE & AUTO_MODERATION_FLAG_TO_CHANNEL & AUTO_MODERATION_USER_COMMUNICATION_DISABLED
     */
    channel_id?: string | undefined;
    /**
     * - Number of entities that were targeted // MESSAGE_DELETE & MESSAGE_BULK_DELETE & MEMBER_DISCONNECT & MEMBER_MOVE
     */
    count?: string | undefined;
    /**
     * - Number of days after which inactive members were kicked // MEMBER_PRUNE
     */
    delete_member_days?: number | undefined;
    /**
     * - ID of the overwritten entity // CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE
     */
    id?: string | undefined;
    /**
     * - Number of members removed by the prune // MEMBER_PRUNE
     */
    members_removed?: string | undefined;
    /**
     * - ID of the message that was targeted // MESSAGE_PIN & MESSAGE_UNPIN
     */
    message_id?: string | undefined;
    /**
     * - Name of the role if type is "0" (not present if type is "1") // CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE
     */
    role_name?: string | undefined;
    /**
     * - Type of overwritten entity - role ("0") or member ("1") // CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE
     */
    type?: string | undefined;
};
type AuditLogEntry = {
    /**
     * - ID of the affected entity (webhook, user, role, etc.)
     */
    target_id?: string | undefined;
    /**
     * - Changes made to the target_id
     */
    changes?: AuditLogChange[] | undefined;
    /**
     * - User or app that made the changes
     */
    user_id: Snowflake;
    /**
     * - ID of the entry
     */
    id: Snowflake;
    /**
     * - [Type of action]{@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events} that occured
     */
    action_type: AuditLogEventType;
    /**
     * - Additional info for certain event types
     */
    options?: OptionalAuditEntryInfo | undefined;
    /**
     * - Reason for the change (1-512 characters)
     */
    reason?: string | undefined;
};
type AuditLog = {
    /**
     * - List of application commands referenced in the audit log
     */
    application_commands: ApplicationCommand[];
    /**
     * - List of audit log entries, sorted from most to least recent
     */
    audit_log_entries: AuditLogEntry[];
    /**
     * - List of auto moderation rules referenced in the audit log
     */
    auto_moderation_rules: AutoModRule[];
    /**
     * - List of guild scheduled events referenced in the audit log
     */
    guild_scheduled_events: GuildScheduledEvent[];
    /**
     * - List of partial integration objects
     */
    integrations: Partial<Array<GuildIntegration>>;
    /**
     * - List of threads referenced in the audit log*
     */
    threads: Channel[];
    /**
     * - List of users referenced in the audit log
     */
    users: User[];
    /**
     * - List of webhooks referenced in the audit log
     */
    webhooks: Webhook[];
};
/**
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
type AuditLogEventType = number;
/**
 * | Name | Value | Description |
 * |-------|------|-------------|
 * | Incoming | 1 | Incoming Webhooks can post messages to channels with a generated token |
 * | Channel Follower | 2 | Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels
 * | Application | 3 | Application webhooks are webhooks used with Interactions
 */
type WebhookType = number;
type Webhook = {
    /**
     * - The ID of the webhook
     */
    id: Snowflake;
    /**
     * - The [type]{@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types} of the webhook
     */
    type: WebhookType;
    /**
     * - The guild ID this webhook is for, if any
     */
    guild_id?: string | null | undefined;
    /**
     * - The channel ID this webhook is for, if any
     */
    channel_id: Snowflake | null;
    /**
     * - The user this webhook was created by
     */
    user?: User | undefined;
    /**
     * - The default name of the webhook
     */
    name: string | null;
    /**
     * - The default user avatar hash of the webhook
     */
    avatar: string | null;
    /**
     * - The secure token of the webhook (Incoming Webhooks)
     */
    token?: string | undefined;
    /**
     * - The bot/OAuth2 application that created this webhook
     */
    application_id: Snowflake | null;
    /**
     * - The guild of the channel that this webhook is following (Channel Follower Webhooks)
     */
    source_guild?: {
        id: Snowflake;
        name: string;
        icon: string;
    } | undefined;
    /**
     * - The channel that this webhook is following (Channel Follower Webhooks)
     */
    source_channel?: {
        id: Snowflake;
        name: string;
    } | undefined;
    /**
     * - The URL used for executing the webhook (returned by the webhooks OAuth2 flow)
     */
    url?: string | undefined;
};
type PartialChannel = {
    /**
     * - The id of the channel
     */
    id: Snowflake;
    /**
     * - The type of the channel
     */
    type: number;
    /**
     * - The name of the channel (1-100 characters)
     */
    name: string;
};
/**
 * | Flag | Value | Description |
 * |------|-------|-------------|
 * | Pinned | 1 << 1 | This thread is pinned to the top of its parent `GUILD_FORUM` channel
 * | Required Tag | 1 << 4 | Whether a tag is required to be specified when creating a thread in a `GUILD_FORUM` channel. Tags are specified in the `applied_tags` field.
 */
type ChannelFlags = number;
type ThreadMetadata = {
    /**
     * - Whether the thread is archived
     */
    archived: boolean;
    /**
     * - The thread will stop showing in the channel list after `auto_archive_duration` minutes of inactivity, can be set to: 60, 1440, 4320, 10080
     */
    auto_archive_duration: number;
    /**
     * - Timestamp when the thread's archive status was last changed
     */
    archive_timestamp: ISO8601Timestamp;
    /**
     * - Whether the thread is locked; when a thread is locked, only users with `MANAGE_THREADS` can unarchive it
     */
    locked: boolean;
    /**
     * - Whether non-moderators can add other non-moderators to a thread; only available on private threads
     */
    invitable?: boolean | undefined;
    /**
     * - Timestamp when the thread was created; only populated for threads created after 2022-01-09
     */
    create_timestamp?: string | null | undefined;
};
type ForumTag = {
    /**
     * - The id of the tag
     */
    id: Snowflake;
    /**
     * - The name of the tag (0-20 characters)
     */
    name: string;
    /**
     * - Whether this tag can only be added to or removed from threads by a member with the `MANAGE_THREADS` permission
     */
    moderated: boolean;
    /**
     * - The id of a guild's custom emoji
     */
    emoji_id: Snowflake | null;
    /**
     * - The unicode character of the emoji
     */
    emoji_name: string | null;
};
type DefaultReaction = {
    emoji_id: Snowflake | null;
    emoji_name: string | null;
};
type Embed = {
    type?: string | undefined;
    /**
     * - 256 character limit
     */
    title?: string | undefined;
    /**
     * - 4096 character limit
     */
    description?: string | string[] | undefined;
    /**
     * - 0xhex or integer
     */
    color?: number | null | undefined;
    /**
     * - URL for the title of the embed
     */
    url?: string | undefined;
    /**
     * - Timestamp of embed content
     */
    timestamp?: string | number | Date | undefined;
    /**
     * - Footer information for the bottom of the embed
     */
    footer?: {
        text: string;
        icon_url: string | null;
    } | undefined;
    /**
     * - Author information for the top of the embed
     */
    author?: {
        name: string;
        url: string;
        icon_url: string | null;
    } | undefined;
    /**
     * - Image information
     */
    image?: {
        url: string;
    } | undefined;
    /**
     * - Thumbnail image for top right of the embed
     */
    thumbnail?: {
        url: string;
    } | undefined;
    /**
     * - Up to 25 field objects
     */
    fields?: EmbedField[] | undefined;
};
/**
 * Embed Field
 */
type EmbedField = {
    /**
     * - Name of the field (256 character limit)
     */
    name: string;
    /**
     * - Value of the field (1024 character limit)
     */
    value: string;
    /**
     * - Whether or not this field should display inline
     */
    inline?: boolean | undefined;
};
type Attachment = {
    /**
     * - Attachment ID
     */
    id: Snowflake;
    /**
     * - File to send
     */
    file: Buffer | string | undefined;
    /**
     * - Name of file attached
     */
    filename: string;
    /**
     * - Description for the file (max 1024 characters)
     */
    description?: string | undefined;
    /**
     * - The attachment's media type
     */
    content_type?: string | undefined;
    /**
     * - Size of file in bytes
     */
    size: number;
    /**
     * - Source URL of file
     */
    url: string;
    /**
     * - A proxied URL of file
     */
    proxy_url: string;
    /**
     * - Height of file (if image)
     */
    height?: number | undefined;
    /**
     * - Width of file (if image)
     */
    width?: number | undefined;
    /**
     * - Whether this attachment is ephemeral
     */
    ephemeral?: boolean | undefined;
    /**
     * - The duration of the audio file (currently for voice messages)
     */
    duration_secs?: number | undefined;
    /**
     * - base64 encoded bytearray representing a sampled waveform
     */
    waveform?: string | undefined;
};
type RecurrenceRule = {
    start: ISO8601Timestamp;
    end: ISO8601Timestamp | null;
    frequency: RecurrenceRuleFrequency;
    interval: number;
    by_weekday: RecurrenceRuleWeekdays[] | null;
    by_month: RecurrenceRuleMonths[] | null;
    by_month_day: unknown | null;
    by_year_day: unknown | null;
    count: number | null;
};
/**
 * | Type | Value |
 * |------|-------|
 * | Yearly  | 0 |
 * | Monthly | 1 |
 * | Weekly  | 2 |
 * | Daily   | 3 |
 */
type RecurrenceRuleFrequency = number;
/**
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
type RecurrenceRuleMonths = number;
/**
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
type RecurrenceRuleWeekdays = number;
/**
 * | Type | Value | Description |
 * |------|-------|-------------|
 * | Role Mentions     | 'roles'    | Controls role mentions |
 * | User Mentions     | 'users'    | Controls user mentions |
 * | Everyone Mentions | 'everyone' | Controls `@everyone` and `@here` mentions |
 */
type AllowedMentionsType = 'roles' | 'users' | 'everyone';
type AllowedMentions = {
    /**
     * - An array of [allowed mention types]{@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types} to parse from the content.
     */
    parse: AllowedMentionsType[];
    /**
     * - Array of role_ids to mention (Max size of 100)
     */
    roles: Snowflake[];
    /**
     * - Array of user_ids to mention (Max size of 100)
     */
    users: Snowflake[];
    /**
     * - For replies, whether to mention the author of the message being replied to (default false)
     */
    replied_user: boolean;
};
type MessageReference = {
    /**
     * - ID of the originating message
     */
    message_id?: string | undefined;
    /**
     * - ID of the originating message's channel
     */
    channel_id?: string | undefined;
    /**
     * - ID of the originating message's guild
     */
    guild_id?: string | undefined;
    /**
     * - When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true
     */
    fail_if_not_exists?: boolean | undefined;
};
/**
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
type MessageFlags = number;
/**
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
type ChannelType = number;
/**
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
type MessageType = number;
/**
 * | Type | Name | Description |
 * |------|------|-------------|
 * | 1 | Action Row     | Container for other components |
 * | 2 | Button         | {@link Button } |
 * | 3 | String Select  | [Select menu]{@link SelectMenu } for picking from defined text options |
 * | 4 | Text Input     | {@link Modal } |
 * | 5 | User Select    | Select menu for users |
 * | 6 | Role Select    | Select menu for roles |
 * | 7 | Mentionable Select | Select menu for mentionables (users and roles) |
 * | 8 | Channel Select | Select menu for channels |
 */
type ComponentType = number;
/**
 * | Name | Value | Color |
 * |------|-------|-------|
 * | Primary   | 1 | blurple |
 * | Secondary | 2 | grey |
 * | Success   | 3 | green |
 * | Danger    | 4 | red |
 * | Link      | 5 | grey, navigates to a URL |
 */
type ButtonStyle = number;
/**
 * | Name | Value | Description |
 * |------|-------|-------------|
 * | Short | 1 | Single-line input |
 * | Paragraph | 2 | Multi-line input |
 */
type TextInputStyle = number;
type MemberParams = {
    roles: Snowflake[];
    hexColor: number;
    unusual_dm_activity_until: Date | null;
    premium_since: Date | null;
    pending: boolean;
    nick: string | null;
    mute: boolean;
    joined_at: Date;
    flags: number;
    deaf: boolean;
    communication_disabled_until: Date | null;
    avatar: string | null;
    permission_names: PermNames[];
    displayName: string;
    displayAvatar: string;
};
type MessageInteraction = {
    id: Snowflake;
    type: InteractionType;
    name: string;
    user: User;
    member?: MemberParams | undefined;
};
type Interaction = {
    id: Snowflake;
    application_id: Snowflake;
    /**
     * - [Type of interaction]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type}
     */
    type: InteractionType;
    /**
     * - Interaction data payload
     */
    data: InteractionData;
    guild_id: Snowflake;
    channel_id?: string | undefined;
    /**
     * - Guild member data for the invoking user, including permissions
     */
    member: Member;
    /**
     * - User object for the invoking user, if invoked in a DM
     */
    user?: User | undefined;
    /**
     * - Continuation token for responding to the interaction
     */
    token: string;
    /**
     * - Read-only property, always 1
     */
    version: number;
    /**
     * - For components, the message they were attached to
     */
    message: Message;
    /**
     * - Bitwise set of permissions the app or bot has within the channel the interaction was sent from
     */
    app_permissions?: string | undefined;
    /**
     * - Selected language of the invoking user
     */
    locale?: string | undefined;
    /**
     * - Guild's preferred locale, if invoked in a guild
     */
    guild_locale?: string | undefined;
    entitlements: Entitlement[];
    entitlement_sku_ids: Snowflake[];
    channel: Channel;
    guild: GuildParams;
};
type PartialInviteGuild = Pick<Guild, 'id' | 'name' | 'description' | 'splash' | 'banner' | 'icon' | 'features' | 'nsfw_level' | 'vanity_url_code' | 'premium_subscription_count' | 'verification_level'>;
type PartialGuild = Pick<Guild, 'id' | 'name' | 'icon' | 'owner' | 'permissions' | 'features'>;
type Member = {
    displayName: string;
    displayAvatar: string;
    hexColor?: number | undefined;
    /**
     * - The [user]{@link User } this guild member represents
     */
    user: User;
    /**
     * - This user's guild nickname
     */
    nick: string | null;
    /**
     * - The member's guild avatar hash
     */
    avatar: string | null;
    /**
     * - Array of role object ids
     */
    roles: Snowflake[];
    /**
     * - When the user joined the server
     */
    joined_at: ISO8601Timestamp;
    /**
     * - When the user started boosting the server
     */
    premium_since: ISO8601Timestamp | null;
    /**
     * - Whether the user is deafened in voice channels
     */
    deaf: boolean;
    /**
     * - Whether the user is muted in voice channels
     */
    mute: boolean;
    /**
     * - [Guild member flags]{@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags} represented as a bit set. Defaults to 0.
     */
    flags: number;
    /**
     * - Whether the user has not yet passed the guilds Membership Screening requirements
     */
    pending: boolean;
    /**
     * - Total permissions of the member in the channel
     */
    permissions: string;
    /**
     * - When the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out
     */
    communication_disabled_until: ISO8601Timestamp;
    permission_names: PermNames[];
};
type Role = {
    /**
     * - Role id
     */
    id: Snowflake;
    /**
     * - Role name
     */
    name: string;
    /**
     * - Integer representation of hexadecimal color code
     */
    color: number;
    hexColor: string;
    /**
     * - If this role is pinned in the user listing
     */
    hoist: boolean;
    /**
     * - Whether this role is mentionable
     */
    mentionable: boolean;
    /**
     * - Permission bit set
     */
    permissions: string;
    /**
     * - Role unicode emoji
     */
    unicode_emoji?: string | null | undefined;
    /**
     * - Position of this role
     */
    position: number;
    /**
     * - Role icon hash
     */
    icon?: string | null | undefined;
    icon_url?: string | undefined;
    /**
     * - The [tags]{@link RoleTags } this role has
     */
    tags?: RoleTags | undefined;
    /**
     * - Whether this role is managed by an integration
     */
    managed: boolean;
    flags: number;
    permission_names: PermNames[];
};
type RoleTags = {
    /**
     * - The id of the bot this role belongs to
     */
    bot_id: Snowflake;
    /**
     * - The id of the integration this role belongs to
     */
    integration_id: Snowflake;
    /**
     * - Whether this is the guild's Booster role
     */
    premium_subscriber: null;
    /**
     * - The id of this role's subscription sku and listing
     */
    subscription_listing_id: Snowflake;
    /**
     * - Whether this role is available for purchase
     */
    available_for_purchase: null;
    /**
     * - Whether this role is a guild's linked role
     */
    guild_connection: null;
};
type RoleSubscriptionData = {
    /**
     * - The id of the SKU and listing that the user is subscribed to
     */
    role_subscription_listing_id: Snowflake;
    /**
     * - The name of the tier that the user is subscribed to
     */
    tier_name: string;
    /**
     * - The cumulative number of months that the user has been subscribed for
     */
    total_months_subscribed: number;
    /**
     * - Whether this notification is for a renewal rather than a new purchase
     */
    is_renewal: boolean;
};
type Overwrite = {
    id: Snowflake;
    allow: string;
    deny: string;
    /**
     * - 0 for role, 1 for member
     */
    type: number;
};
/**
 * | Mode | Value | Description |
 * |------|-------|-------------|
 * | Auto | 1 | Discord chooses the quality for optimal performance |
 * | Full | 2 | 720p |
 */
type VideoQualityMode = number;
/**
 * | Level | Integer | Description |
 * |-------|---------|-------------|
 * | None      | 0 | Unrestricted |
 * | Low       | 1 | Must have verified email on account |
 * | Medium    | 2 | Must be registered on Discord for longer than 5 minutes |
 * | High      | 3 | Must be a member of the server for longer than 10 minutes |
 * | Very High | 4 | Must have a verified phone number |
 */
type GuildVerificationLevel = number;
/**
 * | Key | Value | Description |
 * |-----|-------|-------------|
 * | All Messages  | 0 | Members will receive notifications for all messages by default |
 * | Only Mentions | 1 | Members will receive notifications only for messages that `@mention` them by default |
 */
type DefaultMessageNotificationLevel = number;
/**
 * | Level | Integer | Description |
 * |-------|---------|-------------|
 * | Disabled              | 0 | Media content will not be scanned |
 * | Members without roles | 1 | Media content sent by members without roles will be scanned |
 * | All members           | 2 | Media content sent by all members will be scanned |
 */
type ExplicitContentFilterLevel = number;
/**
 * | Level | Integer | Description |
 * |-------|---------|-------------|
 * | None     | 0 | Guild has no MFA/2FA requirement for moderation actions |
 * | Elevated | 1 | Guild has a 2FA requirement for moderation actions |
 */
type GuildMFALevel = number;
/**
 * | Level | Value |
 * |-------|-------|
 * | Default        | 0 |
 * | Explicit       | 1 |
 * | Safe           | 2 |
 * | Age-Restricted | 3 |
 */
type GuildNSFWLevel = number;
/**
 * | Flag | Value | Description |
 * |------|-------|-------------|
 * SUPPRESS_JOIN_NOTIFICATIONS | 1 << 0 | Supress member join notifications |
 * SUPPRESS_PREMIUM_SUBSCRIPTIONS | 1 << 1 | Suppress server boost notifications |
 * SUPPRESS_GUILD_REMINDER_NOTIFICATIONS | 1 << 2 | Suppress server setup tips |
 * SUPPRESS_JOIN_NOTIFICATION_REPLIES | 1 << 3 | Hide member join sticker reply buttons |
 * SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS | 1 << 4 | Suppress role subscription purchase and renewal notifications |
 * SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES | 1 << 5 | Hide role subscription sticker reply buttons |
 */
type SystemChannelFlags = number;
/**
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
type GuildFeatures = 'ANIMATED_BANNER' | 'ANIMATED_ICON' | 'APPLICATION_COMMAND_PERMISSIONS_V2' | 'AUTO_MODERATION' | 'BANNER' | 'COMMUNITY' | 'CREATOR_MONETIZABLE_PROVISIONAL' | 'CREATOR_STORE_PAGE' | 'DEVELOPER_SUPPORT_SERVER' | 'DISCOVERABLE' | 'FEATURABLE' | 'INVITES_DISABLED' | 'INVITE_SPLASH' | 'MEMBER_VERIFICATION_GATE_ENABLED' | 'MORE_STICKERS' | 'NEWS' | 'PARTNERED' | 'PREVIEW_ENABLED' | 'ROLE_ICONS' | 'ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE' | 'ROLE_SUBSCRIPTIONS_ENABLED' | 'TICKETED_EVENTS_ENABLED' | 'VANITY_URL' | 'VERIFIED' | 'VIP_REGIONS' | 'WELCOME_SCREEN_ENABLED';
/**
 * | Feature | Required Permissions | Effects |
 * |---------|----------------------|---------|
 * | Community | Administrator | Enables Community Features in the guild |
 * | Discoverable | Administrator | Enables discovery in the guild, making it publicly listed |
 * | Invites Disabled | Manage Guild | Pauses all invites/access to the server |
 * | Raid Alerts Disabled | Manage Guild | Disables alerts for join raids |
 */
type MutableGuildFeatures = 'COMMUNITY' | 'DISCOVERABLE' | 'INVITES_DISABLED' | 'RAID_ALERTS_DISABLED';
type GuildWelcomeScreen = {
    /**
     * - The server description shown in the welcome screen
     */
    description: string | null;
    /**
     * - The channels shown in the welcome screen, up to 5
     */
    welcome_channels: GuildWelcomeScreenChannel[];
};
type GuildWelcomeScreenChannel = {
    /**
     * - The channel's ID
     */
    channel_id: Snowflake;
    /**
     * - The description shown for the channel
     */
    description: string;
    /**
     * - The emoji ID, if the emoji is custom
     */
    emoji_id: Snowflake | null;
    /**
     * - The emoji name if custom, the unicode character if standard, or `null` if no emoji is set
     */
    emoji_name: string | null;
};
/**
 * | Name | Value |
 * |------|-------|
 * | Public  | 1  |
 * | Private | 2  |
 */
type StagePrivacyLevel = number;
/**
 * Name | Value
 * -----|------
 * Guild Only | 2
 */
type EventPrivacyLevel = number;
/**
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
type EventStatus = number;
type EventEntityMetadata = {
    /**
     * - Location of the event (1-100 characters)
     */
    location?: string | undefined;
    /**
     * - Undocumented
     */
    speaker_ids: Snowflake[];
};
type EventUser = {
    /**
     * - The scheduled event id which the user subscribed to
     */
    guild_scheduled_event_id: Snowflake;
    /**
     * - User which subscribed to an event
     */
    user: User;
    /**
     * - Guild member data for this user for the guild which this event belongs to, if any
     */
    member?: Member | undefined;
};
/**
 * | Name | Value |
 * |------|-------|
 * | Stage Instance | 1 |
 * | Voice    | 2 |
 * | External  | 3 |
 */
type EventEntityType = number;
type GuildPreview = {
    /**
     * - Guild ID
     */
    id: Snowflake;
    /**
     * - Guild name (2-100 characters)
     */
    name: string;
    /**
     * - Icon hash
     */
    icon: string | null;
    /**
     * - Splash hash
     */
    splash: string | null;
    /**
     * - Discovery_splash hash
     */
    discovery_splash: string | null;
    /**
     * - Custom guild emojis
     */
    emojis: Emoji[];
    /**
     * - Custom guild stickers
     */
    stickers: Sticker[];
    /**
     * - Enabled guild features
     */
    features: GuildFeatures[];
    /**
     * - Approximate number of members in this guild
     */
    approximate_member_count: number;
    /**
     * - Approximate number of online members in this guild
     */
    approximate_presence_count: number;
    /**
     * - The description for the guild
     */
    description: string;
};
type GuildBan = {
    /**
     * - The reason for the ban
     */
    reason: string | null;
    /**
     * - The banned user
     */
    user: User;
};
type GuildVoiceRegion = {
    /**
     * - Unique ID for the region
     */
    id: string;
    /**
     * - Name of the region
     */
    name: string;
    /**
     * - `true` for a single server that is closest to the current user's client
     */
    optimal: boolean;
    /**
     * - Whether this is a deprecated voice region
     */
    deprecated: boolean;
    /**
     * - Whether this is a custom voice region (used for events/etc)
     */
    custom: boolean;
};
/**
 * | Name | Value |
 * |------|-------|
 * | Kick | 0 |
 * | Remove Role | 1 |
 */
type GuildIntegrationExpireBehavior = number;
type GuildIntegrationAccount = {
    /**
     * - ID of the account
     */
    id: string;
    /**
     * - Name of the account
     */
    name: string;
};
type GuildIntegrationApplication = {
    /**
     * - The ID of the app
     */
    id: Snowflake;
    /**
     * - The name of the app
     */
    name: string;
    /**
     * - The icon hash of the app
     */
    icon: string | null;
    /**
     * - The description of the app
     */
    description: string;
    /**
     * - The bot associated with this application
     */
    bot?: User | undefined;
};
type GuildIntegration = {
    /**
     * - Integration ID
     */
    id: Snowflake;
    /**
     * - Integration name
     */
    name: string;
    /**
     * - Integration type
     */
    type: 'twitch' | 'youtube' | 'discord';
    /**
     * - Is this integration enabled
     */
    enabled?: boolean | undefined;
    /**
     * - Is this integration syncing
     */
    syncing?: boolean | undefined;
    /**
     * - ID that this integration uses for "subscribers"
     */
    role_id?: string | undefined;
    /**
     * - Whether emoticons should be synced for this integration
     */
    enable_emoticons?: boolean | undefined;
    /**
     * - The behavior of expiring subscribers
     */
    expire_behavior?: number | undefined;
    /**
     * - The grace period (in days) before expiring subscribers
     */
    expire_grace_period?: number | undefined;
    /**
     * - User for this integration
     */
    user?: User | undefined;
    /**
     * - Integration account information
     */
    account: GuildIntegrationAccount;
    /**
     * - When this integration was last synced
     */
    synced_at?: string | undefined;
    /**
     * - How many subscribers this integration has
     */
    subscriber_count?: number | undefined;
    /**
     * - Has this integration been revoked
     */
    revoked?: boolean | undefined;
    /**
     * - The bot/OAuth2 application for discord integrations
     */
    application?: GuildIntegrationApplication | undefined;
};
type GuildWidget = {
    /**
     * - Guild ID
     */
    id: Snowflake;
    /**
     * - Guild name (2-100 characters)
     */
    name: string;
    /**
     * - Instant invite for the guilds specified widget invite channel
     */
    instant_invite: string | null;
    /**
     * - Voice and stage channels which are accessible by `@everyone`
     */
    channels: PartialChannel[];
    /**
     * - Special widget user objects that includes users presence
     */
    members: GuildWidgetUser;
    /**
     * - Number of online members in this guild
     */
    presence_count: number;
};
type GuildWidgetSettings = {
    /**
     * - Whether the widget is enabled
     */
    enabled: boolean;
    /**
     * - The widget channel ID
     */
    channel_id: Snowflake;
};
type GuildWidgetStyleOptions = string;
type GuildWidgetUser = {
    /**
     * - Anonymized to prevent abuse
     */
    id: string;
    username: string;
    /**
     * - Anonymized to prevent abuse
     */
    discriminator: string;
    /**
     * - Anonymized to prevent abuse
     */
    avatar: string;
    /**
     * - User presence
     */
    status: string;
    avatar_url: string;
};
type GuildTemplate = {
    /**
     * - Template name
     */
    name: string;
    /**
     * - The template code (unique ID)
     */
    code: string;
    /**
     * - The description for the template
     */
    description: string | null;
    /**
     * - Number of times this template has been used
     */
    usage_count: number;
    /**
     * - The ID of the user who created the template
     */
    creator_id: Snowflake;
    /**
     * - The user who created the template
     */
    creator: User;
    /**
     * - When this template was created
     */
    created_at: string;
    /**
     * - When this template was last synced to the source guild
     */
    updated_at: string;
    /**
     * - The ID of the guild this template is based on
     */
    source_guild_id: Snowflake;
    /**
     * - The guild snapshot this template contains
     */
    serialized_source_guild: Object;
    /**
     * - Whether the template has unsynced changes
     */
    is_dirty: boolean | null;
};
type GuildOnboarding = {
    /**
     * - ID of the guild this onboarding is part of
     */
    guild_id: Snowflake;
    /**
     * - Prompts shown during onboarding and in customize community
     */
    prompts: OnboardingPrompt[];
    /**
     * - Channel IDs that members get opted into automatically
     */
    default_channel_ids: Snowflake[];
    /**
     * - Whether onboarding is enabled in the guild
     */
    enabled: boolean;
};
type OnboardingPrompt = {
    /**
     * - ID of the prompt
     */
    id: Snowflake;
    /**
     * - Type of prompt
     */
    type: OnboardingPromptType;
    /**
     * - Options available within the prompt
     */
    options: OnboardingPromptOption[];
    /**
     * - Title of the prompt
     */
    title: string;
    /**
     * - Indicates whether users are limited to selecting one option for the prompt
     */
    single_select: boolean;
    /**
     * - Indicates whether the prompt is required before a user completes the onboarding flow
     */
    required: boolean;
    /**
     * - Indicates whether the prompt is present in the onboarding flow.
     * - If `false`, the prompt will only appear in the Channels & Roles tab
     */
    in_onboarding: boolean;
};
type OnboardingPromptOption = {
    /**
     * - ID of the prompt option
     */
    id: Snowflake;
    /**
     * - IDs for channels a member is added to when the option is selected
     */
    channel_ids: Snowflake[];
    /**
     * - IDs for roles assigned to a member when the option is selected
     */
    role_ids: Snowflake[];
    /**
     * - Emoji of the option
     */
    emoji: Emoji;
    /**
     * - Title of the option
     */
    title: string;
    /**
     * - Description of the option
     */
    description: string | null;
};
/**
 * | Name | Value |
 * |------|-------|
 * | Multiple Choice | 0  |
 * | Dropdown        | 1  |
 */
type OnboardingPromptType = number;
/**
 * | Name | Value |
 * |------|-------|
 * | Onboarding Default  | 0  |
 * | Onboarding Advanced | 1  |
 */
type OnboardingMode = number;
type GuildHomeSettings = {
    guild_id: Snowflake;
    enabled: boolean;
    welcome_message?: WelcomeMessage;
    new_member_actions?: NewMemberAction | undefined;
    resource_channels?: ResourceChannel[] | undefined;
};
type WelcomeMessage = {
    author_ids: Snowflake[];
    message: string;
};
type ResourceChannel = {
    channel_id: Snowflake;
    title: string;
    description: string;
    emoji?: PartialEmoji | null | undefined;
    icon?: string | null | undefined;
};
type NewMemberAction = {
    channel_id: Snowflake;
    action_type: NewMemberActionType;
    title: string;
    description: string;
    emoji?: PartialEmoji | null | undefined;
    icon?: string | null | undefined;
};
/**
 * | Name | Value |
 * |------|-------|
 * | View | 0  |
 * | Talk | 1  |
 */
type NewMemberActionType = number;
type GuildParams = {
    id: Snowflake;
    name: string;
    created_at: string;
    description: string | null;
    mfa_level: GuildMFALevel;
    premium_progress_bar_enabled: boolean;
    hub_type: unknown;
    latest_onboarding_question_id: Snowflake | null;
    vanity_url_code: string | null;
    public_updates_channel_id: Snowflake | null;
    max_stage_video_channel_users: number;
    splash: string | null;
    lazy: boolean;
    premium_subscription_count: number;
    system_channel_flags: SystemChannelFlags;
    default_message_notifications: DefaultMessageNotificationLevel;
    banner: string | null;
    max_members: number;
    safety_alerts_channel_id: Snowflake | null;
    preferred_locale: LocaleString;
    discovery_splash: string | null;
    icon: string | null;
    guild_hashes: GuildHashes;
    nsfw: boolean;
    verification_level: GuildVerificationLevel;
    nsfw_level: GuildNSFWLevel;
    application_id: Snowflake | null;
    owner_id: Snowflake;
    embedded_activities: Array<Object>;
    home_header: unknown;
    rules_channel_id: Snowflake | null;
    system_channel_id: Snowflake | null;
    afk_timeout: number;
    premium_tier: number;
    max_video_channel_user: number;
    afk_channel_id: Snowflake | null;
    explicit_content_filter: ExplicitContentFilterLevel;
    stickers: Sticker[];
    emojis: Emoji[];
    roles: Role[];
    joined_at: Date | string;
    incidents_data: unknown | null;
    large: boolean;
    /**
     * - `true` if this guild is unavailable due to an outage
     */
    unavailable: boolean;
    members: Member[];
    threads: Channel[] | null;
    channels: Channel[];
    features: GuildFeatures[];
    /**
     * - Presences of the members in the guild, will only include non-offline members if the size is greater than `large` threshold
     */
    presences: GuildPresenceParams[];
    voice_states: VoiceState[];
    guild_scheduled_events: GuildScheduledEvent[];
    stage_instances: StageInstance[];
    soundboard_sounds: SoundboardSound[];
    application_command_counts: {
        [x: string]: number;
    };
    emojiCount?: number | undefined;
    stickerCount?: number | undefined;
    channelCount: number;
    roleCount: number;
    member_count: number;
    icon_url?: string | undefined;
    banner_url?: string | undefined;
    splash_url?: string | undefined;
    discovery_splash_url?: string | undefined;
};
type GuildPresenceParams = {
    user: Pick<User, 'id'>;
    guild_id: Snowflake;
    status: 'online' | 'offline' | 'idle' | 'dnd';
    activities: Activity[];
    client_status: ClientStatus;
};
type MessageCreateMentions = {
    username: string;
    global_name: string | null;
    display_name?: string | undefined;
    id: Snowflake;
    avatar: string | null;
    avatar_decoration_data: string | null;
    public_flags: number;
    member: MemberParams;
};
type GuildHashes = {
    version: number;
    roles: {
        omitted: boolean;
        hash: string;
    };
    metadata: {
        omitted: boolean;
        hash: string;
    };
    channels: {
        omitted: boolean;
        hash: string;
    };
};
type PresenceUpdate = {
    user: User;
    member: MemberParams;
    guild_id: Snowflake;
    status: 'online' | 'offline' | 'idle' | 'dnd';
    activities: Activity[];
    client_status: ClientStatus;
    timestamp: number;
};
/**
 * [Soundboard Sound]{@link  }
 * - undocumented soundboard object
 */
type SoundboardSound = {
    volume: number;
    user_id: Snowflake;
    sound_id: Snowflake;
    name: string;
    guild_id: Snowflake;
    emoji_name: string | null;
    emoji_id: Snowflake | null;
    available: boolean;
};
type SKU = {
    /**
     * - ID of SKU
     */
    id: Snowflake;
    /**
     * - ID of the parent application
     */
    application_id: Snowflake;
    /**
     * - The [type of SKU]{@link https://discord.com/developers/docs/monetization/skus#sku-object-sku-types}
     */
    type: SKUType;
    /**
     * - Customer-facing name of your premium offering
     */
    name: string;
    /**
     * - System-generated URL slug based on the SKU's name
     */
    slug: string;
    /**
     * - ???
     */
    dependent_sku_id: Snowflake | null;
    /**
     * - ???
     */
    manifest_labels: string | null;
    /**
     * - ???
     */
    release_date: ISO8601Timestamp | null;
    /**
     * - ???
     */
    access_type: SKUAccessType;
    /**
     * - ???
     */
    features: string[];
    /**
     * - ???
     */
    flags: SKUFlags;
    /**
     * - ???
     */
    premium: boolean;
    /**
     * - ???
     */
    show_age_gate: boolean;
};
/**
 * | Flag | Value |
 * |--------------------|--------|
 * | Guild Subscription | 1 << 7 |
 * | User Subscription  | 1 << 8 |
 * - The `flags` field can be used to differentiate user and server subscriptions with a bitwise `&&` operator.
 */
type SKUFlags = number;
/**
 * ### For subscriptions, there are two types of access levels you can offer to users:
 * - Guild Subscriptions: A subscription purchased by a user and applied to a single server. Everyone in that server gets your premium benefits.
 * - User Subscriptions: A subscription purchased by a user for themselves. They get access to your premium benefits in every server.
 */
type SKUAccessType = number;
/**
 * - For subscriptions, SKUs will have a type of either `SUBSCRIPTION` represented by `type: 5` or `SUBSCRIPTION_GROUP` represented by `type: 6`.
 * - For any current implementations, you will want to use the SKU defined by `type: 5`.
 * - A `SUBSCRIPTION_GROUP` is automatically created for each `SUBSCRIPTION` SKU and are not used at this time.
 *
 * | Type | ID | Description |
 * |-----------------|---|-------------|
 * | Subscription    | 5 | Represents a recurring subscription |
 * | Scription_Group | 6 | System-generated group for each SUBSCRIPTION SKU created |
 */
type SKUType = number;
type SkuPrice = {
    Amount: Uint32Array;
    Currency: string;
};
/**
 * | Type | ID    | Description |
 * |------|-------|-------------|
 * | Application Subscription| 8 | Entitlement was purchased as an app subscription |
 */
type EntitlementType = number;
type PartialEntitlement = {
    /**
     * - ID of the entitlement
     */
    id: Snowflake;
    /**
     * - ID of the SKU
     */
    sku_id: Snowflake;
    application_id: Snowflake;
    /**
     * - ???
     */
    gift_code_flags: number;
    /**
     * - ???
     */
    deleted: boolean;
    /**
     * - ???
     */
    promotion_id: Snowflake;
    user_id?: string | undefined;
    guild_id?: string | undefined;
    /**
     * - The [type of entitlement]{@link https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-types}
     */
    type: EntitlementType;
    /**
     * - Not applicable for App Subscriptions. Subscriptions are not consumed and will be `false`.
     */
    consumed: boolean;
};
type Entitlement = {
    /**
     * - ID of the entitlement
     */
    id: Snowflake;
    /**
     * - ID of the SKU
     */
    sku_id: Snowflake;
    application_id: Snowflake;
    /**
     * - ???
     */
    subscription_id: Snowflake;
    /**
     * - ???
     */
    gift_code_flags: number;
    /**
     * - ???
     */
    deleted: boolean;
    /**
     * - ???
     */
    promotion_id: Snowflake;
    user_id?: string | undefined;
    guild_id?: string | undefined;
    /**
     * - The [type of entitlement]{@link https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-types}
     */
    type: EntitlementType;
    /**
     * - Not applicable for App Subscriptions. Subscriptions are not consumed and will be `false`.
     */
    consumed: boolean;
    /**
     * - Start date at which the entitlement is valid. Not present when using test entitlements
     */
    starts_at?: string | undefined;
    /**
     * - Date at which the entitlement is no longer valid. Not present when using test entitlements
     */
    ends_at?: string | undefined;
};
/**
 * A type alias representing a locale string, which is one of the available Discord locales
 */
type LocaleString = Locale;
/**
 * A type alias representing a partial localization map, which maps Discord locales to localized strings
 */
type LocalizationMap = any;
type Button = {
    /**
     * - The type of the component (2 for button).
     */
    type: ComponentType;
    /**
     * - The button's [style]{@link ButtonStyle }
     */
    style: ButtonStyle;
    /**
     * - Text that appears on the button; max 80 characters
     */
    label?: string | undefined;
    /**
     * - The emoji to be displayed on the button.
     */
    emoji?: PartialEmoji | undefined;
    /**
     * - Developer-defined identifier for the button; max 100 characters
     */
    custom_id?: string | undefined;
    /**
     * - URL for link-style buttons
     */
    url?: string | undefined;
    /**
     * - Whether the button is disabled.
     */
    disabled?: boolean | undefined;
};
type SelectMenu = {
    /**
     * - The [type]{@link ComponentType } of the component (3-8 for select menus).
     */
    type: ComponentType;
    /**
     * - A unique identifier for the select menu.
     */
    custom_id: string;
    /**
     * - Specified choices in a select menu (only required and available for string selects (type `3`); max 25
     */
    options?: SelectOption[] | undefined;
    /**
     * - List of channel types to include in the channel select component (type `8`)
     */
    channel_types?: number | undefined;
    /**
     * - The text to be displayed when no option is selected.
     */
    placeholder?: string | undefined;
    /**
     * - Minimum number of items that must be chosen; min 0, max 25
     */
    min_values?: number | undefined;
    /**
     * - Maximum number of items that can be chosen; max 25
     */
    max_values?: number | undefined;
    /**
     * - Whether the button is disabled.
     */
    disabled?: boolean | undefined;
};
type SelectOption = {
    /**
     * - User-facing name of the option; max 100 characters
     */
    label: string;
    /**
     * - Dev-defined value of the option; max 100 characters
     */
    value: string;
    /**
     * - Additional description of the option; max 100 characters
     */
    description?: string | undefined;
    /**
     * - The emoji to be displayed for the option.
     */
    emoji?: PartialEmoji | undefined;
    /**
     * - Will show this option as selected by default
     */
    default?: boolean | undefined;
};
type Modal = {
    /**
     * - The type of the component (`4` for text input)
     */
    type: ComponentType;
    /**
     * - Developer-defined identifier for the input; max 100 characters
     */
    custom_id: string;
    /**
     * - The [text input style]{@link TextInputStyle }
     */
    style: TextInputStyle;
    /**
     * - Label for this component; max 45 characters
     */
    label: string;
    /**
     * - Minimum input length for a text input; min 0, max 4000
     */
    min_length?: number | undefined;
    /**
     * - Maximum input length for a text input; min 1, max 4000
     */
    max_length?: number | undefined;
    /**
     * - Whether this component is required to be filled
     */
    required?: boolean | undefined;
    /**
     * - Pre-filled value for this component; max 4000 characters
     */
    value?: string | undefined;
    /**
     * - Custom placeholder text if the input is empty; max 100 characters
     */
    placeholder?: string | undefined;
};
type ActionRow<C extends Modal | MessageActionRow> = {
    /**
     * - Placeholder for components
     */
    components: C[];
    /**
     * - Must be 1 for 'ACTION_ROW'
     */
    type: number;
};
/**
 * A variety of message component types
 * - [Button]{@link Button }
 * - [Select Menu]{@link SelectMenu }
 */
type MessageActionRow = Button | SelectMenu;
type Component = Array<ActionRow<Button | SelectMenu | Modal>>;
type InteractionType = number;
type ApplicationCommandInteractionDataOption = {
    name: string;
    type: ApplicationCommandOptionType;
    value?: string | number | boolean | undefined;
    options?: ApplicationCommandInteractionDataOption[] | undefined;
    focused?: boolean | undefined;
};
type ApplicationCommandInteractionData = {
    id: Snowflake;
    name: string;
    type: ApplicationCommandType;
    resolved?: ResolvedData | undefined;
    options?: ApplicationCommandInteractionDataOption[] | undefined;
    guild_id: Snowflake;
    target_id?: string | undefined;
};
type ResolvedData = {
    /**
     * - The ids and [User]{@link https://discord.com/developers/docs/resources/user#user-object} objects
     */
    users?: Record<Snowflake, User>;
    /**
     * - The ids and partial [Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object} objects
     */
    members?: Record<Snowflake, MemberParams>;
    /**
     * - The ids and [Role]{@link https://discord.com/developers/docs/topics/permissions#role-object} objects
     */
    roles?: Record<Snowflake, Role>;
    /**
     * - The ids and partial [Channel]{@link https://discord.com/developers/docs/resources/channel#channel-object} objects
     */
    channels?: Record<Snowflake, Channel>;
    /**
     * - The ids and partial [Message]{@link https://discord.com/developers/docs/resources/channel#message-object} objects
     */
    messages?: Record<Snowflake, Message>;
    /**
     * - The ids and [Attachment]{@link https://discord.com/developers/docs/resources/channel#attachment-object} objects
     */
    attachments?: Record<Snowflake, Attachment>;
};
type MessageComponentInteractionData = {
    custom_id: string;
    component_type: ComponentType;
    values?: string[] | undefined;
};
type ModalSubmitComponentData = {
    /**
     * - Input value for text input
     */
    value: string;
    /**
     * - The type of the component (4 for Modal).
     */
    type: ComponentType;
    /**
     * - Custom ID of the text input field
     */
    custom_id: string;
};
type ModalSubmitInteractionData = {
    custom_id: string;
    components?: ActionRow<ModalSubmitComponentData>[] | undefined;
};
type InteractionData = ModalSubmitInteractionData | ApplicationCommandInteractionData | MessageComponentInteractionData;
//# sourceMappingURL=types.d.ts.map