export function post(params: {
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
}): Promise<SlackMessageResponse>;
export function postEphemeral(params: {
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
}): Promise<SlackMessageResponse>;
export function update(params: {
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
    function create(params: any): Promise<any>;
    function list(params: any): Promise<any>;
}
//# sourceMappingURL=chat.d.ts.map