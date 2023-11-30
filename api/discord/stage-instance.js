// @ts-check
'use-strict';

// Stage Instance
// https://discord.com/developers/docs/resources/stage-instance#stage-instance-resource

const { attemptHandler } = require('../resources/functions');

/**
 * All Discord API endpoints relating to Stage Instance functions.
 * 
 * __**Below are some definitions related to stages:**__
 * 
 * **`Liveness:`**
 * - A Stage channel is considered *live* when there is an associated stage instance. Conversely, a Stage channel is *not live* when there is no associated stage instance.
 * 
 * **`Speakers:`**
 * - A participant of a Stage channel is a *speaker* when their [voice state]{@link https://discord.com/developers/docs/resources/voice#voice-state-object} is not `suppressed`, and has no `request_to_speak_timestamp`.
 * 
 * **`Moderators:`**
 * - A member of the guild is a moderator of a Stage channel if they have all of the following [permissions]{@link https://discord.com/developers/docs/topics/permissions#permissions}:
 *   - `MANAGE_CHANNELS`
 *   - `MUTE_MEMBERS`
 *   - `MOVE_MEMBERS`
 * 
 * **`Topic:`**
 * - This is the blurb that gets shown below the channel's name, among other places.
 * 
 * **`Public:`**
 * - A Stage instance is public when it has a `privacy_level` of `PUBLIC`. While a guild has a public Stage instance:
 *   - The guild will be lurkable
 *   - Lurkers may join any Stage channel with a public Stage instance
 *   - Users in the Stage can have the Stage show in their [activities]{@link https://discord.com/developers/docs/topics/gateway-events#presence}
 *   - [Invites]{@link https://discord.com/developers/docs/resources/invite#invite-object} to the Stage channel will have the `stage_instance` field
 * 
 * **`Auto Closing:`**
 * - When a Stage channel has no speakers for a certain period of time (on the order of minutes), the Stage instance will be automatically deleted
 *
 * @module stageInstance
 */
module.exports = {
  
  /**
   * @summary
   * ### [Get Stage Instance]{@link https://discord.com/developers/docs/resources/stage-instance#get-stage-instance}
   * @example
   * await api.discord.stageInstance.retrieve({
   *   channel_id: '0000000000'
   * });
   * @memberof module:stageInstance#
   * @function retrieve
   * @param {object} params
   * @param {Snowflake} params.channel_id
   * @returns {Promise<StageInstance>} The [Stage Instance]{@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object} object for the given channel ID
   */
  retrieve: async (params) =>
    attemptHandler({
      method: 'get',
      endpoint: `stage-instances/${params.channel_id}`
    }), // End of Get Stage Instance

  /**
   * @summary
   * ### [Create Stage Instance]{@link https://discord.com/developers/docs/resources/stage-instance#create-stage-instance}
   * @example
   * await api.discord.stageInstance.create({
   *   channel_id: '0000000000',
   *   topic: 'My super cool stage',
   *   privacy_level: 2,
   *   send_start_notification: true
   * });
   * @memberof module:stageInstance#
   * @function create
   * @param {object} params
   * @param {Snowflake} params.channel_id
   * @param {string} params.topic - The topic of the Stage instance (1-120 characters)
   * @param {StagePrivacyLevel} [params.privacy_level=2] - The [Privacy Level]{@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level} of the Stage instance (default `GUILD_ONLY`)
   * @param {boolean} [params.send_start_notification] - Notify `@everyone` that a Stage instance has started
   * @returns {Promise<StageInstance>} [Stage Instance]{@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object} object for the given channel ID
   */
  create: async (params) =>
    attemptHandler({
      method: 'post',
      endpoint: 'stage-instances',
      body: {
        channel_id: params.channel_id,
        topic: params.topic,
        privacy_level: params.privacy_level ?? 2,
        send_start_notification: params.send_start_notification || false
      }
    }), // End of Create Stage Instance

  /**
   * @summary
   * ### [Modify Stage Instance]{@link https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance}
   * @example
   * await api.discord.stageInstance.update({
   *   channel_id: '0000000000',
   *   topic: 'My new stage name',
   *   privacy_level: 1
   * });
   * @memberof module:stageInstance#
   * @function update
   * @param {object} params
   * @param {Snowflake} params.channel_id
   * @param {string} [params.topic] - The topic of the Stage instance (1-120 characters)
   * @param {StagePrivacyLevel} [params.privacy_level=2] - The [Privacy Level]{@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level} of the Stage instance (default `GUILD_ONLY`)
   * @returns {Promise<StageInstance>} The updated [Stage Instance]{@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object} object for the given channel ID
   */
  update: async (params) =>
    attemptHandler({
      method: 'patch',
      endpoint: `stage-instances/${params.channel_id}`,
      body: params
    }), // End of Modify Stage Instance

  /**
   * @summary
   * ### [Delete Stage Instance]{@link https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance}
   * @example
   * await api.discord.stageInstance.destroy({
   *   channel_id: '0000000000'
   * });
   * @memberof module:stageInstance#
   * @function destroy
   * @param {object} params
   * @param {Snowflake} params.channel_id
   * @returns {Promise<{statusCode: string, message: string}>} `204 No Content`
   */
  destroy: async (params) =>
    attemptHandler({
      method: 'del',
      endpoint: `stage-instances/${params.channel_id}`,
      body: {}
    })

};