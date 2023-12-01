export function retrieve(params: {
    channel_id: string;
}): Promise<StageInstance>;
export function create(params: {
    channel_id: string;
    topic: string;
    privacy_level?: number | undefined;
    send_start_notification?: boolean | undefined;
}): Promise<StageInstance>;
export function update(params: {
    channel_id: string;
    topic?: string | undefined;
    privacy_level?: number | undefined;
}): Promise<StageInstance>;
export function destroy(params: {
    channel_id: string;
}): Promise<{
    statusCode: number;
    message: string;
}>;
//# sourceMappingURL=stage-instance.d.ts.map