export type Image = {
    extension: string;
    mimeType: string;
    height: number;
    width: number;
    orientation?: number | undefined;
};
export type Calculate = (input: Uint8Array, height?: number | undefined, width?: number | undefined) => Image;
export type Validate = (input: Uint8Array) => boolean;
export type TypeHandler = {
    validate: Validate;
    calculate: Calculate;
};
export type TypeHandlers = {
    [x: string]: TypeHandler;
};
/**
 * @param {Uint8Array} input
 * @returns {Image}
 */
export function imageInfo(input: Uint8Array): Image;
//# sourceMappingURL=imageInfo.d.ts.map