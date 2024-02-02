type ImgurAccount = {
    id: number;
    url: string;
    bio: string | null;
    avatar: string;
    avatar_name: string;
    cover: string;
    cover_name: string;
    reputation: number;
    reputation_name: string;
    created: number;
    pro_expiration: boolean;
    is_blocked: boolean;
    user_follow: boolean;
};
type ImgurImage = {
    id: string;
    account_url: string;
    account_id: number;
    name: string | null;
    title: string | null;
    description: string | null;
    link: string;
    uploaded: number;
    type: string;
    animated: boolean;
    width: number;
    height: number;
    size: number;
    views: number;
    bandwidth: number;
    vote: string | null;
    favorite: boolean;
    nsfw: boolean | null;
    section: string | null;
    /**
     * //
     */
    is_ad: boolean;
    in_most_viral: boolean;
    /**
     * //
     */
    has_sound: boolean;
    /**
     * //
     */
    tags: ImgurTags[];
    /**
     * //
     */
    ad_type: number;
    /**
     * //
     */
    ad_url: string;
    edited?: string | undefined;
    /**
     * //
     */
    in_gallery: boolean;
    is_blocked?: boolean | undefined;
    user_follow?: boolean | undefined;
    deletehash: string;
    gifv?: string | undefined;
    mp4?: string | undefined;
    mp4_size?: number | undefined;
    looping?: boolean | undefined;
    comment_count?: number | undefined;
    favorite_count?: number | undefined;
    topic?: string | undefined;
    topic_id?: number | undefined;
    upvotes?: number | undefined;
    downvotes?: number | undefined;
    points?: number | undefined;
    is_album?: boolean | undefined;
    score?: number | undefined;
    ad_config?: ImgurAdConfig | undefined;
    privacy?: string | undefined;
    layout?: string | undefined;
    cover?: string | undefined;
    cover_width?: number | undefined;
    cover_height?: number | undefined;
    images_count?: number | undefined;
    include_album_ads?: boolean | undefined;
    images?: ImgurImage[] | undefined;
};
type ImgurGalleryImage = ImgurImage & {
    privacy?: string;
    layout?: string;
    cover: string;
    cover_width: number;
    cover_height: number;
    images_count: number;
    include_album_ads: boolean;
    images: ImgurImage[];
};
type ImgurAdConfig = {
    safe_flags: string[];
    high_risk_flags: string[];
    unsafe_flags: string[];
    wall_unsafe_flags: string[];
    show_ads: boolean;
    show_ad_level: number;
    nsfw_score: number;
};
type ImgurTags = {
    name: string;
    display_name: string;
    description?: string | undefined;
    followers: number;
    total_items: number;
    following: boolean;
    is_whitelisted: boolean;
    background_hash?: string | undefined;
    thumbnail_hash?: string | undefined;
    logo_hash?: string | undefined;
    logo_destinated_url?: string | undefined;
    accent?: string | undefined;
    background_is_animated: boolean;
    thumbnail_is_animated: boolean;
    is_promoted: boolean;
    description_annotations?: number | undefined;
};
type ImgurGalleryItem = {
    id: string;
    title: string | null;
    description: string | null;
    uploaded: number;
    account_url?: string | undefined;
    account_id: number;
    link: string;
    views: number;
    vote?: string | null | undefined;
    favorite: boolean;
    nsfw?: boolean | null | undefined;
    comment_count?: number | undefined;
    topic?: string | undefined;
    topic_id?: number | undefined;
    upvotes: number;
    downvotes: number;
    is_album: boolean;
};
type GalleryAlbum = ImgurGalleryItem & {
    type: string;
    animated: boolean;
    width: number;
    height: number;
    size: number;
    bandwidth: number;
    deletehash?: string | undefined;
    gifv?: string | undefined;
    mp4?: string | undefined;
    webm?: string | undefined;
    hls?: string | undefined;
    section: boolean;
    looping?: boolean | undefined;
};
type GalleryImage = ImgurGalleryItem & {
    privacy?: string;
    layout?: string;
    cover: string;
    cover_width: number;
    cover_height: number;
    images_count: number;
    include_album_ads: boolean;
    images: ImgurImage[];
};
//# sourceMappingURL=types.d.ts.map