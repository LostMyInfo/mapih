// @ts-check

export type TwitterExpansions = 'attachments.poll_ids' | 'attachments.media_keys' | 'author_id' | 'referenced_tweets.id' | 'in_reply_to_user_id' | 'edit_history_tweet_ids' | 'geo.place_id' | 'entities.mentions.username' | 'referenced_tweets.id.author_id';
export type TwitterMediaFields = 'duration_ms' | 'height' | 'media_key' | 'preview_image_url' | 'type' | 'url' | 'width' | 'public_metrics' | 'non_public_metrics' | 'organic_metrics' | 'alt_text' | 'variants';
export type TwitterPlaceFields = 'contained_within' | 'country' | 'country_code' | 'full_name' | 'geo' | 'id' | 'name' | 'place_type';
export type TwitterPollFields = 'duration_minutes' | 'end_datetime' | 'id' | 'options' | 'voting_status';
export type TwitterTweetFields = 'attachments' | 'author_id' | 'context_annotations' | 'conversation_id' | 'created_at' | 'entities' | 'geo' | 'id' | 'in_reply_to_user_id' | 'lang' | 'public_metrics' | 'non_public_metrics' | 'promoted_metrics' | 'organic_metrics' | 'edit_controls' | 'possibly_sensitive' | 'referenced_tweets' | 'reply_settings' | 'source' | 'text' | 'withheld';
export type TwitterUserFields = 'created_at' | 'description' | 'entities' | 'id' | 'location' | 'name' | 'pinned_tweet_id' | 'profile_image_url' | 'protected' | 'public_metrics' | 'url' | 'username' | 'verified' | 'verified_type' | 'withheld';

export type TwitterUserConnectionStatus = 'follow_request_received' | 'follow_request_sent' | 'followed_by' | 'following' | 'muting' | 'blocking';

export type TwitterTweetLookupResponse = {
    data: TwitterTweet[];
    includes?: TwitterIncludes;
    meta?: TwitterTweetsMeta;
}

export type TwitterSingleUserLookupResponse = {
    data: TwitterUser;
    includes?: TwitterIncludes;
}

export type TwitterMultipleUserLookupResponse = {
    data: TwitterUser[];
    includes?: TwitterIncludes;
}
 
export type TwitterTweetsMeta = {
    next_token?: string;
    result_count: number;
    newest_id: string;
    oldest_id: string;
}

export type TwitterIncludes = {
    tweets?: TwitterTweet[];
    users?: TwitterUser[];
    places?: TwitterPlace[];
    media?: TwitterMedia[];
    polls?: TwitterPoll[]
}

export type TwitterBaseEntity = {
    start: number;
    end: number;
};

export type TwitterCashtagEntity = TwitterBaseEntity & {
    tag: string;
};

export type TwitterHashtagEntity = TwitterBaseEntity & {
    tag: string;
};

export type TwitterUser = {
    id: string;
    name: string;
    username: string;
    created_at?: string;
    description?: string;
    entities?: TwitterUserEntities;
    connection_status?: TwitterUserConnectionStatus;
    location?: string;
    pinned_tweet_id?: string;
    profile_image_url?: string;
    protected?: boolean;
    public_metrics?: TwitterUserPublicMetrics;
    url?: string;
    verified?: boolean;
    withheld?: TwitterUserWithheld;
};

export type TwitterUserEntities = {
    urls?: TwitterUserEntitiesURL;
    description?: TwitterUserEntitiesDescription;
};

export type TwitterUserMentionEntity = TwitterBaseEntity & {
    username: string;
};

export type TwitterUserEntitiesDescription = {
    cashtags?: TwitterCashtagEntity[];
    hashtags?: TwitterHashtagEntity[];
    mentions?: TwitterUserMentionEntity[];
    urls?: TwitterUserURLEntity[];
};

export type TwitterUserURLEntity = TwitterBaseEntity & {
    url: number;
    expanded_url: string;
    display_url: string;
};

export type TwitterUserEntitiesURL = {
    urls: TwitterUserURLEntity[];
};

export type TwitterUserPublicMetrics = {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
};

export type TwitterUserWithheld = {
    country_codes: string[];
    scope?: string;
}