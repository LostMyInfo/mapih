export type SlackPagination = {
    first?: number | undefined;
    last?: number | undefined;
    page?: number | undefined;
    page_count?: number | undefined;
    per_page?: number | undefined;
    total_count?: number | undefined;
};
export type SlackPaging = {
    count?: number | undefined;
    pages?: number | undefined;
    page?: number | undefined;
    total?: number | undefined;
};
export type PlainTextElement = {
    /**
     * - The formatting to use for this text object. Can be one of `plain_text` or `mrkdwn`.
     */
    type: string;
    /**
     * - The text for the block. The minimum length is 1 and maximum length is 3000 characters.
     */
    text: string;
    /**
     * - Indicates whether emojis in a text field should be escaped into the colon emoji format.
     */
    emoji?: boolean | undefined;
};
export type MrkdwnElement = {
    /**
     * - The formatting to use for this text object. Can be one of `plain_text` or `mrkdwn`.
     */
    type: string;
    /**
     * - The text for the block. The minimum length is 1 and maximum length is 3000 characters.
     */
    text: string;
    verbatim?: boolean | undefined;
};
export type Text = PlainTextElement | MrkdwnElement;
export type ConfirmationDialog = {
    /**
     * - A `plain_text` text object that defines the dialog's title. Maximum length for this field is 100 characters.
     */
    title: PlainTextElement;
    /**
     * - A `plain_text` text object that defines the explanatory text that appears in the confirm dialog. Maximum length for the `text` in this field is 300 characters.
     */
    text: PlainTextElement;
    /**
     * - A plain_text `text` object to define the text of the button that confirms the action. Maximum length for the `text` in this field is 30 characters.
     */
    confirm: PlainTextElement;
    /**
     * - A `plain_text` text object to define the text of the button that cancels the action. Maximum length for the `text` in this field is 30 characters.
     */
    deny: PlainTextElement;
    /**
     * - Defines the color scheme applied to the `confirm` button. A value of `danger` will display the button with a red background on desktop, or red text on mobile. A value of `primary` will display the button with a green background on desktop, or blue text on mobile. If this field is not provided, the default value will be `primary`.
     */
    style?: string | undefined;
};
export type ConversationFilter = {
    /**
     * - Indicates which type of conversations should be included in the list. When this field is provided, any conversations that do not match will be excluded.
     * - You should provide an array of strings from the following options: `im`, `mpim`, `private`, and `public`. The array cannot be empty.
     */
    include?: string[] | undefined;
    /**
     * - Indicates whether to exclude external [shared channels]{@link https://api.slack.com/enterprise/shared-channels} from conversation lists.
     * - This field will not exclude users from shared channels.
     * - Defaults to `false`
     */
    exclude_external_shared_channels?: boolean | undefined;
    /**
     * - Indicates whether to exclude bot users from conversation lists.
     * - Defaults to `false`
     */
    exclude_bot_users?: boolean | undefined;
};
export type Trigger = {
    /**
     * - A [link trigger URL]{@link https://api.slack.com/automation/triggers/link}. Must be associated with a valid trigger.
     */
    url: string;
    /**
     * - Each specified name must match an input parameter defined on the workflow of the provided trigger (url), and the input parameter mapping on the trigger must be set as `customizable: true`.
     */
    customizable_input_parameters?: SlackCustomizableInputParameter[] | undefined;
    /**
     * - Indicates whether emojis in a text field should be escaped into the colon emoji format. This field is only usable when `type` is `plain_text`.
     */
    emoji?: boolean | undefined;
    /**
     * - This field is only usable when `type` is `mrkdwn`.
     */
    verbatim?: boolean | undefined;
};
export type Workflow = {
    /**
     * - A `trigger` object that contains information about a workflow's trigger.
     */
    trigger: Trigger;
};
export type DispatchActionConfiguration = {
    /**
     * - An array of interaction types that you would like to receive a [block_actions payload]{@link https://api.slack.com/reference/interaction-payloads/block-actions} for.
     * - Should be one or both of:
     * - - `on_enter_pressed` - payload is dispatched when user presses the enter key while the input is in focus. Hint text will appear underneath the input explaining to the user to press enter to submit.
     * - - `on_character_entered` - payload is dispatched when a character is entered (or removed) in the input.
     */
    trigger_actions_on?: string[] | undefined;
};
export type Option = {
    /**
     * - A {@link Text } object that defines the text shown in the option on the menu.
     * - Overflow, select, and multi-select menus can only use `plain_text` objects, while radio buttons and checkboxes can use `mrkdwn` text objects.
     * - Maximum length for the `text` in this field is 75 characters.
     */
    text: Text;
    /**
     * - A unique string value that will be passed to your app when this option is chosen.
     * - Maximum length for this field is 75 characters.
     */
    value: string;
    /**
     * - A `plain_text` {@link Text } object that defines a line of descriptive text shown below the `text` field beside a single selectable item in a select menu, multi-select menu, checkbox group, radio button group, or overflow menu.
     * - Maximum length for the text within this field is 75 characters.
     */
    description?: PlainTextElement | undefined;
    /**
     * - A URL to load in the user's browser when the option is clicked.
     * - The url attribute is only available in overflow menus.
     * - Maximum length for this field is 3000 characters.
     */
    url?: string | undefined;
};
export type OptionGroup = {
    /**
     * - The formatting to use for this text object. Can be one of `plain_text` or `mrkdwn`.
     */
    type: string;
    /**
     * - The text for the block. This field accepts any of the standard [text formatting markup]{@link https://api.slack.com/reference/surfaces/formatting} when `type` is `mrkdwn`. The minimum length is 1 and maximum length is 3000 characters.
     */
    text: string;
    /**
     * - Indicates whether emojis in a text field should be escaped into the colon emoji format. This field is only usable when `type` is `plain_text`.
     */
    emoji?: boolean | undefined;
    /**
     * - This field is only usable when `type` is `mrkdwn`.
     */
    verbatim?: boolean | undefined;
};
export type BotProfile = {
    id: string;
    app_id: string;
    name: string;
    icons: {
        image_36?: string;
        image_48?: string;
        image_72?: string;
    };
    deleted: boolean;
    updated: number;
    team_id: string;
};
export type SlackMessage = {
    app_id?: string | undefined;
    attachments?: any[] | undefined;
    blocks?: SlackAttachmentBlock[] | undefined;
    bot_id?: string | undefined;
    bot_link?: string | undefined;
    bot_profile?: BotProfile | undefined;
    channel?: string | undefined;
    client_msg_id?: string | undefined;
    comment?: any;
    display_as_bot?: boolean | undefined;
    edited?: {
        ts: string;
        user: string;
    } | undefined;
    file?: any;
    files?: any[] | undefined;
    hidden?: boolean | undefined;
    icons?: SlackMessageIcons | undefined;
    inviter?: string | undefined;
    is_intro?: boolean | undefined;
    is_locked?: boolean | undefined;
    is_starred?: boolean | undefined;
    is_thread_broadcast?: boolean | undefined;
    item?: any;
    item_type?: string | undefined;
    last_read?: string | undefined;
    latest_reply?: string | undefined;
    metadata?: {
        event_type: string;
    } | undefined;
    no_notifications?: boolean | undefined;
    parent_user_id?: string | undefined;
    pinned_to?: any[] | undefined;
    purpose?: string | undefined;
    reactions?: any[] | undefined;
    replies?: any[] | undefined;
    reply_count?: number | undefined;
    reply_users?: any[] | undefined;
    reply_users_count?: number | undefined;
    room?: any;
    root?: any;
    subscribed?: boolean | undefined;
    subtype?: string | undefined;
    team?: string | undefined;
    text?: string | undefined;
    thread_ts?: string | undefined;
    topic?: string | undefined;
    ts?: string | undefined;
    type?: string | undefined;
    unfurl_links?: boolean | undefined;
    unfurl_media?: boolean | undefined;
    upload?: boolean | undefined;
    user: string;
    username?: string | undefined;
    wibblr?: boolean | undefined;
    x_files?: any[] | undefined;
};
export type SlackMessageResponse = {
    /**
     * - Status of the message
     */
    ok: boolean;
    /**
     * - Channel ID
     */
    channel: string;
    /**
     * - Timestamp
     */
    ts: string;
    /**
     * - This field is only usable when `type` is `mrkdwn`.
     */
    message: SlackMessage;
};
export type SlackChannel = {
    /**
     * - Indicates the name of the channel-like thing, without a leading hash sign
     */
    name: string;
    id: string;
    /**
     * - The ID of the member that created this conversation
     */
    creator?: string | undefined;
    /**
     * - Timestamp of when the conversation was created
     */
    created?: number | undefined;
    /**
     * - The timestamp for the last message the calling user has read in this channel
     */
    last_read?: number[] | undefined;
    /**
     * - The latest message in the channel
     */
    latest?: string | undefined;
    /**
     * - A full count of visible messages that the calling user has yet to read
     */
    unread_count?: number | undefined;
    /**
     * - A count of messages that the calling user has yet to read that matter to them (excludes things like join/leave messages)
     */
    unread_count_display?: number | undefined;
    previous_names?: string[] | undefined;
    updated?: number | undefined;
    parent_conversation?: string | null | undefined;
    shared_team_ids?: string[] | undefined;
    pending_connected_team_ids?: string[] | undefined;
    /**
     * - Indicates whether a conversation is a channel
     */
    is_channel: boolean;
    /**
     * - Means the channel is a private channel created before March 2021
     */
    is_group: boolean;
    /**
     * - Means the conversation is a direct message between two distinguished individuals or a user and a bot
     */
    is_im: boolean;
    /**
     * - Indicates a conversation is archived, frozen in time
     */
    is_archived: boolean;
    /**
     * - Means the channel is the workspace's "general" discussion channel
     */
    is_general: boolean;
    unlinked?: number | undefined;
    name_normalized?: string | undefined;
    /**
     * - Means the conversation is in some way shared between multiple workspaces
     */
    is_shared: boolean;
    /**
     * - Indicates whether a conversation is part of a Shared Channel with a remote organization
     */
    is_ext_shared: boolean;
    /**
     * - Indicates whether this shared channel is shared between Enterprise Grid workspaces within the same organization
     */
    is_org_shared?: boolean;
    pending_shared?: any[] | undefined;
    /**
     * - Means the conversation is ready to become an `is_ext_shared` channel, but needs some kind of approval or sign off first
     */
    is_pending_ext_shared: boolean;
    /**
     * - Indicates whether the user, bot user or Slack app associated with the token making the API call is itself a member of the conversation
     */
    is_member: boolean;
    /**
     * - Means the conversation is privileged between two or more members
     */
    is_private: boolean;
    /**
     * - Represents an unnamed private conversation between multiple users
     */
    is_mpim: boolean;
    priority?: number | undefined;
    topic?: SlackConversationTopic | undefined;
    purpose?: SlackConversationPurpose | undefined;
};
export type SlackConversationTopic = {
    creator: string;
    value: string;
    last_set: number;
};
export type SlackConversationPurpose = {
    creator: string;
    value: string;
    last_set: number;
};
/**
 * <T>
 */
