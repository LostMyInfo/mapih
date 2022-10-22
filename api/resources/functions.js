const https = require(`../utils/https`);
const structures = require('./structures');

module.exports = {
    async doRequest(cfg) {
        try {
            /* smash objects together */
            let body = null;
            if (!Array.isArray(cfg.body)) body = { ...cfg.body, ...cfg.properties, ...cfg.params };
            else body = cfg.body;
            /* Generate Query String */
            //console.log('doRequest body: ', body)
            let queryString = ((q) => {
                let p = [];
                for (_q in q) {
                    if (!!q[_q]) p.push(`${_q}=${q[_q]}`);
                }
                return p.join("&");
            })(cfg.query);

            /* begin request */
            cfg.req = structures.newREQUEST(`${cfg.path}?${queryString}`, body);
            //console.log('doRequest request', cfg.req);

            /* send request */
            cfg.attempt = await https[cfg.method.toLowerCase()](cfg.req);
            //console.log("doReqeust attempt",cfg.attempt);
            return cfg.attempt ?? false;
        } catch (e) {
            console.log("doRequest error:", e);
        }
    }
};