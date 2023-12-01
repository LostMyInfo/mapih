export type DiscordError = {
    code: number;
    message: string;
    global?: boolean | undefined;
    retry_after?: number | undefined;
    errors?: DiscordErrorErrors;
};
export type DiscordErrorErrors = any | {
    _errors: {
        code: string;
        message: string;
    }[];
};
export class ResponseError extends Error {
    /**
     * @param {DiscordError} res
     * @param {Response} response
     * @param {string} type
     */
    constructor(res: DiscordError, response: Response, type: string);
    type: string;
    status: number;
    statusText: string;
    code: number | undefined;
    retry_after: number | undefined;
    global: true | undefined;
    details: {
        [s: string]: string | number | boolean;
    } | undefined;
}
/**
 * @param {DiscordError} err
 */
export function DiscordError(err: DiscordError): {
    [s: string]: string | number | boolean;
} | undefined;
export function SlackError(err: any): {};
//# sourceMappingURL=Errors.d.ts.map