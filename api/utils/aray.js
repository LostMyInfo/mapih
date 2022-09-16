const fs = require('fs/promises');

module.exports = {

  async put(params) {// index, value
    try {
      let file;
      let write;
      if (file = (await fs.readFile(process.cwd() + `/processes/data/${process.env.uuid}/.aray`)).toString()) {
        let parsed = JSON.parse(file);
        let new_val = [];
        for (let i = 0; i < parsed.length; i++) {
          if (parsed[i].index == params.index) {
            parsed[i].value = params.value;
            //return { error: "Index name already exists..." };
          }
          else new_val.push(parsed[i]);
        }
        new_val.push(params);
        write = JSON.stringify(new_val);
      }
      else write = JSON.stringify([params]);
      await fs.writeFile(process.cwd() + `/processes/data/${process.env.uuid}/.aray`, write, { flag: 'w' });
      return true;
    } catch (e) {
      return e;
    }
  },

  async get(params) {// index
    try {
      let file = JSON.parse(await fs.readFile(process.cwd() + `/processes/data/${process.env.uuid}/.aray`));
      for (let i = 0; i < file.length; i++) {
        if (file[i].index == params.index)
          return file[i].value;
      }
      return { error: "Index not found..." };
    } catch (e) {
      return e;
    }
  },

  async remove(params) {
    try {
      let file = JSON.parse(await fs.readFile(process.cwd() + `/processes/data/${process.env.uuid}/.aray`));
      let new_val = [];
      for (let i = 0; i < file.length; i++) {
        if (file[i].index !== params)
          new_val.push(file[i]);
      }
      await fs.writeFile(process.cwd() + `/processes/data/${process.env.uuid}/.aray`, JSON.stringify(new_val), { flag: 'w' });
      return true;
    } catch (e) {
      return e;
    }
  },
};
