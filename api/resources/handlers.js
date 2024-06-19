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
  const { isValidMedia } = require('./functions');
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
 * API Handler Creator
 * @param {Object} options
 * @param {Method} options.method
 * @param {string} options.endpoint
 * @param {string} options.handler
 * @param {Headers} [options.headers]
 * @param {{[key: string]: any}} [options.body]
 * @param {boolean} [options.oauth]
 * @param {string[]} [options.scope]
 * @param {string} [options.message]
 * @param {string} [options.errorMessage]
 * @param {string} [options.hint]
 * @param {any} [options.payload]
 * @param {string} [options.type]
 * @param {boolean} [options.formdata]
 * @param {string} [options.googleEndpoint]
 * @param {'json'|'text'|'arrayBuffer'|'blob'|'formData'} [options.response_type]
 * @param {string} [options.auth_type]
 * @param {string | undefined} [options.parameters]
 * @returns {Promise<*>}
 * @private
 */
async function handler(options) {
  try {
    if (!options.handler) return;
    /*
    const getToken = async () => {
      const tokenName = options.handler === 'spotify' && options.oauth ? `${options.handler}Auth` : 'spotifyAccessToken';
      const { access_token } = await getTokens(tokenName) || {};

      console.log(`\naccess_token from handler\n ${access_token}`);
      return access_token;
    };

    const access_token = await getToken();
    */
    const google = /drive|places|sheets|youtube/i.test(options.handler);
    // console.log('Google service:', google);
    let access_token = await getTokens((options.handler === 'spotify' && !options.oauth) ? 'spotifyAccessToken' : `${google ? 'google' : options.handler}Auth`);

    // console.log('\naccess_token from handler()1:\n', access_token);

    if ((access_token && access_token?.expires <= Date.now()) || (!access_token?.access_token && access_token?.refresh_token))
      access_token.access_token = await refresh(!google ? options.handler : 'google', google ? 'drive' : undefined);

    access_token = typeof access_token === 'string' ? access_token : access_token?.access_token;
    // console.log('\naccess_token from handler()2\n', access_token);

    /**
     * @type {{url: string, auth?: (() => Promise<string>)|undefined, header?: string[]}|undefined}
     */
    // @ts-ignore
    const { url, auth = undefined, header = undefined } = {
      spotify: {
        url: 'https://api.spotify.com/v1',
        auth: async () => `Bearer ${
        // access_token ?? (options.oauth ? await oauthToken('Spotify', options.handler, options.scope) : await spotifyAccessToken())
          options.oauth ? (access_token ?? (await oauthToken('Spotify', options.handler, options.scope))) : await spotifyAccessToken()
        }`
      },
      imgur: {
        url: 'https://api.imgur.com/3',
        auth: async () => `${options.oauth ? 'Bearer' : 'Client-ID'} ${
          options.oauth ? (access_token ?? (await oauthToken('Imgur', options.handler, options.scope))) : token('imgur', options.handler)
        }`
      },
      slack: {
        url: 'https://slack.com/api',
        auth: async () => `Bearer ${
        // access_token ?? (options.oauth ? await oauthToken('Slack', options.handler, options.scope) : token('slack', options.handler))
          options.oauth ? (access_token ?? (await oauthToken('Slack', options.handler, options.scope))) : token('slack', options.handler)
        }`
      },
      openai: {
        url: 'https://api.openai.com/v1',
        auth: async () => `Bearer ${access_token ?? token('openai', options.handler)}`
      },
      anthropic: {
        url: 'https://api.anthropic.com/v1'
        // auth: async () => `Bearer ${access_token ?? token('anthropic', options.handler)}`
      },
      youtube: {
        url: `https://www.googleapis.com/youtube/v3/${options.googleEndpoint}?key=${token('google', options.handler)}`,
        auth: async () => `Bearer ${
        // access_token ?? (options.oauth ? await oauthToken('Google', options.handler, options.scope) : undefined)
          options.oauth ? (access_token ?? (await oauthToken('Google', options.handler, options.scope))) : undefined
        }`
      },
      twitter: {
        url: 'https://api.twitter.com/2',
        auth: async () =>
          !options.auth_type
            ? `Bearer ${access_token ?? await oauthToken('Twitter', options.handler, options.scope)}`
            : options.auth_type === 'user'
              ? createOAuthSignature('twitter', options.method, 'https://api.twitter.com/2/' + options.endpoint)
              : undefined
      },
      drive: {
        url: 'https://www.googleapis.com/drive/v3',
        auth: async () => `Bearer ${access_token ?? await oauthToken('Google', options.handler, ['drive'])}`
      },
      places: {
        url: 'https://places.googleapis.com/v1', // ${options.googleEndpoint}?key=${token('google', 'google')}`,
        auth: undefined // async () => `Bearer ${access_token ?? await oauthToken('Google', options.handler)}`
        /*
        header: [
          ['X-Goog-Api-Key', token('google', 'google')]
          // ['X-Goog-FieldMask', 'places.displayName']
        ]
        */
      },
      sheets: {
        url: 'https://sheets.googleapis.com/v4',
        auth: async () => `Bearer ${access_token ?? await oauthToken('Google', options.handler, ['drive'])}`
      },
      dropbox: {
        url: `https://${options.type === 'content' ? 'content' : 'api'}.dropboxapi.com`,
        auth: async () => `Bearer ${access_token ?? await oauthToken('Dropbox', options.handler, options.scope)}`
        /*
        header: options.type === 'content' ? [
          'Dropbox-API-Arg', JSON.stringify(options.body)
        ] : undefined
        */
      },
      box: {
        url: 'https://api.box.com/2.0',
        auth: async () => `Bearer ${access_token ?? await oauthToken('Box', options.handler, options.scope)}`
      },
      paypal: {
        url: 'https://api-m.sandbox.paypal.com',
        auth: async () => `Basic ${access_token ?? await paypalAccessToken()}`
      },
      promptPerfect: {
        url: 'https://api.promptperfect.jina.ai',
        auth: async () => `token ${token('promptPerfect', options.handler)}`
      }
      // ... (other handlers)
    }[options.handler];

    // console.log('\nawait auth() in handler():\n', await auth());


    const response = await https({
      method: options.method,
      url: !/youtube/i.test(options.handler)
        ? !options.auth_type || options.auth_type !== 'user'
          ? `${url}/${options.endpoint}`
          : `${url}/${options.endpoint}${options.parameters}`
        : `${url}&${options.endpoint}`,
      headers: {
        'Content-Type': options.type === 'content' ? 'text/plain' : 'application/json; charset=UTF-8',
        ...(header && options.type === 'content'
          ? { 'Dropbox-API-Arg': JSON.stringify(options.body) }
          : options.handler === 'anthropic'
            ? {
              'anthropic-version': '2023-06-01',
              'x-api-key': token('anthropic', 'anthropic')
            }
            : options.handler === 'places'
              ? { 'X-Goog-Api-Key': token('google', 'google') }
              : {}
        ),
        ...(auth && options.handler !== 'anthropic' && { 'Authorization': await auth() })
      },
      ...(options.body && { body: options.type !== 'content' ? options.body : '' }),
      message: options.message || '',
      errorMessage: options.errorMessage || '',
      hint: options.hint || '',
      payload: options.payload || '',
      response_type: options.response_type || undefined,
      formdata: options.formdata || false
    });

    return options.handler === 'imgur' ? response.data : response;

    /*
    // const { url, auth = undefined, header = undefined } = handlers[options.handler];
    console.log('auth:', auth ? 'yes' : 'no');
    const authorization = auth ? await auth() : undefined;

    if (header) _headers.push(header);
    if (authorization)
      _headers.push(['Authorization', authorization]);

    return https({
      method: options.method,
      url: options.handler !== 'youtube'
        ? `${url}/${options.endpoint}`
        : `${url}&${options.endpoint}`,
      headers: new Headers(_headers),
      ...(options.body && {
        body: options.type !== 'content' ? options.body : ''
      }),
      message: options.message ?? '',
      errorMessage: options.errorMessage ?? '',
      payload: options.payload ?? '',
      response_type: options.response_type ?? undefined
    });
    */

  } catch (/** @type {*} */ error) {
    throw error.message?.includes('expired') || error.authorize
      // @ts-ignore
      ? await authorize((error.authorize ?? options.handler).charAt(0).toUpperCase() + options.handler.slice(1), null)
      : error;
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
 * @returns {string|undefined}
 */
function token(type, handler, variable) {
  if (!/discord|slack|openai|anthropic|google|imgur|promptPerfect|twitter/.test(type)) return;
  if (type !== handler) return;

  const api = require('../../Api');

  /**
   * @type {{ [type: string]: { getToken: () => string|*|undefined, env: string, errorMessage: string}}}
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
      getToken: () => api.get_twitter_token()?.[variable],
      env: 'twitter_' + variable,
      errorMessage: 'Twitter ' + variable + ' not set.'
    },
    promptPerfect: {
      getToken: () => api.get_prompt_perfect_token(),
      env: 'prompt_perfect_api_key',
      errorMessage: 'Prompt Perfect API key not set'
    }
  };

  const { getToken, errorMessage, env } = tokenTypes[type] || {};

  const token = (getToken && getToken()) || process.env[env] || null;
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
  if ((service !== handler) && (type === 'Google' && !/youtube|drive|places|sheets/i.test(handler))) return;
  const api = require('../../Api');
  const token = await getTokens(`${service}Auth`);

  // console.log(type + ' token in oauthToken():', token);

  if (token && token.expires <= Date.now())
    token.access_token = await refresh(service, scope?.[0]);

  if (token && token.access_token) return token.access_token;

  if (token && scope && scope.length) {
    const scopes = [];
    for (const _scope of scope)
      if (!token?.scope?.includes(_scope))
        scopes.push(_scope);

    if (scopes.length)
      throw new ResponseError(null, null, `${service}_error`, { error: `Your app does not have the required scopes: \`${scopes.join(scopes.length > 1 ? ', ' : '')}\`` });
  }

  if (token?.access_token) return token.access_token;

  // @ts-ignore
  const credentials = api[`get_${service}_token`]();
  // console.log('credentials from oauth()', credentials);
  if (!credentials?.access_token && !credentials?.user && /* !process.env[`${service}_access_token`] && */ !process.env[`${service}_user_token`])
    throw await authorize(type, null, handler);

  return credentials?.access_token || credentials?.user || process.env[`${service}_access_token`] || process.env[`${service}_user_token`];
}

/**
 * @param {'Slack' | 'Spotify' | 'Box' | 'Dropbox' | 'Google' | 'Imgur' | 'Twitter'} type
 * @param {?{channel_id: string}} [params]
 * @param {string} [handler]
 * @param {string} [service]
 */
async function authorize(type, params, handler, service = type.toLowerCase()) {
  const api = require('../../Api');
  const { removeFalsyFromObject } = require('./functions');

  /** @type {{[x: string]: { url: string, scope?: string}}} */
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

  // @ts-ignore
  const credentials = api[`get_${service}_token`]();
  if ((!credentials || !credentials.redirect_uri) && !process.env[`${service}_redirect_uri`])
    throw new Error(type + ' redirect_uri not set');

  const client_id = (credentials?.client_id || process.env[`${service}_client_id`])?.trim(),
    redirect_uri = (credentials?.redirect_uri || process.env[`${service}_redirect_uri`])?.trim(),
    scope = (credentials?.scope || process.env[`${service}_scope`] || configs[service].scope)?.trim() || defaultScope(service),
    team_id = (credentials?.team_id || process.env[`${service}_team_id`])?.trim(),
    code_verifier = getCodeVerifier(),
    authString = `Please authorize your ${type} application`,

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

  if (service === 'twitter') {
    // console.log('code verifier:', code_verifier);
    const { code_verifier: verifier = undefined, ...value } = await getTokens('twitterAuth') || {};
    // console.log('{ code_verifier, ...value }', { code_verifier, ...value });
    await setTokens({ key: 'twitterAuth', value: { code_verifier, ...value } });
    // console.log('new code verifier:', await getTokens('twitterAuth'));
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

  // console.log('\ntype in refresh():', type);
  // @ts-ignore
  const credentials = require('../../Api')[`get_${type}_token`]();
  const token = await getTokens(`${type}Auth`);

  /** @type {{[x: string]: {url: string, scope?: string}}} */
  const configs = {
    dropbox: {
      url: 'https://api.dropboxapi.com/oauth2/token',
      scope: defaultScope('dropbox') // 'account_info.read account_info.write contacts.read contacts.write file_requests.read file_requests.write files.content.read files.content.write files.metadata.read files.metadata.write sharing.read sharing.write'
    },
    spotify: {
      url: 'https://accounts.spotify.com/api/token',
      scope: defaultScope('spotify') // 'user-read-email user-read-private user-library-read user-library-modify user-top-read user-read-recently-played user-read-playback-position user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public app-remote-control streaming user-read-playback-state user-modify-playback-state user-read-currently-playing ugc-image-upload'
    },
    imgur: {
      url: 'https://api.imgur.com/oauth2/token'
    },
    twitter: {
      url: 'https://api.twitter.com/2/oauth2/token',
      scope: defaultScope('twitter') // 'tweet.read tweet.write users.read offline.access space.read mute.read mute.write like.read like.write list.read list.write block.read block.write bookmark.read bookmark.write'
    },
    box: {
      url: 'https://account.box.com/api/oauth2/token'
    },
    google: {
      url: 'https://oauth2.googleapis.com/token',
      scope: `https://www.googleapis.com/auth/${google}`
    }
  };

  /**
   * @type {{grant_type: string, client_id: string|undefined, refresh_token: string|undefined, client_secret?: string, }}
   */
  const searchParams = {
    grant_type: 'refresh_token',
    client_id: credentials?.client_id || process.env[`${type}_client_id`],
    refresh_token: token.refresh_token
  };

  /** @type {{[x: string]: string}} */
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  if (type.toLowerCase() !== 'spotify' && type.toLowerCase() !== 'twitter')
    searchParams.client_secret = credentials?.client_secret || process.env[`${type}_client_secret`];
  else {
    headers.Authorization = 'Basic ' + Buffer.from((credentials?.client_id || process.env[`${type}_client_id`]) + ':' + (credentials?.client_secret || process.env[`${type}_client_secret`])).toString('base64');
  }

  let refresh;
  try {
    refresh = await https({
      method: 'post',
      url: configs[type].url,
      headers,
      // @ts-ignore
      body: new URLSearchParams(searchParams)
    });
  } catch (/** @type {*} */ error) {
    // console.log('error.message in refresh() (use for authorize())', error.message);
    console.log('Error in refresh():\n', error);

    throw error.message !== 'Imgur is temporarily over capacity. Please try again later.'
      // @ts-ignore
      ? await authorize(type.charAt(0).toUpperCase() + type.slice(1), null)
      : error;
  }

  // console.log('\nrefresh response:\n', refresh);
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
const getTokens = async (key) => (find(key, await loadTokens()) || {}).value || null;

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
