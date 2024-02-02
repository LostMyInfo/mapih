export function retrieve(username?: string | undefined): Promise<ImgurAccount>;
export function images(username?: string | undefined): Promise<(ImgurImage | ImgurGalleryImage)[]>;
export function settings(): Promise<(ImgurImage | ImgurGalleryImage)[]>;
export function userFavorites(options?: {
    username?: string | undefined;
    page?: number | undefined;
    sort?: string | undefined;
} | undefined): Promise<(ImgurImage | ImgurGalleryImage)[]>;
export function favorites(options?: {
    username?: string | undefined;
    page?: number | undefined;
    sort?: string | undefined;
} | undefined): Promise<(ImgurImage | ImgurGalleryImage)[]>;
export function submitted(options?: {
    username?: string | undefined;
    page?: number | undefined;
    sort?: string | undefined;
} | undefined): Promise<(ImgurImage | ImgurGalleryImage)[]>;
export function avatar(username?: string | undefined): Promise<(ImgurImage | ImgurGalleryImage)[]>;
export function availableAvatars(username?: string | undefined): Promise<{
    avatars: {
        name: string;
        location: string;
    }[];
    count: number;
    default: number;
}>;
//# sourceMappingURL=users.d.ts.map