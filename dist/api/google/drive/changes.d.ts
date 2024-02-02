export function getStartPageToken(options: {
    drive_id: string;
    supports_all_drives?: boolean | undefined;
}): Promise<string>;
export function list(options: {
    page_token: string;
    drive_id?: string | undefined;
    page_size?: number | undefined;
    include_corpus_removals?: boolean | undefined;
    include_all_drives?: boolean | undefined;
    include_removed?: boolean | undefined;
    restrict_to_my_drive?: boolean | undefined;
    supports_all_drives?: boolean | undefined;
    spaces?: string[] | undefined;
    include_permissions?: string | undefined;
    include_labels?: string[] | undefined;
}): Promise<{
    kind: string;
    nextPageToken: string;
    newStartPageToken: string;
    changes: GoogleDriveChange[];
}>;
export function watch(options: {
    id: string;
    resource_id: string;
    resource_uri: string;
    type: string;
    address: string;
    page_token: string;
    params?: {
        [x: string]: string;
    } | undefined;
    token?: string | undefined;
    expiration?: string | undefined;
    payload?: boolean | undefined;
    drive_id?: string | undefined;
    page_size?: number | undefined;
    include_corpus_removals?: boolean | undefined;
    include_all_drives?: boolean | undefined;
    include_removed?: boolean | undefined;
    restrict_to_my_drive?: boolean | undefined;
    supports_all_drives?: boolean | undefined;
    spaces?: string[] | undefined;
    include_permissions?: string | undefined;
    include_labels?: string[] | undefined;
}): Promise<GoogleDriveChannel>;
export function stop(options: {
    id: string;
    resource_id: string;
    resource_uri: string;
    type: string;
    address: string;
    params?: {
        [x: string]: string;
    } | undefined;
    token?: string | undefined;
    expiration?: string | undefined;
    payload?: boolean | undefined;
}): Promise<void>;
//# sourceMappingURL=changes.d.ts.map