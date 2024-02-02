export type DiscordError = {
    message: string;
    ok?: boolean | undefined;
    error?: string | {
        status?: string | number | undefined;
        message: string;
        reason?: string | undefined;
        param?: string | undefined;
        code?: number | null | undefined;
        type?: string | undefined;
        errors?: {
            message?: string | undefined;
            domain?: string | undefined;
            reason?: string | undefined;
            extendedHelp?: string | undefined;
        }[] | undefined;
        details?: {
            '@type': string;
            links?: {
                description: string;
                url: string;
            }[] | undefined;
            reason?: string | undefined;
            domain?: string | undefined;
            metadata?: {
                service?: string | undefined;
                consumer?: string | undefined;
            } | undefined;
        }[] | undefined;
    } | undefined;
    response_metadata?: {
        messages: Array<string>;
    } | undefined;
    code?: number | undefined;
    global?: boolean | undefined;
    retry_after?: number | undefined;
    errors?: DiscordErrorErrors;
    needed?: string | undefined;
    warnings?: string[] | undefined;
    error_description?: string | undefined;
    error_summary?: string | undefined;
    title?: string | undefined;
    detail?: string | undefined;
};
export type DiscordErrorErrors = any | {
    _errors: {
        code: string;
        message: string;
    }[];
};
export class ResponseError extends Error {
    /**
     * @param {?DiscordError} res
     * @param {?Response} response
     * @param {string} type
     * @param {{ error?: string, hint?: string } | undefined} [content]
     */
    constructor(res: DiscordError | null, response: Response | null, type: string, { error, hint }?: {
        error?: string;
        hint?: string;
    } | undefined);
    type: string;
    code: number | undefined;
    statusText: string | undefined;
    message: any;
    retry_after: number | undefined;
    global: true | undefined;
    details: any;
    reason: any;
    hint: string | undefined;
    param: string | undefined;
    status: string | undefined;
    parameter: string | undefined;
}
/**
 * @param {DiscordError} err
 */
export function DiscordError(err: DiscordError): {
    [s: string]: string | number | boolean;
} | undefined;
/**
 *
 * @param {DiscordError} err
 * @returns
 */
export function SlackError(err: DiscordError): any;
/**
 * Format the message for an error.
 * @param {string} code The error code
 * @param {Array<*>} args Arguments to pass for util format or as function args
 * @returns {string} Formatted string
 * @ignore
 */
declare function message(code: string, args: Array<any>): string;
export {};
//# sourceMappingURL=Errors.d.ts.map