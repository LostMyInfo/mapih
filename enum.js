
const permissionNames = {
    CREATE_INSTANT_INVITE: (1 << 0),//	Allows creation of instant invites	T, V, S
    KICK_MEMBERS: (1 << 1),//	Allows kicking members	
    BAN_MEMBERS: (1 << 2),//	Allows banning members	
    ADMINISTRATOR: (1 << 3),//	Allows all permissions and bypasses channel permission overwrites	
    MANAGE_CHANNELS: (1 << 4),//	Allows management and editing of channels	T, V, S
    MANAGE_GUILD: (1 << 5),//	Allows management and editing of the guild	
    ADD_REACTIONS: (1 << 6),//	Allows for the addition of reactions to messages	T, V
    VIEW_AUDIT_LOG: (1 << 7),//	Allows for viewing of audit logs	
    PRIORITY_SPEAKER: (1 << 8),//	Allows for using priority speaker in a voice channel	V
    STREAM: (1 << 9),//	Allows the user to go live	V
    VIEW_CHANNEL: (1 << 10),//	Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels	T, V, S
    SEND_MESSAGES: (1 << 11),//	Allows for sending messages in a channel and creating threads in a forum (does not allow sending messages in threads)	T, V
    SEND_TTS_MESSAGES: (1 << 12),//	Allows for sending of /tts messages	T, V
    MANAGE_MESSAGES: (1 << 13),//	Allows for deletion of other users messages	T, V
    EMBED_LINKS: (1 << 14),//	Links sent by users with this permission will be auto-embedded	T, V
    ATTACH_FILES: (1 << 15),//	Allows for uploading images and files	T, V
    READ_MESSAGE_HISTORY: (1 << 16),//	Allows for reading of message history	T, V
    MENTION_EVERYONE: (1 << 17),//	Allows for using the @everyone tag to notify all users in a channel, and the @here tag to notify all online users in a channel	T, V, S
    USE_EXTERNAL_EMOJIS: (1 << 18),//	Allows the usage of custom emojis from other servers	T, V
    VIEW_GUILD_INSIGHTS: (1 << 19),//	Allows for viewing guild insights	
    CONNECT: (1 << 20),//	Allows for joining of a voice channel	V, S
    SPEAK: (1 << 21),//	Allows for speaking in a voice channel	V
    MUTE_MEMBERS: (1 << 22),//	Allows for muting members in a voice channel	V, S
    DEAFEN_MEMBERS: (1 << 23),//	Allows for deafening of members in a voice channel	V, S
    MOVE_MEMBERS: (1 << 24),//	Allows for moving of members between voice channels	V, S
    USE_VAD: (1 << 25),//	Allows for using voice-activity-detection in a voice channel	V
    CHANGE_NICKNAME: (1 << 26),//	Allows for modification of own nickname	
    MANAGE_NICKNAMES: (1 << 27),//	Allows for modification of other users nicknames	
    MANAGE_ROLES: (1 << 28),//	Allows management and editing of roles	T, V, S
    MANAGE_WEBHOOKS: (1 << 29),//	Allows management and editing of webhooks	T, V
    MANAGE_EMOJIS_AND_STICKERS: (1 << 30),//	Allows management and editing of emojis and stickers	
    USE_APPLICATION_COMMANDS: (1 << 31),//	Allows members to use application commands, including slash commands and context menu commands.	T, V
    REQUEST_TO_SPEAK: (1 << 32),//	Allows for requesting to speak in stage channels. (This permission is under active development and may be changed or removed.)	S
    MANAGE_EVENTS: (1 << 33),//	Allows for creating, editing, and deleting scheduled events	V, S
    MANAGE_THREADS: (1 << 34),//	Allows for deleting and archiving threads, and viewing all private threads	T
    CREATE_PUBLIC_THREADS: (1 << 35),//	Allows for creating public and announcement threads	T
    CREATE_PRIVATE_THREADS: (1 << 36),//	Allows for creating private threads	T
    USE_EXTERNAL_STICKERS: (1 << 37),//	Allows the usage of custom stickers from other servers	T, V
    SEND_MESSAGES_IN_THREADS: (1 << 38),//	Allows for sending messages in threads	T
    USE_EMBEDDED_ACTIVITIES: (1 << 39),//	Allows for using Activities (applications with the EMBEDDED flag) in a voice channel	V
    MODERATE_MEMBERS: (1 << 40),//	Allows for timing out users to prevent them from sending or reacting to messages in chat and threads, and from speaking in voice and stage channels	
};

