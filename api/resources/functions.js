/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-multi-spaces */
/* eslint-disable brace-style */
/* eslint-disable max-statements-per-line */
/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-syntax */
// @ts-check

const { USER_FLAGS, PERMISSION_NAMES } = require('../../enum');
const apng = require('../utils/apng');
const sharp = require('sharp');
const { imageInfo } = require('../utils/imageInfo');
const { attemptHandler } = require('./handlers');

async function getAppId() {
  return (await attemptHandler({
    method: 'GET',
    endpoint: 'applications/@me'
  }))?.id;
}

/**
 * @ignore
 * @param {?number} flags
 * @returns {string[]}
 */
function getBadges(flags) {
  if (!flags) return [];
  const FLAGS = Object.entries(USER_FLAGS);
  return FLAGS
    .filter(([, value]) => flags & value)
    .map(([name]) => name);
}

/**
 * @param {Snowflake} userID
 * @param {?string} avatarID
 * @param {Snowflake} [guildID] 
 * @param {?string} [memberAvatarID]
 * @returns {string}
 */
function avatarFromObject(userID, avatarID, guildID, memberAvatarID) {
  const base = 'https://cdn.discordapp.com';
  
  if (!avatarID && !memberAvatarID) {
    // @ts-ignore
    return `${base}/embed/avatars/${Number((BigInt(userID) >> 22n) % 6n)}.png`;
  }
  
  const avatar = memberAvatarID ?? avatarID;
  const ext = avatar?.startsWith('a_') ? 'gif' : 'png';
  
  return memberAvatarID
    ? `${base}/guilds/${guildID}/users/${userID}/avatars/${avatar}.${ext}`
    : `${base}/avatars/${userID}/${avatar}.${ext}`;
  
}

/**
 * Validates an image URL
 * @param {string|undefined} url
 * @param {'image'|'audio'|'video'} [content_type]
 * @param {number} [timeout]
 * @returns {Promise<boolean|undefined>}
 */
async function isValidMediaURL(url, content_type = 'image', timeout = 5000) {
  if (!url) return false;
  try {
    const controller = new AbortController();
    const timeoutID = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal
    });
    
    clearTimeout(timeoutID);
    if (!response.ok) return false;

    const contentType = response.headers.get('content-type');
    return contentType?.startsWith(`${content_type}/`);
  } catch (error) {
    return false;
  }
}


/**
 * Validates an image buffer
 * @param {Buffer} buffer
 * @param {'image'|'audio'} [media_type]
 * @returns {boolean}
 */
function isValidMediaBuffer(buffer, media_type = 'audio') {
  if (!Buffer.isBuffer(buffer)) return false;

  const headerBytes = buffer.subarray(0, 12);
  const headerString = headerBytes.toString('hex');

  const validHeaders = {
    image: [
      '89504e470d0a1a0a',           // PNG
      '474946383761',               // GIF87a
      '474946383961',               // GIF89a
      'ffd8ffe000104a464946000101', // JPEG
      'ffd8ffe10f457869660000',     // JPEG
      'ffd8ffe2',                   // JPEG
      'ffd8ffe3',                   // JPEG
      'ffd8ffe8',                   // JPEG
      '524946462a',                 // RIFF/APNG
      '52494646',                   // GIF
      '00000020667479706d70',       // WebP
      '52494646'                    // WEBP
    ],
    audio: [
      '4f67675300020000', // OGG  - libopus
      '49443303',         // MP3  - ID3
      '52494646',         // WAV  - RIFF
      '664c6143'          // FLAC - fLaC
    ]
  };

  if (validHeaders[media_type].includes(headerString)) {
    if (headerString === '4f67675300020000') {
      if (buffer.toString('utf8', 28, 32) === 'Opus') {
        return true;
      }
    }
    return true;
  }
  return false;
}

/**
 * Validates an image as URL or buffer
 * @param {string | Buffer | undefined} media
 * @param {'audio' | 'image'} [media_type]
 * @returns {Promise<?boolean>}
 */
async function isValidMedia(media, media_type = 'image') {
  
  try {
    // @ts-ignore
    await isValidMediaURL(media, media_type);
    return true;
  } catch {
    // @ts-ignore
    if (isValidMediaBuffer(media, media_type)) return true;
  }
  return false;
}

