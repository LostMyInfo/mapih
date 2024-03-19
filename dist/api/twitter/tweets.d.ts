import { TwitterTweetLookupResponse } from './resources/types';

export function create(options: {
    text?: string;
    direct_message_deep_link?: string;
    for_super_followers_only?: boolean;
    geo?: {
        place_id?: string;
    };
    media?: {
        media_ids?: string[];
        tagged_user_ids?: string[];
    };
    poll?: {
        duration_minutes?: number;
        options?: string[];
    };
    quote_tweet_id?: string;
    reply?: {
        exclude_reply_user_ids?: string[];
        in_reply_to_tweet_id?: string;
    };
    reply_settings?: 'everyone' | 'mentioned_users' | 'followers';
}): Promise<{ id: string; text: string; } | undefined>;

export function timeline(options: {
    tweet_fields?: TwitterTweetFields[];
    user_fields?: TwitterUserFields[];
    media_fields?: TwitterMediaFields[];
    place_fields?: TwitterPlaceFields[];
    poll_fields?: TwitterPollFields[];
    expansions?: TwitterExpansions[];
    exclude?: 'retweets' | 'replies';
    max_results?: number;
    next_token?: string;
    pagination_token?: string;
    since_id?: string;
    until_id?: string;
    start_time?: string;
    end_time?: string;
}): Promise<TwitterTweetLookupResponse | undefined>;
//# sourceMappingURL=tweets.d.ts.map