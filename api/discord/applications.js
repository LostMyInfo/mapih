const structures = require('../resources/structures');
const { doRequest } = require('../resources/functions');

module.exports = {
    //Get Global Application Commands
    async getGlobalApplicationCommands(params) {
        try {
            /* initialize config */
            const cfg = {
                method: "GET",
                body: null,
                endpoint: "commands",
                properties: null,
                params: params
            };
            cfg.path = `applications/${params.application_id}/${cfg.endpoint}`;
            cfg.attempt = await doRequest(cfg);
            return JSON.parse(cfg.attempt.body) ?? false;
        } catch (e) {
            console.log(e);
        }
    },
    //Create Global Application Command
    async createGlobalApplicationCommand(params) {
        try {
            /* initialize config */
            const cfg = {
                method: "POST",
                body: structures.newStructure('application_command'),
                endpoint: `commands`,
                properties: {
                    name: params.name,
                    description: params.description,
                },
                params: params
            };
            cfg.path = `applications/${params.application_id}/${cfg.endpoint}`;
            cfg.attempt = await doRequest(cfg);
            return JSON.parse(cfg.attempt.body) ?? false;
        } catch (e) {
            console.log(e);
        }
    },
    //Bulk Overwrite Global Application Commands
    async bulkOverwriteGlobalApplicationCommands(params) {
        try {
            /* initialize config */
            const cfg = {
                method: "PUT",
                body: null,
                endpoint: `commands`,
                properties: null,
                params: params
            };
            cfg.path = `applications/${params.application_id}/${cfg.endpoint}`;
            cfg.attempt = await doRequest(cfg);
            return JSON.parse(cfg.attempt.body) ?? false;
        } catch (e) {
            console.log(e);
        }
    },
    //Get Guild Application Command
    async getGuildApplicationCommands(params) {
        try {
            /* initialize config */
            const cfg = {
                method: "GET",
                body: null,
                endpoint: `guilds/${params.guild_id}/commands`,
                properties: null,
                params: params
            };
            cfg.path = `applications/${params.application_id}/${cfg.endpoint}`;
            cfg.attempt = await doRequest(cfg);
            return JSON.parse(cfg.attempt.body) ?? false;
        } catch (e) {
            console.log(e);
        }
    },
    //Create Guild Application Command
    async createGuildApplicationCommand(params) {
        try {
            /* initialize config */
            const cfg = {
                method: "POST",
                body: structures.newStructure('application_command'),
                endpoint: `guilds/${params.guild_id}/commands`,
                properties: {
                    name: params.name,
                    description: params.description,
                },
                params: params
            };
            cfg.path = `applications/${params.application_id}/${cfg.endpoint}`;
            cfg.attempt = await doRequest(cfg);
            return JSON.parse(cfg.attempt.body) ?? false;
        } catch (e) {
            console.log(e);
        }
    },
    //Bulk Overwrite Guild Application Command
    async bulkOverwriteGuildApplicationCommands(params) {
        try {
            //console.log('bulkoverwrite', params);
            /* initialize config */
            const cfg = {
                method: "PUT",
                body: params.application_commands,
                endpoint: `guilds/${params.guild_id}/commands`,
                properties: null,
                params: null
            };
            (cfg.body.length) ? (async () => {
                cfg.path = `applications/${params.application_id}/${cfg.endpoint}`;
                cfg.attempt = await doRequest(cfg);
                //console.log(cfg.attempt);
                return JSON.parse(cfg.attempt.body) ?? false;
            })() : null;
        } catch (e) {
            console.log(e);
        }
    },
    async deleteGlobalApplicationCommand(params) {
    try {
      const cfg = {
        method: 'DEL',
        body: null,
        endpoint: `commands/${params.command_id}`,
        properties: {},
        params: params,
        audit: true,
        reason: 'Deleting Global Application Command'
      };
      cfg.path = `applications/${params.application_id}/${cfg.endpoint}`;
      cfg.attempt = await doRequest(cfg);

      return cfg.attempt.statusCode == 204 ? cfg.attempt : false;

    } catch (e) {
      console.log(e);
    }
  }
}
