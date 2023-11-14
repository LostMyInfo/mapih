export namespace invites {
    function retrieve(params: {
        invite_code: string;
        with_counts?: boolean | undefined;
        with_expiration?: boolean | undefined;
        guild_scheduled_event_id?: string | undefined;
    }): Promise<ExtendedInvite>;
    function revoke(params: {
        invite_code: string;
    }): Promise<ExtendedInvite>;
}
//# sourceMappingURL=invites.d.ts.map