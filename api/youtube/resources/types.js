// @ts-check

/**
 * @typedef {Object} YouTubeVideoReturn
 * @property {string} [channelId]
 * @property {string} [categoryId]
 * @property {string} [videoId]
 * @property {string} [playlistId]
 * @property {string} title
 * @property {string} description
 * @property {string} channelTitle
 * @property {string} publishTime
 * @property {string} publishedAt
 * @property {YouTubeThumbnails} thumbnails
 * @property {string} liveBroadcastContent
 * @property {string[]} [tags]
 * @property {YouTubeContentDetails} contentDetails
 * @property {YouTubeVideoStatus} status
 * @property {YouTubeVideoStatistics} statistics
 * @property {YouTubeVideoPlayer} player
 * @property {YouTubeVideoTopicDetails} topicDetails
 * @property {YouTubeVideoRecordingDetails} recordingDetails
 * @property {YouTubeVideoFileDetails} fileDetails
 * @property {YouTubeVideoProcessingDetails} processingDetails
 * @property {YouTubeVideoSuggestions} suggestions
 * @property {YouTubeVideoLiveStreamingDetails} liveStreamingDetails
 */

/**
 * @typedef {Object} YouTubeSearchReturn
 * @property {number} total
 * @property {number} limit
 * @property {YouTubeSearchSnippet[]} [videos]
 * @property {YouTubeSearchSnippet[]} [channels]
 * @property {YouTubeSearchSnippet[]} [playlists]
 */

/**
 * @typedef {Object} YouTubeSnippet
 * @property {string} [channelId]
 * @property {string} [categoryId]
 * @property {string} [videoId]
 * @property {string} [playlistId]
 * @property {string} title
 * @property {string} description
 * @property {string} channelTitle
 * @property {string} publishTime
 * @property {string} publishedAt
 * @property {YouTubeThumbnails} thumbnails
 * @property {string} liveBroadcastContent
 * @property {string[]} [tags]
 */

/**
 * @typedef {YouTubeSnippet & {
 *   videoId?: string,
 *   playlistId?: string
 * }} YouTubeSearchSnippet
 */

/**
 * @typedef {YouTubeSnippet & {
 *   tags: string[],
 *   categoryId?: string
 * }} YouTubeVideoSnippet
 */

/**
 * @typedef {Object} YouTubeContentDetails
 * @property {string} duration
 * @property {string} dimension
 * @property {string} definition
 * @property {string} caption
 * @property {boolean} licensedContent
 * @property {YouTubeRegionRestriction} regionRestriction
 * @property {YouTubeContentRatings} contentRating
 * @property {string} projection Specifies the projection format of the video.  
 * Valid values for this property are:
 * - `360`
 * - `rectangular`
 */

/**
 * @typedef {Object} YouTubeContentRatings
 * @property {string} mpaaRating The video's Motion Picture Association of America (MPAA) rating.  
 * Valid values for this property are:
 * - `mpaaG`: G
 * - `mpaaPg`: PG
 * - `mpaaPg13`: PG-13
 * - `mpaaNc17`: NC-17
 * - `mpaaR`: R
 * - `mpaaUnrated`: Unrated
 * @property {string} tvpgRating The video's TV Parental Guidelines (TVPG) rating.  
 * Valid values for this property are:
 * - `tvpgG`: TV-G
 * - `tvpgMa`: TV-MA
 * - `tvpgPg`: TV-PG
 * - `tvpgUnrated`: Unrated
 * - `tvpgY`: TV-Y
 * - `tvpgY7`: TV-Y7
 * - `tvpgY7Fv`: TV-Y7-FV
 * - `pg14`: TV-14
 * @property {string} ytRating - A rating that YouTube uses to identify age-restricted content
 */

