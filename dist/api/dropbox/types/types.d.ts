type DropboxPreview = {
    file_metadata?: DropboxFileMetadata | undefined;
    link_metadata?: DropboxFileLinkMetadata | undefined;
};
type DropboxFileLinkMetadata = {
    /**
     * - URL of the shared link
     */
    url: string;
    /**
     * - A unique identifier for the current version of a file
     */
    rev: string;
    /**
     * - Unique identifier for the linked file
     */
    id?: string | undefined;
    /**
     * - Full path in the user's Dropbox
     */
    path?: string | undefined;
};
type DropboxFileMetadata = {
    /**
     * // .tag
     */
    tag: string;
    /**
     * - The last component of the path (including extension)
     */
    name: string;
    /**
     * - A unique identifier for the file
     */
    id: string;
    /**
     * - For files, this is the modification time set by the desktop client when the file was added to Dropbox (not verified)
     */
    client_modified: ISO8601Timestamp;
    /**
     * - The last time the file was modified on Dropbox
     */
    server_modified: ISO8601Timestamp;
    /**
     * - A unique identifier for the current revision of a file
     */
    rev: string;
    /**
     * - The file size in bytes
     */
    size: number;
    /**
     * - The lowercased full path in the user's Dropbox.
     * - This always starts with a slash.
     * - This field will be `null` if the file or folder is not mounted.
     */
    path_lower?: string | undefined;
    /**
     * - The cased path to be used for display purposes only
     */
    path_display?: string | undefined;
    /**
     * - The preview URL of the file
     */
    preview_url?: string | undefined;
    /**
     * - Additional information if the file is a photo or video
     */
    media_info?: DropboxMediaInfo | undefined;
    /**
     * - Set if this file is a symlink
     */
    symlink_info?: {
        target: string;
    } | undefined;
    /**
     * Set if this file is contained in a shared folder
     */
    sharing_info?: DropboxFileSharingInfo | undefined;
    /**
     * - Whether file can be downloaded directly or must be exported (default true)
     */
    is_downloadable?: boolean | undefined;
    /**
     * - Information about format this file can be exported to. This field must be set if `is_downloadable` is set to false.
     */
    export_info?: {
        export_as?: string | undefined;
        export_options?: string[] | undefined;
    } | undefined;
    /**
     * - Additional information if the file has custom properties with the property template specified
     */
    property_groups?: DropboxPropertyGroups[] | undefined;
    /**
     * - This flag will only be present if `include_has_explicit_shared_members` is true in `list_folder` or `get_metadata`
     */
    has_explicit_shared_members?: boolean | undefined;
    /**
     * - A hash of the file content
     */
    content_hash?: string | undefined;
    /**
     * - If present, the metadata associated with the file's current lock
     */
    file_lock_info?: DropboxFileLockMetadata | undefined;
};
type DropboxFolderMetadata = {
    /**
     * // .tag
     */
    tag: string;
    /**
     * - The last component of the path (including extension)
     */
    name: string;
    /**
     * - A unique identifier for the file
     */
    id: string;
    /**
     * - The lowercased full path in the user's Dropbox.
     * - This always starts with a slash.
     * - This field will be `null` if the file or folder is not mounted.
     */
    path_lower?: string | undefined;
    /**
     * - The cased path to be used for display purposes only
     */
    path_display?: string | undefined;
    /**
     * - The preview URL of the file
     */
    preview_url?: string | undefined;
    /**
     * Set if this file is contained in a shared folder
     */
    sharing_info?: DropboxFileSharingInfo | undefined;
    /**
     * - Additional information if the file has custom properties with the property template specified
     */
    property_groups?: DropboxPropertyGroups[] | undefined;
};
type DropboxDeletedMetadata = {
    /**
     * // .tag
     */
    tag: string;
    name: string;
    /**
     * - The lowercased full path in the user's Dropbox.
     * - This always starts with a slash.
     * - This field will be `null` if the file or folder is not mounted.
     */
    path_lower?: string | undefined;
    /**
     * - The cased path to be used for display purposes only
     */
    path_display?: string | undefined;
    /**
     * - The preview URL of the file
     */
    preview_url?: string | undefined;
};
type DropboxMediaInfo = DropboxMediaMetadata | void;
type DropboxMediaMetadata = {
    photo?: DropboxPhotoMetadata | undefined;
    video?: DropboxVideoMetadata | undefined;
};
type DropboxPhotoMetadata = {
    dimensions?: {
        height: number;
        width: number;
    } | undefined;
    location?: {
        latitude: number;
        longitude: number;
    } | undefined;
    time_taken?: string | undefined;
};
type DropboxVideoMetadata = {
    dimensions?: {
        height: number;
        width: number;
    } | undefined;
    location?: {
        latitude: number;
        longitude: number;
    } | undefined;
    time_taken?: string | undefined;
    duration?: number | undefined;
};
type DropboxFileSharingInfo = {
    /**
     * - Whether the file or folder is inside a read-only shared folder
     */
    read_only: boolean;
    /**
     * - ID of shared folder that holds this file
     */
    parent_shared_folder_id: string;
    /**
     * - The last user who modified the file. This field will be `null` if the user's account has been deleted.
     */
    modified_by?: string | undefined;
};
type DropboxPropertyGroups = {
    /**
     * - The actual properties associated with the template. There can be up to 32 property types per template.
     */
    fields: DropboxPropertyField[];
    /**
     * - A unique identifier for the associated template
     */
    template_id: string;
};
type DropboxPropertyField = {
    /**
     * - Key of the property field associated with a file and template (up to 256 bytes)
     */
    name: string;
    /**
     * - Value of the property field associated with a file and template (up to 1024 bytes)
     */
    value: string;
};
type DropboxFileLockMetadata = {
    /**
     * - Whether caller holds the file lock
     */
    is_lockholder?: boolean | undefined;
    /**
     * - The display name of the lock holder
     */
    lockholder_name?: string | undefined;
    /**
     * - The account ID of the lock holder if known
     */
    lockholder_account_id?: string | undefined;
    /**
     * - The timestamp the lock was created
     */
    created?: string | undefined;
};
/**
 * | Value          | Description                                                              |
 * |----------------|--------------------------------------------------------------------------|
 * | strict         | Scale down the image to fit within the given size                        |
 * | bestfit        | Scale down the image to fit within the given size or its transpose       |
 * | fitone_bestfit | Scale down the image to completely cover the given size or its transpose |
 */
type DropboxThumbnailMode = string;
/**
 * | Value      | Description               |
 * |------------|---------------------------|
 * | quality_80 | Default thumbnail quality |
 * | quality_90 | High thumbnail quality    |
 */
type DropboxThumbnailQuality = string;
/**
 * | Value      | Description     |
 * |------------|-----------------|
 * | w32h32     | 32 by 32 px     |
 * | w64h64     | 64 by 64 px     |
 * | w128h128   | 128 by 128 px   |
 * | w256h256   | 256 by 256 px   |
 * | w480h320   | 480 by 320 px   |
 * | w640h480   | 640 by 480 px   |
 * | w960h640   | 960 by 640 px   |
 * | w1024h768  | 1024 by 768 px  |
 * | w2048h1536 | 2048 by 1536 px |
 */
type DropboxThumbnailSize = string;
//# sourceMappingURL=types.d.ts.map