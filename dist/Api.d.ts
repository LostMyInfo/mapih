// @ts-check

import { _File } from '../api/utils/storage';
import { AccessTokenResponse, AllowedMentions, Application, ApplicationCommand, ApplicationCommandOption, ApplicationCommandOptionChoice, ApplicationRoleConnection, ApplicationRoleConnectionMetadata, Attachment, AuditLog, AutoModAction, AutoModRule, AutoModTriggerMetadata, Channel, Component, Connection, DefaultReaction, Embed, Emoji, Entitlement, EventEntityMetadata, EventUser, ExtendedInvite, FollowedChannel, ForumTag, ForumThreadMessageParams, Guild, GuildApplicationCommandPermissions, GuildBan, GuildFeatures, GuildHomeSettings, GuildIntegration, GuildOnboarding, GuildPreview, GuildScheduledEvent, GuildTemplate, GuildVoiceRegion, GuildWelcomeScreen, GuildWelcomeScreenChannel, GuildWidget, GuildWidgetSettings, InteractionParams, LocalizationMap, Member, Message, MessageReference, OnboardingPrompt, Overwrite, PartialEntitlement, PartialGuild, PermissionNames, Role, SKU, StageInstance, Sticker, StickerPack, ThreadMember, User, Webhook } from './api/discord/types/types';
// import { create1, create2, create3 } from './api/openai';
import { ChatCompletion, ChatCompletionMessage, OpenAIEmbeddingResponse, OpenAIImageResponse } from './api/openai/types/types';
import { SlackBlock } from './api/slack/types/Blocks';
import { ModalView, SlackAttachment, SlackChannel, SlackMessageResponse, SlackUser, SlackUserIdentity, SlackUserProfile } from './api/slack/types/types';
import { SpotifyReturn } from './api/spotify/resources/types';
import { TwitterExpansions, TwitterMediaFields, TwitterPlaceFields, TwitterPollFields, TwitterSingleUserLookupResponse, TwitterTweetFields, TwitterTweetLookupResponse, TwitterTweetLookupResponseSingle, TwitterUserFields } from './api/twitter/resources/types';

interface twitter_token {
  api_key?: string;
  api_secret?: string;
  client_id: string;
  client_secret: string;
  redirect_uri?: string;
  access_token?: string;
  access_token_secret?: string;
  bearer_token?: string;
  scope?: Array<string>;
}

interface spotify_token {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  scope?: string;
}

interface slack_token {
  user?: string;
  bot?: string;
  client_id?: string;
  client_secret?: string;
  redirect_uri?: string;
  user_scope?: string;
  bot_scope?: string;
}

interface google_token {
  api_key?: string;
  client_id?: string;
  client_secret?: string;
  redirect_uri?: string;
}

