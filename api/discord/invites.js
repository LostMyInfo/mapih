// @ts-check
'use-strict';

const { attemptHandler, extendPayload } = require('../resources/functions');

// Invites
// https://discord.com/developers/docs/resources/invite#invite-resource

/**
 * @file All Discord API endpoints relating to Invite functions
 * @module invites
 */
module.exports = {
  
  /**
   * @summary
   * ### [Get Invite]{@link https://discord.com/developers/docs/resources/invite#get-invite}
   * @example
   * await api.discord.invites.retrieve({
   *   invite_code: '0vCdhLbwjZZTWZLD',
   *   with_counts: true,
   *   with_expiration: true
   * });
   * @memberof module:invites#
   * @function retrieve
   * @param {Object} params
   * @param {string} params.invite_code
   * @param {boolean} [params.with_counts] - Whether the invite should contain approximate member counts
   * @param {boolean} [params.with_expiration] - Whether the invite should contain the expiration date
   * @param {Snowflake} [params.guild_scheduled_event_id] - The guild scheduled event to include with the invite
   * @returns {Promise<ExtendedInvite>} An [Invite]{@link https://discord.com/developers/docs/resources/invite#invite-object} object for the given code
   */
  retrieve: async (params) => {
    let path = `invites/${params.invite_code}?`;
    path += `${params.with_counts ? `&with_counts=${params.with_counts}` : ''}`;
    path += `${params.with_expiration ? `&with_expiration=${params.with_expiration}` : ''}`;
    path += `${params.guild_scheduled_event_id ? `&guild_scheduled_event_id=${params.guild_scheduled_event_id}` : ''}`;
    
    const attempt = await attemptHandler({
      method: 'get',
      path
    });

    return extendPayload(attempt);
  },

  /**
   * @summary
   * ### [Delete Invite]{@link https://discord.com/developers/docs/resources/invite#delete-invite}
   * @example
   * await api.discord.invites.revoke({
   *   invite_code: '0vCdhLbwjZZTWZLD'
   * });
   * @memberof module:invites#
   * @function revoke
   * @param {Object} params
   * @param {string} params.invite_code
   * @returns {Promise<ExtendedInvite>} An [Invite]{@link https://discord.com/developers/docs/resources/invite#invite-object} object for the given code
   */
  revoke: async (params) => {
    const attempt = await attemptHandler({
      method: 'del',
      path: `invites/${params.invite_code}`
    });
    return extendPayload(attempt);
  }
};