export function open(params: {
    view: ModalView;
    trigger_id?: string | undefined;
    interactivity_pointer?: (KnownBlock | SlackBlock)[] | undefined;
}): Promise<{
    ok: boolean;
    view: SlackView;
    response_metadata?: {
        messages: string[];
    } | undefined;
}>;
export function publish(params: {
    view: ModalView;
    user_id?: string | undefined;
    hash?: string | undefined;
}): Promise<{
    ok: boolean;
    view: SlackView;
    response_metadata?: {
        messages: string[];
    } | undefined;
}>;
//# sourceMappingURL=views.d.ts.map