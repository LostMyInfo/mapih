export function retrieve(options: {
    file_id: string;
    acknowledge_abuse?: boolean | undefined;
    supports_all_drives?: boolean | undefined;
    include_permissions?: string | undefined;
    include_labels?: string[] | undefined;
}): Promise<GoogleDriveFile>;
export function list(options?: {
    drive_id?: string | undefined;
    query?: string | undefined;
    type?: string | undefined;
    trashed?: boolean | undefined;
    include_all_drives?: boolean | undefined;
    include_permissions?: string | undefined;
    include_labels?: string[] | undefined;
    sort?: string[] | undefined;
    page_size?: number | undefined;
    page_token?: string | undefined;
    spaces?: string[] | undefined;
    supports_all_drives?: boolean | undefined;
} | undefined): Promise<{
    nextPageToken: string;
    incompleteSearch: boolean;
    files?: GoogleDriveFile[] | undefined;
    folders?: GoogleDriveFile[] | undefined;
} | undefined>;
//# sourceMappingURL=files.d.ts.map