// @ts-check

/**
 * @typedef {Object} SlackPagination
 * @property {number} [first]
 * @property {number} [last]
 * @property {number} [page]
 * @property {number} [page_count]
 * @property {number} [per_page]
 * @property {number} [total_count]
 */

/**
 * @typedef {Object} SlackPaging
 * @property {number} [count]
 * @property {number} [pages]
 * @property {number} [page]
 * @property {number} [total]
 */

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
 * @property {SlackCustomizableInputParameter[]} [customizable_input_parameters] - Each specified name must match an input parameter defined on the workflow of the provided trigger (url), and the input parameter mapping on the trigger must be set as `customizable: true`. 
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
 * @property {{image_36?: string, image_48?: string, image_72?: string}} icons
 * @property {boolean} deleted
 * @property {number} updated
 * @property {string} team_id
 */

/**
 * @summary [Slack Message]{@link https://api.slack.com/events/message#subtypes}
 * @typedef {Object} SlackMessage
 * @property {string} [app_id]
 * @property {any[]} [attachments]
 * @property {SlackAttachmentBlock[]} [blocks]
 * @property {string} [bot_id]
 * @property {string} [bot_link]
 * @property {BotProfile} [bot_profile]
 * @property {string} [channel]
 * @property {string} [client_msg_id]
 * @property {SlackComment} [comment]
 * @property {boolean} [display_as_bot]
 * @property {{ts: string, user: string}} [edited]
 * @property {SlackMessageFile} [file]
 * @property {any[]} [files]
 * @property {boolean} [hidden]
 * @property {SlackMessageIcons} [icons]
 * @property {string} [inviter]
 * @property {boolean} [is_intro]
 * @property {boolean} [is_locked]
 * @property {boolean} [is_starred]
 * @property {boolean} [is_thread_broadcast]
 * @property {SlackComment} [item]
 * @property {string} [item_type]
 * @property {string} [last_read]
 * @property {string} [latest_reply]
 * @property {{event_type: string}} [metadata]
 * @property {boolean} [no_notifications]
 * @property {string} [parent_user_id]
 * @property {any[]} [pinned_to]
 * @property {string} [purpose]
 * @property {any[]} [reactions]
 * @property {any[]} [replies]
 * @property {number} [reply_count]
 * @property {any[]} [reply_users]
 * @property {number} [reply_users_count]
 * @property {SlackRoom} [room]
 * @property {SlackRoot} [root]
 * @property {boolean} [subscribed]
 * @property {string} [subtype]
 * @property {string} [team]
 * @property {string} [text]
 * @property {string} [thread_ts]
 * @property {string} [topic]
 * @property {string} [ts]
 * @property {string} [type]
 * @property {boolean} [unfurl_links]
 * @property {boolean} [unfurl_media]
 * @property {boolean} [upload]
 * @property {string} user
 * @property {string} [username]
 * @property {boolean} [wibblr]
 * @property {any[]} [x_files]
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
 * @summary [Slack Channel]{@link https://api.slack.com/types/conversation}
 * @typedef {Object} SlackChannel
 * @property {string} name - Indicates the name of the channel-like thing, without a leading hash sign
 * @property {string} id
 * @property {string} [creator] - The ID of the member that created this conversation
 * @property {number} [created] - Timestamp of when the conversation was created
 * @property {number[]} [last_read] - The timestamp for the last message the calling user has read in this channel
 * @property {string} [latest] - The latest message in the channel
 * @property {number} [unread_count] - A full count of visible messages that the calling user has yet to read
 * @property {number} [unread_count_display] - A count of messages that the calling user has yet to read that matter to them (excludes things like join/leave messages)
 * @property {Array<string>} [previous_names]
 * @property {number} [updated]
 * @property {?string} [parent_conversation]
 * @property {Array<string>} [shared_team_ids]
 * @property {Array<string>} [pending_connected_team_ids]
 * @property {boolean} is_channel - Indicates whether a conversation is a channel
 * @property {boolean} is_group - Means the channel is a private channel created before March 2021
 * @property {boolean} is_im - Means the conversation is a direct message between two distinguished individuals or a user and a bot
 * @property {boolean} is_archived - Indicates a conversation is archived, frozen in time
 * @property {boolean} is_general - Means the channel is the workspace's "general" discussion channel
 * @property {number} [unlinked]
 * @property {string} [name_normalized]
 * @property {boolean} is_shared - Means the conversation is in some way shared between multiple workspaces
 * @property {boolean} is_ext_shared - Indicates whether a conversation is part of a Shared Channel with a remote organization
 * @property {boolean} is_org_shared - Indicates whether this shared channel is shared between Enterprise Grid workspaces within the same organization
 * @property {Array<*>} [pending_shared]
 * @property {boolean} is_pending_ext_shared - Means the conversation is ready to become an `is_ext_shared` channel, but needs some kind of approval or sign off first
 * @property {boolean} is_member - Indicates whether the user, bot user or Slack app associated with the token making the API call is itself a member of the conversation
 * @property {boolean} is_private - Means the conversation is privileged between two or more members
 * @property {boolean} is_mpim - Represents an unnamed private conversation between multiple users
 * @property {number} [priority]
 * @property {boolean} [is_org_shared]
 * @property {string} [pending_shared]
 * @property {SlackConversationTopic} [topic]
 * @property {SlackConversationPurpose} [purpose]
 */

