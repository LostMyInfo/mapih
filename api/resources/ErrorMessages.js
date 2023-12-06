/* eslint-disable node/no-unsupported-features/es-builtins */
/**
 * @typedef {Object} SlackErrorCodes
 * @property {'invalid_trigger_id'} 
 */
const SlackErrorCodes = {
  'invalid_trigger_id': 'Invalid trigger ID'
};
/**
 * @type {SlackErrorCodes}
 */
const ErrorCodes = Object.fromEntries([
  'DuplicateExternalId',
  'invalid_trigger_id'
].map((key) => [key, key]));

const Messages = {
  [SlackErrorCodes['invalid_trigger_id']]: {
    description: 'temp',
    method: (prop, must) => `The ${prop} must be ${must}`
  },
  [SlackErrorCodes['invalid_arguments']]: {
    description: 'The method was either called with invalid arguments or some detail about the arguments passed is invalid, which is more likely when using complex arguments like blocks or attachments.',
    method: (temp) => temp
  }
};

module.exports = { SlackErrorCodes, Messages };