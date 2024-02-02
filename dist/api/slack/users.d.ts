export function info({ user, include_locale }: {
    user: string;
    include_locale?: boolean | undefined;
}): Promise<SlackUser>;
export function list(params?: {
    cursor?: string | undefined;
    include_locale?: boolean | undefined;
    limit?: number | undefined;
    team_id?: string | undefined;
} | undefined): Promise<SlackUser[]>;
export function identify(): Promise<{
    ok: boolean;
    team?: {
        id: string;
        name: string;
    } | undefined;
    user: SlackUserIdentity;
}>;
export function getProfile(params?: {
    user?: string | undefined;
    include_labels?: boolean | undefined;
} | undefined): Promise<SlackUserProfile>;
export function lookup({ email }: {
    email: string;
}): Promise<{
    ok: boolean;
    user: SlackUser;
}>;
//# sourceMappingURL=users.d.ts.map