/**
 * @typedef {Object} SlackConversationTopic
 * @property {string} creator
 * @property {string} value
 * @property {number} last_set
 */

/**
 * @typedef {Object} SlackConversationPurpose
 * @property {string} creator
 * @property {string} value
 * @property {number} last_set
 */

/**
 * @template T
 * @typedef {{ [P in keyof T]: T[P] | null }} Nullable<T>
 */

/**
 * @typedef {Object} ModalView
 * @property {string} type - The type of view. Set to `modal` for modals.
 * @property {PlainTextElement} title
 * @property {(KnownBlock | SlackBlock)[]} blocks
 * @property {PlainTextElement} [close]
 * @property {PlainTextElement} [submit]
 * @property {string} [private_metadata]
 * @property {string} [callback_id]
 * @property {boolean} [clear_on_close] - Default to false
 * @property {boolean} [notify_on_close] - Default to false
 * @property {string} [external_id]
 */

/**
 * @summary [Slack File Types]{@link https://api.slack.com/methods/files.list#file_types}
 * @description
 * The file types you may encounter include
 * @typedef {string} SlackFileTypes
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

/**
 * @typedef {Object} SlackUser
 * @property {string} id - Identifier for this workspace user
 * @property {string} team_id
 * @property {string} name
 * @property {string} real_name
 * @property {boolean} always_active - Indicates that a bot user is set to be constantly active in presence status
 * @property {boolean} [deleted] - User has been deactivated
 * @property {string} color - Used in some clients to display a special username color
 * @property {string} [locale] - Contains a IETF language code that represents this user's chosen display language for Slack clients
 * @property {string} tz - A human-readable string for the geographic timezone-related region this user has specified in their account
 * @property {string} tz_label - Describes the commonly used name of the tz timezone
 * @property {number} tz_offset - Indicates the number of seconds to offset UTC time by for this user's tz. Changes silently if changed due to daylight savings.
 * @property {SlackUserProfile} profile - 
 * @property {boolean} is_admin - Indicates whether the user is an Admin of the current workspace
 * @property {boolean} is_owner - Indicates whether the user is an Owner of the current workspace
 * @property {boolean} is_primary_owner - Indicates whether the user is the Primary Owner of the current workspace
 * @property {boolean} [is_invited_user] - Only present (and always true) when a user has been invited but has not yet signed in
 * @property {boolean} is_restricted - Indicates whether or not the user is a guest user
 * @property {boolean} is_ultra_restricted - Indicates whether or not the user is a single-channel guest
 * @property {boolean} [is_stranger] - User belongs to a different workspace than the one associated with your app's token, and isn't in any shared channels visible to your app
 * @property {boolean} is_bot - Indicates whether the user is actually a bot user
 * @property {boolean} is_app_user - Indicates whether the user is an authorized user of the calling app
 * @property {boolean} is_email_confirmed
 * @property {string} updated - A Unix timestamp indicating when the user object was last updated.
 * @property {string} who_can_share_contact_card
 * @property {SlackEnterpriseUser} enterprise_user
 * @property {boolean} [has_2fa] - Describes whether two-factor authentication is enabled for this user. Only visible if the user executing the call is an admin.
 * @property {string} [two_factor_type] - Indicates the type of two-factor authentication in use. Only present if `has_2fa` is true. The value will be either `app` or `sms`.
 */

