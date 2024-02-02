export function post(params: {
    channel: string;
    text?: string | undefined;
    blocks?: SlackAttachmentBlock[] | undefined;
    attachments?: SlackMessageAttachment[] | undefined;
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
}): Promise<SlackMessageResponse>;
export function postEphemeral(params: {
    channel: string;
    user: string;
    text?: string | undefined;
    blocks?: SlackAttachmentBlock[] | undefined;
    attachments?: SlackMessageAttachment[] | undefined;
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
}): Promise<SlackMessageResponse>;
export function update(params: {
    channel: string;
    timestamp: string;
    text?: string | undefined;
    blocks?: SlackAttachmentBlock[] | undefined;
    attachments?: SlackMessageAttachment[] | undefined;
    file_ids?: string[] | undefined;
    link_names?: boolean | undefined;
    metadata?: string | undefined;
    parse?: string | undefined;
    reply_broadcast?: boolean | undefined;
}): Promise<any>;
export function destroy(params: {
    channel: string;
    timestamp: string;
}): Promise<{
    ok: boolean;
    channel: string;
    ts: string;
}>;
export function meMessage(params: {
    channel: string;
    text: string;
}): Promise<{
    ok: boolean;
    channel: string;
    ts: string;
}>;
export namespace scheduled {
    function create(params: {
        channel: string;
        post_at: number;
        text?: string | undefined;
        blocks?: SlackAttachmentBlock[] | undefined;
        attachments?: SlackMessageAttachment[] | undefined;
        as_user?: boolean | undefined;
        link_names?: boolean | undefined;
        parse?: string | undefined;
        reply_broadcast?: boolean | undefined;
        thread_ts?: string | undefined;
        unfurl_links?: boolean | undefined;
        unfurl_media?: boolean | undefined;
    }): Promise<{
        ok: boolean;
        channel: string;
        scheduled_message_id: string;
        post_at: string;
        message: SlackMessage;
    }>;
    function list(params: {
        channel: string;
        cursor?: string | undefined;
        team_id?: boolean | undefined;
        latest?: string | undefined;
        limit?: number | undefined;
        oldest?: string | undefined;
    }): Promise<{
        ok: boolean;
        channel: string;
        scheduled_message_id: string;
        post_at: string;
        message: SlackMessage;
    }>;
}
//# sourceMappingURL=chat.d.ts.map