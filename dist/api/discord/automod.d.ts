export function retrieveRule(params: {
    guild_id: string;
    auto_moderation_rule_id: string;
}): Promise<AutoModRule>;
export function getAllRules(params: {
    guild_id: string;
}): Promise<AutoModRule[]>;
export function createRule(params: {
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
export function updateRule(params: {
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
export function destroyRule(params: {
    guild_id: string;
    auto_moderation_rule_id: string;
}): Promise<{
    statusCode: number;
    message: string;
}>;
//# sourceMappingURL=automod.d.ts.map