/**
 * @typedef {Object} SlackEnterpriseUser
 * @property {string} id - A unique ID for the Enterprise Grid organization this user belongs to
 * @property {string} enterprise_id - This user's ID - some Grid users have a kind of dual identity — a local, workspace-centric user ID as well as a Grid-wise user ID, called the Enterprise user ID.
 * @property {string} enterprise_name - A display name for the Enterprise Grid organization
 * @property {boolean} is_admin - Indicates whether the user is an Admin of the Enterprise Grid organization
 * @property {boolean} is_owner - Indicates whether the user is an Owner of the Enterprise Grid organization
 * @property {Array<string>} teams - An array of workspace IDs that are in the Enterprise Grid organization
 * @property {boolean} has_2fa - Describes whether two-factor authentication is enabled for this user. Only visible if the user executing the call is an admin.
 */

/**
 * @typedef {Object} SlackUserProfile
 * @property {string} avatar_hash
 * @property {string} display_name - The display name the user has chosen to identify themselves by in their workspace profile. Do not use this field as a unique identifier for a user, as it may change at any time. Instead, use `id` and `team_id` in concert.
 * @property {string} display_name_normalized - The `display_name` field, but with any non-Latin characters filtered out
 * @property {string} first_name - The user's first name
 * @property {boolean} last_name - The user's last name
 * @property {boolean} real_name - The user's first and last name
 * @property {string} pronouns - The pronouns the user prefers to be addressed by
 * @property {string} email - A valid email address. It cannot have spaces, or be in use by another member of the same team. It must have an`@` and a domain.
 * @property {string} phone - The user's phone number, in any format
 * @property {string} skype - A shadow from a bygone era. It will always be an empty string and cannot be set otherwise.
 * @property {string} title - The user's title
 * @property {string} team - The ID of the team the user is on
 * @property {string} image_ - These various fields will contain https URLs that point to square ratio, web-viewable images (GIFs, JPEGs, or PNGs) that represent different sizes of a user's profile picture
 * @property {string} start_date - The date the person joined the organization. Only available if Slack Atlas is enabled.
 * @property {string} status_emoji - The displayed emoji that is enabled for the Slack team, such as :train:
 * @property {{emoji_name: string, display_url: string}[]} status_emoji_display_info
 * @property {number} status_expiration - The Unix timestamp of when the status will expire
 * @property {string} status_text - The displayed text of up to 100 characters. We strongly encourage brevity
 * @property {SlackUserProfileCustomFields} fields - All the custom profile fields for the user
 * 
 */

/**
 * @typedef {Object} SlackUserProfileCustomFields
 * @property {string} display_name - The display name the user has chosen to identify themselves by in their workspace profile. Maximum of 80 characters.
 * @property {string} first_name - The user's first name
 * @property {boolean} last_name - The user's last name
 * @property {boolean} real_name - The user's first and last name
 * @property {string} pronouns - The user's pronouns
 * @property {string} email - A valid email address. It cannot have spaces, or be in use by another member of the same team. It must have an`@` and a domain.
 * @property {string} phone - The user's phone number, in any format
 * @property {string} title - The user's title
 * @property {string} start_date - The date the person joined the organization
 */

/**
 * @typedef {Object} SlackUserIdentity
 * @property {string} name
 * @property {string} email
 * @property {string} id
 * @property {string} [image_24]
 * @property {string} [image_32]
 * @property {string} [image_48]
 * @property {string} [image_72]
 * @property {string} [image_192]
 * @property {string} [image_512]
 */

