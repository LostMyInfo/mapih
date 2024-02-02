export function retrieve(app_id: string): Promise<GoogleDriveApp>;
export function list(options?: {
    extensions?: string[] | undefined;
    mime_types?: string[] | undefined;
    language_code?: string | undefined;
} | undefined): Promise<GoogleDriveApp[]>;
//# sourceMappingURL=apps.d.ts.map