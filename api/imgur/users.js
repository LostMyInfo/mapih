/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check

const { removeFalsyFromObject, buildQueryString } = require('../resources/functions');
const { getTokens } = require('../resources/handlers');
const { handler } = require('../resources/handlers');

/**
 * @file All Imgur API endpoints relating to accounts
 * @module accounts
 */

module.exports = {

  /**
   * @summary
   * ### [Get Account]{@link https://apidocs.imgur.com/#c94c8719-fe68-4854-b96d-70735dd8b2bc}
   * 
   * @example
   * await api.imgur.users.retrieve();
   * 
   * @example
   * await api.imgur.users.retrieve('lostmyinfo');
   * 
   * @function retrieve
   * @memberof module:users#
   * @param {string} [username]
   * @returns {Promise<ImgurAccount>}
   */
  retrieve: async (username) => 
    account(await handler({
      method: 'GET',
      endpoint: 'account/' + username ?? (await me()),
      handler: 'imgur',
      oauth: true
    })),
  
  /**
   * @summary
   * ### [Get Account Images]{@link https://apidocs.imgur.com/#ee366f7c-69e6-46fd-bf26-e93303f64c84}
   * 
   * @example
   * await api.imgur.users.images();
   * 
   * @example
   * await api.imgur.users.images('lostmyinfo');
   * 
   * @function images
   * @memberof module:users#
   * @param {string} [username]
   * @returns {Promise<Array<ImgurImage | ImgurGalleryImage>>}
   */
  images: async (username) =>
    buildImages(await handler({
      method: 'GET',
      endpoint: `account/${username ?? 'me'}/images`,
      handler: 'imgur',
      oauth: true
    })),
  
  /**
   * @summary
   * ### [Get Account Settings]{@link https://apidocs.imgur.com/#286367c1-bb24-4e74-bad9-d2c75b943b3c}
   * 
   * @example
   * await api.imgur.users.settings();
   * 
   * @function settings
   * @memberof module:users#
   * @returns {Promise<Array<ImgurImage | ImgurGalleryImage>>}
   */
  settings: async () =>
    await handler({
      method: 'GET',
      endpoint: 'me/settings',
      handler: 'imgur',
      oauth: true
    }),
  
  /**
   * @summary
   * ### [Get Account Gallery Favorites]{@link https://apidocs.imgur.com/#ee366f7c-69e6-46fd-bf26-e93303f64c84}
   * 
   * @example
   * await api.imgur.users.favorites();
   * 
   * @example
   * await api.imgur.users.favorites({
   *   username: 'lostmyinfo',
   *   page: 5,
   *   sort: 'oldest'
   * });
   * 
   * @function userFavorites
   * @memberof module:users#
   * @param {Object} [options]
   * @param {string} [options.username]
   * @param {number} [options.page]
   * @param {string} [options.sort]
   * @returns {Promise<Array<ImgurImage | ImgurGalleryImage>>}
   */
  userFavorites: async (options) =>
    buildImages(await handler({
      method: 'GET',
      endpoint: buildQueryString(`account/${options?.username ?? (await me())}/gallery_favorites`, {
        page: options?.page,
        favoriteSort: options?.sort ?? 'newest'
      }),
      handler: 'imgur'
    })),
  
  /**
   * @summary
   * ### [Get Account Gallery Favorites]{@link https://apidocs.imgur.com/#ee366f7c-69e6-46fd-bf26-e93303f64c84}
   * 
   * @example
   * await api.imgur.users.favorites();
   * 
   * @example
   * await api.imgur.users.favorites({
   *   username: 'lostmyinfo',
   *   page: 5,
   *   sort: 'oldest'
   * });
   * 
   * @function favorites
   * @memberof module:users#
   * @param {Object} [options]
   * @param {string} [options.username]
   * @param {number} [options.page]
   * @param {string} [options.sort]
   * @returns {Promise<Array<ImgurImage | ImgurGalleryImage>>}
   */
  favorites: async (options) =>
    buildImages(await handler({
      method: 'GET',
      endpoint: buildQueryString(`account/${options?.username ?? (await me())}/favorites`, {
        page: options?.page,
        favoriteSort: options?.sort ?? 'newest'
      }),
      handler: 'imgur',
      oauth: true
    })),
  
  /**
   * @summary
   * ### [Get Gallery Submissions]{@link https://apidocs.imgur.com/#286367c1-bb24-4e74-bad9-d2c75b943b3c}
   * 
   * @example
   * await api.imgur.users.submitted();
   * 
   * @example
   * await api.imgur.users.submitted({
   *   username: 'lostmyinfo',
   *   page: 5,
   *   sort: 'oldest'
   * });
   * 
   * @function submitted
   * @memberof module:users#
   * @param {Object} [options]
   * @param {string} [options.username]
   * @param {number} [options.page]
   * @param {string} [options.sort]
   * @returns {Promise<Array<ImgurImage | ImgurGalleryImage>>}
   */
  submitted: async (options) =>
    buildImages(await handler({
      method: 'GET',
      endpoint: buildQueryString(`account/${options?.username ?? (await me())}/submissions`, {
        page: options?.page,
        favoriteSort: options?.sort ?? 'newest'
      }),
      handler: 'imgur'
    })),
  
  /**
   * @summary
   * ### [Get Account Avatar]{@link https://apidocs.imgur.com/#286367c1-bb24-4e74-bad9-d2c75b943b3c}
   * 
   * @example
   * await api.imgur.users.avatar();
   * 
   * @example
   * await api.imgur.users.avatar('lostmyinfo');
   * 
   * @function avatar
   * @memberof module:users#
   * @param {string} [username]
   * @returns {Promise<Array<ImgurImage | ImgurGalleryImage>>}
   */
  avatar: async (username) =>
    await handler({
      method: 'GET',
      endpoint: `account/${username ?? (await me())}/avatar`,
      handler: 'imgur',
      oauth: true
    }),
  
  /**
   * @summary
   * ### [Get Account Available Avatars]{@link https://apidocs.imgur.com/#ee366f7c-69e6-46fd-bf26-e93303f64c84}
   * 
   * @example
   * await api.imgur.users.availableAvatars();
   * 
   * @example
   * await api.imgur.users.availableAvatars('lostmyinfo');
   * 
   * @function availableAvatars
   * @memberof module:users#
   * @param {string} [username]
   * @returns {Promise<{avatars: Array<{name: string, location: string}>, count: number, default: number}>}
   */
  availableAvatars: async (username) => {
    const avatars = await handler({
      method: 'GET',
      endpoint: `account/${username ?? (await me())}/available_avatars`,
      handler: 'imgur',
      oauth: true
    });

    return {
      avatars: avatars.available_avatars,
      count: avatars.available_avatars_count,
      default: avatars.avatars_are_default
    };
  }
};

const me = async () => (await getTokens('imgurAuth'))?.account_username;

/**
 * @param {any} param0 
 * @returns {ImgurAccount}
 */
const account = ({ user_follow, ...account }) => removeFalsyFromObject({
  ...account,
  user_follow: user_follow.status
});

/**
 * @param {any[]} images 
 * @returns {Array<ImgurImage | ImgurGalleryImage>}
 */
const buildImages = (images) => 
  images.map(({ datetime, ...image }) => removeFalsyFromObject({
    ...image,
    uploaded: datetime
  }));
  
