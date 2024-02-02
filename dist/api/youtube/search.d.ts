export function search(query: string, options?: {
    type?: string[] | undefined;
    limit?: number | undefined;
    safe_search?: string | undefined;
    sort?: string | undefined;
    channelId?: string | undefined;
    channelType?: string | undefined;
    eventType?: string | undefined;
    location?: string | undefined;
    locationRadius?: string | undefined;
    pageToken?: string | undefined;
    publishedAfter?: string | undefined;
    publishedBefore?: string | undefined;
    regionCode?: string | undefined;
    relevanceLanguage?: string | undefined;
    topicId?: string | undefined;
    videoCaption?: string | undefined;
    videoCategoryId?: string | undefined;
    videoDefinition?: string | undefined;
    videoDimension?: string | undefined;
    videoDuration?: string | undefined;
    videoEmbeddable?: string | undefined;
    videoLicense?: string | undefined;
    videoPaidProductPlacement?: string | undefined;
    videoSyndicated?: string | undefined;
    videoType?: string | undefined;
} | undefined): Promise<YouTubeSearchReturn | undefined>;
//# sourceMappingURL=search.d.ts.map