/**
 * @typedef {Object} YouTubeVideoStatus
 * @property {string} uploadStatus Contains information about the video's uploading, processing, and privacy statuses.
 * Valid values for this property are:
 * - `deleted`
 * - `failed`
 * - `processed`
 * - `rejected`
 * - `uploaded`
 * @property {string} [failureReason] The reason why a video failed to upload.
 * Valid values for this property are:
 * - `codec`
 * - `conversion`
 * - `emptyFile`
 * - `invalidFile`
 * - `tooSmall`
 * - `uploadAborted`
 * @property {string} [rejectionReason] The reason why YouTube rejected an uploaded video.
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
 * @property {string} [privacyStatus] The video's privacy status.
 * Valid values for this property are:
 * - `private`
 * - `public`
 * - `unlisted`
 * @property {string} publishAt - The date and time when the video is scheduled to publish
 * @property {string} license The video's license.
 * Valid values for this property are:
 * - `creativeCommon`
 * - `youtube`
 * @property {boolean} embeddable - Whether the video can be embedded on another website
 * @property {boolean} publicStatsViewable - Whether the extended video statistics on the video's watch page are publicly viewable
 * @property {boolean} madeForKids - Whether the video is designated as child-directed, and it contains the current "made for kids" status of the video
 * @property {boolean} [selfDeclaredMadeForKids] - In a videos.insert or videos.update request, this property allows the channel owner to designate the video as being child-directed. In a videos.list request, the property value is only returned if the channel owner authorized the API request.
 */

/**
 * @typedef {Object} YouTubeVideoProcessingDetails
 * @property {string} processingStatus The video's processing status. This value indicates whether YouTube was able to process the video or if the video is still being processed.  
 * Valid values for this property are:
 * - `failed`: Video processing has failed. See `ProcessingFailureReason`.
 * - `youtube`: Video is currently being processed. See `ProcessingProgress`.
 * - `succeeded`: Video has been successfully processed
 * - `terminated`: Processing information is no longer available
 * @property {YouTubeVideoProcessingDetailsProcessingProgress} processingProgress
 * @property {string} processingFailureReason The video's processing status. This value indicates whether YouTube was able to process the video or if the video is still being processed.  
 * Valid values for this property are:
 * - `other`: Some other processing component has failed
 * - `streamingFailed`: Video could not be sent to streamers
 * - `transcodeFailed`: Content transcoding has failed
 * - `uploadFailed`: File delivery has failed
 * @property {string} fileDetailsAvailability
 * @property {string} processingIssuesAvailability
 * @property {string} tagSuggestionsAvailability
 * @property {string} editorSuggestionsAvailability
 * @property {string} thumbnailsAvailability
 */

/**
 * @typedef {Object} YouTubeVideoSuggestions
 * @property {string[]} processingErrors The video's processing status. This value indicates whether YouTube was able to process the video or if the video is still being processed.  
 * Valid values for this property are:
 * - `archiveFile`: An archive file (e.g., a ZIP archive)
 * - `audioFile`: File contains audio only (e.g., an MP3 file)
 * - `docFile`: Document or text file (e.g., MS Word document)
 * - `imageFile`: Image file (e.g., a JPEG image)
 * - `notAVideoFile`: Other non-video file
 * - `projectFile`: Movie project file (e.g., Microsoft Windows Movie Maker project)
 * @property {string[]} processingWarnings A list of reasons why YouTube may have difficulty transcoding the uploaded video or that might result in an erroneous transcoding. These warnings are generated before YouTube actually processes the uploaded video file. In addition, they identify issues that do not necessarily indicate that video processing will fail but that still might cause problems such as sync issues, video artifacts, or a missing audio track.  
 * Valid values for this property are:
 * - `hasEditlist`: Edit lists are not currently supported
 * - `inconsistentResolution`: Conflicting container and stream resolutions
 * - `problematicAudioCodec`: Audio codec that is known to cause problems was used
 * - `problematicVideoCodec`: Video codec that is known to cause problems was used
 * - `unknownAudioCodec`: Unrecognized audio codec, transcoding is likely to fail
 * - `unknownContainer`: ognized file format, transcoding is likely to fail
 * - `unknownVideoCodec`: Unrecognized video codec, transcoding is likely to fail
 * @property {string[]} processingHints A list of suggestions that may improve YouTube's ability to process the video.  
 * Valid values for this property are:
 * - `nonStreamableMov `: The MP4 file is not streamable, this will slow down the processing
 * - `sendBestQualityVideo `: Probably a better quality version of the video exists
 * @property {YouTubeVideoSuggestionsTags[]} tagSuggestions
 * @property {string[]} editorSuggestions A list of video editing operations that might improve the video quality or playback experience of the uploaded video.  
 * Valid values for this property are:
 * - `audioQuietAudioSwap`: The audio track appears silent and could be swapped with a better quality one
 * - `videoAutoLevels`: Picture brightness levels seem off and could be corrected
 * - `videoCrop`: Margins (mattes) detected around the picture could be cropped
 * - `videoStabilize`: The video appears shaky and could be stabilized
 */

