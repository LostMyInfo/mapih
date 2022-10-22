const https = require(`../utils/https`);
const structures = require('../resources/structures');
const { doRequest } = require('../resources/functions');
module.exports = {
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
    async messageCreate(params) {
        try {
            const cfg = {
                method: "POST",
                body: structures.newStructure('message'),
                endpoint: 'messages',
                properties: {
                    channel_id: params.channel_id,
                    content: params.content
                },
                params: params
            };
            cfg.path = `channels/${params.channel_id}/${cfg.endpoint}`;
            cfg.attempt = await doRequest(cfg);
            return cfg.attempt ?? false;
        } catch (e) {
            console.log(e);
        }
    }, // End Create Channel Message

    /**
     * 
     * @param {snowflake} channel_id channel_id to retrieve messages from.
     * @param {number} limit the number of messages to retrieve.
     * @returns {Promise<object>} {...}
     */
    async getAllMessages(params) {
        try {
            const cfg = {
                method: "GET",
                body: null,
                endpoint: `messages`,
                query: {
                    'limit': params.limit ?? null,
                    'around': params.around ?? null,
                    'before': params.before ?? null,
                    'after': params.after ?? null
                },
                properties: {
                    channel_id: params.channel_id,
                },
                params: params
            };

            cfg.path = `channels/${params.channel_id}/${cfg.endpoint}`;
            cfg.attempt = await doRequest(cfg);

            return JSON.parse(cfg.attempt.body) ?? 'no messages';
        } catch (e) {
            console.log(e);
        }
    }, // End Get All Channel Messages

    /**
     * 
     * @param {object} params dictionary object
     * @returns 
     */
    async messageDelete(params) {
        try {
            const cfg = {
                method: "DEL",
                body: null,
                endpoint: `messages/${params.message_id}`,
                properties: {
                    channel_id: params.channel_id
                },
                params: params,
                audt: true,
                reason: "Deleting Message"
            };
            cfg.path = `channels/${params.channel_id}/${cfg.endpoint}`;
            cfg.attempt = await doRequest(cfg);

            return cfg.attempt.statusCode == 204 ? attempt : false;

        } catch (e) {
            console.log(e);
        }
    }, // End Delete Channel Message

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
    async messageBulkDelete(params) {
        try {
            return (
                (attempt = await https.post({
                    url: encodeURI('discord.com'),
                    path: encodeURI(`/api/channels/${params.channel_id}/messages/bulk-delete`),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bot ${process.env.token}`,
                    },
                    body: JSON.stringify({ messages: params.messages }),
                }))
            ) ? attempt : false;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, // End Bulk Delete Channel Message

    // Create Message Reaction
    async messageReact(params) {
        try {
            const cfg = {
                method: "PUT",
                body: null,
                endpoint: `messages/${params.message_id}/reactions/${params.emoji}/@me`,
                properties: null,
                params: params
            };
            cfg.path = `channels/${params.channel_id}/${cfg.endpoint}`;
            cfg.attempt = await doRequest(cfg);

            return cfg.attempt.statusCode == 204 ? cfg.attempt : false;
        } catch (e) {
            console.log(e);
        }
    }, // End Create Message Reaction

    // Modify Channel
    async modifyChannel(params) {
        try {
            const cfg = {
                method: "PATCH",
                body: structures.newStructure('channel'),
                endpoint: null,
                properties: {
                    name: params.name,
                    type: params.type
                },
                params: params
            };
            cfg.path = `channels/${params.channel_id}`;
            cfg.attempt = await doRequest(cfg);

            return JSON.parse(cfg.attempt.body) ?? false;
        } catch (e) {
            console.log(e);
        }
    }, // End Modify Channel

    // Channel Permission Update
    async editChannelPermissions(params) {
        try {
            const cfg = {
                method: "PATCH",
                body: structures.newStructure('overwrite'),
                endpoint: `permissions/${params.overwrite_id}`,
                properties: null,
                params: params
            };
            cfg.path = `channels/${params.channel_id}/${cfg.endpoint}`;
            cfg.attempt = await doRequest(cfg);

            return cfg.attempt.statusCode == 204 ? cfg.attempt : false;
        } catch (e) {
            console.log(e);
        }
    }, // End Channel Permission Update

    // Channel typingCreate
    async triggerTyping(params) {
        try {
            /* initialize config */
            const cfg = {
                method: "POST",
                body: null,
                endpoint: `typing`,
                properties: null,
                params: params
            };
            cfg.path = `channels/${params.channel_id}/${cfg.endpoint}`;
            cfg.attempt = await doRequest(cfg);

            return cfg.attempt.statusCode == 204 ? cfg.attempt : false;
        } catch (e) {
            console.log(e);
        }
    }, // End Channel typingCreate

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
    async forumThreadCreate(params) {
        try {
            if (
                (attempt = await https.post({
                    url: encodeURI(`discord.com`),
                    path: encodeURI(`/api/channels/${params.channel_id}/threads`),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bot ${process.env.token}`,
                    },
                    body: JSON.stringify({
                        name: params.name,//string	1-100 character channel name
                        auto_archive_duration: params.auto_archive_duration,//?*	integer	duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080
                        rate_limit_per_user: params.rate_limit_per_user,//?	?integer	amount of seconds a user has to wait before sending another message (0-21600)
                        message: params.message,//	a forum thread message params object	contents of the first message in the forum thread
                        applied_tags: params.applied_tags,//?	array of snowflakes	the IDs of the set of tags that have been applied to a thread in a GUILD_FORUM channel
                    }),
                }))
            ) return JSON.parse(attempt.body);
            else return false;
        } catch (e) {
            console.log(e);
        }
    }, // End Create forum thread

};