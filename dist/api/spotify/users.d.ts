export function me(): Promise<SpotifyUser | undefined>;
export function topItems(options: {
    type: string;
    time_range?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort?: string | undefined;
}): Promise<SpotifyReturn>;
export function getProfile(user_id: string): Promise<SpotifyUser | undefined>;
//# sourceMappingURL=users.d.ts.map