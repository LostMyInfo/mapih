const https = require(`../utils/https`);
// https://discord.com/developers/docs/interactions/receiving-and-responding#interactions             
/***************************************************/
/**           INTERACTION CALLBACKS               **/
/***************************************************/
module.exports.callback = {
  /**
   * The `reply()` method is used to immediately respond and reply to an interaction.
   * 
   * Callback Type: `4`, -- `CHANNEL_MESSAGE_WITH_SOURCE`
   * 
   * @param {object} interaction 
   * @param {object} input object of parameters
   * @returns Promise
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
   */
  async reply(interaction, input = {}) {
    try {
      const url = `/api/interactions/${interaction.id}/${interaction.token}/callback`;
      input.flags = (input.ephemeral) ? (1 << 6) : 0;
      var cb_reply;
      (input?.attachments && input?.attachments?.length)
        ? await sendAttachment(input, url, 'post', 4, input.flags)
        : cb_reply = await https.post({
          url: encodeURI(`discord.com`),
          path: encodeURI(url),
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 4, data: input }),
        });
      return cb_reply;
    } catch (e) {
      console.log('Callback Reply Error:', e);
    }
  },

  /**
   * The `defer()` method is used to acknowledge an interaction and wait for a followup. User sees a thinking/loading state.
   * 
   * Callback Type: `5`, -- `DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE`
   * 
   * @param {object} interaction 
   * @param {object} input 
   * defer method only accepts an ephemeral boolean.
   * 
   * example:
   * ```js 
   * callback.defer(interaction,{ ephemeral: true }); 
   * ```
   * @returns Promise
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
   */
  async defer(interaction, input = {}) {
    let cb_defer;
    try {
      cb_defer = await https.post({
        url: encodeURI(`discord.com`),
        path: encodeURI(`/api/interactions/${interaction.id}/${interaction.token}/callback`),
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 5,
          data: {
            flags: (input.ephemeral) ? (1 << 6) : 0,
          },
        }),
      });
    } catch (e) {
      console.log(e);
    }
    return cb_defer;
  },

  /**
   * The `component_defer()` method is used to acknowledge a component interaction and wait for a followup. User does NOT see a thinking/loading state.
   * 
   * Callback Type: `6`, -- `DEFERRED_UPDATE_MESSAGE` *for components
   * 
   * @param {object} interaction 
   * @param {object} input only accepts a boolean ephemeral.
   * 
   * example:
   * ```js 
   * callback.component_defer(interaction,{ ephemeral: true }); 
   * ```
   * @returns Promise
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
   */
  async component_defer(interaction, input = {}) {
    let cb_comp_defer;
    try {
      cb_comp_defer = await https.post({
        url: encodeURI(`discord.com`),
        path: encodeURI(`/api/interactions/${interaction.id}/${interaction.token}/callback`),
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 6,
          data: { flags: (input.ephemeral) ? (1 << 6) : 0 },
        }),
      });
    } catch (e) {
      console.log(e);
    }
    return cb_comp_defer;
  },

  /**
   * The `component_update()` method allows editing of the components parent message.
   * 
   * Callback Type: `7`, -- `UPDATE_MESSAGE` *for components
   * 
   * @param {object} interaction 
   * @param {object} input 
   * @returns Promise
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
   */
  async component_update(interaction, input = {}) {
    try {
      const url = `/api/interactions/${interaction.id}/${interaction.token}/callback`;
      input.flags = (input.ephemeral) ? (1 << 6) : 0;
      var cb_comp_update;
      (input?.attachments && input?.attachments?.length)
        ? await sendAttachment(input, url, 'post', 7, input.flags)
        : cb_comp_update = await https.post({
          url: encodeURI(`discord.com`),
          path: encodeURI(url),
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 7, data: input }),
        }); return cb_comp_update;
    } catch (e) {
      console.log(e);
    }

  },

  /**
   * The `autocomplete_reply()` method responds to an autocomplete interaction with suggested choices
   * 
   * Callback Type: `8`, -- `APPLICATION_COMMAND_AUTOCOMPLETE_RESULT`
   * 
   * @param {object} interaction 
   * @param {object} input 
   * @returns Promise
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
   */
  async autocomplete_reply(interaction, input = {}) {
    let cb_auto_reply;
    try {
      cb_auto_reply = await https.post({
        url: encodeURI(`discord.com`),
        path: encodeURI(`/api/interactions/${interaction.id}/${interaction.token}/callback`),
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 8,
          data: {
            choices: input,
          },
        }),
      });
    } catch (e) {
      console.log(e);
    }
    return cb_auto_reply;
  },

  /**
   * The `modal_reply()` method responds to an interaction with a popup modal
   * 
   * Callback Type: `9`, -- `MODAL`
   * 
   * @param {object} interaction 
   * @param {object} input 
   * @returns Promise
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
   */
  async modal_reply(interaction, input = {}) {
    let cb_modal_reply;
    try {
      cb_modal_reply = await https.post({
        url: encodeURI(`discord.com`),
        path: encodeURI(`/api/interactions/${interaction.id}/${interaction.token}/callback`),
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 9,
          data: {
            custom_id: input.custom_id,
            title: input.title,
            components: input.components,
          },
        }),
      });
    } catch (e) {
      console.log(e);
    }
    return cb_modal_reply;
  },

  /**
   * The `get_original()` method is used to return the initial Interaction response.
   * 
   * @param {object} interaction 
   * @returns Promise
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response
   */
  async get_original(interaction) {
    let get_origin;
    try {
      get_origin = await https.get({
        url: encodeURI(`discord.com`),
        path: encodeURI(`/api/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`),
        headers: {
          'Content-Type': 'application/json',
        },
        body: '',
      });
    } catch (e) {
      console.log(e);
    }
    return JSON.parse(get_origin.body.toString());
  },

  /**
   * The `edit_original()` method is used to edit the initial Interaction response.
   * 
   * @param {object} interaction 
   * @param {object} input
   * @returns Promise
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response
   */
  async edit_original(interaction, input = {}) {
    try {
      const url = `/api/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`;
      input.flags = (input.ephemeral) ? (1 << 6) : 0;
      var edit_origin;
      (input?.attachments && input?.attachments?.length)
        ? await sendAttachment(input, url, 'patch', null, input.flags)
        : edit_origin = await https.patch({
          url: encodeURI(`discord.com`),
          path: encodeURI(url),
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        }); return JSON.parse(edit_origin.body.toString());
    } catch (e) {
      console.log(e);
    }

  },

  /**
   * The `delete_original()` method is used to delete the initial Interaction response.
   * 
   * @param {object} interaction 
   * @returns Promise
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response
   */
  async delete_original(interaction) {
    let delete_origin;
    try {
      delete_origin = await https.del({
        url: encodeURI(`discord.com`),
        path: encodeURI(`/api/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`),
        headers: {
          'Content-Type': 'application/json',
        },
        body: '',
      });
    } catch (e) {
      console.log(e);
    }
    return delete_origin;
  },
};

