type SlackBlock = {
    type: string;
    /**
     * A string acting as a unique identifier for a block.
     * If not specified, a `block_id` will be generated.
     * You can use this `block_id` when you receive an interaction payload to
     * {@link https://api.slack.com/interactivity/handling#payloads identify the source of the action}.
     * Maximum length for this field is 255 characters.
     * `block_id` should be unique for each message and each iteration of a message.
     */
    block_id?: string | undefined;
};
type FileBlock = {
    /**
     * - The type of view. Set to `file` for files.
     */
    type: string;
    /**
     * - At the moment, source will always be `remote` for a remote file.
     */
    source: string;
    /**
     * - The external unique ID for this file.
     */
    external_id: string;
};
type HeaderBlock = {
    /**
     * - The type of block Set to `header` for header blocks.
     */
    type: string;
    /**
     * - The text for the block, in the form of a {@link PlainTextElement }.
     * - Maximum length for the text in this field is 150 characters.
     */
    text: PlainTextElement;
};
type ImageBlock = {
    /**
     * - The type of block Set to `image` for image blocks.
     */
    type: string;
    /**
     * - The URL of the image to be displayed. Maximum length for this field is 3000 characters.
     */
    image_url: string;
    /**
     * - A plain-text summary of the image. This should not contain any markup. Maximum length for this field is 2000 characters.
     */
    alt_text: string;
    /**
     * - An optional title for the image in the form of a {@link PlainTextElement } object. Maximum length for the text in this field is 2000 characters.
     */
    title?: PlainTextElement | undefined;
};
type InputBlock = {
    /**
     * - The type of block Set to `input` for input blocks.
     */
    type: string;
    /**
     * - A label that appears above an input element in the form of a {@link PlainTextElement } object. Maximum length for the text in this field is 2000 characters.
     */
    label: PlainTextElement;
    /**
     * - An optional hint that appears below an input element in a lighter grey. It must be a {@link PlainTextElement object}. Maximum length for the `text` in this field is 2000 characters.
     */
    hint?: PlainTextElement | undefined;
    /**
     * - A boolean that indicates whether the input element may be empty when a user submits the modal. Defaults to `false`.
     */
    optional?: boolean | undefined;
    /**
     * - A boolean that indicates whether or not the use of elements in this block should dispatch a {@link https://api.slack.com/reference/interaction-payloads/block-actions block_actions payload}. Defaults to `false`.
     */
    dispatch_action?: boolean | undefined;
    /**
     * - A block element.
     */
    element: Select | MultiSelect | DatePickerElement | Timepicker | DateTimePickerElement | PlainTextInput | URLInput | EmailInput | NumberInput | RadioButtons | CheckboxesElement | RichTextInput | FileInput;
};
type RichTextBlock = {
    /**
     * - The type of block Set to `rich_text` for rich text blocks.
     */
    type: string;
    /**
     * - Maximum number of items is 10.
     */
    elements: (RichTextSection | RichTextList | RichTextQuote | RichTextPreformatted)[];
};
type ActionsBlock = {
    /**
     * - The type of block Set to `actions` for actions blocks.
     */
    type: string;
    /**
     * - There is a maximum of 25 elements in each action block.
     */
    elements: (SlackButton | CheckboxesElement | DatePickerElement | DateTimePickerElement | MultiSelect | Overflow | RadioButtons | Select | Timepicker | WorkflowButton | RichTextInput)[];
};
type DividerBlock = {
    /**
     * - The type of block Set to `divider` for context blocks.
     */
    type: string;
};
type ContextBlock = {
    /**
     * - The type of block Set to `context` for context blocks.
     */
    type: string;
    /**
     * - Maximum number of items is 10.
     */
    elements: (ImageElement | PlainTextElement | MrkdwnElement)[];
};
type SectionBlock = {
    /**
     * - The type of block Set to `section` for context blocks.
     */
    type: string;
    /**
     * - This field is not required if a valid array of `fields` objects is provided instead.
     */
    text?: PlainTextElement | MrkdwnElement | undefined;
    /**
     * - Required if no `text` is provided. Any text objects included with `fields` will be rendered in a compact format that allows for 2 columns of side-by-side text.
     */
    fields?: (PlainTextElement | MrkdwnElement)[] | undefined;
    accessory?: SlackButton | DatePickerElement | TimePicker | Select | MultiSelect | Actionable | ImageElement | RadioButtons | CheckboxesElement;
};
type KnownBlock = ImageBlock | SectionBlock | DividerBlock | ContextBlock | ActionsBlock | InputBlock | FileBlock | HeaderBlock | RichTextBlock;
type SlackAttachmentBlock = {
    accessory?: SlackAccessory | undefined;
    alt_text?: string | undefined;
    app_collaborators?: string[] | undefined;
    app_id?: string | undefined;
    author_name?: string | undefined;
    block_id?: string | undefined;
    bot_user_id?: string | undefined;
    button_label?: string | undefined;
    description?: string | SlackDescriptionElement | undefined;
    developer_trace_id?: string | undefined;
    elements?: SlackAccessory[] | undefined;
    fallback?: string | undefined;
    fields?: SlackDescriptionElement[] | undefined;
    function_trigger_id?: string | undefined;
    image_bytes?: number | undefined;
    image_height?: number | undefined;
    image_width?: number | undefined;
    image_url?: string | undefined;
    is_workflow_app?: boolean | undefined;
    owning_team_id?: string | undefined;
    provider_icon_url?: string | undefined;
    provider_name?: string | undefined;
    sales_home_workflow_app_type?: number | undefined;
    share_url?: string | undefined;
    text?: SlackDescriptionElement | undefined;
    thumbnail_url?: string | undefined;
    title?: string | SlackDescriptionElement | undefined;
    title_url?: string | undefined;
    trigger_subtype?: string | undefined;
    trigger_type?: string | undefined;
    type?: string | undefined;
    url?: string | undefined;
    video_url?: string | undefined;
    workflow_id?: string | undefined;
};
//# sourceMappingURL=Blocks.d.ts.map