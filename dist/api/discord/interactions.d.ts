export type InteractionParams = {
    timestamp: number;
    id: Snowflake;
    application_id: Snowflake;
    /**
     * - [Type of interaction]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type}
     */
    type: InteractionType;
    /**
     * - Interaction data payload
     */
    data: ModalSubmitComponentData | ApplicationCommandInteractionData | MessageComponentInteractionData;
    guild_id: Snowflake;
    channel_id?: string | undefined;
    /**
     * - Guild member data for the invoking user, including permissions
     */
    member: Member;
    /**
     * - User object for the invoking user, if invoked in a DM
     */
    user?: User | undefined;
    /**
     * - Continuation token for responding to the interaction
     */
    token: string;
    /**
     * - Read-only property, always 1
     */
    version: number;
    /**
     * - For components, the message they were attached to
     */
    message: Message;
    /**
     * - Bitwise set of permissions the app or bot has within the channel the interaction was sent from
     */
    app_permissions?: string | undefined;
    /**
     * - Selected language of the invoking user
     */
    locale?: string | undefined;
    /**
     * - Guild's preferred locale, if invoked in a guild
     */
    guild_locale?: string | undefined;
    entitlements: Entitlement[];
    entitlement_sku_ids: Snowflake[];
    channel: Channel;
    guild: GuildParams;
    api: typeof import('../../Api')
};
export type Payload = {
    ephemeral?: boolean | undefined;
    flags?: number | undefined;
    content?: string | undefined;
    embeds?: Embed[] | undefined;
    components?: Component | undefined;
    attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
    tts?: boolean | undefined;
    allowed_mentions?: AllowedMentions | undefined;
};

export namespace interactions {
    export namespace callback {
        export function get_original(params: InteractionParams): Promise<Message | null>;
        export function reply(params: InteractionParams, input?: {
            ephemeral?: boolean | undefined;
            flags?: number | undefined;
            content?: string | undefined;
            embeds?: Embed[] | undefined;
            components?: Component | undefined;
            attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
            tts?: boolean | undefined;
            allowed_mentions?: AllowedMentions | undefined;
            return_date?: boolean | undefined;
        }): Promise<boolean | Date>;
    