/**
 * @typedef {Object} YouTubeVideoSuggestionsTags
 * @property {string} tag
 * @property {string[]} categoryRestricts
 */
/**
 * @typedef {Object} YouTubeVideoProcessingDetailsProcessingProgress
 * @property {number} partsTotal
 * @property {number} partsProcessed
 * @property {number} timeLeftMs
 * @property {number} commentCount
 */

/**
 * @typedef {Object} YouTubeVideoStatistics
 * @property {number} viewCount
 * @property {number} likeCount
 * @property {number} [dislikeCount]
 * @property {number} commentCount
 */

/**
 * @typedef {Object} YouTubeVideoPlayer
 * @property {string} embedHtml
 * @property {number} embedHeight
 * @property {number} embedWidth
 */

/**
 * @typedef {Object} YouTubeVideoTopicDetails
 * @property {string[]} topicCategories - A list of Wikipedia URLs that provide a high-level description of the video's content
 */

/**
 * @typedef {Object} YouTubeVideoRecordingDetails
 * @property {string} recordingDate - The date and time when the video was recorded
 */

/**
 * @typedef {Object} YouTubeVideoFileDetails
 * @property {string} fileName
 * @property {number} fileSize
 * @property {string} fileType The uploaded file's type as detected by YouTube's video processing engine.   
 * Valid values for this property are:
 * - `archive`: The file is an archive file, such as a .zip archive
 * - `audio`: The file is a known audio file type, such as an .mp3 file
 * - `document`: The file is a document or text file, such as a MS Word document
 * - `image`: The file is an image file, such as a .jpeg image
 * - `other`: The file is another non-video file type
 * - `project`: The file is a video project file, such as a Microsoft Windows Movie Maker project, that does not contain actual video data
 * - `video`: The file is a known video file type, such as an .mp4 file
 * @property {string} container
 * @property {YouTubeVideoStreams[]} videoStreams
 * @property {YouTubeAudioStreams[]} audioStreams
 * @property {YouTubeContentRatings} durationMs
 * @property {string} bitrateBps
 * @property {string} creationTime
 */

/**
 * @typedef {Object} YouTubeVideoStreams
 * @property {number} widthPixels
 * @property {number} heightPixels
 * @property {number} frameRateFps
 * @property {number} aspectRatio
 * @property {string} codec
 * @property {number} bitrateBps
 * @property {string} rotation The uploaded file's type as detected by YouTube's video processing engine.   
 * Valid values for this property are:
 * - `clockwise`: The video needs to be rotated 90 degrees clockwise
 * - `counterClockwise `: The video needs to be rotated 90 degrees counter-clockwise
 * - `none `: The video does not need to be rotated
 * - `other `: The video needs to be rotated in some other, non-trivial way
 * - `upsideDown `: The video needs to be rotated upside down
 * @property {string} vendor
 */

/**
 * @typedef {Object} YouTubeVideoLiveStreamingDetails
 * @property {string} [actualStartTime]
 * @property {string} [actualEndTime]
 * @property {string} scheduledStartTime
 * @property {string} [scheduledEndTime]
 * @property {number} [concurrentViewers]
 * @property {string} [activeLiveChatId]
 */

/**
 * @typedef {Object} YouTubeAudioStreams
 * @property {number} channelCount
 * @property {string} codec
 * @property {number} bitrateBps
 * @property {string} vendor
 */

/**
 * @typedef {Object} YouTubeRegionRestriction
 * @property {string[]} allowed
 * @property {string[]} blocked
 */

/**
 * @typedef {Object} YouTubeThumbnails
 * @property {string} [default] - 120x90 for playlist item or search result, 88x88 for a channel
 * @property {string} [medium] - 320x180 for playlist item or search result, 240x240 for a channel
 * @property {string} [high] - 480x360 for playlist item or search result, 800x800 for a channel
 * @property {string} [standard] - 640x480 for playlist item or search result
 * @property {string} [maxres] - 1280x720 for playlist item or search result
 */

