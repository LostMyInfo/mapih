// @ts-check
'use strict';

const { AuditLogEvents, channelType } = require('../../enum');
const { attemptHandler, retrieveDate, getBadges } = require('../resources/functions');

/**
 * @file API endpoint for retrieving Guild Audit Logs
 * @module auditlog
 */

module.exports = {

  /**
   * @summary
   * ### [Get Guild Audit Log]{@link https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log}
   * - When using `before`, the list is ordered by the audit log entry ID descending (newer entries first).
   * - If `after` is used, the list is reversed and appears in ascending order (older entries first).
   * - Omitting both `before` and `after` defaults to `before` the current timestamp and will show the most recent entries in descending order by ID, the opposite can be achieved using `after=0` (showing oldest entries).
   * @example
   * await params.api.discord.auditlog.retrieve({
   *   guild_id: '0000000000',
   *   user_id: '0000000000',
   *   limit: 10 // default 50
   * });
   * @memberof module:auditlog#
   * @function retrieve
   * @param {Object} params
   * @param {Snowflake} params.guild_id
   * @param {number} [params.limit=50] - Maximum number of entries (between 1-100) to return
   * @param {AuditLogEventType} [params.action_type] - Entries for a specific [audit log event]{@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events}
   * @param {Snowflake} [params.user_id] - Entries from a specific user ID
   * @param {Snowflake} [params.before] - Entries with ID less than a specific audit log entry ID
   * @param {Snowflake} [params.after] - Entries with ID greater than a specific audit log entry ID
   * @returns {Promise<AuditLog>} [Audit Log]{@link https://discord.com/developers/docs/resources/audit-log#audit-log-object} object
   */
  retrieve: async (params) => {
    let path = `guilds/${params.guild_id}/audit-logs?`;
    path += `${params.limit ? `&limit=${params.limit}` : ''}`;
    path += `${params.action_type ? `&action_type=${params.action_type}` : ''}`;
    path += `${params.user_id ? `&user_id=${params.user_id}` : ''}`;
    path += `${params.before ? `&before=${params.before}` : ''}`;
    path += `${params.after ? `&after=${params.after}` : ''}`;
      
    const attempt = await attemptHandler({
      method: 'get',
      path
    });
    if (attempt.audit_log_entries.length) {
      for (const log of attempt.audit_log_entries) {
        log.action_name = (AuditLogEvents[log.action_type])?.name;
      }
    }
    if (attempt.threads.length) {
      for (const thread of attempt.threads) {
        thread.trueType = channelType[thread.type];
      }
    }
    if (attempt.users.length) {
      for (const user of attempt.users) {
        user.created_at = retrieveDate(user.id, true);
        user.badges = getBadges(user.public_flags);
      }
    }
    return attempt;
  } // End of Get Guild Audit Log
    
}; 