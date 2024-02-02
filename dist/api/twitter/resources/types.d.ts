type TwitterUser = {
    /**
     * - The unique identifier of this user
     */
    id: string;
    /**
     * - The name of the user, as they’ve defined it on their profile. Not necessarily a person’s name. Typically capped at 50 characters, but subject to change.
     */
    name: string;
    /**
     * - The Twitter screen name, handle, or alias that this user identifies themselves with. Usernames are unique but subject to change. Typically a maximum of 15 characters long, but some historical accounts may exist with longer names.
     */
    username: string;
    /**
     * - The text of this user's profile description (also known as bio), if the user provided one
     */
    description?: string | undefined;
    /**
     * - The UTC datetime that the user account was created on Twitter
     */
    created_at?: string | undefined;
    /**
     * - The URL to the profile image for this user, as shown on the user's profile
     */
    profile_image_url?: string | undefined;
    /**
     * - The URL specified in the user's profile, if present
     */
    url?: string | undefined;
    /**
     * - Indicates if this user is a verified Twitter User
     */
    verified?: boolean | undefined;
    /**
     * - Provides a list of relation between the authenticating user and the user being looked up
     */
    connection_status?: string[] | undefined;
    /**
     * - Contains details about text that has a special meaning in the user's description
     */
    entities?: TwitterEntities | undefined;
    /**
     * - The location specified in the user's profile, if the user provided one. As this is a freeform value, it may not indicate a valid location, but it may be fuzzily evaluated when performing searches with location queries
     */
    location?: string | undefined;
    /**
     * - Unique identifier of this user's pinned Tweet
     */
    pinned_tweet_id?: string | undefined;
    /**
     * - Indicates if this user has chosen to protect their Tweets (in other words, if this user's Tweets are private)
     */
    protected?: boolean | undefined;
    /**
     * - Contains details about activity for this user
     */
    public_metrics?: TwitterPublicMetrics | undefined;
    /**
     * - Contains withholding details for [withheld content]{@link https://help.twitter.com/en/rules-and-policies/post-withheld-by-country}, if applicable
     */
    withheld?: any;
};
type TwitterPublicMetrics = {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
    like_count: number;
};
type TwitterEntities = {
    url?: {
        urls?: TwitterEntityURLs[] | undefined;
    } | undefined;
    description?: TwitterEntitiesDescription | undefined;
};
type TwitterEntitiesDescription = {
    urls?: TwitterEntityURLs[] | undefined;
    hashtags?: TwitterTags[] | undefined;
    mentions?: TwitterTags[] | undefined;
    cashtags?: TwitterTags[] | undefined;
};
type TwitterEntityURLs = {
    start: number;
    end: number;
    url: string;
    expanded_url: string;
    display_url: string;
};
type TwitterTags = {
    start: number;
    end: number;
    tag: string;
};
/**
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
type TwitterConnectionStatus = string;
//# sourceMappingURL=types.d.ts.map