        export function defer(params: InteractionParams, input?: {
            ephemeral?: boolean | undefined;
        } | undefined): Promise<string>;
        /**
         * @summary
         * ### Defered Update Message (Components)
         * - Used to acknowledge a component interaction and wait for a followup.
         * - User does NOT see a thinking/loading state.
         * - Only accepts an ephemeral boolean
         *
         * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `6` (`DEFERRED_UPDATE_MESSAGE` *for components)
         * @example
         * await params.api.discord.interactions.callback.component_defer(params, {
         *   ephemeral: true
         * });
         * @example
         * await params.api.discord.interactions.callback.component_defer(params)
         * @memberof module:interactions.callback#
         * @method component_defer
         * @param {InteractionParams} params event parameters
         * @param {object} [input] user input
         * @param {boolean} [input.ephemeral]
         * @returns {Promise<{statusCode: 204, body: undefined}>}
         */
        export function component_defer(params: InteractionParams, input?: {
            ephemeral?: boolean | undefined;
        } | undefined): Promise<{
            statusCode: 204;
            body: undefined;
        }>;
        /**
         * @summary
         * ### Update Message (Components)
         * - Allows for editing of the message the component was attached to.
         *
         * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `7` (`UPDATE_MESSAGE` *for components)
         * @example
         * await params.api.discord.interactions.callback.component_update(params, {
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
         * @param {InteractionParams} params
         * @param {object} input
         * @param {boolean} [input.ephemeral] - Whether the message should be ephemeral
         * @param {string} [input.content]
         * @param {Embed[]} [input.embeds]
         * @param {Component} [input.components]
         * @param {Array<Omit<Attachment, 'proxy_url' | 'size' | 'height' | 'width'>>} [input.attachments]
         * @param {boolean} [input.tts]
         * @param {AllowedMentions} [input.allowed_mentions]
         * @returns {Promise<?{statusCode: 204, body: undefined}>}
         */
        export function component_update(params: InteractionParams, input?: {
            ephemeral?: boolean | undefined;
            content?: string | undefined;
            embeds?: Embed[] | undefined;
            components?: Component | undefined;
            attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
            tts?: boolean | undefined;
            allowed_mentions?: AllowedMentions | undefined;
        }): Promise<{
            statusCode: 204;
            body: undefined;
        } | null>;
        /**
         * @summary
         * ### [Autocomplete]{@link https://discord.com/developers/docs/interactions/application-commands#autocomplete}
         * - Responds to an autocomplete interaction with suggested choices.
         *
         * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `8` (`APPLICATION_COMMAND_AUTOCOMPLETE_RESULT`)
         * @memberof module:interactions.callback#
         * @method autocomplete_reply
         * @param {InteractionParams} params
         * @param {object} input
         * @param {Array<Pick<ApplicationCommandOptionChoice, 'name' | 'value'>>} input.choices
         * @returns {Promise<{statusCode: 204, body: undefined}>}
         */
        export function autocomplete_reply(params: InteractionParams, input: {
            choices: Pick<ApplicationCommandOptionChoice, "name" | "value">[];
        }): Promise<{
            statusCode: 204;
            body: undefined;
        }>;
        /**
         * @summary
         * ### [Text Inputs (Modals)]{@link https://discord.com/developers/docs/interactions/message-components#text-inputs}
         * - Interactive component that render on modals.
         * - They can be used to collect short-form or long-form text.
         *
         * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `9` (`MODAL`)
         * @memberof module:interactions.callback#
         * @method modal_reply
         * @param {InteractionParams} params
         * @param {Object} input
         * @param {string} input.custom_id
         * @param {string} input.title
         * @param {Component} input.components
         * @returns {Promise<{statusCode: 204, body: undefined}>}
         */
        export function modal_reply(params: InteractionParams, input: {
            custom_id: string;
            title: string;
            components: Component;
        }): Promise<{
            statusCode: 204;
            body: undefined;
        }>;
        /**
         * @summary
         * ### [Edit Original Interaction Response]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response}
         * - Edits the initial Interaction response.
         * - Functions the same as [Edit Webhook Message]{@link module:webhooks#updateMessage}
         * @example
         * await params.api.discord.interactions.callback.edit_original(params, {
         *   content: 'new content',
         * });
         * @memberof module:interactions.callback#
         * @method edit_original
         * @param {InteractionParams} params
         * @param {object} input
         * @param {string} [input.content]
         * @param {Embed[]} [input.embeds]
         * @param {Component} [input.components]
         * @param {Array<Omit<Attachment, 'proxy_url' | 'size' | 'height' | 'width'>>} [input.attachments]
         * @param {AllowedMentions} [input.allowed_mentions]
         * @param {boolean} [input.ephemeral]
         * @returns {Promise<?Message>}
         */
        export function edit_original(params: InteractionParams, input?: {
            content?: string | undefined;
            embeds?: Embed[] | undefined;
            components?: Component | undefined;
            attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
            allowed_mentions?: AllowedMentions | undefined;
            ephemeral?: boolean | undefined;
        }): Promise<Message | null>;
        /**
         * @summary
         * ### [Delete Original Interaction Response]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response}
         * - Deletes the initial Interaction response.
         * @example
         * await params.api.discord.interactions.callback.delete_original(params);
         * @memberof module:interactions.callback#
         * @method delete_original
         * @param {InteractionParams} params
         * @returns {Promise<{statusCode: 204, body: undefined}>}
         */
        export function delete_original(params: InteractionParams): Promise<{
            statusCode: 204;
            body: undefined;
        }>;
        /**
         * @summary
         * ### [Premium Required]{@link https://discord.com/developers/docs/interactions/application-commands#autocomplete}
         * - Respond to an interaction with an upgrade button, only available for apps with monetization enabled.
         *
         * [Interaction Callback Type]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}: `10` (`PREMIUM_REQUIRED`)
         * @memberof module:interactions.callback#
         * @method upgrade
         * @param {InteractionParams} params
         * @param {object} [input]
         * @returns {Promise<{statusCode: 204, body: undefined}>}
         */
        export function upgrade(params: InteractionParams, input?: object | undefined): Promise<{
            statusCode: 204;
            body: undefined;
        }>;
    }
    
