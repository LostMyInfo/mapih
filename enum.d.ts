export const BATCHSIZE: number;
export const rejectKeys: string[];
export namespace TEXTFIELDS {
    const API: string;
    const ENCODING: string;
    const GATEWAY: string;
}
export const GEO_REGIONS: string[];
export namespace APP_FLAGS {
    const GATEWAY_PRESENCE: number;
    const GATEWAY_PRESENCE_LIMITED: number;
    const GATEWAY_GUILD_MEMBERS: number;
    const GATEWAY_GUILD_MEMBERS_LIMITED: number;
    const VERIFICATION_PENDING_GUILD_LIMIT: number;
    const EMBEDDED: number;
    const GATEWAY_MESSAGE_CONTENT: number;
    const GATEWAY_MESSAGE_CONTENT_LIMITED: number;
    const APPLICATION_COMMAND_BADGE: number;
}
export namespace BASE_INTENTS {
    const GUILDS: number;
    const GUILD_BANS: number;
    const GUILD_EMOJIS_AND_STICKERS: number;
    const GUILD_INTEGRATIONS: number;
    const GUILD_WEBHOOKS: number;
    const GUILD_INVITES: number;
    const GUILD_VOICE_STATES: number;
    const GUILD_MESSAGES: number;
    const GUILD_MESSAGE_REACTIONS: number;
    const GUILD_MESSAGE_TYPING: number;
    const DIRECT_MESSAGES: number;
    const DIRECT_MESSAGE_REACTIONS: number;
    const DIRECT_MESSAGE_TYPING: number;
    const GUILD_SCHEDULED_EVENTS: number;
    const AUTO_MODERATION_CONFIGURATION: number;
    const AUTO_MODERATION_EXECUTION: number;
}
export namespace PRIVILEGED {
    const GUILD_MEMBERS: number;
    const GUILD_PRESENCES: number;
    const MESSAGE_CONTENT: number;
}
export namespace PERMISSION_NAMES {
    const CREATE_INSTANT_INVITE: number;
    const KICK_MEMBERS: number;
    const BAN_MEMBERS: number;
    const ADMINISTRATOR: number;
    const MANAGE_CHANNELS: number;
    const MANAGE_GUILD: number;
    const ADD_REACTIONS: number;
    const VIEW_AUDIT_LOG: number;
    const PRIORITY_SPEAKER: number;
    const STREAM: number;
    const VIEW_CHANNEL: number;
    const SEND_MESSAGES: number;
    const SEND_TTS_MESSAGES: number;
    const MANAGE_MESSAGES: number;
    const EMBED_LINKS: number;
    const ATTACH_FILES: number;
    const READ_MESSAGE_HISTORY: number;
    const MENTION_EVERYONE: number;
    const USE_EXTERNAL_EMOJIS: number;
    const VIEW_GUILD_INSIGHTS: number;
    const CONNECT: number;
    const SPEAK: number;
    const MUTE_MEMBERS: number;
    const DEAFEN_MEMBERS: number;
    const MOVE_MEMBERS: number;
    const USE_VAD: number;
    const CHANGE_NICKNAME: number;
    const MANAGE_NICKNAMES: number;
    const MANAGE_ROLES: number;
    const MANAGE_WEBHOOKS: number;
    const MANAGE_EMOJIS_AND_STICKERS: number;
    const USE_APPLICATION_COMMANDS: number;
    const REQUEST_TO_SPEAK: number;
    const MANAGE_EVENTS: number;
    const MANAGE_THREADS: number;
    const CREATE_PUBLIC_THREADS: number;
    const CREATE_PRIVATE_THREADS: number;
    const USE_EXTERNAL_STICKERS: number;
    const SEND_MESSAGES_IN_THREADS: number;
    const USE_EMBEDDED_ACTIVITIES: number;
    const MODERATE_MEMBERS: number;
}
export const RESUMEABLE: {
    1012: boolean;
    1006: boolean;
    1002: boolean;
    1001: boolean;
    5000: boolean;
};
export const SOCKET_CLOSE: {
    1000: string;
    1001: string;
    1002: string;
    1005: string;
    1006: string;
    1011: string;
    1012: string;
    4000: string;
    4001: string;
    4002: string;
    4003: string;
    4004: string;
    4005: string;
    4007: string;
    4008: string;
    4009: string;
    4010: string;
    4011: string;
    4012: string;
    4013: string;
    4014: string;
};
export const USER_FLAGS: {
    'Discord Employee': number;
    'Partnered Server Owner': number;
    'HypeSquad Events Member': number;
    'Bug Hunter Level 1': number;
    '4': number;
    '5': number;
    'House Bravery Member': number;
    'House Brilliance Member': number;
    'House Balance Member': number;
    'Early Nitro Supporter': number;
    'User is a team': number;
    '11': number;
    '12': number;
    '13': number;
    'Bug Hunter Level 2': number;
    '15': number;
    'Verified Bot': number;
    'Early Verified Bot Developer': number;
    'Discord Certified Moderator': number;
    'Interactions Handler': number;
    '20': number;
    '21': number;
    'Active Developer': number;
    '23': number;
    '24': number;
    '25': number;
    '26': number;
};
export type InteractionType = string;
/**
 * @global
 * @enum {string}
 */
