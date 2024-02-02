/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { handler } = require('../resources/handlers');

/**
 * @file All OpenAI API endpoints relating to Chat Completions
 * @module chat
 */

module.exports = {

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
   * @memberof module:chat#
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
      body: { response_format, ...options },
      handler: 'openai'
    });
  }
};