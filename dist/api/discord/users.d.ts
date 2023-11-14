export declare namespace users {
    function retrieve(params: {
        user_id: string;
    }): Promise<User>;
    function currentUser(): Promise<User>;
    function myGuilds(params?: {
        limit?: number | undefined;
        before?: string | undefined;
        after?: string | undefined;
    } | undefined): Promise<PartialGuild[]>;
    function currentMember(params: {
        guild_id: string;
    }): Promise<Member>;
    function modifyCurrent(params: {
        username?: string | undefined;
        avatar?: string | Buffer | null | undefined;
    }): Promise<User>;
    function connections(): Promise<Connection[]>;
    function appRoleConnection(params: {
        application_id: string;
    }): Promise<ApplicationRoleConnection>;
    function updateAppRoleConnection(params: {
        application_id: string;
        platform_name?: string | undefined;
        platform_username?: string | undefined;
        metadata?: ApplicationRoleConnectionMetadata | undefined;
    }): Promise<object>;
    function createDM(params: {
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
    }): Promise<Message>;
    function createGroupDM(params: {
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
    }): Promise<Message>;
    function leaveGuild(params: {
        guild_id: string;
    }): Promise<{
        statusCode: string;
        message: string;
    }>;
}
//# sourceMappingURL=users.d.ts.map