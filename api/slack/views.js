// @ts-check
const { slackHandler } = require('../resources/functions');

/**
 * @file All Slack API endpoints relating to views
 * @module views
 */

module.exports = {

  /**
   * @summary
   * ### [Open A View For A User]{@link https://api.slack.com/methods/views.open}
   * @example
   * await api.slack.views.open({
   *   view: {
   *     type: 'modal',
   *     title: {
   *       type: 'plain_text',
   *       text: 'Modal title'
   *     },
   *     blocks: [{
   *       type: 'section',
   *       text: {
   *         type: 'mrkdwn',
   *         text: 'Block Kit... but _in a modal_'
   *       },
   *       block_id: 'section1',
   *       accessory: {
   *         type: 'button',
   *         text: {
   *           type: 'plain_text',
   *           text: 'Click me'
   *         },
   *         action_id: 'button_abc',
   *         value: 'Button value',
   *         style: 'danger'
   *       }
   *     }, {
   *       type: 'input',
   *       label: {
   *         type: 'plain_text',
   *         text: 'Input label'
   *       },
   *       element: {
   *         type: 'plain_text_input',
   *         placeholder: {
   *           type: 'plain_text',
   *           text: 'Type stuff here'
   *         },
   *         action_id: 'input1',
   *         multiline: 'false',
   *       },
   *       optional: 'false'
   *     }],
   *     close: {
   *       type: 'plain_text',
   *       text: 'Cancel'
   *     },
   *     submit: {
   *       type: 'plain_text',
   *       text: 'Save'
   *     },
   *     private_metadata: 'shhhhhh',
   *     callback_id: 'view_identifier_12'
   *   }
   * });
   * @memberof module:chat#
   * @function post
   * @param {Object} params
   * @param {string} params.channel
   * @param {string} [params.text]
   * @param {SlackBlock[]} [params.blocks]
   * @param {SlackAttachment[]} [params.attachments]
   * @param {string} [params.icon_emoji]
   * @param {string} [params.icon_url]
   * @param {boolean} [params.link_names]
   * @param {string} [params.metadata]
   * @param {boolean} [params.mrkdwn]
   * @param {string} [params.parse]
   * @param {boolean} [params.reply_broadcast]
   * @param {string} [params.thread_ts]
   * @param {boolean} [params.unfurl_links]
   * @param {boolean} [params.unfurl_media]
   * @param {string} [params.username]
   * @returns {Promise<SlackMessageResponse>} A list of [Application Role Connection Metadata]{@link https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object} objects for the given application.
   */
  open: async (params) =>
    slackHandler({
      method: 'POST',
      endpoint: 'views.open',
      body: {
        view: typeof params.view === 'object'
          ? JSON.stringify(params.view)
          : params.view,
        trigger_id: params.trigger_id ?? undefined,
        interactivity_pointer: params.interactivity_pointer ?? undefined
      }
    })
};

