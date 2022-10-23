module.exports = {
  /**
   * the `get` method. Https only, uses port: 443.
   * 
   * @param {*} params 
   * @returns any
   */
  async get(params) {
    return new Promise(async function (resolve, reject) {
      const https = require('node:https');
      const options = {
        host: params.url,
        port: 443,
        path: params.path,
        method: 'GET',
        headers: params.headers,
      };
      options.agent = new https.Agent(options);

      let req = https.request(options, async (res) => {
        let data = '';
        res.on('data', async (readable) => {
          data += readable;
        });
        res.on('end', async () => {
          result = {};
          result.statusCode = res.statusCode;
          result.headers = res.headers;
          result.body = data;
          resolve(result);
        });
      });
      req.on('error', (e) => {
        console.error(e);
      });
      req.end();
    });
  },
  //method GET80
  async get80(params) {
    return new Promise(async function (resolve, reject) {
      const http = require('node:http');
      const options = {
        host: params.url,
        port: 80,
        path: params.path,
        method: 'GET',
        headers: params.headers,
      };
      options.agent = new http.Agent(options);

      let req = http.request(options, async (res) => {
        let data = '';
        res.on('data', async (readable) => {
          data += readable;
        });
        res.on('end', async () => {
          result = {};
          result.statusCode = res.statusCode;
          result.headers = res.headers;
          result.body = data;
          resolve(result);
        });
      });
      req.on('error', (e) => {
        console.error(e);
      });
      req.end();
    });
  },
  //method POST
  async post(params) {
    return new Promise(async function (resolve, reject) {
      const https = require('node:https');
      const options = {
        host: params.url,
        port: 443,
        path: params.path,
        method: 'POST',
        headers: {
          'Content-Type':
            params.headers['Content-Type'] ??
            params.headers['content-type'] ??
            '',
          'Content-Length':
            params.headers['Content-Length'] ??
            params.headers['content-length'] ??
            Buffer.byteLength(params.body),
          'Content-Encoding':
            params.headers['Content-Encoding'] ??
            params.headers['content-encoding'] ??
            '',
          'Content-Language':
            params.headers['Content-Language'] ??
            params.headers['content-language'] ??
            '',
          'Content-Location':
            params.headers['Content-Location'] ??
            params.headers['content-location'] ??
            '',
          Authorization: params.headers['Authorization'] ?? '',
        },
      };
      options.agent = new https.Agent(options);

      let req = https.request(options, async (res) => {
        let data = '';
        res.on('data', async (readable) => {
          data += readable;
        });
        res.on('end', async () => {
          result = {};
          result.statusCode = res.statusCode;
          result.headers = res.headers;
          result.body = data;
          resolve(result);
        });
      });
      req.on('error', (e) => {
        console.error(e);
      });
      req.write(params.body);
      req.end();
    });
  },
  //method PUT
  async put(params) {
    return new Promise(async function (resolve, reject) {
      const https = require('node:https');
      const options = {
        host: params.url,
        port: 443,
        path: params.path,
        method: 'PUT',
        headers: {
          'Content-Type':
            params.headers['Content-Type'] ??
            params.headers['content-type'] ??
            '',
          'Content-Length':
            params.headers['Content-Length'] ??
            params.headers['content-length'] ??
            Buffer.byteLength(params.body),
          'Content-Encoding':
            params.headers['Content-Encoding'] ??
            params.headers['content-encoding'] ??
            '',
          'Content-Language':
            params.headers['Content-Language'] ??
            params.headers['content-language'] ??
            '',
          'Content-Location':
            params.headers['Content-Location'] ??
            params.headers['content-location'] ??
            '',
          'Authorization':
            params.headers['Authorization'] ??
            params.headers['authorization'] ??
            '',
          'X-Audit-Log-Reason':
            params.headers['X-Audit-Log-Reason'] ??
            params.headers['x-audit-log-reason'] ??
            '',
        },
      };
      options.agent = new https.Agent(options);

      let req = https.request(options, async (res) => {
        let data = '';
        res.on('data', async (readable) => {
          data += readable;
        });
        res.on('end', async () => {
          result = {};
          result.statusCode = res.statusCode;
          result.headers = res.headers;
          result.body = data;
          resolve(result);
        });
      });
      req.on('error', (e) => {
        console.error(e);
      });
      req.write(params.body);
      req.end();
    });
  },
  //method PATCH
  async patch(params) {
    return new Promise(async function (resolve, reject) {
      const https = require('node:https');
      const options = {
        host: params.url,
        port: 443,
        path: params.path,
        method: 'PATCH',
        headers: {
          'Content-Type':
            params.headers['Content-Type'] ??
            params.headers['content-type'] ??
            '',
          'Content-Length':
            params.headers['Content-Length'] ??
            params.headers['content-length'] ??
            Buffer.byteLength(params.body),
          'Content-Encoding':
            params.headers['Content-Encoding'] ??
            params.headers['content-encoding'] ??
            '',
          'Content-Language':
            params.headers['Content-Language'] ??
            params.headers['content-language'] ??
            '',
          'Content-Location':
            params.headers['Content-Location'] ??
            params.headers['content-location'] ??
            '',
          'Authorization':
            params.headers['Authorization'] ??
            params.headers['authorization'] ??
            '',
          'X-Audit-Log-Reason':
            params.headers['X-Audit-Log-Reason'] ??
            params.headers['x-audit-log-reason'] ??
            '',
        },
      };
      options.agent = new https.Agent(options);

      let req = https.request(options, async (res) => {
        let data = '';
        res.on('data', async (readable) => {
          data += readable;
        });
        res.on('end', async () => {
          result = {};
          result.statusCode = res.statusCode;
          result.headers = res.headers;
          result.body = data;
          resolve(result);
        });
      });
      req.on('error', (e) => {
        console.error(e);
      });
      req.write(params.body);
      req.end();
    });
  },
  //method DELETE
  async del(params) {
    return new Promise(async function (resolve, reject) {
      const https = require('node:https');
      const options = {
        host: params.url,
        port: 443,
        path: params.path,
        method: 'DELETE',
        headers: {
          'Content-Type':
            params.headers['Content-Type'] ??
            params.headers['content-type'] ??
            '',
          'Content-Length':
            params.headers['Content-Length'] ??
            params.headers['content-length'] ??
            Buffer.byteLength(params.body),
          'Content-Encoding':
            params.headers['Content-Encoding'] ??
            params.headers['content-encoding'] ??
            '',
          'Content-Language':
            params.headers['Content-Language'] ??
            params.headers['content-language'] ??
            '',
          'Content-Location':
            params.headers['Content-Location'] ??
            params.headers['content-location'] ??
            '',
          'Authorization':
            params.headers['Authorization'] ??
            params.headers['authorization'] ??
            '',
          'X-Audit-Log-Reason':
            params.headers['X-Audit-Log-Reason'] ??
            params.headers['x-audit-log-reason'] ??
            '',
        },
      };
      options.agent = new https.Agent(options);

      let req = https.request(options, async (res) => {
        let data = '';
        res.on('data', async (readable) => {
          data += readable;
        });
        res.on('end', async () => {
          result = {};
          result.statusCode = res.statusCode;
          result.headers = res.headers;
          result.body = data;
          resolve(result);
        });
      });
      req.on('error', (e) => {
        console.error(e);
      });
      req.write(params.body);
      req.end();
    });
  },
};
