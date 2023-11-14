export namespace automod {
    function retrieveRule(params: {
        guild_id: string;
        auto_moderation_rule_id: string;
    }): Promise<AutoModRule>;
    function getAllRules(params: {
        guild_id: string;
    }): Promise<AutoModRule[]>;
    function createRule(params: {
        guild_id: string;
        name: string;
        event_type: number;
        trigger_type: number;
        trigger_metadata?: AutoModTriggerMetadata | undefined;
        actions: AutoModAction[];
        enabled?: boolean | undefined;
        exempt_roles?: string[] | undefined;
        exempt_channels?: string[] | undefined;
    }): Promise<AutoModRule>;
    function modifyRule(params: {
        guild_id: string;
        auto_moderation_rule_id: string;
        name?: string | undefined;
        event_type?: number | undefined;
        trigger_metadata?: AutoModTriggerMetadata | undefined;
        actions: AutoModAction[];
        enabled?: boolean | undefined;
        exempt_roles?: string[] | undefined;
        exempt_channels?: string[] | undefined;
    }): Promise<AutoModRule>;
    function destroyRule(params: {
        guild_id: string;
        auto_moderation_rule_id: string;
    }): Promise<{}>;
}
//# sourceMappingURL=automod.d.ts.map