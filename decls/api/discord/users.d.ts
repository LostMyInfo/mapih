/**
Get Current User

Endpoint: /users/@me
Returns the user object of the requester's account. For OAuth2, this requires the identify scope.
Returns the user object without an email. Optionally with the email scope, will return an object with an email. */
export function getCurrentUser(): Promise<any>;
/**
Get Current User

Endpoint: /users/@me
Returns the user object of the requester's account. For OAuth2, this requires the identify scope.
Returns the user object without an email. Optionally with the email scope, will return an object with an email. */
export function getCurrentUser(): Promise<any>;
/**
Get User

Endpoint: /users/{user.id}
Returns a user object for a given user ID. */
export function getUser(params: any): Promise<any>;
/**
Get User

Endpoint: /users/{user.id}
Returns a user object for a given user ID. */
export function getUser(params: any): Promise<any>;
/**
Modify Current User

Endpoint: /users/@me
Modify the requester's user account settings.
Returns a user object on success and triggers a User Update Gateway event. */
export function modifyCurrentUser(params: any): Promise<any>;
/**
Modify Current User

Endpoint: /users/@me
Modify the requester's user account settings.
Returns a user object on success and triggers a User Update Gateway event. */
export function modifyCurrentUser(params: any): Promise<any>;
/**
Get Current User Guilds
Endpoint: /users/@me/guilds
Returns a list of partial guild objects the current user is a member of. Requires the guilds OAuth2 scope. */
export function getCurrentUserGuilds(): Promise<any>;
/**
Get Current User Guilds
Endpoint: /users/@me/guilds
Returns a list of partial guild objects the current user is a member of. Requires the guilds OAuth2 scope. */
export function getCurrentUserGuilds(): Promise<any>;
/**
Get Current User Guild Member

Endpoint: /users/@me/guilds/{guild.id}/member
Returns a guild member object for the current user. Requires the guilds.members.read OAuth2 scope. */
export function getCurrentUserGuildMember(params: any): Promise<any>;
/**
Get Current User Guild Member

Endpoint: /users/@me/guilds/{guild.id}/member
Returns a guild member object for the current user. Requires the guilds.members.read OAuth2 scope. */
export function getCurrentUserGuildMember(params: any): Promise<any>;
/**
Leave Guild

Endpoint: /users/@me/guilds/{guild.id}
Leave a guild. Returns a 204 empty response on success. */
export function leaveGuild(params: any): Promise<boolean>;
/**
Leave Guild

Endpoint: /users/@me/guilds/{guild.id}
Leave a guild. Returns a 204 empty response on success. */
export function leaveGuild(params: any): Promise<boolean>;
/**
Create DM

Endpoint: /users/@me/channels
Create a new DM channel with a user.
Returns a DM channel object. */
export function createDM(params: any): Promise<any>;
/**
Create DM

Endpoint: /users/@me/channels
Create a new DM channel with a user.
Returns a DM channel object. */
export function createDM(params: any): Promise<any>;
/**
Create Group DM

Endpoint: /users/@me/channels
Create a new group DM channel with multiple users.
Returns a DM channel object.
This endpoint was intended to be used with the now-deprecated GameBridge SDK.
DMs created with this endpoint will not be shown in the Discord client */
export function createGroupDM(params: any): Promise<any>;
/**
Create Group DM

Endpoint: /users/@me/channels
Create a new group DM channel with multiple users.
Returns a DM channel object.
This endpoint was intended to be used with the now-deprecated GameBridge SDK.
DMs created with this endpoint will not be shown in the Discord client */
export function createGroupDM(params: any): Promise<any>;
/**
Get User Connections
Endpoint: /users/@me/connections
Returns a list of connection objects. Requires the connections OAuth2 scope. */
export function getUserConnections(): Promise<any>;
/**
Get User Connections
Endpoint: /users/@me/connections
Returns a list of connection objects. Requires the connections OAuth2 scope. */
export function getUserConnections(): Promise<any>;
//# sourceMappingURL=users.d.ts.map