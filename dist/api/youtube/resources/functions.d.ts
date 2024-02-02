/**
 * @param {any} payload
 * @param {YouTubeSnippet[]} videos
 * @param {YouTubeSnippet[]} channels
 * @param {YouTubeSnippet[]} playlists
 * @returns {YouTubeSearchReturn|undefined}
 */
export function buildSearchReturn(payload: any, videos?: YouTubeSnippet[], channels?: YouTubeSnippet[], playlists?: YouTubeSnippet[]): YouTubeSearchReturn | undefined;
/**
 *
 * @param {any} payload
 * @param {(YouTubeSnippet & { contentDetails?: YouTubeContentDetails, fileDetails?: YouTubeVideoFileDetails, statistics?: YouTubeVideoStatistics, status?: YouTubeVideoStatus, processingDetails?: YouTubeVideoProcessingDetails, recordingDetails?: YouTubeVideoRecordingDetails, player?: YouTubeVideoPlayer, suggestions?: YouTubeVideoSuggestions, liveStreamingDetails?: YouTubeVideoLiveStreamingDetails, topicDetails?: YouTubeVideoTopicDetails })[]} videos
 * @returns {YouTubeVideoReturn|undefined}
 */
export function buildVideoReturn(payload: any, videos?: (YouTubeSnippet & {
    contentDetails?: YouTubeContentDetails;
    fileDetails?: YouTubeVideoFileDetails;
    statistics?: YouTubeVideoStatistics;
    status?: YouTubeVideoStatus;
    processingDetails?: YouTubeVideoProcessingDetails;
    recordingDetails?: YouTubeVideoRecordingDetails;
    player?: YouTubeVideoPlayer;
    suggestions?: YouTubeVideoSuggestions;
    liveStreamingDetails?: YouTubeVideoLiveStreamingDetails;
    topicDetails?: YouTubeVideoTopicDetails;
})[]): YouTubeVideoReturn | undefined;
/**
 * @param {{[x: string]: any}|undefined} options - The options to validate.
 * @throws {Error} Throws an error if any restricted property has an invalid value.
 * @returns {boolean|undefined} Returns true if all restricted options are valid.
 */
export function validateOptions(options: {
    [x: string]: any;
} | undefined): boolean | undefined;
//# sourceMappingURL=functions.d.ts.map