interface dropbox_token {
  basic_token?: string;
  access_token?: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

interface box_token {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

export declare function initialize(options: {
  discord?: string;
  openai?: string;
  spotify?: spotify_token;
  slack?: slack_token;
  google?: google_token;
  dropbox?: dropbox_token;
  box?: box_token;
  twitter?: twitter_token;
}): void;


export declare const discord: {
  auditlog: {
    retrieve: (params: {
      guild_id: string;
      limit?: number | undefined;
      action_type?: number | undefined;
      user_id?: string | undefined;
      before?: string | undefined;
      after?: string | undefined;
    }) => Promise<AuditLog>;
  };
  automod: {
    retrieveRule: (params: {
      guild_id: string;
      auto_moderation_rule_id: string;
    }) => Promise<AutoModRule>;
    getAllRules: (params: {
      guild_id: string;
    }) => Promise<AutoModRule[]>;
    createRule: (params: {
      guild_id: string;
      name: string;
      event_type: number;
      trigger_type: number;
      trigger_metadata?: AutoModTriggerMetadata | undefined;
      actions: AutoModAction[];
      enabled?: boolean | undefined;
      exempt_roles?: string[] | undefined;
      exempt_channels?: string[] | undefined;
    }) => Promise<AutoModRule>;
    updateRule: (params: {
      guild_id: string;
      auto_moderation_rule_id: string;
      name?: string | undefined;
      event_type?: number | undefined;
      trigger_metadata?: AutoModTriggerMetadata | undefined;
      actions: AutoModAction[];
      enabled?: boolean | undefined;
      exempt_roles?: string[] | undefined;
      exempt_channels?: string[] | undefined;
    }) => Promise<AutoModRule>;
    destroyRule: (params: {
      guild_id: string;
      auto_moderation_rule_id: string;
    }) => Promise<{}>;
  };
  invites: {
    retrieve: (params: {
      invite_code: string;
      with_counts?: boolean | undefined;
      with_expiration?: boolean | undefined;
      guild_scheduled_event_id?: string | undefined;
    }) => Promise<ExtendedInvite>;
    revoke: (params: {
      invite_code: string;
    }) => Promise<ExtendedInvite>;
  };
  applications: {
    getMe: () => Promise<Application>;
    updateMe: (params: {
      description?: string | undefined;
      custom_install_url?: string | undefined;
      interactions_endpoint_url?: string | undefined;
      role_connections_verification_url?: string | undefined;
      install_params?: any;
      flags?: number | undefined;
      icon?: string | Buffer | undefined;
      cover_image?: string | Buffer | undefined;
      tags?: string[] | undefined;
    }) => Promise<Application>;
    appRoleConnectionMeta: (params: {
      application_id: string;
    }) => Promise<ApplicationRoleConnectionMetadata[]>;
    updateAppRoleConnectionMeta: (params: {
      application_id: string;
    }) => Promise<ApplicationRoleConnectionMetadata[]>;
    commands: {
      retrieve: (params: {
        application_id: string;
        command_id: string;
        guild_id?: string | undefined;
      }) => Promise<ApplicationCommand>;
      getAll: (params: {
        application_id: string;
        guild_id?: string | undefined;
        with_localizations?: boolean | undefined;
      }) => Promise<ApplicationCommand[]>;
      create: (params: {
        application_id: string;
        name: string;
        guild_id?: string | undefined;
        name_localizations?: LocalizationMap;
        description?: string | undefined;
        description_localizations?: LocalizationMap;
        dm_permission?: boolean | undefined;
        default_member_permissions?: string | undefined;
        nsfw?: boolean | undefined;
        type?: number | undefined;
        options?: ApplicationCommandOption[] | undefined;
      }) => Promise<ApplicationCommand>;
      update: (params: {
        application_id: string;
        command_id: string;
        guild_id?: string | undefined;
        name?: string | undefined;
        name_localizations?: LocalizationMap;
        description?: string | undefined;
        description_localizations?: LocalizationMap;
        dm_permission?: boolean | undefined;
        default_member_permissions?: string | undefined;
        nsfw?: boolean | undefined;
        options?: ApplicationCommandOption[] | undefined;
      }) => Promise<ApplicationCommand>;
      destroy: (params: {
        application_id: string;
        command_id: string;
        guild_id?: string | undefined;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      bulkOverwrite: (params: {
        application_id: string;
        guild_id?: string | undefined;
        application_commands?: ApplicationCommand[] | undefined;
      }) => Promise<ApplicationCommand[]>;
      retrievePermissions: (params: {
        application_id: string;
        guild_id: string;
        command_id: string;
      }) => Promise<GuildApplicationCommandPermissions>;
      getAllPermissions: (params: {
        application_id: string;
        guild_id: string;
      }) => Promise<GuildApplicationCommandPermissions>;
      updatePermissions: (params: {
        application_id: string;
        guild_id: string;
        command_id: string;
        permissions: GuildApplicationCommandPermissions[];
      }) => Promise<GuildApplicationCommandPermissions>;
    };
    entitlements: {
      getAll: (params: {
        application_id: string;
        user_id?: string | undefined;
        sku_ids: string;
        guild_id?: string | undefined;
        before?: string | undefined;
        after?: string | undefined;
        limit?: number | undefined;
        exclude_ended?: boolean | undefined;
      }) => Promise<Entitlement[]>;
      create: (params: {
        application_id: string;
        sku_id: string;
        owner_id: string;
        owner_type: number;
      }) => Promise<PartialEntitlement>;
      destroy: (params: {
        application_id: string;
        entitlement_id: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
    };
    SKUs: {
      getAll: (params: {
        application_id: string;
      }) => Promise<SKU[]>;
    };
  };
  channels: {
    retrieve: (params: {
      channel_id: string;
    }) => Promise<Channel>;
    update: (params: {
      channel_id: string;
      name?: string | undefined;
      type?: number | undefined;
      position?: number | null | undefined;
      topic?: string | null | undefined;
      nsfw?: boolean | null | undefined;
      rate_limit_per_user?: number | null | undefined;
      bitrate?: number | null | undefined;
      user_limit?: number | null | undefined;
      permission_overwrites?: Overwrite[] | null | undefined;
      parent_id?: string | null | undefined;
      rtc_region?: string | null | undefined;
      video_quality_mode?: number | null | undefined;
      default_auto_archive_duration?: number | null | undefined;
      available_tags?: ForumTag[] | null | undefined;
      default_reaction_emoji?: DefaultReaction | null | undefined;
      default_thread_rate_limit_per_user?: number | undefined;
      default_sort_order?: number | null | undefined;
      default_forum_layout?: number | undefined;
      flags?: number | undefined;
    }) => Promise<Channel>;
    destroy: (params: {
      channel_id: string;
    }) => Promise<Channel>;
    updatePermissions: (params: {
      channel_id: string;
      overwrite_id: string;
      type: 0 | 1;
      allow?: string | null | undefined;
      deny?: string | null | undefined;
    }) => Promise<{
      statusCode: number;
      message: string;
    }>;
    deletePermissions: (params: {
      channel_id: string;
      overwrite_id: string;
    }) => Promise<{
      statusCode: number;
      message: string;
    }>;
    getInvites: (params: {
      channel_id: string;
    }) => Promise<ExtendedInvite[]>;
    inviteCreate: (params: {
      channel_id: string;
      max_age?: number | undefined;
      max_uses?: number | undefined;
      temporary?: boolean | undefined;
      unique?: boolean | undefined;
      target_type?: number | undefined;
      target_user_id?: string | undefined;
      target_application_id?: string | undefined;
    }) => Promise<ExtendedInvite>;
    typingCreate: (params: {
      channel_id: string;
    }) => Promise<{
      statusCode: number;
      message: string;
    }>;
    followAnnouncementChannel: (params: {
      channel_id: string;
      webhook_channel_id: string;
    }) => Promise<FollowedChannel>;
    groupDMadd: (params: {
      channel_id: string;
      user_id: string;
      access_token: string;
      nick?: string | undefined;
    }) => Promise<unknown>;
    groupDMremove: (params: {
      channel_id: string;
      user_id: string;
    }) => Promise<unknown>;
    messages: {
      retrieve: (params: {
        channel_id: string | undefined;
        message_id: string;
      }) => Promise<Message>;
      create: (params: {
        channel_id: string | undefined;
        content?: string | undefined;
        embeds?: Embed[] | undefined;
        components?: ActionRow<Button | SelectMenu | Modal>[] | undefined;
        attachments?: Pick<Attachment, "filename" | "file">[] | undefined;
        allowed_mentions?: AllowedMentions | undefined;
        message_reference?: MessageReference | undefined;
        sticker_ids?: string[] | undefined;
        flags?: number | undefined;
        tts?: boolean | undefined;
        nonce?: string | number | undefined;
      }) => Promise<Message>;
      update: (params: {
        channel_id: string | undefined;
        message_id: string;
        content?: string | undefined;
        embeds?: Embed[] | undefined;
        components?: ActionRow<Button | SelectMenu | Modal>[] | undefined;
        attachments?: Pick<Attachment, "filename" | "file">[] | undefined;
        allowed_mentions?: AllowedMentions | undefined;
        flags?: number | undefined;
      }) => Promise<Message>;
      destroy: (params: {
        channel_id: string;
        message_id: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      bulkDelete: (params: {
          channel_id: string;
          messages: string[];
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      crosspost: (params: {
        channel_id: string;
        message_id: string;
      }) => Promise<Message>;
      getAll: (params: {
        channel_id: string;
        limit?: number | undefined;
        around?: string | undefined;
        before?: string | undefined;
        after?: string | undefined;
      }) => Promise<Message[]>;
      pin: (params: {
        channel_id: string;
        message_id: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      unpin: (params: {
        channel_id: string;
        message_id: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      getPinned: (params: {
        channel_id: string;
      }) => Promise<Message[]>;
    };
    threads: {
      forumThreadCreate: (params: {
        channel_id: string;
        name: string;
        message: ForumThreadMessageParams;
        auto_archive_duration?: 60 | 1440 | 4320 | 10080 | undefined;
        rate_limit_per_user?: number | undefined;
        applied_tags?: string[] | undefined;
      }) => Promise<Channel>;
      createFromMessage: (params: {
        channel_id: string;
        message_id: string;
        name: string;
        auto_archive_duration?: 60 | 1440 | 4320 | 10080 | undefined;
        rate_limit_per_user?: number | undefined;
      }) => Promise<Channel>;
      createWithoutMessage: (params: {
        channel_id: string;
        name: string;
        type?: number | undefined;
        invitable?: boolean | undefined;
        auto_archive_duration?: 60 | 1440 | 4320 | 10080 | undefined;
        rate_limit_per_user?: number | undefined;
      }) => Promise<Channel>;
      join: (params: {
        channel_id: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      leave: (params: {
        channel_id: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      addMember: (params: {
        channel_id: string;
        user_id: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      removeMember: (params: {
        channel_id: string;
        user_id: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      retrieveMember: (params: {
        channel_id: string;
        user_id: string;
        with_member?: boolean | undefined;
      }) => Promise<ThreadMember>;
      getAllMembers: (params: {
        channel_id: string;
        with_member?: boolean | undefined;
        after?: string | undefined;
        limit?: number | undefined;
      }) => Promise<ThreadMember[]>;
      getAllPublicArchived: (params: {
        channel_id: string;
        limit?: number | undefined;
        before?: string | undefined;
    }) => Promise<Channel[] & ThreadMember[] & boolean>;
      getAllPrivateArchived: (params: {
        channel_id: string;
        limit?: number | undefined;
        before?: string | undefined;
      }) => Promise<Channel[] & ThreadMember[] & boolean>;
      getAllJoinedPrivateArchived: (params: {
        channel_id: string;
        limit?: number | undefined;
        before?: string | undefined;
      }) => Promise<Channel[] & ThreadMember[] & boolean>;
    };
    reactions: {
      create: (params: {
        channel_id: string;
        message_id: string;
        emoji: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      createMany: (params: {
        channel_id: string;
        message_id: string;
        emojis: string[];
        delay?: number;
      }) => Promise<undefined>;
      deleteOwn: (params: {
        channel_id: string;
        message_id: string;
        emoji: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      deleteUser: (params: {
        channel_id: string;
        message_id: string;
        user_id: string;
        emoji: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      deleteAll: (params: {
        channel_id: string;
        message_id: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      deleteAllEmoji: (params: {
      channel_id: string;
      message_id: string;
      emoji: string;
      }) => Promise<{
      statusCode: number;
      message: string;
      }>;
      getUsers: (params: {
        channel_id: string;
        message_id: string;
        emoji: string;
        after?: string | undefined;
        limit?: number | undefined;
      }) => Promise<User[]>;
    };
  };
  guilds: {
    create: (params: {
      name: string;
      region?: string | undefined;
      roles?: Role[] | undefined;
      channels?: {
        id: string;
        type: number;
        name: string;
      } | undefined;
      icon?: string | undefined;
      verification_level?: number | undefined;
      default_message_notifications?: number | undefined;
      explicit_content_filter?: number | undefined;
      afk_channel_id?: string | undefined;
      afk_timeout?: 60 | 300 | 900 | 1800 | 3600 | undefined;
      system_channel_id?: string | undefined;
      system_channel_flags?: number | undefined;
    }) => Promise<Guild>;
    update: (params: {
      guild_id: string;
      name?: string | undefined;
      description?: string | undefined;
      owner_id?: string | undefined;
      region?: string | undefined;
      icon?: string | Buffer | undefined;
      splash?: string | Buffer | undefined;
      discovery_splash?: string | Buffer | undefined;
      banner?: string | Buffer | undefined;
      verification_level?: number | undefined;
      default_message_notifications?: number | undefined;
      explicit_content_filter?: number | undefined;
      rules_channel_id?: string | undefined;
      public_updates_channel_id?: string | undefined;
      features?: GuildFeatures[] | undefined;
      afk_channel_id?: string | undefined;
      afk_timeout?: 60 | 300 | 900 | 1800 | 3600 | undefined;
      system_channel_id?: string | undefined;
      system_channel_flags?: number | undefined;
      premium_progress_bar_enabled?: boolean | undefined;
    }) => Promise<Guild>;
    destroy: (params: {
      guild_id: string;
    }) => Promise<{
      statusCode: string;
      message: string;
    }>;
    retrieve: (params: {
      guild_id: string;
      with_counts?: boolean | undefined;
    }) => Promise<Guild>;
    getPreview: (params: {
      guild_id: string;
    }) => Promise<GuildPreview>;
    getInvites: (params: {
      guild_id: string;
    }) => Promise<ExtendedInvite[]>;
    updateMFAlevel: (params: {
      guild_id: string;
      level: number;
    }) => Promise<number>;
    getPruneCount: (params: {
      guild_id: string;
      days?: number | undefined;
      include_roles?: string[] | undefined;
    }) => Promise<{
      pruned: number;
    }>;
    beginPrune: (params: {
      guild_id: string;
      days: number;
      compute_prune_count: boolean;
      include_roles?: string[] | undefined;
    }) => Promise<{
      pruned: number;
    }>;
    getVoiceRegions: (params: {
      guild_id: string;
    }) => Promise<GuildVoiceRegion[]>;
    getAllIntegrations: (params: {
      guild_id: string;
    }) => Promise<GuildIntegration[]>;
    destroyIntegration: (params: {
      guild_id: string;
      integration_id: string;
    }) => Promise<{
      statusCode: number;
      message: string;
    }>;
    retrieveWidget: (params: {
      guild_id: string;
    }) => Promise<GuildWidget>;
    retrieveWidgetSettings: (params: {
      guild_id: string;
    }) => Promise<GuildWidgetSettings>;
    retrieveWidgetImage: (params: {
      guild_id: string;
      style?: "shield" | "banner1" | "banner2" | "banner3" | "banner4" | undefined;
    }) => Promise<ArrayBuffer>;
    updateWidget: (params: {
      guild_id: string;
      enabled?: boolean | undefined;
      channel_id?: string | undefined;
    }) => Promise<GuildWidget>;
    retrieveVanityURL: (params: {
      guild_id: string;
    }) => Promise<{
      code: number;
      uses: number;
    }>;
    retrieveWelcomeScreen: (params: {
      guild_id: string;
    }) => Promise<GuildWelcomeScreen>;
    updateWelcomeScreen: (params: {
      guild_id: string;
      enabled?: boolean | undefined;
      welcome_channels?: GuildWelcomeScreenChannel[] | undefined;
      description?: string | undefined;
    }) => Promise<GuildWelcomeScreen>;
    retrieveOnboarding: (params: {
      guild_id: string;
    }) => Promise<GuildOnboarding>;
    updateOnboarding: (params: {
      guild_id: string;
      prompts: OnboardingPrompt[];
      default_channel_ids: string[];
      enabled: boolean;
      mode: number;
    }) => Promise<GuildOnboarding>;
    newMemberWelcome: (params: {
      guild_id: string;
    }) => Promise<GuildHomeSettings>;
    channels: {
      getAll: (params: {
        guild_id: string;
      }) => Promise<Channel[]>;
      create: (params: {
        guild_id: string;
        name: string;
        type?: number | null | undefined;
        topic?: string | null | undefined;
        bitrate?: number | null | undefined;
        user_limit?: number | null | undefined;
        rate_limit_per_user?: number | null | undefined;
        position?: number | null | undefined;
        permission_overwrites?: Overwrite[] | null | undefined;
        parent_id?: string | null | undefined;
        nsfw?: boolean | null | undefined;
        rtc_region?: string | null | undefined;
        video_quality_mode?: number | null | undefined;
        default_auto_archive_duration?: number | null | undefined;
        default_reaction_emoji?: DefaultReaction | null | undefined;
        available_tags?: ForumTag[] | null | undefined;
        default_sort_order?: number | null | undefined;
        default_forum_layout?: number | null | undefined;
        default_thread_rate_limit_per_user?: number | null | undefined;
      }) => Promise<Channel>;
      updatePositions: (params: {
        guild_id: string;
        id: string;
        position?: number | null | undefined;
        lock_permissions?: boolean | null | undefined;
        parent_id?: string | null | undefined;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
    };
    members: {
      retrieve: (params: {
        guild_id: string;
        user_id: string;
        member_only?: boolean | undefined;
      }) => Promise<Member>;
      getAll: (params: {
        guild_id: string;
        limit?: number | undefined;
        after?: string | undefined;
      }) => Promise<Member[]>;
      search: (params: {
        guild_id: string;
        query?: number | undefined;
        limit?: string | undefined;
      }) => Promise<Member[]>;
      remove: (params: {
        guild_id: string;
        user_id: string;
        reason?: string | undefined;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      update: (params: {
        guild_id: string;
        user_id: string;
        nick?: string | undefined;
        roles?: string[] | undefined;
        mute?: boolean | undefined;
        deaf?: boolean | undefined;
        channel_id?: string | undefined;
        communication_disabled_until?: string | undefined;
        flags?: number | undefined;
      }) => Promise<Member>;
      updateCurrent: (params: {
          guild_id: string;
          nick?: string | undefined;
      }) => Promise<Member>;
      addRole: (params: {
        guild_id: string;
        user_id: string;
        role_id: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      removeRole: (params: {
        guild_id: string;
        user_id: string;
        role_id: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      getPermissionNames: (userRoles: string[], guildRoles: Role[]) => PermissionNames[];
      timeout: (params: {
        guild_id: string;
        user_id: string;
        duration?: number | null | undefined;
      }) => Promise<Member>;
    };
    roles: {
      retrieve: (params: {
        guild_id: string;
        role_id: string;
      }) => Promise<Role>;
      getAll: (params: {
        guild_id: string;
      }) => Promise<Role[]>;
      create: (params: {
        guild_id: string;
        name?: string | undefined;
        permissions?: string | undefined;
        color?: number | undefined;
        hoist?: boolean | undefined;
        icon?: string | undefined;
        unicode_emoji?: string | undefined;
        mentionable?: boolean | undefined;
      }) => Promise<Role>;
      update: (params: {
        guild_id: string;
        role_id: string;
        name?: string | undefined;
        permissions?: string | undefined;
        color?: number | undefined;
        hoist?: boolean | undefined;
        icon?: string | Buffer | undefined;
        unicode_emoji?: string | undefined;
        mentionable?: boolean | undefined;
      }) => Promise<Role>;
      destroy: (params: {
        guild_id: string;
        role_id: string;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;
      updatePositions: (params: {
        guild_id: string;
        roles: {
            id: string;
            position?: number | undefined;
        }[];
      }) => Promise<Role[]>;
    };
    bans: {

      /**
       * @example
       * await api.discord.guilds.bans.retrieve({
       *   guild_id: '0000000000',
       *   user_id: '0000000000'
       * });
       */
      retrieve: (params: {
        guild_id: string;
        user_id: string;
      }) => Promise<GuildBan>;

      /**
       * @example
       * await api.discord.guilds.bans.getAll({
       *   guild_id: '0000000000',
       *   limit: 50,
       *   before: '0000000000',
       *   after: '0000000000'
       * });
       */
      getAll: (params: {
        guild_id: string;
        limit?: number | undefined;
        before?: string | undefined;
        after?: string | undefined;
      }) => Promise<GuildBan[]>;

      /**
       * @example
       * await api.discord.guilds.bans.create({
       *   guild_id: '0000000000',
       *   user_id: '0000000000',
       *   delete_message_seconds: 604800,
       *   reason: 'reason'
       * });
       */
      create: (params: {
        guild_id: string;
        user_id: string;
        delete_message_seconds?: number | undefined;
        reason?: string | null | undefined;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;

      /**
       * @example
       * await api.discord.guilds.bans.createBulk({
       *   guild_id: '0000000000',
       *   user_ids: ['0000000000', '0000000000'],
       *   delete_message_seconds: 604800,
       *   reason: 'reason'
       * });
       */
      createBulk: (params: {
        guild_id: string;
        user_ids: string[];
        delete_message_seconds?: number | undefined;
        reason?: string | undefined;
      }) => Promise<{
        banned_users: string[];
        failed_users: string[];
        already_banned: string[];
        invalid_ids: string[];
      }>;

      /**
       * @example
       * await api.discord.guilds.bans.destroy({
       *   guild_id: '0000000000',
       *   user_id: '0000000000',
       *   reason: 'reason'
       * });
       */
      destroy: (params: {
        guild_id: string;
        user_id: string;
        reason?: string | undefined;
      }) => Promise<{
        statusCode: number;
        message: string;
      }>;

      /**
       * @example
       * await api.discord.guilds.bans.destroyBulk({
       *   guild_id: '0000000000',
       *   user_ids: ['0000000000', '0000000000'],
       *   reason: 'reason'
       * });
       */
      destroyBulk: (params: {
        guild_id: string;
        user_ids: string[];
        reason?: string | undefined;
      }) => Promise<{
        unbanned_users: string[];
        failed_users: string[];
        already_unbanned: string[];
        invalid_ids: string[];
      }>;
    }
    emojis: {
        retrieve: (params: {
            guild_id: string;
            emoji_id: string;
        }) => Promise<Emoji>;
        getAll: (params: {
            guild_id: string;
        }) => Promise<Emoji[]>;
        create: (params: {
            guild_id: string;
            name: string;
            image: string | Buffer;
            roles?: string[] | undefined;
        }) => Promise<Emoji>;
        update: (params: {
            guild_id: string;
            emoji_id: string;
            name: string;
            roles?: string[] | undefined;
        }) => Promise<Emoji>;
        destroy: (params: {
            guild_id: string;
            emoji_id: string;
        }) => Promise<{
            statusCode: number;
            message: string;
        }>;
    };
    stickers: {
        retrieve: (params: {
            sticker_id: string;
        }) => Promise<Sticker>;
        nitroPacks: () => Promise<StickerPack[]>;
        getAll: (params: {
            guild_id: string;
        }) => Promise<Sticker[]>;
        retrieveGuildSticker: (params: {
            guild_id: string;
            sticker_id: string;
        }) => Promise<Sticker>;
        update: (params: {
            guild_id: string;
            sticker_id: string;
            name?: string | undefined;
            description?: string | null | undefined;
            tags?: string | undefined;
        }) => Promise<Sticker>;
        destroy: (params: {
            guild_id: string;
            sticker_id: string;
        }) => Promise<{
            statusCode: number;
            message: string;
        }>;
        create: (params: {
            guild_id: string;
            name: string;
            description?: string | undefined;
            tags: string;
            file: string | Buffer | undefined;
        }) => Promise<Sticker | undefined>;
    };
    events: {
        retrieve: (params: {
            guild_id: string;
            guild_scheduled_event_id: string;
            with_user_count?: boolean | undefined;
        }) => Promise<GuildScheduledEvent>;
        getAll: (params: {
            guild_id: string;
            with_user_count?: boolean | undefined;
        }) => Promise<GuildScheduledEvent[]>;
        getUsers: (params: {
            guild_id: string;
            guild_scheduled_event_id: string;
            limit?: number | undefined;
            with_member?: boolean | undefined;
            before?: string | undefined;
            after?: string | undefined;
        }) => Promise<EventUser[]>;
        create: (params: {
            guild_id: string;
            name: string;
            description?: string | undefined;
            image?: string | Buffer | undefined;
            channel_id?: string | undefined;
            privacy_level: number;
            entity_type: number;
            entity_metadata?: EventEntityMetadata | undefined;
            scheduled_start_time: string;
            scheduled_end_time?: string | undefined;
        }) => Promise<GuildScheduledEvent>;
        update: (params: {
            guild_id: string;
            guild_scheduled_event_id: string;
            name?: string | undefined;
            description?: string | undefined;
            image?: string | Buffer | undefined;
            status?: number | undefined;
            channel_id?: string | null | undefined;
            privacy_level?: number | undefined;
            entity_type?: number | undefined;
            entity_metadata?: EventEntityMetadata | undefined;
            scheduled_start_time?: string | undefined;
            scheduled_end_time?: string | undefined;
        }) => Promise<GuildScheduledEvent>;
        destroy: (params: {
            guild_id: string;
            guild_scheduled_event_id: string;
        }) => Promise<{
            statusCode: number;
            message: string;
        }>;
    };
    templates: {
        retrieve: (params: {
            template_code: string;
        }) => Promise<GuildTemplate>;
        getAll: (params: {
            guild_id: string;
        }) => Promise<GuildTemplate[]>;
        create: (params: {
            guild_id: string;
            name: string;
            description?: string | undefined;
        }) => Promise<GuildTemplate>;
        createGuild: (params: {
            template_code: string;
            name: string;
            icon?: string | undefined;
        }) => Promise<Guild>;
        sync: (params: {
            guild_id: string;
            template_code: string;
        }) => Promise<Guild>;
        update: (params: {
            guild_id: string;
            template_code: string;
            name?: string | undefined;
            description?: string | undefined;
        }) => Promise<GuildTemplate>;
        destroy: (params: {
            guild_id: string;
            template_code: string;
        }) => Promise<GuildTemplate>;
    };
  };
  webhooks: {
      retrieve: (params: {
          webhook_id: string;
      }) => Promise<Webhook>;
      retrieveWithToken: (params: {
          webhook_id: string;
          webhook_token: string;
      }) => Promise<Omit<Webhook, "user">>;
      retrieveChannel: (params: {
          channel_id: string;
      }) => Promise<Webhook[]>;
      retrieveGuild: (params: {
          guild_id: string;
      }) => Promise<Webhook[]>;
      retrieveMessage: (params: {
          webhook_id: string;
          webhook_token: string;
          message_id: string;
          thread_id?: string | undefined;
      }) => Promise<Message>;
      destroyMessage: (params: {
          webhook_id: string;
          webhook_token: string;
          message_id: string;
          thread_id?: string | undefined;
      }) => Promise<{
          statusCode: number;
          message: string;
      }>;
      create: (params: {
          channel_id: string;
          name: string;
          avatar?: string | undefined;
      }) => Promise<Webhook>;
      update: (params: {
          webhook_id: string;
          channel_id?: string | undefined;
          name?: string | undefined;
          avatar?: string | Buffer | undefined;
      }) => Promise<Webhook>;
      updateWithToken: (params: {
          webhook_id: string;
          webhook_token: string;
          name?: string | undefined;
          avatar?: string | Buffer | undefined;
      }) => Promise<Omit<Webhook, "channel_id">>;
      destroy: (params: {
          webhook_id: string;
      }) => Promise<{
          statusCode: number;
          message: string;
      }>;
      destroyWithToken: (params: {
          webhook_id: string;
          webhook_token: string;
      }) => Promise<{
          statusCode: number;
          message: string;
      }>;
      execute: (params: {
          webhook_id: string;
          webhook_token: string;
          content?: string | undefined;
          username?: string | undefined;
          avatar_url?: string | undefined;
          tts?: boolean | undefined;
          embeds?: Embed[] | undefined;
          attachments?: Attachment[] | undefined;
          components?: ActionRow<Button | SelectMenu | Modal>[] | undefined;
          allowed_mentions?: AllowedMentions | undefined;
          flags?: number | undefined;
          thread_name?: string | undefined;
          thread_id?: string | undefined;
          wait?: boolean | undefined;
      }) => Promise<{
          statusCode: number;
          message: string;
      }>;
      updateMessage: (params: {
          webhook_id: string;
          webhook_token: string;
          message_id: string;
          thread_id?: string | undefined;
          content?: string | undefined;
          embeds?: Embed[] | undefined;
          attachments?: Attachment[] | undefined;
          components?: ActionRow<Button | SelectMenu | Modal>[] | undefined;
          allowed_mentions?: AllowedMentions | undefined;
      }) => Promise<Message>;
  };
  stageInstance: {
      retrieve: (params: {
          channel_id: string;
      }) => Promise<StageInstance>;
      create: (params: {
          channel_id: string;
          topic: string;
          privacy_level?: number | undefined;
          send_start_notification?: boolean | undefined;
      }) => Promise<StageInstance>;
      update: (params: {
          channel_id: string;
          topic?: string | undefined;
          privacy_level?: number | undefined;
      }) => Promise<StageInstance>;
      destroy: (params: {
          channel_id: string;
      }) => Promise<{
          statusCode: number;
          message: string;
      }>;
  };
  interactions: {
      callback: {
          get_original: (params: Pick<InteractionParams, "token" | "application_id">) => Promise<Message | null>;
          reply: (params: Pick<InteractionParams, "id" | "token">, input?: {
              ephemeral?: boolean | undefined;
              flags?: number | undefined;
              content?: string | undefined;
              embeds?: Embed[] | undefined;
              components?: ActionRow<Button | SelectMenu | Modal>[] | undefined;
              attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
              tts?: boolean | undefined;
              allowed_mentions?: AllowedMentions | undefined;
              return_date?: boolean | undefined;
          }) => Promise<boolean | Date>;
          defer: (params: Pick<InteractionParams, "id" | "token">, input?: {
              ephemeral?: boolean | undefined;
          } | undefined) => Promise<Date>;
          component_defer: (params: Pick<InteractionParams, "id" | "token">, input?: {
              ephemeral?: boolean | undefined;
          } | undefined) => Promise<{
              statusCode: 204;
              body: undefined;
          }>;
          component_update: (params: Pick<InteractionParams, "id" | "token">, input?: {
              ephemeral?: boolean | undefined;
              flags?: number | undefined;
              content?: string | undefined;
              embeds?: Embed[] | undefined;
              components?: ActionRow<Button | SelectMenu | Modal>[] | undefined;
              attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
              tts?: boolean | undefined;
              allowed_mentions?: AllowedMentions | undefined;
          }) => Promise<{
              statusCode: 204;
              body: undefined;
          } | null>;
          autocomplete_reply: (params: Pick<InteractionParams, "id" | "token">, input: {
              choices: Pick<ApplicationCommandOptionChoice, "name" | "value">[];
          }) => Promise<{
              statusCode: 204;
              body: undefined;
          }>;
          modal_reply: (params: Pick<InteractionParams, "id" | "token">, input: {
              custom_id: string;
              title: string;
              components: Component;
          }) => Promise<{
              statusCode: 204;
              body: undefined;
          }>;
          update_original: (params: Pick<InteractionParams, "token" | "application_id">, input?: {
              content?: string | undefined;
              embeds?: Embed[] | undefined;
              components?: ActionRow<Button | SelectMenu | Modal>[] | undefined;
              attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
              allowed_mentions?: AllowedMentions | undefined;
              ephemeral?: boolean | undefined;
          }) => Promise<Message | null>;
          delete_original: (params: Pick<InteractionParams, "token" | "application_id">) => Promise<{
              statusCode: 204;
              body: undefined;
          }>;
          upgrade: (params: Pick<InteractionParams, "id" | "token">, input?: object | undefined) => Promise<{
              statusCode: 204;
              body: undefined;
          }>;
      };
      followup: {
          retrieve: (params: Pick<InteractionParams, "token" | "application_id">, input: {
              message_id: string;
              thread_id?: string | undefined;
          }) => Promise<Message>;
          create: (params: Pick<InteractionParams, "token" | "application_id">, input?: {
              ephemeral?: boolean | undefined;
              content?: string | undefined;
              embeds?: Embed[] | undefined;
              components?: ActionRow<Button | SelectMenu | Modal>[] | undefined;
              attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
              tts?: boolean | undefined;
              allowed_mentions?: AllowedMentions | undefined;
              thread_name?: string | undefined;
          }) => Promise<Message | null>;
          update: (params: Pick<InteractionParams, "token" | "application_id">, input: {
              message_id: string;
              ephemeral?: boolean | undefined;
              content?: string | undefined;
              embeds?: Embed[] | undefined;
              components?: ActionRow<Button | SelectMenu | Modal>[] | undefined;
              attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
              allowed_mentions?: AllowedMentions | undefined;
              thread_id?: string | undefined;
          }) => Promise<Message | null>;
          destroy: (params: Pick<InteractionParams, "token" | "application_id">, input: {
              message_id: string;
          }) => Promise<{
              statusCode: 204;
              body: undefined;
          }>;
      };
  };
  oauth2: {
      token: {
          get: (params: {
              client_id: string;
              client_secret: string;
              oauth2_redirect: string;
              code: string;
          }) => Promise<AccessTokenResponse | null>;
          refresh: (params: {
              client_id: string;
              client_secret: string;
              refresh_token: string;
          }) => Promise<AccessTokenResponse | null>;
          revoke: (params: {
              client_id: string;
              client_secret: string;
              token: AccessTokenResponse;
          }) => Promise<AccessTokenResponse | null>;
      };
      credentials: {
          user: (params: {
              token: AccessTokenResponse;
          }) => Promise<User | null>;
          client: (params: {
              client_id: string;
              client_secret: string;
              scope: string;
          }) => Promise<Omit<AccessTokenResponse, "refresh_token"> | null>;
      };
  };
  users: {
      retrieve: (params: {
          user_id: string;
      }) => Promise<User>;
      currentUser: () => Promise<User>;
      myGuilds: (params?: {
          limit?: number | undefined;
          before?: string | undefined;
          after?: string | undefined;
      } | undefined) => Promise<PartialGuild[]>;
      currentMember: (params: {
          guild_id: string;
      }) => Promise<Member>;
      updateCurrent: (params: {
          username?: string | undefined;
          avatar?: string | Buffer | null | undefined;
      }) => Promise<User>;
      connections: () => Promise<Connection[]>;
      appRoleConnection: (params: {
          application_id: string;
      }) => Promise<ApplicationRoleConnection>;
      updateAppRoleConnection: (params: {
          application_id: string;
          platform_name?: string | undefined;
          platform_username?: string | undefined;
          metadata?: ApplicationRoleConnectionMetadata | undefined;
      }) => Promise<ApplicationRoleConnection>;
      createDM: (params: {
          recipient_id: string;
          content?: string | undefined;
          embeds?: Embed[] | undefined;
          components?: ActionRow<Button | SelectMenu | Modal>[] | undefined;
          attachments?: Pick<Attachment, "filename" | "file">[] | undefined;
          allowed_mentions?: AllowedMentions | undefined;
          message_reference?: MessageReference | undefined;
          sticker_ids?: string[] | undefined;
          flags?: number | undefined;
          tts?: boolean | undefined;
      }) => Promise<Message>;
      createGroupDM: (params: {
          access_tokens: string[];
          nicks: {
              [x: string]: string;
          };
          content?: string | undefined;
          embeds?: Embed[] | undefined;
          components?: ActionRow<Button | SelectMenu | Modal>[] | undefined;
          attachments?: Attachment[] | undefined;
          allowed_mentions?: AllowedMentions | undefined;
          message_reference?: MessageReference | undefined;
          sticker_ids?: string[] | undefined;
          flags?: number | undefined;
          tts?: boolean | undefined;
          nonce?: string | number | undefined;
      }) => Promise<Message>;
      leaveGuild: (params: {
          guild_id: string;
      }) => Promise<{
          statusCode: number;
          message: string;
      }>;
  };
}
export declare const slack: {
  users: {
      info: (params: {
          user: string;
          include_locale?: boolean | undefined
      }) => Promise<SlackUser>;
      list: (params: {
          cursor?: string | undefined
          include_locale?: boolean | undefined
          limit?: number | undefined
          team_id?: string | undefined
      }) => Promise<SlackUser[]>;
      identify: () => Promise<SlackUserIdentity>;
      getProfile: (params?: {
          user?: string | undefined;
          include_locale?: boolean | undefined
      } | undefined) => Promise<SlackUserProfile>;
      lookup: ({ email }: {
          email: string;
      }) => Promise<{
          ok: boolean;
          user: SlackUser;
      }>;
  };

  chat: {
      post: (params: {
          channel: string;
          text?: string | undefined;
          blocks?: SlackBlock[] | undefined;
          attachments?: SlackAttachment[] | undefined;
          icon_emoji?: string | undefined;
          icon_url?: string | undefined;
          link_names?: boolean | undefined;
          metadata?: string | undefined;
          mrkdwn?: boolean | undefined;
          parse?: string | undefined;
          reply_broadcast?: boolean | undefined;
          thread_ts?: string | undefined;
          unfurl_links?: boolean | undefined;
          unfurl_media?: boolean | undefined;
          username?: string | undefined;
      }) => Promise<SlackMessageResponse>;
      postEphemeral: (params: {
          channel: string;
          user: string;
          text?: string | undefined;
          blocks?: SlackBlock[] | undefined;
          attachments?: SlackAttachment[] | undefined;
          icon_emoji?: string | undefined;
          icon_url?: string | undefined;
          link_names?: boolean | undefined;
          metadata?: string | undefined;
          mrkdwn?: boolean | undefined;
          parse?: string | undefined;
          reply_broadcast?: boolean | undefined;
          thread_ts?: string | undefined;
          unfurl_links?: boolean | undefined;
          unfurl_media?: boolean | undefined;
          username?: string | undefined;
      }) => Promise<SlackMessageResponse>;
      update: (params: {
          channel: string;
          timestamp: string;
          text?: string | undefined;
          blocks?: SlackBlock[] | undefined;
          attachments?: SlackAttachment[] | undefined;
          file_ids?: string[] | undefined;
          link_names?: boolean | undefined;
          metadata?: string | undefined;
          parse?: string | undefined;
          reply_broadcast?: boolean | undefined;
      }) => Promise<any>;
      destroy: (params: {
          channel: string;
          timestamp: string;
      }) => Promise<{
          ok: boolean;
          channel: string;
          ts: string;
      }>;
      meMessage: (params: {
          channel: string;
          text: string;
      }) => Promise<{
          ok: boolean;
          channel: string;
          ts: string;
      }>;
      scheduled: {
          create: (params: any) => Promise<any>;
          list: (params: any) => Promise<any>;
      };
  };
  conversations: {
      create: (params: {
          name: string;
          is_private?: boolean | undefined;
          team_id?: string | undefined;
      }) => Promise<SlackChannel>;
  };
  views: {
      open: (params: {
          view: string;
          trigger_id?: string | undefined;
          interactivity_pointer?: SlackBlock[] | undefined;
      }) => Promise<SlackMessageResponse>;
      publish: (params: {
          view: ModalView;
          user_id?: string | undefined;
          hash?: string | undefined;
      }) => Promise<SlackView>;
  };
}

export declare const spotify: {
  search: (options: {
    artist?: string | undefined;
    song?: string | undefined;
    album?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort?: string | undefined;
  }) => Promise<SpotifyReturn>;
}

export declare const openai: {
  chat: {
    create: (options: {
      model: string;
      messages: ChatCompletionMessage[];
      max_tokens?: number;
      temperature?: number;
      top_p?: number;
      frequency_penalty?: number;
      presence_penalty?: number;
      n?: number;
      reponse_format?: {type: string};
      seed?: number;
      stop?: string | string[];
      logit_bias?: Object;
      logprobs?: boolean;
      top_logprobs?: number;
      stream?: boolean;
      tools?: ToolCalls[];
      tool_choice?: string | { type: string, function: { name: string; }; };
      user?: string;
    }) => Promise<ChatCompletion>
  },

  images: {
    create: (options: {
      prompt: string;
      model?: string;
      quality?: string;
      n?: number;
      response_format?: string;
      size?: string;
      style?: string;
      user?: string;
    }) => Promise<OpenAIImageResponse>
  },

  speech: {
    create: (options: {
      model: string;
      input: string;
      voice: string;
      speed?: number;
      response_format?: string;
    }) => Promise<string>
  },

  embeddings: {
    create: (options: {
      model: string;
      input: string | string[] | number[];
      encoding_format?: string;
      dimensions?: number;
      user?: string;
    }) => Promise<OpenAIEmbeddingResponse>
  }
}

export declare const twitter: {
  tweets: {
    retrieve: (id: string, options?: {
      tweet_fields?: TwitterTweetFields[];
      user_fields?: TwitterUserFields[];
      media_fields?: TwitterMediaFields[];
      place_fields?: TwitterPlaceFields[];
      poll_fields?: TwitterPollFields[];
      expansions?: TwitterExpansions[];
    }) => Promise<TwitterTweetLookupResponseSingle | undefined>

    create: (options: {
      text?: string;
      direct_message_deep_link?: string;
      for_super_followers_only?: boolean;
      geo?: {
        place_id?: string;
      };
      media?: {
        media_ids?: string[];
        tagged_user_ids?: string[];
      };
      poll?: {
        duration_minutes?: number;
        options?: string[];
      };
      quote_tweet_id?: string;
      reply?: {
        exclude_reply_user_ids?: string[];
        in_reply_to_tweet_id?: string;
      };
      reply_settings?: string;
    }) => Promise<{ id: string; text: string; }>

    timeline: (options?: {
      tweet_fields?: TwitterTweetFields[];
      user_fields?: TwitterUserFields[];
      media_fields?: TwitterMediaFields[];
      place_fields?: TwitterPlaceFields[];
      poll_fields?: TwitterPollFields[];
      expansions?: TwitterExpansions[];
      exclude?: string[];
      max_results?: number;
      next_token?: string;
      pagination_token?: string;
      since_id?: string;
      until_id?: string;
      start_time?: string;
      end_time?: string;
    }) => Promise<TwitterTweetLookupResponse | undefined>
  },

  users: {
    me: (options?: {
      tweet_fields?: TwitterTweetFields[];
      user_fields?: TwitterUserFields[];
      pinned_tweet_id?: boolean
    }) => Promise<TwitterSingleUserLookupResponse>;
    find: (resource: string, options?: {
      tweet_fields?: TwitterTweetFields[];
      user_fields?: TwitterUserFields[];
      pinned_tweet_id?: boolean
    }) => Promise<TwitterSingleUserLookupResponse>;
    by_id: (id: string, options?: {
      tweet_fields?: TwitterTweetFields[];
      user_fields?: TwitterUserFields[];
      pinned_tweet_id?: boolean
    }) => Promise<TwitterSingleUserLookupResponse>;
    by_username: (username: string, options?: {
      tweet_fields?: TwitterTweetFields[];
      user_fields?: TwitterUserFields[];
      pinned_tweet_id?: boolean
    }) => Promise<TwitterSingleUserLookupResponse>;
    tweets: (options: {
      tweet_fields?: TwitterTweetFields[];
      user_fields?: TwitterUserFields[];
      media_fields?: TwitterMediaFields[];
      place_fields?: TwitterPlaceFields[];
      poll_fields?: TwitterPollFields[];
      expansions?: TwitterExpansions[];
      exclude?: string[];
      max_results?: number;
      next_token?: string;
      pagination_token?: string;
      since_id?: string;
      until_id?: string;
      start_time?: string;
      end_time?: string;
    }) => Promise<TwitterTweetLookupResponse | undefined>
  }
}

export declare const google: {
  drive: {
    about: {

    },
    apps: {

    },
    changes: {

    },
    drives: {

    },
    comments: {

    },
    files: {

    }
  },
  sheets: {
    spreadsheets: {
      create: (options: typeof GoogleSheetsSpreadSheet) => Promise<GoogleSheetsSpreadSheet>;
      retrieve: (spreadsheet_id: string, options?: {
        ranges?: string;
        include_grid_data?: boolean;
        fields?: {[x: string]: any};
      }) => Promise<GoogleSheetsSpreadSheet>;
    }
  },
  geocoding: {

  },
  places: {

  }

}

export declare const utils: {
  https: (params: {
    url?: string | string[];
    method?: string;
    body?: any;
    headers?: HeadersInit;
    formdata?: FormData;
    message?: string;
    errorMessage?: string;
    hint?: string;
    payload?: any;
    response_type?: 'json' | 'text' | 'arrayBuffer' | 'blob' | 'formData';
    discord_params?: Record<string, any>;
    dropbox_content?: boolean;
    file?: any;
  } | string) => Promise<any>;

  storage: {
    /**
     * @example
     * await api.utils.storage.get('keyname');
     *
     * @example
     * await api.utils.storage.get('keyname', { default: [] });
     *
     * @param key
     * @param options
     * @param options.default - The default value to return if the key does not exist.
     * @param options.delete - Whether the key-value pair is deleted from the storage after retrieval.
     * @param options.keep_history - Whether the history for this key is kept. For use only when `deleted` is true.
     * @param options.keep_listeners - Whether the listeners attached to this key are kept. For use only when `deleted` is true.
     * @returns A Promise that resolves to the value associated with the key, or the default value if specified and the key is not found.
     */
    get: (key: string, options?: {
      default?: any;
      delete?: boolean;
      keep_history?: boolean;
      keep_listeners?: boolean;
    }) => Promise<any>;

    /**
     * @example
     * api.utils.storage.getSync('keyname');
     *
     * @example
     * api.utils.storage.getSync('keyname', { default: [] });
     *
     * @param key
     * @param options
     * @param options.default - The default value to return if the key does not exist.
     * @param options.delete - Whether the key-value pair is deleted from the storage after retrieval.
     * @param options.keep_history - Whether the history for this key is kept. For use only when `deleted` is true.
     * @param options.keep_listeners - Whether the listeners attached to this key are kept. For use only when `deleted` is true.
     * @returns The value associated with the key, or the default value if specified and the key is not found.
     */
    getSync: (key: string, options?: {
      default?: any;
      delete?: boolean;
      keep_history?: boolean;
      keep_listeners?: boolean;
    }) => any;

    /**
     * @example
     * await api.utils.storage.getMany(['key1', 'key2', 'key3']);
     * // { key1: 'value1', key2: 'value2', key3: 'value3' }
     *
     * @param keys - An array of keys
     * @returns - An object with they key-value pairs
     */
    getMany: (keys: string[]) => Promise<{[x: string]: any}>;

    /**
     * @example
     * await api.utils.storage.set({
     *   key: 'password',
     *   value: 'abcd1234'
     * });
     *
     * @example
     * await api.utils.storage.set({
     *   key: 'password',
     *   value: 'abcd1234',
     *   ttl: 5000, // 5 seconds
     *   ttlCb: () => console.log('password expired')
     * });
     *
     * @example
     * await api.utils.storage.set({
     *   key: 'DontChangeMe',
     *   value: 'abcd1234',
     *   allow_overwrite: false
     * });
     *
     * await api.utils.storage.set({
     *   key: 'DontChangeMe',
     *   value: 'new value'
     * }); // => error
     *
     * @param options
     * @param options.key
     * @param options.value
     * @param options.ttl - Amount of time in ms that this value will be stored
     * @param options.ttlCb - A function to invoke upon expiration
     * @param options.allow_overwrite - Whether to allow this key's value to be overwritten
     * @param options.on_change - A function to invoke when key is modified
     * @returns A Promise that resolves to the value set
     */
    set: (options: string | {
      key: string;
      value: any;
      ttl?: number;
      ttlCb?: Function;
      allow_overwrite?: boolean;
      on_change?: Function;
    }, value?: any) => Promise<any>;

    /**
     * @example
     * api.utils.storage.setSync({
     *   key: 'password',
     *   value: 'abcd1234'
     * });
     *
     * @example
     * api.utils.storage.setSync({
     *   key: 'password',
     *   value: 'abcd1234',
     *   ttl: 5000, // 5 seconds
     *   ttlCb: () => console.log('password expired')
     * });
     *
     * @example
     * api.utils.storage.setSync({
     *   key: 'DontChangeMe',
     *   value: 'abcd1234',
     *   allow_overwrite: false
     * });
     *
     * api.utils.storage.setSync({
     *   key: 'DontChangeMe',
     *   value: 'new value'
     * }); // => error
     *
     * @param options
     * @param options.key
     * @param options.value
     * @param options.ttl - Amount of time in ms that this value will be stored
     * @param options.ttlCb - A function to invoke upon expiration
     * @param options.allow_overwrite - Whether to allow this key's value to be overwritten
     * @param options.on_change - A function to invoke when key is modified
     * @returns The value set
     */
    setSync: (options: {
      key: string;
      value: any;
      ttl?: number;
      ttlCb?: Function;
      allow_overwrite?: boolean;
      on_change?: Function;
    }) => any;

    /**
     * @example
     * await api.utils.storage.setMany({
     *   keyname1: 'value1',
     *   keyname2: 'value2',
     *   keyname3: 'value3'
     * });
     *
     * @param options - An object where each property represents a key and its corresponding value to be stored
     * @returns
     */
    setMany: (options: Record<string, any>) => Promise<any[]>;

    /**
     * @example
     * await api.utils.storage.delete('password'); //=> true
     *
     * await api.utils.storage.delete('password', {
     *   keep_history: true
     * });
     *
     * @param key
     * @param options
     * @param options.keep_history - Whether the history for this key is kept. Default `false`.
     * @param options.keep_listeners - Whether the listeners attached to this key are kept. Default `false`.
     * @returns
     */
    delete: (key: string, options?: {
      keep_history?: boolean;
      keep_listeners?: boolean
    }) => Promise<boolean>;

    /**
     * @example
     * api.utils.storage.deleteSync('password'); //=> true
     *
     * api.utils.storage.deleteSync('password', {
     *   keep_history: true
     * });
     *
     * @param key
     * @param options
     * @param options.keep_history - Whether the history for this key is kept. Default `false`.
     * @param options.keep_listeners - Whether the listeners attached to this key are kept. Default `false`.
     * @returns
     */
    deleteSync: (key: string, options?: {
      keep_history?: boolean;
      keep_listeners?: boolean
    }) => boolean;

    /**
     * @example
     * await api.utils.storage.deleteMany(['key1', 'key2']);
     * //=> [true, true]
     *
     * @param keys
     * @returns A promise resolving to an array of booleans indicating success or failure for each deletion operation
     */
    deleteMany: (keys: string[]) => Promise<boolean[]>;

    /**
     * @example
     * await api.utils.storage.set({
     *   key: 'password',
     *   value: [1, 2, 3, 4, 5]
     * });
     *
     * await api.utils.storage.filterValues('password', (x) => x !== 2);
     *
     * await api.utils.storage.get('password');
     * //=> '[ 1, 3, 4, 5 ]'
     *
     * @param key
     * @param  predicate
     * @returns
     */
    filterValue: (key: string, predicate: (value: any) => boolean) => any;
    each: (callback: Function) => Promise<any>;
    eachSync: (callback: Function) => any;

    merge: (key: string, value: any) => Promise<any>;
    mergeSync: (key: string, value: any) => any;

    push: (key: string, ...args: any) => Promise<any[]>;
    pushSync: (key: string, ...args: any) => any[];

    search: (key: string) => Promise<{[x: string]: any}>;
    searchSync: (key: string) => {[x: string]: any};

    increment: (key: string) => Promise<any>;
    incrementSync: (key: string) => any;

    decrement: (key: string) => Promise<any>;
    decrementSync: (key: string) => any;

    clearHistory: (key: string) => Promise<void>;
    clearHistorySync: (key: string) => void;

    all: () => Promise<_File[][]>;
    allSync: () => _File[][];

    equals: (key: string, value: any) => Promise<any>;
    equalsSync: (key: string, value: any) => any;

    filter: (callback: (file: _File) => boolean) => _File[];
    has: (key: string) => boolean;
    export: () => {[key: string]: {value: any, expire?: number}};
    history: (key: string) => {value: any, timestamp: number}[]|undefined;
    clear: () => void;
    entries: () => string[][]
    keys: () => string[];
    values: () => any[]
    size: () => number;
    bytes: () => number;
    toJson: () => string;
  },

  tokens: {
    set: (options: {
      key: string;
      value: any;
    }) => Promise<any>;
    get: (key: string) => Promise<any>
  }
};
//# sourceMappingURL=Api.d.ts.map