/**
 * @typedef {Object} SlackFilesMatch
 * @property {string} id
 * @property {?string} name
 * @property {string} title
 * @property {number} created
 * @property {string} filetype
 * @property {string} mimetype
 * @property {string} pretty_type
 * @property {string} user
 * @property {boolean} [editable]
 * @property {number} size
 * @property {string} mode
 * @property {boolean} is_external
 * @property {string} external_type
 * @property {number} [external_id]
 * @property {number} [external_url]
 * @property {boolean} is_public
 * @property {boolean} public_url_shared
 * @property {number} [updated]
 * @property {string[]} [channels]
 * @property {string[]} [groups]
 * @property {string[]} [ims]
 * @property {number} [num_stars]
 * @property {boolean} [is_starred]
 * @property {string[]} pinned_to
 * @property {string} reactions
 * @property {string} [initial_comment]
 * @property {number} [image_exif_rotation]
 * @property {number} [original_w]
 * @property {number} [original_h]
 * @property {boolean} [display_as_bot]
 * @property {string} [access]
 * @property {SlackAttachment[]} [attachments]
 * @property {string} [bot_id]
 * @property {SlackCC[]} [cc]
 * @property {number} [comments_count]
 * @property {string} [converted_pdf]
 * @property {SlackDMMpdmUsersWithFileAccess[]} [dm_mpdm_users_with_file_access]
 * @property {string} [edit_link]
 * @property {string[]} [editors]
 * @property {number} [editors_count]
 * @property {number} [file_access]
 * @property {SlackCC[]} [from]
 * @property {string[]} [groups]
 * @property {boolean} [has_more]
 * @property {boolean} [has_more_shares]
 * @property {boolean} [has_rich_preview]
 * @property {{date: string}} [headers]
 * @property {boolean} [is_channel_space]
 * @property {string} [last_editor]
 * @property {number} [lines]
 * @property {number} [lines_more]
 * @property {string} [linked_channel_id]
 * @property {string} [media_display_type]
 * @property {boolean} [non_owner_editable]
 * @property {boolean} [org_or_workspace_access]
 * @property {number} [original_attachment_count]
 * @property {string} [permalink]
 * @property {string} [permalink_public]
 * @property {string} [plain_text]
 * @property {string} [preview]
 * @property {string} [preview_highlight]
 * @property {boolean} [preview_is_truncated]
 * @property {string} [preview_plain_text]
 * @property {number} [private_channel_with_file_access_count]
 * @property {string} [quip_thread_id]
 * @property {boolean} [sent_to_self]
 * @property {SlackMatchShares} [shares]
 * @property {string} [subject]
 * @property {boolean} [team_pref_version_history_enabled]
 * @property {string[]} [teams_shared_with]
 * @property {string} [thumb_64]
 * @property {string} [thumb_80]
 * @property {string} [thumb_160]
 * @property {string} [thumb_360]
 * @property {string} [thumb_480]
 * @property {string} [thumb_720]
 * @property {string} [thumb_800]
 * @property {string} [thumb_960]
 * @property {string} [thumb_1024]
 * @property {number} [thumb_360_h]
 * @property {number} [thumb_360_w]
 * @property {number} [thumb_480_h]
 * @property {number} [thumb_480_w]
 * @property {number} [thumb_720_h]
 * @property {number} [thumb_720_w]
 * @property {number} [thumb_800_h]
 * @property {number} [thumb_800_w]
 * @property {number} [thumb_960_h]
 * @property {number} [thumb_960_w]
 * @property {number} [thumb_1024_h]
 * @property {number} [thumb_1024_w]
 * @property {string} [thumb_pdf]
 * @property {number} [thumb_pdf_h]
 * @property {number} [thumb_pdf_w]
 * @property {string} [thumb_tiny]
 * @property {string} [thumb_video]
 * @property {number} [timestamp]
 * @property {string} [title]
 * @property {SlackMatchTitleBlock[]} [title_blocks]
 * @property {SlackCC[]} [to]
 * @property {number} [update_notifications]
 * @property {string} [url_private]
 * @property {string} [url_private_download]
 * @property {string} [url_static_preview]
 * @property {string} [user_team]
 * @property {string} [username]
 */

