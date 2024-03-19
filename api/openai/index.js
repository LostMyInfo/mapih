/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { handler } = require('../resources/handlers');

/**
 * @file All OpenAI API endpoints relating to Chat Completions
 * @module openai
 */

module.exports = {

  /**
   * @namespace chat
   */
  
  chat: {

    /**
     * @summary
     * ### [Create Chat Completion]{@link https://platform.openai.com/docs/api-reference/chat/create}
     * 
     * @example
     * await api.openai.chat.create({
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
     * @memberof module:openai.chat#
     * @param {Object} options
     * @param {string} options.model
     * @param {ChatCompletionMessage[]} options.messages
     * @param {?number} [options.max_tokens]
     * @param {?number} [options.temperature]
     * @param {?number} [options.top_p]
     * @param {?number} [options.frequency_penalty]
     * @param {?number} [options.presence_penalty]
     * @param {?number} [options.n]
     * @param {string} [options.response_format]
     * @param {?number} [options.seed]
     * @param {?(string|string[])} [options.stop]
     * @param {Object} [options.logit_bias]
     * @param {?boolean} [options.logprobs]
     * @param {?number} [options.top_logprobs]
     * @param {?boolean} [options.stream]
     * @param {ToolCalls[]} [options.tools]
     * @param {string|{type: string, function: { name: string }}} [options.tool_choice]
     * @param {string} [options.user]
     * @param {{type: string}} [response_format]
     * @returns {Promise<ChatCompletion>}
     */
    create: async (options, response_format) => {
      if (options.response_format) {
        response_format = { type: options.response_format };
        delete options.response_format;
      }
    
      return handler({
        method: 'POST',
        endpoint: 'chat/completions',
        body: {
          response_format,
          ...options
        },
        handler: 'openai'
      });
    }
  },

  /**
   * @namespace images
   */

  images: {

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
     * @memberof module:openai.images#
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
  },

  /**
   * @namespace speech
   */

  speech: {

    /**
     * @summary
     * ### [Create Speech]{@link https://platform.openai.com/docs/api-reference/audio/createSpeech}
     * 
     * @example
     * await api.openai.speech.create({
     *   model: 'tts-1-hd',
     *   input: 'hello this is a test',
     *   voice: 'alloy'
     * });
     * 
     * @function create
     * @memberof module:openai.speech#
     * @param {Object} options
     * @param {string} options.model - One of the available TTS models: `tts-1` or `tts-1-hd`
     * @param {string} options.input - The text to generate audio for. The maximum length is 4096 characters.
     * @param {string} options.voice
     * - The voice to use when generating the audio.
     * - Supported voices are `alloy`, `echo`, `fable`, `onyx`, `nova`, and `shimmer`.
     * @param {string} [options.response_format]
     * - The format to audio in (default mp3).
     * - Supported formats are `mp3`, `opus`, `aac`, and `flac`.
     * @param {number} [options.speed]
     * - The speed of the generated audio.
     * - Select a value from `0.25` to `4.0`. `1.0` is the default.
     * @returns {Promise<string>}
     */
    create: async (options) =>
      handler({
        method: 'POST',
        endpoint: 'audio/speech',
        body: {
          model: options.model ?? 'tts-1',
          input: options.input,
          voice: options.voice ?? 'alloy',
          speed: options.speed ?? 1,
          response_format: options.response_format ?? 'mp3'
        },
        handler: 'openai'
      })
  },

  /**
   * @namespace embeddings
   */

  embeddings: {

    /**
     * @summary
     * ### [Create Embeddings]{@link https://platform.openai.com/docs/api-reference/embeddings/create}
     * 
     * @example
     * await api.openai.embeddings.create({
     *   model: 'text-embedding-3-small',
     *   input: 'A string of text',
     *   encoding_format: 'float'
     * });
     * 
     * @function create
     * @memberof module:openai.embeddings#
     * @param {Object} options
     * @param {string} options.model
     * @param {string|string[]|number[]} options.input
     * @param {string} [options.encoding_format] - The format to return the embeddings in. Can be either `float` or `base64`.
     * @param {number} [options.dimensions] - The number of dimensions the resulting output embeddings should have
     * @param {string} [options.user] - A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse
     * @returns {Promise<OpenAIEmbeddingResponse>}
     */
    create: async (options) =>
      handler({
        method: 'POST',
        endpoint: 'embeddings',
        body: {
          model: options.model ?? 'text-embedding-3-small',
          input: options.input,
          encoding_format: options.encoding_format,
          dimensions: options.dimensions,
          user: options.user
        },
        handler: 'openai'
      })
  }
};