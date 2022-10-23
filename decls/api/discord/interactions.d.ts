export namespace callback {
    /**
     * The `reply()` method is used to immediately respond and reply to an interaction.
     *
     * Callback Type: `4`, -- `CHANNEL_MESSAGE_WITH_SOURCE`
     *
     * @param {object} interaction payload
     * @param {object} input parameters
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
     */
    function reply(interaction: any, input?: any): Promise<any>;
    /**
     * The `reply()` method is used to immediately respond and reply to an interaction.
     *
     * Callback Type: `4`, -- `CHANNEL_MESSAGE_WITH_SOURCE`
     *
     * @param {object} interaction payload
     * @param {object} input parameters
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
     */
    function reply(interaction: any, input?: any): Promise<any>;
    /**
     * The `defer()` method is used to acknowledge an interaction and wait for a followup. User sees a thinking/loading state.
     *
     * Callback Type: `5`, -- `DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE`
     *
     * @param {object} interaction
     * @param {object} input
     * defer method only accepts an ephemeral boolean.
     *
     * example:
     * ```js
     * callback.defer(interaction,{ ephemeral: true });
     * ```
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
     */
    function defer(interaction: any, input?: any): Promise<any>;
    /**
     * The `defer()` method is used to acknowledge an interaction and wait for a followup. User sees a thinking/loading state.
     *
     * Callback Type: `5`, -- `DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE`
     *
     * @param {object} interaction
     * @param {object} input
     * defer method only accepts an ephemeral boolean.
     *
     * example:
     * ```js
     * callback.defer(interaction,{ ephemeral: true });
     * ```
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
     */
    function defer(interaction: any, input?: any): Promise<any>;
    /**
     * The `component_defer()` method is used to acknowledge a component interaction and wait for a followup. User does NOT see a thinking/loading state.
     *
     * Callback Type: `6`, -- `DEFERRED_UPDATE_MESSAGE` *for components
     *
     * @param {object} interaction
     * @param {object} input only accepts a boolean ephemeral.
     *
     * example:
     * ```js
     * callback.component_defer(interaction,{ ephemeral: true });
     * ```
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
     */
    function component_defer(interaction: any, input?: any): Promise<any>;
    /**
     * The `component_defer()` method is used to acknowledge a component interaction and wait for a followup. User does NOT see a thinking/loading state.
     *
     * Callback Type: `6`, -- `DEFERRED_UPDATE_MESSAGE` *for components
     *
     * @param {object} interaction
     * @param {object} input only accepts a boolean ephemeral.
     *
     * example:
     * ```js
     * callback.component_defer(interaction,{ ephemeral: true });
     * ```
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
     */
    function component_defer(interaction: any, input?: any): Promise<any>;
    /**
     * The `component_update()` method allows editing of the components parent message.
     *
     * Callback Type: `7`, -- `UPDATE_MESSAGE` *for components
     *
     * @param {object} interaction
     * @param {object} input
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
     */
    function component_update(interaction: any, input?: any): Promise<any>;
    /**
     * The `component_update()` method allows editing of the components parent message.
     *
     * Callback Type: `7`, -- `UPDATE_MESSAGE` *for components
     *
     * @param {object} interaction
     * @param {object} input
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
     */
    function component_update(interaction: any, input?: any): Promise<any>;
    /**
     * The `autocomplete_reply()` method responds to an autocomplete interaction with suggested choices
     *
     * Callback Type: `8`, -- `APPLICATION_COMMAND_AUTOCOMPLETE_RESULT`
     *
     * @param {object} interaction
     * @param {object} input
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
     */
    function autocomplete_reply(interaction: any, input?: any): Promise<any>;
    /**
     * The `autocomplete_reply()` method responds to an autocomplete interaction with suggested choices
     *
     * Callback Type: `8`, -- `APPLICATION_COMMAND_AUTOCOMPLETE_RESULT`
     *
     * @param {object} interaction
     * @param {object} input
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
     */
    function autocomplete_reply(interaction: any, input?: any): Promise<any>;
    /**
     * The `modal_reply()` method responds to an interaction with a popup modal
     *
     * Callback Type: `9`, -- `MODAL`
     *
     * @param {object} interaction
     * @param {object} input
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
     */
    function modal_reply(interaction: any, input?: any): Promise<any>;
    /**
     * The `modal_reply()` method responds to an interaction with a popup modal
     *
     * Callback Type: `9`, -- `MODAL`
     *
     * @param {object} interaction
     * @param {object} input
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
     */
    function modal_reply(interaction: any, input?: any): Promise<any>;
    /**
     * The `get_original()` method is used to return the initial Interaction response.
     *
     * @param {object} interaction
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response
     */
    function get_original(interaction: any): Promise<any>;
    /**
     * The `get_original()` method is used to return the initial Interaction response.
     *
     * @param {object} interaction
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response
     */
    function get_original(interaction: any): Promise<any>;
    /**
     * The `edit_original()` method is used to edit the initial Interaction response.
     *
     * @param {object} interaction
     * @param {object} input
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response
     */
    function edit_original(interaction: any, input?: any): Promise<any>;
    /**
     * The `edit_original()` method is used to edit the initial Interaction response.
     *
     * @param {object} interaction
     * @param {object} input
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response
     */
    function edit_original(interaction: any, input?: any): Promise<any>;
    /**
     * The `delete_original()` method is used to delete the initial Interaction response.
     *
     * @param {object} interaction
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response
     */
    function delete_original(interaction: any): Promise<any>;
    /**
     * The `delete_original()` method is used to delete the initial Interaction response.
     *
     * @param {object} interaction
     * @returns {Promise<object>} {...}
     *
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response
     */
    function delete_original(interaction: any): Promise<any>;
}
export namespace followup {
    /**
     * The `create()` method is used to edit an initially deferred interaction, following up with a new response.
     * @param {object} interaction
     * @param {object} input
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message
     */
    function create(interaction: any, input?: any): Promise<any>;
    /**
     * The `create()` method is used to edit an initially deferred interaction, following up with a new response.
     * @param {object} interaction
     * @param {object} input
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message
     */
    function create(interaction: any, input?: any): Promise<any>;
    /**
     * The `edit()` method is used to edit a followup message for an Interaction.
     * @param {object} interaction
     * @param {object} input
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message
     */
    function edit(interaction: any, input?: any): Promise<any>;
    /**
     * The `edit()` method is used to edit a followup message for an Interaction.
     * @param {object} interaction
     * @param {object} input
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message
     */
    function edit(interaction: any, input?: any): Promise<any>;
    /**
     * The `get()` method is used to retrieve a followup message for an Interaction.
     * @param {object} interaction
     * @param {object} input
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message
     */
    function get(interaction: any, input?: any): Promise<any>;
    /**
     * The `get()` method is used to retrieve a followup message for an Interaction.
     * @param {object} interaction
     * @param {object} input
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message
     */
    function get(interaction: any, input?: any): Promise<any>;
    /**
     * The `del()` method is used to delete the followup message for an Interaction.
     * @param {object} interaction
     * @param {object} input
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message
     */
    function del(interaction: any, input?: any): Promise<any>;
    /**
     * The `del()` method is used to delete the followup message for an Interaction.
     * @param {object} interaction
     * @param {object} input
     * @url https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message
     */
    function del(interaction: any, input?: any): Promise<any>;
}
//# sourceMappingURL=interactions.d.ts.map