/**
 * Validates a payload as JSON
 * @param {string} payload
 * @returns {boolean}
 */
function isValidJSON(payload) {
  try { JSON.parse(payload); return true; }
  catch (e) { return false; }
}

/**
   * ### Takes an image URL or buffer of any type and returns a buffer or string.
   * - Image URL to buffer
   * - Image URL to UTF-8/binary/base64 encoded buffer
   * - Image URL to base64 encoded data string
   * - Any buffer to base64 data string
   * @param {string|Buffer|undefined} media
   * @param {'base64string'|'base64'|'utf-8'|'binary'|'binarystring'} [encoding]
   * @param {boolean} [datastringbuffer]
   * @returns {Promise<{data: Buffer | string | undefined, type: string | null | undefined}>}
   */
async function imageData(media, encoding, datastringbuffer) {

  try {
    if (!(await isValidMedia(media)))
      throw new Error('Invalid input. Expected an image URL or buffer.\n');
    if (typeof media !== 'string' && !(media instanceof Buffer))
      throw new Error('Invalid input. Expected an image URL or buffer.\n');
    
    let imageBuffer, mimetype;
    if (typeof media === 'string') {
      const response = await fetch(media);

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      imageBuffer = Buffer.from(buffer);
      mimetype = response.headers.get('content-type');
      
    } else imageBuffer = media;

    let data;
    if (encoding === 'base64string') {
      const option = Buffer.from(imageBuffer);
      data = `data:${mimetype};base64,${option.toString('base64')}`;
      if (datastringbuffer)
        data = Buffer.from(option.toString('base64'), 'base64');
    } else if (encoding === 'binarystring')
      data = imageBuffer.toString('binary');
    else if (encoding && ['base64', 'utf-8', 'binary'].includes(encoding))
      data = Buffer.from(imageBuffer).toString(encoding);
    else
      data = Buffer.from(imageBuffer);
    
    return { data: data, type: mimetype };

  } catch (error) {
    throw error;
  }
}

/**
 * @function resizeImage resizes a PNG to 320px x 320px as required by Discord to use as a sticker.
 * @param {Buffer} buffer
 * @param {string} type
 * @param {number} [width=320]
 * @param {number} [height=320]
 * @param {number} [MAX_SIZE = 524288]
 * @returns {Promise<{image: Buffer} | {image: Buffer, startSize: number, startHeight: number, startWidth: number, finishSize: number, finishHeight: number, finishWidth: number}>}
 */
async function resizeImage(buffer, type, width = 320, height = 320, MAX_SIZE = 524288) {

  try {

    let image;
    const { width: startWidth, height: startHeight } = imageInfo(buffer);
    const startSize = buffer.length;

    if (type === 'image/png') {
      image = sharp(buffer);
      if (startHeight !== height || startWidth !== width)
        image = await image.resize({ width, height }).png().toBuffer();
      else image = await image.png().toBuffer();

    } else if (type === 'image/gif') {
      image = sharp(buffer, { animated: true });
      if (startHeight !== height || startWidth !== width)
        // @ts-ignore
        image = (await apng.sharpToApng(image, 'buffer', { height, width }))?.[0].buffer;
      else
        // @ts-ignore
        image = (await apng.sharpToApng(image, 'buffer'))?.[0].buffer;
            
    } else if (type === 'image/apng') {
      if (startHeight === height && startWidth === width) 
        image = buffer;
      else
        image = sharp(buffer).resize({
          width, height
        });
    }
    
    if (image.length <= MAX_SIZE) return { image };
    else image = await reduceSize(buffer, type, image.length);
    return {
      image: image.image,
      startHeight, startWidth, startSize,
      finishWidth: image.width,
      finishHeight: image.height,
      finishSize: image.size
    };

  } catch (e) {
    console.log('\nThere was an error while re-sizing, Error:\n', e);
    throw e;
  }
}

/**
 * @param {Buffer} buffer 
 * @param {string} type
 * @param {number} size
 * @param {number} [MAX_SIZE] 
 * @returns {Promise<{image: Buffer, height: number, width: number, size: number}>}
 */
