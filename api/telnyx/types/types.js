/**
 * @summary [Telnyx Message]{@link https://developers.telnyx.com/api/messaging/send-message}
 * @typedef {Object} TelnyxMessage
 * @property {string} text - Message body (i.e., content) as a non-empty string. Required for SMS.
 * @property {?string} subject - Subject of multimedia message
 * @property {string} id - Identifies the type of resource
 * @property {string} type - The type of message [SMS, MMS]
 * @property {string} record_type - Identifies the type of the resource [message]
 * @property {string} direction - The direction of the message. Inbound messages are sent to you whereas outbound messages are sent from you. [outbound]
 * @property {string} messaging_profile_id - Unique identifier for a messaging profile.
 * @property {string} organization_id - The id of the organization the messaging profile belongs to.
 * @property {TelnyxMessageFrom} from - An object containing the phone number and name of the sender.
 * @property {TelnyxMessageTo[]} to - An array of phone number objects
 * @property {TelnyxMedia[]} media - An array of media objects
 * @property {?string} webhook_url - The URL where webhooks related to this message will be sent.
 * @property {?string} webhook_failover_url - The failover URL where webhooks related to this message will be sent if sending to the primary URL fails.
 * @property {string} encoding - Encoding scheme used for the message body.
 * @property {number} parts - Number of parts into which the message's body must be split.
 * @property {string[]} tags - Tags associated with the resource.
 * @property {?TelnyxMessageCost} cost - The cost of the message.
 * @property {string} received_at - ISO 8601 formatted date indicating when the message request was received.
 * @property {?string} sent_at - ISO 8601 formatted date indicating when the message was sent.
 * @property {?string} completed_at - ISO 8601 formatted date indicating when the message was finalized.
 * @property {?string} valid_until - Message must be out of the queue by this time or else it will be discarded and marked as 'sending_failed'. Once the message moves out of the queue, this field will be nulled
 * @property {TelnyxError[]} errors - These errors may point at addressees when referring to unsuccessful/unconfirmed delivery statuses.
 */

/**
 * @summary [Telnyx Message From]{@link https://developers.telnyx.com/api/messaging/send-message}
 * @typedef {Object} TelnyxMessageFrom
 * @property {string} phone_number - Sending address (+E.164 formatted phone number, alphanumeric sender ID, or short code).
 * @property {string} carrier - The carrier of the receiver.
 * @property {string} line_type - The line-type of the receiver.[Wireline, Wireless, VoWiFi, VoIP, Pre-Paid Wireless, ``].
 */

/**
 * @summary [Telnyx Message To]{@link https://developers.telnyx.com/api/messaging/send-message}
 * @typedef {Object} TelnyxMessageTo
 * @property {string} phone_number - Receiving address (+E.164 formatted phone number or short code).
 * @property {string} status - The delivery status of the message. [queued, sending, sent, expired, sending_failed, delivery_unconfirmed, delivered, delivery_failed].
 * @property {string} carrier - The carrier of the receiver.
 * @property {string} line_type - The line-type of the receiver.[Wireline, Wireless, VoWiFi, VoIP, Pre-Paid Wireless, ``].
 */
