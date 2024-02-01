// @ts-check

/**
 * @typedef {Object} ImgurAccount
 * @property {number} id
 * @property {string} url
 * @property {?string} bio
 * @property {string} avatar
 * @property {string} avatar_name
 * @property {string} cover
 * @property {string} cover_name
 * @property {number} reputation
 * @property {string} reputation_name
 * @property {number} created
 * @property {boolean} pro_expiration
 * @property {boolean} is_blocked
 * @property {boolean} user_follow
 */


/**
 * @typedef {Object} ImgurImage
 * @property {string} id
 * @property {string} account_url
 * @property {number} account_id
 * @property {?string} name
 * @property {?string} title
 * @property {?string} description
 * @property {string} link
 * @property {number} uploaded
 * @property {string} type
 * @property {boolean} animated
 * @property {number} width
 * @property {number} height
 * @property {number} size
 * @property {number} views
 * @property {number} bandwidth
 * @property {?string} vote
 * @property {boolean} favorite
 * @property {?boolean} nsfw
 * @property {?string} section
 * @property {boolean} is_ad //
 * @property {boolean} in_most_viral
 * @property {boolean} has_sound //
 * @property {ImgurTags[]} tags //
 * @property {number} ad_type // 
 * @property {string} ad_url // 
 * @property {string} [edited] //
 * @property {boolean} in_gallery //
 * @property {boolean} [is_blocked] //
 * @property {boolean} [user_follow] //
 * @property {string} deletehash
 * @property {string} [gifv]
 * @property {string} [mp4]
 * @property {number} [mp4_size]
 * @property {boolean} [looping]
 * @property {string} [gifv]
 * @property {number} [comment_count]
 * @property {number} [favorite_count]
 * @property {string} [topic]
 * @property {number} [topic_id]
 * @property {number} [upvotes]
 * @property {number} [downvotes]
 * @property {number} [points]
 * @property {boolean} [is_album]
 * @property {number} [score]
 * @property {ImgurAdConfig} [ad_config]
 * @property {string} [privacy]
 * @property {string} [layout]
 * @property {string} [cover]
 * @property {number} [cover_width]
 * @property {number} [cover_height]
 * @property {number} [images_count]
 * @property {boolean} [include_album_ads]
 * @property {ImgurImage[]} [images]
 */

/**
 * @typedef {ImgurImage & {
*    privacy?: string,
*    layout?: string,
*    cover: string,
*    cover_width: number,
*    cover_height: number,
*    images_count: number,
*    include_album_ads: boolean,
*    images: ImgurImage[]
* }} ImgurGalleryImage
*/

/**
 * @typedef {Object} ImgurAdConfig
 * @property {string[]} safe_flags
 * @property {string[]} high_risk_flags
 * @property {string[]} unsafe_flags
 * @property {string[]} wall_unsafe_flags
 * @property {boolean} show_ads
 * @property {number} show_ad_level
 * @property {number} nsfw_score
 */

/**
 * @typedef {Object} ImgurTags
 * @property {string} name
 * @property {string} display_name
 * @property {string} [description]
 * @property {number} followers
 * @property {number} total_items
 * @property {boolean} following
 * @property {boolean} is_whitelisted
 * @property {string} [background_hash]
 * @property {string} [thumbnail_hash]
 * @property {string} [logo_hash]
 * @property {string} [logo_destinated_url]
 * @property {string} [accent]
 * @property {boolean} background_is_animated
 * @property {boolean} thumbnail_is_animated
 * @property {boolean} is_promoted
 * @property {number} [description_annotations]
 */

/**
 * @typedef {Object} ImgurGalleryItem
 * @property {string} id
 * @property {?string} title
 * @property {?string} description
 * @property {number} uploaded
 * @property {string} [account_url]
 * @property {number} account_id
 * @property {string} link
 * @property {number} views
 * @property {?string} [vote]
 * @property {boolean} favorite
 * @property {?boolean} [nsfw]
 * @property {number} [comment_count]
 * @property {string} [topic]
 * @property {number} [topic_id]
 * @property {number} upvotes
 * @property {number} downvotes
 * @property {boolean} is_album
 */

/**
 * @typedef {ImgurGalleryItem & {
 *    type: string,
 *    animated: boolean,
 *    width: number,
 *    height: number,
 *    size: number,
 *    bandwidth: number,
 *    deletehash?: string | undefined,
 *    gifv?: string | undefined,
 *    mp4?: string | undefined,
 *    webm?: string | undefined,
 *    hls?: string | undefined,
 *    section: boolean,
 *    looping?: boolean | undefined,
 * }} GalleryAlbum
 */

/**
 * @typedef {ImgurGalleryItem & {
 *    privacy?: string,
 *    layout?: string,
 *    cover: string,
 *    cover_width: number,
 *    cover_height: number,
 *    images_count: number,
 *    include_album_ads: boolean,
 *    images: ImgurImage[]
 * }} GalleryImage
 */