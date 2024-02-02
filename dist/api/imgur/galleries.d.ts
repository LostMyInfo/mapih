export function search(options: {
    query: string;
    category?: string | undefined;
    min_images?: number | undefined;
    max_images?: number | undefined;
    match?: string | undefined;
    exclude?: string | undefined;
    limit?: number | undefined;
    type?: string | undefined;
    sort?: string | undefined;
    window?: string | undefined;
    page?: number | undefined;
}): Promise<{
    total: number;
    limit?: number | undefined;
    galleries?: ImgurImage[] | undefined;
    images?: ImgurImage[] | undefined;
}>;
export function retrieve(options?: {
    limit?: number | undefined;
    album_previews?: string | undefined;
    mature?: boolean | undefined;
    show_viral?: boolean | undefined;
    section?: string | undefined;
    sort?: string | undefined;
    window?: string | undefined;
    page?: number | undefined;
} | undefined): Promise<ImgurImage[]>;
//# sourceMappingURL=galleries.d.ts.map