// @ts-check

/**
 * @typedef {Object} GoogleDriveDrive
 * @property {string} id
 * @property {string} name
 * @property {string} kind
 * @property {string} [colorRgb]
 * @property {string} [themeId]
 * @property {string} [backgroundImageLink]
 * @property {GoogleDriveBackgroundImage} [backgroundImageFile]
 * @property {string} [createdTime]
 * @property {boolean} [hidden]
 * @property {GoogleDriveCapabilities} capabilities
 * @property {GoogleDriveRestrictions} [maxUploadSize]
 * @property {string} [orgUnitId]
 */

/**
 * @typedef {Object} GoogleDriveCapabilities
 * @property {boolean} canAddChildren
 * @property {boolean} canComment
 * @property {boolean} canCopy
 * @property {boolean} canDeleteDrive
 * @property {boolean} canDownload
 * @property {boolean} canEdit
 * @property {boolean} canListChildren
 * @property {boolean} canManageMembers
 * @property {boolean} canReadRevisions
 * @property {boolean} canRename
 * @property {boolean} canRenameDrive
 * @property {boolean} canChangeDriveBackground
 * @property {boolean} canShare
 * @property {boolean} canChangeCopyRequiresWriterPermissionRestriction
 * @property {boolean} canChangeDomainUsersOnlyRestriction
 * @property {boolean} canChangeDriveMembersOnlyRestriction
 * @property {boolean} canChangeSharingFoldersRequiresOrganizerPermissionRestriction
 * @property {boolean} canResetDriveRestrictions
 * @property {boolean} canDeleteChildren
 * @property {boolean} canTrashChildren
 */

/**
 * @typedef {Object} GoogleDriveRestrictions
 * @property {boolean} copyRequiresWriterPermission
 * @property {boolean} domainUsersOnly
 * @property {boolean} driveMembersOnly
 * @property {boolean} adminManagedRestrictions
 * @property {boolean} sharingFoldersRequiresOrganizerPermission
 */

/**
 * @typedef {Object} GoogleDriveBackgroundImage
 * @property {string} id
 * @property {number} xCoordinate
 * @property {number} yCoordinate
 * @property {number} width
 */

/**
 * @typedef {Object} GoogleDriveAbout
 * @property {string} kind
 * @property {GoogleDriveUser} user
 * @property {GoogleDriveStorageQuota} storageQuota
 * @property {{[x: string]: string[]}} importFormats
 * @property {{[x: string]: string[]}} exportFormats
 * @property {{[x: string]: string}} maxImportSizes
 * @property {number} maxUploadSize
 * @property {string[]} folderColorPalette
 * @property {boolean} appInstalled
 * @property {boolean} canCreateDrives
 * @property {GoogleDriveTheme[]} driveThemes
 */

/**
 * @typedef {Object} GoogleDriveUser
 * @property {string} displayName
 * @property {boolean} me
 * @property {string} emailAddress
 * @property {string} permissionId
 * @property {string} photoLink
 */
 
/**
 * @typedef {Object} GoogleDriveStorageQuota
 * @property {string} limit
 * @property {string} usageInDrive
 * @property {string} usageInDriveTrash
 * @property {string} usage
 */
 
/**
 * @typedef {Object} GoogleDriveTheme
 * @property {string} id
 * @property {string} backgroundImageLink
 * @property {string} colorRgb
 */
 
/**
 * @typedef {Object} GoogleDriveApp
 * @property {string} id
 * @property {string} name
 * @property {boolean} supportsCreate
 * @property {boolean} supportsImport
 * @property {boolean} supportsMultiOpen
 * @property {boolean} supportsOfflineCreate
 * @property {string} [productUrl]
 * @property {string} [productId]
 * @property {string} [objectType]
 * @property {string[]} [primaryMimeTypes]
 * @property {string[]} [secondaryMimeTypes]
 * @property {string[]} [primaryFileExtensions]
 * @property {string[]} [secondaryFileExtensions]
 * @property {boolean} [installed]
 * @property {boolean} [authorized]
 * @property {boolean} [useByDefault]
 * @property {GoogleDriveIcon[]} [icons]
 * @property {string} [shortDescription]
 * @property {string} [longDescription]
 * @property {string} [openUrlTemplate]
 * @property {string} [createUrl]
 * @property {string} [createInFolderTemplate]
 * @property {boolean} [hasDriveWideScope]
 */
 
