// @ts-check
export namespace discord {
    const auditlog: {
        retrieve: (params: {
            guild_id: string;
            limit?: number | undefined;
            action_type?: number | undefined;
            user_id?: string | undefined;
            before?: string | undefined;
            after?: string | undefined;
        }) => Promise<AuditLog>;
    };
    const automod: {
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
        modifyRule: (params: {
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
    const invites: {
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
    const applications: {
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
                type?: string | undefined;
                options?: ApplicationCommandOption[] | undefined;
            }) => Promise<ApplicationCommand>;
            modify: (params: {
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
            modifyPermissions: (params: {
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
    const channels: {
        retrieve: (params: {
            channel_id: string;
        }) => Promise<Channel>;
        modify: (params: {
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
        editPermissions: (params: {
            channel_id: string;
            overwrite_id: string;
            type: 0 | 1;
            allow?: string | null | undefined;
            deny?: string | null | undefined;
        }) => Promise<{
            statusCode: string;
            message: string;
        }>;
        deletePermission: (params: {
            channel_id: string;
            overwrite_id: string;
        }) => Promise<{
            statusCode: string;
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
        pinMessage: (params: {
            channel_id: string;
            message_id: string;
        }) => Promise<{
            statusCode: string;
            message: string;
        }>;
        unpinMessage: (params: {
            channel_id: string;
            message_id: string;
        }) => Promise<{
            statusCode: string;
            message: string;
        }>;
        getPinnedMessages: (params: {
            channel_id: string;
        }) => Promise<Message[]>;
        typingCreate: (params: {
            channel_id: string;
        }) => Promise<{
            statusCode: string;
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
                components?: Component | undefined;
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
                components?: Component | undefined;
                attachments?: Pick<Attachment, "filename" | "file">[] | undefined;
                allowed_mentions?: AllowedMentions | undefined;
                flags?: number | undefined;
            }) => Promise<Message>;
            destroy: (params: {
                channel_id: string;
                message_id: string;
            }) => Promise<{
                statusCode: string;
                message: string;
            }>;
            bulkDelete: (params: {
                channel_id: string;
                messages: string[];
            }) => Promise<{
                statusCode: string;
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
                statusCode: string;
                message: string;
            }>;
            leave: (params: {
                channel_id: string;
            }) => Promise<{
                statusCode: string;
                message: string;
            }>;
            addMember: (params: {
                channel_id: string;
                user_id: string;
            }) => Promise<{
                statusCode: string;
                message: string;
            }>;
            removeMember: (params: {
                channel_id: string;
                user_id: string;
            }) => Promise<{
                statusCode: string;
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
                statusCode: string;
                message: string;
            }>;
            deleteOwn: (params: {
                channel_id: string;
                message_id: string;
                emoji: string;
            }) => Promise<{
                statusCode: string;
                message: string;
            }>;
            deleteUser: (params: {
                channel_id: string;
                message_id: string;
                user_id: string;
                emoji: string;
            }) => Promise<{
                statusCode: string;
                message: string;
            }>;
            deleteAll: (params: {
                channel_id: string;
                message_id: string;
            }) => Promise<{
                statusCode: string;
                message: string;
            }>;
            deleteAllEmoji: (params: {
                channel_id: string;
                message_id: string;
                emoji: string;
            }) => Promise<{
                statusCode: string;
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
    const guilds: {
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
            afk_timeout?: 300 | 60 | 900 | 1800 | 3600 | undefined;
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
            default_message_notifications?: DefaultMessageNotificationLevel;
            explicit_content_filter?: ExplicitContentFilterLevel;
            rules_channel_id?: string | undefined;
            public_updates_channel_id?: string | undefined;
            features?: GuildFeatures[] | undefined;
            afk_channel_id?: string | undefined;
            afk_timeout?: 300 | 60 | 900 | 1800 | 3600 | undefined;
            system_channel_id?: string | undefined;
            system_channel_flags?: SystemChannelFlags;
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
        retrieveBan: (params: {
            guild_id: string;
            user_id: string;
        }) => Promise<GuildBan>;
        getAllBans: (params: {
            guild_id: string;
            limit?: number | undefined;
            before?: string | undefined;
            after?: string | undefined;
        }) => Promise<GuildBan[]>;
        createBan: (params: {
            guild_id: string;
            user_id: string;
            delete_message_seconds?: number | undefined;
        }) => Promise<{
            statusCode: string;
            message: string;
        }>;
        removeBan: (params: {
            guild_id: string;
            user_id: string;
        }) => Promise<{
            statusCode: string;
            message: string;
        }>;
        getInvites: (params: {
            guild_id: string;
        }) => Promise<ExtendedInvite[]>;
        modifyMFAlevel: (params: {
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
        getIntegrations: (params: {
            guild_id: string;
        }) => Promise<GuildIntegration[]>;
        destroyIntegration: (params: {
            guild_id: string;
            integration_id: string;
        }) => Promise<{
            statusCode: string;
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
        modifyWidget: (params: {
            guild_id: string;
            enabled?: boolean | undefined;
            channel_id?: string | undefined;
        }) => Promise<GuildWidget>;
        retrieveVanityURL: (params: {
            guild_id: string;
        }) => Promise<{
            code: string;
            uses: number;
        }>;
        getWelcomeScreen: (params: {
            guild_id: string;
        }) => Promise<GuildWelcomeScreen>;
        modifyWelcomeScreen: (params: {
            guild_id: string;
            enabled?: boolean | undefined;
            welcome_channels?: GuildWelcomeScreenChannel[] | undefined;
            description?: string | undefined;
        }) => Promise<GuildWelcomeScreen>;
        getOnboarding: (params: {
            guild_id: string;
        }) => Promise<GuildOnboarding>;
        modifyOnboarding: (params: {
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
                name?: string | undefined;
                type?: number | undefined;
                topic?: string | undefined;
                bitrate?: number | undefined;
                user_limit?: number | undefined;
                rate_limit_per_user?: number | undefined;
                position?: number | undefined;
                permission_overwrites?: Overwrite[] | undefined;
                parent_id?: string | undefined;
                nsfw?: boolean | undefined;
                rtc_region?: string | undefined;
                video_quality_mode?: number | undefined;
                default_auto_archive_duration?: number | undefined;
                default_reaction_emoji?: DefaultReaction | undefined;
                available_tags?: ForumTag[] | undefined;
                default_sort_order?: number | undefined;
                default_forum_layout?: number | undefined;
            }) => Promise<Channel[]>;
            modifyPositions: (params: {
                guild_id: string;
                id: string;
                position?: number | null | undefined;
                lock_permissions?: boolean | null | undefined;
                parent_id?: string | null | undefined;
            }) => Promise<{
                statusCode: string;
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
                statusCode: string;
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
                flags?: UserFlags;
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
                statusCode: string;
                message: string;
            }>;
            removeRole: (params: {
                guild_id: string;
                user_id: string;
                role_id: string;
            }) => Promise<{
                statusCode: string;
                message: string;
            }>;
            getPermissionNames: (userRoles: object[], guildRoles: object[]) => import("./api/discord/guilds").PermNames[];
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
                statusCode: string;
                message: string;
            }>;
            modifyPositions: (params: {
                guild_id: string;
                roles: {
                    id: string;
                    position?: number | undefined;
                }[];
            }) => Promise<Role[]>;
        };
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
                statusCode: string;
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
                statusCode: string;
                message: string;
            }>;
            create: (params: {
                guild_id: string;
                name: string;
                description?: string | undefined;
                tags: string;
                file: string | Buffer | undefined;
            }) => Promise<Sticker>;
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
                statusCode: string;
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
    const webhooks: {
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
            statusCode: string;
            message: string;
        }>;
        create: (params: {
            channel_id: string;
            name: string;
            avatar?: string | undefined;
        }) => Promise<Webhook>;
        modify: (params: {
            webhook_id: string;
            channel_id?: string | undefined;
            name?: string | undefined;
            avatar?: string | Buffer | undefined;
        }) => Promise<Webhook>;
        modifyWithToken: (params: {
            webhook_id: string;
            webhook_token: string;
            name?: string | undefined;
            avatar?: string | Buffer | undefined;
        }) => Promise<Omit<Webhook, "channel_id">>;
        destroy: (params: {
            webhook_id: string;
        }) => Promise<{
            statusCode: string;
            message: string;
        }>;
        destroyWithToken: (params: {
            webhook_id: string;
            webhook_token: string;
        }) => Promise<{
            statusCode: string;
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
            components?: Component | undefined;
            allowed_mentions?: AllowedMentions | undefined;
            flags?: number | undefined;
            thread_name?: string | undefined;
            thread_id?: string | undefined;
            wait?: boolean | undefined;
        }) => Promise<{
            statusCode: string;
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
            components?: Component | undefined;
            allowed_mentions?: AllowedMentions | undefined;
        }) => Promise<Message>;
    };
    const stageInstance: {
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
            statusCode: string;
            message: string;
        }>;
    };
    const interactions: {
        callback: {
            get_original: (params: import("./api/discord/interactions").InteractionParams) => Promise<Message | null>;
            reply: (params: import("./api/discord/interactions").InteractionParams, input?: {
                ephemeral?: boolean | undefined;
                flags?: number | undefined;
                content?: string | undefined;
                embeds?: Embed[] | undefined;
                components?: Component | undefined;
                attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
                tts?: boolean | undefined;
                allowed_mentions?: AllowedMentions | undefined;
                return_date?: boolean | undefined;
            }) => Promise<boolean | Date>;
            defer(params: import("./api/discord/interactions").InteractionParams, input?: {
                ephemeral?: boolean | undefined;
            } | undefined): Promise<string>;
            component_defer(params: import("./api/discord/interactions").InteractionParams, input?: {
                ephemeral?: boolean | undefined;
            } | undefined): Promise<{
                statusCode: 204;
                body: undefined;
            }>;
            component_update(params: import("./api/discord/interactions").InteractionParams, input?: {
                ephemeral?: boolean | undefined;
                content?: string | undefined;
                embeds?: Embed[] | undefined;
                components?: Component | undefined;
                attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
                tts?: boolean | undefined;
                allowed_mentions?: AllowedMentions | undefined;
            }): Promise<{
                statusCode: 204;
                body: undefined;
            } | null>;
            autocomplete_reply(params: import("./api/discord/interactions").InteractionParams, input: {
                choices: Pick<ApplicationCommandOptionChoice, "name" | "value">[];
            }): Promise<{
                statusCode: 204;
                body: undefined;
            }>;
            modal_reply(params: import("./api/discord/interactions").InteractionParams, input: {
                custom_id: string;
                title: string;
                components: Component;
            }): Promise<{
                statusCode: 204;
                body: undefined;
            }>;
            edit_original(params: import("./api/discord/interactions").InteractionParams, input?: {
                content?: string | undefined;
                embeds?: Embed[] | undefined;
                components?: Component | undefined;
                attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
                allowed_mentions?: AllowedMentions | undefined;
                ephemeral?: boolean | undefined;
            }): Promise<Message | null>;
            delete_original(params: import("./api/discord/interactions").InteractionParams): Promise<{
                statusCode: 204;
                body: undefined;
            }>;
            upgrade(params: import("./api/discord/interactions").InteractionParams, input?: object | undefined): Promise<{
                statusCode: 204;
                body: undefined;
            }>;
        };
        followup: {
            get: (params: import("./api/discord/interactions").InteractionParams, input: {
                message_id: string;
                thread_id?: string | undefined;
            }) => Promise<Message>;
            create(params: import("./api/discord/interactions").InteractionParams, input?: {
                ephemeral?: boolean | undefined;
                content?: string | undefined;
                embeds?: Embed[] | undefined;
                components?: Component | undefined;
                attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
                tts?: boolean | undefined;
                allowed_mentions?: AllowedMentions | undefined;
                thread_name?: string | undefined;
            }): Promise<Message | null>;
            edit(params: import("./api/discord/interactions").InteractionParams, input: {
                message_id: string;
                ephemeral?: boolean | undefined;
                content?: string | undefined;
                embeds?: Embed[] | undefined;
                components?: Component | undefined;
                attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
                allowed_mentions?: AllowedMentions | undefined;
                thread_id?: string | undefined;
            }): Promise<Message | null>;
            del(params: import("./api/discord/interactions").InteractionParams, input: {
                message_id: string;
            }): Promise<{
                statusCode: 204;
                body: undefined;
            }>;
        };
    };
    const oauth2: {
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
    const users: {
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
        modifyCurrent: (params: {
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
        }) => Promise<object>;
        createDM: (params: {
            recipient_id: string;
            content?: string | undefined;
            embeds?: Embed[] | undefined;
            components?: Component | undefined;
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
            components?: Component | undefined;
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
            statusCode: string;
            message: string;
        }>;
    };
}
export namespace utils {
    const https: {
        get(params: {
            url: string;
            path?: string | undefined;
            port?: number | undefined;
            body?: any;
            headers?: any;
            rejectUnauthorized?: boolean | undefined;
        }): Promise<any>;
        get80(params: any): Promise<any>;
        post(params: any): Promise<any>;
        put(params: any): Promise<any>;
        patch(params: any): Promise<any>;
        del(params: any): Promise<any>;
    };
    const aray: {
        put(params: {
            index: string | number;
            value: any;
            ttl?: number | undefined;
        }): Promise<boolean>;
        get(params: {
            index: string | number;
        }): Promise<any>;
        remove(params: any): Promise<unknown>;
    };
}
//# sourceMappingURL=Api.d.ts.map