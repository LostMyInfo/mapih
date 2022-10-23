/**
 * Creates a message in the specified channel.
 *
 * Example:
 * ```js
 * await messageCreate({
 *   channel_id: '00000000000000000',
 *   content: `string based input`,
 * })
 * ```
 *
 * @param {object} params Object of inputs.
 * @returns {Promise<object>} {...}
 */
export function messageCreate(params: any): Promise<any>;
/**
 * Creates a message in the specified channel.
 *
 * Example:
 * ```js
 * await messageCreate({
 *   channel_id: '00000000000000000',
 *   content: `string based input`,
 * })
 * ```
 *
 * @param {object} params Object of inputs.
 * @returns {Promise<object>} {...}
 */
export function messageCreate(params: any): Promise<any>;
/**
 *
 * @param {snowflake} channel_id channel_id to retrieve messages from.
 * @param {number} limit the number of messages to retrieve.
 * @returns {Promise<object>} {...}
 */
export function getAllMessages(params: any): Promise<any>;
/**
 *
 * @param {snowflake} channel_id channel_id to retrieve messages from.
 * @param {number} limit the number of messages to retrieve.
 * @returns {Promise<object>} {...}
 */
export function getAllMessages(params: any): Promise<any>;
/**
 *
 * @param {object} params dictionary object
 * @returns
 */
export function messageDelete(params: any): Promise<any>;
/**
 *
 * @param {object} params dictionary object
 * @returns
 */
export function messageDelete(params: any): Promise<any>;
/**
 * Removes 2 or more messages from a channel.
 * @params { channel_id, messages }
 *
 * example:
 * ```js
 * await messageBulkDelete({
 *	 channel_id: `00000000000000`,
 *	 messages: messages.map(msg => msg.id),
 * });
 ```
 *
 * @param {snowflake} channel_id Id of the channel to remove messages from.
 * @param {array} messages Array of message ids to remove.
 * @returns {Promise<any>} {...}
 *
 * https://discord.com/developers/docs/resources/channel#bulk-delete-messages
 */
export function messageBulkDelete(params: any): Promise<any>;
/**
 * Removes 2 or more messages from a channel.
 * @params { channel_id, messages }
 *
 * example:
 * ```js
 * await messageBulkDelete({
 *	 channel_id: `00000000000000`,
 *	 messages: messages.map(msg => msg.id),
 * });
 ```
 *
 * @param {snowflake} channel_id Id of the channel to remove messages from.
 * @param {array} messages Array of message ids to remove.
 * @returns {Promise<any>} {...}
 *
 * https://discord.com/developers/docs/resources/channel#bulk-delete-messages
 */
export function messageBulkDelete(params: any): Promise<any>;
export function messageReact(params: any): Promise<any>;
export function messageReact(params: any): Promise<any>;
export function modifyChannel(params: any): Promise<any>;
export function modifyChannel(params: any): Promise<any>;
export function editChannelPermissions(params: any): Promise<any>;
export function editChannelPermissions(params: any): Promise<any>;
export function typingCreate(params: any): Promise<any>;
export function typingCreate(params: any): Promise<any>;
/**
 * (method) forumThreadCreate:
 * Creates a thread in the specified forum channel.
 *
 * example:
 * ```js
 * await api.Discord.Channels.forumThreadCreate({
 *   channel_id: `0110100001101001`,
 *   name: `thread name`,
 *   auto_archive_duration: 10080,
 *   rate_limit_per_user: 5,
 *   message: {
 *       content: '',
 *   },
 *   applied_tags: null,
 * });
 * ```
 *
 * @param {object} params Object of inputs.
 * @param {string} name string	1-100 character channel name
 * @param {integer} auto_archive_duration ?*	integer	duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080
 * @param {object} rate_limit_per_user ?	?integer	amount of seconds a user has to wait before sending another message (0-21600)
 * @param {object} message a forum thread message params object	contents of the first message in the forum thread
 * @param {array} applied_tags ? array of snowflakes	the IDs of the set of tags that have been applied to a thread in a GUILD_FORUM channel
 * @returns {Promise} Promise Object
 */
export function forumThreadCreate(params: any): Promise<any>;
/**
 * (method) forumThreadCreate:
 * Creates a thread in the specified forum channel.
 *
 * example:
 * ```js
 * await api.Discord.Channels.forumThreadCreate({
 *   channel_id: `0110100001101001`,
 *   name: `thread name`,
 *   auto_archive_duration: 10080,
 *   rate_limit_per_user: 5,
 *   message: {
 *       content: '',
 *   },
 *   applied_tags: null,
 * });
 * ```
 *
 * @param {object} params Object of inputs.
 * @param {string} name string	1-100 character channel name
 * @param {integer} auto_archive_duration ?*	integer	duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080
 * @param {object} rate_limit_per_user ?	?integer	amount of seconds a user has to wait before sending another message (0-21600)
 * @param {object} message a forum thread message params object	contents of the first message in the forum thread
 * @param {array} applied_tags ? array of snowflakes	the IDs of the set of tags that have been applied to a thread in a GUILD_FORUM channel
 * @returns {Promise} Promise Object
 */
export function forumThreadCreate(params: any): Promise<any>;
//# sourceMappingURL=channels.d.ts.map