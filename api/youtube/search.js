/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString, removeFalsyFromObject } = require('../resources/functions');
// const { buildTrackList, buildAlbums, buildArtists } = require('./functions');
const { handler } = require('../resources/handlers');
const { buildSearchReturn, validateOptions } = require('./resources/functions');

/**
 * @file Search for items on Youtube
 * @module search
 */

module.exports = {

  /**
   * @summary
   * ### [Search For Items On YouTube]{@link https://developers.google.com/youtube/v3/docs/search/list}
   * 
   * @example
   * await api.youtube.search('search term')
   * 
   * @example
   * await api.youtube.search('search term', {
   *   limit: 5,
   *   safe_search: 'none'
   * })
   * 
   * @function search
   * @memberof module:search#
   * @param {string} query
   * @param {Object} [options]
   * @param {string[]} [options.type] - Accepted values are `video`, `playlist`, and `channel`. Can use more than one. (default video, playlist, and channel)
   * @param {number} [options.limit]
   * @param {string} [options.safe_search]
   * Accepted values are:
   * - `moderate` (default): YouTube will filter some content from search results and, at the least, will filter content that is restricted in your locale.
   * - `strict`: YouTube will try to exclude all restricted content from the search result set.
   * - `none`: YouTube will not filter the search result set
   * @param {string} [options.sort] - Accepted values are `date`, `rating`, `relevance`, `title`, `videoCount`, `viewCount` (default `relevance`)
   * @param {string} [options.channelId] - Only contain resources created by the channel
   * @param {string} [options.channelType]
   * Accepted values are:
   * - `any`: Return all channels
   * - `show`: Only retrieve shows
   * @param {string} [options.eventType] (`type` must be `video`)  
   * Accepted values are:
   * - `completed`: Only include completed broadcasts
   * - `live`: Only include active broadcasts
   * - `upcoming`: Only include upcoming broadcasts
   * @param {string} [options.location] - A string that specifies latitude/longitude coordinates e.g. (37.42307,-122.08427).
   * @param {string} [options.locationRadius] - A floating point number followed by a measurement unit. Valid measurement units are `m`, `km`, `ft`, and `mi`.
   * @param {string} [options.pageToken] - Identifies a specific page in the result set that should be returned
   * @param {string} [options.publishedAfter] - Indicates that the API response should only contain resources created at or after the specified time. The value is an RFC 3339 formatted date-time value (1970-01-01T00:00:00Z).
   * @param {string} [options.publishedBefore] - Indicates that the API response should only contain resources created before or at the specified time. The value is an RFC 3339 formatted date-time value (1970-01-01T00:00:00Z).
   * @param {string} [options.regionCode] - Restricts results to videos that can be views in the specified country. [ISO 3166-1 alpha-2]{@link http://www.iso.org/iso/country_codes/iso_3166_code_lists/country_names_and_code_elements.htm} country code.
   * @param {string} [options.relevanceLanguage] - return search results that are most relevant to the specified language. [ISO 639-1 two-letter language code]{@link http://www.loc.gov/standards/iso639-2/php/code_list.php}
   * @param {string} [options.topicId] - )nly contain resources associated with the specified topic. The value identifies a Freebase topic ID.
   * @param {string} [options.videoCaption]
   * Accepted values are:
   * - `any` (default): Do not filter results based on caption availability
   * - `closedCaption `: Only include videos that have captions
   * - `none`: Only include videos that do not have captions
   * @param {string} [options.videoCategoryId] - Filters video search results based on their category. `type` must be `video`
   * @param {string} [options.videoDefinition]
   * Accepted values are:
   * - `any` (default): Return all videos, regardless of their resolution
   * - `high`: Only retrieve HD videos
   * - `standard`: Only retrieve videos in standard definition
   * @param {string} [options.videoDimension]
   * Accepted values are:
   * - `any` (default): Include both 3D and non-3D videos in returned results
   * - `2d`: Restrict search results to exclude 3D videos
   * - `3d`: Restrict search results to only include 3D videos
   * @param {string} [options.videoDuration]
   * Accepted values are:
   * - `any` (default): Do not filter video search results based on their duration
   * - `short`: Only include videos that are less than four minutes long
   * - `medium`: Only include videos that are between four and 20 minutes long (inclusive)
   * - `long`: Only include videos longer than 20 minutes
   * @param {string} [options.videoEmbeddable]
   * Accepted values are:
   * - `any` (default): Return all videos, embeddable or not
   * - `true`: Only retrieve embeddable videos
   * @param {string} [options.videoLicense]
   * Accepted values are:
   * - `any` (default): Return all videos, regardless of which license they have, that match the query parameters
   * - `creativeCommon`: Only return videos that have a Creative Commons license
   * - `youtube`: Only return videos that have the standard YouTube license
   * @param {string} [options.videoPaidProductPlacement]
   * Accepted values are:
   * - `any` (default): Return all videos, regardless of whether they contain paid promotions
   * - `true`: Only retrieve videos with paid promotions
   * @param {string} [options.videoSyndicated]
   * Accepted values are:
   * - `any` (default): Return all videos, syndicated or not
   * - `true`: Only retrieve syndicated videos
   * @param {string} [options.videoType]
   * Accepted values are:
   * - `any` (default): Return all videos
   * - `episode`: Only retrieve episodes of shows
   * - `movie`: Only retrieve movies
   * @returns {Promise<YouTubeSearchReturn|undefined>}
   */
  search: async (query, options) => {
    validateOptions(options);

    const result = await handler({
      method: 'GET',
      endpoint: buildQueryString('null', {
        part: 'snippet',
        q: query,
        type: options?.type?.join(','),
        maxResults: options?.limit,
        order: options?.sort,
        safeSearch: options?.safe_search,
        ...options
      }),
      handler: 'youtube',
      googleEndpoint: 'search'
    });

    return buildSearchReturn(result);
  }
};