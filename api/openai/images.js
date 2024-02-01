/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { handler } = require('../resources/handlers');

/**
 * @file All OpenAI API endpoints relating to Images
 * @module images
 */

module.exports = {

  /**
   * @summary
   * ### [Create Chat Completion]{@link https://platform.openai.com/docs/api-reference/chat/create}
   * 
   * @example
   * await api.openai.images.create({
   *   model: 'gpt-4',
   *   messages: [
   *     {
   *       role: 'user',
   *       content: 'This is a test!'
   *     }
   *   ],
   *   max_tokens: 2048,
   *   temperature: 0.7
   * });
   * 
   * @function create
   * @memberof module:images#
   * @param {Object} options
   * @param {string} options.prompt
   * - A text description of the desired image(s).  
   * - The maximum length is 1000 characters for `dall-e-2` and 4000 characters for `dall-e-3`.
   * @param {string} [options.model] - The model to use for image generation (default `dall-e-2`)
   * @param {string} [options.quality]
   * - The quality of the image that will be generated (default `standard`).  
   * - `hd` creates images with finer details and greater consistency across the image.  
   * - This param is only supported for `dall-e-3`.
   * @param {?number} [options.n]
   * - The number (1-10) of images to generate (default 1).  
   * - For `dall-e-3`, only `n=1` is supported.
   * @param {string} [options.response_format] - The format in which the generated images are returned. Must be one of `url` or `b64_json` (default url).
   * @param {?string} [options.size]
   * - The size of the generated images (defaults to `1024x1024`).
   * - `dalle-e-2`: `256x256`, `512x512`, `1024x1024`
   * - `dalle-e-3`: `1024x1024`, `1792x1024`, `1024x1792`
   * @param {?string} [options.style]
   * - The style of the generated images (default `vivid`).
   * - Must be one of `vivid` or `natural`.
   * - `Vivid` causes the model to lean towards generating hyper-real and dramatic images.
   * - `Natural` causes the model to produce more natural, less hyper-real looking images.
   * - This param is only supported for `dall-e-3`.
   * @param {string} [options.user] - A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse
   * @returns {Promise<OpenAIImageResponse>}
   */
  create: async (options) => {
    const { performance } = require('perf_hooks');
    const start = performance.now();
    const image = await handler({
      method: 'POST',
      endpoint: 'images/generations',
      body: options,
      handler: 'openai'
    });
    
    return {
      generation_time: Number(((performance.now() - start) / 1000).toFixed(2)),
      ...image
    };

  }
};