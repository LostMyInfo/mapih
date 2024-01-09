// @ts-check
const { handler } = require('../resources/handlers');

/**
 * @file All Slack API endpoints relating to views
 * @module views
 */

module.exports = {

  /**
   * @summary
   * ### [Open A View For A User]{@link https://api.slack.com/methods/views.open}
   * 
   * @example
   * await api.slack.views.open({
   *   trigger_id: '123123.123123.sfasdf',
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
   * 
   * @memberof module:views#
   * @function open
   * @param {Object} params
   * @param {ModalView} params.view
   * @param {string} [params.trigger_id]
   * @param {(KnownBlock | SlackBlock)[]} [params.interactivity_pointer]
   * @returns {Promise<{ok: boolean, view: SlackView, response_metadata?: { messages: string[]}}>}
   */
  open: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'views.open',
      body: {
        view: typeof params.view === 'object'
          ? JSON.stringify(params.view)
          : params.view,
        trigger_id: params.trigger_id ?? undefined,
        interactivity_pointer: params.interactivity_pointer ?? undefined
      },
      handler: 'slack'
    }),
  
  /**
   * @summary
   * ### [Open A View For A User]{@link https://api.slack.com/methods/views.open}
   * 
   * @example
   * await api.slack.views.publish({
   *   user_id: '0000000000',
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
   * 
   * @memberof module:views#
   * @function publish
   * @param {Object} params
   * @param {ModalView} params.view
   * @param {string} [params.user_id]
   * @param {string} [params.hash] - A string that represents view state to protect against possible race conditions.
   * @returns {Promise<{ok: boolean, view: SlackView, response_metadata?: { messages: string[]}}>}
   */
  publish: async (params) =>
    handler({
      method: 'POST',
      endpoint: 'views.publish',
      body: {
        user_id: params.user_id,
        view: typeof params.view === 'object'
          ? JSON.stringify(params.view)
          : params.view,
        hash: params.hash ?? undefined
      },
      handler: 'slack'
    })
};

