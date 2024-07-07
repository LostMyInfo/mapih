/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable brace-style */
// @ts-check
/**
 * @global
 * @typedef {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} Method
 */

const { https } = require('../utils/https');
const { ResponseError } = require('./Errors');
const { writeFile, readFile } = require('fs/promises');

/**
 * @param {string} key
 * @param {Array<any>} file
 * @returns {any}
 */
const find = (key, file) => file?.find((e) => e.key === key);

/**
 * API Handler Creator
 * @param {Object} params
 * @param {Method} params.method
 * @param {string} params.endpoint
 * @param {Object} [params.body]
 * @param {?string} [params.reason]
 * @param {any | undefined} [discord_params]
 * @returns {Promise<*>}
 * @private
 */
async function attemptHandler(params, discord_params) {
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
      body: params.body ? JSON.stringify(params.body) : '',
      discord_params
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
  const { isValidMedia, removeFalsyFromObject } = require('./functions');
  try {
    const form = new FormData();

    for (const attachment of params.attachments) {
      if (!attachment.file)
        throw new Error('You must provide a \'file\' property in the attachment object.');

      if (!attachment.filename)
        throw new Error('You must provide a \'filename\' property in the attachment object.');

      if (typeof attachment.file === 'string' && await isValidMedia(attachment.file)) {
        const response = await fetch(attachment.file);
        attachment.file = await response.blob();
      } else if (!(attachment.file instanceof Blob) && !(attachment.file instanceof Buffer))
        throw new Error('Invalid file type provided. Must be a Blob, Buffer, or a valid media URL.');

      form.append(
        `files[${params.attachments.indexOf(attachment)}]`,
        attachment.file instanceof Blob ? attachment.file : new Blob([attachment.file]),
        attachment.filename
      );
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
 * @typedef {Object} AccessToken
 * @property {string} [access_token]
 * @property {string} [refresh_token]
 * @property {string} [token_type]
 * @property {string} [token_access_type]
 * @property {number} [expires_in]
 * @property {number} [expires]
 * @property {string} [scope]
 * @property {string} [uid]
 * @property {string} [account_id]
 */

/**
 * @typedef {Object} HandlerConfig
 * @property {string} [url]
 * @property {string} [contentUrl]
 * @property {(() => Promise<string|undefined>)} [auth]
 * @property {HeadersInit} [extraHeaders]
 * @property {FormData} [formdata]
 */

/**
 * @typedef {Object} HandlerOptions
 * @property {Method} options.method
 * @property {string} options.endpoint
 * @property {string} options.handler
 * @property {Headers} [options.headers]
 * @property {{[key: string]: any}} [options.body]
 * @property {boolean} [options.oauth]
 * @property {string[]} [options.scope]
 * @property {string} [options.message]
 * @property {string} [options.errorMessage]
 * @property {string} [options.hint]
 * @property {any} [options.payload]
 * @property {string} [options.content_type]
 * @property {boolean} [options.dropbox_content]
 * @property {any} [options.file]
 * @property {FormData} [options.formdata]
 * @property {string} [options.googleEndpoint]
 * @property {'json'|'text'|'arrayBuffer'|'blob'|'formData'} [options.response_type]
 * @property {string} [options.auth_type]
 * @property {string} [options.parameters]
 */

/**
 * @param {HandlerOptions} options
 * @returns {Promise<*>}
 */
async function handler(options) {
  // console.log('handler called with options:', JSON.stringify(options, null, 2));

  try {
    if (!options.handler) return;

    const
      // accessToken = await getAccessToken(options),
      handlerConfig = await getHandlerConfig(options);

    // console.log('\nhandlerConfig:', JSON.stringify(handlerConfig, (key, value) =>
    // key === 'auth' ? 'async function' : value, 2
    // ));

    // const authHeader = handlerConfig.auth ? await handlerConfig.auth() : undefined;
    // console.log(`\nAuth header obtained: ${authHeader ? 'Yes' : 'No'}`);

    const
      url = buildUrl(options, handlerConfig),
      headers = await buildHeaders(options, handlerConfig),
      body = buildBody(options);

    // console.log('\nfinal url in handler():', url);
    // console.log('\nfinal headers in handler():', headers);
    // console.log('\nfinal body in handler():', body);

    const
      response = await https({
        method: options.method,
        url,
        headers,
        ...(body && { body }),
        formdata: handlerConfig.formdata,
        message: options.message || '',
        errorMessage: options.errorMessage || '',
        hint: options.hint || '',
        payload: options.payload || '',
        response_type: options.response_type,
        file: options.file
      });

    return options.handler === 'imgur' ? response.data : response;

  } catch (/** @type {any} */ error) {
    if (error.message?.includes('expired') || error.authorize) {
      const handlerName = (error.authorize ?? options.handler).charAt(0).toUpperCase() + options.handler.slice(1);
      return await authorize(handlerName, null);
    }
    throw error;
  }
}

/**
 * @param {HandlerOptions} options
 * @returns {Promise<HandlerConfig>}
 */
async function getHandlerConfig(options) {

  // console.log('\nhandler in getHandlerConfig():', options.handler);

  const isGoogle = /drive|places|sheets|youtube/i.test(options.handler);

  /** @type {AccessToken|string|undefined} */
  let access_token;
  try {
    access_token = await getTokens((options.handler === 'spotify' && !options.oauth) ? 'spotifyAccessToken' : `${isGoogle ? 'google' : options.handler}Auth`);
    // console.log(`\naccess_token after getTokens() in getHandlerConfig(): ${access_token ? 'obtained' : 'not obtained'}`);
  } catch (error) {
    console.error('Error in getTokens:', error);
    throw error;
  }

  if (typeof access_token !== 'string' && ((access_token?.expires && access_token?.expires <= Date.now()) || (!access_token?.access_token && access_token?.refresh_token))) {
    try {
      access_token.access_token = await refresh(!isGoogle ? options.handler : 'google', isGoogle ? 'drive' : undefined);
      console.log(`\naccess_token after refresh() in getHandlerConfig(): ${access_token.access_token ? 'obtained' : 'not obtained'}`);
    } catch (error) {
      console.error('Error in refresh:', error);
      throw error;
    }
  }

  access_token = typeof access_token === 'string' ? access_token : access_token?.access_token;

  // console.log(`\nFinal access_token in getHandlerConfig(): ${access_token ? 'obtained' : 'not obtained'}`);

  /**
   * @type {HandlerConfig}
   */
  let config;

  switch (options.handler) {
  case 'anthropic':
    config = {
      url: 'https://api.anthropic.com/v1',
      extraHeaders: {
        'anthropic-version': '2023-06-01',
        'x-api-key': token('anthropic', 'anthropic')
      }
    };
    break;
  case 'spotify':
    config = {
      url: 'https://api.spotify.com/v1',
      auth: async () => `Bearer ${
        // access_token ?? (options.oauth ? await oauthToken('Spotify', options.handler, options.scope) : await spotifyAccessToken())
        options.oauth ? (access_token ?? (await oauthToken('Spotify', options.handler, options.scope))) : await spotifyAccessToken()
      }`
    };
    break;
  case 'imgur':
    config = {
      url: 'https://api.imgur.com/3',
      auth: async () => `${options.oauth ? 'Bearer' : 'Client-ID'} ${options.oauth ? (access_token ?? (await oauthToken('Imgur', options.handler, options.scope))) : token('imgur', options.handler)}`
    };
    break;
  case 'slack':
    config = {
      url: 'https://slack.com/api',
      auth: async () => `Bearer ${
        // access_token ?? (options.oauth ? await oauthToken('Slack', options.handler, options.scope) : token('slack', options.handler))
        options.oauth ? (access_token ?? (await oauthToken('Slack', options.handler, options.scope))) : token('slack', options.handler)
      }`
    };
    break;
  case 'twitter':
    config = {
      url: 'https://api.twitter.com/2',
      auth: async () =>
        !options.auth_type
          ? `Bearer ${access_token ?? await oauthToken('Twitter', options.handler, options.scope)}`
          : options.auth_type === 'user'
            ? createOAuthSignature('twitter', options.method, 'https://api.twitter.com/2/' + options.endpoint)
            : undefined
    };
    break;
  case 'youtube':
    config = {
      url: `https://www.googleapis.com/youtube/v3/${options.googleEndpoint}?key=${token('google', options.handler)}`,
      auth: async () => `Bearer ${
        // access_token ?? (options.oauth ? await oauthToken('Google', options.handler, options.scope) : undefined)
        options.oauth ? (access_token ?? (await oauthToken('Google', options.handler, options.scope))) : undefined
      }`
    };
    break;
  case 'drive':
    config = {
      url: 'https://www.googleapis.com/drive/v3',
      auth: async () => `Bearer ${access_token ?? await oauthToken('Google', options.handler, ['drive'])}`
    };
    break;
  case 'places':
    config = {
      url: 'https://places.googleapis.com/v1', // ${options.googleEndpoint}?key=${token('google', 'google')}`,
      auth: undefined, // async () => `Bearer ${access_token ?? await oauthToken('Google', options.handler)}`
      extraHeaders: { 'X-Goog-Api-Key': token('google', 'google') }
    };
    break;
  case 'sheets':
    config = {
      url: 'https://sheets.googleapis.com/v4',
      auth: async () => `Bearer ${access_token ?? await oauthToken('Google', options.handler, ['drive'])}`
    };
    break;
  case 'box':
    config = {
      url: 'https://api.box.com/2.0',
      auth: async () => `Bearer ${access_token ?? await oauthToken('Box', options.handler, options.scope)}`
    };
    break;
  case 'paypal':
    config = {
      url: 'https://api-m.sandbox.paypal.com',
      auth: async () => `Basic ${access_token ?? await paypalAccessToken()}`
    };
    break;
  case 'promptPerfect':
    config = {
      url: 'https://api.promptperfect.jina.ai',
      auth: async () => `token ${token('promptPerfect', options.handler)}`
    };
    break;
  case 'openai':
    config = {
      url: 'https://api.openai.com/v1',
      auth: async () => `Bearer ${access_token ?? token('openai', options.handler)}`
    };
    break;
  case 'dropbox':
    // (({ file, ...new_body } = body)).file
    const { file, ...new_body } = options.body || {};
    config = {
      url: 'https://api.dropboxapi.com',
      contentUrl: 'https://content.dropboxapi.com',
      extraHeaders: options.dropbox_content ? {
        'Dropbox-API-Arg': JSON.stringify(new_body)
      } : {},
      auth: async () => {
        // console.log('\nDropbox auth function called');
        const token = access_token ?? await oauthToken('Dropbox', 'dropbox', options.scope);
        // console.log('\nDropbox token:', token);
        // console.log(`Dropbox token obtained: ${token ? 'Yes' : 'No'}`);
        return `Bearer ${token}`;
      }
    };
    break;
  default:
    config = {};
  }

  /*
  console.log(`\nReturning config for ${options.handler}:`, JSON.stringify(config, (key, value) =>
    (key === 'auth' ? 'async function' : value), 2
  ));
  */

  return {
    url: config.url,
    auth: config.auth,
    extraHeaders: new Headers(config.extraHeaders),
    contentUrl: config.contentUrl
  };
}

/**
 * @param {HandlerOptions} options
 * @param {HandlerConfig} handlerConfig
 * @returns {string}
 */
function buildUrl(options, handlerConfig) {
  const baseUrl = options.dropbox_content
    ? handlerConfig.contentUrl || handlerConfig.url
    : handlerConfig.url;

  if (/youtube/i.test(options.handler))
    return `${baseUrl}&${options.endpoint}`;

  const endpoint = !options.auth_type || options.auth_type !== 'user'
    ? options.endpoint
    : `${options.endpoint}${options.parameters || ''}`;

  return `${baseUrl}/${endpoint}`;
}

/**
 * @param {HandlerOptions} options
 * @param {HandlerConfig} handlerConfig
 * @returns {Promise<Headers|undefined>}
 */
async function buildHeaders({ content_type, formdata, headers }, { auth = undefined, extraHeaders = {} }) {
  const headersInstance = new Headers();

  // Set base headers
  if (!formdata && !headers?.has('Content-Type'))
    headersInstance.set('Content-Type', content_type ?? 'application/json; charset=UTF-8');

  if (auth) {
    const authValue = await auth();
    if (!authValue) return;
    headersInstance.set('Authorization', authValue);
  }

  for (const [key, value] of Object.entries(extraHeaders))
    headersInstance.set(key, String(value));

  if (headers)
    for (const [key, value] of Object.entries(headers))
      headersInstance.set(key, String(value));

  return headersInstance;
}

/**
 * @param {HandlerOptions} options
 * @returns {FormData|string|null|{[x: string]: any}|undefined}
 */
function buildBody({ body = undefined, formdata = undefined, content_type = undefined, dropbox_content = false, file }) {
  if (formdata) return formdata;
  if (!body && !file) return null;

  // combine?
  if (content_type === 'text/plain' || content_type === 'stream' || (dropbox_content && !file)) return '';

  // do type conversion if needed here
  if (dropbox_content && file) return file;
  if (typeof body === 'object' && !(body instanceof ArrayBuffer)) return JSON.stringify(body);
  return body;
}

/**
 * @param {any} error
 * @param {HandlerOptions} options
 * @returns
 */
async function handleError(error, options) {
  if (error.message?.includes('expired') || error.authorize) {
    const handlerName = (error.authorize ?? options.handler).charAt(0).toUpperCase() + options.handler.slice(1);
    return await authorize(handlerName, null);
  }
  throw error;
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
  const oldToken = await getTokens('paypalAuth') || {};
  if (!oldToken || oldToken?.expires <= Date.now()) {
    if (refresh) { /* console.log('refresh === true');*/ }
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

  await setTokens({
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
 * @returns {Promise<string>}
 */
async function spotifyAccessToken() {
  const token = await getTokens('spotifyAccessToken');
  if (token) return token;


  const credentials = require('../../Api').get_spotify_token();
  if (!credentials) throw new Error(
    'Spotify credentials not set. Please initialize the library first.'
  );
  const access_token = (await https({
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

  if (access_token)
    await setTokens({
      key: 'spotifyAccessToken',
      value: access_token
    });

  return access_token;
}

/**
 * @param {string} type
 * @param {string} handler
 * @param {string} [variable]
 * @returns {string}
 */
function token(type, handler, variable) {
  if (!/discord|slack|openai|anthropic|google|imgur|promptPerfect|twitter/.test(type)) return '';
  if (type !== handler) return '';


  const api = require('../../Api');

  /**
   * @type {{ [tokenType: string]: { getToken: () => string|undefined, env: string, errorMessage: string}}}
   */
  const tokenTypes = {
    discord: {
      getToken: () => api.get_discord_token(),
      env: 'token',
      errorMessage: 'Discord Bot token not set. '
    },
    slack: {
      getToken: () => api.get_slack_token()?.bot,
      env: 'slack_bot_token',
      errorMessage: 'Slack token not set. '
    },
    imgur: {
      getToken: () => api.get_imgur_token()?.client_id,
      env: 'imgur_client_id',
      errorMessage: 'Imgur client_id not set. '
    },
    openai: {
      getToken: () => api.get_openai_token(),
      env: 'openai_api_key',
      errorMessage: 'OpenAI API key not set. '
    },
    anthropic: {
      getToken: () => api.get_anthropic_token(),
      env: 'anthropic_api_key',
      errorMessage: 'Anthropic API key not set. '
    },
    google: {
      getToken: () => api.get_google_token()?.api_key,
      env: 'google_api_key',
      errorMessage: 'Google API key not set. '
    },
    twitter: {
      getToken: () => {
        const twitterToken = api.get_twitter_token();
        return variable && twitterToken ? twitterToken[variable] : undefined;
      },
      env: 'twitter_' + variable,
      errorMessage: 'Twitter ' + variable + ' not set.'
    },
    promptPerfect: {
      getToken: () => api.get_prompt_perfect_token(),
      env: 'prompt_perfect_api_key',
      errorMessage: 'Prompt Perfect API key not set'
    }
  };

  const tokenConfig = tokenTypes[type];
  if (!tokenConfig) throw new Error(`Unsupported token type: ${type}`);

  const
    { getToken, errorMessage, env } = tokenConfig,
    token = getToken() ?? process.env[env] ?? null;


  // const token = (getToken && getToken()) || process.env[env] || null;
  // console.log('\ntoken in token():', token, '\n');

  if (!token) throw new Error(errorMessage + 'Please initialize the library first.');
  return token;
}

/**
 *
 * @param {'Slack' | 'Spotify' | 'Dropbox' | 'Box' | 'Google' | 'Imgur' | 'Twitter'} type
 * @param {string} handler
 * @param {string[]} [scope]
 * @param {string} [service]
 * @returns
 */
async function oauthToken(type, handler, scope, service = type.toLowerCase()) {
  // console.log(`oauthToken called with:\ntype: ${type}, handler: ${handler}, service: ${service}`);
  if ((service !== handler) && (type === 'Google' && !/youtube|drive|places|sheets/i.test(handler))) return;

  const token = await getTokens(`${service}Auth`);

  // console.log(type + ' token in oauthToken():', token);

  if (token) {
    // console.log('token in oauthToken():', token);
    if (token.expires <= Date.now())
      token.access_token = await refresh(service, scope?.[0]);
    if (token.access_token) return token.access_token;
    if (scope?.length) {
      const missingScopes = scope.filter((s) => !token.scope?.includes(s));

      if (missingScopes.length)
        throw new ResponseError(null, null, `${service}_error`, {
          error: `Your app does not have the required scopes: \`${missingScopes.join(missingScopes.length > 1 ? ', ' : '')}\``
        });
    }
  }

  const credentials = getCredentials(service);
  // console.log('credentials from oauth()', credentials);
  if (!credentials?.access_token && !credentials?.user && /* !process.env[`${service}_access_token`] && */ !process.env[`${service}_user_token`])
    throw await authorize(type, null, handler);

  // console.log('credentials?.access_token || credentials?.user || process.env[`${service}_access_token`] || process.env[`${service}_user_token`]:', credentials?.access_token || credentials?.user || process.env[`${service}_access_token`] || process.env[`${service}_user_token`]);
  return credentials?.access_token || credentials?.user || process.env[`${service}_access_token`] || process.env[`${service}_user_token`];
}

/**
 * @param {string} service
 * @returns {any}
 */
function getCredentials(service) {
  const
    api = require('../../Api'),
    getTokenFunction = api[`get_${service}_token`];

  if (typeof getTokenFunction !== 'function')
    throw new Error(`No token function found for service: ${service}`);
  return getTokenFunction();
}

/**
 *
 * @param {string} service
 * @param {{client_id: string; redirect_uri: string; team_id?: string; scope?: string; code_verifier: string}} params
 * @returns
 */
function getQueryParams(service, { client_id, redirect_uri, team_id, scope, code_verifier }) {
  const baseParams = {
    response_type: 'code',
    client_id,
    redirect_uri,
    team_id,
    scope
  };

  /** @type {{[x: string]: any}} */
  const serviceSpecificParams = {
    dropbox: { token_access_type: 'offline' },
    google: { access_type: 'offline', include_granted_scopes: true },
    twitter: {
      state: generateRandomString(32),
      code_challenge: getCodeChallengeFromVerifier(code_verifier),
      code_challenge_method: 'S256'
    }
  };

  return { ...baseParams, ...serviceSpecificParams[service] };
}

/**
 * @param {string} type
 * @param {?{channel_id: string}} [params]
 * @param {string} [handler]
 * @param {string} [service]
 */
async function authorize(type, params, handler, service = type.toLowerCase()) {
  const
    api = require('../../Api'),
    { removeFalsyFromObject } = require('./functions'),
    querystring = require('querystring');

  // console.log('type:', type);
  // console.log('params:', params);
  // console.log('handler:', handler);
  // console.log('service:', service);
  /** @type {Record<string, { url: string, scope?: string}>} */
  const configs = {
    dropbox: {
      url: 'https://dropbox.com/oauth2/authorize',
      scope: defaultScope('dropbox') // 'account_info.read account_info.write contacts.read contacts.write file_requests.read file_requests.write files.content.read files.content.write files.metadata.read files.metadata.write sharing.read sharing.write'
    },
    slack: {
      url: 'https://slack.com/openid/connect/authorize',
      scope: 'openid profile email'
    },
    spotify: {
      url: 'https://accounts.spotify.com/authorize',
      scope: 'user-read-email user-read-private user-library-read user-library-modify user-top-read user-read-recently-played user-read-playback-position user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public app-remote-control streaming user-read-playback-state user-modify-playback-state user-read-currently-playing ugc-image-upload'
    },
    imgur: {
      url: 'https://api.imgur.com/oauth2/authorize'
    },
    twitter: {
      url: 'https://twitter.com/i/oauth2/authorize',
      scope: 'tweet.read tweet.write users.read offline.access space.read mute.read mute.write like.read like.write list.read list.write block.read block.write bookmark.read bookmark.write'
    },
    box: {
      url: 'https://account.box.com/api/oauth2/authorize'
    },
    google: {
      url: 'https://accounts.google.com/o/oauth2/v2/auth',
      scope: `https://www.googleapis.com/auth/${handler === 'sheets' ? 'drive' : handler}`
    }
  };

  const
    credentials = getCredentials(service),
    config = configs[service];
  if (!config) throw new Error(`Unsupported service: ${type}`);

  // if ((!credentials || !credentials.redirect_uri) && !process.env[`${service}_redirect_uri`])
  // throw new Error(type + ' redirect_uri not set');

  const
    client_id = (credentials?.client_id || process.env[`${service}_client_id`])?.trim(),
    redirect_uri = (credentials?.redirect_uri || process.env[`${service}_redirect_uri`])?.trim(),
    scope = (credentials?.scope || process.env[`${service}_scope`] || configs[service].scope)?.trim() || defaultScope(service),
    team_id = (credentials?.team_id || process.env[`${service}_team_id`])?.trim();

  if (!redirect_uri) throw new Error(`${type} redirect_uri not set`);
  const
    code_verifier = getCodeVerifier(),
    authString = `Please authorize your ${type} application`,
    queryParams = getQueryParams(service, {
      client_id,
      redirect_uri,
      team_id,
      scope,
      code_verifier
    }),
    url = `${config.url}?${querystring.stringify(removeFalsyFromObject(queryParams))}`;

  /*
    url = `${configs[service].url}?` + require('querystring').stringify(removeFalsyFromObject({
      response_type: 'code',
      client_id,
      redirect_uri,
      team_id,
      scope,
      token_access_type: service === 'dropbox' ? 'offline' : undefined,
      access_type: service === 'google' ? 'offline' : undefined,
      include_granted_scopes: service === 'google' ? true : undefined,
      state: service === 'twitter' ? generateRandomString(32) : undefined,
      code_challenge: service === 'twitter' ? getCodeChallengeFromVerifier(code_verifier) : undefined,
      code_challenge_method: service === 'twitter' ? 'S256' : undefined
    }));
    */

  if (service === 'twitter') {
    const { code_verifier: verifier = undefined, ...value } = await getTokens('twitterAuth') || {};
    await setTokens({ key: 'twitterAuth', value: { code_verifier, ...value } });
  }

  return params?.channel_id
    ? await api.discord.channels.messages.create({
      channel_id: params.channel_id,
      content: `**[${authString}](${url})**`
    })
    : `\n${authString}:\n${url}`;
}

/**
 * @param {string} type
 * @param {string} [google]
 * @returns {Promise<string|undefined>}
 */
async function refresh(type, google) {

  // console.log(`refresh called with type: ${type}, google: ${google}`);
  const
    { removeFalsyFromObject } = require('./functions'),
    credentials = require('../../Api')[`get_${type}_token`](),
    token = await getTokens(`${type}Auth`);

  /** @type {Record<string, { url: string, scope?: string}>} */
  const
    configs = {
      dropbox: {
        url: 'https://api.dropboxapi.com/oauth2/token',
        scope: defaultScope('dropbox') // 'account_info.read account_info.write contacts.read contacts.write file_requests.read file_requests.write files.content.read files.content.write files.metadata.read files.metadata.write sharing.read sharing.write'
      },
      spotify: {
        url: 'https://accounts.spotify.com/api/token',
        scope: defaultScope('spotify') // 'user-read-email user-read-private user-library-read user-library-modify user-top-read user-read-recently-played user-read-playback-position user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public app-remote-control streaming user-read-playback-state user-modify-playback-state user-read-currently-playing ugc-image-upload'
      },
      imgur: { url: 'https://api.imgur.com/oauth2/token' },
      twitter: {
        url: 'https://api.twitter.com/2/oauth2/token',
        scope: defaultScope('twitter') // 'tweet.read tweet.write users.read offline.access space.read mute.read mute.write like.read like.write list.read list.write block.read block.write bookmark.read bookmark.write'
      },
      box: { url: 'https://account.box.com/api/oauth2/token' },
      google: {
        url: 'https://oauth2.googleapis.com/token',
        scope: `https://www.googleapis.com/auth/${google}`
      }
    },
    config = configs[type];
  if (!config) throw new Error(`Unsupported service: ${type}`);

  const
    searchParams = removeFalsyFromObject({
      grant_type: 'refresh_token',
      client_id: credentials?.client_id || process.env[`${type}_client_id`],
      refresh_token: token.refresh_token,
      client_secret: ['spotify', 'twitter'].includes(type.toLowerCase())
        ? undefined
        : credentials?.client_secret || process.env[`${type}_client_secret`]
    }),
    /** @type {HeadersInit & { Authorization?: string }} */
    headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  if (['spotify', 'twitter'].includes(type.toLowerCase())) {
    const
      client_id = credentials?.client_id || process.env[`${type}_client_id`],
      client_secret = credentials?.client_secret || process.env[`${type}_client_secret`];
    headers.set('Authorization', 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'));
    // headers.Authorization = 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  }

  try {
    const refresh = await https({
      method: 'post',
      url: config.url,
      headers,
      body: new URLSearchParams(searchParams)
    });

    if (refresh) {
      await setTokens({
        key: `${type}Auth`,
        value: {
          access_token: refresh?.access_token,
          refresh_token: type !== 'slack' ? (refresh?.refresh_token ?? token?.refresh_token) : undefined,
          expires: type !== 'slack' ? Date.now() + (type === 'dropbox' ? 14400000 : 3600000) : undefined,
          restricted_to: type !== 'box' ? refresh?.restricted_to : undefined,
          scope: refresh?.scope ?? credentials?.scope ?? configs[type].scope,
          token_access_type: type === 'dropbox' ? 'offline' : undefined,
          access_type: type === 'google' ? 'offline' : undefined,
          include_granted_scopes: type === 'google' ? true : undefined,
          account_username: type === 'imgur' ? refresh?.account_username : undefined
        }
      });

      return refresh.access_token;
    }

  } catch (/** @type {any} */ error) {
    // console.log('error.message in refresh() (use for authorize())', error.message);
    console.log('Error in refresh():\n', error);

    if (error.message === 'Imgur is temporarily over capacity. Please try again later.')
      throw error;

    throw await authorize(type.charAt(0).toUpperCase() + type.slice(1), null);
  }
}

/**
 * @param {string} service
 * @returns {string|undefined}
 */
function defaultScope(service) {
  return {
    spotify: 'user-read-email user-read-private user-library-read user-library-modify user-top-read user-read-recently-played user-read-playback-position user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public app-remote-control streaming user-read-playback-state user-modify-playback-state user-read-currently-playing ugc-image-upload',
    twitter: 'tweet.read tweet.write tweet.moderate.write users.read follows.read follows.write offline.access space.read mute.read mute.write like.read like.write list.read list.write block.read block.write bookmark.read bookmark.write',
    dropbox: 'account_info.read account_info.write contacts.read contacts.write file_requests.read file_requests.write files.content.read files.content.write files.metadata.read files.metadata.write sharing.read sharing.write'
    // google: `https://www.googleapis.com/auth/${google}`
    // others
  }[service];
}

/**
 * @param {string} handler
 * @param {string} method
 * @param {string} url
 */
function createOAuthSignature(handler, method, url) {
  const crypto = require('crypto');

  /** @type {{[key: string]: any}} */
  const oauthParameters = {
    oauth_consumer_key: token(handler, handler, 'api_key'),
    oauth_nonce: crypto.randomBytes(32).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_token: token(handler, handler, 'access_token'),
    oauth_version: '1.0'
  };
  console.log('parameters:', oauthParameters);

  // const combinedParameters = { ...oauthParameters, ...parameters };
  /*
  const parameterString = Object.keys(combinedParameters)
    .sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(combinedParameters[key])}`)
    .join('&');
  */
  const parameterString = Object.keys(oauthParameters).sort().map(key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(oauthParameters[key])}`;
  }).join('&');

  console.log('\nparameterString:', parameterString);

  const signatureBaseString = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(parameterString)
  ].join('&');
  console.log('\nsignatureBaseString:', signatureBaseString);

  const signingKey = [
    encodeURIComponent(token(handler, handler, 'api_secret')),
    encodeURIComponent(token(handler, handler, 'access_token_secret'))
  ].join('&');
  console.log('\nsigningKey:', signingKey);

  const signature = crypto.createHmac('sha1', signingKey)
    .update(signatureBaseString)
    .digest('base64');
  console.log('\noauthSignature:', signature);

  oauthParameters['oauth_signature'] = signature;

  const authHeader = 'OAuth ' + Object.keys(oauthParameters).sort().map(key => {
    return `${encodeURIComponent(key)}="${encodeURIComponent(oauthParameters[key])}"`;
  }).join(', ');
  console.log('\nauthHeader:', authHeader);

  return authHeader;
}

/**
 * @param {string} key
 * @returns {Promise<?any>}
 */
const getTokens = async (key) => {
  // console.log(`getTokens called with key: ${key}`);
  return (find(key, await loadTokens()) || {}).value || null;
};

/**
 * @param {{key: string, value: any}} param0
 * @returns {Promise<void>}
 */
async function setTokens({ key, value }) {
  if (!key || !value) return;
  const tokens = await loadTokens();
  // console.log('value:', value);
  const oldValue = find(key, tokens);
  // console.log('oldvalue', oldValue);
  if (oldValue && (JSON.stringify(value) == JSON.stringify(oldValue.value))) return;
  const entry = { key, value: Object.fromEntries(Object.entries(value).filter(([_, v]) => v !== undefined)) };
  // console.log('entry:', entry);
  const index = tokens.findIndex((i) => i.key === find(key, tokens)?.key);
  if (index !== -1) tokens[index] = entry;
  else tokens.push(entry);

  try {
    await writeFile(process.cwd() + '/.tokens', JSON.stringify(tokens));
  } catch (e) {
    throw new Error('Unable to save token');
  }
}

/**
 * @param {Array<any>} tokens
 * @returns {Promise<Array<any>>}
 */
async function loadTokens(tokens = []) {
  try {

    // @ts-ignore
    tokens = JSON.parse(await readFile(process.cwd() + '/.tokens'));
  } catch (/** @type {any} */ error) {
    if (error.code === 'ENOENT')
      await writeFile(process.cwd() + '/.tokens', JSON.stringify([]));
    tokens = [];
  }
  return tokens;
}

/**
 * @param {number} length
 * @param {string} [text]
 * @returns {string}
 */
function generateRandomString(length, text = '') {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  for (let i = 0; i < length; i++)
    text += possible[Math.floor(Math.random() * possible.length)];
  return text;
}

/**
 * @param {string} string
 * @returns {string}
 */
function escapeBase64Url(string) {
  return string.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function getCodeVerifier() { return generateRandomString(128); };

/**
 * @param {string} verifier
 * @returns {string}
 */
function getCodeChallengeFromVerifier(verifier) {
  return escapeBase64Url(
    require('crypto')
      .createHash('sha256')
      .update(verifier)
      .digest('base64')
  );
}


module.exports = {
  handler,
  attemptHandler,
  paypalHandler,
  sendAttachment,

  token,
  oauthToken,
  authorize,
  refresh,

  getTokens,
  setTokens
};