async function reduceSize(buffer, type, size, MAX_SIZE = 524288) {
  
  let image = null, width = 320, height = 320;
  while (size > MAX_SIZE) {
    width = Math.floor(width * 0.95);
    height = Math.floor(height * 0.95);
    
    if (type === 'image/png') {
      image = await sharp(buffer).resize({ width, height }).png().toBuffer();
    } else if (type === 'image/gif') {
      // @ts-ignore
      image = (await apng.sharpToApng(
        sharp(buffer, { animated: true }),
        'buffer',
        { height, width }
      ))?.[0].buffer;
    } else if (type === 'image/apng') {
      image = sharp(buffer).resize({
        width, height
      });
    }
    size = image.length;
    
  }
  // return image;
  return { image, width, height, size };
}

/**
 * @param {string|number} value
 * @param {boolean} snowflake
 * @param {'relative'|'date'|'full'|'all'|undefined} [style] 
 * @returns {string}
 */
function retrieveDate(value, snowflake, style) {
  if (!value) return `Invalid or missing argument: ${value ?? 'undefined'}`;
  const EPOCH = 1420070400000;
  if (typeof value === 'number') value = value * 1000;
  const date = /^\d+$/.test(String(value)) && snowflake
    // @ts-ignore
    ? new Date(parseInt(value) / 4194304 + EPOCH)
    : new Date(value);
  
  // console.log('DATE IN RETRIEVEdATE:', date);
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  month = month.length === 1 ? `0${month}` : month;
  let day = (date.getDate()).toString();
  day = day.length === 1 ? `0${day}` : day;
  const time = (date.toTimeString()).split(' ')[0];
  
  if (!style) return `${year}.${month}.${day} ${time}`;
  const timestamp = Math.floor(new Date(date).getTime() / 1000);
  return /^r(elative)?\s*$/gmi.test(style)
    ? `<t:${timestamp}:R>`
    : /^d(ate)?\s*$/gmi.test(style)
      ? `<t:${timestamp}:f>`
      : /^f(ull)?\s*$/gmi.test(style)
        ? `<t:${timestamp}:f> (<t:${timestamp}:R>)`
        : `Invalid argument: ${style}`;
  
}

/**
 * @example
 * ```js
 * generateCDN(params.guild, 'icon');
 * generateCDN(params, 'banner');
 * generateCDN(params, 'splash');
 * ```
 * @param {any} object
 * @param {('icon' | 'splash' | 'banner' | 'discovery_splash')} media
 * @param {('128' | '256' | '512' | '1024' | '4096')} [size]
 * @param {string} x
 * @returns {string | undefined} url
 */
function generateCDN(object, media, size = '1024', x = '') {

  x = {
    icon: 'icons',
    splash: 'splashes',
    banner: 'banners',
    discovery_splash: 'discovery-splashes'
  }[media] || x;

  let url;
  if (object[media] && object.id) {
    const ext = object[media].startsWith('a_') ? 'gif' : 'png';
    url = `https://cdn.discordapp.com/${x}/${object.id}/${object[media]}.${ext}?size=${size}`;
    if (x === 'icons' && object.hoist) {
      x = 'role-icons';
      url = `https://cdn.discordapp.com/${x}/${object.id}/${object[media]}.${ext}?size=${size}`;
    }
  }
  return url || undefined;


  /*
  media === 'icon' ? x = 'icons' : '';
  media === 'splash' ? x = 'splashes' : '';
  media === 'banner' ? x = 'banners' : '';
  media === 'discovery_splash' ? x = 'discovery-splashes' : '';
  let url;
  if (object[media] && object['id']) {
    if (object['hoist'] && x === 'icons') x = 'role-icons';
    let ext;
    object[media].startsWith('a_') ? ext = 'gif' : ext = 'png';
    url = `https://cdn.discordapp.com/${x}/${object['id']}/${object[media]}.${ext}?size=${size}`;
    
  }
  return url ?? undefined;
  */
}

/**
 * @param {number} permissions
 * @returns {string[]}
 */
