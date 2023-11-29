let token = undefined;

module.exports = {

  /**
   * @param {string} bot_token 
   */
  initialize: function(bot_token) {
    token = bot_token;
  },

  /**
   * @returns {string}
   */
  get_token: function() {
    return token;
  },

  discord: {

    auditlog: require('./api/discord/auditlog'),
    automod: require('./api/discord/automod'),
    invites: require('./api/discord/invites'),
    applications: require('./api/discord/applications'),
    channels: require('./api/discord/channels'),
    guilds: require('./api/discord/guilds'),
    webhooks: require('./api/discord/webhooks'),
    stageInstance: require('./api/discord/stage-instance'),
    interactions: require('./api/discord/interactions'),
    oauth2: require('./api/discord/oauth2'),
    users: require('./api/discord/users')
  
  },
  
  slack: {

    chat: require('./api/slack/chat'),
    conversations: require('./api/slack/conversations'),
    views: require('./api/slack/views')
  
  }

  utils: {

    https: require('./api/utils/https'),
    aray: require('./api/utils/aray')
  
  }
};