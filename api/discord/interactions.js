const https = require(`../utils/https`);
// https://discord.com/developers/docs/interactions/receiving-and-responding#interactions             
/**
 * INTERACTION CALLBACKS  
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
 */
module.exports.callback = {
  /**
   * The `reply()` method is used to immediately respond and reply to an interaction.
   * 
   * Callback Type: `4`, -- `CHANNEL_MESSAGE_WITH_SOURCE`
   * 
   * @param {object} interaction payload
   * @param {object} input parameters
   * @returns {Promise<object>} {...}
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
   */
  async reply(interaction, input = {}) {
    try {
      return (
        (cb_reply = await https.post({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/interactions/${interaction.id}/${interaction.token}/callback`),
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 4,
            data: {
              tts: input.tts,
              content: input.content,
              embeds: input.embeds ?? input.embed,
              allowed_mentions: input.allowed_mentions,
              flags: (input.ephemeral) ? (1 << 6) : 0,
              components: input.components,
              attachments: input.attachments,
            },
          }),
        }))
      ) ? cb_reply : false;
    } catch (e) {
      console.log(e);
      return e;
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
   * @returns {Promise<object>} {...}
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
   */
  async defer(interaction, input = {}) {
    try {
      return (
        (cb_defer = await https.post({
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
        }))
      ) ? cb_defer : false;
    } catch (e) {
      console.log(e);
      return e;
    }
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
   * @returns {Promise<object>} {...}
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
   */
  async component_defer(interaction, input = {}) {
    try {
      return (
        (cb_comp_defer = await https.post({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/interactions/${interaction.id}/${interaction.token}/callback`),
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 6,
            data: { flags: (input.ephemeral) ? (1 << 6) : 0, },
          }),
        }))
      ) ? cb_comp_defer : false;
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  /**
   * The `component_update()` method allows editing of the components parent message.
   * 
   * Callback Type: `7`, -- `UPDATE_MESSAGE` *for components
   * 
   * @param {object} interaction 
   * @param {object} input 
   * @returns {Promise<object>} {...}
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
   */
  async component_update(interaction, input = {}) {
    try {
      return (
        (cb_comp_update = await https.post({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/interactions/${interaction.id}/${interaction.token}/callback`),
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 7,
            data: {
              tts: input.tts,
              content: input.content,
              embeds: input.embeds ?? input.embed,
              allowed_mentions: input.allowed_mentions,
              flags: (input.ephemeral) ? (1 << 6) : 0,
              components: input.components,
              attachments: input.attachments,
            },
          }),
        }))
      ) ? cb_comp_update : false;
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  /**
   * The `autocomplete_reply()` method responds to an autocomplete interaction with suggested choices
   * 
   * Callback Type: `8`, -- `APPLICATION_COMMAND_AUTOCOMPLETE_RESULT`
   * 
   * @param {object} interaction 
   * @param {object} input 
   * @returns {Promise<object>} {...}
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
   */
  async autocomplete_reply(interaction, input = {}) {
    try {
      return (
        (cb_auto_reply = await https.post({
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
        }))
      ) ? cb_auto_reply : false;
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  /**
   * The `modal_reply()` method responds to an interaction with a popup modal
   * 
   * Callback Type: `9`, -- `MODAL`
   * 
   * @param {object} interaction 
   * @param {object} input 
   * @returns {Promise<object>} {...}
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
   */
  async modal_reply(interaction, input = {}) {
    try {
      return (
        (cb_modal_reply = await https.post({
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
        }))
      ) ? cb_modal_reply : false;
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  /**
   * The `get_original()` method is used to return the initial Interaction response.
   * 
   * @param {object} interaction 
   * @returns {Promise<object>} {...}
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response
   */
  async get_original(interaction) {
    try {
      return (
        (get_origin = await https.get({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`),
          headers: {
            'Content-Type': 'application/json',
          },
          body: '',
        }))
      ) ? JSON.parse(get_origin.body.toString()) : false;
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  /**
   * The `edit_original()` method is used to edit the initial Interaction response.
   * 
   * @param {object} interaction 
   * @param {object} input 
   * @returns {Promise<object>} {...}
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response
   */
  async edit_original(interaction, input = {}) {
    try {
      return (
        (edit_origin = await https.patch({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`),
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tts: input.tts,
            content: input.content,
            embeds: input.embeds ?? input.embed,
            allowed_mentions: input.allowed_mentions,
            components: input.components,
            attachments: input.attachments,
          }),
        }))
      ) ? JSON.parse(edit_origin.body.toString()) : false;
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  /**
   * The `delete_original()` method is used to delete the initial Interaction response.
   * 
   * @param {object} interaction 
   * @returns {Promise<object>} {...}
   * 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response
   */
  async delete_original(interaction) {
    try {
      return (
        (delete_origin = await https.del({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`),
          headers: {
            'Content-Type': 'application/json',
          },
          body: '',
        }))
      ) ? delete_origin : false;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
};

/**
 * INTERACTION FOLLOWUPS
 * https://discord.com/developers/docs/interactions/receiving-and-responding#followup-messages
 */
module.exports.followup = {
  /**
   * The `create()` method is used to edit an initially deferred interaction, following up with a new response.
   * @param {object} interaction 
   * @param {object} input 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message
   */
  async create(interaction, input = {}) {
    try {
      return (
        (f_create = await https.post({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/webhooks/${interaction.application_id}/${interaction.token}`),
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: input.content,
            //username: interaction.member.user.username,
            username: input.username,
            //avatar_url,
            tts: input.tts,
            embeds: input.embed ?? input.embeds,
            allowed_mentions: input.allowed_mentions,
            components: input.components,
            //files[],
            //payload_json,
            attachments: input.attachments,
            flags: (input.ephemeral) ? (1 << 6) : 0,
          }),
        }))
      ) ? f_create : false;
    } catch (e) {
      console.log(e);
      return e;
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
      return (
        (f_edit = await https.patch({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/webhooks/${interaction.application_id}/${interaction.token}/messages/${input.message_id}`),
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: input.content,
            embeds: input.embeds ?? input.embed,
            allowed_mentions: input.allowed_mentions,
            components: input.components,
            //files[],
            //payload_json,
            attachments: input.attachments,
          }),
        }))
      ) ? f_edit : false;
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  /**
   * The `get()` method is used to retrieve a followup message for an Interaction.
   * @param {object} interaction 
   * @param {object} input 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message
   */
  async get(interaction, input = {}) {
    try {
      return (
        (f_get = await https.get({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/webhooks/${interaction.application_id}/${interaction.token}/messages/${input.message_id}`),
          headers: {
            'Content-Type': 'application/json',
          },
          body: '',
        }))
      ) ? f_get : false;
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  /**
   * The `del()` method is used to delete the followup message for an Interaction.
   * @param {object} interaction 
   * @param {object} input 
   * @url https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message
   */
  async del(interaction, input = {}) {
    try {
      return (
        (f_delete_followup = await https.del({
          url: encodeURI(`discord.com`),
          path: encodeURI(`/api/webhooks/${interaction.application_id}/${interaction.token}/messages/${input.message_id}`),
          headers: {
            'Content-Type': 'application/json',
          },
          body: '',
        }))
      ) ? f_delete_followup : false;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
};
