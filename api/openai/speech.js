/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { handler } = require('../resources/handlers');

/**
 * @file All OpenAI API endpoints relating to Speech
 * @module speech
 */

module.exports = {

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
   * @memberof module:speech#
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
};