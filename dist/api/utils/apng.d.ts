/**
 * Create instances of sharp from APNG frames.
 */
export function framesFromApng(input: any, resolveWithObject?: boolean): any;
/**
 * Create an instance of animated sharp from an APNG image
 */
export function sharpFromApng(input: any, options?: {}, resolveWithObject?: boolean): Promise<sharp.Sharp | {
    image: sharp.Sharp;
    width: any;
    height: any;
    depth: any;
    ctype: any;
    delay: any;
    pages: any;
    frames: any;
}>;
/**
 * Write an APNG file from an array of instances of sharp
 */
export function framesToApng(images: any, fileOut: any, options?: {}): Promise<({
    buffer: Buffer;
    width?: undefined;
    height?: undefined;
    size?: undefined;
} | {
    width: any;
    height: any;
    size: number;
    buffer?: undefined;
})[] | {
    width: any;
    height: any;
    size: number;
}>;
/**
 * Write an APNG file from an animated sharp
 */
export function sharpToApng(image: any, fileOut: any, options?: {}): Promise<({
    buffer: Buffer;
    width?: undefined;
    height?: undefined;
    size?: undefined;
} | {
    width: any;
    height: any;
    size: number;
    buffer?: undefined;
})[] | {
    width: any;
    height: any;
    size: number;
}>;
import sharp = require("sharp");
//# sourceMappingURL=apng.d.ts.map