/**
 * @typedef {Object} GoogleDriveIcon
 * @property {number} size
 * @property {string} category
 * @property {string} iconUrl
 */
 
/**
 * @typedef {Object} GoogleDriveChange
 * @property {string} kind
 * @property {boolean} removed
 * @property {GoogleDriveFile} file
 * @property {string} fileId
 * @property {string} time
 * @property {string} driveId
 * @property {string} changeType
 * @property {GoogleDriveDrive} drive
 */

/**
 * @typedef {Object} GoogleDriveContentRestriction
 * @property {boolean} readOnly
 * @property {string} reason
 * @property {string} type
 * @property {GoogleDriveUser} restrictingUser
 * @property {string} restrictionTime
 * @property {boolean} ownerRestricted
 * @property {boolean} systemRestricted
 */

/**
 * @typedef {Object} GoogleDriveContentHints
 * @property {string} indexableText
 * @property {{image: string, mimeType: string}} thumbnail
 */

/**
 * @typedef {Object} GoogleDrivePermission
 * @property {string} id
 * @property {string} displayName
 * @property {string} type
 * @property {string} kind
 * @property {{permissionType: string, inheritedFrom: string, role: string, inherited: boolean}[]} permissionDetails
 * @property {string} photoLink
 * @property {string} emailAddress
 * @property {string} role
 * @property {boolean} allowFileDiscovery
 * @property {string} domain
 * @property {string} expirationTime
 * @property {boolean} deleted
 * @property {string} view
 * @property {boolean} pendingOwner
 */

/**
 * @typedef {Object} GoogleDriveImageMediaMetadata
 * @property {boolean} flashUsed
 * @property {string} meteringMode
 * @property {string} sensor
 * @property {string} exposureMode
 * @property {string} colorSpace
 * @property {string} whiteBalance
 * @property {number} width
 * @property {number} height
 * @property {{latitude: number, longitude: number, altitude: number}} location
 * @property {number} rotation
 * @property {string} time
 * @property {string} cameraMake
 * @property {string} cameraModel
 * @property {number} exposureTime
 * @property {number} aperture
 * @property {number} focalLength
 * @property {number} isoSpeed
 * @property {number} exposureBias
 * @property {number} maxApertureValue
 * @property {number} subjectDistance
 * @property {string} lens
 */

/**
 * @typedef {Object} GoogleDriveVideoMediaMetadata
 * @property {number} width
 * @property {number} height
 * @property {string} durationMillis
 */

/**
 * @typedef {Object} GoogleDriveShortcutDetails
 * @property {string} targetId
 * @property {string} targetMimeType
 * @property {string} targetResourceKey
 */

/**
 * @typedef {Object} GoogleDriveLabel
 * @property {string} id
 * @property {string} revisionId
 * @property {string} kind
 * @property {{[x: string]: GoogleDriveField}} fields
 */

/**
 * @typedef {Object} GoogleDriveField
 * @property {boolean} kind
 * @property {string} id
 * @property {string} valueType
 * @property {string[]} dateString
 * @property {string[]} integer
 * @property {string[]} selection
 * @property {string[]} text
 * @property {GoogleDriveUser[]} user
 */