/**
 * @typedef {Object} SlackMessageAttachment
 * @property {(KnownBlock | SlackBlock)[]} [blocks]
 * @property {string} [fallback]
 * @property {string} [color]
 * @property {string} [pretext]
 * @property {string} [author_name]
 * @property {string} [author_link]
 * @property {string} [author_icon]
 * @property {string} [author_subname]
 * @property {string} [title]
 * @property {string} [title_link]
 * @property {string} [text]
 * @property {SlackAttachmentField[]} [fields]
 * @property {string} [image_url]
 * @property {string} [thumb_url]
 * @property {string} [footer]
 * @property {string} [footer_icon]
 * @property {string} [ts]
 * @property {SlackAction[]} [actions]
 * @property {string} [callback_id]
 * @property {string[]} [mrkdwn_in]
 * @property {string} [app_unfurl_url]
 * @property {string} [is_app_unfurl]
 * @property {string} [app_id]
 * @property {string} [bot_id]
 * @property {SlackMessageAttachmentPreview} [preview]
 */

/**
 * @typedef {Object} SlackAttachmentField
 * @property {string} title
 * @property {string} value
 * @property {boolean} [short]
 */

/**
 * @typedef {Object} SlackMessageAttachmentPreview
 * @property {string} [type]
 * @property {boolean} [can_remove]
 * @property {PlainTextElement} [title]
 * @property {PlainTextElement} [subtitle]
 * @property {string} [iconUrl]
 */

/**
 * @typedef {Object} SlackAction
 * @property {string} [id]
 * @property {SlackActionConfirmation} [confirm]
 * @property {string} [data_source]
 * @property {number} [min_query_length]
 * @property {string} [name]
 * @property {SlackOptionField[]} [options]
 * @property {{text: string, options: SlackOptionField[]}[]} [option_groups]
 * @property {SlackOptionField[]} [selected_options]
 * @property {string} [style]
 * @property {string} [text]
 * @property {string} [type]
 * @property {string} [value]
 * @property {string} [url]
 */

/**
 * @typedef {Object} SlackActionConfirmation
 * @property {string} [dismiss_text]
 * @property {string} [ok_text]
 * @property {string} text
 * @property {string} [title]
 */

/**
 * @typedef {Object} SlackOptionField
 * @property {string} [description]
 * @property {string} text
 * @property {string} title
 */

/**
 * @typedef {Object} SlackAttachment
 * @property {SlackAction[]} [action]
 * @property {string} [app_id]
 * @property {string} [app_unfurl_url]
 * @property {string} [author_icon]
 * @property {string} [author_id]
 * @property {string} [author_link]
 * @property {string} [author_name]
 * @property {string} [author_subname]
 * @property {SlackAttachmentBlock[]} [blocks]
 * @property {string} [bot_id]
 * @property {string} [callback_id]
 * @property {string} [channel_id]
 * @property {string} [channel_name]
 * @property {string} [channel_team]
 * @property {string} [color]
 * @property {string} [fallback]
 * @property {SlackAttachmentField[]} [fields]
 * @property {string} [filename]
 * @property {SlackFileElement[]} [files]
 * @property {string} [footer]
 * @property {string} [footer_icon]
 * @property {string} [from_url]
 * @property {boolean} [hide_color]
 * @property {number} [id]
 * @property {number} [image_bytes]
 * @property {number} [image_height]
 * @property {number} [image_width]
 * @property {string} [image_url]
 * @property {boolean} [indent]
 * @property {boolean} [is_app_unfurl]
 * @property {boolean} [is_file_attachment]
 * @property {boolean} [is_msg_unfurl]
 * @property {boolean} [is_reply_unfurl]
 * @property {boolean} [is_thread_root_unfurl]
 * @property {SlackMessageBlock[]} [message_blocks]
 * @property {SlackAttachmentMetadata} [metadata]
 * @property {string} [mimetype]
 * @property {string[]} [mrkdwn_in]
 * @property {string} [msg_subtype]
 * @property {string} [original_url]
 * @property {string} [pretext]
 * @property {SlackPreview} [preview]
 * @property {string} [service_icon]
 * @property {string} [service_name]
 * @property {string} [service_url]
 * @property {number} [size]
 * @property {string} [text]
 * @property {number} [thumb_height]
 * @property {number} [thumb_width]
 * @property {string} [thumb_url]
 * @property {string} [title]
 * @property {string} [title_link]
 * @property {string} [ts]
 * @property {string} [url]
 * @property {string} [video_html]
 * @property {number} [video_html_height]
 * @property {number} [video_html_width]
 * @property {string} [video_url]
 */

