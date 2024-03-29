export function getMe(): Promise<Application>;
export function updateMe(params: {
    description?: string | undefined;
    custom_install_url?: string | undefined;
    interactions_endpoint_url?: string | undefined;
    role_connections_verification_url?: string | undefined;
    install_params?: InstallParams | undefined;
    flags?: number | undefined;
    icon?: string | Buffer | undefined;
    cover_image?: string | Buffer | undefined;
    tags?: string[] | undefined;
}): Promise<Application>;
export function appRoleConnectionMeta(params?: {
    application_id?: string | undefined;
} | undefined): Promise<ApplicationRoleConnectionMetadata[]>;
export function updateAppRoleConnectionMeta(params?: {
    application_id?: string | undefined;
} | undefined): Promise<ApplicationRoleConnectionMetadata[]>;
export namespace commands {
    function retrieve(params: {
        application_id?: string | undefined;
        command_id: string;
        guild_id?: string | undefined;
    }): Promise<ApplicationCommand>;
    function getAll(params?: {
        application_id?: string | undefined;
        guild_id?: string | undefined;
        with_localizations?: boolean | undefined;
    } | undefined): Promise<ApplicationCommand[]>;
    function create(params: {
        application_id?: string | undefined;
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
    function update(params: {
        application_id?: string | undefined;
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
    function destroy(params: {
        application_id?: string | undefined;
        command_id: string;
        guild_id?: string | undefined;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    function bulkOverwrite(params?: {
        application_id?: string | undefined;
        guild_id?: string | undefined;
        application_commands?: ApplicationCommand[] | undefined;
    } | undefined): Promise<ApplicationCommand[]>;
    function retrievePermissions(params: {
        application_id?: string | undefined;
        guild_id: string;
        command_id: string;
    }): Promise<GuildApplicationCommandPermissions>;
    function getAllPermissions(params: {
        application_id?: string | undefined;
        guild_id: string;
    }): Promise<GuildApplicationCommandPermissions>;
    function updatePermissions(params: {
        application_id?: string | undefined;
        guild_id: string;
        command_id: string;
        permissions: GuildApplicationCommandPermissions[];
    }): Promise<GuildApplicationCommandPermissions>;
}
export namespace entitlements {
    export function getAll_1(params: {
        application_id?: string | undefined;
        user_id?: string | undefined;
        sku_ids: string;
        guild_id?: string | undefined;
        before?: string | undefined;
        after?: string | undefined;
        limit?: number | undefined;
        exclude_ended?: boolean | undefined;
    }): Promise<Entitlement[]>;
    export { getAll_1 as getAll };
    export function create_1(params: {
        application_id?: string | undefined;
        sku_id: string;
        owner_id: string;
        owner_type: number;
    }): Promise<PartialEntitlement>;
    export { create_1 as create };
    export function destroy_1(params: {
        application_id?: string | undefined;
        entitlement_id: string;
    }): Promise<{
        statusCode: number;
        message: string;
    }>;
    export { destroy_1 as destroy };
}
export namespace SKUs {
    export function getAll_2(params?: {
        application_id?: string | undefined;
    } | undefined): Promise<SKU[]>;
    export { getAll_2 as getAll };
}
//# sourceMappingURL=applications.d.ts.map