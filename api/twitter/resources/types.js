// @ts-check

/*
export interface MultipleTweetsLookupResponse {
	data: Array<APITweet>;
	includes?: APITweetExpansions;
}
*/

/**
 * @typedef {'attachments.poll_ids' | 'attachments.media_keys' | 'author_id' | 'entities.mentions.username' | 'geo.place.id' | 'in_reply_to_user_id' | 'referenced_tweets.id' | 'referenced_tweets.id.author_id'} TwitterExpansions
 */

/**
 * @typedef {'attachments' | 'context_annotations' | 'author_id' | 'entities' | 'geo' | 'in_reply_to_user_id' | 'referenced_tweets' | 'public_metrics' | 'conversation_id' | 'withheld' | 'text' | 'source' | 'reply_settings' | 'possibly_sensitive' | 'lang' | 'id'} TwitterTweetFields
 */

/**
 * @typedef {'description' | 'username' | 'verified' | 'url' | 'protected' | 'pinned_tweet_id' | 'profile_image_url' | 'name' | 'location' | 'withheld' | 'entities' | 'public_metrics'} TwitterUserFields
 */

/**
 * @typedef {'duration_ms' | 'height' | 'media_key' | 'preview_image_url' | 'type' | 'url' | 'width' | 'public_metrics' | 'non_public_metrics' | 'organic_metrics' | 'alt_text' | 'variants'} TwitterMediaFields
 */

/**
 * @typedef {'contained_within' | 'country' | 'country_code' | 'full_name' | 'geo' | 'id' | 'name' | 'place_type'} TwitterPlaceFields
 */

/**
 * @typedef {'duration_minutes' | 'end_datetime' | 'id' | 'options' | 'voting_status'} TwitterPollFields
 */

// / //////////////////////////////////////////////////////////////
// RESPONSES

/**
 * @typedef {Object} TwitterTweetLookupResponse
 * @property {TwitterTweet[]} data
 * @property {TwitterIncludes} [includes]
 * @property {TwitterTweetsMeta} [meta]
 */
 
/**
 * @typedef {Object} TwitterTweetLookupResponseSingle
 * @property {TwitterTweet} data
 * @property {TwitterIncludes} [includes]
 * @property {TwitterTweetsMeta} [meta]
 */

/**
 * @typedef {Object} TwitterSingleUserLookupResponse
 * @property {TwitterUser} data
 * @property {TwitterIncludes} [includes]
 */
 
/**
 * @typedef {Object} TwitterMultipleUserLookupResponse
 * @property {TwitterUser[]} data
 * @property {TwitterIncludes} [includes]
 */

/**
 * @typedef {Object} TwitterTweetsMeta
 * @property {string} [next_token]
 * @property {number} result_count
 * @property {string} newest_id
 * @property {string} oldest_id
 */

/**
 * @typedef {Object} TwitterIncludes
 * @property {TwitterTweet[]} [tweets]
 * @property {TwitterUser[]} [users]
 * @property {TwitterPlace[]} [places]
 * @property {TwitterMedia[]} [media]
 * @property {TwitterPoll[]} [polls]
 */

// //////////////////////////////////////////////////////////////
// BASE ENTITY

/**
 * @typedef {Object} TwitterBaseEntity
 * @property {number} start
 * @property {number} end
 */
 
/**
 * @typedef {TwitterBaseEntity & {
 *   tag: string;
 * }} TwitterCashtagEntity
 */

/**
 * @typedef {TwitterBaseEntity & {
 *   tag: string;
 * }} TwitterHashtagEntity
 */
 

// //////////////////////////////////////////////////////////////
// USERS

/**
 * @typedef {Object} TwitterUser
 * @property {string} id - The unique identifier of the user
 * @property {string} name - The name of the user, as they’ve defined it on their profile
 * @property {string} username - The Twitter screen name, handle, or alias that this user identifies themselves with
 * @property {string} [created_at] - The UTC datetime that the user account was created on Twitter
 * @property {string} [description] - The text of this user's profile description (also known as bio), if the user provided one
 * @property {TwitterUserEntities} [entities] - Contains details about text that has a special meaning in the user's description
 * @property {TwitterConnectionStatus} [connection_status]
 * @property {string} [location] - The location specified in the user's profile, if the user provided one
 * @property {string} [pinned_tweet_id] - The unique identifier of this user's pinned Tweet
 * @property {string} [profile_image_url] - The URL to the profile image for this user, as shown on the user's profile
 * @property {boolean} [protected] - Indicates if this user has chosen to protect their Tweets (in other words, if this user's Tweets are private)
 * @property {TwitterUserPublicMetrics} [public_metrics] - Contains details about activity for this user
 * @property {string} [url] - The URL specified in the user's profile, if present
 * @property {boolean} [verified] - Indicates if this user is a verified Twitter User
 * @property {TwitterUserWithheld} [withheld] - Contains withholding details for withheld content, if applicable
 */
 
