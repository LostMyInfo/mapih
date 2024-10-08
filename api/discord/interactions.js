/* eslint-disable max-statements-per-line */
/* eslint-disable brace-style */
/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable node/no-unsupported-features/es-syntax */
// @ts-check
'use-strict';

const { attemptHandler, token } = require('../resources/handlers');
const { https } = require('../utils/https');
const { extendPayload, isValidMedia } = require('../resources/functions');
const { embedModifier } = require('../resources/functions');
const { ResponseError } = require('../resources/Errors');

/**
 * @file
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
     * await api.discord.interactions.callback.get_original(params);
     * @memberof module:interactions.callback#
     * @method get_original
     * @param {Pick<InteractionParams, 'application_id' | 'token'>} params
     * @returns {Promise<?Message>}
     */
    get_original: async (params) => {
      try {
        const attempt = await attemptHandler({
          method: 'GET',
          endpoint: `webhooks/${params.application_id}/${params.token}/messages/@original`
        });
        return extendPayload(attempt/* , params*/);
      } catch (error) {
        return null;
      }
    },

    /**
     * @summary
     * ### [Create Interaction Response]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response}
     *
     * - Used to immediately respond and reply to an interaction.
     *
     * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `4` (`CHANNEL_MESSAGE_WITH_SOURCE`)
     * @example
     * await api.discord.interactions.callback.reply(params, {
     *   ephemeral: true,
     *   content: 'content',
     *   embeds: [{
     *     title: 'Michael',
     *     description: 'is cool'
     *   }]
     * })
     * @memberof module:interactions.callback#
     * @method reply
     * @param {Pick<InteractionParams, 'id' | 'token'>} params
     * @param {object} input
     * @param {boolean} [input.ephemeral] - Whether the message should be ephemeral
     * @param {number} [input.flags]
     * @param {string} [input.content]
     * @param {Embed[]} [input.embeds]
     * @param {Component} [input.components]
     * @param {Array<Pick<Attachment, 'file' | 'filename' | ?'description'>>} [input.attachments]
     * @param {boolean} [input.tts]
     * @param {AllowedMentions} [input.allowed_mentions]
     * @param {boolean} [input.return_date]
     * @returns {Promise<boolean | Date | undefined | null>}
     */
    reply: async (params, input = {}) => {
      input.flags = input.ephemeral ? (1 << 6) : 0;
      if (input.embeds?.length) {
        input.embeds = embedModifier(input.embeds);
      }

      try {
        if (input.attachments && input.attachments?.length)
          return sendAttachment('data', input, `interactions/${params.id}/${params.token}/callback`, 'post', 4, input.flags);
        else {
          await attemptHandler({
            method: 'POST',
            endpoint: `interactions/${params.id}/${params.token}/callback`,
            body: {
              type: 4,
              data: {
                content: input.content ?? '',
                embeds: input.embeds ?? [],
                components: input.components ?? [],
                tts: input.tts || false,
                allowed_mentions: input.allowed_mentions ?? null,
                flags: input.flags
              }
            }
          });
        }
        if (input.return_date)
          return new Date();
        else return true;
      } catch (e) {
        throw e;
      }
    },


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
     * await api.discord.interactions.callback.defer(params, {
     *   ephemeral: true
     * });
     * @example
     * await api.discord.interactions.callback.defer(params)
     * @memberof module:interactions.callback#
     * @method defer
     * @param {Pick<InteractionParams, 'id' | 'token'>} params event parameters
     * @param {object} [input] user input
     * @param {boolean} [input.ephemeral]
     * @returns {Promise<Date>}
     */
    defer: async (params, input = {}) =>
      handleCallbacks({
        method: 'POST',
        path: `interactions/${params.id}/${params.token}/callback`,
        type: 5,
        data: {
          flags: input.ephemeral ? (1 << 6) : 0
        },
        return_date: true
      }),

    /**
     * @summary
     * ### Defered Update Message (Components)
     * - Used to acknowledge a component interaction and wait for a followup.
     * - User does NOT see a thinking/loading state.
     * - Only accepts an ephemeral boolean
     *
     * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `6` (`DEFERRED_UPDATE_MESSAGE` *for components)
     * @example
     * await api.discord.interactions.callback.component_defer(params, {
     *   ephemeral: true
     * });
     * @example
     * await api.discord.interactions.callback.component_defer(params)
     * @memberof module:interactions.callback#
     * @method component_defer
     * @param {Pick<InteractionParams, 'id' | 'token'>} params event parameters
     * @param {object} [input] user input
     * @param {boolean} [input.ephemeral]
     * @returns {Promise<{ statusCode: 204, type: 'discord', message: 'Success' }>}
     */
    component_defer: async (params, input = {}) =>
      handleCallbacks({
        method: 'POST',
        path: `interactions/${params.id}/${params.token}/callback`,
        type: 6,
        data: {
          flags: input.ephemeral ? (1 << 6) : 0
        },
        return_date: true
      }),

    /**
     * @summary
     * ### Update Message (Components)
     * - Allows for editing of the message the component was attached to.
     *
     * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `7` (`UPDATE_MESSAGE` *for components)
     * @example
     * await api.discord.interactions.callback.component_update(params, {
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
     * @param {Pick<InteractionParams, 'id' | 'token'>} params
     * @param {object} input
     * @param {boolean} [input.ephemeral] - Whether the message should be ephemeral
     * @param {number} [input.flags]
     * @param {string} [input.content]
     * @param {Embed[]} [input.embeds]
     * @param {Component} [input.components]
     * @param {Array<Pick<Attachment, 'file' | 'filename' | ?'description'>>} [input.attachments]
     * @param {boolean} [input.tts]
     * @param {AllowedMentions} [input.allowed_mentions]
     * @returns {Promise<?{ statusCode: 204, type: 'discord', message: 'Success' }|undefined>}
     */
    component_update: async (params, input = {}) => {
      const url = `interactions/${params.id}/${params.token}/callback`;
      input.flags = input.ephemeral ? (1 << 6) : 0;
      if (input.attachments && input.attachments.length) {
        const
          attachmentPayload = {
            content: input.content,
            embeds: input.embeds,
            components: input.components,
            allowed_mentions: input.allowed_mentions,
            attachments: input.attachments
          },
          result = await sendAttachment('data', attachmentPayload, url, 'POST', 7, input.flags);
        // console.log('Attachment component_update result:', result);
        return result;
      } else {
        return handleCallbacks({
          method: 'POST',
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
     * @param {Pick<InteractionParams, 'id' | 'token'>} params
     * @param {object} input
     * @param {Array<Pick<ApplicationCommandOptionChoice, 'name' | 'value'>>} input.choices
     * @returns {Promise<{ statusCode: 204, type: 'discord', message: 'Success' }>}
     */
    autocomplete_reply: async (params, input) =>
      handleCallbacks({
        method: 'POST',
        path: `interactions/${params.id}/${params.token}/callback`,
        type: 8,
        data: input
      }),

    /**
     * @summary
     * ### [Text Inputs (Modals)]{@link https://discord.com/developers/docs/interactions/message-components#text-inputs}
     * - Interactive component that render on modals.
     * - They can be used to collect short-form or long-form text.
     *
     * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `9` (`MODAL`)
     * @memberof module:interactions.callback#
     * @method modal_reply
     * @param {Pick<InteractionParams, 'id' | 'token'>} params
     * @param {Object} input
     * @param {string} input.custom_id
     * @param {string} input.title
     * @param {Component} input.components
     * @returns {Promise<{ statusCode: 204, type: 'discord', message: 'Success' }>}
     */
    modal_reply: async (params, input) =>
      handleCallbacks({
        method: 'POST',
        path: `interactions/${params.id}/${params.token}/callback`,
        type: 9,
        data: input
      }),

    /**
     * @summary
     * ### [Edit Original Interaction Response]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response}
     * - Edits the initial Interaction response.
     * - Functions the same as [Edit Webhook Message]{@link module:webhooks#updateMessage}
     * @example
     * await api.discord.interactions.callback.update_original(params, {
     *   content: 'new content',
     * });
     * @memberof module:interactions.callback#
     * @method update_original
     * @param {Pick<InteractionParams, 'application_id' | 'token'>} params
     * @param {object} input
     * @param {string} [input.content]
     * @param {Embed[]} [input.embeds]
     * @param {Component} [input.components]
     * @param {Array<Pick<Attachment, 'file' | 'filename' | ?'description'>>} [input.attachments]
     * @param {AllowedMentions} [input.allowed_mentions]
     * @param {boolean} [input.ephemeral]
     * @returns {Promise<?Message|undefined>}
     */
    update_original: async (params, input = {}) => {
      try {
        if (!params || typeof params !== 'object') throw new Error('Missing or Invalid params provided.');

        const endpoint = `webhooks/${params.application_id}/${params.token}/messages/@original`;
        if (input.attachments && input.attachments.length) {

          try {
            const attachmentPayload = {
              content: input.content,
              embeds: input.embeds,
              components: input.components,
              allowed_mentions: input.allowed_mentions,
              attachments: input.attachments
            };

            const result = await sendAttachment('body', attachmentPayload, endpoint, 'PATCH', null, 0);
            // console.log('Attachment update_original result:', result);
            return result;
          } catch (error) {
            console.log('Error updating message with attachments:', error);
            throw error;
          }
        } else {
          let message;
          try {
            message = await attemptHandler({
              method: 'GET',
              endpoint: `webhooks/${params.application_id}/${params.token}/messages/@original`
            });
          } catch (error) {}
          if (!message) return null;

          const { embeds } = input;
          const embed = embeds?.[0] || undefined;
          const attempt = await attemptHandler({
            method: 'PATCH',
            endpoint: endpoint,
            body: {
              content: input.content ?? message.content,
              embeds: ('embeds' in input && !input.embeds?.length) || (!message?.embeds?.length && !embed) ? [] : [{
                title: embed?.title ?? message.embeds?.[0]?.title,
                description: embed?.description ?? message.embeds?.[0]?.description,
                color: embed?.color ?? message.embeds?.[0]?.color,
                url: embed?.url ?? message.embeds?.[0]?.url,
                timestamp: embed?.timestamp ?? message.embeds?.[0]?.timestamp,
                image: { url: embed?.image?.url ?? message.embeds?.[0]?.image?.url },
                thumbnail: { url: embed?.thumbnail?.url ?? message.embeds?.[0]?.thumbnail?.url },
                author: {
                  name: embed?.author?.name ?? message.embeds?.[0]?.author?.name,
                  icon_url: embed?.author?.icon_url ?? message.embeds?.[0]?.author?.icon_url,
                  url: embed?.author?.url ?? message.embeds?.[0]?.author?.url
                },
                footer: {
                  text: embed?.footer?.text ?? message.embeds?.[0]?.footer?.text,
                  icon_url: embed?.footer?.icon_url ?? message.embeds?.[0]?.footer?.icon_url
                },
                fields: embed?.fields ?? message.embeds?.[0]?.fields
              }],
              components: 'components' in input ? !input.components?.length ? [] : input.components : message.components,
              allowed_mentions: input.allowed_mentions
            }
          });
          return extendPayload(attempt/* , params*/);
        }
      } catch (error) {
        console.log('Error in update_original:', error);
        throw error;
      }
    },

    /**
     * @summary
     * ### [Delete Original Interaction Response]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response}
     * - Deletes the initial Interaction response.
     * @example
     * await api.discord.interactions.callback.delete_original(params);
     * @memberof module:interactions.callback#
     * @method delete_original
     * @param {Pick<InteractionParams, 'application_id' | 'token'>} params
     * @returns {Promise<{ statusCode: 204, type: 'discord', message: 'Success' }>}
     */
    delete_original: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `webhooks/${params.application_id}/${params.token}/messages/@original`
      }),

    /**
     * @summary
     * ### [Premium Required]{@link https://discord.com/developers/docs/interactions/application-commands#autocomplete}
     * - Respond to an interaction with an upgrade button, only available for apps with monetization enabled.
     *
     * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `10` (`PREMIUM_REQUIRED`)
     * @memberof module:interactions.callback#
     * @method upgrade
     * @param {Pick<InteractionParams, 'id' | 'token'>} params
     * @param {object} [input]
     * @returns {Promise<{ statusCode: 204, type: 'discord', message: 'Success' }>}
     */
    upgrade: async (params, input) =>
      handleCallbacks({
        method: 'POST',
        path: `interactions/${params.id}/${params.token}/callback`,
        type: 10,
        data: input
      })
  },

  /**
   * @summary INTERACTION FOLLOWUPS
   * @namespace followup
   * @memberof module:interactions
   */
  followup: {

    /**
     * @summary
     * ### [Get Followup Message]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message}
     * - Functions the same as [Get Webhook Message]{@link module:webhooks#retrieveMessage}
     * @example
     * await api.discord.interactions.followup.retrieve(params, {
     *   message_id: '0000000000'
     * });
     * @memberof module:interactions.followup#
     * @method get
     * @param {Pick<InteractionParams, 'application_id' | 'token'>} params
     * @param {object} input
     * @param {Snowflake} input.message_id
     * @param {Snowflake} [input.thread_id]
     * @returns {Promise<Message>}
     */
    retrieve: async (params, input) => {
      let endpoint = `webhooks/${params.application_id}/${params.token}/messages/${input.message_id}?`;
      endpoint += `${input.thread_id ? `&thread_id=${input.thread_id}` : ''}`;

      const attempt = await attemptHandler({
        method: 'GET',
        endpoint
      });
      return extendPayload(attempt);
    },

    /**
     * @summary
     * ### [Create Followup Message]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message}
     * - Used to create a followup message for an Interaction
     *   - This can be a deferred response or a new followup completely
     * - Functions the same as [Execute Webhook]{@link module:webhooks#execute}, but `wait` is always true.
     * - The `thread_id`, `avatar_url`, and `username` parameters are not supported when using this endpoint for interaction followups.
     * @example
     * await api.discord.interactions.followup.create(params, {
     *   ephemeral: true,
     *   content: 'followup message',
     *   embeds: [{
     *     title: 'hello',
     *     description: 'this is a description'
     *   }]
     * });
     * @memberof module:interactions.followup#
     * @method create
     * @param {Pick<InteractionParams, 'application_id' | 'token'>} params
     * @param {object} input
     * @param {boolean} [input.ephemeral] - Whether the message should be ephemeral
     * @param {string} [input.content]
     * @param {Embed[]} [input.embeds]
     * @param {Component} [input.components]
     * @param {Array<Pick<Attachment, 'file' | 'filename' | ?'description'>>} [input.attachments]
     * @param {boolean} [input.tts]
     * @param {AllowedMentions} [input.allowed_mentions]
     * @param {string} [input.thread_name]
     * @returns {Promise<?Message|undefined>}
     */
    create: async (params, input = {}) => {
      const flags = input.ephemeral ? (1 << 6) : 0;
      const url = `webhooks/${params.application_id}/${params.token}`;
      if (input.embeds?.length) {
        input.embeds = embedModifier(input.embeds);
      }

      if (input.attachments && input.attachments.length) {
        const
          attachmentPayload = {
            content: input.content,
            embeds: input.embeds,
            components: input.components,
            allowed_mentions: input.allowed_mentions,
            attachments: input.attachments
          },
          result = await sendAttachment('body', attachmentPayload, url, 'POST', null, flags);
        // console.log('Attachment followup.create result:', result);
        return result;
      } else {
        const attempt = await attemptHandler({
          method: 'POST',
          endpoint: url,
          body: {
            content: input.content ?? '',
            embeds: input.embeds?.length ? input.embeds : [],
            components: input.components?.length ? input.components : [],
            tts: input.tts || false,
            allowed_mentions: input.allowed_mentions ?? null,
            thread_name: input.thread_name ?? null,
            flags
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
     * await api.discord.interactions.followup.edit(params, {
     *   content: 'new content',
     *   message_id: '0000000000'
     * });
     * @memberof module:interactions.followup#
     * @method edit
     * @param {Pick<InteractionParams, 'application_id' | 'token'>} params
     * @param {object} input
     * @param {Snowflake} input.message_id
     * @param {boolean} [input.ephemeral]
     * @param {string} [input.content]
     * @param {Embed[]} [input.embeds]
     * @param {Component} [input.components]
     * @param {Array<Pick<Attachment, 'file' | 'filename' | ?'description'>>} [input.attachments]
     * @param {AllowedMentions} [input.allowed_mentions]
     * @param {Snowflake} [input.thread_id]
     * @returns {Promise<?Message|undefined>}
     */
    update: async (params, input) => {
      const flags = input.ephemeral ? (1 << 6) : 0;
      let endpoint = `webhooks/${params.application_id}/${params.token}/messages/${input.message_id}?`;
      endpoint += `${input.thread_id ? `&thread_id=${input.thread_id}` : ''}`;
      if (input.attachments && input.attachments.length) {
        const
          attachmentPayload = {
            content: input.content,
            embeds: input.embeds,
            components: input.components,
            allowed_mentions: input.allowed_mentions,
            attachments: input.attachments
          },
          result = await sendAttachment('body', attachmentPayload, endpoint, 'PATCH', null, flags);
        // console.log('Attachment followup.update result:', result);
        return result;
      } else {
        const message = await attemptHandler({
          method: 'GET',
          endpoint: endpoint
        });

        const { embeds } = input;
        const embed = embeds?.[0] || undefined;
        const attempt = await attemptHandler({
          method: 'PATCH',
          endpoint: endpoint,
          body: {
            content: input.content ?? message.content,
            embeds: ('embeds' in input && !embed) || (!message.embeds?.length && !embed) ? [] : [{
              title: embed?.title ?? message.embeds?.[0]?.title,
              description: embed?.description ?? message.embeds?.[0]?.description,
              color: embed?.color ?? message.embeds?.[0]?.color,
              url: embed?.url ?? message.embeds?.[0]?.url,
              timestamp: embed?.timestamp ?? message.embeds?.[0]?.timestamp,
              image: { url: embed?.image?.url ?? message.embeds?.[0]?.image?.url },
              thumbnail: { url: embed?.thumbnail?.url ?? message.embeds?.[0]?.thumbnail?.url },
              author: {
                name: embed?.author?.name ?? message.embeds?.[0]?.author?.name,
                icon_url: embed?.author?.icon_url ?? message.embeds?.[0]?.author?.icon_url,
                url: embed?.author?.url ?? message.embeds?.[0]?.author?.url
              },
              footer: {
                text: embed?.footer?.text ?? message.embeds?.[0]?.footer?.text,
                icon_url: embed?.footer?.icon_url ?? message.embeds?.[0]?.footer?.icon_url
              },
              fields: embed?.fields ?? message.embeds?.[0]?.fields
            }],
            components: 'components' in input ? !input.components?.length ? [] : input.components : message.components,
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
     * await api.discord.interactions.followup.del(params, {
     *   message_id: '0000000000'
     * });
     * @memberof module:interactions.followup#
     * @method del
     * @param {Pick<InteractionParams, 'application_id' | 'token'>} params
     * @param {object} input
     * @param {Snowflake} input.message_id
     * @returns {Promise<{ statusCode: 204, type: 'discord', message: 'Success' }>}
     */
    destroy: async (params, input) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `webhooks/${params.application_id}/${params.token}/messages/${input.message_id}`
      })
  }
};

/**
 * @param {string} sender
 * @param {{[key: string]: any}} params
 * @param {string} url
 * @param {string} method
 * @param {?number} type
 * @param {number} flags
 */
async function sendAttachment(sender, params, url, method, type, flags) {
  if (!params.attachments) return null;

  const
    form = new FormData(),
    attachments = [];

  for (const [index, { file, filename, description }] of params.attachments.entries()) {
    if (!file || !filename) throw new Error('Each attachment must have "file" and "filename" properties.');

    const blob = typeof file === 'string' && await isValidMedia(file)
      ? await (await fetch(file)).blob()
      : file instanceof Blob ? file : new Blob([file]);

    form.append(`files[${index}]`, blob, filename.replace(/[^a-z0-9_\-\.]/gi, '_'));
    attachments.push({ id: index, filename, description: description || '' });
  }

  const payload = sender === 'data'
    ? { type, data: { ...params, flags, attachments } }
    : { ...params, flags, attachments };

  form.append('payload_json', JSON.stringify(payload));

  try {
    const
      response = await fetch(`https://discord.com/api/v10/${url}`, {
        method,
        body: form,
        headers: {
          'Authorization': `Bot ${token('discord', 'discord')}`
        }
      }),
      data = await response.text().then(text =>
        (() => { try { return JSON.parse(text); } catch { return text; } })()
      );
      /*
      data = await response.text().then(text => {
        try { return JSON.parse(text); }
        catch { return text; }
      });
      */
    if (!response.ok) throw new ResponseError(data, response, 'discord_error');
    return data;
  } catch (e) {
    console.log('Error in sendAttachment:', e);
    throw e;
  }
};

/**
 * API Handler Creator for Callback Interactions
 * @param {Object} params
 * @param {string} params.method
 * @param {string} params.path
 * @param {number} params.type
 * @param {Object|undefined} params.data
 * @param {boolean} [params.return_date]
 * @private
 */
async function handleCallbacks(params) {
  try {

    const r = await https({
      method: params.method,
      url: `https://discord.com/api/v10/${params.path}`,
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ type: params.type, data: params.data })
    });

    return r;

  } catch (error) {
    // console.log(error);
    throw error;
  }
}
