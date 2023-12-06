// @ts-check

/**
 * @typedef {Object} PlainTextElement
 * @property {string} type - The formatting to use for this text object. Can be one of `plain_text` or `mrkdwn`.
 * @property {string} text - The text for the block. The minimum length is 1 and maximum length is 3000 characters.
 * @property {boolean} [emoji] - Indicates whether emojis in a text field should be escaped into the colon emoji format.
 */

/**
 * @typedef {Object} MrkdwnElement
 * @property {string} type - The formatting to use for this text object. Can be one of `plain_text` or `mrkdwn`.
 * @property {string} text - The text for the block. The minimum length is 1 and maximum length is 3000 characters.
 * @property {boolean} [verbatim]
 */

/**
 * @summary [Text]{@link https://api.slack.com/reference/block-kit/composition-objects#text} Object
 * @description
 * Defines an object containing some text.
 * Formatted either as `plain_text` or using [mrkdwn]{@link https://api.slack.com/reference/surfaces/formatting}.
 * @typedef {PlainTextElement | MrkdwnElement} Text
 */

/**
 * @summary [Confirmation Dialog]{@link https://api.slack.com/reference/block-kit/composition-objects#confirm} Object
 * @description
 * Defines a dialog that adds a confirmation step to interactive elements.
 * An object that defines a dialog that provides a confirmation step to any interactive element.
 * This dialog will ask the user to confirm their action by offering a confirm and deny button.
 * @typedef {Object} ConfirmationDialog
 * @property {PlainTextElement} title - A `plain_text` text object that defines the dialog's title. Maximum length for this field is 100 characters.
 * @property {PlainTextElement} text - A `plain_text` text object that defines the explanatory text that appears in the confirm dialog. Maximum length for the `text` in this field is 300 characters.
 * @property {PlainTextElement} confirm - A plain_text `text` object to define the text of the button that confirms the action. Maximum length for the `text` in this field is 30 characters.
 * @property {PlainTextElement} deny - A `plain_text` text object to define the text of the button that cancels the action. Maximum length for the `text` in this field is 30 characters.
 * @property {string} [style] - Defines the color scheme applied to the `confirm` button. A value of `danger` will display the button with a red background on desktop, or red text on mobile. A value of `primary` will display the button with a green background on desktop, or blue text on mobile. If this field is not provided, the default value will be `primary`.
 */

/**
 * @summary [Conversation Filter]{@link https://api.slack.com/reference/block-kit/composition-objects#filter_conversations} Object
 * @description
 * Defines a filter for the list of options in a conversation selector menu.
 * The menu can be either a [conversations select menu]{@link https://api.slack.com/reference/block-kit/block-elements#conversation_select} or a [conversations multi-select menu]{@link https://api.slack.com/reference/block-kit/block-elements#conversation_multi_select}
 * @typedef {Object} ConversationFilter
 * @property {string[]} [include]
 * - Indicates which type of conversations should be included in the list. When this field is provided, any conversations that do not match will be excluded.
 * - You should provide an array of strings from the following options: `im`, `mpim`, `private`, and `public`. The array cannot be empty.
 * @property {boolean} [exclude_external_shared_channels]
 * - Indicates whether to exclude external [shared channels]{@link https://api.slack.com/enterprise/shared-channels} from conversation lists.
 * - This field will not exclude users from shared channels.
 * - Defaults to `false`
 * @property {boolean} [exclude_bot_users]
 * - Indicates whether to exclude bot users from conversation lists.
 * - Defaults to `false`
 */

/**
 * @summary [Trigger]{@link https://api.slack.com/reference/block-kit/composition-objects#trigger} Object
 * @description
 * Defines an object containing trigger information.
 * @typedef {Object} Trigger
 * @property {string} url - A [link trigger URL]{@link https://api.slack.com/automation/triggers/link}. Must be associated with a valid trigger.
 * @property {InputParameter[]} [customizable_input_parameters] - Each specified name must match an input parameter defined on the workflow of the provided trigger (url), and the input parameter mapping on the trigger must be set as `customizable: true`. 
 * @property {boolean} [emoji] - Indicates whether emojis in a text field should be escaped into the colon emoji format. This field is only usable when `type` is `plain_text`.
 * @property {boolean} [verbatim] - This field is only usable when `type` is `mrkdwn`.
 */

/**
 * @summary [Workflow]{@link https://api.slack.com/reference/block-kit/composition-objects#workflow} Object
 * @description
 * Defines an object containing workflow information
 * @typedef {Object} Workflow
 * @property {Trigger} trigger - A `trigger` object that contains information about a workflow's trigger.
 */

/**
 * @summary [Dispatch Action Configuration]{@link https://api.slack.com/reference/block-kit/composition-objects#dispatch_action_config} Object
 * @description
 * Defines when a [plain-text input element]{@link https://api.slack.com/reference/block-kit/block-elements#input} will return a [block_actions]{@link https://api.slack.com/reference/interaction-payloads/block-actions} interaction payload.
 * @typedef {Object} DispatchActionConfiguration
 * @property {string[]} [trigger_actions_on]
 * - An array of interaction types that you would like to receive a [block_actions payload]{@link https://api.slack.com/reference/interaction-payloads/block-actions} for.
 * - Should be one or both of:
 * - - `on_enter_pressed` - payload is dispatched when user presses the enter key while the input is in focus. Hint text will appear underneath the input explaining to the user to press enter to submit.
 * - - `on_character_entered` - payload is dispatched when a character is entered (or removed) in the input.
 */

