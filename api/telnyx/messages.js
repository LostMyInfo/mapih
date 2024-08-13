/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { handler } = require('../resources/handlers');
/**
 * @file All Telnyx API endpoints relating to messages
 * @module messages
 */
module.exports = {

  /**
   * @summary
   * ### [Send A Message]{@link https://developers.telnyx.com/api/messaging/send-message}
   *
   * @example
   * await api.telnyx.messages.send({
   *   from: '+15555555555',
   *   to: '+15555555555',
   *   text: 'Hello, world!'
   * });
   *
   * @function send
   * @memberof module:messages#
   * @param {Object} body
   * @param {string} body.to - Receiving address (+E.164 formatted phone number or short code).
   * @param {boolean} [body.from] - Sending address (+E.164 formatted phone number, alphanumeric sender ID, or short code). Required if sending with a phone number, short code, or alphanumeric sender ID.
   * @param {string} [body.messaging_profile_id] - Unique identifier for a messaging profile. Required if sending via number pool or with an alphanumeric sender ID.
   * @param {boolean} [body.text] - Message body (i.e., content) as a non-empty string. Required for SMS.
   * @param {string} [body.subject] - Subject of multimedia message
   * @param {string[]} [body.media_urls] - A list of media URLs. The total media size must be less than 1 MB. Required for MMS.
   * @param {string} [body.webhook_url] - The URL where webhooks related to this message will be sent.
   * @param {string} [body.webhook_failover_url] - The failover URL where webhooks related to this message will be sent if sending to the primary URL fails.
   * @param {boolean} [body.use_profile_webhooks] - If the profile this number is associated with has webhooks, use them for delivery notifications. If webhooks are also specified on the message itself, they will be attempted first, then those on the profile. (default true)
   * @param {string} [body.type] - The protocol for sending the message, either SMS or MMS.
   * @param {boolean} [body.auto_detect] - A string that will be included in the delivery receipt.
   * @returns {Promise<TelnyxMessage>}
   */
  send: async (body) => {

    return (await handler({
      method: 'POST',
      endpoint: 'messages',
      body,
      handler: 'telnyx'
    }))?.data;
  }
};
