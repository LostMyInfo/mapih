// @ts-check
const { removeFalsyFromObject } = require('../../resources/functions');

/**
 * @param {{[x: string]: any}|undefined} options - The options to validate.
 * @throws {Error} Throws an error if any restricted property has an invalid value.
 * @returns {boolean|undefined} Returns true if all restricted options are valid.
 */
function validateOptions(options) {
  if (!options) return;

  /**
   * @type {{[x: string]: string[]}}
   */
  const validValues = {
    type: ['video', 'channel', 'playlist'],
    sort: ['date', 'rating', 'relevance', 'title', 'videoCount', 'viewCount'],
    safe_search: ['none', 'moderate', 'strict'],
    videoCaption: ['any', 'none', 'closedCaption'],
    videoDefinition: ['any', 'high', 'standard'],
    videoDimension: ['2d', '3d', 'any'],
    videoDuration: ['any', 'short', 'medium', 'long']
    // more
  };

  for (const key in validValues) 
    if (options.hasOwnProperty(key))
      if (!validValues[key].includes(options[key]))
        throw new Error(`Invalid value for \`${key}\`: ${options[key]}\nMust be one of: \`${validValues[key].join('\`, \`')}\``);
  
  return true;
};

/**
 * @param {any} snippet 
 * @returns {YouTubeSnippet}
 */
function buildSnippet(snippet) {
  return removeFalsyFromObject({
    title: snippet.title,
    description: snippet.description,
    tags: snippet.tags,
    categoryId: snippet.categoryId,
    channelId: snippet.channelId,
    channelTitle: snippet.channelTitle,
    publishTime: snippet.publishTime,
    publishedAt: snippet.publishedAt,
    liveBroadcastContent: snippet.liveBroadcastContent,
    thumbnails: buildThumbnails(snippet.thumbnails)
  });
}

/**
 * @param {any} payload 
 * @param {YouTubeSnippet[]} videos 
 * @param {YouTubeSnippet[]} channels 
 * @param {YouTubeSnippet[]} playlists 
 * @returns {YouTubeSearchReturn|undefined}
 */
function buildSearchReturn(payload, videos = [], channels = [], playlists = []) {
  // console.log(payload);
  if (!payload || !payload.items?.length) return;
  for (const item of payload.items) {
    const type = item.id.kind.split('#')[1];
    eval(`${type}s`).push(removeFalsyFromObject({
      etag: item.etag,
      videoId: item.id.videoId,
      channelId: item.id.channelId || item.snippet.channelId,
      playlistId: item.id.playlistId,
      ... buildSnippet(item.snippet)
    }));
  }
  // console.log('videos', videos);
  return removeFalsyFromObject({
    total: payload.pageInfo.totalResults,
    limit: payload.pageInfo.resultsPerPage,
    videos: videos.length ? videos : undefined,
    channels: channels.length ? channels : undefined,
    playlists: playlists.length ? playlists : undefined
  });
}

/**
 * 
 * @param {any} payload 
 * @param {(YouTubeSnippet & { contentDetails?: YouTubeContentDetails, fileDetails?: YouTubeVideoFileDetails, statistics?: YouTubeVideoStatistics, status?: YouTubeVideoStatus, processingDetails?: YouTubeVideoProcessingDetails, recordingDetails?: YouTubeVideoRecordingDetails, player?: YouTubeVideoPlayer, suggestions?: YouTubeVideoSuggestions, liveStreamingDetails?: YouTubeVideoLiveStreamingDetails, topicDetails?: YouTubeVideoTopicDetails })[]} videos 
 * @returns {YouTubeVideoReturn|undefined}
 */
function buildVideoReturn(payload, videos = []) {
  if (!payload || !payload.items?.length) return;
  for (const item of payload.items) {
    videos.push(removeFalsyFromObject({
      etag: item.etag,
      videoId: item.id.videoId ?? item.id,
      channelId: item.id?.channelId,
      ...buildSnippet(item.snippet),
      contentDetails: item.contentDetails,
      fileDetails: item.fileDetails,
      statistics: item.statistics,
      status: item.status,
      processingDetails: item.processingDetails,
      recordingDetails: item.recordingDetails,
      player: item.player,
      suggestions: item.suggestions,
      liveStreamingDetails: item.liveStreamingDetails,
      topicDetails: item.topicDetails
    }));
  }
  // console.log('videos', videos);
  return removeFalsyFromObject({
    total: payload.pageInfo.totalResults,
    limit: payload.pageInfo.resultsPerPage,
    videos: videos.length ? videos : undefined
  });
}

/**
 * @param {{[x: string]: { url: string, height: number, width: number }}} thumbnails 
 * @returns {YouTubeThumbnails}
 */
function buildThumbnails(thumbnails) {
  return Object.entries(thumbnails).reduce((/** @type {{[x: string]: string}} */acc, [key, value]) => {
    acc[key] = value.url;
    return acc;
  }, {});
}

module.exports = { buildSearchReturn, buildVideoReturn, validateOptions };

/**
 * 
 * @param {string} fn 
 * @param {any} payload
 * @param {string} [color] 
 */
function log(fn, payload, color = 'red') {
  /** @type {{[x: string]: string}} */
  const colors = {
    orange: '\u001b[38;5;117;1m',
    red: '\u001b[38;5;196;1m'
  };

  const dashesBefore = Math.floor((90 - ` payload in ${fn}() `.length) / 2);
  const dashesAfter = Math.ceil((90 - ` payload in ${fn}() `.length) / 2);
  
  console.log(`\n${colors[color]}${'-'.repeat(90)}\n${'-'.repeat(dashesBefore)} payload in ${fn}() ${'-'.repeat(dashesAfter)}\n${'-'.repeat(90)}\u001b[0m\n`, payload);
  // console.log(`\n${colors[color]}${'-'.repeat(70)}\n${'-'.repeat(Math.floor(70 - `payload in ${fn}()`.length / 2))}${`payload in ${fn}()`}${'-'.repeat(Math.ceil(70 - `payload in ${fn}()`.length / 2))}\n${'-'.repeat(70)}${'\u001b[0m'}\n`);
}