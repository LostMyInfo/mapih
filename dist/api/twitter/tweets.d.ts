export function create(options: {
    text?: string | undefined;
    direct_message_deep_link?: string | undefined;
    for_super_followers_only?: boolean | undefined;
    place_id?: string | undefined;
    media_ids?: string[] | undefined;
    tagged_users_ids?: string[] | undefined;
    poll?: {
        duration?: number | undefined;
        options?: string[] | undefined;
    } | undefined;
    quote_tweet_id?: string | undefined;
    exclude_reply_user_ids?: string[] | undefined;
    in_reply_to_tweet_id?: string | undefined;
    reply_settings?: string | undefined;
}): Promise<{
    id: string;
    text: string;
} | undefined>;
//# sourceMappingURL=tweets.d.ts.map