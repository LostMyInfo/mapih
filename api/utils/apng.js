/* eslint-disable brace-style */
/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs');
const sharp = require('sharp');
// @ts-ignore
const { GIFEncoder, quantize, applyPalette } = require('gifenc');
const UPNG = require('upng-js');


/**
 * Cut frames from animated sharp
 */
async function getFrames(image) {

  const { pages, width, pageHeight } = await image.metadata();
  const frames = [];
  // console.log('getFrames() - pages:     ', pages);
  // console.log('getFrames() - width:     ', pages);
  // console.log('getFrames() - pageHeight:', pages);
  
  if (pages > 1) {
    image = sharp(await image.png().toBuffer());
    for (let i = 0; i < pages; i++) {
      const frame = image.clone().extract({
        left: 0,
        top: pageHeight * i,
        width: width,
        height: pageHeight
      });
      frames.push(sharp(await frame.toBuffer()));
    }
    // console.log('frames\n', frames);
  } else {
    frames.push(image);
  }
  return frames;
}


/**
 * Decode APNG image
 */
function decodeApng(input) {

  const buffer = typeof input === 'string' ? fs.readFileSync(input) : input;
  const decoder = UPNG.decode(buffer);
  const { width, height, depth, ctype } = decoder;
  const delay = decoder.frames.map((frame) => frame.delay);
  const frames = UPNG.toRGBA8(decoder).map((frame) => Buffer.from(frame));
  return { width, height, depth, ctype, delay, pages: frames.length, frames };
}


/**
 * Encode animated GIF
 * sharp does not support APNG encoding,
 * nor creates animated instance from frames,
 * so we have to convert to GIF encoded buffer.
 */
function encodeGif(frames, options) {

  const {
    width,
    height,
    transparent = false,
    maxColors = 256,
    format = 'rgb565',
    gifEncoderOptions = {},
    gifEncoderQuantizeOptions = {},
    gifEncoderFrameOptions = {}
  } = options;

  let { delay = [], repeat = 0 } = options;

  if (typeof delay === 'number') {
    delay = new Array(frames.length).fill(delay);
  }
  if (repeat === 1) {
    repeat = -1;
  }

  const encoder = GIFEncoder(gifEncoderOptions);

  // Write out frames
  frames.forEach((frame, i) => {
    const data = new Uint8ClampedArray(frame);
    const palette = quantize(data, maxColors, {
      format,
      ...gifEncoderQuantizeOptions
    });

    const index = applyPalette(data, palette, format);
    encoder.writeFrame(index, width, height, {
      transparent,
      delay: delay[i],
      repeat,
      ...gifEncoderFrameOptions,
      palette
    });
  });

  // Write out footer bytes.
  encoder.finish();
  return encoder.bytes();
}

/**
 * Create instances of sharp from APNG frames.
 */
function framesFromApng(input, resolveWithObject = false) {

  const apng = decodeApng(input);
  const frames = apng.frames.map((frame) => {
    return sharp(frame, {
      raw: {
        width: apng.width,
        height: apng.height,
        channels: 4
      }
    });
  });
  return resolveWithObject ? { ...apng, frames } : frames;
}

/**
 * Create an instance of animated sharp from an APNG image
 */
async function sharpFromApng(input, options = {}, resolveWithObject = false) {

  const apng = decodeApng(input);
  console.log('apng', apng);
  const gifBuffer = encodeGif(apng.frames, {
    width: apng.width,
    height: apng.height,
    ...options
  });
  console.log('gifBuffer', gifBuffer);

  const image = sharp(gifBuffer, {
    animated: true,
    ...options.sharpOptions
  }).gif({
    loop: options.repeat || 0,
    delay: options.delay || apng.delay
  });
  return resolveWithObject ? { ...apng, image } : image;
}

/**
 * Write an APNG file from an array of instances of sharp
 */
async function framesToApng(images, fileOut, options = {}) {

  const {
    cnum = 0,
    resizeTo = 'largest',
    resizeType = 'zoom',
    resizeOptions = {},
    extendBackground = { r: 0, g: 0, b: 0, alpha: 0 },
    rawOptions
  } = options;

  let {
    width,
    height,
    delay: oDelay = []
  } = options;

  if (typeof oDelay === 'number') {
    oDelay = new Array(images.length).fill(oDelay);
  }

  const bufs = [];
  const dels = [];
  const cutted = [];

  // Get width and height of output gif
  let meta;
  if (!width || !height) {
    meta = await Promise.all(images.map((frame) => frame.metadata()));
    const math = resizeTo === 'largest' ? Math.max : Math.min;
    width = width || math(...meta.map((m) => m.width));
    height = height || math(...meta.map((m) => m.pageHeight || m.height));
  }


  // Parse frames
  for (let i = 0; i < images.length; i++) {
    const frame = images[i];
    const { pages, delay } = meta?.[i] || (await frame.metadata());
    if (pages > 1) {
      const frames = await getFrames(frame);
      cutted.push(...frames);
      dels.push(...delay);
    } else {
      // console.log('oDelay[i]', oDelay[i]);
      if (oDelay[i] && oDelay[i] > 1000) oDelay[i] = 999;
      cutted.push(frame);
      dels.push(oDelay[i] || 0);
    }
  }
  // console.log('dels', dels);
  // Get frames buffer
  for (let i = 0; i < cutted.length; i++) {
    const frame = cutted[i];
    const { width: frameWidth, height: frameHeight } = await frame.metadata();
    if (frameWidth !== width || frameHeight !== height) {
      // Resize frame
      if (resizeType === 'zoom') {
        frame.resize({
          ...resizeOptions,
          width,
          height
        });
      }

      // Extend or extract frame
      else {
        const halfWidth = Math.abs(width - frameWidth) / 2;
        if (frameWidth < width) {
          frame.extend({
            left: halfWidth,
            right: halfWidth,
            background: extendBackground
          });
        } else if (frameWidth > width) {
          frame.extract({ left: halfWidth, top: 0, width, height });
        }
        const halfHeight = Math.abs(height - frameHeight) / 2;
        if (frameHeight < height) {
          frame.extend({
            top: halfHeight,
            bottom: halfHeight,
            background: extendBackground
          });
        } else if (frameHeight > height) {
          frame.extract({ left: 0, top: halfHeight, width, height });
        }
      }
    }

    const { buffer } = await frame.ensureAlpha().raw(rawOptions).toBuffer();
    bufs.push(buffer);
  }

  const buffer = Buffer.from(UPNG.encode(bufs, width, height, cnum, dels));
  if (fileOut === 'buffer') return [{ buffer }, { width, height, size: buffer.length }];
  else {
    fs.writeFileSync(fileOut, buffer);
    return { width, height, size: buffer.length };
  }
}

/**
 * Write an APNG file from an animated sharp
 */
async function sharpToApng(image, fileOut, options = {}) {
  const frames = await getFrames(image);
  const { delay } = await image.metadata();
  // console.log('delay:', delay);
  return framesToApng(frames, fileOut, { delay, ...options });
}

module.exports = { framesFromApng, sharpFromApng, framesToApng, sharpToApng };
