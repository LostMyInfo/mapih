import type { Message } from '../discord/types/types';
export function authorize(params?: {
    channel_id?: string | undefined;
} | undefined): Promise<string | Message>;
export function refresh(): Promise<string | undefined>;
export function refresh1(): Promise<any>;
//# sourceMappingURL=oauth2.d.ts.map
