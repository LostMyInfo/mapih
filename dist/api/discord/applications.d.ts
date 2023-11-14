export declare namespace applications {
    function appRoleConnectionMeta(params: {
        application_id: string;
    }): Promise<ApplicationRoleConnectionMetadata[]>;
    function updateAppRoleConnectionMeta(params: {
        application_id: string;
    }): Promise<ApplicationRoleConnectionMetadata[]>;

    export namespace commands {
        function retrieve(params: {
            application_id: string;
            command_id: string;
            guild_id?: string | undefined;
        }): Promise<ApplicationCommand>;

        function getAll(params: {
            application_id: string;
            guild_id?: string | undefined;
            with_localizations?: boolean | undefined;
        }): Promise<ApplicationCommand[]>;

        function create(params: {
            application_id: string;
            name: string;
            guild_id?: string | undefined;
            name_localizations?: LocalizationMap;
            description?: string | undefined;
            description_localizations?: LocalizationMap;
            dm_permission?: boolean | undefined;
            default_member_permissions?: string | undefined;
            nsfw?: boolean | undefined;
            type?: string | undefined;
            options?: ApplicationCommandOption[] | undefined;
        }): Promise<ApplicationCommand>;

        function modify(params: {
            application_id: string;
            command_id: string;
            guild_id?: string | undefined;
            name?: string | undefined;
            name_localizations?: LocalizationMap;
            description?: string | undefined;
            description_localizations?: LocalizationMap;
            dm_permission?: boolean | undefined;
            default_member_permissions?: string | undefined;
            nsfw?: boolean | undefined;
            options?: ApplicationCommandOption[] | undefined;
        }): Promise<ApplicationCommand>;

        function destroy(params: {
            application_id: string;
            command_id: string;
            guild_id?: string | undefined;
        }): Promise<{
            statusCode: number;
            message: string;
        }>;

        function bulkOverwrite(params: {
            application_id: string;
            guild_id?: string | undefined;
            application_commands?: ApplicationCommand[] | undefined;
        }): Promise<ApplicationCommand[]>;

        function retrievePermissions(params: {
            application_id: string;
            guild_id: string;
            command_id: string;
        }): Promise<GuildApplicationCommandPermissions>;

        function getAllPermissions(params: {
            application_id: string;
            guild_id: string;
        }): Promise<GuildApplicationCommandPermissions>;

        function modifyPermissions(params: {
            application_id: string;
            guild_id: string;
            command_id: string;
            permissions: GuildApplicationCommandPermissions[];
        }): Promise<GuildApplicationCommandPermissions>;
    }
    export namespace entitlements {
        function getAll(params: {
            application_id: string;
            user_id?: string | undefined;
            sku_ids: string;
            guild_id?: string | undefined;
            before?: string | undefined;
            after?: string | undefined;
            limit?: number | undefined;
            exclude_ended?: boolean | undefined;
        }): Promise<Entitlement[]>;
        // export { getAll_1 as getAll };
        
        function create(params: {
            application_id: string;
            sku_id: string;
            owner_id: string;
            owner_type: number;
        }): Promise<PartialEntitlement>;
        // export { create_1 as create };
        
        function destroy(params: {
            application_id: string;
            entitlement_id: string;
        }): Promise<{
            statusCode: number;
            message: string;
        }>;
        // export { destroy_1 as destroy };
    }
    export namespace SKUs {
        function getAll(params: {
            application_id: string;
        }): Promise<SKU[]>;
        // export { getAll_2 as getAll };
    }
}
//# sourceMappingURL=applications.d.ts.map