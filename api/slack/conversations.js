// @ts-check
const { slackHandler } = require('../resources/functions');

/**
 * @file All Slack API endpoints relating to conversations (channels)
 * @module conversations
 */

module.exports = {

  /**
   * @summary
   * ### [Initiates a public or private channel-based conversation]{@link https://api.slack.com/methods/conversations.create}
   * @example
   * await api.slack.conversations.create({
   *   name: 'mychannel',
   *   is_private: true
   * });
   * @memberof module:conversations#
   * @function create
   * @param {Object} params
   * @param {string} params.name - Name of the public or private channel to create
   * @param {boolean} [params.is_private] - Create a private channel instead of a public one
   * @param {string} [params.team_id] - Encoded team id to create the channel in, required if org token is used
   * @returns {Promise<SlackChannel>} A list of [Application Role Connection Metadata]{@link https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object} objects for the given application.
   */
  create: async (params) =>
    slackHandler({
      method: 'POST',
      endpoint: 'conversations.create',
      body: {
        name: params.name,
        is_private: params.is_private || false,
        team_id: params.team_id ?? undefined
      }
    })
  
};