/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable brace-style */
// @ts-check
/**
 * @global
 * @typedef {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} Method
 */

const { https } = require('../utils/https');
const { ResponseError } = require('./Errors');
const { get, set } = require('../utils/storage');

/**
 * API Handler Creator
 * @param {Object} params
 * @param {Method} params.method
 * @param {string} params.endpoint
 * @param {Object} [params.body]
 * @param {?string} [params.reason]
 * @returns {Promise<*>}
 * @private
 */
async function attemptHandler(params) {
  // console.log('params in attemptHandler:', params);
  const headers = new Headers({
    'Authorization': `Bot ${token('discord', 'discord')}`
  });

  if (!params.endpoint.includes('prune'))
    headers.append('content-type', 'application/json');

  if (params.reason)
    headers.append('x-audit-log-reason', params.reason);
    
  try {

    return https({
      method: params.method,
      url: `https://discord.com/api/v10/${params.endpoint}`,
      headers,
      body: params.body ? JSON.stringify(params.body) : ''
    });
    // console.log('attempt in functions', attempt)
      
  } catch (e) {
    throw e;
  }
}

/**
 * Handles multipart form-data for Discord attachments
 * @param {*} params
 * @param {string} path 
 * @param {Method} method
 * @private
 */
async function sendAttachment(params, path, method) {
  const { isValidMedia } = require('./functions');
  try {
    const form = new FormData();
    
    for (const attachment of params.attachments) {
      if (!attachment.file || !attachment.filename)
        throw new Error('\nAttachments is missing one or more required properties: \'file\' or \'filename\'\n');

      if (typeof attachment.file === 'string' && await isValidMedia(attachment.file)) {
        const response = await fetch(attachment.file);
        attachment.file = await response.blob();
      } else if (!(attachment.file instanceof Blob))
        throw new Error('Invalid file type provided. Must be a Blob or a valid media URL.');
  
      form.append(`files[${params.attachments.indexOf(attachment)}]`, attachment.file, attachment.filename);
    }
    
    params.attachments = params.attachments.map((/** @type {{ filename: string, description: string }} */ a, /** @type {number} */ index) => ({
      id: index,
      filename: a.filename,
      description: a.description || ''
    }));

    form.append('payload_json', JSON.stringify(params));

    const response = await fetch(`https://discord.com/api/v10/${path}`, {
      method,
      body: form,
      headers: {
        'Authorization': `Bot ${token('discord', 'discord')}`
      }
    });

    if (!response.ok)
      throw new ResponseError(await response.json(), response, 'discord_error');

    return response.json();
    
  } catch (e) {
    throw e;
  }
}

/**
 * API Handler Creator
 * @param {Object} options
 * @param {Method} options.method
 * @param {string} options.endpoint
 * @param {string} options.handler
 * @param {Headers} [options.headers]
 * @param {Object} [options.body]
 * @param {boolean} [options.oauth]
 * @param {string[]} [options.scope]
 * @param {string} [options.message]
 * @param {any} [options.payload]
 * @param {string} [options.type]
 * @param {'json'|'text'|'arrayBuffer'|'blob'|'formData'} [options.response_type]
 * @returns {Promise<*>}
 * @private
 */
async function handler(options) {
  try {

    /** @type {[string, string][]} */
    const _headers = [
      ['Content-Type', `${options.type === 'content' ? 'text/plain' : 'application/json; charset=UTF-8'}`]
    ];
    // console.log(options);
    
    /**
     * @type {{[x: string]: {url: string, auth: string, header?: [string, string]}}}
     */
    const handlers = {
      spotify: {
        url: 'https://api.spotify.com/v1',
        auth: !options.oauth
          ? `Bearer ${await spotifyAccessToken()}`
          : `Bearer ${await oauthToken('Spotify', options.handler, options.scope)}`
      },
      slack: {
        url: 'https://slack.com/api',
        auth: !options.oauth
          ? `Bearer ${token('slack', options.handler)}`
          : `Bearer ${await oauthToken('Slack', options.handler, options.scope)}`
      },
      openai: {
        url: 'https://api.openai.com/v1',
        auth: `Bearer ${token('openai', options.handler)}`
      },
      dropbox: {
        url: `https://${options.type === 'content' ? 'content' : 'api'}.dropboxapi.com`,
        auth: `Bearer ${await oauthToken('Dropbox', options.handler, options.scope)}`,
        header: options.type === 'content' ? [
          'Dropbox-API-Arg', JSON.stringify(options.body)
        ] : undefined
      },
      box: {
        url: 'https://api.box.com/2.0',
        auth: `Bearer ${await oauthToken('Box', options.handler, options.scope)}`
      },
      paypal: {
        url: 'https://api-m.sandbox.paypal.com',
        auth: `Basic ${await paypalAccessToken()}`
      }
    };
    
    const { url, auth, header = undefined } = handlers[options.handler];
    // console.log('auth in handler():', auth);

    if (header)
      _headers.push(header);
    _headers.push(['Authorization', auth]);
    
    return https({
      method: options.method,
      url: `${url}/${options.endpoint}`,
      headers: new Headers(_headers),
      ...(options.body && {
        body: options.type !== 'content' ? options.body : ''
      }),
      message: options.message ?? '',
      payload: options.payload ?? '',
      response_type: options.response_type ?? undefined
    });

  } catch (error) {
    throw error;
  }
}

