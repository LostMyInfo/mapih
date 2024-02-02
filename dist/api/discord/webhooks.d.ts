export function retrieve(params: {
    webhook_id: string;
}): Promise<Webhook>;
export function retrieveWithToken(params: {
    webhook_id: string;
    webhook_token: string;
}): Promise<Omit<Webhook, "user">>;
export function retrieveChannel(params: {
    channel_id: string;
}): Promise<Webhook[]>;
export function retrieveGuild(params: {
    guild_id: string;
}): Promise<Webhook[]>;
export function retrieveMessage(params: {
    webhook_id: string;
    webhook_token: string;
    message_id: string;
    thread_id?: string | undefined;
}): Promise<Message>;
export function destroyMessage(params: {
    webhook_id: string;
    webhook_token: string;
    message_id: string;
    thread_id?: string | undefined;
}): Promise<{
    statusCode: number;
    message: string;
}>;
export function create(params: {
    channel_id: string;
    name: string;
    avatar?: string | undefined;
}): Promise<Webhook>;
export function update(params: {
    webhook_id: string;
    channel_id?: string | undefined;
    name?: string | undefined;
    avatar?: string | Buffer | undefined;
    reason?: string | undefined;
}): Promise<Webhook>;
export function updateWithToken(params: {
    webhook_id: string;
    webhook_token: string;
    name?: string | undefined;
    avatar?: string | Buffer | undefined;
}): Promise<Omit<Webhook, "channel_id">>;
export function destroy(params: {
    webhook_id: string;
    reason?: string | undefined;
}): Promise<{
    statusCode: number;
    message: string;
}>;
export function destroyWithToken(params: {
    webhook_id: string;
    webhook_token: string;
}): Promise<{
    statusCode: number;
    message: string;
}>;
export function execute(params: {
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
    applied_tags?: string[] | undefined;
    thread_name?: string | undefined;
    thread_id?: string | undefined;
    wait?: boolean | undefined;
}): Promise<{
    statusCode: number;
    message: string;
}>;
export function updateMessage(params: {
    webhook_id: string;
    webhook_token: string;
    message_id: string;
    thread_id?: string | undefined;
    content?: string | undefined;
    embeds?: Embed[] | undefined;
    attachments?: Attachment[] | undefined;
    components?: Component | undefined;
    allowed_mentions?: AllowedMentions | undefined;
}): Promise<Message>;
//# sourceMappingURL=webhooks.d.ts.map