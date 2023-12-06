/**
 * @typedef {Object} Block
 * @property {string} type
 * @property {string} [block_id]
 * A string acting as a unique identifier for a block.
 * If not specified, a `block_id` will be generated.
 * You can use this `block_id` when you receive an interaction payload to
 * {@link https://api.slack.com/interactivity/handling#payloads identify the source of the action}.
 * Maximum length for this field is 255 characters. 
 * `block_id` should be unique for each message and each iteration of a message. 
 */

/**
 * @summary [File Block]{@link }
 * @description
 * Displays a {@link https://api.slack.com/messaging/files/remote remote file}.
 * You can't add this block to app surfaces directly, but it will show up when {@link https://api.slack.com/messaging/retrieving retrieving messages}
 * that contain remote files.
 * @typedef {Object} FileBlock
 * @property {string} type - The type of view. Set to `file` for files.
 * @property {string} source - At the moment, source will always be `remote` for a remote file.
 * @property {string} external_id - The external unique ID for this file.
 */

/**
 * @summary [Header Block]{@link }
 * @description
 * Displays a larger-sized text block.
 * @typedef {Object} HeaderBlock
 * @property {string} type - The type of block Set to `header` for header blocks.
 * @property {PlainTextElement} text
 * - The text for the block, in the form of a {@link PlainTextElement}.
 * - Maximum length for the text in this field is 150 characters.
 */

/**
 * @summary [Image Block]{@link }
 * @description Displays an image.
 * @typedef {Object} ImageBlock
 * @property {string} type - The type of block Set to `image` for image blocks.
 * @property {string} image_url - The URL of the image to be displayed. Maximum length for this field is 3000 characters.
 * @property {string} alt_text - A plain-text summary of the image. This should not contain any markup. Maximum length for this field is 2000 characters.
 * @property {PlainTextElement} [title] - An optional title for the image in the form of a {@link PlainTextElement} object. Maximum length for the text in this field is 2000 characters.
 */

/**
 * @summary [Input Block]{@link }
 * @description
 * Displays contextual info, which can include both images and text.
 * @typedef {Object} InputBlock
 * @property {string} type - The type of block Set to `input` for input blocks.
 * @property {PlainTextElement} label - A label that appears above an input element in the form of a {@link PlainTextElement} object. Maximum length for the text in this field is 2000 characters.
 * @property {PlainTextElement} [hint] - An optional hint that appears below an input element in a lighter grey. It must be a {@link PlainTextElement object}. Maximum length for the `text` in this field is 2000 characters.
 * @property {boolean} [optional] - A boolean that indicates whether the input element may be empty when a user submits the modal. Defaults to `false`.
 * @property {boolean} [dispatch_action] - A boolean that indicates whether or not the use of elements in this block should dispatch a {@link https://api.slack.com/reference/interaction-payloads/block-actions block_actions payload}. Defaults to `false`.
 * @property {Select | MultiSelect | Datepicker | Timepicker | DateTimepicker | PlainTextInput | URLInput | EmailInput | NumberInput | RadioButtons | Checkboxes | RichTextInput | FileInput} element - A block element.
 */

/**
 * @summary [Rich Text Block]{@link }
 * @description
 * Displays contextual info, which can include both images and text.
 * @typedef {Object} RichTextBlock
 * @property {string} type - The type of block Set to `rich_text` for rich text blocks.
 * @property {(RichTextSection | RichTextList | RichTextQuote | RichTextPreformatted)[]} elements - Maximum number of items is 10.
 */

/**
 * @summary [Actions Block]{@link }
 * @description
 * Holds multiple interactive elements.
 * @typedef {Object} ActionsBlock
 * @property {string} type - The type of block Set to `actions` for actions blocks.
 * @property {(SlackButton | Checkboxes | Datepicker | DateTimepicker | MultiSelect | Overflow | RadioButtons | Select | Timepicker | WorkflowButton | RichTextInput)[]} elements - There is a maximum of 25 elements in each action block.
 */

/**
 * @summary [Divider Block]{@link }
 * @description
 * Visually separates pieces of info inside of a message.
 * A content divider, like an `<hr>`, to split up different blocks inside of a message.
 * The divider block is nice and neat, requiring only a `type`.
 * @typedef {Object} DividerBlock
 * @property {string} type - The type of block Set to `divider` for context blocks.
 */

/**
 * @summary [Context Block]{@link }
 * @description
 * Displays contextual info, which can include both images and text.
 * @typedef {Object} ContextBlock
 * @property {string} type - The type of block Set to `context` for context blocks.
 * @property {(ImageElement | PlainTextElement | MrkdwnElement)[]} elements - Maximum number of items is 10.
 */

/**
 * @summary [Section Block]{@link }
 * @description
 * Displays text, possibly alongside block elements.
 * A section can be used as a simple text block, in combination with text fields, or side-by-side with certain {@link https://api.slack.com/reference/messaging/block-elements block elements}.
 * @typedef {Object} SectionBlock
 * @property {string} type - The type of block Set to `section` for context blocks.
 * @property {PlainTextElement | MrkdwnElement} [text] - This field is not required if a valid array of `fields` objects is provided instead.
 * @property {(PlainTextElement | MrkdwnElement)[]} [fields] - Required if no `text` is provided. Any text objects included with `fields` will be rendered in a compact format that allows for 2 columns of side-by-side text.
 * @property {SlackButton | DatePicker | TimePicker | Select | MultiSelect | Actionable | ImageElement | RadioButtons | Checkboxes} [accessory]
 */

/**
 * @typedef {ImageBlock | SectionBlock | DividerBlock | ContextBlock | ActionsBlock | InputBlock | FileBlock | HeaderBlock | RichTextBlock} KnownBlock
 */