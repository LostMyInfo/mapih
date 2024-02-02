export declare function retrieve(drive_id: string, { admin_access }?: {
    admin_access?: boolean | undefined;
} | undefined): Promise<GoogleDriveDrive>;
export declare function list({ query, page_token, page_size, admin_access }?: {
    query?: string | undefined;
    page_token?: string | undefined;
    page_size?: number | undefined;
    admin_access?: boolean | undefined;
} | undefined): Promise<{
    nextPageToken: string;
    drives: GoogleDriveDrive[];
}>;
export declare function create(options: {
    id: string;
    name: string;
    colorRgb?: string | undefined;
    theme_id?: string | undefined;
    background_image_file?: GoogleDriveBackgroundImage | undefined;
    hidden?: boolean | undefined;
}): Promise<GoogleDriveDrive>;
export declare function update(options: {
    drive_id: string;
    admin_access?: boolean | undefined;
    name?: string | undefined;
    colorRgb?: string | undefined;
    theme_id?: string | undefined;
    background_image_file?: GoogleDriveBackgroundImage | undefined;
    hidden?: boolean | undefined;
}): Promise<GoogleDriveDrive>;
export declare function _delete(options: {
    drive_id: string;
    admin_access?: boolean | undefined;
    allow_item_deletion?: boolean | undefined;
}): Promise<GoogleDriveDrive>;
export { _delete as delete };
export declare function hide(drive_id: string): Promise<GoogleDriveDrive>;
export declare function unhide(drive_id: string): Promise<GoogleDriveDrive>;
//# sourceMappingURL=drives.d.ts.map