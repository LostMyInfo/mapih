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
Choose **one** of the following methods to authenticate:

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
- [Applications](#applications)
  - [getMe](#get-current-application)
  - [updateMe](#edit-current-application)
  - [appRoleConnectionMeta](#get-application-role-connection-metadata-records)
  - [updateAppRoleConnectionMeta](#update-application-role-connection-metadata-records)
  - [commands](#application-commands)
    - [retrieve](#get-application-command)
    - [getAll](#get-application-commands)
    - [create](#create-application-command)
    - [update](#edit-application-command)
    - [destroy](#delete-application-command)
    - [bulkOverwrite](#bulk-overwrite-application-commands)
    - [retrievePermissions](#get-application-command-permissions)
    - [getAllPermissions](#get-guild-application-command-permissions)
    - [updatePermissions](#edit-application-command-permissions)
  - [entitlements](#application-entitlements)
    - [getAll](#list-entitlements)
    - [create](#create-test-entitlement)
    - [destroy](#delete-test-entitlement)
  - [skus](#application-skus)
    - [getAll](#list-skus)
- [Audit Log](#audit-log)
  - [retrieve](#get-guild-audit-log)
- [Auto Moderation](#auto-moderation)
  - [retrieveRule](#get-auto-moderation-rule)
  - [getAllRules](#list-auto-moderation-rules)
  - [createRule](#create-auto-moderation-rule)
  - [updateRule](#modify-auto-moderation-rule)
  - [destroyRule](#destroy-auto-moderation-rule)
- [Channels](#channel)
  - [retrieve](#get-channel)
  - [update](#modify-channel)
  - [destroy](#delete-channel)
  - [updatePermissions](#edit-channel-permissions)
  - [deletePermissions](#delete-channel-permissions)
  - [getinvites](#get-channel-invites)
  - [inviteCreate](#create-channel-invite)
  - [typingCreate](#trigger-typing-indicator)
  - [followAnnouncementChannel](#follow-announcement-channel)
  - [groupDMadd](#group-dm-add-recipient)
  - [groupDMremove](#group-dm-remove-recipient)
  - [messages](#channel-messages)
    - [retrieve](#get-channel-message)
    - [getAll](#get-channel-messages)
    - [create](#create-message)
    - [update](#edit-message)
    - [destroy](#delete-message)
    - [bulkDelete](#bulk-delete-messages)
    - [crosspost](#crosspost-message)
    - [pin](#pin-message)
    - [unpin](#unpin-message)
    - [getPinned](#get-pinned-messages)
  - [threads](#channel-threads)
    - [forumThreadCreate](#start-thread-in-forum-channel)
    - [createFromMessage](#start-thread-from-message)
    - [createWithoutMessage](#start-thread-without-message)
    - [join](#join-thread)
    - [leave](#leave-thread)
    - [addMember](#add-thread-member)
    - [removeMember](#remove-thread-member)
    - [retrieveMember](#get-thread-member)
    - [getAllMembers](#list-thread-members)
    - [getAllPublicArchived](#list-public-archived-threads)
    - [getAllPrivateArchived](#list-private-archived-threads)
    - [getAllJoinedPrivateArchived](#list-joined-private-archived-threads)
  - [reactions](#channel-reactions)
    - [create](#create-reaction)
    - [deleteOwn](#delete-own-reaction)
    - [deleteUser](#delete-user-reaction)
    - [deleteAll](#delete-all-reactions)
    - [deleteAllEmoji](#delete-all-reactions-for-emoji)
    - [getUsers](#get-reactions)
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
  - [updateMFAlevel](#modify-guild-mfa-level)
  - [getPruneCount](#get-guild-prune-count)
  - [beginPrune](#begin-guild-prune)
  - [getVoiceRegions](#get-guild-voice-regions)
  - [getAllIntegrations](#get-guild-integrations)
  - [destroyIntegration](#delete-guild-integration)
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
    - [updatePositions](#modify-guild-channel-positions)
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
    - [timeout](#timeout-guild-member)
  - [roles](#guild-roles)
    - [retrieve](#get-guild-role)
    - [getAll](#get-guild-roles)
    - [create](#create-guild-role)
    - [update](#modify-guild-role)
    - [destroy](#delete-guild-role)
    - [updatePositions](#modify-guild-role-positions)
  - [emojis](#guild-emojis)
    - [retrieve](#get-guild-emoji)
    - [getAll](#list-guild-emojis)
    - [create](#create-guild-emoji)
    - [update](#modify-guild-emoji)
    - [destroy](#delete-guild-emoji)
  - [stickers](#guild-stickers)
    - [retrieve](#get-sticker)
    - [nitroPacks](#list-nitro-sticker-packs)
    - [getAll](#list-guild-stickers)
    - [retrieveGuild](#get-guild-sticker)
    - [create](#create-guild-sticker)
    - [update](#modify-guild-sticker)
    - [destroy](#delete-guild-sticker)
  - [events](#guild-events)
    - [retrieve](#get-guild-scheduled-event)
    - [getAll](#list-scheduled-events-for-guild)
    - [getUsers](#get-guild-scheduled-event-users)
    - [create](#create-guild-scheduled-event)
    - [update](#modify-guild-scheduled-event)
    - [destroy](#delete-guild-scheduled-event)
  - [templates](#guild-templates)
    - [retrieve](#get-guild-template)
    - [getAll](#get-guild-templates)
    - [create](#create-guild-template)
    - [createGuild](#create-guild-from-guild-template)
    - [sync](#sync-guild-templates)
    - [update](#modify-guild-template)
    - [destroy](#delete-guild-template)
- [Interactions](#interactions)
  - [callback](#interaction-callbacks)
    - [reply](#create-interaction-response)
    - [defer](#defer-interaction-response)
    - [get_original](#get-original-interaction-response)
    - [update_original](#edit-original-interaction-response)
    - [delete_original](#delete-original-interaction-response)
    - [component_defer](#component-defer)
    - [component_update](#component-update)
    - [autocomplete_reply](#autocomplete-reply)
    - [modal_reply](#modal-reply)
    - [upgrade](#premium-required)
  - [followup](#interaction-followups)
    - [retrieve](#get-followup-message)
    - [create](#create-followup-message)
    - [update](#edit-followup-message)
    - [destroy](#delete-followup-message)
- [Invites](#invites)
  - [retrieve](#get-invite)
  - [revoke](#delete-invite)
- [OAuth 2](#oauth2)
- [Stage Instances](#stage-instance)
  - [retrieve](#get-stage-instance)
  - [create](#create-stage-instance)
  - [update](#modify-stage-instance)
  - [destroy](#delete-stage-instance)
- [Users](#users)
  - [retrieve](#get-user)
  - [currentUser](#get-current-user)
  - [myGuilds](#get-current-user-guilds)
  - [currentMember](#get-current-user-guild-member)
  - [updateCurrent](#modify-current-user)
  - [connections](#get-user-connections)
  - [appRoleConnection](#get-user-application-role-connection)
  - [updateAppRoleConnection](#update-user-application-role-connection)
  - [createDM](#create-dm)
  - [createGroupDM](#create-group-dm)
  - [leaveGuild](#leave-guild)
- [Webhooks](#webhooks)
  - [retrieve](#get-webhook)
  - [retrieveWithToken](#get-webhook-with-token)
  - [retrieveChannel](#get-channel-webhooks)
  - [retrieveGuild](#get-guild-webhooks)
  - [retrieveMessage](#get-webhook-message)
  - [updateMessage](#edit-webhook-message)
  - [destroyMessage](#delete-webhook-message)
  - [create](#create-webhook)
  - [update](#modify-webhook)
  - [updateWithToken](#modify-webhook-with-token)
  - [destroy](#delete-webhook)
  - [destroyWithToken](#delete-webhook-with-token)
  - [execute](#execute-webhook)
- [Objects/Types](#objects-and-types)

---

# Guild
**All functions relating to Discord Guilds (servers)**

| Method                                                 | Description                                                      |
|--------------------------------------------------------|------------------------------------------------------------------|
| [`retrieve`](#get-guild)                               | Get information about a guild                                    |
| [`create`](#create-guild)                              | Create a new guild                                               |
| [`update`](#update-existing-guild)                     | Modify a guild's settings                                        |
| [`destroy`](#delete-guild)                               Delete a guild                                                   |
| [`getPreview`](#get-guild-preview)                     | Get the guild's preview                                          |
| [`retrieveBan`](#get-guild-ban)                        | Get guild ban with given id                                      |
| [`getAllBans`](#get-guild-bans)                        | Get all guild bans                                               |
| [`createBan`](#create-guild-ban)                       | Create a new guild ban                                           |
| [`destroyBan`](#remove-guild-ban)                      | Delete a guild ban                                               |
| [`getInvites`](#get-guild-invites)                     | Get all guild invites                                            |
| [`updateMFAlevel`](#modify-guild-mfa-level)            | Modify the guild's MFA level                                     |
| [`getPruneCount`](#get-guild-prune-count)              | Get number of members that would be removed in a prune operation |
| [`beginPrune`](#begin-guild-prune)                     | Begin a prune operation                                          |
| [`getVoiceRegions`](#get-guild-voice-regions)          | Get all voice regions for the guild                              |
| [`getAllIntegrations`](#get-guild-integrations)        | Get all guild integrations                                       |
| [`destroyIntegration`](#delete-guild-integrations)     | Delete a guild integration                                       |
| [`retrieveWidget`](#get-guild-widget)                  | Get the guild's widget                                           |
| [`retrieveWidgetSettings`](#get-guild-widget-settings) | Get the guild's widget settings                                  |
| [`retrieveWidgetImage`](#get-guild-widget-image)       | Get the guild's widget image                                     |
| [`updateWidget`](#modify-guild-widget)                 | Modify the guild's widget                                        |
| [`retrieveVanityURL`](#get-guild-vanity-url)           | Get the guild's vanity url                                       |
| [`retrieveWelcomeScreen`](#get-guild-welcome-screen)   | Get the guild's welcome screen                                   |
| [`updateWelcomeScreen`](#modify-guild-welcome-screen)  | Modify the guild's welcome screen                                |
| [`retrieveOnboarding`](#get-guild-onboarding)          | Get the guild's onboarding                                       |
| [`updateOnboarding`](#modify-guild-onboarding)         | Modify the guild's onboarding                                    |
| [`newMemberWelcome`](#new-member-welcome)              | * undocumented                                                   |

### [Get Guild](https://discord.com/developers/docs/resources/guild#get-guild)

#### Parameters
| Field        | Type      | Description                            |
|--------------|-----------|----------------------------------------|
| guild_id     | snowflake | the id of the guild                    |
| with_counts? | boolean   | Approcimate member and presence counts |

#### Example
```javascript
await api.discord.guilds.retrieve({
  guild_id: '0000000000'
});
```

### [Create Guild](https://discord.com/developers/docs/resources/guild#create-guild)
**This endpoint can be used only by bots in less than 10 servers.**

#### Parameters
| Field                          | Type                                                       | Description                                                               |
|--------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------|
| name                           | string                                                     | Name of the guild (2-100 characters)                                      |
| icon?                          | string/buffer                                              | Guild icon (url to image or image buffer)                                 |
| roles?                         | array of [Role](#role-object) objects                      | Roles to add to the guild                                                 |
| channels?                      | array of [PartialChannel](#partial-channel-object) objects | Channels to add to the guild                                              |
| verification_level?            | number                                                     | The guild's [verification level](#verification-level)                     |
| default_message_notifications? | number                                                     | Default [message notification level](#default-message-notification-level) |
| explicit_content_filter?       | number                                                     | [Explicit content filter level](#explicit-content-filter)                 |
| afk_channel_id?                | snowflake                                                  | ID for afk channel |
| afk_timeout?                   | number                                                     | afk timeout in seconds, can be set to: 60, 300, 900, 1800, 3600           |
| system_channel_id?             | snowflake                                                  | The id of the channel where guild notices such as welcome messages and boost events are posted |
| system_channel_flags?          | number                                                     | [System channel flags](#system-channel-flags) |

#### Example
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
| Field                         | Type       | Description                                                                                    |
|-------------------------------|------------|------------------------------------------------------------------------------------------------|
| name                          | string     | Name of the guild (2-100 characters)                                                           |
| description                   | string     |                                                                                                |
| owner_id                      | snowflake  | User id to transfer server ownership to                                                        |
| icon                          | url/buffer |                                                                                                |
| splash                        | url/buffer |                                                                                                |
| discovery_splash              | url/buffer |                                                                                                |
| banner                        | url/buffer |                                                                                                |
| verification_level            | number     | The guild's [verification level](#guild-verification-level)                                    |
| default_message_notifications | number     | Default [message notification level](#guild-default-message-notification-level)                |
| explicit_content_filter       | number     | [Explicit content filter level](#guild-explicit-content-filter)                                |
| afk_channel_id                | snowflake  | id for afk channel                                                                             |
| afk_timeout                   | number     | afk timeout in seconds, can be set to: 60, 300, 900, 1800, 3600                                |
| system_channel_id             | snowflake  | The id of the channel where guild notices such as welcome messages and boost events are posted |
| system_channel_flags          | number     | [System channel flags](#system-channel-flags)                                                  |
| rules_channel_id              | snowflake  |                                                                                                |
| system_updates_channel_id     | snowflake  |                                                                                                |
| premium_progress_bar_enabled  | number     |                                                                                                |

#### Example
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
| guild_id | snowflake | the id of the guild  |

#### Example
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

#### Example
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
| guild_id | snowflake | the id of the guild                        |
| user_id  | snowflake | The ID of the user the ban was created for |

#### Example
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
| guild_id | snowflake | the id of the guild                                           |
| limit?   | number    | Number of users to return (up to maximum 1000) (default 1000) |
| before?  | snowflake | Consider only users before given user ID                      |
| after?   | snowflake | Consider only users after given user ID                       |

#### Example
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
| guild_id                | snowflake | the id of the guild                                                                        |
| user_id                 | snowflake | User ID of the user to ban                                                                 |
| delete_message_seconds? | snowflake | Number of seconds to delete the banned user's messages for, between 0 and 604800 (7 days). |
| reason?                 | string    | Reason for the ban                                                                         |

#### Example
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
| guild_id | snowflake | the id of the guild          |
| user_id  | snowflake | User ID of the user to unban |
| reason?  | string    | Reason                       |

#### Example
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
| guild_id | snowflake | the id of the guild     |
| level    | number    | [MFA level](#mfa-level) |

#### Example
```javascript
await api.discord.guilds.updateMFAlevel({
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

#### Example
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
| guild_id            | snowflake   | the id of the guild                                                       |
| days                | number      | Number of days to count prune for (1-30) (default 7)                      |
| compute_prune_count | boolean     | Whether `pruned` is returned, discouraged for large guilds (default true) |
| include_roles?      | snowflake[] | An array of role IDs to include                                           |
| reason?             | string      | Reason                                                                    |

#### Example
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
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |

#### Example
```javascript
await api.discord.guilds.getVoiceRegions({
  guild_id: '0000000000'
});
```

### [Get Guild Integrations](https://discord.com/developers/docs/resources/guild#get-guild-integrations)
**This endpoint returns a maximum of 50 integrations.**  
**If a guild has more integrations, they cannot be accessed.**

#### Parameters
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |

#### Example
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
| guild_id       | snowflake | the id of the guild                 |
| integration_id | snowflake | The ID of the integration to delete |

#### Example
```javascript
await api.discord.guilds.destroyIntegration({
  guild_id: '0000000000'
});
```

### [Get Guild Widget](https://discord.com/developers/docs/resources/guild#get-guild-widget)

#### Parameters
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |

#### Example
```javascript
await api.discord.guilds.retrieveWidget({
  guild_id: '0000000000'
});
```

### [Get Guild Widget Settings](https://discord.com/developers/docs/resources/guild#get-guild-widget-settings)

#### Parameters
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |

#### Example
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
| guild_id | snowflake | the id of the guild      |
| style    | string    | Widget style (see above) |

#### Example
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
| guild_id    | snowflake | the id of the guild           |
| channel_id? | snowflake | temp                          |
| enabled?    | boolean   | Whether the widget is enabled |

#### Example
```javascript
await api.discord.guilds.updateWidget({
  guild_id: '0000000000',
  enabled: true
});
```

### [Get Guild Vanity URL](https://discord.com/developers/docs/resources/guild#get-guild-vanity-url)

#### Parameters
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |

#### Example
```javascript
await api.discord.guilds.retrieveVanityURL({
  guild_id: '0000000000'
});
```

### [Get Guild Welcome Screen](https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen)

#### Parameters
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |

#### Example
```javascript
await api.discord.guilds.retrieveWelcomeScreen({
  guild_id: '0000000000'
});
```

### [Modify Guild Welcome Screen](https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen)

#### Parameters
| Field             | Type                                                                      | Description                                          |
|-------------------|---------------------------------------------------------------------------|------------------------------------------------------|
| guild_id          | snowflake                                                                 | the id of the guild                                  |
| description?      | string                                                                    | The server description to show in the welcome screen |
| enabled?          | boolean                                                                   | Whether the welcome screen is enabled.               |
| welcome_channels? | array of [welcome screen channel](#welcome-screen-channel-object) objects | Channels shown in the welcome screen, up to 5        |

#### Example
```javascript
await api.discord.guilds.updateWelcomeScreen({
  guild_id: '0000000000',
  enabled: true
});
```

### [Get Guild Onboarding](https://discord.com/developers/docs/resources/guild#get-guild-onboarding)

#### Parameters
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |

#### Example
```javascript
await api.discord.guilds.retrieveOnboarding({
  guild_id: '0000000000',
  enabled: true
});
```

### [Modify Guild Onboarding](https://discord.com/developers/docs/resources/guild#modify-guild-onboarding)
**Requires the `MANAGE_GUILD` and `MANAGE_ROLES` permissions.**  
> **Onboarding enforces constraints when enabled. These constraints are that there must be at least 7 Default Channels and at least 5 of them must allow sending messages to the @everyone role. The mode field modifies what is considered when enforcing these constraints.**

#### Parameters
| Field               | Type                                                               | Description                                                |
|---------------------|--------------------------------------------------------------------|------------------------------------------------------------|
| guild_id            | snowflake                                                          | the id of the guild                                        |
| prompts             | array of [onboarding prompt](#onboarding-prompt-structure) objects | Prompts shown during onboarding and in customize commutity |
| default_channel_ids | array of snowflakes                                                | Channel IDs that members get opted into automatically      |
| enabled             | boolean                                                            | Whether onboarding is enabled in the guild                 |
| mode                | [onboarding mode](#onboarding-mode)                                | Current mode of onboarding                                 |

#### Example
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
        '0000000000'
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

---

## Guild Channels

| Method                                               | Description                       |
|------------------------------------------------------|-----------------------------------|
| [`getAll`](#get-guild-channels)                      | Retrieve all channels in a guild. |
| [`create`](#create-guild-channel)                    | Create a new guild channel.       | 
| [`updatePositions`](#modify-guild-channel-positions) | Modify the positions of channels. |

### [Get Guild Channels](https://discord.com/developers/docs/resources/guild#get-guild-channels)
##### Does not include threads

#### Parameters
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |

#### Example
```javascript
await api.discord.guilds.channels.getAll({
  guild_id: '0000000000'
});
```

### [Create Guild Channel](https://discord.com/developers/docs/resources/guild#create-guild-channel)
**All parameters to this endpoint are optional and nullable excluding `name`**

#### Parameters
| Field                              | Type                                                    | Description                                                                                                                                                                     | Channel Type                                   |
|------------------------------------|---------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| name                               | string                                                  | channel name (1-100 characters)                                                                                                                                                 | All                                            |
| type                               | number                                                  | the [type of channel](#channel-types)                                                                                                                                           | All                                            |
| topic                              | string                                                  | channel topic (0-1024 characters)                                                                                                                                               | Text, Announcement, Forum, Media               |
| bitrate                            | number                                                  | the bitrate (in bits) of the voice or stage channel; min 8000                                                                                                                   | Voice, Stage                                   |
| user_limit                         | number                                                  | the user limit of the voice channel                                                                                                                                             | Voice, Stage                                   |
| rate_limit_per_user                | number                                                  | amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected | Text, Voice, Stage, Forum, Media               |
| position                           | number                                                  | sorting position of the channel                                                                                                                                                 | All                                            |
| permission_overwrites              | array of partial [overwrite](#overwrite-object) objects | the channel's permission overwrites                                                                                                                                             | All                                            |
| parent_id                          | snowflake                                               | id of the parent category for a channel                                                                                                                                         | Text, Voice, Announcement, Stage, Forum, Media |
| nsfw                               | boolean                                                 | whether the channel is nsfw                                                                                                                                                     | Text, Voice, Announcement, Stage, Forum        |
| rtc_region                         | string                                                  | channel [voice region](#voice-region-object) id of the voice or stage channel, automatic when set to null                                                                       | Voice, Stage                                   |
| video_quality_mode                 | number                                                  | the camera [video quality mode](#video-quality-modes) of the voice channel                                                                                                      | Voice, Stage                                   |
| default_auto_archive_duration      | number                                                  | the default duration that the clients use (not the API) for newly created threads in the channel, in minutes, to automatically archive the thread after recent activity         | Text, Announcement, Forum, Media               |
| default_reaction_emoji             | [default reaction](#default-reaction-object) object     | emoji to show in the add reaction button on a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel                                                                              | Forum, Media                                   |
| available_tags                     | array of [tag](#forum-tag-object) objects               | set of tags that can be used in a `GUILD_FORUM` or a `GUILD_MEDIA` channel                                                                                                      | Forum, Media                                   |
| default_sort_order                 | number                                                  | the [default sort order type](#sort-order-types) used to order posts in `GUILD_FORUM` and `GUILD_MEDIA` channels                                                                | Forum, Media                                   |
| default_forum_layout               | number                                                  | the [default forum layout view](#forum-layout-types) used to display posts in `GUILD_FORUM` channels                                                                            | Forum                                          |
| default_thread_rate_limit_per_user | number                                                  | the initial `rate_limit_per_user` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update.                   | Text, Announcement, Forum, Media               |

#### Example
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
**> Only channels to be modified are required**

#### Parameters
| Field             | Type       | Description                                                                      |
|-------------------|------------|----------------------------------------------------------------------------------|
| id                | snowflake  | channel id                                                                       |
| position?         | ?number    | sorting position of the channel                                                  |
| lock_permissions? | ?boolean   | syncs the permission overwrites with the new parent, if moving to a new category |
| parent_id?        | ?snowflake | the new parent ID for the channel that is moved                                  |

#### Example
```javascript
await api.discord.guilds.channels.updatePositions({
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

#### Example
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

#### Example
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

#### Example
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

#### Example
```javascript
await api.discord.guilds.members.remove({
  guild_id: '0000000000',
  user_id: '0000000000',
  reason: 'not cool enough'
});
```

### [Modify Guild Member](https://discord.com/developers/docs/resources/guild#modify-guild-member)
**If the channel_id is set to null, this will force the target user to be disconnected from voice.**

> **All parameters to this endpoint are optional and nullable.**

#### Parameters
| Field                        | Type                | Description                                                       | Permission       |
|------------------------------|---------------------|-------------------------------------------------------------------|------------------|
| guild_id                     | snowflake           | the id of the guild                                               |                  |
| role_id                      | snowflake           | the id of the role                                                |                  |
| nick                         | string              | value to set user's nickname to                                   | MANAGE_NICKNAMES |
| roles                        | array of snowflakes | array of role ids the member is assigned                          | MANAGE_ROLES     |
| mute                         | boolean             | whether the user is muted in voice channels                       | MUTE_MEMBERS     |
| deaf                         | boolean             | whether the user is deafened in voice channels                    | DEAFEN_MEMBERS   |
| channel_id                   | snowflake           | id of channel to move user to (if they are connected to voice)    | MOVE_MEMBERS     |
| communication_disabled_until | ISO8601 timestamp   | when the user's timeout will expire (up to 28 days in the future) | MODERATE_MEMBERS |
| flags                        | number              | [guild member flags](#guild-member-flags)                         | MODERATE_MEMBERS |

#### Example
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

#### Example
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
| guild_id | snowflake | the id of the guild                           |
| user_id  | snowflake | The user ID of the user to assign the role to |
| role_id  | snowflake | The role ID of the role to give the user      |

#### Example
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
| guild_id | snowflake | the id of the guild                             |
| user_id  | snowflake | The user ID of the user to remove the role from |
| role_id  | snowflake | The role ID of the role to remove from the user |

#### Example
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

#### Example
```javascript
const x = params.member.roles;
const y = params.guild.roles;
const permNames = getPermissionNames(x, y);
```

### Timeout Guild Member
**Sets/adjusts/clears a member's timeout**

#### Parameters
| Field    | Type      | Description                                                                 |
|----------|-----------|-----------------------------------------------------------------------------|
| guild_id | snowflake | the id of the guild                                                         |
| user_id  | snowflake | The user ID of the user to remove the role from                             |
| duration | number    | Duration in seconds to set timeout. Set to `null` or omit to clear timeout. |
| reason?  | string    | Reason                                                                      |

#### Example
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

#### Example
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

#### Example
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

#### Example
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
> **All parameters to this endpoint are optional and nullable.**

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

#### Example
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

#### Example
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

#### Example
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

#### Example
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

#### Example
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

#### Example
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

#### Example
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

#### Example
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
| [`create`](#create-guild-sticker)            | Create a guild sticker              |
| [`update`](#modify-guild-sticker)            | Update a guild sticker              |
| [`destroy`](#delete-guild-sticker)           | Delete a guild sticker              |

### [Get Sticker](https://discord.com/developers/docs/resources/sticker#get-sticker)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| sticker_id | snowflake | The id of the sticker |

#### Example
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

#### Example
```javascript
await api.discord.guilds.stickers.retrieveGuild({
  guild_id: '0000000000',
  sticker_id: '0000000000'
});
```

### [List Sticker Packs](https://discord.com/developers/docs/resources/sticker#list-nitro-sticker-packs)

#### Example
```javascript
await api.discord.guilds.stickers.retrieve();
```

### [List Guild Stickers](https://discord.com/developers/docs/resources/sticker#list-guild-stickers)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| guild_id   | snowflake | the id of the guild   |

#### Example
```javascript
await api.discord.guilds.stickers.getAll({
  guild_id: '0000000000'
});
```

### [Create Guild Sticker](https://discord.com/developers/docs/resources/sticker#create-guild-sticker)
> **This endpoint may take time. It goes through multiple functions before returning the sticker.**
> 
#### Parameters
| Field       | Type       | Description                                                       |
|-------------|------------|-------------------------------------------------------------------|
| guild_id    | snowflake  | the id of the guild                                               |
| name        | string     | name of the sticker (2-30 characters)                             |
| description | string     | description of the sticker (empty or 2-100 characters)            |
| tags        | string     | autocomplete/suggestion tags for the sticker (max 200 characters) |
| file        | url/buffer | the sticker file to upload                                        |

#### Example
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

#### Example
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

#### Example
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

#### Example
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

#### Example
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

**\* Provide a user id to `before` and `after` for pagination. Users will always be returned in ascending order by `user_id`.**  
**If both `before` and `after` are provided, only `before` is respected. Fetching users in-between `before` and `after` is not supported.**

#### Example
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

**\* Optional for events with `'entity_type': EXTERNAL`**  
**\*\* Required for events with `'entity_type': EXTERNAL`**

#### Example
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

**\* If updating `entity_type` to `EXTERNAL`:**

- `channel_id` is required and [must be set to null](#field-requirements-by-entity-type)
- `entity_metadata` with a `location` field must be provided
- `scheduled_end_time` must be provided

#### Example
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

#### Example
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

#### Example
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

#### Example
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

#### Example
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

#### Example
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

#### Example
```javascript
await api.discord.guilds.templates.destroy({
  guild_id: '0000000000',
  template_code: '0000000000'
});
```

### [Create Guild Fom Guild Template](https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template)
> **This endpoint can be used only by bots in less than 10 guilds.**

#### Parameters
| Field         | Type       | Description                                     |
|---------------|------------|-------------------------------------------------|
| guild_id      | snowflake  | the guild's id                                  |
| template_code | snowflake  | the template's code                             |
| name          | string     | name of the template (1-100 characters)         |
| icon?         | url/buffer | image url or image buffer for the guild's icon  |

#### Example
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

#### Example
```javascript
await api.discord.guilds.templates.sync({
  guild_id: '0000000000',
  template_code: '0000000000'
});
```

---

# Channels
**All functions relating to Discord Channels**

| Method                                                      | Description                                    |
|-------------------------------------------------------------|------------------------------------------------|
| [`retrieve`](#get-channel)                                  | Get information about a channel in a guild     |
| [`update`](#modify-channel)                                 | update a channel in a guild                    |
| [`destroy`](#delete-channel)                                | Delete a channel in a guild                    |
| [`editPermissions`](#edit-channel-permissions)              | Update the permissions of a channel in a guild |
| [`deletePermissions`](#delete-channel-permissions)           | Delete a channels permissions                 |
| [`getInvites`](#get-channel-invites)                        | Get all invites for a channel                  |
| [`inviteCreate`](#create-channel-invite)                    | Create a new channel invite                    |
| [`typingCreate`](#trigger-typing-indicator)                 | Trigger the typing indicator in a channel      |
| [`followAnnouncementChannel`](#follow-announcement-channel) | Follow an announcement channel                 |
| [`groupDMadd`](#group-dm-add-recipient)                     | Add a user to a group DM                       |
| [`groupDMremove`](#group-dm-remove-recipient)               | Remove a user from a group DM.                 |

### [Get Channel](https://discord.com/developers/docs/resources/channel#get-channel)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| channel_id | snowflake | the id of the channel |

#### Example
```javascript
await api.discord.channels.retrieve({
  channel_id: '0000000000'
});
```

### [Modify Channel](https://discord.com/developers/docs/resources/channel#modify-channel)

#### Parameters
| Field                               | Type                                                     | Description                                                                                                                                                                                                                                     | Channel Type                                   |
|-------------------------------------|----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| channel_id                          | snowflake | the id of the channel                        |                                                                                                                                                                                                                                                 |                                                |
| name                                | string                                                   | 1-100 character channel name                                                                                                                                                                                                                    | All                                            |
| type                                | number                                                   | the [type of channel](#channel-types); only conversion between text and announcement is supported and only in guilds with the "NEWS" feature                                                                                                    | Text, Announcement                             |
| position                            | ?number                                                  | the position of the channel in the left-hand listing                                                                                                                                                                                            | All                                            |
| topic                               | ?string                                                  | 0-1024 character channel topic (0-4096 characters for `GUILD_FORUM` and `GUILD_MEDIA` channels)                                                                                                                                                 | Text, Announcement, Forum, Media               |
| nsfw                                | ?boolean                                                 | whether the channel is nsfw                                                                                                                                                                                                                     | Text, Voice, Announcement, Stage, Forum, Media |
| rate_limit_per_user                 | ?number                                                  | amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected                                                                 | Text, Voice, Stage, Forum, Media               |
| bitrate\*                           | ?number                                                  | the bitrate (in bits) of the voice or stage channel; min 8000                                                                                                                                                                                   | Voice, Stage                                   |
| user_limit                          | ?number                                                  | the user limit of the voice or stage channel, max 99 for voice channels and 10,000 for stage channels (0 refers to no limit)                                                                                                                    | Voice, Stage                                   |
| permission_overwrites\*\*           | ?array of partial [overwrite](#overwrite-object) objects | channel or category-specific permissions                                                                                                                                                                                                        | All                                            |
| parent_id                           | ?snowflake                                               | id of the new parent category for a channel                                                                                                                                                                                                     | Text, Voice, Announcement, Stage, Forum, Media |
| rtc_region                          | ?string                                                  | channel [voice region](#voice-region-object) id, automatic when set to null                                                                                                                                                                     | Voice, Stage                                   |
| video_quality_mode                  | ?number                                                  | the camera [video quality mode](#video-quality-modes) of the voice channel                                                                                                                                                                      | Voice, Stage                                   |
| default_auto_archive_duration       | ?number                                                  | the default duration that the clients use (not the API) for newly created threads in the channel, in minutes, to automatically archive the thread after recent activity                                                                         | Text, Announcement, Forum, Media               |
| flags?                              | number                                                   | [channel flags](#channel-flags) combined as a bitfield. Currently only `REQUIRE_TAG` (`1 << 4`) is supported by `GUILD_FORUM` and `GUILD_MEDIA` channels. `HIDE_MEDIA_DOWNLOAD_OPTIONS` (`1 << 15`) is supported only by `GUILD_MEDIA` channels | Forum, Media                                   |
| available_tags?                     | array of [tag](#forum-tag-object) objects                | the set of tags that can be used in a `GUILD_FORUM` or a `GUILD_MEDIA` channel; limited to 20                                                                                                                                                   | Forum, Media                                   |
| default_reaction_emoji?             | ?[default reaction](#default-reaction-object) object     | the emoji to show in the add reaction button on a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel                                                                                                                                          | Forum, Media                                   |
| default_thread_rate_limit_per_user? | number                                                   | the initial `rate_limit_per_user` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update.                                                                                   | Text, Forum, Media                             |
| default_sort_order?                 | ?number                                                  | the [default sort order type](#sort-order-types) used to order posts in `GUILD_FORUM` and `GUILD_MEDIA` channels                                                                                                                                | Forum, Media                                   |
| default_forum_layout?               | number                                                   | the [default forum layout type](#forum-layout-types) used to display posts in `GUILD_FORUM` channels                                                                                                                                            | Forum                                          |

**\* For voice channels, normal servers can set bitrate up to 96000, servers with Boost level 1 can set up to 128000, servers with Boost level 2 can set up to 256000, and servers with Boost level 3 or the `VIP_REGIONS` [guild feature](#guild-features) can set up to 384000. For stage channels, bitrate can be set up to 64000.**  
**\*\* In each overwrite object, the `allow` and `deny` keys can be omitted or set to `null`, which both default to `"0"`.**

#### Parameters (Thread)
**When setting `archived` to `false`, when `locked` is also `false`, only the `SEND_MESSAGES` permission is required.**  
**Otherwise, requires the `MANAGE_THREADS` permission.**

| Field                 | Type                | Description                                                                                                                                                                                        |
|-----------------------|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                  | string              | 1-100 character channel name                                                                                                                                                                       |
| archived              | boolean             | whether the thread is archived                                                                                                                                                                     |
| auto_archive_duration | number              | the thread will stop showing in the channel list after `auto_archive_duration` minutes of inactivity, can be set to: 60, 1440, 4320, 10080                                                         |
| locked                | boolean             | whether the thread is locked; when a thread is locked, only users with MANAGE_THREADS can unarchive it                                                                                             |
| invitable             | boolean             | whether non-moderators can add other non-moderators to a thread; only available on private threads                                                                                                 |
| rate_limit_per_user   | ?number             | amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages`, `manage_thread`, or `manage_channel`, are unaffected  |
| flags?                | number              | [channel flags](#channel-flags); `PINNED` can only be set for threads in forum and media channels                                                                                                  |
| applied_tags?         | array of snowflakes | the IDs of the set of tags that have been applied to a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel; limited to 5                                                                          |

#### Example
```javascript
await api.discord.channels.update({
  channel_id: '0000000000',
  name: 'new-name'
});
```

### [Delete Channel](https://discord.com/developers/docs/resources/channel#deleteclose-channel)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| channel_id | snowflake | the id of the channel |

#### Example
```javascript
await api.discord.channels.destroy({
  channel_id: '0000000000'
});
```

### [Edit Channel Permissions](https://discord.com/developers/docs/resources/channel#edit-channel-permissions)

#### Parameters
| Field      | Type      | Description                                                     |
|------------|-----------|-----------------------------------------------------------------|
| channel_id | snowflake | the id of the channel                                           |
| allow?     | string?   | the bitwise value of all allowed permissions (default `"0"`)    |
| deny?      | string?   | the bitwise value of all disallowed permissions (default `"0"`) |
| type       | number    | 0 for a role or 1 for a member                                  |

#### Example
```javascript
await api.discord.channels.editPermissions({
  channel_id: '0000000000',
  overwrite_id: '0000000000',
  type: 1, // member
  allow: '1024'
});
```

### [Delete Channel Permissions](https://discord.com/developers/docs/resources/channel#delete-channel-permissions)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| channel_id | snowflake | the id of the channel |

#### Example
```javascript
await api.discord.channels.deletePermissions({
  channel_id: '0000000000'
});
```

### [Get Channel Invites](https://discord.com/developers/docs/resources/channel#get-channel-invites)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| channel_id | snowflake | the id of the channel |

#### Example
```javascript
await api.discord.channels.getInvites({
  channel_id: '0000000000'
});
```

### [Create Channel Invite](https://discord.com/developers/docs/resources/channel#create-channel-invite)

#### Parameters
| Field      | Type              | Description                                          |
|------------|-------------------|------------------------------------------------------|
| channel_id | snowflake         | the id of the channel                                |
| uses       | number            | number of times this invite has been used            |
| max_uses   | number            | max number of times this invite can be used          |
| max_age    | number            | duration (in seconds) after which the invite expires |
| temporary  | boolean           | whether this invite only grants temporary membership |
| created_at | ISO8601 timestamp | when this invite was created                         |

#### Example
```javascript
await api.discord.channels.inviteCreate({
  channel_id: '0000000000',
  max_age: 7200,
  max_uses: 1
});
```

### [Trigger Typing Indicator](https://discord.com/developers/docs/resources/channel#trigger-typing-indicator)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| channel_id | snowflake | the id of the channel |

#### Example
```javascript
await api.discord.channels.typingCreate({
  channel_id: '0000000000'
});
```

### [Follow Announcement Channel](https://discord.com/developers/docs/resources/channel#follow-announcement-channel)

#### Parameters
| Field              | Type      | Description                                    |
|--------------------|-----------|------------------------------------------------|
| channel_id         | snowflake | the id of the channel to send announcements to |
| webhook_channel_id | snowflake | the id of the target channel                   |

#### Example
```javascript
await api.discord.channels.followAnnouncementChannel({
  channel_id: '0000000000',
  webhook_channel_id: '0000000000'
});
```

### [Group DM Add Recipient](https://discord.com/developers/docs/resources/channel#group-dm-add-recipient)

#### Parameters
| Field        | Type      | Description                                                           |
|--------------|-----------|-----------------------------------------------------------------------|
| channel_id   | snowflake | the id of the channel to send announcements to                        |
| user_id      | snowflake | the id of the channel to send announcements to                        |
| access_token | string    | access token of a user that has granted your app the `gdm.join` scope |
| nick         | string    | nickname of the user being added                                      |

#### Example
```javascript
await api.discord.channels.groupDMadd({
  channel_id: '0000000000',
  user_id: '0000000000',
  access_token: 'abcdef123456',
  nick: 'userNickname'
});
```

### [Group DM Remove Recipient](https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient)

#### Parameters
| Field      | Type      | Description                                    |
|------------|-----------|------------------------------------------------|
| channel_id | snowflake | the id of the channel to send announcements to |
| user_id    | snowflake | the id of the user to remove                   |

#### Example
```javascript
await api.discord.channels.groupDMremove({
  channel_id: '0000000000',
  user_id: '0000000000'
});
```

---

## Channel Messages

| Method                                | Description                          |
|---------------------------------------|--------------------------------------|
| [`retrieve`](#get-channel-message)    | Retrieve a message with given id     |
| [`getAll`](#get-channel-messages)     | Get all messages in a channel        |
| [`create`](#create-message)           | Create a new message                 |
| [`update`](#edit-message)             | Update a message                     |
| [`destroy`](#delete-message)          | Delete a message                     |
| [`bulkDelete`](#bulk-delete-messages) | Delete multiple messages at a time   |
| [`crosspost`](#crosspost-message)     | Crosspost a message                  |
| [`pin`](#pin-message)                 | Pin a message                        |
| [`unpin`](#unpin-message)             | Unpin a message                      |
| [`getPinned`](#get-pinned-messages)   | Get all pinned messages in a channel |

### [Get Channel Message](https://discord.com/developers/docs/resources/channel#get-channel-message)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| channel_id | snowflake | the id of the channel |
| message_id | snowflake | the id of the message |

#### Example
```javascript
await api.discord.channels.messages.retrieve({
  channel_id: '0000000000',
  message_id: '0000000000'
});
```

### [Get Channel Messages](https://discord.com/developers/docs/resources/channel#get-channel-messages)

#### Parameters

| Field      | Type      | Description                                           |
|------------|-----------|-------------------------------------------------------|
| channel_id | snowflake | the id of the channel                                 |
| around?    | snowflake | Get messages around this message ID                   |
| before?    | snowflake | Get messages before this message ID                   |
| after?     | snowflake | Get messages after this message ID                    |
| limit?     | number    | Max number of messages to return (1-100) (default 50) |

> **The `before`, `after`, and `around` parameters are mutually exclusive, only one may be passed at a time.**  

#### Example
```javascript
await api.discord.channels.messages.getAll({
  channel_id: '0000000000',
  limit: 50
});
```

### [Create Message](https://discord.com/developers/docs/resources/channel#create-message)
**To create a message as a reply to another message, apps can include a [message_reference](#message-reference-object) with a `message_id`.**  
**The `channel_id` and `guild_id` in the `message_reference` are optional, but will be validated if provided.**

#### Parameters
| Field              | Type                                                      | Description                                                                                      |
|--------------------|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| channel_id         | snowflake                                                 | Channel id of the channel to send the message to                                                 |
| content?\*         | string                                                    | Message contents (up to 2000 characters)                                                         |
| tts?               | boolean                                                   | `true` if this is a TTS message                                                                  |
| embeds?\*          | array of [embed](#embed-object) objects                   | Up to 10 `rich` embeds (up to 6000 characters)                                                   |
| allowed_mentions?  | [allowed mention object](#allowed-mentions-object)        | Allowed mentions for the message                                                                 |
| message_reference? | [message reference](#message-reference-object)            | Include to make your message a reply                                                             |
| components?\*      | array of [message component](#component-object) objects   | Components to include with the message                                                           |
| sticker_ids?\*     | array of snowflakes                                       | IDs of up to 3 [stickers](#sticker-object) in the server to send in the message                  |
| attachments?       | array of partial [attachment](#attachment-object) objects | Attachment objects with filename and description.                                                |
| flags?             | number                                                    | [Message flags](#message-flags) (only `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATIONS` can be set) |

**\* At least one of `content`, `embeds`, `sticker_ids`, `components`, or `files[n]` is required.**

#### Example
```javascript
await api.discord.channels.messages.create({
  channel_id: '0000000000',
  content: 'sup'
});
```  
#### Example
```javascript
await api.discord.channels.messages.create({
  channel_id: '0000000000',
  content: '',
  embeds: [{
    title: 'embed title',
    description: 'embed description'
  }],
  components: [{
    type: 1,
    components: [{
      type: 2, // button
      style: 1,
      label: 'buttonLabel',
      custom_id: 'asdfghjkl'
    }]
  }]
});
```  
#### Example
```javascript
await api.discord.channels.messages.create({
  channel_id: '0000000000',
  content: 'this will surprese all mentions',
  allowed_mentions: {
    parse: []
  }
});
```

### [Edit Message](https://discord.com/developers/docs/resources/channel#edit-message)

#### Parameters
| Field              | Type                                                      | Description                                                                                      |
|--------------------|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| channel_id         | snowflake                                                 | the id of the channel the message is in                                                          |
| message_id         | snowflake                                                 | the id of the message to edit                                                                    |
| content?           | string                                                    | Message contents (up to 2000 characters)                                                         |
| embeds?            | array of [embed](#embed-object) objects                   | Up to 10 `rich` embeds (up to 6000 characters)                                                   |
| allowed_mentions?  | [allowed mention object](#allowed-mentions-object)        | Allowed mentions for the message                                                                 |
| message_reference? | [message reference](#message-reference-object)            | Include to make your message a reply                                                             |
| components?        | array of [message component](#component-object) objects   | Components to include with the message                                                           |
| attachments?       | array of partial [attachment](#attachment-object) objects | Attachment objects with filename and description.                                                |
| flags?             | number                                                    | [Message flags](#message-flags) (only `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATIONS` can be set) |

**When the content field is edited, the mentions array in the message object will be reconstructed from scratch based on the new content.**  
**The allowed_mentions field of the edit request controls how this happens.**  
**If there is no explicit allowed_mentions in the edit request, the content will be parsed with default allowances, that is, without regard to whether or not an allowed_mentions was present in the request that originally created the message.**  
**The attachments array must contain all attachments that should be present after edit, including retained and new attachments.**  

#### Example
```javascript
await api.discord.channels.messages.update({
  channel_id: '0000000000',
  message_id: '0000000000',
  content: 'new message'
});
```  

### [Delete Message](https://discord.com/developers/docs/resources/channel#delete-message)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| channel_id | snowflake | the id of the channel |
| message_id | snowflake | the id of the message |

#### Example
```javascript
await api.discord.channels.messages.destroy({
  channel_id: '0000000000',
  message_id: '0000000000'
});
```

### [Bulk Delete Messages](https://discord.com/developers/docs/resources/channel#bulk-delete-messages)
**Any message IDs given that do not exist or are invalid will count towards the minimum and maximum message count (currently 2 and 100 respectively).**  
**This endpoint will not delete messages older than 2 weeks.**  

#### Parameters
| Field      | Type                | Description                               |
|------------|---------------------|-------------------------------------------|
| channel_id | snowflake           | the id of the channel                     |
| messages   | array of snowflakes | an array of message ids to delete (2-100) |

#### Example
```javascript
await api.discord.channels.messages.destroy({
  channel_id: '0000000000',
  messages: [ 
    '0000000000',
    '0000000000'
  ]
});
```

### [Crosspost Message](https://discord.com/developers/docs/resources/channel#crosspost-message)

#### Parameters
| Field      | Type      | Description                                |
|------------|-----------|--------------------------------------------|
| channel_id | snowflake | the id of the channel                      |
| message_id | snowflake | the message id of the message to crosspost |

#### Example
```javascript
await api.discord.channels.messages.crosspost({
  channel_id: '0000000000',
  message_id: '0000000000'
});
```

### [Pin Message](https://discord.com/developers/docs/resources/channel#pin-message)

#### Parameters
| Field      | Type      | Description                          |
|------------|-----------|--------------------------------------|
| channel_id | snowflake | the id of the channel                |
| message_id | snowflake | the message id of the message to pin |

#### Example
```javascript
await api.discord.channels.messages.pin({
  channel_id: '0000000000',
  message_id: '0000000000'
});
```

### [Unpin Message](https://discord.com/developers/docs/resources/channel#unpin-message)

#### Parameters
| Field      | Type      | Description                            |
|------------|-----------|----------------------------------------|
| channel_id | snowflake | the id of the channel                  |
| message_id | snowflake | the message id of the message to unpin |

#### Example
```javascript
await api.discord.channels.messages.unpin({
  channel_id: '0000000000',
  message_id: '0000000000'
});
```

### [Get Pinned Messages](https://discord.com/developers/docs/resources/channel#get-pinned-messages)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| channel_id | snowflake | the id of the channel |

#### Example
```javascript
await api.discord.channels.messages.getPinned({
  channel_id: '0000000000'
});
```
---

## Channel Threads
**All functions relating to Discord Threads**

| Method                                                                 | Description                                                  |
|------------------------------------------------------------------------|--------------------------------------------------------------|
| [`forumThreadCreate`](#start-thread-in-forum-channel)                  | Create a thread in a forum channel                           |
| [`createFromMessage`](#start-thread-from-message)                      | Create a thread from an existing message                     |
| [`createWithoutMessage`](#start-thread-without-message)                | Create a thread that is not connected to an existing message |
| [`join`](#join-thread)                                                 | Add current user to a thread                                 |
| [`leave`](#leave-thread)                                               | Removes current user from a thread                           |
| [`addMember`](#add-thread-member)                                      | Adds another member to a thread                              |
| [`removeMember`](#remove-thread-member)                                | Removes another member from a thread                         |
| [`retrieveMember`](#get-thread-member)                                 | Retrieve information of a thread member                      |
| [`getAllMembers`](#list-thread-members)                                | Get all members in a thread                                  |
| [`getAllPublicArchived`](#list-public-archived-threads)                | Retrieve threads in a channel that are public                |
| [`getAllPrivateArchived`](#list-private-archived-threads)              | Retrieve private archived threads in a channel               |
| [`getAllJoinedPrivateArchived`](#list-joined-private-archived-threads) | Retrieve private archived threads that the user has joined   |

### [Start Thread in Forum Channel](https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel)

#### Parameters
| Field                    | Type                                                                                | Description                                                                                                         |
|--------------------------|-------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| channel_id               | snowflake                                                                           | the id of the channel                                                                                               |
| name                     | string                                                                              | 1-100 character channel name                                                                                        |
| auto_archive_duration?\* | integer                                                                             | duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 |
| rate_limit_per_user?     | ?integer                                                                            | amount of seconds a user has to wait before sending another message (0-21600)                                       |
| message                  | [forum thread message params](#forum-and-media-thread-message-params-object) object | contents of the first message in the forum/media thread                                                             |
| applied_tags?            | array of snowflakes                                                                 | the IDs of the set of tags that have been applied to a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel         |

#### Example
```javascript
await api.discord.channels.threads.forumThreadCreate({
  channel_id: '0000000000',
  name: 'thread name',
  message: {
    content: 'new message',
    embeds: [{
      title: 'example',
      description: 'example'
    }]
  },
  auto_archive_duration: 4320
});
```

### [Start Thread from Message](https://discord.com/developers/docs/resources/channel#start-thread-from-message)
**When called on a `GUILD_TEXT` channel, creates a `PUBLIC_THREAD`.**  
**When called on a `GUILD_ANNOUNCEMENT` channel, creates an `ANNOUNCEMENT_THREAD`.**  
**Does not work on a `GUILD_FORUM` channel.**  
**The ID of the created thread will be the same as the ID of the source message, and as such a message can only have a single thread created from it.**  

#### Parameters
| Field                    | Type       | Description                                                                                                         |
|--------------------------|------------|---------------------------------------------------------------------------------------------------------------------|
| channel_id               | snowflake  | the id of the channel                                                                                               |
| message_id               | snowflake  | the id of the message to create the thread from                                                                     |
| name                     | string     | 1-100 character channel name                                                                                        |
| auto_archive_duration?   | number     | duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 |
| rate_limit_per_user?     | ?number    | amount of seconds a user has to wait before sending another message (0-21600)                                       |

#### Example
```javascript
await api.discord.channels.threads.createFromMessage({
  channel_id: '0000000000',
  message_id: '0000000000',
  name: 'thread name',
  auto_archive_duration: 10080
});
```

### [Start Thread without Message](https://discord.com/developers/docs/resources/channel#start-thread-without-message)

#### Parameters
| Field                    | Type       | Description                                                                                                         |
|--------------------------|------------|---------------------------------------------------------------------------------------------------------------------|
| channel_id               | snowflake  | the id of the channel                                                                                               |
| name                     | string     | 1-100 character channel name                                                                                        |
| type? \*                 | number     | the [type of thread](#channel-types) to create                                                                      |
| invitable? \*            | boolean    | whether non-moderators can add other non-moderators to a thread; only available when creating a private thread      |
| rate_limit_per_user?     | ?number    | amount of seconds a user has to wait before sending another message (0-21600)                                       |

**\* `type` currently defaults to `PRIVATE_THREAD` in order to match the behavior when thread documentation was first published.**

#### Example
```javascript
await api.discord.channels.threads.createWithoutMessage({
  channel_id: '0000000000',
  type: 11, // PUBLIC_THREAD
  name: 'thread name',
  auto_archive_duration: 10080,
  invitable: true
});
```

### [Join Thread](https://discord.com/developers/docs/resources/channel#join-thread)

#### Parameters
| Field                    | Type      | Description           |
|--------------------------|-----------|-----------------------|
| channel_id               | snowflake | the id of the channel |

#### Example
```javascript
await api.discord.channels.threads.join({
  channel_id: '0000000000'
});
```

### [Leave Thread](https://discord.com/developers/docs/resources/channel#leave-thread)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| channel_id | snowflake | the id of the channel |

#### Example
```javascript
await api.discord.channels.threads.leave({
  channel_id: '0000000000'
});
```

### [Add Thread Member](https://discord.com/developers/docs/resources/channel#add-thread-member)

#### Parameters
| Field      | Type      | Description               |
|------------|-----------|---------------------------|
| channel_id | snowflake | the id of the channel     |
| user_id    | snowflake | the id of the user to add |

#### Example
```javascript
await api.discord.channels.threads.addMember({
  channel_id: '0000000000',
  user_id: '0000000000'
});
```

### [Remove Thread Member](https://discord.com/developers/docs/resources/channel#remove-thread-member)

#### Parameters
| Field      | Type      | Description               |
|------------|-----------|---------------------------|
| channel_id | snowflake | the id of the channel     |
| user_id    | snowflake | the id of the user to add |

#### Example
```javascript
await api.discord.channels.threads.removeMember({
  channel_id: '0000000000',
  user_id: '0000000000'
});
```

### [Get Thread Member](https://discord.com/developers/docs/resources/channel#get-thread-member)

#### Parameters
| Field        | Type      | Description                              |
|--------------|-----------|------------------------------------------|
| channel_id   | snowflake | the id of the channel                    |
| user_id      | snowflake | the id of the user to add                |
| with_member? | boolean   | whether to include a guild member object |

#### Example
```javascript
await api.discord.channels.threads.retrieveMember({
  channel_id: '0000000000',
  user_id: '0000000000',
  with_member: true
});
```

### [List Thread Members](https://discord.com/developers/docs/resources/channel#list-thread-members)

#### Parameters
| Field        | Type      | Description                                                      |
|--------------|-----------|------------------------------------------------------------------|
| channel_id   | snowflake | the id of the channel                                            |
| user_id      | snowflake | the id of the user to add                                        |
| with_member? | boolean   | whether to include a guild member object                         |
| after?       | snowflake | Get thread members after this user ID                            |
| limit?       | integer   | Max number of thread members to return (1-100). Defaults to 100. |

#### Example
```javascript
await api.discord.channels.threads.getAllMembers({
  channel_id: '0000000000',
  with_member: true
});
```

### [List Public Archived Threads](https://discord.com/developers/docs/resources/channel#list-public-archived-threads)
**When called on a `GUILD_TEXT` channel, returns threads of type `PUBLIC_THREAD`.**  
**When called on a `GUILD_ANNOUNCEMENT` channel, returns threads of type `ANNOUNCEMENT_THREAD`.**  
**Threads are ordered by `archive_timestamp`, in descending order.**  

#### Parameters
| Field      | Type              | Description                                    |
|------------|-------------------|------------------------------------------------|
| channel_id | snowflake         | the id of the channel                          |
| before?    | ISO8601 timestamp | returns threads archived before this timestamp |
| limit?     | integer           | optional maximum number of threads to return   |

#### Example
```javascript
await api.discord.channels.threads.getAllPublicArchived({
  channel_id: '0000000000',
  limit: 10
});
```

### [List Private Archived Threads](https://discord.com/developers/docs/resources/channel#list-private-archived-threads)

#### Parameters
| Field      | Type              | Description                                    |
|------------|-------------------|------------------------------------------------|
| channel_id | snowflake         | the id of the channel                          |
| before?    | ISO8601 timestamp | returns threads archived before this timestamp |
| limit?     | integer           | optional maximum number of threads to return   |

#### Example
```javascript
await api.discord.channels.threads.getAllPrivateArchived({
  channel_id: '0000000000'
});
```

### [List Joined Private Archived Threads](https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads)

#### Parameters
| Field      | Type              | Description                                    |
|------------|-------------------|------------------------------------------------|
| channel_id | snowflake         | the id of the channel                          |
| before?    | ISO8601 timestamp | returns threads archived before this timestamp |
| limit?     | integer           | optional maximum number of threads to return   |

#### Example
```javascript
await api.discord.channels.threads.getAllJoinedPrivateArchived({
  channel_id: '0000000000'
});
```
---

## Channel Reactions

| Method                                              | Description                                                 |
|-----------------------------------------------------|-------------------------------------------------------------|
| [`create`](#create-reaction)                        | Create a reaction for the message                           |
| [`deleteOwn`](#delete-own-reaction)                 | Delete a reaction the current user has made for the message |
| [`deleteUser`](#delete-user-reactions)              | Deletes another user's reaction                             |
| [`deleteAll`](#delete-all-reactions)                | Deletes all reactions on a message                          |
| [`deleteAllEmoji`](#delete-all-reactions-for-emoji) | Deletes all the reactions for a given emoji on a message    |
| [`getUsers`](#get-reactions)                        | Get a list of users that reacted with this emoji            |

### [Create Reaction](https://discord.com/developers/docs/resources/channel#create-reaction)

#### Parameters
| Field      | Type      | Description             |
|------------------------|-------------------------|
| channel_id | snowflake | the id of the channel   |
| message_id | snowflake | the id of the message   |
| emoji      | string    | the emoji to react with |

#### Example
```javascript
await api.discord.channels.reactions.create({
  channel_id: '0000000000',
  message_id: '0000000000',
  emoji: 'name:id'
});
```

### [Delete Own Reaction](https://discord.com/developers/docs/resources/channel#delete-own-reaction)

#### Parameters
| Field      | Type      | Description             |
|------------------------|-------------------------|
| channel_id | snowflake | the id of the channel   |
| message_id | snowflake | the id of the message   |
| emoji      | string    | the emoji to react with |

#### Example
```javascript
await api.discord.channels.reactions.deleteOwn({
  channel_id: '0000000000',
  message_id: '0000000000',
  emoji: 'name:id'
});
```

### [Delete User Reaction](https://discord.com/developers/docs/resources/channel#delete-user-reaction)

#### Parameters
| Field      | Type      | Description                             |
|------------------------|-----------------------------------------|
| channel_id | snowflake | the id of the channel                   |
| message_id | snowflake | the id of the message                   |
| user_id    | snowflake | the id the user the reaction belongs to |
| emoji      | string    | the emoji to react with                 |

#### Example
```javascript
await api.discord.channels.reactions.deleteUser({
  channel_id: '0000000000',
  message_id: '0000000000',
  user_id: '0000000000',
  emoji: 'name:id'
});
```

### [Delete All Reactions](https://discord.com/developers/docs/resources/channel#delete-all-reactions)

#### Parameters
| Field      | Type      | Description             |
|------------------------|-------------------------|
| channel_id | snowflake | the id of the channel   |
| message_id | snowflake | the id of the message   |

#### Example
```javascript
await api.discord.channels.reactions.deleteAll({
  channel_id: '0000000000',
  message_id: '0000000000'
});
```

### [Delete All Reactions for Emoji](https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji)

#### Parameters
| Field      | Type      | Description             |
|------------------------|-------------------------|
| channel_id | snowflake | the id of the channel   |
| message_id | snowflake | the id of the message   |
| emoji      | string    | the emoji to delete     |

#### Example
```javascript
await api.discord.channels.reactions.deleteAllEmoji({
  channel_id: '0000000000',
  message_id: '0000000000',
  emoji: ':name:id'
});
```

### [Get Reactions](https://discord.com/developers/docs/resources/channel#get-reactions)

#### Parameters
| Field      | Type      | Description                                        |
|------------------------|----------------------------------------------------|
| channel_id | snowflake | the id of the channel                              |
| message_id | snowflake | the id of the message                              |
| emoji      | string    | the emoji to get users for                         |
| after?     | snowflake | Get users after this user ID                       |
| limit?     | integer   | Max number of users to return (1-100) (default 25) |

#### Example
```javascript
await api.discord.channels.reactions.getUsers({
  channel_id: '0000000000',
  message_id: '0000000000',
  emoji: ':name:id',
  limit: 50
});
```
---

# Users
**All functions relating to Discord Users**

### Endpoints
| Method                                                                | Description                                                         |
|-----------------------------------------------------------------------|---------------------------------------------------------------------|
| [`retrieve`](#get-user)                                               | Get user object for given user id                                   |
| [`currentUser`](#get-current-user)                                    | Get user object of requester's account                              |
| [`myGuilds`](#get-current-user-guilds)                                | Get a list of partial guild objects the current user is a member of |
| [`currentMember`](#get-current-user-guild-member)                     | Get guild member object for the current user                        |
| [`updateCurrent`](#modify-current-user)                               | Modify the requester's user account settings                        |
| [`connections`](#get-user-connections)                                | Get a list of the user's connections                                |
| [`appRoleConnection`](#get-user-application-role-connection)          | Get user's application role connection object                       |
| [`updateAppRoleConnection`](#update-user-application-role-connection) | Updates the user's application role connection                      |
| [`createDM`](#create-dm)                                              | Create a new DM channel with a user                                 |
| [`createGroupDM`](#create-group-dm)                                   | Create a new group DM channel with multiple users                   |
| [`leaveGuild`](#leave-guild)                                          | Leave a guild                                                       |

### [Get User](https://discord.com/developers/docs/resources/user#get-user)

#### Parameters
| Field   | Type      | Description        |
|---------|-----------|--------------------|
| user_id | snowflake | the id of the user |

#### Example
```javascript
await api.discord.users.retrieve({
  user_id: '0000000000'
});
```

### [Get Current User](https://discord.com/developers/docs/resources/user#get-current-user)

#### Example
```javascript
await api.discord.users.currentUser();
```

### [Get Current User Guilds](https://discord.com/developers/docs/resources/user#get-current-user-guilds)

#### Parameters
| Field       | Type      | Description                                                |
|-------------|-----------|------------------------------------------------------------|
| before      | snowflake | get guilds before this guild ID                            |
| after       | snowflake | get guilds after this guild ID                             |
| limit       | integer   | max number of guilds to return (1-200) (default 200)       |
| with_counts | boolean   | include approximate member and presence counts in response |

#### Example
```javascript
await api.discord.users.myGuilds();
```

### [Get Current User Guild Member](https://discord.com/developers/docs/resources/user#get-current-user-guild-member)

#### Parameters
| Field    | Type      | Description                                |
|----------|-----------|--------------------------------------------|
| guild_id | snowflake | id of the guild to get member object from  |

#### Example
```javascript
await api.discord.users.currentMember({
  guild_id: '0000000000',
});
```

### [Modify Current User](https://discord.com/developers/docs/resources/user#modify-current-user)
> **All parameters to this endpoint are optional.**  

| Field    | Type       | Description                           |
|----------|------------|---------------------------------------|
| username | string     | user's username                       |
| avatar   | url/buffer | if passed, modifies the user's avatar |

#### Example
```javascript
await api.discord.users.updateCurrent({
  username: 'new username',
  avatar: 'https://imageURL.png'
});
```

### [Get User Connections](https://discord.com/developers/docs/resources/user#get-user-connections)

#### Example
```javascript
await api.discord.users.connections();
```

### [Get User Application Role Connection](https://discord.com/developers/docs/resources/user#get-user-application-role-connection)

#### Parameters
| Field           | Type      | Description          |
|-----------------|-----------|----------------------|
| application_id? | snowflake | bot's application id |

#### Example
```javascript
await api.discord.users.appRoleConnection();
```

### [Update User Application Role Connection](https://discord.com/developers/docs/resources/user#update-user-application-role-connection)
> **Requires an OAuth2 access token with `role_connections.write` scope for the application specified in the path.**

#### Parameters
| Field              | Type   | Description                                                                                                                                                                                                  |
|--------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| platform_name?     | string | the vanity name of the platform a bot has connected (max 50 characters)                                                                                                                                      |
| platform_username? | string | the username on the platform a bot has connected (max 100 characters)                                                                                                                                        |
| metadata?          | object | object mapping [application role connection metadata](#application-role-connection-metadata-object) keys to their `string`-ified value (max 100 characters) for the user on the platform a bot has connected |

#### Example
```javascript
await api.discord.users.updateAppRoleConnection({
  platform_name: 'OnSocket',
  platform_username: 'goodsie'
});
```

### [Create DM](https://discord.com/developers/docs/resources/user#create-dm)

#### Parameters
| Field              | Type                                                      | Description                                                                                      |
|--------------------|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| recipient_id       | snowflake                                                 | the recipient to open a DM channel with                                                          |
| content?\*         | string                                                    | Message contents (up to 2000 characters)                                                         |
| tts?               | boolean                                                   | `true` if this is a TTS message                                                                  |
| embeds?\*          | array of [embed](#embed-object) objects                   | Up to 10 `rich` embeds (up to 6000 characters)                                                   |
| allowed_mentions?  | [allowed mention object](#allowed-mentions-object)        | Allowed mentions for the message                                                                 |
| message_reference? | [message reference](#message-reference-object)            | Include to make your message a reply                                                             |
| components?\*      | array of [message component](#component-object) objects   | Components to include with the message                                                           |
| sticker_ids?\*     | array of snowflakes                                       | IDs of up to 3 [stickers](#sticker-object) in the server to send in the message                  |
| attachments?       | array of partial [attachment](#attachment-object) objects | Attachment objects with filename and description.                                                |
| flags?             | integer                                                   | [Message flags](#message-flags) (only `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATIONS` can be set) |

**\* At least one of `content`, `embeds`, `sticker_ids`, `components`, or `files[n]` is required.**

#### Example
```javascript
await api.discord.users.createDM({
  recipient_id: '0000000000',
  content: '<super cool message here>'
});
```

### [Create Group DM](https://discord.com/developers/docs/resources/user#create-group-dm)

#### Parameters
| Field              | Type                                                      | Description                                                                                      |
|--------------------|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| access_tokens      | array of strings                                          | access tokens of users that have granted your app the `gdm.join` scope                           |
| nicks              | dict                                                      | a dictionary of user ids to their respective nicknames                                           |
| content?\*         | string                                                    | Message contents (up to 2000 characters)                                                         |
| tts?               | boolean                                                   | `true` if this is a TTS message                                                                  |
| embeds?\*          | array of [embed](#embed-object) objects                   | Up to 10 `rich` embeds (up to 6000 characters)                                                   |
| allowed_mentions?  | [allowed mention object](#allowed-mentions-object)        | Allowed mentions for the message                                                                 |
| message_reference? | [message reference](#message-reference-object)            | Include to make your message a reply                                                             |
| components?\*      | array of [message component](#component-object) objects   | Components to include with the message                                                           |
| sticker_ids?\*     | array of snowflakes                                       | IDs of up to 3 [stickers](#sticker-object) in the server to send in the message                  |
| attachments?       | array of partial [attachment](#attachment-object) objects | Attachment objects with filename and description.                                                |
| flags?             | integer                                                   | [Message flags](#message-flags) (only `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATIONS` can be set) |

**\* At least one of `content`, `embeds`, `sticker_ids`, `components`, or `files[n]` is required.**

#### Example
```javascript
await api.discord.users.createGroupDM({
  access_tokens: [
    '0000000000',
    '0000000000'  
  ],
  nicks: {
    'user_id': 'nickname'
  },
  content: 'boo',
});
```

### [Leave Guild](https://discord.com/developers/docs/resources/user#leave-guild)

#### Parameters
| Field    | Type      | Description                  |
|----------|-----------|------------------------------|
| guild_id | snowflake | the id of the guild to leave |

#### Example
```javascript
await api.discord.users.leaveGuild({
  guild_id: '0000000000'
});
```

---

# Interactions

#### Namespaces
| Namespace                          |
| [Callback](#interactions-callback) |
| [Followup](#interactions-followup) |

## Interactions Callback

#### Endpoints
| Method                                                     | Description                                                   |
|------------------------------------------------------------|---------------------------------------------------------------|
| [`reply`](#create-interaction-response)                    | Create a response to an Interaction                           |
| [`defer`](#defer-interaction-response)                     | Send "thinking" state and edit response later                 |
| [`get_original`](#get-original-interaction-response)       | Get the initial Interaction response                          |
| [`update_original`](#edit-original-interaction-response)   | Edit the initial Interaction response                         |
| [`delete_original`](#delete-original-interaction-response) | Delete the initial Interaction response                       |
| [`component_defer`](#component-defer)\*                    | Acknowledge an interaction and edit response later            |
| [`component_update`](#component-update)\*                  | Edit the message the component was attached to                |
| [`autocomplete_reply`](#autocomplete-reply)                | Respond to an autocomplete interaction with suggested choices |
| [`modal_reply`](#modal-reply)\*\*                          | Respond to an interaction with a popup modal                  |
| [`upgrade`](#premium-required)\*\*\*                       | Respond to an interaction with an upgrade button              |

**\* Only valid for component-based interactions.**  
**\*\* Not available for `MODAL_SUBMIT` and `PING` interactions.**  
**\*\*\* Only available for apps with monetization enabled.**


### [Create Interaction Response](https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response)

#### Parameters
| Field             | Type                                                      | Description                                            |
|-------------------|-----------------------------------------------------------|--------------------------------------------------------|
| params            | object                                                    | The interaction payload                                |
| ephemeral?        | boolean                                                   | Whether the message should be visible to only the user |
| content?\*        | string                                                    | Message contents (up to 2000 characters)               |
| tts?              | boolean                                                   | `true` if this is a TTS message                        |
| embeds?\*         | array of [embed](#embed-object) objects                   | Up to 10 `rich` embeds (up to 6000 characters)         |
| allowed_mentions? | [allowed mention object](#allowed-mentions-object)        | Allowed mentions for the message                       |
| components?\*     | array of [message component](#component-object) objects   | Components to include with the message                 |
| attachments?      | array of partial [attachment](#attachment-object) objects | Attachment objects with filename and description       |

**\* At least one of `content`, `embeds`, `sticker_ids`, `components`, or `files[n]` is required.**

#### Example
```javascript
await api.discord.interactions.callback.reply(params, {
  ephemeral: true,
  content: 'This will respond to an interaction immediately'
});
```

### Defer Interaction Response

#### Parameters
| Field      | Type    | Description                                            |
|------------|---------|--------------------------------------------------------|
| params     | object  | The interaction payload                                |
| ephemeral? | boolean | Whether the message should be visible to only the user |

#### Example
```javascript
await api.discord.interactions.callback.defer(params, {
  ephemeral: true
});
```

#### Example
```javascript
await api.discord.interactions.callback.defer(params)
```

### [Get Original Interaction Response](https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response)

#### Parameters
| Field  | Type   | Description             |
|--------|--------|-------------------------|
| params | object | The interaction payload |

#### Example
```javascript
await api.discord.interactions.callback.get_original(params);
```

### [Edit Original Interaction Response](https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response)

#### Parameters
| Field             | Type                                                      | Description                                            |
|-------------------|-----------------------------------------------------------|--------------------------------------------------------|
| params            | object                                                    | The interaction payload                                |
| content?\*        | string                                                    | Message contents (up to 2000 characters)               |
| embeds?\*         | array of [embed](#embed-object) objects                   | Up to 10 `rich` embeds (up to 6000 characters)         |
| allowed_mentions? | [allowed mention object](#allowed-mentions-object)        | Allowed mentions for the message                       |
| components?\*     | array of [message component](#component-object) objects   | Components to include with the message                 |
| attachments?      | array of partial [attachment](#attachment-object) objects | Attachment objects with filename and description       |

#### Example
```javascript
await api.discord.interactions.callback.update_original(params, {
  content: 'This will update the original interaction response'
});
```

### [Delete Original Interaction Response](https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response)

#### Parameters
| Field  | Type   | Description             |
|--------|--------|-------------------------|
| params | object | The interaction payload |

#### Example
```javascript
await api.discord.interactions.callback.delete_original(params);
```

### Component Defer

#### Parameters
| Field      | Type    | Description             |
|------------|---------|-------------------------|
| params     | object  | The interaction payload |

#### Example
```javascript
await api.discord.interactions.callback.component_defer(params);
```

### Component Update

#### Parameters
| Field             | Type                                                      | Description                                            |
|-------------------|-----------------------------------------------------------|--------------------------------------------------------|
| params            | object                                                    | The interaction payload                                |
| content?\*        | string                                                    | Message contents (up to 2000 characters)               |
| embeds?\*         | array of [embed](#embed-object) objects                   | Up to 10 `rich` embeds (up to 6000 characters)         |
| allowed_mentions? | [allowed mention object](#allowed-mentions-object)        | Allowed mentions for the message                       |
| components?\*     | array of [message component](#component-object) objects   | Components to include with the message                 |
| attachments?      | array of partial [attachment](#attachment-object) objects | Attachment objects with filename and description       |

#### Example
```javascript
await api.discord.interactions.callback.component_update(params, {
  content: 'new stuff!'
});
```

### Autocomplete Reply

#### Parameters
| Field   | Type                                                   | Description                              |
|---------|--------------------------------------------------------|------------------------------------------|
| params  | object                                                 | The interaction payload                  |
| choices | array of [choices](#application-command-option-choice) | Autocomplete Choices (max of 25 choices) |

#### Example
```javascript
await api.discord.interactions.callback.autocomplete_reply(params, {
  choices: [
    {
      name: 'this might be wrong',
      value: 'let me know'
    }
  ]
});
```

### Modal Reply

#### Parameters
| Field      | Type                | Description                                                      |
|------------|---------------------|------------------------------------------------------------------|
| custom_id  | string              | a developer-defined identifier for the modal, max 100 characters |
| title      | string              | the title of the popup modal, max 45 characters                  |
| components | array of components | between 1 and 5 (inclusive) components that make up the modal    |

#### Example
```javascript
await callback.modal_reply(params, {
  custom_id: 'modal_id',
  title: 'Title goes here',
  components: [
    {
      type: 4,
      custom_id: 'id_1',
      label: 'this is a label',
      style: 1, // short
      placeholder: 'this is a placeholder',
      required: true
    },
    {
      type: 4,
      custom_id: 'id_2',
      label: 'This is another label',
      style: 1, // paragraph
      value: 'this is a pre-filled value',
      required: false
    }
  ]
});
```

## Interactions Followup

#### Endpoints
| Method                               | Description                                   |
|--------------------------------------|-----------------------------------------------|
| [`retrieve`](#get-followup-message)  | Get a followupmessage for an interaction      |
| [`create`](#create-followup-message) | Create a followup message for an interaction  |
| [`update`](#edit-followup-message)   | Edit a followup message for an interaction    |
| [`destroy`](#delete-followup-message) | Delete a followup message for an interaction |

### [Get Followup Message](https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message)

#### Parameters
| Field      | Type      | Description                               |
|------------|-----------|-------------------------------------------|
| params     | object    | The interaction payload                   |
| message_id | snowflake | The message id of the message to retrieve |

#### Example
```javascript
await api.discord.interactions.followup.retrieve(params, {
  message_id: '0000000000'  
});
```

### [Create Followup Message](https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message)

#### Parameters
| Field             | Type                                                      | Description                                            |
|-------------------|-----------------------------------------------------------|--------------------------------------------------------|
| params            | object                                                    | The interaction payload                                |
| ephemeral?        | boolean                                                   | Whether the message should be visible to only the user |
| content?\*        | string                                                    | Message contents (up to 2000 characters)               |
| embeds?\*         | array of [embed](#embed-object) objects                   | Up to 10 `rich` embeds (up to 6000 characters)         |
| allowed_mentions? | [allowed mention object](#allowed-mentions-object)        | Allowed mentions for the message                       |
| components?\*     | array of [message component](#component-object) objects   | Components to include with the message                 |
| attachments?      | array of partial [attachment](#attachment-object) objects | Attachment objects with filename and description       |

**\* At least one of `content`, `embeds`, `sticker_ids`, `components`, or `files[n]` is required.**

#### Example
```javascript
await api.discord.interactions.followup.create(params, {
  ephemeral: true,
  content: 'followup message',
  embeds: [{
     title: 'hello',
     description: 'this is a description'
  }]
});
```

### [Edit Followup Message](https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message)

#### Parameters
| Field             | Type                                                      | Description                                            |
|-------------------|-----------------------------------------------------------|--------------------------------------------------------|
| params            | object                                                    | The interaction payload                                |
| message_id        | snowflake                                                 | The id of the message to update                        |
| content?\*        | string                                                    | Message contents (up to 2000 characters)               |
| embeds?\*         | array of [embed](#embed-object) objects                   | Up to 10 `rich` embeds (up to 6000 characters)         |
| allowed_mentions? | [allowed mention object](#allowed-mentions-object)        | Allowed mentions for the message                       |
| components?\*     | array of [message component](#component-object) objects   | Components to include with the message                 |
| attachments?      | array of partial [attachment](#attachment-object) objects | Attachment objects with filename and description       |

**\* At least one of `content`, `embeds`, `sticker_ids`, `components`, or `files[n]` is required.**

#### Example
```javascript
await api.discord.interactions.followup.update(params, {
  message_id: '0000000000',
  content: 'followup message',
  embeds: [{
     title: 'hello',
     description: 'this is a description'
  }]
});
```

### [Delete Followup Message](https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message)

#### Parameters
| Field      | Type      | Description                               |
|------------|-----------|-------------------------------------------|
| params     | object    | The interaction payload                   |
| message_id | snowflake | The message id of the message to retrieve |

#### Example
```javascript
await api.discord.interactions.followup.destroy(params, {
  message_id: '0000000000'  
});
```

---

# Webhooks
**All functions relating to Discord Webhooks**

### Methods

| Method                                           | Description                                                 |
|--------------------------------------------------|-------------------------------------------------------------|
| [`retrieve`](#get-webhook)                       | Get information about a webhook                             |
| [`retrieveWithToken`](#get-webhook-with-token)   | Get information about a webhook using its token             |
| [`retrieveChannel`](#get-channel-webhooks)       | Get all channel webhooks                                    |
| [`retrieveGuild`](#get-guild-webhooks)           | Get all guild webhooks                                      |
| [`retrieveMessage`](#get-webhook-message)        | Get a previously-sent webhook message from the same token   |
| [`destroyMessage`](#delete-webhook-message)      | Deletes a message that was created by the webhook           |
| [`create`](#create-webhook)                      | Creates a new webhook                                       |
| [`update`](#modify-webhook)                      | Updates an existing webhook                                 |
| [`updateWithToken`](#modify-webhook-with-token)  | Follow an announcement channel                              |
| [`destroy`](#delete-webhook)                     | Delete a webhook permanently                                |
| [`destroyWithToken`](#delete-webhook-with-token) | Delete a webhook permanently using its token                |
| [`execute`](#execute-webhook)                    | Executes a webhook                                          |
| [`updateMessage`](#edit-webhook-message)         | Edits a previously-sent webhook message from the same token |

### [Get Webhook](https://discord.com/developers/docs/resources/webhook#get-webhook)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| webhook_id | snowflake | the id of the webhook |

#### Example
```javascript
await api.discord.webhooks.retrieve({
  webhook_id: '0000000000'
});
```

### [Get Webhook With Token](https://discord.com/developers/docs/resources/webhook#get-webhook-with-token)
> **This call does not require authentication and returns no user in the webhook object.**

#### Parameters
| Field         | Type      | Description           |
|---------------|-----------|-----------------------|
| webhook_id    | snowflake | the id of the webhook |
| webhook_token | string    | the webhook's token   |

#### Example
```javascript
await api.discord.webhooks.retrieveWithToken({
  webhook_id: '0000000000',
  webhook_token: 'abcdef123456'
});
```

### [Get Channel Webhooks](https://discord.com/developers/docs/resources/webhook#get-channel-webhooks)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| channel_id | snowflake | the id of the channel |

#### Example
```javascript
await api.discord.webhooks.retrieveChannel({
  webhook_id: '0000000000'
});
```

### [Get Guild Webhooks](https://discord.com/developers/docs/resources/webhook#get-guild-webhooks)

#### Parameters
| Field    | Type      | Description         |
|----------|-----------|---------------------|
| guild_id | snowflake | the id of the guild |

#### Example
```javascript
await api.discord.webhooks.retrieveGuild({
  guild_id: '0000000000'
});
```

### [Get Webhook Message](https://discord.com/developers/docs/resources/webhook#get-webhook-message)

#### Parameters
| Field         | Type      | Description                        |
|---------------|-----------|------------------------------------|
| webhook_id    | snowflake | the id of the webhook              |
| webhook_token | snowflake | the webhook's token                |
| message_id    | snowflake | the id of the message              |
| thread_id     | snowflake | id of the thread the message is in |

#### Example
```javascript
await api.discord.webhooks.retrieveMessage({
  webhook_id: '0000000000',
  webhook_token: 'abcdef123456',
  message_id: '0000000000'
});
```

### [Edit Webhook Message](https://discord.com/developers/docs/resources/webhook#edit-webhook-message)

#### Parameters
| Field              | Type                                                      | Description                                      |
|--------------------|-----------------------------------------------------------|--------------------------------------------------|
| webhook_id         | snowflake                                                 | the id of the webhook                            |
| webhook_token      | snowflake                                                 | the webhook's token                              |
| message_id         | snowflake                                                 | the id of the message                            |
| thread_id          | snowflake                                                 | id of the thread the message is in               |
| content?           | string                                                    | Message contents (up to 2000 characters)         |
| embeds?            | array of [embed](#embed-object) objects                   | Up to 10 `rich` embeds (up to 6000 characters)   |
| allowed_mentions?  | [allowed mention object](#allowed-mentions-object)        | Allowed mentions for the message                 |
| components?        | array of [message component](#component-object) objects   | Components to include with the message           |
| attachments?       | array of partial [attachment](#attachment-object) objects | Attachment objects with filename and description |

#### Example
```javascript
await api.discord.webhooks.updateMessage({
  webhook_id: '0000000000',
  webhook_token: 'abcdef123456',
  message_id: '0000000000',
  content: 'hello'
});
```

### [Delete Webhook Message](https://discord.com/developers/docs/resources/webhook#delete-webhook-message)

#### Parameters
| Field         | Type      | Description                        |
|---------------|-----------|------------------------------------|
| webhook_id    | snowflake | the id of the webhook              |
| webhook_token | snowflake | the webhook's token                |
| message_id    | snowflake | the id of the message              |
| thread_id     | snowflake | id of the thread the message is in |

#### Example
```javascript
await api.discord.webhooks.destroyMessage({
  webhook_id: '0000000000',
  webhook_token: 'abcdef123456',
  message_id: '0000000000'
});
```

### [Create Webhook](https://discord.com/developers/docs/resources/webhook#create-webhook)

#### Parameters
| Field      | Type        | Description                                         |
|------------|-------------|-----------------------------------------------------|
| channel_id? | snowflake   | the channel id of the channel to create webhook for |
| name?       | string      | name of the webhook (1-80 characters)               |
| avatar?     | ?url/buffer | image for the default webhook avatar                |

#### Example
```javascript
await api.discord.webhooks.create({
  channel_id: '0000000000',
  name: 'myNewWebhook'
});
```

### [Modify Webhook](https://discord.com/developers/docs/resources/webhook#modify-webhook)

#### Parameters
| Field      | Type        | Description                                         |
|------------|-------------|-----------------------------------------------------|
| webhook_id | snowflake   | the webhook id of the webhook to edit               |
| channel_id | snowflake   | the channel id of the channel to create webhook for |
| name       | string      | name of the webhook (1-80 characters)               |
| avatar?    | ?url/buffer | image for the default webhook avatar                |

#### Example
```javascript
await api.discord.webhooks.update({
  webhook_id: '0000000000',
  channel_id: '0000000000',
  name: 'myNewNewWebhook'
});
```

### [Modify Webhook With Token](https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token)

#### Parameters
| Field         | Type        | Description                                         |
|---------------|-------------|-----------------------------------------------------|
| webhook_id    | snowflake   | the webhook id of the webhook to edit               |
| webhook_token | string      | the token of the webhook to edit                    |
| name?         | string      | name of the webhook (1-80 characters)               |
| avatar?       | ?url/buffer | image for the default webhook avatar                |

#### Example
```javascript
await api.discord.webhooks.updateWithToken({
  webhook_id: '0000000000',
  webhook_token: 'abcd1234',
  name: 'myNewNewWebhook'
});
```

### [Delete Webhook](https://discord.com/developers/docs/resources/webhook#delete-webhook)

#### Parameters
| Field      | Type      | Description           |
|------------|-----------|-----------------------|
| webhook_id | snowflake | the id of the webhook |

#### Example
```javascript
await api.discord.webhooks.destroy({
  webhook_id: '0000000000'
});
```

### [Delete Webhook With Token](https://discord.com/developers/docs/resources/webhook#get-webhook-with-token)

#### Parameters
| Field         | Type      | Description           |
|---------------|-----------|-----------------------|
| webhook_id    | snowflake | the id of the webhook |
| webhook_token | string    | the webhook's token   |

#### Example
```javascript
await api.discord.webhooks.destroyWithToken({
  webhook_id: '0000000000',
  webhook_token: 'abcdef123456'
});
```

### [Execute Webhook](https://discord.com/developers/docs/resources/webhook#execute-webhook)

#### Parameters
| Field            | Type                                                      | Description                                                                                           |
|------------------|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| webhook_id       | snowflake                                                 | the id of the webhook                                                                                 |
| webhook_token    | snowflake                                                 | the webhook's token                                                                                   |
| username         | string                                                    | override the default username of the webhook                                                          |
| avatar_url       | string                                                    | override the default avatar of the webhook                                                            |
| thread_id        | snowflake                                                 | id of the thread the message is in                                                                    |
| content          | string                                                    | Message contents (up to 2000 characters)                                                              |
| embeds           | array of [embed](#embed-object) objects                   | Up to 10 `rich` embeds (up to 6000 characters)                                                        |
| allowed_mentions | [allowed mention object](#allowed-mentions-object)        | Allowed mentions for the message                                                                      |
| components       | array of [message component](#component-object) objects   | Components to include with the message                                                                |
| attachments      | array of partial [attachment](#attachment-object) objects | Attachment objects with filename and description                                                      |
| thread_name      | string                                                    | name of thread to create (requires the webhook channel to be a forum or media channel)                |
| applied_tags     | array of snowflakes                                       | array of tag ids to apply to the thread (requires the webhook channel to be a forum or media channel) |
| wait             | boolean                                                   | Waits for server confirmation of message send before response, and returns the created message body   |

#### Example
```javascript
await api.discord.webhooks.execute({
  webhook_id: '0000000000',
  webhook_token: 'abcdef123456',
  content: 'message contents here',
  username: 'webhook usernrame',
  avatar_url: 'https://imgurl.png',
  embeds: [{
    title: 'example',
    description: 'example'
  }]
});
```
---

# Invites
**All functions relating to Discord Invites**

| Method                     | Description                             |
|----------------------------|-----------------------------------------|
| [`retrieve`](#get-invite)  | Get information about a specific invite |
| [`revoke`](#delete-invite) | Revoke an invite                        |

### [Get Invite](https://discord.com/developers/docs/resources/invite#get-invite)

#### Parameters
| Field                     | Type      | Description                                                 |
|---------------------------|-----------|-------------------------------------------------------------|
| invite_code               | string    | the invite's code                                           |
| with_counts?              | boolean   | whether the invite should contain approximate member counts |
| with_expiration?          | boolean   | whether the invite should contain the expiration date       |
| guild_scheduled_event_id? | snowflake | the guild scheduled event to include with the invite        |

#### Example
```javascript
await api.discord.invites.retrieve({
  invite_code: '0vCdhLbwjZZTWZLD',
  with_counts: true,
  with_expiration: true
});
```

### [Delete Invite](https://discord.com/developers/docs/resources/invite#delete-invite)

#### Parameters
| Field       | Type   | Description       |
| invite_code | string | the invite's code |

#### Example
```javascript
await api.discord.invites.revoke({
  invite_code: '0vCdhLbwjZZTWZLD'
});
```

---

# Applications
**All Discord API endpoints relating to applications, commands, entitlements and SKUs**

| Method                                            | Description                                                                |
|---------------------------------------------------|----------------------------------------------------------------------------|
| [`getMe`](#get-current-application)               | Get inforation on the current application                                  |
| [`updateMe`](#edit-current-application)           | Edit properties of the app associated with the requesting bot user         |
| [`appRoleConnectionMeta`](#update-existing-guild) | Get the applications role connection metadata information                  |
| [`updateAppRoleConnectionMeta`](#delete-guild)    | Updates the application role connection metadata for the given application |

### [Get Current Application](https://discord.com/developers/docs/resources/application#get-current-application)

#### Parameters
| Field           | Type      | Description               |
|-----------------|-----------|---------------------------|
| application_id? | snowflake | the id of the application |

#### Example
```javascript
await api.discord.applications.getMe();
```

### [Edit Current Application](https://discord.com/developers/docs/resources/application#edit-current-application)

#### Parameters
| Field                             | Type                                            | Description                                                          |
|-----------------------------------|-------------------------------------------------|----------------------------------------------------------------------|
| application_id?                   | snowflake                                       | the id of the application                                            |
| custom_install_url                | string                                          | Default custom authorization URL for the app, if enabled             |
| description                       | string                                          | Description of the app                                               |
| role_connections_verification_url | string                                          | Role connection verification URL for the app                         |
| install_params                    | [install params](#install-params-object) object | Settings for the app's default in-app authorization link, if enabled |
| flags \*                          | number                                          | App's public [flags](#application-flags)                             |
| icon                              | url/buffer                                      | Icon for the app                                                     |
| cover_image                       | url/buffer                                      | Default rich presence invite cover image for the app                 |
| interactions_endpoint_url \*\*    | string                                          | Interactions endpoint URL for the app                                |
| tags                              | array of strings                                | List of tags describing the content and functionality of the app (max of 20 characters per tag). Max of 5 tags. |

**\* Only limited intent flags (`GATEWAY_PRESENCE_LIMITED`, `GATEWAY_GUILD_MEMBERS_LIMITED`, and `GATEWAY_MESSAGE_CONTENT_LIMITED`) can be updated via the API.**

#### Example
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

#### Example
```javascript
await api.discord.applications.appRoleConnectionMeta();
```

### [Update Application Role Connection Metadata Records](https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records)

#### Parameters
| Field           | Type      | Description               |
|-----------------|-----------|---------------------------|
| application_id? | snowflake | the id of the application |

#### Example
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
| [`bulkOverwrite`](#bulk-overwrite-application-commands)            | Bulk overwrite application commands         |
| [`retrievePermissions`](#get-application-command-permissions)     | Get a guild commands permissions            |
| [`getAllPermissions`](#get-guild-application-command-permissions) | Get permissions for all commands in a guild |
| [`updatePermissions`](#edit-application-command-permissions)      | Update a guild's application command        |

### [Get Application Command](https://discord.com/developers/docs/interactions/application-commands#get-global-application-command)
**This is to be used for both global and guild commands.**  
**Provide a guild_id field if using for a guild command.**

#### Parameters
| Field           | Type      | Description               |
|-----------------|-----------|---------------------------|
| command_id      | snowflake | the id of the command     |
| application_id? | snowflake | the id of the application |
| guild_id?       | snowflake | the id of the guild       |

#### Example
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
| with_localizations? | boolean   | Whether to include full localization dictionaries (`name_localizations` and `description_localizations`) in the returned objects, instead of the `name_localized` and `description_localized` fields. |

#### Example
```javascript
await api.discord.applications.commands.getAll();
```
#### Example
```javascript
await api.discord.applications.commands.getAll({
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

#### Example
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

#### Example
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

#### Example
```javascript
await api.discord.applications.commands.destroy({
  command_id: '0000000000',
  guild_id: '0000000000'
})
```

### [Bulk Overwrite Application Commands](https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-command)
**This is to be used for both global and guild commands.**  
**Provide a guild_id field if using for a guild command.**  
**Takes a list of application commands, overwriting the existing global command list for this application.**

#### Parameters
| Field           | Type                                                         | Description                                      |
|-----------------|--------------------------------------------------------------|--------------------------------------------------|
| application_id? | snowflake                                                    | the id of the application                        |
| guild_id?       | snowflake                                                    | the id of the guild                              |
| commands        | array of [application commands](#application-command-object) | Commands to overwrite the existing commands with |

#### Example
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

#### Example
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

#### Example
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

#### Example
```javascript
await api.discord.applications.commands.updatePermissions({
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

#### Example
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
|-----------------|------------------------------|----------------------------------------|
| application_id? | snowflake | the id of the application                                 |
| sku_id          | string    | ID of the SKU to grant the entitlement to                 |
| owner_id        | string    | ID of the guild or user to grant the entitlement to       |
| owner_type      | number    | `1` for a guild subscription, `2` for a user subscription |

#### Example
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

#### Example
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

#### Example
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

#### Example
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

#### Example
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

#### Example
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

#### Example
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

#### Example
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

#### Example
```javascript
await api.discord.automod.destroyRule({
  auto_moderation_rule_id: '0000000000',
  guild_id: '0000000000'
})
```

---

# Stage Instange
**A _Stage Instance_ holds information about a live stage.**

### Endpoints
| Method                              | Description                                                 |
|-------------------------------------|-------------------------------------------------------------|
| [`retrieve`](#get-stage-instance)   | Gets the stage instance associated with the Stage channel   |
| [`create`](#create-stage-instance)  | Creates a new Stage instance associated to a Stage channel  |
| [`update`](#modify-stage-instance)  | Updates fields of an existing Stage instance                |
| [`destroy`](#delete-stage-instance) | Deletes the Stage instance                                  |

### [Get Stage Instance](https://discord.com/developers/docs/resources/stage-instance#get-stage-instance)

#### Parameters
| Field      | Type      | Description                                         |
|------------|-----------|-----------------------------------------------------|
| channel_id | snowflake | the id of the channel that the stage instance is in |

#### Example
```javascript
await api.discord.stageInstance.retrieve({
  channel_id: '0000000000'
});
```

### [Create Stage Instance](https://discord.com/developers/docs/resources/stage-instance#create-stage-instance)

#### Parameters
| Field                       | Type      | Description                                                                    |
|-----------------------------|-----------|--------------------------------------------------------------------------------|
| channel_id                  | snowflake | The id of the Stage channel                                                    |
| topic                       | string    | The topic of the Stage instance (1-120 characters)                             |
| privacy_level?              | integer   | The [privacy level](#privacy-level) of the Stage instance (default GUILD_ONLY) |
| send_start_notification? \* | boolean   | Notify @everyone that a Stage instance has started                             |
| guild_scheduled_event_id?   | snowflake | The guild scheduled event associated with this Stage instance                  |

**\* The stage moderator must have the `MENTION_EVERYONE` permission for this notification to be sent.**

#### Example
```javascript
await api.discord.stageInstance.create({
  channel_id: '0000000000',
  topic: 'My super cool stage',
  send_start_notification: true
});
```

### [Modify Stage Instance](https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance)

#### Parameters
| Field          | Type      | Description                                                                    |
|----------------|-----------|--------------------------------------------------------------------------------|
| channel_id     | snowflake | The id of the Stage channel                                                    |
| topic?         | string    | The topic of the Stage instance (1-120 characters)                             |
| privacy_level? | integer   | The [privacy level](#privacy-level) of the Stage instance (default GUILD_ONLY) |

#### Example
```javascript
await api.discord.stageInstance.update({
  channel_id: '0000000000',
  topic: 'My super duper cool stage',
});
```

### [Delete Stage Instance](https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance)

#### Parameters
| Field      | Type      | Description                                         |
|------------|-----------|-----------------------------------------------------|
| channel_id | snowflake | the id of the channel that the stage instance is in |

#### Example
```javascript
await api.discord.stageInstance.destroy({
  channel_id: '0000000000'
});
```

---

# Objects and Types

## Guild
| Field                          | Type                                              | Description                                                                                                        |
|--------------------------------|---------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| id                             | snowflake                                         | guild id                                                                                                           |
| name                           | string                                            | guild name (2-100 characters, excluding trailing and leading whitespace)                                           |
| icon                           | ?string                                           | icon hash                                                                                                          |
| icon_hash?                     | ?string                                           | icon hash, returned when in the template object                                                                    |
| splash                         | ?string                                           | splash hash                                                                                                        |
| discovery_splash               | ?string                                           | discovery hash; Only present for guilds with the "DISCOVERABLE" feature                                            |
| owner? \*                      | boolean                                           | true if [the user](#get-current-user-guilds) is the owner of the guild                                             |
| owner_id                       | snowflake                                         | id of owner                                                                                                        |
| permissions? \*                | string                                            | total permissions for [the user](#get-current-user-guilds) in the guild (excludes overwrites and implicit permissions) |
| afk_channel_id                 | ?snowflake                                        | id of afk channel                                                                                                  |
| afk_timeout                    | integer                                           | afk timeout in seconds                                                                                             |
| widget_enabled?                | boolean                                           | true if the server widget is enabled                                                                               |
| widget_channel_id?             | ?snowflake                                        | the channel id that the widget will generate an invite to, or `null` if set to no invite                           |
| verification_level             | integer                                           | [verification level](#verification-level) required for the guild                                                   |
| default_message_notifications  | integer                                           | default [message notifications level](#default-message-notification-level)                                         |
| explicit_content_filter        | integer                                           | [explicit content filter level](#explicit-content-filter-level)                                                    |
| roles                          | array of [role](#role-object) objects             | roles in the guild                                                                                                 |
| emojis                         | array of [emoji](#emoji-object) objects           | custom guild emojis                                                                                                |
| features                       | array of [guild feature](#guild-features) strings | enabled guild features                                                                                             |
| mfa_level                      | integer                                           | required [MFA level](#mfa-level) for the guild                                                                     |
| application_id                 | ?snowflake                                        | application id of the guild creator if it is bot-created                                                           |
| system_channel_id              | ?snowflake                                        | the id of the channel where guild notices such as welcome messages and boost events are posted                     |
| system_channel_flags           | integer                                           | [system channel flags](#system-channel-flags)                                                                      |
| rules_channel_id               | ?snowflake                                        | the id of the channel where Community guilds can display rules and/or guidelines                                   |
| max_presences?                 | ?integer                                          | the maximum number of presences for the guild (`null` is always returned, apart from the largest of guilds)        |
| max_members?                   | integer                                           | the maximum number of members for the guild                                                                        |
| vanity_url_code                | ?string                                           | the vanity url code for the guild                                                                                  |
| description                    | ?string                                           | the description of a guild                                                                                         |
| banner                         | ?string                                           | banner hash                                                                                                        |
| premium_tier                   | integer                                           | [premium tier](#premium-tier) (Server Boost level)                                                                 |
| premium_subscription_count?    | integer                                           | the number of boosts this guild currently has                                                                      |
| preferred_locale               | string                                            | the preferred locale of a Community guild; used in server discovery and notices from Discord, and sent in interactions; defaults to "en-US" |
| public_updates_channel_id      | ?snowflake                                        | the id of the channel where admins and moderators of Community guilds receive notices from Discord                 |
| max_video_channel_users?       | integer                                           | the maximum amount of users in a video channel                                                                     |
| max_stage_video_channel_users? | integer                                           | the maximum amount of users in a stage video channel                                                               |
| approximate_member_count?      | integer                                           | approximate number of members in this guild                                                                        |
| approximate_presence_count?    | integer                                           | approximate number of non-offline members in this guild                                                            |
| welcome_screen?                | [welcome screen](#welcome-screen-object) object   | the welcome screen of a Community guild, shown to new members, returned in an [Invite](#invite-object)'s guild object |
| nsfw_level                     | integer                                           | [guild NSFW level](#guild-nsfw-level)                                                                              |
| stickers?                      | array of [sticker](#sticker-object) objects       | custom guild stickers                                                                                              |
| premium_progress_bar_enabled   | boolean                                           | whether the guild has the boost progress bar enabled                                                               |
| safety_alerts_channel_id       | ?snowflake                                        | the id of the channel where admins and moderators of Community guilds receive safety alerts from Discord           |

**\* These fields are only sent when using the [GET Current User Guilds](#get-current-user-guilds) endpoint and are relative to the requested user**

#### Default Message Notification Level
| Key           | Value | Description                                                                        |
|---------------|-------|------------------------------------------------------------------------------------|
| All Messages  | 0     | members will receive notifications for all messages by default                     |
| Only Mentions | 1     | members will receive notifications only for messages that @mention them by default |

#### Explicit Content Filter Level
| Level                  | Integer | Description                                                 |
|------------------------|---------|-------------------------------------------------------------|
| Disabled               | 0       | media content will not be scanned                           |
| Members Without Roles  | 1       | media content sent by members without roles will be scanned |
| All Members            | 2       | media content sent by all members will be scanned           |

#### MFA Level
| Level    | Integer | Description                                             |
|----------|---------|---------------------------------------------------------|
| None     | 0       | guild has no MFA/2FA requirement for moderation actions |
| Elevated | 1       | guild has a 2FA requirement for moderation actions      |

#### Verification Level
| Level     | Integer | Description                                               |
|-----------|---------|-----------------------------------------------------------|
| None      | 0       | unrestricted                                              |
| Low       | 1       | must have verified email on account                       |
| Medium    | 2       | must be registered on Discord for longer than 5 minutes   |
| High      | 3       | must be a member of the server for longer than 10 minutes |
| Very High | 4       | must have a verified phone number                         |

#### Guild NSFW Level
| Level          | Value |
|----------------|-------|
| Default        | 0     |
| Explicit       | 1     |
| Safe           | 2     |
| Age Restricted | 3     |

#### Premium Tier
| Level  | Integer | Description                                   |
|--------|---------|-----------------------------------------------|
| None   | 0       | guild has not unlocked any Server Boost perks |
| Tier 1 | 1       | guild has unlocked Server Boost level 1 perks |
| Tier 2 | 2       | guild has unlocked Server Boost level 2 perks |
| Tier 3 | 3       | guild has unlocked Server Boost level 3 perks |

#### System Channel Flags
| Flag                                                      | Value  | Description                                                   |
|-----------------------------------------------------------|--------|---------------------------------------------------------------|
| Suppress Join Notifications                               | 1 << 0 | Suppress member join notifications                            |
| Suppress Premium Subscriptions                            | 1 << 1 | Suppress server boost notifications                           |
| Suppress Guild Reminder Notifications                     | 1 << 2 | Suppress server setup tips                                    |
| Suppress Join Notification Replies                        | 1 << 3 | Hide member join sticker reply buttons                        |
| Suppress Role Subscription Purchase Notifications         | 1 << 4 | Suppress role subscription purchase and renewal notifications |
| Suppress Role Subscription Purchase Notification Replies  | 1 << 5 | Hide role subscription sticker reply buttons                  |

#### Guild Features
| Feature                              -     | Description                                                                                          |
|--------------------------------------------|------------------------------------------------------------------------------------------------------|
| Animated Banner                            | guild has access to set an animated guild banner image                                               |
| Animated Icon                              | guild has access to set an animated guild icon                                                       |
| Application Command Permissions V2         | guild is using the old permissions configuration behavior                                            |
| Auto Moderation                            | guild has set up auto moderation rules                                                               |
| Banner                                     | guild has access to set a guild banner image                                                         |
| Community                                  | guild can enable welcome screen, screening, stage channels, discovery, and receive community updates |
| Creator Monetizable Provisional            | guild has enabled monetization                                                                       |
| Creator Store Page                         | guild has enabled the role subscription promo page                                                   |
| Developer Support Server                   | guild has been set as a support server on the App Directory                                          |
| Discoverable                               | guild is able to be discovered in the directory                                                      |
| Featurable                                 | guild is able to be featured in the directory                                                        |
| Invites Disabled                           | guild has paused invites, preventing new users from joining                                          |
| Invite Splash                              | guild has access to set an invite splash background                                                  |
| Member Verification Gate Enabled           | guild has enabled [Membership Screening](#membership-screening-object)                               |
| More Stickers                              | guild has increased custom sticker slots                                                             |
| News                                       | guild has access to create announcement channels                                                     |
| Partnered                                  | guild is partnered                                                                                   |
| Preview Enabled                            | guild can be previewed before joining via Membership Screening or the directory                      |
| Raid Alerts Disabled                       | guild has disabled alerts for join raids in the configured safety alerts channel                     |
| Role Icons                                 | guild is able to set role icons                                                                      |
| Role Subscriptions Available For Purchase  | guild has role subscriptions that can be purchased                                                   |
| Role Subscriptions Enabled                 | guild has enabled role subscriptions                                                                 |
| Ticketed Events Enabled                    | guild has enabled ticketed events                                                                    |
| Vanity Url                                 | guild has access to set a vanity URL                                                                 |
| Verified                                   | guild is verified                                                                                    |
| Vip Regions                                | guild has access to set 384kbps bitrate in voice (previously VIP voice servers)                      |
| Welcome Screen Enabled                     | guild has enabled the welcome screen                                                                 |

#### Mutable Guild Features
| Features              | Required Permissions | Effects                                                   |
|-----------------------|----------------------|-----------------------------------------------------------|
| Community             | Administrator        | Enables Community Features in the guild                   |
| Discoverable          | Administrator*       | Enables discovery in the guild, making it publicly listed |
| Invites Disabled      | Manage Guild         | Pauses all invites/access to the server                   |
| Raid Alerts Disabled  | Manage Guild         | Disables alerts for join raids                            |

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

### Guild Member Object
| Field                         | Type                        | Description                                                                                                   |
|-------------------------------|-----------------------------|---------------------------------------------------------------------------------------------------------------|
| user?                         | [user](#user-object) object | the user this guild member represents                                                                         |
| nick?                         | ?string                     | this user's guild nickname                                                                                    |
| avatar?                       | ?string                     | the member's guild avatar hash                                                                                |
| roles                         | array of snowflakes         | array of [role](#role-object) object ids                                                                      |
| joined_at                     | ISO8601 timestamp           | when the user joined the guild                                                                                |
| premium_since?                | ?ISO8601 timestamp          | when the user started boosting the guild                                                                      |
| deaf                          | boolean                     | whether the user is deafened in voice channels                                                                |
| mute                          | boolean                     | whether the user is muted in voice channels                                                                   |
| flags                         | number                      | [guild member flags](#guild-member-flags) represented as a bit set, defaults to `0`                           |
| pending?                      | boolean                     | whether the user has passed the guild's [Membership Screening](#membership-screening-object) requirements     |
| permissions?                  | string                      | total permissions of the member in the channel, including overwrites, returned when in the interaction object |
| communication_disabled_until? | ?ISO8601 timestamp          | when the user's timeout will expire and the user will be able to communicate in the guild again               |

**The field `user` won't be included in the member object attached to `MESSAGE_CREATE` and `MESSAGE_UPDATE` gateway events.**  
**In `GUILD_` events, `pending` will always be included as true or false. In non `GUILD_` events which can only be triggered by non-`pending` users, `pending` will not be included.**

#### Guild Member Flags
| Flag                   | Value  | Description                                           | Editable |
|------------------------|--------|-------------------------------------------------------|----------|
| Did Rejoin             | 1 << 0 | Member has left and rejoined the guild                | false    |
| Completed Onboarding   | 1 << 1 | Member has completed onboarding                       | false    |
| Bypasses Verification  | 1 << 2 | Member is exempt from guild verification requirements | true     |
| Started Onboarding     | 1 << 3 | Member has started onboarding                         | false    |

**BYPASSES_VERIFICATION allows a member who does not meet verification requirements to participate in a server.**

### Integration Object
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

### Ban Object
| Field  | Type                        | Description            |
|--------|-----------------------------|------------------------|
| reason | ?string                     | the reason for the ban |
| user   | [user](#user-object) object | the banned user        |

##### Example Ban
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

**When creating or updating a prompt option, the `emoji_id`, `emoji_name`, and `emoji_animated` fields must be used instead of the emoji object.**

#### Onboarding Mode
**Defines the criteria used to satisfy Onboarding constraints that are required for enabling.**

| Name                | Value | Description                                               |
|---------------------|-------|-----------------------------------------------------------|
| Onboarding Default   | 0     | Counts only Default Channels towards constraints          |
| Onboarding Advanced  | 1     | Counts Default Channels and Questions towards constraints |

#### Prompt Types
| Name            | Value |
|-----------------|-------|
| Multiple Choice | 0     |
| Dropdown        | 1     |

##### Example Guild Onboarding
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

### User Object
| Field              | Type      | Description                                                                             |
|--------------------|-----------|-----------------------------------------------------------------------------------------|
| id                 | snowflake | the user's id                                                                           |
| username           | string    | the user's username, not unique across the platform                                     |
| discriminator      | string    | the user's Discord-tag                                                                  |
| global_name        | ?string   | the user's display name, if it is set. For bots, this is the application name           |
| avatar             | ?string   | the user's avatar hash                                                                  |
| bot?               | boolean   | whether the user belongs to an OAuth2 application                                       |
| system?            | boolean   | whether the user is an Official Discord System user (part of the urgent message system) |
| mfa_enabled?       | boolean   | whether the user has two factor enabled on their account                                | 
| banner?            | ?string   | the user's banner hash                                                                  |
| accent_color?      | ?integer  | the user's banner color encoded as an integer representation of hexadecimal color code  |
| locale?            | string    | the user's chosen language option                                                       |
| verified?          | boolean   | whether the email on this account has been verified                                     |
| email?             | ?string   | the user's email                                                                        |
| flags?             | integer   | the [flags](#user-flags) on a user's account                                            |
| premium_type?      | integer   | the [type of Nitro subscription](#premium-types) on a user's account                    |
| public_flags?      | integer   | the public [flags](#user-flags) on a user's account                                     |
| avatar_decoration? | ?string   | the user's avatar decoration hash                                                       |

#### User Flags
| Value   | Name                     | Description                                                            |
|---------|--------------------------|------------------------------------------------------------------------|
| 1 << 0  | Staff                    | Discord Employee                                                       |
| 1 << 1  | Partner                  | Partnered Server Owner                                                 |
| 1 << 2  | Hypesquad                | HypeSquad Events Member                                                |
| 1 << 3  | Bug Hunter Level 1       | Bug Hunter Level 1                                                     |
| 1 << 6  | Hypesquad Online House 1 | House Bravery Member                                                   |
| 1 << 7  | Hypesquad Online House 2 | House Brilliance Member                                                |
| 1 << 8  | Hypesquad Online House 3 | House Balance Member                                                   |
| 1 << 9  | Premium Early Supporter  | Early Nitro Supporter                                                  |
| 1 << 10 | Team Pseudo User         | User is a team                                                         |
| 1 << 14 | Bug Hunter Level 2       | Bug Hunter Level 2                                                     |
| 1 << 16 | Verified Bot             | Verified Bot                                                           |
| 1 << 17 | Verified Developer       | Early Verified Bot Developer                                           |
| 1 << 18 | Certified Moderator      | Moderator Programs Alumni                                              |
| 1 << 19 | Bot Http Interactions    | Bot uses only HTTP interactions and is shown in the online member list |
| 1 << 22 | Active Developer         | User is an Active Developer                                            |

#### Premium Types
**Premium types denote the level of premium a user has.**

| Value | Name          |
|-------|---------------|
| 0     | None          |
| 1     | Nitro Classic |
| 2     | Nitro         |
| 3     | Nitro Basic   |

### Connection Object
**The connection object that the user has attached.**

| Field         | Type    | Description                                                                     |
|---------------|---------|---------------------------------------------------------------------------------|
| id            | string  | id of the connection account                                                    |
| name          | string  | the username of the connection account                                          |
| type          | string  | the [service](#object-services) of this connection                              |
| revoked?      | boolean | whether the connection is revoked                                               |
| integrations? | array   | an array of partial [server integrations](#integration-object)                  |
| verified      | boolean | whether the connection is verified                                              |
| friend_sync   | boolean | whether friend sync is enabled for this connection                              |
| show_activity | boolean | whether activities related to this connection will be shown in presence updates |
| two_way_link  | boolean | whether this connection has a corresponding third party OAuth2 token            |
| visibility    | integer | [visibility](#visibility-types) of this connection                              |

#### Services
| Value           | Name                |
|-----------------|---------------------|
| battlenet       | Battle.net          |
| ebay            | eBay                |
| epicgames       | Epic Games          |
| facebook        | Facebook            |
| github          | GitHub              |
| instagram       | Instagram           |
| leagueoflegends | League of Legends   |
| paypal          | PayPal              |
| playstation     | PlayStation Network |
| reddit          | Reddit              |
| riotgames       | Riot Games          |
| spotify         | Spotify             |
| skype *         | Skype               |
| steam           | Steam               |
| tiktok          | TikTok              |
| twitch          | Twitch              |
| twitter         | X (Twitter)         |
| xbox            | Xbox                |
| youtube         | YouTube             |

##### \* Service can no longer be added by users

#### Visibility Types
| Value | Name     | Description                                      |
|-------|----------|--------------------------------------------------|
| 0     | None     | invisible to everyone except the user themselves |
| 1     | Everyone | visible to everyone                              |

### Application Role Connection Object
**The role connection object that an application has attached to a user.**

| Field             | Type    | Description                                                                                                                                                                                                  |
|-------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| platform_name     | ?string | the vanity name of the platform a bot has connected (max 50 characters)                                                                                                                                      |
| platform_username | ?string | the username on the platform a bot has connected (max 100 characters)                                                                                                                                        |
| metadata          | object  | object mapping [application role connection metadata](#application-role-connection-metadata-object) keys to their `string`-ified value (max 100 characters) for the user on the platform a bot has connected |

#### Application Role Connection Metadata Object
| Field                      | Type                                                                                | Description                                                                                      |
|----------------------------|-------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| type                       | [ApplicationRoleConnectionMetadataType](#application-role-connection-metadata-type) | type of metadata value                                                                           |
| key                        | string                                                                              | dictionary key for the metadata field (must be `a-z`, `0-9`, or `_` characters; 1-50 characters) |
| name                       | string                                                                              | name of the metadata field (1-100 characters)                                                    |
| name_localizations?        | dictionary with keys in available locales                                           | translations of the name                                                                         |
| description                | string                                                                              | description of the metadata field (1-200 characters)                                             |
| description_localizations? | dictionary with keys in available locales                                           | translations of the description                                                                  |

#### Application Role Connection Metadata Type
| Type                           | Value | Description                                                                                                                            |
|--------------------------------|-------|----------------------------------------------------------------------------------------------------------------------------------------|
| INTEGER_LESS_THAN_OR_EQUAL     | 1     | the metadata value (`integer`) is less than or equal to the guild's configured value (`integer`)                                       |
| INTEGER_GREATER_THAN_OR_EQUAL  | 2     | the metadata value (`integer`) is greater than or equal to the guild's configured value (`integer`)                                    |
| INTEGER_EQUAL                  | 3     | the metadata value (`integer`) is equal to the guild's configured value (`integer`)                                                    |
| INTEGER_NOT_EQUAL              | 4     | the metadata value (`integer`) is not equal to the guild's configured value (`integer`)                                                |
| DATETIME_LESS_THAN_OR_EQUAL    | 5     | the metadata value (`ISO8601 string`) is less than or equal to the guild's configured value (`integer`; `days before current date`)    |
| DATETIME_GREATER_THAN_OR_EQUAL | 6     | the metadata value (`ISO8601 string`) is greater than or equal to the guild's configured value (`integer`; `days before current date`) |
| BOOLEAN_EQUAL                  | 7     | the metadata value (`integer`) is equal to the guild's configured value (`integer`; `1`)                                               |
| BOOLEAN_NOT_EQUAL              | 8     | the metadata value (`integer`) is not equal to the guild's configured value (`integer`; `1`)                                           |


### Emoji Object
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

### Sticker Object
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
| Standard | 1     | an official sticker in a pack                         |
| Guild    | 2     | a sticker uploaded to a guild for the guild's members |

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

### Role Object
**Roles represent a set of permissions attached to a group of users.**  
**Roles have names, colors, and can be "pinned" to the side bar, causing their members to be listed separately. Roles can have separate permission profiles for the global context (guild) and channel context.**  
**The `@everyone` role has the same ID as the guild it belongs to.**

| Field          | Type                                     | Description                                      |
|----------------|------------------------------------------|--------------------------------------------------|
| id             | snowflake                                | role id                                          |
| name           | string                                   | role name                                        |
| color          | integer                                  | integer representation of hexadecimal color code |
| hoist          | boolean                                  | if this role is pinned in the user listing       |
| icon?          | ?string                                  | role icon hash                                   |
| unicode_emoji? | ?string                                  | role unicode emoji                               |
| position       | integer                                  | position of this role                            |
| permissions    | string                                   | permission bit set                               |
| managed        | boolean                                  | whether this role is managed by an integration   |
| mentionable    | boolean                                  | whether this role is mentionable                 |
| tags?          | [role tags](#role-tags-structure) object | the tags this role has                           |
| flags          | integer                                  | [role flags](#role-flags) combined as a bitfield |

#### Role Tags Structure
**Tags with type `null` represent booleans.**  
**They will be present and set to `null` if they are "true", and will be not present if they are "false".**

| Field                    | Type      | Description                                        |
|--------------------------|-----------|----------------------------------------------------|
| bot_id?                  | snowflake | the id of the bot this role belongs to             |
| integration_id?          | snowflake | the id of the integration this role belongs to     |
| premium_subscriber?      | null      | whether this is the guild's Booster role           |
| subscription_listing_id? | snowflake | the id of this role's subscription sku and listing |
| available_for_purchase?  | null      | whether this role is available for purchase        |
| guild_connections?       | null      | whether this role is a guild's linked role         |

#### Role Flags
| Flag      | Value  | Description                                                                         |
|-----------|--------|-------------------------------------------------------------------------------------|
| IN_PROMPT | 1 << 0 | role can be selected by members in an [onboarding](#guild-onboarding-object) prompt |

### Guild Scheduled Event Object
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

**\* `creator_id` will be null and `creator` will not be included for events created before October 25th, 2021, when the concept of `creator_id` was introduced and tracked.**

#### Guild Scheduled Event Privacy Level
| Level      | Value | Description                                             |
|------------|-------|---------------------------------------------------------|
| Guild Only | 2     | the scheduled event is only accessible to guild members |

#### Guild Scheduled Event Entity Types
| Type           | Value |
|----------------|-------|
| Stage Instance | 1     |
| Voice          | 2     |
| External       | 3     |

#### Field Requirements By Entity Type

**The following table shows field requirements based on current entity type.**  
`value`    : This field is required to be a non-null value  
`null`     : This field is required to be null  
`-`        : No strict requirements  

| Entity Type    | channel_id | entity_metadata | scheduled_end_time |
|----------------|------------|-----------------|--------------------|
| Stage Instance | value      | null            | -                  |
| Voice          | value      | null            | -                  |
| External       | null       | value *         | value              |

**\* `entity_metadata` with a non-null `location` must be provided**


#### Guild Scheduled Event Status
| Type        | Value |
|-------------|-------|
| Scheduled   | 1     |
| Active      | 2     |
| Completed\* | 3     |
| Canceled\*  | 4     |

**\* Once `status` is set to `COMPLETED` or `CANCELED`, the `status` can no longer be updated**

#### Valid Guild Scheduled Event Status Transitions
SCHEDULED --> ACTIVE  
ACTIVE --------> COMPLETED  
SCHEDULED --> CANCELED


#### Guild Scheduled Event Entity Metadata
| Field       | Type   | Description                              |
|-------------|--------|------------------------------------------|
| location?\* | string | location of the event (1-100 characters) |

**\* required for events with `'entity_type': EXTERNAL`**

#### Guild Scheduled Event User Object
| Field                    | Type                                 | Description                                                                       |
|--------------------------|--------------------------------------|-----------------------------------------------------------------------------------|
| guild_scheduled_event_id | snowflake                            | the scheduled event id which the user subscribed to                               |
| user                     | [user](#user-object)                 | user which subscribed to an event                                                 |
| member?                  | [guild member](#guild-member-object) | guild member data for this user for the guild which this event belongs to, if any |

### Guild Template Object
| Field                   | Type                                  | Description                                            |
|-------------------------|---------------------------------------|--------------------------------------------------------|
| code                    | string                                | the template code (unique ID)                          |
| name                    | string                                | template name                                          |
| description             | ?string                               | the description for the template                       |
| usage_count             | number                                | number of times this template has been used            |
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

### Channel Object
| Field                               | Type                                                 | Description                                                                                                                                                                                                     |
|-------------------------------------|------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                                  | snowflake                                            | the id of this channel                                                                                                                                                                                          |
| type                                | integer                                              | the [type of channel](#channel-types)                                                                                                                                                                           |
| guild_id?                           | snowflake                                            | the id of the guild (may be missing for some channel objects received over gateway guild dispatches)                                                                                                            |
| position?                           | integer                                              | sorting position of the channel                                                                                                                                                                                 |
| permission_overwrites?              | array of [overwrite](#overwrite-object) objects      | explicit permission overwrites for members and roles                                                                                                                                                            |
| name?                               | ?string                                              | the name of the channel (1-100 characters)                                                                                                                                                                      |
| topic?                              | ?string                                              | the channel topic (0-4096 characters for `GUILD_FORUM` and `GUILD_MEDIA` channels, 0-1024 characters for all others)                                                                                            |
| nsfw?                               | boolean                                              | whether the channel is nsfw                                                                                                                                                                                     |
| last_message_id?                    | ?snowflake                                           | the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread)                                               |
| bitrate?                            | integer                                              | the bitrate (in bits) of the voice channel                                                                                                                                                                      |
| user_limit?                         | integer                                              | the user limit of the voice channel                                                                                                                                                                             |
| rate_limit_per_user?\*              | integer                                              | amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected                                 |
| recipients?                         | array of [user](#user-object) objects                | the recipients of the DM                                                                                                                                                                                        |
| icon?                               | ?string                                              | icon hash of the group DM                                                                                                                                                                                       |
| owner_id?                           | snowflake                                            | id of the creator of the group DM or thread                                                                                                                                                                     |
| application_id?                     | snowflake                                            | application id of the group DM creator if it is bot-created                                                                                                                                                     |
| managed?                            | boolean                                              | for group DM channels: whether the channel is managed by an application via the `gdm.join` OAuth2 scope                                                                                                         |
| parent_id?                          | ?snowflake                                           | for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created                                   |
| last_pin_timestamp?                 | ?ISO8601 timestamp                                   | when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.                                                                                      |
| rtc_region?                         | ?string                                              | [voice region](#voice-region-object) id for the voice channel, automatic when set to null                                                                                                                       |
| video_quality_mode?                 | integer                                              | the camera [video quality mode](#video-quality-modes) of the voice channel, 1 when not present                                                                                                                  |
| message_count?\*\*                  | integer                                              | number of messages (not including the initial message or deleted messages) in a thread.                                                                                                                         |
| member_count?                       | integer                                              | an approximate count of users in a thread, stops counting at 50                                                                                                                                                 |
| thread_metadata?                    | [thread metadata](#thread-metadata-object) object    | thread-specific fields not needed by other channels                                                                                                                                                             |
| member?                             | [thread member](#thread-member-object) object        | thread member object for the current user, if they have joined the thread, only included on certain API endpoints                                                                                               |
| default_auto_archive_duration?      | integer                                              | default duration, copied onto newly created threads, in minutes, threads will stop showing in the channel list after the specified period of inactivity, can be set to: 60, 1440, 4320, 10080                   |
| permissions?                        | string                                               | computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction.                                        |
| flags?                              | integer                                              | [channel flags](#channel-flags) combined as bitfield                                                                                                                                                            |
| total_message_sent?                 | integer                                              | number of messages ever sent in a thread, it's similar to `message_count` on message creation, but will not decrement the number when a message is deleted                                                      |
| available_tags?                     | array of [tag](#forum-tag-object) objects            | the set of tags that can be used in a `GUILD_FORUM` or a `GUILD_MEDIA` channel                                                                                                                                  |
| applied_tags?                       | array of snowflakes                                  | the IDs of the set of tags that have been applied to a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel                                                                                                     |
| default_reaction_emoji?             | ?[default reaction](#default-reaction-object) object | the emoji to show in the add reaction button on a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel                                                                                                          |
| default_thread_rate_limit_per_user? | integer                                              | the initial `rate_limit_per_user` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update.                                                   |
| default_sort_order?                 | ?integer                                             | the [default sort order type](#sort-order-types) used to order posts in `GUILD_FORUM` and `GUILD_MEDIA` channels. Defaults to `null`, which indicates a preferred sort order hasn't been set by a channel admin |
| default_forum_layout?               | integer                                              | the [default forum layout view](#forum-layout-types) used to display posts in `GUILD_FORUM` channels. Defaults to `0`, which indicates a layout view has not been set by a channel admin                        |

**\* `rate_limit_per_user` also applies to thread creation. Users can send one message and create one thread during each `rate_limit_per_user` interval.**  
**\*\* For threads created before July 1, 2022, the message count is inaccurate when it's greater than 50.**

#### Channel Types
| Type                | ID | Description                                                                                                                             |
|---------------------|----|-----------------------------------------------------------------------------------------------------------------------------------------|
| Guild Text           | 0  | a text channel within a server                                                                                                          |
| Dm                   | 1  | a direct message between users                                                                                                          |
| Guild Voice          | 2  | a voice channel within a server                                                                                                         |
| Group Dm             | 3  | a direct message between multiple users                                                                                                 |
| Guild Category       | 4  | an organizational category that contains up to 50 channels                                                                              |
| Guild Announcement   | 5  | a channel that users can follow and crosspost into their own server (formerly news channels)                                            |
| Announcement Thread  | 10 | a temporary sub-channel within a GUILD_ANNOUNCEMENT channel                                                                             |
| Public Thread        | 11 | a temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel                                                                      |
| Private Thread       | 12 | a temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission |
| Guild Stage Voice    | 13 | a voice channel for hosting events with an audience                                                                                     |
| Guild Directory      | 14 | the channel in a hub containing the listed servers                                                                                      |
| Guild Forum          | 15 | Channel that can only contain threads                                                                                                   |
| Guild Media          | 16 | Channel that can only contain threads, similar to `GUILD_FORUM` channels                                                                |

**\* The `GUILD_MEDIA` channel type is still in active development. Avoid implementing any features that are not documented here, since they are subject to change without notice!**

#### Partial Channel Object
| Field       | Type      | Description                                          |
|-------------|-----------|------------------------------------------------------|
| id          | snowflake | id of the channel                                    |
| type        | integer   | the [type of channel](#channel-object-channel-types) |
| name        | string    | the name of the channel                              |
| permissions | string    | permission bit set                                   |

#### Video Quality Modes
| Mode | Value | Description                                         |
|------|-------|-----------------------------------------------------|
| Auto | 1     | Discord chooses the quality for optimal performance |
| Full | 2     | 720p                                                |

#### Channel Flags
| Flag                        | Value   | Description                                                                                                                                                     |
|-----------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Pinned                      | 1 << 1  | this thread is pinned to the top of its parent `GUILD_FORUM` or `GUILD_MEDIA` channel                                                                           |
| Require Tag                 | 1 << 4  | whether a tag is required to be specified when creating a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel. Tags are specified in the `applied_tags` field. |
| Hide Media Download Options | 1 << 15 | when set hides the embedded media download options. Available only for media channels                                                                           |

#### Sort Order Types
| Flag            | Value | Description                                                    |
|-----------------|-------|----------------------------------------------------------------|
| Latest Activity  | 0     | Sort forum posts by activity                                   |
| Creation Date    | 1     | Sort forum posts by creation time (from most recent to oldest) |

#### Forum Layout Types
| Flag         | Value | Description                               |
|--------------|-------|-------------------------------------------|
| Not Set      | 0     | No default has been set for forum channel |
| List View    | 1     | Display posts as a list                   |
| Gallery View | 2     | Display posts as a collection of tiles    |

##### Example Guild Announcement Channel
```json
{
  "id": "41771983423143937",
  "guild_id": "41771983423143937",
  "name": "important-news",
  "type": 5,
  "position": 6,
  "permission_overwrites": [],
  "nsfw": true,
  "topic": "Rumors about Half Life 3",
  "last_message_id": "155117677105512449",
  "parent_id": "399942396007890945",
  "default_auto_archive_duration": 60
}
```

##### Example Guild Voice Channel
```json
{
  "id": "155101607195836416",
  "last_message_id": "174629835082649376",
  "type": 2,
  "name": "ROCKET CHEESE",
  "position": 5,
  "parent_id": null,
  "bitrate": 64000,
  "user_limit": 0,
  "rtc_region": null,
  "guild_id": "41771983423143937",
  "permission_overwrites": [],
  "rate_limit_per_user": 0,
  "nsfw": false,
}
```

##### Example DM Channel
```json
{
  "last_message_id": "3343820033257021450",
  "type": 1,
  "id": "319674150115610528",
  "recipients": [
    {
      "username": "test",
      "discriminator": "9999",
      "id": "82198898841029460",
      "avatar": "33ecab261d4681afa4d85a04691c4a01"
    }
  ]
}
```

##### Example Group DM Channel
```json
{
  "name": "Some test channel",
  "icon": null,
  "recipients": [
    {
      "username": "test",
      "discriminator": "9999",
      "id": "82198898841029460",
      "avatar": "33ecab261d4681afa4d85a04691c4a01"
    },
    {
      "username": "test2",
      "discriminator": "9999",
      "id": "82198810841029460",
      "avatar": "33ecab261d4681afa4d85a10691c4a01"
    }
  ],
  "last_message_id": "3343820033257021450",
  "type": 3,
  "id": "319674150115710528",
  "owner_id": "82198810841029460"
}
```

##### Example Channel Category
```json
{
  "permission_overwrites": [],
  "name": "Test",
  "parent_id": null,
  "nsfw": false,
  "position": 0,
  "guild_id": "290926798629997250",
  "type": 4,
  "id": "399942396007890945"
}
```

##### Example Thread Channel
```json
{
  "id": "41771983423143937",
  "guild_id": "41771983423143937",
  "parent_id": "41771983423143937",
  "owner_id": "41771983423143937",
  "name": "don't buy dota-2",
  "type": 11,
  "last_message_id": "155117677105512449",
  "message_count": 1,
  "member_count": 5,
  "rate_limit_per_user": 2,
  "thread_metadata": {
    "archived": false,
    "auto_archive_duration": 1440,
    "archive_timestamp": "2021-04-12T23:40:39.855793+00:00",
    "locked": false
  },
  "total_message_sent": 1
}
```

### Message Object
| Field                       | Type                                                            | Description                                                                                           |
|-----------------------------|-----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| id                          | snowflake                                                       | id of the message                                                                                     |
| channel_id                  | snowflake                                                       | id of the channel the message was sent in                                                             |
| author\*                    | [user](#user-object) object                                     | the author of this message                                                                            |
| content\*\*                 | string                                                          | contents of the message                                                                               |
| timestamp                   | ISO8601 timestamp                                               | when this message was sent                                                                            |
| edited_timestamp            | ?ISO8601 timestamp                                              | when this message was edited (or null if never)                                                       |
| tts                         | boolean                                                         | whether this was a TTS message                                                                        |
| mention_everyone            | boolean                                                         | whether this message mentions everyone                                                                |
| mentions                    | array of [user](#user-object) objects                           | users specifically mentioned in the message                                                           |
| mention_roles               | array of [role](#role-object) object ids                        | roles specifically mentioned in this message                                                          |
| mention_channels?\*\*\*     | array of [channel mention](#channel-mention-object) objects     | channels specifically mentioned in this message                                                       |
| attachments\*\*             | array of [attachment](#attachment-object) objects               | any attached files                                                                                    |
| embeds\*\*                  | array of [embed](#embed-object) objects                         | any embedded content                                                                                  |
| reactions?                  | array of [reaction](#reaction-object) objects                   | reactions to the message                                                                              |
| nonce?                      | integer or string                                               | used for validating a message was sent                                                                |
| pinned                      | boolean                                                         | whether this message is pinned                                                                        |
| webhook_id?                 | snowflake                                                       | if the message is generated by a webhook, this is the webhook's id                                    |
| type                        | integer                                                         | [type of message](#message-types)                                                                     |
| activity?                   | [message activity](#message-activity-structure) object          | sent with Rich Presence-related chat embeds                                                           |
| application?                | partial [application](#application-object) object               | sent with Rich Presence-related chat embeds                                                           |
| application_id?             | snowflake                                                       | if the message is an Interaction or application-owned webhook, this is the id of the application      |
| message_reference?          | [message reference](#message-reference-structure) object        | data showing the source of a crosspost, channel follow add, pin, or reply message                     |
| flags?                      | integer                                                         | [message flags](#message-flags) combined as a bitfield                                                |
| referenced_message?\*\*\*\* | ?[message object](#message-object)                              | the message associated with the message_reference                                                     |
| interaction?                | [message interaction object](#message-interaction-structure)    | sent if the message is a response to an Interaction                                                   |
| thread?                     | [channel](#channel-object) object                               | the thread that was started from this message, includes [thread member](#thread-member-object) object |
| components?\*\*             | array of [message components](#component-object)                | sent if the message contains components like buttons, action rows, or other interactive components    |
| sticker_items?              | array of [message sticker item objects](#sticker-item-object)   | sent if the message contains stickers                                                                 |
| position?                   | integer                                                         | A generally increasing integer (there may be gaps or duplicates) that represents the approximate position of the message in a thread, it can be used to estimate the relative position of the message in a thread in company with `total_message_sent` on parent thread |
| role_subscription_data?     | [role subscription data](#role-subscription-data-object) object | data of the role subscription purchase or renewal that prompted this ROLE_SUBSCRIPTION_PURCHASE message          |
| resolved?                   | [resolved](#resolved-data-structure) data                       | data for users, members, channels, and roles in the message's [auto-populated select menus](#select-menu-object) |


\* **The author object follows the structure of the user object, but is only a valid user in the case where the message is generated by a user or bot user. If the message is generated by a webhook, the author object corresponds to the webhook's id, username, and avatar. You can tell if a message is generated by a webhook by checking for the `webhook_id` on the message object.**  
\*\* **An app will receive empty values in the `content`, `embeds`, `attachments`, and `components` fields if they have not configured (or been approved for) the `MESSAGE_CONTENT` privileged intent (`1 << 15`).**  
\*\*\* **Not all channel mentions in a message will appear in `mention_channels`. Only textual channels that are visible to everyone in a lurkable guild will ever be included. Only crossposted messages (via Channel Following) currently include `mention_channels` at all. If no mentions in the message meet these requirements, this field will not be sent.**  
\*\*\*\* **This field is only returned for messages with a `type` of `19` (REPLY) or `21` (THREAD_STARTER_MESSAGE). If the message is a reply but the `referenced_message` field is not present, the backend did not attempt to fetch the message that was being replied to, so its state is unknown. If the field exists but is null, the referenced message was deleted.**

#### Forum and Media Thread Message Params Object
| Field             | Type                                                      | Description                                                                                      |
|-------------------|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| content?\*        | string                                                    | Message contents (up to 2000 characters)                                                         |
| embeds?\*         | array of [embed](#embed-object) objects                   | Up to 10 `rich` embeds (up to 6000 characters)                                                   |
| allowed_mentions? | [allowed mention object](#allowed-mentions-object)        | Allowed mentions for the message                                                                 |
| components?\*     | array of [message component](#component-object) objects   | Components to include with the message                                                           |
| sticker_ids?\*    | array of snowflakes                                       | IDs of up to 3 [stickers](#sticker-object) in the server to send in the message                  |
| attachments?      | array of partial [attachment](#attachment-object) objects | Attachment objects with `filename` and `description`                                             |
| flags?            | integer                                                   | [Message flags](#message-flags) (only `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATIONS` can be set) |

\* **At least one of `content`, `embeds`, `sticker_ids`, `components`, or `files[n]` is required.**

#### Message Types
| Type                                         | Value | Deletable |
|----------------------------------------------|-------|-----------|
| Default                                      | 0     | true      |
| Recipient Add                                | 1     | false     |
| Recipient Remove                             | 2     | false     |
| Call                                         | 3     | false     |
| Channel Name Change                          | 4     | false     |
| Channel Icon Change                          | 5     | false     |
| Channel Pinned Message                       | 6     | true      |
| User Join                                    | 7     | true      |
| Guild Boost                                  | 8     | true      |
| Guild Boost Tier 1                           | 9     | true      |
| Guild Boost Tier 2                           | 10    | true      |
| Guild Boost Tier 3                           | 11    | true      |
| Channel Follow Add                           | 12    | true      |
| Guild Discovery Disqualified                 | 14    | false     |
| Guild Discovery Requalified                  | 15    | false     |
| Guild Discovery Grace Period Initial Warning | 16    | false     |
| Guild Discovery Grace Period Final Warning   | 17    | false     |
| Thread Created                               | 18    | true      |
| Reply                                        | 19    | true      |
| Chat Input Command                           | 20    | true      |
| Thread Starter Message                       | 21    | false     |
| Guild Invite Reminder                        | 22    | true      |
| Context Menu Command                         | 23    | true      |
| Auto Moderation Action                       | 24    | true\*     |
| Role Subscription Purchase                   | 25    | true      |
| Interaction Premium Upsell                   | 26    | true      |
| Stage Start                                  | 27    | true      |
| Stage End                                    | 28    | true      |
| Stage Speaker                                | 29    | true      |
| Stage Topic                                  | 31    | true      |
| Guild Application Premium Subscription       | 32    | false     |

**\* Can only be deleted by members with `MANAGE_MESSAGES` permission**

#### Message Activity Structure
| Field     | Type    | Description                                         |
|-----------|---------|-----------------------------------------------------|
| type      | integer | [type of message activity](#message-activity-types) |
| party_id? | string  | party_id from a Rich Presence event                 |

#### Message Activity Types
| Type         | Value |
|--------------|-------|
| Join         | 1     |
| Spectate     | 2     |
| Listen       | 3     |
| Join Request | 5     |

#### Message Flags
| Flag                                   | Value   | Description                                                                       |
|----------------------------------------|---------|-----------------------------------------------------------------------------------|
| Crossposted                            | 1 << 0  | this message has been published to subscribed channels (via Channel Following)    |
| Is Crosspost                           | 1 << 1  | this message originated from a message in another channel (via Channel Following) |
| Suppress Embeds                        | 1 << 2  | do not include any embeds when serializing this message                           |
| Source Message Deleted                 | 1 << 3  | the source message for this crosspost has been deleted (via Channel Following)    |
| Urgent                                 | 1 << 4  | this message came from the urgent message system                                  |
| Has Thread                             | 1 << 5  | this message has an associated thread, with the same id as the message            |
| Ephemeral                              | 1 << 6  | this message is only visible to the user who invoked the Interaction              |
| Loading                                | 1 << 7  | this message is an Interaction Response and the bot is "thinking"                 |
| Failed To Mention Some Roles In Thread | 1 << 8  | this message failed to mention some roles and add their members to the thread     |
| Suppress Notifications                 | 1 << 12 | this message will not trigger push and desktop notifications                      |
| Is Voice Message                       | 1 << 13 | this message is a voice message                                                   |

### Message Reference Object
| Field               | Type      | Description                                                                                                                             |
|---------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------|
| message_id?         | snowflake | id of the originating message                                                                                                           |
| channel_id? \*      | snowflake | id of the originating message's channel                                                                                                 |
| guild_id?           | snowflake | id of the originating message's guild                                                                                                   |
| fail_if_not_exists? | boolean   | when sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true |

**\* `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.**

#### Followed Channel Structure
| Field      | Type      | Description               |
|------------|-----------|---------------------------|
| channel_id | snowflake | source channel id         |
| webhook_id | snowflake | created target webhook id |

### Reaction Object
| Field         | Type                                  | Description                                                                      |
|---------------|---------------------------------------|----------------------------------------------------------------------------------|
| count         | integer                               | Total number of times this emoji has been used to react (including super reacts) |
| count_details | object                                | [Reaction count details object](#reaction-count-details-object)                  |
| me            | boolean                               | Whether the current user reacted using this emoji                                |
| me_burst      | boolean                               | Whether the current user super-reacted using this emoji                          |
| emoji         | partial [emoji](#emoji-object) object | emoji information                                                                |
| burst_colors  | array                                 | HEX colors used for super reaction                                               |

#### Reaction Count Details Object
| Field  | Type    | Description               |
|--------|---------|---------------------------|
| burst  | integer | Count of super reactions  |
| normal | integer | Count of normal reactions |

#### Overwrite Object
| Field | Type      | Description                   |
|-------|-----------|-------------------------------|
| id    | snowflake | role or user id               |
| type  | int       | either 0 (role) or 1 (member) |
| allow | string    | permission bit set            |
| deny  | string    | permission bit set            |

#### Thread Metadata Object
| Field                 | Type               | Description                                                                                                                                |
|-----------------------|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| archived              | boolean            | whether the thread is archived                                                                                                             |
| auto_archive_duration | integer            | the thread will stop showing in the channel list after `auto_archive_duration` minutes of inactivity, can be set to: 60, 1440, 4320, 10080 |
| archive_timestamp     | ISO8601 timestamp  | timestamp when the thread's archive status was last changed, used for calculating recent activity                                          |
| locked                | boolean            | whether the thread is locked; when a thread is locked, only users with MANAGE_THREADS can unarchive it                                     |
| invitable?            | boolean            | whether non-moderators can add other non-moderators to a thread; only available on private threads                                         |
| create_timestamp?     | ?ISO8601 timestamp | timestamp when the thread was created; only populated for threads created after 2022-01-09                                                 |

#### Thread Member Object
| Field          | Type                                        | Description                                                     |
|----------------|---------------------------------------------|-----------------------------------------------------------------|
| id? \*         | snowflake                                   | ID of the thread                                                |
| user_id? \*    | snowflake                                   | ID of the user                                                  |
| join_timestamp | ISO8601 timestamp                           | Time the user last joined the thread                            |
| flags          | integer                                     | Any user-thread settings, currently only used for notifications |
| member? \*\*   | [guild member](#guild-member-object) object | Additional information about the user                           |

**\* These fields are omitted on the member sent within each thread in the GUILD_CREATE event.**  
**\*\* The `member` field is only present when `with_member` is set to `true` when calling [List Thread Members](#list-thread-members) or [Get Thread Member](#get-thread-member).**

#### Default Reaction Object
| Field      | Type       | Description                        |
|------------|------------|------------------------------------|
| emoji_id   | ?snowflake | the id of a guild's custom emoji   |
| emoji_name | ?string    | the unicode character of the emoji |

#### Forum Tag Object
| Field      | Type       | Description                                                                                                    |
|------------|------------|----------------------------------------------------------------------------------------------------------------|
| id         | snowflake  | the id of the tag                                                                                              |
| name       | string     | the name of the tag (0-20 characters)                                                                          |
| moderated  | boolean    | whether this tag can only be added to or removed from threads by a member with the `MANAGE_THREADS` permission |
| emoji_id   | ?snowflake | the id of a guild's custom emoji \*                                                                            |
| emoji_name | ?string    | the unicode character of the emoji \*                                                                          |

**\* At most one of `emoji_id` and `emoji_name` may be set to a non-null value.**

### Embed Object
| Field        | Type                                                   | Description                                                      |
|--------------|--------------------------------------------------------|------------------------------------------------------------------|
| title?       | string                                                 | title of embed                                                   |
| type?        | string                                                 | [type of embed](#embed-types) (always "rich" for webhook embeds) |
| description? | string                                                 | description of embed                                             |
| url?         | string                                                 | url of embed                                                     |
| timestamp?   | ISO8601 timestamp                                      | timestamp of embed content                                       |
| color?       | number                                                 | color code of the embed                                          |
| footer?      | [embed footer](#embed-footer-structure) object         | footer information                                               |
| image?       | [embed image](#embed-image-structure) object           | image information                                                |
| thumbnail?   | [embed thumbnail](#embed-thumbnail-structure) object   | thumbnail information                                            |
| video?       | [embed video](#embed-video-structure) object           | video information                                                |
| provider?    | [embed provider](#embed-provider-structure) object     | provider information                                             |
| author?      | [embed author](#embed-author-structure) object         | author information                                               |
| fields?      | array of [embed field](#embed-field-structure) objects | fields information                                               |

#### Embed Thumbnail Structure
| Field      | Type    | Description                                                     |
|------------|---------|-----------------------------------------------------------------|
| url        | string  | source url of thumbnail (only supports http(s) and attachments) |
| proxy_url? | string  | a proxied url of the thumbnail                                  |
| height?    | integer | height of thumbnail                                             |
| width?     | integer | width of thumbnail                                              |

#### Embed Video Structure
| Field      | Type    | Description                |
|------------|---------|----------------------------|
| url?       | string  | source url of video        |
| proxy_url? | string  | a proxied url of the video |
| height?    | integer | height of video            |
| width?     | integer | width of video             |

#### Embed Image Structure
| Field      | Type    | Description                                                 |
|------------|---------|-------------------------------------------------------------|
| url        | string  | source url of image (only supports http(s) and attachments) |
| proxy_url? | string  | a proxied url of the image                                  |
| height?    | integer | height of image                                             |
| width?     | integer | width of image                                              |

#### Embed Provider Structure
| Field | Type   | Description      |
|-------|--------|------------------|
| name? | string | name of provider |
| url?  | string | url of provider  |

#### Embed Author Structure
| Field           | Type   | Description                                                |
|-----------------|--------|------------------------------------------------------------|
| name            | string | name of author                                             |
| url?            | string | url of author (only supports http(s))                      |
| icon_url?       | string | url of author icon (only supports http(s) and attachments) |
| proxy_icon_url? | string | a proxied url of author icon                               |

#### Embed Footer Structure
| Field           | Type   | Description                                                |
|-----------------|--------|------------------------------------------------------------|
| text            | string | footer text                                                |
| icon_url?       | string | url of footer icon (only supports http(s) and attachments) |
| proxy_icon_url? | string | a proxied url of footer icon                               |

#### Embed Field Structure
| Field   | Type    | Description                                     |
|---------|---------|-------------------------------------------------|
| name    | string  | name of the field                               |
| value   | string  | value of the field                              |
| inline? | boolean | whether or not this field should display inline |

##### Embed Limits
| Field                                  | Limit                                            |
|----------------------------------------|--------------------------------------------------|
| title                                  | 256 characters                                   |
| description                            | 4096 characters                                  |
| fields                                 | Up to 25 [field](#embed-field-structure) objects |
| [field.name](#embed-field-structure)   | 256 characters                                   |
| [field.value](#embed-field-structure)  | 1024 characters                                  |
| [footer.text](#embed-footer-structure) | 2048 characters                                  |
| [author.name](#embed-author-structure) | 256 characters                                   |

**Additionally, the combined sum of characters in all `title`, `description`, `field.name`, `field.value`, `footer.text`, and `author.name` fields across all embeds attached to a message must not exceed 6000 characters.**  
**Violating any of these constraints will result in a `Bad Request` response.**  
**Embeds are deduplicated by URL. If a message contains multiple embeds with the same URL, only the first is shown.**

#### Attachment Object
| Field          | Type      | Description                                                                             |
|----------------|-----------|-----------------------------------------------------------------------------------------|
| id             | snowflake | attachment id                                                                           |
| filename       | string    | name of file attached                                                                   |
| description?   | string    | description for the file (max 1024 characters)                                          |
| content_type?  | string    | the attachment's media type                                                             |
| size           | number    | size of file in bytes                                                                   |
| url            | string    | source url of file                                                                      |
| proxy_url      | string    | a proxied url of file                                                                   |
| height?        | ?number   | height of file (if image)                                                               |
| width?         | ?number   | width of file (if image)                                                                |
| ephemeral? \*  | boolean   | whether this attachment is ephemeral                                                    |
| duration_secs? | float     | the duration of the audio file (currently for voice messages)                           |
| waveform?      | string    | base64 encoded bytearray representing a sampled waveform (currently for voice messages) |
| flags?         | number    | [attachment flags](#attachment-flags) combined as a bitfield                            |

**\* Ephemeral attachments will automatically be removed after a set period of time. Ephemeral attachments on messages are guaranteed to be available as long as the message itself exists.**

#### Attachment Flags
| Flag     | Value  | Description                                                       |
|----------|--------|-------------------------------------------------------------------|
| Is Remix | 1 << 2 | this attachment has been edited using the remix feature on mobile |

### Channel Mention Object
| Field    | Type      | Description                                                                 |
|----------|-----------|-----------------------------------------------------------------------------|
| id       | snowflake | id of the channel                                                           |
| guild_id | snowflake | id of the guild containing the channel                                      |
| type     | integer   | the [type of channel](#channel-object-channel-types)                        |
| name     | string    | the name of the channel                                                     |

### Allowed Mentions Object
| Field        | Type                           | Description                                                                                |
|--------------|--------------------------------|--------------------------------------------------------------------------------------------|
| parse        | array of allowed mention types | An array of [allowed mention types](#allowed-mention-types) to parse from the content.     |
| roles        | list of snowflakes             | Array of role_ids to mention (Max size of 100)                                             |
| users        | list of snowflakes             | Array of user_ids to mention (Max size of 100)                                             |
| replied_user | boolean                        | For replies, whether to mention the author of the message being replied to (default false) |

#### Allowed Mention Types
| Type              | Value      | Description                           |
|-------------------|------------|---------------------------------------|
| Role Mentions     | "roles"    | Controls role mentions                |
| User Mentions     | "users"    | Controls user mentions                |
| Everyone Mentions | "everyone" | Controls @everyone and @here mentions |

#### Allowed Mentions Reference
**If `allowed_mentions` is _not_ passed in (i.e. the key does not exist), the mentions will be parsed via the content. This corresponds with existing behavior.**

**In the example below we would ping @here (and also @role124 and @user123)**  
```json
{
  "content": "@here Hi there from <@123>, cc <@&124>"
}
```

**To suppress all mentions in a message use:**

```json
{
  "content": "@everyone hi there, <@&123>",
  "allowed_mentions": {
    "parse": []
  }
}
```

**This will suppress _all_ mentions in the message (no @everyone or user mention).**

**The `parse` field is mutually exclusive with the other fields.**  
**In the example below, we would ping users `123` and role `124`, but _not_ @everyone.**  
> **Note that passing a `Falsy` value ([], null) into the "users" field does not trigger a validation error.**

```json
{
  "content": "@everyone <@123> <@&124>",
  "allowed_mentions": {
    "parse": ["users", "roles"],
    "users": []
  }
}
```

**In the next example, we would ping @everyone, (and also users `123` and `124` if they suppressed @everyone mentions), but we would not ping any roles.**

```json
{
  "content": "@everyone <@123> <@124> <@125> <@&200>",
  "allowed_mentions": {
    "parse": ["everyone"],
    "users": ["123", "124"]
  }
}
```

### Message Components

#### Component Object
| Type | Name               | Description                                       |
|------|--------------------|---------------------------------------------------|
| 1    | Action Row         | Container for other components                    |
| 2    | Button             | Button object                                     |
| 3    | String Select      | Select menu for picking from defined text options |
| 4    | Text Input         | Text input object                                 |
| 5    | User Select        | Select menu for users                             |
| 6    | Role Select        | Select menu for roles                             |
| 7    | Mentionable Select | Select menu for mentionables (users *and* roles)  |
| 8    | Channel Select     | Select menu for channels                          |

#### Button Object
| Field      | Type                           | Description                                                     |
|------------|--------------------------------|-----------------------------------------------------------------|
| type       | integer                        | `2` for a button                                                |
| style      | integer                        | A [button style](#button-styles)                                |
| label?     | string                         | Text that appears on the button; max 80 characters              |
| emoji?     | partial [emoji](#emoji-object) | `name`, `id`, and `animated`                                    |
| custom_id? | string                         | Developer-defined identifier for the button; max 100 characters |
| url?       | string                         | URL for link-style buttons                                      |
| disabled?  | boolean                        | Whether the button is disabled (defaults to `false`)            |

#### Button Styles
| Name      | Value | Color                    | Required Field |
|-----------|-------|--------------------------|----------------|
| Primary   | 1     | blurple                  | `custom_id`    |
| Secondary | 2     | grey                     | `custom_id`    |
| Success   | 3     | green                    | `custom_id`    |
| Danger    | 4     | red                      | `custom_id`    |
| Link      | 5     | grey, navigates to a URL | `url`          |

#### Select Menu Object
| Field                 | Type                                                              | Description                                                                                                                                              |
|-----------------------|-------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| type                  | integer                                                           | [Type](#component-types) of select menu component (text: `3`, user: `5`, role: `6`, mentionable: `7`, channels: `8`)                                     |
| custom_id             | string                                                            | ID for the select menu; max 100 characters                                                                                                               |
| options?\*            | array of [select options](#select-option-structure)               | Specified choices in a select menu (only required and available for string selects (type `3`)); max 25                                                   |
| channel_types?\*\*    | array of [channel types](#channel-types)                          | List of channel types to include in the channel select component (type `8`)                                                                              |
| placeholder?          | string                                                            | Placeholder text if nothing is selected; max 150 characters                                                                                              |
| default_values?\*\*\* | array of [default value objects](#select-default-value-structure) | List of default values for auto-populated select menu components; number of default values must be in the range defined by `min_values` and `max_values` |
| min_values?           | integer                                                           | Minimum number of items that must be chosen (defaults to 1); min 0, max 25                                                                               |
| max_values?           | integer                                                           | Maximum number of items that can be chosen (defaults to 1); max 25                                                                                       |
| disabled?             | boolean                                                           | Whether select menu is disabled (defaults to `false`)                                                                                                    |

\* **`options` is required for string select menus (component type `3`), and unavailable for all other select menu components.**  
\*\* **`channel_types` can only be used for channel select menu components.**  
\*\*\* **`default_values` is only available for auto-populated select menu components, which include user (`5`), role (`6`), mentionable (`7`), and channel (`8`) [components](#component-types).**

#### Select Option Structure
| Field        | Type                                  | Description                                              |
|--------------|---------------------------------------|----------------------------------------------------------|
| label        | string                                | User-facing name of the option; max 100 characters       |
| value        | string                                | Dev-defined value of the option; max 100 characters      |
| description? | string                                | Additional description of the option; max 100 characters |
| emoji?       | partial [emoji](#emoji-object) object | `id`, `name`, and `animated`                             |
| default?     | boolean                               | Will show this option as selected by default             |

#### Select Default Value Structure
| Field | Type      | Description                                                                   |
|-------|-----------|-------------------------------------------------------------------------------|
| id    | snowflake | ID of a user, role, or channel                                                |
| type  | string    | Type of value that `id` represents. Either `"user"`, `"role"`, or `"channel"` |

#### Text Input Object
| Field        | Type    | Description                                                          |
|--------------|---------|----------------------------------------------------------------------|
| type         | integer | `4` for a text input                                                 |
| custom_id    | string  | Developer-defined identifier for the input; max 100 characters       |
| style        | integer | The [Text Input Style](#text-input-styles)                           |
| label        | string  | Label for this component; max 45 characters                          |
| min_length?  | integer | Minimum input length for a text input; min 0, max 4000               |
| max_length?  | integer | Maximum input length for a text input; min 1, max 4000               |
| required?    | boolean | Whether this component is required to be filled (defaults to `true`) |
| value?       | string  | Pre-filled value for this component; max 4000 characters             |
| placeholder? | string  | Custom placeholder text if the input is empty; max 100 characters    |

#### Text Input Styles
| Name      | Value | Description       |
|-----------|-------|-------------------|
| Short     | 1     | Single-line input |
| Paragraph | 2     | Multi-line input  |

### Webhook Object
| Field              | Type                                      | Description                                                                                      |
|--------------------|-------------------------------------------|--------------------------------------------------------------------------------------------------|
| id                 | snowflake                                 | the id of the webhook                                                                            |
| type               | integer                                   | the [type](#webhook-types) of the webhook                                                        |
| guild_id?          | ?snowflake                                | the guild id this webhook is for, if any                                                         |
| channel_id         | ?snowflake                                | the channel id this webhook is for, if any                                                       |
| user?              | [user](#user-object) object               | the user this webhook was created by (not returned when getting a webhook by token)              |
| name               | ?string                                   | the default name of the webhook                                                                  |
| avatar             | ?string                                   | the default user avatar hash of the webhook                                                      |
| token?             | string                                    | the secure token of the webhook (returned for Incoming Webhooks)                                 |
| application_id     | ?snowflake                                | the bot/OAuth2 application that created this webhook                                             |
| source_guild? \*   | partial [guild](#guild-object) object     | the guild of the channel that this webhook is following (returned for Channel Follower Webhooks) |
| source_channel? \* | partial [channel](#channel-object) object | the channel that this webhook is following (returned for Channel Follower Webhooks)              |
| url?               | string                                    | the url used for executing the webhook (returned by the webhooks OAuth2 flow)                    |

**\* These fields will be absent if the webhook creator has since lost access to the guild where the followed channel resides**

#### Webhook Types
| Value | Name             | Description                                                                                                    |
|-------|------------------|----------------------------------------------------------------------------------------------------------------|
| 1     | Incoming         | Incoming Webhooks can post messages to channels with a generated token                                         |
| 2     | Channel Follower | Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels |
| 3     | Application      | Application webhooks are webhooks used with Interactions                                                       |

### Interaction Object
| Field            | Type                                                | Description                                                                                                    |
|------------------|-----------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| id               | snowflake                                           | ID of the interaction                                                                                          |
| application_id   | snowflake                                           | ID of the application this interaction is for                                                                  |
| type             | [interaction type](#interaction-type)               | Type of interaction                                                                                            |
| data?\*          | [interaction data](#interaction-data)               | Interaction data payload                                                                                       |
| guild_id?        | snowflake                                           | Guild that the interaction was sent from                                                                       |
| channel?         | [partial channel](#channel-object) object           | Channel that the interaction was sent from                                                                     |
| channel_id?      | snowflake                                           | Channel that the interaction was sent from                                                                     |
| member?\*\*      | [guild member](#guild-member-object) object         | Guild member data for the invoking user, including permissions                                                 |
| user?            | [user](#user-object) object                         | User object for the invoking user, if invoked in a DM                                                          |
| token            | string                                              | Continuation token for responding to the interaction                                                           |
| version          | integer                                             | Read-only property, always `1`                                                                                 |
| message?         | [message](#message-object) object                   | For components, the message they were attached to                                                              |
| app_permissions? | string                                              | Bitwise set of permissions the app or bot has within the channel the interaction was sent from                 |
| locale?\*\*\*    | string                                              | Selected language of the invoking user                                                                         |
| guild_locale?    | string                                              | [Guild's preferred locale](#guild-object), if invoked in a guild                                               |
| entitlements     | array of [entitlement](#entitlement-object) objects | For monetized apps, any entitlements for the invoking user, representing access to premium [SKUs](#sku-object) |

**\* This is always present on application command, message component, and modal submit interaction types.**  
**\*\* `member` is sent when the interaction is invoked in a guild, and `user` is sent when invoked in a DM**  
**\*\*\* This is available on all interaction types except PING**

#### Interaction Type
| Name                             | Value |
|----------------------------------|-------|
| Ping                             | 1     |
| Application Command              | 2     |
| Message Component                | 3     |
| Application Command Autocomplete | 4     |
| Modal Submit                     | 5     |

### Interaction Data

#### Application Command Data Structure
| Field      | Type                                                                                       | Description                                                                     |
|------------|--------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| id         | snowflake                                                                                  | the [`ID`](#application-command-structure) of the invoked command               |
| name       | string                                                                                     | the [`name`](#application-command-structure) of the invoked command             |
| type       | integer                                                                                    | the [`type`](#application-command-structure) of the invoked command             |
| resolved?  | [resolved data](#resolved-data-structure)                                                  | converted users + roles + channels + attachments                                |
| options?\* | array of [application command interaction data option](#interaction-data-option-structure) | the params + values from the user                                               |
| guild_id?  | snowflake                                                                                  | the id of the guild the command is registered to                                |
| target_id? | snowflake                                                                                  | id of the user or message targeted by a [user](#user-commands) or [message](#message-commands) command |

**\* This [can be partial](#autocomplete) when in response to `APPLICATION_COMMAND_AUTOCOMPLETE`**

#### Message Component Data Structure
| Field          | Type                                                      | Description                                                                |
|----------------|-----------------------------------------------------------|----------------------------------------------------------------------------|
| custom_id      | string                                                    | the [`custom_id`](#custom-id) of the component                             |
| component_type | integer                                                   | the [type](#component-object-component-types) of the component             |
| values?\*      | array of [select option values](#select-option-structure) | values the user selected in a [select menu](#select-menu-object) component |
| resolved?      | [resolved data](#resolved-data-structure)                 | resolved entities from selected options                                    |

**\* This is always present for select menu components**

#### Modal Submit Data Structure
| Field      | Type                                               | Description                                |
|------------|----------------------------------------------------|--------------------------------------------|
| custom_id  | string                                             | the [`custom_id`](#custom-id) of the modal |
| components | array of [message components](#message-components) | the values submitted by the user           |

#### Resolved Data Structure
| Field         | Type                                                                | Description                         |
|---------------|---------------------------------------------------------------------|-------------------------------------|
| users?        | Map of Snowflakes to [user](#user-object) objects                   | the ids and User objects            |
| members?\*    | Map of Snowflakes to [partial member](#guild-member-object) objects | the ids and partial Member objects  |
| roles?        | Map of Snowflakes to [role](#role-object) objects                   | the ids and Role objects            |
| channels?\*\* | Map of Snowflakes to [partial channel](#channel-object) objects     | the ids and partial Channel objects |
| messages?     | Map of Snowflakes to [partial messages](#message-object) objects    | the ids and partial Message objects |
| attachments?  | Map of Snowflakes to [attachment](#attachment-object) objects       | the ids and attachment objects      |

**\* Partial `Member` objects are missing `user`, `deaf` and `mute` fields**  
**\*\* Partial `Channel` objects only have `id`, `name`, `type` and `permissions` fields. Threads will also have `thread_metadata` and `parent_id` fields.**

#### Application Command Interaction Data Option Structure
| Field    |  Type                                                                                      | Description                                                                  |
|----------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| name     | string                                                                                     | Name of the parameter                                                        |
| type     | integer                                                                                    | Value of [application command option type](#application-command-option-type) |
| value?   | string, integer, double, or boolean                                                        | Value of the option resulting from user input                                |
| options? | array of [application command interaction data option](#interaction-data-option-structure) | Present if this option is a group or subcommand                              |
| focused? | boolean                                                                                    | `true` if this option is the currently focused option for autocomplete       |

#### Message Interaction Structure
| Field   | Type                                          | Description                                                                                                    |
|---------|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| id      | snowflake                                     | ID of the interaction                                                                                          |
| type    | [interaction type](#interaction-type)         | Type of interaction                                                                                            |
| name    | string                                        | Name of the [application command](#application-command-structure), including subcommands and subcommand groups |
| user    | [user object](#user-object)                   | User who invoked the interaction                                                                               |
| member? | [partial member](#guild-member-object) object | Member who invoked the interaction in the guild                                                                |

#### Interaction Response Structure
| Field | Type                                                              | Description                  |
|-------|-------------------------------------------------------------------|------------------------------|
| type  | [interaction callback type](#interaction-callback-type)           | the type of response         |
| data? | [interaction callback data](#interaction-callback-data-structure) | an optional response message |

#### Interaction Callback Type
| Name                                    | Value | Description                                                                                                   |
|-----------------------------------------|-------|---------------------------------------------------------------------------------------------------------------|
| Pong                                    | 1     | ACK a `Ping`                                                                                                  |
| Channel Message With Source             | 4     | respond to an interaction with a message                                                                      |
| Deferred Channel Message With Source    | 5     | ACK an interaction and edit a response later, the user sees a loading state                                   |
| Deferred Update Message\*               | 6     | for components, ACK an interaction and edit the original message later; the user does not see a loading state |
| Update Message\*                        | 7     | for components, edit the message the component was attached to                                                |
| Application Command Autocomplete Result | 8     | respond to an autocomplete interaction with suggested choices                                                 |
| Modal\*\*                               | 9     | respond to an interaction with a popup modal                                                                  |
| Premium Required\*\*\*                  | 10    | respond to an interaction with an upgrade button, only available for apps with monetization enabled           |

**\* Only valid for component-based interactions.**  
**\*\* Not available for `MODAL_SUBMIT` and `PING` interactions.**  
**\*\*\* Not available for `APPLICATION_COMMAND_AUTOCOMPLETE` and `PING` interactions.**

#### Interaction Callback Data Structure

#### Messages
| Field             | Type                                                                | Description                                                                                                |
|-------------------|---------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| tts?              | boolean                                                             | is the response TTS                                                                                        |
| content?          | string                                                              | message content                                                                                            |
| embeds?           | array of [embeds](#embed-object)                                    | supports up to 10 embeds                                                                                   |
| allowed_mentions? | [allowed mentions](#allowed-mentions-object) | [allowed mentions](#allowed-mentions-object) object                                                        |
| flags?            | integer                                                             | [message flags](#message-flags) combined as a bitfield (only `SUPPRESS_EMBEDS` and `EPHEMERAL` can be set) |
| components?       | array of [components](#message-components)                          | message components                                                                                         |
| attachments? \*   | array of partial [attachment](#attachment-object) objects           | attachment objects with filename and description                                                           |

#### Autocomplete
| Field   | Type                                                            | Description                              |
|---------|------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| choices | array of [choices](#application-command-option-choice-structure) | autocomplete choices (max of 25 choices) |

#### Modal
| Field      | Type                                                          | Description                                                      |
|------------|---------------------------------------------------------------|------------------------------------------------------------------|
| custom_id  | string                                                        | a developer-defined identifier for the modal, max 100 characters |
| title      | string                                                        | the title of the popup modal, max 45 characters                  |
| components | array of [components](#message-components) | between 1 and 5 (inclusive) components that make up the modal    |

### Invite Object
| Field                       | Type                                                          | Description                                                                                                                                    |
|-----------------------------|---------------------------------------------------------------|-------------------------------------------------------------------------------|
| code                        | string                                                        | the invite code (unique ID)                       |
| guild?                      | partial [guild](#guild-object) object                         | the guild this invite is for                  |
| channel                     | ?partial [channel](#channel-object) object                    | the channel this invite is for                      |
| inviter?                    | [user](#user-object) object                                   | the user who created the invite           |
| target_type?                | number                                                        | the [type of target](#invite-target-types) for this voice channel invite    |
| target_user?                | [user](#user-object) object                                   | the user whose stream to display for this voice channel stream invite   |
| target_application?         | partial [application](#application-object) object             | the embedded application to open for this voice channel embedded application invite |
| approximate_presence_count? | number                                                        | approximate count of online members, when `with_counts` is `true` |
| approximate_member_count?   | number                                                        | approximate count of total members, when `with_counts` is `true` |
| expires_at?                 | ?ISO8601 timestamp                                            | the expiration date of this invite, when `with_expiration` is `true` |
| guild_scheduled_event?      | [guild scheduled event](#guild-scheduled-event-object) object | guild scheduled event data, only included if `guild_scheduled_event_id` contains a valid guild scheduled event id                        |

#### Invite Target Types
| Type                 | Value |
|----------------------|-------|
| STREAM               | 1     |
| EMBEDDED_APPLICATION | 2     |

#### Invite Metadata Object
| Field      | Type              | Description                                          |
|------------|-------------------|------------------------------------------------------|
| uses       | number            | number of times this invite has been used            |
| max_uses   | number            | max number of times this invite can be used          |
| max_age    | number            | duration (in seconds) after which the invite expires |
| temporary  | boolean           | whether this invite only grants temporary membership |
| created_at | ISO8601 timestamp | when this invite was created                         |

#### Role Subscription Data Object
| Field                        | Type      | Description                                                           |
|------------------------------|-----------|-----------------------------------------------------------------------|
| role_subscription_listing_id | snowflake | the id of the sku and listing that the user is subscribed to          |
| tier_name                    | string    | the name of the tier that the user is subscribed to                   |
| total_months_subscribed      | integer   | the cumulative number of months that the user has been subscribed for |
| is_renewal                   | boolean   | whether this notification is for a renewal rather than a new purchase |

#### Application Object
| Field                              | Type                                            | Description                                                                                                   |
|------------------------------------|-------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| id                                 | snowflake                                       | ID of the app                                                                                                 |
| name                               | string                                          | Name of the app                                                                                               |
| icon                               | ?string                                         | Icon hash of the app                                                                                          |
| description                        | string                                          | Description of the app                                                                                        |
| rpc_origins?                       | array of strings                                | List of RPC origin URLs, if RPC is enabled                                                                    |
| bot_public                         | boolean                                         | When `false`, only the app owner can add the app to guilds                                                    |
| bot_require_code_grant             | boolean                                         | When `true`, the app's bot will only join upon completion of the full OAuth2 code grant flow                  |
| bot?                               | partial [user](#user-object) object             | Partial user object for the bot user associated with the app                                                  |
| terms_of_service_url?              | string                                          | URL of the app's Terms of Service                                                                             |
| privacy_policy_url?                | string                                          | URL of the app's Privacy Policy                                                                               |
| owner?                             | partial [user](#user-object) object             | Partial user object for the owner of the app                                                                  |
| verify_key                         | string                                          | Hex encoded key for verification in interactions and the GameSDK's GetTicket                                  |
| team                               | ?[team](#team-object) object                    | If the app belongs to a team, this will be a list of the members of that team                                 |
| guild_id?                          | snowflake                                       | Guild associated with the app. For example, a developer support server.                                       |
| guild?                             | partial [guild](#guild-object) object           | Partial object of the associated guild                                                                        |
| primary_sku_id?                    | snowflake                                       | If this app is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists |
| slug?                              | string                                          | If this app is a game sold on Discord, this field will be the URL slug that links to the store page           |
| cover_image?                       | string                                          | App's default rich presence invite cover image hash                                                           |
| flags?                             | number                                          | App's public [flags](#application-flags)                                                                      |
| approximate_guild_count?           | number                                          | Approximate count of guilds the app has been added to                                                         |
| redirect_uris?                     | array of strings                                | Array of redirect URIs for the app                                                                            |
| interactions_endpoint_url?         | string                                          | Interactions endpoint URL for the app                                                                         |
| role_connections_verification_url? | string                                          | Role connection verification URL for the app                                                                  |
| tags?                              | array of strings                                | List of tags describing the content and functionality of the app. Max of 5 tags                               |
| install_params?                    | [install params](#install-params-object) object | Settings for the app's default in-app authorization link, if enabled                                          |
| custom_install_url?                | string                                          | Default custom authorization URL for the app, if enabled                                                      |

##### Example Application Object
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
| Value   | Name                                          | Description                                                                                                                                                |
|---------|-----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 << 6  | Application Auto Moderation Rule Create Badge | Indicates if an app uses the Auto Moderation API                                                                                                           |
| 1 << 12 | Gateway Presence                              | Intent required for bots in **100 or more servers** to receive `presence_update` events                                                                    |
| 1 << 13 | Gateway Presence Limited                      | Intent required for bots in under 100 servers to receive `presence_update` events, found on the **Bot** page in your app's settings                        |
| 1 << 14 | Gateway Guild Members                         | Intent required for bots in **100 or more servers** to receive member-related events like `guild_member_add`.                                              |
| 1 << 15 | Gateway Guild Members Limited                 | Intent required for bots in under 100 servers to receive member-related events like `guild_member_add`, found on the **Bot** page in your app's settings.  |
| 1 << 16 | Verification Pending Guild Limit              | Indicates unusual growth of an app that prevents verification                                                                                              |
| 1 << 17 | Embedded                                      | Indicates if an app is embedded within the Discord client (currently unavailable publicly)                                                                 |
| 1 << 18 | Gateway Message Content                       | Intent required for bots in **100 or more servers** to receive message content                                                                             |
| 1 << 19 | Gateway Message Content Limited               | Intent required for bots in under 100 servers to receive message content, found on the **Bot** page in your app's settings                                 |
| 1 << 23 | Application Command Badge                     | Indicates if an app has registered global application commands                                                                                             |

### Install Params Object
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

### Application Command Object
| Field                      | Type                                                                         | Description                                                                                             | Valid Types |
|----------------------------|----------------------------------------------------------------------------- |---------------------------------------------------------------------------------------------------------|-------------|
| id                         | snowflake                                                                    | Unique ID of command                                                                                    | all         |
| type?                      | number                                                                       | [Type of command](#application-command-types), defaults to `1`                                          | all         |
| application_id             | snowflake                                                                    | ID of the parent application                                                                            | all         |
| guild_id?                  | snowflake                                                                    | Guild ID of the command, if not global                                                                  | all         |
| name                       | string                                                                       | Name of command, 1-32 characters                                                                        | all         |
| name_localizations?        | ?dictionary with keys in available locales                                   | Localization dictionary for `name` field. Values follow the same restrictions as `name`                 | all         |
| description                | string                                                                       | Description for `CHAT_INPUT` commands, 1-100 characters. Empty string for `USER` and `MESSAGE` commands | all         |
| description_localizations? | ?dictionary with keys in available locales                                   | Localization dictionary for `description` field. Values follow the same restrictions as `description`   | all         |
| options?                   | array of [application command option](#application-command-option-structure) | Parameters for the command, max of 25                                                                   | CHAT_INPUT  |
| default_member_permissions | ?string                                                                      | Set of permissions represented as a bit set                                                             | all         |
| dm_permission?             | boolean                                                                      | Indicates whether the command is available in DMs with the app, only for globally-scoped commands       | all         |
| nsfw?                      | boolean                                                                      | Indicates whether the command is age-restricted, defaults to `false`                                    | all         |
| version                    | snowflake                                                                    | Autoincrementing version identifier updated during substantial record changes                           | all         |

> **Set `default_member_permissions` to `"0"` to disable the command for everyone except admins by default, and/or set `dm_permission` to `false` to disable globally-scoped commands inside of DMs with your app**

#### Application Command Types
| Name       | Type | Description                                                               |
|------------|------|---------------------------------------------------------------------------|
| Chat Input | 1    | Slash commands; a text-based command that shows up when a user types `/`  |
| User       | 2    | A UI-based command that shows up when you right click or tap on a user    |
| Message    | 3    | A UI-based command that shows up when you right click or tap on a message |


#### Application Command Option Structure
**Required `options` must be listed before optional options**

| Field                      | Type                                                                                       | Description                                                                                               |
|----------------------------|--------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| type                       | one of [application command option type](#application-command-option-type)                 | Type of option                                                                                            |
| name                       | string                                                                                     | 1-32 character name                                                                                       |
| name_localizations?        | ?dictionary with keys in available locales                                                 | Localization dictionary for the `name` field. Values follow the same restrictions as `name`               |
| description                | string                                                                                     | 1-100 character description                                                                               |
| description_localizations? | ?dictionary with keys in available locales                                                 | Localization dictionary for the `description` field. Values follow the same restrictions as `description` |
| required?                  | boolean                                                                                    | If the parameter is required or optional--default `false`                                                 |
| choices?                   | array of [application command option choice](#application-command-option-choice-structure) | Choices for `STRING`, `INTEGER`, and `NUMBER` types for the user to pick from, max 25                     |
| options?                   | array of [application command option](#application-command-option-structure)               | If the option is a subcommand or subcommand group type, these nested options will be the parameters       |
| channel_types?             | array of [channel types](#channel-types)                                                   | If the option is a channel type, the channels shown will be restricted to these types                     |
| min_value?                 | number for `INTEGER` options, double for `NUMBER` options                                  | If the option is an `INTEGER` or `NUMBER` type, the minimum value permitted                               |
| max_value?                 | number for `INTEGER` options, double for `NUMBER` options                                  | If the option is an `INTEGER` or `NUMBER` type, the maximum value permitted                               |
| min_length?                | number                                                                                     | For option type `STRING`, the minimum allowed length (minimum of `0`, maximum of `6000`)                  |
| max_length?                | number                                                                                     | For option type `STRING`, the maximum allowed length (minimum of `1`, maximum of `6000`)                  |
| autocomplete? \*           | boolean                                                                                    | If autocomplete interactions are enabled for this `STRING`, `INTEGER`, or `NUMBER` type option            |

**\* `autocomplete` may not be set to true if `choices` are present.**  
**Options using `autocomplete` are not confined to only use choices given by the application.**

#### Application Command Option Type
| Name              | Value | Note                                    |
|-------------------|-------|-----------------------------------------|
| Sub Command       | 1     |                                         |
| Sub Command Group | 2     |                                         |
| String            | 3     |                                         |
| Integer           | 4     | Any integer between -2^53 and 2^53      |
| Boolean           | 5     |                                         |
| User              | 6     |                                         |
| Channel           | 7     | Includes all channel types + categories |
| Role              | 8     |                                         |
| Mentionable       | 9     | Includes users and roles                |
| Number            | 10    | Any double between -2^53 and 2^53       |
| Attachment        | 11    | [attachment](#attachment-object) object |

#### Application Command Option Choice Structure
**If you specify `choices` for an option, they are the *only* valid values for a user to pick**

| Field               | Type                                       | Description                                                                                 |
|---------------------|--------------------------------------------|---------------------------------------------------------------------------------------------|
| name                | string                                     | 1-100 character choice name                                                                 |
| name_localizations? | ?dictionary with keys in available locales | Localization dictionary for the `name` field. Values follow the same restrictions as `name` |
| value               | string, integer, or double \*              | Value for the choice, up to 100 characters if string                                        |

**\* Type of `value` depends on the [option type](#application-command-option-type) that the choice belongs to.**

### Application Command Permissions Object
**Returned when fetching the permissions for an app's command(s) in a guild.**

| Field          | Type                                                                                   | Description                                          |
|----------------|----------------------------------------------------------------------------------------|------------------------------------------------------|
| id             | snowflake                                                                              | ID of the command or the application ID              |
| application_id | snowflake                                                                              | ID of the application the command belongs to         |
| guild_id       | snowflake                                                                              | ID of the guild                                      |
| permissions    | array of [application command permissions](#application-command-permissions-structure) | Permissions for the command in the guild, max of 100 |

**When the `id` field is the application ID instead of a command ID, the permissions apply to all commands that do not contain explicit overwrites.**

#### Application Command Permissions Structure
**Application command permissions allow you to enable or disable commands for specific users, roles, or channels within a guild.**

| Field      | Type                                                                        | Description                                      |
|------------|-----------------------------------------------------------------------------|--------------------------------------------------|
| id         | snowflake                                                                   | ID of the role, user, or channel. It can also be [permission constant](#application-command-permissions-constants) |
| type       | [application command permission type](#application-command-permission-type) | role (`1`), user (`2`), or channel (`3`)         |
| permission | boolean                                                                     | `true` to allow, `false`, to disallow            |

#### Application Command Permissions Constants
**The following constants can be used in the `id` field for command permissions payloads.**

| Permission   | Value          | Type      | Description             |
|--------------|----------------|-----------|-------------------------|
| `@everyone`  | `guild_id`     | snowflake | All members in a guild  |
| All Channels | `guild_id - 1` | snowflake | All channels in a guild |

#### Application Command Permission Type
| Name    | Value |
|---------|-------|
| Role    | 1     |
| User    | 2     |
| Channel | 3     |

### Entitlement Object
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
| Application Subscription | 8     | Entitlement was purchased as an app subscription |

### SKU Object
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
**For subscriptions, SKUs will have a type of either `SUBSCRIPTION` represented by `type: 5` or `SUBSCRIPTION_GROUP` represented by `type:6`.**  
**For any current implementations, you will want to use the SKU defined by `type: 5`.**  
**A `SUBSCRIPTION_GROUP` is automatically created for each `SUBSCRIPTION` SKU and are not used at this time.**

| Type               | Value | Description                                              |
|--------------------|-------|----------------------------------------------------------|
| Subscription       | 5     | Represents a recurring subscription                      |
| Subscription Group | 6     | System-generated group for each SUBSCRIPTION SKU created |

#### SKU Flags
**For subscriptions, there are two types of access levels you can offer to users:**

-   **Guild Subscriptions**: A subscription purchased by a user and applied to a single server. Everyone in that server gets your premium benefits.
-   **User Subscriptions**: A subscription purchased by a user for themselves. They get access to your premium benefits in every server.

**The `flags` field can be used to differentiate user and server subscriptions with a bitwise `&&` operator.**

| Type               | Value  | Description                                                                                                               |
|--------------------|--------|---------------------------------------------------------------------------------------------------------------------------|
| Available          | 1 << 2 | SKU is available for purchase                                                                                             |
| Guild Subscription | 1 << 7 | Recurring SKU that can be purchased by a user and applied to a single server. Grants access to every user in that server. |
| User Subscription  | 1 << 8 | Recurring SKU purchased by a user for themselves. Grants access to the purchasing user in every server.                   |

### Audit Log Object
| Field                  | Type                                                                    | Description                                                 |
|------------------------|-------------------------------------------------------------------------|-------------------------------------------------------------|
| application_commands   | array of [application commands](#application-command-object) objects    | List of application commands referenced in the audit log    |
| audit_log_entries      | array of [audit log entry](#audit-log-entry-object) objects             | List of audit log entries, sorted from most to least recent |
| auto_moderation_rules  | array of [auto moderation rule](#auto-moderation-rule-object) objects   | List of auto moderation rules referenced in the audit log   |
| guild_scheduled_events | array of [guild scheduled event](#guild-scheduled-event-object) objects | List of guild scheduled events referenced in the audit log  |
| integrations           | array of partial [integration](#integration-object) objects             | List of partial integration objects                         |
| threads                | array of thread-specific [channel](#channel-object) objects             | List of threads referenced in the audit log\*               |
| users                  | array of [user](#user-object) objects                                   | List of users referenced in the audit log                   |
| webhooks               | array of [webhook](#webhook-object) objects                             | List of webhooks referenced in the audit log                |

**\* Threads referenced in `THREAD_CREATE` and `THREAD_UPDATE` events are included in the threads map since archived threads might not be kept in memory by clients.**

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

**For `APPLICATION_COMMAND_PERMISSION_UPDATE` events, the `target_id` is the command ID or the app ID since the `changes` array represents the entire `permissions` property on the [guild permissions](#application-command-permissions-structure) object.**

### Audit Log Events
**The table below lists audit log events and values (the `action_type` field) that your app may receive.**

**The *Object Changed* column notes which object's values may be included in the entry.**  
**Though there are exceptions, possible keys in the `changes` array typically correspond to the object's fields.**  
**The descriptions and types for those fields can be found in the linked documentation for the object.**

**If no object is noted, there won't be a `changes` array in the entry, though other fields like the `target_id` still exist and many have fields in the [`options` array](#optional-audit-entry-info).**

| Event                                       | Value | Description                                               | Object Changed                                                            |
|---------------------------------------------|-------|-----------------------------------------------------------|---------------------------------------------------------------------------|
| Guild Update                                | 1     | Server settings were updated                              | [Guild](#guild-object)                                                    |
| Channel Create                              | 10    | Channel was created                                       | [Channel](#channel-object)                                                |
| Channel Update                              | 11    | Channel settings were updated                             | [Channel](#channel-object)                                                |
| Channel Delete                              | 12    | Channel was deleted                                       | [Channel](#channel-object)                                                |
| Channel Overwrite Create                    | 13    | Permission overwrite was added to a channel               | [Channel Overwrite](#overwrite-object)                                    |
| Channel Overwrite Update                    | 14    | Permission overwrite was updated for a channel            | [Channel Overwrite](#overwrite-object)                                    |
| Channel Overwrite Delete                    | 15    | Permission overwrite was deleted from a channel           | [Channel Overwrite](#overwrite-object)                                    |
| Member Kick                                 | 20    | Member was removed from server                            |                                                                           |
| Member Prune                                | 21    | Members were pruned from server                           |                                                                           |
| Member Ban Add                              | 22    | Member was banned from server                             |                                                                           |
| Member Ban Remove                           | 23    | Server ban was lifted for a member                        |                                                                           |
| Member Update                               | 24    | Member was updated in server                              | [Member](#guild-member-object)                                            |
| Member Role Update                          | 25    | Member was added or removed from a role                   | [Partial Role](#role-object)\*                                            |
| Member Move                                 | 26    | Member was moved to a different voice channel             |                                                                           |
| Member Disconnect                           | 27    | Member was disconnected from a voice channel              |                                                                           |
| Bot Add                                     | 28    | Bot user was added to server                              |                                                                           |
| Role Create                                 | 30    | Role was created                                          | [Role](#role-object)                                                      |
| Role Update                                 | 31    | Role was edited                                           | [Role](#role-object)                                                      |
| Role Delete                                 | 32    | Role was deleted                                          | [Role](#role-object)                                                      |
| Invite Create                               | 40    | Server invite was created                                 | [Invite](#invite-object) and [Invite Metadata](#invite-metadata-object)\* |
| Invite Update                               | 41    | Server invite was updated                                 | [Invite](#invite-object) and [Invite Metadata](#invite-metadata-object)\* |
| Invite Delete                               | 42    | Server invite was deleted                                 | [Invite](#invite-object) and [Invite Metadata](#invite-metadata-object)\* |
| Webhook Create                              | 50    | Webhook was created                                       | [Webhook](#webhook-object)\*                                              |
| Webhook Update                              | 51    | Webhook properties or channel were updated                | [Webhook](#webhook-object)\*                                              |
| Webhook Delete                              | 52    | Webhook was deleted                                       | [Webhook](#webhook-object)\*                                              |
| Emoji Create                                | 60    | Emoji was created                                         | [Emoji](#emoji-object)                                                    |
| Emoji Update                                | 61    | Emoji name was updated                                    | [Emoji](#emoji-object)                                                    |
| Emoji Delete                                | 62    | Emoji was deleted                                         | [Emoji](#emoji-object)                                                    |
| Message Delete                              | 72    | Single message was deleted                                |                                                                           |
| Message Bulk Delete                         | 73    | Multiple messages were deleted                            |                                                                           |
| Message Pin                                 | 74    | Message was pinned to a channel                           |                                                                           |
| Message Unpin                               | 75    | Message was unpinned from a channel                       |                                                                           |
| Integration Create                          | 80    | App was added to server                                   | [Integration](#integration-object)                                        |
| Integration Update                          | 81    | App was updated (as an example, its scopes were updated)  | [Integration](#integration-object)                                        |
| Integration Delete                          | 82    | App was removed from server                               | [Integration](#integration-object)                                        |
| Stage Instance Create                       | 83    | Stage instance was created (stage channel becomes live)   | [Stage Instance](#stage-instance-object)                                  |
| Stage Instance Update                       | 84    | Stage instance details were updated                       | [Stage Instance](#stage-instance-object)                                  |
| Stage Instance Delete                       | 85    | Stage instance was deleted (stage channel no longer live) | [Stage Instance](#stage-instance-object)                                  |
| Sticker Create                              | 90    | Sticker was created                                       | [Sticker](#sticker-object)                                                |
| Sticker Update                              | 91    | Sticker details were updated                              | [Sticker](#sticker-object)                                                |
| Sticker Delete                              | 92    | Sticker was deleted                                       | [Sticker](#sticker-object)                                                |
| Guild Scheduled Event Create                | 100   | Event was created                                         | [Guild Scheduled Event](#guild-scheduled-event-object)                    |
| Guild Scheduled Event Update                | 101   | Event was updated                                         | [Guild Scheduled Event](#guild-scheduled-event-object)                    |
| Guild Scheduled Event Delete                | 102   | Event was cancelled                                       | [Guild Scheduled Event](#guild-scheduled-event-object)                    |
| Thread Create                               | 110   | Thread was created in a channel                           | [Thread](#thread-metadata-object)                                         |
| Thread Update                               | 111   | Thread was updated                                        | [Thread](#thread-metadata-object)                                         |
| Thread Delete                               | 112   | Thread was deleted                                        | [Thread](#thread-metadata-object)                                         |
| Application Command Permission Update       | 121   | Permissions were updated for a command                    | [Command Permission](#application-command-permissions-structure)\*        |
| Auto Moderation Rule Create                 | 140   | Auto Moderation rule was created                          | [Auto Moderation Rule](#auto-moderation-rule-object)                      |
| Auto Moderation Rule Update                 | 141   | Auto Moderation rule was updated                          | [Auto Moderation Rule](#auto-moderation-rule-object)                      |
| Auto Moderation Rule Delete                 | 142   | Auto Moderation rule was deleted                          | [Auto Moderation Rule](#auto-moderation-rule-object)                      |
| Auto Moderation Block Message               | 143   | Message was blocked by Auto Moderation                    |                                                                           |
| Auto Moderation Flag To Channel             | 144   | Message was flagged by Auto Moderation                    |                                                                           |
| Auto Moderation User Communication Disabled | 145   | Member was timed out by Auto Moderation                   |                                                                           |
| Creator Monetization Request Created        | 150   | Creator monetization request was created                  |                                                                           |
| Creator Monetization Terms Accepted         | 151   | Creator monetization terms were accepted                  |                                                                           |

**\* Object has exception(s) to available keys. See the [exceptions](#audit-log-change-exceptions) section below for details.**

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
**The [structure for the individual changes](#audit-log-change-structure) varies based on the event type and its changed objects, so apps shouldn't depend on a single pattern of handling audit log events.**

#### Audit Log Change Structure
**Some events don't follow the same pattern as other audit log events.**  

**If `new_value` is not present in the change object while `old_value` is, it indicates that the property has been reset or set to `null`.**  
**If `old_value` isn't included, it indicated that the property was previously `null`.**


| Field      | Type                                | Description                                                                       |
|------------|-------------------------------------|-----------------------------------------------------------------------------------|
| new_value? | mixed (matches object field's type) | New value of the key                                                              |
| old_value? | mixed (matches object field's type) | Old value of the key                                                              |
| key        | string                              | Name of the changed entity, with a few [exceptions](#audit-log-change-exceptions) |

#### Audit Log Change Exceptions
**For most objects, the change keys may be any field on the changed object. The following table details the exceptions to this pattern.**

| Object Changed                                                          | Change Key Exceptions                                          | Change Object Exceptions                                                                                                                                                                                                                                    |
|-------------------------------------------------------------------------|----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Command Permission](#application-command-permissions-structure)        | snowflake as key                                               | The `changes` array contains objects with a `key` field representing the entity whose command was affected (role, channel, or user ID), a previous permissions object (with an `old_value` key), and an updated permissions object (with a `new_value` key) |
| [Invite](#invite-object) and [Invite Metadata](#invite-metadata-object) | Additional `channel_id` key (instead of object's `channel.id`) |                                                                                                                                                                                                                                                             |
| [Partial Role](#role-object)                                            | `$add` and `$remove` as keys                                   | `new_value` is an array of objects that contain the role `id` and `name`                                                                                                                                                                                    |
| [Webhook](#webhook-object)                                              | `avatar_hash` key (instead of `avatar`)                        |                                                                                                                                                                                                                                                             |

#### Auto Moderation Rule Structure
| Field            | Type                                                      | Description                                                             |
|------------------|-----------------------------------------------------------|-------------------------------------------------------------------------|
| id               | snowflake                                                 | the id of this rule                                                     |
| guild_id         | snowflake                                                 | the id of the guild which this rule belongs to                          |
| name             | string                                                    | the rule name                                                           |
| creator_id       | snowflake                                                 | the user which first created this rule                                  |
| event_type       | integer                                                   | the rule [event type](#event-types)                                     |
| trigger_type     | integer                                                   | the rule [trigger type](#trigger-types)                                 |
| trigger_metadata | object                                                    | the rule [trigger metadata](#trigger-metadata)                          |
| actions          | array of [action](#audo-moderation-action-object) objects | the actions which will execute when the rule is triggered               |
| enabled          | boolean                                                   | whether the rule is enabled                                             |
| exempt_roles     | array of snowflakes                                       | the role ids that should not be affected by the rule (Maximum of 20)    |
| exempt_channels  | array of snowflakes                                       | the channel ids that should not be affected by the rule (Maximum of 50) |

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
**Characterizes the type of content which can trigger the rule.**

| Trigger Type   | Value | Description                                                          | Max per Guild |
|----------------|-------|----------------------------------------------------------------------|---------------|
| Keyword        | 1     | check if content contains words from a user defined list of keywords | 6             |
| Spam           | 3     | check if content represents generic spam                             | 1             |
| Keyword Preset | 4     | check if content contains words from internal pre-defined wordsets   | 1             |
| Mention Spam   | 5     | check if content contains more unique mentions than allowed          | 1             |

#### Trigger Metadata
**Additional data used to determine whether a rule should be triggered.**  
**Different fields are relevant based on the value of [trigger_type](#trigger-types).**

| Field                           | Type                                                   | Associated Trigger Types | Description                                                                       |
|---------------------------------|--------------------------------------------------------|--------------------------|-----------------------------------------------------------------------------------|
| keyword_filter                  | array of strings *                                     | KEYWORD                  | substrings which will be searched for in content (Maximum of 1000)                |
| regex_patterns                  | array of strings **                                    | KEYWORD                  | regular expression patterns which will be matched against content (Maximum of 10) |
| presets                         | array of [keyword preset types](#keyword-preset-types) | KEYWORD_PRESET           | the internally pre-defined wordsets which will be searched for in content         |
| allow_list                      | array of strings ***                                   | KEYWORD, KEYWORD_PRESET  | substrings which should not trigger the rule (Maximum of 100 or 1000)             |
| mention_total_limit             | integer                                                | MENTION_SPAM             | total number of unique role and user mentions allowed per message (Maximum of 50) |
| mention_raid_protection_enabled | boolean                                                | MENTION_SPAM             | whether to automatically detect mention raids                                     |

**\* A keyword can be a phrase which contains multiple words. [Wildcard symbols](#keyword-matching-strategies) can be used to customize how each keyword will be matched. Each keyword must be 60 characters or less.**  
**\*\* Only Rust flavored regex is currently supported, which can be tested in online editors such as Rustexp. Each regex pattern must be 260 characters or less.**  
**\*\*\* Each `allow_list` keyword can be a phrase which contains multiple words. [Wildcard symbols](#keyword-matching-strategies) can be used to customize how each keyword will be matched. Rules with `KEYWORD` [trigger_type](#trigger-types) accept a maximum of 100 keywords. Rules with `KEYWORD_PRESET` [trigger_type](#trigger-types) accept a maximum of 1000 keywords.**

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
| Profanity      | 1     | words that may be considered forms of swearing or cursing    |
| Sexual Content | 2     | words that refer to sexually explicit behavior or activity   |
| Slurs          | 3     | personal insults or words that may be considered hate speech |


#### Event Types
**Indicates in what event context a rule should be checked.**

| Event Type   | Value | Description                                         |
|--------------|-------|-----------------------------------------------------|
| Message Send | 1     | when a member sends or edits a message in the guild |


##### Keyword Matching Strategies
**Use the wildcard symbol (`*`) at the beginning or end of a keyword to define how it should be matched. All keywords are case insensitive.**

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
**An action which will execute whenever a rule is triggered.**

| Field       | Type                                | Description                                                               |
|-------------|-------------------------------------|---------------------------------------------------------------------------|
| type        | [action type](#action-types)        | the type of action                                                        |
| metadata? * | [action metadata](#action-metadata) | additional metadata needed during execution for this specific action type |

**\* Can be omitted based on `type`. See the `Associated Action Types` column in [action metadata](#action-metadata) to understand which `type` values require `metadata` to be set.**

#### Action Types
| Action Type        | Value | Description                                                                                                                                                |
|--------------------|-------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Block Message      | 1     | blocks a member's message and prevents it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked. |
| Send Alert Message | 2     | logs user content to a specified channel                                                                                                                   |
| Timeout            | 3     | timeout user for a specified duration *                                                                                                                    |

**\* A `TIMEOUT` action can only be set up for `KEYWORD` and `MENTION_SPAM` rules. The `MODERATE_MEMBERS` permission is required to use the `TIMEOUT` action type.**

#### Action Metadata
**Additional data used when an action is executed.**  
**Different fields are relevant based on the value of [action type](#action-types).**

| Field            | Type      | Associated Action Types | Description                                                                            | Constraints                          |
|------------------|-----------|-------------------------|----------------------------------------------------------------------------------------|--------------------------------------|
| channel_id       | snowflake | Send Alert Message      | channel to which user content should be logged                                         | existing channel                     |
| duration_seconds | integer   | Timeout                 | timeout duration in seconds                                                            | maximum of 2419200 seconds (4 weeks) |
| custom_message?  | string    | Block Message           | additional explanation that will be shown to members whenever their message is blocked | maximum of 150 characters            |

### Stage Instance Object
| Field                    | Type       | Description                                               |
|--------------------------|------------|---------------------------------------------------------- |
| id                       | snowflake  | The id of this Stage instance                             |
| guild_id                 | snowflake  | The guild id of the associated Stage channel              |
| channel_id               | snowflake  | The id of the associated Stage channel                    |
| topic                    | string     | The topic of the Stage instance (1-120 characters)        |
| privacy_level            | number     | The [privacy level](#privacy-level) of the Stage instance |
| discoverable_disabled    | boolean    | Whether or not Stage Discovery is disabled (deprecated)   |
| guild_scheduled_event_id | ?snowflake | The id of the scheduled event for this Stage instance     |

#### Privacy Level
| Level      | Value | Description                                          |
|------------|-------|------------------------------------------------------|
| Public     | 1     | The Stage instance is visible publicly. (deprecated) |
| Guild Only | 2     | The Stage instance is visible to only guild members. |
