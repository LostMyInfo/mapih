export namespace callback {
    function get_original(params: Pick<InteractionParams, "token" | "application_id">): Promise<Message | null>;
    function reply(params: Pick<InteractionParams, "id" | "token">, input?: {
        ephemeral?: boolean | undefined;
        flags?: number | undefined;
        content?: string | undefined;
        embeds?: Embed[] | undefined;
        components?: Component | undefined;
        attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
        tts?: boolean | undefined;
        allowed_mentions?: AllowedMentions | undefined;
        return_date?: boolean | undefined;
    }): Promise<boolean | Date>;
    function defer(params: Pick<InteractionParams, "id" | "token">, input?: {
        ephemeral?: boolean | undefined;
    } | undefined): Promise<Date>;
    function component_defer(params: Pick<InteractionParams, "id" | "token">, input?: {
        ephemeral?: boolean | undefined;
    } | undefined): Promise<{
        statusCode: 204;
        body: undefined;
    }>;
    function component_update(params: Pick<InteractionParams, "id" | "token">, input?: {
        ephemeral?: boolean | undefined;
        flags?: number | undefined;
        content?: string | undefined;
        embeds?: Embed[] | undefined;
        components?: Component | undefined;
        attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
        tts?: boolean | undefined;
        allowed_mentions?: AllowedMentions | undefined;
    }): Promise<{
        statusCode: 204;
        body: undefined;
    } | null>;
    function autocomplete_reply(params: Pick<InteractionParams, "id" | "token">, input: {
        choices: Pick<ApplicationCommandOptionChoice, "name" | "value">[];
    }): Promise<{
        statusCode: 204;
        body: undefined;
    }>;
    function modal_reply(params: Pick<InteractionParams, "id" | "token">, input: {
        custom_id: string;
        title: string;
        components: Component;
    }): Promise<{
        statusCode: 204;
        body: undefined;
    }>;
    function update_original(params: Pick<InteractionParams, "token" | "application_id">, input?: {
        content?: string | undefined;
        embeds?: Embed[] | undefined;
        components?: Component | undefined;
        attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
        allowed_mentions?: AllowedMentions | undefined;
        ephemeral?: boolean | undefined;
    }): Promise<Message | null>;
    function delete_original(params: Pick<InteractionParams, "token" | "application_id">): Promise<{
        statusCode: 204;
        body: undefined;
    }>;
    function upgrade(params: Pick<InteractionParams, "id" | "token">, input?: object | undefined): Promise<{
        statusCode: 204;
        body: undefined;
    }>;
}
export namespace followup {
    function retrieve(params: Pick<InteractionParams, "token" | "application_id">, input: {
        message_id: string;
        thread_id?: string | undefined;
    }): Promise<Message>;
    function create(params: Pick<InteractionParams, "token" | "application_id">, input?: {
        ephemeral?: boolean | undefined;
        content?: string | undefined;
        embeds?: Embed[] | undefined;
        components?: Component | undefined;
        attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
        tts?: boolean | undefined;
        allowed_mentions?: AllowedMentions | undefined;
        thread_name?: string | undefined;
    }): Promise<Message | null>;
    function update(params: Pick<InteractionParams, "token" | "application_id">, input: {
        message_id: string;
        ephemeral?: boolean | undefined;
        content?: string | undefined;
        embeds?: Embed[] | undefined;
        components?: Component | undefined;
        attachments?: Omit<Attachment, "height" | "width" | "size" | "proxy_url">[] | undefined;
        allowed_mentions?: AllowedMentions | undefined;
        thread_id?: string | undefined;
    }): Promise<Message | null>;
    function destroy(params: Pick<InteractionParams, "token" | "application_id">, input: {
        message_id: string;
    }): Promise<{
        statusCode: 204;
        body: undefined;
    }>;
}
//# sourceMappingURL=interactions.d.ts.map