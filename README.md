<!--
![temp logo!](/onsocketLogo.png "temp logo")

![npm](https://img.shields.io/npm/dt/mapih)

![npm](https://img.shields.io/npm/dt/mapih?logo=npm&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmapih)

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
-->

[![view on npm](https://badgen.net/npm/v/mapih)](https://www.npmjs.org/package/mapih)
[![npm module downloads](https://badgen.net/npm/dt/mapih)](https://www.npmjs.org/package/mapih)
# Mapih
#### Comprehensive collection of Discord and Slack (in progress) API endpoint handlers  
---
## Authentication

Choose one of the following methods to authenticate:

#### Option 1: Using Environment Variables

Add a variable named `token` to your `.env` file and set it to your bot's token for Discord (`slackToken` for Slack).

#### Option 2: Using Initialization Function

```javascript
const mapih = require('mapih');

mapih.initialize({
  discord: 'bot_token_here',
  slack: 'slack_auth_token_here' // optional
});
```
---
## Basic usage
```javascript
(async() => {

  await mapih.discord.channels.messages.create({
    channel_id: '774133713733812275',
    content: 'hello'
  });

})();
```
---
## Table of Contents
<!--
- [Applications](#applications)
  - [getMe](#applications-getMe)
  - [updateMe](#applications-updateMe)
  - [appRoleConnectionMeta](#applications-appRoleConnectionMeta)
  - [updateAppRoleConnectionMeta](#applications-updateAppRoleConnectionMeta)
  - <details>
    <summary>commands</summary>

    - [retrieve](#applications-commands-retrieve)
    - [getAll](#applications-commands-getAll)
    - [create](#applications-commands-create)
    - [modify](#applications-commands-modify)
    - [destroy](#applications-commands-destroy)
    - [bulkOverwrite](#applications-commands-bulkOverwrite)
    - [retrievePermissions](#applications-commands-retrievePermissions)
    - [getAllPermissions](#applications-commands-getAllPermissions)
    - [modifyPermissions](#applications-commands-modifyPermissions)
  </details>

  - <details>
    <summary>entitlements</summary>

    - [getAll](#applications-entitlements-getAll)
    - [create](#applications-entitlements-create)
    - [destroy](#applications-entitlements-destroy)
  </details>

  - <details>
    <summary>skus</summary>

    - [getAll](#applications-entitlements-getAll)
    - [create](#applications-entitlements-create)
    - [destroy](#applications-entitlements-destroy)
  </details>
-->

<!------------------>
<!-- APPLICATIONS -->
<!------------------>
<details>
  <summary>Applications</summary>
  
  &nbsp; &nbsp; • [getMe](#applications-getMe)  
  &nbsp; &nbsp; • [updateMe](#applications-updateMe)  
  &nbsp; &nbsp; • [appRoleConnectionMeta](#applications-appRoleConnectionMeta)  
  &nbsp; &nbsp; • [updateAppRoleConnectionMeta](#applications-updateAppRoleConnectionMeta)

  <details>
    <summary>Commands</summary>

  &nbsp; &nbsp; • [retrieve](#applications-commands-retrieve)  
  &nbsp; &nbsp; • [getAll](#applications-commands-getAll)  
  &nbsp; &nbsp; • [create](#applications-commands-create)  
  &nbsp; &nbsp; • [modify](#applications-commands-modify)  
  &nbsp; &nbsp; • [destroy](#applications-commands-destroy)  
  &nbsp; &nbsp; • [bulkOverwrite](#applications-commands-bulkOverwrite)  
  &nbsp; &nbsp; • [retrievePermissions](#applications-commands-retrievePermissions)  
  &nbsp; &nbsp; • [getAllPermissions](#applications-commands-getAllPermissions)  
  &nbsp; &nbsp; • [modifyPermissions](#applications-commands-modifyPermissions)  
  </details>

  <details>
    <summary>Entitlements</summary>

  &nbsp; &nbsp; • [retrieve](#applications-entitlements-getAll)  
  &nbsp; &nbsp; • [getAll](#applications-entitlements-create)  
  &nbsp; &nbsp; • [create](#applications-entitlements-destroy)
  </details>

  <details>
    <summary>SKUs</summary>

  &nbsp; &nbsp; • [retrieve](#applications-skus-getAll)
  </details>

</details>

<!--------------->
<!-- AUDIT LOG -->
<!--------------->
<details>
  <summary>Audit Log</summary>
  
  &nbsp; &nbsp; • [retrieve](#auditlog-retrieve)
</details>

<!--------------------->
<!-- AUTO MODERATION -->
<!--------------------->
<details>
  <summary>Auto Moderation</summary>
  
  &nbsp; &nbsp; • [retrieveRule](#auto-moderation-retrieveRule)  
  &nbsp; &nbsp; • [getAllRules](#auto-moderation-getAllRules)  
  &nbsp; &nbsp; • [createRule](#auto-moderation-createRule)  
  &nbsp; &nbsp; • [updateRule](#auto-moderation-updateRule)  
  &nbsp; &nbsp; • [destroyRule](#auto-moderation-destroyRule)
</details>

<!-------------->
<!-- CHANNELS -->
<!-------------->
<details>
  <summary>Channels</summary>
  
  &nbsp; &nbsp; • [getMe](#applications-getMe)  
  &nbsp; &nbsp; • [updateMe](#applications-updateMe)  
  &nbsp; &nbsp; • [appRoleConnectionMeta](#applications-appRoleConnectionMeta)  
  &nbsp; &nbsp; • [updateAppRoleConnectionMeta](#applications-updateAppRoleConnectionMeta)

  <details>
    <summary>Messages</summary>

  &nbsp; &nbsp; • [retrieve](#applications-commands-retrieve)  
  &nbsp; &nbsp; • [getAll](#applications-commands-getAll)  
  &nbsp; &nbsp; • [create](#applications-commands-create)  
  &nbsp; &nbsp; • [modify](#applications-commands-modify)  
  &nbsp; &nbsp; • [destroy](#applications-commands-destroy)  
  &nbsp; &nbsp; • [bulkOverwrite](#applications-commands-bulkOverwrite)  
  &nbsp; &nbsp; • [retrievePermissions](#applications-commands-retrievePermissions)  
  &nbsp; &nbsp; • [getAllPermissions](#applications-commands-getAllPermissions)  
  &nbsp; &nbsp; • [modifyPermissions](#applications-commands-modifyPermissions)  
  </details>

  <details>
    <summary>Threads</summary>

  &nbsp; &nbsp; • [retrieve](#applications-entitlements-getAll)  
  &nbsp; &nbsp; • [getAll](#applications-entitlements-create)  
  &nbsp; &nbsp; • [create](#applications-entitlements-destroy)
  </details>

  <details>
    <summary>Reactions</summary>
    
  &nbsp; &nbsp; • [retrieve](#applications-skus-getAll)
  </details>

</details>
<!--
<details>
  <summary>Applications</summary>

  &nbsp; [getMe](#applications-getMe)  
  [updateMe](#applications-updateMe)  
  [appRoleConnectionMeta](#applications-appRoleConnectionMeta)  
  - [updateAppRoleConnectionMeta](#applications-updateAppRoleConnectionMeta)  
    <details>
    <summary>commands</summary>

    - [retrieve](#applications-commands-retrieve)  
    - [getAll](#applications-commands-getAll)
    - [create](#applications-commands-create)
    - [modify](#applications-commands-modify)
    - [destroy](#applications-commands-destroy)
    - [bulkOverwrite](#applications-commands-bulkOverwrite)
    - [retrievePermissions](#applications-commands-retrievePermissions)
    - [getAllPermissions](#applications-commands-getAllPermissions)
    - [modifyPermissions](#applications-commands-modifyPermissions)
  </details>

  - <details>
    <summary>commands</summary>

    - [retrieve](#applications-commands-retrieve)
    - [getAll](#applications-commands-getAll)
    - [create](#applications-commands-create)
    - [modify](#applications-commands-modify)
    - [destroy](#applications-commands-destroy)
    - [bulkOverwrite](#applications-commands-bulkOverwrite)
    - [retrievePermissions](#applications-commands-retrievePermissions)
    - [getAllPermissions](#applications-commands-getAllPermissions)
    - [modifyPermissions](#applications-commands-modifyPermissions)
  </details>
</details>
-->

### [Applications](#applications)
    • [getMe](#get-current-application)  
    • [getMe](#get-current-application)  


## Table of Contents
- [Applications](#applications)
  - [getMe](#get-current-application)
  - [updateMe](#edit-current-application)
  - [appRoleConnectionMeta](#get-application-role-connection-metadata-records)
  - [updateAppRoleConnectionMeta](#update-application-role-connection-metadata-records)
  - [commands](#applications-commands)
    - [retrieve](#applications-commands-retrieve)
    - [getAll](#applications-commands-getAll)
    - [create](#applications-commands-create)
    - [modify](#applications-commands-modify)
    - [destroy](#applications-commands-destroy)
    - [bulkOverwrite](#applications-commands-bulkOverwrite)
    - [retrievePermissions](#applications-commands-retrievePermissions)
    - [getAllPermissions](#applications-commands-getAllPermissions)
    - [modifyPermissions](#applications-commands-modifyPermissions)
  - [entitlements](#application-entitlements)
    - [getAll](#applications-entitlements-getAll)
    - [create](#applications-entitlements-create)
    - [destroy](#applications-entitlements-destroy)
  - [skus](#application-skus)
    - [getAll](#applications-skus-getAll)
- [Audit Log](#audit-log)
  - [retrieve](#auditlog-retrieve)
- [Auto Moderation](#auto-moderation)
  - [retrieveRule](#auto-moderation-retrieveRule)
  - [getAllRules](#auto-moderation-getAllRules)
  - [createRule](#auto-moderation-createRule)
  - [updateRule](#auto-moderation-updateRule)
  - [destroyRule](#auto-moderation-destroyRule)
- [Channels](#channel)
  - [retrieve](#channel-retrieve)
  - [modify](#channel-modify)
  - [destroy](#channel-destroy)
  - [editPermissions](#channel-editPermissions)
  - [deletePermission](#channel-deletePermission)
  - [getinvites](#channel-getinvites)
  - [inviteCreate](#channel-inviteCreate)
  - [typingCreate](#channel-typingCreate)
  - [followAnnouncementChannel](#channel-followAnnouncementChannel)
  - [groupDMadd](#channel-groupDMadd)
  - [groupDMremove](#channel-groupDMremove)
  - [messages](#channel-messages)
    - [retrieve](#channel-messages-retrieve)
    - [getAll](#channel-messages-getAll)
    - [create](#channel-messages-create)
    - [update](#channel-messages-update)
    - [destroy](#channel-messages-destroy)
    - [bulkDelete](#channel-messages-bulkDelete)
    - [crosspost](#channel-messages-crosspost)
    - [pin](#channel-messages-pin)
    - [unpin](#channel-messages-unpin)
    - [getPinned](#channel-messages-getPinned)
  - [threads](#channel-threads)
    - [forumThreadCreate](#channel-threads-forumThreadCreate)
    - [createFromMessage](#channel-threads-createFromMessage)
    - [createWithoutMessage](#channel-threads-createWithoutMessage)
    - [join](#channel-threads-join)
    - [leave](#channel-threads-leave)
    - [addMember](#channel-threads-addMember)
    - [removeMember](#channel-threads-removeMember)
    - [retrieveMember](#channel-threads-retrieveMember)
    - [getAllMembers](#channel-threads-getAllMembers)
    - [getAllPublicArchived](#channel-threads-getAllPublicArchived)
    - [getAllPrivateArchived](#channel-threads-getAllPrivateArchived)
    - [getAllJoinedPrivateArchived](#channel-threads-getAllJoinedPrivateArchived)
  - [reactions](#channel-reactions)
    - [create](#channel-reactions-create)
    - [deleteOwn](#channel-reactions-deleteOwn)
    - [deleteUser](#channel-reactions-deleteUser)
    - [deleteAll](#channel-reactions-deleteAll)
    - [deleteAllEmoji](#channel-reactions-deleteAllEmoji)
    - [getUsers](#channel-reactions-getUsers)
- [Guilds](#guild)
  - [create](#create-guild)
  - [update](#modify-guild)
  - [destroy](#delete-guild)
  - [retrieve](#get-guild)
  - [destroy](#delete-guild)
  - [getPreview](#get-guild-preview)
  - [retrieveBan](#get-guild-ban)
  - [getAllBans](#get-guild-bans)
  - [createBan](#create-guild-ban)
  - [destroyBan](#remove-guild-ban)
  - [getInvites](#get-guild-invites)
  - [modifyMFAlevel](#modify-guild-mfa-level)
  - [getPruneCount](#get-guild-prune-count)
  - [beginPrune](#begin-guild-prune)
  - [getVoiceRegions](#get-guild-voice-regions)
  - [getAllIntegrations](#get-guild-integrations)
  - [destroyIntegration](#delete-guild-integrations)
  - [retrieveWidget](#get-guild-widget)
  - [retrieveWidgetImage](#get-guild-widget-settings)
  - [retrieveWidgetSettings](#get-guild-widget-image)
  - [updateWidget](#modify-guild-widget)
  - [retrieveVanityURL](#get-guild-vanity-url)
  - [retrieveWelcomeScreen](#get-guild-welcome-screen)
  - [updateWelcomeScreen](#modify-guild-welcome-screen)
  - [retrieveOnboarding](#get-guild-onboarding)
  - [updateOnboarding](#modify-guild-onboarding)
  - [newMemberWelcome](#new-member-welcome)
  - [channels](#guild-channels)
    - [getAll](#get-guild-channels)
    - [create](#create-guild-channel)
    - [modifyPositions](#modify-guild-channel-positions)
  - [members](#guild-members)
    - [retrieve](#get-guild-member)
    - [getAll](#list-guild-members)
    - [search](#search-guild-members)
    - [remove](#remove-guild-member)
    - [update](#modify-guild-member)
    - [updateCurrent](#modify-current-member)
    - [addRole](#add-guild-member-role)
    - [removeRole](#remove-guild-member-role)
    - [getPermissionNames](#get-member-permission-names)
    - [timeout](#timeout-member)
  - [roles](#guild-roles)
    - [retrieve](#get-guild-role)
    - [getAll](#get-guild-roles)
    - [create](#create-guild-role)
    - [update](#modify-guild-role)
    - [destroy](#delete-guild-role)
    - [modifyPositions](#modify-guild-role-positions)
  - [emojis](#guild-emojis)
  - [stickers](#guild-stickers)
  - [events](#guild-events)
  - [templates](#guild-templates)
- [Interactions](#interactions)
  - [callback](#interaction-callbacks)
  - [followup](#interaction-followups)
- [Invites](#invites)
- [OAuth 2](#oauth2)
- [Stage Instances](#stage-instance)
- [Users](#users)
- [Webhooks](#webhooks)
- [Objects/Types](#objects-and-types)

---

# Guild
**All functions relating to Discord Guilds (servers)**

| Method                                                 | Description                                                      |
|--------------------------------------------------------|------------------------------------------------------------------|
| [`retrieve`](#get-guild)                               | Get information about a guild                                    |
| [`create`](#create-guild)                            | Create a new guild                                               |
| [`update`](#update-existing-guild)                     | Modify a guild's settings                                        |
| [`destroy`](#delete-guild)                           | Delete a guild                                                   |
| [`getPreview`](#get-guild-preview)                     | Get the guild's preview                                          |
| [`retrieveBan`](#get-guild-ban)                        | Get guild ban with given id                                      |
| [`getAllBans`](#get-guild-bans)                        | Get all guild bans                                               |
| [`createBan`](#create-guild-ban)                       | Create a new guild ban                                           |
| [`destroyBan`](#remove-guild-ban)                       | Delete a guild ban                                               |
| [`getInvites`](#get-guild-invites)                     | Get all guild invites                                            |
| [`modifyMFAlevel`](#modify-guild-mfa-level)            | Modify the guild's MFA level                                     |
| [`getPruneCount`](#get-guild-prune-count)              | Get number of members that would be removed in a prune operation |
| [`beginPrune`](#begin-guild-prune)                     | Begin a prune operation                                          |
| [`getVoiceRegions`](#get-guild-voice-regions)          | Get all voice regions for the guild                              |
| [`getAllIntegrations`](#get-guild-integrations)           | Get all guild integrations                                       |
| [`destroyIntegration`](#delete-guild-integrations)     | Delete a guild integration                                       |
| [`retrieveWidget`](#get-guild-widget)                  | Get the guild's widget                                           |
| [`retrieveWidgetSettings`](#get-guild-widget-settings) | Get the guild's widget settings                                  |
| [`retrieveWidgetImage`](#get-guild-widget-image)       | Get the guild's widget image                                     |
| [`updateWidget`](#modify-guild-widget)                 | Modify the guild's widget                                        |
| [`retrieveVanityURL`](#get-guild-vanity-url)           | Get the guild's vanity url                                       |
| [`retrieveWelcomeScreen`](#get-guild-welcome-screen)        | Get the guild's welcome screen                                   |
| [`updateWelcomeScreen`](#modify-guild-welcome-screen)  | Modify the guild's welcome screen                                |
| [`retrieveOnboarding`](#get-guild-onboarding)               | Get the guild's onboarding                                       |
| [`updateOnboarding`](#modify-guild-onboarding)         | Modify the guild's onboarding                                    |
| [`newMemberWelcome`](#new-member-welcome)              | * undocumented                                                   |

### [Get Guild](https://discord.com/developers/docs/resources/guild#get-guild)

#### Parameters
| Field        | Type      | Description                            |
|--------------|-----------|----------------------------------------|
| guild_id     | snowflake | the id of the guild                    |
| with_counts? | boolean   | Approcimate member and presence counts |

**Example:**
```javascript
await api.discord.guilds.retrieve({
  guild_id: '0000000000'
});
```

### [Create Guild](https://discord.com/developers/docs/resources/guild#create-guild)
***This endpoint can be used only by bots in less than 10 servers.***

#### Parameters
| Field                          | Type                                        | Description                                                          |
|--------------------------------|---------------------------------------------|----------------------------------------------------------------------|
| name                           | string                                      | Name of the guild (2-100 characters) |
| icon?                          | string/buffer                               | Guild icon (url to image or image buffer) |
| roles?                         | [Role](#role-object)[]                      | An array of role objects |
| channels?                      | [PartialChannel](#partial-channel-object)[] | An array of partial channel objects |
| verification_level?            | number                                      | The guild's [verification level](#verification-level) |
| default_message_notifications? | number                                      | Default [message notification level](#default-message-notification-level) |
| explicit_content_filter?       | number                                      | [Explicit content filter level](#explicit-content-filter) |
| afk_channel_id?                | snowflake                                   | ID for afk channel |
| afk_timeout?                   | number                                      | afk timeout in seconds, can be set to: 60, 300, 900, 1800, 3600 |
| system_channel_id?             | snowflake                                   | The id of the channel where guild notices such as welcome messages and boost events are posted |
| system_channel_flags?          | number                                      | [System channel flags](#system-channel-flags) |

**Example:**
```javascript
await api.discord.guilds.create({
  name: "Eric's Server",
  icon: 'https://imgurl.png', // or buffer
  default_message_notifications: 1, // ONLY_MENTIONS
  verification_level: 0, // NONE
  explicit_content_filter: 0, // DISABLED
  roles: [{
    name: 'Administrator',
    permissions: 1 << 3,
    hoist: 'true',
    mentionable: 'false'
  }],
  channels: [
    {
      name: 'my-category',
      type: 4, // GUILD_CATEGORY
      id: 1
    },
    {
      name: 'bot-testing',
      type: 0, // GUILD_TEXT
      id: 2,
      parent_id: 1 // 'my-category'
    }
  ]
});
```

### [Modify Guild](https://discord.com/developers/docs/resources/guild#modify-guild)

#### Parameters
| Field                         | Type       | Description |
|-------------------------------|------------|-------------|
| name                          | string     | Name of the guild (2-100 characters) |
| description                   | string     | |
| owner_id                      | snowflake  | User ID to transfer server ownership to |
| icon                          | url/buffer | An array of partial channel objects |
| splash                        | url/buffer | |
| discovery_splash              | url/buffer | |
| banner                        | url/buffer | |
| verification_level            | number     | The guild's [verification level](#guild-verification-level) |
| default_message_notifications | number     | Default [message notification level](#guild-default-message-notification-level) |
| explicit_content_filter       | number     | [Explicit content filter level](#guild-explicit-content-filter) |
| afk_channel_id                | snowflake  | ID for afk channel |
| afk_timeout                   | number     | afk timeout in seconds, can be set to: 60, 300, 900, 1800, 3600 |
| system_channel_id             | snowflake  | The id of the channel where guild notices such as welcome messages and boost events are posted |
| system_channel_flags          | number     | [System channel flags](#system-channel-flags) |
| rules_channel_id              | snowflake  | |
| system_updates_channel_id     | snowflake  | |
| premium_progress_bar_enabled  | number     | |

**Example:**
```javascript
await api.discord.guilds.update({
  name: "Eric's New Server",
  // ...
});
```

### [Delete Guild](https://discord.com/developers/docs/resources/guild#delete-guild)

#### Parameters
| Field    | Type      | Description          |
|----------|-----------|----------------------|
| guild_id | snowflake | the id of the guild |

**Example:**
```javascript
await api.discord.guilds.destroy({
  guild_id: '0000000000'
});
```

### [Get Guild Preview](https://discord.com/developers/docs/resources/guild#get-guild-preview)
**If the user is not in the guild, then the guild must be lurkable.**

#### Parameters
| Field    | Type      | Description          |
|----------|-----------|----------------------|
| guild_id | snowflake | the id of the guild |

**Example:**
```javascript
await api.discord.guilds.getPreview({
  guild_id: '0000000000'
});
```

### [Get Guild Ban](https://discord.com/developers/docs/resources/guild#get-guild-ban)
**Returns a ban object for the given user or a 404 not found if the ban cannot be found.**
**Requires the `BAN_MEMBERS` permission.**

#### Parameters
| Field    | Type      | Description                                |
|----------|-----------|--------------------------------------------|
| guild_id | snowflake | the id of the guild                       |
| user_id  | snowflake | The ID of the user the ban was created for |

**Example:**
```javascript
await api.discord.guilds.retrieveBan({
  guild_id: '0000000000',
  user_id: '0000000000'
});
```

### [Get Guild Bans](https://discord.com/developers/docs/resources/guild#get-guild-bans)

#### Parameters
| Field    | Type      | Description                                                   |
|----------|-----------|---------------------------------------------------------------|
| guild_id | snowflake | the id of the guild                                          |
| limit?   | number    | Number of users to return (up to maximum 1000) (default 1000) |
| before?  | snowflake | Consider only users before given user ID                      |
| after?   | snowflake | Consider only users after given user ID                       |

**Example:**
```javascript
await api.discord.guilds.getAllBans({
  guild_id: '0000000000',
  limit: 50,
  after: '0000000000'
});
```

### [Create Guild Ban](https://discord.com/developers/docs/resources/guild#create-guild-ban)
**Requires the `BAN_MEMBERS` permission.**

#### Parameters
| Field                   | Type      | Description                                                                                |
|-------------------------|-----------|--------------------------------------------------------------------------------------------|
| guild_id                | snowflake | the id of the guild                                                                       |
| user_id                 | snowflake | User ID of the user to ban                                                                 |
| delete_message_seconds? | snowflake | Number of seconds to delete the banned user's messages for, between 0 and 604800 (7 days). |
| reason?                 | string    | Reason for the ban |

**Example:**
```javascript
await api.discord.guilds.createBan({
  guild_id: '0000000000',
  user_id: '0000000000',
  delete_message_seconds: 604800,
  reason: 'not cool enough'
});
```

### [Remove Guild Ban](https://discord.com/developers/docs/resources/guild#remove-guild-ban)
**Requires the `BAN_MEMBERS` permission.**

#### Parameters
| Field    | Type      | Description                  |
|----------|-----------|------------------------------|
| guild_id | snowflake | the id of the guild         |
| user_id  | snowflake | User ID of the user to unban |
| reason?  | string    | Reason                       |

**Example:**
```javascript
await api.discord.guilds.destroyBan({
  guild_id: '0000000000',
  user_id: '0000000000',
  reason: 'ok I guess you\'re alright'
});
```

### [Modify Guild MFA Level](https://discord.com/developers/docs/resources/guild#modify-guild-mfa-level)
**Requires guild ownership.**

#### Parameters
| Field    | Type      | Description             |
|----------|-----------|-------------------------|
| guild_id | snowflake | the id of the guild    |
| level    | number    | [MFA level](#mfa-level) |

**Example:**
```javascript
await api.discord.guilds.modifyMFAlevel({
  guild_id: '0000000000',
  level: 0
});
```

### [Get Guild Prune Count](https://discord.com/developers/docs/resources/guild#get-guild-prune-count)
**By default, prune will not remove users with roles.**  
**You can optionally include specific roles in your prune by providing the `include_roles` parameter.**  
**Any inactive user that has a subset of the provided role(s) will be counted in the prune and users with additional roles will not.** 

#### Parameters
| Field          | Type      | Description                                          |
|--------------- |-----------|------------------------------------------------------|
| guild_id       | snowflake | the id of the guild                                 |
| days           | number    | Number of days to count prune for (1-30) (Default 7) |
| include_roles? | string[]  | An array of role IDs to include                      |

**Example:**
```javascript
await api.discord.guilds.getPruneCount({
  guild_id: '0000000000',
  days: 3,
  include_roles: [
    '0000000000'
  ]
});
```

### [Begin Guild Prune](https://discord.com/developers/docs/resources/guild#begin-guild-prune)
**For large guilds it's recommended to set the `compute_prune_count` option to `false`, forcing `pruned` to `null`.**  
**By default, prune will not remove users with roles.**  
**You can optionally include specific roles in your prune by providing the `include_roles` parameter.**  
**Any inactive user that has a subset of the provided role(s) will be counted in the prune and users with additional roles will not.**

#### Parameters
| Field               | Type        | Description                                                               |
|---------------------|-------------|---------------------------------------------------------------------------|
| guild_id            | snowflake   | the id of the guild                                                      |
| days                | number      | Number of days to count prune for (1-30) (default 7)                      |
| compute_prune_count | boolean     | Whether `pruned` is returned, discouraged for large guilds (default true) |
| include_roles?      | snowflake[] | An array of role IDs to include                                           |
| reason?             | string      | Reason                                                                    |

**Example:**
```javascript
await api.discord.guilds.beginPrune({
  guild_id: '0000000000',
  days: 3,
  compute_prune_count: true,
  include_roles: [
    '0000000000'
  ]
});
```

### [Get Guild Voice Regions](https://discord.com/developers/docs/resources/guild#get-guild-voice-regions)

#### Parameters
| Field    | Type      | Description          |
|----------|-----------|----------------------|
| guild_id | snowflake | the id of the guild |

**Example:**
```javascript
await api.discord.guilds.getVoiceRegions({
  guild_id: '0000000000'
});
```

### [Get Guild Integrations](https://discord.com/developers/docs/resources/guild#get-guild-integrations)
**This endpoint returns a maximum of 50 integrations.**  
**If a guild has more integrations, they cannot be accessed.**

#### Parameters
| Field    | Type      | Description          |
|----------|-----------|----------------------|
| guild_id | snowflake | the id of the guild |

**Example:**
```javascript
await api.discord.guilds.getAllIntegrations({
  guild_id: '0000000000'
});
```

### [Delete Guild Integration](https://discord.com/developers/docs/resources/guild#delete-guild-integration)
**Deletes any associated webhooks and kicks the associated bot if there is one.**

#### Parameters
| Field          | Type      | Description                         |
|----------------|-----------|-------------------------------------|
| guild_id       | snowflake | the id of the guild                |
| integration_id | snowflake | The ID of the integration to delete |

**Example:**
```javascript
await api.discord.guilds.destroyIntegration({
  guild_id: '0000000000'
});
```

### [Get Guild Widget](https://discord.com/developers/docs/resources/guild#get-guild-widget)

#### Parameters
| Field    | Type      | Description          |
|----------|-----------|----------------------|
| guild_id | snowflake | the id of the guild |

**Example:**
```javascript
await api.discord.guilds.retrieveWidget({
  guild_id: '0000000000'
});
```

### [Get Guild Widget Settings](https://discord.com/developers/docs/resources/guild#get-guild-widget-settings)

#### Parameters
| Field    | Type      | Description          |
|----------|-----------|----------------------|
| guild_id | snowflake | the id of the guild |

**Example:**
```javascript
await api.discord.guilds.retrieveWidgetSettings({
  guild_id: '0000000000'
});
```

### [Get Guild Widget Image](https://discord.com/developers/docs/resources/guild#get-guild-widget-image)
##### Widget Style Options

| Value   | Description                                                                                                                                                    | Example                                                                              |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| shield  | shield style widget with Discord icon and guild members online count                                                                                           | [Example](https://discord.com/api/guilds/81384788765712384/widget.png?style=shield)  |
| banner1 | large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget                                                           | [Example](https://discord.com/api/guilds/81384788765712384/widget.png?style=banner1) |
| banner2 | smaller widget style with guild icon, name and online count. Split on the right with Discord logo                                                              | [Example](https://discord.com/api/guilds/81384788765712384/widget.png?style=banner2) |
| banner3 | large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right                                        | [Example](https://discord.com/api/guilds/81384788765712384/widget.png?style=banner3) |
| banner4 | large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom | [Example](https://discord.com/api/guilds/81384788765712384/widget.png?style=banner4) |

#### Parameters
| Field    | Type      | Description              |
|----------|-----------|--------------------------|
| guild_id | snowflake | the id of the guild     |
| style    | string    | Widget style (see above) |

**Example:**
```javascript
await api.discord.guilds.retrieveWidgetImage({
  guild_id: '0000000000',
  style: 'banner3'
});
```

### [Modify Guild Widget](https://discord.com/developers/docs/resources/guild#modify-guild-widget)

#### Parameters
| Field       | Type      | Description                   |
|-------------|-----------|-------------------------------|
| guild_id    | snowflake | the id of the guild          |
| channel_id? | snowflake | temp                          |
| enabled?    | boolean   | Whether the widget is enabled |

**Example:**
```javascript
await api.discord.guilds.updateWidget({
  guild_id: '0000000000',
  enabled: true
});
```

### [Get Guild Vanity URL](https://discord.com/developers/docs/resources/guild#get-guild-vanity-url)

#### Parameters
| Field    | Type      | Description          |
|----------|-----------|----------------------|
| guild_id | snowflake | the id of the guild |

**Example:**
```javascript
await api.discord.guilds.retrieveVanityURL({
  guild_id: '0000000000'
});
```

### [Get Guild Welcome Screen](https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen)

#### Parameters
| Field    | Type      | Description          |
|----------|-----------|----------------------|
| guild_id | snowflake | the id of the guild |

**Example:**
```javascript
await api.discord.guilds.retrieveWelcomeScreen({
  guild_id: '0000000000'
});
```

### [Modify Guild Welcome Screen](https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen)

#### Parameters
| Field             | Type                                                                      | Description                                          |
|-------------------|---------------------------------------------------------------------------|------------------------------------------------------|
| guild_id          | snowflake                                                                 | the id of the guild                                 |
| description?      | string                                                                    | The server description to show in the welcome screen |
| enabled?          | boolean                                                                   | Whether the welcome screen is enabled.               |
| welcome_channels? | array of [welcome screen channel](#welcome-screen-channel-object) objects | Channels shown in the welcome screen, up to 5        |

**Example:**
```javascript
await api.discord.guilds.updateWelcomeScreen({
  guild_id: '0000000000',
  enabled: true
});
```

### [Get Guild Onboarding](https://discord.com/developers/docs/resources/guild#get-guild-onboarding)

#### Parameters
| Field    | Type      | Description          |
|----------|-----------|----------------------|
| guild_id | snowflake | the id of the guild |

**Example:**
```javascript
await api.discord.guilds.retrieveOnboarding({
  guild_id: '0000000000',
  enabled: true
});
```

### [Modify Guild Onboarding](https://discord.com/developers/docs/resources/guild#modify-guild-onboarding)
**Requires the `MANAGE_GUILD` and `MANAGE_ROLES` permissions.**  
> Onboarding enforces constraints when enabled. These constraints are that there must be at least 7 Default Channels and at least 5 of them must allow sending messages to the @everyone role. The mode field modifies what is considered when enforcing these constraints.

#### Parameters
| Field               | Type                                                               | Description                                                |
|---------------------|--------------------------------------------------------------------|------------------------------------------------------------|
| guild_id            | snowflake                                                          | the id of the guild                                       |
| prompts             | array of [onboarding prompt](#onboarding-prompt-structure) objects | Prompts shown during onboarding and in customize commutity |
| default_channel_ids | array of snowflakes                                                | Channel IDs that members get opted into automatically      |
| enabled             | boolean                                                            | Whether onboarding is enabled in the guild                 |
| mode                | [onboarding mode](#onboarding-mode)                                | Current mode of onboarding                                 |

**Example:**
```javascript
await api.discord.guilds.updateOnboarding({
  guild_id: '0000000000',
  prompts: [{
    id: '0000000000',
    type: 0,
    title: 'Prompt Title',
    single_select: true,
    required: true,
    in_onboarding: true,
    options: [{
      title: 'Option Title',
      description: 'Option description',
      id: '0000000000',
      channel_ids: [
        '0000000000
      ],
      role_ids: [
        '0000000000'
      ],
      emoji: {
        id: '0000000000',
        name: 'emoji_name',
        animated: false
      }
    }]
  }]
});
```

placeholder for new member welcome

---

## Guild Channels

| Method                                               | Description                       |
|------------------------------------------------------|-----------------------------------|
| [`getAll`](#get-guild-channels)                      | Retrieve all channels in a guild. |
| [`create`](#create-guild-channel)                    | Create a new guild channel.       | 
| [`modifyPositions`](#modify-guild-channel-positions) | Modify the positions of channels. |

### [Get Guild Channels](https://discord.com/developers/docs/resources/guild#get-guild-channels)
##### Does not include threads

#### Parameters
| Field    | Type      | Description          |
|----------|-----------|----------------------|
| guild_id | snowflake | the id of the guild |

**Example:**
```javascript
await api.discord.guilds.channels.getAll({
  guild_id: '0000000000'
});
```

### [Create Guild Channel](https://discord.com/developers/docs/resources/guild#create-guild-channel)
Requires the `MANAGE_CHANNELS` permission.  
If setting permission overwrites, only permissions your bot has in the guild can be allowed/denied.  
Setting `MANAGE_ROLES` permission in channels is only possible for guild administrators.

> All parameters to this endpoint are optional and nullable excluding `name`

#### Parameters
| Field                              | Type                                                    | Description                                                                                                                                                                     | Channel Type                                   |
|------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| name                               | string                                                  | channel name (1-100 characters)                                                                                                                                                 | All                                            |
| type                               | number                                                  | the [type of channel](#channel-types)                                                                                                     | All                                            |
| topic                              | string                                                  | channel topic (0-1024 characters)                                                                                                                                               | Text, Announcement, Forum, Media               |
| bitrate                            | number                                                  | the bitrate (in bits) of the voice or stage channel; min 8000                                                                                                                   | Voice, Stage                                   |
| user_limit                         | number                                                  | the user limit of the voice channel                                                                                                                                             | Voice, Stage                                   |
| rate_limit_per_user                | number                                                  | amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected | Text, Voice, Stage, Forum, Media               |
| position                           | number                                                  | sorting position of the channel                                                                                                                                                 | All                                            |
| permission_overwrites              | array of partial [overwrite](#overwrite-object) objects | the channel's permission overwrites                                                                                                                                             | All                                            |
| parent_id                          | snowflake                                               | id of the parent category for a channel                                                                                                                                         | Text, Voice, Announcement, Stage, Forum, Media |
| nsfw                               | boolean                                                 | whether the channel is nsfw                                                                                                                                                     | Text, Voice, Announcement, Stage, Forum        |
| rtc_region                         | string                                                  | channel [voice region](#voice-region-object) id of the voice or stage channel, automatic when set to null                                                  | Voice, Stage                                   |
| video_quality_mode                 | number                                                  | the camera [video quality mode](#video-quality-modes) of the voice channel | Voice, Stage |
| default_auto_archive_duration      | number                                                  | the default duration that the clients use (not the API) for newly created threads in the channel, in minutes, to automatically archive the thread after recent activity         | Text, Announcement, Forum, Media               |
| default_reaction_emoji             | [default reaction](#default-reaction-object) object     | emoji to show in the add reaction button on a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel                                                                              | Forum, Media                                   |
| available_tags                     | array of [tag](#forum-tag-object) objects               | set of tags that can be used in a `GUILD_FORUM` or a `GUILD_MEDIA` channel                                                                                                      | Forum, Media                                   |
| default_sort_order                 | number                                                  | the [default sort order type](#sort-order-types) used to order posts in `GUILD_FORUM` and `GUILD_MEDIA` channels                          | Forum, Media                                   |
| default_forum_layout               | number                                                  | the [default forum layout view](#forum-layout-types) used to display posts in `GUILD_FORUM` channels                                      | Forum                                          |
| default_thread_rate_limit_per_user | number                                                  | the initial `rate_limit_per_user` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update.                   | Text, Announcement, Forum, Media               |

**Example:**
```javascript
await api.discord.guilds.channels.create({
  guild_id: '0000000000',
  name: 'my-new-channel',
  type: 0,
  topic: 'Cool people only',
  position: 19
});
```

### [Modify Guild Channel Positions](https://discord.com/developers/docs/resources/guild#get-guild-onboarding)

> Only channels to be modified are required

#### Parameters
| Field             | Type       | Description                                                                      |
|-------------------|------------|----------------------------------------------------------------------------------|
| id                | snowflake  | channel id                                                                       |
| position?         | ?number    | sorting position of the channel                                                  |
| lock_permissions? | ?boolean   | syncs the permission overwrites with the new parent, if moving to a new category |
| parent_id?        | ?snowflake | the new parent ID for the channel that is moved                                  |

**Example:**
```javascript
await api.discord.guilds.channels.modifyPositions({
  guild_id: '0000000000',
  channels: [{
    id: '0000000000',
    position: 3,
    lock_permissions: true,
    parent_id: '0000000000'
  }]
});
```
---

## Guild Members

| Method                                               | Description                                    |
|------------------------------------------------------|------------------------------------------------|
| [`retrieve`](#get-guild-member)                      | Returns information about a user               |
| [`getAll`](#list-guild-channel)                      | List all members of a guild                    | 
| [`search`](#search-guild-members)                    | Search for guild members by name or nickname   |
| [`remove`](#remove-guild-member)                     | Remove a member from a guild                   |
| [`update`](#modify-guild-member)                     | Modify attributes of a guild member            |
| [`updateCurrent`](#modify-current-member)            | Modify the current bot's nickname in the guild |
| [`addRole`](#add-guild-member-role)                  | Add a role to a guild member                   |
| [`removeRole`](#remove-guild-member-role)            | Remove a role from a guild member              |
| [`getPermissionNames`](#get-member-permission-names) | Get a user's permission's names                |
| [`timeout`](#timeout-guild-member)                   | Update a member's communication timeout        |

### [Get Guild Member](https://discord.com/developers/docs/resources/guild#get-guild-member)

#### Parameters
| Field    | Type      | Description          |
|----------|-----------|----------------------|
| guild_id | snowflake | the id of the guild |
| user_id  | snowflake | The ID of the user   |

**Example:**
```javascript
await api.discord.guilds.members.retrieve({
  guild_id: '0000000000',
  user_id: '0000000000'
});
```

### [List Guild Members](https://discord.com/developers/docs/resources/guild#list-guild-members)

#### Parameters
| Field    | Type      | Description                                          |
|----------|-----------|------------------------------------------------------|
| guild_id | snowflake | the id of the guild                                 |
| limit    | number    | Max number of members to return (1-1000) (default 1) |
| after    | snowflake | The highest user id in the previous page (default 0) |

**Example:**
```javascript
await api.discord.guilds.members.getAll({
  guild_id: '0000000000',
  limit: 1000
});
```

### [Search Guild Members](https://discord.com/developers/docs/resources/guild#search-guild-members)

#### Parameters
| Field    | Type      | Description                                               |
|----------|-----------|-----------------------------------------------------------|
| guild_id | snowflake | the id of the guild                                      |
| query    | string    | Query string to match username(s) and nickname(s) against |
| limit    | number    | Max number of members to return (1-1000) (default 1)      |

**Example:**
```javascript
await api.discord.guilds.members.search({
  guild_id: '0000000000',
  query: 'lostmyinfo',
  limit: 1
});
```

### [Remove Guild Member](https://discord.com/developers/docs/resources/guild#remove-guild-member)

#### Parameters
| Field    | Type      | Description                  |
|----------|-----------|------------------------------|
| guild_id | snowflake | the id of the guild         |
| user_id  | snowflake | The ID of the user to remove |
| reason?  | string    | Reason for kick              |

**Example:**
```javascript
await api.discord.guilds.members.remove({
  guild_id: '0000000000',
  user_id: '0000000000',
  reason: 'not cool enough'
});
```

### [Modify Guild Member](https://discord.com/developers/docs/resources/guild#modify-guild-member)
If the channel_id is set to null, this will force the target user to be disconnected from voice.

> All parameters to this endpoint are optional and nullable.

#### Parameters
| Field                        | Type                | Description                                                       | Permission       |
|------------------------------|---------------------|-------------------------------------------------------------------|------------------|
| guild_id                     | snowflake           | the id of the guild                                              |                  |
| role_id                      | snowflake           | the id of the role                                                |                  |
| nick                         | string              | value to set user's nickname to                                   | MANAGE_NICKNAMES |
| roles                        | array of snowflakes | array of role ids the member is assigned                          | MANAGE_ROLES     |
| mute                         | boolean             | whether the user is muted in voice channels                       | MUTE_MEMBERS     |
| deaf                         | boolean             | whether the user is deafened in voice channels                    | DEAFEN_MEMBERS   |
| channel_id                   | snowflake           | id of channel to move user to (if they are connected to voice)    | MOVE_MEMBERS     |
| communication_disabled_until | ISO8601 timestamp   | when the user's timeout will expire (up to 28 days in the future) | MODERATE_MEMBERS |
| flags                        | number              | [guild member flags](#guild-member-flags)                         | MODERATE_MEMBERS |

**Example:**
```javascript
await api.discord.guilds.members.update({
  guild_id: '0000000000',
  nick: 'cool new nick'
});
```

### [Modify Current Member](https://discord.com/developers/docs/resources/guild#modify-current-member)

#### Parameters
| Field    | Type      | Description                     |
|----------|-----------|---------------------------------|
| guild_id | snowflake | the id of the guild            |
| nick?    | string    | Value to set user's nickname to |

**Example:**
```javascript
await api.discord.guilds.members.updateCurrent({
  guild_id: '0000000000',
  nick: 'cool new nick'
});
```

### [Add Guild Member Role](https://discord.com/developers/docs/resources/guild#add-guild-member-role)

#### Parameters
| Field    | Type      | Description                                   |
|----------|-----------|-----------------------------------------------|
| guild_id | snowflake | the id of the guild                          |
| user_id  | snowflake | The user ID of the user to assign the role to |
| role_id  | snowflake | The role ID of the role to give the user      |

**Example:**
```javascript
await api.discord.guilds.members.addRole({
  guild_id: '0000000000',
  user_id: '0000000000',
  role_id: '0000000000'
});
```

### [Remove Guild Member Role](https://discord.com/developers/docs/resources/guild#remove-guild-member-role)

#### Parameters
| Field    | Type      | Description                                     |
|----------|-----------|-------------------------------------------------|
| guild_id | snowflake | the id of the guild                            |
| user_id  | snowflake | The user ID of the user to remove the role from |
| role_id  | snowflake | The role ID of the role to remove from the user |

**Example:**
```javascript
await api.discord.guilds.members.removeRole({
  guild_id: '0000000000',
  user_id: '0000000000',
  role_id: '0000000000'
});
```

### Get Member Permission Names

#### Parameters
| Type                  | Description       |
|-----------------------|-------------------|
| array of role IDs     | Roles of a member |
| array of role objects | Roles of a guild  |

**Example:**
```javascript
const x = params.member.roles;
const y = params.guild.roles;
const permNames = getPermissionNames(x, y);
```

### Timeout Guild Member
Sets/adjusts/clears a member's timeout

#### Parameters
| Field    | Type      | Description                                                                 |
|----------|-----------|-----------------------------------------------------------------------------|
| guild_id | snowflake | the id of the guild                                                         |
| user_id  | snowflake | The user ID of the user to remove the role from                             |
| duration | number    | Duration in seconds to set timeout. Set to `null` or omit to clear timeout. |
| reason?  | string    | Reason                                                                      |

**Example:**
```javascript
// timeout a member for 5 minutes
await api.discord.guilds.members.timeout({
  guild_id: '0000000000',
  user_id: '0000000000',
  duration: 300 // 5 minutes
});

// clear a member's timeout
await api.discord.guilds.members.timeout({
  guild_id: '0000000000',
  user_id: '0000000000'
});
```
---

## Guild Roles

| Method                          | Description                       |
|---------------------------------|-----------------------------------|
| [`retrieve`](#get-guild-role)   | Retrieve a role by ID             |
| [`getAll`](#get-guild-roles)    | List all roles in a guild         | 
| [`create`](#create-guild-role)  | Create a new role in the guild    |
| [`update`](#modify-guild-role)  | Modify properties of a guild role |
| [`destroy`](#delete-guild-role) | Modify properties of a guild role |

### Get Guild role

#### Parameters
| Field    | Type      | Description          |
|----------|-----------|----------------------|
| guild_id | snowflake | the id of the guild  |
| role_id  | snowflake | the id of the role   |

**Example:**
```javascript
await api.discord.guilds.roles.retrieve({
  guild_id: '0000000000',
  role_id: '0000000000'
});
```

### [Get Guild Roles](ttps://discord.com/developers/docs/resources/guild#get-guild-roles)

#### Parameters
| Field    | Type      | Description          |
|----------|-----------|----------------------|
| guild_id | snowflake | the id of the guild  |

**Example:**
```javascript
await api.discord.guilds.roles.getAll({
  guild_id: '0000000000'
});
```

### [Create Guild Role](ttps://discord.com/developers/docs/resources/guild#create-guild-role)

#### Parameters
| Field         | Type       | Description                                                                          | Default    |
|---------------|------------|--------------------------------------------------------------------------------------|------------|
| guild_id      | snowflake  | the id of the guild                                                                  |            |
| role_id       | snowflake  | the id of the role                                                                   |            |
| name          | string     | name of the role, max 100 characters                                                 | "new role" |
| permissions   | string     | bitwise value of the enabled/disabled permissions                                    | @everyone  |
| color         | number     | RGB color value                                                                      | 0          |
| hoist         | boolean    | whether the role should be displayed separately in the sidebar                       | false      |
| icon          | url/buffer | the role's icon image (if the guild has the `ROLE_ICONS` feature)                    | null       |
| unicode_emoji | ?string    | the role's unicode emoji as a standard emoji (if guild has the `ROLE_ICONS` feature) | null       |
| mentionable   | boolean    | whether the role should be mentionable                                               | false      |

**Example:**
```javascript
await api.discord.guilds.roles.create({
  guild_id: '0000000000',
  name: 'cool kids',
  hoist: true,
  mentionable: true,
  icon: 'https://www.picofcoolkid.png'
});
```

### [Modify Guild Role](ttps://discord.com/developers/docs/resources/guild#modify-guild-role)
> All parameters to this endpoint are optional and nullable.

#### Parameters
| Field         | Type       | Description                                                                          |
|---------------|------------|--------------------------------------------------------------------------------------|
| guild_id      | snowflake  | the id of the guild                                                                  |
| role_id       | snowflake  | the id of the role                                                                   |
| name          | string     | name of the role, max 100 characters                                                 |
| permissions   | string     | bitwise value of the enabled/disabled permissions                                    |
| color         | number     | RGB color value                                                                      |
| hoist         | boolean    | whether the role should be displayed separately in the sidebar                       |
| icon          | url/buffer | the role's icon image (if the guild has the `ROLE_ICONS` feature)                    |
| unicode_emoji | ?string    | the role's unicode emoji as a standard emoji (if guild has the `ROLE_ICONS` feature) |
| mentionable   | boolean    | whether the role should be mentionable                                               |

**Example:**
```javascript
await api.discord.guilds.roles.update({
  guild_id: '0000000000',
  role_id: '0000000000',
  name: 'new role name',
  hoist: false,
  mentionable: false,
  icon: 'https://www.newimage.png'
});
```

### [Delete Guild Role](ttps://discord.com/developers/docs/resources/guild#delete-guild-role)

#### Parameters
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |
| role_id  | snowflake | the id of the role  |
| reason?  | string    | reason              |

**Example:**
```javascript
await api.discord.guilds.roles.destroy({
  guild_id: '0000000000',
  role_id: '0000000000'
});
```

### [Modify Guild Role Positions](ttps://discord.com/developers/docs/resources/guild#modify-guild-role-positions)

#### Parameters
| Field    | Type                             | Description                                         |
|----------|----------------------------------|-----------------------------------------------------|
| guild_id | snowflake                        | the id of the guild                                 |
| roles    | array of partial channel objects | the ids and new positions of the channels to modify |

**Example:**
```javascript
await api.discord.guilds.roles.retrieve({
  guild_id: '0000000000',
  roles: [
    { id: '0000000000', position: 3 },
    { id: '0000000000', position: 8 }
  ]
});
```
---

## Guild Emojis

| Method                           | Description                       |
|----------------------------------|-----------------------------------|
| [`retrieve`](#get-guild-emoji)   | Get a specific emoji from a guild |
| [`getAll`](#list-guild-emojis)   | List all emojis in a guild        | 
| [`create`](#create-guild-emoji)  | Create a new emoji in the guild   |
| [`update`](#modify-guild-emoji)  | Modify a guild emoji              |
| [`destroy`](#delete-guild-emoji) | Delete a guild emoji              |

### [Get Guild Emoji](https://discord.com/developers/docs/resources/emoji#get-guild-emoji)

#### Parameters
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |
| emoji_id | snowflake | The id of the emoji |

**Example:**
```javascript
await api.discord.guilds.emojis.retrieve({
  guild_id: '0000000000',
  emoji_id: '0000000000'
});
```

### [List Guild Emojis](https://discord.com/developers/docs/resources/emoji#list-guild-emoji)

#### Parameters
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |

**Example:**
```javascript
await api.discord.guilds.emojis.getAll({
  guild_id: '0000000000'
});
```

### [Create Guild Emoji](https://discord.com/developers/docs/resources/emoji#create-guild-emoji)

#### Parameters
| Field    | Type                | Description                     |
|----------|---------------------|---------------------------------|
| guild_id | snowflake           | the id of the guild             |
| name     | string              | name of the emoji               |
| image    | url/buffer          | the 128x128 emoji image         |
| roles    | array of snowflakes | roles allowed to use this emoji |

**Example:**
```javascript
await api.discord.guilds.emojis.create({
  guild_id: '0000000000',
  name: 'goodsie',
  image: 'https://picofgoodsie.png'
});
```

### [Modify Guild Emoji](https://discord.com/developers/docs/resources/emoji#modify-guild-emoji)

#### Parameters
| Field    | Type                | Description                     |
|----------|---------------------|---------------------------------|
| guild_id | snowflake           | the id of the guild             |
| emoji_id | snowflake           | the id of the emoji             |
| name     | string              | name of the emoji               |
| roles    | array of snowflakes | roles allowed to use this emoji |

**Example:**
```javascript
await api.discord.guilds.emojis.update({
  guild_id: '0000000000',
  emoji_id: '0000000000',
  name: 'newemojiname'
});
```

### [Destroy Guild Emoji](https://discord.com/developers/docs/resources/emoji#delete-guild-emoji)

#### Parameters
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |
| emoji_id | snowflake | The id of the emoji |

**Example:**
```javascript
await api.discord.guilds.emojis.destroy({
  guild_id: '0000000000',
  emoji_id: '0000000000'
});
```
---

## Guild Stickers

| Method                                       | Description                         |
|----------------------------------------------|-------------------------------------|
| [`retrieve`](#get-sticker)                   | Get a specific sticker              |
| [`retrieveGuildSticker`](#get-guild-sticker) | Get a specific sticker from a guild |
| [`nitroPacks`](#list-sticker-packs)          | Lists available sticker packs       | 
| [`getAll`](#list-guild-stickers)             | List all stickers in a guild        |
| [`create`](#remove-guild-member)             | Create a guild sticker              |
| [`update`](#modify-guild-member)             | Update a guild sticker              |
| [`destroy`](#modify-guild-member)            | Delete a guild sticker              |

### [Get Sticker](https://discord.com/developers/docs/resources/sticker#get-sticker)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| sticker_id | snowflake | The id of the sticker |

**Example:**
```javascript
await api.discord.guilds.stickers.retrieve({
  sticker_id: '0000000000'
});
```

### [Get Guild Sticker](https://discord.com/developers/docs/resources/sticker#get-guild-sticker)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| guild_id   | snowflake | the id of the guild   |
| sticker_id | snowflake | The id of the sticker |

**Example:**
```javascript
await api.discord.guilds.stickers.retrieveGuild({
  guild_id: '0000000000',
  sticker_id: '0000000000'
});
```

### [List Sticker Packs](https://discord.com/developers/docs/resources/sticker#list-nitro-sticker-packs)

**Example:**
```javascript
await api.discord.guilds.stickers.retrieve();
```

### [List Guild Stickers](https://discord.com/developers/docs/resources/sticker#list-guild-stickers)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| guild_id   | snowflake | the id of the guild   |

**Example:**
```javascript
await api.discord.guilds.stickers.getAll({
  guild_id: '0000000000'
});
```

### [Create Guild Sticker](https://discord.com/developers/docs/resources/sticker#create-guild-sticker)
> This endpoint may take time. It goes through multiple functions before returning the sticker.
#### Parameters
| Field       | Type       | Description                                                       |
|-------------|------------|-------------------------------------------------------------------|
| guild_id    | snowflake  | the id of the guild                                               |
| name        | string     | name of the sticker (2-30 characters)                             |
| description | string     | description of the sticker (empty or 2-100 characters)            |
| tags        | string     | autocomplete/suggestion tags for the sticker (max 200 characters) |
| file        | url/buffer | the sticker file to upload                                        |

**Example:**
```javascript
await api.discord.guilds.stickers.create({
  guild_id: '0000000000',
  name: 'mynewsticker',
  description: 'cool description',
  tags: 'uhhh',
  file: 'https://uhhh.gif'
});
```

### [Modify Guild Sticker](https://discord.com/developers/docs/resources/sticker#modify-guild-sticker)

#### Parameters
| Field       | Type       | Description                                                       |
|-------------|------------|-------------------------------------------------------------------|
| guild_id    | snowflake  | the id of the guild                                               |
| name        | string     | name of the sticker (2-30 characters)                             |
| description | string     | description of the sticker (empty or 2-100 characters)            |
| tags        | string     | autocomplete/suggestion tags for the sticker (max 200 characters) |

**Example:**
```javascript
await api.discord.guilds.stickers.update({
  guild_id: '0000000000',
  name: 'mynewnewsticker',
  description: 'new cool description',
  tags: 'new uhhh',
});
```

### [Delete Guild Sticker](https://discord.com/developers/docs/resources/sticker#delete-guild-sticker)

#### Parameters
| Field      | Type       | Description           |
|------------|------------|-----------------------|
| guild_id   | snowflake  | the id of the guild   |
| sticker_id | string     | the id of the sticker |

**Example:**
```javascript
await api.discord.guilds.stickers.destroy({
  guild_id: '0000000000',
  sticker_id: '0000000000',
});
```

---

## Guild Scheduled Event

| Method                                         | Description                                 |
|------------------------------------------------|---------------------------------------------|
| [`retrieve`](#get-guild-scheduled-event)       | Get a specific scheduled event in the guild |
| [`getAll`](#list-scheduled-events-for-guild)   | List all scheduled events for the guild     |
| [`getUsers`](#get-guild-scheduled-event-users) | Get users subscribed to a scheduled event   | 
| [`create`](#create-guild-scheduled-event)      | Create a new scheduled event in the guild   |
| [`update`](#modify-guild-scheduled-event)      | Modify a guild scheduled event              |
| [`destroy`](#delete-guild-scheduled-event)     | Delete a guild scheduled event              |

### [Get Guild Scheduled Event](https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event)

#### Parameters
| Field                    | Type      | Description                                      |
|--------------------------|-----------|--------------------------------------------------|
| guild_id                 | snowflake | the id of the guild                              |
| guild_scheduled_event_id | snowflake | the id of the event                              |
| with_user_count?         | boolean   | include number of users subscribed to each event |

**Example:**
```javascript
await api.discord.guilds.events.retrieve({
  guild_id: '0000000000',
  guild_scheduled_event_id: '0000000000',
  with_user_count: true
});
```

### [List Scheduled Events For Guild](https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild)

#### Parameters
| Field            | Type      | Description                                      |
|------------------|-----------|--------------------------------------------------|
| guild_id         | snowflake | the id of the guild                              |
| with_user_count? | boolean   | include number of users subscribed to each event |

**Example:**
```javascript
await api.discord.guilds.events.getAll({
  guild_id: '0000000000',
  with_user_count: true
});
```

### [Get Guild Scheduled Event Users](https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users)

#### Parameters
| Field                    | Type      | Description                                   | Default |
|--------------------------|-----------|-----------------------------------------------|---------|
| guild_id                 | snowflake | the id of the guild                           |         |
| guild_scheduled_event_id | snowflake | the id of the event                           |         |
| limit?                   | number    | number of users to return (up to maximum 100) | 100     |
| with_member?             | boolean   | include guild member data if it exists        | false   |
| before? *                | snowflake | consider only users before given user id      | null    |
| after? *                 | snowflake | consider only users after given user id       | null    |

\* Provide a user id to `before` and `after` for pagination. Users will always be returned in ascending order by `user_id`. If both `before` and `after` are provided, only `before` is respected. Fetching users in-between `before` and `after` is not supported.

**Example:**
```javascript
await api.discord.guilds.events.getUsers({
  guild_id: '0000000000',
  guild_scheduled_event_id: '0000000000',
  limit: 10,
  with_member: true
});
```
### [Create Guild Scheduled Event](https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event)

#### Parameters
| Field                  | Type                                                       | Description                                           |
|------------------------|------------------------------------------------------------|-------------------------------------------------------|
| guild_id               | snowflake                                                  |                                                       |
| channel_id? *          | ?snowflake                                                 | Set to `null` if changing entity type to `EXTERNAL`   |
| entity_metadata? **    | [entity metadata](#guild-scheduled-event-entity-metadata)  | The entity metadata of the scheduled event            |
| name                   | string                                                     | The name of the scheduled event                       |
| privacy_level          | [privacy level](#guild-scheduled-event-privacy-level)      | The privacy level of the scheduled event              |
| scheduled_start_time   | ISO8601 timestamp                                          | The time to schedule the scheduled event              |
| scheduled_end_time? ** | ISO8601 timestamp                                          | The time when the scheduled event is scheduled to end |
| description?           | string                                                     | The description of the scheduled event                |
| entity_type            | [event entity type](#guild-scheduled-event-entity-types)   | The entity type of the scheduled event                |
| image?                 | url/buffer                                                 | The cover image of the scheduled event                |

\* Optional for events with `'entity_type': EXTERNAL`  
\*\* Required for events with `'entity_type': EXTERNAL`


**Example:**
```javascript
await api.discord.guilds.events.create({
  guild_id: '0000000000',
  name: 'Cool Event Name',
  privacy_level: 2,
  scheduled_start_time: '2023-04-04T11:00:00',
  entity_type: 2,
  channel_id: '0000000000'
});
```

### [Modify Guild Scheduled Event](https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event)

#### Parameters
| Field                 | Type                                                       | Description                                           |
|-----------------------|------------------------------------------------------------|-------------------------------------------------------|
| guild_id              | snowflake                                                  |                                                       |
| channel_id? *         | ?snowflake                                                 | Set to `null` if changing entity type to `EXTERNAL`   |
| entity_metadata?      | ?[entity metadata](#guild-scheduled-event-entity-metadata) | The entity metadata of the scheduled event            |
| name?                 | string                                                     | The name of the scheduled event                       |
| privacy_level?        | [privacy level](#guild-scheduled-event-privacy-level)      | The privacy level of the scheduled event              |
| scheduled_start_time? | ISO8601 timestamp                                          | The time to schedule the scheduled event              |
| scheduled_end_time? * | ISO8601 timestamp                                          | The time when the scheduled event is scheduled to end |
| description?          | ?string                                                    | The description of the scheduled event                |
| entity_type? *        | [event entity type](#guild-scheduled-event-entity-types)   | The entity type of the scheduled event                |
| status?               | [event status](#guild-scheduled-event-status)              | The status of the scheduled event                     |
| image?                | url/buffer                                                 | The cover image of the scheduled event                |

\* If updating `entity_type` to `EXTERNAL`:

- `channel_id` is required and [must be set to null](#field-requirements-by-entity-type)
- `entity_metadata` with a `location` field must be provided
- `scheduled_end_time` must be provided

**Example:**
```javascript
await api.discord.guilds.events.update({
  guild_id: '0000000000',
  guild_scheduled_event_id: '0000000000'
  name: 'Edited Event Name',
  status: 2 // ACTIVE
});
```

### [Delete Guild Scheduled Event](https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event)

#### Parameters
| Field            | Type      | Description         |
|------------------|-----------|---------------------|
| guild_id         | snowflake | the id of the guild |

**Example:**
```javascript
await api.discord.guilds.events.destroy({
  guild_id: '0000000000'
});
```
---


## Guild Templates

| Method                                             | Description                                          |
|----------------------------------------------------|------------------------------------------------------|
| [`retrieve`](#get-guild-template)                  | Get a guild template by its code                     |
| [`getAll`](#get-guild-templates)                   | List all templates for a guild                       |
| [`create`](#create-guild-template)                 | Create a new template for the guild                  |
| [`createGuild`](#create-guild-from-guild-template) | Create a new guild from a template                   |
| [`sync`](#sync-guild-template)                     | Sync a guild template with the guild's current state |
| [`update`](#modify-guild-template)                 | Modify a guild template                              |
| [`destroy`](#delete-guild-template)                | Delete a guild template                              |

### [Get Guild Template](https://discord.com/developers/docs/resources/guild-template#get-guild-template)

#### Parameters
| Field         | Type      | Description         |
|---------------|-----------|---------------------|
| template_code | snowflake | the template's code |

**Example:**
```javascript
await api.discord.guilds.templates.retrieve({
  template_code: '0000000000'
});
```

### [Get Guild Templates](https://discord.com/developers/docs/resources/guild-template#get-guild-templates)

#### Parameters
| Field    | Type      | Description  |
|----------|-----------|--------------|
| guild_id | snowflake | the guild id |

**Example:**
```javascript
await api.discord.guilds.templates.getAll({
  guild_id: '0000000000'
});
```

### [Create Guild Template](https://discord.com/developers/docs/resources/guild-template#create-guild-template)

#### Parameters
| Field        | Type      | Description                                     |
|--------------|-----------|-------------------------------------------------|
| guild_id     | snowflake | the guild's id                                  |
| name         | string    | name of the template (1-100 characters)         |
| description? | ?string   | description for the template (0-120 characters) |

**Example:**
```javascript
await api.discord.guilds.templates.create({
  guild_id: '0000000000',
  name: 'fancy template'
});
```

### [Modify Guild Template](https://discord.com/developers/docs/resources/guild-template#modify-guild-template)

#### Parameters
| Field         | Type      | Description                                     |
|---------------|-----------|-------------------------------------------------|
| guild_id      | snowflake | the guild's id                                  |
| template_code | snowflake | the template's code                             |
| name?         | string    | name of the template (1-100 characters)         |
| description?  | ?string   | description for the template (0-120 characters) |

**Example:**
```javascript
await api.discord.guilds.templates.update({
  guild_id: '0000000000',
  template_code: '0000000000',
  name: 'new fancy template name'
});
```

### [Delete Guild Templates](https://discord.com/developers/docs/resources/guild-template#delete-guild-template)

#### Parameters
| Field         | Type      | Description         |
|---------------|-----------|---------------------|
| guild_id      | snowflake | the guild id        |
| template_code | snowflake | the template's code |

**Example:**
```javascript
await api.discord.guilds.templates.destroy({
  guild_id: '0000000000',
  template_code: '0000000000'
});
```

### [Create Guild Fom Guild Template](https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template)
> This endpoint can be used only by bots in less than 10 guilds.

#### Parameters
| Field         | Type       | Description                                     |
|---------------|------------|-------------------------------------------------|
| guild_id      | snowflake  | the guild's id                                  |
| template_code | snowflake  | the template's code                             |
| name          | string     | name of the template (1-100 characters)         |
| icon?         | url/buffer | image url or image buffer for the guild's icon  |

**Example:**
```javascript
await api.discord.guilds.templates.createGuild({
  template_code: '0000000000',
  name: 'Eric\'s cool server template',
  icon: 'https://templateGuildIcon.png'
});
```

### [Sync Guild Templates](https://discord.com/developers/docs/resources/guild-template#sync-guild-templates)

#### Parameters
| Field         | Type      | Description         |
|---------------|-----------|---------------------|
| guild_id      | snowflake | the guild id        |
| template_code | snowflake | the template's code |

**Example:**
```javascript
await api.discord.guilds.templates.sync({
  guild_id: '0000000000',
  template_code: '0000000000'
});
```

---

# Applications
**All Discord API endpoints relating to applications, commands, entitlements and SKUs**

| Method                                                                                | Description                                                                |
|---------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| [`getMe`](#get-current-application)                                                   | Get inforation on the current application                                  |
| [`updateMe`](#edit-current-application)                                               | Edit properties of the app associated with the requesting bot user         |
| [`appRoleConnectionMeta`](#get-application-role-connection-metadata-records)          | Get the applications role connection metadata information                  |
| [`updateAppRoleConnectionMeta`](#update-application-role-connection-metadata-records) | Updates the application role connection metadata for the given application |

### [Get Current Application](https://discord.com/developers/docs/resources/application#get-current-application)

#### Parameters
| Field           | Type      | Description               |
|-----------------|-----------|---------------------------|
| application_id? | snowflake | the id of the application |

**Example:**
```javascript
await api.discord.applications.getMe();
```

### [Edit Current Application](https://discord.com/developers/docs/resources/application#edit-current-application)

#### Parameters
| Field                             | Type                                            | Description                                                 |
|-----------------------------------|-------------------------------------------------|-------------------------------------------------------------|
| application_id?                   | snowflake                                       | the id of the application                                   |
| custom_install_url                | string                                          | Default custom authorization URL for the app, if enabled    |
| description                       | string                                          | Description of the app                                      |
| role_connections_verification_url | string                                          | Role connection verification URL for the app                |
| install_params                    | [install params](#install-params-object) object | Settings for the app's default in-app authorization link, if enabled |
| flags \*                          | number                                          | App's public [flags](#application-flags)                    |
| icon                              | url/buffer                                      | Icon for the app                                            |
| cover_image                       | url/buffer                                      | Default rich presence invite cover image for the app        |
| interactions_endpoint_url \*\*    | string                                          | Interactions endpoint URL for the app   |
| tags                              | array of strings                                | List of tags describing the content and functionality of the app (max of 20 characters per tag). Max of 5 tags. |

\* Only limited intent flags (`GATEWAY_PRESENCE_LIMITED`, `GATEWAY_GUILD_MEMBERS_LIMITED`, and `GATEWAY_MESSAGE_CONTENT_LIMITED`) can be updated via the API.

**Example:**
```javascript
await api.discord.applications.updateMe({
  description: 'new description',
  icon: 'https://url_to_image.png' // or buffer,
  install_params: {
    scopes: [
      'identify',
      'bot',
      'applications.commands'
    ],
    permissions: '8'
  }
});
```

### [Get Application Role Connection Metadata Records](https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records)

#### Parameters
| Field           | Type      | Description               |
|-----------------|-----------|---------------------------|
| application_id? | snowflake | the id of the application |

**Example:**
```javascript
await api.discord.applications.appRoleConnectionMeta();
```

### [Update Application Role Connection Metadata Records](https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records)

#### Parameters
| Field           | Type      | Description               |
|-----------------|-----------|---------------------------|
| application_id? | snowflake | the id of the application |

**Example:**
```javascript
await api.discord.applications.updateAppRoleConnectionMeta();
```
---

## Application Commands

| Method                                                            | Description                                 |
|-------------------------------------------------------------------|---------------------------------------------|
| [`retrieve`](#get-application-command)                            | Get an application command                  |
| [`getAll`](#get-application-commands)                             | Get all application commands                |
| [`create`](#create-application-command)                           | Create a new application command            |
| [`update`](#edit-application-command)                             | Update an application command               |
| [`destroy`](#delete-application-command)                          | Delete an application command               |
| [`bulkOverwrite`](#bulkOverwrite-application-commands)            | Bulk overwrite application commands         |
| [`retrievePermissions`](#get-application-command-permissions)     | Get a guild commands permissions            |
| [`getAllPermissions`](#get-guild-application-command-permissions) | Get permissions for all commands in a guild |
| [`modifyPermissions`](#edit-application-command-permissions)      | Update a guild's application command        |

### [Get Application Command](https://discord.com/developers/docs/interactions/application-commands#get-global-application-command)
**This is to be used for both global and guild commands.**
**Provide a guild_id field if using for a guild command.**

#### Parameters
| Field           | Type      | Description               |
|-----------------|-----------|---------------------------|
| command_id      | snowflake | the id of the command     |
| application_id? | snowflake | the id of the application |
| guild_id?       | snowflake | the id of the guild       |

**Example:**
```javascript
await api.discord.applications.commands.retrieve({
  command_id: '0000000000',
  guild_id: '0000000000'
})
```

### [Get Application Commands](https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands)
**This is to be used for both global and guild commands.**
**Provide a guild_id field if using for a guild command.**

#### Parameters
| Field               | Type      | Description               |
|---------------------|-----------|---------------------------|
| application_id?     | snowflake | the id of the application |
| guild_id?           | snowflake | the id of the guild       |
| with_localizations? | boolean | Whether to include full localization dictionaries (`name_localizations` and `description_localizations`) in the returned objects, instead of the `name_localized` and `description_localized` fields. |

**Example:**
```javascript
await api.discord.applications.commands.getAll();
```
```javascript
await api.discord.applications.commands.getAll({
  guild_id: '0000000000'
})
```

### [Get Application Command](https://discord.com/developers/docs/interactions/application-commands#get-global-application-command)
**This is to be used for both global and guild commands.**
**Provide a guild_id field if using for a guild command.**

#### Parameters
| Field           | Type      | Description               |
|-----------------|-----------|---------------------------|
| command_id      | snowflake | the id of the command     |
| application_id? | snowflake | the id of the application |
| guild_id?       | snowflake | the id of the guild       |

**Example:**
```javascript
await api.discord.applications.commands.retrieve({
  command_id: '0000000000',
  guild_id: '0000000000'
})
```

### [Create Application Command](https://discord.com/developers/docs/interactions/application-commands#create-global-application-command)
**This is to be used for both global and guild commands.**
**Provide a guild_id field if using for a guild command.**

#### Parameters
| Field                       | Type                                                                         | Description                      |
|-----------------------------|------------------------------------------------------------------------------|----------------------------------|
| application_id?             | snowflake                                                                    | the id of the application        |
| guild_id?                   | snowflake                                                                    | the id of the guild              |
| name                        | string                                                                       | Name of command, 1-32 characters |
| name_localizations?         | ?dictionary with keys in available locales                                   | Localization dictionary for the `name` field. Values follow the same restrictions as `name` |
| description?                | string                                                                       | 1-100 character description for `CHAT_INPUT` commands |
| description_localizations?  | ?dictionary with keys in available locales                                   | Localization dictionary for the `description` field. Values follow the same restrictions as `description` |
| options?                    | array of [application command option](#application-command-option-structure) | the parameters for the command   |
| default_member_permissions? | ?string                                                                      | Set of permissions represented as a bit set |
| dm_permission?              | ?boolean                                                                     | Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. |
| type?                       | one of [application command type](#application-command-types)                | Type of command, defaults `1` if not set |
| nsfw?                       | boolean                                                                      | Indicates whether the command is age-restricted |

**Example:**
```javascript
await api.discord.applications.commands.create({
  name: 'slashcommand',
  description: 'Command description',
  guild_id: '0000000000', // optional
  options: [{
    type: 1, // SUB_COMMAND
    name: 'subCommand',
    options: [
      {
        type: 3, // STRING
        name: 'content',
        description: 'Enter content here',
        required: true
      },
      {
        type: 6, // USER
        name: 'user',
        description: 'Select a user'
      }
    ]
  }]
})
```

### [Edit Application Command](https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command)
**This is to be used for both global and guild commands.**
**Provide a guild_id field if using for a guild command.**

#### Parameters
| Field                       | Type                                                                         | Description                      |
|-----------------------------|------------------------------------------------------------------------------|----------------------------------|
| application_id?             | snowflake                                                                    | the id of the application        |
| guild_id?                   | snowflake                                                                    | the id of the guild              |
| name                        | string                                                                       | Name of command, 1-32 characters |
| name_localizations?         | ?dictionary with keys in available locales                                   | Localization dictionary for the `name` field. Values follow the same restrictions as `name` |
| description?                | string                                                                       | 1-100 character description for `CHAT_INPUT` commands |
| description_localizations?  | ?dictionary with keys in available locales                                   | Localization dictionary for the `description` field. Values follow the same restrictions as `description` |
| options?                    | array of [application command option](#application-command-option-structure) | the parameters for the command   |
| default_member_permissions? | ?string                                                                      | Set of permissions represented as a bit set |
| dm_permission?              | ?boolean                                                                     | Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. |
| nsfw?                       | boolean                                                                      | Indicates whether the command is age-restricted |

**Example:**
```javascript
await api.discord.applications.commands.update({
  name: 'slashcommand',
  description: 'Command description',
  guild_id: '0000000000', // optional
  options: [{
    type: 1, // SUB_COMMAND
    name: 'subCommand',
    options: [
      {
        type: 3, // STRING
        name: 'content',
        description: 'Enter content here',
        required: true
      },
      {
        type: 6, // USER
        name: 'user',
        description: 'Select a user'
      }
    ]
  }]
})
```

### [Delete Application Command](https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command)
**This is to be used for both global and guild commands.**
**Provide a guild_id field if using for a guild command.**

#### Parameters
| Field           | Type      | Description               |
|-----------------|-----------|---------------------------|
| command_id      | snowflake | the id of the command     |
| application_id? | snowflake | the id of the application |
| guild_id?       | snowflake | the id of the guild       |

**Example:**
```javascript
await api.discord.applications.commands.destroy({
  command_id: '0000000000',
  guild_id: '0000000000'
})
```

### [Bulk Overwrite Application Command](https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-command)
**This is to be used for both global and guild commands.**
**Provide a guild_id field if using for a guild command.**
**Takes a list of application commands, overwriting the existing global command list for this application.**

#### Parameters
| Field           | Type                                                         | Description                                      |
|-----------------|--------------------------------------------------------------|--------------------------------------------------|
| application_id? | snowflake                                                    | the id of the application                        |
| guild_id?       | snowflake                                                    | the id of the guild                              |
| commands        | array of [application commands](#application-command-object) | Commands to overwrite the existing commands with |

**Example:**
```javascript
await api.discord.applications.commands.bulkOverwrite({
  command_id: '0000000000',
  guild_id: '0000000000',
  commands: [commands]
})
```

### [Get Application Command Permissions](https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions)
**Fetches permissions for a specific command for your application in a guild.**

#### Parameters
| Field           | Type      | Description               |
|-----------------|-----------|---------------------------|
| command_id      | snowflake | the id of the command     |
| application_id? | snowflake | the id of the application |
| guild_id        | snowflake | the id of the guild       |

**Example:**
```javascript
await api.discord.applications.commands.retrievePermissions({
  command_id: '0000000000',
  guild_id: '0000000000'
})
```

### [Get Guild Application Command Permissions](https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions)
**Fetches permissions for all commands for your application in a guild.**

#### Parameters
| Field           | Type      | Description               |
|-----------------|-----------|---------------------------|
| application_id? | snowflake | the id of the application |
| guild_id        | snowflake | the id of the guild       |

**Example:**
```javascript
await api.discord.applications.commands.getAllPermissions({
  guild_id: '0000000000'
})
```

### [Edit Application Command Permissions](https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions)
**Edits command permissions for a specific command for your application in a guild.**

#### Parameters
| Field           | Type                                                                                   | Description               |
|-----------------|----------------------------------------------------------------------------------------|---------------------------|
| application_id? | snowflake                                                                              | the id of the application |
| guild_id        | snowflake                                                                              | the id of the guild       |
| permissions     | array of [application command permissions](#application-command-permissions-structure) | Permissions for the command in the guild |

**Example:**
```javascript
await api.discord.applications.commands.modifyPermissions({
  guild_id: '0000000000',
  permissions: [{
    id: '0000000000',
    type: 2,
    'true'
  }]
})
```
---
## Application Entitlements

| Method                                | Description                                                         |
|---------------------------------------|---------------------------------------------------------------------|
| [`getAll`](#list-entitlements)        | Get all entitlements for a given app                                |
| [`create`](#create-test-entitlement)  | Creates a test entitlement to a given SKU for a given guild or user |
| [`destroy`](#delete-test-entitlement) | Deletes a currently-active test entitlement                         |

### [List Entitlements](https://discord.com/developers/docs/monetization/entitlements#list-entitlements)
**Returns all entitlements for a given app, active and expired.**

#### Parameters
| Field           | Type                              | Description                                          |
|-----------------|-----------------------------------|------------------------------------------------------|
| application_id? | snowflake                         | the id of the application                            |
| user_id?        | snowflake                         | User ID to look up entitlements for                  |
| sku_ids?        | comma-delimited set of snowflakes | Optional list of SKU IDs to check entitlements for   |
| before?         | snowflake                         | Retrieve entitlements before this entitlement ID     |
| after?          | snowflake                         | Retrieve entitlements after this entitlement ID      |
| limit?          | number                            | Number of entitlements to return, 1-100, default 100 |
| guild_id?       | snowflake                         | Guild ID to look up entitlements for                 |
| exclude_ended?  | boolean                           | Whether or not ended entitlements should be omitted  |

**Example:**
```javascript
await api.discord.applications.entitlements.retrieve({
  user_id: '0000000000',
  before: '0000000000',
  after: '0000000000',
  limit: 2
})
```

### [Create Test Entitlement](https://discord.com/developers/docs/monetization/entitlements#create-test-entitlement)
**Creates a test entitlement to a given SKU for a given guild or user. Discord will act as though that user or guild has entitlement to your premium offering.**  
**This endpoint returns a partial entitlement object. It will **not** contain `subscription_id`, `starts_at`, or `ends_at`, as it's valid in perpetuity.**  
**After creating a test entitlement, you'll need to reload your Discord client. After doing so, you'll see that your server or user now has premium access.**


#### Parameters
| Field           | Type      | Description                                               |
|-----------------|-----------|-----------------------------------------------------------|
| application_id? | snowflake | the id of the application                                 |
| sku_id          | string    | ID of the SKU to grant the entitlement to                 |
| owner_id        | string    | ID of the guild or user to grant the entitlement to       |
| owner_type      | number    | `1` for a guild subscription, `2` for a user subscription |

**Example:**
```javascript
await api.discord.applications.entitlements.create({
  sku_id: '0000000000',
  owner_id: '0000000000',
  owner_type: 1
})
```

### [Delete Test Entitlement](https://discord.com/developers/docs/monetization/entitlements#delete-test-entitlement)
**Deletes a currently-active test entitlement. Discord will act as though that user or guild _no longer has_ entitlement to your premium offering.**


#### Parameters
| Field           | Type      | Description               |
|-----------------|-----------|---------------------------|
| application_id? | snowflake | the id of the application |

**Example:**
```javascript
await api.discord.applications.entitlements.delete()
```
## Application SKUs

| Method                 | Description                          |
|------------------------|--------------------------------------|
| [`getAll`](#list-skus) | Get all SKUs for a given application |

### [List SKUs](https://discord.com/developers/docs/monetization/skus#list-skus)
**Because of how our SKU and subscription systems work, you will see two SKUs for your premium offering. For integration and testing entitlements, you should use the SKU with `type: 5`.**

#### Parameters
| Field           | Type      | Description               |
|-----------------|-----------|---------------------------|
| application_id? | snowflake | the id of the application |

**Example:**
```javascript
await api.discord.applications.SKUs.getAll();
```

---

## Audit Log

| Method                             | Description                      |
|------------------------------------|----------------------------------|
| [`retrieve`](#get-guild-audit-log) | Get the audit logs for the guild |

### [Get Guild Audit Log](https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log)
**The returned list of audit log entries is ordered based on whether you use `before` or `after`.**  
**When using `before`, the list is ordered by the audit log entry ID **descending** (newer entries first).**  
**If `after` is used, the list is reversed and appears in **ascending** order (older entries first).**  
**Omitting both `before` and `after` defaults to `before` the current timestamp and will show the most recent entries in descending order by ID, the opposite can be achieved using `after=0` (showing oldest entries).**

#### Parameters
| Field        | Type      | Description                                                        |
|--------------|-----------|--------------------------------------------------------------------|
| guild_id     | snowflake | the id of the application                                          |
| user_id?     | snowflake | Entries from a specific user ID                                    |
| action_type? | number    | Entries for a specific [audit log event](#audit-log-events)        |
| before?      | snowflake | Entries with ID less than a specific audit log entry ID            |
| after?       | snowflake | Entries with ID greater than a specific audit log entry ID         |
| limit?       | number    | Maximum number of entries (between 1-100) to return, defaults to 50|

**Example:**
```javascript
await api.discord.auditlog.retrieve({
  guild_id: '0000000000',
  user_id: '0000000000',
  limit: 10 // default 50
});
```

---

## Auto Moderation

| Method                                         | Description                       |
|------------------------------------------------|-----------------------------------|
| [`retrieveRule`](#get-auto-moderation-rule)    | Get an auto moderation rule       |
| [`getAllRules`](#list-auto-moderation-rules)    | Get all auto moderation rules     |
| [`createRule`](#create-auto-moderation-rule)   | Create a new auto moderation rule |
| [`updateRule`](#modify-auto-moderation-rule)   | Update an auto moderation rule    |
| [`destroyRule`](#destroy-auto-moderation-rule) | Delete an auto moderation rule    |

### [Get Auto Moderation Rule](https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule)

#### Parameters
| Field                   | Type      | Description                |
|-------------------------|-----------|----------------------------|
| guild_id                | snowflake | the id of the guild        |
| auto_moderation_rule_id | snowflake | the id of the automod rule |

**Example:**
```javascript
await api.discord.automod.retrieveRule({
  auto_moderation_rule_id: '0000000000',
  guild_id: '0000000000'
})
```

### [List Auto Moderation Rules](https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild)

#### Parameters
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |

**Example:**
```javascript
await api.discord.automod.getAll({
  guild_id: '0000000000'
})
```

### [Create Auto Moderation Rule](https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule)

#### Parameters
| Field               | Type                                                      | Description                                               |
|---------------------|-----------------------------------------------------------|-----------------------------------------------------------|
| guild_id            | snowflake                                                 | the id of the guild                                       |
| name                | string                                                    | the rule name                                             |
| event_type          | integer                                                   | the [event type](#event-types)                            |
| trigger_type        | integer                                                   | the [trigger type](#trigger-types)                        |
| trigger_metadata? * | object                                                    | the [trigger metadata](#trigger-metadata)                 |
| actions             | array of [action](#audo-moderation-action-object) objects | the actions which will execute when the rule is triggered |
| enabled?            | boolean                                                   | whether the rule is enabled (False by default)            |
| exempt_roles?       | array of snowflakes                                       | the role ids that should not be affected by the rule (Max 20) |
| exempt_channels?    | array of snowflakes                                       | the channel ids that should not be affected by the rule (Max 50) |

**Example:**
```javascript
await api.discord.automod.createRule({
  guild_id: '0000000000',
  name: 'EricsAutoModRule',
  event_type: 1 // MESSAGE_SEND
  trigger_type: 3 // SPAM
  actions: [{
    type: 2, // SEND_ALERT_MESSAGE
    metadata: { channel_id: '0000000000' }
  }],
  enabled: true,
  exempt_roles: ['0000000000'],
  exempt_channels: ['0000000000']
})
```

### [Modify Auto Moderation Rule](https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule)

#### Parameters
| Field               | Type                                                      | Description                                               |
|---------------------|-----------------------------------------------------------|-----------------------------------------------------------|
| guild_id            | snowflake                                                 | the id of the guild                                       |
| name                | string                                                    | the rule name                                             |
| event_type          | integer                                                   | the [event type](#event-types)                            |
| trigger_metadata? * | object                                                    | the [trigger metadata](#trigger-metadata)                 |
| actions             | array of [action](#audo-moderation-action-object) objects | the actions which will execute when the rule is triggered |
| enabled?            | boolean                                                   | whether the rule is enabled (False by default)            |
| exempt_roles?       | array of snowflakes                                       | the role ids that should not be affected by the rule (Max 20) |
| exempt_channels?    | array of snowflakes                                       | the channel ids that should not be affected by the rule (Max 50) |

**Example:**
```javascript
await api.discord.automod.updateRule({
  guild_id: '0000000000',
  auto_moderation_rule_id: '00000',
   name: 'EricsAutoModRule',
   event_type: 1 // MESSAGE_SEND
   actions: [{
     type: 1, // BLOCK_MESSAGE
     metadata: { custom_message: 'GO AWAY' }
   }],
   trigger_metadata: {
     keyword_filter: ['cat*', '*dog'],
     regex_patterns: ['^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$']
   },
   enabled: true
})
```

### [Delete Auto Moderation Rule](https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule)

#### Parameters
| Field                   | Type      | Description                |
|-------------------------|-----------|----------------------------|
| guild_id                | snowflake | the id of the guild        |
| auto_moderation_rule_id | snowflake | the id of the automod rule |

**Example:**
```javascript
await api.discord.automod.destroyRule({
  auto_moderation_rule_id: '0000000000',
  guild_id: '0000000000'
})
```

---

# Objects and Types

#### Default Message Notification Level

| Key           | Value | Description                                                                        |
|---------------|-------|------------------------------------------------------------------------------------|
| ALL_MESSAGES  | 0     | members will receive notifications for all messages by default                     |
| ONLY_MENTIONS | 1     | members will receive notifications only for messages that @mention them by default |

#### Explicit Content Filter Level

| Level                 | Integer | Description                                                 |
|-----------------------|---------|-------------------------------------------------------------|
| DISABLED              | 0       | media content will not be scanned                           |
| MEMBERS_WITHOUT_ROLES | 1       | media content sent by members without roles will be scanned |
| ALL_MEMBERS           | 2       | media content sent by all members will be scanned           |

#### MFA Level

| Level    | Integer | Description                                             |
|----------|---------|---------------------------------------------------------|
| NONE     | 0       | guild has no MFA/2FA requirement for moderation actions |
| ELEVATED | 1       | guild has a 2FA requirement for moderation actions      |

#### Verification Level

| Level     | Integer | Description                                               |
|-----------|---------|-----------------------------------------------------------|
| NONE      | 0       | unrestricted                                              |
| LOW       | 1       | must have verified email on account                       |
| MEDIUM    | 2       | must be registered on Discord for longer than 5 minutes   |
| HIGH      | 3       | must be a member of the server for longer than 10 minutes |
| VERY_HIGH | 4       | must have a verified phone number                         |

#### Guild NSFW Level

| Level          | Value |
|----------------|-------|
| DEFAULT        | 0     |
| EXPLICIT       | 1     |
| SAFE           | 2     |
| AGE_RESTRICTED | 3     |

#### Premium Tier

| Level  | Integer | Description                                   |
|--------|---------|-----------------------------------------------|
| NONE   | 0       | guild has not unlocked any Server Boost perks |
| TIER_1 | 1       | guild has unlocked Server Boost level 1 perks |
| TIER_2 | 2       | guild has unlocked Server Boost level 2 perks |
| TIER_3 | 3       | guild has unlocked Server Boost level 3 perks |

#### System Channel Flags

| Flag                                                     | Value  | Description                                                   |
|----------------------------------------------------------|--------|---------------------------------------------------------------|
| SUPPRESS_JOIN_NOTIFICATIONS                              | 1 << 0 | Suppress member join notifications                            |
| SUPPRESS_PREMIUM_SUBSCRIPTIONS                           | 1 << 1 | Suppress server boost notifications                           |
| SUPPRESS_GUILD_REMINDER_NOTIFICATIONS                    | 1 << 2 | Suppress server setup tips                                    |
| SUPPRESS_JOIN_NOTIFICATION_REPLIES                       | 1 << 3 | Hide member join sticker reply buttons                        |
| SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS        | 1 << 4 | Suppress role subscription purchase and renewal notifications |
| SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES | 1 << 5 | Hide role subscription sticker reply buttons                  |

#### Guild Features

| Feature                                   | Description                                                                                          |
|-------------------------------------------|------------------------------------------------------------------------------------------------------|
| ANIMATED_BANNER                           | guild has access to set an animated guild banner image                                               |
| ANIMATED_ICON                             | guild has access to set an animated guild icon                                                       |
| APPLICATION_COMMAND_PERMISSIONS_V2        | guild is using the old permissions configuration behavior                                            |
| AUTO_MODERATION                           | guild has set up auto moderation rules                                                               |
| BANNER                                    | guild has access to set a guild banner image                                                         |
| COMMUNITY                                 | guild can enable welcome screen, screening, stage channels, discovery, and receive community updates |
| CREATOR_MONETIZABLE_PROVISIONAL           | guild has enabled monetization                                                                       |
| CREATOR_STORE_PAGE                        | guild has enabled the role subscription promo page                                                   |
| DEVELOPER_SUPPORT_SERVER                  | guild has been set as a support server on the App Directory                                          |
| DISCOVERABLE                              | guild is able to be discovered in the directory                                                      |
| FEATURABLE                                | guild is able to be featured in the directory                                                        |
| INVITES_DISABLED                          | guild has paused invites, preventing new users from joining                                          |
| INVITE_SPLASH                             | guild has access to set an invite splash background                                                  |
| MEMBER_VERIFICATION_GATE_ENABLED          | guild has enabled [Membership Screening](#membership-screening-object)                               |
| MORE_STICKERS                             | guild has increased custom sticker slots                                                             |
| NEWS                                      | guild has access to create announcement channels                                                     |
| PARTNERED                                 | guild is partnered                                                                                   |
| PREVIEW_ENABLED                           | guild can be previewed before joining via Membership Screening or the directory                      |
| RAID_ALERTS_DISABLED                      | guild has disabled alerts for join raids in the configured safety alerts channel                     |
| ROLE_ICONS                                | guild is able to set role icons                                                                      |
| ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE | guild has role subscriptions that can be purchased                                                   |
| ROLE_SUBSCRIPTIONS_ENABLED                | guild has enabled role subscriptions                                                                 |
| TICKETED_EVENTS_ENABLED                   | guild has enabled ticketed events                                                                    |
| VANITY_URL                                | guild has access to set a vanity URL                                                                 |
| VERIFIED                                  | guild is verified                                                                                    |
| VIP_REGIONS                               | guild has access to set 384kbps bitrate in voice (previously VIP voice servers)                      |
| WELCOME_SCREEN_ENABLED                    | guild has enabled the welcome screen                                                                 |

#### Mutable Guild Features

| Features             | Required Permissions | Effects                                                   |
|----------------------|----------------------|-----------------------------------------------------------|
| COMMUNITY            | Administrator        | Enables Community Features in the guild                   |
| DISCOVERABLE         | Administrator*       | Enables discovery in the guild, making it publicly listed |
| INVITES_DISABLED     | Manage Guild         | Pauses all invites/access to the server                   |
| RAID_ALERTS_DISABLED | Manage Guild         | Disables alerts for join raids                            |

#### Guild Preview Structure

| Field                      | Type                                              | Description                                        |
|----------------------------|---------------------------------------------------|----------------------------------------------------|
| id                         | snowflake                                         | guild id                                           |
| name                       | string                                            | guild name (2-100 characters)                      |
| icon                       | ?string                                           | icon hash                                          |
| splash                     | ?string                                           | splash hash                                        |
| discovery_splash           | ?string                                           | discovery splash hash                              |
| emojis                     | array of [emoji](#emoji-object) objects           | custom guild emojis                                |
| features                   | array of [guild feature](#guild-features) strings | enabled guild features                             |
| approximate_member_count   | number                                            | approximate number of members in this guild        |
| approximate_presence_count | number                                            | approximate number of online members in this guild |
| description                | ?string                                           | the description for the guild                      |
| stickers                   | array of [sticker](#sticker-object) objects       | custom guild stickers                              |

#### Guild Widget Settings Structure

| Field      | Type       | Description                   |
|------------|------------|-------------------------------|
| enabled    | boolean    | whether the widget is enabled |
| channel_id | ?snowflake | the widget channel id         |

#### Guild Widget Structure

| Field          | Type                                                | Description                                                          |
|----------------|-----------------------------------------------------|----------------------------------------------------------------------|
| id             | snowflake                                           | guild id                                                             |
| name           | string                                              | guild name (2-100 characters)                                        |
| instant_invite | ?string                                             | instant invite for the guilds specified widget invite channel        |
| channels       | array of partial [channel](#channel-object) objects | voice and stage channels which are accessible by @everyone           |
| members        | array of partial [user](#user-object) objects       | special widget user objects that includes users presence (Limit 100) |
| presence_count | number                                              | number of online members in this guild                               |

#### Guild Member Object

| Field                         | Type                        | Description                                                                           |
|-------------------------------|-----------------------------|---------------------------------------------------------------------------------------|
| user?                         | [user](#user-object) object | the user this guild member represents                                                 |
| nick?                         | ?string                     | this user's guild nickname                                                            |
| avatar?                       | ?string                     | the member's guild avatar hash                                                        |
| roles                         | array of snowflakes         | array of [role](#role-object) object ids                                              |
| joined_at                     | ISO8601 timestamp           | when the user joined the guild                                                        |
| premium_since?                | ?ISO8601 timestamp          | when the user started boosting the guild                                              |
| deaf                          | boolean                     | whether the user is deafened in voice channels                                        |
| mute                          | boolean                     | whether the user is muted in voice channels                                           |
| flags                         | number                      | [guild member flags](#guild-member-flags) represented as a bit set, defaults to `0`   |
| pending?                      | boolean                     | whether the user has passed the guild's [Membership Screening](#membership-screening-object) requirements |
| permissions?                  | string                      | total permissions of the member in the channel, including overwrites, returned when in the interaction object                      |
| communication_disabled_until? | ?ISO8601 timestamp          | when the user's timeout will expire and the user will be able to communicate in the guild again                                 |


> The field `user` won't be included in the member object attached to `MESSAGE_CREATE` and `MESSAGE_UPDATE` gateway events.
> In `GUILD_` events, `pending` will always be included as true or false. In non `GUILD_` events which can only be triggered by non-`pending` users, `pending` will not be included.

#### Guild Member Flags

| Flag                  | Value  | Description                                           | Editable |
|-----------------------|--------|-------------------------------------------------------|----------|
| DID_REJOIN            | 1 << 0 | Member has left and rejoined the guild                | false    |
| COMPLETED_ONBOARDING  | 1 << 1 | Member has completed onboarding                       | false    |
| BYPASSES_VERIFICATION | 1 << 2 | Member is exempt from guild verification requirements | true     |
| STARTED_ONBOARDING    | 1 << 3 | Member has started onboarding                         | false    |

> BYPASSES_VERIFICATION allows a member who does not meet verification requirements to participate in a server.

#### Integration Object

| Field                | Type                                                         | Description                                                           |
|----------------------|--------------------------------------------------------------|-----------------------------------------------------------------------|
| id                   | snowflake                                                    | integration id                                                        |
| name                 | string                                                       | integration name                                                      |
| type                 | string                                                       | integration type (twitch, youtube, discord, or guild_subscription)    |
| enabled              | boolean                                                      | is this integration enabled                                           |
| syncing?             | boolean                                                      | is this integration syncing                                           |
| role_id?             | snowflake                                                    | id that this integration uses for "subscribers"                       |
| enable_emoticons?    | boolean                                                      | whether emoticons should be synced for this integration (twitch only) |
| expire_behavior?     | [integration expire behavior](#integration-expire-behaviors) | the behavior of expiring subscribers                                  |
| expire_grace_period? | number                                                       | the grace period (in days) before expiring subscribers                |
| user?                | [user](#user-object) object                                  | user for this integration                                             |
| account              | [account](#integration-account-object) object                | integration account information                                       |
| synced_at?           | ISO8601 timestamp                                            | when this integration was last synced                                 |
| subscriber_count?    | number                                                       | how many subscribers this integration has                             |
| revoked?             | boolean                                                      | has this integration been revoked                                     |
| application?         | [application](#integration-application-object) object        | The bot/OAuth2 application for discord integrations                   |
| scopes?              | array of [OAuth2 scopes](#oauth2-scopes)                     | the scopes the application has been authorized for                    |

#### Integration Expire Behaviors

| Value | Name        |
|-------|-------------|
| 0     | Remove role |
| 1     | Kick        |

#### Integration Account Object

| Field | Type   | Description         |
|-------|--------|---------------------|
| id    | string | id of the account   |
| name  | string | name of the account |

#### Integration Application Object

| Field       | Type                        | Description                              |
|-------------|-----------------------------|------------------------------------------|
| id          | snowflake                   | the id of the app                        |
| name        | string                      | the name of the app                      |
| icon        | ?string                     | the icon hash of the app                 |
| description | string                      | the description of the app               |
| bot?        | [user](#user-object) object | the bot associated with this application |

#### Ban Object

| Field  | Type                        | Description            |
|--------|-----------------------------|------------------------|
| reason | ?string                     | the reason for the ban |
| user   | [user](#user-object) object | the banned user        |

#### Example Ban

```json
{
  "reason": "mentioning lostmyinfo",
  "user": {
    "username": "goodsie",
    "id": "53908099506183680",
    "avatar": "a_bab14f271d565501444b2ca3be944b25",
    "public_flags": 131141
  }
}
```

#### Welcome Screen Object

| Field            | Type                                                                      | Description                                        |
|------------------|---------------------------------------------------------------------------|----------------------------------------------------|
| description      | ?string                                                                   | the server description shown in the welcome screen |
| welcome_channels | array of [welcome screen channel](#welcome-screen-channel-object) objects | the channels shown in the welcome screen, up to 5  |

#### Welcome Screen Channel Object

| Field       | Type       | Description                                                                               |
|-------------|------------|-------------------------------------------------------------------------------------------|
| channel_id  | snowflake  | the channel's id                                                                          |
| description | string     | the description shown for the channel                                                     |
| emoji_id    | ?snowflake | the emoji id, if the emoji is custom                                                      |
| emoji_name  | ?string    | the emoji name if custom, the unicode character if standard, or `null` if no emoji is set |

#### Guild Onboarding Object

| Field               | Type                                                               | Description                                                |
|---------------------|--------------------------------------------------------------------|------------------------------------------------------------|
| guild_id            | snowflake                                                          | ID of the guild this onboarding is part of                 |
| prompts             | array of [onboarding prompt](#onboarding-prompt-structure) objects | Prompts shown during onboarding and in customize community |
| default_channel_ids | array of snowflakes                                                | Channel IDs that members get opted into automatically      |
| enabled             | boolean                                                            | Whether onboarding is enabled in the guild                 |
| mode                | [onboarding mode](#onboarding-mode)                                | Current mode of onboarding                                 |

#### Onboarding Prompt Structure

| Field         | Type                                                       | Description                                                                      |
|---------------|------------------------------------------------------------|----------------------------------------------------------------------------------|
| id            | snowflake                                                  | ID of the prompt                                                                 |
| type          | [prompt type](#prompt-types)                               | Type of prompt                                                                   |
| options       | array of [prompt option](#prompt-option-structure) objects | Options available within the prompt                                              |
| title         | string                                                     | Title of the prompt                                                              |
| single_select | boolean                                                    | Indicates whether users are limited to selecting one option for the prompt       |
| required      | boolean                                                    | Indicates whether the prompt is required before a user completes onboarding flow |
| in_onboarding | boolean                                                    | Indicates whether the prompt is present in the onboarding flow. If `false`, the prompt will only appear in the Channels & Roles tab |

#### Prompt Option Structure

| Field           | Type                          | Description                                                       |
|-----------------|-------------------------------|-------------------------------------------------------------------|
| id              | snowflake                     | ID of the prompt option                                           |
| channel_ids     | array of snowflakes           | IDs for channels a member is added to when the option is selected |
| role_ids        | array of snowflakes           | IDs for roles assigned to a member when the option is selected    |
| emoji?          | [emoji](#emoji-object) object | Emoji of the option (see below)                                   |
| emoji_id?       | snowflake                     | Emoji ID of the option (see below)                                |
| emoji_name?     | string                        | Emoji name of the option (see below)                              |
| emoji_animated? | boolean                       | Whether the emoji is animated (see below)                         |
| title           | string                        | Title of the option                                               |
| description     | ?string                       | Description of the option                                         |

> When creating or updating a prompt option, the `emoji_id`, `emoji_name`, and `emoji_animated` fields must be used instead of the emoji object.

#### Onboarding Mode

Defines the criteria used to satisfy Onboarding constraints that are required for enabling.

| Name                | Value | Description                                               |
|---------------------|-------|-----------------------------------------------------------|
| ONBOARDING_DEFAULT  | 0     | Counts only Default Channels towards constraints          |
| ONBOARDING_ADVANCED | 1     | Counts Default Channels and Questions towards constraints |

#### Prompt Types

| Name            | Value |
|-----------------|-------|
| MULTIPLE_CHOICE | 0     |
| DROPDOWN        | 1     |

#### Example Guild Onboarding

```json
{
    "guild_id": "960007075288915998",
    "prompts": [
        {
            "id": "1067461047608422473",
            "title": "What do you want to do in this community?",
            "options": [
                {
                    "id": "1067461047608422476",
                    "title": "Chat with Friends",
                    "description": "",
                    "emoji": {
                        "id": "1070002302032826408",
                        "name": "chat",
                        "animated": false
                    },
                    "role_ids": [],
                    "channel_ids": [
                        "962007075288916001"
                    ]
                },
                {
                    "id": "1070004843541954678",
                    "title": "Get Gud",
                    "description": "We have excellent teachers!",
                    "emoji": {
                        "id": null,
                        "name": "😀",
                        "animated": false
                    },
                    "role_ids": [
                        "982014491980083211"
                    ],
                    "channel_ids": []
                }
            ],
            "single_select": false,
            "required": false,
            "in_onboarding": true,
            "type": 0
        }
    ],
    "default_channel_ids": [
        "998678771706110023",
        "998678693058719784",
        "1070008122577518632",
        "998678764340912138",
        "998678704446263309",
        "998678683592171602",
        "998678699715067986"
    ],
    "enabled": true
}
```

#### Emoji Object

| Field           | Type                                                 | Description                                                               |
|-----------------|----------------------------------------------------- |---------------------------------------------------------------------------|
| id              | ?snowflake                                           | emoji id                                                                  |
| name            | ?string (can be null only in reaction emoji objects) | emoji name                                                                |
| roles?          | array of [role](#role-object) object ids             | roles allowed to use this emoji                                           |
| user?           | [user](#user-object) object                          | user that created this emoji                                              |
| require_colons? | boolean                                              | whether this emoji must be wrapped in colons                              |
| managed?        | boolean                                              | whether this emoji is managed                                             |
| animated?       | boolean                                              | whether this emoji is animated                                            |
| available?      | boolean                                              | whether this emoji can be used, may be false due to loss of Server Boosts |

##### Emoji Example

```json
{
  "id": "41771983429993937",
  "name": "LUL",
  "roles": ["41771983429993000", "41771983429993111"],
  "user": {
    "username": "Luigi",
    "discriminator": "0002",
    "id": "96008815106887111",
    "avatar": "5500909a3274e1812beb4e8de6631111",
    "public_flags": 131328
  },
  "require_colons": true,
  "managed": false,
  "animated": false
}
```

##### Standard Emoji Example

```json
{
  "id": null,
  "name": "�"
}
```

##### Custom Emoji Examples

```json
{
  "id": "41771983429993937",
  "name": "LUL",
  "animated": true
}
```

```json
{
  "id": "41771983429993937",
  "name": null
}
```

#### Sticker Structure

| Field       | Type                        | Description                                                                       |
|-------------|-------------------------------------------------|---------------------------------------------------------------|
| id          | snowflake                   | id of the sticker                                                                 |
| pack_id?    | snowflake                   | for standard stickers, id of the pack the sticker is from                         |
| name        | string                      | name of the sticker                                                               |
| description | ?string                     | description of the sticker                                                        |
| tags        | string                      | autocomplete/suggestion tags for the sticker (max 200 characters)                 |
| type        | number                     | [type of sticker](#sticker-types)                                                 |
| format_type | number                     | [type of sticker format](#sticker-format-types)                                   |
| available?  | boolean                     | whether this guild sticker can be used, may be false due to loss of Server Boosts |
| guild_id?   | snowflake                   | id of the guild that owns this sticker                                            |
| user?       | [user](#user-object) object | the user that uploaded the guild sticker                                          |
| sort_value? | number                     | the standard sticker's sort order within its pack                                 |

#### Sticker Types

| Type     | Value | Description                                           |
|----------|-------|-------------------------------------------------------|
| STANDARD | 1     | an official sticker in a pack                         |
| GUILD    | 2     | a sticker uploaded to a guild for the guild's members |

#### Sticker Format Types

| Type   | Value |
|--------|-------|
| PNG    | 1     |
| APNG   | 2     |
| LOTTIE | 3     |
| GIF    | 4     |

##### Example Sticker

```json
{
  "id": "749054660769218631",
  "name": "Wave",
  "tags": "wumpus, hello, sup, hi, oi, heyo, heya, yo, greetings, greet, welcome, wave, :wave, :hello, :hi, :hey, hey, \ud83d\udc4b, \ud83d\udc4b\ud83c\udffb, \ud83d\udc4b\ud83c\udffc, \ud83d\udc4b\ud83c\udffd, \ud83d\udc4b\ud83c\udffe, \ud83d\udc4b\ud83c\udfff, goodbye, bye, see ya, later, laterz, cya",
  "type": 1,
  "format_type": 3,
  "description": "Wumpus waves hello",
  "asset": "",
  "pack_id": "847199849233514549",
  "sort_value": 12
}
```

#### Sticker Item Object

| Field       | Type      | Description                                     |
|-------------|-----------|-------------------------------------------------|
| id          | snowflake | id of the sticker                               |
| name        | string    | name of the sticker                             |
| format_type | number   | [type of sticker format](#sticker-format-types) |

#### Sticker Pack Object

| Field             | Type                                        | Description                                                   |
|-------------------|---------------------------------------------|---------------------------------------------------------------|
| id                | snowflake                                   | id of the sticker pack                                        |
| stickers          | array of [sticker](#sticker-object) objects | the stickers in the pack                                      |
| name              | string                                      | name of the sticker pack                                      |
| sku_id            | snowflake                                   | id of the pack's SKU                                          |
| cover_sticker_id? | snowflake                                   | id of a sticker in the pack which is shown as the pack's icon |
| description       | string                                      | description of the sticker pack                               |
| banner_asset_id?  | snowflake                                   | id of the sticker pack's banner image                         |

##### Example Sticker Pack

```json
{
  "id": "847199849233514549",
  "stickers": [],
  "name": "Wumpus Beyond",
  "sku_id": "847199849233514547",
  "cover_sticker_id": "749053689419006003",
  "description": "Say hello to Wumpus!",
  "banner_asset_id": "761773777976819732"
}
```

#### Guild Scheduled Event Object

| Field                 | Type                                                        | Description                                                                                          |
|-----------------------|-------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| id                   | snowflake                                                    | The ID of the scheduled event                                                                        |
| guild_id             | snowflake                                                    | The guild ID to which the scheduled event belongs                                                    |
| channel_id           | ?snowflake                                                   | The channel ID where the scheduled event will be hosted, or `null` if the [scheduled entity type](#guild-scheduled-event-entity-types) is `EXTERNAL` |
| creator_id? *        | ?snowflake                                                   | The ID of the user who created the scheduled event                                                   |
| name                 | string                                                       | The name of the scheduled event (1-100 characters)                                                   |
| description?         | ?string                                                      | The description of the scheduled event (1-1000 characters)                                           |
| scheduled_start_time | ISO8601 timestamp                                            | The time the scheduled event will start                                                              |
| scheduled_end_time   | ?ISO8601 timestamp                                           | The time the scheduled event will end, required if the entity type is `EXTERNAL`                     |
| privacy_level        | [privacy level](#guild-scheduled-event-privacy-level)        | The privacy level of the scheduled event                                                             |
| status               | [event status](#guild-scheduled-event-status)                | The status of the scheduled event                                                                    |
| entity_type          | [scheduled entity type](#guild-scheduled-event-entity-types) | The type of the scheduled event                                                                      |
| entity_id            | ?snowflake                                                   | The ID of an entity associated with a guild scheduled event                                          |
| entity_metadata      | ?[entity metadata](#guild-scheduled-event-entity-metadata)   | Additional metadata for the guild scheduled event                                                    |
| creator?             | [user](#user-object) object                                  | The user who created the scheduled event                                                             |
| user_count?          | number                                                      | The number of users subscribed to the scheduled event                                                |
| image?               | ?string                                                      | The cover image hash of the scheduled event                                                          |
\* `creator_id` will be null and `creator` will not be included for events created before October 25th, 2021, when the concept of `creator_id` was introduced and tracked.

#### Guild Scheduled Event Privacy Level

| Level      | Value | Description                                             |
|------------|-------|---------------------------------------------------------|
| GUILD_ONLY | 2     | the scheduled event is only accessible to guild members |

#### Guild Scheduled Event Entity Types

| Type           | Value |
|----------------|-------|
| STAGE_INSTANCE | 1     |
| VOICE          | 2     |
| EXTERNAL       | 3     |

#### Field Requirements By Entity Type

The following table shows field requirements based on current entity type.

`value` : This field is required to be a non-null value  
`null`     : This field is required to be null  
`-`        : No strict requirements  

| Entity Type    | channel_id | entity_metadata | scheduled_end_time |
|----------------|------------|-----------------|--------------------|
| STAGE_INSTANCE | value      | null            | -                  |
| VOICE          | value      | null            | -                  |
| EXTERNAL       | null       | value *         | value              |  
\* `entity_metadata` with a non-null `location` must be provided


#### Guild Scheduled Event Status

| Type        | Value |
|-------------|-------|
| SCHEDULED   | 1     |
| ACTIVE      | 2     |
| COMPLETED * | 3     |
| CANCELED  * | 4     |  
\* Once `status` is set to `COMPLETED` or `CANCELED`, the `status` can no longer be updated

#### Valid Guild Scheduled Event Status Transitions

SCHEDULED --> ACTIVE  
ACTIVE --------> COMPLETED  
SCHEDULED --> CANCELED


#### Guild Scheduled Event Entity Metadata

| Field       | Type   | Description                             |
|-------------|--------|-----------------------------------------|
| location?* | string | location of the event (1-100 characters) |  
\* required for events with `'entity_type': EXTERNAL`

#### Guild Scheduled Event User Object
| Field                    | Type                                 | Description                                                                       |
|--------------------------|--------------------------------------|-----------------------------------------------------------------------------------|
| guild_scheduled_event_id | snowflake                            | the scheduled event id which the user subscribed to                               |
| user                     | [user](#user-object)                 | user which subscribed to an event                                                 |
| member?                  | [guild member](#guild-member-object) | guild member data for this user for the guild which this event belongs to, if any |

#### Guild Template Object

| Field                   | Type                                  | Description                                            |
|-------------------------|---------------------------------------|--------------------------------------------------------|
| code                    | string                                | the template code (unique ID)                          |
| name                    | string                                | template name                                          |
| description             | ?string                               | the description for the template                       |
| usage_count             | number                               | number of times this template has been used            |
| creator_id              | snowflake                             | the ID of the user who created the template            |
| creator                 | [user](#user-object) object           | the user who created the template                      |
| created_at              | ISO8601 timestamp                     | when this template was created                         |
| updated_at              | ISO8601 timestamp                     | when this template was last synced to the source guild |
| source_guild_id         | snowflake                             | the ID of the guild this template is based on          |
| serialized_source_guild | partial [guild](#guild-object) object | the guild snapshot this template contains              |
| is_dirty                | ?boolean                              | whether the template has unsynced changes              |

##### Example Guild Template Object

```json
{
  "code": "hgM48av5Q69A",
  "name": "Friends & Family",
  "description": "",
  "usage_count": 49605,
  "creator_id": "132837293881950208",
  "creator": {
    "id": "132837293881950208",
    "username": "hoges",
    "avatar": "79b0d9f8c340f2d43e1f78b09f175b62",
    "discriminator": "0001",
    "public_flags": 129
  },
  "created_at": "2020-04-02T21:10:38+00:00",
  "updated_at": "2020-05-01T17:57:38+00:00",
  "source_guild_id": "678070694164299796",
  "serialized_source_guild": {
    "name": "Friends & Family",
    "description": null,
    "region": "us-west",
    "verification_level": 0,
    "default_message_notifications": 0,
    "explicit_content_filter": 0,
    "preferred_locale": "en-US",
    "afk_timeout": 300,
    "roles": [
      {
        "id": 0,
        "name": "@everyone",
        "permissions": 104324689,
        "color": 0,
        "hoist": false,
        "mentionable": false
      }
    ],
    "channels": [
      {
        "name": "Text Channels",
        "position": 1,
        "topic": null,
        "bitrate": 64000,
        "user_limit": 0,
        "nsfw": false,
        "rate_limit_per_user": 0,
        "parent_id": null,
        "permission_overwrites": [],
        "id": 1,
        "type": 4
      },
      {
        "name": "general",
        "position": 1,
        "topic": null,
        "bitrate": 64000,
        "user_limit": 0,
        "nsfw": false,
        "rate_limit_per_user": 0,
        "parent_id": 1,
        "permission_overwrites": [],
        "id": 2,
        "type": 0
      }
    ],
    "afk_channel_id": null,
    "system_channel_id": 2,
    "system_channel_flags": 0,
    "icon_hash": null
  },
  "is_dirty": null
}
```

#### Channel Object

| Field                               | Type                                                                        | Description                                                                                                                                                                                                                                                                                                   |
|-------------------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                                  | snowflake                                                                   | the id of this channel                                                                                                                                                                                                                                                                                        |
| type                                | integer                                                                     | the [type of channel](#channel-types)                                                                                                                                                                                                                                   |
| guild_id?                           | snowflake                                                                   | the id of the guild (may be missing for some channel objects received over gateway guild dispatches)                                                                                                                                                                                                          |
| position?                           | integer                                                                     | sorting position of the channel                                                                                                                                                                                                                                                                               |
| permission_overwrites?              | array of [overwrite](#overwrite-object) objects      | explicit permission overwrites for members and roles                                                                                                                                                                                                                                                          |
| name?                               | ?string                                                                     | the name of the channel (1-100 characters)                                                                                                                                                                                                                                                                    |
| topic?                              | ?string                                                                     | the channel topic (0-4096 characters for `GUILD_FORUM` and `GUILD_MEDIA` channels, 0-1024 characters for all others)                                                                                                                                                                                          |
| nsfw?                               | boolean                                                                     | whether the channel is nsfw                                                                                                                                                                                                                                                                                   |
| last_message_id?                    | ?snowflake                                                                  | the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)                                                                                                                                             |
| bitrate?                            | integer                                                                     | the bitrate (in bits) of the voice channel                                                                                                                                                                                                                                                                    |
| user_limit?                         | integer                                                                     | the user limit of the voice channel                                                                                                                                                                                                                                                                           |
| rate_limit_per_user?\*              | integer                                                                     | amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected                                                                                                                               |
| recipients?                         | array of [user](#user-object) objects                   | the recipients of the DM                                                                                                                                                                                                                                                                                      |
| icon?                               | ?string                                                                     | icon hash of the group DM                                                                                                                                                                                                                                                                                     |
| owner_id?                           | snowflake                                                                   | id of the creator of the group DM or thread                                                                                                                                                                                                                                                                   |
| application_id?                     | snowflake                                                                   | application id of the group DM creator if it is bot-created                                                                                                                                                                                                                                                   |
| managed?                            | boolean                                                                     | for group DM channels: whether the channel is managed by an application via the `gdm.join` OAuth2 scope                                                                                                                                                                                                       |
| parent_id?                          | ?snowflake                                                                  | for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created                                                                                                                                 |
| last_pin_timestamp?                 | ?ISO8601 timestamp                                                          | when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.                                                                                                                                                                                    |
| rtc_region?                         | ?string                                                                     | [voice region](#voice-region-object) id for the voice channel, automatic when set to null                                                                                                                                                                                                |
| video_quality_mode?                 | integer                                                                     | the camera [video quality mode](#video-quality-modes) of the voice channel, 1 when not present                                                                                                                                                                          |
| message_count?\*\*                  | integer                                                                     | number of messages (not including the initial message or deleted messages) in a thread.                                                                                                                                                                                                                       |
| member_count?                       | integer                                                                     | an approximate count of users in a thread, stops counting at 50                                                                                                                                                                                                                                               |
| thread_metadata?                    | [thread metadata](#thread-metadata-object) object  | thread-specific fields not needed by other channels                                                                                                                                                                                                                                                           |
| member?                             | [thread member](#thread-member-object) object      | thread member object for the current user, if they have joined the thread, only included on certain API endpoints                                                                                                                                                                                             |
| default_auto_archive_duration?      | integer                                                                     | default duration, copied onto newly created threads, in minutes, threads will stop showing in the channel list after the specified period of inactivity, can be set to: 60, 1440, 4320, 10080                                                                                                                 |
| permissions?                        | string                                                                      | computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction. This does not include implicit permissions, which may need to be checked separately |
| flags?                              | integer                                                                     | [channel flags](#channel-flags) combined as bitfield                                                                                                                                                                       |
| total_message_sent?                 | integer                                                                     | number of messages ever sent in a thread, it's similar to `message_count` on message creation, but will not decrement the number when a message is deleted                                                                                                                                                    |
| available_tags?                     | array of [tag](#forum-tag-object) objects            | the set of tags that can be used in a `GUILD_FORUM` or a `GUILD_MEDIA` channel                                                                                                                                                                                                                                |
| applied_tags?                       | array of snowflakes                                                         | the IDs of the set of tags that have been applied to a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel                                                                                                                                                                                                   |
| default_reaction_emoji?             | ?[default reaction](#default-reaction-object) object | the emoji to show in the add reaction button on a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel                                                                                                                                                                                                        |
| default_thread_rate_limit_per_user? | integer                                                                     | the initial `rate_limit_per_user` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update.                                                                                                                                                 |
| default_sort_order?                 | ?integer                                                                    | the [default sort order type](#sort-order-types) used to order posts in `GUILD_FORUM` and `GUILD_MEDIA` channels. Defaults to `null`, which indicates a preferred sort order hasn't been set by a channel admin                                                         |
| default_forum_layout?               | integer                                                                     | the [default forum layout view](#forum-layout-types) used to display posts in `GUILD_FORUM` channels. Defaults to `0`, which indicates a layout view has not been set by a channel admin                                                                                |  
\* `rate_limit_per_user` also applies to thread creation. Users can send one message and create one thread during each `rate_limit_per_user` interval.  
\*\* For threads created before July 1, 2022, the message count is inaccurate when it's greater than 50.

#### Channel Types

| Type                | ID | Description                                                                                                       |
|---------------------|----|-------------------------------------------------------------------------------------------------------------------|
| GUILD_TEXT          | 0  | a text channel within a server                                                                                    |
| DM                  | 1  | a direct message between users                                                                                    |
| GUILD_VOICE         | 2  | a voice channel within a server                                                                                   |
| GROUP_DM            | 3  | a direct message between multiple users                                                                           |
| GUILD_CATEGORY      | 4  | an organizational category that contains up to 50 channels                                                        |
| GUILD_ANNOUNCEMENT  | 5  | a channel that users can follow and crosspost into their own server (formerly news channels)                      |
| ANNOUNCEMENT_THREAD | 10 | a temporary sub-channel within a GUILD_ANNOUNCEMENT channel                                                       |
| PUBLIC_THREAD       | 11 | a temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel                                                |
| PRIVATE_THREAD      | 12 | a temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission |
| GUILD_STAGE_VOICE   | 13 | a voice channel for hosting events with an audience                                                               |
| GUILD_DIRECTORY     | 14 | the channel in a hub containing the listed servers                                                                |
| GUILD_FORUM         | 15 | Channel that can only contain threads                                                                             |
| GUILD_MEDIA         | 16 | Channel that can only contain threads, similar to `GUILD_FORUM` channels                                          |

\* The `GUILD_MEDIA` channel type is still in active development. Avoid implementing any features that are not documented here, since they are subject to change without notice!

###### Video Quality Modes

| Mode | Value | Description                                         |
|------|-------|-----------------------------------------------------|
| AUTO | 1     | Discord chooses the quality for optimal performance |
| FULL | 2     | 720p                                                |

###### Channel Flags

| Flag                        | Value   | Description                                                                              |
|-----------------------------|---------|------------------------------------------------------------------------------------------|
| PINNED                      | 1 << 1  | this thread is pinned to the top of its parent `GUILD_FORUM` or `GUILD_MEDIA` channel    |
| REQUIRE_TAG                 | 1 << 4  | whether a tag is required to be specified when creating a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel. Tags are specified in the `applied_tags` field. |
| HIDE_MEDIA_DOWNLOAD_OPTIONS | 1 << 15 | when set hides the embedded media download options. Available only for media channels    |

#### Sort Order Types

| Flag            | Value | Description                                                    |
|-----------------|-------|----------------------------------------------------------------|
| LATEST_ACTIVITY | 0     | Sort forum posts by activity                                   |
| CREATION_DATE   | 1     | Sort forum posts by creation time (from most recent to oldest) |

#### Forum Layout Types

| Flag         | Value | Description                               |
|--------------|-------|-------------------------------------------|
| NOT_SET      | 0     | No default has been set for forum channel |
| LIST_VIEW    | 1     | Display posts as a list                   |
| GALLERY_VIEW | 2     | Display posts as a collection of tiles    |


#### Application Object

| Field                              | Type                                            | Description                                                                                                           |
|------------------------------------|----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| id                                 | snowflake                                       | ID of the app                                         |
| name                               | string                                          | Name of the app                                       |
| icon                               | ?string                                         | Icon hash of the app                                  |
| description                        | string                                          | Description of the app                                |
| rpc_origins?                       | array of strings                                | List of RPC origin URLs, if RPC is enabled            |
| bot_public                         | boolean                                         | When `false`, only the app owner can add the app to guilds |
| bot_require_code_grant             | boolean                                         | When `true`, the app's bot will only join upon completion of the full OAuth2 code grant flow |
| bot?                               | partial [user](#user-object) object             | Partial user object for the bot user associated with the app |
| terms_of_service_url?              | string                                          | URL of the app's Terms of Service                     |
| privacy_policy_url?                | string                                          | URL of the app's Privacy Policy                       |
| owner?                             | partial [user](#user-object) object             | Partial user object for the owner of the app          |
| verify_key                         | string                                          | Hex encoded key for verification in interactions and the GameSDK's GetTicket |
| team                               | ?[team](#team-object) object                    | If the app belongs to a team, this will be a list of the members of that team |
| guild_id?                          | snowflake                                       | Guild associated with the app. For example, a developer support server. |
| guild?                             | partial [guild](#guild-object) object           | Partial object of the associated guild                |
| primary_sku_id?                    | snowflake                                       | If this app is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists |
| slug?                              | string                                          | If this app is a game sold on Discord, this field will be the URL slug that links to the store page |
| cover_image?                       | string                                          | App's default rich presence invite cover image hash   |
| flags?                             | number                                          | App's public [flags](#application-flags)              |
| approximate_guild_count?           | number                                          | Approximate count of guilds the app has been added to |
| redirect_uris?                     | array of strings                                | Array of redirect URIs for the app                    |
| interactions_endpoint_url?         | string                                          | Interactions endpoint URL for the app                 |
| role_connections_verification_url? | string                                          | Role connection verification URL for the app          |
| tags?                              | array of strings                                | List of tags describing the content and functionality of the app. Max of 5 tags |
| install_params?                    | [install params](#install-params-object) object | Settings for the app's default in-app authorization link, if enabled |
| custom_install_url?                | string                                          | Default custom authorization URL for the app, if enabled |

###### Example Application Object

```json
{
  "bot_public": true,
  "bot_require_code_grant": false,
  "cover_image": "31deabb7e45b6c8ecfef77d2f99c81a5",
  "description": "Test",
  "guild_id": "290926798626357260",
  "icon": null,
  "id": "172150183260323840",
  "name": "Baba O-Riley",
  "owner": {
    "avatar": null,
    "discriminator": "1738",
    "flags": 1024,
    "id": "172150183260323840",
    "username": "i own a bot"
  },
  "primary_sku_id": "172150183260323840",
  "slug": "test",
  "summary": "",
  "team": {
    "icon": "dd9b7dcfdf5351b9c3de0fe167bacbe1",
    "id": "531992624043786253",
    "members": [
      {
        "membership_state": 2,
        "permissions": ["*"],
        "team_id": "531992624043786253",
        "user": {
          "avatar": "d9e261cd35999608eb7e3de1fae3688b",
          "discriminator": "0001",
          "id": "511972282709709995",
          "username": "Mr Owner"
        }
      }
    ]
  },
  "verify_key": "1e0a356058d627ca38a5c8c9648818061d49e49bd9da9e3ab17d98ad4d6bg2u8"
}
```

#### Application Flags

| Value   | Name                                          | Description                                                              |
|---------|-----------------------------------------------|----------------------------------------------------------------------------------------|
| 1 << 6  | APPLICATION_AUTO_MODERATION_RULE_CREATE_BADGE | Indicates if an app uses the Auto Moderation API       |
| 1 << 12 | GATEWAY_PRESENCE                              | Intent required for bots in **100 or more servers** to receive `presence_update` events |
| 1 << 13 | GATEWAY_PRESENCE_LIMITED                      | Intent required for bots in under 100 servers to receive `presence_update` events, found on the **Bot** page in your app's settings |
| 1 << 14 | GATEWAY_GUILD_MEMBERS                         | Intent required for bots in **100 or more servers** to receive member-related events like `guild_member_add`. See the list of member-related events under `GUILD_MEMBERS` |
| 1 << 15 | GATEWAY_GUILD_MEMBERS_LIMITED                 | Intent required for bots in under 100 servers to receive member-related events like `guild_member_add`, found on the **Bot** page in your app's settings. See the list of member-related events under `GUILD_MEMBERS` |
| 1 << 16 | VERIFICATION_PENDING_GUILD_LIMIT              | Indicates unusual growth of an app that prevents verification  |
| 1 << 17 | EMBEDDED                                      | Indicates if an app is embedded within the Discord client (currently unavailable publicly) |
| 1 << 18 | GATEWAY_MESSAGE_CONTENT                       | Intent required for bots in **100 or more servers** to receive message content        |
| 1 << 19 | GATEWAY_MESSAGE_CONTENT_LIMITED               | Intent required for bots in under 100 servers to receive message content, found on the **Bot** page in your app's settings |
| 1 << 23 | APPLICATION_COMMAND_BADGE                     | Indicates if an app has registered global application commands  |

#### Install Params Object

| Field       | Type             | Description                                                        |
|-------------|------------------|--------------------------------------------------------------------|
| scopes      | array of strings | [Scopes](#oauth2-scopes) to add the application to the server with |
| permissions | string           | Permissions to request for the bot role                            |

#### OAuth2 Scopes
| Name                                     | Description                            |
|------------------------------------------|-----------------------------------------------------------------------------------------------|
| activities.read                          | allows your app to fetch data from a user's "Now Playing/Recently Played" list — not currently available for apps                                                                       |
| activities.write                         | allows your app to update a user's activity - not currently available for apps (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)                                |
| applications.builds.read                 | allows your app to read build data for a user's applications                                                                                                                            |
| applications.builds.upload               | allows your app to upload/update builds for a user's applications - requires Discord approval                                                                                           |
| applications.commands                    | allows your app to add commands to a guild - included by default with the `bot` scope                                                       |
| applications.commands.update             | allows your app to update its commands using a Bearer token - client credentials grant only |
| applications.commands.permissions.update | allows your app to update permissions for its commands in a guild a user has permissions to |
| applications.entitlements                | allows your app to read entitlements for a user's applications                                                                                                                          |
| applications.store.update                | allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications                                                                      |
| bot                                      | for oauth2 bots, this puts the bot in the user's selected guild by default                                                                                                              |
| connections                              | allows [/users/@me/connections](#get-current-user-connections) to return linked third-party accounts                                                                |
| dm_channels.read                         | allows your app to see information about the user's DMs and group DMs - requires Discord approval                                                                                       |
| email                                    | enables [/users/@me](#get-current-user) to return an `email`                                                                                                        |
| gdm.join                                 | allows your app to [join users to a group dm](#group-dm-add-recipient)                                                                                           |
| guilds                                   | allows [/users/@me/guilds](#get-current-user-guilds) to return basic information about all of a user's guilds                                                       |
| guilds.join                              | allows [/guilds/{guild.id}/members/{user.id}](#add-guild-member) to be used for joining users to a guild                                                           |
| guilds.members.read                      | allows [/users/@me/guilds/{guild.id}/member](#get-current-user-guild-member) to return a user's member information in a guild                                       |
| identify                                 | allows [/users/@me](#get-current-user) without `email`                                                                                                              |
| messages.read                            | for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates) |
| relationships.read                       | allows your app to know a user's friends and implicit relationships - requires Discord approval                                                                                         |
| role_connections.write                   | allows your app to update a user's connection and metadata for the app                                                                                                                  |
| rpc                                      | for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval                                                                       |
| rpc.activities.write                     | for local rpc server access, this allows you to update a user's activity - requires Discord approval                                                                                    |
| rpc.notifications.read                   | for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval                                                                |
| rpc.voice.read                           | for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval                                                    |
| rpc.voice.write                          | for local rpc server access, this allows you to update a user's voice settings - requires Discord approval                                                                              |
| voice                                    | allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval                                                                          |
| webhook.incoming                         | this generates a webhook that is returned in the oauth token response for authorization code grants                                                                                     |

#### Application Command Object

| Field                      | Type                                                                                  | Description                                                                                               | Valid Types |
|----------------------------|---------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|-------------|
| id                         | snowflake                                                                             | Unique ID of command                                                                                      | all         |
| type?                      | number                                                                                | [Type of command](#application-command-types), defaults to `1`                                            | all         |
| application_id             | snowflake                                                                             | ID of the parent application                                                                              | all         |
| guild_id?                  | snowflake                                                                             | Guild ID of the command, if not global                                                                    | all         |
| name                       | string                                                                                | Name of command, 1-32 characters                                                                          | all         |
| name_localizations?        | ?dictionary with keys in available locales                                             | Localization dictionary for `name` field. Values follow the same restrictions as `name`                   | all         |
| description                | string                                                                                | Description for `CHAT_INPUT` commands, 1-100 characters. Empty string for `USER` and `MESSAGE` commands   | all         |
| description_localizations? | ?dictionary with keys in available locales                                             | Localization dictionary for `description` field. Values follow the same restrictions as `description`      | all         |
| options?                   | array of [application command option](#application-command-option-structure)           | Parameters for the command, max of 25                                                                      | CHAT_INPUT  |
| default_member_permissions | ?string                                                                                | Set of permissions represented as a bit set                                                                | all         |
| dm_permission?             | boolean                                                                                | Indicates whether the command is available in DMs with the app, only for globally-scoped commands         | all         |
| default_permission?        | ?boolean                                                                               | Not recommended for use as field will soon be deprecated. Indicates whether the command is enabled by default when the app is added to a guild, defaults to `true` | all         |
| nsfw?                      | boolean                                                                                | Indicates whether the command is age-restricted, defaults to `false`                                       | all         |
| version                    | snowflake                                                                              | Autoincrementing version identifier updated during substantial record changes                              | all         |

> `default_permission` will soon be deprecated. You can instead set `default_member_permissions` to `"0"` to disable the command for everyone except admins by default, and/or set `dm_permission` to `false` to disable globally-scoped commands inside of DMs with your app

#### Application Command Types

| Name       | Type | Description                                                               |
|------------|------|---------------------------------------------------------------------------|
| CHAT_INPUT | 1    | Slash commands; a text-based command that shows up when a user types `/`  |
| USER       | 2    | A UI-based command that shows up when you right click or tap on a user    |
| MESSAGE    | 3    | A UI-based command that shows up when you right click or tap on a message |


#### Application Command Option Structure
> Required `options` must be listed before optional options

| Field                      | Type                                                                                       | Description        |
|----------------------------|--------------------------------------------------------------------------------------------|--------------------|
| type                       | one of [application command option type](#application-command-option-type)                 | Type of option     |
| name                       | string                                                                                                                                                       | 1-32 character name |
| name_localizations?        | ?dictionary with keys in available locales                                                 | Localization dictionary for the `name` field. Values follow the same restrictions as `name` |
| description                | string                                                                                                                                                       | 1-100 character description                                                                                          |
| description_localizations? | ?dictionary with keys in available locales                                                    | Localization dictionary for the `description` field. Values follow the same restrictions as `description`            |
| required?                  | boolean                                        | If the parameter is required or optional--default `false` |
| choices?                   | array of [application command option choice](#application-command-option-choice-structure) | Choices for `STRING`, `INTEGER`, and `NUMBER` types for the user to pick from, max 25 |
| options?                   | array of [application command option](#application-command-option-structure)               | If the option is a subcommand or subcommand group type, these nested options will be the parameters  |
| channel_types?             | array of [channel types](#channel-types)       | If the option is a channel type, the channels shown will be restricted to these types                                |
| min_value?                 | number for `INTEGER` options, double for `NUMBER` options                    | If the option is an `INTEGER` or `NUMBER` type, the minimum value permitted                                          |
| max_value?                 | number for `INTEGER` options, double for `NUMBER` options                   | If the option is an `INTEGER` or `NUMBER` type, the maximum value permitted |
| min_length?                | number        | For option type `STRING`, the minimum allowed length (minimum of `0`, maximum of `6000`) |
| max_length?                | number       | For option type `STRING`, the maximum allowed length (minimum of `1`, maximum of `6000`) |
| autocomplete? \*           | boolean       | If autocomplete interactions are enabled for this `STRING`, `INTEGER`, or `NUMBER` type option |

\* `autocomplete` may not be set to true if `choices` are present.  
> Options using `autocomplete` are not confined to only use choices given by the application.

#### Application Command Option Type

| Name              | Value | Note                                                           |
|-------------------|-------|----------------------------------------------------------------|
| SUB_COMMAND       | 1     |                                                                |
| SUB_COMMAND_GROUP | 2     |                                                                |
| STRING            | 3     |                                                                |
| INTEGER           | 4     | Any integer between -2^53 and 2^53                             |
| BOOLEAN           | 5     |                                                                |
| USER              | 6     |                                                                |
| CHANNEL           | 7     | Includes all channel types + categories                        |
| ROLE              | 8     |                                                                |
| MENTIONABLE       | 9     | Includes users and roles                                       |
| NUMBER            | 10    | Any double between -2^53 and 2^53                              |
| ATTACHMENT        | 11    | [attachment](#attachment-object) object |

#### Application Command Option Choice Structure

If you specify `choices` for an option, they are the **only** valid values for a user to pick

| Field               | Type                                                                  | Description                                                                                 |
|---------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| name                | string                                                                | 1-100 character choice name                                                                 |
| name_localizations? | ?dictionary with keys in available locales | Localization dictionary for the `name` field. Values follow the same restrictions as `name` |
| value               | string, integer, or double \*                                         | Value for the choice, up to 100 characters if string                                        |

\* Type of `value` depends on the [option type](#application-command-option-type) that the choice belongs to.

#### Application Command Permissions Object

Returned when fetching the permissions for an app's command(s) in a guild.

| Field          | Type                                                                                                                                                                 | Description                                          |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| id             | snowflake                                                                                                                                                            | ID of the command or the application ID              |
| application_id | snowflake                                                                                                                                                            | ID of the application the command belongs to         |
| guild_id       | snowflake                                                                                                                                                            | ID of the guild                                      |
| permissions    | array of [application command permissions](#application-command-permissions-structure) | Permissions for the command in the guild, max of 100 |

When the `id` field is the application ID instead of a command ID, the permissions apply to all commands that do not contain explicit overwrites.

#### Application Command Permissions Structure

Application command permissions allow you to enable or disable commands for specific users, roles, or channels within a guild.

| Field      | Type                                                                        | Description                                      |
|------------|-----------------------------------------------------------------------------|--------------------------------------------------|
| id         | snowflake                                                                   | ID of the role, user, or channel. It can also be [permission constant](#application-command-permissions-constants) |
| type       | [application command permission type](#application-command-permission-type) | role (`1`), user (`2`), or channel (`3`)         |
| permission | boolean                                                                     | `true` to allow, `false`, to disallow            |

#### Application Command Permissions Constants

The following constants can be used in the `id` field for command permissions payloads.

| Permission   | Value          | Type      | Description             |
|--------------|----------------|-----------|-------------------------|
| `@everyone`  | `guild_id`     | snowflake | All members in a guild  |
| All Channels | `guild_id - 1` | snowflake | All channels in a guild |

#### Application Command Permission Type

| Name    | Value |
|---------|-------|
| ROLE    | 1     |
| USER    | 2     |
| CHANNEL | 3     |

#### Entitlement Object

| Field          | Type              | Description                                                                                 |
|----------------|-------------------|---------------------------------------------------------------------------------------------|
| id             | snowflake         | ID of the entitlement                                                                       |
| sku_id         | snowflake         | ID of the SKU                                                                               |
| application_id | snowflake         | ID of the parent application                                                                |
| user_id?       | snowflake         | ID of the user that is granted access to the entitlement's sku                              |
| type           | number            | [Type of entitlement](#entitlement-types)                                                   |
| deleted        | boolean           | Entitlement was deleted                                                                     |
| starts_at?     | ISO8601 timestamp | Start date at which the entitlement is valid. Not present when using test entitlements.     |
| ends_at?       | ISO8601 timestamp | Date at which the entitlement is no longer valid. Not present when using test entitlements. |
| guild_id?      | snowflake         | ID of the guild that is granted access to the entitlement's sku                             |

##### Entitlement Example

```json
{
    "id": "1019653849998299136",
    "sku_id": "1019475255913222144",
    "application_id": "1019370614521200640",
    "user_id": "771129655544643584",
    "promotion_id": null,
    "type": 8,
    "deleted": false,
    "gift_code_flags": 0,
    "consumed": false,
    "starts_at": "2022-09-14T17:00:18.704163+00:00",
    "ends_at": "2022-10-14T17:00:18.704163+00:00",
    "guild_id": "1015034326372454400",
    "subscription_id": "1019653835926409216"
}
```

#### Entitlement Types

| Type                     | Value | Description                                      |
|--------------------------|-------|--------------------------------------------------|
| APPLICATION_SUBSCRIPTION | 8     | Entitlement was purchased as an app subscription |

#### SKU Object

| Field          | Type      | Description                                       |
|----------------|-----------|---------------------------------------------------|
| id             | snowflake | ID of SKU                                         |
| type           | number    | [Type of SKU](#sku-types)                         |
| application_id | snowflake | ID of the parent application                      |
| name           | string    | Customer-facing name of your premium offering     |
| slug           | string    | System-generated URL slug based on the SKU's name |
| flags          | number    | [SKU flags](#sku-flags) combined as a bitfield    |

##### SKU Example

```json
{
    "id": "1088510058284990888",
    "type": 5,
    "dependent_sku_id": null,
    "application_id": "788708323867885999",
    "manifest_labels": null,
    "access_type": 1,
    "name": "Test Premium",
    "features": [],
    "release_date": null,
    "premium": false,
    "slug": "test-premium",
    "flags": 128,
    "show_age_gate": false
}
```

#### SKU Types

For subscriptions, SKUs will have a type of either `SUBSCRIPTION` represented by `type: 5` or `SUBSCRIPTION_GROUP` represented by `type:6`. For any current implementations, you will want to use the SKU defined by `type: 5`. A `SUBSCRIPTION_GROUP` is automatically created for each `SUBSCRIPTION` SKU and are not used at this time.

| Type               | Value | Description                                              |
|--------------------|-------|----------------------------------------------------------|
| SUBSCRIPTION       | 5     | Represents a recurring subscription                      |
| SUBSCRIPTION_GROUP | 6     | System-generated group for each SUBSCRIPTION SKU created |

#### SKU Flags

For subscriptions, there are two types of access levels you can offer to users:

-   **Guild Subscriptions**: A subscription purchased by a user and applied to a single server. Everyone in that server gets your premium benefits.
-   **User Subscriptions**: A subscription purchased by a user for themselves. They get access to your premium benefits in every server.

The `flags` field can be used to differentiate user and server subscriptions with a bitwise `&&` operator.

| Type               | Value  | Description                                                                                                               |
|--------------------|--------|---------------------------------------------------------------------------------------------------------------------------|
| AVAILABLE          | 1 << 2 | SKU is available for purchase                                                                                             |
| GUILD_SUBSCRIPTION | 1 << 7 | Recurring SKU that can be purchased by a user and applied to a single server. Grants access to every user in that server. |
| USER_SUBSCRIPTION  | 1 << 8 | Recurring SKU purchased by a user for themselves. Grants access to the purchasing user in every server.                   |

#### Audit Log Object

| Field                  | Type                                                                    | Description                             |
|------------------------|-------------------------------------------------------------------------|-----------------------------------------|
| application_commands   | array of [application commands](#application-command-object) objects    | List of application commands referenced in the audit log    |
| audit_log_entries      | array of [audit log entry](#audit-log-entry-object) objects             | List of audit log entries, sorted from most to least recent |
| auto_moderation_rules  | array of [auto moderation rule](#auto-moderation-rule-object) objects   | List of auto moderation rules referenced in the audit log   |
| guild_scheduled_events | array of [guild scheduled event](#guild-scheduled-event-object) objects | List of guild scheduled events referenced in the audit log  |
| integrations           | array of partial [integration](#integration-object) objects             | List of partial integration objects                         |
| threads                | array of thread-specific [channel](#channel-object) objects             | List of threads referenced in the audit log\*               |
| users                  | array of [user](#user-object) objects                                   | List of users referenced in the audit log                   |
| webhooks               | array of [webhook](#webhook-object) objects                             | List of webhooks referenced in the audit log                |  
\* Threads referenced in `THREAD_CREATE` and `THREAD_UPDATE` events are included in the threads map since archived threads might not be kept in memory by clients.

###### Example Partial Integration Object

```json
{
  "id": "33590653072239123",
  "name": "A Name",
  "type": "twitch",
  "account": {
    "name": "twitchusername",
    "id": "1234567"
  },
  "application_id": "94651234501213162"
}
```

### Audit Log Entry Object

| Field       | Type                                                          | Description                                           |
|-------------|---------------------------------------------------------------|-------------------------------------------------------|
| target_id   | ?string                                                       | ID of the affected entity (webhook, user, role, etc.) |
| changes?    | array of [audit log change](#audit-log-change-object) objects | Changes made to the target_id                         |
| user_id     | ?snowflake                                                    | User or app that made the changes                     |
| id          | snowflake                                                     | ID of the entry                                       |
| action_type | [audit log event](#audit-log-events)                          | Type of action that occurred                          |
| options?    | [optional audit entry info](#optional-audit-entry-info)       | Additional info for certain event types               |
| reason?     | string                                                        | Reason for the change (1-512 characters)              |

> For `APPLICATION_COMMAND_PERMISSION_UPDATE` events, the `target_id` is the command ID or the app ID since the `changes` array represents the entire `permissions` property on the [guild permissions](#guild-application-command-permissions-structure) object.

#### Audit Log Events

The table below lists audit log events and values (the `action_type` field) that your app may receive.

The **Object Changed** column notes which object's values may be included in the entry. Though there are exceptions, possible keys in the `changes` array typically correspond to the object's fields. The descriptions and types for those fields can be found in the linked documentation for the object.

**If no object is noted, there won't be a `changes` array in the entry, though other fields like the `target_id` still exist and many have fields in the [`options` array](#optional-audit-entry-info).**

> info
> You should assume that your app may run into any field for the changed object, though none are guaranteed to be present. In most cases only a subset of the object's fields will be in the `changes` array.

| Event                                       | Value | Description                                               | Object Changed                                                                                                                                   |
|---------------------------------------------|-------|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| GUILD_UPDATE                                | 1     | Server settings were updated                              | [Guild](#guild-object)                                                                                                      |
| CHANNEL_CREATE                              | 10    | Channel was created                                       | [Channel](#channel-object)                                                                                                |
| CHANNEL_UPDATE                              | 11    | Channel settings were updated                             | [Channel](#channel-object)                                                                                                |
| CHANNEL_DELETE                              | 12    | Channel was deleted                                       | [Channel](#channel-object)                                                                                                |
| CHANNEL_OVERWRITE_CREATE                    | 13    | Permission overwrite was added to a channel               | [Channel Overwrite](#overwrite-object)                                                                                    |
| CHANNEL_OVERWRITE_UPDATE                    | 14    | Permission overwrite was updated for a channel            | [Channel Overwrite](#overwrite-object)                                                                                    |
| CHANNEL_OVERWRITE_DELETE                    | 15    | Permission overwrite was deleted from a channel           | [Channel Overwrite](#overwrite-object)                                                                                    |
| MEMBER_KICK                                 | 20    | Member was removed from server                            |     |
| MEMBER_PRUNE                                | 21    | Members were pruned from server                           |   |
| MEMBER_BAN_ADD                              | 22    | Member was banned from server                             |    |
| MEMBER_BAN_REMOVE                           | 23    | Server ban was lifted for a member                        |    |
| MEMBER_UPDATE                               | 24    | Member was updated in server                              | [Member](#guild-member-object)                                                                                              |
| MEMBER_ROLE_UPDATE                          | 25    | Member was added or removed from a role                   | [Partial Role](#role-object)\*                                                                                           |
| MEMBER_MOVE                                 | 26    | Member was moved to a different voice channel             |       |
| MEMBER_DISCONNECT                           | 27    | Member was disconnected from a voice channel              |         |
| BOT_ADD                                     | 28    | Bot user was added to server                              |    |
| ROLE_CREATE                                 | 30    | Role was created                                          | [Role](#role-object)                                                                                                     |
| ROLE_UPDATE                                 | 31    | Role was edited                                           | [Role](#role-object)                                                                                                     |
| ROLE_DELETE                                 | 32    | Role was deleted                                          | [Role](#role-object)                                                                                                     |
| INVITE_CREATE                               | 40    | Server invite was created                                 | [Invite](#invite-object) and [Invite Metadata](#invite-metadata-object)*                             |
| INVITE_UPDATE                               | 41    | Server invite was updated                                 | [Invite](#invite-object) and [Invite Metadata](#invite-metadata-object)*                             |
| INVITE_DELETE                               | 42    | Server invite was deleted                                 | [Invite](#invite-object) and [Invite Metadata](#invite-metadata-object)*                             |
| WEBHOOK_CREATE                              | 50    | Webhook was created                                       | [Webhook](#webhook-object)\*                                                                                              |
| WEBHOOK_UPDATE                              | 51    | Webhook properties or channel were updated                | [Webhook](#webhook-object)\*                                                                                              |
| WEBHOOK_DELETE                              | 52    | Webhook was deleted                                       | [Webhook](#webhook-object)\*                                                                                              |
| EMOJI_CREATE                                | 60    | Emoji was created                                         | [Emoji](#emoji-object)                                                                                                      |
| EMOJI_UPDATE                                | 61    | Emoji name was updated                                    | [Emoji](#emoji-object)                                                                                                      |
| EMOJI_DELETE                                | 62    | Emoji was deleted                                         | [Emoji](#emoji-object)                                                                                                      |
| MESSAGE_DELETE                              | 72    | Single message was deleted                                |      |
| MESSAGE_BULK_DELETE                         | 73    | Multiple messages were deleted                            |  |
| MESSAGE_PIN                                 | 74    | Message was pinned to a channel                           |   |
| MESSAGE_UNPIN                               | 75    | Message was unpinned from a channel                       |  |
| INTEGRATION_CREATE                          | 80    | App was added to server                                   | [Integration](#integration-object)                                                                                          |
| INTEGRATION_UPDATE                          | 81    | App was updated (as an example, its scopes were updated)  | [Integration](#integration-object)                                                                                          |
| INTEGRATION_DELETE                          | 82    | App was removed from server                               | [Integration](#integration-object)                                                                                          |
| STAGE_INSTANCE_CREATE                       | 83    | Stage instance was created (stage channel becomes live)   | [Stage Instance](#stage-instance-object)                                                                           |
| STAGE_INSTANCE_UPDATE                       | 84    | Stage instance details were updated                       | [Stage Instance](#stage-instance-object)                                                                           |
| STAGE_INSTANCE_DELETE                       | 85    | Stage instance was deleted (stage channel no longer live) | [Stage Instance](#stage-instance-object)                                                                           |
| STICKER_CREATE                              | 90    | Sticker was created                                       | [Sticker](#sticker-object)                                                                                                |
| STICKER_UPDATE                              | 91    | Sticker details were updated                              | [Sticker](#sticker-object)                                                                                                |
| STICKER_DELETE                              | 92    | Sticker was deleted                                       | [Sticker](#sticker-object)                                                                                                |
| GUILD_SCHEDULED_EVENT_CREATE                | 100   | Event was created                                         | [Guild Scheduled Event](#guild-scheduled-event-object)                                                      |
| GUILD_SCHEDULED_EVENT_UPDATE                | 101   | Event was updated                                         | [Guild Scheduled Event](#guild-scheduled-event-object)                                                      |
| GUILD_SCHEDULED_EVENT_DELETE                | 102   | Event was cancelled                                       | [Guild Scheduled Event](#guild-scheduled-event-object)                                                      |
| THREAD_CREATE                               | 110   | Thread was created in a channel                           | [Thread](#thread-metadata-object)                                                                                         |
| THREAD_UPDATE                               | 111   | Thread was updated                                        | [Thread](#thread-metadata-object)                                                                                         |
| THREAD_DELETE                               | 112   | Thread was deleted                                        | [Thread](#thread-metadata-object)                                                                                         |
| APPLICATION_COMMAND_PERMISSION_UPDATE       | 121   | Permissions were updated for a command                    | [Command Permission](#application-command-permissions-structure)\* |
| AUTO_MODERATION_RULE_CREATE                 | 140   | Auto Moderation rule was created                          | [Auto Moderation Rule](#auto-moderation-rule-object)                                                              |
| AUTO_MODERATION_RULE_UPDATE                 | 141   | Auto Moderation rule was updated                          | [Auto Moderation Rule](#auto-moderation-rule-object)                                                              |
| AUTO_MODERATION_RULE_DELETE                 | 142   | Auto Moderation rule was deleted                          | [Auto Moderation Rule](#auto-moderation-rule-object)                                                              |
| AUTO_MODERATION_BLOCK_MESSAGE               | 143   | Message was blocked by Auto Moderation                    |      |
| AUTO_MODERATION_FLAG_TO_CHANNEL             | 144   | Message was flagged by Auto Moderation                    |     |
| AUTO_MODERATION_USER_COMMUNICATION_DISABLED | 145   | Member was timed out by Auto Moderation                   |      |
| CREATOR_MONETIZATION_REQUEST_CREATED        | 150   | Creator monetization request was created                  |        |
| CREATOR_MONETIZATION_TERMS_ACCEPTED         | 151   | Creator monetization terms were accepted                  |     |

\* Object has exception(s) to available keys. See the [exceptions](#audit-log-change-exceptions) section below for details.

#### Optional Audit Entry Info

| Field                             | Type      | Description                                                      | Event Types                                                                                                                                                                                                                                        |
|-----------------------------------|-----------|------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| application_id                    | snowflake | ID of the app whose permissions were targeted                    | APPLICATION_COMMAND_PERMISSION_UPDATE                                                                                                                                                                                                              |
| auto_moderation_rule_name         | string    | Name of the Auto Moderation rule that was triggered              | AUTO_MODERATION_BLOCK_MESSAGE & AUTO_MODERATION_FLAG_TO_CHANNEL & AUTO_MODERATION_USER_COMMUNICATION_DISABLED                                                                                                                                      |
| auto_moderation_rule_trigger_type | string    | Trigger type of the Auto Moderation rule that was triggered      | AUTO_MODERATION_BLOCK_MESSAGE & AUTO_MODERATION_FLAG_TO_CHANNEL & AUTO_MODERATION_USER_COMMUNICATION_DISABLED                                                                                                                                      |
| channel_id                        | snowflake | Channel in which the entities were targeted                      | MEMBER_MOVE & MESSAGE_PIN & MESSAGE_UNPIN & MESSAGE_DELETE & STAGE_INSTANCE_CREATE & STAGE_INSTANCE_UPDATE & STAGE_INSTANCE_DELETE & AUTO_MODERATION_BLOCK_MESSAGE & AUTO_MODERATION_FLAG_TO_CHANNEL & AUTO_MODERATION_USER_COMMUNICATION_DISABLED |
| count                             | string    | Number of entities that were targeted                            | MESSAGE_DELETE & MESSAGE_BULK_DELETE & MEMBER_DISCONNECT & MEMBER_MOVE                                                                                                                                                                             |
| delete_member_days                | string    | Number of days after which inactive members were kicked          | MEMBER_PRUNE                                                                                                                                                                                                                                       |
| id                                | snowflake | ID of the overwritten entity                                     | CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE                                                                                                                                                                     |
| members_removed                   | string    | Number of members removed by the prune                           | MEMBER_PRUNE                                                                                                                                                                                                                                       |
| message_id                        | snowflake | ID of the message that was targeted                              | MESSAGE_PIN & MESSAGE_UNPIN                                                                                                                                                                                                                        |
| role_name                         | string    | Name of the role if type is `"0"` (not present if type is `"1"`) | CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE                                                                                                                                                                     |
| type                              | string    | Type of overwritten entity - role (`"0"`) or member (`"1"`)      | CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE                                                                                                                                                                     |
| integration_type                  | string    | The type of integration which performed the action               | MEMBER_KICK & MEMBER_ROLE_UPDATE                                                                                                                                                                                                                   |

#### Audit Log Change Object
**Many audit log events include a `changes` array in their [entry object](#audit-log-entry-structure).**  
The [structure for the individual changes](#audit-log-change-structure) varies based on the event type and its changed objects, so apps shouldn't depend on a single pattern of handling audit log events.

#### Audit Log Change Structure
**Some events don't follow the same pattern as other audit log events.**  

> If `new_value` is not present in the change object while `old_value` is, it indicates that the property has been reset or set to `null`. If `old_value` isn't included, it indicated that the property was previously `null`.


| Field      | Type                                | Description                                                                       |
|------------|-------------------------------------|-----------------------------------------------------------------------------------|
| new_value? | mixed (matches object field's type) | New value of the key                                                              |
| old_value? | mixed (matches object field's type) | Old value of the key                                                              |
| key        | string                              | Name of the changed entity, with a few [exceptions](#audit-log-change-exceptions) |

#### Audit Log Change Exceptions

For most objects, the change keys may be any field on the changed object. The following table details the exceptions to this pattern.

| Object Changed                                             | Change Key Exceptions                                    | Change Object Exceptions                                                                                                                                                                                                                                    |
|------------------------------------------------------------|----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Command Permission](#application-command-permissions-structure) | snowflake as key                                         | The `changes` array contains objects with a `key` field representing the entity whose command was affected (role, channel, or user ID), a previous permissions object (with an `old_value` key), and an updated permissions object (with a `new_value` key) |
| [Invite](#invite-object) and [Invite Metadata](#invite-metadata-object) | Additional `channel_id` key (instead of object's `channel.id`) |                                                                                                                                                                                                                                                             |
| [Partial Role](#role-object)                                 | `$add` and `$remove` as keys                             | `new_value` is an array of objects that contain the role `id` and `name`                                                                                                                                                                                    |
| [Webhook](#webhook-object)                                   | `avatar_hash` key (instead of `avatar`)                  |                                                                                                                                                                                                                                                             |

#### Auto Moderation Rule Structure

| Field            | Type                                      | Description                                                             |
|------------------|-------------------------------------------|-------------------------------------------------------------------------|
| id               | snowflake                                 | the id of this rule                                                     |
| guild_id         | snowflake                                 | the id of the guild which this rule belongs to                          |
| name             | string                                    | the rule name                                                           |
| creator_id       | snowflake                                 | the user which first created this rule                                  |
| event_type       | integer                                   | the rule [event type](#event-types)                                     |
| trigger_type     | integer                                   | the rule [trigger type](#trigger-types)                                 |
| trigger_metadata | object                                    | the rule [trigger metadata](#trigger-metadata)                          |
| actions          | array of [action](#audo-moderation-action-object) objects | the actions which will execute when the rule is triggered               |
| enabled          | boolean                                   | whether the rule is enabled                                             |
| exempt_roles     | array of snowflakes                       | the role ids that should not be affected by the rule (Maximum of 20)    |
| exempt_channels  | array of snowflakes                       | the channel ids that should not be affected by the rule (Maximum of 50) |

###### Example Auto Moderation Rule

```json
{
  "id": "969707018069872670",
  "guild_id": "613425648685547541",
  "name": "Keyword Filter 1",
  "creator_id": "423457898095789043",
  "trigger_type": 1,
  "event_type": 1,
  "actions": [
    {
      "type": 1,
      "metadata": { "custom_message": "Please keep financial discussions limited to the #finance channel" }
    },
    {
      "type": 2,
      "metadata": { "channel_id": "123456789123456789" }
    },
    {
      "type": 3,
      "metadata": { "duration_seconds": 60 }
    }
  ],
  "trigger_metadata": {
    "keyword_filter": ["cat*", "*dog", "*ana*", "i like c++"],
    "regex_patterns": ["(b|c)at", "^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$"]
  },
  "enabled": true,
  "exempt_roles": ["323456789123456789", "423456789123456789"],
  "exempt_channels": ["523456789123456789"]
}
```

#### Trigger Types
Characterizes the type of content which can trigger the rule.

| Trigger Type   | Value | Description                                                          | Max per Guild |
|----------------|-------|----------------------------------------------------------------------|---------------|
| KEYWORD        | 1     | check if content contains words from a user defined list of keywords | 6             |
| SPAM           | 3     | check if content represents generic spam                             | 1             |
| KEYWORD_PRESET | 4     | check if content contains words from internal pre-defined wordsets   | 1             |
| MENTION_SPAM   | 5     | check if content contains more unique mentions than allowed          | 1             |

#### Trigger Metadata

Additional data used to determine whether a rule should be triggered. Different fields are relevant based on the
value of [trigger_type](#trigger-types).

| Field                           | Type                                                   | Associated Trigger Types | Description                                                                       |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------|--------------------------|-----------------------------------------------------------------------------------|
| keyword_filter                  | array of strings *                                     | KEYWORD                  | substrings which will be searched for in content (Maximum of 1000)                |
| regex_patterns                  | array of strings **                                    | KEYWORD                  | regular expression patterns which will be matched against content (Maximum of 10) |
| presets                         | array of [keyword preset types](#keyword-preset-types) | KEYWORD_PRESET           | the internally pre-defined wordsets which will be searched for in content         |
| allow_list                      | array of strings ***                                   | KEYWORD, KEYWORD_PRESET  | substrings which should not trigger the rule (Maximum of 100 or 1000)             |
| mention_total_limit             | integer                                                | MENTION_SPAM             | total number of unique role and user mentions allowed per message (Maximum of 50) |
| mention_raid_protection_enabled | boolean                                                | MENTION_SPAM             | whether to automatically detect mention raids                                     |

\* A keyword can be a phrase which contains multiple words. [Wildcard symbols](#keyword-matching-strategies) can be used to customize how each keyword will be matched. Each keyword must be 60 characters or less.

\** Only Rust flavored regex is currently supported, which can be tested in online editors such as [Rustexp](https://rustexp.lpil.uk/). Each regex pattern must be 260 characters or less.

\*** Each `allow_list` keyword can be a phrase which contains multiple words. [Wildcard symbols](#keyword-matching-strategies) can be used to customize how each keyword will be matched. Rules with `KEYWORD` [trigger_type](#trigger-types) accept a maximum of 100 keywords. Rules with `KEYWORD_PRESET` [trigger_type](#trigger-types) accept a maximum of 1000 keywords.

#### Trigger Metadata Field Limits

| Field          | Trigger Type   | MAX ARRAY LENGTH | MAX CHARACTERS PER STRING |
|----------------|----------------|------------------|---------------------------|
| keyword_filter | KEYWORD        | 1000             | 60                        |
| regex_patterns | KEYWORD        | 10               | 260                       |
| allow_list     | KEYWORD        | 100              | 60                        |
| allow_list     | KEYWORD_PRESET | 1000             | 60                        |


#### Keyword Preset Types

| Preset Type    | Value | Description                                                  |
|----------------|-------|--------------------------------------------------------------|
| PROFANITY      | 1     | words that may be considered forms of swearing or cursing    |
| SEXUAL_CONTENT | 2     | words that refer to sexually explicit behavior or activity   |
| SLURS          | 3     | personal insults or words that may be considered hate speech |


#### Event Types

Indicates in what event context a rule should be checked.

| Event Type   | Value | Description                                         |
|--------------|-------|-----------------------------------------------------|
| MESSAGE_SEND | 1     | when a member sends or edits a message in the guild |


##### Keyword Matching Strategies

Use the wildcard symbol (`*`) at the beginning or end of a keyword to define how it should be matched. All keywords are case insensitive.

**Prefix** - word must start with the keyword

| Keyword   | Matches                               |
|-----------|---------------------------------------|
| cat\*     | **cat**ch, **Cat**apult, **CAt**tLE   |
| tra\*     | **tra**in, **tra**de, **TRA**ditional |
| the mat\* | **the mat**rix                        |


**Suffix** - word must end with the keyword

| Keyword   | Matches                             |
|-----------|-------------------------------------|
| \*cat     | wild**cat**, copy**Cat**            |
| \*tra     | ex**tra**, ul**tra**, orches**TRA** |
| \*the mat | brea**the mat**                     |


**Anywhere** - keyword can appear anywhere in the content

| Keyword     | Matches                     |
|-------------|-----------------------------|
| \*cat\*     | lo**cat**ion, edu**Cat**ion |
| \*tra\*     | abs**tra**cted, ou**tra**ge |
| \*the mat\* | brea**the mat**ter          |


**Whole Word** - keyword is a full word or phrase and must be surrounded by whitespace

| Keyword | Matches     |
|---------|-------------|
| cat     | **cat**     |
| train   | **train**   |
| the mat | **the mat** |


#### Auto Moderation Action Object
An action which will execute whenever a rule is triggered.

| Field       | Type                                | Description                                                               |
|-------------|-------------------------------------|---------------------------------------------------------------------------|
| type        | [action type](#action-types)        | the type of action                                                        |
| metadata? * | [action metadata](#action-metadata) | additional metadata needed during execution for this specific action type |

\* Can be omitted based on `type`. See the `Associated Action Types` column in [action metadata](#action-metadata) to understand which `type` values require `metadata` to be set.

#### Action Types

| Action Type        | Value | Description                                                                                                                                                |
|--------------------|-------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BLOCK_MESSAGE      | 1     | blocks a member's message and prevents it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked. |
| SEND_ALERT_MESSAGE | 2     | logs user content to a specified channel                                                                                                                   |
| TIMEOUT            | 3     | timeout user for a specified duration *                                                                                                                    |  
\* A `TIMEOUT` action can only be set up for `KEYWORD` and `MENTION_SPAM` rules. The `MODERATE_MEMBERS` permission is required to use the `TIMEOUT` action type.


#### Action Metadata
Additional data used when an action is executed. Different fields are relevant based on the
value of [action type](#action-types).

| Field            | Type      | Associated Action Types | Description                                                                            | Constraints                          |
|------------------|-----------|-------------------------|----------------------------------------------------------------------------------------|--------------------------------------|
| channel_id       | snowflake | SEND_ALERT_MESSAGE      | channel to which user content should be logged                                         | existing channel                     |
| duration_seconds | integer   | TIMEOUT                 | timeout duration in seconds                                                            | maximum of 2419200 seconds (4 weeks) |
| custom_message?  | string    | BLOCK_MESSAGE           | additional explanation that will be shown to members whenever their message is blocked | maximum of 150 characters            |
