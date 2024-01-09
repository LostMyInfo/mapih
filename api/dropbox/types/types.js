// @ts-check

/**
 * @typedef {Object} DropboxPreview
 * @property {DropboxFileMetadata} [file_metadata]
 * @property {DropboxFileLinkMetadata} [link_metadata]
 */

/**
 * @typedef {Object} DropboxFileLinkMetadata
 * @property {string} url - URL of the shared link
 * @property {string} rev - A unique identifier for the current version of a file
 * @property {string} [id] - Unique identifier for the linked file
 * @property {string} [path] - Full path in the user's Dropbox
 */

/**
 * @typedef {Object} DropboxFileMetadata
 * @property {string} tag // .tag
 * @property {string} name - The last component of the path (including extension)
 * @property {string} id - A unique identifier for the file
 * @property {ISO8601Timestamp} client_modified - For files, this is the modification time set by the desktop client when the file was added to Dropbox (not verified)
 * @property {ISO8601Timestamp} server_modified - The last time the file was modified on Dropbox
 * @property {string} rev - A unique identifier for the current revision of a file
 * @property {number} size - The file size in bytes
 * @property {string} [path_lower]
 * - The lowercased full path in the user's Dropbox.  
 * - This always starts with a slash.  
 * - This field will be `null` if the file or folder is not mounted.
 * @property {string} [path_display] - The cased path to be used for display purposes only
 * @property {string} [preview_url] - The preview URL of the file
 * @property {DropboxMediaInfo} [media_info] - Additional information if the file is a photo or video
 * @property {{target: string}} [symlink_info] - Set if this file is a symlink
 * @property {DropboxFileSharingInfo} [sharing_info] Set if this file is contained in a shared folder
 * @property {boolean} [is_downloadable] - Whether file can be downloaded directly or must be exported (default true)
 * @property {{export_as?: string, export_options?: string[]}} [export_info] - Information about format this file can be exported to. This field must be set if `is_downloadable` is set to false.
 * @property {DropboxPropertyGroups[]} [property_groups] - Additional information if the file has custom properties with the property template specified
 * @property {boolean} [has_explicit_shared_members] - This flag will only be present if `include_has_explicit_shared_members` is true in `list_folder` or `get_metadata`
 * @property {string} [content_hash] - A hash of the file content
 * @property {DropboxFileLockMetadata} [file_lock_info] - If present, the metadata associated with the file's current lock
 */

/**
 * @typedef {Object} DropboxFolderMetadata
 * @property {string} tag // .tag
 * @property {string} name - The last component of the path (including extension)
 * @property {string} id - A unique identifier for the file
 * @property {string} [path_lower]
 * - The lowercased full path in the user's Dropbox.  
 * - This always starts with a slash.  
 * - This field will be `null` if the file or folder is not mounted.
 * @property {string} [path_display] - The cased path to be used for display purposes only
 * @property {string} [preview_url] - The preview URL of the file
 * @property {DropboxFileSharingInfo} [sharing_info] Set if this file is contained in a shared folder
 * @property {DropboxPropertyGroups[]} [property_groups] - Additional information if the file has custom properties with the property template specified
 */

/**
 * @typedef {Object} DropboxDeletedMetadata
 * @property {string} tag // .tag
 * @property {string} name
 * @property {string} [path_lower]
 * - The lowercased full path in the user's Dropbox.  
 * - This always starts with a slash.  
 * - This field will be `null` if the file or folder is not mounted.
 * @property {string} [path_display] - The cased path to be used for display purposes only
 * @property {string} [preview_url] - The preview URL of the file
 */

/**
 * @typedef {DropboxMediaMetadata|void} DropboxMediaInfo
 */

/**
 * @typedef {Object} DropboxMediaMetadata
 * @property {DropboxPhotoMetadata} [photo]
 * @property {DropboxVideoMetadata} [video]
 */

/**
 * @typedef {Object} DropboxPhotoMetadata
 * @property {{height: number, width: number}} [dimensions]
 * @property {{latitude: number, longitude: number}} [location]
 * @property {ISO8601Timestamp} [time_taken]
 */

/**
 * @typedef {Object} DropboxVideoMetadata
 * @property {{height: number, width: number}} [dimensions]
 * @property {{latitude: number, longitude: number}} [location]
 * @property {ISO8601Timestamp} [time_taken]
 * @property {number} [duration]
 */

/**
 * @typedef {Object} DropboxFileSharingInfo
 * @property {boolean} read_only - Whether the file or folder is inside a read-only shared folder
 * @property {string} parent_shared_folder_id - ID of shared folder that holds this file
 * @property {string} [modified_by] - The last user who modified the file. This field will be `null` if the user's account has been deleted.
 */

/**
 * @typedef {Object} DropboxPropertyGroups
 * @property {DropboxPropertyField[]} fields - The actual properties associated with the template. There can be up to 32 property types per template.
 * @property {string} template_id - A unique identifier for the associated template
 */

/**
 * @typedef {Object} DropboxPropertyField
 * @property {string} name - Key of the property field associated with a file and template (up to 256 bytes)
 * @property {string} value - Value of the property field associated with a file and template (up to 1024 bytes)
 */

/**
 * @typedef {Object} DropboxFileLockMetadata
 * @property {boolean} [is_lockholder] - Whether caller holds the file lock
 * @property {string} [lockholder_name] - The display name of the lock holder
 * @property {string} [lockholder_account_id] - The account ID of the lock holder if known
 * @property {ISO8601Timestamp} [created] - The timestamp the lock was created
 */
/**
 * @typedef {string} DropboxThumbnailMode
 * | Value          | Description                                                              |
 * |----------------|--------------------------------------------------------------------------|
 * | strict         | Scale down the image to fit within the given size                        |
 * | bestfit        | Scale down the image to fit within the given size or its transpose       |
 * | fitone_bestfit | Scale down the image to completely cover the given size or its transpose |
 */

/**
 * @typedef {string} DropboxThumbnailQuality
 * | Value      | Description               |
 * |------------|---------------------------|
 * | quality_80 | Default thumbnail quality |
 * | quality_90 | High thumbnail quality    |
 */

/**
 * @typedef {string} DropboxThumbnailSize
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