/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { handler } = require('../resources/handlers');

/**
 * @file All Anthropic API endpoints relating to Chat Completions
 * @module anthropic
 */

module.exports = {

  /**
   * @namespace messages
   */

  messages: {

    /**
     * @summary
     * ### [Create A Message]{@link https://docs.anthropic.com/claude/reference/messages_post}
     *
     * @example
     * await api.anthropic.messages.create({
     *   model: 'claude-3-opus-20240229',
     *   system: 'You are a witty chatbot',
     *   messages: [{
     *     role: 'user',
     *     content: 'This is a test!'
     *   }],
     *   max_tokens: 2048,
     *   temperature: 0.7
     * });
     *
     * @function create
     * @memberof module:anthropic.messages#
     * @param {Object} options
     * @param {string} options.model
     * @param {AnthropicMessageParam[]} options.messages
     * @param {string} [options.system]
     * @param {string[]} [options.stop_sequence]
     * @param {{user_id: ?string}} [options.metadata]
     * @param {number} options.max_tokens
     * @param {number} [options.temperature]
     * @param {number} [options.top_p]
     * @param {number} [options.top_k]
     * @param {boolean} [options.stream]
     * @param {AnthropicTool[]} [options.tools]
     * @param {AnthropicToolChoiceOption} [options.tool_choice]
     * @returns {Promise<AnthropicMessage>}
     */
    create: async (options) =>

      handler({
        method: 'POST',
        endpoint: 'messages',
        body: { ...options },
        handler: 'anthropic'
      })

  }
};
