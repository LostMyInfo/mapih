const https = require(`../utils/https`);
const { userFlags, permissionNames } = require('../../enum');
/**
 * https://discord.com/developers/docs/resources/guild#guild-resource
 */
module.exports = {

  // Create Guild
  async create(params) {
    try {
      if (
        (attempt = await https.post({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds`),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${process.env.token}`,
          },
          body: JSON.stringify({
            name: params.name, // string	name of the guild (2-100 characters)
            icon: params.icon ?? null, // image data base64 128x128 image for the guild icon
            verification_level: params.verification_level ?? null, // integer	verification level
            default_message_notifications: params.default_message_notifications ?? null, // integer default message notification level
            explicit_content_filter: params.explicit_content_filter ?? null, // integer explicit content filter level
            roles: params.roles ?? null, // array of role objects new guild roles
            channels: params.channels ?? null, // array of partial channel objects	new guild's channels
            afk_channel_id: params.afk_channel_id ?? null, // snowflake	id for afk channel
            afk_timeout: params.afk_timeout ?? null, // integer afk timeout in seconds
            system_channel_id: params.system_channel_id ?? null, // snowflake the id of the channel where guild notices such as welcome messages and boost events are posted
            system_channel_flags: params.system_channel_flags ?? null, // integer system channel flags
          }),
        }))
      )
        return JSON.parse(attempt.body);
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // End Create Guild

  // Get Guild
  async getGuild(params) {
    try {
      if (
        (attempt = await https.get({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}`),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${process.env.token}`,
          },
          body: JSON.stringify({
            with_counts: params.with_counts ?? null,
          }),
        }))
      )
        return JSON.parse(attempt.body);
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // End Get Guild

  // Guild Preview
  async previewGuild(params) {
    try {
      if (
        (attempt = await https.get({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}/preview`),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${process.env.token}`,
          },
          body: '',
        }))
      )
        return JSON.parse(attempt.body);
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // end of previewGuild

  // Modify Guild
  async modifyGuild(params) {
    try {
      if (
        (attempt = await https.patch({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}`),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${process.env.token}`,
          },
          body: JSON.stringify({
            name: params.name ?? null, // string	guild name
            verification_level: params.verification_level ?? null, // ?integer	verification level
            default_message_notifications: params.default_message_notifications ?? null, // ?integer	default message notification level
            explicit_content_filter: params.explicit_content_filter ?? null, //	?integer	explicit content filter level
            afk_channel_id: params.afk_channel_id ?? null, //	?snowflake	id for afk channel
            afk_timeout: params.afk_timeout ?? null, //	integer	afk timeout in seconds
            icon: params.icon ?? null, //	?image data	base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has the ANIMATED_ICON feature)
            owner_id: params.owner_id ?? null, //	snowflake	user id to transfer guild ownership to (must be owner)
            splash: params.splash ?? null, //	?image data	base64 16:9 png/jpeg image for the guild splash (when the server has the INVITE_SPLASH feature)
            discovery_splash: params.discovery_splash ?? null, //	?image data	base64 16:9 png/jpeg image for the guild discovery splash (when the server has the DISCOVERABLE feature)
            banner: params.banner ?? null, //	?image data	base64 16:9 png/jpeg image for the guild banner (when the server has the BANNER feature; can be animated gif when the server has the ANIMATED_BANNER feature)
            system_channel_id: params.system_channel_id ?? null, //	?snowflake	the id of the channel where guild notices such as welcome messages and boost events are posted
            system_channel_flags: params.system_channel_flags ?? null, //	integer	system channel flags
            rules_channel_id: params.rules_channel_id ?? null, //	?snowflake	the id of the channel where Community guilds display rules and/or guidelines
            public_updates_channel_id: params.public_updates_channel_id ?? null, //	?snowflake	the id of the channel where admins and moderators of Community guilds receive notices from Discord
            preferred_locale: params.preferred_locale ?? null, //	?string	the preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US"
            features: params.features ?? null, //	array of guild feature strings	enabled guild features
            description: params.description ?? null, //	?string	the description for the guild
            premium_progress_bar_enabled: params.premium_progress_bar_enabled ?? null, //	boolean	whether the guild's boost progress bar should be enabled
          }),
        }))
      )
        return JSON.parse(attempt.body);
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // end of modifyGuild

  // Delete Guild
  async deleteGuild(params) {
    try {
      if (
        (attempt = await https.del({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}`),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${process.env.token}`,
          },
          body: '',
        }))
      )
        return JSON.parse(attempt.body);
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // end of deleteGuild

  // Get Guild Bans
  async getAllGuildBans(params) {
    try {
      if (
        (attempt = await https.get({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}/bans?limit=${params.limit ?? 20}`),
          headers: {
            'Authorization': `Bot ${process.env.token}`,
          },
          body: '',
        }))
      ) return JSON.parse(attempt.body);
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // End Get Guild Bans

  // Get Guild Ban
  async getGuildBan(params) {
    try {
      if (
        (attempt = await https.get({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}/bans/${user_id}`),
          headers: {
            'Authorization': `Bot ${process.env.token}`,
          },
          body: '',
        }))
      ) return JSON.parse(attempt.body);
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // End Get Guild Ban

  // Create Guild Ban
  async createGuildBan(params) {
    try {
      if (
        (attempt = await https.put({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}/bans/${params.user_id}`),
          headers: {
            'Authorization': `Bot ${process.env.token}`,
            'X-Audit-Log-Reason': params.reason ?? null,
          },
          body: JSON.stringify({
            delete_message_days: params.delete_message_days ?? null,
            //reason: params.reason ?? null,
          }),
        }))
      ) return attempt;
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // End Create Guild Ban

  // Remove Guild Ban
  async removeGuildBan(params) {
    try {
      if (
        (attempt = await https.del({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}/bans/${params.user_id}`),
          headers: {
            'Authorization': `Bot ${process.env.token}`,
            'X-Audit-Log-Reason': params.reason ?? null,
          },
          body: '',
        }))
      ) return attempt;
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // End Remove Guild Ban

  // Get Guild Roles
  async getGuildRoles(params) {
    try {
      if (
        (attempt = await https.get({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}/roles`),
          headers: {
            Authorization: `Bot ${process.env.token}`,
          },
          body: '',
        }))
      ) {
        let roles = JSON.parse(attempt.body);
        let flags = Object.entries(permissionNames);
        roles.forEach((role) => {
          if (role.permissions > 0) {
            role.permission_names = [];
            for (let p = 0; p < flags.length; p++) {
              if (role.permissions & flags[p][1]) {
                if (!role.permission_names.includes(flags[p][0]))
                  role.permission_names.push(flags[p][0]);
              }
            }
          } else role.permission_names = '';
        })
        return roles;
      }
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // End Get Guild Roles

};

// Guilds Channels
// https://discord.com/developers/docs/resources/guild#get-guild-channels
module.exports.channels = {

  // Get Guild Channels
  async getChannels(params) {
    try {
      if (
        (attempt = await https.get({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}/channels`),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${process.env.token}`,
          },
          body: JSON.stringify({
            with_counts: params.with_counts ?? null,
          }),
        }))
      )
        return JSON.parse(attempt.body);
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // Get Guild Channels

  // Create Guild Channel
  async createChannel(params) {
    try {
      if (
        (attempt = await https.post({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}/channels`),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${process.env.token}`,
          },
          body: JSON.stringify({
            name: params.name,
            type: params.type,
            topic: params.topic ?? null,
            position: params.position ?? null,
            permission_overwrites: params.permission_overwrites ?? null,
            parent_id: params.parent_id ?? null,
            nsfw: params.nsfw ?? null,
          }),
        }))
      )
        return JSON.parse(attempt.body);
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // end createChannel

  // Modify Channel Position
  async modifyChannelPosition(params) {
    try {
      if (
        (attempt = await https.patch({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}/channels`),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${process.env.token}`,
          },
          body: JSON.stringify({
            id: params.id, // snowflake	channel id
            position: params.position, // ?integer	sorting position of the channel
            lock_permissions: params.lock_permissions ?? null, // ?boolean	syncs the permission overwrites with the new parent, if moving to a new category
            parent_id: params.parent_id ?? null, // ?snowflake the new parent ID for the channel that is moved
          }),
        }))
      )
        return JSON.parse(attempt.body);
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // end modifyChannelPosition

  // List Active Threads
  async listActiveThreads(params) {
    try {
      if (
        (attempt = await https.get({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}/threads/active`),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${process.env.token}`,
          },
          body: '',
        }))
      )
        return JSON.parse(attempt.body);
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // end listActiveThreads

}; // end of guilds.channels


// Guilds Members
// https://discord.com/developers/docs/resources/guild#get-guild-member
module.exports.members = {

  // Get Guild Members
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
  async getAllMembers(params) {
    try {
      if (
        (attempt = await https.get({
          url: encodeURI('discord.com'),
          path: encodeURI(
            `/api/guilds/${params.guild_id}/members?limit=${params.limit ?? null}`
          ),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${process.env.token}`,
          },
          body: '',
        }))
      ) {
        const payload = JSON.parse(attempt.body);

        let flags = Object.entries(userFlags);

        payload.forEach(member => {
          let badges = [];
          if (member.user.public_flags) {
            for (let a = 0; a < flags.length; a++) {
              if (member.user.public_flags & flags[a][1]) {
                badges.push(flags[a][0]); // add the flag to the badges array
              }
            }
          }
          member.user.badges = badges;
        })
        return payload;
      }
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // end get_members

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
  // Get Guild Member by user_id
  async getMember(params) {
    try {
      if (
        (attempt = await https.get({
          url: encodeURI('discord.com'),
          path: encodeURI(
            `/api/guilds/${params.guild_id}/members/${params.user_id}`
          ),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${process.env.token}`,
          },
          body: '',
        }))
      ) {
        const payload = JSON.parse(attempt.body);
        let badges = [];
        let flags = Object.entries(userFlags);
        if (payload.user.public_flags) {
          for (let a = 0; a < flags.length; a++) {
            if (payload.user.public_flags & flags[a][1]) {
              badges.push(flags[a][0]); // add the flag to the badges array
            }
          }
        }
        payload.user.badges = badges;
        return payload;
      }
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // end get_member

  // Remove Guild Member
  async removeGuildMember(params) {
    try {
      console.log(params);
      if (
        (attempt = await https.del({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}/members/${params.user_id}`),
          headers: {
            'Authorization': `Bot ${process.env.token}`,
            'X-Audit-Log-Reason': params.reason ?? null,
          },
          body: '',
        }))
      ) return attempt;
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // End Remove Guild Member

  // Modify Guild Member
  async modifyGuildMember(params) {
    try {
      let seconds = new Date().getSeconds() + 1;
      let timeOUT = new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2) + "T" + new Date().getHours() + ":" + ("0" + (new Date().getMinutes() + 1)).slice(-2) + ":" + ("0" + (seconds + params.communication_disabled_until_seconds)).slice(-2)
      console.log('timeOUT', timeOUT);
      console.log('seconds', seconds + 6);
      if (
        (attempt = await https.patch({
          url: encodeURI('discord.com'),
          path: encodeURI(`/api/guilds/${params.guild_id}/members/${params.user_id}`),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${process.env.token}`,
            'X-Audit-Log-Reason': params.reason ?? null,
          },
          body: JSON.stringify({
            nick: params.nick ?? null,
            role: params.role ?? null,
            mute: params.mute ?? null,
            deaf: params.deaf ?? null,
            channel_id: params.channel_id ?? null,
            communication_disabled_until: timeOUT//params.communication_disabled_until
          })
        }))
      ) return attempt;
      else return false;
    } catch (e) {
      console.log(e);
    }
  }, // End Modify Guild Member

}; // end of guilds.members
