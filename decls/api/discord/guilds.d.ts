export function create(params: any): Promise<any>;
export function create(params: any): Promise<any>;
export function getGuild(params: any): Promise<any>;
export function getGuild(params: any): Promise<any>;
export function previewGuild(params: any): Promise<any>;
export function previewGuild(params: any): Promise<any>;
export function modifyGuild(params: any): Promise<any>;
export function modifyGuild(params: any): Promise<any>;
export function deleteGuild(params: any): Promise<any>;
export function deleteGuild(params: any): Promise<any>;
export function getAllGuildBans(params: any): Promise<any>;
export function getAllGuildBans(params: any): Promise<any>;
export function getGuildBan(params: any): Promise<any>;
export function getGuildBan(params: any): Promise<any>;
export function createGuildBan(params: any): Promise<any>;
export function createGuildBan(params: any): Promise<any>;
export function removeGuildBan(params: any): Promise<any>;
export function removeGuildBan(params: any): Promise<any>;
export function getGuildRoles(params: any): Promise<any>;
export function getGuildRoles(params: any): Promise<any>;
export namespace channels {
    function getChannels(params: any): Promise<any>;
    function getChannels(params: any): Promise<any>;
    function createChannel(params: any): Promise<any>;
    function createChannel(params: any): Promise<any>;
    function modifyChannelPosition(params: any): Promise<any>;
    function modifyChannelPosition(params: any): Promise<any>;
    function listActiveThreads(params: any): Promise<any>;
    function listActiveThreads(params: any): Promise<any>;
}
export namespace members {
    /**
     * Returns a list of members for the guild provided. Limit option determines the number of members to return.
     *
     * example:
     * ```js
     * let members = await api.Discord.Guilds.members.getAllMembers({
     *   guild_id: `Guild ID`,
     *   limit: 100
     * });
     * ```
     * @param {string} guild_id Id of guild to get members for. (must be a string)
     * @param {integer} limit Number of members to retrieve. (If no limit specified, returns the first result only)
     * @returns {Promise<object>} `[{...}]`
     */
    function getAllMembers(params: any): Promise<any>;
    /**
     * Returns a list of members for the guild provided. Limit option determines the number of members to return.
     *
     * example:
     * ```js
     * let members = await api.Discord.Guilds.members.getAllMembers({
     *   guild_id: `Guild ID`,
     *   limit: 100
     * });
     * ```
     * @param {string} guild_id Id of guild to get members for. (must be a string)
     * @param {integer} limit Number of members to retrieve. (If no limit specified, returns the first result only)
     * @returns {Promise<object>} `[{...}]`
     */
    function getAllMembers(params: any): Promise<any>;
    /**
     * Returns a guild member object for the provided user_id.
     *
     * example:
     * ```js
     * let member = await api.Discord.Guilds.members.getMember({
     *   guild_id: `Guild ID`,
     *   user_id: `User ID`
     * });
     * ```
     * @param {string} guild_id Id of the guild containing the requested user. (must be a string)
     * @param {string} user_id Id of the user to retrieve. (must be a string)
     * @returns {Promise<object>} `{...}`
     */
    function getMember(params: any): Promise<any>;
    /**
     * Returns a guild member object for the provided user_id.
     *
     * example:
     * ```js
     * let member = await api.Discord.Guilds.members.getMember({
     *   guild_id: `Guild ID`,
     *   user_id: `User ID`
     * });
     * ```
     * @param {string} guild_id Id of the guild containing the requested user. (must be a string)
     * @param {string} user_id Id of the user to retrieve. (must be a string)
     * @returns {Promise<object>} `{...}`
     */
    function getMember(params: any): Promise<any>;
    function removeGuildMember(params: any): Promise<any>;
    function removeGuildMember(params: any): Promise<any>;
    function modifyGuildMember(params: any): Promise<any>;
    function modifyGuildMember(params: any): Promise<any>;
}
//# sourceMappingURL=guilds.d.ts.map