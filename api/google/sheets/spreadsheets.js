/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-builtins */
// @ts-check
const { handler } = require('../../resources/handlers');

/**
 * @module spreadsheets
 */

module.exports = {

  /**
   * @summary
   * ### [Create A Spreadsheet]{@link https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/create}
   * @example
   * await api.google.drive.about()
   * 
   * @function create
   * @memberof module:spreadsheets#
   * @returns {Promise<ChatCompletion>}
   */
  create: async () =>
    handler({
      method: 'POST',
      endpoint: 'spreadsheets',
      body: {
        properties: {
          title: 'test title'
          // other
        },
        sheets: [{
          properties: {
            sheetId: 123,
            title: 'test title 2'
          },
          data: [{
            startRow: 1,
            startColumn: 1,
            rowData: [{
              values: [{
                userEnteredValue: {
                  stringValue: 'hello this is a value'
                }
              }]
            }]
          }]
          
        }]
      },
      handler: 'sheets'
    })

};