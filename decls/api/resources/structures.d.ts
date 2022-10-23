export function newREQUEST(path: any, body?: {}, audit?: boolean, reason?: any): {
    url: string;
    headers: {
        'Content-Type': string;
        Authorization: string;
        'X-Audit-Log-Reason': any;
    };
    path: string;
    body: string;
};
export function newStructure(type: any): any;
//# sourceMappingURL=structures.d.ts.map