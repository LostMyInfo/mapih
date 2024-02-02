export declare function retrieve(image_id: string): Promise<ImgurImage>;
export declare function upload(options: {
    image: string | BinaryData;
    video?: BinaryData | undefined;
    album?: string | undefined;
    type?: string | undefined;
    name?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    disable_audio?: number | undefined;
    auth?: boolean | undefined;
}): Promise<ImgurImage>;
export declare function update(options: {
    image_id?: string | undefined;
    image_delete_hash?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    auth?: boolean | undefined;
}): Promise<ImgurImage>;
export declare function _delete(options: {
    image_id?: string | undefined;
    image_delete_hash?: string | undefined;
    auth?: boolean | undefined;
}): Promise<ImgurImage>;
export { _delete as delete };
export declare function favorite(image_id: string): Promise<string>;
//# sourceMappingURL=images.d.ts.map