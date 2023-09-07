const { ApplicationCommandType } = require('../../enum');
const { attemptHandler } = require('../resources/functions');
const https = require('../utils/https');


// Applications
// https://discord.com/developers/docs/interactions/

/**
 * @file All Discord API endpoints relating to application/command functions
 * @module commands
 */
module.exports = {

  /**
   * @summary
   * ### [Get Global Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-command}
   * @example
   * await params.api.discord.commands.retrieveGlobal({
   *   command_id: '0000000000',
   *   application_id: '0000000000', // optional
   * });
   * @memberof module:commands#
   * @function retrieveGlobal
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {Snowflake} params.command_id
   * @returns {Promise<ApplicationCommand>} [Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object} object
   */
  retrieveGlobal: async (params) => {
    const attempt = await attemptHandler({
      method: 'get',
      path: `applications/${params.application_id}/commands/${params.command_id}`
    }); 
    // attempt.trueType = applicationCommandType[attempt.type];
    return attempt;
  }, // End of Get Global Application Command

  /**
   * @summary
   * ### [Get Global Application Commands]{@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands}
   * @example
   * await commands.getAllGlobal({
   *   application_id: '0000000000000'
   * });
   * @example
   * await commands.getAllGlobal();
   * @memberof module:commands#
   * @function getAllGlobal
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {boolean} [params.with_localizations=false] - Whether to include full localization dictionaries (`name_localizations` and `description_localizations`) in the returned objects, instead of the `name_localized` and `description_localized` fields.
   * @returns {Promise<ApplicationCommand[]>} An array of [Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object} objects
   */
  getAllGlobal: async (params) => {
    const attempt = await attemptHandler({
      method: 'get',
      path: `applications/${params.application_id}/commands?with_localizations=${params.with_localizations ?? false}`
    });
    /*
    for (const a of attempt) {
      a.trueType = applicationCommandType[a.type];
    }
    */
    return attempt;
  }, // End of Get Global Application Commands

  /**
   * @summary
   * ### [Create Global Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#create-global-application-command}
   * - Creating a command with the same name as an existing command for your application will overwrite the old command.
   * @example
   * await params.api.discord.commands.createGlobal({
   *   name: 'slashcommand',
   *   description: 'Command description',
   *   dm_permission: false,
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
   * @memberof module:commands#
   * @function createGlobal
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {string} params.name - [Name of command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming}, 1-32 characters
   * @param {LocalizationMap | null} [params.name_localizations] - Localization dictionary for the name field.
   * @param {string} [params.description] - 1-100 character description for `CHAT_INPUT` commands
   * @param {LocalizationMap | null} [params.description_localizations] - Localization dictionary for the description field.
   * @param {boolean} [params.dm_permission]
   * Indicates whether the command is available in DMs with the app
   * 
   * Only for globally-scoped commands.
   * 
   * By default, commands are visible
   * @param {string} [params.default_member_permissions] - Set of [permissions]{@link https://discord.com/developers/docs/topics/permissions} represented as a bit set
   * @param {boolean} [params.default_permission=true]
   * Indicates whether the command is available in DMs with the app
   * 
   * Only for globally-scoped commands
   * @param {boolean} [params.nsfw] - Indicates where the command is [age-restricted]{@link https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands}
   * @param {ApplicationCommandType} [params.type=1] 
   * One of [Application Command type]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types}
   * 
   * Defaults to 1 (`CHAT_INPUT`) if not set
   * @param {ApplicationCommandOption[]} [params.options] - Array of [Application Command options]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure}
   * @returns {Promise<ApplicationCommand>} [Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object} object
   */
  createGlobal: async (params) =>
    attemptHandler({
      method: 'post',
      path: `applications/${params.application_id}/commands`,
      body: {
        name: params.name,
        name_localizations: params.name_localizations ?? null,
        description: params.description ?? null,
        description_localizations: params.description_localizations ?? null,
        options: params.options ?? [],
        default_member_permissions: params.default_member_permissions ?? null,
        default_permission: params.default_permission || true,
        dm_permissions: params.dm_permission || true,
        type: params.type ?? 1,
        nsfw: params.nsfw ?? null
      }
    }), // End of Create Global Application Command

  /**
   * @summary
   * ### [Edit Global Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command}
   * @example
   * await params.api.discord.commands.modifyGlobal({
   *   command_id: '0000000000',
   *   name: 'slashcommand',
   *   description: 'Command description',
   *   dm_permission: false,
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
   * @memberof module:commands#
   * @function modifyGlobal
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {Snowflake} params.command_id
   * @param {string} [params.name] - [Name of command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming}, 1-32 characters
   * @param {LocalizationMap | null} [params.name_localizations] - Localization dictionary for the name field.
   * @param {string} [params.description] - 1-100 character description for `CHAT_INPUT` commands
   * @param {LocalizationMap | null} [params.description_localizations] - Localization dictionary for the description field.
   * @param {boolean} [params.dm_permission]
   * Indicates whether the command is available in DMs with the app
   * 
   * Only for globally-scoped commands.
   * 
   * By default, commands are visible
   * @param {string} [params.default_member_permissions] - Set of [permissions]{@link https://discord.com/developers/docs/topics/permissions} represented as a bit set
   * @param {boolean} [params.default_permission=true]
   * Indicates whether the command is available in DMs with the app
   * 
   * Only for globally-scoped commands
   * @param {boolean} [params.nsfw] - Indicates where the command is [age-restricted]{@link https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands}
   * @param {ApplicationCommandOption[]} [params.options] - Array of [Application Command options]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure}
   * @returns {Promise<ApplicationCommand>} [Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object} object
   */
  modifyGlobal: async (params) =>
    attemptHandler({
      method: 'patch',
      path: `applications/${params.application_id}/commands/${params.command_id}`,
      body: params
    }), // End of Edit Global Application Command

  /**
   * @summary
   * ### [Delete Global Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command}
   * @example
   * await params.api.discord.commands.destroyGlobal({
   *   command_id: '0000000000'
   * });
   * @memberof module:commands#
   * @function destroyGlobal
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {Snowflake} params.command_id
   * @returns {Promise<{}>} `204 No Content`
   */
  destroyGlobal: async (params) =>
    attemptHandler({
      method: 'del',
      path: `applications/${params.application_id}/commands/${params.command_id}`
    }), // End of Delete Global Application Command

  /**
   * @summary
   * ### [Bulk Overwrite Global Application Commands]{@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands}
   * - Takes a list of application commands, overwriting the existing global command list for this application
   * - Commands that do not already exist will count toward daily application command create limits
   * - This will overwrite all types of application commands: slash commands, user commands, and message commands
   * @example
   * await params.api.discord.commands.bulkOverwriteGlobal({
   *   application_commands: [commands]
   * });
   * @example
   * await params.api.discord.commands.bulkOverwriteGlobal();
   * @memberof module:commands#
   * @function bulkOverwriteGlobal
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {ApplicationCommand[]} [params.application_commands] 
   * @returns {Promise<ApplicationCommand[]>} A list of [Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object} objects
   */
  bulkOverwriteGlobal: async (params) =>
    attemptHandler({
      method: 'put',
      path: `applications/${params.application_id}/commands`,
      body: params.application_commands || []
    }), // End of Bulk Overwrite Global Application Commands

  /**
   * @summary
   * ### [Get Guild Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command}
   * @example
   * await params.api.discord.commands.retrieveGuild({
   *   guild_id: '0000000000',
   *   command_id: '0000000000'
   * });
   * @memberof module:commands#
   * @function retrieveGuild
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {Snowflake} params.guild_id
   * @param {Snowflake} params.command_id
   * @returns {Promise<ApplicationCommand>} [Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object} object
   */
  retrieveGuild: async (params) => {
    const attempt = await attemptHandler({
      method: 'get',
      path: `applications/${params.application_id}/guilds/${params.guild_id}/commands/${params.command_id}`
    });
    // attempt.trueType = applicationCommandType[attempt.type];
    return attempt;
  }, // End of Get Guild Application Command

  /**
   * @summary
   * ### [Get Guild Application Commands]{@link https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands}
   * @example
   * await params.api.discord.commands.retrieveGuild({
   *   guild_id: '0000000000'
   * });
   * @memberof module:commands#
   * @function getAllGuild
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {Snowflake} params.guild_id
   * @param {boolean} [params.with_localizations=false] - Whether to include full localization dictionaries (`name_localizations` and `description_localizations`) in the returned objects, instead of the `name_localized` and `description_localized` fields
   * @returns {Promise<ApplicationCommand[]>} A list of [Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object} objects
   */
  getAllGuild: async (params) => {
    const attempt = await attemptHandler({
      method: 'get',
      path: `applications/${params.application_id}/guilds/${params.guild_id}/commands`
    });
    /*
    for (const a of attempt) {
      a.trueType = applicationCommandType[a.type];
    }
    */
    return attempt;
  }, // End of Get Guild Application Commands

  /**
   * @summary
   * ### [Create Guild Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command}
   * - Creating a command with the same name as an existing command for your application will overwrite the old command.
   * @example
   * await params.api.discord.commands.createGuild({
   *   guild_id: '0000000000',
   *   name: 'slashcommand',
   *   description: 'Command description',
   *   dm_permission: false,
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
   * @memberof module:commands#
   * @function createGuild
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {Snowflake} params.guild_id
   * @param {string} params.name - [Name of command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming}, 1-32 characters
   * @param {LocalizationMap | null} [params.name_localizations] - Localization dictionary for the name field.
   * @param {string} [params.description] - 1-100 character description for `CHAT_INPUT` commands
   * @param {LocalizationMap | null} [params.description_localizations] - Localization dictionary for the description field.
   * @param {boolean} [params.dm_permission=true]
   * Indicates whether the command is available in DMs with the app
   * 
   * Only for globally-scoped commands
   * @param {string} [params.default_member_permissions] - Set of [permissions]{@link https://discord.com/developers/docs/topics/permissions} represented as a bit set
   * @param {boolean} [params.default_permission=true]
   * Indicates whether the command is available in DMs with the app
   * 
   * Only for globally-scoped commands
   * @param {boolean} [params.nsfw] - Indicates where the command is [age-restricted]{@link https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands}
   * @param {ApplicationCommandType} [params.type=1] - One of [Application Command type]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types}
   * @param {ApplicationCommandOption[]} [params.options] - Array of [Application Command options]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure}
   * @returns {Promise<ApplicationCommand>} [Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object} object
   */
  createGuild: async (params) =>
    attemptHandler({
      method: 'post',
      path: `applications/${params.application_id}/guilds/${params.guild_id}/commands`,
      body: {
        name: params.name,
        name_localizations: params.name_localizations ?? null,
        description: params.description ?? null,
        description_localizations: params.description_localizations ?? null,
        options: params.options ?? [],
        default_member_permissions: params.default_member_permissions ?? null,
        default_permission: params.default_permission || true,
        dm_permissions: params.dm_permission || true,
        type: params.type ?? 1,
        nsfw: params.nsfw ?? null
      }
    }), // End of Create Guild Application Command

  /**
   * @summary
   * ### [Edit Guild Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command}
   * @example
   * await params.api.discord.commands.modifyGuild({
   *   guild_id: '0000000000',
   *   command_id: '0000000000',
   *   name: 'slashcommand',
   *   description: 'Command description',
   *   dm_permission: false,
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
   * @memberof module:commands#
   * @function modifyGuild
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {Snowflake} params.guild_id
   * @param {Snowflake} params.command_id
   * @param {string} [params.name] - [Name of command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming}, 1-32 characters
   * @param {LocalizationMap | null} [params.name_localizations] - Localization dictionary for the name field.
   * @param {string} [params.description] - 1-100 character description for `CHAT_INPUT` commands
   * @param {LocalizationMap | null} [params.description_localizations] - Localization dictionary for the description field.
   * @param {boolean} [params.dm_permission=true]
   * Indicates whether the command is available in DMs with the app
   * 
   * Only for globally-scoped commands
   * @param {string} [params.default_member_permissions] - Set of [permissions]{@link https://discord.com/developers/docs/topics/permissions} represented as a bit set
   * @param {boolean} [params.default_permission=true]
   * Indicates whether the command is available in DMs with the app
   * 
   * Only for globally-scoped commands
   * @param {boolean} [params.nsfw] - Indicates where the command is [age-restricted]{@link https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands}
   * @param {ApplicationCommandOption[]} [params.options] - Array of [Application Command options]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure}
   * @returns {Promise<ApplicationCommand>} [Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object} object
   */
  modifyGuild: async (params) =>
    attemptHandler({
      method: 'patch',
      path: `applications/${params.application_id}/guilds/${params.guild_id}/commands/${params.command_id}`,
      body: params
    }), // End of Edit Guild Application Command

  /**
   * @summary
   * ### [Delete Guild Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command}
   * @example
   * await params.api.discord.commands.destroyGuild({
   *   guild_id: '0000000000',
   *   command_id: '0000000000'
   * });
   * @memberof module:commands#
   * @function destroyGuild
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {Snowflake} params.guild_id
   * @param {Snowflake} params.command_id
   * @returns {Promise<{}>} `204 No Content`
   */
  destroyGuild: async (params) =>
    attemptHandler({
      method: 'del',
      path: `applications/${params.application_id}/guilds/${params.guild_id}/commands/${params.command_id}`
    }), // End of Delete Global Application Command

  /**
   * @summary
   * ### [Bulk Overwrite Guild Application Commands]{@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands}
   * - Takes a list of application commands, overwriting the existing global command list for this application
   * - Commands that do not already exist will count toward daily application command create limits
   * - This will overwrite all types of application commands: slash commands, user commands, and message commands
   * @example
   * await params.api.discord.commands.bulkOverwriteGuild({
   *   guild_id: '0000000000',
   *   application_commands: [commands]
   * });
   * @example
   * await params.api.discord.commands.bulkOverwriteGuild({
   *   guild_id: '0000000000'
   * });
   * @memberof module:commands#
   * @function bulkOverwriteGuild
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {Snowflake} params.application_id
   * @param {ApplicationCommand[]} [params.application_commands] 
   * @returns {Promise<ApplicationCommand[]>} A list of [Application Command]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-object} objects
   */
  bulkOverwriteGuild: async (params) => 
    attemptHandler({
      method: 'put',
      path: `applications/${params.application_id}/guilds/${params.guild_id}/commands`,
      body: params.application_commands || []
    }), // End of Bulk Overwrite Guild Application Commands  

  /**
   * @summary
   * ### [Get Application Command Permissions]{@link https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions}
   * - Fetches permissions for a specific command for your application in a guild
   * @example
   * await params.api.discord.commands.retrievePermissions({
   *   guild_id: '0000000000',
   *   command_id: '0000000000'
   * });
   * @memberof module:commands#
   * @function retrievePermissions
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {Snowflake} params.guild_id
   * @param {Snowflake} params.command_id 
   * @returns {Promise<GuildApplicationCommandPermissions>} [Guild Application Command Permissions]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure} object
   */
  retrievePermissions: async (params) =>
    attemptHandler({
      method: 'get',
      path: `applications/${params.application_id}/guilds/${params.guild_id}/commands/${params.command_id}/permissions`
    }), // End of Get Application Command Permissions

  /**
   * @summary
   * ### [Get Guild Application Command Permissions]{@link https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions}
   * - Fetches permissions for all commands for your application in a guild
   * @example
   * await params.api.discord.commands.getAllPermissions({
   *   guild_id: '0000000000'
   * });
   * @memberof module:commands#
   * @function getAllPermissions
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {Snowflake} params.guild_id
   * @returns {Promise<GuildApplicationCommandPermissions>} [Guild Application Command Permissions]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure} object
   */
  getAllPermissions: async (params) =>
    attemptHandler({
      method: 'get',
      path: `applications/${params.application_id}/guilds/${params.guild_id}/commands/permissions`
    }), // End of Get Guild Application Command Permissions

  /**
   * @summary
   * ### [Edit Application Command Permissions]{@link https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions}
   * Edits command permissions for a specific command for your application in a guild
   * - You can add up to 100 permission overwrites for a command
   * - This endpoint requires authentication with a Bearer token that has permission to manage the guild and its roles.
   * - For more information, read about [Application Command Permissions]{@link https://discord.com/developers/docs/interactions/application-commands#permissions}
   * @example
   * await params.api.discord.commands.modifyPermissions({
   *   guild_id: '0000000000',
   *   command_id: '0000000000'
   * });
   * @memberof module:commands#
   * @function modifyPermissions
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @param {Snowflake} params.guild_id
   * @param {Snowflake} params.command_id
   * @param {GuildApplicationCommandPermissions[]} params.permissions
   * @example
   * [{
   *   id: '0000000000',
   *   type: 1, // role
   *   permission: true
   * }]
   * @returns {Promise<GuildApplicationCommandPermissions>} [Guild Application Command Permissions]{@link https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure} object
   */
  modifyPermissions: async (params) =>
    attemptHandler({
      method: 'put',
      path: `applications/${params.application_id}/guilds/${params.guild_id}/commands/${params.command_id}/permissions`,
      body: {
        permissions: params.permissions
      }
    }), // End of Delete Global Application Command
  
  /**
   * @summary
   * ### [Get Application Role Connection Metadata Records]{@link https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records}
   * @example
   * await params.api.discord.commands.appRoleConnectionMeta({
   *   application_id: '0000000000000'
   * });
   * @memberof module:commands#
   * @function appRoleConnectionMeta
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @returns {Promise<ApplicationRoleConnectionMetadata[]>} A list of [Application Role Connection Metadata]{@link https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object} objects for the given application.
   */
  appRoleConnectionMeta: async (params) =>
    attemptHandler({
      method: 'get',
      path: `applications/${params.application_id}/role-connections/metadata`
    }), // End of Get Application Role Connection Metadata Records

  /**
   * @summary
   * ### [Update Application Role Connection Metadata Records]{@link https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records}
   * @example
   * await params.api.discord.commands.updateAppRoleConnectionMeta({
   *   application_id: '0000000000000'
   * });
   * @memberof module:commands#
   * @function updateAppRoleConnectionMeta
   * @param {Object} params
   * @param {Snowflake} params.application_id
   * @returns {Promise<ApplicationRoleConnectionMetadata[]>} A list of updated [Application Role Connection Metadata]{@link https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object} objects for the given application.
   */
  updateAppRoleConnectionMeta: async (params) =>
    attemptHandler({
      method: 'put',
      path: `applications/${params.application_id}/role-connections/metadata`
    }) // End of Update Application Role Connection Metadata Records

};


/**
 * @ignore
 */
async function appObj() {
  return JSON.parse(
    (
      await https.get({
        url: encodeURI('discord.com'),
        path: encodeURI('/api/v10/oauth2/applications/@me'),
        headers: { Authorization: `Bot ${process.env.token}` }
      })
    ).body);
}