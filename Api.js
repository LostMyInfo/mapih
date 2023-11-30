// @ts-check
/**
 * @type {string | undefined}
 */
let discordToken = undefined;
/**
 * @type {string | undefined}
 */
let slackToken = undefined;

module.exports = {

  /**
   * @param {Object} options
   * @param {string} [options.discord]
   * @param {string} [options.slack]
   */
  initialize: function(options) {
    if (options.discord) discordToken = options.discord;
    if (options.slack) slackToken = options.slack;
  },

  /**
   * @returns {string|undefined}
   */
  get_discord_token: function() {
    return discordToken;
  },

  /**
   * @returns {string|undefined}
   */
  get_slack_token: function() {
    return slackToken;
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
  },

  utils: {
    https: require('./api/utils/https'),
    aray: require('./api/utils/aray')
  }
};