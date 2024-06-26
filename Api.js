// @ts-check

/**
 * @typedef {string|undefined} discord_token
 * @typedef {string|undefined} openai_token
 * @typedef {import('./dist/Api').twitter_token} twitter_token
 * @typedef {import('./dist/Api').spotify_token} spotify_token
 * @typedef {import('./dist/Api').slack_token} slack_token
 * @typedef {import('./dist/Api').google_token} google_token
 * @typedef {import('./dist/Api').dropbox_token} dropbox_token
 * @typedef {import('./dist/Api').box_token} box_token
 * @typedef {import('./dist/Api').imgur_token} imgur_token
 * @typedef {import('./dist/Api').paypal_token} paypal_token
 */

/**
 * @type {discord_token | spotify_token | slack_token | openai_token | twitter_token | imgur_token | dropbox_token | box_token | paypal_token | google_token}
 */
let token;

/**
 * @type {discord_token}
 */
let discordToken = undefined;

/**
 * @type {slack_token}
 */
let slackToken = undefined;

/**
 * @type {openai_token}
 */
let openaiKey = undefined;

/**
 * @type {anthropic_token}
 */
let anthropicKey = undefined;

/**
 * @type {prompt_perfect_token}
 */
let promptPerfectToken = undefined;

/**
 * @type {google_token}
 */
let googleToken = undefined;

/**
 * @type {spotify_token}
 */
let spotifyToken = undefined;

/**
 * @type {imgur_token}
 */
let imgurToken = undefined;

/**
 * @type {twitter_token}
 */
let twitterToken = undefined;

/**
 * @type {dropbox_token}
 */
let dropboxToken = undefined;

/**
 * @type {box_token}
 */
let boxToken = undefined;


/**
 * @type {paypal_token}
 */
let paypalToken = undefined;

module.exports = {

  /**
   * @param {Object} options
   * @param {discord_token} [options.discord]
   * @param {slack_token} [options.slack]
   * @param {openai_token} [options.openai]
   * @param {anthropic_token} [options.anthropic]
   * @param {prompt_perfect_token} [options.prompt_perfect]
   * @param {google_token} [options.google]
   * @param {twitter_token} [options.twitter]
   * @param {spotify_token} [options.spotify]
   * @param {imgur_token} [options.imgur]
   * @param {dropbox_token} [options.dropbox]
   * @param {box_token} [options.box]
   * @param {paypal_token} [options.paypal]
   */
  initialize: function(options) {

    // @ts-ignore
    token = options[token];
    if (options.discord) discordToken = options.discord;
    if (options.slack) slackToken = options.slack;
    if (options.openai) openaiKey = options.openai;
    if (options.anthropic) anthropicKey = options.anthropic;
    if (options.prompt_perfect) promptPerfectToken = options.prompt_perfect;
    if (options.google) googleToken = options.google;
    if (options.spotify) spotifyToken = options.spotify;
    if (options.twitter) twitterToken = options.twitter;
    if (options.imgur) imgurToken = options.imgur;
    if (options.dropbox) dropboxToken = options.dropbox;
    if (options.paypal) paypalToken = options.paypal;
    if (options.box) boxToken = options.box;
  },

  get_token: () => token,

  /**
   * @returns {discord_token}
   */
  get_discord_token: function() { return discordToken; },

  /**
   * @returns {slack_token}
   */
  get_slack_token: function() { return slackToken; },

  /**
   * @returns {openai_token}
   */
  get_openai_token: function() { return openaiKey; },

  /**
   * @returns {anthropic_token}
   */
  get_anthropic_token: function() { return anthropicKey; },

  /**
   * @returns {prompt_perfect_token}
   */
  get_prompt_perfect_token: function() { return promptPerfectToken; },

  /**
   * @returns {google_token}
   */
  get_google_token: function() { return googleToken; },

  /**
   * @returns {spotify_token}
   */
  get_spotify_token: function() { return spotifyToken; },

  /**
   * @returns {imgur_token}
   */
  get_imgur_token: function() { return imgurToken; },

  /**
   * @returns {dropbox_token}
   */
  get_dropbox_token: function() { return dropboxToken; },

  /**
   * @returns {box_token}
   */
  get_box_token: function() { return boxToken; },

  /**
   * @returns {twitter_token}
   */
  get_twitter_token: function() { return twitterToken; },

  /**
   * @returns {paypal_token}
   */
  get_paypal_token: function() { return paypalToken; },

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
    search: require('./api/spotify/search'),
    artists: require('./api/spotify/artists'),
    albums: require('./api/spotify/albums'),
    users: require('./api/spotify/users'),
    playlists: require('./api/spotify/playlists'),
    playback: require('./api/spotify/playback'),
    songs: require('./api/spotify/songs'),
    oauth2: require('./api/spotify/oauth2')
  },

  twitter: {
    tweets: require('./api/twitter/tweets'),
    users: require('./api/twitter/users')
  },

  imgur: {
    users: require('./api/imgur/users'),
    images: require('./api/imgur/images'),
    galleries: require('./api/imgur/galleries')
  },

  openai: {
    chat: require('./api/openai/index').chat,
    images: require('./api/openai/index').images,
    speech: require('./api/openai/index').speech,
    embeddings: require('./api/openai/index').embeddings
  },

  anthropic: {
    messages: require('./api/anthropic/index').messages
  },

  promptPerfect: {
    // optimize: require('./api/promptPerfect/index').optimize,
  },

  dropbox: {
    oauth2: require('./api/dropbox/oauth2'),
    files: require('./api/dropbox/files')
  },

  box: {
    oauth2: require('./api/box/oauth2'),
    collections: require('./api/box/collections')
  },

  youtube: {
    search: require('./api/youtube/search').search,
    videos: require('./api/youtube/videos')
  },

  google: {
    geocoding: require('./api/google/geocoding').geocoding,
    places: require('./api/google/places'),
    drive: {
      about: require('./api/google/drive/about').about,
      files: require('./api/google/drive/files'),
      drives: require('./api/google/drive/drives'),
      apps: require('./api/google/drive/apps'),
      changes: require('./api/google/drive/changes'),
      comments: require('./api/google/drive/comments')
    },
    sheets: {
      spreadsheets: require('./api/google/sheets/spreadsheets')
    }
  },

  utils: {
    https: require('./api/utils/https').https,
    storage: require('./api/utils/storage'),
    tokens: {
      set: require('./api/resources/handlers').setTokens,
      get: require('./api/resources/handlers').getTokens
    },
    sql: require('./api/utils/sql')
  }
};