export type Nullable<T> = { [P in keyof T]: T[P] | null; };
export type ModalView = {
    /**
     * - The type of view. Set to `modal` for modals.
     */
    type: string;
    title: PlainTextElement;
    blocks: (KnownBlock | SlackBlock)[];
    close?: PlainTextElement | undefined;
    submit?: PlainTextElement | undefined;
    private_metadata?: string | undefined;
    callback_id?: string | undefined;
    /**
     * - Default to false
     */
    clear_on_close?: boolean | undefined;
    /**
     * - Default to false
     */
    notify_on_close?: boolean | undefined;
    external_id?: string | undefined;
};
/**
 * | Value    | Description |
 * |----------|-------------|
 * | all      | All files   |
 * | spaces   | Posts       |
 * | snippets | Snippets    |
 * | images   | Image files |
 * | gdocs    | Google docs |
 * | zips     | Zip files   |
 * | pdfs     | PDF files   |
 */
export type SlackFileTypes = string;
export type SlackUser = {
    /**
     * - Identifier for this workspace user
     */
    id: string;
    team_id: string;
    name: string;
    real_name: string;
    /**
     * - Indicates that a bot user is set to be constantly active in presence status
     */
    always_active: boolean;
    /**
     * - User has been deactivated
     */
    deleted?: boolean | undefined;
    /**
     * - Used in some clients to display a special username color
     */
    color: string;
    /**
     * - Contains a IETF language code that represents this user's chosen display language for Slack clients
     */
    locale?: string | undefined;
    /**
     * - A human-readable string for the geographic timezone-related region this user has specified in their account
     */
    tz: string;
    /**
     * - Describes the commonly used name of the tz timezone
     */
    tz_label: string;
    /**
     * - Indicates the number of seconds to offset UTC time by for this user's tz. Changes silently if changed due to daylight savings.
     */
    tz_offset: number;
    /**
     * -
     */
    profile: SlackUserProfile;
    /**
     * - Indicates whether the user is an Admin of the current workspace
     */
    is_admin: boolean;
    /**
     * - Indicates whether the user is an Owner of the current workspace
     */
    is_owner: boolean;
    /**
     * - Indicates whether the user is the Primary Owner of the current workspace
     */
    is_primary_owner: boolean;
    /**
     * - Only present (and always true) when a user has been invited but has not yet signed in
     */
    is_invited_user?: boolean | undefined;
    /**
     * - Indicates whether or not the user is a guest user
     */
    is_restricted: boolean;
    /**
     * - Indicates whether or not the user is a single-channel guest
     */
    is_ultra_restricted: boolean;
    /**
     * - User belongs to a different workspace than the one associated with your app's token, and isn't in any shared channels visible to your app
     */
    is_stranger?: boolean | undefined;
    /**
     * - Indicates whether the user is actually a bot user
     */
    is_bot: boolean;
    /**
     * - Indicates whether the user is an authorized user of the calling app
     */
    is_app_user: boolean;
    is_email_confirmed: boolean;
    /**
     * - A Unix timestamp indicating when the user object was last updated.
     */
    updated: string;
    who_can_share_contact_card: string;
    enterprise_user: SlackEnterpriseUser;
    /**
     * - Describes whether two-factor authentication is enabled for this user. Only visible if the user executing the call is an admin.
     */
    has_2fa?: boolean | undefined;
    /**
     * - Indicates the type of two-factor authentication in use. Only present if `has_2fa` is true. The value will be either `app` or `sms`.
     */
    two_factor_type?: string | undefined;
};
export type SlackEnterpriseUser = {
    /**
     * - A unique ID for the Enterprise Grid organization this user belongs to
     */
    id: string;
    /**
     * - This user's ID - some Grid users have a kind of dual identity — a local, workspace-centric user ID as well as a Grid-wise user ID, called the Enterprise user ID.
     */
    enterprise_id: string;
    /**
     * - A display name for the Enterprise Grid organization
     */
    enterprise_name: string;
    /**
     * - Indicates whether the user is an Admin of the Enterprise Grid organization
     */
    is_admin: boolean;
    /**
     * - Indicates whether the user is an Owner of the Enterprise Grid organization
     */
    is_owner: boolean;
    /**
     * - An array of workspace IDs that are in the Enterprise Grid organization
     */
    teams: Array<string>;
    /**
     * - Describes whether two-factor authentication is enabled for this user. Only visible if the user executing the call is an admin.
     */
    has_2fa: boolean;
};
export type SlackUserProfile = {
    avatar_hash: string;
    /**
     * - The display name the user has chosen to identify themselves by in their workspace profile. Do not use this field as a unique identifier for a user, as it may change at any time. Instead, use `id` and `team_id` in concert.
     */
    display_name: string;
    /**
     * - The `display_name` field, but with any non-Latin characters filtered out
     */
    display_name_normalized: string;
    /**
     * - The user's first name
     */
    first_name: string;
    /**
     * - The user's last name
     */
    last_name: boolean;
    /**
     * - The user's first and last name
     */
    real_name: boolean;
    /**
     * - The pronouns the user prefers to be addressed by
     */
    pronouns: string;
    /**
     * - A valid email address. It cannot have spaces, or be in use by another member of the same team. It must have an`@` and a domain.
     */
    email: string;
    /**
     * - The user's phone number, in any format
     */
    phone: string;
    /**
     * - A shadow from a bygone era. It will always be an empty string and cannot be set otherwise.
     */
    skype: string;
    /**
     * - The user's title
     */
    title: string;
    /**
     * - The ID of the team the user is on
     */
    team: string;
    /**
     * - These various fields will contain https URLs that point to square ratio, web-viewable images (GIFs, JPEGs, or PNGs) that represent different sizes of a user's profile picture
     */
    image_: string;
    /**
     * - The date the person joined the organization. Only available if Slack Atlas is enabled.
     */
    start_date: string;
    /**
     * - The displayed emoji that is enabled for the Slack team, such as :train:
     */
    status_emoji: string;
    status_emoji_display_info: {
        emoji_name: string;
        display_url: string;
    }[];
    /**
     * - The Unix timestamp of when the status will expire
     */
    status_expiration: number;
    /**
     * - The displayed text of up to 100 characters. We strongly encourage brevity
     */
    status_text: string;
    /**
     * - All the custom profile fields for the user
     */
    fields: SlackUserProfileCustomFields;
};
export type SlackUserProfileCustomFields = {
    /**
     * - The display name the user has chosen to identify themselves by in their workspace profile. Maximum of 80 characters.
     */
    display_name: string;
    /**
     * - The user's first name
     */
    first_name: string;
    /**
     * - The user's last name
     */
    last_name: boolean;
    /**
     * - The user's first and last name
     */
    real_name: boolean;
    /**
     * - The user's pronouns
     */
    pronouns: string;
    /**
     * - A valid email address. It cannot have spaces, or be in use by another member of the same team. It must have an`@` and a domain.
     */
    email: string;
    /**
     * - The user's phone number, in any format
     */
    phone: string;
    /**
     * - The user's title
     */
    title: string;
    /**
     * - The date the person joined the organization
     */
    start_date: string;
};
export type SlackUserIdentity = {
    name: string;
    email: string;
    id: string;
    image_24?: string | undefined;
    image_32?: string | undefined;
    image_48?: string | undefined;
    image_72?: string | undefined;
    image_192?: string | undefined;
    image_512?: string | undefined;
};
export type SlackFilesMatch = {
    id: string;
    name: string | null;
    title?: string;
    created: number;
    filetype: string;
    mimetype: string;
    pretty_type: string;
    user: string;
    editable?: boolean | undefined;
    size: number;
    mode: string;
    is_external: boolean;
    external_type: string;
    external_id?: number | undefined;
    external_url?: number | undefined;
    is_public: boolean;
    public_url_shared: boolean;
    updated?: number | undefined;
    channels?: string[] | undefined;
    groups?: string[] | undefined;
    ims?: string[] | undefined;
    num_stars?: number | undefined;
    is_starred?: boolean | undefined;
    pinned_to: string[];
    reactions: string;
    initial_comment?: string | undefined;
    image_exif_rotation?: number | undefined;
    original_w?: number | undefined;
    original_h?: number | undefined;
    display_as_bot?: boolean | undefined;
    access?: string | undefined;
    attachments?: SlackAttachment[] | undefined;
    bot_id?: string | undefined;
    cc?: SlackCC[] | undefined;
    comments_count?: number | undefined;
    converted_pdf?: string | undefined;
    dm_mpdm_users_with_file_access?: SlackDMMpdmUsersWithFileAccess[] | undefined;
    edit_link?: string | undefined;
    editors?: string[] | undefined;
    editors_count?: number | undefined;
    file_access?: number | undefined;
    from?: SlackCC[] | undefined;
    has_more?: boolean | undefined;
    has_more_shares?: boolean | undefined;
    has_rich_preview?: boolean | undefined;
    headers?: {
        date: string;
    } | undefined;
    is_channel_space?: boolean | undefined;
    last_editor?: string | undefined;
    lines?: number | undefined;
    lines_more?: number | undefined;
    linked_channel_id?: string | undefined;
    media_display_type?: string | undefined;
    non_owner_editable?: boolean | undefined;
    org_or_workspace_access?: boolean | undefined;
    original_attachment_count?: number | undefined;
    permalink?: string | undefined;
    permalink_public?: string | undefined;
    plain_text?: string | undefined;
    preview?: string | undefined;
    preview_highlight?: string | undefined;
    preview_is_truncated?: boolean | undefined;
    preview_plain_text?: string | undefined;
    private_channel_with_file_access_count?: number | undefined;
    quip_thread_id?: string | undefined;
    sent_to_self?: boolean | undefined;
    shares?: any;
    subject?: string | undefined;
    team_pref_version_history_enabled?: boolean | undefined;
    teams_shared_with?: string[] | undefined;
    thumb_64?: string | undefined;
    thumb_80?: string | undefined;
    thumb_160?: string | undefined;
    thumb_360?: string | undefined;
    thumb_480?: string | undefined;
    thumb_720?: string | undefined;
    thumb_800?: string | undefined;
    thumb_960?: string | undefined;
    thumb_1024?: string | undefined;
    thumb_360_h?: number | undefined;
    thumb_360_w?: number | undefined;
    thumb_480_h?: number | undefined;
    thumb_480_w?: number | undefined;
    thumb_720_h?: number | undefined;
    thumb_720_w?: number | undefined;
    thumb_800_h?: number | undefined;
    thumb_800_w?: number | undefined;
    thumb_960_h?: number | undefined;
    thumb_960_w?: number | undefined;
    thumb_1024_h?: number | undefined;
    thumb_1024_w?: number | undefined;
    thumb_pdf?: string | undefined;
    thumb_pdf_h?: number | undefined;
    thumb_pdf_w?: number | undefined;
    thumb_tiny?: string | undefined;
    thumb_video?: string | undefined;
    timestamp?: number | undefined;
    title_blocks?: SlackMatchTitleBlock[] | undefined;
    to?: SlackCC[] | undefined;
    update_notifications?: number | undefined;
    url_private?: string | undefined;
    url_private_download?: string | undefined;
    url_static_preview?: string | undefined;
    user_team?: string | undefined;
    username?: string | undefined;
};
export type SlackMessageAttachment = {
    blocks?: (KnownBlock | SlackBlock)[] | undefined;
    fallback?: string | undefined;
    color?: string | undefined;
    pretext?: string | undefined;
    author_name?: string | undefined;
    author_link?: string | undefined;
    author_icon?: string | undefined;
    author_subname?: string | undefined;
    title?: string | undefined;
    title_link?: string | undefined;
    text?: string | undefined;
    fields?: SlackAttachmentField[] | undefined;
    image_url?: string | undefined;
    thumb_url?: string | undefined;
    footer?: string | undefined;
    footer_icon?: string | undefined;
    ts?: string | undefined;
    actions?: SlackAction[] | undefined;
    callback_id?: string | undefined;
    mrkdwn_in?: string[] | undefined;
    app_unfurl_url?: string | undefined;
    is_app_unfurl?: string | undefined;
    app_id?: string | undefined;
    bot_id?: string | undefined;
    preview?: SlackMessageAttachmentPreview | undefined;
};
export type SlackAttachmentField = {
    title: string;
    value: string;
    short?: boolean | undefined;
};
export type SlackMessageAttachmentPreview = {
    type?: string | undefined;
    can_remove?: boolean | undefined;
    title?: PlainTextElement | undefined;
    subtitle?: PlainTextElement | undefined;
    iconUrl?: string | undefined;
};
export type SlackAction = {
    id?: string | undefined;
    confirm?: SlackActionConfirmation | undefined;
    data_source?: string | undefined;
    min_query_length?: number | undefined;
    name?: string | undefined;
    options?: SlackOptionField[] | undefined;
    option_groups?: {
        text: string;
        options: SlackOptionField[];
    }[] | undefined;
    selected_options?: SlackOptionField[] | undefined;
    style?: string | undefined;
    text?: string | undefined;
    type?: string | undefined;
    value?: string | undefined;
    url?: string | undefined;
};
export type SlackActionConfirmation = {
    dismiss_text?: string | undefined;
    ok_text?: string | undefined;
    text: string;
    title?: string | undefined;
};
export type SlackOptionField = {
    description?: string | undefined;
    text: string;
    title: string;
};
export type SlackAttachment = {
    action?: SlackAction[] | undefined;
    app_id?: string | undefined;
    app_unfurl_url?: string | undefined;
    author_icon?: string | undefined;
    author_id?: string | undefined;
    author_link?: string | undefined;
    author_name?: string | undefined;
    author_subname?: string | undefined;
    blocks?: SlackAttachmentBlock[] | undefined;
    bot_id?: string | undefined;
    callback_id?: string | undefined;
    channel_id?: string | undefined;
    channel_name?: string | undefined;
    channel_team?: string | undefined;
    color?: string | undefined;
    fallback?: string | undefined;
    fields?: SlackAttachmentField[] | undefined;
    filename?: string | undefined;
    files?: SlackFileElement[] | undefined;
    footer?: string | undefined;
    footer_icon?: string | undefined;
    from_url?: string | undefined;
    hide_color?: boolean | undefined;
    id?: number | undefined;
    image_bytes?: number | undefined;
    image_height?: number | undefined;
    image_width?: number | undefined;
    image_url?: string | undefined;
    indent?: boolean | undefined;
    is_app_unfurl?: boolean | undefined;
    is_file_attachment?: boolean | undefined;
    is_msg_unfurl?: boolean | undefined;
    is_reply_unfurl?: boolean | undefined;
    is_thread_root_unfurl?: boolean | undefined;
    message_blocks?: SlackMessageBlock[] | undefined;
    metadata?: SlackAttachmentMetadata | undefined;
    mimetype?: string | undefined;
    mrkdwn_in?: string[] | undefined;
    msg_subtype?: string | undefined;
    original_url?: string | undefined;
    pretext?: string | undefined;
    preview?: SlackPreview | undefined;
    service_icon?: string | undefined;
    service_name?: string | undefined;
    service_url?: string | undefined;
    size?: number | undefined;
    text?: string | undefined;
    thumb_height?: number | undefined;
    thumb_width?: number | undefined;
    thumb_url?: string | undefined;
    title?: string | undefined;
    title_link?: string | undefined;
    ts?: string | undefined;
    url?: string | undefined;
    video_html?: string | undefined;
    video_html_height?: number | undefined;
    video_html_width?: number | undefined;
    video_url?: string | undefined;
};
export type SlackMessageBlock = {
    extension?: string | undefined;
    message?: SlackMessage | undefined;
    team?: string | undefined;
    ts?: string | undefined;
};
export type SlackAttachmentMetadata = {
    extension?: string | undefined;
    format?: string | undefined;
    original_h?: number | undefined;
    original_w?: number | undefined;
    rotation?: number | undefined;
    thumb_160?: boolean | undefined;
    thumb_360_h?: number | undefined;
    thumb_360_w?: number | undefined;
    thumb_64?: boolean | undefined;
    thumb_80?: boolean | undefined;
    thumb_tiny?: string | undefined;
};
export type SlackMessageIcons = {
    emoji?: string | undefined;
    image_36?: string | undefined;
    image_48?: string | undefined;
    image_64?: string | undefined;
    image_72?: string | undefined;
};
export type SlackAccessory = {
    accessibility_label?: string | undefined;
    action_id?: string | undefined;
    alt_text?: string | undefined;
    border?: number | undefined;
    confirm?: SlackAccessoryConfirm | undefined;
    default_to_current_conversation?: boolean | undefined;
    elements?: SlackAccessoryElement[] | undefined;
    fallback?: string | undefined;
    filter?: SlackFilter | undefined;
    focus_on_load?: boolean | undefined;
    image_bytes?: number | undefined;
    image_height?: number | undefined;
    image_width?: number | undefined;
    image_url?: string | undefined;
    indent?: number | undefined;
    initial_channel?: string | undefined;
    initial_channels?: string[] | undefined;
    initial_conversation?: string | undefined;
    initial_conversations?: string[] | undefined;
    initial_date?: string | undefined;
    initial_date_time?: number | undefined;
    initial_option?: SlackInitialOptionElement | undefined;
    initial_options?: SlackInitialOptionElement[] | undefined;
    initial_time?: string | undefined;
    initial_user?: string | undefined;
    initial_users?: string[] | undefined;
    max_selected_items?: number | undefined;
    min_query_length?: number | undefined;
    offset?: number | undefined;
    option_groups?: SlackAccessoryOptionGroup[] | undefined;
    options?: SlackInitialOptionElement[] | undefined;
    placeholder?: SlackDescriptionElement | undefined;
    response_url_enabled?: boolean | undefined;
    style?: string | undefined;
    text?: SlackDescriptionElement | undefined;
    timezone?: string | undefined;
    type?: string | undefined;
    url?: string | undefined;
    value?: string | undefined;
    workflow?: SlackWorkflow | undefined;
};
export type SlackAccessoryConfirm = {
    confirm?: SlackDescriptionElement | undefined;
    deny?: SlackDescriptionElement | undefined;
    style?: string | undefined;
    text?: SlackDescriptionElement | undefined;
    title?: SlackDescriptionElement | undefined;
};
export type SlackAccessoryOptionGroup = {
    label?: SlackDescriptionElement | undefined;
    options?: SlackInitialOptionElement[] | undefined;
};
export type SlackAccessoryElement = {
    border?: number | undefined;
    elements?: SlackPurpleElement | undefined;
    indent?: number | undefined;
    offset?: number | undefined;
    style?: string | undefined;
    type?: string | undefined;
};
export type SlackPurpleElement = {
    channel_id?: string | undefined;
    name?: string | undefined;
    range?: string | undefined;
    skin_tone?: number | undefined;
    style?: SlackStyle | undefined;
    team_id?: string | undefined;
    text?: string | undefined;
    timestamp?: string | undefined;
    type?: string | undefined;
    unicode?: string | undefined;
    url?: string | undefined;
    user_id?: string | undefined;
    usergroup_id?: string | undefined;
    value?: string | undefined;
};
export type SlackStyle = {
    bold?: boolean | undefined;
    code?: boolean | undefined;
    italic?: boolean | undefined;
    strike?: boolean | undefined;
};
export type SlackFilter = {
    exclude_bot_users?: boolean | undefined;
    exclude_external_shared_channels?: boolean | undefined;
    include?: any[] | undefined;
};
export type SlackInitialOptionElement = {
    description?: SlackDescriptionElement | undefined;
    text: SlackDescriptionElement;
    url?: string | undefined;
    value?: string | undefined;
};
export type SlackWorkflow = {
    trigger: SlackTrigger;
};
export type SlackTrigger = {
    customizable_input_parameters?: SlackCustomizableInputParameter[] | undefined;
    url?: string | undefined;
};
export type SlackCustomizableInputParameter = {
    name: string;
    value: string;
};
export type SlackCC = {
    address: string;
    name: string;
    original?: string | undefined;
};
export type SlackDMMpdmUsersWithFileAccess = {
    access?: string | undefined;
    user_id?: string | undefined;
};
export type SlackFileHeaders = {
    date?: string | undefined;
    in_reply_to?: string | undefined;
    reply_to?: string | undefined;
    message_id?: string | undefined;
};
export type SlackPreview = {
    can_remove?: boolean | undefined;
    icon_url?: string | undefined;
    subtitle?: SlackDescriptionElement | undefined;
    title?: SlackDescriptionElement | undefined;
    type?: string | undefined;
};
export type SlackInviteElement = {
    acceptances: SlackInviteAcceptance[];
    channel: SlackInviteChannel;
    date_late_updated: number;
    direction?: string | undefined;
    invite?: SlackInviteInvite | undefined;
    invite_type?: string | undefined;
    status?: string | undefined;
};
export type SlackInviteAcceptance = {
    accepting_team: SlackInviteAcceptingTeam;
    accepting_user: SlackInviteAcceptingUser;
    approval_status: string;
    date_accepted?: number | undefined;
    date_invalid?: number | undefined;
    date_last_updated?: number | undefined;
    reviews?: SlackInviteReview[] | undefined;
};
export type SlackInviteAcceptingTeam = {
    avatar_base_url: string;
    date_created: number;
    domain?: string | undefined;
    icon?: SlackTeamIcon | undefined;
    is_verified: boolean;
    name: string;
    id: string;
};
export type SlackTeamIcon = {
    image_102?: string | undefined;
    image_132?: string | undefined;
    image_230?: string | undefined;
    image_34?: string | undefined;
    image_44?: string | undefined;
    image_68?: string | undefined;
    image_88?: string | undefined;
    image_default?: boolean | undefined;
    image_original?: string | undefined;
};
export type SlackInviteAcceptingUser = {
    id?: string | undefined;
    name?: string | undefined;
    profile?: SlackUserProfile | undefined;
    team_id?: string | undefined;
    updated?: number | undefined;
    who_can_share_contact_card?: string | undefined;
};
export type SlackInviteReview = {
    date_review?: number | undefined;
    reviewing_team?: SlackInviteAcceptingTeam | undefined;
    type?: string | undefined;
};
export type SlackInviteChannel = {
    id?: string | undefined;
    is_im?: boolean | undefined;
    is_private?: boolean | undefined;
    name?: string | undefined;
};
export type SlackInviteInvite = {
    date_created?: number | undefined;
    date_invalid?: number | undefined;
    id?: string | undefined;
    inviting_team?: SlackInviteAcceptingTeam | undefined;
    inviting_user?: SlackInviteAcceptingUser | undefined;
    link?: string | undefined;
    recipient_email?: string | undefined;
    recipient_user_id?: string | undefined;
};
export type SlackConversationsListConnectInviteResponse = {
    arg: string;
    error?: string | undefined;
    invites: SlackInviteElement[];
    needed?: string | undefined;
    ok: boolean;
    provided?: string | undefined;
    response_metadata?: {
        messages?: string[] | undefined;
        next_cursor: string;
    } | undefined;
};
//# sourceMappingURL=types.d.ts.map