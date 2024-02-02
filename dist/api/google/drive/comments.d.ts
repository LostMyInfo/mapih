export declare function retrieve({ file_id, comment_id, include_deleted }: {
    file_id: string;
    comment_id: string;
    include_deleted?: boolean | undefined;
}): Promise<GoogleDriveComment>;
export declare function list(options: {
    file_id: string;
    include_deleted?: boolean | undefined;
    page_size?: number | undefined;
    page_token?: string | undefined;
    start_modified_time?: string | undefined;
}): Promise<{
    kind: string;
    nextPageToken: string;
    comments: GoogleDriveComment[];
}>;
export declare function create(options: {
    file_id: string;
    content: string;
    anchor?: boolean | undefined;
    quoted_file_content?: {
        value?: string | undefined;
        mimeType?: string | undefined;
    } | undefined;
}): Promise<GoogleDriveComment>;
export declare function update(options: {
    file_id: string;
    comment_id: string;
    content: string;
    anchor?: boolean | undefined;
    quoted_file_content?: {
        value?: string | undefined;
        mimeType?: string | undefined;
    } | undefined;
}): Promise<GoogleDriveComment>;
export declare function _delete({ file_id, comment_id }: {
    file_id: string;
    comment_id: string;
}): Promise<void>;
export { _delete as delete };
//# sourceMappingURL=comments.d.ts.map