    export namespace followup {
        export function get(params: InteractionParams, input: {
            message_id: Snowflake;
            thread_id?: string | undefined;
        }): Promise<Message>;
        /**
         * @summary
         * ### [Create Followup Message]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message}
         * - Used to create a followup message for an Interaction
         *   - This can be a deferred response or a new followup completely
         * - Functions the same as [Execute Webhook]{@link module:webhooks#execute}, but `wait` is always true.
         * - The `thread_id`, `avatar_url`, and `username` parameters are not supported when using this endpoint for interaction followups.
         * @example
         * await params.api.discord.interactions.followup.create(params, {
         *   ephemeral: true,
         *   content: 'followup message',
         *   embeds: [{
         *     title: 'hello',
         *     description: 'this is a description'
         *   }]
         * });
         * @memberof module:interactions.followup#
         * @method create
         * @param {InteractionParams} params
         * @param {object} input
         * @param {boolean} [input.ephemeral] - Whether the message should be ephemeral
         * @param {string} [input.content]
         * @param {Embed[]} [input.embeds]
         * @param {Component} [input.components]
         * @param {Array<Omit<Attachment, 'proxy_url' | 'size' | 'height' | 'width'>>} [input.attachments]
         * @param {boolean} [input.tts]
         * @param {AllowedMentions} [input.allowed_mentions]
         * @param {string} [input.thread_name]
         * @returns {Promise<?Message>}
         */
        export function create(params: InteractionParams, input?: {
            ephemeral?: boolean | undefined;
            content?: string | undefined;
            embeds?: Embed[] | undefined;
            components?: Component | undefined;
            attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
            tts?: boolean | undefined;
            allowed_mentions?: AllowedMentions | undefined;
            thread_name?: string | undefined;
        }): Promise<Message | null>;
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
         * await params.api.discord.interactions.followup.edit(params, {
         *   content: 'new content',
         *   message_id: '0000000000'
         * });
         * @memberof module:interactions.followup#
         * @method edit
         * @param {InteractionParams} params
         * @param {object} input
         * @param {Snowflake} input.message_id
         * @param {boolean} [input.ephemeral]
         * @param {string} [input.content]
         * @param {Embed[]} [input.embeds]
         * @param {Component} [input.components]
         * @param {Array<Omit<Attachment, 'proxy_url' | 'size' | 'height' | 'width'>>} [input.attachments]
         * @param {AllowedMentions} [input.allowed_mentions]
         * @param {Snowflake} [input.thread_id]
         * @returns {Promise<?Message>}
         */
        export function edit(params: InteractionParams, input: {
            message_id: string;
            ephemeral?: boolean | undefined;
            content?: string | undefined;
            embeds?: Embed[] | undefined;
            components?: Component | undefined;
            attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
            allowed_mentions?: AllowedMentions | undefined;
            thread_id?: string | undefined;
        }): Promise<Message | null>;
        /**
         * @summary
         * ### [Delete Followup Message]{@link https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message}
         * @example
         * await params.api.discord.interactions.followup.del(params, {
         *   message_id: '0000000000'
         * });
         * @memberof module:interactions.followup#
         * @method del
         * @param {InteractionParams} params
         * @param {object} input
         * @param {Snowflake} input.message_id
         * @returns {Promise<{statusCode: 204, body: undefined}>}
         */
        export function del(params: InteractionParams, input: {
            message_id: string;
        }): Promise<{
            statusCode: 204;
            body: undefined;
        }>;
    }
}
//# sourceMappingURL=interactions.d.ts.map