export function state(params?: {
    market?: string | undefined;
    additional_types?: string | undefined;
} | undefined): Promise<SpotifyPlayback>;
export function currentSong(params?: {
    market?: string | undefined;
    additional_types?: string | undefined;
} | undefined): Promise<SpotifyTrack>;
export function devices(): Promise<SpotifyDevice[]>;
export function togglePlayback(params?: {
    device_id?: string | undefined;
    context_uri?: string | undefined;
    song_ids?: string[] | undefined;
    position_ms?: number | undefined;
} | undefined): Promise<{
    statusText: number;
    type: string;
    message: string;
}>;
export function pause(device_id?: string | undefined): Promise<{
    statusText: number;
    type: string;
    message: string;
}>;
export function skip(device_id?: string | undefined): Promise<{
    statusText: number;
    type: string;
    message: string;
}>;
export function previous(device_id?: string | undefined): Promise<{
    statusText: number;
    type: string;
    message: string;
}>;
export function seek(position_ms: number, device_id?: string | undefined): Promise<{
    statusText: number;
    type: string;
    message: string;
}>;
export function setVolume(volume_percent: number, device_id?: string | undefined): Promise<{
    statusText: number;
    type: string;
    message: string;
}>;
export function toggleShuffle(state: boolean, device_id?: string | undefined): Promise<{
    statusText: number;
    type: string;
    message: string;
}>;
export function toggleRepeat(state: boolean, device_id?: string | undefined): Promise<{
    statusText: number;
    type: string;
    message: string;
}>;
export function queue(): Promise<{
    currently_playing: SpotifyTrack;
    queue: SpotifyTrack[] | undefined;
} | undefined>;
export function recent(options?: {
    limit?: number | undefined;
    after?: number | undefined;
    before?: number | undefined;
} | undefined): Promise<SpotifyTrack[] | undefined>;
export function addToQueue(options: {
    uri: string;
    device_id?: string | undefined;
}): Promise<{
    statusText: number;
    type: string;
    message: string;
}>;
export function transfer(options: {
    device_id: string;
    play?: boolean | undefined;
}): Promise<{
    statusText: number;
    type: string;
    message: string;
}>;
//# sourceMappingURL=playback.d.ts.map