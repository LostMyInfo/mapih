export function retrieve(params: {
    user_id: string;
}): Promise<User>;
export function currentUser(): Promise<User>;
export function myGuilds(params?: {
    limit?: number | undefined;
    before?: string | undefined;
    after?: string | undefined;
} | undefined): Promise<PartialGuild[]>;
export function currentMember(params: {
    guild_id: string;
}): Promise<Member>;
export function modifyCurrent(params: {
    username?: string | undefined;
    avatar?: string | Buffer | null | undefined;
}): Promise<User>;
export function connections(): Promise<Connection[]>;
export function appRoleConnection(params: {
    application_id: string;
}): Promise<ApplicationRoleConnection>;
export function updateAppRoleConnection(params: {
    application_id: string;
    platform_name?: string | undefined;
    platform_username?: string | undefined;
    metadata?: ApplicationRoleConnectionMetadata | undefined;
}): Promise<ApplicationRoleConnection>;
export function createDM(params: {
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
export function createGroupDM(params: {
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
export function leaveGuild(params: {
    guild_id: string;
}): Promise<{
    statusCode: number;
    message: string;
}>;
//# sourceMappingURL=users.d.ts.map