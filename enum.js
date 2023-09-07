/* eslint-disable no-multi-spaces */
const BATCHSIZE = parseInt(process.env.batch_size);

const GEO_REGIONS = [
  'montreal', 'newark', 'us-east', 'us-central', 'atlanta'
];

const APP_FLAGS = {
  GATEWAY_PRESENCE: 1 << 12, // = 4096	Intent required for bots in 100 or more servers to receive presence_update events
  GATEWAY_PRESENCE_LIMITED: 1 << 13, // = 8192	Intent required for bots in under 100 servers to receive presence_update events, found in Bot Settings
  GATEWAY_GUILD_MEMBERS: 1 << 14, // = 16384	Intent required for bots in 100 or more servers to receive member-related events like guild_member_add. See list of member-related events under GUILD_MEMBERS
  GATEWAY_GUILD_MEMBERS_LIMITED: 1 << 15, // = 32768	Intent required for bots in under 100 servers to receive member-related events like guild_member_add, found in Bot Settings. See list of member-related events under GUILD_MEMBERS
  VERIFICATION_PENDING_GUILD_LIMIT: 1 << 16, // = 65536	Indicates unusual growth of an app that prevents verification
  EMBEDDED: 1 << 17, // = 131072	Indicates if an app is embedded within the Discord client (currently unavailable publicly)
  GATEWAY_MESSAGE_CONTENT: 1 << 18, // = 262144	Intent required for bots in 100 or more servers to receive message content
  GATEWAY_MESSAGE_CONTENT_LIMITED: 1 << 19, // = 524288	Intent required for bots in under 100 servers to receive message content, found in Bot Settings
  APPLICATION_COMMAND_BADGE: 1 << 23 // = 8388608	Indicates if an app has registered global application commands
};

const BASE_INTENTS = {
  GUILDS: 1 << 0, // 1 << 0 = 1
  GUILD_BANS: 1 << 2, // 1 << 2 = 4
  GUILD_EMOJIS_AND_STICKERS: 1 << 3, // 1 << 3 = 8
  GUILD_INTEGRATIONS: 1 << 4, // 1 << 4 = 16
  GUILD_WEBHOOKS: 1 << 5, // 1 << 5 = 32
  GUILD_INVITES: 1 << 6, // 1 << 6 = 64
  GUILD_VOICE_STATES: 1 << 7, // 1 << 7 = 128
  GUILD_MESSAGES: 1 << 9, // 1 << 9 = 512
  GUILD_MESSAGE_REACTIONS: 1 << 10, // 1 << 10 = 1024
  GUILD_MESSAGE_TYPING: 1 << 11, // 1 << 11 = 2048
  DIRECT_MESSAGES: 1 << 12, // 1 << 12 = 4096
  DIRECT_MESSAGE_REACTIONS: 1 << 13, // 1 << 13 = 8192
  DIRECT_MESSAGE_TYPING: 1 << 14, // 1 << 14 = 16384
  GUILD_SCHEDULED_EVENTS: 1 << 16, // 1 << 16 = 65536
  AUTO_MODERATION_CONFIGURATION: 1 << 20, // 1 << 20 = 1048576
  AUTO_MODERATION_EXECUTION: 1 << 21 // 1 << 21 = 2097152
};
const PRIVILEGED = {
  GUILD_MEMBERS: 1 << 1, // 1 << 1 = 2
  GUILD_PRESENCES: 1 << 8, // 1 << 8 = 256
  MESSAGE_CONTENT: 1 << 15 // 1 << 15 = 32768
};