function parsePermissions(permissions) {
  const flags = Object.entries(PERMISSION_NAMES);
  if (!permissions) return [];
  /**
   * @type {string[]}
   */
  const permission_names = [];
  if (permissions > 0) {
    for (let p = 0; p < flags.length; p++) {
      if (permissions & flags[p][1])
        if (!permission_names.includes(flags[p][0]))
          permission_names.push(flags[p][0]);
    }
  }
  return permission_names;
}

/**
 * @ignore
 * @param {Embed[]} embeds 
 * @returns {Embed[]}
 */
function embedModifier(embeds) {
  for (const embed of embeds) {
    if (embed.footer?.icon_url && !embed.footer?.text)
      embed.footer.text = '\u200b';
    if (embed.author?.icon_url && !embed.author?.name)
      embed.author.name = '\u200b';
  }
  return embeds;
}

/**
 * @param {ExtendedInvite & Channel & Message & ExtendedUser & User & Member & ThreadMember & Interaction} payload
 * @returns 
 */
/* async */function extendPayload(payload/* , params*/) {
  if (!payload) return payload;

  if (!payload.inviter && !payload.user_id && !payload.member && !payload.user && !payload.author && !payload.interaction && !payload.message && (!payload.id && !payload.username)) {
    return payload;
  }
  
  // const { roles, members } = require('../discord/guilds');

  
  // let guildRoles;
  const guild_id = payload.guild_id; // ?? params.guild_id ?? params.guild?.id;
  
  /*
  if (guild_id) {
    if (params.guild?.roles) guildRoles = params.guild?.roles;
    else guildRoles = await roles.getAll({ guild_id });
  }

  async function member(user_id) {
    if (!guild_id) return null;
    const member = await members.retrieve({
      guild_id: guild_id,
      user_id,
      member_only: true
    });

    if (guildRoles) {
      member.permission_names = members.getPermissionNames(member.roles, guildRoles);
      member.hexColor = userColor(member.roles, guildRoles);
    }
    return member;
  }
  
  if (payload.roles) {
    payload.displayAvatar = avatarFromObject(payload.user?.id ?? payload.author?.id ?? payload.user_id, payload.user?.avatar ?? payload.author?.avatar, guild_id, payload.avatar);
    payload.displayName = payload.member.nick ?? payload.nick ?? payload.member.user?.display_name ?? payload.member.user?.global_name ?? payload.member?.user?.username ?? payload.user?.display_name ?? payload.user?.global_name ?? payload.user?.username ?? payload.author?.display_name ?? payload.author?.global_name ?? payload.author?.username;
    if (guildRoles) {
      payload.permission_names = members.getPermissionNames(payload.roles, guildRoles);
      payload.hexColor = userColor(payload.roles, guildRoles);
    }
  }
  */
  
  if (payload.channel) {
    payload.channel.created_at = retrieveDate(payload.channel.id, true);
    if (payload.channel.last_message_id)
      payload.channel.last_message_sent = retrieveDate(payload.channel.last_message_id, true);
  }

  if (payload.inviter) {
    payload.inviter.badges = getBadges(payload.inviter.public_flags);
    payload.inviter.created_at = retrieveDate(payload.inviter.id, true);
    /*
    if (guild_id && !payload.inviter.bot)
      payload.inviter.member = await member(payload.inviter.id);
    */
  }

  if (payload.target_user) {
    payload.target_user.created_at = retrieveDate(payload.target_user.id, true);
    payload.target_user.badges = getBadges(payload.target_user.public_flags);
    /*
    if (guild_id)
      payload.target_user.member = await member(payload.target_user.id);
    */
  }

  if (payload.code && payload.created_at)
    payload.url = `https://discord.gg/${payload.code}`;
  
  if (payload.mentions && payload.mentions.length) {
    for (const mention of payload.mentions) {
      mention.badges = getBadges(mention.public_flags);
      mention.created_at = retrieveDate(mention.id, true);
      // mention.member = retrieveMember(payload, mention.id, true);
    }
  }
  
  if (payload.id && payload.username) {
    payload.badges = getBadges(payload.public_flags);
    payload.created_at = retrieveDate(payload.id, true);
  }

  if (payload.mentions && payload.mentions.length) {
    for (const mention of payload.mentions) {
      mention.badges = getBadges(mention.public_flags);
      mention.created_at = retrieveDate(mention.id, true);
    }
  }

  if (payload.user || payload.user_id) {
    if (payload.user) {
      payload.user.badges = getBadges(payload.user.public_flags);
      payload.user.created_at = retrieveDate(payload.user.id, true);
    }
    /*
    if (!payload.member && guild_id && !payload.roles && !payload.user.bot)
      payload.member = await member(payload.user?.id ?? payload.user_id);
    */
  }
  
  if (payload.member) {
    const user_id = payload.member.user?.id ?? payload.author?.id ?? payload.user_id ?? payload.inviter?.id ?? payload.target_user?.id;
    if (user_id) {
      payload.member.displayAvatar = avatarFromObject(user_id, payload.member.user?.avatar ?? payload.author?.avatar, guild_id, payload.member.avatar);
      payload.member.displayName = payload.member.nick ?? payload.nick ?? payload.member.user?.display_name ?? payload.member.user?.global_name ?? payload.member?.user?.username ?? payload.author?.display_name ?? payload.author?.global_name ?? payload.author?.username ?? payload.inviter?.display_name ?? payload.inviter?.global_name ?? payload.inviter?.username;
    }
    if (payload.member.user) {
      payload.member.user.created_at = retrieveDate(payload.member.user.id, true);
      payload.member.user.badges = getBadges(payload.member.user.public_flags);
    }
    /*
    if (payload.member.roles && guildRoles) {
      payload.member.permission_names = members.getPermissionNames(payload.member.roles, guildRoles);
      payload.member.hexColor = userColor(payload.member.roles, guildRoles);
    }
    */
  }
  if (payload.author) {
    payload.author.created_at = retrieveDate(payload.author.id, true);
    payload.author.badges = getBadges(payload.author.public_flags);
    /*
    if (!payload.member && guild_id && !payload.author.bot) {
      payload.member = await member(payload.author.id);
    }
    */
  }
  if (payload.message) {
    // payload.message.trueType = messageType[payload.message.type];
    if (payload.message.author) {
      payload.message.author.badges = getBadges(payload.message.author.public_flags);
      payload.message.author.created_at = retrieveDate(payload.message.author.id, true);
    }
    if (payload.message.interaction?.user) {
      payload.message.interaction.user.badges = getBadges(payload.message.interaction.user.public_flags);
      payload.message.interaction.user.created_at = retrieveDate(payload.message.interaction.user.id, true);
    }
    if (payload.message.interaction?.member?.user) {
      payload.message.interaction.member.user.badges = getBadges(payload.message.interaction.member.user.public_flags);
      payload.message.interaction.member.displayAvatar = avatarFromObject(payload.message.interaction.member.user.id, payload.message.interaction.member.user.avatar, guild_id, payload.message.interaction.user?.avatar ?? payload.message.interaction.member?.avatar);
      payload.message.interaction.member.displayName = payload.message.interaction.member.nick ?? payload.message.interaction.member.user.display_name ?? payload.message.interaction.member.user.global_name ?? payload.message.interaction.member.user.username;
      payload.message.interaction.member.user.created_at = retrieveDate(payload.message.interaction.member.user.id, true);
    }
  }
  if (payload.interaction) {
    // if (payload.interaction.type) payload.interaction.trueType = InteractionType[payload.interaction.type];
    // else if (payload.interaction.component_type) payload.interaction.component_trueType = componentType[payload.interaction.component_type];

    if (payload.interaction.member) {
      payload.interaction.member.displayAvatar = avatarFromObject(payload.interaction.user?.id ?? payload.interaction.member?.user?.id, payload.interaction.user?.avatar, guild_id, payload.interaction.member.avatar);
      payload.interaction.member.displayName = payload.interaction.member.nick ?? payload.interaction.user?.display_name ?? payload.interaction.user?.global_name ?? payload.interaction.user?.username;
      if (payload.interaction.member.user) {
        payload.interaction.member.user.badges = getBadges(payload.interaction.member.user.public_flags);
        payload.interaction.member.user.created_at = retrieveDate(payload.interaction.member.user.id, true);
      }
    } /* else if (guild_id) {
      if (payload.interaction.user && !payload.interaction.user?.bot)
        payload.interaction.member = await member(payload.interaction.user?.id);
    }*/
    if (payload.interaction.user) {
      payload.interaction.user.created_at = retrieveDate(payload.interaction.user.id, true);
      payload.interaction.user.badges = getBadges(payload.interaction.user.public_flags);
    }
  }
  if (payload.data) {
    // payload.data.trueType = ApplicationCommandType[payload.data.type];
    // @ts-ignore
    if (payload.data?.resolved) {
      // @ts-ignore
      for (const [object, values] of Object.entries(payload.data.resolved)) {
        for (const [id, value] of Object.entries(values)) {
          let userObject;
          if (object === 'users') {
            value.badges = getBadges(value.public_flags);
            value.created_at = retrieveDate(id, true);
            userObject = value;
          } else if (object === 'members') {
            value.displayAvatar = avatarFromObject(id, null, guild_id, value.avatar);
            if (userObject) {
              value.displayName = value.nick ?? userObject.display_name ?? userObject.global_name ?? userObject.username;
            }
          } else if (object === 'messages') {
            value.author.badges = getBadges(value.author.public_flags);
            value.author.created_at = retrieveDate(value.author.id, true);
            if (value.mentions && value.mentions.length) {
              for (const mention of value.mentions) {
                mention.badges = getBadges(mention.public_flags);
                mention.created_at = retrieveDate(mention.id, true);
              }
            }
            if (value.interaction) {
              if (value.interaction.user) {
                value.interaction.user.created_at = retrieveDate(value.interaction.user.id, true);
                value.interaction.user.badges = getBadges(value.interaction.user.public_flags);
              }
              if (value.interaction.member) {
                value.interaction.member.displayName = value.interaction.member.nick ?? value.interaction.user?.display_name ?? value.interaction.user?.global_name ?? value.interaction.user?.username;
                value.interaction.member.displayAvatar = avatarFromObject(value.interaction.user?.id, value.interaction.user?.avatar, guild_id, value.interaction.member.avatar);
              }
            }
          }
        }
      }
    }
  }
  // console.log(orange('\nFINAL PAYLOAD\n'), payload);
  return payload;
}