/**
 * @summary [Dispatch Action Configuration]{@link https://api.slack.com/reference/block-kit/composition-objects#dispatch_action_config} Object
 * @description
 * Defines a single item in a number of item selection elements.
 * An object that represents a single selectable item in a [select menu]{@link https://api.slack.com/reference/block-kit/block-elements#select}, [multi-select menu]{@link https://api.slack.com/reference/block-kit/block-elements#multi_select}, [checkbox group]{@link https://api.slack.com/reference/block-kit/block-elements#checkboxes}, [radio button group]{@link https://api.slack.com/reference/block-kit/block-elements#radio}, or [overflow menu]{@link https://api.slack.com/reference/block-kit/block-elements#overflow}.
 * @typedef {Object} Option
 * @property {Text} text
 * - A {@link Text} object that defines the text shown in the option on the menu.
 * - Overflow, select, and multi-select menus can only use `plain_text` objects, while radio buttons and checkboxes can use `mrkdwn` text objects.
 * - Maximum length for the `text` in this field is 75 characters.
 * @property {string} value
 * - A unique string value that will be passed to your app when this option is chosen.
 * - Maximum length for this field is 75 characters.
 * @property {PlainTextElement} [description]
 * - A `plain_text` {@link Text} object that defines a line of descriptive text shown below the `text` field beside a single selectable item in a select menu, multi-select menu, checkbox group, radio button group, or overflow menu.
 * - Maximum length for the text within this field is 75 characters.
 * @property {string} [url]
 * - A URL to load in the user's browser when the option is clicked.
 * - The url attribute is only available in overflow menus.
 * - Maximum length for this field is 3000 characters.
 */

/**
 * @summary [Option Group]{@link https://api.slack.com/reference/block-kit/composition-objects#option_group} Object
 * @description
 * Defines a way to group options in a menu.
 * - The menu can be a select menu or a multi-select menu.
 * - An `option_groups` array can have a maximum number of 100 option groups with a maximum of 100 options.
 * @typedef {Object} OptionGroup
 * @property {string} type - The formatting to use for this text object. Can be one of `plain_text` or `mrkdwn`.
 * @property {string} text - The text for the block. This field accepts any of the standard [text formatting markup]{@link https://api.slack.com/reference/surfaces/formatting} when `type` is `mrkdwn`. The minimum length is 1 and maximum length is 3000 characters.
 * @property {boolean} [emoji] - Indicates whether emojis in a text field should be escaped into the colon emoji format. This field is only usable when `type` is `plain_text`.
 * @property {boolean} [verbatim] - This field is only usable when `type` is `mrkdwn`.
 */

/**
 * @typedef {Object} BotProfile
 * @property {string} id
 * @property {string} app_id
 * @property {string} name
 * @property {Object<string, string>} icons
 * @property {boolean} deleted
 * @property {number} updated
 * @property {string} team_id
 */

/**
 * @summary [Slack Message]{@link https://api.slack.com/events/message#subtypes}
 * @typedef {Object} SlackMessage
 * @property {string} bot_id
 * @property {string} type
 * @property {string} [subtype]
 * @property {string} text
 * @property {string} user
 * @property {string} ts
 * @property {string} app_id
 * @property {Block[]} blocks
 * @property {SlackAttachment[]} [attachments]
 * @property {string} team
 * @property {BotProfile} bot_profile
 */
/**
 * @summary [Slack Message Response]{@link https://api.slack.com/methods/chat.postMessage#examples} Object
 * @description
 * The response includes the "timestamp ID" (ts) and the channel-like thing where the message was posted. It also includes the complete message object, as parsed by our servers. This may differ from the provided arguments as our servers sanitize links, attachments, and other properties. Your message may mutate.
 * @typedef {Object} SlackMessageResponse
 * @property {boolean} ok - Status of the message
 * @property {string} channel - Channel ID
 * @property {string} ts - Timestamp
 * @property {SlackMessage} message - This field is only usable when `type` is `mrkdwn`.
 */

/**
 * @template T
 * @typedef {{ [P in keyof T]: T[P] | null }} Nullable<T>
 */

/**
 * @typedef {Object} ModalView
 * @property {string} type - The type of view. Set to `modal` for modals.
 * @property {PlainTextElement} title
 * @property {(KnownBlock | Block)[]} blocks
 * @property {PlainTextElement} [close]
 * @property {PlainTextElement} [submit]
 * @property {string} [private_metadata]
 * @property {string} [callback_id]
 * @property {boolean} [clear_on_close] - Default to false
 * @property {boolean} [notify_on_close] - Default to false
 * @property {string} [external_id]
 */