/**
 * @typedef {Object} GoogleDriveFile
 * @property {string} id
 * @property {string} name
 * @property {string} [description]
 * @property {boolean} [starred]
 * @property {boolean} [trashed]
 * @property {boolean} [explicitlyTrashed]
 * @property {string} [createdTime]
 * @property {string} [modifiedTime]
 * @property {string} [modifiedByMeTime]
 * @property {string} [viewedByMeTime]
 * @property {string} [sharedWithMeTime]
 * @property {string} [quotaBytesUsed]
 * @property {string} [version]
 * @property {string} [originalFilename]
 * @property {boolean} [ownedByMe]
 * @property {string} kind
 * @property {string} [driveId]
 * @property {string} [fileExtension]
 * @property {boolean} [copyRequiresWriterPermission]
 * @property {string} [md5Checksum]
 * @property {GoogleDriveContentHints} [contentHints]
 * @property {boolean} [writersCanShare]
 * @property {boolean} [viewedByMe]
 * @property {string} mimeType
 * @property {{[x: string]: string}} [exportLinks]
 * @property {string[]} [parents]
 * @property {string} [thumbnailLink]
 * @property {string} [iconLink]
 * @property {boolean} [shared]
 * @property {GoogleDriveUser} [lastModifyingUser]
 * @property {GoogleDriveUser[]} [owners]
 * @property {GoogleDriveIcon[]} [headRevisionId]
 * @property {GoogleDriveUser} [sharingUser]
 * @property {string} [webViewLink]
 * @property {string} [webContentLink]
 * @property {string} [size]
 * @property {GoogleDrivePermission[]} [permissions]
 * @property {boolean} [hasThumbnail]
 * @property {string[]} [spaces]
 * @property {string} [folderColorRgb]
 * @property {string} [fullFileExtension]
 * @property {{[x: string]: string}} [properties]
 * @property {{[x: string]: string}} [appProperties]
 * @property {boolean} [isAppAuthorized]
 * @property {GoogleDriveCapabilities} [capabilities]
 * @property {boolean} [hasAugmentedPermissions]
 * @property {GoogleDriveUser} [trashingUser]
 * @property {string} [thumbnailVersion]
 * @property {string} [trashedTime]
 * @property {boolean} [modifiedByMe]
 * @property {string[]} [permissionIds]
 * @property {GoogleDriveImageMediaMetadata} [imageMediaMetadata]
 * @property {GoogleDriveVideoMediaMetadata} [videoMediaMetadata]
 * @property {GoogleDriveShortcutDetails} [shortcutDetails]
 * @property {GoogleDriveContentRestriction[]} [contentRestrictions]
 * @property {string} [resourceKey]
 * @property {{securityUpdateEligible: boolean, securityUpdateEnabled: boolean}} [linkShareMetadata]
 * @property {{labels: GoogleDriveLabel[]}} [labelInfo]
 * @property {string} [sha1Checksum]
 * @property {string} [sha256Checksum]
 */

/**
 * @typedef {Object} GoogleDriveChannel
 * @property {string} id
 * @property {boolean} payload
 * @property {string} kind
 * @property {string} resourceId
 * @property {string} resourceUri
 * @property {string} type
 * @property {string} address
 * @property {string} [token]
 * @property {string} [expiration]
 * @property {{[x: string]: string}} [params]
 */

/**
 * @typedef {Object} GoogleDriveComment
 * @property {string} id
 * @property {string} kind
 * @property {string} createdTime
 * @property {string} modifiedTime
 * @property {boolean} resolved
 * @property {string} anchor
 * @property {GoogleDriveReply[]} replies
 * @property {GoogleDriveUser} author
 * @property {boolean} deleted
 * @property {string} htmlContent
 * @property {string} content
 * @property {{mimeType: string, value: string}} quotedFileContent
 */

/**
 * @typedef {Object} GoogleDriveReply
 * @property {string} id
 * @property {string} kind
 * @property {string} createdTime
 * @property {string} modifiedTime
 * @property {string} action
 * @property {GoogleDriveUser} author
 * @property {boolean} deleted
 * @property {string} htmlContent
 * @property {string} content
 */