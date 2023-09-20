/* eslint-disable node/no-unsupported-features/es-syntax */
const { default: axios } = require('axios');
const https = require('../utils/https');
const { isValidJSON, returnErr, attemptHandler, extendPayload, isValidMedia, getAxiosError } = require('../resources/functions');
const { messageType } = require('../../enum');

/**
 * @fileoverview
 * An Interaction is the message that your application receives when a user uses an application command or a message component.  
 *
 * For Slash Commands, it includes the values that the user submitted.
 *
 * For User Commands and Message Commands, it includes the resolved user or message on which the action was taken.
 *
 * For Message Components it includes identifying information about the component that was used.  
 * It will also include some metadata about how the interaction was triggered: the `guild_id`, `channel`, `member` and other fields.  
 * 
 * [receiving-and-responding#interactions](https://discord.com/developers/docs/interactions/receiving-and-responding#interactions)
 * @module interactions
 */
module.exports = {

  /**
   * @summary INTERACTION RESPONSES
   * @namespace callback
   * @memberof module:interactions
   */
  callback: {

    get_original,

    /**
     * @summary
     * ### [Create Interaction Response]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response}
     * 
     * - Used to immediately respond and reply to an interaction.
     * 
     * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `4` (`CHANNEL_MESSAGE_WITH_SOURCE`)
     * @example
     * await params.api.discord.interactions.callback.reply(params, {
     *   ephemeral: true,
     *   content: 'content',
     *   embeds: [{
     *     title: 'Michael',
     *     description: 'is cool'
     *   }]
     * })
     * @memberof module:interactions.callback#
     * @method reply
     * @param {object} params
     * @param {object} input
     * @param {boolean} [input.ephemeral] - Whether the message should be ephemeral
     * @param {number} [input.flags]
     * @param {string} [input.content]
     * @param {Embed[]} [input.embeds]
     * @param {Component} [input.components]
     * @param {Array<Pick<Attachment, 'file' | 'filename'>>} [input.attachments]
     * @param {boolean} [input.tts]
     * @param {AllowedMentions} [input.allowed_mentions]
     * @param {boolean} [input.return_date]
     * @returns {Promise<boolean | Date>} 
     */
    reply: async (params, input = {}) => {
      input.flags = (input.ephemeral) ? (1 << 6) : 0;
      let message;
      if (input.attachments && input.attachments?.length) {
        message = await sendAttachment('data', input, `interactions/${params.id}/${params.token}/callback`, 'post', 4, input.flags);
      } else {
        message = await https.post({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/v10/interactions/${params.id}/${params.token}/callback`),
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 4, data: input })
        });
        
        if (message.statusCode !== 204) {
          throw new Error(
            message.body.length
              ? isValidJSON(message.body)
                ? returnErr(message)
                : message.body
              : message
          );
        }
      }
      // console.log('\nmessage\n\n', message);
      if (message.headers && input.return_date) {
        console.log('\nmessage.headers && input.return_date:', message.headers.date);
        return message.headers.date;
      } else return true;
    },

    /*
    async reply(params, input = {}) {
      try {
        const url = `/api/v10/interactions/${params.id}/${params.token}/callback`;
        input.flags = (input.ephemeral) ? (1 << 6) : 0;
        let r, a;
        (input.attachments && input.attachments?.length)
          ? a = await sendAttachment('data', input, url, 'post', 4, input.flags)
          : r = await https.post({
            url: encodeURI('discord.com'),
            path: encodeURI(url),
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 4, data: input })
          });
        return r ? returnErr(r) : a;
      } catch (e) { return e; }
    },*/

    /**
     * @summary
     * ### Create Interaction Response (Deferred)
     * 
     * - Used to acknowledge an interaction and wait for an update or a followup.
     * - User sees a thinking/loading state.
     * - Only accepts an ephemeral boolean
     * 
     * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `5` (`DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE`)
     * @example
     * await params.api.discord.interactions.callback.defer(params, {
     *   ephemeral: true
     * });
     * @example
     * await params.api.discord.interactions.callback.defer(params)
     * @memberof module:interactions.callback#
     * @method defer
     * @param {object} params event parameters
     * @param {object} [input] user input
     * @param {boolean} [input.ephemeral]
     * @returns {Promise<string>}
     */
    async defer(params, input = {}) {
      return handleCallbacks({
        method: 'post',
        path: `interactions/${params.id}/${params.token}/callback`,
        type: 5,
        data: {
          flags: input.ephemeral ? (1 << 6) : 0
        },
        return_date: true
      });
    },

    /**
     * @summary
     * ### Defered Update Message (Components)
     * - Used to acknowledge a component interaction and wait for a followup.
     * - User does NOT see a thinking/loading state.
     * - Only accepts an ephemeral boolean
     * 
     * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `6` (`DEFERRED_UPDATE_MESSAGE` *for components)
     * @example
     * await params.api.discord.interactions.callback.component_defer(params, {
     *   ephemeral: true
     * });
     * @example
     * await params.api.discord.interactions.callback.component_defer(params)
     * @memberof module:interactions.callback#
     * @method component_defer
     * @param {object} params event parameters
     * @param {object} [input] user input
     * @param {boolean} [input.ephemeral]
     * @returns {Promise<{statusCode: 204, body: undefined}>}
     */
    async component_defer(params, input = {}) {
      return handleCallbacks({
        method: 'post',
        path: `interactions/${params.id}/${params.token}/callback`,
        type: 6,
        data: {
          flags: input.ephemeral ? (1 << 6) : 0
        },
        return_date: true
      });
    },

    /**
     * @summary
     * ### Update Message (Components)
     * - Allows for editing of the message the component was attached to.
     * 
     * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `7` (`UPDATE_MESSAGE` *for components)
     * @example
     * await params.api.discord.interactions.callback.component_update(params, {
     *   content: 'updated content',
     *   components: [{
     *     type: 1,
     *     components: [{
     *       type: 2,
     *       style: 4,
     *       label: 'button',
     *       custom_id: 'stuff',
     *       disabled: true
     *     }]
     *   }]
     * });
     * @memberof module:interactions.callback#
     * @method component_update
     * @param {object} params
     * @param {object} input
     * @param {boolean} [input.ephemeral] - Whether the message should be ephemeral
     * @param {string} [input.content]
     * @param {Embed[]} [input.embeds]
     * @param {Component} [input.components]
     * @param {Array<Pick<Attachment, 'file' | 'filename'>>} [input.attachments]
     * @param {boolean} [input.tts]
     * @param {AllowedMentions} [input.allowed_mentions]
     * @returns {Promise<{statusCode: 204, body: undefined}>} 
     */
    async component_update(params, input = {}) {
      const url = `interactions/${params.id}/${params.token}/callback`;
      let flags;
      input.ephemeral ? flags = (1 << 6) : flags = 0;
      if (input.attachments && input.attachments.length) {
        console.log('attachments in component_update\n', input.attachments);
        return sendAttachment('data', input, url, 'post', 7, flags);
      } else {
        return handleCallbacks({
          method: 'post',
          path: url,
          type: 7,
          data: input
        });
      }
    },

    /**
     * @summary
     * ### [Autocomplete]{@link https://discord.com/developers/docs/interactions/application-commands#autocomplete}
     * - Responds to an autocomplete interaction with suggested choices.
     * 
     * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `8` (`APPLICATION_COMMAND_AUTOCOMPLETE_RESULT`)
     * @memberof module:interactions.callback#
     * @method autocomplete_reply
     * @param {object} params 
     * @param {object} input
     * @param {Array<Pick<ApplicationCommandOptionChoice, 'name' | 'value'>>} input.choices
     * @returns {Promise<{statusCode: 204, body: undefined}>}
     */
    async autocomplete_reply(params, input) {
      
      return handleCallbacks({
        method: 'post',
        path: `interactions/${params.id}/${params.token}/callback`,
        type: 8,
        data: input
      });
    },

    /**
     * @summary
     * ### [Text Inputs (Modals)]{@link https://discord.com/developers/docs/interactions/message-components#text-inputs}
     * - Interactive component that render on modals.
     * - They can be used to collect short-form or long-form text.
     * 
     * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `9` (`MODAL`)
     * @memberof module:interactions.callback#
     * @method modal_reply
     * @param {Object} params 
     * @param {Object} input
     * @param {string} input.custom_id
     * @param {string} input.title
     * @param {Component} input.components
     * @returns {Promise<{statusCode: 204, body: undefined}>}
     */
    async modal_reply(params, input) {
      return handleCallbacks({
        method: 'post',
        path: `interactions/${params.id}/${params.token}/callback`,
        type: 9,
        data: input
      });
    },

    /**
     * @summary
     * ### [Edit Original Interaction Response]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response}
     * - Edits the initial Interaction response.
     * - Functions the same as [Edit Webhook Message]{@link module:webhooks#updateMessage} 
     * @example
     * await params.api.discord.interactions.callback.edit_original(params, {
     *   content: 'new content',
     * });
     * @memberof module:interactions.callback#
     * @method edit_original
     * @param {object} params 
     * @param {object} input
     * @param {string} [input.content]
     * @param {Embed[]} [input.embeds]
     * @param {Component} [input.components]
     * @param {Array<Pick<Attachment, 'file' | 'filename'>>} [input.attachments]
     * @param {AllowedMentions} [input.allowed_mentions]
     * @param {boolean} [input.ephemeral]
     * @returns {Promise<?Message>}
     */
    async edit_original(params, input = {}) {
      const endpoint = `webhooks/${params.application_id}/${params.token}/messages/@original`;
      let flags;
      input.ephemeral ? flags = (1 << 6) : flags = 0;
      if (input.attachments && input.attachments.length) {
        return sendAttachment('body', input, endpoint, 'patch', null, flags);
      } else {
        let message;
        try {
          message = await get_original(params);
        } catch (error) {}
        if (!message) return null;
        
        const attempt = await attemptHandler({
          method: 'patch',
          path: endpoint,
          body: {
            content: input.content ?? message.content,
            embeds: input?.embeds?.[0] || message.embeds?.[0] ? [{
              title: input.embeds?.[0]?.title ?? message?.embeds?.[0]?.title,
              description: input.embeds?.[0]?.description ?? message?.embeds?.[0]?.description,
              color: input.embeds?.[0]?.color ?? message?.embeds?.[0]?.color,
              url: input.embeds?.[0]?.url ?? message?.embeds?.[0]?.url,
              timestamp: input.embeds?.[0]?.timestamp ?? message?.embeds?.[0]?.timestamp,
              image: { url: input.embeds?.[0]?.image?.url ?? message?.embeds?.[0]?.image?.url },
              thumbnail: { url: input.embeds?.[0]?.thumbnail?.url ?? message?.embeds?.[0]?.thumbnail?.url },
              author: {
                name: input.embeds?.[0]?.author?.name ?? message?.embeds?.[0]?.author?.name,
                icon_url: input.embeds?.[0]?.author?.icon_url ?? message?.embeds?.[0]?.author?.icon_url,
                url: input.embeds?.[0]?.author?.url ?? message?.embeds?.[0]?.author?.url
              },
              footer: {
                text: input.embeds?.[0]?.footer?.text ?? message?.embeds?.[0]?.footer?.text,
                icon_url: input.embeds?.[0]?.footer?.icon_url ?? message?.embeds?.[0]?.footer?.icon_url
              },
              fields: input.embeds?.[0]?.fields ?? message?.embeds?.[0]?.fields
            }] : [],
            components: input.components ?? message.components ?? [],
            allowed_mentions: input.allowed_mentions,
            attachments: input.attachments ?? message.attachments ?? []
          }
        });
        return extendPayload(attempt/* , params*/);
      }
    },

    /**
     * @summary
     * ### [Delete Original Interaction Response]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response}
     * - Deletes the initial Interaction response.
     * @example
     * await params.api.discord.interactions.callback.delete_original(params);
     * @memberof module:interactions.callback#
     * @method delete_original
     * @param {object} params 
     * @returns {Promise<{statusCode: 204, body: undefined}>}
     */
    async delete_original(params) {
      return attemptHandler({
        method: 'del',
        path: `webhooks/${params.application_id}/${params.token}/messages/@original`
      });
    }
  },

  /**
   * @summary INTERACTION FOLLOWUPS
   * @namespace followup
   * @memberof module:interactions
   */
  followup: {

    get,

    /**
     * @summary
     * ### [Create Followup Message]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message}
     * - Used to create a followup message for an Interaction
     *   - This can be a deferred response or a new followup completely
     * - Functions the same as [Execute Webhook]{@link module:webhooks#execute}, but `wait` is always true.
     * - The `thread_id`, `avatar_url`, and `username` parameters are not supported when using this endpoint for interaction followups.
     * @example
     * await params.api.discord.interactions.followup.create(params, {
     *   ephemeral: true,
     *   content: 'followup message',
     *   embeds: [{
     *     title: 'hello',
     *     description: 'this is a description'
     *   }]
     * });
     * @memberof module:interactions.followup#
     * @method create
     * @param {object} params 
     * @param {object} input
     * @param {boolean} [input.ephemeral] - Whether the message should be ephemeral
     * @param {string} [input.content]
     * @param {Embed[]} [input.embeds]
     * @param {Component} [input.components]
     * @param {Array<Pick<Attachment, 'file' | 'filename'>>} [input.attachments]
     * @param {boolean} [input.tts]
     * @param {AllowedMentions} [input.allowed_mentions]
     * @param {string} [input.thread_name]
     * @returns {Promise<Message>}
     */
    async create(params, input = {}) {
      let flags;
      input.ephemeral ? flags = (1 << 6) : flags = 0;
      const url = `webhooks/${params.application_id}/${params.token}`;
      if (input.attachments && input.attachments.length) {
        return sendAttachment('body', input, url, 'post', null, flags);
      } else {
        const attempt = await attemptHandler({
          method: 'post',
          path: url,
          body: {
            content: input.content ?? '',
            embeds: input.embeds?.length ? input.embeds : [],
            components: input.components?.length ? input.components : [],
            tts: input.tts || false,
            allowed_mentions: input.allowed_mentions ?? null,
            thread_name: input.thread_name ?? null,
            flags,
            attachments: input.attachments ?? []
          }
        });
        return extendPayload(attempt/* , params*/);
      }
    },

    /**
     * @summary
     * ### [Edit Followup Message]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message}
     * - Functions the same as [Edit Webhook Message]{@link module:webhooks#updateMessage}
     * 
     * Edits a previously-sent followup message from the same token.
     * - When the `content` field is edited:
     *   - The `mentions` array in the message object will be reconstructed from scratch based on the new content.
     *   - The `allowed_mentions` field of the edit request controls how this will happen.
     *   - If there is no explicit `allowed_mentions` in the edit request, the content will be parsed with `default` allowances
     *     - (without regard to whether or not an `allowed_mentions` was present in the request that originally created the message)
     * - The `attachments` array must contain all attachments that should be present after the edit, including retained and new attachments
     * @example
     * await params.api.discord.interactions.followup.edit(params, {
     *   content: 'new content',
     *   message_id: '0000000000'
     * });
     * @memberof module:interactions.followup#
     * @method edit
     * @param {object} params 
     * @param {object} input
     * @param {Snowflake} input.message_id
     * @param {boolean} [input.ephemeral]
     * @param {string} [input.content]
     * @param {Embed[]} [input.embeds]
     * @param {Component} [input.components]
     * @param {Array<Pick<Attachment, 'file' | 'filename'>>} [input.attachments]
     * @param {AllowedMentions} [input.allowed_mentions]
     * @param {Snowflake} [input.thread_id]
     * @returns {Promise<Message>}
     */
    async edit(params, input) {
      let flags, endpoint = `webhooks/${params.application_id}/${params.token}/messages/${input.message_id}?`;
      endpoint += `${input.thread_id ? `&thread_id=${input.thread_id}` : ''}`;
      input.ephemeral ? flags = (1 << 6) : flags = 0;
      if (input.attachments && input.attachments.length) {
        return sendAttachment('body', input, endpoint, 'patch', null, flags);
      } else {
        const message = await get(params, {
          message_id: input.message_id
        });
        const attempt = await attemptHandler({
          method: 'patch',
          path: endpoint,
          body: {
            content: input.content ?? message.content,
            embeds: input?.embeds?.[0] || message.embeds[0] ? [{
              title: input.embeds?.[0]?.title ?? message?.embeds?.[0]?.title,
              description: input.embeds?.[0]?.description ?? message?.embeds?.[0]?.description,
              color: input.embeds?.[0]?.color ?? message?.embeds?.[0]?.color,
              url: input.embeds?.[0]?.url ?? message?.embeds?.[0]?.url,
              timestamp: input.embeds?.[0]?.timestamp ?? message?.embeds?.[0]?.timestamp,
              image: { url: input.embeds?.[0]?.image?.url ?? message?.embeds?.[0]?.image?.url },
              thumbnail: { url: input.embeds?.[0]?.thumbnail?.url ?? message?.embeds?.[0]?.thumbnail?.url },
              author: {
                name: input.embeds?.[0]?.author?.name ?? message?.embeds?.[0]?.author?.name,
                icon_url: input.embeds?.[0]?.author?.icon_url ?? message?.embeds?.[0]?.author?.icon_url,
                url: input.embeds?.[0]?.author?.url ?? message?.embeds?.[0]?.author?.url
              },
              footer: {
                text: input.embeds?.[0]?.footer?.text ?? message?.embeds?.[0]?.footer?.text,
                icon_url: input.embeds?.[0]?.footer?.icon_url ?? message?.embeds?.[0]?.footer?.icon_url
              },
              fields: input.embeds?.[0]?.fields ?? message?.embeds?.[0]?.fields
            }] : [],
            components: input.components ?? message.components ?? [],
            allowed_mentions: input.allowed_mentions,
            attachments: input.attachments ?? message.attachments ?? []
          }
        });
        return extendPayload(attempt/* , params*/);
      }
    },

    /**
     * @summary
     * ### [Delete Followup Message]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message}
     * @example
     * await params.api.discord.interactions.followup.del(params, {
     *   message_id: '0000000000'
     * });
     * @memberof module:interactions.followup#
     * @method del
     * @param {object} params 
     * @param {object} input
     * @param {Snowflake} input.message_id
     * @returns {Promise<{statusCode: 204, body: undefined}>}
     */
    async del(params, input) {
      return attemptHandler({
        method: 'del',
        path: `webhooks/${params.application_id}/${params.token}/messages/${input.message_id}`
      });
    }
  }
};


function returnErrr(r) {
  if (r.body.length) {
    console.log(JSON.stringify(JSON.parse(r.body), null, 2));
    let parsed;
    if (parsed = JSON.parse(r.body)) {
      if (parsed.errors) {
        const errinfo = {};
        Object.keys(parsed.errors).forEach((x) => {
          errinfo[x] = parsed.errors[x]._errors[0];
        });
        
        return {
          'statusCode': r.statusCode,
          'Code': parsed.code,
          'Message': parsed.message,
          'Details': errinfo
        };
      } else return parsed;
    } else return r;
  } else return {
    'statusCode': r.statusCode,
    'body': r.body
  };
};// end module

async function sendAttachment(sender, params, url, method, type, flags) {
  const FormData = require('form-data');
  const form = new FormData();

  try {
  
    for (const attachment of params.attachments) {
      // console.log('params', JSON.stringify(params.embeds, null, 2));
      if ((!attachment.file && !attachment.url) || !attachment.filename) {
        throw new Error('\nAttachments is missing one or more required properties: \'file\' or \'filename\'\n');
      }
      
      if (await isValidMedia(attachment.file)) {
        if (typeof attachment.file === 'string') {
          const response = await axios.get(attachment.file, {
            responseType: 'arraybuffer'
          });
          attachment.file = Buffer.from(response.data);
        }

      } else if (!Buffer.isBuffer(attachment.file)) {
        throw new Error('\nInvalid file-type provided. Must be of type Buffer or a valid image URL.\n');
      }
    }

    for (let i = 0; i < params.attachments.length; i++) {
      form.append(`files[${i}]`, params.attachments[i].file, params.attachments[i].filename);
    };

    params.flags = flags;
    // if (params.method !== 'patch') {
    // console.log('\n\nPARAMS.METHOD !== \'PATCH\'\n\n');
    console.log('params from interactions sendAttachment() pre map\n', params);

    params.attachments = params.attachments.map((a, index) => ({
      id: index, filename: a.filename, description: a.description ?? ''
    }));
    
    // }
    
    console.log('params from interactions sendAttachment() post map\n', params);

    if (sender === 'data') {
      /*
      params.attachments = params.attachments.map((a, index) => ({
        id: index, filename: a.filename, description: a.description ?? ''
      }));
      */
      console.log('\nSENDER = \'DATA\'\n');
      form.append('payload_json', JSON.stringify({ type: type, data: params }));
    } else {
      console.log('\nSENDER donot= \'DATA\'\n');
      const { attachments, ...newparams } = params;
      console.log('newparams\n', params);      
      form.append('payload_json', JSON.stringify({ data: newparams }));
    }
    const response = await axios({
      method: `${method}`,
      url: `https://discord.com/api/v10/${url}`,
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bot ${process.env.token}`
      }
    });
    
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`\nRequest failed with statusCode: ${response.status}\n${response.data.errors}\n`);
    }
    
    return response.data;

  } catch (e) {

    // console.error(error);
    console.error('Object.keys(error) in sendAttachment:\n', Object.keys(e));
    throw getAxiosError(e);
    
    /* const errinfo = {};
    if (e.response && e.response.status) {
      errinfo.status = e.response.status;
    } else if (e.code) errinfo.status = e.code;
    if (e.response && e.response.statusText) {
      errinfo.message = e.response.statusText;
    } else if (e.message) errinfo.message = e.message;
    if (e.response && e.response.data) {
      if ((Object.keys(e.response.data).length) > 1) {
        errinfo.error = e.response.data;
      } else errinfo.error = e.response.data?.error;
    }
    */
    /*
    if (e.response?.data) {
      if (e.response.data.code)
        errinfo.code = e.response.data.code;
      if (e.response.data.message)
        errinfo.message = e.response.data.message;
      if (e.response.data.errors)
        errinfo.details = JSON.stringify(e.response.data.errors, null, 2);
    } else if (e?.name) {
      errinfo.name = e?.name;
      if (e.message)
        errinfo.message = e.message;
      if (e.code)
        errinfo.code = e.code;
    } else {
      throw e;
    }
    */
    // throw errinfo;
  }

};

/**
 * API Handler Creator for Callback Interactions
 * @param {Object} params
 * @param {string} params.method
 * @param {string} params.path
 * @param {number} params.type
 * @param {Object} params.data
 * @param {boolean} [params.return_date]
 * @returns 
 */
async function handleCallbacks(params) {
  try {

    const r = await https[params.method]({
      url: encodeURI('discord.com'),
      path: encodeURI(`/api/v10/${params.path}`),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: params.type, data: params.data })
    });

    if (r.statusCode >= 200 && r.statusCode < 300) {
      if (params.return_date) return r.headers.date;
      try {
        return JSON.parse(r.body);
      } catch (e) { return r.body ?? r; }
    } else {
      throw new Error(
        r.body.length
          ? isValidJSON(r.body)
            ? returnErr(r)
            : r.body
          : r
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @summary
 * ### [Get Original Interaction Response]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response}
 * - Returns the initial Interaction response.
 * - Functions the same as [Get Webhook Message]{@link module:webhooks#retrieveMessage} 
 * #### Example Response:
 * ```js
 * {
 *   id: '1099441272671961208',
 *   type: 20,
 *   content: 'hello',
 *   channel_id: '1029236067200684145',
 *   author: {
 *     id: '1008074004713701420',
 *     username: 'LostMySocket',
 *     global_name: null,
 *     display_name: null,
 *     avatar: '6394f90cf69e24f5d4d8897bc78f5313',
 *     discriminator: '5808',
 *     public_flags: 0,
 *     bot: true,
 *     avatar_decoration_data: null
 *   },
 *   attachments: [],
 *   embeds: [],
 *   mentions: [],
 *   mention_roles: [],
 *   pinned: false,
 *   mention_everyone: false,
 *   tts: false,
 *   timestamp: '2023-04-22T21:07:06.036000+00:00',
 *   edited_timestamp: null,
 *   flags: 64,
 *   components: [],
 *   application_id: '1008074004713701420',
 *   interaction: {
 *     id: '1099441271820529795',
 *     type: 2,
 *     name: 'colors random',
 *     user: {
 *       id: '298617055190712322',
 *       username: 'LostMyInfo',
 *       global_name: null,
 *       display_name: null,
 *       avatar: '161fca985f4f8c45770e249ab38a47cd',
 *       discriminator: '0001',
 *       public_flags: 4194432,
 *       avatar_decoration_data: null
 *     }
 *   },
 *   webhook_id: '1008074004713701420'
 * }
 * ```
 * @example
 * await params.api.discord.interactions.callback.get_original(params);
 * @memberof module:interactions.callback#
 * @method get_original
 * @param {object} params 
 * @returns {Promise<?Message>}
 */
async function get_original(params) {
  try {
    const attempt = await attemptHandler({
      method: 'get',
      path: `webhooks/${params.application_id}/${params.token}/messages/@original`
    });
    // attempt.trueType = messageType[attempt.type];
    return extendPayload(attempt/* , params*/);
  } catch (error) {
    // console.error(error);
    return null;
  }
}

/**
 * @summary
 * ### [Get Followup Message]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message}
 * - Functions the same as [Get Webhook Message]{@link module:webhooks#retrieveMessage}
 * @example
 * await params.api.discord.interactions.followup.get(params, {
 *   message_id: '0000000000'
 * });
 * @memberof module:interactions.followup#
 * @method get
 * @param {object} params 
 * @param {object} input
 * @param {Snowflake} input.message_id
 * @param {Snowflake} [input.thread_id]
 * @returns {Promise<Message>}
 */
async function get(params, input) {
  let path = `webhooks/${params.application_id}/${params.token}/messages/${input.message_id}?`;
  path += `${input.thread_id ? `&thread_id=${input.thread_id}` : ''}`;
  
  const attempt = await attemptHandler({
    method: 'get',
    path
  });
  return extendPayload(attempt);
}