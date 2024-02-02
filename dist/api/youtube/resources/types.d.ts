type YouTubeVideoReturn = {
    channelId?: string | undefined;
    categoryId?: string | undefined;
    videoId?: string | undefined;
    playlistId?: string | undefined;
    title: string;
    description: string;
    channelTitle: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: YouTubeThumbnails;
    liveBroadcastContent: string;
    tags?: string[] | undefined;
    contentDetails: YouTubeContentDetails;
    status: YouTubeVideoStatus;
    statistics: YouTubeVideoStatistics;
    player: YouTubeVideoPlayer;
    topicDetails: YouTubeVideoTopicDetails;
    recordingDetails: YouTubeVideoRecordingDetails;
    fileDetails: YouTubeVideoFileDetails;
    processingDetails: YouTubeVideoProcessingDetails;
    suggestions: YouTubeVideoSuggestions;
    liveStreamingDetails: YouTubeVideoLiveStreamingDetails;
};
type YouTubeSearchReturn = {
    total: number;
    limit: number;
    videos?: YouTubeSearchSnippet[] | undefined;
    channels?: YouTubeSearchSnippet[] | undefined;
    playlists?: YouTubeSearchSnippet[] | undefined;
};
type YouTubeSnippet = {
    channelId?: string | undefined;
    categoryId?: string | undefined;
    videoId?: string | undefined;
    playlistId?: string | undefined;
    title: string;
    description: string;
    channelTitle: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: YouTubeThumbnails;
    liveBroadcastContent: string;
    tags?: string[] | undefined;
};
type YouTubeSearchSnippet = YouTubeSnippet & {
    videoId?: string;
    playlistId?: string;
};
type YouTubeVideoSnippet = YouTubeSnippet & {
    tags: string[];
    categoryId?: string;
};
type YouTubeContentDetails = {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction: YouTubeRegionRestriction;
    contentRating: YouTubeContentRatings;
    /**
     * Specifies the projection format of the video.
     * Valid values for this property are:
     * - `360`
     * - `rectangular`
     */
    projection: string;
};
type YouTubeContentRatings = {
    /**
     * The video's Motion Picture Association of America (MPAA) rating.
     * Valid values for this property are:
     * - `mpaaG`: G
     * - `mpaaPg`: PG
     * - `mpaaPg13`: PG-13
     * - `mpaaNc17`: NC-17
     * - `mpaaR`: R
     * - `mpaaUnrated`: Unrated
     */
    mpaaRating: string;
    /**
     * The video's TV Parental Guidelines (TVPG) rating.
     * Valid values for this property are:
     * - `tvpgG`: TV-G
     * - `tvpgMa`: TV-MA
     * - `tvpgPg`: TV-PG
     * - `tvpgUnrated`: Unrated
     * - `tvpgY`: TV-Y
     * - `tvpgY7`: TV-Y7
     * - `tvpgY7Fv`: TV-Y7-FV
     * - `pg14`: TV-14
     */
    tvpgRating: string;
    /**
     * - A rating that YouTube uses to identify age-restricted content
     */
    ytRating: string;
};
type YouTubeVideoStatus = {
    /**
     * Contains information about the video's uploading, processing, and privacy statuses.
     * Valid values for this property are:
     * - `deleted`
     * - `failed`
     * - `processed`
     * - `rejected`
     * - `uploaded`
     */
    uploadStatus: string;
    /**
     * The reason why a video failed to upload.
     * Valid values for this property are:
     * - `codec`
     * - `conversion`
     * - `emptyFile`
     * - `invalidFile`
     * - `tooSmall`
     * - `uploadAborted`
     */
    failureReason?: string | undefined;
    /**
     * The reason why YouTube rejected an uploaded video.
     * Valid values for this property are:
     * - `claim`
     * - `copyright`
     * - `duplicate`
     * - `inappropriate`
     * - `legal`
     * - `length`
     * - `termsOfUse`
     * - `trademark`
     * - `uploaderAccountClosed`
     * - `uploaderAccountSuspended`
     */
    rejectionReason?: string | undefined;
    /**
     * The video's privacy status.
     * Valid values for this property are:
     * - `private`
     * - `public`
     * - `unlisted`
     */
    privacyStatus?: string | undefined;
    /**
     * - The date and time when the video is scheduled to publish
     */
    publishAt: string;
    /**
     * The video's license.
     * Valid values for this property are:
     * - `creativeCommon`
     * - `youtube`
     */
    license: string;
    /**
     * - Whether the video can be embedded on another website
     */
    embeddable: boolean;
    /**
     * - Whether the extended video statistics on the video's watch page are publicly viewable
     */
    publicStatsViewable: boolean;
    /**
     * - Whether the video is designated as child-directed, and it contains the current "made for kids" status of the video
     */
    madeForKids: boolean;
    /**
     * - In a videos.insert or videos.update request, this property allows the channel owner to designate the video as being child-directed. In a videos.list request, the property value is only returned if the channel owner authorized the API request.
     */
    selfDeclaredMadeForKids?: boolean | undefined;
};
type YouTubeVideoProcessingDetails = {
    /**
     * The video's processing status. This value indicates whether YouTube was able to process the video or if the video is still being processed.
     * Valid values for this property are:
     * - `failed`: Video processing has failed. See `ProcessingFailureReason`.
     * - `youtube`: Video is currently being processed. See `ProcessingProgress`.
     * - `succeeded`: Video has been successfully processed
     * - `terminated`: Processing information is no longer available
     */
    processingStatus: string;
    processingProgress: YouTubeVideoProcessingDetailsProcessingProgress;
    /**
     * The video's processing status. This value indicates whether YouTube was able to process the video or if the video is still being processed.
     * Valid values for this property are:
     * - `other`: Some other processing component has failed
     * - `streamingFailed`: Video could not be sent to streamers
     * - `transcodeFailed`: Content transcoding has failed
     * - `uploadFailed`: File delivery has failed
     */
    processingFailureReason: string;
    fileDetailsAvailability: string;
    processingIssuesAvailability: string;
    tagSuggestionsAvailability: string;
    editorSuggestionsAvailability: string;
    thumbnailsAvailability: string;
};
type YouTubeVideoSuggestions = {
    /**
     * The video's processing status. This value indicates whether YouTube was able to process the video or if the video is still being processed.
     * Valid values for this property are:
     * - `archiveFile`: An archive file (e.g., a ZIP archive)
     * - `audioFile`: File contains audio only (e.g., an MP3 file)
     * - `docFile`: Document or text file (e.g., MS Word document)
     * - `imageFile`: Image file (e.g., a JPEG image)
     * - `notAVideoFile`: Other non-video file
     * - `projectFile`: Movie project file (e.g., Microsoft Windows Movie Maker project)
     */
    processingErrors: string[];
    /**
     * A list of reasons why YouTube may have difficulty transcoding the uploaded video or that might result in an erroneous transcoding. These warnings are generated before YouTube actually processes the uploaded video file. In addition, they identify issues that do not necessarily indicate that video processing will fail but that still might cause problems such as sync issues, video artifacts, or a missing audio track.
     * Valid values for this property are:
     * - `hasEditlist`: Edit lists are not currently supported
     * - `inconsistentResolution`: Conflicting container and stream resolutions
     * - `problematicAudioCodec`: Audio codec that is known to cause problems was used
     * - `problematicVideoCodec`: Video codec that is known to cause problems was used
     * - `unknownAudioCodec`: Unrecognized audio codec, transcoding is likely to fail
     * - `unknownContainer`: ognized file format, transcoding is likely to fail
     * - `unknownVideoCodec`: Unrecognized video codec, transcoding is likely to fail
     */
    processingWarnings: string[];
    /**
     * A list of suggestions that may improve YouTube's ability to process the video.
     * Valid values for this property are:
     * - `nonStreamableMov `: The MP4 file is not streamable, this will slow down the processing
     * - `sendBestQualityVideo `: Probably a better quality version of the video exists
     */
    processingHints: string[];
    tagSuggestions: YouTubeVideoSuggestionsTags[];
    /**
     * A list of video editing operations that might improve the video quality or playback experience of the uploaded video.
     * Valid values for this property are:
     * - `audioQuietAudioSwap`: The audio track appears silent and could be swapped with a better quality one
     * - `videoAutoLevels`: Picture brightness levels seem off and could be corrected
     * - `videoCrop`: Margins (mattes) detected around the picture could be cropped
     * - `videoStabilize`: The video appears shaky and could be stabilized
     */
    editorSuggestions: string[];
};
type YouTubeVideoSuggestionsTags = {
    tag: string;
    categoryRestricts: string[];
};
type YouTubeVideoProcessingDetailsProcessingProgress = {
    partsTotal: number;
    partsProcessed: number;
    timeLeftMs: number;
    commentCount: number;
};
type YouTubeVideoStatistics = {
    viewCount: number;
    likeCount: number;
    dislikeCount?: number | undefined;
    commentCount: number;
};
type YouTubeVideoPlayer = {
    embedHtml: string;
    embedHeight: number;
    embedWidth: number;
};
type YouTubeVideoTopicDetails = {
    /**
     * - A list of Wikipedia URLs that provide a high-level description of the video's content
     */
    topicCategories: string[];
};
type YouTubeVideoRecordingDetails = {
    /**
     * - The date and time when the video was recorded
     */
    recordingDate: string;
};
type YouTubeVideoFileDetails = {
    fileName: string;
    fileSize: number;
    /**
     * The uploaded file's type as detected by YouTube's video processing engine.
     * Valid values for this property are:
     * - `archive`: The file is an archive file, such as a .zip archive
     * - `audio`: The file is a known audio file type, such as an .mp3 file
     * - `document`: The file is a document or text file, such as a MS Word document
     * - `image`: The file is an image file, such as a .jpeg image
     * - `other`: The file is another non-video file type
     * - `project`: The file is a video project file, such as a Microsoft Windows Movie Maker project, that does not contain actual video data
     * - `video`: The file is a known video file type, such as an .mp4 file
     */
    fileType: string;
    container: string;
    videoStreams: YouTubeVideoStreams[];
    audioStreams: YouTubeAudioStreams[];
    durationMs: YouTubeContentRatings;
    bitrateBps: string;
    creationTime: string;
};
type YouTubeVideoStreams = {
    widthPixels: number;
    heightPixels: number;
    frameRateFps: number;
    aspectRatio: number;
    codec: string;
    bitrateBps: number;
    /**
     * The uploaded file's type as detected by YouTube's video processing engine.
     * Valid values for this property are:
     * - `clockwise`: The video needs to be rotated 90 degrees clockwise
     * - `counterClockwise `: The video needs to be rotated 90 degrees counter-clockwise
     * - `none `: The video does not need to be rotated
     * - `other `: The video needs to be rotated in some other, non-trivial way
     * - `upsideDown `: The video needs to be rotated upside down
     */
    rotation: string;
    vendor: string;
};
type YouTubeVideoLiveStreamingDetails = {
    actualStartTime?: string | undefined;
    actualEndTime?: string | undefined;
    scheduledStartTime: string;
    scheduledEndTime?: string | undefined;
    concurrentViewers?: number | undefined;
    activeLiveChatId?: string | undefined;
};
type YouTubeAudioStreams = {
    channelCount: number;
    codec: string;
    bitrateBps: number;
    vendor: string;
};
type YouTubeRegionRestriction = {
    allowed: string[];
    blocked: string[];
};
type YouTubeThumbnails = {
    /**
     * - 120x90 for playlist item or search result, 88x88 for a channel
     */
    default?: string | undefined;
    /**
     * - 320x180 for playlist item or search result, 240x240 for a channel
     */
    medium?: string | undefined;
    /**
     * - 480x360 for playlist item or search result, 800x800 for a channel
     */
    high?: string | undefined;
    /**
     * - 640x480 for playlist item or search result
     */
    standard?: string | undefined;
    /**
     * - 1280x720 for playlist item or search result
     */
    maxres?: string | undefined;
};
//# sourceMappingURL=types.d.ts.map