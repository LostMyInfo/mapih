const { https } = require('./api/utils/newhttps');
const api = require('./Api');
api.initialize({
  discord: 'MTAwODA3NDAwNDcxMzcwMTQyMA.Gh48P_.8lMsKiYbTW13KLQZL0aRfyHQgl5neC1GEvrH2o'
});

(async () => {

  const message = await api.discord.channels.messages.create({
    channel_id: '774133713733812275',
    attachments: [{
      file: 'https://cdn.discordapp.com/attachments/774133713733812275/1179539603619860612/Image.gif?ex=657a26dc&is=6567b1dc&hm=63687aac1148808c7d12fdf24ed477aae30c9f0400b234a90ebf2ab660e5ef3f&',
      filename: 'test.gif'
    }]
  });

  console.log(message);
  
})();