/**
 * @typedef {Object} SlackMessageBlock
 * @property {string} [extension]
 * @property {SlackMessage} [message]
 * @property {string} [team]
 * @property {string} [ts]
 */

/**
 * @typedef {Object} SlackAttachmentMetadata
 * @property {string} [extension]
 * @property {string} [format]
 * @property {number} [original_h]
 * @property {number} [original_w]
 * @property {number} [rotation]
 * @property {boolean} [thumb_160]
 * @property {number} [thumb_360_h]
 * @property {number} [thumb_360_w]
 * @property {boolean} [thumb_64]
 * @property {boolean} [thumb_80]
 * @property {string} [thumb_tiny]
 */

/**
 * @typedef {Object} SlackMessageIcons
 * @property {string} [emoji]
 * @property {string} [image_36]
 * @property {string} [image_48]
 * @property {string} [image_64]
 * @property {string} [image_72]
 */

/**
 * @typedef {Object} SlackAccessory
 * @property {string} [accessibility_label]
 * @property {string} [action_id]
 * @property {string} [alt_text]
 * @property {number} [border]
 * @property {SlackAccessoryConfirm} [confirm]
 * @property {boolean} [default_to_current_conversation]
 * @property {SlackAccessoryElement[]} [elements]
 * @property {string} [fallback]
 * @property {SlackFilter} [filter]
 * @property {boolean} [focus_on_load]
 * @property {number} [image_bytes]
 * @property {number} [image_height]
 * @property {number} [image_width]
 * @property {string} [image_url]
 * @property {number} [indent]
 * @property {string} [initial_channel]
 * @property {string[]} [initial_channels]
 * @property {string} [initial_conversation]
 * @property {string[]} [initial_conversations]
 * @property {string} [initial_date]
 * @property {number} [initial_date_time]
 * @property {SlackInitialOptionElement} [initial_option]
 * @property {SlackInitialOptionElement[]} [initial_options]
 * @property {string} [initial_time]
 * @property {string} [initial_user]
 * @property {string[]} [initial_users]
 * @property {number} [max_selected_items]
 * @property {number} [min_query_length]
 * @property {number} [offset]
 * @property {SlackAccessoryOptionGroup[]} [option_groups]
 * @property {SlackInitialOptionElement[]} [options]
 * @property {SlackDescriptionElement} [placeholder]
 * @property {boolean} [response_url_enabled]
 * @property {string} [style]
 * @property {SlackDescriptionElement} [text]
 * @property {string} [timezone]
 * @property {string} [type]
 * @property {string} [url]
 * @property {string} [value]
 * @property {SlackWorkflow} [workflow]
 */

/**
 * @typedef {Object} SlackAccessoryConfirm
 * @property {SlackDescriptionElement} [confirm]
 * @property {SlackDescriptionElement} [deny]
 * @property {string} [style]
 * @property {SlackDescriptionElement} [text]
 * @property {SlackDescriptionElement} [title]
 */

/**
 * @typedef {Object} SlackAccessoryOptionGroup
 * @property {SlackDescriptionElement} [label]
 * @property {SlackInitialOptionElement[]} [options]
 */

/**
 * @typedef {Object} SlackAccessoryElement
 * @property {number} [border]
 * @property {SlackPurpleElement} [elements]
 * @property {number} [indent]
 * @property {number} [offset]
 * @property {string} [style]
 * @property {string} [type]
 */

/**
 * @typedef {Object} SlackPurpleElement
 * @property {string} [channel_id]
 * @property {string} [name]
 * @property {string} [range]
 * @property {number} [skin_tone]
 * @property {SlackStyle} [style]
 * @property {string} [team_id]
 * @property {string} [text]
 * @property {string} [timestamp]
 * @property {string} [type]
 * @property {string} [unicode]
 * @property {string} [url]
 * @property {string} [user_id]
 * @property {string} [usergroup_id]
 * @property {string} [value]
 */

/**
 * @typedef {Object} SlackStyle
 * @property {boolean} [bold]
 * @property {boolean} [code]
 * @property {boolean} [italic]
 * @property {boolean} [strike]
 */

/**
 * @typedef {Object} SlackFilter
 * @property {boolean} [exclude_bot_users]
 * @property {boolean} [exclude_external_shared_channels]
 * @property {any[]} [include]
 */

