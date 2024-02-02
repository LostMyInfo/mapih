export function retrieve(id: string | string[], options?: {
    chart?: string | undefined;
    include?: string[] | undefined;
    limit?: number | undefined;
    myRating?: string | undefined;
    maxHeight?: number | undefined;
    maxWidth?: number | undefined;
    onBehalfOfContentOwner?: string | undefined;
    pageToken?: string | undefined;
    videoCategoryId?: string | undefined;
} | undefined): Promise<YouTubeVideoReturn | undefined>;
//# sourceMappingURL=videos.d.ts.map