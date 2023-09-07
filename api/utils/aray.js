const fs = require('fs/promises');

module.exports = {

  /**
   * 
   * @param {Object} params
   * @param {string | number} params.index
   * @param {*} params.value
   * @returns {Promise<boolean>}
   */
  async put(params) {// index, value
    try {
      let file;
      let write;
      if (file = (await fs.readFile(process.cwd() + `/processes/data/${process.env.auid}/${process.env.uuid}/.aray`)).toString()) {
        const parsed = JSON.parse(file);
        const new_val = [];
        for (let i = 0; i < parsed.length; i++) {
          if (parsed[i].index == params.index) {
            parsed[i].value = params.value;
            // return { error: "Index name already exists..." };
          } else new_val.push(parsed[i]);
        }
        new_val.push(params);
        write = JSON.stringify(new_val);
      } else write = JSON.stringify([params]);
      await fs.writeFile(process.cwd() + `/processes/data/${process.env.auid}/${process.env.uuid}/.aray`, write, { flag: 'w' });
      return true;
    } catch (e) {
      return e;
    }
  },

  /**
   * 
   * @param {Object} params
   * @param {string | number} params.index
   * @returns {Promise<?*>}
   */
  async get(params) {// index
    try {
      const file = JSON.parse(await fs.readFile(process.cwd() + `/processes/data/${process.env.auid}/${process.env.uuid}/.aray`));
      for (let i = 0; i < file.length; i++) {
        if (file[i].index == params.index)
          return file[i].value;
      }
      return null;
    } catch (e) {
      return e;
    }
  },

  async remove(params) {
    try {
      const file = JSON.parse(await fs.readFile(process.cwd() + `/processes/data/${process.env.auid}/${process.env.uuid}/.aray`));
      const new_val = [];
      for (let i = 0; i < file.length; i++) {
        if (file[i].index !== params)
          new_val.push(file[i]);
      }
      await fs.writeFile(process.cwd() + `/processes/data/${process.env.auid}/${process.env.uuid}/.aray`, JSON.stringify(new_val), { flag: 'w' });
      return true;
    } catch (e) {
      return e;
    }
  }
};
