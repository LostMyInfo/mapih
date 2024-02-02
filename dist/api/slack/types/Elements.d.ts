type ButtonElement = {
    /**
     * - Type of element. In this case, always `button`
     */
    type: string;
    /**
     * Defines the button's text - maximum length: 75 characters.
     */
    text: PlainTextElement;
    /**
     * A URL to load in the user's browser when the button is clicked - maximum length: 3000
     */
    url?: string | undefined;
    /**
     * The value to send along with the [interaction payload]{@link https://api.slack.com/interactivity/handling#payloads} - maximum length: 2000
     */
    value?: string | undefined;
    /**
     * Decorative buttons with alternative visual color schemes.
     * - Options: `primary` and `danger`
     */
    style?: string | undefined;
    /**
     * Defines an optional confirmation dialog after the button is clicked.
     */
    confirm?: ConfirmationDialog | undefined;
    /**
     * A label for longer descriptive text about a button element - maximum length: 75
     * - This label will be read out by screen readers instead of the button `text` object.
     */
    accessibility_label?: string | undefined;
};
type CheckboxesElement = {
    /**
     * Type of element. In this case, always `checkboxes`
     */
    type: string;
    /**
     * An identifier for this action - maximum length: 255
     */
    action_id?: string | undefined;
    /**
     * Maximum of 10 options are allowed.
     */
    options?: Option[] | undefined;
    /**
     * An array of option objects that exactly matches one or more of the options within `options`.
     * - These options will be selected when the checkbox group initially loads.
     */
    initial_options?: Option[] | undefined;
    /**
     * Defines an optional confirmation dialog after clicking one of the checkboxes in this element.
     */
    confirm?: ConfirmationDialog | undefined;
    /**
     * Indicates whether the element will be set to auto focus within the `view object`. Only one element can be set to true.
     */
    focus_on_load?: boolean | undefined;
};
type DatePickerElement = {
    /**
     * - Type of element. In this case, always `datepicker`
     */
    type: string;
    /**
     * An identifier for this action - maximum length: 255
     */
    action_id?: string | undefined;
    /**
     * The initial date that is selected when the element is loaded.
     * - This should be in the format `YYYY-MM-DD`.
     */
    initial_date?: Option[] | undefined;
    /**
     * Defines an optional confirmation dialog after a date is selected.
     */
    confirm?: ConfirmationDialog | undefined;
    /**
     * Indicates whether the element will be set to auto focus within the `view object`. Only one element can be set to true.
     */
    focus_on_load?: boolean | undefined;
    /**
     * Defines the placeholder text shown on the datepicker - maximum length: 150
     */
    placeholder?: PlainTextElement | undefined;
};
type DateTimePickerElement = {
    /**
     * - Type of element. In this case, always `datetimepicker`
     */
    type: string;
    /**
     * An identifier for this action - maximum length: 255
     */
    action_id?: string | undefined;
    /**
     * The initial date and time that is selected when the element is loaded, represented as a UNIX timestamp in seconds.
     * - This should be in the format of 10 digits.
     */
    initial_date_time?: Option[] | undefined;
    /**
     * Defines an optional confirmation dialog after a time is selected.
     */
    confirm?: ConfirmationDialog | undefined;
    /**
     * Indicates whether the element will be set to auto focus within the `view object`. Only one element can be set to true.
     */
    focus_on_load?: boolean | undefined;
};
type EmailInputElement = {
    /**
     * - Type of element. In this case, always `button`
     */
    type: string;
    /**
     * An identifier for this action - maximum length: 255
     */
    action_id?: string | undefined;
    /**
     * The initial value in the email input when it is loaded.
     */
    initial_value?: Option[] | undefined;
    /**
     * Determines when during text input the element returns a `block_actions` payload.
     */
    dispatch_action_config?: DispatchActionConfiguration | undefined;
    /**
     * Indicates whether the element will be set to auto focus within the `view object`. Only one element can be set to true.
     */
    focus_on_load?: boolean | undefined;
    /**
     * Defines the placeholder text shown in the email input - maximum length: 150
     */
    placeholder?: PlainTextElement | undefined;
};
type SlackDescriptionElement = {
    emoji?: boolean | undefined;
    type?: string | undefined;
    text?: string | undefined;
    verbatim?: boolean | undefined;
};
//# sourceMappingURL=Elements.d.ts.map