const https = require(`../utils/https`);

module.exports = {
    // Get Audit Logs
    async getAuditLogs(params) {
        try {
            if (!params.guild_id) {
                return 'Error: parameter `guild_id` is Required.';
            }
            else if (
                (attempt = await https.get({
                    url: encodeURI(`discord.com`),
                    path: encodeURI(`/api/guilds/${params.guild_id}/audit-logs`),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bot ${process.env.token}`,
                    },
                    body: '',
                }))
            ) return JSON.parse(attempt.body);
            else return false;
        } catch (e) {
            console.log(e);
        }
    }, // End Get Audit Logs

}; // End Module Exports