export const InteractionType: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
};
export type channelType = string;
/**
 * @global
 * @enum {string}
 */
export const channelType: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    10: string;
    11: string;
    12: string;
    13: string;
    14: string;
    15: string;
    16: string;
};
export type messageType = string;
/**
 * @global
 * @enum {string}
 */
export const messageType: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
    14: string;
    15: string;
    16: string;
    17: string;
    18: string;
    19: string;
    20: string;
    21: string;
    22: string;
    23: string;
    24: string;
    25: string;
    26: string;
    27: string;
    28: string;
    29: string;
    31: string;
    32: string;
};
export type ComponentType = string;
/**
 * @global
 * @enum {string}
 */
export const ComponentType: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
};
export type componentType = number;
export namespace componentType {
    const ActionRow: number;
    const Button: number;
    const StringSelect: number;
    const TextInput: number;
    const UserSelect: number;
    const RoleSelect: number;
    const MentionableSelect: number;
    const ChannelSelect: number;
}
export type ApplicationCommandType = string;
/**
 * @global
 * @enum {string}
 */
export const ApplicationCommandType: {
    1: string;
    2: string;
    3: string;
};
export type WebhookType = string;
/**
 * @global
 * @enum {string}
 */
export const WebhookType: {
    1: string;
    2: string;
    3: string;
};
export const AuditLogEvents: {
    1: {
        name: string;
        description: string;
    };
    10: {
        name: string;
        description: string;
    };
    11: {
        name: string;
        description: string;
    };
    12: {
        name: string;
        description: string;
    };
    13: {
        name: string;
        description: string;
    };
    14: {
        name: string;
        description: string;
    };
    15: {
        name: string;
        description: string;
    };
    20: {
        name: string;
        description: string;
    };
    21: {
        name: string;
        description: string;
    };
    22: {
        name: string;
        description: string;
    };
    23: {
        name: string;
        description: string;
    };
    24: {
        name: string;
        description: string;
    };
    25: {
        name: string;
        description: string;
    };
    26: {
        name: string;
        description: string;
    };
    27: {
        name: string;
        description: string;
    };
    28: {
        name: string;
        description: string;
    };
    30: {
        name: string;
        description: string;
    };
    31: {
        name: string;
        description: string;
    };
    32: {
        name: string;
        description: string;
    };
    40: {
        name: string;
        description: string;
    };
    41: {
        name: string;
        description: string;
    };
    42: {
        name: string;
        description: string;
    };
    50: {
        name: string;
        description: string;
    };
    51: {
        name: string;
        description: string;
    };
    52: {
        name: string;
        description: string;
    };
    60: {
        name: string;
        description: string;
        event: string;
    };
    61: {
        name: string;
        description: string;
        event: string;
    };
    62: {
        name: string;
        description: string;
        event: string;
    };
    72: {
        name: string;
        description: string;
    };
    73: {
        name: string;
        description: string;
    };
    74: {
        name: string;
        description: string;
    };
    75: {
        name: string;
        description: string;
    };
    80: {
        name: string;
        description: string;
    };
    81: {
        name: string;
        description: string;
    };
    82: {
        name: string;
        description: string;
    };
    83: {
        name: string;
        description: string;
    };
    84: {
        name: string;
        description: string;
    };
    85: {
        name: string;
        description: string;
    };
    90: {
        name: string;
        description: string;
    };
    91: {
        name: string;
        description: string;
    };
    92: {
        name: string;
        description: string;
    };
    100: {
        name: string;
        description: string;
    };
    101: {
        name: string;
        description: string;
    };
    102: {
        name: string;
        description: string;
    };
    110: {
        name: string;
        description: string;
    };
    111: {
        name: string;
        description: string;
    };
    112: {
        name: string;
        description: string;
    };
    121: {
        name: string;
        description: string;
    };
    130: {
        name: string;
        description: string;
    };
    131: {
        name: string;
        description: string;
    };
    132: {
        name: string;
        description: string;
    };
    140: {
        name: string;
        description: string;
    };
    141: {
        name: string;
        description: string;
    };
    142: {
        name: string;
        description: string;
    };
    143: {
        name: string;
        description: string;
    };
    144: {
        name: string;
        description: string;
    };
    145: {
        name: string;
        description: string;
    };
    146: {
        name: string;
        description: string;
    };
    150: {
        name: string;
        description: string;
    };
    151: {
        name: string;
        description: string;
    };
    163: {
        name: string;
        description: string;
    };
    164: {
        name: string;
        description: string;
    };
    165: {
        name: string;
        description: string;
    };
    166: {
        name: string;
        description: string;
    };
    167: {
        name: string;
        description: string;
    };
    171: {
        name: string;
        description: string;
    };
    172: {
        name: string;
        description: string;
    };
    180: {
        name: string;
        description: string;
    };
    190: {
        name: string;
        description: string;
    };
    191: {
        name: string;
        description: string;
    };
    192: {
        name: string;
        description: string;
    };
    193: {
        name: string;
        description: string;
    };
};
export type buttonStyle = number;
export namespace buttonStyle {
    const Primary: number;
    const Secondary: number;
    const Success: number;
    const Danger: number;
    const Link: number;
}
export type ExplicitContentFilter = string;
/**
 * @global
 * @enum {string}
 */
