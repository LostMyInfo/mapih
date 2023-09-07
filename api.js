/* eslint-disable node/exports-style */
/**
 * @class
 */
class Api {
  constructor() {

    exports.discord = this.discord;
    exports.utils = this.utils;
  }

  discord = {

    auditlog: require('./api/discord/auditlog'),
    automod: require('./api/discord/automod'),
    invites: require('./api/discord/invites'),
    commands: require('./api/discord/applications'),
    channels: require('./api/discord/channels'),
    guilds: require('./api/discord/guilds'),
    webhooks: require('./api/discord/webhooks'),
    stageInstance: require('./api/discord/stage-instance'),
    interactions: require('./api/discord/interactions'),
    oauth2: require('./api/discord/oauth2'),
    users: require('./api/discord/users'),

  };

  utils = {

    https: require('./api/utils/https'),
    aray: require('./api/utils/aray'),
    timestamp: require('./api/utils/timestamp')

  };
}
module.exports = Api;