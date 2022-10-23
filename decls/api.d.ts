export namespace Discord {
    const Auditlog: {
        getAuditLogs(params: any): Promise<any>;
    };
    const Applications: {
        getGlobalApplicationCommands(params: any): Promise<any>;
        createGlobalApplicationCommand(params: any): Promise<any>;
        bulkOverwriteGlobalApplicationCommands(params: any): Promise<any>;
        getGuildApplicationCommands(params: any): Promise<any>;
        createGuildApplicationCommand(params: any): Promise<any>;
        bulkOverwriteGuildApplicationCommands(params: any): Promise<void>;
    };
    const Channels: {
        messageCreate(params: any): Promise<any>;
        getAllMessages(params: any): Promise<any>;
        messageDelete(params: any): Promise<any>;
        messageBulkDelete(params: any): Promise<any>;
        messageReact(params: any): Promise<any>;
        modifyChannel(params: any): Promise<any>;
        editChannelPermissions(params: any): Promise<any>;
        typingCreate(params: any): Promise<any>;
        forumThreadCreate(params: any): Promise<any>;
    };
    const Guilds: {
        create(params: any): Promise<any>;
        getGuild(params: any): Promise<any>;
        previewGuild(params: any): Promise<any>;
        modifyGuild(params: any): Promise<any>;
        deleteGuild(params: any): Promise<any>;
        getAllGuildBans(params: any): Promise<any>;
        getGuildBan(params: any): Promise<any>;
        createGuildBan(params: any): Promise<any>;
        removeGuildBan(params: any): Promise<any>;
        getGuildRoles(params: any): Promise<any>;
        channels: {
            getChannels(params: any): Promise<any>;
            createChannel(params: any): Promise<any>;
            modifyChannelPosition(params: any): Promise<any>;
            listActiveThreads(params: any): Promise<any>;
        };
        members: {
            getAllMembers(params: any): Promise<any>;
            getMember(params: any): Promise<any>;
            removeGuildMember(params: any): Promise<any>;
            modifyGuildMember(params: any): Promise<any>;
        };
    };
    const Interactions: {
        callback: {
            reply(interaction: any, input?: any): Promise<any>;
            defer(interaction: any, input?: any): Promise<any>;
            component_defer(interaction: any, input?: any): Promise<any>;
            component_update(interaction: any, input?: any): Promise<any>;
            autocomplete_reply(interaction: any, input?: any): Promise<any>;
            modal_reply(interaction: any, input?: any): Promise<any>;
            get_original(interaction: any): Promise<any>;
            edit_original(interaction: any, input?: any): Promise<any>;
            delete_original(interaction: any): Promise<any>;
        };
        followup: {
            create(interaction: any, input?: any): Promise<any>;
            edit(interaction: any, input?: any): Promise<any>;
            get(interaction: any, input?: any): Promise<any>;
            del(interaction: any, input?: any): Promise<any>;
        };
    };
    const Oauth2: {
        getCredentials(token: any): Promise<any>;
        getClientCredentials(client_id: string, client_secret: string, scope: string): Promise<any>;
        getToken(client_id: string, client_secret: string, oauth2_redirect: string, code: string): Promise<any>;
        refreshToken(client_id: string, client_secret: string, refresh_token: string): Promise<any>;
        revokeToken(client_id: string, client_secret: string, token: string): Promise<any>;
    };
    const Users: {
        getCurrentUser(): Promise<any>;
        getUser(params: any): Promise<any>;
        modifyCurrentUser(params: any): Promise<any>;
        getCurrentUserGuilds(): Promise<any>;
        getCurrentUserGuildMember(params: any): Promise<any>;
        leaveGuild(params: any): Promise<boolean>;
        createDM(params: any): Promise<any>;
        createGroupDM(params: any): Promise<any>;
        getUserConnections(): Promise<any>;
    };
}
export namespace Utils {
    const Https: {
        get(params: any): Promise<any>;
        get80(params: any): Promise<any>;
        post(params: any): Promise<any>;
        put(params: any): Promise<any>;
        patch(params: any): Promise<any>;
        del(params: any): Promise<any>;
    };
    const Aray: {
        put(params: any): Promise<any>;
        get(params: any): Promise<any>;
        remove(params: any): Promise<any>;
    };
    const Timestamp: {
        default(): string;
        year(): number;
        month(): string;
        day(): string;
        hours(): number;
        minutes(): string;
        seconds(): string;
        mseconds(): string;
        UTCdefault(): string;
        UTCyear(): number;
        UTCmonth(): string;
        UTCday(): string;
        UTChours(): number;
        UTCminutes(): string;
        UTCseconds(): string;
        UTCmseconds(): string;
    };
}
//# sourceMappingURL=api.d.ts.map