// @ts-check
'use strict';

// Auto Moderation
// https://discord.com/developers/docs/resources/auto-moderation#auto-moderation

const { attemptHandler } = require('../resources/functions');

/**
 * @file
 * Auto Moderation is a feature which allows each guild to set up rules that trigger based on some criteria. For example, a rule can trigger whenever a message contains a specific keyword.
 * Rules can be configured to automatically execute actions whenever they trigger. For example, if a user tries to send a message which contains a certain keyword, a rule can trigger and block the message before it is sent.
 * @module automod
 */
module.exports = {
  
  /**
   * @summary
   * ### [Get Auto Moderation Rule]{@link https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule}
   * @example
   * await api.discord.automod.retrieveRule({
   *   guild_id: '0000000000',
   *   auto_moderation_rule_id: '00000'
   * });
   * @function retrieveRule
   * @memberof module:automod#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {Snowflake} params.auto_moderation_rule_id
   * @returns {Promise<AutoModRule>} [Auto Moderation Rule]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object} object
   */
  retrieveRule: async (params) =>
    attemptHandler({
      method: 'get',
      endpoint: `guilds/${params.guild_id}/auto-moderation/rules/${params.auto_moderation_rule_id}`
    }), // End of Get Auto Moderation Rule

  /**
   * @summary
   * ### [List Auto Moderation Rules for Guild]{@link https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild}
   * @example
   * await api.discord.automod.getAllRules({
   *   guild_id: '0000000000'
   * });
   * @function getAllRules
   * @memberof module:automod#
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @returns {Promise<AutoModRule[]>} List of [Auto Moderation Rule]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object} objects for the given guild
   */
  getAllRules: async (params) =>
    attemptHandler({
      method: 'get',
      endpoint: `guilds/${params.guild_id}/auto-moderation/rules`
    }), // End of List Auto Moderation Rules for Guild

  /**
   * @summary
   * ### [Create Auto Moderation Rule]{@link https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule}
   * @example
   * await api.discord.automod.createRule({
   *   guild_id: '0000000000',
   *   name: 'EricsAutoModRule',
   *   event_type: 1 // MESSAGE_SEND
   *   trigger_type: 3 // SPAM
   *   actions: [{
   *     type: 2, // SEND_ALERT_MESSAGE
   *     metadata: { channel_id: '0000000000' }
   *   }],
   *   enabled: true,
   *   exempt_roles: ['0000000000'],
   *   exempt_channels: ['0000000000']
   * });
   * @function createRule
   * @memberof module:automod#
   * @fires automod#rule_create
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {string} params.name
   * @param {AutoModEventType} params.event_type - The [Event Type]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types}
   * @param {AutoModTriggerType} params.trigger_type - The [Trigger Type]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types}
   * @param {AutoModTriggerMetadata} [params.trigger_metadata] - The [Trigger Metadata]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata}
   * @param {AutoModAction[]} params.actions - The actions which will execute when the rule is triggered
   * @param {boolean} [params.enabled=false] - Whether the rule is enabled (False by default)
   * @param {Snowflake[]} [params.exempt_roles] - The role ids that should not be affected by the rule (Maximum of 20)
   * @param {Snowflake[]} [params.exempt_channels] - The channel ids that should not be affected by the rule (Maximum of 50)
   * @returns {Promise<AutoModRule>} [Auto Moderation Rule]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object} on success
   */
  createRule: async (params) =>
    attemptHandler({
      method: 'post',
      endpoint: `guilds/${params.guild_id}/auto-moderation/rules`,
      body: {
        name: params.name,
        event_type: params.event_type,
        trigger_type: params.trigger_type,
        trigger_metadata: params.trigger_metadata ?? null,
        actions: params.actions,
        enabled: params.enabled || false,
        exempt_roles: params.exempt_roles ?? [],
        exempt_channels: params.exempt_channels ?? []
      }
    }), // End of Create Auto Moderation Rule

  /**
   * @summary
   * ### [Modify Auto Moderation Rule]{@link https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule}
   * @example
   * await api.discord.automod.modifyRule({
   *   guild_id: '0000000000',
   *   auto_moderation_rule_id: '00000',
   *   name: 'EricsAutoModRule',
   *   event_type: 1 // MESSAGE_SEND
   *   actions: [{
   *     type: 1, // BLOCK_MESSAGE
   *     metadata: { custom_message: 'GO AWAY' }
   *   }],
   *   trigger_metadata: {
   *     keyword_filter: ['cat*', '*dog'],
   *     regex_patterns: ['^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$']
   *   },
   *   enabled: true
   * });
   * @function modifyRule
   * @memberof module:automod#
   * @fires automod#rule_update
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {Snowflake} params.auto_moderation_rule_id
   * @param {string} [params.name]
   * @param {AutoModEventType} [params.event_type] - The [event type]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types}
   * @param {AutoModTriggerMetadata} [params.trigger_metadata] - The [trigger metadata]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata}
   * @param {AutoModAction[]} params.actions - The actions which will execute when the rule is triggered
   * @param {boolean} [params.enabled=false] - Whether the rule is enabled (False by default)
   * @param {Snowflake[]} [params.exempt_roles] - The role ids that should not be affected by the rule (Maximum of 20)
   * @param {Snowflake[]} [params.exempt_channels] - The channel ids that should not be affected by the rule (Maximum of 50)
   * @returns {Promise<AutoModRule>} [Auto Moderation Rule]{@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object}
   */
  modifyRule: async (params) =>
    attemptHandler({
      method: 'patch',
      endpoint: `guilds/${params.guild_id}/auto-moderation/rules/${params.auto_moderation_rule_id}`,
      body: params
    }), // End of Modify Auto Moderation Rule

  /**
   * @summary
   * ### [Delete Auto Moderation Rule]{@link https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule}
   * @example
   * await api.discord.automod.destroyRule({
   *   guild_id: '0000000000',
   *   auto_moderation_rule_id: '00000'
   * });
   * @function destroyRule
   * @memberof module:automod#
   * @fires automod#rule_delete
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {Snowflake} params.auto_moderation_rule_id
   * @returns {Promise<{statusCode: number, message: string}>} `204 No Content`
   */
  destroyRule: async (params) =>
    attemptHandler({
      method: 'del',
      endpoint: `guilds/${params.guild_id}/auto-moderation/rules/${params.auto_moderation_rule_id}`
    }) // End of Delete Auto Moderation Rule

};