const PERMISSION_NAMES = {
  CREATE_INSTANT_INVITE: (1 << 0), //	Allows creation of instant invites	T, V, S
  KICK_MEMBERS: (1 << 1), //	Allows kicking members	
  BAN_MEMBERS: (1 << 2), //	Allows banning members	
  ADMINISTRATOR: (1 << 3), //	Allows all permissions and bypasses channel permission overwrites	
  MANAGE_CHANNELS: (1 << 4), //	Allows management and editing of channels	T, V, S
  MANAGE_GUILD: (1 << 5), //	Allows management and editing of the guild	
  ADD_REACTIONS: (1 << 6), //	Allows for the addition of reactions to messages	T, V
  VIEW_AUDIT_LOG: (1 << 7), //	Allows for viewing of audit logs	
  PRIORITY_SPEAKER: (1 << 8), //	Allows for using priority speaker in a voice channel	V
  STREAM: (1 << 9), //	Allows the user to go live	V
  VIEW_CHANNEL: (1 << 10), //	Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels	T, V, S
  SEND_MESSAGES: (1 << 11), //	Allows for sending messages in a channel and creating threads in a forum (does not allow sending messages in threads)	T, V
  SEND_TTS_MESSAGES: (1 << 12), //	Allows for sending of /tts messages	T, V
  MANAGE_MESSAGES: (1 << 13), //	Allows for deletion of other users messages	T, V
  EMBED_LINKS: (1 << 14), //	Links sent by users with this permission will be auto-embedded	T, V
  ATTACH_FILES: (1 << 15), //	Allows for uploading images and files	T, V
  READ_MESSAGE_HISTORY: (1 << 16), //	Allows for reading of message history	T, V
  MENTION_EVERYONE: (1 << 17), //	Allows for using the @everyone tag to notify all users in a channel, and the @here tag to notify all online users in a channel	T, V, S
  USE_EXTERNAL_EMOJIS: (1 << 18), //	Allows the usage of custom emojis from other servers	T, V
  VIEW_GUILD_INSIGHTS: (1 << 19), //	Allows for viewing guild insights	
  CONNECT: (1 << 20), //	Allows for joining of a voice channel	V, S
  SPEAK: (1 << 21), //	Allows for speaking in a voice channel	V
  MUTE_MEMBERS: (1 << 22), //	Allows for muting members in a voice channel	V, S
  DEAFEN_MEMBERS: (1 << 23), //	Allows for deafening of members in a voice channel	V, S
  MOVE_MEMBERS: (1 << 24), //	Allows for moving of members between voice channels	V, S
  USE_VAD: (1 << 25), //	Allows for using voice-activity-detection in a voice channel	V
  CHANGE_NICKNAME: (1 << 26), //	Allows for modification of own nickname	
  MANAGE_NICKNAMES: (1 << 27), //	Allows for modification of other users nicknames	
  MANAGE_ROLES: (1 << 28), //	Allows management and editing of roles	T, V, S
  MANAGE_WEBHOOKS: (1 << 29), //	Allows management and editing of webhooks	T, V
  MANAGE_EMOJIS_AND_STICKERS: (1 << 30), //	Allows management and editing of emojis and stickers	
  USE_APPLICATION_COMMANDS: (1 << 31), //	Allows members to use application commands, including slash commands and context menu commands.	T, V
  REQUEST_TO_SPEAK: (1 << 32), //	Allows for requesting to speak in stage channels. (This permission is under active development and may be changed or removed.)	S
  MANAGE_EVENTS: (1 << 33), //	Allows for creating, editing, and deleting scheduled events	V, S
  MANAGE_THREADS: (1 << 34), //	Allows for deleting and archiving threads, and viewing all private threads	T
  CREATE_PUBLIC_THREADS: (1 << 35), //	Allows for creating public and announcement threads	T
  CREATE_PRIVATE_THREADS: (1 << 36), //	Allows for creating private threads	T
  USE_EXTERNAL_STICKERS: (1 << 37), //	Allows the usage of custom stickers from other servers	T, V
  SEND_MESSAGES_IN_THREADS: (1 << 38), //	Allows for sending messages in threads	T
  USE_EMBEDDED_ACTIVITIES: (1 << 39), //	Allows for using Activities (applications with the EMBEDDED flag) in a voice channel	V
  MODERATE_MEMBERS: (1 << 40)//	Allows for timing out users to prevent them from sending or reacting to messages in chat and threads, and from speaking in voice and stage channels	
};

