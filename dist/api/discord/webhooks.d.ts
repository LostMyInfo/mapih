export namespace webhooks {
    function retrieve(params: {
        webhook_id: string;
    }): Promise<Webhook>;
    function retrieveWithToken(params: {
        webhook_id: string;
        webhook_token: string;
    }): Promise<Omit<Webhook, "user">>;
    function retrieveChannel(params: {
        channel_id: string;
    }): Promise<Webhook[]>;
    function retrieveGuild(params: {
        guild_id: string;
    }): Promise<Webhook[]>;
    function retrieveMessage(params: {
        webhook_id: string;
        webhook_token: string;
        message_id: string;
        thread_id?: string | undefined;
    }): Promise<Message>;
    function destroyMessage(params: {
        webhook_id: string;
        webhook_token: string;
        message_id: string;
        thread_id?: string | undefined;
    }): Promise<{
        statusCode: string;
        message: string;
    }>;
    function create(params: {
        channel_id: string;
        name: string;
        avatar?: string | undefined;
    }): Promise<Webhook>;
    function modify(params: {
        webhook_id: string;
        channel_id?: string | undefined;
        name?: string | undefined;
        avatar?: string | Buffer | undefined;
    }): Promise<Webhook>;
    function modifyWithToken(params: {
        webhook_id: string;
        webhook_token: string;
        name?: string | undefined;
        avatar?: string | Buffer | undefined;
    }): Promise<Omit<Webhook, "channel_id">>;
    function destroy(params: {
        webhook_id: string;
    }): Promise<{
        statusCode: string;
        message: string;
    }>;
    function destroyWithToken(params: {
        webhook_id: string;
        webhook_token: string;
    }): Promise<{
        statusCode: string;
        message: string;
    }>;
    function execute(params: {
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
    }): Promise<{
        statusCode: string;
        message: string;
    }>;
    function updateMessage(params: {
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
}
//# sourceMappingURL=webhooks.d.ts.map