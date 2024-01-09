export function retrieve(params: {
    channel_id: string;
}): Promise<Channel>;
export function update(params: {
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
    reason?: string | undefined
}): Promise<Channel>;
export function destroy(params: {
    channel_id: string;
    reason?: string | undefined
}): Promise<Channel>;
export function updatePermissions(params: {
    channel_id: string;
    overwrite_id: string;
    type: 0 | 1;
    allow?: string | null | undefined;
    deny?: string | null | undefined;
    reason?: string | undefined
}): Promise<{
    statusCode: number;
    message: string;
}>;
export function deletePermissions(params: {
    channel_id: string;
    overwrite_id: string;
    reason?: string | undefined
}): Promise<{
    statusCode: number;
    message: string;
}>;
export function getInvites(params: {
    channel_id: string;
    reason?: string | undefined
}): Promise<ExtendedInvite[]>;
export function inviteCreate(params: {
    channel_id: string;
    max_age?: number | undefined;
    max_uses?: number | undefined;
    temporary?: boolean | undefined;
    unique?: boolean | undefined;
    target_type?: number | undefined;
    target_user_id?: string | undefined;
    target_application_id?: string | undefined;
}): Promise<ExtendedInvite>;
export function typingCreate(params: {
    channel_id: string;
}): Promise<{
    statusCode: number;
    message: string;
}>;
export function followAnnouncementChannel(params: {
    channel_id: string;
    webhook_channel_id: string;
}): Promise<FollowedChannel>;
export function groupDMadd(params: {
    channel_id: string;
    user_id: string;
    access_token: string;
    nick?: string | undefined;
}): Promise<unknown>;
export function groupDMremove(params: {
    channel_id: string;
    user_id: string;
}): Promise<unknown>;
export namespace messages {
    export function retrieve_1(params: {
        channel_id: string | undefined;
        message_id: string;
    }): Promise<Message>;
    export { retrieve_1 as retrieve };
    export function create(params: {
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
    }): Promise<Message>;
    export function update(params: {
        channel_id: string | undefined;
        message_id: string;
        content?: string | undefined;
        embeds?: Embed[] | undefined;
        components?: Component | undefined;
        attachments?: Pick<Attachment, "filename" | "file">[] | undefined;
        allowed_mentions?: AllowedMentions | undefined;
        flags?: number | undefined;
    }): Promise<Message>;
    export function destroy_1(params: {
        channel_id: string;
        message_id: string;
        reason?: string | undefined
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export { destroy_1 as destroy };
    export function bulkDelete(params: {
        channel_id: string;
        messages: string[];
        reason?: string | undefined
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export function crosspost(params: {
        channel_id: string;
        message_id: string;
    }): Promise<Message>;
    export function getAll(params: {
        channel_id: string;
        limit?: number | undefined;
        around?: string | undefined;
        before?: string | undefined;
        after?: string | undefined;
    }): Promise<Message[]>;
    export function pin(params: {
        channel_id: string;
        message_id: string;
        reason?: string | undefined
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export function unpin(params: {
        channel_id: string;
        message_id: string;
        reason?: string | undefined
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export function getPinned(params: {
        channel_id: string;
    }): Promise<Message[]>;
}
export namespace threads {
    function forumThreadCreate(params: {
        channel_id: string;
        name: string;
        message: ForumThreadMessageParams;
        auto_archive_duration?: 60 | 1440 | 4320 | 10080 | undefined;
        rate_limit_per_user?: number | undefined;
        applied_tags?: string[] | undefined;
        reason?: string | undefined
    }): Promise<Channel>;
    function createFromMessage(params: {
        channel_id: string;
        message_id: string;
        name: string;
        auto_archive_duration?: 60 | 1440 | 4320 | 10080 | undefined;
        rate_limit_per_user?: number | undefined;
        reason?: string | undefined
    }): Promise<Channel>;
    function createWithoutMessage(params: {
        channel_id: string;
        name: string;
        type?: number | undefined;
        invitable?: boolean | undefined;
        auto_archive_duration?: 60 | 1440 | 4320 | 10080 | undefined;
        rate_limit_per_user?: number | undefined;
        reason?: string | undefined
    }): Promise<Channel>;
    function join(params: {
        channel_id: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    function leave(params: {
        channel_id: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    function addMember(params: {
        channel_id: string;
        user_id: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    function removeMember(params: {
        channel_id: string;
        user_id: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    function retrieveMember(params: {
        channel_id: string;
        user_id: string;
        with_member?: boolean | undefined;
    }): Promise<ThreadMember>;
    function getAllMembers(params: {
        channel_id: string;
        with_member?: boolean | undefined;
        after?: string | undefined;
        limit?: number | undefined;
    }): Promise<ThreadMember[]>;
    function getAllPublicArchived(params: {
        channel_id: string;
        limit?: number | undefined;
        before?: string | undefined;
    }): Promise<Channel[] & ThreadMember[] & boolean>;
    function getAllPrivateArchived(params: {
        channel_id: string;
        limit?: number | undefined;
        before?: string | undefined;
    }): Promise<Channel[] & ThreadMember[] & boolean>;
    function getAllJoinedPrivateArchived(params: {
        channel_id: string;
        limit?: number | undefined;
        before?: string | undefined;
    }): Promise<Channel[] & ThreadMember[] & boolean>;
}
export namespace reactions {
    export function create_1(params: {
        channel_id: string;
        message_id: string;
        emoji: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export { create_1 as create };
    export function createMany(params: {
        channel_id: string;
        message_id: string;
        emojis: string[];
        delay?: number;
    }): Promise<undefined>;
    export function deleteOwn(params: {
        channel_id: string;
        message_id: string;
        emoji: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export function deleteUser(params: {
        channel_id: string;
        message_id: string;
        user_id: string;
        emoji: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export function deleteAll(params: {
        channel_id: string;
        message_id: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export function deleteAllEmoji(params: {
        channel_id: string;
        message_id: string;
        emoji: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export function getUsers(params: {
        channel_id: string;
        message_id: string;
        emoji: string;
        after?: string | undefined;
        limit?: number | undefined;
    }): Promise<User[]>;
}
//# sourceMappingURL=channels.d.ts.map