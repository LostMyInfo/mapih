/**
 * @global
 */

/**
 * @summary [Button Component]{@link https://discord.com/developers/docs/interactions/message-components#buttons}
 * - An Action Row can contain up to 5 buttons
 * - An Action Row containing buttons cannot also contain any select menu components
 * @typedef {Object} Button
 * @property {ComponentType} type - The type of the component (2 for button).
 * @property {ButtonStyle} style - The button's [style]{@link ButtonStyle}
 * @property {string} [label] - Text that appears on the button; max 80 characters
 * @property {PartialEmoji} [emoji] - The emoji to be displayed on the button.
 * @property {string} [custom_id] - Developer-defined identifier for the button; max 100 characters
 * @property {string} [url] - URL for link-style buttons
 * @property {boolean} [disabled=false] - Whether the button is disabled.
 */

/**
 * @summary [Select Menu Component]{@link https://discord.com/developers/docs/interactions/message-components#select-menus}
 * @typedef {Object} SelectMenu
 * @property {ComponentType} type - The [type]{@link ComponentType} of the component (3-8 for select menus).
 * @property {string} custom_id - A unique identifier for the select menu.
 * @property {SelectOption[]} [options] - Specified choices in a select menu (only required and available for string selects (type `3`); max 25
 * @property {ChannelType} [channel_types] - List of channel types to include in the channel select component (type `8`)
 * @property {string} [placeholder] - The text to be displayed when no option is selected.
 * @property {number} [min_values=1] - Minimum number of items that must be chosen; min 0, max 25
 * @property {number} [max_values=1] - Maximum number of items that can be chosen; max 25
 * @property {boolean} [disabled=false] - Whether the button is disabled.
 */

/** 
 * @summary [Select Menu Option]{@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
 * @typedef {Object} SelectOption
 * @property {string} label - User-facing name of the option; max 100 characters
 * @property {string} value - Dev-defined value of the option; max 100 characters
 * @property {string} [description] - Additional description of the option; max 100 characters
 * @property {PartialEmoji} [emoji] - The emoji to be displayed for the option.
 * @property {boolean} [default=false] - Will show this option as selected by default
 */

/**
 * @summary Text Input Component ([Modal]{@link https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure})
 * @typedef {Object} Modal
 * @property {ComponentType} type - The type of the component (`4` for text input)
 * @property {string} custom_id - Developer-defined identifier for the input; max 100 characters
 * @property {TextInputStyle} style - The [text input style]{@link TextInputStyle}
 * @property {string} label - Label for this component; max 45 characters
 * @property {number} [min_length] - Minimum input length for a text input; min 0, max 4000
 * @property {number} [max_length] - Maximum input length for a text input; min 1, max 4000
 * @property {boolean} [required=true] - Whether this component is required to be filled
 * @property {string} [value] - Pre-filled value for this component; max 4000 characters
 * @property {string} [placeholder] - Custom placeholder text if the input is empty; max 100 characters
 */

/**
 * @summary [Action Rows]{@link https://discord.com/developers/docs/interactions/message-components#action-rows}
 * An Action Row is a non-interactive container component for other types of components.
 * 
 * It has a `type: 1` and a sub-array of [Message Components]{@link MessageComponent}
 * - You can have up to 5 Action Rows per message
 * - An Action Row cannot contain another Action Row
 * @example
 * {
 *   content: 'This is a Components array with an Action Row,
 *   components: [
 *     {
 *       type: 1,
 *       components: []
 *     }
 *   ]
 * }
 * // @property {MessageComponent[] | InteractionData[]} components
 * 
 * @template {MessageActionRow | Modal} C
 * @typedef {Object} ActionRow
 * @property {C[]} components - Placeholder for components
 * @property {number} type - Must be 1 for 'ACTION_ROW'
 */
// @template {MessageActionRow | Modal} C
// @template {ActionRowComponentTypes} C

/*
 * @template C
 * @typedef {Object} ActionRow
 * @property {C[]} components - Placeholder for components
 * @property {1} type - Must be 1 for 'ACTION_ROW'
 */

/**
 * @typedef {Button | SelectMenu} MessageActionRow
 * A variety of message component types
 * - [Button]{@link Button}
 * - [Select Menu]{@link SelectMenu}
 */

/**
 * @summary [Message Components]{@link https://discord.com/developers/docs/interactions/message-components#message-components}
 * A framework for adding interactive elements to the messages your app or bot sends.
 * - The top-level `components` field is an array of [Action Row]{@link ActionRow} components.
 * @example
 * {
 *   content: 'This is a components field with a button component',
 *   components: [
 *     {
 *       type: 1,
 *       components: [
 *         {
 *           type: 2,
 *           label: 'Click me!',
 *           style: 1,
 *           custom_id: 'click_one'
 *         }
 *       ]
 *     }
 *   ]
 * }
 * @typedef {Array<ActionRow<Button | SelectMenu | Modal>>} Component
 */

/**
 * @summary [Interaction Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type}
 * | Type | Value |
 * |------|-------|
 * | Ping | 1 |
 * | Application Command | 2 |
 * | Message Component | 3 |
 * | Application Command Autocomplete | 4 |
 * | Modal Submit | 5 |
 * @typedef {number} InteractionType
 */


