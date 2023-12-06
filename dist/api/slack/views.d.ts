export function open(params: {
    view: string;
    trigger_id?: string | undefined;
    interactivity_pointer?: SlackBlock[] | undefined;
}): Promise<SlackMessageResponse>;
export function publish(params: {
    view: ModalView;
    user_id?: string | undefined;
    hash?: string | undefined;
}): Promise<SlackViewResponse>;
//# sourceMappingURL=views.d.ts.map