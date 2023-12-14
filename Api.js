// @ts-check

/**
 * @type {string | undefined}
 */
let discordToken = undefined;
/**
 * @type {string | undefined}
 */
let slackToken = undefined;
/**
 * @type {{client_id: string, client_secret: string} | undefined}
 */
let spotifyToken = undefined;

module.exports = {

  /**
   * @param {Object} options
   * @param {string} [options.discord]
   * @param {string} [options.slack]
   * @param {{client_id: string, client_secret: string}} [options.spotify]
   */
  initialize: function(options) {
    // console.log(options);
    if (options.discord) discordToken = options.discord;
    if (options.slack) slackToken = options.slack;
    if (options.spotify) spotifyToken = options.spotify;
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

  get_spotify_token: function() {
    return spotifyToken;
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
    views: require('./api/slack/views'),
    users: require('./api/slack/users')
  },

  spotify: {
    search: require('./api/spotify/search').search,
    artists: require('./api/spotify/artists')
  },
  
  utils: {
    https: require('./api/utils/newhttps').https,
    storage: require('./api/utils/storage')
  }
};