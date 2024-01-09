// @ts-check
/**
 * @summary [Button Element]{@link https://api.slack.com/reference/block-kit/block-elements#button}
 * @typedef {Object} ButtonElement
 * @property {string} type - Type of element. In this case, always `button`
 * @property {PlainTextElement} text Defines the button's text - maximum length: 75 characters.
 * @property {string} [url] A URL to load in the user's browser when the button is clicked - maximum length: 3000
 * @property {string} [value] The value to send along with the [interaction payload]{@link https://api.slack.com/interactivity/handling#payloads} - maximum length: 2000
 * @property {string} [style] Decorative buttons with alternative visual color schemes.
 * - Options: `primary` and `danger`
 * @property {ConfirmationDialog} [confirm] Defines an optional confirmation dialog after the button is clicked.
 * @property {string} [accessibility_label] A label for longer descriptive text about a button element - maximum length: 75
 * - This label will be read out by screen readers instead of the button `text` object.
 */

/**
 * @summary [Checkboxes Element]{@link https://api.slack.com/reference/block-kit/block-elements#checkboxes}
 * @description Allows users to choose multiple items from a list of options.
 * @typedef {Object} CheckboxesElement
 * @property {string} type Type of element. In this case, always `checkboxes`
 * @property {string} [action_id] An identifier for this action - maximum length: 255
 * @property {Option[]} [options] Maximum of 10 options are allowed.
 * @property {Option[]} [initial_options] An array of option objects that exactly matches one or more of the options within `options`.
 * - These options will be selected when the checkbox group initially loads.
 * @property {ConfirmationDialog} [confirm] Defines an optional confirmation dialog after clicking one of the checkboxes in this element.
 * @property {boolean} [focus_on_load] Indicates whether the element will be set to auto focus within the `view object`. Only one element can be set to true.
 */

/**
 * @summary [Date Picker Element]{@link https://api.slack.com/reference/block-kit/block-elements#datepicker}
 * @description Allows users to select a date from a calendar style UI.
 * @typedef {Object} DatePickerElement
 * @property {string} type - Type of element. In this case, always `datepicker`
 * @property {string} [action_id] An identifier for this action - maximum length: 255
 * @property {Option[]} [initial_date] The initial date that is selected when the element is loaded.
 * - This should be in the format `YYYY-MM-DD`.
 * @property {ConfirmationDialog} [confirm] Defines an optional confirmation dialog after a date is selected.
 * @property {boolean} [focus_on_load] Indicates whether the element will be set to auto focus within the `view object`. Only one element can be set to true.
 * @property {PlainTextElement} [placeholder] Defines the placeholder text shown on the datepicker - maximum length: 150
 */

/**
 * @summary [Datetime Picker Element]{@link https://api.slack.com/reference/block-kit/block-elements#datetimepicker}
 * @description Allows users to select both a date and a time of day, formatted as a Unix timestamp.
 * @typedef {Object} DateTimePickerElement
 * @property {string} type - Type of element. In this case, always `datetimepicker`
 * @property {string} [action_id] An identifier for this action - maximum length: 255
 * @property {Option[]} [initial_date_time] The initial date and time that is selected when the element is loaded, represented as a UNIX timestamp in seconds.
 * - This should be in the format of 10 digits.
 * @property {ConfirmationDialog} [confirm] Defines an optional confirmation dialog after a time is selected.
 * @property {boolean} [focus_on_load] Indicates whether the element will be set to auto focus within the `view object`. Only one element can be set to true.
 */

/**
 * @summary [Email Input Element]{@link https://api.slack.com/reference/block-kit/block-elements#email}
 * @typedef {Object} EmailInputElement
 * @property {string} type - Type of element. In this case, always `button`
 * @property {string} [action_id] An identifier for this action - maximum length: 255
 * @property {Option[]} [initial_value] The initial value in the email input when it is loaded.
 * @property {DispatchActionConfiguration} [dispatch_action_config] Determines when during text input the element returns a `block_actions` payload.
 * @property {boolean} [focus_on_load] Indicates whether the element will be set to auto focus within the `view object`. Only one element can be set to true.
 * @property {PlainTextElement} [placeholder] Defines the placeholder text shown in the email input - maximum length: 150 
 */


/**
 * @typedef {Object} SlackDescriptionElement
 * @property {boolean} [emoji]
 * @property {string} [type]
 * @property {string} [text]
 * @property {boolean} [verbatim]
 */