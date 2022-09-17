const https = require(`../utils/https`);
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

const permissionNames = {
  CREATE_INSTANT_INVITE: (1 << 0),//	Allows creation of instant invites	T, V, S
  KICK_MEMBERS: (1 << 1),//	Allows kicking members	
  BAN_MEMBERS: (1 << 2),//	Allows banning members	
  ADMINISTRATOR: (1 << 3),//	Allows all permissions and bypasses channel permission overwrites	
  MANAGE_CHANNELS: (1 << 4),//	Allows management and editing of channels	T, V, S
  MANAGE_GUILD: (1 << 5),//	Allows management and editing of the guild	
  ADD_REACTIONS: (1 << 6),//	Allows for the addition of reactions to messages	T, V
  VIEW_AUDIT_LOG: (1 << 7),//	Allows for viewing of audit logs	
  PRIORITY_SPEAKER: (1 << 8),//	Allows for using priority speaker in a voice channel	V
  STREAM: (1 << 9),//	Allows the user to go live	V
  VIEW_CHANNEL: (1 << 10),//	Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels	T, V, S
  SEND_MESSAGES: (1 << 11),//	Allows for sending messages in a channel and creating threads in a forum (does not allow sending messages in threads)	T, V
  SEND_TTS_MESSAGES: (1 << 12),//	Allows for sending of /tts messages	T, V
  MANAGE_MESSAGES: (1 << 13),//	Allows for deletion of other users messages	T, V
  EMBED_LINKS: (1 << 14),//	Links sent by users with this permission will be auto-embedded	T, V
  ATTACH_FILES: (1 << 15),//	Allows for uploading images and files	T, V
  READ_MESSAGE_HISTORY: (1 << 16),//	Allows for reading of message history	T, V
  MENTION_EVERYONE: (1 << 17),//	Allows for using the @everyone tag to notify all users in a channel, and the @here tag to notify all online users in a channel	T, V, S
  USE_EXTERNAL_EMOJIS: (1 << 18),//	Allows the usage of custom emojis from other servers	T, V
  VIEW_GUILD_INSIGHTS: (1 << 19),//	Allows for viewing guild insights	
  CONNECT: (1 << 20),//	Allows for joining of a voice channel	V, S
  SPEAK: (1 << 21),//	Allows for speaking in a voice channel	V
  MUTE_MEMBERS: (1 << 22),//	Allows for muting members in a voice channel	V, S
  DEAFEN_MEMBERS: (1 << 23),//	Allows for deafening of members in a voice channel	V, S
  MOVE_MEMBERS: (1 << 24),//	Allows for moving of members between voice channels	V, S
  USE_VAD: (1 << 25),//	Allows for using voice-activity-detection in a voice channel	V
  CHANGE_NICKNAME: (1 << 26),//	Allows for modification of own nickname	
  MANAGE_NICKNAMES: (1 << 27),//	Allows for modification of other users nicknames	
  MANAGE_ROLES: (1 << 28),//	Allows management and editing of roles	T, V, S
  MANAGE_WEBHOOKS: (1 << 29),//	Allows management and editing of webhooks	T, V
  MANAGE_EMOJIS_AND_STICKERS: (1 << 30),//	Allows management and editing of emojis and stickers	
  USE_APPLICATION_COMMANDS: (1 << 31),//	Allows members to use application commands, including slash commands and context menu commands.	T, V
  REQUEST_TO_SPEAK: (1 << 32),//	Allows for requesting to speak in stage channels. (This permission is under active development and may be changed or removed.)	S
  MANAGE_EVENTS: (1 << 33),//	Allows for creating, editing, and deleting scheduled events	V, S
  MANAGE_THREADS: (1 << 34),//	Allows for deleting and archiving threads, and viewing all private threads	T
  CREATE_PUBLIC_THREADS: (1 << 35),//	Allows for creating public and announcement threads	T
  CREATE_PRIVATE_THREADS: (1 << 36),//	Allows for creating private threads	T
  USE_EXTERNAL_STICKERS: (1 << 37),//	Allows the usage of custom stickers from other servers	T, V
  SEND_MESSAGES_IN_THREADS: (1 << 38),//	Allows for sending messages in threads	T
  USE_EMBEDDED_ACTIVITIES: (1 << 39),//	Allows for using Activities (applications with the EMBEDDED flag) in a voice channel	V
  MODERATE_MEMBERS: (1 << 40),//	Allows for timing out users to prevent them from sending or reacting to messages in chat and threads, and from speaking in voice and stage channels	
};

const userFlags = {
  "Discord Employee": 1 << 0, //	STAFF	
  "Partnered Server Owner": 1 << 1, //	PARTNER	
  "HypeSquad Events Member": 1 << 2, //	HYPESQUAD	
  "Bug Hunter Level 1": 1 << 3, //	BUG_HUNTER_LEVEL_1
  "House Bravery Member": 1 << 6, //	HYPESQUAD_ONLINE_HOUSE_1
  "House Brilliance Member": 1 << 7, //	HYPESQUAD_ONLINE_HOUSE_2
  "House Balance Member": 1 << 8, //	HYPESQUAD_ONLINE_HOUSE_3
  "Early Nitro Supporter": 1 << 9, //	PREMIUM_EARLY_SUPPORTER
  "User is a team": 1 << 10, //	TEAM_PSEUDO_USER
  "Bug Hunter Level 2": 1 << 14, //	BUG_HUNTER_LEVEL_2
  "Verified Bot": 1 << 16, //	VERIFIED_BOT
  "Early Verified Bot Developer": 1 << 17, //	VERIFIED_DEVELOPER
  "Discord Certified Moderator": 1 << 18, //	CERTIFIED_MODERATOR
  "Bot uses only HTTP interactions and is shown in the online member list": 1 << 19, //	BOT_HTTP_INTERACTIONS
};