/***************************************************/
/**           INTERACTION FOLLOWUPS               **/
/***************************************************/
module.exports.followup = {
  /**
   * The `create()` method is used to edit an initially deferred interaction, following up with a new response.
   * @param {object} interaction 
   * @param {object} input 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message
   */
  async create(interaction, input = {}) {
    try {
      const url = `/api/webhooks/${interaction.application_id}/${interaction.token}`;
      input.flags = (input.ephemeral) ? (1 << 6) : 0;
      var f_create;
      (input?.attachments && input?.attachments?.length)
        ? await sendAttachment(input, url, 'post', null, input.flags)
        : f_create = await https.post({
          url: encodeURI(`discord.com`),
          path: encodeURI(url),
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
      return f_create;
    } catch (e) {
      console.log(e);
    }

  },

  /**
   * The `edit()` method is used to edit a followup message for an Interaction.
   * @param {object} interaction 
   * @param {object} input 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message
   */
  async edit(interaction, input = {}) {
    try {
      const url = `/api/webhooks/${interaction.application_id}/${interaction.token}/messages/${input.message_id}`;
      input.flags = (input.ephemeral) ? (1 << 6) : 0;
      var f_edit;
      (input?.attachments && input?.attachments?.length)
        ? await sendAttachment(input, url, 'patch', null, input.flags)
        : f_edit = await https.patch({
          url: encodeURI(`discord.com`),
          path: encodeURI(url),
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
      return f_edit;
    } catch (e) {
      console.log(e);
    }

  },

  /**
   * The `get()` method is used to retrieve a followup message for an Interaction.
   * @param {object} interaction 
   * @param {object} input 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message
   */
  async get(interaction, input = {}) {
    let f_get;
    try {
      f_get = await https.get({
        url: encodeURI(`discord.com`),
        path: encodeURI(`/api/webhooks/${interaction.application_id}/${interaction.token}/messages/${input.message_id}`),
        headers: {
          'Content-Type': 'application/json',
        },
        body: '',
      });
    } catch (e) {
      console.log(e);
    }
    return f_get;
  },

  /**
   * The `del()` method is used to delete the followup message for an Interaction.
   * @param {object} interaction 
   * @param {object} input 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message
   */
  async del(interaction, input = {}) {
    let f_delete_followup;
    try {
      f_delete_followup = await https.del({
        url: encodeURI(`discord.com`),
        path: encodeURI(`/api/webhooks/${interaction.application_id}/${interaction.token}/messages/${input.message_id}`),
        headers: {
          'Content-Type': 'application/json',
        },
        body: '',
      });
    } catch (e) {
      console.log(e);
    }
    return f_delete_followup;
  },
};

/**
 * Attachment handler for Interactions. 
 * 
 * Thanks LostMyInfo :)
 */
async function sendAttachment(params, url, method, type, flags) {
  const FormData = require('form-data');
  const axios = require('axios');
  const form = new FormData();
  for (let i = 0; i < params.attachments.length; i++) {
    form.append(`files[${i}]`, params.attachments[i].file, params.attachments[i].filename);
  }
  params.flags = flags;
  params.attachments = params.attachments.map((a, index) => ({
    id: index, filename: a.filename, description: a.description ?? ''
  }));
  form.append('payload_json', JSON.stringify({ type: type, data: params }));
  await axios({
    method: `${method}`,
    url: `https://discord.com${url}`,
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
