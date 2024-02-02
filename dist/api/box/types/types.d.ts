type BoxCollection = {
    total_count: number;
    limit: number;
    offset: number;
    order: {
        by: 'string';
        direction: string;
    }[];
    entries: BoxEntry[];
};
type BoxEntry = {
    id: number;
    etag: number;
    type: string;
    sequence_id: number;
    name: string;
};
//# sourceMappingURL=types.d.ts.map