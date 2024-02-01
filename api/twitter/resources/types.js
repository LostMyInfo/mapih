// @ts-check

/**
 * @typedef {Object} TwitterUser
 * @property {string} id - The unique identifier of this user
 * @property {string} name - The name of the user, as they’ve defined it on their profile. Not necessarily a person’s name. Typically capped at 50 characters, but subject to change.
 * @property {string} username - The Twitter screen name, handle, or alias that this user identifies themselves with. Usernames are unique but subject to change. Typically a maximum of 15 characters long, but some historical accounts may exist with longer names.
 * @property {string} [description] - The text of this user's profile description (also known as bio), if the user provided one
 * @property {ISO8601Timestamp} [created_at] - The UTC datetime that the user account was created on Twitter
 * @property {string} [profile_image_url] - The URL to the profile image for this user, as shown on the user's profile
 * @property {string} [url] - The URL specified in the user's profile, if present
 * @property {boolean} [verified] - Indicates if this user is a verified Twitter User
 * @property {TwitterConnectionStatus[]} [connection_status] - Provides a list of relation between the authenticating user and the user being looked up
 * @property {TwitterEntities} [entities] - Contains details about text that has a special meaning in the user's description
 * @property {string} [location] - The location specified in the user's profile, if the user provided one. As this is a freeform value, it may not indicate a valid location, but it may be fuzzily evaluated when performing searches with location queries
 * @property {string} [pinned_tweet_id] - Unique identifier of this user's pinned Tweet
 * @property {boolean} [protected] - Indicates if this user has chosen to protect their Tweets (in other words, if this user's Tweets are private)
 * @property {TwitterPublicMetrics} [public_metrics] - Contains details about activity for this user
 * @property {*} [withheld] - Contains withholding details for [withheld content]{@link https://help.twitter.com/en/rules-and-policies/post-withheld-by-country}, if applicable
 */

/**
 * @typedef {Object} TwitterPublicMetrics
 * @property {number} followers_count
 * @property {number} following_count
 * @property {number} tweet_count
 * @property {number} listed_count
 * @property {number} like_count
 */
/**
 * @typedef {Object} TwitterEntities
 * @property {{urls?: TwitterEntityURLs[]}} [url]
 * @property {TwitterEntitiesDescription} [description]
 */

/**
 * @typedef {Object} TwitterEntitiesDescription
 * @property {TwitterEntityURLs[]} [urls]
 * @property {TwitterTags[]} [hashtags]
 * @property {TwitterTags[]} [mentions]
 * @property {TwitterTags[]} [cashtags]
 */

/**
 * @typedef {Object} TwitterEntityURLs
 * @property {number} start
 * @property {number} end
 * @property {string} url
 * @property {string} expanded_url
 * @property {string} display_url
 */

/**
 * @typedef {Object} TwitterTags
 * @property {number} start
 * @property {number} end
 * @property {string} tag
 */

/**
 * @typedef {string} TwitterConnectionStatus
 * - Provides a list of relation between the authenticating user and the user being looked up such as following, followed, follow request sent, follow request received, blocking, muting  
 * 
 * | Name                    |
 * |-------------------------|
 * | follow_request_received |
 * | follow_request_sent     |
 * | followed_by             |
 * | following               |
 * | muting                  |
 * | blocking                |
 */