/**
 * @typedef {Object} SlackInitialOptionElement
 * @property {SlackDescriptionElement} [description]
 * @property {SlackDescriptionElement} text
 * @property {string} [url]
 * @property {string} [value]
 */

/**
 * @typedef {Object} SlackWorkflow
 * @property {SlackTrigger} trigger
 */

/**
 * @typedef {Object} SlackTrigger
 * @property {SlackCustomizableInputParameter[]} [customizable_input_parameters]
 * @property {string} [url]
 */

/**
 * @typedef {Object} SlackCustomizableInputParameter
 * @property {string} name
 * @property {string} value
 */

/**
 * @typedef {Object} SlackCC
 * @property {string} address
 * @property {string} name
 * @property {string} [original]
 */

/**
 * @typedef {Object} SlackDMMpdmUsersWithFileAccess
 * @property {string} [access]
 * @property {string} [user_id]
 */

/**
 * @typedef {Object} SlackFileHeaders
 * @property {string} [date]
 * @property {string} [in_reply_to]
 * @property {string} [reply_to]
 * @property {string} [message_id]
 */

/**
 * @typedef {Object} SlackPreview
 * @property {boolean} [can_remove]
 * @property {string} [icon_url]
 * @property {SlackDescriptionElement} [subtitle]
 * @property {SlackDescriptionElement} [title]
 * @property {string} [type]
 */

/**
 * @typedef {Object} SlackInviteElement
 * @property {SlackInviteAcceptance[]} acceptances
 * @property {SlackInviteChannel} channel
 * @property {number} date_late_updated
 * @property {string} [direction]
 * @property {SlackInviteInvite} [invite]
 * @property {string} [invite_type]
 * @property {string} [status]
 */

/**
 * @typedef {Object} SlackInviteAcceptance
 * @property {SlackInviteAcceptingTeam} accepting_team
 * @property {SlackInviteAcceptingUser} accepting_user
 * @property {string} approval_status
 * @property {number} [date_accepted]
 * @property {number} [date_invalid]
 * @property {number} [date_last_updated]
 * @property {SlackInviteReview[]} [reviews]
 */

/**
 * @typedef {Object} SlackInviteAcceptingTeam
 * @property {string} avatar_base_url
 * @property {number} date_created
 * @property {string} [domain]
 * @property {SlackTeamIcon} [icon]
 * @property {boolean} is_verified
 * @property {string} name
 * @property {string} id
 */

/**
 * @typedef {Object} SlackTeamIcon
 * @property {string} [image_102]
 * @property {string} [image_132]
 * @property {string} [image_230]
 * @property {string} [image_34]
 * @property {string} [image_44]
 * @property {string} [image_68]
 * @property {string} [image_88]
 * @property {boolean} [image_default]
 * @property {string} [image_original]
 */

/**
 * @typedef {Object} SlackInviteAcceptingUser
 * @property {string} [id]
 * @property {string} [name]
 * @property {SlackUserProfile} [profile]
 * @property {string} [team_id]
 * @property {number} [updated]
 * @property {string} [who_can_share_contact_card]
 */

/**
 * @typedef {Object} SlackInviteReview
 * @property {number} [date_review]
 * @property {SlackInviteAcceptingTeam} [reviewing_team]
 * @property {string} [type]
 */

/**
 * @typedef {Object} SlackInviteChannel
 * @property {string} [id]
 * @property {boolean} [is_im]
 * @property {boolean} [is_private]
 * @property {string} [name]
 */

/**
 * @typedef {Object} SlackInviteInvite
 * @property {number} [date_created]
 * @property {number} [date_invalid]
 * @property {string} [id]
 * @property {SlackInviteAcceptingTeam} [inviting_team]
 * @property {SlackInviteAcceptingUser} [inviting_user]
 * @property {string} [link]
 * @property {string} [recipient_email]
 * @property {string} [recipient_user_id]
 */

/**
 * @typedef {Object} SlackConversationsListConnectInviteResponse
 * @property {string} arg
 * @property {string} [error]
 * @property {SlackInviteElement[]} invites
 * @property {string} [needed]
 * @property {boolean} ok
 * @property {string} [provided]
 * @property {{messages?: string[], next_cursor: string}} [response_metadata]
 */

