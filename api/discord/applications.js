// @ts-check
'use-strict';

const { getAppId, buildQueryString, imageData } = require('../resources/functions');
const { attemptHandler } = require('../resources/handlers');
// Applications
// https://discord.com/developers/docs/interactions/application-commands/

/**
 * @file All Discord API endpoints relating to application commands and entitlements
 * @module applications
 */
module.exports = {

  /**
   * ### [Get Current Application]{@link(https://discord.com/developers/docs/resources/application#get-current-application)}
   * @example
   * await api.discord.applications.getMe();
   * @memberof module:applications#
   * @function getMe
   * @returns {Promise<Application>} The [Application]{@link(https://discord.com/developers/docs/resources/application#application-object)} object associated with the requesting bot user.
   */
  getMe: async () =>
    attemptHandler({
      method: 'GET',
      endpoint: 'applications/@me'
    }), // End of Get Current Application

  /**
   * ### [Edit Current Application]{@link(https://discord.com/developers/docs/resources/application#edit-current-application)}
   * Edit properties of the app associated with the requesting bot user.
   * Only properties that are passed will be updated.
   * *Only limited intent flags (`GATEWAY_PRESENCE_LIMITED`, `GATEWAY_GUILD_MEMBERS_LIMITED`, and `GATEWAY_MESSAGE_CONTENT_LIMITED`) can be updated via the API.*
   * @example
   * await api.discord.applications.getMe({
   *   description: 'new description',
   *   icon: 'https://url_to_image.png' // or buffer,
   *   install_params: {
   *     scopes: [
   *       'identify',
   *       'bot',
   *       'applications.commands'
   *     ],
   *     permissions: '8'
   *   }
   * });
   * @memberof module:applications#
   * @function updateMe
   * @param {Object} params
   * @param {string} [params.description] - Description of the app
   * @param {string} [params.custom_install_url] - Default custom authorization URL for the app, if enabled
   * @param {string} [params.interactions_endpoint_url] - [Interactions endpoint URL]{@link(https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction)} for the app
   * @param {string} [params.role_connections_verification_url] - Role connection verification URL for the app
   * @param {InstallParams} [params.install_params] - Settings for the app's default in-app authorization link, if enabled
   * @param {number} [params.flags] - App's public [flags]{@link(https://discord.com/developers/docs/resources/application#application-object-application-flags)}
   * @param {string|Buffer} [params.icon] - Icon for the app
   * @param {string|Buffer} [params.cover_image] - Default rich presence invite cover image for the app
   * @param {string[]} [params.tags] - List of tags describing the content and functionality of the app (max of 20 characters per tag). Max of 5 tags
   * @returns {Promise<Application>} The updated [Application]{@link(https://discord.com/developers/docs/resources/application#application-object)} object on success.
   */
  updateMe: async (params) => {
    if (params.icon) params.icon = (await imageData(params.icon, 'base64string')).data;
    if (params.cover_image) params.cover_image = (await imageData(params.cover_image, 'base64string')).data;

    return attemptHandler({
      method: 'PATCH',
      endpoint: 'applications/@me',
      body: params
    }); // End of Update Current Application
  },
  /**
   * ### [Get Application Role Connection Metadata Records]{@link(https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records)}
   * @example
   * await api.discord.applications.appRoleConnectionMeta();
   * // or
   * await api.discord.applications.appRoleConnectionMeta({
   *   application_id: '0000000000000'
   * });
   * @memberof module:applications#
   * @function appRoleConnectionMeta
   * @param {Object} [params]
   * @param {Snowflake} [params.application_id]
   * @returns {Promise<ApplicationRoleConnectionMetadata[]>} A list of [Application Role Connection Metadata]{@link(https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object)} objects for the given application.
   */
  appRoleConnectionMeta: async (params) => {
    const application_id = params?.application_id ?? await getAppId();

    return attemptHandler({
      method: 'GET',
      endpoint: `applications/${application_id}/role-connections/metadata`
    }); // End of Get Application Role Connection Metadata Records
  },

  /**
   * ### [Update Application Role Connection Metadata Records]{@link(https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records)}
   * @example
   * await api.discord.applications.updateAppRoleConnectionMeta({
   *   application_id: '0000000000000'
   * });
   * @memberof module:applications#
   * @function updateAppRoleConnectionMeta
   * @param {Object} [params]
   * @param {Snowflake} [params.application_id]
   * @returns {Promise<ApplicationRoleConnectionMetadata[]>} A list of updated [Application Role Connection Metadata]{@link(https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object)} objects for the given application.
   */
  updateAppRoleConnectionMeta: async (params) => {
    const application_id = params?.application_id ?? await getAppId();
    return attemptHandler({
      method: 'PUT',
      endpoint: `applications/${application_id}/role-connections/metadata`
    }); // End of Update Application Role Connection Metadata Records
  },


  /**
	 * ### All functions relating to application commands
	 * @memberof module:applications
	 * @namespace commands
	 */
  commands: {

    /**
     * ### [Get Application Command]{@link(https://discord.com/developers/docs/interactions/application-commands#get-global-application-command)}
     * - This is to be used for both global and guild commands.
     * - Provide a guild_id field if using for a guild command.
     * @example
     * await api.discord.applications.commands.retrieve({
     *   command_id: '0000000000',
     *   application_id: '0000000000',
     *   guild_id: '0000000000' // optional
     * });
     * @memberof module:applications.commands#
     * @function retrieve
     * @param {Object} params
     * @param {Snowflake} [params.application_id]
     * @param {Snowflake} params.command_id
     * @param {Snowflake} [params.guild_id] - Optional. Use for guild commands only.
     * @returns {Promise<ApplicationCommand>} [Application Command]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-object)} object
     */
    retrieve: async (params) => {
      const application_id = params?.application_id ?? await getAppId();
      const paths = [`applications/${application_id}`, `commands/${params.command_id}`];
      params.guild_id ? paths.splice(1, 0, `guilds/${params.guild_id}`) : paths;

      return attemptHandler({
        method: 'GET',
        endpoint: paths.join('/')
      });
    }, // End of Get Guild Command && Get Global Command

    /**
     * ### [Get Application Commands]{@link(https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands)}
     * - This is to be used for both global and guild commands.
     * - Provide a guild_id field if using for a guild command.
     * @example
     * await api.discord.applications.commands.getAll({
     *   application_id: '0000000000',
     *   guild_id: '0000000000' // optional
     * });
     * @memberof module:applications.commands#
     * @function getAll
     * @param {Object} [params]
     * @param {Snowflake} [params.application_id]
     * @param {Snowflake} [params.guild_id] - Optional. Use for guild commands only.
     * @param {boolean} [params.with_localizations=false] - Whether to include full localization dictionaries (`name_localizations` and `description_localizations`) in the returned objects, instead of the `name_localized` and `description_localized` fields.
     * @returns {Promise<ApplicationCommand[]>} An array of [Application Command]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-object)} objects
     */
    getAll: async (params) => {
      const application_id = params?.application_id ?? await getAppId();
      const paths = [`applications/${application_id}`, 'commands' /* `commands/?with_localizations=${params.with_localizations || false}`*/];
      params && params.guild_id ? paths.splice(1, 0, `guilds/${params.guild_id}`) : paths;
      if (params && params.with_localizations) paths.push(`/?with_localizations=${params.with_localizations || false}`);

      return attemptHandler({
        method: 'GET',
        endpoint: paths.join('/')
      });
    }, // End of Get Guild Commands && Get Global Commands

    /**
     * ### [Create Application Command]{@link(https://discord.com/developers/docs/interactions/application-commands#create-global-application-command)}
     * - Creating a command with the same name as an existing command for your application will overwrite the old command.
     * - This is to be used for both global and guild commands.
     * - Provide a guild_id field if using for a guild command.
     * @example
     * await api.discord.applications.commands.create({
     *   name: 'slashcommand',
     *   description: 'Command description',
     *   guild_id: '0000000000', // optional
     *   options: [{
     *     type: 1, // SUB_COMMAND
     *     name: 'subCommand',
     *     options: [
     *       {
     *         type: 3, // STRING
     *         name: 'content',
     *         description: 'Enter content here',
     *         required: true
     *       },
     *       {
     *         type: 6, // USER
     *         name: 'user',
     *         description: 'Select a user'
     *       }
     *     ]
     *   }]
     * });
     * @memberof module:applications.commands#
     * @function create
     * @param {Object} params
     * @param {Snowflake} [params.application_id]
     * @param {string} params.name - [Name of command]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming)}, 1-32 characters
     * @param {Snowflake} [params.guild_id] - Optional. Use for guild commands only.
     * @param {LocalizationMap | null} [params.name_localizations] - Localization dictionary for the name field.
     * @param {string} [params.description] - 1-100 character description for `CHAT_INPUT` commands
     * @param {LocalizationMap | null} [params.description_localizations] - Localization dictionary for the description field.
     * @param {boolean} [params.dm_permission]
     * Indicates whether the command is available in DMs with the app
     *
     * Only for globally-scoped commands.
     *
     * By default, commands are visible
     * @param {string} [params.default_member_permissions] - Set of [permissions]{@link(https://discord.com/developers/docs/topics/permissions)} represented as a bit set
     * @param {boolean} [params.nsfw] - Indicates where the command is [age-restricted]{@link(https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands)}
     * @param {ApplicationCommandType} [params.type=1]
     * One of [Application Command type]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types)}
     *
     * Defaults to 1 (`CHAT_INPUT`) if not set
     * @param {ApplicationCommandOption[]} [params.options] - Array of [Application Command options]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure)}
     * @returns {Promise<ApplicationCommand>} [Application Command]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-object)} object
     */
    create: async (params) => {
      const application_id = params?.application_id ?? await getAppId();
      const paths = [`applications/${application_id}`, 'commands'];
      params.guild_id ? paths.splice(1, 0, `guilds/${params.guild_id}`) : paths;

      const body = {
        name: params.name,
        name_localizations: params.name_localizations ?? null,
        description: params.description ?? null,
        description_localizations: params.description_localizations ?? null,
        options: params.options ?? [],
        default_member_permissions: params.default_member_permissions ?? null,
        type: params.type ?? 1,
        nsfw: params.nsfw || null,
        dm_permission: true
      };

      if (!params.guild_id) {
        body.dm_permission = params.dm_permission || true;
      }

      return attemptHandler({
        method: 'POST',
        endpoint: paths.join('/'),
        body
      });
    }, // End of Create Application Command

    /**
     * ### [Edit Application Command]{@link(https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command)}
     * - This is to be used for both global and guild commands.
     * - Provide a guild_id field if using for a guild command.
     * - All fields are optional, but any fields provided will entirely overwrite the existing values of those fields.
     * @example
     * await api.discord.applications.commands.update({
     *   command_id: '0000000000',
     *   guild_id: '0000000000', // optional
     *   name: 'slashcommand',
     *   description: 'Command description',
     *   options: [{
     *     type: 1, // SUB_COMMAND
     *     name: 'subCommand',
     *     options: [
     *       {
     *         type: 3, // STRING
     *         name: 'content',
     *         description: 'Enter content here',
     *         required: true
     *       },
     *       {
     *         type: 6, // USER
     *         name: 'user',
     *         description: 'Select a user'
     *       }
     *     ]
     *   }]
     * });
     * @memberof module:applications.commands#
     * @function update
     * @param {Object} params
     * @param {Snowflake} [params.application_id]
     * @param {Snowflake} params.command_id
     * @param {Snowflake} [params.guild_id] - Optional. Use for guild commands only.
     * @param {string} [params.name] - [Name of command]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming)}, 1-32 characters
     * @param {LocalizationMap | null} [params.name_localizations] - Localization dictionary for the name field.
     * @param {string} [params.description] - 1-100 character description for `CHAT_INPUT` commands
     * @param {LocalizationMap | null} [params.description_localizations] - Localization dictionary for the description field.
     * @param {boolean} [params.dm_permission]
     * Indicates whether the command is available in DMs with the app
     *
     * Only for globally-scoped commands.
     *
     * By default, commands are visible
     * @param {string} [params.default_member_permissions] - Set of [permissions]{@link(https://discord.com/developers/docs/topics/permissions)} represented as a bit set
     * @param {boolean} [params.nsfw] - Indicates where the command is [age-restricted]{@link(https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands)}
     * @param {ApplicationCommandOption[]} [params.options] - Array of [Application Command options]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure)}
     * @returns {Promise<ApplicationCommand>} [Application Command]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-object)} object
     */
    update: async (params) => {
      const application_id = params?.application_id ?? await getAppId();
      const paths = [`applications/${application_id}`, `commands/${params.command_id}`];
      params.guild_id ? paths.splice(1, 0, `guilds/${params.guild_id}`) : paths;

      const { guild_id, dm_permission, ...body } = params;
      // @ts-ignore
      if (!guild_id) body.dm_permission = params.dm_permission || true;

      return attemptHandler({
        method: 'PATCH',
        endpoint: paths.join('/'),
        body
      });
    }, // End of Edit Application Command

    /**
     * ### [Delete Application Command]{@link(https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command)}
     * - This is to be used for both global and guild commands.
     * - Provide a guild_id field if using for a guild command.
     * @example
     * await api.discord.applications.commands.destroy({
     *   application_id: '0000000000',
     *   command_id: '0000000000',
     *   guild_id: '0000000000' // optional
     * });
     * @memberof module:applications.commands#
     * @function destroy
     * @param {Object} params
     * @param {Snowflake} [params.application_id]
     * @param {Snowflake} params.command_id
     * @param {Snowflake} [params.guild_id] - Optional. Use for guild commands only.
     * @returns {Promise<{ statusCode: 204, type: 'discord', message: 'Success' }>}
     */
    destroy: async (params) => {
      const application_id = params?.application_id ?? await getAppId();
      const paths = [`applications/${application_id}`, `commands/${params.command_id}`];
      params.guild_id ? paths.splice(1, 0, `guilds/${params.guild_id}`) : paths;

      return attemptHandler({
        method: 'DELETE',
        endpoint: paths.join('/')
      });
    }, // End of Delete Application Command

    /**
     * ### [Bulk Overwrite Global Application Commands]{@link(https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands)}
     * - Takes a list of application commands, overwriting the existing global command list for this application.
     * - Commands that do not already exist will count toward daily application command create limits.
     * - This will overwrite all types of application commands: slash commands, user commands, and message commands.
     *
     * - This is to be used for both global and guild commands.
     * - Provide a guild_id field if using for a guild command.
     * @example
     * await api.discord.applications.commands.bulkOverwrite({
     *   application_id: '0000000000',
     *   guild_id: '0000000000', // optional
     *   application_commands: [commands]
     * });
     * @memberof module:applications.commands#
     * @function bulkOverwrite
     * @param {Object} [params]
     * @param {Snowflake} [params.application_id]
     * @param {Snowflake} [params.guild_id] - Optional. Use for guild commands only.
     * @param {ApplicationCommand[]} [params.application_commands]
     * @returns {Promise<ApplicationCommand[]>} A list of [Application Command]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-object)} objects
     */
    bulkOverwrite: async (params) => {
      const application_id = params?.application_id ?? await getAppId();
      const paths = [`applications/${application_id}`, 'commands'];
      params && params.guild_id ? paths.splice(1, 0, `guilds/${params.guild_id}`) : paths;

      return attemptHandler({
        method: 'PUT',
        endpoint: paths.join('/'),
        body: params?.application_commands || []
      });
    }, // End of Bulk Overwrite Application Commands

    /**
     * ### [Get Application Command Permissions]{@link(https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions)}
     * - Fetches permissions for a specific command for your application in a guild
     * @example
     * await api.discord.applications.commands.retrievePermissions({
     *   guild_id: '0000000000',
     *   command_id: '0000000000'
     * });
     * @memberof module:commands#
     * @function retrievePermissions
     * @param {Object} params
     * @param {Snowflake} [params.application_id]
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.command_id
     * @returns {Promise<GuildApplicationCommandPermissions>} [Guild Application Command Permissions]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure)} object
     */
    retrievePermissions: async (params) => {
      const application_id = params?.application_id ?? await getAppId();
      return attemptHandler({
        method: 'GET',
        endpoint: `applications/${application_id}/guilds/${params.guild_id}/commands/${params.command_id}/permissions`
      }); // End of Get Application Command Permissions
    },
    /**
     * ### [Get Guild Application Command Permissions]{@link(https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions)}
     * - Fetches permissions for all commands for your application in a guild
     * @example
     * await api.discord.applications.commands.getAllPermissions({
     *   guild_id: '0000000000'
     * });
     * @memberof module:commands#
     * @function getAllPermissions
     * @param {Object} params
     * @param {Snowflake} [params.application_id]
     * @param {Snowflake} params.guild_id
     * @returns {Promise<GuildApplicationCommandPermissions>} [Guild Application Command Permissions]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure)} object
     */
    getAllPermissions: async (params) => {
      const application_id = params?.application_id ?? await getAppId();
      return attemptHandler({
        method: 'GET',
        endpoint: `applications/${application_id}/guilds/${params.guild_id}/commands/permissions`
      }); // End of Get Guild Application Command Permissions
    },
    /**
     * ### [Edit Application Command Permissions]{@link(https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions)}
     * Edits command permissions for a specific command for your application in a guild
     * - You can add up to 100 permission overwrites for a command
     * - This endpoint requires authentication with a Bearer token that has permission to manage the guild and its roles.
     * - For more information, read about [Application Command Permissions]{@link(https://discord.com/developers/docs/interactions/application-commands#permissions)}
     * @example
     * await api.discord.applications.commands.updatePermissions({
     *   guild_id: '0000000000',
     *   command_id: '0000000000'
     * });
     * @memberof module:commands#
     * @function updatePermissions
     * @param {Object} params
     * @param {Snowflake} [params.application_id]
     * @param {Snowflake} params.guild_id
     * @param {Snowflake} params.command_id
     * @param {GuildApplicationCommandPermissions[]} params.permissions
     * @example
     * [{
     *   id: '0000000000',
     *   type: 1, // role
     *   permission: true
     * }]
     * @returns {Promise<GuildApplicationCommandPermissions>} [Guild Application Command Permissions]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure)} object
     */
    updatePermissions: async (params) => {
      const application_id = params?.application_id ?? await getAppId();
      return attemptHandler({
        method: 'PUT',
        endpoint: `applications/${application_id}/guilds/${params.guild_id}/commands/${params.command_id}/permissions`,
        body: {
          permissions: params.permissions
        }
      }); // End of Delete Global Application Command
    }
  }, // End of applications.commands

  /**
	 * ### All functions relating to application's entitlements
	 * @memberof module:applications
	 * @namespace entitlements
	 */
  entitlements: {

    /**
     * ### [List Entitlements]{@link(https://discord.com/developers/docs/monetization/entitlements#list-entitlements)}
     * @example
     * await api.discord.applications.entitlements.getAll({
     *   application_id: '0000000000',
     *   user_id: '0000000000',
     *   before: '0000000000',
     *   after: '0000000000',
     *   limit: 2
     * });
     * @memberof module:applications.entitlements#
     * @function getAll
     * @param {Object} params
     * @param {Snowflake} [params.application_id]
     * @param {Snowflake} [params.user_id] - User ID to look up entitlements for
     * @param {Snowflake} params.sku_ids - Optional list of SKU IDs to check entitlements for (comma-delimited set of snowflakes)
     * @param {Snowflake} [params.guild_id] - Guild ID to look up entitlements for
     * @param {Snowflake} [params.before] - Retrieve entitlements before this time
     * @param {Snowflake} [params.after] - Retrieve entitlements after this time
     * @param {number} [params.limit] - Number of entitlements to return, 1-100, default 100
     * @param {boolean} [params.exclude_ended] - Whether entitlements should be omitted
     * @returns {Promise<Entitlement[]>} All [Entitlements]{@link(https://discord.com/developers/docs/monetization/entitlements#list-entitlements)} for a given application
     */
    getAll: async (params) => {
      const application_id = params?.application_id ?? await getAppId();
      const endpoint = buildQueryString(`applications/${application_id}/entitlements`, {
        sku_ids: params.sku_ids,
        exclude_ended: params.exclude_ended,
        limit: params.limit,
        user_id: params.user_id,
        guild_id: params.guild_id,
        before: params.before,
        after: params.after
      });

      return attemptHandler({
        method: 'GET',
        endpoint
      });
    }, // End of List Entitlements

    /**
     * ### [Create Test Entitlement]{@link(https://discord.com/developers/docs/monetization/entitlements#create-test-entitlement)}
     * - Creates a test entitlement to a given SKU for a given guild or user.
     * - Discord will act as though that user or guild has entitlement to your premium offering.
     * - After creating a test entitlement, you'll need to reload your Discord client.
     * - After doing so, you'll see that your server or user now has premium access.
     * @example
     * await api.discord.applications.entitlements.create({
     *   application_id: '0000000000',
     *   sku_id: '0000000000',
     *   owner_id: '0000000000',
     *   owner_type: 1
     * });
     * @memberof module:applications.entitlements#
     * @function create
     * @param {Object} params
     * @param {Snowflake} [params.application_id]
     * @param {Snowflake} params.sku_id - ID of the SKU to grant the entitlement to
     * @param {Snowflake} params.owner_id - ID of the guild or user to grant the entitlement to
     * @param {number} params.owner_type
     * - `1` for guild subscription
     * - `2` for user subsctripion
     * @returns {Promise<PartialEntitlement>} [Guild Application Command Permissions]{@link(https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure)} object
     */
    create: async (params) => {
      const application_id = params?.application_id ?? await getAppId();
      return attemptHandler({
        method: 'POST',
        endpoint: `applications/${application_id}/entitlements`,
        body: params
      }); // End of Create Test Entitlement
    },
    /**
     * ### [Delete Test Entitlement]{@link(https://discord.com/developers/docs/monetization/entitlements#delete-test-entitlement)}
     * @example
     * await api.discord.applications.entitlements.destroy({
     *   application_id: '0000000000',
     *   entitlement_id: '0000000000'
     * });
     * @memberof module:applications.entitlements#
     * @function destroy
     * @param {Object} params
     * @param {Snowflake} [params.application_id]
     * @param {Snowflake} params.entitlement_id
     * @returns {Promise<{ statusCode: 204, type: 'discord', message: 'Success' }>} 204 on success
     */
    destroy: async (params) => {
      const application_id = params?.application_id ?? await getAppId();
      return attemptHandler({
        method: 'DELETE',
        endpoint: `applications/${application_id}/entitlements/${params.entitlement_id}`
      }); // End of Delete Test Entitlement
    }
  }, // End of applications.entitlements


  /**
	 * ### All functions relating to application's [SKUs]{@link(https://discord.com/developers/docs/monetization/skus#sku-resource)}
	 * @memberof module:applications
	 * @namespace SKUs
	 */
  SKUs: {

    /**
     * ### [List SKUs]{@link(https://discord.com/developers/docs/monetization/skus#list-skus)}
     * Returns all SKUs for a given application.
     * Because of how the SKU and subscription systems work, you will see two SKUs for your premium offering.
     * For integration and testing entitlements, you should use the SKU with `type: 5`.
     * @example
     * await api.discord.applications.SKUs.getAll({
     *   application_id: '0000000000000'
     * });
     * @memberof module:commands#
     * @function appRoleConnectionMeta
     * @param {Object} [params]
     * @param {Snowflake} [params.application_id]
     * @returns {Promise<SKU[]>} All [SKUs]{@link(https://discord.com/developers/docs/monetization/skus#list-skus)} for a given application.
     */
    getAll: async (params) => {
      const application_id = params?.application_id ?? await getAppId();
      return attemptHandler({
        method: 'GET',
        endpoint: `applications/${application_id}/skus`
      }); // End of List SKUs
    }
  }, // End of applications.SKUs

  /**
   * ### All functions relating to application emojis
   * @memberof module:applications
   * @namespace emojis
   */
  emojis: {

    /**
     * ### [Get Application Emoji]{@link(https://discord.com/developers/docs/resources/emoji#get-application-emoji)}
     * @example
     * await api.discord.applications.emojis.retrieve({
     *   application_id: '0000000000',
     *   emoji_id: '0000000000'
     * });
     * @function retrieve
     * @memberof module:applications.emojis#
     * @param {Object} params
     * @param {Snowflake} params.emoji_id
     * @param {Snowflake} [params.application_id]
     * @returns {Promise<Emoji>} [Emoji]{@link(https://discord.com/developers/docs/resources/emoji#emoji-object)} object for the given guild and emoji IDs.
     */
    retrieve: async (params) =>
      attemptHandler({
        method: 'GET',
        endpoint: `applications/${params.application_id ?? await getAppId()}/emojis/${params.emoji_id}`
      }), // End of Get Application Emoji

    /**
     * ### [List Application Emojis]{@link(https://discord.com/developers/docs/resources/emoji#list-application-emojis)}
     * @example
     * await api.discord.applications.emojis.getAll();
     *
     * @function getAll
     * @memberof module:applications.emojis#
     * @param {Object} [params]
     * @param {Snowflake} [params.application_id]
     * @returns {Promise<Emoji[]>} List of [Emoji]{@link(https://discord.com/developers/docs/resources/emoji#emoji-object)} objects for the given guild.
     */
    getAll: async (params) => {
      const attempt = await attemptHandler({
        method: 'GET',
        endpoint: `applications/${params?.application_id ?? await getAppId()}/emojis`
      });

      return attempt.items;
    }, // End of List Application Emojis

    /**
     * ### [Create Application Emoji]{@link(https://discord.com/developers/docs/resources/emoji#create-application-emoji)}
     * @description
     * Emojis have a maximum file size of 256kb
     *
     * @example
     * await api.discord.applications.emojis.create({
     *   name: 'CoolNewEmoji',
     *   image: 'https://www.url.com` // or image buffer
     * });
     *
     * @function create
     * @memberof module:applications.emojis#
     * @fires guilds#emojis_update
     * @param {Object} params
     * @param {Snowflake} [params.application_id]
     * @param {string} params.name - Name of the emoji
     * @param {string | Buffer} params.image - The URL or buffer of the image to use
     * @returns {Promise<Emoji>} The new [Emoji]{@link(https://discord.com/developers/docs/resources/emoji#emoji-object)} object
     */
    create: async (params) =>
      attemptHandler({
        method: 'POST',
        endpoint: `applications/${params.application_id ?? await getAppId()}/emojis`,
        body: {
          name: params.name,
          image: params.image ? (await imageData(params.image, 'base64string')).data : null
        }
      }), // End of Create Application Emoji

    /**
     * ### [Modify Application Emoji]{@link(https://discord.com/developers/docs/resources/emoji#modify-application-emoji)}
     * @example
     * await api.discord.applications.emojis.update({
     *   application_id: '0000000000', // optional
     *   emoji_id: '0000000000',
     *   name: 'CoolNewNewEmoji',
     * });
     *
     * @function update
     * @memberof module:applications.emojis#
     * @fires guilds#emojis_update
     * @param {Object} params
     * @param {Snowflake} [params.application_id]
     * @param {Snowflake} params.emoji_id
     * @param {string} params.name - Name of the emoji
     * @returns {Promise<Emoji>} The updated [Emoji]{@link(https://discord.com/developers/docs/resources/emoji#emoji-object)} object
     */
    update: async (params) =>
      attemptHandler({
        method: 'PATCH',
        endpoint: `applications/${params.application_id ?? await getAppId()}/emojis/${params.emoji_id}`,
        body: params
      }), // End of Modify Application Emoji

    /**
     * ### [Delete Application Emoji]{@link(https://discord.com/developers/docs/resources/emoji#delete-guild-emoji)}
     * @example
     * await api.discord.applications.emojis.destroy({
     *   emoji_id: '0000000000'
     * });
     *
     * @function destroy
     * @memberof module:applications.emojis#
     * @fires guilds#emojis_update
     * @param {Object} params
     * @param {Snowflake} [params.application_id]
     * @param {Snowflake} params.emoji_id
     * @returns {Promise<{ statusCode: 204, type: 'discord', message: 'Success' }>} `204 No Content`
     */
    destroy: async (params) =>
      attemptHandler({
        method: 'DELETE',
        endpoint: `applications/${params.application_id ?? await getAppId()}/emojis/${params.emoji_id}`
      })
  } // End of Delete Application Emoji

};