/**
   * @param {string} url
   * @param {Object} params
   * @param {boolean} encode
   * @returns {string}
   */
function buildQueryString(url, params, encode = false) {
  url = url === 'null' ? '' : `${url}?`;
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      const encodedKey = encode ? encodeURIComponent(key) : key;
      const encodedValue = encode ? encodeURIComponent(value) : value;
      queryParams.append(encodedKey, encodedValue);
    }
  });


  const queryString = queryParams.toString();
  return queryString ? `${url}${queryString}` : url;
}

/**
 * @param {Array<string>} param0
 * @returns {string} - The formatted URL with query parameters.
 */
function buildQueryStringFromArrays([url, ...rest]) {
  const params = new URLSearchParams(
    rest
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => [key, encodeURIComponent(value)])
  );

  return params.toString() ? `${url}?${params.toString()}` : url;
}


/**
 * 
 * @param {*} obj
 * @returns {any}
 */
function removeFalsyFromObject(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== '')
  );
}

/**
 * @param {Array<*>} arr 
 * @returns {any}
 */
const removeFalsyFromArray = (arr) => {
  return arr.map(obj => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined && v !== false && v !== 0 && v !== '' && !Number.isNaN(v))
    );
  }).filter(obj => Object.keys(obj).length > 0);
};

/**
 * @param {any} obj 
 * @param {string} path
 * @returns {any}
 */
function getPathValue(obj, path) {
  /** @type {(regexp: RegExp) => any} */
  const travel = (regexp) =>
    String(path).split(regexp).filter(Boolean).reduce((res, key) => (
      (res !== null && res !== undefined)
        ? res[key]
        : res
    ), obj);

  return travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
}

module.exports = {
  embedModifier,
  avatarFromObject,
  getBadges,
  parsePermissions,
  generateCDN,
  isValidMediaURL,
  imageData,
  isValidMediaBuffer,
  isValidMedia,
  resizeImage,
  retrieveDate,
  isValidJSON,
  extendPayload,
  buildQueryString,
  getAppId,
  removeFalsyFromArray,
  removeFalsyFromObject,
  buildQueryStringFromArrays,
  getPathValue
};