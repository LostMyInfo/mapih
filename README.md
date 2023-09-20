# Mapih

Mapih is a collection of Discord Api handlers as well as other useful (I think anyways 😁) Utilities.

This package uses your bot token. You must pass it via the process environment.  
ie: process.env.token  

Docs coming soon

```js
// npm i mapih dotenv
require('dotenv').config();
const api = new (require('mapih'))();

(async() => {
  await api.discord.channels.messages.create({
    channel_id: '774133713733812275',
    content: 'hello'
  });
})();
```
