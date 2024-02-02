//@ts-check
declare function getMe(): Promise<Application>;
declare function updateMe(params: {
    description?: string | undefined;
    custom_install_url?: string | undefined;
    interactions_endpoint_url?: string | undefined;
    role_connections_verification_url?: string | undefined;
    install_params?: any;
    flags?: number | undefined;
    icon?: string | Buffer | undefined;
    cover_image?: string | Buffer | undefined;
    tags?: string[] | undefined;
}): Promise<Application>;
declare function appRoleConnectionMeta(params: {
    application_id: string;
}): Promise<ApplicationRoleConnectionMetadata[]>;
declare function updateAppRoleConnectionMeta(params: {
    application_id: string;
}): Promise<ApplicationRoleConnectionMetadata[]>;

declare const commands: {
    retrieve(params: {
        application_id: string | undefined;
        command_id: string;
        guild_id?: string | undefined;
    }): Promise<ApplicationCommand>;
    getAll(params: {
        application_id: string | undefined;
        guild_id?: string | undefined;
        with_localizations?: boolean | undefined;
    }): Promise<ApplicationCommand[]>;
    create(params: {
        application_id: string | undefined;
        name: string;
        guild_id?: string | undefined;
        name_localizations?: any;
        description?: string | undefined;
        description_localizations?: any;
        dm_permission?: boolean | undefined;
        default_member_permissions?: string | undefined;
        nsfw?: boolean | undefined;
        type?: number | undefined;
        options?: ApplicationCommandOption[] | undefined;
    }): Promise<ApplicationCommand>;
    update(params: {
        application_id: string | undefined;
        command_id: string;
        guild_id?: string | undefined;
        name?: string | undefined;
        name_localizations?: any;
        description?: string | undefined;
        description_localizations?: any;
        dm_permission?: boolean | undefined;
        default_member_permissions?: string | undefined;
        nsfw?: boolean | undefined;
        options?: ApplicationCommandOption[] | undefined;
    }): Promise<ApplicationCommand>;
    destroy(params: {
        application_id: string | undefined;
        command_id: string;
        guild_id?: string | undefined;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    bulkOverwrite(params: {
        application_id: string | undefined;
        guild_id?: string | undefined;
        application_commands?: ApplicationCommand[] | undefined;
    }): Promise<ApplicationCommand[]>;
    retrievePermissions(params: {
        application_id: string | undefined;
        guild_id: string;
        command_id: string;
    }): Promise<GuildApplicationCommandPermissions>;
    getAllPermissions(params: {
        application_id: string | undefined;
        guild_id: string;
    }): Promise<GuildApplicationCommandPermissions>;
    updatePermissions(params: {
        application_id: string | undefined;
        guild_id: string;
        command_id: string;
        permissions: GuildApplicationCommandPermissions[];
    }): Promise<GuildApplicationCommandPermissions>;
}
declare const entitlements: {
    getAll(params: {
        application_id: string | undefined;
        user_id?: string | undefined;
        sku_ids: string;
        guild_id?: string | undefined;
        before?: string | undefined;
        after?: string | undefined;
        limit?: number | undefined;
        exclude_ended?: boolean | undefined;
    }): Promise<Entitlement[]>;
    // export { getAll_1 as getAll };
    create(params: {
        application_id: string | undefined;
        sku_id: string;
        owner_id: string;
        owner_type: number;
    }): Promise<PartialEntitlement>;
    // export { create_1 as create };
    destroy(params: {
        application_id: string | undefined;
        entitlement_id: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    // export { destroy_1 as destroy };
}
declare const SKUs: {
    getAll(params: {
        application_id: string | undefined;
    }): Promise<SKU[]>;
    // export { getAll_2 as getAll };
}
//# sourceMappingURL=applications.d.ts.map