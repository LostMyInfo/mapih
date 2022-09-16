const https = require(`../utils/https`);

module.exports = {
    // create DM with user
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

}; // End Module Exports