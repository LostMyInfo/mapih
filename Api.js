// @ts-check

/**
 * @typedef {string|undefined} discord_token
 * @typedef {string|undefined} openai_token
 * @typedef {string|undefined} anthropic_token
 * @typedef {string|undefined} prompt_perfect_token
 * @typedef {import('./dist/Api').twitter_token|undefined} twitter_token
 * @typedef {import('./dist/Api').spotify_token|undefined} spotify_token
 * @typedef {import('./dist/Api').slack_token|undefined} slack_token
 * @typedef {import('./dist/Api').google_token|undefined} google_token
 * @typedef {import('./dist/Api').dropbox_token|undefined} dropbox_token
 * @typedef {import('./dist/Api').box_token|undefined} box_token
 * @typedef {import('./dist/Api').imgur_token|undefined} imgur_token
 * @typedef {import('./dist/Api').paypal_token|undefined} paypal_token
 */


/**
 * @type {discord_token}
 */
const discordToken = undefined;

/**
 * @type {slack_token}
 */
const slackToken = undefined;

/**
 * @type {openai_token}
 */
const openaiKey = undefined;

/**
 * @type {anthropic_token}
 */
const anthropicKey = undefined;

/**
 * @type {prompt_perfect_token}
 */
const promptPerfectToken = undefined;

/**
 * @type {google_token}
 */
const googleToken = undefined;

/**
 * @type {spotify_token}
 */
const spotifyToken = undefined;

/**
 * @type {imgur_token}
 */
const imgurToken = undefined;

/**
 * @type {twitter_token}
 */
const twitterToken = undefined;

/**
 * @type {dropbox_token}
 */
const dropboxToken = undefined;

/**
 * @type {box_token}
 */
const boxToken = undefined;


/**
 * @type {paypal_token}
 */
const paypalToken = undefined;

/**
 * @type {{[x: string]: any}}
 */
const tokens = {};

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

    if (typeof options !== 'object' || options === null)
      throw new Error('Options must be an object');

    Object.assign(tokens, options);

    console.log('tokens:', tokens);

    // if (options.discord) discordToken = options.discord;
    // if (options.slack) slackToken = options.slack;
    // if (options.openai) openaiKey = options.openai;
    // if (options.anthropic) anthropicKey = options.anthropic;
    // if (options.prompt_perfect) promptPerfectToken = options.prompt_perfect;
    // if (options.google) googleToken = options.google;
    // if (options.spotify) spotifyToken = options.spotify;
    // if (options.twitter) twitterToken = options.twitter;
    // if (options.imgur) imgurToken = options.imgur;
    // if (options.dropbox) dropboxToken = options.dropbox;
    // if (options.paypal) paypalToken = options.paypal;
    // if (options.box) boxToken = options.box;
  },

  /**
   * @param {'discord'|'slack'|'openai'|'anthropic'|'prompt_perfect'|'twitter'|'spotify'|'imgur'|'dropbox'|'box'|'paypal'|'google'} service
   * @returns {discord_token|slack_token|openai_token|anthropic_token|prompt_perfect_token|twitter_token|spotify_token|imgur_token|dropbox_token|box_token|paypal_token|google_token}
   */
  _get_token: (service) => {
    switch (service) {
    case 'discord': return discordToken;
    case 'slack': return slackToken;
    case 'openai': return openaiKey;
    case 'anthropic': return anthropicKey;
    case 'prompt_perfect': return promptPerfectToken;
    case 'google': return googleToken;
    case 'spotify': return spotifyToken;
    case 'twitter': return twitterToken;
    case 'imgur': return imgurToken;
    case 'dropbox': return dropboxToken;
    case 'paypal': return paypalToken;
    case 'box': return boxToken;
    default: throw new Error(`Invalid service: ${service}`);
    }
  },

  /**
   * @param {string} service
   * @returns {discord_token|slack_token|openai_token|anthropic_token|prompt_perfect_token|twitter_token|spotify_token|imgur_token|dropbox_token|box_token|paypal_token|google_token}
   */
  get_token: (service) => tokens[service],

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