// Resumeable close event codes.
const RESUMEABLE = {
  1012: true,
  1006: true,
  1002: true,
  1001: true,
  5000: true
};

// Socket close messages
const SOCKET_CLOSE = {
  // RFC6455 - https://datatracker.ietf.org/doc/html/rfc6455#section-7.4.1
  1000: 'Socket fulfilled - Normal Closure',
  1001: 'Going away - Gateway closing',
  1002: 'Heartbeat Not Acknowledged',
  1005: 'Status Failure - Reconnecting',
  1006: 'Zombie Socket - Reconnecting',
  1011: 'Invalid Session - Internal Error',
  1012: 'Recieved Re-Connect Signal',
  // Discord - https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
  4000: 'Unknown error: We\'re not sure what went wrong. Try reconnecting?',
  4001: 'Unknown opcode: You sent an invalid Gateway opcode or an invalid payload for an opcode. Don\'t do that!',
  4002: 'You sent an invalid payload or the payload exceeded 4096 bytes.',
  4003: 'Not authenticated: You sent us a payload prior to identifying.',
  4004: 'Authentication failed: The account token sent with your identify payload is incorrect.',
  4005: 'Already authenticated: You sent more than one identify payload. Don\'t do that!',
  4007: 'Invalid seq: The sequence sent when resuming the session was invalid. \nReconnect and start a new session.',
  4008: 'Rate limited: Woah nelly! You\'re sending payloads to us too quickly. Slow it down! \nYou will be disconnected on receiving this.',
  4009: 'Session timed out: Your session timed out. \nReconnect and start a new one.',
  4010: 'Invalid shard: You sent us an invalid shard when identifying.',
  4011: 'Sharding required: The session would have handled too many guilds \n- you are required to shard your connection in order to connect.',
  4012: 'Invalid API version: You sent an invalid version for the gateway.',
  4013: 'Invalid intent(s): You sent an invalid intent for a Gateway Intent. \nYou may have incorrectly calculated the bitwise value.',
  4014: 'Disallowed intent(s): You sent a disallowed intent for a Gateway Intent. \nYou may have tried to specify an intent that you have not enabled or are not approved for.'
};

const USER_FLAGS = {
  'Discord Employee': 1 << 0, //	STAFF	
  'Partnered Server Owner': 1 << 1, //	PARTNER	
  'HypeSquad Events Member': 1 << 2, //	HYPESQUAD	
  'Bug Hunter Level 1': 1 << 3, //	BUG_HUNTER_LEVEL_1
  '4': 1 << 4, //	4	
  '5': 1 << 5, //	5	
  'House Bravery Member': 1 << 6, //	HYPESQUAD_ONLINE_HOUSE_1
  'House Brilliance Member': 1 << 7, //	HYPESQUAD_ONLINE_HOUSE_2
  'House Balance Member': 1 << 8, //	HYPESQUAD_ONLINE_HOUSE_3
  'Early Nitro Supporter': 1 << 9, //	PREMIUM_EARLY_SUPPORTER
  'User is a team': 1 << 10, //	TEAM_PSEUDO_USER
  '11': 1 << 11, //	
  '12': 1 << 12, //	
  '13': 1 << 13, //	
  'Bug Hunter Level 2': 1 << 14, //	BUG_HUNTER_LEVEL_2
  '15': 1 << 15, //	
  'Verified Bot': 1 << 16, //	VERIFIED_BOT
  'Early Verified Bot Developer': 1 << 17, //	VERIFIED_DEVELOPER
  'Discord Certified Moderator': 1 << 18, //	CERTIFIED_MODERATOR
  'Interactions Handler': 1 << 19, //	BOT_HTTP_INTERACTIONS
  '20': 1 << 20, //	
  '21': 1 << 21, //	
  'Active Developer': 1 << 22, //	ACTIVE_DEVELOPER
  '23': 1 << 23, //		
  '24': 1 << 24, //	
  '25': 1 << 25, //	
  '26': 1 << 26 //	
};

