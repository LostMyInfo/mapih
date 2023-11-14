export declare namespace stageInstance {
    function retrieve(params: {
        channel_id: string;
    }): Promise<StageInstance>;
    function create(params: {
        channel_id: string;
        topic: string;
        privacy_level?: number | undefined;
        send_start_notification?: boolean | undefined;
    }): Promise<StageInstance>;
    function update(params: {
        channel_id: string;
        topic?: string | undefined;
        privacy_level?: number | undefined;
    }): Promise<StageInstance>;
    function destroy(params: {
        channel_id: string;
    }): Promise<{
        statusCode: string;
        message: string;
    }>;
}
//# sourceMappingURL=stage-instance.d.ts.map