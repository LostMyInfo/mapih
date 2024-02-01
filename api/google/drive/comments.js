/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { buildQueryString } = require('../../resources/functions');
const { handler } = require('../../resources/handlers');

/**
 * @module comments
 */

module.exports = {

  /**
   * @summary
   * ### [Get A Comment By ID]{@link https://developers.google.com/drive/api/reference/rest/v3/comments/get}
   *
   * @example
   * await api.google.drive.comments.retrieve({
   *   file_id: 'asdf',
   *   comment_id: 'fdsa',
   *   include_deleted: true
   * });
   * 
   * @function retrieve
   * @memberof module:comments#
   * @param {Object} options
   * @param {string} options.file_id
   * @param {string} options.comment_id
   * @param {boolean} [options.include_deleted]
   * @returns {Promise<GoogleDriveComment>}
   */
  retrieve: async ({ file_id, comment_id, include_deleted = false }) =>
    handler({
      method: 'GET',
      endpoint: `files/${file_id}/comments/${comment_id}${include_deleted ? '?includeDeleted=true' : ''}`,
      handler: 'drive'
    }),
    
  /**
   * @summary
   * ### [List A File's Comments]{@link https://developers.google.com/drive/api/reference/rest/v3/comments/list}
   *
   * @example
   * await api.google.drive.comments.list({
   *   file_id: 'asdf',
   *   include_deleted: true
   * });
   * 
   * @function list
   * @memberof module:comments#
   * @param {Object} options
   * @param {string} options.file_id - The ID of the file
   * @param {boolean} [options.include_deleted] - Whether to include deleted comments. Deleted comments will not include their original content.
   * @param {number} [options.page_size] - The maximum number of comments to return per page
   * @param {string} [options.page_token] - The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.
   * @param {string} [options.start_modified_time] - The minimum value of 'modifiedTime' for the result comments
   * @returns {Promise<{kind: string, nextPageToken: string, comments: GoogleDriveComment[]}>}
   */
  list: async (options) =>
    handler({
      method: 'GET',
      endpoint: buildQueryString(`files/${options.file_id}/comments`, {
        includeDeleted: options.include_deleted,
        pageSize: options.page_size,
        pageToken: options.page_token,
        startModifiedTime: options.start_modified_time
      }),
      handler: 'drive'
    }),
  
  /**
   * @summary
   * ### [Create A Comment On A File]{@link https://developers.google.com/drive/api/reference/rest/v3/comments/create}
   *
   * @example
   * await api.google.drive.comments.create({
   *   file_id: 'asdf',
   *   content: 'hello this is a comment'
   * });
   * 
   * @function create
   * @memberof module:comments#
   * @param {Object} options
   * @param {string} options.file_id - The ID of the file
   * @param {string} options.content - The plain text content of the comment. This field is used for setting the content, while `htmlContent` should be displayed.
   * @param {boolean} [options.anchor] - A region of the document represented as a JSON string. For details on defining anchor properties, refer to [Manage comments and replies]{@link https://developers.google.com/drive/api/v3/manage-comments}.
   * @param {Object} [options.quoted_file_content] - The file content to which the comment refers, typically within the anchor region. For a text file, for example, this would be the text at the location of the comment.
   * @param {string} [options.quoted_file_content.value] - The quoted content itself
   * @param {string} [options.quoted_file_content.mimeType] - The MIME type of the quoted content
   * @returns {Promise<GoogleDriveComment>}
   */
  create: async (options) =>
    handler({
      method: 'POST',
      endpoint: `files/${options.file_id}/comments`,
      body: {
        content: options.content,
        anchor: options.anchor,
        quoted_file_content: options.quoted_file_content
      },
      handler: 'drive'
    }),
  
  /**
   * @summary
   * ### [Update A Comment On A File]{@link https://developers.google.com/drive/api/reference/rest/v3/comments/update}
   *
   * @example
   * await api.google.drive.comments.update({
   *   file_id: 'asdf',
   *   comment_id: 'asdf',
   *   content: 'hello this is an edited comment'
   * });
   * 
   * @function update
   * @memberof module:comments#
   * @param {Object} options
   * @param {string} options.file_id - The ID of the file
   * @param {string} options.comment_id - The ID of the comment
   * @param {string} options.content - The plain text content of the comment. This field is used for setting the content, while `htmlContent` should be displayed.
   * @param {boolean} [options.anchor] - A region of the document represented as a JSON string. For details on defining anchor properties, refer to [Manage comments and replies]{@link https://developers.google.com/drive/api/v3/manage-comments}.
   * @param {Object} [options.quoted_file_content] - The file content to which the comment refers, typically within the anchor region. For a text file, for example, this would be the text at the location of the comment.
   * @param {string} [options.quoted_file_content.value] - The quoted content itself
   * @param {string} [options.quoted_file_content.mimeType] - The MIME type of the quoted content
   * @returns {Promise<GoogleDriveComment>}
   */
  update: async (options) =>
    handler({
      method: 'PATCH',
      endpoint: `files/${options.file_id}/comments/${options.comment_id}`,
      body: {
        content: options.content,
        anchor: options.anchor,
        quoted_file_content: options.quoted_file_content
      },
      handler: 'drive'
    }),
  
  /**
   * @summary
   * ### [Delete A Comment From A File]{@link https://developers.google.com/drive/api/reference/rest/v3/comments/delete}
   *
   * @example
   * await api.google.drive.comments.delete({
   *   file_id: 'asdf',
   *   comment_id: 'asdf'
   * });
   * 
   * @function delete
   * @memberof module:comments#
   * @param {Object} options
   * @param {string} options.file_id - The ID of the file
   * @param {string} options.comment_id - The ID of the comment
   * @returns {Promise<void>}
   */
  delete: async ({ file_id, comment_id }) =>
    handler({
      method: 'DELETE',
      endpoint: `files/${file_id}/comments/${comment_id}`,
      handler: 'drive'
    })

};