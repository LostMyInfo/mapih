/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { handler } = require('../resources/handlers');
/**
 * @file All Dropbox API endpoints relating to files
 * @module files
 */

module.exports = {

  /**
   * @summary
   * ### [Get Metadata For A File or Folder]{@link https://www.dropbox.com/developers/documentation/http/documentation#files-get_metadata}
   * @example
   * await api.dropbox.files.metadata('/Media/Discord Emotes/IMG_5668.PNG');
   * 
   * await api.dropbox.files.metadata('/Media/Discord Emotes/IMG_5668.PNG', {
   *   include_deleted: true,
   *   include_media_info: true
   * });
   * 
   * @function metadata
   * @memberof module:files#
   * @param {string} path - The path of a file or folder on Dropbox
   * @param {Object} [options]
   * @param {boolean} [options.include_deleted] - Whether `DeletedMetadata` is returned for deleted file or folder, otherwise `LookupError.not_found` will be returned (default false)
   * @param {boolean} [options.include_has_explicit_shared_members] - Whether the results will include a flag for each file indicating whether or not that file has any explicit members (default false)
   * @param {boolean} [options.include_media_info] - Whether `FileMetadata.media_info` is set for photo and video (default false)
   * @returns {Promise<DropboxFileMetadata|DropboxFolderMetadata|DropboxDeletedMetadata>}
   */
  metadata: async (path, options) => 
    handler({
      method: 'POST',
      endpoint: '2/files/get_metadata',
      body: {
        path: path,
        include_deleted: options?.include_deleted || false,
        include_media_info: options?.include_media_info || false,
        include_has_explicit_shared_members: options?.include_has_explicit_shared_members || false
      },
      handler: 'dropbox'
    }),
  
  /**
   * @summary
   * ### [Get A Preview For A File]{@link https://www.dropbox.com/developers/documentation/http/documentation#files-get_preview}
   * @example
   * await api.dropbox.files.preview('/Media/Discord Emotes/IMG_5668.PNG');
   * 
   * @function preview
   * @memberof module:files#
   * @param {string} path - The path of a file or folder on Dropbox
   * @returns {Promise<DropboxFileMetadata>}
   */
  preview: async (path) => 
    handler({
      method: 'POST',
      endpoint: '2/files/get_preview',
      body: { path },
      type: 'content',
      handler: 'dropbox'
    }),
  
  /**
   * @summary
   * ### [Get A Thumbnail For An Image]{@link https://www.dropbox.com/developers/documentation/http/documentation#files-get_thumbnail}
   * @example
   * await api.dropbox.files.thumbnail('/Media/Discord Emotes/IMG_5668.PNG');
   * 
   * @function thumbnail
   * @memberof module:files#
   * @param {string} path - The path of a file or folder on Dropbox
   * @param {Object} [options]
   * @param {string} [options.format] - The format for the thumbnail image, jpeg (default) or png
   * @param {DropboxThumbnailMode} [options.mode] - How to resize and crop the image to achieve the desired size (default `strict`)
   * @param {DropboxThumbnailQuality} [options.quality] - Field is only returned for "internal" callers. Quality of the thumbnail image (default `quality_80`).
   * @param {DropboxThumbnailSize} [options.size] - The size for the thumbnail image (default `w64h64`)
   * @returns {Promise<DropboxPreview>}
   */
  thumbnail: async (path, options) => 
    handler({
      method: 'POST',
      endpoint: '2/files/get_thumbnail_v2',
      body: {
        resource: { '.tag': 'path', path },
        format: options?.format ?? 'jpeg',
        mode: options?.mode ?? 'strict',
        size: options?.size ?? 'w64h64',
        quality: options?.quality ?? 'quality_80'
      },
      type: 'content',
      response_type: 'arrayBuffer',
      handler: 'dropbox'
    }),
  
  /**
   * @summary
   * ### [Get A Temporary Link To A Stream Content Of A File]{@link https://www.dropbox.com/developers/documentation/http/documentation#files-get_temporary_link}
   * This link will expire in four hours and afterwards you will get 410 Gone. 
   * @example
   * await api.dropbox.files.temporaryLink('/Media/Discord Emotes/IMG_5668.PNG');
   * 
   * @function temporaryLink
   * @memberof module:files#
   * @param {string} path - The path of a file or folder on Dropbox
   * @returns {Promise<{metadata: DropboxFileMetadata, link: string}>}
   */
  temporaryLink: async (path) => 
    handler({
      method: 'POST',
      endpoint: '2/files/get_temporary_link',
      body: { path },
      handler: 'dropbox'
    }),
  
  /**
   * @summary
   * ### [Download A File]{@link https://www.dropbox.com/developers/documentation/http/documentation#files-download}
   * @example
   * await api.dropbox.files.download('/Media/Discord Emotes/IMG_5668.PNG');
   * 
   * @function download
   * @memberof module:files#
   * @param {string} path - The path of a file or folder on Dropbox
   * @returns {Promise<DropboxFileMetadata>}
   */
  download: async (path) => 
    handler({
      method: 'POST',
      endpoint: '2/files/download',
      body: { path },
      type: 'content',
      handler: 'dropbox',
      response_type: 'arrayBuffer'
    })
};