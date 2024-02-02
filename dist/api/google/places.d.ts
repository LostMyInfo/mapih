export function nearby(options: {
    address: string;
    distance?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    include?: string[] | undefined;
    exclude?: string[] | undefined;
}): Promise<GoogleMapsPlace[] | undefined>;
export function search(options: {
    query: string;
    location?: string | undefined;
    address?: string | undefined;
    distance?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    include?: string | undefined;
    min_rating?: number | undefined;
    open?: boolean | undefined;
    price?: string | undefined;
}): Promise<GoogleMapsPlace[] | undefined>;
//# sourceMappingURL=places.d.ts.map