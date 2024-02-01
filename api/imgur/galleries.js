/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check

const { removeFalsyFromObject, buildQueryString } = require('../resources/functions');
const { handler } = require('../resources/handlers');

/**
 * @file All Imgur API endpoints relating to image galleries
 * @module galleries
 */

module.exports = {

  /**
   * @summary
   * ### [Search Gallery]{@link https://apidocs.imgur.com/#3c981acf-47aa-488f-b068-269f65aee3ce}
   * 
   * @example
   * await api.imgur.galleries.search({
   *   query: 'donkey'
   * });
   * 
   * @example
   * await api.imgur.galleries.search({
   *   query: 'donkey',
   *   match: 'exactly',
   *   limit: 5
   * });
   * 
   * @example
   * await api.imgur.galleries.search({
   *   query: 'donkey',
   *   type: 'albums',
   *   min_images: 10
   * });
   * 
   * @function search
   * @memberof module:galleries#
   * @param {Object} options
   * @param {string} options.query
   * @param {string} [options.category]
   * @param {number} [options.min_images]
   * @param {number} [options.max_images]
   * @param {string} [options.match] - Advanced search query parameters (default `all`)  
   * Valid values are:  
   * - `all`: Search for all of these words (and)
   * - `any`: Search for any of these words (or)
   * - `exactly`: Search for exactly this word of phrase
   * @param {string} [options.exclude] - Exclude results matching these words/phrases
   * @param {number} [options.limit]
   * @param {string} [options.type] - `jpg`, `png`, `gif`, `anigif` (animated gif), `album`
   * @param {string} [options.sort] - `time`, `viral`, `top` (default `time`)
   * @param {string} [options.window] - Change the date range of the request if the sort is `top` (`day`, `week`, `month`, `year`, `all`)
   * @param {number} [options.page] - The data paging number
   * @returns {Promise<{total: number, limit?: number, galleries?: ImgurImage[], images?: ImgurImage[]}>}
   */
  search: async (options) => {

    const key = options.match && /^(all|any|exactly)$/i.test(options.match) ? `q_${options.match}` : 'q';

    let attempt = await handler({
      method: 'GET',
      endpoint: buildQueryString('gallery/search', {
        [key]: options.query,
        // q: options.query,
        // q_all: options.all?.join(' '),
        // q_any: options.any?.join(' '),
        // q_exactly: options.exactly,
        q_not: options.exclude,
        q_type: options.type,
        sort: options.sort,
        window: options.window,
        page: options.page
      }),
      handler: 'imgur'
    });

    // return console.log(buildGallery(attempt.filter((x) => x.images?.length > 1)));
    if (options.limit)
      attempt = attempt.slice(0, options.limit);
    const items = buildGallery(attempt, { min: options.min_images, max: options.min_images });

    return removeFalsyFromObject({
      total: (items.images?.length || 0) + (items.albums?.length || 0),
      limit: options.limit,
      ...items
    });

  },
  
  /**
   * @summary
   * ### [Get Gallery]{@link https://apidocs.imgur.com/#eff60e84-5781-4c12-926a-208dc4c7cc94}
   * 
   * @example
   * await api.imgur.galleries.retrieve({
   *   section: 'hot',
   *   mature: true,
   *   sort: 'top',
   *   window: 'all
   * });
   * 
   * @function retrieve
   * @memberof module:galleries#
   * @param {Object} [options]
   * @param {number} [options.limit]
   * @param {string} [options.album_previews] - Include image metadata for gallery posts which are albums
   * @param {boolean} [options.mature] - Show or hide mature (nsfw) images in the response section (default `false`)
   * @param {boolean} [options.show_viral] - Show or hide viral images from the user section (default `true`)
   * @param {string} [options.section] - `hot`, `top`, `user` (default `hot`)
   * @param {string} [options.sort] - `time`, `viral`, `top` (default `time`)
   * @param {string} [options.window] - Change the date range of the request if the sort is `top` (`day`, `week`, `month`, `year`, `all`)
   * @param {number} [options.page] - The data paging number
   * @returns {Promise<ImgurImage[]>}
   */
  retrieve: async (options) => {
    let attempt = await handler({
      method: 'GET',
      endpoint: buildQueryString(`gallery/${options?.section ?? 'hot'}/${options?.sort ?? 'viral'}/${options?.window ?? 'day'}${options?.page ? `/${options.page}` : ''}`, {
        showViral: options?.show_viral,
        mature: options?.mature,
        album_previews: options?.album_previews
      }),
      handler: 'imgur'
    });

    if (options?.limit)
      attempt = attempt.slice(0, options?.limit);

    return buildGallery(attempt);
  }
  
};

/**
 * 
 * @param {any[]} items
 * @param {{min?: number|undefined, max?: number|undefined}} [limits]
 * @param {{images: ImgurImage[], albums: ImgurImage[]}} [result]
 * @param {ImgurImage} [image]
 * @returns 
 */
const buildGallery = (items, { min, max } = {}, result = { images: [], albums: [] }, image) => {
  if (!items || !items.length) return;
  
  for (const item of items) {
    const { ad_config, datetime, title, images, ...rest } = item;
    if (min && item.images_count > 0 && (item.images_count < min)) continue;
    if (max && item.images_count > 0 && (item.images_count < max)) continue;

    const singleImage = 'images' in item && images.length === 1;
    const category = 'images' in item && !singleImage ? 'albums' : 'images';
    if (singleImage) [image] = images;
    
    image ? image.title = title ?? image.title : '';
    result[category].push(removeFalsyFromObject({
      uploaded: datetime,
      download_link: image?.link ?? undefined,
      ad_config: ad_config ? adConfig(ad_config) : undefined,
      ...removeFalsyFromObject({ ...image }),
      ...removeFalsyFromObject({ ...rest }),
      images: category === 'albums' ? images : undefined
    }));
  }
  
  return removeFalsyFromObject(result);
};

/**
 * @param {any} config 
 * @returns {ImgurAdConfig}
 */
const adConfig = ({ ad_config }) => {
  return {
    safe_flags: ad_config?.safeFlags,
    high_risk_flags: ad_config?.highRiskFlags,
    unsafe_flags: ad_config?.unsafeFlags,
    wall_unsafe_flags: ad_config?.wallUnsafeFlags,
    show_ads: ad_config?.show_ads,
    show_ad_level: ad_config?.show_ad_level,
    nsfw_score: ad_config?.nsfw_score
  };
};