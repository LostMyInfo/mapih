export type DiscordError = {
    message: string;
    ok?: boolean | undefined;
    error?: string | {
        status: number;
        message: string;
    } | undefined;
    response_metadata?: {
        messages: Array<string>;
    } | undefined;
    code?: number | undefined;
    global?: boolean | undefined;
    retry_after?: number | undefined;
    /**
     * ,
     */
    errors?: DiscordErrorErrors;
    needed?: string | undefined;
    warnings?: string[] | undefined;
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
     * @param {string} [content]
     */
    constructor(res: ?DiscordError, response: ?Response, type: string, content?: string);
    type: string;
    status: number | undefined;
    statusText: string | undefined;
    message: string | {
        status: number;
        message: string;
    } | undefined;
    code: number | undefined;
    retry_after: number | undefined;
    global: true | undefined;
    details: any;
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
//# sourceMappingURL=Errors.d.ts.map