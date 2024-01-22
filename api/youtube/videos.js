/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { ResponseError } = require('../resources/Errors');
const { buildQueryString, removeFalsyFromObject } = require('../resources/functions');
// const { buildTrackList, buildAlbums, buildArtists } = require('./functions');
const { handler } = require('../resources/handlers');
const { buildVideoReturn, validateOptions } = require('./resources/functions');

/**
 * @file All YouTube endpoints related to videos
 * @module searvideosch
 */

module.exports = {

  /**
   * @summary
   * ### [Retrieve One or More Videos]{@link https://developers.google.com/youtube/v3/docs/videos/list}
   * Returns a list of videos that match the API request parameters  
   * 
   * @example
   * await api.youtube.videos.retrieve(['videoId]);
   * 
   * @example
   * await api.youtube.videos.retrieve(['videoId'], {
   *   limit: 5,
   *   include: ['contentDetails']
   * });
   * 
   * @function retrieve
   * @memberof module:videos#
   * @param {string|string[]} id
   * @param {Object} [options]
   * @param {string} [options.chart] - Identifies the chart that you want to retrieve  
   * Accepted values are:
   * - `mostPopular`: Return the most popular videos for the specified content region and video category
   * @param {string[]} [options.include] - 
   * @param {number} [options.limit]
   * @param {string} [options.myRating] - Set this parameter's value to like or dislike to instruct the API to only return videos liked or disliked by the authenticated user.  
   * Accepted values are:
   * - `dislike`: Returns only videos disliked by the authenticated user
   * - `like`: Returns only video liked by the authenticated user
   * @param {number} [options.maxHeight] - Specifies the maximum height of the embedded player returned in the player.embedHtml property.
   * @param {number} [options.maxWidth] - Specifies the maximum width of the embedded player returned in the player.embedHtml property.
   * @param {string} [options.onBehalfOfContentOwner] - Indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value
   * @param {string} [options.pageToken] - Identifies a specific page in the result set that should be returned
   * @param {string} [options.videoCategoryId] - Filters video search results based on their category. `type` must be `video`
   * @returns {Promise<YouTubeVideoReturn|undefined>}
   */
  retrieve: async (id, options) => {
    validateOptions(options);

    const result = await handler({
      method: 'GET',
      endpoint: buildQueryString('null', {
        part: 'snippet,' + (options?.include ? options.include.join(',') : ''),
        id: typeof id === 'string' ? id : id?.join(','),
        maxResults: options?.limit,
        ...options
      }),
      handler: 'youtube',
      googleEndpoint: 'videos',
      oauth: true
    });

    if (result && !result.items?.length)
      throw new ResponseError(null, null, 'youtube_error', { error: 'Video(s) not found' });

    return buildVideoReturn(result);
  }
};