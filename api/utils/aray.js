const fs = require('fs/promises');
module.exports = {

  /**
   * 
   * @param {Object} params
   * @param {string | number} params.index
   * @param {*} params.value
   * @param {number} [params.ttl]
   * @returns {Promise<boolean>}
   */
  async put(params) {// index, value
    console.log('params in aray.put', params);
    try {
      let file;
      let write;
      if (file = (await fs.readFile(process.cwd() + `/processes/data/${process.env.auid}/${process.env.uuid}/.aray`)).toString()) {
        const parsed = JSON.parse(file);
        const new_val = [];
        for (let i = 0; i < parsed.length; i++) {
          if (parsed[i].index == params.index) {
            console.log('parsed[i].index === params.index', params.index);
            console.log('old value', parsed[i].value);
            parsed[i].value = params.value;
            console.log('new value', parsed[i].value);
            // return { error: "Index name already exists..." };
          } else new_val.push(parsed[i]);
        }
        new_val.push({ index: params.index, value: params.value });
        write = JSON.stringify(new_val);
      } else write = JSON.stringify([params]);
      await fs.writeFile(process.cwd() + `/processes/data/${process.env.auid}/${process.env.uuid}/.aray`, write, { flag: 'w' });
      
      if (params.ttl) {
        const intervalID = setInterval(async () => {
          await this.remove({ index: params.index });
          clearInterval(intervalID);
        }, params.ttl * 1000);
      }
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
      // @ts-ignore
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
    console.log('aray.remove()');
    try {
      // @ts-ignore
      const file = JSON.parse(await fs.readFile(process.cwd() + `/processes/data/${process.env.auid}/${process.env.uuid}/.aray`));
      const new_val = [];
      for (let i = 0; i < file.length; i++) {
        if (file[i].index !== params.index)
          new_val.push(file[i]);
      }
      await fs.writeFile(process.cwd() + `/processes/data/${process.env.auid}/${process.env.uuid}/.aray`, JSON.stringify(new_val), { flag: 'w' });
      return true;
    } catch (e) {
      return e;
    }
  }
};

async function clear() {
  try {
    await fs.writeFile(process.cwd() + `/processes/data/${process.env.auid}/${process.env.uuid}/.aray`, [], { flag: 'w' });
    return true;
  } catch (e) {
    return e;
  }
}