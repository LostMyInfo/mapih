class Api {
    constructor() {

        exports.Discord = this.Discord;
        exports.Utils = this.Utils;
    }

    Discord = {

        Auditlog: require('./api/discord/auditlog'),
        Applications: require('./api/discord/applications'),
        Channels: require('./api/discord/channels'),
        Guilds: require('./api/discord/guilds'),
        Interactions: require('./api/discord/interactions'),
        Oauth2: require('./api/discord/oauth2'),
        Users: require('./api/discord/users'),
    }

    Utils = {

        Https: require('./api/utils/https'),
        Aray: require('./api/utils/aray'),
        Timestamp: require('./api/utils/timestamp'),

    }
}
module.exports = Api;