/**
 * @summary [Application Command Interaction Data Option]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-interaction-data-option-structure}
 * - All options have names, and an option can either be a parameter and input value--in which case `value` will be set--or it can denote a subcommand or group--in which case it will contain a top-level key and another array of `options`.
 * - `value` and `options` are mutually exclusive
 * @typedef {Object} ApplicationCommandInteractionDataOption
 * @property {string} name
 * @property {ApplicationCommandOptionType} type
 * @property {string | number | boolean} [value]
 * @property {ApplicationCommandInteractionDataOption[]} [options]
 * @property {boolean} [focused]
 */

/**
 * @summary [Application Command Data]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-data-structure}
 * - Sent in `APPLICATION_COMMAND` AND `APPLICATION_COMMAND_AUTOCOMPLETE` interactions.
 * @typedef {Object} ApplicationCommandInteractionData
 * @property {Snowflake} id
 * @property {string} name
 * @property {ApplicationCommandType} type
 * @property {ResolvedData} [resolved]
 * @property {ApplicationCommandInteractionDataOption[]} [options]
 * @property {Snowflake} guild_id
 * @property {Snowflake} [target_id]
 */

/**
 * @summary [Resolved Data]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-resolved-data-structure}
 * - Partial Member objects are missing `user`, `deaf` and `mute` fields.
 * - Partial Channel objects only have `id`, `name`, `type` and `permissions` fields.
 * - Threads will also have `thread_metadata` and `parent_id` fields.
 * @typedef {Object} ResolvedData
 * @property {Object<Snowflake, User>} [users] - The ids and [User]{@link https://discord.com/developers/docs/resources/user#user-object} objects
 * @property {Object<Snowflake, MemberParams>} [members] - The ids and partial [Member]{@link https://discord.com/developers/docs/resources/guild#guild-member-object} objects
 * @property {Object<Snowflake, Role>} [roles] - The ids and [Role]{@link https://discord.com/developers/docs/topics/permissions#role-object} objects
 * @property {Object<Snowflake, Channel>} [channels] - The ids and partial [Channel]{@link https://discord.com/developers/docs/resources/channel#channel-object} objects
 * @property {Object<Snowflake, Message>} [messages] - The ids and partial [Message]{@link https://discord.com/developers/docs/resources/channel#message-object} objects
 * @property {Object<Snowflake, Attachment>} [attachments] - The ids and [Attachment]{@link https://discord.com/developers/docs/resources/channel#attachment-object} objects
 */

/**
 * @typedef {Object} MessageComponentInteractionData
 * @property {string} custom_id
 * @property {ComponentType} component_type
 * @property {string[]} [values]
 */

/**
 * @typedef {Object} ModalSubmitComponentData
 * @property {string} value - Input value for text input
 * @property {ComponentType} type - The type of the component (4 for Modal).
 * @property {string} custom_id - Custom ID of the text input field
 */

/**
 * @typedef {Object} ModalSubmitInteractionData
 * @property {string} custom_id
 * @property {Array<ActionRow<ModalSubmitComponentData>>} [components]
 */

/**
 * @summary [Interaction Data]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-data}
 * @typedef {ModalSubmitInteractionData | ApplicationCommandInteractionData | MessageComponentInteractionData} InteractionData
 */

// slash command
const slashCommand = {
  data: { // ActionRow<ApplicationCommandInteractionData>
    type: 1,
    options: [{ // ApplicationCommandInteractionDataOption[]
      value: 'string',
      type: 7, // channel
      name: 'channel'
    }],
    resolved: {
      channels: {
        '12345': {
          // channel object
        }
      }
    }
  }
};

// Modal Submit
const modalSubmit = {
  message: {
    components: [{ // Array<ActionRow<Button | SelectMenu>>
      type: 1,
      components: [{
        type: 2,
        style: 1,
        label: 'string',
        custom_id: 'string'
      }]
    }]
  },
  data: { // ModalSubmitInteractionData
    custom_id: 'string',
    components: [{ // Array<ActionRow<ModalComponentData>>
      type: 1,
      components: [{ // ModalComponentData[]
        value: 'string',
        type: 4,
        custom_id: 'string'
      }]
    }]
  }
};

// Button Interaction
const buttonInteraction = {
  message: {
    components: [ // Array<ActionRow<Button | SelectMenu>>
      { 
        type: 1,
        components: [{
          type: 3, // SelectMenu
          custom_id: 'string',
          placeholder: 'string',
          options: [{ // SelectOption[]
            value: 'string',
            label: 'string',
            description: 'string'
          }],
          min_values: 1,
          max_values: 5
        }]
      },
      {
        type: 1,
        components: [{
          type: 2, // Button
          style: 1,
          label: 'string',
          custom_id: 'string'
        }]
      }
    ]
  },
  data: { // MessageComponentInteractionData
    custom_id: 'string',
    component_type: 2
  }
};

// Button Interaction
const selectMenuInteraction = {
  message: {
    components: [] // Array<ActionRow<Button | SelectMenu>>
  },
  data: { // MessageComponentInteractionData
    values: ['string'], // SelectOptionValues[]
    custom_id: 'string',
    component_type: 3
  }
};