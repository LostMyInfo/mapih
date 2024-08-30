// @ts-check

const
  { MySQLStorage, MySQLStorageError } = require('./api/utils/mysql'),
  mysql = new MySQLStorage();


/**
 * @typedef {string|undefined} discord_token
 * @typedef {string|undefined} openai_token
 * @typedef {string|undefined} anthropic_token
 * @typedef {string|undefined} prompt_perfect_token
 * @typedef {import('./dist/Api').twitter_token} twitter_token
 * @typedef {import('./dist/Api').spotify_token|undefined} spotify_token
 * @typedef {import('./dist/Api').slack_token|undefined} slack_token
 * @typedef {import('./dist/Api').google_token|undefined} google_token
 * @typedef {import('./dist/Api').dropbox_token|undefined} dropbox_token
 * @typedef {import('./dist/Api').box_token|undefined} box_token
 * @typedef {import('./dist/Api').imgur_token|undefined} imgur_token
 * @typedef {import('./dist/Api').paypal_token|undefined} paypal_token
 */

/**
 * @typedef {Object} Tokens
 * @property {discord_token} [discord]
 * @property {slack_token} [slack]
 * @property {openai_token} [openai]
 * @property {anthropic_token} [anthropic]
 * @property {prompt_perfect_token} [prompt_perfect]
 * @property {google_token} [google]
 * @property {spotify_token} [spotify]
 * @property {imgur_token} [imgur]
 * @property {twitter_token} [twitter]
 * @property {dropbox_token} [dropbox]
 * @property {box_token} [box]
 * @property {paypal_token} [paypal]
 */

/**
 * @type {Tokens}
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
   * @returns {void}
   */
  initialize: function(options) {

    if (typeof options !== 'object' || options === null)
      throw new Error('Options must be an object');

    Object.assign(tokens, options);
  },

  /**
   * @param {keyof Tokens | string} service
   * @returns {Tokens[keyof Tokens]}
   */
  get_token: (service) => tokens[service],

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
    storage: {
      local: require('./api/utils/storage'),
      mysql
    },
    tokens: {
      set: require('./api/resources/handlers').setTokens,
      get: require('./api/resources/handlers').getTokens
    }
    // sql: require('./api/utils/sql')
  },

  MySQLStorage,
  MySQLStorageError
};
