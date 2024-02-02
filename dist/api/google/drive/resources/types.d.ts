type GoogleDriveDrive = {
    id: string;
    name: string;
    kind: string;
    colorRgb?: string | undefined;
    themeId?: string | undefined;
    backgroundImageLink?: string | undefined;
    backgroundImageFile?: GoogleDriveBackgroundImage | undefined;
    createdTime?: string | undefined;
    hidden?: boolean | undefined;
    capabilities: GoogleDriveCapabilities;
    maxUploadSize?: GoogleDriveRestrictions | undefined;
    orgUnitId?: string | undefined;
};
type GoogleDriveCapabilities = {
    canAddChildren: boolean;
    canComment: boolean;
    canCopy: boolean;
    canDeleteDrive: boolean;
    canDownload: boolean;
    canEdit: boolean;
    canListChildren: boolean;
    canManageMembers: boolean;
    canReadRevisions: boolean;
    canRename: boolean;
    canRenameDrive: boolean;
    canChangeDriveBackground: boolean;
    canShare: boolean;
    canChangeCopyRequiresWriterPermissionRestriction: boolean;
    canChangeDomainUsersOnlyRestriction: boolean;
    canChangeDriveMembersOnlyRestriction: boolean;
    canChangeSharingFoldersRequiresOrganizerPermissionRestriction: boolean;
    canResetDriveRestrictions: boolean;
    canDeleteChildren: boolean;
    canTrashChildren: boolean;
};
type GoogleDriveRestrictions = {
    copyRequiresWriterPermission: boolean;
    domainUsersOnly: boolean;
    driveMembersOnly: boolean;
    adminManagedRestrictions: boolean;
    sharingFoldersRequiresOrganizerPermission: boolean;
};
type GoogleDriveBackgroundImage = {
    id: string;
    xCoordinate: number;
    yCoordinate: number;
    width: number;
};
type GoogleDriveAbout = {
    kind: string;
    user: GoogleDriveUser;
    storageQuota: GoogleDriveStorageQuota;
    importFormats: {
        [x: string]: string[];
    };
    exportFormats: {
        [x: string]: string[];
    };
    maxImportSizes: {
        [x: string]: string;
    };
    maxUploadSize: number;
    folderColorPalette: string[];
    appInstalled: boolean;
    canCreateDrives: boolean;
    driveThemes: GoogleDriveTheme[];
};
type GoogleDriveUser = {
    displayName: string;
    me: boolean;
    emailAddress: string;
    permissionId: string;
    photoLink: string;
};
type GoogleDriveStorageQuota = {
    limit: string;
    usageInDrive: string;
    usageInDriveTrash: string;
    usage: string;
};
type GoogleDriveTheme = {
    id: string;
    backgroundImageLink: string;
    colorRgb: string;
};
type GoogleDriveApp = {
    id: string;
    name: string;
    supportsCreate: boolean;
    supportsImport: boolean;
    supportsMultiOpen: boolean;
    supportsOfflineCreate: boolean;
    productUrl?: string | undefined;
    productId?: string | undefined;
    objectType?: string | undefined;
    primaryMimeTypes?: string[] | undefined;
    secondaryMimeTypes?: string[] | undefined;
    primaryFileExtensions?: string[] | undefined;
    secondaryFileExtensions?: string[] | undefined;
    installed?: boolean | undefined;
    authorized?: boolean | undefined;
    useByDefault?: boolean | undefined;
    icons?: GoogleDriveIcon[] | undefined;
    shortDescription?: string | undefined;
    longDescription?: string | undefined;
    openUrlTemplate?: string | undefined;
    createUrl?: string | undefined;
    createInFolderTemplate?: string | undefined;
    hasDriveWideScope?: boolean | undefined;
};
type GoogleDriveIcon = {
    size: number;
    category: string;
    iconUrl: string;
};
type GoogleDriveChange = {
    kind: string;
    removed: boolean;
    file: GoogleDriveFile;
    fileId: string;
    time: string;
    driveId: string;
    changeType: string;
    drive: GoogleDriveDrive;
};
type GoogleDriveContentRestriction = {
    readOnly: boolean;
    reason: string;
    type: string;
    restrictingUser: GoogleDriveUser;
    restrictionTime: string;
    ownerRestricted: boolean;
    systemRestricted: boolean;
};
type GoogleDriveContentHints = {
    indexableText: string;
    thumbnail: {
        image: string;
        mimeType: string;
    };
};
type GoogleDrivePermission = {
    id: string;
    displayName: string;
    type: string;
    kind: string;
    permissionDetails: {
        permissionType: string;
        inheritedFrom: string;
        role: string;
        inherited: boolean;
    }[];
    photoLink: string;
    emailAddress: string;
    role: string;
    allowFileDiscovery: boolean;
    domain: string;
    expirationTime: string;
    deleted: boolean;
    view: string;
    pendingOwner: boolean;
};
type GoogleDriveImageMediaMetadata = {
    flashUsed: boolean;
    meteringMode: string;
    sensor: string;
    exposureMode: string;
    colorSpace: string;
    whiteBalance: string;
    width: number;
    height: number;
    location: {
        latitude: number;
        longitude: number;
        altitude: number;
    };
    rotation: number;
    time: string;
    cameraMake: string;
    cameraModel: string;
    exposureTime: number;
    aperture: number;
    focalLength: number;
    isoSpeed: number;
    exposureBias: number;
    maxApertureValue: number;
    subjectDistance: number;
    lens: string;
};
type GoogleDriveVideoMediaMetadata = {
    width: number;
    height: number;
    durationMillis: string;
};
type GoogleDriveShortcutDetails = {
    targetId: string;
    targetMimeType: string;
    targetResourceKey: string;
};
type GoogleDriveLabel = {
    id: string;
    revisionId: string;
    kind: string;
    fields: {
        [x: string]: GoogleDriveField;
    };
};
type GoogleDriveField = {
    kind: boolean;
    id: string;
    valueType: string;
    dateString: string[];
    integer: string[];
    selection: string[];
    text: string[];
    user: GoogleDriveUser[];
};
type GoogleDriveFile = {
    id: string;
    name: string;
    description?: string | undefined;
    starred?: boolean | undefined;
    trashed?: boolean | undefined;
    explicitlyTrashed?: boolean | undefined;
    createdTime?: string | undefined;
    modifiedTime?: string | undefined;
    modifiedByMeTime?: string | undefined;
    viewedByMeTime?: string | undefined;
    sharedWithMeTime?: string | undefined;
    quotaBytesUsed?: string | undefined;
    version?: string | undefined;
    originalFilename?: string | undefined;
    ownedByMe?: boolean | undefined;
    kind: string;
    driveId?: string | undefined;
    fileExtension?: string | undefined;
    copyRequiresWriterPermission?: boolean | undefined;
    md5Checksum?: string | undefined;
    contentHints?: GoogleDriveContentHints | undefined;
    writersCanShare?: boolean | undefined;
    viewedByMe?: boolean | undefined;
    mimeType: string;
    exportLinks?: {
        [x: string]: string;
    } | undefined;
    parents?: string[] | undefined;
    thumbnailLink?: string | undefined;
    iconLink?: string | undefined;
    shared?: boolean | undefined;
    lastModifyingUser?: GoogleDriveUser | undefined;
    owners?: GoogleDriveUser[] | undefined;
    headRevisionId?: GoogleDriveIcon[] | undefined;
    sharingUser?: GoogleDriveUser | undefined;
    webViewLink?: string | undefined;
    webContentLink?: string | undefined;
    size?: string | undefined;
    permissions?: GoogleDrivePermission[] | undefined;
    hasThumbnail?: boolean | undefined;
    spaces?: string[] | undefined;
    folderColorRgb?: string | undefined;
    fullFileExtension?: string | undefined;
    properties?: {
        [x: string]: string;
    } | undefined;
    appProperties?: {
        [x: string]: string;
    } | undefined;
    isAppAuthorized?: boolean | undefined;
    capabilities?: GoogleDriveCapabilities | undefined;
    hasAugmentedPermissions?: boolean | undefined;
    trashingUser?: GoogleDriveUser | undefined;
    thumbnailVersion?: string | undefined;
    trashedTime?: string | undefined;
    modifiedByMe?: boolean | undefined;
    permissionIds?: string[] | undefined;
    imageMediaMetadata?: GoogleDriveImageMediaMetadata | undefined;
    videoMediaMetadata?: GoogleDriveVideoMediaMetadata | undefined;
    shortcutDetails?: GoogleDriveShortcutDetails | undefined;
    contentRestrictions?: GoogleDriveContentRestriction[] | undefined;
    resourceKey?: string | undefined;
    linkShareMetadata?: {
        securityUpdateEligible: boolean;
        securityUpdateEnabled: boolean;
    } | undefined;
    labelInfo?: {
        labels: GoogleDriveLabel[];
    } | undefined;
    sha1Checksum?: string | undefined;
    sha256Checksum?: string | undefined;
};
type GoogleDriveChannel = {
    id: string;
    payload: boolean;
    kind: string;
    resourceId: string;
    resourceUri: string;
    type: string;
    address: string;
    token?: string | undefined;
    expiration?: string | undefined;
    params?: {
        [x: string]: string;
    } | undefined;
};
type GoogleDriveComment = {
    id: string;
    kind: string;
    createdTime: string;
    modifiedTime: string;
    resolved: boolean;
    anchor: string;
    replies: GoogleDriveReply[];
    author: GoogleDriveUser;
    deleted: boolean;
    htmlContent: string;
    content: string;
    quotedFileContent: {
        mimeType: string;
        value: string;
    };
};
type GoogleDriveReply = {
    id: string;
    kind: string;
    createdTime: string;
    modifiedTime: string;
    action: string;
    author: GoogleDriveUser;
    deleted: boolean;
    htmlContent: string;
    content: string;
};
//# sourceMappingURL=types.d.ts.map