export function create(options: {
    model: string;
    messages: ChatCompletionMessage[];
    max_tokens?: number | null | undefined;
    temperature?: number | null | undefined;
    top_p?: number | null | undefined;
    frequency_penalty?: number | null | undefined;
    presence_penalty?: number | null | undefined;
    n?: number | null | undefined;
    response_format?: string | undefined;
    seed?: number | null | undefined;
    stop?: string | string[] | null | undefined;
    logit_bias?: Object | undefined;
    logprobs?: boolean | null | undefined;
    top_logprobs?: number | null | undefined;
    stream?: boolean | null | undefined;
    tools?: ToolCalls[] | undefined;
    tool_choice?: string | {
        type: string;
        function: {
            name: string;
        };
    } | undefined;
    user?: string | undefined;
}, response_format?: {
    type: string;
} | undefined): Promise<ChatCompletion>;
//# sourceMappingURL=chat.d.ts.map