/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check

const { removeFalsyFromObject } = require('../resources/functions');
const { handler } = require('../resources/handlers');

/**
 * @file All Imgur API endpoints relating to images
 * @module images
 */

module.exports = {

  /**
   * @summary
   * ### [Get Image]{@link https://apidocs.imgur.com/#2078c7e0-c2b8-4bc8-a646-6e544b087d0f}
   * 
   * @example
   * await api.imgur.images.retrieve('WXRY7nM);
   * 
   * @function retrieve
   * @memberof module:images#
   * @param {string} image_id
   * @returns {Promise<ImgurImage>}
   */
  retrieve: async (image_id) =>
    buildImages([await handler({
      method: 'GET',
      endpoint: `image/${image_id}`,
      handler: 'imgur'
    })]),

  /**
   * @summary
   * ### [Image Upload]{@link https://apidocs.imgur.com/#c85c9dfc-7487-4de2-9ecd-66f727cf3139}
   * 
   * @example
   * await api.imgur.images.upload({
   *   image: 'https://exampleImageURL.png',
   *   title: 'my cool image',
   *   auth: true
   * });
   * 
   * @function upload
   * @memberof module:images#
   * @param {Object} options
   * @param {BinaryData|string} options.image
   * @param {BinaryData} [options.video]
   * @param {string} [options.album]
   * @param {string} [options.type]
   * @param {string} [options.name]
   * @param {string} [options.title]
   * @param {string} [options.description]
   * @param {number} [options.disable_audio]
   * @param {boolean} [options.auth]
   * @returns {Promise<ImgurImage>}
   */
  upload: async (options) =>
    buildImages([await handler({
      method: 'POST',
      endpoint: 'image',
      body: {
        image: options.image,
        video: options.video,
        album: options.album,
        type: options.type,
        name: options.name,
        title: options.title,
        description: options.description,
        disable_audio: options.disable_audio
      },
      handler: 'imgur',
      oauth: options.auth
    })]),
  
  /**
   * @summary
   * ### [Update Image]{@link https://apidocs.imgur.com/#7db0c13c-bf70-4e87-aecf-047abc65686d}
   * 
   * @example
   * // If using authentication
   * await api.imgur.images.update({
   *   image_id: 'WXRY7nM',
   *   title: 'new title',
   *   auth: true
   * });
   * 
   * @example
   * // If not using authentication
   * await api.imgur.images.update({
   *   image_delete_hash: 'AYjBG0dhw5m6YjR',
   *   title: 'new title'
   * });
   * 
   * @function update
   * @memberof module:images#
   * @param {Object} options
   * @param {string} [options.image_id]
   * @param {string} [options.image_delete_hash]
   * @param {string} [options.title]
   * @param {string} [options.description]
   * @param {boolean} [options.auth]
   * @returns {Promise<ImgurImage>}
   */
  update: async (options) =>
    buildImages([await handler({
      method: 'POST',
      endpoint: `image/${options.image_id ?? options.image_delete_hash}`,
      body: {
        title: options.title,
        description: options.description
      },
      handler: 'imgur',
      oauth: options.auth
    })]),
  
  /**
   * @summary
   * ### [Delete Image]{@link https://apidocs.imgur.com/#ca48883b-6964-4ab8-b87f-c274e32a970d}
   * 
   * @example
   * // If using authentication
   * await api.imgur.images.delete({
   *   image_id: 'WXRY7nM',
   *   auth: true
   * });
   * 
   * @example
   * // If not using authentication
   * await api.imgur.images.delete({
   *   image_delete_hash: 'AYjBG0dhw5m6YjR'
   * });
   * 
   * @function delete
   * @memberof module:images#
   * @param {Object} options
   * @param {string} [options.image_id]
   * @param {string} [options.image_delete_hash]
   * @param {boolean} [options.auth]
   * @returns {Promise<ImgurImage>}
   */
  delete: async (options) =>
    buildImages([await handler({
      method: 'DELETE',
      endpoint: `image/${options.image_id ?? options.image_delete_hash}`,
      handler: 'imgur',
      oauth: options.auth
    })]),
  
  /**
   * @summary
   * ### [Favorite Image]{@link https://apidocs.imgur.com/#5dd1c471-a806-43cb-9067-f5e4fc8f28bd}
   * 
   * @example
   * await api.imgur.images.favorite('WXRY7nM);
   * 
   * @function favorite
   * @memberof module:images#
   * @param {string} image_id
   * @returns {Promise<string>}
   */
  favorite: async (image_id) =>
    handler({
      method: 'POST',
      endpoint: `image/${image_id}/favorite`,
      handler: 'imgur',
      oauth: true
    })
};

/**
 * @param {any[]} images 
 * @returns {ImgurImage}
 */
const buildImages = (images) => 
  images.map(({ datetime, ...image }) => removeFalsyFromObject({
    ...image,
    uploaded: datetime
  }))[0];
  
