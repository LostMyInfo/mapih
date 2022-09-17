const https = require(`../utils/https`);

module.exports = {
    // Create Channel Message
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
            if (
                (attempt = await https.post({
                    url: encodeURI(`discord.com`),
                    path: encodeURI(`/api/channels/${params.channel_id}/messages`),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bot ${process.env.token}`,
                    },
                    body: JSON.stringify({
                        content: params.content,
                        tts: params.tts,
                        embeds: params.embeds ?? params.embed,
                        allowed_mentions: params.allowed_mentions,
                        message_reference: params.message_reference,
                        components: params.components,
                        sticker_ids: params.sticker_ids,
                        files: params.files,
                        payload_json: params.payload_json,
                        attachments: params.attachments,
                        flags: params.flags,
                    }),
                }))
            ) return JSON.parse(attempt.body);
            else return false;
        } catch (e) {
            console.log(e);
        }
    }, // End Create Channel Message

    // Get All Channel Messages
    /**
     * 
     * @param {object} params dictionary object
     * @returns {Promise<object>} {...}
     */
    async getAllMessages(params) {
        try {
            if (
                (attempt = await https.get({
                    url: encodeURI('discord.com'),
                    path: encodeURI(`/api/channels/${params.channel_id}/messages?limit=${params.limit ?? 20}`),
                    headers: {
                        'Authorization': `Bot ${process.env.token}`,
                    },
                    body: '',
                }))
            ) return JSON.parse(attempt.body);
            else return false;
        } catch (e) {
            console.log(e);
        }
    }, // End Get All Channel Messages

    // Delete Channel Message
    /**
     * 
     * @param {object} params dictionary object
     * @returns 
     */
    async messageDelete(params) {
        try {
            if (
                (attempt = await https.del({
                    url: encodeURI('discord.com'),
                    path: encodeURI(`/api/channels/${params.channel_id}/messages/${params.message_id}`),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Audit-Log-Reason': `${params.reason}`,
                        'Authorization': `Bot ${process.env.token}`,
                    },
                    body: '',
                }))
            ) return true;
            else return false;
        } catch (e) {
            console.log(e);
        }
    }, // End Delete Channel Message

    // Bulk Delete Channel Message
    /**
     * 
     * @param {object} params 
     * @returns {boolean} returns true on success and false on error.
     */
    async messageBulkDelete(params) {
        try {
            if (
                (attempt = await https.post({
                    url: encodeURI('discord.com'),
                    path: encodeURI(`/api/channels/${params.channel_id}/messages/bulk-delete`),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bot ${process.env.token}`,
                    },
                    body: JSON.stringify({ messages: params.messages }),
                }))
            ) if (attempt.statusCode == 204) return true;
                else return false;
        } catch (e) {
            console.log(e);
        }
    }, // End Bulk Delete Channel Message

    // Create Message Reaction
    async messageReact(params) {
        try {
            if (
                (attempt = await https.put({
                    url: encodeURI('discord.com'),
                    path: encodeURI(`/api/channels/${params.channel_id}/messages/${params.message_id}/reactions/${params.emoji}/@me`),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bot ${process.env.token}`,
                    },
                    body: '',
                }))
            ) if (attempt.statusCode == 204) {
                console.log('messageReact', attempt);
                return true;
            }
                else {
                    console.log('messageReact', attempt);
                    return false;
                }
        } catch (e) {
            console.log(e);
        }
    }, // End Create Message Reaction

    // On Message Reaction
    /**
     * This function is pretty much a note at this point.
     * For use with the above "messageReact" function, it is meant to perform a user
     * defined action on the specified reaction.
     * 
     * -non-functional
     * @param {*} params 
     */
    async onReactionAdd(params) {
        try {

            // channel_id: suggestionChannel.id,
            // message_id: `${suggestmessage.id}`,
            // emoji: `⬇️`,
            let write = `onReact{"${params.message_id}": "${params.emoji}"}`;
            let filename;
            try {
                await fs.writeFile(filename = process.cwd() + `/data/${process.env.uuid}/.evented`, write, { flag: 'a+' });
            } catch (err) {
                console.log(err);
            }


        } catch (e) {
            console.log(e);
        }
    }, // End On Message Reaction

    // Modify Channel
    async modifyChannel(params) {
        try {
            if (
                (attempt = await https.patch({
                    url: encodeURI('discord.com'),
                    path: encodeURI(`/api/channels/${params.channel_id}`),
                    headers: {
                        'Authorization': `Bot ${process.env.token}`,
                    },
                    body: JSON.stringify({
                        name: params.channel_name ?? null,//string
                        type: params.type ?? null,//integer	the type of channel;
                        position: params.position ?? null,//?integer
                        topic: params.topic ?? null,//?string
                        nsfw: params.nsfw ?? null,//?boolean
                        rate_limit_per_user: params.rate_limit_per_user ?? null,//?integer
                        bitrate: params.bitrate ?? null,//?integer
                        user_limit: params.user_limit ?? null,//?integer
                        permission_overwrites: params.permission_overwrites ?? null,//
                        parent_id: params.parent_id ?? null,//?snowflake
                        rtc_region: params.rtc_region ?? null,//?string
                        video_quality_mode: params.video_quality_mode ?? null,//?integer
                        default_auto_archive_duration: params.default_auto_archive_duration ?? null,//?integer
                    }),
                }))
            ) { console.log('permsUpdate', attempt); return JSON.parse(attempt.body); }
            else return false;
        } catch (e) {
            console.log(e);
        }
    }, // End Modify Channel

    // Channel Permission Update
    async permissionsUpdate(params) {
        try {
            if (
                (attempt = await https.patch({
                    url: encodeURI('discord.com'),
                    path: encodeURI(`/api/channels/${params.channel_id}`),
                    headers: {
                        'Authorization': `Bot ${process.env.token}`,
                    },
                    body: JSON.stringify({
                        overwrite_id: params.overwrite_id ?? null,
                        type: params.type ?? null,
                        allow: params.allow ?? null,
                        deny: params.deny ?? null,
                    }),
                }))
            ) { console.log('permsUpdate', attempt); return JSON.parse(attempt.body); }
            else return false;
        } catch (e) {
            console.log(e);
        }
    }, // End Channel Permission Update

    // Channel typingCreate
    async typingCreate(params) {
        try {
            if (
                (attempt = await https.post({
                    url: encodeURI('discord.com'),
                    path: encodeURI(`/api/channels/${params.channel_id}/typing`),
                    headers: {
                        'Authorization': `Bot ${process.env.token}`,
                    },
                    body: '',
                }))
            ) {
                console.log('typingCreate', attempt);
                //return JSON.parse(attempt.body);
            }
            else return false;
        } catch (e) {
            console.log(e);
        }
    }, // End Channel typingCreate

    // Create forum thread
    /**
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

}; // End Module Exports