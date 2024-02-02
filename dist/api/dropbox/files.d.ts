export function metadata(path: string, options?: {
    include_deleted?: boolean | undefined;
    include_has_explicit_shared_members?: boolean | undefined;
    include_media_info?: boolean | undefined;
} | undefined): Promise<DropboxFileMetadata | DropboxFolderMetadata | DropboxDeletedMetadata>;
export function preview(path: string): Promise<DropboxFileMetadata>;
export function thumbnail(path: string, options?: {
    format?: string | undefined;
    mode?: string | undefined;
    quality?: string | undefined;
    size?: string | undefined;
} | undefined): Promise<DropboxPreview>;
export function temporaryLink(path: string): Promise<{
    metadata: DropboxFileMetadata;
    link: string;
}>;
export function download(path: string): Promise<DropboxFileMetadata>;
//# sourceMappingURL=files.d.ts.map