/**
 * API Handler Creator
 * @param {Object} options
 * @param {Method} options.method
 * @param {string} options.endpoint
 * @param {Headers} [options.headers]
 * @param {Object} [options.body]
 * @param {string} [options.type]
 * @returns {Promise<*>}
 * @private
 */
async function paypalHandler(options) {
  try {
    
    const headers = options.headers ?? new Headers();
    headers.set('Authorization', `Basic ${await paypalAccessToken()}`);

    return https({
      method: options.method,
      url: `https://api-m.sandbox.paypal.com/${options.endpoint}`,
      headers,
      ...(options.body && { body: options.body })
    });

  } catch (error) {
    throw error;
  }
}


// ////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////// TOKEN MANAGEMENT //////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////


/**
 * @param {boolean} refresh 
 * @returns {Promise<string>}
 */
async function paypalAccessToken(refresh = false) {
  const oldToken = await get('paypalAuth') || {};
  if (!oldToken || oldToken?.expires <= Date.now()) {
    if (refresh) { /*console.log('refresh === true');*/ }
    else oldToken.access_token = await paypalAccessToken(true);
    // console.log('refresh2:', refresh);
  }

  if (oldToken?.access_token) return oldToken.access_token;

  const credentials = require('../../Api').get_paypal_token();
  if (!credentials && !process.env.paypal_client_id && !process.env.paypal_secret_key)
    throw new Error('PayPal credentials not set');
  
  const client_id = credentials?.client_id || process.env.paypal_client_id;
  const secret_key = credentials?.secret_key || process.env.paypal_secret_key;

  const newToken = await https({
    method: 'POST',
    url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${client_id}:${secret_key}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  await set({
    key: 'paypalAuth',
    value: {
      access_token: newToken?.access_token,
      app_id: newToken?.app_id,
      expires: Date.now() + 32400000,
      scope: newToken?.scope,
      nonce: newToken?.nonce
    }
  });

  return newToken.access_token;
}

/**
 * 
 * @returns {Promise<string>}
 */
async function spotifyAccessToken() {
  const credentials = require('../../Api').get_spotify_token();
  if (!credentials) throw new Error(
    'Spotify credentials not set. Please initialize the library first.'
  );
  
  return (await https({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // @ts-ignore
    body: new URLSearchParams({
      client_id: credentials.client_id || process.env.spotify_client_id,
      client_secret: credentials.client_secret || process.env.spotify_client_secret,
      grant_type: 'client_credentials'
    }).toString()
  }))?.access_token;
}

/**
 * @param {string} type
 * @param {string} handler
 * @returns {string|undefined}
 */
function token(type, handler) {
  if (!/discord|slack|openai/.test(type)) return;
  if (type !== handler) return;
  const api = require('../../Api');

  /**
   * @type {{ [type: string]: { getToken: () => string|undefined, env: string, errorMessage: string}}}
   */
  const tokenTypes = {
    discord: {
      getToken: api.get_discord_token,
      env: 'token',
      errorMessage: 'Discord Bot token not set. Please initialize the library first.'
    },
    slack: {
      getToken: () => api.get_slack_token()?.bot,
      env: 'slack_bot_token',
      errorMessage: 'Slack token not set. Please initialize the library first.'
    },
    openai: {
      getToken: api.get_openai_token,
      env: 'openai_api_key',
      errorMessage: 'OpenAI API key not set. Please initialize the library first.'
    }
  };

  const { getToken, errorMessage, env } = tokenTypes[type] || {};

  const token = (getToken && getToken()) || process.env[env] || null;
  if (!token) throw new Error(errorMessage);
  
  return token;
}

/**
 * 
 * @param {'Slack' | 'Spotify' | 'Dropbox' | 'Box'} type
 * @param {string} handler
 * @param {string[]} [scope]
 * @param {string} [service]
 * @returns 
 */
async function oauthToken(type, handler, scope, service = type.toLowerCase()) {
  if (service !== handler) return;
  const api = require('../../Api');
  const oauth2 = require(`../${service}/oauth2`);
  const token = await get(`${service}Auth`);
  
  // console.log(type + ' token in oauthToken():', token);

  if (token && token.expires <= Date.now())
    token.access_token = await oauth2.refresh();

  if (scope && scope.length) {
    const scopes = [];
    for (const _scope of scope)
      if (!token?.scope?.includes(_scope))
        scopes.push(_scope);
          
    if (scopes.length)
      throw new ResponseError(null, null, `${service}_error`, `Your app does not have the required scopes: \`${scopes.join(scopes.length > 1 ? ',' : '')}\``);
  }
  
  if (token?.access_token) return token.access_token;
  

  // @ts-ignore
  const credentials = api[`get_${service}_token`]();
  // console.log('credentials in oauthToken():', credentials);
  if (!credentials?.access_token && !credentials?.user && !process.env[`${service}_access_token`] && !process.env[`${service}_user_token`])
    throw await oauth2.authorize();

  return credentials?.access_token ?? credentials?.user ?? process.env[`${service}_access_token`] ?? process.env[`${service}_user_token`];
}

/**
 * @param {'Slack' | 'Spotify' | 'Box' | 'Dropbox'} type
 * @param {Object} [params]
 * @param {string} [params.channel_id]
 */
async function authorize(type, params) {
  const api = require('../../Api');
  const { buildQueryString } = require('./functions');
  const service = type.toLowerCase();

  /** @type {{[x: string]: {[x: string]: string}}} */
  const configs = {
    dropbox: {
      url: 'https://dropbox.com/oauth2/authorize',
      scope: 'account_info.read account_info.write contacts.read contacts.write file_requests.read file_requests.write files.content.read files.content.write files.metadata.read files.metadata.write sharing.read sharing.write'
    },
    slack: {
      url: 'https://slack.com/openid/connect/authorize',
      scope: 'openid profile email'
    },
    spotify: {
      url: 'https://accounts.spotify.com/authorize',
      scope: 'user-read-email user-read-private user-library-read user-library-modify user-top-read user-read-recently-played user-read-playback-position user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public app-remote-control streaming user-read-playback-state user-modify-playback-state user-read-currently-playing ugc-image-upload'
    },
    box: {
      url: 'https://account.box.com/api/oauth2/authorize'
    }
  };

  // @ts-ignore
  const credentials = api[`get_${service}_token`]();
  if ((!credentials || !credentials.redirect_uri) && !process.env[`${type}_redirect_uri`])
    throw new Error(type + ' redirect_uri not set');

  const client_id = credentials?.client_id ?? process.env[`${type}_client_id`],
    redirect_uri = credentials?.redirect_uri ?? process.env[`${type}_redirect_uri`],
    scope = credentials?.scope ?? process.env[`${type}_scope`] ?? configs[service].scope,
    team_id = credentials?.team_id ?? process.env[`${type}_team_id`];
  
  const authString = `Please authorize your ${type} application`;
  const url = buildQueryString(configs[service].url, {
    response_type: 'code',
    client_id,
    redirect_uri,
    team_id,
    scope,
    token_access_type: service === 'dropbox' ? 'offline' : undefined
  });
  
  return params?.channel_id
    ? await api.discord.channels.messages.create({
      channel_id: params.channel_id,
      content: `**[${authString}](${url})**`
    })
    : `${authString}: ${url}`;
}

/**
 * 
 * @param {'dropbox'|'spotify'|'slack'|'box'} type 
 * @returns 
 */
async function refresh(type) {
    
  // @ts-ignore
  const credentials = require('../../Api')[`get_${type}_token`]();
  const token = await get(`${type}Auth`);

  /** @type {{[x: string]: {[x: string]: string}}} */
  const configs = {
    dropbox: {
      url: 'https://api.dropboxapi.com/oauth2/token',
      scope: 'account_info.read account_info.write contacts.read contacts.write file_requests.read file_requests.write files.content.read files.content.write files.metadata.read files.metadata.write sharing.read sharing.write'
    },
    spotify: {
      url: 'https://accounts.spotify.com/api/token',
      scope: 'user-read-email user-read-private user-library-read user-library-modify user-top-read user-read-recently-played user-read-playback-position user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public app-remote-control streaming user-read-playback-state user-modify-playback-state user-read-currently-playing ugc-image-upload'
    },
    box: {
      url: 'https://account.box.com/api/oauth2/token'
    }
  };

  /**
   * @type {{grant_type: string, client_id: string|undefined, refresh_token: string|undefined, client_secret?: string, }}
   */
  const searchParams = {
    grant_type: 'refresh_token',
    client_id: credentials?.client_id ?? process.env[`${type}_client_id`],
    refresh_token: token.refresh_token
  };

  /** @type {{[x: string]: string}} */
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  if (type !== 'spotify')
    searchParams.client_secret = credentials?.client_secret ?? process.env[`${type}_client_secret`];
  else
    // @ts-ignore
    headers.Authorization = 'Basic ' + (new Buffer.from((credentials?.client_id || process.env.spotify_client_id) + ':' + (credentials?.client_secret || process.env.spotify_client_secret)).toString('base64'));
  
  const refresh = await https({
    method: 'post',
    url: configs[type].url,
    headers,
    // @ts-ignore
    body: new URLSearchParams(searchParams)
  });

  await set({
    key: `${type}Auth`,
    value: {
      access_token: refresh?.access_token,
      refresh_token: type !== 'slack' ? (refresh?.refresh_token ?? token?.refresh_token) : undefined,
      expires: type !== 'slack' ? Date.now() + (type === 'dropbox' ? 14400000 : 3600000) : undefined,
      restricted_to: type !== 'box' ? refresh?.restricted_to : undefined,
      scope: refresh?.scope ?? credentials?.scope ?? configs[type].scope
    }
  });

  return refresh.access_token;
}

module.exports = {
  handler,
  attemptHandler,
  paypalHandler,
  sendAttachment,

  token,
  oauthToken,
  authorize,
  refresh
};