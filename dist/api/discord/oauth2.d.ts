export namespace oauth2 {
    export namespace token {
        function get(params: {
            client_id: string;
            client_secret: string;
            oauth2_redirect: string;
            code: string;
        }): Promise<AccessTokenResponse | null>;
        function refresh(params: {
            client_id: string;
            client_secret: string;
            refresh_token: string;
        }): Promise<AccessTokenResponse | null>;
        function revoke(params: {
            client_id: string;
            client_secret: string;
            token: AccessTokenResponse;
        }): Promise<AccessTokenResponse | null>;
    }
    export namespace credentials {
        function user(params: {
            token: AccessTokenResponse;
        }): Promise<User | null>;
        function client(params: {
            client_id: string;
            client_secret: string;
            scope: string;
        }): Promise<Omit<AccessTokenResponse, "refresh_token"> | null>;
    }
}
//# sourceMappingURL=oauth2.d.ts.map