export function create(params: {
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
}): Promise<Guild>;
export function update(params: {
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
}): Promise<Guild>;
export function destroy(params: {
    guild_id: string;
}): Promise<{
    statusCode: string;
    message: string;
}>;
export function retrieve(params: {
    guild_id: string;
    with_counts?: boolean | undefined;
}): Promise<Guild>;
export function getPreview(params: {
    guild_id: string;
}): Promise<GuildPreview>;
export function retrieveBan(params: {
    guild_id: string;
    user_id: string;
}): Promise<GuildBan>;
export function getAllBans(params: {
    guild_id: string;
    limit?: number | undefined;
    before?: string | undefined;
    after?: string | undefined;
}): Promise<GuildBan[]>;
export function createBan(params: {
    guild_id: string;
    user_id: string;
    delete_message_seconds?: number | undefined;
}): Promise<{
    statusCode: number;
    message: string;
}>;
export function removeBan(params: {
    guild_id: string;
    user_id: string;
}): Promise<{
    statusCode: number;
    message: string;
}>;
export function getInvites(params: {
    guild_id: string;
}): Promise<ExtendedInvite[]>;
export function modifyMFAlevel(params: {
    guild_id: string;
    level: number;
}): Promise<number>;
export function getPruneCount(params: {
    guild_id: string;
    days?: number | undefined;
    include_roles?: string[] | undefined;
}): Promise<{
    pruned: number;
}>;
export function beginPrune(params: {
    guild_id: string;
    days: number;
    compute_prune_count: boolean;
    include_roles?: string[] | undefined;
}): Promise<{
    pruned: number;
}>;
export function getVoiceRegions(params: {
    guild_id: string;
}): Promise<GuildVoiceRegion[]>;
export function getIntegrations(params: {
    guild_id: string;
}): Promise<GuildIntegration[]>;
export function destroyIntegration(params: {
    guild_id: string;
    integration_id: string;
}): Promise<{
    statusCode: number;
    message: string;
}>;
export function retrieveWidget(params: {
    guild_id: string;
}): Promise<GuildWidget>;
export function retrieveWidgetSettings(params: {
    guild_id: string;
}): Promise<GuildWidgetSettings>;
export function retrieveWidgetImage(params: {
    guild_id: string;
    style?: "shield" | "banner1" | "banner2" | "banner3" | "banner4" | undefined;
}): Promise<ArrayBuffer>;
export function modifyWidget(params: {
    guild_id: string;
    enabled?: boolean | undefined;
    channel_id?: string | undefined;
}): Promise<GuildWidget>;
export function retrieveVanityURL(params: {
    guild_id: string;
}): Promise<{
    code: number;
    uses: number;
}>;
export function getWelcomeScreen(params: {
    guild_id: string;
}): Promise<GuildWelcomeScreen>;
export function modifyWelcomeScreen(params: {
    guild_id: string;
    enabled?: boolean | undefined;
    welcome_channels?: GuildWelcomeScreenChannel[] | undefined;
    description?: string | undefined;
}): Promise<GuildWelcomeScreen>;
export function getOnboarding(params: {
    guild_id: string;
}): Promise<GuildOnboarding>;
export function modifyOnboarding(params: {
    guild_id: string;
    prompts: OnboardingPrompt[];
    default_channel_ids: string[];
    enabled: boolean;
    mode: number;
}): Promise<GuildOnboarding>;
export function newMemberWelcome(params: {
    guild_id: string;
}): Promise<GuildHomeSettings>;
export namespace channels {
    export function getAll(params: {
        guild_id: string;
    }): Promise<Channel[]>;
    export function create_1(params: {
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
    }): Promise<Channel[]>;
    export { create_1 as create };
    export function modifyPositions(params: {
        guild_id: string;
        id: string;
        position?: number | null | undefined;
        lock_permissions?: boolean | null | undefined;
        parent_id?: string | null | undefined;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
}
export namespace members {
    export function retrieve_1(params: {
        guild_id: string;
        user_id: string;
        member_only?: boolean | undefined;
    }): Promise<Member>;
    export { retrieve_1 as retrieve };
    export function getAll_1(params: {
        guild_id: string;
        limit?: number | undefined;
        after?: string | undefined;
    }): Promise<Member[]>;
    export { getAll_1 as getAll };
    export function search(params: {
        guild_id: string;
        query?: number | undefined;
        limit?: string | undefined;
    }): Promise<Member[]>;
    export function remove(params: {
        guild_id: string;
        user_id: string;
        reason?: string | undefined;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export function update_1(params: {
        guild_id: string;
        user_id: string;
        nick?: string | undefined;
        roles?: string[] | undefined;
        mute?: boolean | undefined;
        deaf?: boolean | undefined;
        channel_id?: string | undefined;
        communication_disabled_until?: string | undefined;
        flags?: number | undefined;
    }): Promise<Member>;
    export { update_1 as update };
    export function updateCurrent(params: {
        guild_id: string;
        nick?: string | undefined;
    }): Promise<Member>;
    export function addRole(params: {
        guild_id: string;
        user_id: string;
        role_id: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export function removeRole(params: {
        guild_id: string;
        user_id: string;
        role_id: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export function getPermissionNames(userRoles: string[], guildRoles: Role[]): PermissionNames[];
    export function timeout(params: {
        guild_id: string;
        user_id: string;
        duration?: number | null | undefined;
    }): Promise<Member>;
}
export namespace roles {
    export function retrieve_2(params: {
        guild_id: string;
        role_id: string;
    }): Promise<Role>;
    export { retrieve_2 as retrieve };
    export function getAll_2(params: {
        guild_id: string;
    }): Promise<Role[]>;
    export { getAll_2 as getAll };
    export function create_2(params: {
        guild_id: string;
        name?: string | undefined;
        permissions?: string | undefined;
        color?: number | undefined;
        hoist?: boolean | undefined;
        icon?: string | undefined;
        unicode_emoji?: string | undefined;
        mentionable?: boolean | undefined;
    }): Promise<Role>;
    export { create_2 as create };
    export function update_2(params: {
        guild_id: string;
        role_id: string;
        name?: string | undefined;
        permissions?: string | undefined;
        color?: number | undefined;
        hoist?: boolean | undefined;
        icon?: string | Buffer | undefined;
        unicode_emoji?: string | undefined;
        mentionable?: boolean | undefined;
    }): Promise<Role>;
    export { update_2 as update };
    export function destroy_1(params: {
        guild_id: string;
        role_id: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export { destroy_1 as destroy };
    export function modifyPositions_1(params: {
        guild_id: string;
        roles: {
            id: string;
            position?: number | undefined;
        }[];
    }): Promise<Role[]>;
    export { modifyPositions_1 as modifyPositions };
}
export namespace emojis {
    export function retrieve_3(params: {
        guild_id: string;
        emoji_id: string;
    }): Promise<Emoji>;
    export { retrieve_3 as retrieve };
    export function getAll_3(params: {
        guild_id: string;
    }): Promise<Emoji[]>;
    export { getAll_3 as getAll };
    export function create_3(params: {
        guild_id: string;
        name: string;
        image: string | Buffer;
        roles?: string[] | undefined;
    }): Promise<Emoji>;
    export { create_3 as create };
    export function update_3(params: {
        guild_id: string;
        emoji_id: string;
        name: string;
        roles?: string[] | undefined;
    }): Promise<Emoji>;
    export { update_3 as update };
    export function destroy_2(params: {
        guild_id: string;
        emoji_id: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export { destroy_2 as destroy };
}
export namespace stickers {
    export function retrieve_4(params: {
        sticker_id: string;
    }): Promise<Sticker>;
    export { retrieve_4 as retrieve };
    export function nitroPacks(): Promise<StickerPack[]>;
    export function getAll_4(params: {
        guild_id: string;
    }): Promise<Sticker[]>;
    export { getAll_4 as getAll };
    export function retrieveGuildSticker(params: {
        guild_id: string;
        sticker_id: string;
    }): Promise<Sticker>;
    export function update_4(params: {
        guild_id: string;
        sticker_id: string;
        name?: string | undefined;
        description?: string | null | undefined;
        tags?: string | undefined;
    }): Promise<Sticker>;
    export { update_4 as update };
    export function destroy_3(params: {
        guild_id: string;
        sticker_id: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export { destroy_3 as destroy };
    export function create_4(params: {
        guild_id: string;
        name: string;
        description?: string | undefined;
        tags: string;
        file: string | Buffer | undefined;
    }): Promise<Sticker | undefined>;
    export { create_4 as create };
}
export namespace events {
    export function retrieve_5(params: {
        guild_id: string;
        guild_scheduled_event_id: string;
        with_user_count?: boolean | undefined;
    }): Promise<GuildScheduledEvent>;
    export { retrieve_5 as retrieve };
    export function getAll_5(params: {
        guild_id: string;
        with_user_count?: boolean | undefined;
    }): Promise<GuildScheduledEvent[]>;
    export { getAll_5 as getAll };
    export function getUsers(params: {
        guild_id: string;
        guild_scheduled_event_id: string;
        limit?: number | undefined;
        with_member?: boolean | undefined;
        before?: string | undefined;
        after?: string | undefined;
    }): Promise<EventUser[]>;
    export function create_5(params: {
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
    }): Promise<GuildScheduledEvent>;
    export { create_5 as create };
    export function update_5(params: {
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
    }): Promise<GuildScheduledEvent>;
    export { update_5 as update };
    export function destroy_4(params: {
        guild_id: string;
        guild_scheduled_event_id: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export { destroy_4 as destroy };
}
export namespace templates {
    export function retrieve_6(params: {
        template_code: string;
    }): Promise<GuildTemplate>;
    export { retrieve_6 as retrieve };
    export function getAll_6(params: {
        guild_id: string;
    }): Promise<GuildTemplate[]>;
    export { getAll_6 as getAll };
    export function create_6(params: {
        guild_id: string;
        name: string;
        description?: string | undefined;
    }): Promise<GuildTemplate>;
    export { create_6 as create };
    export function createGuild(params: {
        template_code: string;
        name: string;
        icon?: string | undefined;
    }): Promise<Guild>;
    export function sync(params: {
        guild_id: string;
        template_code: string;
    }): Promise<Guild>;
    export function update_6(params: {
        guild_id: string;
        template_code: string;
        name?: string | undefined;
        description?: string | undefined;
    }): Promise<GuildTemplate>;
    export { update_6 as update };
    export function destroy_5(params: {
        guild_id: string;
        template_code: string;
    }): Promise<GuildTemplate>;
    export { destroy_5 as destroy };
}
//# sourceMappingURL=guilds.d.ts.map