const rejectKeys = [

  'cmd',
  'uuid',
  'auid'

];

const TEXTFIELDS = {

  API: '10',
  ENCODING: 'json',
  GATEWAY: 'gateway.discord.gg'

};

/**
 * @global
 * @enum {number}
 */
const componentType = {
  ActionRow: 1,
  Button: 2,
  StringSelect: 3,
  TextInput: 4,
  UserSelect: 5,
  RoleSelect: 6,
  MentionableSelect: 7,
  ChannelSelect: 8
};

/**
 * @global
 * @enum {string}
 */
const ComponentType = {
  1: 'Action Row',
  2: 'Button',
  3: 'String Select',
  4: 'Text Input (Modal)',
  5: 'User Select',
  6: 'Role Select',
  7: 'Mentionable Select',
  8: 'Channel Select'
};

/**
 * @global
 * @enum {number}
 */
const buttonStyle = {
  Primary: 1,
  Secondary: 2,
  Success: 3,
  Danger: 4,
  Link: 5
};

/**
 * @global
 * @enum {string}
 */
const messageType = {
  0: 'Default',
  1: 'Recipient Add',
  2: 'Recipient Remove',
  3: 'Call',
  4: 'Channel Name Change',
  5: 'Channel Icon Change',
  6: 'Channel Pinned Message',
  7: 'User Join',
  8: 'Guild Boost',
  9: 'Guild Boost Tier 1',
  10: 'Guild Boost Tier 2',
  11: 'Guild Boost Tier 3',
  12: 'Channel Follow Add',
  14: 'Guild Discovery Disqualified',
  15: 'Guild Discovery Requalified',
  16: 'Guild Discovery Grace Period Initial Warning',
  17: 'Guild Discovery Grace Period Final Warning',
  18: 'Thread Created',
  19: 'Reply',
  20: 'Chat Input Command',
  21: 'Thread Starter Message',
  22: 'Guild Invite Reminder',
  23: 'Context Menu Command',
  24: 'Auto Moderation Action',
  25: 'Role Subscription Purchase',
  26: 'Interaction Premium Upsell',
  27: 'Stage Start',
  28: 'Stage End',
  29: 'Stage Speaker',
  31: 'Stage Topic',
  32: 'Guild Application Premium Subscription'
};

/**
 * @global
 * @enum {string}
 */
const channelType = {
  0: 'Guild Text',
  1: 'DM',
  2: 'Guild Voice',
  3: 'Group DM',
  4: 'Guild Category',
  5: 'Guild Announcement',
  10: 'Announcement Thread',
  11: 'Public Thread',
  12: 'Private Thread',
  13: 'Guild Stage Voice',
  14: 'Guild Directory',
  15: 'Guild Forum',
  16: 'Guild Media'
};

/**
 * @global
 * @enum {string}
 */
const InteractionType = {
  1: 'Ping',
  2: 'Application Command',
  3: 'Message Component',
  4: 'Application Command Autocomplete',
  5: 'Modal Submit'
};

/**
 * @global
 * @enum {string}
 */
const ApplicationCommandType = {
  1: 'Chat Input',
  2: 'Context Menu (USER)',
  3: 'Context Menu (MESSAGE)'
};

/**
 * @global
 * @enum {string}
 */
const WebhookType = {
  1: 'Incoming',
  2: 'Channel Follower',
  3: 'Application'
};

/**
 * @global
 * @enum {string}
 */
const ExplicitContentFilter = {
  0: 'Disabled',
  1: 'Members without roles',
  2: 'All members'
};

/**
 * @global
 * @enum {string}
 */
const NSFWLevel = {
  0: 'Default',
  1: 'Explicit',
  2: 'Safe',
  3: 'Age-Restricted'
};