const userFlags = {
    "Discord Employee": 1 << 0, //	STAFF	
    "Partnered Server Owner": 1 << 1, //	PARTNER	
    "HypeSquad Events Member": 1 << 2, //	HYPESQUAD	
    "Bug Hunter Level 1": 1 << 3, //	BUG_HUNTER_LEVEL_1
    "House Bravery Member": 1 << 6, //	HYPESQUAD_ONLINE_HOUSE_1
    "House Brilliance Member": 1 << 7, //	HYPESQUAD_ONLINE_HOUSE_2
    "House Balance Member": 1 << 8, //	HYPESQUAD_ONLINE_HOUSE_3
    "Early Nitro Supporter": 1 << 9, //	PREMIUM_EARLY_SUPPORTER
    "User is a team": 1 << 10, //	TEAM_PSEUDO_USER
    "Bug Hunter Level 2": 1 << 14, //	BUG_HUNTER_LEVEL_2
    "Verified Bot": 1 << 16, //	VERIFIED_BOT
    "Early Verified Bot Developer": 1 << 17, //	VERIFIED_DEVELOPER
    "Discord Certified Moderator": 1 << 18, //	CERTIFIED_MODERATOR
    "Bot uses only HTTP interactions and is shown in the online member list": 1 << 19, //	BOT_HTTP_INTERACTIONS
};

const Intents = {
    GUILDS: 1 << 0, // 1 << 0 = 1
    GUILD_MEMBERS: 1 << 1, // 1 << 1 = 2
    GUILD_BANS: 1 << 2, // 1 << 2 = 4
    GUILD_EMOJIS_AND_STICKERS: 1 << 3, // 1 << 3 = 8
    GUILD_INTEGRATIONS: 1 << 4, // 1 << 4 = 16
    GUILD_WEBHOOKS: 1 << 5, // 1 << 5 = 32
    GUILD_INVITES: 1 << 6, // 1 << 6 = 64
    GUILD_VOICE_STATES: 1 << 7, // 1 << 7 = 128
    GUILD_PRESENCES: 1 << 8, // 1 << 8 = 256
    GUILD_MESSAGES: 1 << 9, // 1 << 9 = 512
    GUILD_MESSAGE_REACTIONS: 1 << 10, // 1 << 10 = 1024
    GUILD_MESSAGE_TYPING: 1 << 11, // 1 << 11 = 2048
    DIRECT_MESSAGES: 1 << 12, // 1 << 12 = 4096
    DIRECT_MESSAGE_REACTIONS: 1 << 13, // 1 << 13 = 8192
    DIRECT_MESSAGE_TYPING: 1 << 14, // 1 << 14 = 16384
    MESSAGE_CONTENT: 1 << 15, // 1 << 15 = 32768
    GUILD_SCHEDULED_EVENTS: 1 << 16, // 1 << 16 = 65536
    AUTO_MODERATION_CONFIGURATION: 1 << 20, // 1 << 20 = 1048576
    AUTO_MODERATION_EXECUTION: 1 << 21,  // 1 << 21 = 2097152
};

// Socket close messages
const socket_close = {
    // RFC6455 - https://datatracker.ietf.org/doc/html/rfc6455#section-7.4.1
    1000: "Socket fulfilled - Normal Closure",
    1002: "Heartbeat Not Acknowledged",
    1005: "Status Failure - Reconnecting",
    1006: "Zombie Socket - Reconnecting",
    1011: "Invalid Session - Internal Error",
    1012: "Recieved Re-Connect Signal",
    // Discord - https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
    4000: "Unknown error: We're not sure what went wrong. Try reconnecting?",
    4001: "Unknown opcode: You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that!",
    4002: "Decode error: You sent an invalid payload to us. Don't do that!",
    4003: "Not authenticated: You sent us a payload prior to identifying.",
    4004: "Authentication failed: The account token sent with your identify payload is incorrect.",
    4005: "Already authenticated: You sent more than one identify payload. Don't do that!",
    4007: "Invalid seq: The sequence sent when resuming the session was invalid. \nReconnect and start a new session.",
    4008: "Rate limited: Woah nelly! You're sending payloads to us too quickly. Slow it down! \nYou will be disconnected on receiving this.",
    4009: "Session timed out: Your session timed out. \nReconnect and start a new one.",
    4010: "Invalid shard: You sent us an invalid shard when identifying.",
    4011: "Sharding required: The session would have handled too many guilds \n- you are required to shard your connection in order to connect.",
    4012: "Invalid API version: You sent an invalid version for the gateway.",
    4013: "Invalid intent(s): You sent an invalid intent for a Gateway Intent. \nYou may have incorrectly calculated the bitwise value.",
    4014: "Disallowed intent(s): You sent a disallowed intent for a Gateway Intent. \nYou may have tried to specify an intent that you have not enabled or are not approved for.",
};
module.exports = { Intents, socket_close, userFlags, permissionNames };