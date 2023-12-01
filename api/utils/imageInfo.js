/* eslint-disable node/no-unsupported-features/node-builtins */
// @ts-check

/**
 * @typedef {Object} Image
 * @property {string} extension
 * @property {string} mimeType
 * @property {number} height
 * @property {number} width
 * @property {number} [orientation]
 */

/**
 * @callback Calculate
 * @param {Uint8Array} input
 * @param {number} [height]
 * @param {number} [width]
 * @returns {Image}
 */

/**
 * @callback Validate
 * @param {Uint8Array} input
 * @returns {boolean}
 */

/**
 * @typedef {Object} TypeHandler
 * @property {Validate} validate
 * @property {Calculate} calculate
 */

/**
 * @typedef {Object<string, TypeHandler>} TypeHandlers
 * @property {TypeHandler} png
 * @property {TypeHandler} jpg
 * @property {TypeHandler} gif
 * @property {TypeHandler} webp
 */

const toUTF8 = (/** @type {Uint8Array} */ i, s = 0, e = i.length) =>
  new TextDecoder().decode(i.slice(s, e));
  
/**
 * 
 * @param {Uint8Array} i 
 * @param {number} s 
 * @param {number} e 
 * @returns 
 */
const toHexString = (i, s = 0, e = i.length) =>
  i.slice(s, e)
    .reduce((/** @type {string} */ m, /** @type {{ toString: (arg0: number) => any; }} */ i) =>
      m + (`0${i.toString(16)}`).slice(-2), ''
    );

/**
 * @param {Uint8Array} input
 * @param {number} bits
 * @param {number} offset
 * @param {boolean} isBigEndian
 * @returns {number}
 */
function readUInt(input, bits, offset, isBigEndian) {
  try {
    // @ts-ignore
    return input[`readUInt${bits}${isBigEndian ? 'BE' : 'LE'}`](offset);
  } catch (e) {
    throw new Error('Invalid buffer');
  }
}

/**
 * @param {string} mime 
 * @param {number} height 
 * @param {number} width
 * @param {number} [orientation]
 * @param {string} [mimeType]
 * @returns {Image}
 */
function buildImage(mime, height, width, orientation, mimeType = `image/${mime}`) {
  const extension = [...new Map([[/a?png/i, 'png'], [/jpeg/i, 'jpg']])]
    .find(([reg]) => reg.test(mime))?.[1] || mime;
  const result = {
    extension, mimeType, height, width, orientation
  };
   
  if (!orientation) delete result.orientation;
  return result;
}

/**
 * @type {TypeHandlers}
 */