export const ExplicitContentFilter: {
    0: string;
    1: string;
    2: string;
};
export type NSFWLevel = string;
/**
 * @global
 * @enum {string}
 */
export const NSFWLevel: {
    0: string;
    1: string;
    2: string;
    3: string;
};
export const SystemChanFlags: {
    'Suppress Join Notifications': number;
    'Suppress Premium Subscriptions': number;
    'Suppress Guild Reminder Notifications': number;
    'Suppress Join Notification Replies': number;
    'Suppress Role Subscription Purchase Notifications': number;
    'Suppress Role Subscription Purchase Notification Replies': number;
};
export const MessageFlags: {
    Crossposted: number;
    'Is Crosspost': number;
    'Suppress Embeds': number;
    'Source Message Deleted': number;
    Urgent: number;
    'Has Thread': number;
    Ephemeral: number;
    Loading: number;
    'Failed To Mention Some Roles In Thread': number;
    'Suppress Notifications': number;
    'Is Voice Message': number;
};
export const ScheduledEventEntityType: {
    1: string;
    2: string;
    3: string;
};
export const ScheduledEventStatus: {
    1: string;
    2: string;
    3: string;
    4: string;
};
export const PremiumTierLimits: {
    0: {
        emojis: {
            static: number;
            animated: number;
        };
        stickers: number;
    };
    1: {
        emojis: {
            static: number;
            animated: number;
        };
        stickers: number;
    };
    2: {
        emojis: {
            static: number;
            animated: number;
        };
        stickers: number;
    };
};
//# sourceMappingURL=enum.d.ts.map