// @ts-check

/**
 * @typedef {string | undefined} discord_token
 * @typedef {{bot: string, user?: string, client_id?: string, client_secret?: string, team_id?: string, redirect_uri?: string, scope?: Array<string>}|undefined} slack_token
 * @typedef {string | undefined} openai_token
 * @typedef {{api_key: string, client_id?: string, client_secret?: string, redirect_uri?: string|undefined, scope?: Array<string>} | undefined} google_token
 * @typedef {{client_id: string, client_secret: string, redirect_uri?: string|undefined, scope?: Array<string>} | undefined} spotify_token
 * @typedef {{client_id: string, client_secret: string, redirect_uri?: string|undefined, scope?: Array<string>} | undefined} imgur_token
 * @typedef {{api_key?: string, api_secret?: string, client_id?: string, client_secret?: string, access_token?: string, access_token_secret?: string, bearer_token?: string, scope?: Array<string>} | undefined} twitter_token
 * @typedef {{client_id?: string, client_secret?: string, redirect_uri?: string|undefined, scope?: Array<string>, access_token?: string|undefined} | undefined} dropbox_token
 * @typedef {{client_id?: string, client_secret?: string, redirect_uri?: string|undefined, restricted_to: { scope: string, object: { id: string, etag: string, type: string, sequence_id: string, name: string}}, scope?: string} | undefined} box_token
 * @typedef {{client_id: string, secret_key: string} |undefined} paypal_token
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
    chat: require('./api/openai/chat'),
    images: require('./api/openai/images'),
    speech: require('./api/openai/speech')
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
    sql: require('./api/utils/sql')
  }
};