const typeHandlers = {
  png: {
    validate: (input) => {
      if (toUTF8(input, 1, 8) === 'PNG\r\n\x1a\n') {
        let chunk = toUTF8(input, 12, 16);
        if (chunk === 'CgBI')
          chunk = toUTF8(input, 28, 32);
        if (chunk !== 'IHDR')
          throw new TypeError('Invalid PNG');
        return true;
      }
      return false;
    },
    calculate: (input, height = 0, width = 0) => {
      const CgBI = toUTF8(input, 12, 16) === 'CgBI';
      const acTL = toUTF8(input, 37, 41) === 'acTL';
      
      height = readUInt(input, 32, CgBI ? 36 : 20, true);
      width = readUInt(input, 32, CgBI ? 32 : 16, true);
      return buildImage(acTL ? 'apng' : 'png', height, width);
    }
  },
  jpg: {
    validate: (i) => toHexString(i, 0, 2) === 'ffd8',
    calculate: (input, height = 0, width = 0) => {
      input = input.slice(4);
      let orientation;
      while (input.length) {
        const i = readUInt(input, 16, 0, true);
        
        if (toHexString(input, 2, 6) === '45786966') {
          const exifBlock = input.slice(2, i);
          const byteAlign = toHexString(exifBlock, 6, 8);
          if (byteAlign === '4d4d' || byteAlign === '4949') {
            const isBig = byteAlign === '4d4d',
              dirEntries = readUInt(exifBlock, 16, 14, isBig);
            
            for (let entry = 0; entry < dirEntries; entry++) {
              if ((16 + entry * 12) > exifBlock.length) break;
              const block = exifBlock.slice(16 + entry * 12, (16 + entry * 12) + 12);
              
              if (readUInt(block, 16, 0, isBig) === 274 
                && readUInt(block, 16, 2, isBig) !== 3
              ) break;

              if (readUInt(block, 32, 4, isBig) !== 1) break;
              orientation = readUInt(block, 16, 8, isBig);
            }
          }
        }

        if (i > input.length || input[i] !== 0xff)
          throw new TypeError(i > input.length
            ? 'Corrupt JPG, exceeded buffer limits.'
            : 'Invalid JPG, marker table corrupted.'
          );
        
        const next = input[i + 1];
        if (next === 0xc0 || next === 0xc1 || next === 0xc2) {
          height = readUInt(input, 16, i + 5, true);
          width = readUInt(input, 16, i + 7, true);
          return buildImage('jpeg', height, width, orientation);
        }

        input = input.slice(i + 2);
      }
      throw new TypeError('Invalid JPG, no size found');
    } 
  },
  gif: {
    validate: (i) => /^GIF8[79]a/.test(toUTF8(i, 0, 6)),
    calculate: (i) =>
      buildImage('gif', readUInt(i, 16, 8, false), readUInt(i, 16, 6, false))
  },
  webp: {
    validate: (i) => {
      const riffHeader = toUTF8(i, 0, 4) === 'RIFF';
      const webpHeader = toUTF8(i, 8, 12) === 'WEBP';
      const vp8Header = toUTF8(i, 12, 15) === 'VP8';
      return riffHeader && webpHeader && vp8Header;
    },
    calculate: (i, height = 0, width = 0) => {
      const chunk = toUTF8(i, 12, 16);
      i = i.slice(20, 30);
      console.log('chunk:', chunk);
      // extended
      if (chunk === 'VP8X') {
        if (((i[0] & 0xc0) === 0) && ((i[0] & 0x01) === 0)) {
          height = 1 + readUInt(i, 24, 7, false);
          width = 1 + readUInt(i, 24, 4, false);
        } else
          throw new TypeError('Invalid WebP');
      }

      // lossy
      if (chunk === 'VP8 ' && i[0] !== 0x2f) {
        height = readUInt(i, 16, 8, false) & 0x3fff;
        width = readUInt(i, 16, 6, false) & 0x3fff;
      }

      // lossless
      const signature = toHexString(i, 3, 6);
      if (chunk === 'VP8L' && signature !== '9d012a') {
        height = 1 +
          (((i[4] & 0xf) << 10) | (i[3] << 2) | ((i[2] & 0xc0) >> 6));
        width = 1 + (((i[2] & 0x3f) << 8) | i[1]);
      }

      if (height && width)
        return buildImage('webp', height, width);
      throw new TypeError('Invalid WebP');
    }
  }
};

/**
 * @param {Uint8Array} input 
 * @returns {string|undefined}
 */
function detector(input) {

  /**
   * @type {Object<number, string>}
   */
  const firstBytes = {
    0x89: 'png',
    0xff: 'jpg',
    0x47: 'gif',
    0x57: 'webp'
  };

  if (input[0] in firstBytes) {
    const type = firstBytes[input[0]];
    return type && typeHandlers[type]?.validate(input) ? type : undefined;
  }

  /**
   * @param {string} key 
   * @returns {boolean}
   */
  const finder = (key) => typeHandlers[key]?.validate(input);
  return Object.keys(typeHandlers).find(finder);
}

/**
 * @param {Uint8Array} input
 * @returns {Image}
 */
function imageInfo(input) {
  if (!(input instanceof Uint8Array || Buffer.isBuffer(input) || ArrayBuffer.isView(input)))
    throw new TypeError(`Expected the 'input' argument to be of type 'Uint8Array', 'Buffer', or 'ArrayBuffer', recieved: '${typeof input}'`);
  
  input = input instanceof Uint8Array ? input : new Uint8Array(input);

  if (!(input.length > 1))
    throw new RangeError('Insufficient buffer size.');

  const type = detector(input);
  if (type && type in typeHandlers)
    return typeHandlers[type].calculate(input) ?? undefined;
  
  throw new TypeError(
    `Unsupported file type: ${type ?? 'unknown'}`
  );
}

module.exports = {
  imageInfo
};