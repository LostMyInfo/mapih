// @ts-check

/**
 * @type {string | undefined}
 */
let discordToken = undefined;

/**
 * @type {{bot: string, user?: string, client_id?: string, client_secret?: string, team_id?: string, redirect_uri?: string, scope?: Array<string>}|undefined}
 */
let slack_bot_token = undefined;

/**
 * @type {string | undefined}
 */
let openaiKey = undefined;

/**
 * @type {{api_key: string, client_id?: string, client_secret?: string, redirect_uri?: string|undefined, scope?: Array<string>} | undefined}
 */
let googleToken = undefined;

/**
 * @type {{client_id: string, client_secret: string, redirect_uri?: string|undefined, scope?: Array<string>} | undefined}
 */
let spotifyToken = undefined;

/**
 * @type {{client_id?: string, client_secret?: string, redirect_uri?: string|undefined, scope?: Array<string>, access_token?: string|undefined} | undefined}
 */
let dropboxToken = undefined;

/**
 * @type {{client_id?: string, client_secret?: string, redirect_uri?: string|undefined, restricted_to: { scope: string, object: { id: string, etag: string, type: string, sequence_id: string, name: string}}, scope?: string} | undefined}
 */
let boxToken = undefined;


/**
 * @type {{client_id: string, secret_key: string}|undefined}
 */
let paypalToken = undefined;

module.exports = {

  /**
   * @param {Object} options
   * @param {string} [options.discord]
   * @param {{bot: string, user?: string, client_id?: string, client_secret?: string, team_id?: string, redirect_uri?: string, scope?: Array<string>}|undefined} [options.slack]
   * @param {string} [options.openai]
   * @param {{api_key: string, client_id?: string, client_secret?: string, redirect_uri?: string|undefined, scope?: Array<string>} | undefined} [options.google]
   * @param {{client_id: string, client_secret: string, redirect_uri?: string|undefined, scope?: Array<string>}|undefined} [options.spotify]
   * @param {{client_id?: string, client_secret?: string, redirect_uri?: string|undefined, scope?: Array<string>, access_token?: string|undefined}} [options.dropbox]
   * @param {{client_id?: string, client_secret?: string, redirect_uri?: string|undefined, restricted_to: { scope: string, object: { id: string, etag: string, type: string, sequence_id: string, name: string}}, scope?: string} | undefined} [options.box]
   * @param {{client_id: string, secret_key: string}} [options.paypal]
   */
  initialize: function(options) {
    // console.log(options);
    if (options.discord) discordToken = options.discord;
    if (options.slack) slack_bot_token = options.slack;
    if (options.openai) openaiKey = options.openai;
    if (options.google) googleToken = options.google;
    if (options.spotify) spotifyToken = options.spotify;
    if (options.dropbox) dropboxToken = options.dropbox;
    if (options.paypal) paypalToken = options.paypal;
    if (options.box) boxToken = options.box;
  },

  /**
   * @returns {string|undefined}
   */
  get_discord_token: function() { return discordToken; },

  /**
   * @returns {{bot: string, user?: string, client_id?: string, client_secret?: string, team_id?: string, redirect_uri?: string, scope?: Array<string>}|undefined}
   */
  get_slack_token: function() { return slack_bot_token; },

  /**
   * @returns {string|undefined}
   */
  get_openai_token: function() { return openaiKey; },

  /**
   * @returns {{api_key: string, client_id?: string, client_secret?: string, redirect_uri?: string|undefined, scope?: Array<string>} | undefined}
   */
  get_google_token: function() { return googleToken; },

  /**
   * @returns {{client_id: string, client_secret: string, redirect_uri?: string|undefined, scope?: Array<string>}|undefined}
   */
  get_spotify_token: function() { return spotifyToken; },

  /**
   * @returns {{client_id?: string, client_secret?: string, redirect_uri?: string|undefined, scope?: Array<string>, access_token?: string|undefined}|undefined}
   */
  get_dropbox_token: function() { return dropboxToken; },

  /**
   * @returns {{client_id?: string, client_secret?: string, redirect_uri?: string|undefined, restricted_to: { scope: string, object: { id: string, etag: string, type: string, sequence_id: string, name: string}}, scope?: string}|undefined}
   */
  get_box_token: function() { return boxToken; },

  /**
   * @returns {{client_id: string, secret_key: string}|undefined}
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
      about: require('./api/google/drive/about').about
    }
    
    
  },
  
  utils: {
    https: require('./api/utils/https').https,
    storage: require('./api/utils/storage')
  }
};