const SystemChanFlags = {
  'Suppress Join Notifications': 1 << 0,
  'Suppress Premium Subscriptions': 1 << 1,
  'Suppress Guild Reminder Notifications': 1 << 2,
  'Suppress Join Notification Replies': 1 << 3,
  'Suppress Role Subscription Purchase Notifications': 1 << 4,
  'Suppress Role Subscription Purchase Notification Replies': 1 << 5
};

const MessageFlags = {
  'Crossposted': 1 << 0,
  'Is Crosspost': 1 << 1,
  'Suppress Embeds': 1 << 2,
  'Source Message Deleted': 1 << 3,
  'Urgent': 1 << 4,
  'Has Thread': 1 << 5,
  'Ephemeral': 1 << 6,
  'Loading': 1 << 7,
  'Failed To Mention Some Roles In Thread': 1 << 8,
  'Suppress Notifications': 1 << 12,
  'Is Voice Message': 1 << 13
};

const ScheduledEventEntityType = {
  1: 'Stage Instance',
  2: 'Voice',
  3: 'External'
};

const ScheduledEventStatus = {
  1: 'Scheduled',
  2: 'Active',
  3: 'Completed',
  4: 'Canceled'
};

const AuditLogEvents = {
  1: { name: 'guild_update',   description: 'Server settings were updated' },
  10: { name: 'channel_create', description: 'A channel was created' },
  11: { name: 'channel_update', description: 'A channel\'s settings were updated' },
  12: { name: 'channel_delete', description: 'A channel was deleted' },
  13: { name: 'channel_overwrite_create', description: 'Permission overwrite was added to a channel' },
  14: { name: 'channel_overwrite_update', description: 'Permission overwrite was updated for a channel' },
  15: { name: 'channel_overwrite_delete', description: 'Permission overwrite was deleted from a channel' },
  20: { name: 'member_kick',        description: 'Member was removed from the server' },
  21: { name: 'member_prune',       description: 'Members were pruned from the server' },
  22: { name: 'member_ban_add',     description: 'Member was banned from the server' },
  23: { name: 'member_ban_remove',  description: 'A server ban was lifted for a member' },
  24: { name: 'member_update',      description: 'Member was updated in the server' },
  25: { name: 'member_role_update', description: 'Member was added or removed from a role' },
  26: { name: 'member_move',        description: 'member was moved to a different voice channel' },
  27: { name: 'member_disconnect',  description: 'Member was disconnected from a voice channel' },
  28: { name: 'bot_add',     description: 'A bot was added to the server' },
  30: { name: 'role_create', description: 'A role was created' },
  31: { name: 'role_update', description: 'A role was edited' },
  32: { name: 'role_delete', description: 'A role was deleted' },
  40: { name: 'invite_create',  description: 'An invite was created' },
  41: { name: 'invite_update',  description: 'An invite was updated' },
  42: { name: 'invite_delete',  description: 'An invite was deleted' },
  50: { name: 'webhook_create', description: 'A webhook was created' },
  51: { name: 'webhook_update', description: 'Webhook properties or channel were updated' },
  52: { name: 'webhook_delete', description: 'A webhook was deleted' },
  60: { name: 'Emoji Created', description: 'An emoji was created', event: 'guild_emoji_update' },
  61: { name: 'Emoji Updated', description: 'An emoji\'s name was changed', event: 'guild_emoji_update' },
  62: { name: 'Emoji Deleted', description: 'An emoji was deleted', event: 'guild_emoji_update' },
  72: { name: 'Message Deleted', description: 'A message was deleted' },
  73: { name: 'Messages Deleted (bulk)', description: 'Multiple messages were deleted' },
  74: { name: 'Message Pinned', description: 'A message was pinned to a channel' },
  75: { name: 'Message Unpinned', description: 'A message was unpinned from a channel' },
  80: { name: 'Integration Created', description: 'An app was added to the server' },
  81: { name: 'Integration Updated', description: 'An app was updated' },
  82: { name: 'Integration Deleted', description: 'An app was removed from the server' },
  83: { name: 'Stage Instance Created', description: 'Stage instance was created (stage channel becomes live)' },
  84: { name: 'Stage Instance Updated', description: 'Stage instance details were updated' },
  85: { name: 'Stage Instance Deleted', description: 'Stage instance was deleted (stage channel is no longer live)' },
  90: { name: 'Sticker Created', description: 'A sticker was created' },
  91: { name: 'Sticker Updated', description: 'A sticker\'s details were updated' },
  92: { name: 'Sticker Deleted', description: 'A sticker was deleted' },
  100: { name: 'Scheduled Event Created', description: 'An event was created' },
  101: { name: 'Scheduled Event Updated', description: 'An event was updated' },
  102: { name: 'Scheduled Event Cancelled', description: 'An event was cancelled' },
  110: { name: 'Thread Created', description: 'A thread was created in a channel' },
  111: { name: 'Thread Updated', description: 'A thread was updated' },
  112: { name: 'Thread Deleted', description: 'A thread was deleted' },
  121: { name: 'application_command_permission_update', description: 'Slash Command Permissions Updated' },
  130: { name: 'Soundboard Sound Create', description: 'A sound was created' },
  131: { name: 'Soundboard Sound Update', description: 'A sound was updated' },
  132: { name: 'Soundboard Sound Delete', description: 'A sound was deleted' },
  140: { name: 'auto_moderation_rule_create', description: 'AutoMod Rule Created' },
  141: { name: 'auto_moderation_rule_update', description: 'AutoMod Rule Updated' },
  142: { name: 'auto_moderation_rule_delete', description: 'AutoMod Rule Deleted' },
  143: { name: 'auto_moderation_block_message', description: 'Message Blocked By AutoMod' },
  144: { name: 'Auto Moderation Flag to Channel', description: '' },
  145: { name: 'Auto Moderation User Comm Disabled', description: '' },
  146: { name: 'Auto Moderation Quarantine User', description: '' },
  150: { name: 'Creator Monetization Request Created', description: '' },
  151: { name: 'Creator Monetization Terms Accepted', description: '' },
  163: { name: 'Onboarding Prompt Create', description: '' },
  164: { name: 'Onboarding Prompt Update', description: '' },
  165: { name: 'Onboarding Prompt Delete', description: '' },
  166: { name: 'Onboarding Create', description: '' },
  167: { name: 'Onboarding Update', description: '' },
  171: { name: 'Guild Home Feature Item', description: '' },
  172: { name: 'Guild Home Remove Item', description: '' },
  180: { name: 'Harmful Links Blocked Message', description: '' },
  190: { name: 'Home Settings Create', description: '' },
  191: { name: 'Home Settings Update', description: '' },
  192: { name: 'Voice Channel Status Create', description: '' },
  193: { name: 'Voice Channel Status Delete', description: '' }
};

const PremiumTierLimits = {
  0: {
    emojis: {
      static: 50, animated: 50
    },
    stickers: 5
  },
  1: {
    emojis: {
      static: 150, animated: 150
    },
    stickers: 15
  },
  2: {
    emojis: {
      static: 150, animated: 150
    },
    stickers: 30
  }
};

module.exports = { BATCHSIZE, rejectKeys, TEXTFIELDS, GEO_REGIONS, APP_FLAGS, BASE_INTENTS, PRIVILEGED, PERMISSION_NAMES, RESUMEABLE, SOCKET_CLOSE, USER_FLAGS, InteractionType, channelType, messageType, ComponentType, componentType, ApplicationCommandType, WebhookType, AuditLogEvents, buttonStyle, ExplicitContentFilter, NSFWLevel, SystemChanFlags, MessageFlags, ScheduledEventEntityType, ScheduledEventStatus, PremiumTierLimits };