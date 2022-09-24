const https = require(`../utils/https`);

module.exports = {
    /* 
    Get Current User
    GET /users/@me
    Returns the user object of the requester's account. For OAuth2, this requires the identify scope, 
    which will return the object without an email, and optionally the email scope, which returns the object with an email. */

    async getCurrentUser(params) {
        try{
            if (attempt = await https.get({
                url: encodeURI(`discord.com`),
                path: encodeURI(`/api/users/@me`),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bot ${process.env.token}`,
                },
                body: '',
            })) return JSON.parse(attempt.body);
            else return false;
        }catch(e){console.log(e)}
    }, //End getCurrentUser

    /*
    Get User
    GET /users/{user.id}
    Returns a user object for a given user ID. */
    async getUser(params) {
        if (attempt = await https.get({
            url: encodeURI(`discord.com`),
            path: encodeURI(`/api/users/${params.user_id}`),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${process.env.token}`,
            },
            body: '',
        })) return JSON.parse(attempt.body);
        else return false;
    }, //End getUser

    /* 
    Modify Current User
    PATCH /users/@me
    Modify the requester's user account settings. Returns a user object on success. Fires a User Update Gateway event. */
    async modifyCurrentUser(params) {
        try{
            if (
                (attempt = await https.patch({
                    url: encodeURI(`discord.com`),
                    path: encodeURI(`/api/users/@me`),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bot ${process.env.token}`,
                    },
                    body: JSON.stringify({
                        "username" : params.usernamem,
                        "avatar" : params.avatar
                    }),
                }))
            ) return JSON.parse(attempt.body);
            else return false;  
        }catch(e){console.log(e)}
    }, // END modifyCurrentUser

    /*
    Get Current User Guilds
    GET /users/@me/guilds
    Returns a list of partial guild objects the current user is a member of. Requires the guilds OAuth2 scope. */
    async getCurrentUserGuilds(params) {
        if (attempt = await https.get({
            url: encodeURI(`discord.com`),
            path: encodeURI(`/api/users/@me/guilds`),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${process.env.token}`,
            },
            body: '',
        })) return JSON.parse(attempt.body);
        else return false;
    }, //End getCurrentUserGuilds

    /*
    Get Current User Guild Member
    GET /users/@me/guilds/{guild.id}/member
    Returns a guild member object for the current user. Requires the guilds.members.read OAuth2 scope. */
    async getCurrentUserGuildMember(params) {
        if (attempt = await https.get({
            url: encodeURI(`discord.com`),
            path: encodeURI(`/api/users/@me/guilds/${params.guild_id}/member`),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${process.env.token}`,
            },
            body: '',
        })) return JSON.parse(attempt.body);
        else return false;
    }, //End getCurrentUserGuildMember

    /*
    Leave Guild
    DELETE /users/@me/guilds/{guild.id}
    Leave a guild. Returns a 204 empty response on success. */
    async leaveGuild(params){
        try{
            if (attempt = await https.del({
                url: encodeURI(`discord.com`),
                path: encodeURI(`/api/users/@me/guilds/${params.guild_id}`),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bot ${process.env.token}`,
                },
                body: '',
            })) return attempt.statusCode == 204;
            else return false;
        }catch(e){console.log(e)}
    }, // End leaveGuild

    /*
    Create DM
    POST /users/@me/channels
    Create a new DM channel with a user. Returns a DM channel object.
    This also sends a message to the user */
    async createDM(params) {
        try {
            //let attempt;
            if (
                (attempt = await https.post({
                    url: encodeURI(`discord.com`),
                    path: encodeURI(`/api/users/@me/channels`),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bot ${process.env.token}`,
                    },
                    body: JSON.stringify({
                        recipient_id: params.recipient_id,
                    }),
                }))
            ) {
                let parsed = JSON.parse(attempt.body);
                console.log("Parsed Create DM Channel", parsed);
                if (
                    (dm = await https.post({
                        url: encodeURI(`discord.com`),
                        path: encodeURI(`/api/channels/${parsed.id}/messages`),
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
                ) return JSON.parse(dm.body);
            }
            else return false;
        } catch (e) {
            console.log(e);
        }
    }, // End create DM

    /*
    Create Group DM
    POST /users/@me/channels
    Create a new group DM channel with multiple users. Returns a DM channel object. 
    This endpoint was intended to be used with the now-deprecated GameBridge SDK. 
    DMs created with this endpoint will not be shown in the Discord client */

    async createGroupDM(params) {
        try {
            //let attempt;
            if (
                (attempt = await https.post({
                    url: encodeURI(`discord.com`),
                    path: encodeURI(`/api/users/@me/channels`),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bot ${process.env.token}`,
                    },
                    body: JSON.stringify({
                        access_tokens : params.access_tokens,
                        nicks: params.nicks
                    }),
                }))
            ) {
                let parsed = JSON.parse(attempt.body);
                if (
                    (dm = await https.post({
                        url: encodeURI(`discord.com`),
                        path: encodeURI(`/api/channels/${parsed.id}/messages`),
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
                ) return JSON.parse(dm.body);
            }
            else return false;
        } catch (e) {
            console.log(e);
        }
    }, // End createGroupDM

    /*
    Get User Connections
    GET /users/@me/connections
    Returns a list of connection objects. Requires the connections OAuth2 scope. */
    async getUserConnections(params) {
        if (attempt = await https.get({
            url: encodeURI(`discord.com`),
            path: encodeURI(`/api/users/@me/connections`),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${process.env.token}`,
            },
            body: '',
        })) return JSON.parse(attempt.body);
        else return false;
    }, //End getUser
    

}; // End Module Exports