/**
 * @typedef {Object} TwitterUserEntities
 * @property {TwitterUserEntitiesURL} [urls]
 * @property {TwitterUserEntitiesDescription} [description]
 */
 
/**
 * @typedef {TwitterBaseEntity & {
 *   username: string
 * }} TwitterUserMentionEntity
 */

/**
* @typedef {Object} TwitterUserEntitiesDescription
 * @property {TwitterCashtagEntity[]} [cashtags]
 * @property {TwitterHashtagEntity[]} [hashtags]
 * @property {TwitterUserMentionEntity[]} [mentions]
 * @property {TwitterUserURLEntity[]} [urls]
 */
 
/**
 * @typedef {TwitterBaseEntity & {
 *   url: number;
 *   expanded_url: string;
 *   display_url: string;
 * }} TwitterUserURLEntity
 
/**
 * @typedef {Object} TwitterUserEntitiesURL
 * @property {TwitterUserURLEntity[]} urls
 */
 
/**
 * @typedef {Object} TwitterUserPublicMetrics
 * @property {number} followers_count
 * @property {number} following_count
 * @property {number} tweet_count
 * @property {number} listed_count
 */

/**
 * @typedef {Object} TwitterUserWithheld
 * @property {string[]} country_codes - Provides a list of countries where this content is not available
 * @property {string} [scope] - Indicates whether the content being withheld is the `tweet` or a `user`
 */
 

// //////////////////////////////////////////////////////////////
// TWEETS

 
/**
 * @typedef {Object} TwitterEditControls
 * @param {number} edits_remaining
 * @param {boolean} is_edit_eligible
 * @param {ISO8601Timestamp} editable_until
 */

 
/**
 * @summary [Twitter Tweet]{@link https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/tweet}
 * @typedef {Object} TwitterTweet
 * @property {string} id - The unique identifier of the requested Tweet
 * @property {string} text - The actual `UTF-8` text of the Tweet
 * @property {TwitterAttachment} [attachments] - The type of attachments (if any) present in the Tweet
 * @property {string} [author_id] - The unique identifier of the User who posted the Tweet
 * @property {TwitterContextAnnotation[]} [context_annotations] - Contains context annotations for the Tweet
 * @property {string} [conversation_id] - The ID of the original Tweet of the conversation (which includes direct replies, replies of replies)
 * @property {string} [created_at] - The `ISO 8601` creation time of the Tweet
 * @property {TwitterTweetEntities} [entities] - The entities which have been parsed out of the text of the Tweet
 * @property {TwitterGeo} [geo] - The details about the location tagged by the user in the Tweet, if they specified one
 * @property {string} [in_reply_to_user_id] - If the Tweet is a reply, this field will contain the original Tweet’s author ID
 * @property {TwitterEditControls} [edit_controls] - When present, this indicates how much longer the Tweet can be edited and the number of remaining edits. Tweets are only editable for the first 30 minutes after creation and can be edited up to five times.
 * @property {string} [lang] - The language of the Tweet, if detected by Twitter
 * @property {TwitterTweetNonPublicMetrics} [non_public_metrics] - Non-public engagement metrics for the Tweet at the time of the request. Requires user context authentication.
 * @property {TwitterTweetOrganicMetrics} [organic_metrics] - Engagement metrics tracked in an organic context for the Tweet at the time of the request. Requires user context authentication.
 * @property {TwitterTweetPublicMetrics} [public_metrics] - Public engagement metrics for the Tweet at the time of the request
 * @property {TwitterTweetPromotedMetrics} [promoted_metrics] - Engagement metrics tracked in a promoted context for the Tweet at the time of the request. Requires user context authentication.
 * @property {boolean} [possibly_sensitive] - This field only surfaces when a Tweet contains a link. The meaning of the field doesn’t pertain to the Tweet content itself, but instead it is an indicator that the URL contained in the Tweet may contain content or media identified as sensitive content
 * @property {TwitterReferencedTweet} [referenced_tweets] - A list of Tweets this Tweet refers to. It will also include the related Tweet referenced to by its parent
 * @property {string} [reply_settings] - Shows who can reply to the Tweet. ('everyone', 'mentioned_users', 'followers')
 * @property {string} [source] - The name of the app the user Tweeted from
 * @property {TwitterTweetWithheld} [withheld] - When present, contains withholding details for withheld content
 */
 
