export function create(params: {
    name: string;
    is_private?: boolean | undefined;
    team_id?: string | undefined;
}): Promise<SlackChannel>;
export function open(params: {
    channel?: string | undefined;
    prevent_creation?: boolean | undefined;
    return_im?: boolean | undefined;
    users?: string | undefined;
}): Promise<{
    channel: string;
    no_op?: boolean | undefined;
    already_open?: boolean | undefined;
}>;
export function close(params: {
    channel: string;
}): Promise<{
    ok: boolean;
    no_op?: boolean | undefined;
    already_closed?: boolean | undefined;
}>;
export function archive(params: {
    channel: string;
}): Promise<{
    ok: boolean;
}>;
export function unarchive(params: {
    channel: string;
}): Promise<{
    ok: boolean;
}>;
export function rename(params: {
    channel: string;
    name: string;
}): Promise<{
    ok: boolean;
    channel: SlackChannel;
}>;
export function setTopic(params: {
    channel: string;
    topic: string;
}): Promise<{
    ok: boolean;
    channel: SlackChannel;
}>;
export function setPurpose(params: {
    channel: string;
    purpose: string;
}): Promise<{
    ok: boolean;
    purpose?: string | undefined;
}>;
export function join(params: {
    channel: string;
}): Promise<{
    channel: SlackChannel;
    warning?: string | undefined;
    response_metadata?: {
        warnings?: string[] | undefined;
    } | undefined;
}>;
export function leave(params: {
    channel: string;
}): Promise<{
    ok: boolean;
    not_in_channel?: boolean | undefined;
}>;
export function kick(params: {
    channel: string;
    user: string;
}): Promise<{
    ok: boolean;
    error?: string | undefined;
}>;
export function invite(params: {
    channel: string;
    users: string[];
    force?: boolean | undefined;
}): Promise<SlackChannel>;
export function approveSharedInvite(params: {
    invite_id: string;
    target_team?: string | undefined;
}): Promise<{
    ok: boolean;
}>;
export function acceptSharedInvite(params: {
    channel_name: string;
    channel_id?: string | undefined;
    invite_id?: string | undefined;
    free_trial_accepted?: boolean | undefined;
    is_private?: boolean | undefined;
    team_id?: string | undefined;
}): Promise<{
    ok: boolean;
    implicit_approval?: boolean | undefined;
    channel_id?: string | undefined;
    invite_id?: string | undefined;
}>;
export function declineSharedInvite(params: {
    invite_id: string;
    target_team?: string | undefined;
}): Promise<{
    ok: boolean;
}>;
export function listConnectInvites(params: {
    count?: number | undefined;
    cursor?: string | undefined;
    team_id?: string | undefined;
}): Promise<SlackConversationsListConnectInviteResponse>;
export function info(params: {
    channel: string;
    include_locale?: boolean | undefined;
    include_num_members?: boolean | undefined;
}): Promise<SlackChannel>;
export function replies(params: {
    channel: string;
    ts?: boolean | undefined;
    cursor?: string | undefined;
    include_all_metadata?: boolean | undefined;
    inclusive?: boolean | undefined;
    latest?: string | undefined;
    limit?: number | undefined;
    oldest?: string | undefined;
}): Promise<{
    ok: boolean;
    messages: SlackMessage[];
    has_more: boolean;
    response_metadata: {
        next_cursor: string;
    };
}>;
export function history(params: {
    channel: string;
    cursor?: string | undefined;
    include_all_metadata?: boolean | undefined;
    inclusive?: boolean | undefined;
    latest?: string | undefined;
    limit?: number | undefined;
    oldest?: string | undefined;
}): Promise<{
    messages: SlackMessage[];
    has_more: boolean;
    pin_count: number;
    channel_actions_ts: number | null;
    channel_actions_count: number;
}>;
export function list(params: {
    cursor?: string | undefined;
    exclude_archived?: boolean | undefined;
    team_id?: string | undefined;
    types?: string | undefined;
    limit?: number | undefined;
}): Promise<SlackChannel[]>;
export function members(params: {
    channel: string;
    cursor?: string | undefined;
    limit?: number | undefined;
}): Promise<{
    ok: boolean;
    members: string[];
    response_metadata?: {
        next_cursor: string;
    } | undefined;
}>;
//# sourceMappingURL=conversations.d.ts.map