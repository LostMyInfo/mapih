export declare function info(params: {
    file: string;
    count?: number | undefined;
    cursor?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
}): Promise<{
    ok: boolean;
    file: SlackFile;
    comments: SlackComment[];
    response_metadata: {
        next_cursor: string;
    };
}>;
export declare function list(params: {
    channel?: string | undefined;
    user?: string | undefined;
    show_files_hidden_by_limit?: boolean | undefined;
    team_id?: string | undefined;
    type?: string[] | undefined;
    page?: number | undefined;
    ts_to?: string | undefined;
    ts_from?: string | undefined;
}): Promise<{
    ok: boolean;
    files: SlackFile[];
    paging: {
        count: number;
        total: number;
        page: number;
        pages: number;
    };
}>;
export declare function _delete(params: {
    file?: string | undefined;
}): Promise<{
    ok: boolean;
}>;
export { _delete as delete };
export declare namespace remote {
    export function info_1(params: {
        file?: string | undefined;
        external_id?: number | undefined;
    }): Promise<{
        ok: boolean;
        file: SlackFile;
        comments: SlackComment[];
        response_metadata: {
            next_cursor: string;
        };
    }>;
    export { info_1 as info };
    export function list_1(params: {
        channel?: string | undefined;
        cursor?: string | undefined;
        limit?: number | undefined;
        ts_to?: string | undefined;
        ts_from?: string | undefined;
    }): Promise<{
        ok: boolean;
        files: SlackFileElement[];
        paging: {
            count: number;
            total: number;
            page: number;
            pages: number;
        };
    }>;
    export { list_1 as list };
}
//# sourceMappingURL=files.d.ts.map