/**
 * @typedef {Object} TwitterAttachment
 * @property {string[]} [media_keys]
 * @property {string[]} [poll_ids]
 */

/**
 * @typedef {TwitterBaseEntity & {
 *   probability: number;
 *   type: string;
 *   normalized_text: string;
 * }} TwitterTweetAnnotationEntity
 */
 
/**
 * @typedef {TwitterBaseEntity & {
 *   username: string;
 *   id: string;
 * }} TwitterTweetMentionEntity
 */
 
/**
 * @typedef {TwitterBaseEntity & {
 *   url: string;
 *   expanded_url: string;
 *   display_url: string;
 *   unwound_url: string;
 *   status: string;
 *   title: string;
 *   description: string;
 * }} TwitterTweetURLEntity
 */
 
/**
 * @typedef {Object} TwitterContextAnnotation
 * @property {TwitterContextAnnotationDomain} domain
 * @property {TwitterContextAnnotationEntity} entity
 */

/**
 * @typedef {Object} TwitterContextAnnotationDomain
 * @property {string} id
 * @property {string} name
 * @property {string} description
 */
 
/**
 * @typedef {Object} TwitterContextAnnotationEntity
 * @property {string} id
 * @property {string} name
 * @property {string} description
 */
 
/**
 * @typedef {Object} TwitterTweetEntities
 * @property {TwitterTweetAnnotationEntity[]} [annotations]
 * @property {TwitterCashtagEntity[]} [cashtags]
 * @property {TwitterHashtagEntity[]} [hashtags]
 * @property {TwitterTweetMentionEntity[]} [mentions]
 * @property {TwitterTweetURLEntity[]} [urls]
 */
 
/**
 * @typedef {Object} TwitterGeo
 * @property {TwitterGeoCoordinates} [coordinates]
 * @property {string} place_id
 */
 
/**
 * @typedef {Object} TwitterGeoCoordinates
 * @property {string} type
 * @property {?[number, number]} coordinates
 */

/**
 * @typedef {Object} TwitterTweetNonPublicMetrics
 * @property {number} impression_count
 * @property {number} user_profile_clicks
 * @property {number} [url_link_clicks]
 */

/**
 * @typedef {Object} TwitterTweetOrganicMetrics
 * @property {number} impression_count
 * @property {number} user_profile_clicks
 * @property {number} [url_link_clicks]
 * @property {number} retweet_count
 * @property {number} reply_count
 * @property {number} like_count
 */
 
/**
 * @typedef {Object} TwitterTweetPublicMetrics
 * @property {number} quote_count
 * @property {number} retweet_count
 * @property {number} reply_count
 * @property {number} like_count
 */
 
/** @typedef {TwitterTweetOrganicMetrics & {}} TwitterTweetPromotedMetrics */

/**
 * @typedef {Object} TwitterReferencedTweet
 * @property {string} type - 'retweeted' | 'quoted' | 'replied_to'
 * @property {string} id
 */

/**
 * @typedef {Object} TwitterTweetWithheld
 * @property {boolean} copyright - Indicates if the content is being withheld for on the basis of copyright infringement
 * @property {string[]} country_codes - Provides a list of countries where this content is not available
 * @property {string} [scope] - Indicates whether the content being withheld is the `tweet` or a `user`
 */
 
/**
 * @typedef {Object} TwitterFilteredTweetStreamRule
 * @property {string} value - The filter value of the rule. @example "coffee -is:retweet"
 * @property {string} [tag] - A tag meant for the labeling of user provided rules. @example "Non-retweeted coffee tweets"
 * @property {string} id - Unique identifier of this rule
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

