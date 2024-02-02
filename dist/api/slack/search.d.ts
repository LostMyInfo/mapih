export function all(params: {
    query: string;
    count?: number | undefined;
    highlight?: boolean | undefined;
    page?: number | undefined;
    sort?: string | undefined;
    sort_dir?: string | undefined;
    team_id?: string | undefined;
}): Promise<{
    files?: {
        matches: SlackFilesMatch[];
        pagination?: SlackPagination | undefined;
        paging?: SlackPaging | undefined;
        total: number;
    } | undefined;
    messages?: SlackMessagesMatch[] | undefined;
    needed?: string | undefined;
    ok: boolean;
    posts?: {
        matches: string[];
        total: number;
    } | undefined;
    provided?: string | undefined;
    query: string;
}>;
export function messages(params: {
    query: string;
    count?: number | undefined;
    cursor?: string | undefined;
    highlight?: boolean | undefined;
    page?: number | undefined;
    sort?: string | undefined;
    sort_dir?: string | undefined;
    team_id?: string | undefined;
}): Promise<{
    ok: boolean;
    messages: {
        matches: SlackMessagesMatch[];
        pagination?: SlackPagination | undefined;
        paging?: SlackPaging | undefined;
        total: number;
    };
    query: string;
    needed?: string | undefined;
}>;
export function files(params: {
    query: string;
    count?: number | undefined;
    highlight?: boolean | undefined;
    page?: number | undefined;
    sort?: string | undefined;
    sort_dir?: string | undefined;
    team_id?: string | undefined;
}): Promise<{
    ok: boolean;
    files: {
        matches: SlackFilesMatch[];
        pagination?: SlackPagination | undefined;
        paging?: SlackPaging | undefined;
        total: number;
    };
    query: string;
    needed?: string | undefined;
}>;
//# sourceMappingURL=search.d.ts.map